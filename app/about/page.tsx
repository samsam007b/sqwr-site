'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const TEAM = [
  {
    number: '01',
    name: 'Samuel Baudon',
    tag: 'Direction',
    role: 'Stratégie · Communication · Entrepreneuriat',
    bio: "Étudiant en communication et relations publiques, Samuel est aussi entrepreneur : fondateur d'Ears\u00a0& Eyes et porteur du projet izzico. Il pilote la stratégie, le développement commercial et la vision du studio.",
  },
  {
    number: '02',
    name: 'Joakim Baudon',
    tag: 'Création',
    role: 'Design · Direction Artistique · Innovation',
    bio: 'Formé deux ans à La Cambre, actuellement étudiant à la Kunstschule de Liechtenstein. Joakim insuffle une approche contemporaine et artistique à chaque projet — à la croisée du design graphique et des outils IA.',
  },
];

const STATS = [
  { value: '150+', label: 'Marques transformées' },
  { value: '9 ans', label: "D'expertise créative" },
  { value: '02', label: 'Designers, une famille' },
];

export default function AboutPage() {
  const ctaRef = useRef<HTMLElement>(null);

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
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            À propos
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            Un studio familial<br />bruxellois.
          </motion.h1>

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Deux disciplines. Une seule vision.<br />
            Des projets qui laissent une trace.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ── STORY ────────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
                01 &mdash; Notre histoire
              </p>
              <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground">
                Studio familial.<br />Triple expertise.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-base lg:text-lg text-secondary/58 leading-relaxed font-light">
                <p>
                  SQWR Studio est une agence créative basée à Bruxelles, portée par deux membres
                  de la famille Baudon. Notre force réside dans notre complémentarité : stratégie
                  et communication d&apos;un côté, design et direction artistique de l&apos;autre.
                </p>
                <p>
                  Ce qui nous distingue des agences classiques, c&apos;est notre taille humaine.
                  Vous travaillez directement avec les créateurs — sans intermédiaires, sans
                  perte de sens. Chaque brief est traité avec la même rigueur, qu&apos;il s&apos;agisse
                  d&apos;une identité de marque ou d&apos;une plateforme e-commerce.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-12 pl-6 border-l-2 border-primary">
                <p className="font-display font-normal text-xl lg:text-2xl text-foreground leading-snug">
                  &ldquo;Qualité agence.<br />Réactivité d&apos;une équipe familiale.&rdquo;
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-secondary/10 py-20 lg:py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 lg:gap-0 lg:divide-x lg:divide-secondary/10">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="lg:px-16 first:pl-0 last:pr-0 text-center lg:text-left">
                  <span
                    className="font-display font-normal block leading-none mb-3"
                    style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--primary)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-secondary/40">
                    {stat.label}
                  </span>
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
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
              02 &mdash; L&apos;&eacute;quipe
            </p>
            <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground">
              La famille Baudon
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {TEAM.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="border-t border-secondary/10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  {/* Ghost number + tag */}
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
                    <p className="text-xs font-mono text-secondary/40 leading-relaxed">
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
                03 &mdash; Notre philosophie
              </p>
              <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-paper">
                L&apos;approche<br />AI-driven
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-base lg:text-lg text-paper/50 leading-relaxed font-light">
                <p>
                  Notre philosophie de travail{' '}
                  <span className="text-paper/90 font-normal">AI-driven</span> nous permet d&apos;être
                  compétitifs en démocratisant des travaux autrefois très chronophages.
                </p>
                <p>
                  En automatisant les tâches répétitives que les clients ne voyaient pas mais qui
                  rendaient le prix des projets élevé, nous libérons du temps pour nous concentrer
                  sur ce qui compte vraiment :{' '}
                  <span className="text-paper/90 font-normal">la Création</span>.
                </p>
                <p>
                  Cette approche nous permet d&apos;offrir un service de qualité agence à des prix
                  accessibles, tout en consacrant notre énergie créative là où elle a le plus
                  d&apos;impact.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-paper/10 flex flex-col gap-6">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  Nous contacter
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
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">Bruxelles, Belgique</span>
          </div>
        </div>
      </section>
    </>
  );
}
