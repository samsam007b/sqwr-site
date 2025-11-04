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
        <p className="text-center text-secondary/60 mb-16">
          Compare the 5 different origami reveal animations
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

export default DemoOrigamiPage;
