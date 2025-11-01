'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Card3D from './Card3D';

interface ProjectCardProps {
  title: string;
  client?: string;
  category: string;
  year?: string;
  color: string;
  image?: string;
  href: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "4/5"
  size?: 'small' | 'medium' | 'large';
}

const ProjectCard = ({
  title,
  client,
  category,
  year,
  color,
  image,
  href,
  aspectRatio = '4/5',
  size = 'medium'
}: ProjectCardProps) => {
  // Dynamic sizing based on size prop
  const titleSize = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl lg:text-4xl'
  }[size];

  // Dynamic image quality based on size
  const imageQuality = {
    small: 75,
    medium: 80,
    large: 90
  }[size];

  // Dynamic sizes attribute for responsive images
  const imageSizes = {
    small: '(max-width: 768px) 100vw, 33vw',
    medium: '(max-width: 768px) 100vw, 50vw',
    large: '100vw'
  }[size];
  return (
    <Link href={href} className="group block">
      <Card3D intensity={3}>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-lg grain-overlay"
          style={{ aspectRatio }}
        >
          {image ? (
            <>
              {/* Real Image */}
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                sizes={imageSizes}
                quality={imageQuality}
                priority={size === 'large'}
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
          <h3 className={`${titleSize} font-display font-normal text-foreground group-hover:text-primary transition-colors duration-400`}>
            {title}
          </h3>
        </div>
        </motion.div>
      </Card3D>
    </Link>
  );
};

export default ProjectCard;
