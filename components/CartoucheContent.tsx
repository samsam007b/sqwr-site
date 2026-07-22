'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import DeviceMockup from '@/components/DeviceMockup';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/app/data/projects';

interface Props {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

const NAVY = '#0B1C2C';
const LIMESTONE = '#F3EEE7';
const BRASS = '#B89B5E';
const INK = '#2A2A2A';
const LINEN = '#F0E8D8';

const colorSwatches = [
  { key: 'colorNavy', hex: NAVY },
  { key: 'colorLimestone', hex: LIMESTONE },
  { key: 'colorBrass', hex: BRASS },
  { key: 'colorInk', hex: INK },
  { key: 'colorLinen', hex: LINEN },
];

const specs = [
  { valueKey: 'specLength', labelKey: 'specLengthLabel' },
  { valueKey: 'specYear', labelKey: 'specYearLabel' },
  { valueKey: 'specFlag', labelKey: 'specFlagLabel' },
  { valueKey: 'specGuests', labelKey: 'specGuestsLabel' },
];

export default function CartoucheContent({ project, prevProject, nextProject }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — full-bleed real yacht photo */}
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
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: BRASS }}>
                {t('cartouche.categoryTag')}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-[0.95]">
                Cartouche
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
                {t('cartouche.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src="/projet-cartouche/hero.png"
                alt="Cartouche — catamaran Blue Coast 95 au mouillage"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Description + sticky specs sidebar */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('portfolioDetail.theProject')}
                </h2>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  {t('cartouche.projectDescription')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    {t('portfolioDetail.servicesPerformed')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.services.map((service) => (
                      <div key={service} className="glass-surface px-8 py-6 rounded-lg">
                        <p className="font-light text-foreground">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-20">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    {t('portfolioDetail.impact')}
                  </h3>
                  <p className="text-lg text-secondary/70 leading-relaxed font-light">
                    {project.impact}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.3}>
                <div className="p-10 rounded-lg sticky top-32" style={{ backgroundColor: NAVY }}>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] mb-10" style={{ color: BRASS }}>
                    {t('cartouche.specsTitle')}
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    {specs.map((spec) => (
                      <div key={spec.valueKey}>
                        <p className="text-2xl font-display font-normal mb-1" style={{ color: LIMESTONE }}>
                          {t(`cartouche.${spec.valueKey}`)}
                        </p>
                        <p className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: BRASS }}>
                          {t(`cartouche.${spec.labelKey}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers as graphic matter — giant mono typography */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: LINEN }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: BRASS }}>
              {t('cartouche.numbersTitle')}
            </h2>
            <p className="text-lg font-light mb-16 max-w-2xl leading-relaxed" style={{ color: INK }}>
              {t('cartouche.numbersDesc')}
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap items-baseline gap-x-16 gap-y-8">
            <ScrollReveal delay={0.1}>
              <p className="font-mono font-light leading-none text-[clamp(3rem,10vw,9rem)]" style={{ color: NAVY }}>
                28.8<span className="text-3xl md:text-4xl align-top ml-2" style={{ color: BRASS }}>m</span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-mono font-light leading-none text-[clamp(3rem,10vw,9rem)]" style={{ color: NAVY }}>
                2022
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Art direction — swatch strip */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-normal mb-4 leading-tight">
              {t('cartouche.directionTitle')}
            </h2>
            <p className="text-lg text-secondary/70 font-light mb-16 max-w-2xl leading-relaxed">
              {t('cartouche.directionDesc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {colorSwatches.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.08}>
                <div className="rounded-lg overflow-hidden border border-secondary/10">
                  <div className="h-24 md:h-32" style={{ backgroundColor: c.hex }} />
                  <div className="px-4 py-3 bg-paper">
                    <p className="text-sm font-display mb-0.5 text-foreground">{t(`cartouche.${c.key}`)}</p>
                    <p className="text-xs font-mono text-secondary/50">{c.hex}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Charter site */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: BRASS }}>
              {t('cartouche.siteTitle')}
            </h2>
            <p className="text-lg font-light mb-12 max-w-2xl leading-relaxed" style={{ color: LIMESTONE }}>
              {t('cartouche.siteDesc')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border" style={{ borderColor: BRASS }}>
              <Image
                src="/projet-cartouche/hero.png"
                alt="Cartouche — site charter, page d'accueil"
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
                style={{ color: LIMESTONE }}
              >
                cartouche95.com →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Dashboard admin — iOS PWA, DeviceMockup */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: BRASS }}>
                  {t('cartouche.dashboardTitle')}
                </h2>
                <p className="text-lg text-secondary/70 font-light leading-relaxed">
                  {t('cartouche.dashboardDesc')}
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 flex justify-center">
              <ScrollReveal delay={0.15}>
                <DeviceMockup
                  src="/projet-cartouche/dash-iphone.png"
                  alt="Cartouche — dashboard admin, vue iPhone PWA"
                  className="max-w-[280px]"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              {t('cartouche.ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('cartouche.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg text-paper"
              style={{ backgroundColor: NAVY }}
            >
              {t('cartouche.ctaButton')}
            </Link>
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
