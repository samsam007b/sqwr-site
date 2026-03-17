'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
  const { t } = useLanguage();
  const ctaRef = useRef<HTMLElement>(null);

  const TEAM = [
    {
      number: '01',
      name: 'Samuel Baudon',
      tag: t('about.member1Tag'),
      role: t('about.member1Role'),
      bio: t('about.member1Bio'),
    },
    {
      number: '02',
      name: 'Joakim Baudon',
      tag: t('about.member2Tag'),
      role: t('about.member2Role'),
      bio: t('about.member2Bio'),
    },
  ];

  const PILLARS = [
    {
      label: t('about.pillar1Label'),
      value: t('about.pillar1Value'),
      sub: t('about.pillar1Sub'),
    },
    {
      label: t('about.pillar2Label'),
      value: t('about.pillar2Value'),
      sub: t('about.pillar2Sub'),
    },
    {
      label: t('about.pillar3Label'),
      value: t('about.pillar3Value'),
      sub: t('about.pillar3Sub'),
    },
  ];

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

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Ghost number */}
          <div className="absolute -top-6 -left-3 lg:-top-14 lg:-left-6 select-none pointer-events-none">
            <span
              className="font-display font-normal text-[10rem] lg:text-[16rem] leading-none block"
              style={{ color: 'rgba(17,17,17,0.04)' }}
            >
              02
            </span>
          </div>

          <motion.p
            aria-hidden="true"
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('about.heroLabel')}
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            dangerouslySetInnerHTML={{ __html: t('about.heroTitle').replace(/\n/g, '<br />') }}
          />

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10 whitespace-pre-line"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            {t('about.heroSub')}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-6">
                {t('about.storyLabel')}
              </p>
              <h2
                className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground"
                dangerouslySetInnerHTML={{ __html: t('about.storyTitle').replace(/\n/g, '<br />') }}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-base lg:text-lg text-secondary/58 leading-relaxed font-light">
                <p>{t('about.storyP1')}</p>
                <p>{t('about.storyP2')}</p>
                <p>{t('about.storyP3')}</p>
              </div>

              {/* Pull quote */}
              <div className="mt-12 pl-6 border-l-2 border-primary">
                <p className="font-display font-normal text-xl lg:text-2xl text-foreground leading-snug whitespace-pre-line">
                  {t('about.quote')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-secondary/10 py-20 lg:py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-secondary/10">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.label} delay={i * 0.1}>
                <div className="bg-background p-8 lg:p-10">
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/60 mb-5">
                    {pillar.label}
                  </p>
                  <p
                    className="font-display font-normal leading-tight text-foreground mb-4 whitespace-pre-line"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
                  >
                    {pillar.value}
                  </p>
                  <p className="text-sm text-secondary/45 font-light leading-relaxed">
                    {pillar.sub}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16 lg:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-6">
              {t('about.sectionTeamLabel')}
            </p>
            <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground">
              {t('about.sectionTeamTitle')}
            </h2>
          </ScrollReveal>

          <div>
            {TEAM.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="border-t border-secondary/10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  {/* Ghost number */}
                  <div className="lg:col-span-1">
                    <span
                      className="font-display font-normal leading-none select-none block"
                      style={{ fontSize: '4rem', color: 'rgba(17,17,17,0.06)' }}
                    >
                      {member.number}
                    </span>
                  </div>

                  {/* Name + role */}
                  <div className="lg:col-span-4 lg:col-start-2">
                    <div className="w-8 h-[2px] bg-primary mb-5" />
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3 block">
                      {member.tag}
                    </span>
                    <h3 className="font-display font-normal text-2xl lg:text-3xl text-foreground mb-2 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-secondary/70 leading-relaxed">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="lg:col-span-5 lg:col-start-7">
                    <p className="text-secondary/55 font-light leading-relaxed text-base">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-secondary/10" />
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY (dark) ────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-paper/25 mb-8">
                {t('about.sectionPhilosophyLabel')}
              </p>
              <h2
                className="font-display font-normal text-3xl lg:text-4xl leading-tight text-paper"
                dangerouslySetInnerHTML={{ __html: t('about.philosophyTitle').replace(/\n/g, '<br />') }}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-base lg:text-lg text-paper/50 leading-relaxed font-light">
                <p>{t('about.philosophyP1')}</p>
                <p>{t('about.philosophyP2')}</p>
                <p>{t('about.philosophyP3')}</p>
              </div>

              <div className="mt-12 pt-8 border-t border-paper/10 flex flex-col gap-6">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  {t('about.ctaButton')}
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
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">SQWR Studio</span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">Bruxelles &middot; 2024</span>
          </div>
        </div>
      </section>
    </>
  );
}
