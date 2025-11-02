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

  // Accordion fold animation variants - optimized for faster reveal
  const accordionVariants = {
    hidden: {
      scaleX: 0.5,
      opacity: 0.7,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Pixel grid settings - optimized for performance (120 squares)
  const gridCols = 10;
  const gridRows = 12;
  const totalSquares = gridCols * gridRows;

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
              {/* Base image - single load, much more performant */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes={imageSizes}
                  quality={imageQuality}
                  priority={size === 'large'}
                />
              </motion.div>

              {/* Pixelated reveal grid - squares that disappear to reveal image */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                  gap: '0px',
                }}
              >
                {Array.from({ length: totalSquares }, (_, i) => {
                  const row = Math.floor(i / gridCols);
                  const col = i % gridCols;

                  // Create organic wave effect from top-left
                  const distanceFromOrigin = Math.sqrt(row * row + col * col);
                  const maxDistance = Math.sqrt(gridRows * gridRows + gridCols * gridCols);
                  const normalizedDistance = distanceFromOrigin / maxDistance;

                  // Add subtle randomness for organic feel
                  const randomOffset = (Math.random() - 0.5) * 0.08;

                  return (
                    <motion.div
                      key={i}
                      className="relative"
                      style={{
                        backgroundColor: 'var(--foreground)',
                        boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.15)',
                      }}
                      initial={{
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={isInView ? {
                        opacity: 0,
                        scale: 0.85,
                      } : {
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + (normalizedDistance * 0.45) + randomOffset,
                        ease: [0.33, 1, 0.68, 1], // easeOutCubic for smooth deceleration
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* Dark overlay for better text contrast */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-80 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              />
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
            <motion.div
              className="absolute top-4 right-4 glass-surface px-3 py-1 rounded z-30 transition-opacity duration-300 group-hover:opacity-90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, delay: 0.6 }}
            >
              <span className="text-xs font-mono text-foreground">{year}</span>
            </motion.div>
          )}
        </div>

        {/* Project Info */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
