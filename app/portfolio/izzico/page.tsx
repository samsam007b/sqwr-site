import { Metadata } from 'next';
import IzzicoContent from '@/components/IzzicoContent';

export const metadata: Metadata = {
  title: 'izzico — Branding & App Co-Living | sqwr.',
  description: 'Identité visuelle complète et design système pour izzico, une plateforme de co-living et colocation. Logo, couleurs, typographie, UI/UX web et iOS.',
  openGraph: {
    title: 'izzico — Branding & App Co-Living | SQWR Studio',
    description: 'Identité visuelle complète et design système pour izzico, une plateforme de co-living et colocation.',
    url: 'https://sqwr.be/portfolio/izzico',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/izzico',
  },
};

export default function IzzicoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'izzico — Brand Identity & App Design',
    description: 'Identité de marque complète et design UI/UX pour une plateforme de co-living. Web app Next.js + iOS app SwiftUI.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2025-06',
    keywords: 'branding, design système, co-living, iOS app, web app, UI/UX, Bruxelles',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Contenu SEO statique — visible par les crawlers */}
      <div className="sr-only">
        <h1>izzico — Brand Identity & Design Système — Projet SQWR Studio</h1>
        <p>Identité visuelle complète pour izzico : plateforme de co-living et colocation. Logo, palette de couleurs (violet, rouge, orange), typographie, design système complet.</p>
        <p>Services réalisés : brand identity, design système, UI/UX web app (Next.js), UI/UX iOS app (SwiftUI), iconographie, motion design.</p>
        <p>Trois rôles utilisateur : Searcher (cherche un co-living), Resident (vit dans un co-living), Owner (gère ses biens).</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <IzzicoContent />
    </>
  );
}
