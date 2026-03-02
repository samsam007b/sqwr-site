'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from '@/app/data/projects';

const COPPER = '#B8956A';
const COPPER_DARK = '#8B6F47';
const BEIGE = '#fdfbf7';

const palette = [
  { name: 'Fond global', hex: '#fdfbf7', label: 'Beige blanc chaud' },
  { name: 'Texte principal', hex: '#4a3a24', label: 'Brun profond' },
  { name: 'Cuivre signature', hex: '#B8956A', label: 'CTA & accents' },
  { name: 'Cuivre moyen', hex: '#8B6F47', label: 'Texte secondaire' },
  { name: 'Beige ornement', hex: '#E8DCC4', label: 'Séparateurs' },
  { name: 'Mineral sage', hex: '#8aab8a', label: 'Accent végétal' },
];

const features = [
  {
    label: 'Design system premium',
    description: 'Palette cuivre × beige × mineral, curseur personnalisé et glassmorphism sur le header.',
  },
  {
    label: 'Multilingue FR/NL/EN/IT',
    description: 'Moteur i18n custom de 1 784 lignes, changement de langue sans rechargement de page.',
  },
  {
    label: 'Animations orchestrées',
    description: 'Entrées scroll progressives, ornements animés et transitions cubic-bezier premium.',
  },
  {
    label: '100 % statique + Vercel',
    description: 'Zéro dépendance npm, headers de sécurité (CSP, SRI, HSTS), ultra-rapide.',
  },
];

const fonts = [
  { name: 'Cormorant Garamond', role: 'Hero display & citations poétiques', style: 'italic' },
  { name: 'Playfair Display', role: 'Titres de sections H2 – H4', style: 'normal' },
  { name: 'DM Sans', role: 'Corps, boutons, navigation', style: 'normal' },
  { name: 'Cinzel', role: 'Labels eyebrows en petites capitales', style: 'normal' },
];

function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.15]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
    </div>
  );
}

export default function NanouPage() {
  const project = projects.find((p) => p.id === 'nanou')!;
  const projectIndex = projects.findIndex((p) => p.id === 'nanou');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-20 lg:pb-32 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-[1.15]">
          <Image
            src="/projet-nanou/hero.png"
            alt="Massages & Naissance — homepage"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f0f]/80 via-[#2a1f0f]/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 pt-32"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
            >
              <span className="mr-2">←</span>
              Retour
            </Link>
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-[0.2em] mb-6"
              style={{ color: COPPER }}
            >
              WEB DESIGN · 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-display font-normal leading-[0.95] mb-6 text-white"
            >
              Massages &<br />Naissance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl text-white/60 font-light"
            >
              Site vitrine · Nanou Mendels · Bruxelles
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECT DETAILS ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  Le projet
                </p>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  Un site vitrine 7 pages pour Nanou Mendels — praticienne en massage, haptonomie
                  et thérapie psycho-corporelle. Design premium sur-mesure, moteur multilingue
                  custom et animations soignées pour une expérience qui reflète la sensibilité
                  du travail de la praticienne.
                </p>
              </ScrollReveal>

              {/* Services */}
              <ScrollReveal delay={0.1}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  Services réalisés
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                  {project.services.map((service, i) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="glass-surface px-8 py-5 rounded-lg"
                    >
                      <p className="font-light text-foreground">{service}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Features */}
              <ScrollReveal delay={0.15}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  Points forts
                </p>
                <div className="space-y-4 mb-16">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="glass-surface rounded-xl px-8 py-6 flex gap-6 items-start"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: COPPER }}
                      />
                      <div>
                        <p className="font-medium text-foreground mb-1">{f.label}</p>
                        <p className="text-sm text-secondary/60 font-light leading-relaxed">{f.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Impact */}
              <ScrollReveal delay={0.2}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  Impact
                </p>
                <p className="text-lg text-secondary/70 leading-relaxed font-light mb-8">
                  {project.impact}
                </p>
                <a
                  href="https://massages-et-naissance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[0.15em] hover:opacity-70 transition-opacity duration-300"
                  style={{ color: COPPER }}
                >
                  Voir le site live
                  <span>↗</span>
                </a>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.3}>
                <div className="glass-surface p-10 rounded-2xl sticky top-32">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-10">
                    Détails
                  </p>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Client</p>
                      <p className="text-lg font-display text-foreground">Nanou Mendels</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Année</p>
                      <p className="text-lg font-display text-foreground">2025</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Stack</p>
                      <p className="text-lg font-display text-foreground">HTML · Tailwind · Vanilla JS</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Langues</p>
                      <p className="text-lg font-display text-foreground">FR · NL · EN · IT</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        Couleur signature
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: COPPER }} />
                        <p className="text-sm font-mono text-secondary/60">{COPPER}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DESKTOP FULLPAGE ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] mb-12" style={{ color: COPPER_DARK }}>
              Vue d&apos;ensemble
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ aspectRatio: '1440/3000' }}
            >
              <Image
                src="/projet-nanou/web-01.png"
                alt="Massages & Naissance — homepage complète"
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── DESKTOP SCREENS ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              Pages intérieures
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: '/projet-nanou/web-02.png', alt: 'Page prestations' },
              { src: '/projet-nanou/web-03.png', alt: 'Page contact' },
            ].map((img, i) => (
              <ScrollReveal key={img.src} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl grain-overlay"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MOBILE + COLOR SYSTEM ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#4a3a24' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] mb-16" style={{ color: COPPER }}>
              Mobile · Design responsive
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Two mobile phones */}
            <div className="flex gap-6 justify-center">
              {[
                { src: '/projet-nanou/mobile-01.png', alt: 'Homepage mobile', delay: 0 },
                { src: '/projet-nanou/mobile-02.png', alt: 'Prestations mobile', delay: 1.5 },
              ].map((phone) => (
                <motion.div
                  key={phone.src}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: phone.delay }}
                  className="relative w-[45%] drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
                  style={{ perspective: '1000px' }}
                >
                  <div className="relative aspect-[9/19.5]">
                    <Image
                      src={phone.src}
                      alt={phone.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Color palette */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-8" style={{ color: COPPER }}>
                Palette de couleurs
              </p>
              <div className="grid grid-cols-2 gap-3">
                {palette.map((c, i) => (
                  <ScrollReveal key={c.hex} delay={i * 0.06}>
                    <div className="rounded-xl overflow-hidden">
                      <div className="h-14" style={{ backgroundColor: c.hex }} />
                      <div className="px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <p className="text-sm font-display text-white/90 mb-0.5">{c.name}</p>
                        <p className="text-xs font-mono" style={{ color: COPPER }}>{c.hex}</p>
                        <p className="text-xs text-white/40">{c.label}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHY & BRAND ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: BEIGE }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: COPPER_DARK }}>
                  Typographie
                </p>
                <ParallaxImage
                  src="/projet-nanou/typography-specimen.png"
                  alt="Nanou — specimen typographique"
                  className="aspect-[16/10] rounded-2xl mb-6"
                />
                <div className="space-y-3">
                  {fonts.map((f) => (
                    <div key={f.name} className="flex items-baseline gap-4">
                      <p className="text-sm font-display" style={{ color: '#4a3a24', fontStyle: f.style as 'normal' | 'italic' }}>
                        {f.name}
                      </p>
                      <p className="text-xs font-mono" style={{ color: COPPER_DARK }}>{f.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: COPPER_DARK }}>
                  Color system
                </p>
                <ParallaxImage
                  src="/projet-nanou/color-system.png"
                  alt="Nanou — color system"
                  className="aspect-[16/10] rounded-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              Un site qui vous ressemble ?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              Design premium, développement sur-mesure, livraison rapide — pour les indépendants qui veulent une présence digitale à leur hauteur.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 text-paper hover:opacity-80 transition-opacity duration-300 rounded-xl text-lg"
              style={{ backgroundColor: COPPER }}
            >
              Démarrer une conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PREV / NEXT ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              Autres projets
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal delay={0.1}>
              <Link href={`/portfolio/${prevProject.id}`} className="group block">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">← Précédent</p>
                <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                  {prevProject.title}
                </h3>
                <p className="text-secondary/60 font-light">{prevProject.client}</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link href={`/portfolio/${nextProject.id}`} className="group block text-right">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Suivant →</p>
                <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                  {nextProject.title}
                </h3>
                <p className="text-secondary/60 font-light">{nextProject.client}</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
