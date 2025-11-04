'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const DemoClickPage = () => {
  const exampleImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';

  return (
    <div className="min-h-screen bg-paper dark:bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-display mb-4 text-center">
          Click Transition Effects
        </h1>
        <p className="text-center text-secondary/60 mb-4">
          Click on each card to see the transition effect
        </p>
        <p className="text-center text-sm text-primary/80 mb-16">
          ⭐ = Recommended | Each card has Wave + Mouse Repulsion effects
        </p>

        <div className="space-y-24">
          {/* Effect 1: Explosion 3D Forward */}
          <DemoSection
            title="⭐ Effect 1: Explosion 3D Forward"
            description="Your idea: Squares rush toward viewer at different depths before revealing page"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="explosion-forward"
            />
          </DemoSection>

          {/* Effect 2: Scatter Explosion */}
          <DemoSection
            title="⭐ Effect 2: Scatter Explosion"
            description="Squares explode in all directions with rotation - organic and playful"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="scatter"
            />
          </DemoSection>

          {/* Effect 3: Implosion Vortex */}
          <DemoSection
            title="Effect 3: Implosion Vortex"
            description="Squares spiral toward center and disappear into portal"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="implosion"
            />
          </DemoSection>

          {/* Effect 4: Origami Fold Away */}
          <DemoSection
            title="⭐ Effect 4: Origami Fold Away"
            description="Squares fold rapidly like paper - very origami style"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="origami-fold"
            />
          </DemoSection>

          {/* Effect 5: Depth Cascade */}
          <DemoSection
            title="Effect 5: Depth Cascade"
            description="Squares fall into page depth in rapid cascade"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="depth-cascade"
            />
          </DemoSection>

          {/* Effect 6: Glitch Distortion */}
          <DemoSection
            title="Effect 6: Glitch Distortion"
            description="Squares shift glitchy with distortion - cyberpunk style"
          >
            <ClickCardDemo
              image={exampleImage}
              effectType="glitch"
            />
          </DemoSection>
        </div>
      </div>
    </div>
  );
};

const DemoSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-display mb-2">{title}</h2>
      <p className="text-secondary/60">{description}</p>
    </div>
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  </div>
);

// Demo card with all existing effects + click transition
const ClickCardDemo = ({ image, effectType }: { image: string; effectType: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [showProjectPage, setShowProjectPage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const gridCols = 3;
  const gridRows = 3;
  const totalSquares = gridCols * gridRows;

  const getSquarePosition = (index: number) => {
    const row = Math.floor(index / gridCols);
    const col = index % gridCols;
    return { row, col };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isClicked) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleClick = () => {
    setIsClicked(true);
    // Show project page after animation
    setTimeout(() => {
      setShowProjectPage(true);
    }, 800);
    // Reset after demo
    setTimeout(() => {
      setIsClicked(false);
      setShowProjectPage(false);
    }, 3000);
  };

  // Get click animation for each square based on effect type
  const getClickAnimation = (i: number) => {
    const { row, col } = getSquarePosition(i);
    const isCenter = i === 4;

    switch (effectType) {
      case 'explosion-forward':
        // Squares rush forward at different depths
        const depthMultiplier = isCenter ? 1.5 : Math.random() * 0.5 + 0.7;
        return {
          translateZ: 300 + (depthMultiplier * 200),
          scale: 1.5,
          opacity: 0,
          rotateX: (Math.random() - 0.5) * 30,
          rotateY: (Math.random() - 0.5) * 30,
        };

      case 'scatter':
        // Explode in all directions
        const angle = Math.atan2(row - 1, col - 1);
        const distance = 200 + Math.random() * 100;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          translateZ: Math.random() * 200,
          rotateZ: (Math.random() - 0.5) * 720,
          rotateX: (Math.random() - 0.5) * 360,
          scale: 0.5,
          opacity: 0,
        };

      case 'implosion':
        // Spiral toward center
        const spiralAngle = (i * 40) + 720;
        return {
          x: 0,
          y: 0,
          scale: 0,
          rotateZ: spiralAngle,
          translateZ: -200,
          opacity: 0,
        };

      case 'origami-fold':
        // Fold away rapidly
        const foldAxis = (row + col) % 2 === 0 ? 'rotateX' : 'rotateY';
        return {
          [foldAxis]: 180,
          scale: 0.3,
          translateZ: -100,
          opacity: 0,
        };

      case 'depth-cascade':
        // Fall into depth
        return {
          translateZ: -400,
          rotateX: -90,
          opacity: 0,
          y: 50,
        };

      case 'glitch':
        // Glitchy distortion
        return {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          translateZ: (Math.random() - 0.5) * 200,
          rotateZ: (Math.random() - 0.5) * 45,
          scale: Math.random() * 0.5 + 0.5,
          opacity: 0,
          filter: 'blur(10px)',
        };

      default:
        return { opacity: 0 };
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Project Page Preview that appears after transition */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showProjectPage ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 flex items-center justify-center rounded-lg border border-primary/20">
          <div className="text-center p-8">
            <h3 className="text-2xl font-display mb-2">Project Page</h3>
            <p className="text-secondary/60">The project page appears here</p>
          </div>
        </div>
      </motion.div>

      {/* Card with click effect */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg cursor-pointer"
        style={{ aspectRatio: '4/5', perspective: '1200px' }}
        onMouseEnter={() => !isClicked && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div
          className="absolute inset-0 grid grid-cols-3 grid-rows-3"
          style={{ gap: '1px' }}
        >
          {Array.from({ length: totalSquares }, (_, i) => {
            const { row, col } = getSquarePosition(i);
            const waveDelay = (col * 0.15) + (row * 0.1);

            // Mouse repulsion calculation (same as ProjectCard)
            const squareCenterX = (col / (gridCols - 1)) * 100;
            const squareCenterY = (row / (gridRows - 1)) * 100;
            const deltaX = mousePosition.x - squareCenterX;
            const deltaY = mousePosition.y - squareCenterY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 141;
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            const repulsionStrength = Math.max(0, 1 - normalizedDistance);
            const pushMultiplier = 20;
            const angle = Math.atan2(-deltaY, -deltaX);
            const pushX = isHovered && !isClicked ? Math.cos(angle) * repulsionStrength * pushMultiplier : 0;
            const pushY = isHovered && !isClicked ? Math.sin(angle) * repulsionStrength * pushMultiplier : 0;
            const pushZ = isHovered && !isClicked ? repulsionStrength * 40 : 0;
            const rotateX = isHovered && !isClicked ? pushY * 0.8 : 0;
            const rotateY = isHovered && !isClicked ? -pushX * 0.8 : 0;

            // Click animation delay based on effect type
            let clickDelay = 0;
            if (effectType === 'depth-cascade') {
              clickDelay = (row + col) * 0.03;
            } else if (effectType === 'implosion') {
              clickDelay = i * 0.02;
            } else {
              clickDelay = i * 0.02;
            }

            return (
              <motion.div
                key={i}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${col * 50}% ${row * 50}%`,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center',
                  boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
                  backfaceVisibility: 'hidden',
                }}
                initial={{
                  translateZ: 0,
                  rotateX: 0,
                  x: 0,
                  y: 0,
                }}
                animate={
                  isClicked
                    ? getClickAnimation(i)
                    : isInView
                    ? (isHovered
                        ? {
                            translateZ: pushZ,
                            rotateX: rotateX,
                            rotateY: rotateY,
                            x: pushX,
                            y: pushY,
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
                      }
                }
                transition={
                  isClicked
                    ? {
                        duration: 0.6,
                        delay: clickDelay,
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
          })}
        </div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={isInView && !isClicked ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />

        {/* Click instruction */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={isHovered && !isClicked ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="glass-surface px-6 py-3 rounded-lg">
            <p className="text-sm font-mono text-foreground">Click to see effect</p>
          </div>
        </motion.div>
      </div>

      {/* Card info */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView && !showProjectPage ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 1.6 }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">
            Demo Project
          </span>
          <span className="text-xs font-mono text-secondary/40">2024</span>
        </div>
        <h3 className="text-2xl font-display font-normal text-foreground">
          Click Transition Demo
        </h3>
      </motion.div>
    </div>
  );
};

export default DemoClickPage;
