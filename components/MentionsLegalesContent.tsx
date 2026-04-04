'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function MentionsLegalesContent() {
  const { t } = useLanguage();

  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-36 pb-24">
      <p aria-hidden="true" className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8">
        {t('legal.label')}
      </p>
      <h1 className="font-display font-normal text-4xl lg:text-5xl text-foreground mb-16 leading-tight">
        {t('legal.h1')}
      </h1>

      <div className="space-y-12 text-secondary/70 font-light leading-relaxed">

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section1')}
          </h2>
          <p>{t('legal.editorIntro')}</p>
          <ul className="mt-3 space-y-1">
            <li><strong className="font-medium text-foreground">SQWR Studio</strong></li>
            <li>{t('legal.editorLocation')}</li>
            <li>{t('legal.editorEmail')} <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a></li>
            <li>{t('legal.editorPhone')} <a href="tel:+32493302752" className="text-primary hover:underline">+32 493 30 27 52</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section2')}
          </h2>
          <p>{t('legal.hostIntro')}</p>
          <ul className="mt-3 space-y-1">
            <li><strong className="font-medium text-foreground">Vercel Inc.</strong></li>
            <li>{t('legal.hostAddress')}</li>
            <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section3')}
          </h2>
          <p>{t('legal.intellectualProperty')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section4')}
          </h2>
          <p>{t('legal.responsibility')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section5')}
          </h2>
          <p>{t('legal.externalLinks')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('legal.section6')}
          </h2>
          <p>{t('legal.applicableLaw')}</p>
        </section>

        <p className="text-xs font-mono text-secondary/30 pt-8 border-t border-secondary/10">
          {t('legal.lastUpdate')}
        </p>

      </div>
    </main>
  );
}
