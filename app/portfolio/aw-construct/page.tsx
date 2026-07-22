import { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import AwConstructContent from '@/components/AwConstructContent';

export const metadata: Metadata = {
  title: 'A.W Construct — Site Web Entreprise Générale | sqwr.',
  description: 'Refonte complète du site d\'une entreprise générale de construction à Bruxelles — 5 ans d\'expérience, 70+ chantiers. Direction créative, développement Next.js, SEO local.',
  openGraph: {
    title: 'A.W Construct — Site Web Entreprise Générale | SQWR Studio',
    description: 'Refonte complète du site d\'une entreprise générale de construction à Bruxelles — 5 ans d\'expérience, 70+ chantiers.',
    url: 'https://sqwr.be/portfolio/aw-construct',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/aw-construct',
  },
};

export default function AwConstructPage() {
  const project = projects.find((p) => p.id === 'aw-construct')!;
  const projectIndex = projects.findIndex((p) => p.id === 'aw-construct');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'A.W Construct — Site Web & Direction Créative',
    description: 'Refonte complète du site d\'une entreprise générale de construction à Bruxelles. Direction créative "blueprint industriel", développement Next.js, galerie de chantiers réels.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2026',
    keywords: 'web design, développement Next.js, construction, entreprise générale, Bruxelles, direction créative',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only">
        <h1>A.W Construct — Site Web & Direction Créative — Projet SQWR Studio</h1>
        <p>Refonte complète du site d&apos;Amaury Waty, entreprise générale de construction à Bruxelles — 5 ans d&apos;expérience, plus de 70 chantiers réalisés.</p>
        <p>Services réalisés : direction créative, développement Next.js, galerie de chantiers, SEO local, formulaire de devis en ligne.</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <AwConstructContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
