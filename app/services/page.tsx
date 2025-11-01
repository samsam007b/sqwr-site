import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services - Créative Design',
  description: 'Découvrez nos services de communication visuelle, design graphique, création de logos, sites web, flyers et design réseaux sociaux.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Communication visuelle',
      description: 'Nous créons des stratégies visuelles cohérentes qui renforcent votre identité de marque et captivent votre audience.',
      features: [
        'Stratégie de marque visuelle',
        'Direction artistique',
        'Charte graphique complète',
        'Guide de style et brand book',
      ]
    },
    {
      title: 'Design graphique',
      description: 'Des créations graphiques impactantes pour tous vos supports de communication, du print au digital.',
      features: [
        'Design éditorial',
        'Infographies et visualisations',
        'Supports marketing',
        'Packaging et étiquettes',
      ]
    },
    {
      title: 'Création de logos',
      description: 'Un logo unique et mémorable qui incarne l\'essence de votre marque et vous distingue de la concurrence.',
      features: [
        'Recherche et conceptualisation',
        'Propositions multiples',
        'Déclinaisons et variations',
        'Fichiers vectoriels finaux',
      ]
    },
    {
      title: 'Création de sites web',
      description: 'Sites web modernes, responsives et performants qui transforment vos visiteurs en clients.',
      features: [
        'Design UI/UX personnalisé',
        'Développement responsive',
        'Optimisation SEO',
        'Performance et accessibilité',
      ]
    },
    {
      title: 'Design de flyers',
      description: 'Flyers percutants qui attirent l\'attention et communiquent efficacement votre message.',
      features: [
        'Conception créative',
        'Mise en page professionnelle',
        'Formats variés',
        'Préparation pour l\'impression',
      ]
    },
    {
      title: 'Design réseaux sociaux',
      description: 'Contenus visuels engageants et cohérents pour optimiser votre présence sur les réseaux sociaux.',
      features: [
        'Templates personnalisés',
        'Posts et stories',
        'Bannières et covers',
        'Animations et GIFs',
      ]
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Découverte',
      description: 'Nous prenons le temps de comprendre votre marque, vos objectifs et votre audience cible.'
    },
    {
      number: '02',
      title: 'Stratégie',
      description: 'Élaboration d\'une approche créative sur mesure alignée avec vos besoins spécifiques.'
    },
    {
      number: '03',
      title: 'Création',
      description: 'Conception et développement de solutions visuelles impactantes et innovantes.'
    },
    {
      number: '04',
      title: 'Livraison',
      description: 'Finalisation et livraison de tous les assets avec support et documentation complète.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-6">
              Nos services
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-balance">
              Des solutions créatives pour tous vos besoins
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 max-w-3xl leading-relaxed">
              De la conception d'identités visuelles au design web, nous offrons
              une gamme complète de services pour propulser votre marque.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 lg:px-12 bg-paper">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:gap-20">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-5">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                      {service.title}
                    </h2>
                    <p className="text-secondary/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="glass-surface p-8 lg:p-10 rounded-lg">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-6">
                        Prestations incluses
                      </h3>
                      <ul className="space-y-4">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start text-secondary/80"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-4">
                Notre méthodologie
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Comment nous travaillons
              </h2>
              <p className="text-secondary/70 max-w-2xl mx-auto">
                Un processus éprouvé pour garantir des résultats exceptionnels
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-6xl font-display font-bold text-tertiary/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-secondary/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-foreground text-paper">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
              Parlons de votre projet
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-paper/70 mb-10 max-w-2xl mx-auto">
              Quel que soit votre besoin, nous avons l'expertise pour le
              concrétiser. Contactez-nous pour un devis personnalisé.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:bg-primary/90 transition-colors duration-200 rounded-lg"
            >
              Obtenir un devis
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
