'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/app/data/projects';

interface Props {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

const STAGE_INK = '#0e0d0a';
const STAGE_CREAM = '#ede8df';
const SAGE = '#7a9977';
const TERRACOTTA = '#c45c2b';
const INK = '#1a1814';

const colorSwatches = [
  { key: 'colorInk', hex: STAGE_INK },
  { key: 'colorCream', hex: STAGE_CREAM },
  { key: 'colorSage', hex: SAGE },
  { key: 'colorTerracotta', hex: TERRACOTTA },
  { key: 'colorInkDark', hex: INK },
];

export default function FlowsStudioContent({ project, prevProject, nextProject }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — badge co-fondateur explicite */}
      <section className="relative pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="mb-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors duration-300"
              >
                <span className="mr-2">←</span>
                {t('portfolioDetail.back')}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-16 max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: TERRACOTTA }}>
                  {t('flowsStudio.categoryTag')}
                </p>
                <span
                  className="text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                  style={{ backgroundColor: SAGE, color: STAGE_CREAM }}
                >
                  {t('flowsStudio.cofounderBadge')}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display italic font-normal mb-8 leading-[0.95]">
                Flows Studio
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
                {t('flowsStudio.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src="/projet-flows-studio/hero.png"
                alt="Flows Studio — page d'accueil"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contexte — co-fondation, texte simple */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
              {t('flowsStudio.contextTitle')}
            </h2>
            <p className="text-2xl leading-relaxed text-foreground font-light mb-10">
              {t('flowsStudio.projectDescription')}
            </p>
            <p className="text-lg text-secondary/70 leading-relaxed font-light">
              {t('flowsStudio.contextDesc')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-16">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                {t('portfolioDetail.servicesPerformed')}
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="px-5 py-2.5 rounded-full text-sm font-light border"
                    style={{ borderColor: `${SAGE}55`, color: INK }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Direction de marque — swatches */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: STAGE_CREAM }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display italic font-normal mb-4 leading-tight" style={{ color: INK }}>
              {t('flowsStudio.directionTitle')}
            </h2>
            <p className="text-lg font-light mb-16 max-w-2xl leading-relaxed" style={{ color: INK }}>
              {t('flowsStudio.directionDesc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {colorSwatches.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.08}>
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: `${INK}15` }}>
                  <div className="h-24 md:h-32" style={{ backgroundColor: c.hex }} />
                  <div className="px-4 py-3" style={{ backgroundColor: STAGE_CREAM }}>
                    <p className="text-sm font-display mb-0.5" style={{ color: INK }}>{t(`flowsStudio.${c.key}`)}</p>
                    <p className="text-xs font-mono opacity-50" style={{ color: INK }}>{c.hex}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Le site — screenshot */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: TERRACOTTA }}>
              {t('flowsStudio.siteTitle')}
            </h2>
            <p className="text-lg text-secondary/70 font-light mb-12 max-w-2xl leading-relaxed">
              {t('flowsStudio.siteDesc')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <Image
                src="/projet-flows-studio/hero.png"
                alt="Flows Studio — site web complet"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-light hover:opacity-70 transition-opacity duration-300"
                style={{ color: SAGE }}
              >
                flows-studio.com →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Les agents — grille sobre */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: INK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: SAGE }}>
              {t('flowsStudio.agentsTitle')}
            </h2>
            <p className="text-lg font-light mb-16 max-w-2xl leading-relaxed" style={{ color: STAGE_CREAM }}>
              {t('flowsStudio.agentsDesc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: `${STAGE_CREAM}15` }}>
            {[1, 2, 3].map((n) => (
              <ScrollReveal key={n} delay={n * 0.1}>
                <div className="p-10" style={{ backgroundColor: INK }}>
                  <p className="text-4xl font-mono font-light mb-6" style={{ color: TERRACOTTA }}>
                    0{n}
                  </p>
                  <p className="text-lg font-light" style={{ color: STAGE_CREAM }}>
                    {t(`flowsStudio.agent${n}`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline isolée — pleine page */}
      <section className="py-32 lg:py-48" style={{ backgroundColor: STAGE_CREAM }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <p className="text-4xl md:text-6xl font-display italic font-normal leading-tight" style={{ color: INK }}>
              {t('flowsStudio.tagline')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA — externe vers flows-studio.com */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display italic font-normal mb-10 text-balance leading-tight">
              {t('flowsStudio.ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('flowsStudio.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg"
              style={{ backgroundColor: SAGE, color: STAGE_CREAM }}
            >
              {t('flowsStudio.ctaButton')}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Next/Previous Projects Navigation */}
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
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                    ← {t('portfolioDetail.previous')}
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {prevProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">{prevProject.client}</p>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link href={`/portfolio/${nextProject.id}`} className="group block text-right">
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                    {t('portfolioDetail.next')} →
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {nextProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">{nextProject.client}</p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
