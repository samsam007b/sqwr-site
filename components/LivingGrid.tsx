'use client';

import { motion } from 'framer-motion';

const LivingGrid = () => {
  // Generate 9 squares (3x3 grid)
  const squares = Array.from({ length: 9 }, (_, i) => i);

  // Random duration between 12-18 seconds for very smooth feel
  const getRandomDuration = () => 12 + Math.random() * 6;

  // Random delay to desynchronize squares
  const getRandomDelay = () => Math.random() * 6;

  // Animation for each square - breathing in/out (translateZ) with strong shadows
  const breathingAnimation = (index: number) => ({
    translateZ: [0, 40, 0, -25, 0], // More pronounced movement: forward 40px, back 25px
    boxShadow: [
      '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)', // Rest state
      '0 35px 60px rgba(0, 0, 0, 0.25), 0 20px 30px rgba(0, 0, 0, 0.15)', // Forward (very strong shadow)
      '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)', // Rest
      '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)', // Back (very light shadow)
      '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)', // Rest
    ],
    filter: [
      'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06))', // Rest
      'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))', // Forward
      'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06))', // Rest
      'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.03))', // Back
      'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06))', // Rest
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
