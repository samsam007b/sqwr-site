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

const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://sqwr.be' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://sqwr.be/contact' },
      ],
    },
    {
      '@type': 'ContactPage',
      '@id': 'https://sqwr.be/contact',
      name: 'Contact SQWR Studio',
      url: 'https://sqwr.be/contact',
      description: 'Démarrez votre projet de branding ou site web. Réponse sous 24h.',
      publisher: { '@id': 'https://sqwr.be/#organization' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'studio@sqwr.be',
        telephone: '+32-493-30-27-52',
        areaServed: 'BE',
        availableLanguage: ['fr', 'en', 'nl'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage />
    </>
  );
}
