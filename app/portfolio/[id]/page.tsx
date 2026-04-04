import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import PortfolioDetailContent from '@/components/PortfolioDetailContent';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Projet non trouvé',
    };
  }

  return {
    title: `${project.title} — ${project.categoryLabel} ${project.year}`,
    description: `${project.description} Réalisé par SQWR Studio à Bruxelles.`,
    alternates: {
      canonical: `https://sqwr.be/portfolio/${project.id}`,
    },
    openGraph: {
      title: `${project.title} — ${project.client} | SQWR Studio`,
      description: project.description,
      url: `https://sqwr.be/portfolio/${project.id}`,
      type: 'website',
      images: [
        {
          url: `https://sqwr.be${project.image}`,
          width: 1200,
          height: 630,
          alt: `${project.title} — ${project.client}`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      url: 'https://sqwr.be',
      '@id': 'https://sqwr.be/#organization',
    },
    dateCreated: project.year,
    image: `https://sqwr.be${project.image}`,
    genre: project.categoryLabel,
    url: `https://sqwr.be/portfolio/${project.id}`,
    ...(project.url && { sameAs: project.url }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://sqwr.be',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://sqwr.be/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://sqwr.be/portfolio/${project.id}`,
      },
    ],
  };

  const projectIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PortfolioDetailContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
