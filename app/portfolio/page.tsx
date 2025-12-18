'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import OrigamiSquare from '@/components/OrigamiSquare';
import { projects, getProjectsByCategory } from '@/app/data/projects';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'branding', label: 'Branding' },
    { id: 'web', label: 'Web Design' },
    { id: 'print', label: 'Print' },
    { id: 'social', label: 'Social Media' },
  ];

  const filteredProjects = getProjectsByCategory(activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-wider text-primary mb-6">
              Portfolio
            </p>
            <h1 className="font-display font-normal mb-8 text-balance text-foreground">
              Nos réalisations créatives
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary max-w-3xl leading-relaxed font-light">
              Découvrez une sélection de projets qui illustrent notre approche
              créative et notre expertise en design.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Origami Square Animation */}
      <section className="py-16 lg:py-20">
        <ScrollReveal>
          <OrigamiSquare />
        </ScrollReveal>
      </section>

      {/* Filter */}
      <section className="pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-lg text-sm font-sans transition-all duration-200 ${
                    activeFilter === category.id
                      ? 'bg-primary text-paper'
                      : 'glass-surface text-foreground hover:bg-primary/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16 lg:space-y-24">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={0.1}>
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  category={project.categoryLabel}
                  year={project.year}
                  color={project.color}
                  image={project.image}
                  href={`/portfolio/${project.id}`}
                  aspectRatio="16/9"
                  size="large"
                />
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-secondary">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display font-normal mb-6 text-balance text-foreground">
              Votre projet mérite le même niveau d'excellence
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto font-light">
              Travaillons ensemble pour créer quelque chose d'unique et
              mémorable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-paper rounded-lg hover:bg-primary/90 transition-colors duration-200 font-sans"
            >
              Démarrer un projet
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
