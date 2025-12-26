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
      title: 'Projet non trouvé - sqwr.',
    };
  }

  return {
    title: `${project.title} - ${project.client} | sqwr.`,
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
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="mb-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors duration-300"
              >
                <span className="mr-2">←</span>
                Retour
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-16 max-w-4xl">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">
                {project.categoryLabel} · {project.year}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-[0.95]">
                {project.title}
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
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
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Description */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                  Le projet
                </h2>
                <p className="text-2xl leading-relaxed text-foreground font-light mb-16">
                  {project.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    Services réalisés
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.services.map((service) => (
                      <div
                        key={service}
                        className="glass-surface px-8 py-6 rounded-lg"
                      >
                        <p className="font-light text-foreground">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-20">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    Impact
                  </h3>
                  <p className="text-lg text-secondary/70 leading-relaxed font-light">
                    Ce projet a permis de créer une identité visuelle forte et cohérente,
                    renforçant la présence de marque et créant une connexion authentique
                    avec l'audience cible. Les solutions créatives mises en place ont
                    contribué à atteindre les objectifs stratégiques du client.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Project Info */}
            <div className="lg:col-span-4">
              <ScrollReveal delay={0.3}>
                <div className="glass-surface p-10 rounded-lg sticky top-32">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-10">
                    Détails
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Client
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        {project.client}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Année
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        {project.year}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Catégorie
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
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

      {/* Gallery Section */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              Autres projets
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Previous Project */}
            <ScrollReveal delay={0.1}>
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="group block"
              >
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                    ← Précédent
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {prevProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">
                    {prevProject.client}
                  </p>
                </div>
              </Link>
            </ScrollReveal>

            {/* Next Project */}
            <ScrollReveal delay={0.2}>
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="group block text-right"
              >
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                    Suivant →
                  </p>
                  <h3 className="text-3xl font-display font-normal mb-3 group-hover:text-primary transition-colors duration-300">
                    {nextProject.title}
                  </h3>
                  <p className="text-secondary/60 font-light">
                    {nextProject.client}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 bg-foreground text-paper" data-dark-bg>
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              Un projet en tête ?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-paper/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              Créons ensemble une identité visuelle qui marque les esprits.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg"
            >
              Démarrer une conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
