'use client';

import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/app/data/projects';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AsymmetricProjectGridProps {
  projects: Project[];
}

const AsymmetricProjectGrid = ({ projects }: AsymmetricProjectGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (projects.length === 0) return null;

  // Layout pattern: first project large (full width),
  // then pairs in 7/12 + 5/12 staggered columns with vertical offset
  const [hero, ...rest] = projects;
  const pairs: Project[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    pairs.push(rest.slice(i, i + 2));
  }

  return (
    <div ref={ref} className="space-y-24 lg:space-y-32">
      {/* First project — full width, dramatic */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectCard
          title={hero.title}
          client={hero.client}
          category={hero.categoryLabel}
          year={hero.year}
          color={hero.color}
          image={hero.image}
          video={hero.video}
          mockup={hero.mockup}
          href={`/portfolio/${hero.id}`}
          aspectRatio="16/9"
          size="large"
        />
      </motion.div>

      {/* Paired projects — asymmetric 7/5 split with vertical stagger */}
      {pairs.map((pair, pairIndex) => (
        <div
          key={pairIndex}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6"
        >
          {pair.map((project, i) => {
            const isLeft = i === 0;
            // Alternate: first pair = large left / small right offset down
            // Second pair = small left offset down / large right
            const flipLayout = pairIndex % 2 === 1;
            const isLarge = flipLayout ? !isLeft : isLeft;

            return (
              <motion.div
                key={project.id}
                className={
                  isLarge
                    ? 'lg:col-span-7'
                    : 'lg:col-span-5 lg:mt-24'
                }
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  category={project.categoryLabel}
                  year={project.year}
                  color={project.color}
                  image={project.image}
                  video={project.video}
                  mockup={project.mockup}
                  href={`/portfolio/${project.id}`}
                  aspectRatio={isLarge ? '4/3' : '4/5'}
                  size={isLarge ? 'medium' : 'small'}
                />
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AsymmetricProjectGrid;
