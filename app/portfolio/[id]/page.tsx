import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from '@/app/data/projects';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Projet non trouvé - Créative Design',
    };
  }

  return {
    title: `${project.title} - ${project.client} | Créative Design`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <>
      {/* Hero Section with Image */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-sm font-mono uppercase tracking-wider text-secondary hover:text-primary transition-colors"
              >
                <span className="mr-2">←</span>
                Retour au portfolio
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12">
              <p className="text-xs font-mono uppercase tracking-wider text-primary mb-4">
                {project.categoryLabel} · {project.year}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/70 font-light">
                {project.client}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src={project.image}
                alt={`${project.title} - ${project.client}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Description */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-6">
                  À propos du projet
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed text-secondary/80 font-light">
                  {project.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-16">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-8">
                    Services fournis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.services.map((service) => (
                      <div
                        key={service}
                        className="glass-surface px-6 py-4 rounded-lg"
                      >
                        <p className="font-medium">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.2}>
                <div className="glass-surface p-8 rounded-lg sticky top-32">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-8">
                    Informations
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-secondary/40 mb-2">
                        Client
                      </p>
                      <p className="text-lg font-display font-semibold">
                        {project.client}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-secondary/40 mb-2">
                        Année
                      </p>
                      <p className="text-lg font-display font-semibold">
                        {project.year}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-secondary/40 mb-2">
                        Catégorie
                      </p>
                      <p className="text-lg font-display font-semibold">
                        {project.categoryLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Additional images could go here */}
      <section className="py-16 lg:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                <Image
                  src={project.image}
                  alt={`${project.title} detail 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}dd 100%)`,
                  }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Next/Previous Projects Navigation */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Previous Project */}
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="group glass-surface p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-secondary/40 mb-4">
                  ← Projet précédent
                </p>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {prevProject.title}
                </h3>
                <p className="text-secondary/60">
                  {prevProject.client}
                </p>
              </Link>

              {/* Next Project */}
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="group glass-surface p-8 rounded-lg hover:shadow-lg transition-shadow text-right"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-secondary/40 mb-4">
                  Projet suivant →
                </p>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-secondary/60">
                  {nextProject.client}
                </p>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-foreground text-paper">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
              Vous avez un projet similaire ?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-paper/70 mb-10 max-w-2xl mx-auto">
              Discutons de la façon dont nous pouvons transformer votre vision en réalité.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:bg-primary/90 transition-colors duration-200 rounded-lg"
            >
              Démarrer un projet
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
