'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      key: 'service1',
      highlight: false,
    },
    {
      key: 'service2',
      highlight: false,
    },
    {
      key: 'service3',
      highlight: false,
    },
    {
      key: 'service4',
      highlight: false,
    },
    {
      key: 'service5',
      highlight: true, // Highlight the complete package
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
              {t('services.title')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-normal text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight text-balance text-foreground whitespace-pre-line">
              {t('services.heroTitle')}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto leading-relaxed font-light">
              {t('services.heroSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const featuresValue = t(`services.${service.key}.features`);
              const serviceData = {
                title: t(`services.${service.key}.title`),
                price: t(`services.${service.key}.price`),
                description: t(`services.${service.key}.description`),
                included: t(`services.${service.key}.included`),
                features: (Array.isArray(featuresValue) ? featuresValue : []) as string[],
              };

              return (
                <ScrollReveal key={service.key} delay={index * 0.1}>
                  <div
                    className={`h-full rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                      service.highlight
                        ? 'glass-surface border-2 border-primary/30 shadow-xl scale-105'
                        : 'glass-surface hover:shadow-lg'
                    }`}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-display font-normal mb-4 text-foreground">
                        {serviceData.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-4">
                        {!serviceData.price.toLowerCase().includes('devis') &&
                        !serviceData.price.toLowerCase().includes('quote') &&
                        !serviceData.price.toLowerCase().includes('aanvraag') &&
                        !serviceData.price.toLowerCase().includes('anfrage') ? (
                          <>
                            <span className="text-xs font-mono uppercase tracking-wider text-secondary/60">
                              {t('services.startingFrom')}
                            </span>
                            <span className="text-3xl font-display font-bold text-primary">
                              {serviceData.price}
                              {serviceData.price.includes('800') && (
                                <span className="text-lg text-secondary/60">
                                  {t('services.perMonth')}
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-3xl font-display font-bold text-primary">
                            {serviceData.price}
                          </span>
                        )}
                      </div>
                      <p className="text-secondary/80 leading-relaxed font-light">
                        {serviceData.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex-grow">
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                        {serviceData.included}
                      </p>
                      <ul className="space-y-3">
                        {serviceData.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-secondary/90">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8">
                      <Link
                        href="/contact"
                        className={`block text-center px-6 py-3 rounded-lg transition-all duration-300 text-sm font-sans ${
                          service.highlight
                            ? 'bg-primary text-paper hover:opacity-90'
                            : 'bg-foreground/5 hover:bg-foreground/10 text-foreground'
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

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 text-balance">
              {t('services.ctaTitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-paper/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t('services.ctaSubtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:opacity-90 transition-opacity duration-300 rounded-lg font-sans"
            >
              {t('services.ctaButton')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
