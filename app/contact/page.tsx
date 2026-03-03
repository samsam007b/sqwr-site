import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact — Démarrer un projet créatif',
  description:
    'Lancez votre projet de branding ou site web avec SQWR Studio. Réponse sous 24h ouvrables. studio@sqwr.be · +32 493 30 27 52',
  alternates: {
    canonical: 'https://sqwr.be/contact',
  },
  openGraph: {
    title: 'Contact — Démarrer un projet | SQWR Studio Bruxelles',
    description:
      'Vous avez un projet ? Parlons-en. Réponse sous 24h. Studio créatif bruxellois, branding & web.',
    url: 'https://sqwr.be/contact',
    type: 'website',
  },
};

export default function Page() {
  return <ContactPage />;
}
