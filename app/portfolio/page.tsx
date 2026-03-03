import type { Metadata } from 'next';
import PortfolioPage from '@/components/pages/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio — Projets branding & web sélectionnés',
  description:
    'La Villa, Massages et Naissance, izzico, Villa Coladeira. Nos réalisations en identité visuelle, branding et développement web à Bruxelles.',
  alternates: {
    canonical: 'https://sqwr.be/portfolio',
  },
  openGraph: {
    title: 'Portfolio — Projets branding & web | SQWR Studio',
    description:
      'Découvrez nos projets : La Villa, Massages et Naissance, izzico, Villa Coladeira. Branding et sites web sur-mesure.',
    url: 'https://sqwr.be/portfolio',
    type: 'website',
  },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://sqwr.be' },
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://sqwr.be/portfolio' },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': 'https://sqwr.be/portfolio',
      name: 'Portfolio SQWR Studio — Branding & Web',
      url: 'https://sqwr.be/portfolio',
      description: 'Réalisations en identité visuelle, branding et développement web. La Villa, Massages et Naissance, izzico, Villa Coladeira.',
      publisher: { '@id': 'https://sqwr.be/#organization' },
      hasPart: [
        { '@type': 'CreativeWork', name: 'La Villa — Identité visuelle', url: 'https://sqwr.be/portfolio/la-villa', dateCreated: '2024-12-01' },
        { '@type': 'CreativeWork', name: 'Massages et Naissance — Site web', url: 'https://sqwr.be/portfolio/nanou', dateCreated: '2025-04-01' },
        { '@type': 'CreativeWork', name: 'izzico — Branding startup', url: 'https://sqwr.be/portfolio/izzico', dateCreated: '2025-06-01' },
        { '@type': 'CreativeWork', name: 'Villa Coladeira — Site web', url: 'https://sqwr.be/portfolio/villa-coladeira', dateCreated: '2025-09-01' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <PortfolioPage />
    </>
  );
}
