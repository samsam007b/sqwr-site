'use client';

import Link from 'next/link';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

const ALWAYS_INCLUDED_KEYS = [
  'alwaysIncluded1',
  'alwaysIncluded2',
  'alwaysIncluded3',
  'alwaysIncluded4',
  'alwaysIncluded5',
  'alwaysIncluded6',
] as const;

const NEVER_INCLUDED_KEYS = [
  'neverIncluded1',
  'neverIncluded2',
  'neverIncluded3',
  'neverIncluded4',
] as const;

const FAQ_COUNT = 8;

export default function TarifsPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`tarifs.faq${i + 1}Q` as Parameters<typeof t>[0]),
    a: t(`tarifs.faq${i + 1}A` as Parameters<typeof t>[0]),
  }));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
              {t('tarifs.heroLabel')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-normal text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 max-w-4xl">
              {t('tarifs.heroTitle').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/60 font-light max-w-2xl leading-relaxed">
              {t('tarifs.heroSub')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Payment terms banner */}
      <section className="py-12 bg-paper border-y border-foreground/6">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-2">
                  {t('tarifs.paymentTitle')}
                </p>
                <p className="text-lg font-light text-foreground leading-relaxed">
                  {t('tarifs.paymentDesc')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Included / Not included */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Always included */}
            <ScrollReveal>
              <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('tarifs.alwaysIncludedTitle')}
                </h2>
                <div className="space-y-4">
                  {ALWAYS_INCLUDED_KEYS.map((key) => (
                    <div key={key} className="flex items-start gap-4">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-foreground font-light leading-relaxed">
                        {t(`tarifs.${key}` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Not included */}
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  {t('tarifs.neverIncludedTitle')}
                </h2>
                <div className="space-y-4">
                  {NEVER_INCLUDED_KEYS.map((key) => (
                    <div key={key} className="flex items-start gap-4">
                      <span className="text-secondary/30 mt-0.5 flex-shrink-0">—</span>
                      <p className="text-secondary/60 font-light leading-relaxed">
                        {t(`tarifs.${key}` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 glass-surface rounded-lg">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-3">
                    {t('tarifs.seeServices')}
                  </p>
                  <Link
                    href="/services"
                    className="text-sm font-mono uppercase tracking-[0.15em] text-primary hover:opacity-70 transition-opacity duration-300"
                  >
                    /services →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
              {t('tarifs.faqTitle')}
            </p>
            <h2 className="font-display font-normal text-4xl md:text-5xl mb-16 max-w-2xl leading-[1.05]">
              {t('tarifs.faqSubtitle')}
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div className="border-t border-foreground/8">
                  <button
                    className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-display font-normal text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 text-secondary/40 text-xl font-light mt-0.5 transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'none' }}>
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="pb-6 pr-10">
                      <p className="text-secondary/70 font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-foreground/8" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden" data-dark-bg>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper">
                  {t('tarifs.ctaTitle')}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 text-paper/60 font-light text-lg leading-relaxed max-w-md">
                  {t('tarifs.ctaSub')}
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
              <ScrollReveal delay={0.3}>
                <Link
                  href="/contact"
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  {t('tarifs.ctaButton')}
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <Link
                  href="/contact?intent=audit"
                  className="inline-block w-fit text-sm font-mono uppercase tracking-[0.15em] text-paper/50 hover:text-paper transition-colors duration-300"
                >
                  {t('tarifs.ctaAudit')}
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between">
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">SQWR Studio</span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </section>
    </>
  );
}
