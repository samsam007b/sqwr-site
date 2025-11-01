import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import ImageCarousel from '@/components/ImageCarousel';
import { getFeaturedProjects, projects } from '@/app/data/projects';

export default function Home() {
  // Select only top 4 premium projects
  const topProjects = getFeaturedProjects().slice(0, 4);
  const carouselImages = projects.map(p => p.image);

  return (
    <>
      {/* Background Carousel */}
      <ImageCarousel images={carouselImages} interval={8000} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-16 pt-24">
        <div className="max-w-6xl w-full">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-12">
              Depuis 2016
            </p>
            <h1 className="font-display font-normal leading-[0.95] mb-12 text-balance text-foreground">
              Où les marques<br />
              trouvent leur <span className="text-primary">essence</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-2xl max-w-2xl text-secondary mb-16 leading-relaxed font-light">
              Nous créons des identités visuelles qui connectent,
              émotionnellement, visuellement, stratégiquement.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/portfolio"
                className="px-10 py-5 bg-foreground text-paper text-center rounded-lg hover:opacity-90 transition-opacity duration-300 font-sans"
              >
                Découvrir nos projets
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 glass-surface text-foreground text-center hover:bg-foreground hover:text-paper transition-all duration-300 font-sans rounded-lg"
              >
                Démarrer une conversation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 lg:py-48 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
                  Notre philosophie
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <ScrollReveal delay={0.2}>
                <h2 className="font-display font-normal text-4xl md:text-5xl mb-8 leading-tight text-foreground">
                  Le design comme levier de transformation
                </h2>
                <div className="space-y-6 text-lg text-secondary/80 leading-relaxed font-light">
                  <p>
                    Chaque marque possède une histoire unique qui mérite d'être
                    racontée avec intention et authenticité. Notre rôle est de
                    révéler cette essence à travers des expériences visuelles
                    mémorables.
                  </p>
                  <p>
                    De la stratégie de marque à l'exécution digitale, nous
                    combinons réflexion stratégique et excellence créative pour
                    créer des solutions qui ne sont pas seulement belles, mais
                    qui performent et créent de la valeur.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-40 lg:py-48 px-6 lg:px-16 glass-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-20">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-6">
                Projets sélectionnés
              </p>
              <h2 className="font-display font-normal text-4xl md:text-5xl text-foreground">
                Travaux récents
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {topProjects.map((project, index) => (
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
                className="inline-block text-sm font-mono uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-300"
              >
                Voir tous les projets →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expertise Highlight */}
      <section className="py-40 lg:py-48 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
            <ScrollReveal>
              <div>
                <div className="text-5xl font-display font-normal mb-4 text-foreground">
                  150+
                </div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary/60">
                  Marques transformées
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <div className="text-5xl font-display font-normal mb-4 text-foreground">
                  9 ans
                </div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary/60">
                  D'expertise créative
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <div className="text-5xl font-display font-normal mb-4 text-foreground">
                  100%
                </div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary/60">
                  Excellence & passion
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 lg:py-48 px-6 lg:px-16 bg-foreground text-paper">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display font-normal text-4xl md:text-5xl mb-10 text-balance leading-tight">
              Transformons votre vision<br />en réalité
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              Chaque grand projet commence par une conversation.
              Parlons du vôtre.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper text-lg rounded-lg hover:opacity-90 transition-opacity duration-300 font-sans"
            >
              Entrer en contact
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
