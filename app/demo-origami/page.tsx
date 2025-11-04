'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const DemoOrigamiPage = () => {
  // Example image URL
  const exampleImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80';

  return (
    <div className="min-h-screen bg-paper dark:bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-display mb-4 text-center">
          Origami Animation Options
        </h1>
        <p className="text-center text-secondary/60 mb-4">
          Compare different origami reveal animations
        </p>
        <p className="text-center text-sm text-primary/80 mb-16">
          ⭐ = Recommended | 🎯 = 9 Squares Grid
        </p>

        <div className="space-y-24">
          {/* Option 1: Accordion Horizontal */}
          <DemoSection
            title="Option 1: Accordion Horizontal"
            description="8-10 vertical strips that unfold from left to right with rotateY"
          >
            <AccordionHorizontal image={exampleImage} />
          </DemoSection>

          {/* Option 2: Diamond Unfold */}
          <DemoSection
            title="Option 2: Diamond Unfold"
            description="4 triangular sections unfold from center like origami diamond"
          >
            <DiamondUnfold image={exampleImage} />
          </DemoSection>

          {/* Option 3: Fan Unfold */}
          <DemoSection
            title="Option 3: Fan Unfold"
            description="6-8 sections rotate from bottom like a Japanese fan opening"
          >
            <FanUnfold image={exampleImage} />
          </DemoSection>

          {/* Option 4: Layered Reveal */}
          <DemoSection
            title="Option 4: Layered Reveal"
            description="3-4 full image layers lift up successively with depth"
          >
            <LayeredReveal image={exampleImage} />
          </DemoSection>

          {/* Option 5: Split Reveal */}
          <DemoSection
            title="Option 5: Split Reveal"
            description="Image splits in 2 halves that rotate to reveal"
          >
            <SplitReveal image={exampleImage} />
          </DemoSection>

          {/* Divider for 9-Square Options */}
          <div className="py-12 border-t border-foreground/10">
            <h2 className="text-4xl font-display text-center mb-3">
              🎯 9 Squares Grid Animations
            </h2>
            <p className="text-center text-secondary/60">
              More organic and creative origami effects with 3x3 grid
            </p>
          </div>

          {/* Option 6: Center Burst ⭐ */}
          <DemoSection
            title="⭐ Option 6: Center Burst (Explosion)"
            description="9 squares unfold from center outward like a blooming origami flower"
          >
            <CenterBurst image={exampleImage} />
          </DemoSection>

          {/* Option 7: Spiral Hypnotic */}
          <DemoSection
            title="Option 7: Spiral Hypnotic"
            description="Squares unfold in spiral pattern: 0→1→2→5→8→7→6→3→4"
          >
            <SpiralHypnotic image={exampleImage} />
          </DemoSection>

          {/* Option 8: Wave Sinusoidal ⭐ */}
          <DemoSection
            title="⭐ Option 8: Wave Sinusoidal"
            description="Organic wave motion with squares lifting and falling"
          >
            <WaveSinusoidal image={exampleImage} />
          </DemoSection>

          {/* Option 9: Flower Petals ⭐ */}
          <DemoSection
            title="⭐ Option 9: Flower Petals (Lotus)"
            description="8 outer squares open outward, center reveals last"
          >
            <FlowerPetals image={exampleImage} />
          </DemoSection>

          {/* Option 10: Diagonal Cascade */}
          <DemoSection
            title="Option 10: Diagonal Cascade"
            description="Squares fall in cascade from top-left to bottom-right"
          >
            <DiagonalCascade image={exampleImage} />
          </DemoSection>

          {/* Option 11: Breathing 3D Alternated */}
          <DemoSection
            title="Option 11: Breathing 3D Alternated"
            description="Checkerboard pattern with alternating depth (like background grid)"
          >
            <Breathing3DAlternated image={exampleImage} />
          </DemoSection>

          {/* Option 12: Windmill */}
          <DemoSection
            title="Option 12: Windmill"
            description="Each square rotates on itself with different directions"
          >
            <Windmill image={exampleImage} />
          </DemoSection>

          {/* Option 13: Flip Book */}
          <DemoSection
            title="Option 13: Flip Book"
            description="Elegant 180° flip wave from left to right"
          >
            <FlipBook image={exampleImage} />
          </DemoSection>
        </div>
      </div>
    </div>
  );
};

// Demo Section Wrapper
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

// Option 1: Accordion Horizontal (Vertical Strips)
const AccordionHorizontal = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const strips = 10;

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: strips }, (_, i) => (
          <motion.div
            key={i}
            className="flex-1 relative overflow-hidden"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
            }}
            initial={{
              rotateY: -90,
              opacity: 0,
            }}
            animate={isInView ? {
              rotateY: 0,
              opacity: 1,
            } : {
              rotateY: -90,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Option 2: Diamond Unfold (4 Triangles)
const DiamondUnfold = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const triangles = [
    { clip: 'polygon(50% 50%, 0 0, 100% 0)', origin: 'center top', rotateX: -90, rotateY: 0 },
    { clip: 'polygon(50% 50%, 100% 0, 100% 100%)', origin: 'right center', rotateX: 0, rotateY: 90 },
    { clip: 'polygon(50% 50%, 100% 100%, 0 100%)', origin: 'center bottom', rotateX: 90, rotateY: 0 },
    { clip: 'polygon(50% 50%, 0 100%, 0 0)', origin: 'left center', rotateX: 0, rotateY: -90 },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      {triangles.map((triangle, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: triangle.clip,
            transformStyle: 'preserve-3d',
            transformOrigin: triangle.origin,
          }}
          initial={{
            rotateX: triangle.rotateX,
            rotateY: triangle.rotateY,
            opacity: 0,
          }}
          animate={isInView ? {
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
          } : {
            rotateX: triangle.rotateX,
            rotateY: triangle.rotateY,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            delay: i * 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      ))}
    </div>
  );
};

// Option 3: Fan Unfold (Sections rotating from bottom)
const FanUnfold = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const sections = 7;

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div className="absolute inset-0">
        {Array.from({ length: sections }, (_, i) => {
          const angle = (i - Math.floor(sections / 2)) * 3; // Spread angle

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)',
                zIndex: sections - i,
              }}
              initial={{
                rotateX: -90,
                rotateZ: angle * 2,
                opacity: 0,
              }}
              animate={isInView ? {
                rotateX: 0,
                rotateZ: angle,
                opacity: 1,
              } : {
                rotateX: -90,
                rotateZ: angle * 2,
                opacity: 0,
              }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 4: Layered Reveal (Stacked layers lifting)
const LayeredReveal = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const layers = 4;

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      {Array.from({ length: layers }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transformStyle: 'preserve-3d',
            transformOrigin: 'center top',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            filter: `brightness(${1 - i * 0.1})`,
          }}
          initial={{
            rotateX: 0,
            translateZ: 0,
            opacity: 1,
          }}
          animate={isInView ? {
            rotateX: -90,
            translateZ: i * 50,
            opacity: 0,
          } : {
            rotateX: 0,
            translateZ: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.2,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      ))}
    </div>
  );
};

// Option 5: Split Reveal (2 Halves)
const SplitReveal = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      {/* Left Half */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
        }}
        initial={{
          rotateY: -120,
          opacity: 0,
        }}
        animate={isInView ? {
          rotateY: 0,
          opacity: 1,
        } : {
          rotateY: -120,
          opacity: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />

      {/* Right Half */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'right center',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.3)',
        }}
        initial={{
          rotateY: 120,
          opacity: 0,
        }}
        animate={isInView ? {
          rotateY: 0,
          opacity: 1,
        } : {
          rotateY: 120,
          opacity: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />
    </div>
  );
};

// Helper function for 3x3 grid
const getSquarePosition = (index: number) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return { row, col };
};

// Option 6: Center Burst (Explosion from center)
const CenterBurst = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Define explosion order: center first, then adjacent, then corners
  const explosionOrder = [4, 1, 3, 5, 7, 0, 2, 6, 8];

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const explosionIndex = explosionOrder.indexOf(i);

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                scale: 0,
                rotateX: 90,
                opacity: 0,
              }}
              animate={isInView ? {
                scale: 1,
                rotateX: 0,
                opacity: 1,
              } : {
                scale: 0,
                rotateX: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                delay: explosionIndex * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 7: Spiral Hypnotic
const SpiralHypnotic = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Spiral order: 0→1→2→5→8→7→6→3→4
  const spiralOrder = [0, 1, 2, 5, 8, 7, 6, 3, 4];

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const spiralIndex = spiralOrder.indexOf(i);

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                rotateZ: 180,
                rotateY: 90,
                opacity: 0,
              }}
              animate={isInView ? {
                rotateZ: 0,
                rotateY: 0,
                opacity: 1,
              } : {
                rotateZ: 180,
                rotateY: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                delay: spiralIndex * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 8: Wave Sinusoidal
const WaveSinusoidal = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const waveDelay = (col * 0.15) + (row * 0.1);

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                translateZ: 0,
                rotateX: 0,
              }}
              animate={isInView ? {
                translateZ: [0, 80, 0, -40, 0],
                rotateX: [0, 15, 0, -10, 0],
              } : {
                translateZ: 0,
                rotateX: 0,
              }}
              transition={{
                duration: 2,
                delay: waveDelay,
                ease: [0.42, 0, 0.58, 1],
                times: [0, 0.3, 0.5, 0.7, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 9: Flower Petals (Lotus)
const FlowerPetals = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const isCenter = i === 4;

          // Calculate direction for each petal to open outward
          let rotateAxis = 'rotateX';
          let rotateDegrees = 0;
          let origin = 'center';

          if (!isCenter) {
            if (row === 0) { // Top row
              rotateAxis = 'rotateX';
              rotateDegrees = -120;
              origin = 'center top';
            } else if (row === 2) { // Bottom row
              rotateAxis = 'rotateX';
              rotateDegrees = 120;
              origin = 'center bottom';
            } else if (col === 0) { // Left middle
              rotateAxis = 'rotateY';
              rotateDegrees = -120;
              origin = 'left center';
            } else if (col === 2) { // Right middle
              rotateAxis = 'rotateY';
              rotateDegrees = 120;
              origin = 'right center';
            }
          }

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: origin,
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={isCenter ? {
                scale: 0,
                opacity: 0,
              } : {
                [rotateAxis]: rotateDegrees,
                opacity: 0,
              }}
              animate={isInView ? (isCenter ? {
                scale: 1,
                opacity: 1,
              } : {
                [rotateAxis]: 0,
                opacity: 1,
              }) : (isCenter ? {
                scale: 0,
                opacity: 0,
              } : {
                [rotateAxis]: rotateDegrees,
                opacity: 0,
              })}
              transition={{
                duration: 0.8,
                delay: isCenter ? 0.8 : i * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 10: Diagonal Cascade
const DiagonalCascade = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const diagonalDelay = (row + col) * 0.1;

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center top',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                rotateX: -90,
                translateY: -100,
                opacity: 0,
              }}
              animate={isInView ? {
                rotateX: 0,
                translateY: 0,
                opacity: 1,
              } : {
                rotateX: -90,
                translateY: -100,
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                delay: diagonalDelay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 11: Breathing 3D Alternated
const Breathing3DAlternated = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const startsForward = i % 2 === 0;

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                translateZ: 0,
              }}
              animate={isInView ? {
                translateZ: startsForward ? [0, 60, 0, -40, 0] : [0, -40, 0, 60, 0],
              } : {
                translateZ: 0,
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1],
                times: [0, 0.35, 0.5, 0.65, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 12: Windmill
const Windmill = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          // Different rotation direction based on position
          const rotationDirection = (row + col) % 2 === 0 ? 360 : -360;

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                rotateZ: rotationDirection,
                scale: 0,
                opacity: 0,
              }}
              animate={isInView ? {
                rotateZ: 0,
                scale: 1,
                opacity: 1,
              } : {
                rotateZ: rotationDirection,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                delay: i * 0.08,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// Option 13: Flip Book
const FlipBook = ({ image }: { image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative w-full rounded-lg overflow-hidden"
      style={{ aspectRatio: '4/5', perspective: '1200px' }}
    >
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3"
        style={{ gap: '2px' }}
      >
        {Array.from({ length: 9 }, (_, i) => {
          const { row, col } = getSquarePosition(i);
          const waveDelay = col * 0.15 + row * 0.05;

          return (
            <motion.div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
              initial={{
                rotateY: 180,
                opacity: 0,
              }}
              animate={isInView ? {
                rotateY: 0,
                opacity: 1,
              } : {
                rotateY: 180,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                delay: waveDelay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DemoOrigamiPage;
