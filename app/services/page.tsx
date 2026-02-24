'use client';

import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const { t } = useLanguage();
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          document.body.classList.add('cursor-on-dark');
        } else {
          document.body.classList.remove('cursor-on-dark');
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-on-dark');
    };
  }, []);

  const services = [
    { key: 'service1', highlight: false },
    { key: 'service2', highlight: false },
    { key: 'service3', highlight: false },
    { key: 'service4', highlight: false },
    { key: 'service5', highlight: true },
  ];

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8"
              >
                {t('services.title')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-normal leading-[0.95] text-foreground mb-12 whitespace-pre-line"
              >
                {t('services.heroTitle')}
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              className="lg:col-start-5 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl text-secondary/60 leading-relaxed font-light">
                {t('services.heroSubtitle')}
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ─── SERVICES GRID ───────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-secondary/10">
            {services.map((service, index) => {
              const featuresValue = t(`services.${service.key}.features`);
              const serviceData = {
                title: t(`services.${service.key}.title`),
                price: t(`services.${service.key}.price`),
                description: t(`services.${service.key}.description`),
                included: t(`services.${service.key}.included`),
                features: (Array.isArray(featuresValue) ? featuresValue : []) as string[],
              };

              const isDevis =
                serviceData.price.toLowerCase().includes('devis') ||
                serviceData.price.toLowerCase().includes('quote') ||
                serviceData.price.toLowerCase().includes('aanvraag') ||
                serviceData.price.toLowerCase().includes('anfrage');

              return (
                <ScrollReveal key={service.key} delay={index * 0.08}>
                  <div
                    className={`h-full p-8 lg:p-10 flex flex-col bg-background relative ${
                      service.highlight ? 'border-l-2 border-primary' : ''
                    }`}
                  >
                    {service.highlight && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
                    )}

                    {/* Header */}
                    <div className="mb-8 pb-8 border-b border-secondary/10">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-4">
                        {serviceData.included}
                      </p>
                      <h3 className="font-display font-normal text-2xl mb-6 text-foreground leading-tight">
                        {serviceData.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        {!isDevis ? (
                          <>
                            <span className="text-xs font-mono uppercase tracking-wider text-secondary/40">
                              {t('services.startingFrom')}
                            </span>
                            <span className="text-3xl font-display font-normal text-primary">
                              {serviceData.price}
                              {serviceData.price.includes('800') && (
                                <span className="text-base text-secondary/50 ml-1">
                                  {t('services.perMonth')}
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-display font-normal text-primary">
                            {serviceData.price}
                          </span>
                        )}
                      </div>
                      <p className="text-secondary/60 leading-relaxed font-light text-sm">
                        {serviceData.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex-grow mb-8">
                      <ul className="space-y-4">
                        {serviceData.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-secondary/70 gap-4">
                            <span
                              className="flex-shrink-0 mt-2"
                              style={{
                                width: '20px',
                                height: '1px',
                                backgroundColor: 'var(--primary)',
                                display: 'block',
                                marginTop: '10px',
                              }}
                            />
                            <span className="font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href="/contact"
                        className={`block text-center px-6 py-3 transition-all duration-300 text-sm font-mono uppercase tracking-[0.12em] ${
                          service.highlight
                            ? 'bg-primary text-white hover:bg-primary/85'
                            : 'border border-secondary/20 hover:border-primary/40 text-foreground hover:text-primary'
                        }`}
                      >
                        {t('services.getQuote')}
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-20">
            <ScrollReveal className="lg:col-span-5">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
                {t('services.processTitle')}
              </p>
              <h2 className="font-display font-normal text-3xl md:text-4xl leading-tight text-foreground">
                {t('services.processSubtitle')}
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {[1, 2, 3, 4].map((step, index) => (
              <ScrollReveal key={step} delay={index * 0.1}>
                <div>
                  <p className="font-display font-normal text-[5rem] leading-none text-secondary/10 mb-6 select-none">
                    {String(step).padStart(2, '0')}
                  </p>
                  <div className="w-8 h-[2px] bg-primary mb-6" />
                  <h3 className="font-display font-normal text-xl mb-3 text-foreground">
                    {t(`services.process${step}Title`)}
                  </h3>
                  <p className="text-sm text-secondary/60 leading-relaxed font-light">
                    {t(`services.process${step}Description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA (dark) ──────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <ScrollReveal className="lg:col-span-7">
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper">
                {t('services.ctaTitle')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
              <p className="text-lg text-paper/40 font-light leading-relaxed">
                {t('services.ctaSubtitle')}
              </p>
              <div className="flex flex-col gap-4">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  {t('services.ctaButton')}
                </MagneticButton>
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-sm text-paper/30 font-light hover:text-paper/60 transition-colors duration-300 w-fit"
                >
                  studio@sqwr.be
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between">
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              SQWR Studio
            </span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              Bruxelles, Belgique
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
