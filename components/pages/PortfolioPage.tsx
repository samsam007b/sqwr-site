'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { projects, getProjectsByCategory } from '@/app/data/projects';
import type { Project } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

// ── Constantes pixel (miroir de PixelGridHero / Header) ───────────────────────
const CELL = 10;
const GAP  = 2;
const STEP = CELL + GAP;   // 12 px
const TRAIL      = 0.18;   // largeur de la vague (fraction)
const FILL_DUR   = 520;    // ms
const DRAIN_DUR  = 340;    // ms

function hexToRgba(hex: string, alpha: number): string {
  const c = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(c.slice(0, 2), 16) || 0;
  const g = parseInt(c.slice(2, 4), 16) || 0;
  const b = parseInt(c.slice(4, 6), 16) || 0;
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── PixelRowCanvas ───────────────────────────────────────────────────────────
   Couvre la moitié droite de la ligne projet.
   Hover → vague de pixels colorés depuis la droite (+ image du projet en fond).
   ────────────────────────────────────────────────────────────────────────── */
function PixelRowCanvas({
  project,
  isHovered,
}: {
  project: Pick<Project, 'color'>;
  isHovered: boolean;
}) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const fillRef      = useRef<number>(0);

  // drawAtLevel — pur pixel, couleur projet, légère variation de texture
  const drawAtLevel = useCallback(
    (level: number) => {
      const canvas = canvasRef.current;
      const ctx    = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      if (level <= 0.002) return;

      // Grille de pixels — vague depuis bord droit, centre vertical
      const cols = Math.ceil(W / STEP) + 1;
      const rows = Math.ceil(H / STEP) + 1;
      const oCol = cols - 1;
      const oRow = Math.floor(rows / 2);
      const maxD = oCol + Math.max(oRow, rows - 1 - oRow);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dist     = Math.abs(c - oCol) + Math.abs(r - oRow);
          const distNorm = maxD > 0 ? dist / maxD : 0;
          const t        = (level - distNorm * (1 - TRAIL)) / TRAIL;
          const scale    = Math.max(0, Math.min(1, t));
          if (scale <= 0.005) continue;

          const sz = STEP * scale;
          const x  = c * STEP + (STEP - sz) / 2;
          const y  = r * STEP + (STEP - sz) / 2;

          // Variation d'opacité par cellule (texture organique, déterministe)
          const noise  = (Math.sin(c * 1.7 + r * 2.3) + 1) / 2; // 0–1
          const alpha  = (0.55 + noise * 0.40) * scale;
          ctx.fillStyle = hexToRgba(project.color, alpha);
          ctx.fillRect(x, y, sz, sz);
        }
      }
    },
    [project.color],
  );

  // Dimensions du canvas
  useEffect(() => {
    const canvas     = canvasRef.current;
    const container  = containerRef.current;
    if (!canvas || !container) return;

    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width > 0 && height > 0) {
        canvas.width  = Math.round(width);
        canvas.height = Math.round(height);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Animation fill ↔ drain
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from = fillRef.current;
    const to   = isHovered ? 1 : 0;

    if (Math.abs(to - from) < 0.005) {
      drawAtLevel(to);
      fillRef.current = to;
      return;
    }

    const dist     = Math.abs(to - from);
    const duration = (isHovered ? FILL_DUR : DRAIN_DUR) * dist;
    const t0       = performance.now();

    const frame = (now: number) => {
      const t     = duration > 0 ? Math.min(1, (now - t0) / duration) : 1;
      const level = from + (to - from) * t;
      fillRef.current = level;
      drawAtLevel(level);
      if (t < 1) rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered, drawAtLevel]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 right-0 w-[48%] pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 24%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 24%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

/* ── Project Row ─────────────────────────────────────────────────────────────── */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      ref={ref}
      href={`/portfolio/${project.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative border-b border-secondary/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      >
        {/* Canvas pixel en fond — droite */}
        <PixelRowCanvas project={project} isHovered={isHovered} />

        {/* Barre couleur bas */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ backgroundColor: project.color }}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Contenu — z-index au-dessus du canvas */}
        <div className="relative z-10 py-6 lg:py-10 flex items-center gap-4 lg:gap-10">
          {/* Numéro */}
          <span
            className="text-sm lg:text-base font-mono w-8 shrink-0 transition-colors duration-500"
            style={{ color: isHovered ? project.color : 'rgba(102,102,102,0.35)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Titre + Client */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-normal text-xl lg:text-3xl xl:text-4xl text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {project.title}
            </h2>
            <span className="text-[11px] font-mono text-secondary/60 mt-1 block">
              {project.client}
            </span>
          </div>

          {/* Catégorie — desktop only */}
          <span className="hidden lg:block text-xs font-mono uppercase tracking-[0.12em] text-secondary/60 w-36 shrink-0 text-right">
            {project.categoryLabel}
          </span>

          {/* Année */}
          <span className="text-xs font-mono text-secondary/60 w-12 shrink-0 text-right">
            {project.year}
          </span>

          {/* Flèche */}
          <motion.span
            aria-hidden="true"
            className="text-lg text-secondary/40 group-hover:text-primary transition-colors duration-300 shrink-0"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            &rarr;
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const ctaRef = useRef<HTMLElement>(null);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
  }, []);

  // CTA dark cursor
  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          document.body.classList.add('cursor-on-dark');
        } else {
          document.body.classList.remove('cursor-on-dark');
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-on-dark');
    };
  }, []);

  const categories = [
    { id: 'all',      label: t('portfolio.catAll') },
    { id: 'branding', label: t('portfolio.catBranding') },
    { id: 'web',      label: t('portfolio.catWeb') },
    { id: 'print',    label: t('portfolio.catPrint') },
    { id: 'social',   label: t('portfolio.catSocial') },
  ];

  const filteredProjects = getProjectsByCategory(activeFilter);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-8 lg:pt-44 lg:pb-12 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute -top-6 -left-3 lg:-top-14 lg:-left-6 select-none pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={filteredProjects.length}
                className="font-display font-normal text-[10rem] lg:text-[16rem] leading-none block"
                style={{ color: 'rgba(17,17,17,0.04)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {String(filteredProjects.length).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            aria-hidden="true"
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('portfolio.heroLabel')}
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            dangerouslySetInnerHTML={{ __html: t('portfolio.heroTitle').replace(/\n/g, '<br />') }}
          />

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            {t('portfolio.heroSub')}
          </motion.p>
        </div>
      </section>

      {/* ─── FILTER ────────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-5 border-y border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-0 overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;
              if (count === 0 && cat.id !== 'all') return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`relative px-5 py-3 text-xs font-mono uppercase tracking-[0.12em] transition-colors duration-300 whitespace-nowrap ${
                    activeFilter === cat.id
                      ? 'text-foreground'
                      : 'text-secondary/60 hover:text-secondary/80'
                  }`}
                >
                  {cat.label}
                  <span
                    aria-hidden="true"
                    className={`ml-1.5 transition-colors duration-300 ${
                      activeFilter === cat.id ? 'text-primary' : 'text-secondary/50'
                    }`}
                  >
                    {count}
                  </span>
                  {activeFilter === cat.id && (
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
                      layoutId="filterIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECT INDEX ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="border-t border-secondary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40">
                {t('portfolio.noProjects')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA (dark) ────────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <ScrollReveal className="lg:col-span-7">
              <h2
                className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper"
                dangerouslySetInnerHTML={{ __html: t('portfolio.ctaTitle').replace(/\n/g, '<br />') }}
              />
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8"
            >
              <p className="text-lg text-paper/40 font-light leading-relaxed">
                {t('portfolio.ctaSubtitle')}
              </p>
              <div className="flex flex-col gap-4">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  {t('portfolio.ctaButton')}
                </MagneticButton>
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-sm text-paper/30 font-light hover:text-paper/60 transition-colors duration-300 w-fit"
                >
                  studio@sqwr.be
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between">
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              SQWR Studio
            </span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
