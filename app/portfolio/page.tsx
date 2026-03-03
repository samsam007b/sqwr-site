import type { Metadata } from 'next';
import PortfolioPage from '@/components/pages/PortfolioPage';

export const metadata: Metadata = {
  title: 'Portfolio — Projets branding & web sélectionnés',
  description:
    'La Villa, Nanou Mendels, izzico, Villa Coladeira. Nos réalisations en identité visuelle, branding et développement web à Bruxelles.',
  alternates: {
    canonical: 'https://sqwr.be/portfolio',
  },
  openGraph: {
    title: 'Portfolio — Projets branding & web | SQWR Studio',
    description:
      'Découvrez nos projets : La Villa, Nanou Mendels, izzico, Villa Coladeira. Branding et sites web sur-mesure.',
    url: 'https://sqwr.be/portfolio',
    type: 'website',
  },
};

export default function Page() {
  return <PortfolioPage />;
}
