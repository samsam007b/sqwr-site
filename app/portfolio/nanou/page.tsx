import { Metadata } from 'next';
import NanouContent from '@/components/NanouContent';

export const metadata: Metadata = {
  title: 'Nanou Mendels — Massages & Naissance | sqwr.',
  description: 'Identité visuelle et site web pour une praticienne en massages thérapeutiques et accompagnement à la naissance. Palette cuivre & beige, typographie éditoriale, site multilingue FR/NL/EN/IT.',
  openGraph: {
    title: 'Nanou Mendels — Massages & Naissance | SQWR Studio',
    description: 'Identité visuelle et site web pour une praticienne en massages thérapeutiques et accompagnement à la naissance.',
    url: 'https://sqwr.be/portfolio/nanou',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/nanou',
  },
};

export default function NanouPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Nanou Mendels — Massages & Naissance',
    description: 'Identité visuelle et site web multilingue pour une praticienne en massages thérapeutiques.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2025-04',
    url: 'https://massages-et-naissance.com',
    keywords: 'branding, web design, site multilingue, massages, naissance, Bruxelles',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Contenu SEO statique — visible par les crawlers */}
      <div className="sr-only">
        <h1>Nanou Mendels — Massages & Naissance — Projet SQWR Studio</h1>
        <p>Identité visuelle complète et site web multilingue (FR/NL/EN/IT) pour une praticienne en massages thérapeutiques et accompagnement à la naissance à Bruxelles.</p>
        <p>Services réalisés : branding, charte graphique palette cuivre & beige, typographie éditoriale, développement web Next.js, internationalisation 4 langues, intégration formulaire de contact.</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <NanouContent />
    </>
  );
}
