import HeaderBrutal from '@/components/brutal/HeaderBrutal';
import HeroBrutal from '@/components/brutal/HeroBrutal';
import ServicesMarquee from '@/components/brutal/ServicesMarquee';
import SplitScreenNarrative from '@/components/brutal/SplitScreenNarrative';
import PortfolioGridBrutal from '@/components/brutal/PortfolioGridBrutal';
import DemoNote from '@/components/brutal/DemoNote';
import { projects } from '@/app/data/projects';

export const metadata = {
  title: 'Demo Brutal — SQWR Studio Expérimental',
  description: 'Exploration conceptuelle d\'une direction artistique brutaliste-luxe pour SQWR Studio',
};

export default function DemoBrutalPage() {
  // Sélectionner quelques projets pour la démo avec des tailles variées
  const demoProjects = [
    { ...projects[0], gridSize: 'large' as const },   // La Villa
    { ...projects[1], gridSize: 'medium' as const },  // Luxe Immo
    { ...projects[2], gridSize: 'small' as const },   // Festival Lumière
    { ...projects[3], gridSize: 'medium' as const },  // Bio Market
    { ...projects[4], gridSize: 'small' as const },   // Tech Startup
    { ...projects[5], gridSize: 'small' as const },   // Restaurant Fusion
  ].map((p, idx) => ({
    id: p.id,
    title: p.title,
    category: p.categoryLabel,
    image: p.image,
    year: p.year,
    gridSize: p.gridSize
  }));

  return (
    <>
      {/* Header Brutal avec menu pixel */}
      <HeaderBrutal />

      {/* Hero Brutal */}
      <HeroBrutal
        title="SQWR"
        subtitle="Studio Bruxellois · AI-Driven Design · Depuis 2016"
      />

      {/* Services Marquee */}
      <ServicesMarquee />

      {/* Split Screen 1: Philosophie AI-Driven */}
      <SplitScreenNarrative
        leftContent={{
          title: "Démocratiser le Design Premium",
          description: "Notre approche AI-driven nous permet d'automatiser les tâches répétitives pour nous concentrer sur l'essentiel : la Création pure. Qualité agence, prix accessible.",
          background: "black"
        }}
        rightContent={{
          title: "Studio Familial, Qualité Agence",
          description: "Samuel (Stratégie & Relations Publiques), Jean-Pierre (Design & 15 ans d'expérience), Joakim (Direction Artistique & La Cambre). Trois générations, une vision.",
          background: "white"
        }}
      />

      {/* Portfolio Grid Brutal */}
      <PortfolioGridBrutal projects={demoProjects} />

      {/* Split Screen 2: Approche vs Résultats */}
      <SplitScreenNarrative
        leftContent={{
          title: "Chaque Projet est Unique",
          description: "Du site vitrine au e-commerce complexe, de l'identité de marque à la stratégie digitale complète. Nous adaptons notre approche à vos besoins spécifiques.",
          background: "white"
        }}
        rightContent={{
          title: "De Bruxelles à L'International",
          description: "Basés à Bruxelles, nous travaillons avec des clients belges et internationaux. Notre expertise multilingue (FR/EN/NL/DE) nous permet de servir une clientèle diversifiée.",
          background: "black"
        }}
      />

      {/* Note explicative */}
      <DemoNote />
    </>
  );
}
