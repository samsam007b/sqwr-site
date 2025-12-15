'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

interface ComparisonCell {
  text: string;
  status: 'positive' | 'warning' | 'negative';
}

const WhySQWR = () => {
  const { t } = useLanguage();

  const comparisonData: Array<{
    criteria: string;
    agencies: ComparisonCell;
    freelances: ComparisonCell;
    sqwr: ComparisonCell;
  }> = [
    {
      criteria: t('home.criteriaQuality'),
      agencies: { text: t('home.qualityHigh'), status: 'positive' },
      freelances: { text: t('home.qualityVariable'), status: 'warning' },
      sqwr: { text: t('home.qualityPremium'), status: 'positive' },
    },
    {
      criteria: t('home.criteriaReactivity'),
      agencies: { text: t('home.reactivitySlow'), status: 'negative' },
      freelances: { text: t('home.reactivityFast'), status: 'positive' },
      sqwr: { text: t('home.reactivityUltraFast'), status: 'positive' },
    },
    {
      criteria: t('home.criteriaPrice'),
      agencies: { text: t('home.priceHigh'), status: 'negative' },
      freelances: { text: t('home.priceAffordable'), status: 'positive' },
      sqwr: { text: t('home.priceFair'), status: 'positive' },
    },
    {
      criteria: t('home.criteriaSupport'),
      agencies: { text: t('home.supportAnonymous'), status: 'negative' },
      freelances: { text: t('home.supportDirect'), status: 'positive' },
      sqwr: { text: t('home.supportFamily'), status: 'positive' },
    },
    {
      criteria: t('home.criteriaAI'),
      agencies: { text: t('home.aiRare'), status: 'warning' },
      freelances: { text: t('home.aiRare'), status: 'warning' },
      sqwr: { text: t('home.aiIntegrated'), status: 'positive' },
    },
  ];

  const getStatusIcon = (status: 'positive' | 'warning' | 'negative') => {
    switch (status) {
      case 'positive':
        return (
          <span className="text-green-500 text-xl" aria-label="Positive">
            ✓
          </span>
        );
      case 'warning':
        return (
          <span className="text-yellow-500 text-xl" aria-label="Warning">
            ⚠
          </span>
        );
      case 'negative':
        return (
          <span className="text-red-500 text-xl" aria-label="Negative">
            ✗
          </span>
        );
    }
  };

  return (
    <section className="py-40 lg:py-48 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
              {t('home.whySqwrLabel')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-normal text-4xl md:text-5xl mb-6 text-foreground">
              {t('home.whySqwrTitle')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/80 font-light max-w-3xl mx-auto">
              {t('home.whySqwrSubtitle')}
            </p>
          </ScrollReveal>
        </div>

        {/* Comparison Table */}
        <ScrollReveal delay={0.3}>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-secondary/60 flex items-end pb-4">
                  {t('home.comparisonCriteria')}
                </div>
                <div className="text-center glass-surface rounded-t-lg p-4">
                  <p className="font-sans text-sm font-medium text-foreground">
                    {t('home.comparisonAgencies')}
                  </p>
                </div>
                <div className="text-center glass-surface rounded-t-lg p-4">
                  <p className="font-sans text-sm font-medium text-foreground">
                    {t('home.comparisonFreelances')}
                  </p>
                </div>
                <div className="text-center glass-surface rounded-t-lg p-4 bg-primary/5 border-2 border-primary/20">
                  <p className="font-sans text-sm font-bold text-primary">
                    {t('home.comparisonSqwr')}
                  </p>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {comparisonData.map((row, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-sans text-sm font-medium text-foreground">
                      {row.criteria}
                    </div>
                    <div className="glass-surface p-4 rounded-lg flex items-center justify-center gap-3">
                      {getStatusIcon(row.agencies.status)}
                      <span className="text-sm text-secondary/80">{row.agencies.text}</span>
                    </div>
                    <div className="glass-surface p-4 rounded-lg flex items-center justify-center gap-3">
                      {getStatusIcon(row.freelances.status)}
                      <span className="text-sm text-secondary/80">{row.freelances.text}</span>
                    </div>
                    <div className="glass-surface p-4 rounded-lg bg-primary/5 border-2 border-primary/20 flex items-center justify-center gap-3">
                      {getStatusIcon(row.sqwr.status)}
                      <span className="text-sm font-medium text-foreground">{row.sqwr.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhySQWR;
