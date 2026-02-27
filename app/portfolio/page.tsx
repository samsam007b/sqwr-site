'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { projects, getProjectsByCategory } from '@/app/data/projects';
import type { Project } from '@/app/data/projects';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Project Row ─────────────────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      ref={ref}
      href={`/portfolio/${project.id}`}
      className="group block"
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
    >
      <motion.div
        className="relative border-b border-secondary/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      >
        {/* Hover background tint */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ backgroundColor: `${project.color}08` }}
        />

        {/* Hover color bar at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ backgroundColor: project.color }}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Row content */}
        <div className="relative py-6 lg:py-10 flex items-center gap-4 lg:gap-10">
          {/* Number */}
          <span
            className="text-sm lg:text-base font-mono w-8 shrink-0 transition-colors duration-500"
            style={{ color: isHovered ? project.color : 'rgba(102,102,102,0.35)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title + Client */}
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-normal text-xl lg:text-3xl xl:text-4xl text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {project.title}
            </h2>
            <span className="text-[11px] font-mono text-secondary/40 mt-1 block">
              {project.client}
            </span>
          </div>

          {/* Services pills — desktop hover only */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <AnimatePresence>
              {isHovered &&
                project.services.slice(0, 2).map((service, i) => (
                  <motion.span
                    key={service}
                    className="text-[10px] font-mono uppercase tracking-wider text-secondary/50 border border-secondary/15 px-2.5 py-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    {service}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          {/* Category — desktop only */}
          <span className="hidden lg:block text-xs font-mono uppercase tracking-[0.12em] text-secondary/40 w-36 shrink-0 text-right">
            {project.categoryLabel}
          </span>

          {/* Year */}
          <span className="text-xs font-mono text-secondary/35 w-12 shrink-0 text-right">
            {project.year}
          </span>

          {/* Arrow */}
          <motion.span
            className="text-lg text-secondary/25 group-hover:text-primary transition-colors duration-300 shrink-0"
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Mouse tracking for floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

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
    { id: 'all', label: 'Tout' },
    { id: 'branding', label: 'Branding' },
    { id: 'web', label: 'Web' },
    { id: 'print', label: 'Print' },
    { id: 'social', label: 'Social' },
  ];

  const filteredProjects = getProjectsByCategory(activeFilter);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-8 lg:pt-44 lg:pb-12 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Ghost number */}
          <motion.div
            className="absolute -top-6 -left-3 lg:-top-14 lg:-left-6 select-none pointer-events-none"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <span className="font-display font-normal text-[10rem] lg:text-[16rem] leading-none text-foreground/[0.04]">
              {String(filteredProjects.length).padStart(2, '0')}
            </span>
          </motion.div>

          <motion.p
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Portfolio
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            Projets<br />s&eacute;lectionn&eacute;s
          </motion.h1>

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Chaque projet est une histoire, chaque pixel est intentionnel.
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
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative px-5 py-3 text-xs font-mono uppercase tracking-[0.12em] transition-colors duration-300 whitespace-nowrap ${
                    activeFilter === cat.id
                      ? 'text-foreground'
                      : 'text-secondary/40 hover:text-secondary/70'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 transition-colors duration-300 ${
                      activeFilter === cat.id ? 'text-primary' : 'text-secondary/25'
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
      <section className="px-6 lg:px-16 py-16 lg:py-24" onMouseMove={onMouseMove}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  index={index}
                  onHoverStart={() => setHoveredProject(project)}
                  onHoverEnd={() => setHoveredProject(null)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40">
                Aucun projet dans cette cat&eacute;gorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── FLOATING PREVIEW (desktop only) ───────────────────────────────────── */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="fixed pointer-events-none z-50 hidden lg:block"
            style={{
              left: springX,
              top: springY,
              x: 24,
              y: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 2 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div
              className="relative w-[360px] h-[240px] overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              {hoveredProject.video ? (
                <video
                  key={hoveredProject.id}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src={hoveredProject.video.replace('.mp4', '.webm')}
                    type="video/webm"
                  />
                  <source src={hoveredProject.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={hoveredProject.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}

              {/* Pixel grid overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(to right, transparent 0 10px, rgba(250,250,248,0.2) 10px 12px),
                    repeating-linear-gradient(to bottom, transparent 0 10px, rgba(250,250,248,0.2) 10px 12px)
                  `,
                }}
              />

              {/* Color border */}
              <div
                className="absolute inset-0 border-2"
                style={{ borderColor: hoveredProject.color }}
              />

              {/* Year badge */}
              <div className="absolute bottom-3 right-3">
                <span className="text-[10px] font-mono text-white/80 tracking-wider bg-black/30 px-2 py-0.5">
                  {hoveredProject.year}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper">
                Votre projet m&eacute;rite<br />le m&ecirc;me niveau<br />d&apos;excellence
              </h2>
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8"
            >
              <p className="text-lg text-paper/40 font-light leading-relaxed">
                Travaillons ensemble pour cr&eacute;er quelque chose d&apos;unique et
                m&eacute;morable.
              </p>
              <div className="flex flex-col gap-4">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  D&eacute;marrer un projet
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
