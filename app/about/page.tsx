import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'À propos — Studio familial bruxellois',
  description:
    'Samuel et Joakim Baudon, deux frères fondateurs de SQWR Studio à Bruxelles depuis 2024. Formation La Cambre & IHECS. Design et stratégie sans intermédiaire.',
  alternates: {
    canonical: 'https://sqwr.be/about',
  },
  openGraph: {
    title: 'À propos — Studio familial bruxellois | SQWR Studio',
    description:
      'Deux frères. La Cambre + IHECS. Branding et web sur-mesure à Bruxelles depuis 2024.',
    url: 'https://sqwr.be/about',
    type: 'website',
  },
};

export default function Page() {
  return <AboutPage />;
}
