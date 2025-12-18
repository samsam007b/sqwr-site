'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import AsymmetricProjectGrid from '@/components/AsymmetricProjectGrid';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import WhySQWR from '@/components/WhySQWR';
import { getFeaturedProjects } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  // Select top 6 projects for asymmetric grid (1 full + 2 pairs)
  const topProjects = getFeaturedProjects().slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-16 pt-24">
        <div className="max-w-6xl w-full">
          <TextReveal
            className="font-display font-normal leading-[0.95] mb-12 text-balance text-foreground text-5xl md:text-6xl lg:text-7xl"
            delay={0.1}
            staggerDelay={0.05}
          >
            {t('hero.title')}
          </TextReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-2xl max-w-2xl text-secondary mb-16 leading-relaxed font-light">
              {t('hero.subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                href="/portfolio"
                strength={0.2}
                className="px-10 py-5 bg-foreground text-paper text-center rounded-lg hover:opacity-90 transition-opacity duration-300 font-sans"
              >
                {t('hero.cta')}
              </MagneticButton>
              <MagneticButton
                href="/contact"
                strength={0.2}
                className="px-10 py-5 glass-surface text-foreground text-center hover:bg-foreground hover:text-paper transition-all duration-300 font-sans rounded-lg"
              >
                {t('hero.ctaSecondary')}
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 lg:py-48 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                  {t('home.philosophyLabel')}
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <ScrollReveal delay={0.2}>
                <h2 className="font-display font-normal text-4xl md:text-5xl mb-8 leading-tight text-foreground">
                  {t('home.philosophyTitle')}
                </h2>
                <div className="space-y-6 text-lg text-secondary/80 leading-relaxed font-light">
                  <p>
                    {t('home.philosophyText1')}
                  </p>
                  <p>
                    {t('home.philosophyText2')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-40 lg:py-48 px-6 lg:px-16 glass-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-32 lg:mb-40">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
                {t('home.projectsLabel')}
              </p>
              <h2 className="font-display font-normal text-4xl md:text-5xl text-foreground">
                {t('home.projectsTitle')}
              </h2>
            </div>
          </ScrollReveal>

          <AsymmetricProjectGrid projects={topProjects} />

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-20">
              <Link
                href="/portfolio"
                className="inline-block text-sm font-mono uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
              >
                {t('home.viewAll')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why SQWR Comparison */}
      <WhySQWR />

      {/* CTA Section */}
      <section className="py-40 lg:py-48 px-6 lg:px-16 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display font-normal text-4xl md:text-5xl mb-10 text-balance leading-tight whitespace-pre-line">
              {t('home.ctaTitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
              {t('home.ctaSubtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper text-lg rounded-lg hover:opacity-90 transition-opacity duration-300 font-sans"
            >
              {t('home.ctaButton')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
