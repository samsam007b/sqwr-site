'use client';

import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function AboutPage() {
  const { t } = useLanguage();
  const philosophyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = philosophyRef.current;
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

  const teamMembers = [
    {
      name: 'Samuel Baudon',
      role: 'Stratégie, Communication & Entrepreneuriat',
      bio: "Étudiant en communication et relations publiques, Samuel est aussi entrepreneur : fondateur d'Ears & Eyes, porteur du projet izzico. Il pilote la stratégie, le développement commercial et la communication du studio.",
    },
    {
      name: 'Jean-Pierre Baudon',
      role: 'Graphic Designer',
      bio: "15 ans d'expérience dans l'impression et le design graphique. Graphiste freelance, Jean-Pierre apporte son expertise technique et créative à chaque projet.",
    },
    {
      name: 'Joakim Baudon',
      role: 'Designer & Directeur Artistique',
      bio: 'Formé 2 ans à La Cambre, actuellement étudiant à la Kunstschule de Lichtenstein. Joakim insuffle une approche contemporaine et artistique à nos créations.',
    },
  ];

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8"
              >
                {t('about.title')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-normal leading-[0.95] text-foreground mb-12"
              >
                Nous créons des<br />expériences visuelles<br />qui inspirent
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              className="lg:col-start-5 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl text-secondary/60 leading-relaxed font-light">
                {t('about.description')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ─── STORY ───────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
                01 — Qui sommes-nous
              </p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight text-foreground">
                Studio familial.<br />Triple expertise.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-lg text-secondary/60 leading-relaxed font-light">
                <p>
                  SQWR Studio est une agence familiale basée à Bruxelles, composée de trois membres
                  de la famille Baudon. Notre force réside dans notre diversité de compétences et
                  notre capacité à travailler ensemble de manière fluide et réactive.
                </p>
                <p>
                  Nous combinons des profils complémentaires : expertise en relations publiques et
                  stratégie, savoir-faire technique en impression et design graphique, et formation
                  artistique contemporaine. Cette synergie nous permet d'aborder chaque projet sous
                  différents angles.
                </p>
                <p>
                  Notre approche est simple : créer des identités visuelles authentiques et
                  mémorables, en restant à l'écoute de nos clients et en mettant notre créativité
                  au service de leurs ambitions.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-20">
            <ScrollReveal className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
                02 — L'équipe
              </p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight text-foreground">
                La famille Baudon
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.12}>
                <div>
                  <div
                    className="aspect-square grain-overlay mb-8 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #F0EDE6 0%, #E8E3DC 100%)' }}
                  >
                    <div className="w-full h-full flex items-end justify-start p-6">
                      <div className="w-8 h-[2px] bg-primary" />
                    </div>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">
                    {member.role}
                  </p>
                  <h3 className="font-display font-normal text-2xl mb-4 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-secondary/60 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY (dark) ───────────────────────────────────────────────── */}
      <section
        ref={philosophyRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-paper/25 mb-8">
                03 — Notre philosophie
              </p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight text-paper">
                L'approche<br />AI-driven
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-lg text-paper/50 leading-relaxed font-light">
                <p>
                  Notre philosophie de travail{' '}
                  <span className="text-paper/90 font-normal">AI-driven</span> nous permet d'être
                  compétitifs en démocratisant des travaux autrefois très chronophages.
                </p>
                <p>
                  En automatisant les tâches répétitives que les clients ne voyaient pas mais qui
                  rendaient le prix des projets élevé, nous libérons du temps pour nous concentrer
                  sur ce qui compte vraiment :{' '}
                  <span className="text-paper/90 font-normal">la Création</span>.
                </p>
                <p>
                  Cette approche nous permet d'offrir un service de qualité agence à des prix
                  accessibles, tout en consacrant notre énergie créative là où elle a le plus
                  d'impact.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <ScrollReveal className="lg:col-span-7">
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground">
                {t('about.ctaTitle')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
              <p className="text-lg text-secondary/50 font-light leading-relaxed">
                Nous serions ravis de discuter de votre prochain projet et de vous montrer comment
                nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <MagneticButton
                href="/contact"
                strength={0.15}
                className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
              >
                {t('about.ctaButton')}
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
