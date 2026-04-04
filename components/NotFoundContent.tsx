'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-12">
      <div className="max-w-2xl w-full text-center">
        <ScrollReveal>
          <p className="text-xs font-mono uppercase tracking-wider text-primary mb-6">
            {t('error.label404')}
          </p>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-tight">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-balance">
            {t('error.pageNotFound')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-secondary/70 mb-12 max-w-xl mx-auto">
            {t('error.pageNotFoundDesc')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-foreground text-paper hover:bg-foreground/90 transition-colors duration-200 rounded-lg"
            >
              {t('error.backHome')}
            </Link>
            <Link
              href="/portfolio"
              className="inline-block px-8 py-4 glass-surface hover:shadow-lg transition-shadow duration-200 rounded-lg"
            >
              {t('error.viewPortfolio')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
