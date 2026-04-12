'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import DeviceMockup from '@/components/DeviceMockup';
import { projects } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

const rolesBase = [
  { name: 'Searcher', color: '#ffa000', textColor: '#1a1a1a' },
  { name: 'Resident', color: '#e05747', textColor: '#ffffff' },
  { name: 'Owner', color: '#9c5698', textColor: '#ffffff' },
];

const rolesDescriptions: Record<string, string[]> = {
  fr: ['Cherche un co-living', 'Vit dans un co-living', 'Gère ses biens'],
  en: ['Searches for co-living', 'Lives in a co-living', 'Manages their properties'],
  nl: ['Zoekt een co-living', 'Woont in een co-living', 'Beheert zijn eigendommen'],
  de: ['Sucht ein Co-Living', 'Lebt in einem Co-Living', 'Verwaltet sein Eigentum'],
};

const GRADIENT = 'linear-gradient(135deg, #9c5698, #e05747, #ffa000)';

// Parallax wrapper — ties image position to scroll
function ParallaxImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.2]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
    </div>
  );
}

export default function IzzicoContent() {
  const { t, locale } = useLanguage();
  const project = projects.find((p) => p.id === 'izzico')!;
  const projectIndex = projects.findIndex((p) => p.id === 'izzico');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const localeKey = locale as keyof typeof rolesDescriptions;
  const roles = rolesBase.map((r, i) => ({
    ...r,
    description: (rolesDescriptions[localeKey] ?? rolesDescriptions.fr)[i],
  }));

  const localeData = locale !== 'fr' ? project.translations?.[locale as 'en' | 'nl' | 'de'] : null;
  const impact = localeData?.impact ?? project.impact;

  // Hero scroll parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-16 lg:pb-24 overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-[1.15]">
          <Image
            src="/projet-izzico/hero.png"
            alt="izzico — homepage"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </motion.div>

        {/* Back link */}
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

          {/* Title */}
          <motion.div style={{ opacity: heroOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 mb-6"
            >
              {t('izzico.categoryTag')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-9xl font-display font-normal leading-[0.9] mb-6"
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              izzico
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/70 font-light"
            >
              {t('izzico.subtitle')}
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
                  {t('izzico.projectDescription')}
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

              {/* Roles */}
              <ScrollReveal delay={0.15}>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('izzico.rolesTitle')}
                </p>
                <div className="grid grid-cols-3 gap-4 mb-16">
                  {roles.map((role, i) => (
                    <motion.div
                      key={role.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="rounded-xl p-6"
                      style={{ backgroundColor: role.color }}
                    >
                      <p className="text-lg font-display mb-1" style={{ color: role.textColor }}>
                        {role.name}
                      </p>
                      <p className="text-sm font-light" style={{ color: role.textColor, opacity: 0.8 }}>
                        {role.description}
                      </p>
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
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.project')}</p>
                      <p className="text-lg font-display text-foreground">izzico</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.year')}</p>
                      <p className="text-lg font-display text-foreground">2025</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{t('portfolioDetail.stack')}</p>
                      <p className="text-lg font-display text-foreground">Next.js · SwiftUI</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('izzico.signatureGradient')}
                      </p>
                      <div
                        className="h-8 rounded-lg"
                        style={{ background: GRADIENT }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND IDENTITY ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-foreground text-paper overflow-hidden" data-dark-bg>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/40 mb-20">
              {t('izzico.brandIdentity')}
            </p>
          </ScrollReveal>

          {/* Brand overview — parallax */}
          <ScrollReveal delay={0.1}>
            <ParallaxImage
              src="/projet-izzico/brand-overview.png"
              alt="izzico — vue d'ensemble du branding"
              className="aspect-[16/9] rounded-2xl mb-6"
            />
          </ScrollReveal>

          {/* Logo grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { src: '/projet-izzico/logo-primary.svg', alt: 'Logo principal', bg: 'bg-white/5', labelKey: 'izzico.logoLockup' },
              { src: '/projet-izzico/logo-light.svg', alt: 'Logo blanc', bg: '', labelKey: 'izzico.logoLight', gradient: true },
              { src: '/projet-izzico/logo-icon.svg', alt: 'Icône seule', bg: 'bg-white/5', labelKey: 'izzico.logoIcon', icon: true },
              { src: '/projet-izzico/logo-dark.svg', alt: 'Logo noir', bg: 'bg-paper', labelKey: 'izzico.logoDark', dark: true },
            ].map((logo, i) => (
              <ScrollReveal key={logo.src} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className={`relative rounded-2xl flex items-center justify-center aspect-[4/3] overflow-hidden ${logo.bg}`}
                  style={logo.gradient ? { background: GRADIENT } : undefined}
                >
                  <div className={`relative ${logo.icon ? 'w-1/3 h-full' : 'w-3/4 h-full'}`}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="absolute bottom-4 left-4 text-xs font-mono uppercase tracking-[0.15em] opacity-40">
                    {t(logo.labelKey)}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLOR & TYPOGRAPHY ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
                  {t('portfolioDetail.colorSystem')}
                </p>
                <ParallaxImage
                  src="/projet-izzico/color-system.png"
                  alt="izzico — color system v3"
                  className="aspect-[16/10] rounded-2xl"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
                  {t('portfolioDetail.typography')}
                </p>
                <ParallaxImage
                  src="/projet-izzico/typography-specimen.png"
                  alt="izzico — Inter / Nunito / Fredoka"
                  className="aspect-[16/10] rounded-2xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── WEB APP ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-3">
              {t('izzico.webApp')}
            </p>
            <p className="text-4xl md:text-5xl font-display font-normal text-foreground mb-16 leading-tight">
              {t('izzico.webAppSubtitle').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </ScrollReveal>

          {/* Full width first screenshot */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl grain-overlay mb-6"
            >
              <Image
                src="/projet-izzico/web-01.png"
                alt="izzico web app — vue principale"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </ScrollReveal>

          {/* Two smaller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['/projet-izzico/web-02.png', '/projet-izzico/web-03.png'].map((src, i) => (
              <ScrollReveal key={src} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl grain-overlay"
                >
                  <Image
                    src={src}
                    alt={`izzico web app — vue ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── iOS APP ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-40 bg-foreground overflow-hidden" data-dark-bg>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/40 mb-3">
              {t('izzico.iosApp')}
            </p>
            <p className="text-4xl md:text-5xl font-display font-normal text-paper mb-4 leading-tight">
              {t('izzico.swiftUINative')}
            </p>
            <p className="text-lg text-paper/50 font-light mb-20">
              {t('izzico.iosSubtitle')}
            </p>
          </ScrollReveal>

          {/* Three iPhones with staggered float */}
          <div className="grid grid-cols-3 gap-6 lg:gap-10 items-end">
            {/* Left phone — Resident */}
            <ScrollReveal delay={0.1}>
              <div>
                <DeviceMockup
                  src="/projet-izzico/ios-01.png"
                  alt="izzico iOS — Resident Dashboard"
                  floatDelay={0}
                  floatAmplitude={12}
                  className="w-full"
                  sizes="(max-width: 768px) 33vw, 22vw"
                />
                <div className="mt-6 text-center">
                  <div
                    className="inline-block w-2 h-2 rounded-full mb-2"
                    style={{ backgroundColor: '#e05747' }}
                  />
                  <p className="text-xs font-mono text-paper/40 uppercase tracking-[0.15em]">
                    Resident
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Center phone — Owner (raised) */}
            <ScrollReveal delay={0.05}>
              <div className="-mt-12">
                <DeviceMockup
                  src="/projet-izzico/ios-02.png"
                  alt="izzico iOS — Owner Portfolio"
                  floatDelay={1.5}
                  floatAmplitude={16}
                  className="w-full"
                  sizes="(max-width: 768px) 33vw, 22vw"
                />
                <div className="mt-6 text-center">
                  <div
                    className="inline-block w-2 h-2 rounded-full mb-2"
                    style={{ backgroundColor: '#9c5698' }}
                  />
                  <p className="text-xs font-mono text-paper/40 uppercase tracking-[0.15em]">
                    Owner
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right phone — Owner Gestion */}
            <ScrollReveal delay={0.2}>
              <div>
                <DeviceMockup
                  src="/projet-izzico/ios-03.png"
                  alt="izzico iOS — Owner Gestion"
                  floatDelay={3}
                  floatAmplitude={10}
                  className="w-full"
                  sizes="(max-width: 768px) 33vw, 22vw"
                />
                <div className="mt-6 text-center">
                  <div
                    className="inline-block w-2 h-2 rounded-full mb-2"
                    style={{ backgroundColor: '#9c5698' }}
                  />
                  <p className="text-xs font-mono text-paper/40 uppercase tracking-[0.15em]">
                    Owner
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight text-foreground">
              {t('izzico.ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/60 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('izzico.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-foreground text-paper hover:opacity-80 transition-opacity duration-300 rounded-xl text-lg"
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
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                  ← {t('portfolioDetail.previous')}
                </p>
                <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                  {prevProject.title}
                </h3>
                <p className="text-secondary/60 font-light">{prevProject.client}</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link href={`/portfolio/${nextProject.id}`} className="group block text-right">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                  {t('portfolioDetail.next')} →
                </p>
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
