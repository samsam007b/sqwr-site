'use client';

import { useState, useRef, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import ProjectCard from '@/components/ProjectCard';
import { projects, getProjectsByCategory } from '@/app/data/projects';
import { motion } from 'framer-motion';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          document.body.classList.add('cursor-on-dark');
        } else {
          document.body.classList.remove('cursor-on-dark');
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-on-dark');
    };
  }, []);

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
      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8"
              >
                Portfolio
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-normal leading-[0.95] text-foreground mb-12"
              >
                Nos réalisations<br />créatives
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              className="lg:col-start-5 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl text-secondary/60 leading-relaxed font-light">
                Découvrez une sélection de projets qui illustrent notre approche créative et notre
                expertise en design.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ─── FILTER ──────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 lg:px-16 border-b border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 text-xs font-mono uppercase tracking-[0.15em] transition-all duration-200 border-b-2 ${
                    activeFilter === category.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary/50 hover:text-foreground hover:border-secondary/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROJECTS GRID ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20 lg:space-y-32">
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
            <div className="text-center py-32">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA (dark) ──────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <ScrollReveal className="lg:col-span-7">
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper">
                Votre projet mérite<br />le même niveau<br />d'excellence
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
              <p className="text-lg text-paper/40 font-light leading-relaxed">
                Travaillons ensemble pour créer quelque chose d'unique et mémorable.
              </p>
              <div className="flex flex-col gap-4">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  Démarrer un projet
                </MagneticButton>
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-sm text-paper/30 font-light hover:text-paper/60 transition-colors duration-300 w-fit"
                >
                  studio@sqwr.be
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between">
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              SQWR Studio
            </span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
