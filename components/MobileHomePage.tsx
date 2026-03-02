'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

const projects = getFeaturedProjects();

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function MobileHomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-[100svh]">

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-between px-6 pt-24 pb-12 overflow-hidden" style={{ height: '100svh', minHeight: '560px' }}>

        {/* Grain statique (pas d'animation pour les perfs) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10"
        >
          <Image
            src="/Logo SQWR/sqwr-logo.svg"
            alt="SQWR Studio"
            width={120}
            height={58}
            priority
            className="h-8 w-auto"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/50 mb-5">
            Studio cr&eacute;atif &middot; Bruxelles
          </p>
          <h1 className="font-display font-normal leading-[1.08] tracking-[-0.02em] text-foreground" style={{ fontSize: 'clamp(2rem, 9vw, 3.5rem)' }}>
            Identit&eacute;s visuelles<br />
            &amp; sites web<br />
            <span className="text-primary">sur-mesure.</span>
          </h1>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-3"
        >
          <a
            href="#projets"
            className="flex items-center justify-between px-6 py-4 border border-foreground/20 text-foreground text-sm font-mono uppercase tracking-[0.12em] active:bg-foreground/5 transition-colors duration-200"
          >
            <span>Nos projets</span>
            <span className="text-base leading-none text-secondary/40">↓</span>
          </a>
        </motion.div>
      </section>

      {/* ── PROJETS ── */}
      <section id="projets" className="px-6 py-16">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/50 mb-10"
        >
          Projets r&eacute;cents
        </motion.p>

        <div className="flex flex-col gap-14">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-8%' }}
            >
              <Link href={`/portfolio/${project.id}`} className="block group">
                {/* Image */}
                <div
                  className="relative w-full mb-5 overflow-hidden"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
                    quality={80}
                  />
                  {/* Barre couleur projet */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: project.color }}
                  />
                </div>

                {/* Meta */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/50 block mb-1">
                      {project.categoryLabel}&nbsp;&middot;&nbsp;{project.year}
                    </span>
                    <h2 className="font-display font-normal text-2xl text-foreground group-active:text-primary transition-colors duration-200">
                      {project.title}
                    </h2>
                  </div>
                  <span className="text-xl text-secondary/30 mt-1 group-active:text-primary transition-colors duration-200 flex-shrink-0 ml-4">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Lien vers portfolio complet */}
        <motion.div
          custom={projects.length + 1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="mt-12"
        >
          <Link
            href="/portfolio"
            className="flex items-center justify-between w-full px-6 py-4 border border-foreground/15 text-foreground text-sm font-mono uppercase tracking-[0.12em] active:bg-foreground/5 transition-colors duration-200"
          >
            <span>Voir tous les projets</span>
            <span className="text-base leading-none text-secondary/40">→</span>
          </Link>
        </motion.div>
      </section>

      {/* ── CONTACT RAPIDE ── */}
      <section className="bg-foreground px-6 py-16 relative overflow-hidden">
        {/* Ligne rouge accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-paper/30 mb-8"
        >
          Bruxelles, Belgique
        </motion.p>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="font-display font-normal leading-tight text-paper mb-12"
          style={{ fontSize: 'clamp(1.75rem, 8vw, 3rem)' }}
        >
          Parlons de<br />votre projet.
        </motion.h2>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-8%' }}
          className="flex flex-col gap-3 mb-10"
        >
          {/* Téléphone — priorité absolue sur mobile */}
          <a
            href="tel:+32493302752"
            className="flex items-center justify-between px-6 py-5 border border-paper/10 text-paper active:bg-paper/10 transition-colors duration-200"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-paper/40 block mb-1">
                T&eacute;l&eacute;phone
              </span>
              <span className="text-lg font-light">+32 493 30 27 52</span>
            </div>
            <span className="text-paper/30 text-xl flex-shrink-0 ml-4">↗</span>
          </a>

          {/* Email */}
          <a
            href="mailto:studio@sqwr.be"
            className="flex items-center justify-between px-6 py-5 border border-paper/10 text-paper active:bg-paper/10 transition-colors duration-200"
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-paper/40 block mb-1">
                Email
              </span>
              <span className="text-lg font-light">studio@sqwr.be</span>
            </div>
            <span className="text-paper/30 text-xl flex-shrink-0 ml-4">↗</span>
          </a>
        </motion.div>

        {/* Padding bas pour le floating CTA */}
        <div className="h-6" />
      </section>

    </div>
  );
}
