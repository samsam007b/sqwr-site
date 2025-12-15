import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import { projects } from '@/app/data/projects';

export const metadata: Metadata = {
  title: 'La Villa - Fondation Culturelle | sqwr.',
  description: 'Identité visuelle complète pour une fondation culturelle du Jura suisse. Logo, charte graphique, système d\'illustrations géométriques et déclinaisons sur l\'ensemble des supports de communication.',
};

export default function LaVillaPage() {
  const project = projects.find((p) => p.id === 'la-villa')!;

  const projectIndex = projects.findIndex((p) => p.id === 'la-villa');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const galleryImages = [
    // Colonne gauche
    [
      { src: '/Projet La Villa/IMG_5603.JPG', alt: 'Logo La Villa - fond gris' },
      { src: '/Projet La Villa/IMG_5602.JPG', alt: 'Affiche Hans Meier - composition géométrique' },
      { src: '/Projet La Villa/IMG_5601.JPG', alt: 'Programme festival - grille typographique' },
      { src: '/Projet La Villa/IMG_5604.JPG', alt: 'Affiche Performance 14h' },
    ],
    // Colonne droite
    [
      { src: '/Projet La Villa/IMG_5597.JPG', alt: 'Affiche Kool Koor - cercles bleus' },
      { src: '/Projet La Villa/IMG_5599.JPG', alt: 'Affiche Last Minute Festival' },
      { src: '/Projet La Villa/IMG_5606.JPG', alt: 'Affiche Fêtes des voisins - lanternes' },
      { src: '/Projet La Villa/IMG_5605.JPG', alt: 'Affiche Conférence Kool Koor - typographie' },
    ],
  ];

  const colors = [
    { name: 'Bleu Klein', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
    { name: 'Gris/Beige', hex: '#B8B5AA', rgb: 'rgb(184, 181, 170)' },
    { name: 'Blanc', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
  ];

  return (
    <>
      {/* Hero Section */}
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
                BRANDING · 2024
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal mb-8 leading-[0.95]">
                La Villa
              </h1>
              <p className="text-2xl md:text-3xl text-secondary/60 font-light">
                Fondation Culturelle
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg grain-overlay">
              <Image
                src="/Projet La Villa/hero-triptyque.png"
                alt="La Villa - Triptyque affiches festival"
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
                  Identité visuelle complète pour une fondation culturelle du Jura suisse. Logo, charte graphique, système d'illustrations géométriques et déclinaisons sur l'ensemble des supports de communication — affiches, flyers, posts Instagram.
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

              {/* Color Palette Section */}
              <ScrollReveal delay={0.15}>
                <div className="mb-16">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-8">
                    Palette de couleurs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {colors.map((color) => (
                      <div key={color.hex} className="glass-surface p-6 rounded-lg">
                        <div
                          className="w-full h-20 rounded-md mb-4 border border-secondary/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="font-display text-lg mb-2 text-foreground">{color.name}</p>
                        <p className="text-xs font-mono text-secondary/60">{color.hex}</p>
                        <p className="text-xs font-mono text-secondary/40">{color.rgb}</p>
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
                    Une identité culturelle forte et distinctive qui a transformé la présence visuelle de La Villa.
                    Le système graphique modulaire — basé sur un bleu Klein signature et des formes géométriques —
                    permet une infinité de déclinaisons tout en maintenant une cohérence parfaite.
                    La fondation bénéficie désormais d'une reconnaissance immédiate dans le paysage culturel jurassien.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Project Info Sidebar */}
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
                        La Villa — Fondation Culturelle
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Année
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        2024
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Catégorie
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        Branding
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-3">
                        Lieu
                      </p>
                      <p className="text-lg font-display font-normal text-foreground">
                        Jura, Suisse
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - 2 Columns */}
      <section className="py-24 lg:py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-12">
              Galerie
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="space-y-8 lg:space-y-12">
              {galleryImages[0].map((image, index) => (
                <ScrollReveal key={image.src} delay={index * 0.1}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-8 lg:space-y-12 md:mt-24">
              {galleryImages[1].map((image, index) => (
                <ScrollReveal key={image.src} delay={index * 0.1 + 0.05}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Projet similaire */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-normal mb-10 text-balance leading-tight">
              Vous avez un projet similaire ?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
              Créons ensemble une identité culturelle forte qui marque les esprits et résonne avec votre audience.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-foreground text-paper hover:opacity-90 transition-opacity duration-300 rounded-lg text-lg"
            >
              Parlons-en →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Next/Previous Projects Navigation */}
      <section className="py-24 lg:py-32 border-t border-secondary/10">
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
    </>
  );
}
