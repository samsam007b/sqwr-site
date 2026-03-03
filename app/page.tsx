import type { Metadata } from 'next';
import HomePageWrapper from '@/components/pages/HomePageWrapper';

export const metadata: Metadata = {
  title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
  description: "Studio créatif familial à Bruxelles. Identités visuelles dès €800, sites web React/Next.js dès €1000. Samuel & Joakim Baudon. Devis gratuit sous 48h.",
  alternates: {
    canonical: 'https://sqwr.be',
  },
  openGraph: {
    title: "SQWR Studio — Agence créative Bruxelles | Branding & Web sur-mesure",
    description: "Studio créatif familial à Bruxelles. Identités visuelles dès €800, sites web React/Next.js dès €1000. Devis gratuit sous 48h.",
    url: 'https://sqwr.be',
    type: 'website',
  },
};

export default function Home() {
  return <HomePageWrapper />;
}
