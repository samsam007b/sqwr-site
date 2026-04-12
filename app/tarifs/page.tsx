import type { Metadata } from 'next';
import TarifsPage from '@/components/pages/TarifsPage';

export const metadata: Metadata = {
  title: 'Tarifs & FAQ — Branding et Web sur-mesure',
  description: 'Tarifs transparents SQWR Studio : branding dès €1 500, site web dès €1 500, audit €750. Modalités de paiement, révisions incluses, propriété du code. FAQ complète.',
  alternates: {
    canonical: 'https://sqwr.be/tarifs',
  },
  openGraph: {
    title: 'Tarifs & FAQ — SQWR Studio',
    description: 'Tarifs transparents, modalités de paiement claires, FAQ honnête. Tout ce que vous voulez savoir avant de démarrer un projet.',
    url: 'https://sqwr.be/tarifs',
    type: 'website',
  },
};

export default function Tarifs() {
  return <TarifsPage />;
}
