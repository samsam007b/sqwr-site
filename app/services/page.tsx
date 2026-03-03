import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Services — Branding, Web React/Next.js & Social Media',
  description:
    'Identité visuelle dès €800, sites web sur-mesure React/Next.js dès €1000, stratégie social media. Studio créatif bruxellois. Samuel & Joakim Baudon.',
  alternates: {
    canonical: 'https://sqwr.be/services',
  },
  openGraph: {
    title: 'Services — Branding, Web & Social Media | SQWR Studio',
    description:
      'Identité visuelle dès €800, sites web sur-mesure dès €1000. Studio familial bruxellois, qualité agence, tarifs accessibles.',
    url: 'https://sqwr.be/services',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte une identité visuelle chez SQWR Studio ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos packages identité visuelle démarrent à €800. Ce tarif inclut le logo principal, déclinaisons couleur et noir-blanc, charte graphique de base et fichiers sources livrables.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un site web sur-mesure chez SQWR Studio ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos sites web React/Next.js sur-mesure démarrent à €1000. Le tarif final dépend de la complexité, du nombre de pages et des fonctionnalités requises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le délai de livraison pour un projet de branding ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Un projet d'identité visuelle est généralement livré en 2 à 4 semaines selon la complexité. Nous travaillons en 3 étapes : brief & exploration, proposition & révisions, livraison finale.",
      },
    },
    {
      '@type': 'Question',
      name: 'Travaillez-vous uniquement avec des clients à Bruxelles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Bien que basé à Bruxelles, SQWR Studio travaille avec des clients partout en Belgique et à l'international. Tous nos projets peuvent être gérés à distance.",
      },
    },
    {
      '@type': 'Question',
      name: "Qu'est-ce qui différencie SQWR Studio d'une grande agence ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vous travaillez directement avec les créateurs — Samuel (stratégie, web) et Joakim (design, direction artistique) — sans intermédiaire. Notre approche AI-driven nous permet d'offrir une qualité d'agence à des tarifs accessibles.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesPage />
    </>
  );
}
