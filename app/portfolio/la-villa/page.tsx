import { Metadata } from 'next';
import { projects } from '@/app/data/projects';
import LaVillaContent from '@/components/LaVillaContent';

export const metadata: Metadata = {
  title: 'La Villa - Fondation Culturelle | sqwr.',
  description: 'Identité visuelle complète pour une fondation culturelle du Jura suisse. Logo, charte graphique, système d\'illustrations géométriques et déclinaisons sur l\'ensemble des supports de communication.',
};

export default function LaVillaPage() {
  const project = projects.find((p) => p.id === 'la-villa')!;
  const projectIndex = projects.findIndex((p) => p.id === 'la-villa');
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <LaVillaContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
