'use client';

import Link from 'next/link';
import PixelGridHero from '@/components/PixelGridHero';
import ScrollProgress from '@/components/ScrollProgress';
import PixelFlipReveal from '@/components/PixelFlipReveal';
import { getProjectById } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import ScatterText from '@/components/ScatterText';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// sections are computed inside DesktopHomePage using t() for i18n

function HeroOverlay() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Show text after logo animation completes
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Fade out on scroll
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.3));
        ref.current.style.opacity = String(visible ? 1 - progress : 0);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen flex flex-col items-center justify-end pointer-events-none"
      style={{ opacity: 0 }}
    >
      <p
        className={`text-xs font-mono uppercase tracking-[0.3em] text-secondary/50 mb-16 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {t('home.heroBadge')}
      </p>
      <div
        className={`mb-6 transition-all duration-1000 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: visible ? '500ms' : '0ms' }}
      >
        <div className="w-[1px] h-8 bg-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-foreground/60 animate-scroll-line" />
        </div>
      </div>
    </div>
  );
}

function PhilosophySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Body text: fade in when title assembled, fade out on disperse
  const bodyOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.55, 0.63], [0, 1, 1, 0]);
  const bodyY = useTransform(scrollYProgress, [0.38, 0.45, 0.55, 0.63], [30, 0, 0, -30]);

  return (
    <section id="philosophy" ref={sectionRef} className="relative" style={{ height: '200vh' }}>

      <div className="sticky top-0 h-screen flex items-center px-6 lg:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 flex items-start">
              <ScatterText
                text={t('home.philosophyLabel')}
                progress={scrollYProgress}
                assembleRange={[0.20, 0.37]}
                disperseRange={[0.63, 0.78]}
                className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40"
                stagger={0.003}
              />
            </div>

            <div className="lg:col-span-8">
              <ScatterText
                text={t('home.philosophyTitle')}
                progress={scrollYProgress}
                assembleRange={[0.22, 0.40]}
                disperseRange={[0.61, 0.76]}
                className="font-display font-normal text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground"
                style={{ display: 'block', marginBottom: '2.5rem' }}
                stagger={0.0015}
              />
              <motion.div
                className="space-y-6 text-lg text-secondary/70 leading-relaxed font-light"
                style={{ opacity: bodyOpacity, y: bodyY }}
              >
                <p>{t('home.philosophyText1')}</p>
                <p>{t('home.philosophyText2')}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Carte 3D flip ─────────────────────────────────────────────────────────────
function CTACard() {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full"
      style={{ perspective: '1000px', height: '300px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── Face avant — rouge ── */}
        <div
          className="absolute inset-0 bg-primary p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              {t('home.ctaStep')}
            </span>
            <div className="w-4 h-4 border border-white/25" />
          </div>

          <div>
            <p className="font-display font-normal text-[2.1rem] leading-[1] text-white mb-1"
              dangerouslySetInnerHTML={{ __html: t('home.ctaStart').replace('\n', '<br />') }}
            />
            <span className="text-white/40 text-3xl leading-none">→</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.2em]">
              {t('home.ctaHover')}
            </span>
            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className="px-5 py-2.5 bg-white text-primary text-[10px] font-mono uppercase tracking-[0.15em] hover:bg-white/90 transition-colors duration-200"
            >
              {t('home.ctaLaunch')}
            </Link>
          </div>
        </div>

        {/* ── Face arrière — sombre ── */}
        <div
          className="absolute inset-0 bg-foreground p-8 flex flex-col justify-between border border-secondary/15"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-8 h-[2px] bg-primary" />

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-paper/25 block mb-5">
              {t('home.ctaDirect')}
            </span>
            <a
              href="mailto:studio@sqwr.be"
              className="font-display font-normal text-[1.6rem] leading-tight text-paper hover:text-primary transition-colors duration-300 block mb-3"
            >
              studio@sqwr.be
            </a>
            <a
              href="tel:+32493302752"
              className="text-sm text-paper/40 font-light hover:text-paper/70 transition-colors duration-300"
            >
              +32 493 30 27 52
            </a>
          </div>

          <p className="text-[9px] font-mono text-paper/20 uppercase tracking-[0.2em]">
            {t('home.ctaResponse')}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ── Section finale ─────────────────────────────────────────────────────────────
function ClosingSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-12%' });

  const lines = [t('home.closingLine1'), t('home.closingLine2')];

  return (
    <section
      ref={sectionRef}
      id="closing"
      data-snap-section
      className="relative min-h-screen flex items-center py-32 lg:py-44 px-6 lg:px-16 overflow-hidden"
    >
      {/* ── Flèche fantôme en rotation lente ── */}
      <div className="absolute -top-20 -left-16 select-none pointer-events-none">
        <motion.span
          className="font-display font-normal leading-none block"
          style={{ fontSize: '22rem', color: 'rgba(17,17,17,0.032)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
        >
          →
        </motion.span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* ── Gauche : headline + sub ── */}
          <div className="lg:col-span-7">
            {/* Label mono */}
            <motion.p
              className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              {t('home.ctaStep')}
            </motion.p>

            {/* Rideau de mots */}
            <h2 className="font-display font-normal text-5xl md:text-6xl lg:text-[5.25rem] leading-[0.92] text-foreground mb-10">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '108%' }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{
                      duration: 1,
                      delay: 0.15 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Sous-titre */}
            <motion.p
              className="text-lg text-secondary/45 font-light max-w-sm leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.ctaSubtitle')}
            </motion.p>
          </div>

          {/* ── Droite : carte 3D ── */}
          <div className="lg:col-span-4 lg:col-start-9">
            <motion.div
              initial={{ opacity: 0, x: 32, rotateY: -12 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: '800px' }}
            >
              <CTACard />
            </motion.div>
          </div>

        </div>

        {/* ── Strip bas ── */}
        <motion.div
          className="mt-24 lg:mt-32 pt-8 border-t border-secondary/10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.75 }}
        >
          <span className="text-xs font-mono text-secondary/25 uppercase tracking-[0.2em]">SQWR Studio</span>
          <span className="text-xs font-mono text-secondary/20 uppercase tracking-[0.2em]">Bruxelles · 2024</span>
        </motion.div>
      </div>
    </section>
  );
}

export default function DesktopHomePage() {
  const { t } = useLanguage();

  const sections = [
    { id: 'hero', label: t('home.scrollHome') },
    { id: 'philosophy', label: t('home.scrollPhilosophy') },
    { id: 'work', label: t('home.scrollProjects') },
    { id: 'closing', label: t('home.scrollContact') },
  ];

  return (
    <>
      <ScrollProgress sections={sections} />

      {/* Fixed grid background — always visible behind everything */}
      <PixelGridHero />

      {/* Hero: first snap section. Transition to next section plays the scatter */}
      <div id="hero" data-snap-section className="h-[120vh] relative">
        <HeroOverlay />
      </div>

      {/* Content rises up over the grid as you scroll */}
      <PhilosophySection />
      <PixelFlipReveal
        projects={[
          {
            videoSrc: '/projet-nanou/hero-massage.mp4',
            webmSrc: '/projet-nanou/hero-massage.webm',
            mockup: getProjectById('nanou')!.mockup!,
            projectColor: getProjectById('nanou')!.color,
            projectHref: '/portfolio/nanou',
            year: getProjectById('nanou')!.year,
          },
          {
            videoSrc: '/projet-villa-coladeira/hero-cinemagraph.mp4',
            webmSrc: '/projet-villa-coladeira/hero-cinemagraph.mp4',
            mockup: getProjectById('villa-coladeira')!.mockup!,
            projectColor: getProjectById('villa-coladeira')!.color,
            projectHref: '/portfolio/villa-coladeira',
            year: getProjectById('villa-coladeira')!.year,
          },
        ]}
      />
      <ClosingSection />
    </>
  );
}
