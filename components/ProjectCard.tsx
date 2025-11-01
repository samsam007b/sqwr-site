'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  // Accordion fold animation variants
  const accordionVariants = {
    hidden: {
      scaleX: 0.3,
      opacity: 0.5,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Accordion bars animation
  const barsVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <Link href={href} className="group block" ref={ref}>
      <Card3D intensity={3}>
        <motion.div
          variants={accordionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ y: -2, scaleX: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
          style={{ transformOrigin: "center" }}
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

          {/* Accordion fold bars overlay */}
          <motion.div
            variants={barsVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute inset-0 flex pointer-events-none z-20"
          >
            {[...Array(10)].map((_, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-foreground"
                style={{
                  marginRight: index < 9 ? '2px' : '0',
                }}
                initial={{ scaleY: 1 }}
                animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.05,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Project Info */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
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
        </motion.div>
        </motion.div>
      </Card3D>
    </Link>
  );
};

export default ProjectCard;
