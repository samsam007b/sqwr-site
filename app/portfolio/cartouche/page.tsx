import { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import CartoucheContent from '@/components/CartoucheContent';

export const metadata: Metadata = {
  title: 'Cartouche — Branding & Site Charter Yacht de Luxe | sqwr.',
  description: 'Direction créative, site charter et dashboard admin PWA pour Cartouche, catamaran de luxe 28,8m disponible en charter privé. Palette navy/limestone/brass, développement Next.js.',
  openGraph: {
    title: 'Cartouche — Branding & Site Charter Yacht de Luxe | SQWR Studio',
    description: 'Direction créative, site charter et dashboard admin PWA pour un catamaran de luxe 28,8m en charter privé.',
    url: 'https://sqwr.be/portfolio/cartouche',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/cartouche',
  },
};

export default function CartouchePage() {
  const project = projects.find((p) => p.id === 'cartouche')!;
  const projectIndex = projects.findIndex((p) => p.id === 'cartouche');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Cartouche — Branding & Site Charter',
    description: 'Direction créative complète, site charter 9 pages et dashboard admin bilingue PWA pour Cartouche, catamaran de luxe Blue Coast 95 (28,8m) disponible en charter privé.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2026',
    keywords: 'branding, site charter, yacht de luxe, catamaran, dashboard admin, PWA, direction créative',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only">
        <h1>Cartouche — Branding & Site Charter — Projet SQWR Studio</h1>
        <p>Direction créative complète, site charter et dashboard admin PWA pour Cartouche, catamaran de luxe Blue Coast 95 de 28,8m disponible en charter privé.</p>
        <p>Services réalisés : identité de marque, site web charter, dashboard admin bilingue, développement PWA iOS.</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <CartoucheContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
