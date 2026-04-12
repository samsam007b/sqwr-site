'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

const OCEAN = '#1B3A4B';
const GOLD = '#B8976A';
const CREAM = '#FAFAF7';
const TURQUOISE = '#5CBDBD';

const paletteBase = [
  { name: 'Cream', hex: '#FAFAF7' },
  { name: 'Ivory', hex: '#F5F0E8' },
  { name: 'Stone', hex: '#8B7D6B' },
  { name: 'Wood', hex: '#C4956A' },
  { name: 'Ocean', hex: '#1B3A4B' },
  { name: 'Turquoise', hex: '#5CBDBD' },
  { name: 'Gold', hex: '#B8976A' },
  { name: 'Charcoal', hex: '#2D2926' },
];

const paletteLabels: Record<string, string[]> = {
  fr: ['Fonds clairs (murs blancs à la chaux)', 'Textures chaudes (linge, nappes)', 'Pierre volcanique — textes secondaires', 'Bois naturel — éléments décoratifs', 'Sections immersives, boutons hover', 'Accent marin, détails interactifs', 'Icônes Pano di Terra, séparateurs', 'Texte principal, footer'],
  en: ['Light backgrounds (whitewashed walls)', 'Warm textures (linens, tablecloths)', 'Volcanic stone — secondary text', 'Natural wood — decorative elements', 'Immersive sections, hover buttons', 'Marine accent, interactive details', 'Pano di Terra icons, separators', 'Main text, footer'],
  nl: ['Lichte achtergronden (witgekalkte muren)', 'Warme texturen (linnen, tafellakens)', 'Vulkanische steen — secundaire tekst', 'Natuurlijk hout — decoratieve elementen', 'Immersieve secties, hover-knoppen', 'Mariene accent, interactieve details', 'Pano di Terra iconen, scheidingen', 'Hoofdtekst, footer'],
  de: ['Helle Hintergründe (weißgetünchte Wände)', 'Warme Texturen (Leinen, Tischdecken)', 'Vulkanischer Stein — Sekundärtext', 'Naturholz — dekorative Elemente', 'Immersive Bereiche, Hover-Schaltflächen', 'Mariner Akzent, interaktive Details', 'Pano di Terra Symbole, Trennlinien', 'Haupttext, Footer'],
};

const featuresData: Record<string, Array<{ label: string; description: string }>> = {
  fr: [
    { label: 'Identité de marque complète', description: 'Color system 8 couleurs, typographie 2 polices (Cormorant Garamond + Source Sans 3), système d\'espacement fluide et composants UI — une identité cohérente du concept jusqu\'à la page de réservation.' },
    { label: 'Icônes Pano di Terra — 100 % exclusives', description: '20 icônes dessinées à la main, inspirées du Pano di Terra, le textile traditionnel capverdien. Zéro librairie générique, zéro dépendance npm supplémentaire. Une signature visuelle qu\'aucun concurrent ne peut reproduire.' },
    { label: 'Multilingue 5 langues', description: 'FR · EN · DE · NL · PT — internationalisation complète via next-intl. Changement de langue sans rechargement, textes soignés pour chaque marché européen cible.' },
    { label: 'Cartes interactives géolocalisées', description: 'Carte des expériences entièrement interactive avec markers géolocalisés par activité, vue monde positionnant São Vicente dans l\'Atlantique, et carte des accès depuis les principaux aéroports européens.' },
  ],
  en: [
    { label: 'Complete brand identity', description: '8-colour system, 2-font typography (Cormorant Garamond + Source Sans 3), fluid spacing system and UI components — a coherent identity from concept to booking page.' },
    { label: 'Pano di Terra icons — 100% exclusive', description: '20 hand-drawn icons, inspired by Pano di Terra, the traditional Cape Verdean textile. Zero generic library, zero additional npm dependency. A visual signature no competitor can reproduce.' },
    { label: 'Multilingual 5 languages', description: 'FR · EN · DE · NL · PT — full internationalisation via next-intl. Language change without reload, carefully crafted text for each European target market.' },
    { label: 'Geolocated interactive maps', description: 'Fully interactive experience map with activity-geolocated markers, world view positioning São Vicente in the Atlantic, and access map from major European airports.' },
  ],
  nl: [
    { label: 'Complete merkidentiteit', description: '8-kleurensysteem, 2-lettertype typografie (Cormorant Garamond + Source Sans 3), vloeiend afstandssysteem en UI-componenten — een coherente identiteit van concept tot reserveringspagina.' },
    { label: 'Pano di Terra iconen — 100% exclusief', description: '20 met de hand getekende iconen, geïnspireerd op de Pano di Terra, het traditionele Kaapverdische textiel. Nul generieke bibliotheek, nul extra npm-afhankelijkheid. Een visuele handtekening die geen concurrent kan reproduceren.' },
    { label: 'Meertalig 5 talen', description: 'FR · EN · DE · NL · PT — volledige internationalisering via next-intl. Taalwissel zonder herladen, zorgvuldig vervaardigde tekst voor elke Europese doelmarkt.' },
    { label: 'Geogelokaliseerde interactieve kaarten', description: 'Volledig interactieve ervaringskaart met activiteitsgeogelokaliseerde markers, wereldweergave die São Vicente in de Atlantische Oceaan positioneert, en toegangskaart van belangrijke Europese luchthavens.' },
  ],
  de: [
    { label: 'Vollständige Markenidentität', description: '8-Farb-System, 2-Schriftart-Typografie (Cormorant Garamond + Source Sans 3), fließendes Abstandssystem und UI-Komponenten — eine kohärente Identität vom Konzept bis zur Buchungsseite.' },
    { label: 'Pano di Terra Symbole — 100% exklusiv', description: '20 handgezeichnete Symbole, inspiriert vom Pano di Terra, dem traditionellen kapverdischen Textil. Null generische Bibliothek, null zusätzliche npm-Abhängigkeit. Eine visuelle Signatur, die kein Wettbewerber reproduzieren kann.' },
    { label: 'Mehrsprachig 5 Sprachen', description: 'FR · EN · DE · NL · PT — vollständige Internationalisierung über next-intl. Sprachwechsel ohne Nachladen, sorgfältig ausgearbeitete Texte für jeden europäischen Zielmarkt.' },
    { label: 'Geolokalisierte interaktive Karten', description: 'Vollständig interaktive Erlebniskarte mit aktivitätsgeolokalisierter Marker, Weltansicht, die São Vicente im Atlantik positioniert, und Zugangskarte von wichtigen europäischen Flughäfen.' },
  ],
};

const fontsData: Record<string, Array<{ name: string; role: string; style: string }>> = {
  fr: [
    { name: 'Cormorant Garamond', role: 'Titres display & textes poétiques', style: 'italic' },
    { name: 'Source Sans 3', role: 'Corps de texte, boutons, navigation', style: 'normal' },
  ],
  en: [
    { name: 'Cormorant Garamond', role: 'Display headings & poetic texts', style: 'italic' },
    { name: 'Source Sans 3', role: 'Body text, buttons, navigation', style: 'normal' },
  ],
  nl: [
    { name: 'Cormorant Garamond', role: 'Display titels & poëtische teksten', style: 'italic' },
    { name: 'Source Sans 3', role: 'Broodtekst, knoppen, navigatie', style: 'normal' },
  ],
  de: [
    { name: 'Cormorant Garamond', role: 'Display-Überschriften & poetische Texte', style: 'italic' },
    { name: 'Source Sans 3', role: 'Fließtext, Schaltflächen, Navigation', style: 'normal' },
  ],
};

const iconLabels: Record<string, string[]> = {
  fr: ['Suite mer', 'Suite jardin', 'Suite soleil', 'Observation', 'Expérience', 'Expérience', 'Santo Antão', 'Mindelo', 'Suite framboise'],
  en: ['Sea suite', 'Garden suite', 'Sun suite', 'Observation', 'Experience', 'Experience', 'Santo Antão', 'Mindelo', 'Raspberry suite'],
  nl: ['Zee suite', 'Tuin suite', 'Zon suite', 'Observatie', 'Ervaring', 'Ervaring', 'Santo Antão', 'Mindelo', 'Framboos suite'],
  de: ['Meeressuite', 'Gartensuite', 'Sonnensuite', 'Beobachtung', 'Erlebnis', 'Erlebnis', 'Santo Antão', 'Mindelo', 'Himbeersuite'],
};

const statsIconLabels: Record<string, string[]> = {
  fr: ['icônes custom', 'dépendances npm', 'fichier source'],
  en: ['custom icons', 'npm dependencies', 'source file'],
  nl: ['aangepaste iconen', 'npm-afhankelijkheden', 'bronbestand'],
  de: ['benutzerdefinierte Symbole', 'npm-Abhängigkeiten', 'Quelldatei'],
};

const statsMapLabels: Record<string, string[]> = {
  fr: ['marqueurs actifs', 'île SVG custom', 'interactions'],
  en: ['active markers', 'custom SVG island', 'interactions'],
  nl: ['actieve markers', 'aangepast SVG-eiland', 'interacties'],
  de: ['aktive Marker', 'benutzerdefinierte SVG-Insel', 'Interaktionen'],
};

// ── Icônes Pano di Terra (SVG inline, extraites de PanoDiTerraIcons.tsx) ──
function IconShell({ name, label, children }: { name: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-xl"
        style={{ backgroundColor: 'rgba(27,58,75,0.06)', color: GOLD }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {children}
        </svg>
      </div>
      <div className="text-center">
        <p className="text-xs font-mono uppercase tracking-[0.1em]" style={{ color: OCEAN }}>
          {name}
        </p>
        <p className="text-[11px] font-light mt-0.5" style={{ color: '#8B7D6B' }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

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

export default function VillaColadeiraContent() {
  const { t, locale } = useLanguage();
  const project = projects.find((p) => p.id === 'villa-coladeira')!;
  const projectIndex = projects.findIndex((p) => p.id === 'villa-coladeira');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const localeKey = locale as keyof typeof paletteLabels;
  const palette = paletteBase.map((c, i) => ({
    ...c,
    label: (paletteLabels[localeKey] ?? paletteLabels.fr)[i],
  }));
  const features = featuresData[localeKey] ?? featuresData.fr;
  const fonts = fontsData[localeKey] ?? fontsData.fr;
  const currentIconLabels = iconLabels[localeKey] ?? iconLabels.fr;
  const currentStatsIconLabels = statsIconLabels[localeKey] ?? statsIconLabels.fr;
  const currentStatsMapLabels = statsMapLabels[localeKey] ?? statsMapLabels.fr;

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
            src="/projet-villa-coladeira/pool-seaview.jpg"
            alt="Villa Coladeira — piscine vue mer, São Vicente"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f2b]/85 via-[#0d1f2b]/30 to-transparent" />
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
              style={{ color: GOLD }}
            >
              {t('villaColadeira.categoryTag')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-display font-normal leading-[0.95] mb-6 text-white"
            >
              Villa<br />Coladeira
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl text-white/60 font-light"
            >
              {t('villaColadeira.subtitle')}
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
                  {t('villaColadeira.projectDescription')}
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
                  {t('villaColadeira.uniqueTitle')}
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
                        style={{ backgroundColor: GOLD }}
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
                <p className="text-lg text-secondary/70 leading-relaxed font-light">
                  {impact}
                </p>
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
                      <p className="text-lg font-display text-foreground">Villa Coladeira</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.locationLabel')}</p>
                      <p className="text-lg font-display text-foreground">{t('villaColadeira.locationValue')}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.year')}</p>
                      <p className="text-lg font-display text-foreground">2025</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.stack')}</p>
                      <p className="text-lg font-display text-foreground">Next.js · next-intl · Framer Motion</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.languages')}</p>
                      <p className="text-lg font-display text-foreground">FR · EN · DE · NL · PT</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.signatureColor')}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: OCEAN }} />
                        <p className="text-sm font-mono text-secondary/60">{OCEAN}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VUE D'ENSEMBLE ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] mb-12" style={{ color: '#6B6157' }}>
              {t('villaColadeira.webHomepage')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src="/projet-villa-coladeira/web-site-01.png"
                alt="Villa Coladeira — homepage, design cinématique avec header et héro"
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── GALERIE ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              {t('villaColadeira.webPages')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: '/projet-villa-coladeira/web-site-02.png', alt: 'Page chambres — Suite Carmim, lit framboise et vue mer' },
              { src: '/projet-villa-coladeira/web-site-03.png', alt: 'Page expériences — carte interactive São Vicente avec marqueurs Pano di Terra' },
            ].map((img, i) => (
              <ScrollReveal key={img.src} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg"
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

      {/* ─── COLOR SYSTEM ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#F5F5F3' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: '#8B7D6B' }}>
              {t('portfolioDetail.colorSystem')}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-light mb-4 leading-tight" style={{ color: OCEAN }}>
              {t('villaColadeira.colorSystemTitle').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="font-light mb-16 max-w-xl leading-relaxed" style={{ color: '#8B7D6B' }}>
              {t('villaColadeira.colorSystemDescription')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {palette.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.05}>
                <div className="rounded-xl overflow-hidden border border-black/5">
                  <div className="h-16" style={{ backgroundColor: c.hex }} />
                  <div className="px-4 py-3" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                    <p className="text-sm font-display mb-0.5" style={{ color: OCEAN }}>{c.name}</p>
                    <p className="text-xs font-mono" style={{ color: GOLD }}>{c.hex}</p>
                    <p className="text-[11px] leading-relaxed mt-1" style={{ color: '#A89B8C' }}>{c.label}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ICÔNES PANO DI TERRA ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Explication */}
            <ScrollReveal>
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: '#6B6157' }}>
                {t('villaColadeira.iconSystem')}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-light leading-tight mb-8" style={{ color: OCEAN }}>
                {t('villaColadeira.iconSystemTitle').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-secondary/70 font-light leading-relaxed mb-6">
                {t('villaColadeira.iconSystemDesc1')}
              </p>
              <p className="text-secondary/70 font-light leading-relaxed mb-8">
                {t('villaColadeira.iconSystemDesc2')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '20', label: currentStatsIconLabels[0] },
                  { value: '0', label: currentStatsIconLabels[1] },
                  { value: '1', label: currentStatsIconLabels[2] },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center py-5 px-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(27,58,75,0.06)' }}
                  >
                    <p className="text-3xl font-display font-light mb-1" style={{ color: OCEAN }}>
                      {stat.value}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-[0.08em]" style={{ color: '#8B7D6B' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Icônes grid 3×3 */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-3 gap-6">
                {/* Suites */}
                <IconShell name="Ondas" label={currentIconLabels[0]}>
                  <path d="M2,8 Q5,5 8,8 Q11,11 14,8 Q17,5 20,8 L22,8" />
                  <path d="M2,13 Q5,10 8,13 Q11,16 14,13 Q17,10 20,13 L22,13" />
                  <path d="M2,18 Q5,15 8,18 Q11,21 14,18 Q17,15 20,18 L22,18" />
                </IconShell>

                <IconShell name="Jardim" label={currentIconLabels[1]}>
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12,2 L14,6 L12,10 L10,6 Z" />
                  <path d="M20.5,7 L17,9.5 L13.5,7 L17,4.5 Z" />
                  <path d="M20.5,17 L17,14.5 L13.5,17 L17,19.5 Z" />
                  <path d="M12,22 L14,18 L12,14 L10,18 Z" />
                  <path d="M3.5,17 L7,14.5 L10.5,17 L7,19.5 Z" />
                  <path d="M3.5,7 L7,9.5 L10.5,7 L7,4.5 Z" />
                </IconShell>

                <IconShell name="Açafrão" label={currentIconLabels[2]}>
                  <path d="M12,8 L16,12 L12,16 L8,12 Z" />
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="22" y2="12" />
                  <line x1="5" y1="5" x2="8.5" y2="8.5" />
                  <line x1="15.5" y1="15.5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="15.5" y2="8.5" />
                  <line x1="8.5" y1="15.5" x2="5" y2="19" />
                </IconShell>

                {/* Expériences */}
                <IconShell name="Tortues" label={currentIconLabels[3]}>
                  <path d="M12,5 L18,12 L12,19 L6,12 Z" />
                  <line x1="9" y1="8.5" x2="15" y2="8.5" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="9" y1="15.5" x2="15" y2="15.5" />
                  <path d="M12,5 L12,2.5" />
                  <circle cx="12" cy="2" r="1" />
                  <line x1="7" y1="9" x2="4" y2="7" />
                  <line x1="17" y1="9" x2="20" y2="7" />
                  <line x1="7" y1="15" x2="4" y2="17" />
                  <line x1="17" y1="15" x2="20" y2="17" />
                </IconShell>

                <IconShell name="Windsurf" label={currentIconLabels[4]}>
                  <path d="M10,3 L10,16 L18,14 Z" />
                  <line x1="10" y1="3" x2="10" y2="18" />
                  <path d="M5,18 L19,18 Q21,18 20,17" />
                  <path d="M2,21 Q5,19 8,21 Q11,23 14,21 Q17,19 20,21 L22,21" />
                  <line x1="14" y1="5" x2="20" y2="5" />
                  <line x1="15" y1="8" x2="22" y2="8" />
                </IconShell>

                <IconShell name="Plongée" label={currentIconLabels[5]}>
                  <path d="M5,8 L19,8 L19,14 L13,14 L12,16 L11,14 L5,14 Z" />
                  <rect x="6.5" y="9.5" width="4" height="3" rx="0.5" />
                  <rect x="13.5" y="9.5" width="4" height="3" rx="0.5" />
                  <line x1="10.5" y1="11" x2="13.5" y2="11" />
                  <circle cx="16" cy="4" r="1" />
                  <circle cx="19" cy="2.5" r="0.7" />
                  <circle cx="17.5" cy="6" r="0.5" />
                  <path d="M19,10 L21,10 L21,4" />
                </IconShell>

                {/* Culture & accès */}
                <IconShell name="Randonnée" label={currentIconLabels[6]}>
                  <path d="M1,22 L5,13 L9,22 Z" />
                  <line x1="3.5" y1="17" x2="6.5" y2="17" />
                  <line x1="2" y1="20" x2="8" y2="20" />
                  <path d="M11,22 L17,5 L23,22 Z" />
                  <path d="M15,10 L17,5 L19,10" />
                  <line x1="14" y1="13" x2="20" y2="13" />
                  <line x1="13" y1="17" x2="21" y2="17" />
                  <line x1="1" y1="22" x2="23" y2="22" />
                </IconShell>

                <IconShell name="Carnaval" label={currentIconLabels[7]}>
                  <line x1="12" y1="18" x2="2" y2="12" />
                  <line x1="12" y1="18" x2="4" y2="6" />
                  <line x1="12" y1="18" x2="7.5" y2="2" />
                  <line x1="12" y1="18" x2="12" y2="1" />
                  <line x1="12" y1="18" x2="16.5" y2="2" />
                  <line x1="12" y1="18" x2="20" y2="6" />
                  <line x1="12" y1="18" x2="22" y2="12" />
                  <path d="M2,12 Q1,5 7.5,2 Q12,0.5 16.5,2 Q23,5 22,12" />
                  <rect x="7" y="19" width="10" height="3" rx="1.5" />
                  <circle cx="12" cy="20.5" r="0.8" />
                </IconShell>

                <IconShell name="Carmim" label={currentIconLabels[8]}>
                  <path d="M12,2 L22,12 L12,22 L2,12 Z" />
                  <path d="M12,6 L18,12 L12,18 L6,12 Z" />
                  <path d="M12,10 L14,12 L12,14 L10,12 Z" />
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <line x1="17" y1="7" x2="7" y2="17" />
                </IconShell>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CARTE INTERACTIVE ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Texte gauche */}
            <ScrollReveal className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: '#8B7D6B' }}>
                {t('villaColadeira.interactiveMap')}
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-light leading-tight mb-8" style={{ color: OCEAN }}>
                {t('villaColadeira.mapTitle').split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="font-light leading-relaxed mb-6" style={{ color: '#6B6157' }}>
                {t('villaColadeira.mapDesc1')}
              </p>
              <p className="font-light leading-relaxed mb-12" style={{ color: '#6B6157' }}>
                {t('villaColadeira.mapDesc2')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '12', label: currentStatsMapLabels[0] },
                  { value: '1', label: currentStatsMapLabels[1] },
                  { value: '∞', label: currentStatsMapLabels[2] },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center py-5 px-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(27,58,75,0.06)' }}
                  >
                    <p className="text-3xl font-display font-light mb-1" style={{ color: OCEAN }}>
                      {stat.value}
                    </p>
                    <p className="text-xs font-mono uppercase tracking-[0.08em]" style={{ color: '#8B7D6B' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Screenshot carte droite */}
            <ScrollReveal delay={0.15} className="lg:col-span-7">
              <motion.div
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src="/projet-villa-coladeira/web-site-03.png"
                  alt="Carte interactive des expériences — São Vicente, marqueurs Pano di Terra"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHIE ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              {t('portfolioDetail.typography')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ScrollReveal delay={0.1}>
              <div>
                <div
                  className="aspect-[3/2] rounded-2xl overflow-hidden mb-8 flex items-center justify-center"
                  style={{ backgroundColor: '#F5F0E8' }}
                >
                  <div className="text-center px-8">
                    <p
                      className="text-5xl md:text-6xl font-display font-light leading-tight mb-2"
                      style={{ color: OCEAN, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
                    >
                      Coladeira
                    </p>
                    <p
                      className="text-sm tracking-[0.3em] uppercase"
                      style={{ color: '#8B7D6B', fontFamily: 'Source Sans 3, sans-serif', fontWeight: 300 }}
                    >
                      São Vicente · Cap-Vert
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {fonts.map((f) => (
                    <div key={f.name} className="flex items-baseline gap-4">
                      <p
                        className="text-sm font-display"
                        style={{ color: OCEAN, fontStyle: f.style as 'normal' | 'italic' }}
                      >
                        {f.name}
                      </p>
                      <p className="text-xs font-mono" style={{ color: '#8B7D6B' }}>
                        {f.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <ParallaxImage
                  src="/projet-villa-coladeira/sunset-view.jpg"
                  alt="Villa Coladeira — coucher de soleil sur l'Atlantique"
                  className="aspect-[3/2] rounded-2xl"
                />
                <p className="text-sm text-secondary/50 font-light mt-4 leading-relaxed">
                  {t('villaColadeira.photoCaption')}
                </p>
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
              {t('villaColadeira.ctaTitle').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('villaColadeira.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 text-paper hover:opacity-80 transition-opacity duration-300 rounded-xl text-lg"
              style={{ backgroundColor: OCEAN }}
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
