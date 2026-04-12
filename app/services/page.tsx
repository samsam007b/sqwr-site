import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/ServicesPage';

export const metadata: Metadata = {
  title: 'Services — Branding & Web React/Next.js sur-mesure | SQWR Studio',
  description:
    'Branding dès €1 500, sites web React/Next.js dès €1 500, apps web dès €3 500. Code propriétaire, prix transparents. Studio indépendant bruxellois.',
  alternates: {
    canonical: 'https://sqwr.be/services',
  },
  openGraph: {
    title: 'Services — Votre marque. Votre code. | SQWR Studio Bruxelles',
    description:
      'Branding dès €1 500, sites web React/Next.js dès €1 500, apps web dès €3 500. Code propriétaire, prix transparents. Studio indépendant bruxellois.',
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
      name: 'Combien coûte un branding chez SQWR Studio ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos projets branding démarrent à €1 500 (Signature) et vont jusqu\'à €2 800 (Flagship). Le Signature inclut logo principal + 2 déclinaisons, palette couleurs, typographies, charte graphique PDF et fichiers sources. Le Flagship ajoute le système de design complet, motion logo, direction éditoriale et assets sociaux.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un site web React/Next.js sur-mesure chez SQWR Studio ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos sites web React/Next.js sur-mesure démarrent à €1 500 (Signature, 4–6 pages) et vont jusqu\'à €3 000 (Flagship). Vous possédez le code pour toujours — pas d\'abonnement Shopify ou Wix. Nos sites atteignent 90+ en Core Web Vitals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi choisir un site sur-mesure plutôt que Shopify ou Wix ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Shopify facture €100+/mois pour toujours. Avec SQWR, vous payez une fois et possédez votre code. Nos sites React/Next.js atteignent 90+ en Core Web Vitals, contre 40–60 pour les builders standard. Et votre design est unique — pas partagé avec 50 000 autres boutiques.',
      },
    },
    {
      '@type': 'Question',
      name: "Qu'est-ce que l'audit stratégique à €500 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'audit stratégique à €500 comprend une analyse de votre positionnement de marque, un audit SEO technique avec score et recommandations, une revue UI/UX de votre site actuel, un benchmark de 3 concurrents directs, une roadmap créative sur 6 mois et une session Zoom 1h avec Samuel. Ce montant est intégralement crédité si vous lancez un projet avec nous.",
      },
    },
    {
      '@type': 'Question',
      name: 'Développez-vous des applications web et mobiles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Nos applications web démarrent à €3 500 (MVP) et incluent auth complète, base de données Supabase/PostgreSQL, interface React/Next.js sur-mesure et API REST. Le tier Produit à €6 500 ajoute multi-rôles, dashboard analytics et intégrations API (Stripe, Slack, etc.). Le déploiement iOS via TestFlight est disponible sur devis.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://sqwr.be' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://sqwr.be/services' },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesPage />
    </>
  );
}
