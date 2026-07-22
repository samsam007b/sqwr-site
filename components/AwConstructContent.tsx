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

const INK = '#0D0C0A';
const PLASTER = '#E4DFD5';
const RUST = '#7A3322';
const GRAPHITE = '#5E5B54';
const CONCRETE = '#BDB7AE';

const colorSwatches = [
  { key: 'colorInk', hex: INK },
  { key: 'colorPlaster', hex: PLASTER },
  { key: 'colorRust', hex: RUST },
  { key: 'colorGraphite', hex: GRAPHITE },
  { key: 'colorConcrete', hex: CONCRETE },
];

const galleryImages = [
  { src: '/projet-aw-construct/chantier-villa.jpg', altKey: 'awConstruct.galleryAlt1' },
  { src: '/projet-aw-construct/chantier-beton.jpg', altKey: 'awConstruct.galleryAlt2' },
  { src: '/projet-aw-construct/chantier-parquet.jpg', altKey: 'awConstruct.galleryAlt3' },
  { src: '/projet-aw-construct/chantier-crayer.jpg', altKey: 'awConstruct.galleryAlt4' },
];

export default function AwConstructContent({ project, prevProject, nextProject }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero — full-bleed image, title overlay */}
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
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: RUST }}>
                {t('awConstruct.categoryTag')}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-[0.95]">
                A.W Construct
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
                {t('awConstruct.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src="/projet-aw-construct/hero.png"
                alt="A.W Construct — site web, page d'accueil"
                fill
                className="object-cover object-top"
                priority
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brief — 2 columns text / sidebar details */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('portfolioDetail.theProject')}
                </h2>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  {t('awConstruct.projectDescription')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] mb-8" style={{ color: RUST }}>
                    {t('awConstruct.briefTitle')}
                  </h3>
                  <p className="text-lg text-secondary/70 leading-relaxed font-light">
                    {t('awConstruct.briefText')}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
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

            <div className="lg:col-span-4">
              <ScrollReveal delay={0.3}>
                <div className="glass-surface p-10 rounded-lg sticky top-32">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-10">
                    {t('portfolioDetail.details')}
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.client')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        {project.client}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.year')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">{project.year}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.category')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        {project.categoryLabel}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.locationLabel')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">Bruxelles</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — asymmetric 4-photo grid, real jobsite photos */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: PLASTER }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: RUST }}>
              {t('awConstruct.galleryTitle')}
            </h2>
            <p className="text-lg font-light mb-16 max-w-2xl leading-relaxed" style={{ color: GRAPHITE }}>
              {t('awConstruct.galleryDesc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8 lg:space-y-12">
              <ScrollReveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg grain-overlay">
                  <Image
                    src={galleryImages[0].src}
                    alt={t(galleryImages[0].altKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg grain-overlay">
                  <Image
                    src={galleryImages[2].src}
                    alt={t(galleryImages[2].altKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="space-y-8 lg:space-y-12 md:mt-24">
              <ScrollReveal delay={0.15}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg grain-overlay">
                  <Image
                    src={galleryImages[1].src}
                    alt={t(galleryImages[1].altKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg grain-overlay">
                  <Image
                    src={galleryImages[3].src}
                    alt={t(galleryImages[3].altKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Art direction — horizontal swatch strip */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-normal mb-4 leading-tight">
              {t('awConstruct.directionTitle')}
            </h2>
            <p className="text-lg text-secondary/70 font-light mb-16 max-w-2xl leading-relaxed">
              {t('awConstruct.directionDesc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {colorSwatches.map((c, i) => (
              <ScrollReveal key={c.hex} delay={i * 0.08}>
                <div className="rounded-lg overflow-hidden border border-secondary/10">
                  <div className="h-24 md:h-32" style={{ backgroundColor: c.hex }} />
                  <div className="px-4 py-3 bg-paper">
                    <p className="text-sm font-display mb-0.5 text-foreground">{t(`awConstruct.${c.key}`)}</p>
                    <p className="text-xs font-mono text-secondary/50">{c.hex}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Delivered site — framed screenshot + external link */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: INK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: RUST }}>
              {t('awConstruct.siteTitle')}
            </h2>
            <p className="text-lg font-light mb-12 max-w-2xl leading-relaxed" style={{ color: CONCRETE }}>
              {t('awConstruct.siteDesc')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border" style={{ borderColor: GRAPHITE }}>
              <Image
                src="/projet-aw-construct/chantiers.png"
                alt="A.W Construct — page chantiers"
                fill
                className="object-cover object-top"
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
                style={{ color: PLASTER }}
              >
                {t('awConstruct.siteLink')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              {t('awConstruct.ctaTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('awConstruct.ctaDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg text-paper"
              style={{ backgroundColor: RUST }}
            >
              {t('awConstruct.ctaButton')}
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
