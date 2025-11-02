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

  // Origami grid settings - balanced for performance and visual effect
  const gridCols = 8;
  const gridRows = 10;
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
              {/* Origami-style unfolding grid - each square unfolds to reveal its portion of the image */}
              <div
                className="absolute inset-0"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                  gap: '0px',
                  perspective: '1000px',
                }}
              >
                {Array.from({ length: totalSquares }, (_, i) => {
                  const row = Math.floor(i / gridCols);
                  const col = i % gridCols;

                  // Create wave effect from top-left corner
                  const distanceFromOrigin = Math.sqrt(row * row + col * col);
                  const maxDistance = Math.sqrt(gridRows * gridRows + gridCols * gridCols);
                  const normalizedDistance = distanceFromOrigin / maxDistance;

                  // Slight randomness for organic feel
                  const randomOffset = (Math.random() - 0.5) * 0.06;

                  return (
                    <motion.div
                      key={i}
                      className="relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${gridCols * 100}% ${gridRows * 100}%`,
                        backgroundPosition: `${(col / (gridCols - 1)) * 100}% ${(row / (gridRows - 1)) * 100}%`,
                        backgroundRepeat: 'no-repeat',
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center',
                        boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      initial={{
                        rotateX: 90,
                        opacity: 0,
                      }}
                      animate={isInView ? {
                        rotateX: 0,
                        opacity: 1,
                      } : {
                        rotateX: 90,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.05 + (normalizedDistance * 0.5) + randomOffset,
                        ease: [0.34, 1.56, 0.64, 1], // easeOutBack for slight overshoot (origami spring)
                      }}
                    />
                  );
                })}
              </div>

              {/* Dark overlay for better text contrast */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-700 group-hover:opacity-80 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
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
              className="absolute top-4 right-4 glass-surface px-3 py-1 rounded z-20 transition-opacity duration-300 group-hover:opacity-90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.65 }}
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
