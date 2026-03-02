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
    role: 'IHECS · Affaires europ\u00e9ennes · Strat\u00e9gie · Web',
    bio: 'Master en affaires europ\u00e9ennes \u00e0 l\u2019IHECS (Bruxelles) — une formation qui croise communication institutionnelle, analyse strat\u00e9gique et relations publiques. Auto-entrepreneur chez izzico. Deux ans de production d\u2019\u00e9v\u00e9nements (festivals, vernissages musicaux). Trois projets web livr\u00e9s\u00a0: Villa Coladeira, Massages\u00a0& Naissances, izzico. Il pilote la strat\u00e9gie, le d\u00e9veloppement et la vision du studio.',
  },
  {
    number: '02',
    name: 'Joakim Baudon',
    tag: 'Création',
    role: 'Design · Direction Artistique',
    bio: 'Formé à La Cambre (Bruxelles), actuellement à la Kunstschule de Liechtenstein. Direction artistique de Lost Garden (événement musical, Bruxelles). Identité de marque complète — logo et affiches — pour La Villa, fondation basée en Suisse. Il insuffle une approche contemporaine et exigeante à chaque projet.',
  },
];

/* Three identity pillars — qualitative, not inflated numbers */
const PILLARS = [
  {
    label: 'Ancrage',
    value: 'La Cambre\nKunstschule',
    sub: "Deux des meilleures \u00e9coles d\u2019art d\u2019Europe continentale",
  },
  {
    label: 'Origine',
    value: 'Bruxelles\nBelgique',
    sub: 'Studio fondé à Bruxelles, actif depuis 2024',
  },
  {
    label: 'Approche',
    value: 'AI-driven\nDesign',
    sub: 'Outils IA intégrés pour livrer plus vite, sans sacrifier la qualité',
  },
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
            aria-hidden="true"
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
            Deux profils. Une exigence commune.<br />
            Des projets pensés pour durer.
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
                01 &mdash; Qui sommes-nous
              </p>
              <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground">
                Jeune studio.<br />Vraie exigence.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-base lg:text-lg text-secondary/58 leading-relaxed font-light">
                <p>
                  SQWR Studio est né à Bruxelles en 2024. Un studio récent, porté par deux frères
                  dont les parcours se complètent — communication et stratégie d'un côté,
                  design et direction artistique de l&apos;autre.
                </p>
                <p>
                  Nous ne prétendons pas à vingt ans d&apos;expérience. Ce que nous apportons,
                  c&apos;est une formation dans deux des meilleures écoles d&apos;art d&apos;Europe,
                  une maîtrise native des outils IA, et une rigueur créative que l&apos;on retrouve
                  dans chaque livrable — qu&apos;il s&apos;agisse d&apos;une identité de marque
                  ou d&apos;une plateforme web.
                </p>
                <p>
                  Notre taille est notre avantage : vous travaillez directement avec les créateurs,
                  sans intermédaire, sans perte de sens entre le brief et le résultat final.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-12 pl-6 border-l-2 border-primary">
                <p className="font-display font-normal text-xl lg:text-2xl text-foreground leading-snug">
                  &ldquo;Pas une grande agence.<br />Mais la même qualité — sans les frais généraux.&rdquo;
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
              02 &mdash; L&apos;&eacute;quipe
            </p>
            <h2 className="font-display font-normal text-3xl lg:text-4xl leading-tight text-foreground">
              La famille Baudon
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
                  <span className="text-paper/90 font-normal">AI-driven</span> n&apos;est pas un
                  argument marketing — c&apos;est notre réalité quotidienne. Les outils IA nous
                  permettent de compresser les phases chronophages sans sacrifier l&apos;intention
                  créative.
                </p>
                <p>
                  Ce que d&apos;autres studios facturent à travers des heures d&apos;exécution
                  répétitive, nous le résolvons en amont — libérant du temps pour ce qui
                  compte vraiment :{' '}
                  <span className="text-paper/90 font-normal">la réflexion, la création, le dialogue avec le client.</span>
                </p>
                <p>
                  C&apos;est pourquoi nous pouvons proposer une qualité de conception exigeante
                  à des tarifs qui n&apos;ont rien à voir avec ceux d&apos;une agence traditionnelle.
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
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">Bruxelles &middot; 2024</span>
          </div>
        </div>
      </section>
    </>
  );
}
