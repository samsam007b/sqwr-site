import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'À propos - Créative Design',
  description: 'Découvrez l\'histoire, la philosophie et l\'équipe derrière Créative Design, votre agence de communication visuelle et design graphique.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Créativité',
      description: 'Nous repoussons les limites du design pour créer des solutions visuelles uniques et mémorables.'
    },
    {
      title: 'Excellence',
      description: 'Chaque projet bénéficie de notre attention méticuleuse aux détails et notre engagement envers la qualité.'
    },
    {
      title: 'Collaboration',
      description: 'Nous travaillons en étroite collaboration avec nos clients pour transformer leur vision en réalité.'
    },
    {
      title: 'Innovation',
      description: 'Nous restons à l\'avant-garde des tendances et technologies pour offrir des solutions modernes.'
    }
  ];

  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Créative',
      bio: '15 ans d\'expérience en direction artistique et branding pour des marques internationales.'
    },
    {
      name: 'Thomas Martin',
      role: 'Lead Designer',
      bio: 'Expert en design graphique et identité visuelle, passionné par le minimalisme fonctionnel.'
    },
    {
      name: 'Sophie Laurent',
      role: 'Web Designer',
      bio: 'Spécialiste UI/UX avec une approche centrée sur l\'utilisateur et l\'accessibilité.'
    },
    {
      name: 'Lucas Bernard',
      role: 'Motion Designer',
      bio: 'Créateur d\'animations et contenus visuels dynamiques pour le digital et les réseaux sociaux.'
    }
  ];

  const stats = [
    { value: '150+', label: 'Projets réalisés' },
    { value: '80+', label: 'Clients satisfaits' },
    { value: '8', label: 'Années d\'expérience' },
    { value: '100%', label: 'Engagement qualité' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-6">
              À propos
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-balance">
              Nous créons des expériences visuelles qui inspirent
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 max-w-3xl leading-relaxed">
              Créative Design est une agence de communication visuelle et design
              graphique basée sur la passion de la création et l'excellence du
              détail.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 lg:px-12 bg-paper">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  Notre histoire
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-secondary/70 leading-relaxed">
                <p>
                  Fondée en 2016, Créative Design est née d'une vision simple :
                  faire du design un levier de transformation pour les marques
                  qui osent se démarquer.
                </p>
                <p>
                  Au fil des années, nous avons eu le privilège d'accompagner
                  des entreprises de toutes tailles, des startups innovantes aux
                  marques établies, dans la création et le développement de leur
                  identité visuelle.
                </p>
                <p>
                  Notre approche combine réflexion stratégique et excellence
                  créative pour livrer des solutions qui ne sont pas seulement
                  belles, mais qui performent et créent de la valeur.
                </p>
                <p>
                  Aujourd'hui, notre équipe de designers passionnés continue de
                  repousser les frontières de la créativité pour offrir à nos
                  clients des résultats exceptionnels.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-display font-bold mb-3">
                    {stat.value}
                  </div>
                  <p className="text-secondary/60 text-xs font-mono uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-paper">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-4">
                Nos valeurs
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ce qui nous guide
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="glass-surface p-8 lg:p-10 rounded-lg">
                  <h3 className="text-2xl font-display font-bold mb-4">
                    {value.title}
                  </h3>
                  <p className="text-secondary/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-4">
                L'équipe
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Les talents derrière les créations
              </h2>
              <p className="text-secondary/70 max-w-2xl mx-auto">
                Une équipe passionnée et talentueuse au service de votre vision
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="text-center lg:text-left">
                  {/* Placeholder for team member photo */}
                  <div className="aspect-square bg-gradient-to-br from-tertiary/20 to-secondary/30 mb-6 rounded-lg grain-overlay" />

                  <h3 className="text-2xl font-display font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-4">
                    {member.role}
                  </p>
                  <p className="text-secondary/70 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-foreground text-paper">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center text-balance">
              "Le bon design est aussi peu de design que possible"
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-paper/70 text-center max-w-2xl mx-auto leading-relaxed">
              Notre philosophie est ancrée dans le minimalisme fonctionnel.
              Nous croyons que la simplicité bien exécutée crée l'impact le
              plus puissant et les expériences les plus mémorables.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
              Travaillons ensemble
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-secondary/70 mb-10 max-w-2xl mx-auto">
              Nous serions ravis de discuter de votre prochain projet et de
              vous montrer comment nous pouvons vous aider à atteindre vos
              objectifs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:bg-primary/90 transition-colors duration-200 rounded-lg"
            >
              Nous contacter
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
