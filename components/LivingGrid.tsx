'use client';

import { motion } from 'framer-motion';

const LivingGrid = () => {
  // Generate 9 squares (3x3 grid)
  const squares = Array.from({ length: 9 }, (_, i) => i);

  // Random duration between 10-14 seconds - optimized for performance
  const getRandomDuration = () => 10 + Math.random() * 4;

  // Random delay to desynchronize squares
  const getRandomDelay = () => Math.random() * 4;

  // Animation for each square - breathing in/out (translateZ) with shadows
  // Removed filter animation for better performance
  const breathingAnimation = (index: number) => ({
    translateZ: [0, 30, 0, -20, 0], // Slightly reduced movement for smoother performance
    boxShadow: [
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest state
      '0 25px 50px rgba(0, 0, 0, 0.2)', // Forward
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest
      '0 2px 6px rgba(0, 0, 0, 0.05)', // Back
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest
    ],
    transition: {
      duration: getRandomDuration(),
      delay: getRandomDelay(),
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95], // Custom cubic-bezier for ultra-smooth motion
      times: [0, 0.35, 0.5, 0.65, 1],
    },
  });

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        zIndex: -1,
      }}
    >
      {/* Grid container */}
      <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-0">
        {squares.map((index) => (
          <motion.div
            key={index}
            className="relative bg-paper border border-foreground/[0.03]"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, box-shadow',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden', // Optimize rendering
            }}
            animate={breathingAnimation(index)}
          >
            {/* Subtle grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-[0.02]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LivingGrid;
