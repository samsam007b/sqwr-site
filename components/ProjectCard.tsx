'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  client?: string;
  category: string;
  year?: string;
  color: string;
  image?: string;
  href: string;
}

const ProjectCard = ({ title, client, category, year, color, image, href }: ProjectCardProps) => {
  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg grain-overlay">
          {image ? (
            <>
              {/* Real Image */}
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
            </>
          ) : (
            <>
              {/* Fallback gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                }}
              />
              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                }}
              />
            </>
          )}

          {/* Year badge */}
          {year && (
            <div className="absolute top-4 right-4 glass-surface px-3 py-1 rounded z-10 transition-opacity duration-300 group-hover:opacity-90">
              <span className="text-xs font-mono text-foreground">{year}</span>
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">
              {category}
            </span>
            {client && (
              <span className="text-xs font-mono text-secondary/40">{client}</span>
            )}
          </div>
          <h3 className="text-2xl font-display font-normal text-foreground group-hover:text-primary transition-colors duration-400">
            {title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
