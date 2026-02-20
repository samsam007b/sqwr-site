'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: 'Samuel Baudon',
      role: 'Stratégie, Communication & Entrepreneuriat',
      bio: 'Étudiant en communication et relations publiques, Samuel est aussi entrepreneur : fondateur d\'Ears & Eyes (vernissage + soirée), porteur du projet izzico. Il pilote la stratégie, le développement commercial et la communication du studio.'
    },
    {
      name: 'Jean-Pierre Baudon',
      role: 'Graphic Designer',
      bio: '15 ans d\'expérience dans l\'impression et le design graphique. Graphiste freelance, Jean-Pierre apporte son expertise technique et créative à chaque projet.'
    },
    {
      name: 'Joakim Baudon',
      role: 'Designer & Directeur Artistique',
      bio: 'Formé 2 ans à La Cambre, actuellement étudiant à la Kunstschule de Lichtenstein. Joakim insuffle une approche contemporaine et artistique à nos créations.'
    },
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
                  Qui sommes-nous
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-secondary/80 leading-relaxed font-light">
                <p>
                  SQWR Studio est une agence familiale basée à Bruxelles, composée de trois membres
                  de la famille Baudon. Notre force réside dans notre diversité de compétences et
                  notre capacité à travailler ensemble de manière fluide et réactive.
                </p>
                <p>
                  Nous combinons des profils complémentaires : expertise en relations publiques et
                  stratégie, savoir-faire technique en impression et design graphique, et formation
                  artistique contemporaine. Cette synergie nous permet d'aborder chaque projet sous
                  différents angles.
                </p>
                <p>
                  Notre approche est simple : créer des identités visuelles authentiques et
                  mémorables, en restant à l'écoute de nos clients et en mettant notre créativité
                  au service de leurs ambitions.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                L'équipe
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-normal mb-6 text-foreground">
                La famille Baudon
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="text-center">
                  {/* Placeholder for team member photo */}
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/20 mb-6 rounded-2xl grain-overlay" />

                  <h3 className="text-2xl font-display font-normal mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {member.role}
                  </p>
                  <p className="text-secondary/80 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - AI-driven */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/60 mb-4">
                Notre philosophie
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-normal mb-8 text-balance">
                L'approche AI-driven qui démocratise le design
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6 text-lg text-paper/80 leading-relaxed font-light">
              <p>
                Notre philosophie de travail <span className="text-paper font-normal">AI-driven</span> nous permet d'être
                compétitifs en démocratisant des travaux autrefois très chronophages.
              </p>
              <p>
                En automatisant les tâches répétitives que les clients ne voyaient pas auparavant
                mais qui rendaient le prix des projets élevé, nous libérons du temps et des ressources
                pour nous concentrer sur ce qui compte vraiment : <span className="text-paper font-normal">la Création</span>.
              </p>
              <p>
                Cette approche nous permet d'offrir un service de qualité agence à des prix
                accessibles, tout en consacrant notre énergie créative là où elle a le plus d'impact.
              </p>
            </div>
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
