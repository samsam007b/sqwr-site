import { Metadata } from 'next';
import VillaColadeiraContent from '@/components/VillaColadeiraContent';

export const metadata: Metadata = {
  title: 'Villa Coladeira — Site & Gestion Villa Cap-Vert | sqwr.',
  description: 'Site web et application de gestion complète pour une villa de luxe à São Vicente, Cap-Vert. 6 suites, piscine à débordement. Système de réservation, gestion des dépenses, rapports financiers, blog. 5 langues.',
  openGraph: {
    title: 'Villa Coladeira — Site & App de Gestion | SQWR Studio',
    description: 'Site web et application de gestion pour une villa de luxe au Cap-Vert. Réservations, Stripe, 5 langues, dashboard admin.',
    url: 'https://sqwr.be/portfolio/villa-coladeira',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/villa-coladeira',
  },
};

export default function VillaColadeiraPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Villa Coladeira — Site Web & Application de Gestion',
    description: 'Site web de présentation et application de gestion complète pour une villa de luxe au Cap-Vert. Réservations en ligne, gestion des dépenses, rapports financiers, 5 langues.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2025-09',
    url: 'https://sqwr.be/portfolio/villa-coladeira',
    keywords: 'site web, application de gestion, villa de luxe, Cap-Vert, réservations, Stripe, multilingue, Next.js, Supabase',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Contenu SEO statique — visible par les crawlers */}
      <div className="sr-only">
        <h1>Villa Coladeira — Site & Application de Gestion — Projet SQWR Studio</h1>
        <p>Site web et application full-stack pour une villa de luxe à São Vicente, Cap-Vert. 6 suites, piscine à débordement, expériences exclusives.</p>
        <p>Fonctionnalités : système de réservation avec Stripe, gestion des dépenses avec OCR (Tesseract.js), rapports financiers, génération de factures PDF, blog, journal de maintenance. 5 langues (FR/EN/DE/NL/PT).</p>
        <p>Stack technique : Next.js 16 + Supabase + Stripe + Resend + Recharts + React Hook Form + Zod.</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <VillaColadeiraContent />
    </>
  );
}
