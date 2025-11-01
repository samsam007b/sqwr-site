import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import ImageCarousel from '@/components/ImageCarousel';
import { getFeaturedProjects, projects } from '@/app/data/projects';

export default function Home() {
  const services = [
    'Communication visuelle',
    'Design graphique',
    'Création de logos',
    'Création de sites web',
    'Design de flyers',
    'Design réseaux sociaux'
  ];

  const featuredProjects = getFeaturedProjects();
  const carouselImages = projects.map(p => p.image);

  return (
    <>
      {/* Background Carousel */}
      <ImageCarousel images={carouselImages} interval={6000} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-24">
        <div className="max-w-6xl w-full">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-wider text-primary mb-8">
              Agence Créative Premium
            </p>
            <h1 className="font-display font-normal leading-[0.95] mb-8 text-balance text-foreground">
              Transformer vos <span className="text-primary">ambitions</span>
              <br />
              en réalisations d'exception
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl max-w-2xl text-secondary mb-12 leading-relaxed font-light">
              Agence de communication visuelle et design graphique.
              Nous créons des expériences qui marquent les esprits.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-primary text-paper text-center rounded-lg hover:bg-primary/90 transition-colors duration-200 font-sans"
              >
                Voir nos projets
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 glass-surface text-foreground text-center hover:bg-primary hover:text-paper transition-all duration-200 font-sans rounded-lg"
              >
                Nous contacter
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 glass-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
                  Notre approche
                </p>
                <h2 className="font-display font-normal mb-6 leading-tight text-foreground">
                  Créer avec intention,<br />designer avec passion
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 text-secondary leading-relaxed font-light">
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
                  className="inline-block mt-4 text-primary font-normal hover:opacity-70 transition-opacity"
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
              <p className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
                Nos services
              </p>
              <h2 className="font-display font-normal text-foreground">
                Ce que nous faisons
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service} delay={index * 0.1}>
                <div className="group p-8 glass-hover rounded-lg grain-overlay">
                  <div className="w-12 h-12 border-2 border-primary/20 mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300 rounded" />
                  <h3 className="text-xl font-display font-normal mb-3 text-foreground">
                    {service}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed font-light">
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
                className="inline-block px-8 py-4 glass-surface text-foreground rounded-lg hover:bg-primary hover:text-paper transition-all duration-200 font-sans"
              >
                Découvrir tous nos services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 glass-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
                Portfolio
              </p>
              <h2 className="font-display font-normal mb-6 text-foreground">
                Projets sélectionnés
              </h2>
              <p className="text-secondary max-w-2xl mx-auto font-light">
                Découvrez quelques-unes de nos réalisations récentes
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  category={project.categoryLabel}
                  year={project.year}
                  color={project.color}
                  image={project.image}
                  href={`/portfolio/${project.id}`}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-4 bg-primary text-paper rounded-lg hover:bg-primary/90 transition-colors duration-200 font-sans"
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
            <h2 className="font-display font-normal mb-8 text-balance text-foreground">
              Prêt à donner vie à votre projet ?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-secondary mb-12 max-w-2xl mx-auto font-light">
              Discutons de vos besoins et créons ensemble quelque chose
              d'exceptionnel.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper text-lg rounded-lg hover:bg-primary/90 transition-colors duration-200 font-sans"
            >
              Démarrer un projet
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
