import type { Metadata } from 'next';
import MentionsLegalesContent from '@/components/MentionsLegalesContent';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de SQWR Studio, agence créative à Bruxelles.',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />;
}
