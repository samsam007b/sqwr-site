'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

const COPPER = '#B8956A';
const COPPER_DARK = '#8B6F47';
const BEIGE = '#fdfbf7';

const paletteBase = [
  { key: 'fond', hex: '#fdfbf7' },
  { key: 'texte', hex: '#4a3a24' },
  { key: 'cuivre', hex: '#B8956A' },
  { key: 'cuivreMoyen', hex: '#8B6F47' },
  { key: 'beigeOrnement', hex: '#E8DCC4' },
  { key: 'mineral', hex: '#8aab8a' },
];

const paletteLabels: Record<string, Record<string, { name: string; label: string }>> = {
  fr: {
    fond: { name: 'Fond global', label: 'Beige blanc chaud' },
    texte: { name: 'Texte principal', label: 'Brun profond' },
    cuivre: { name: 'Cuivre signature', label: 'CTA & accents' },
    cuivreMoyen: { name: 'Cuivre moyen', label: 'Texte secondaire' },
    beigeOrnement: { name: 'Beige ornement', label: 'Séparateurs' },
    mineral: { name: 'Mineral sage', label: 'Accent végétal' },
  },
  en: {
    fond: { name: 'Global background', label: 'Warm off-white' },
    texte: { name: 'Main text', label: 'Deep brown' },
    cuivre: { name: 'Signature copper', label: 'CTA & accents' },
    cuivreMoyen: { name: 'Medium copper', label: 'Secondary text' },
    beigeOrnement: { name: 'Ornament beige', label: 'Separators' },
    mineral: { name: 'Mineral sage', label: 'Vegetal accent' },
  },
  nl: {
    fond: { name: 'Globale achtergrond', label: 'Warm gebroken wit' },
    texte: { name: 'Hoofdtekst', label: 'Diep bruin' },
    cuivre: { name: 'Signatuur koper', label: 'CTA & accenten' },
    cuivreMoyen: { name: 'Medium koper', label: 'Secundaire tekst' },
    beigeOrnement: { name: 'Ornament beige', label: 'Scheidingslijnen' },
    mineral: { name: 'Mineral sage', label: 'Plantaardig accent' },
  },
  de: {
    fond: { name: 'Globaler Hintergrund', label: 'Warmes Naturweiß' },
    texte: { name: 'Haupttext', label: 'Tiefes Braun' },
    cuivre: { name: 'Signatur-Kupfer', label: 'CTA & Akzente' },
    cuivreMoyen: { name: 'Mittleres Kupfer', label: 'Sekundärtext' },
    beigeOrnement: { name: 'Ornament-Beige', label: 'Trennlinien' },
    mineral: { name: 'Mineral Sage', label: 'Pflanzlicher Akzent' },
  },
};

const featuresData: Record<string, Array<{ label: string; description: string }>> = {
  fr: [
    { label: 'Design system premium', description: 'Palette cuivre × beige × mineral, curseur personnalisé et glassmorphism sur le header.' },
    { label: 'Multilingue FR/NL/EN/IT', description: 'Moteur i18n custom de 1 784 lignes, changement de langue sans rechargement de page.' },
    { label: 'Animations orchestrées', description: 'Entrées scroll progressives, ornements animés et transitions cubic-bezier premium.' },
    { label: '100 % statique + Vercel', description: 'Zéro dépendance npm, headers de sécurité (CSP, SRI, HSTS), ultra-rapide.' },
  ],
  en: [
    { label: 'Premium design system', description: 'Copper × beige × mineral palette, custom cursor and glassmorphism on the header.' },
    { label: 'Multilingual FR/NL/EN/IT', description: 'Custom i18n engine of 1,784 lines, language change without page reload.' },
    { label: 'Orchestrated animations', description: 'Progressive scroll entries, animated ornaments and premium cubic-bezier transitions.' },
    { label: '100% static + Vercel', description: 'Zero npm dependencies, security headers (CSP, SRI, HSTS), ultra-fast.' },
  ],
  nl: [
    { label: 'Premium ontwerpsysteem', description: 'Koper × beige × mineral palet, aangepaste cursor en glassmorphism op de header.' },
    { label: 'Meertalig FR/NL/EN/IT', description: 'Aangepaste i18n-motor van 1.784 regels, taalwissel zonder pagina herladen.' },
    { label: 'Georchestreerde animaties', description: 'Progressieve scroll-invoer, geanimeerde ornamenten en premium cubic-bezier overgangen.' },
    { label: '100% statisch + Vercel', description: 'Nul npm-afhankelijkheden, beveiligingsheaders (CSP, SRI, HSTS), ultra-snel.' },
  ],
  de: [
    { label: 'Premium-Designsystem', description: 'Kupfer × Beige × Mineral-Palette, benutzerdefinierter Cursor und Glassmorphism im Header.' },
    { label: 'Mehrsprachig FR/NL/EN/IT', description: 'Benutzerdefinierte i18n-Engine mit 1.784 Zeilen, Sprachwechsel ohne Seitenneuladung.' },
    { label: 'Orchestrierte Animationen', description: 'Progressive Scroll-Einträge, animierte Ornamente und Premium-Cubic-Bezier-Übergänge.' },
    { label: '100% statisch + Vercel', description: 'Null npm-Abhängigkeiten, Sicherheits-Header (CSP, SRI, HSTS), ultra-schnell.' },
  ],
};

const fontsData: Record<string, Array<{ name: string; role: string; style: string }>> = {
  fr: [
    { name: 'Cormorant Garamond', role: 'Hero display & citations poétiques', style: 'italic' },
    { name: 'Playfair Display', role: 'Titres de sections H2 – H4', style: 'normal' },
    { name: 'DM Sans', role: 'Corps, boutons, navigation', style: 'normal' },
    { name: 'Cinzel', role: 'Labels eyebrows en petites capitales', style: 'normal' },
  ],
  en: [
    { name: 'Cormorant Garamond', role: 'Hero display & poetic quotes', style: 'italic' },
    { name: 'Playfair Display', role: 'Section headings H2 – H4', style: 'normal' },
    { name: 'DM Sans', role: 'Body, buttons, navigation', style: 'normal' },
    { name: 'Cinzel', role: 'Eyebrow labels in small caps', style: 'normal' },
  ],
  nl: [
    { name: 'Cormorant Garamond', role: 'Hero display & poëtische citaten', style: 'italic' },
    { name: 'Playfair Display', role: 'Sectietitels H2 – H4', style: 'normal' },
    { name: 'DM Sans', role: 'Broodtekst, knoppen, navigatie', style: 'normal' },
    { name: 'Cinzel', role: 'Eyebrow labels in kleine kapitalen', style: 'normal' },
  ],
  de: [
    { name: 'Cormorant Garamond', role: 'Hero-Display & poetische Zitate', style: 'italic' },
    { name: 'Playfair Display', role: 'Abschnittsüberschriften H2 – H4', style: 'normal' },
    { name: 'DM Sans', role: 'Fließtext, Schaltflächen, Navigation', style: 'normal' },
    { name: 'Cinzel', role: 'Eyebrow-Labels in Kapitälchen', style: 'normal' },
  ],
};

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

export default function NanouContent() {
  const { t, locale } = useLanguage();
  const project = projects.find((p) => p.id === 'nanou')!;
  const projectIndex = projects.findIndex((p) => p.id === 'nanou');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const localeKey = locale as keyof typeof paletteLabels;
  const palette = paletteBase.map((c) => ({
    ...c,
    ...(paletteLabels[localeKey]?.[c.key] ?? paletteLabels.fr[c.key]),
  }));
  const features = featuresData[localeKey] ?? featuresData.fr;
  const fonts = fontsData[localeKey] ?? fontsData.fr;

  // Localized project content
  const localeData = locale !== 'fr' ? project.translations?.[locale as 'en' | 'nl' | 'de'] : null;
  const impact = localeData?.impact ?? project.impact;

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
              {t('portfolioDetail.back')}
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
              {t('nanou.categoryTag')}
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
              {t('nanou.subtitle')}
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
                  {t('portfolioDetail.theProject')}
                </p>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  {t('nanou.projectDescription')}
                </p>
              </ScrollReveal>

              {/* Services */}
              <ScrollReveal delay={0.1}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('portfolioDetail.servicesPerformed')}
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
                  {t('portfolioDetail.highlights')}
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
                  {t('portfolioDetail.impact')}
                </p>
                <p className="text-lg text-secondary/70 leading-relaxed font-light mb-8">
                  {impact}
                </p>
                <a
                  href="https://massages-et-naissance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[0.15em] hover:opacity-70 transition-opacity duration-300"
                  style={{ color: COPPER }}
                >
                  {t('portfolioDetail.viewLiveSite')}
                  <span>↗</span>
                </a>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.3}>
                <div className="glass-surface p-10 rounded-2xl sticky top-32">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-10">
                    {t('portfolioDetail.details')}
                  </p>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.client')}</p>
                      <p className="text-lg font-display text-foreground">Nanou Mendels</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.year')}</p>
                      <p className="text-lg font-display text-foreground">2025</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.stack')}</p>
                      <p className="text-lg font-display text-foreground">HTML · Tailwind · Vanilla JS</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.languages')}</p>
                      <p className="text-lg font-display text-foreground">FR · NL · EN · IT</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.signatureColor')}
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
              {t('nanou.overview')}
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
              {t('nanou.innerPages')}
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
              {t('nanou.mobileResponsive')}
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
                {t('portfolioDetail.colorPalette')}
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
                  {t('portfolioDetail.typography')}
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
                  {t('portfolioDetail.colorSystem')}
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
              {t('nanou.ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('nanou.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 text-paper hover:opacity-80 transition-opacity duration-300 rounded-xl text-lg"
              style={{ backgroundColor: COPPER }}
            >
              {t('portfolioDetail.startConversation')}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PREV / NEXT ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              {t('portfolioDetail.otherProjects')}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal delay={0.1}>
              <Link href={`/portfolio/${prevProject.id}`} className="group block">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">← {t('portfolioDetail.previous')}</p>
                <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                  {prevProject.title}
                </h3>
                <p className="text-secondary/60 font-light">{prevProject.client}</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link href={`/portfolio/${nextProject.id}`} className="group block text-right">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.next')} →</p>
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
