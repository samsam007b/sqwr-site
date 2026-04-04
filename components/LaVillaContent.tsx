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

const colorKeys = ['colorBluKlein', 'colorGrisBeige', 'colorBlanc'] as const;

export default function LaVillaContent({ project, prevProject, nextProject }: Props) {
  const { t } = useLanguage();

  const colors = [
    { key: 'colorBluKlein', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
    { key: 'colorGrisBeige', hex: '#B8B5AA', rgb: 'rgb(184, 181, 170)' },
    { key: 'colorBlanc', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
  ];

  const galleryImages = [
    [
      { src: '/projet-la-villa/IMG_5603.JPG', altKey: 'laVilla.galleryAlt1' },
      { src: '/projet-la-villa/IMG_5602.JPG', altKey: 'laVilla.galleryAlt2' },
      { src: '/projet-la-villa/IMG_5601.JPG', altKey: 'laVilla.galleryAlt3' },
      { src: '/projet-la-villa/IMG_5604.JPG', altKey: 'laVilla.galleryAlt4' },
    ],
    [
      { src: '/projet-la-villa/IMG_5597.JPG', altKey: 'laVilla.galleryAlt5' },
      { src: '/projet-la-villa/IMG_5599.JPG', altKey: 'laVilla.galleryAlt6' },
      { src: '/projet-la-villa/IMG_5606.JPG', altKey: 'laVilla.galleryAlt7' },
      { src: '/projet-la-villa/IMG_5605.JPG', altKey: 'laVilla.galleryAlt8' },
    ],
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
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
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">
                {t('laVilla.categoryTag')}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-[0.95]">
                La Villa
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
                {t('laVilla.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src="/projet-la-villa/hero-triptyque.png"
                alt="La Villa - Triptyque affiches festival"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Description */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('portfolioDetail.theProject')}
                </h2>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  {t('laVilla.projectDescription')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    {t('portfolioDetail.servicesPerformed')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.services.map((service) => (
                      <div
                        key={service}
                        className="glass-surface px-8 py-6 rounded-lg"
                      >
                        <p className="font-light text-foreground">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Color Palette Section */}
              <ScrollReveal delay={0.15}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    {t('portfolioDetail.colorPalette')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {colors.map((color) => (
                      <div key={color.hex} className="glass-surface p-6 rounded-lg">
                        <div
                          className="w-full h-20 rounded-md mb-4 border border-secondary/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="font-display text-lg mb-2 text-foreground">{t(`laVilla.${color.key}`)}</p>
                        <p className="text-xs font-mono text-secondary/60">{color.hex}</p>
                        <p className="text-xs font-mono text-secondary/40">{color.rgb}</p>
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
                    {t('laVilla.impactText')}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Project Info Sidebar */}
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
                        La Villa — {t('laVilla.subtitle')}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.year')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        2024
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.category')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        Branding
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                        {t('portfolioDetail.locationLabel')}
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        {t('laVilla.locationValue')}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - 2 Columns */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              {t('portfolioDetail.gallery')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8 lg:space-y-12">
              {galleryImages[0].map((image, index) => (
                <ScrollReveal key={image.src} delay={index * 0.1}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                    <Image
                      src={image.src}
                      alt={t(image.altKey)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="space-y-8 lg:space-y-12 md:mt-24">
              {galleryImages[1].map((image, index) => (
                <ScrollReveal key={image.src} delay={index * 0.1 + 0.05}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                    <Image
                      src={image.src}
                      alt={t(image.altKey)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              {t('laVilla.ctaTitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              {t('laVilla.ctaDescription')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-foreground text-paper hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg"
            >
              {t('laVilla.ctaButton')}
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
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="group block"
              >
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                    ← {t('portfolioDetail.previous')}
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {prevProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">
                    {prevProject.client}
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="group block text-right"
              >
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">
                    {t('portfolioDetail.next')} →
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {nextProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">
                    {nextProject.client}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
