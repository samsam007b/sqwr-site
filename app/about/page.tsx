'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      titleKey: 'Créativité',
      descriptionKey: 'Nous repoussons les limites du design pour créer des solutions visuelles uniques et mémorables.'
    },
    {
      titleKey: 'Excellence',
      descriptionKey: 'Chaque projet bénéficie de notre attention méticuleuse aux détails et notre engagement envers la qualité.'
    },
    {
      titleKey: 'Collaboration',
      descriptionKey: 'Nous travaillons en étroite collaboration avec nos clients pour transformer leur vision en réalité.'
    },
    {
      titleKey: 'Innovation',
      descriptionKey: 'Nous restons à l\'avant-garde des tendances et technologies pour offrir des solutions modernes.'
    }
  ];

  const teamMembers = [
    {
      nameKey: 'team1Name',
      roleKey: 'team1Role',
      bioKey: 'team1Bio',
    },
    {
      nameKey: 'team2Name',
      roleKey: 'team2Role',
      bioKey: 'team2Bio',
    },
    {
      nameKey: 'team3Name',
      roleKey: 'team3Role',
      bioKey: 'team3Bio',
    },
  ];

  const stats = [
    { value: '150+', label: 'Projets réalisés' },
    { value: '80+', label: 'Clients satisfaits' },
    { value: '9', label: 'Années d\'expérience' },
    { value: '100%', label: 'Engagement qualité' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
              {t('about.title')}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-tight text-balance text-foreground">
              Nous créons des expériences visuelles qui inspirent
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/80 max-w-3xl leading-relaxed font-light">
              {t('about.description')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 lg:px-16 glass-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 leading-tight text-foreground">
                  Notre histoire
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-secondary/80 leading-relaxed font-light">
                <p>
                  Fondée en 2016 à Bruxelles, SQWR Studio est née d'une passion familiale pour le design
                  et la création visuelle. Ce qui a commencé comme un rêve partagé est devenu
                  une agence créative reconnue.
                </p>
                <p>
                  Au fil des années, nous avons eu le privilège d'accompagner
                  plus de 150 marques, des startups innovantes aux
                  entreprises établies, dans la création et le développement de leur
                  identité visuelle.
                </p>
                <p>
                  Notre approche combine l'agilité d'une structure familiale avec
                  les outils d'une agence premium. Nous intégrons l'IA et les technologies
                  modernes pour offrir une qualité agence à des prix accessibles.
                </p>
                <p>
                  Aujourd'hui, notre équipe de trois membres de la famille Baudon continue de
                  repousser les frontières de la créativité pour offrir à nos
                  clients des résultats exceptionnels, avec réactivité et dévouement.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-display font-normal mb-3 text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-secondary/60 text-xs font-mono uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 glass-surface">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                Nos valeurs
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 text-foreground">
                Ce qui nous guide
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <ScrollReveal key={value.titleKey} delay={index * 0.1}>
                <div className="glass-surface p-8 lg:p-10 rounded-lg border border-foreground/5">
                  <h3 className="text-2xl font-display font-normal mb-4 text-foreground">
                    {value.titleKey}
                  </h3>
                  <p className="text-secondary/80 leading-relaxed font-light">
                    {value.descriptionKey}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                {t('about.teamTitle')}
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 text-foreground">
                {t('about.teamSubtitle')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.nameKey} delay={index * 0.1}>
                <div className="text-center">
                  {/* Placeholder for team member photo */}
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/20 mb-6 rounded-2xl grain-overlay" />

                  <h3 className="text-2xl font-display font-normal mb-2 text-foreground">
                    {t(`about.${member.nameKey}`)}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {t(`about.${member.roleKey}`)}
                  </p>
                  <p className="text-secondary/80 leading-relaxed font-light">
                    {t(`about.${member.bioKey}`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-8 text-center text-balance">
              "L'agilité d'une équipe familiale + les outils d'une agence premium"
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-paper/70 text-center max-w-2xl mx-auto leading-relaxed font-light">
              Notre force réside dans notre structure familiale unique qui nous permet
              d'être ultra-réactifs, tout en maîtrisant les outils IA et technologies
              modernes pour offrir une qualité agence à des prix accessibles.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 text-balance text-foreground">
              {t('about.ctaTitle')}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-secondary/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Nous serions ravis de discuter de votre prochain projet et de
              vous montrer comment nous pouvons vous aider à atteindre vos
              objectifs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:opacity-90 transition-opacity duration-300 rounded-lg font-sans"
            >
              {t('about.ctaButton')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
