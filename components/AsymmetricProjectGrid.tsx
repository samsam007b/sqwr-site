'use client';

import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/app/data/projects';

interface AsymmetricProjectGridProps {
  projects: Project[];
}

const AsymmetricProjectGrid = ({ projects }: AsymmetricProjectGridProps) => {
  return (
    <div className="space-y-16 lg:space-y-24">
      {projects.map((project, index) => (
        <ScrollReveal key={project.id} delay={0.1}>
          <ProjectCard
            title={project.title}
            client={project.client}
            category={project.categoryLabel}
            year={project.year}
            color={project.color}
            image={project.image}
            href={`/portfolio/${project.id}`}
            aspectRatio="16/9"
            size="large"
          />
        </ScrollReveal>
      ))}
    </div>
  );
};

export default AsymmetricProjectGrid;
