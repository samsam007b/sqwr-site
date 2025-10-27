'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
}

const ProjectCard = ({ title, category, image, href }: ProjectCardProps) => {
  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative aspect-[4/5] overflow-hidden bg-gray-100"
      >
        {/* Placeholder for image - replace with actual Image component when images are available */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
      </motion.div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
          {category}
        </p>
        <h3 className="text-xl font-display font-semibold group-hover:opacity-70 transition-opacity">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
