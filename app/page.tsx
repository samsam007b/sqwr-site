import type { Metadata } from 'next';
import Link from 'next/link';
import HomePageWrapper from '@/components/pages/HomePageWrapper';

export const metadata: Metadata = {
  title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
  description: "Studio créatif indépendant à Bruxelles. Identités visuelles dès €800, sites web React/Next.js dès €1000. Samuel & Joakim Baudon. Devis gratuit sous 48h.",
  alternates: {
    canonical: 'https://sqwr.be',
  },
  openGraph: {
    title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    description: "Studio créatif indépendant à Bruxelles. Identités visuelles dès €800, sites web React/Next.js dès €1000. Devis gratuit sous 48h.",
    url: 'https://sqwr.be',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      {/* Navigation sémantique supplémentaire pour le crawl */}
      <nav className="sr-only" aria-label="Liens principaux SQWR Studio">
        <Link href="/services">Services : branding, web, audit stratégique</Link>
        <Link href="/portfolio">Portfolio : Villa Coladeira, izzico, Nanou Mendels, La Villa</Link>
        <Link href="/about">À propos de SQWR Studio — Samuel &amp; Joakim Baudon</Link>
        <Link href="/blog">Blog branding &amp; web Bruxelles</Link>
        <Link href="/contact">Devis gratuit sous 48h</Link>
      </nav>
      <HomePageWrapper />
    </>
  );
}
