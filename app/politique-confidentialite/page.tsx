import type { Metadata } from 'next';
import PrivacyContent from '@/components/PrivacyContent';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et traitement des données personnelles de SQWR Studio.',
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return <PrivacyContent />;
}
