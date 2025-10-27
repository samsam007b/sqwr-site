'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'branding', label: 'Branding' },
    { id: 'web', label: 'Web Design' },
    { id: 'print', label: 'Print' },
    { id: 'social', label: 'Social Media' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Identité Visuelle Moderne',
      category: 'branding',
      categoryLabel: 'Branding',
      image: '',
      href: '/portfolio/projet-1'
    },
    {
      id: 2,
      title: 'Site E-commerce Minimaliste',
      category: 'web',
      categoryLabel: 'Web Design',
      image: '',
      href: '/portfolio/projet-2'
    },
    {
      id: 3,
      title: 'Campagne Réseaux Sociaux',
      category: 'social',
      categoryLabel: 'Social Media',
      image: '',
      href: '/portfolio/projet-3'
    },
    {
      id: 4,
      title: 'Création Logo & Charte',
      category: 'branding',
      categoryLabel: 'Branding',
      image: '',
      href: '/portfolio/projet-4'
    },
    {
      id: 5,
      title: 'Magazine Print Editorial',
      category: 'print',
      categoryLabel: 'Print',
      image: '',
      href: '/portfolio/projet-5'
    },
    {
      id: 6,
      title: 'Application Mobile UI/UX',
      category: 'web',
      categoryLabel: 'Web Design',
      image: '',
      href: '/portfolio/projet-6'
    },
    {
      id: 7,
      title: 'Packaging Premium',
      category: 'branding',
      categoryLabel: 'Branding',
      image: '',
      href: '/portfolio/projet-7'
    },
    {
      id: 8,
      title: 'Flyers & Affiches',
      category: 'print',
      categoryLabel: 'Print',
      image: '',
      href: '/portfolio/projet-8'
    },
    {
      id: 9,
      title: 'Content Instagram',
      category: 'social',
      categoryLabel: 'Social Media',
      image: '',
      href: '/portfolio/projet-9'
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-balance">
              Nos réalisations créatives
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              Découvrez une sélection de projets qui illustrent notre approche
              créative et notre expertise en design.
            </p>
          </ScrollReveal>
        </div>
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
                  className={`px-6 py-3 text-sm tracking-wide transition-all duration-200 ${
                    activeFilter === category.id
                      ? 'bg-primary text-secondary'
                      : 'border border-gray-300 text-gray-700 hover:border-primary'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.05}>
                <ProjectCard
                  title={project.title}
                  category={project.categoryLabel}
                  image={project.image}
                  href={project.href}
                />
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
              Votre projet mérite le même niveau d'excellence
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Travaillons ensemble pour créer quelque chose d'unique et
              mémorable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-primary text-secondary hover:bg-primary/90 transition-colors duration-200"
            >
              Démarrer un projet
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
