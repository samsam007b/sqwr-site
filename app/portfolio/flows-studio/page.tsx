import { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import FlowsStudioContent from '@/components/FlowsStudioContent';

export const metadata: Metadata = {
  title: 'Flows Studio — Branding & Site Web | sqwr.',
  description: 'Co-fondation de marque avec Flows Studio, studio B2B d\'agents IA — direction de marque éditoriale chaleureuse, site web, développement Next.js.',
  openGraph: {
    title: 'Flows Studio — Branding & Site Web | SQWR Studio',
    description: 'Co-fondation de marque avec Flows Studio, studio B2B d\'agents IA — direction de marque éditoriale chaleureuse, site web.',
    url: 'https://sqwr.be/portfolio/flows-studio',
    siteName: 'SQWR Studio',
    locale: 'fr_BE',
    type: 'article',
  },
  alternates: {
    canonical: 'https://sqwr.be/portfolio/flows-studio',
  },
};

export default function FlowsStudioPage() {
  const project = projects.find((p) => p.id === 'flows-studio')!;
  const projectIndex = projects.findIndex((p) => p.id === 'flows-studio');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Flows Studio — Direction de marque & Site Web',
    description: 'Co-fondation de marque avec Flows Studio, studio B2B d\'agents IA. Direction de marque éditoriale chaleureuse (encre, crème, sauge, terracotta), site web, développement Next.js.',
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
    },
    dateCreated: '2026',
    keywords: 'branding, direction de marque, site web, agents IA, co-fondation, Next.js',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only">
        <h1>Flows Studio — Direction de marque & Site Web — Projet SQWR Studio</h1>
        <p>Co-fondation de marque avec Flows Studio, studio B2B d&apos;agents IA co-fondé par Samuel Baudon avec Alexandre Wirtz (AW&amp;CO).</p>
        <p>Services réalisés : direction de marque, identité visuelle, site web, développement Next.js.</p>
        <p>Réalisé par SQWR Studio — Agence créative Bruxelles — sqwr.be</p>
      </div>
      <FlowsStudioContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
