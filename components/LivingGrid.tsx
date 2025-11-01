'use client';

import { motion } from 'framer-motion';

const LivingGrid = () => {
  // Generate 9 squares (3x3 grid)
  const squares = Array.from({ length: 9 }, (_, i) => i);

  // Random duration between 8-12 seconds for organic feel
  const getRandomDuration = () => 8 + Math.random() * 4;

  // Random delay to desynchronize squares
  const getRandomDelay = () => Math.random() * 4;

  // Animation for each square - breathing in/out (translateZ)
  const breathingAnimation = (index: number) => ({
    translateZ: [0, 15, 0, -10, 0], // Forward, back, repeat
    boxShadow: [
      '0 4px 12px rgba(0, 0, 0, 0.08)', // Rest state
      '0 20px 40px rgba(0, 0, 0, 0.15)', // Forward (stronger shadow)
      '0 4px 12px rgba(0, 0, 0, 0.08)', // Rest
      '0 2px 6px rgba(0, 0, 0, 0.04)', // Back (lighter shadow)
      '0 4px 12px rgba(0, 0, 0, 0.08)', // Rest
    ],
    transition: {
      duration: getRandomDuration(),
      delay: getRandomDelay(),
      repeat: Infinity,
      ease: 'easeInOut',
      times: [0, 0.3, 0.5, 0.7, 1],
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
