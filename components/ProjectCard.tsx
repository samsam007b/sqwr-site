'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import Card3D from './Card3D';
import type { ProjectMockup } from '@/app/data/projects';

interface ProjectCardProps {
  title: string;
  client?: string;
  category: string;
  year?: string;
  color: string;
  image?: string;
  video?: string;
  mockup?: ProjectMockup;
  href: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "4/5"
  size?: 'small' | 'medium' | 'large';
}

// Memoized grid square component for performance
const GridSquare = memo(({
  i,
  image,
  gridCols,
  gridRows,
  isInView,
  isHovered,
  isClicked,
  mousePosition,
  getSquarePosition
}: {
  i: number;
  image: string;
  gridCols: number;
  gridRows: number;
  isInView: boolean;
  isHovered: boolean;
  isClicked: boolean;
  mousePosition: { x: number; y: number };
  getSquarePosition: (index: number) => { row: number; col: number };
}) => {
  const { row, col } = getSquarePosition(i);
  const waveDelay = (col * 0.15) + (row * 0.1);

  // Memoize calculations
  const squareCenterX = useMemo(() => (col / (gridCols - 1)) * 100, [col, gridCols]);
  const squareCenterY = useMemo(() => (row / (gridRows - 1)) * 100, [row, gridRows]);

  // Mouse repulsion calculations
  const repulsion = useMemo(() => {
    if (!isHovered || isClicked) return { pushX: 0, pushY: 0, pushZ: 0, rotateXHover: 0, rotateYHover: 0 };

    const deltaX = mousePosition.x - squareCenterX;
    const deltaY = mousePosition.y - squareCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedDistance = Math.min(distance / 141, 1);
    const repulsionStrength = Math.max(0, 1 - normalizedDistance);
    const angle = Math.atan2(-deltaY, -deltaX);

    return {
      pushX: Math.cos(angle) * repulsionStrength * 20,
      pushY: Math.sin(angle) * repulsionStrength * 20,
      pushZ: repulsionStrength * 40,
      rotateXHover: Math.sin(angle) * repulsionStrength * 20 * 0.8,
      rotateYHover: -Math.cos(angle) * repulsionStrength * 20 * 0.8,
    };
  }, [isHovered, isClicked, mousePosition, squareCenterX, squareCenterY]);

  // Explosion effect calculations
  const explosion = useMemo(() => {
    const isCenter = i === 4;
    const depthMultiplier = isCenter ? 1.5 : Math.random() * 0.5 + 0.7;
    return {
      translateZ: 300 + (depthMultiplier * 200),
      rotateX: (Math.random() - 0.5) * 30,
      rotateY: (Math.random() - 0.5) * 30,
    };
  }, [i]);

  return (
    <motion.div
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
      animate={
        isClicked
          ? {
              translateZ: explosion.translateZ,
              scale: 1.5,
              opacity: 0,
              rotateX: explosion.rotateX,
              rotateY: explosion.rotateY,
              x: 0,
              y: 0,
            }
          : isInView
          ? (isHovered
              ? {
                  translateZ: repulsion.pushZ,
                  rotateX: repulsion.rotateXHover,
                  rotateY: repulsion.rotateYHover,
                  x: repulsion.pushX,
                  y: repulsion.pushY,
                }
              : {
                  translateZ: [0, 80, 0, -40, 0],
                  rotateX: [0, 15, 0, -10, 0],
                  x: 0,
                  y: 0,
                  rotateY: 0,
                })
          : {
              translateZ: 0,
              rotateX: 0,
              x: 0,
              y: 0,
              rotateY: 0,
            }
      }
      transition={
        isClicked
          ? {
              duration: 0.6,
              delay: i * 0.02,
              ease: [0.6, 0.01, 0.05, 0.95],
            }
          : isHovered
          ? {
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }
          : {
              duration: 2,
              delay: 0.3 + waveDelay,
              ease: [0.42, 0, 0.58, 1],
              times: [0, 0.3, 0.5, 0.7, 1],
            }
      }
    />
  );
});

GridSquare.displayName = 'GridSquare';

const ProjectCard = ({
  title,
  client,
  category,
  year,
  color,
  image,
  video,
  mockup,
  href,
  aspectRatio = '4/5',
  size = 'medium'
}: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Memoized handlers for performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isClicked) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, [isClicked]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setIsHovered(false);
    setTimeout(() => router.push(href), 800);
  }, [href, router]);

  const handleMouseEnter = useCallback(() => {
    if (!isClicked) setIsHovered(true);
  }, [isClicked]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link href={href} className="group block" ref={ref} onClick={handleClick}>
      <Card3D intensity={3}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={!isClicked ? { y: -2 } : {}}
          className="relative"
        >
        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative overflow-visible rounded-lg grain-overlay"
          style={{
            aspectRatio,
            background: 'transparent',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {video ? (
            <>
              {/* Video + landing page mockup overlay */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-lg"
                animate={isClicked ? { scale: 1.1, opacity: 0 } : isHovered ? { scale: 1.02 } : { scale: 1 }}
                transition={isClicked ? { duration: 0.6 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Video layer */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src={video.replace('.mp4', '.webm')} type="video/webm" />
                  <source src={video} type="video/mp4" />
                </video>

                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

                {/* Landing page mockup UI */}
                {mockup && (
                  <div className="absolute inset-0 flex flex-col">
                    {/* Navigation bar */}
                    <div className="flex items-center justify-between px-[5%] py-[3%]">
                      <div className="hidden sm:flex items-center gap-[1.2em]">
                        {mockup.navLeft.map((item) => (
                          <span key={item} className="text-white/70 font-light" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.65rem)', letterSpacing: '0.08em' }}>{item}</span>
                        ))}
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <span className="text-white font-light tracking-wide" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.75rem)', fontFamily: 'serif', letterSpacing: '0.1em' }}>{mockup.brandName}</span>
                        <span className="text-white/40" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.5rem)', fontFamily: 'serif', fontStyle: 'italic' }}>{mockup.brandSub}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-[1.2em]">
                        {mockup.navRight.map((item) => (
                          <span key={item} className="text-white/70 font-light" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.65rem)', letterSpacing: '0.08em' }}>{item}</span>
                        ))}
                      </div>
                    </div>

                    {/* Hero content — centered */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-[8%]">
                      <span className="text-white/50 uppercase font-light mb-[2%]" style={{ fontSize: 'clamp(0.3rem, 0.55vw, 0.45rem)', letterSpacing: '0.3em' }}>{mockup.eyebrow}</span>
                      <h3 className="text-white font-light leading-[0.95] mb-[2%] whitespace-pre-line" style={{ fontSize: 'clamp(0.9rem, 2.8vw, 2.8rem)', fontFamily: 'serif', letterSpacing: '-0.01em' }}>{mockup.heroTitle}</h3>
                      <div className="w-[3em] h-[1px] bg-white/30 mb-[2%]" />
                      <p className="text-white/70 font-light italic" style={{ fontSize: 'clamp(0.35rem, 0.75vw, 0.65rem)', fontFamily: 'serif', letterSpacing: '0.04em' }}>{mockup.heroSub}</p>
                      <div className="mt-[3%] flex gap-[0.8em]">
                        <span className="border border-white/60 text-white px-[1.2em] py-[0.4em] font-light" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.5rem)', letterSpacing: '0.12em' }}>{mockup.cta}</span>
                      </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="flex flex-col items-center pb-[3%]">
                      <span className="text-white/30 uppercase" style={{ fontSize: 'clamp(0.25rem, 0.4vw, 0.35rem)', letterSpacing: '0.25em' }}>Défiler</span>
                      <div className="w-[1px] h-[1.5em] bg-white/20 mt-1 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/50 animate-scroll-line" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </>
          ) : image ? (
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
                  background: 'transparent',
                }}
              >
                {Array.from({ length: totalSquares }, (_, i) => (
                  <GridSquare
                    key={i}
                    i={i}
                    image={image}
                    gridCols={gridCols}
                    gridRows={gridRows}
                    isInView={isInView}
                    isHovered={isHovered}
                    isClicked={isClicked}
                    mousePosition={mousePosition}
                    getSquarePosition={getSquarePosition}
                  />
                ))}
              </div>
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
