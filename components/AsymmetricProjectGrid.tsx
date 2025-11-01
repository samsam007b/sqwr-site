'use client';

import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/app/data/projects';

interface AsymmetricProjectGridProps {
  projects: Project[];
}

const AsymmetricProjectGrid = ({ projects }: AsymmetricProjectGridProps) => {
  // Split projects into groups: 1 full-width, then 2 side-by-side, repeat
  const renderProjects = () => {
    const elements = [];
    let index = 0;

    while (index < projects.length) {
      // Full-width project (16:9 aspect ratio)
      if (index < projects.length) {
        const project = projects[index];
        elements.push(
          <ScrollReveal key={`full-${project.id}`} delay={0.1}>
            <div className="mb-24 lg:mb-32">
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
            </div>
          </ScrollReveal>
        );
        index++;
      }

      // Two side-by-side projects (4:3 aspect ratio)
      if (index < projects.length) {
        const leftProject = projects[index];
        const rightProject = projects[index + 1];

        elements.push(
          <div key={`pair-${index}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 lg:mb-32">
            <ScrollReveal delay={0.1}>
              <ProjectCard
                title={leftProject.title}
                client={leftProject.client}
                category={leftProject.categoryLabel}
                year={leftProject.year}
                color={leftProject.color}
                image={leftProject.image}
                href={`/portfolio/${leftProject.id}`}
                aspectRatio="4/3"
                size="medium"
              />
            </ScrollReveal>

            {rightProject && (
              <ScrollReveal delay={0.2}>
                <ProjectCard
                  title={rightProject.title}
                  client={rightProject.client}
                  category={rightProject.categoryLabel}
                  year={rightProject.year}
                  color={rightProject.color}
                  image={rightProject.image}
                  href={`/portfolio/${rightProject.id}`}
                  aspectRatio="4/3"
                  size="medium"
                />
              </ScrollReveal>
            )}
          </div>
        );
        index += rightProject ? 2 : 1;
      }
    }

    return elements;
  };

  return <div className="space-y-0">{renderProjects()}</div>;
};

export default AsymmetricProjectGrid;
