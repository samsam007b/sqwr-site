'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyContent() {
  const { t } = useLanguage();

  const h1Lines = t('privacy.h1').split('\n');

  return (
    <main className="max-w-3xl mx-auto px-6 lg:px-8 pt-36 pb-24">
      <p aria-hidden="true" className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8">
        {t('privacy.label')}
      </p>
      <h1 className="font-display font-normal text-4xl lg:text-5xl text-foreground mb-16 leading-tight">
        {h1Lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < h1Lines.length - 1 && <br />}
          </span>
        ))}
      </h1>

      <div className="space-y-12 text-secondary/70 font-light leading-relaxed">

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section1')}
          </h2>
          <ul className="space-y-1">
            <li><strong className="font-medium text-foreground">SQWR Studio</strong></li>
            <li>{t('privacy.controllerAddress')}</li>
            <li>{t('privacy.contactLabel')} <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a></li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section2')}
          </h2>
          <p>{t('privacy.dataCollectedIntro')}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>{t('privacy.dataItem1')}</li>
            <li>{t('privacy.dataItem2')}</li>
            <li>{t('privacy.dataItem3')}</li>
            <li>{t('privacy.dataItem4')}</li>
            <li>{t('privacy.dataItem5')}</li>
            <li>{t('privacy.dataItem6')}</li>
          </ul>
          <p className="mt-4">
            {t('privacy.analyticsText')}{' '}
            <a href="https://plausible.io/data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              plausible.io/data-policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section3')}
          </h2>
          <p>{t('privacy.purposeIntro')}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>{t('privacy.purposeItem1')}</li>
            <li>{t('privacy.purposeItem2')}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section4')}
          </h2>
          <p>{t('privacy.retentionText')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section5')}
          </h2>
          <p>{t('privacy.recipientsText')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section6')}
          </h2>
          <p>{t('privacy.gdprIntro')}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li>{t('privacy.gdprRight1')}</li>
            <li>{t('privacy.gdprRight2')}</li>
            <li>{t('privacy.gdprRight3')}</li>
            <li>{t('privacy.gdprRight4')}</li>
            <li>{t('privacy.gdprRight5')}</li>
            <li>{t('privacy.gdprRight6')}</li>
          </ul>
          <p className="mt-4">
            {t('privacy.gdprExercise').split('studio@sqwr.be').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <a href="mailto:studio@sqwr.be" className="text-primary hover:underline">studio@sqwr.be</a>
                )}
              </span>
            ))}
          </p>
          <p className="mt-4">
            {t('privacy.gdprComplaint')}{' '}
            <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              autoriteprotectiondonnees.be
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground mb-4">
            {t('privacy.section7')}
          </h2>
          <p>{t('privacy.securityText')}</p>
        </section>

        <p className="text-xs font-mono text-secondary/30 pt-8 border-t border-secondary/10">
          {t('privacy.lastUpdate')}
        </p>

      </div>
    </main>
  );
}
