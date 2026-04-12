import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'À propos — Studio fondateur bruxellois',
  description:
    'Samuel et Joakim Baudon, deux frères fondateurs de SQWR Studio à Bruxelles depuis 2024. Formation La Cambre & IHECS. Design et stratégie sans intermédiaire.',
  alternates: {
    canonical: 'https://sqwr.be/about',
  },
  openGraph: {
    title: 'À propos — Studio fondateur bruxellois | SQWR Studio',
    description:
      'Deux frères. La Cambre + IHECS. Branding et web sur-mesure à Bruxelles depuis 2024.',
    url: 'https://sqwr.be/about',
    type: 'website',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://sqwr.be' },
        { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://sqwr.be/about' },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://sqwr.be/#samuel-baudon',
      name: 'Samuel Baudon',
      jobTitle: 'Directeur Stratégie',
      worksFor: { '@id': 'https://sqwr.be/#organization' },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'IHECS',
          description: 'Institut des Hautes Études des Communications Sociales, Bruxelles — Master Relations Publiques & Affaires Européennes',
        },
      ],
      url: 'https://sqwr.be/about',
      sameAs: [
        'https://www.linkedin.com/in/samuelbaudon/',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://sqwr.be/#joakim-baudon',
      name: 'Joakim Baudon',
      jobTitle: 'Directeur Créatif',
      worksFor: { '@id': 'https://sqwr.be/#organization' },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'La Cambre',
          description: 'École Nationale Supérieure des Arts Visuels de La Cambre, Bruxelles',
        },
      ],
      url: 'https://sqwr.be/about',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPage />
    </>
  );
}
