'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Wave Sinusoidal grid settings - 3x3 grid for optimal performance
  const gridCols = 3;
  const gridRows = 3;
  const totalSquares = gridCols * gridRows;

  // Helper to get square position
  const getSquarePosition = (index: number) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    return { row, col };
  };

  // Handle mouse move to track position relative to container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // 0-100%
    const y = ((e.clientY - rect.top) / rect.height) * 100; // 0-100%
    setMousePosition({ x, y });
  };

  return (
    <Link href={href} className="group block" ref={ref}>
      <Card3D intensity={3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ y: -2 }}
          className="relative"
        >
        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-lg grain-overlay"
          style={{ aspectRatio }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {image ? (
            <>
              {/* Wave Sinusoidal - 3x3 grid with organic wave motion */}
              <div
                className="absolute inset-0"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                  gridTemplateRows: `repeat(${gridRows}, 1fr)`,
                  gap: '1px',
                  perspective: '1200px',
                }}
              >
                {Array.from({ length: totalSquares }, (_, i) => {
                  const { row, col } = getSquarePosition(i);
                  const waveDelay = (col * 0.15) + (row * 0.1);

                  // Calculate square center position in percentage (0-100)
                  const squareCenterX = (col / (gridCols - 1)) * 100; // 0, 50, 100
                  const squareCenterY = (row / (gridRows - 1)) * 100; // 0, 50, 100

                  // Calculate distance from mouse to square center
                  const deltaX = mousePosition.x - squareCenterX;
                  const deltaY = mousePosition.y - squareCenterY;
                  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                  // Maximum distance in a 100x100 space is ~141 (diagonal)
                  const maxDistance = 141;
                  const normalizedDistance = Math.min(distance / maxDistance, 1);

                  // Repulsion effect: push squares away from mouse
                  // Closer squares (smaller distance) = stronger push
                  const repulsionStrength = Math.max(0, 1 - normalizedDistance);
                  const pushMultiplier = 20; // How far to push

                  // Calculate push direction (away from mouse)
                  const angle = Math.atan2(-deltaY, -deltaX); // Negative for repulsion
                  const pushX = isHovered ? Math.cos(angle) * repulsionStrength * pushMultiplier : 0;
                  const pushY = isHovered ? Math.sin(angle) * repulsionStrength * pushMultiplier : 0;
                  const pushZ = isHovered ? repulsionStrength * 40 : 0;

                  // Rotation based on push direction
                  const rotateX = isHovered ? pushY * 0.8 : 0;
                  const rotateY = isHovered ? -pushX * 0.8 : 0;

                  return (
                    <motion.div
                      key={i}
                      className="relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: `${gridCols * 100}% ${gridRows * 100}%`,
                        backgroundPosition: `${col * 50}% ${row * 50}%`,
                        backgroundRepeat: 'no-repeat',
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center',
                        boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                      initial={{
                        translateZ: 0,
                        rotateX: 0,
                        x: 0,
                        y: 0,
                      }}
                      animate={isInView ? (isHovered ? {
                        translateZ: pushZ,
                        rotateX: rotateX,
                        rotateY: rotateY,
                        x: pushX,
                        y: pushY,
                      } : {
                        translateZ: [0, 80, 0, -40, 0],
                        rotateX: [0, 15, 0, -10, 0],
                        x: 0,
                        y: 0,
                        rotateY: 0,
                      }) : {
                        translateZ: 0,
                        rotateX: 0,
                        x: 0,
                        y: 0,
                        rotateY: 0,
                      }}
                      transition={isHovered ? {
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.1,
                      } : {
                        duration: 2,
                        delay: 0.3 + waveDelay,
                        ease: [0.42, 0, 0.58, 1],
                        times: [0, 0.3, 0.5, 0.7, 1],
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
                transition={{ duration: 0.5, delay: 1.5 }}
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
              transition={{ duration: 0.4, delay: 1.8 }}
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
          transition={{ duration: 0.4, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
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
