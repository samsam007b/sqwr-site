import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const services = [
    'Communication visuelle',
    'Design graphique',
    'Création de logos',
    'Création de sites web',
    'Design de flyers',
    'Design réseaux sociaux'
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'Identité Visuelle Moderne',
      category: 'Branding',
      image: '',
      href: '/portfolio/projet-1'
    },
    {
      id: 2,
      title: 'Site E-commerce Minimaliste',
      category: 'Web Design',
      image: '',
      href: '/portfolio/projet-2'
    },
    {
      id: 3,
      title: 'Campagne Réseaux Sociaux',
      category: 'Social Media',
      image: '',
      href: '/portfolio/projet-3'
    },
    {
      id: 4,
      title: 'Création Logo & Charte',
      category: 'Branding',
      image: '',
      href: '/portfolio/projet-4'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-24">
        <div className="max-w-6xl w-full">
          <ScrollReveal>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] mb-8 text-balance">
              Design qui inspire.
              <br />
              Créations qui marquent.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-12 leading-relaxed">
              Agence de communication visuelle et design graphique.
              Nous transformons vos idées en expériences visuelles mémorables.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-primary text-secondary text-center hover:bg-primary/90 transition-colors duration-200"
              >
                Voir nos projets
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-primary text-primary text-center hover:bg-primary hover:text-secondary transition-all duration-200"
              >
                Nous contacter
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                  Notre approche
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  Créer avec intention, designer avec passion
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Chez Créative Design, nous croyons que chaque projet mérite
                  une approche unique et réfléchie. Notre équipe allie créativité
                  et stratégie pour donner vie à votre vision.
                </p>
                <p>
                  Du branding à la conception web, nous créons des solutions
                  visuelles qui résonnent avec votre audience et renforcent
                  votre identité de marque.
                </p>
                <Link
                  href="/about"
                  className="inline-block mt-4 text-primary font-medium hover:opacity-70 transition-opacity"
                >
                  En savoir plus sur nous →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                Nos services
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Ce que nous faisons
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service} delay={index * 0.1}>
                <div className="group p-8 border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 border border-primary/20 mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300" />
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {service}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Solutions créatives et stratégiques adaptées à vos besoins.
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-block px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-secondary transition-all duration-200"
              >
                Découvrir tous nos services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                Portfolio
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Projets sélectionnés
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez quelques-unes de nos réalisations récentes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard {...project} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-4 bg-primary text-secondary hover:bg-primary/90 transition-colors duration-200"
              >
                Voir tous les projets
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-balance">
              Prêt à donner vie à votre projet ?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose
              d'exceptionnel.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-secondary text-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Démarrer un projet
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
