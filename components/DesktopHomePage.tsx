'use client';

import MagneticButton from '@/components/MagneticButton';
import PixelGridHero from '@/components/PixelGridHero';
import ScrollProgress from '@/components/ScrollProgress';
import VideoRevealSection from '@/components/VideoRevealSection';
import { getProjectById } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import ScatterText from '@/components/ScatterText';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'philosophy', label: 'Philosophie' },
  { id: 'work', label: 'Projets' },
  { id: 'closing', label: 'Contact' },
];

function HeroOverlay() {
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
        Studio cr&eacute;atif &middot; Bruxelles
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
  const bodyOpacity = useTransform(scrollYProgress, [0.32, 0.40, 0.55, 0.63], [0, 1, 1, 0]);
  const bodyY = useTransform(scrollYProgress, [0.32, 0.40, 0.55, 0.63], [30, 0, 0, -30]);

  return (
    <section id="philosophy" ref={sectionRef} className="relative" style={{ height: '200vh' }}>

      <div className="sticky top-0 h-screen flex items-center px-6 lg:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 flex items-start">
              <ScatterText
                text={t('home.philosophyLabel')}
                progress={scrollYProgress}
                assembleRange={[0.15, 0.32]}
                disperseRange={[0.60, 0.75]}
                className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40"
                stagger={0.003}
              />
            </div>

            <div className="lg:col-span-8">
              <ScatterText
                text={t('home.philosophyTitle')}
                progress={scrollYProgress}
                assembleRange={[0.17, 0.35]}
                disperseRange={[0.58, 0.73]}
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

function ClosingSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  // Add cursor-on-dark class when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          document.body.classList.add('cursor-on-dark');
        } else {
          document.body.classList.remove('cursor-on-dark');
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-on-dark');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="closing"
      data-snap-section
      className="min-h-screen flex flex-col justify-center bg-foreground text-paper relative overflow-hidden"
      data-dark-bg
    >
      {/* Red accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16" ref={ref}>
        {/* Location label */}
        <motion.p
          className="text-xs font-mono uppercase tracking-[0.3em] text-paper/25 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Bruxelles, Belgique
        </motion.p>

        {/* Main content — asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Title — left, large */}
          <div className="lg:col-span-7">
            <motion.h2
              className="font-display font-normal text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] whitespace-pre-line text-paper"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.ctaTitle')}
            </motion.h2>
          </div>

          {/* Right column — subtitle + CTA + email */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <motion.p
              className="text-lg text-paper/40 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('home.ctaSubtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton
                href="/contact"
                strength={0.15}
                className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
              >
                {t('home.ctaButton')}
              </MagneticButton>

              <a
                href="mailto:studio@sqwr.be"
                className="text-sm text-paper/30 font-light hover:text-paper/60 transition-colors duration-300 w-fit"
              >
                studio@sqwr.be
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom divider + copyright hint */}
        <motion.div
          className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
            SQWR Studio
          </span>
          <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default function DesktopHomePage() {
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
      <VideoRevealSection
        videoSrc="/projet-nanou/hero-massage.mp4"
        webmSrc="/projet-nanou/hero-massage.webm"
        mockup={getProjectById('nanou')!.mockup!}
        projectColor={getProjectById('nanou')!.color}
        projectHref="/portfolio/nanou"
      />
      <VideoRevealSection
        videoSrc="/projet-villa-coladeira/hero-cinemagraph.mp4"
        webmSrc="/projet-villa-coladeira/hero-cinemagraph.mp4"
        mockup={getProjectById('villa-coladeira')!.mockup!}
        projectColor={getProjectById('villa-coladeira')!.color}
        projectHref="/portfolio/villa-coladeira"
      />
      <ClosingSection />
    </>
  );
}
