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
      {/* Contenu sémantique serveur-rendu pour Google (homepage = canvas GSAP, ssr:false) */}
      <section className="sr-only">
        <h1>SQWR Studio — Agence créative à Bruxelles</h1>
        <p>Studio créatif indépendant à Bruxelles. Identités visuelles dès 800€, sites web React/Next.js dès 1000€. Samuel &amp; Joakim Baudon.</p>
        <ul>
          <li>Branding &amp; identité visuelle</li>
          <li>Développement web sur-mesure</li>
          <li>Studio basé à Bruxelles, Belgique</li>
        </ul>
        <p>Découvrez nos <Link href="/services">services</Link>, notre <Link href="/portfolio">portfolio</Link> et notre <Link href="/blog">blog branding &amp; web</Link>.</p>
        <p>Contactez-nous : studio@sqwr.be · +32 493 30 27 52</p>
      </section>
      <HomePageWrapper />
    </>
  );
}
