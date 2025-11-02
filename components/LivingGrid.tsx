'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const LivingGrid = () => {
  const { theme } = useTheme();

  // Generate 9 squares (3x3 grid)
  const squares = Array.from({ length: 9 }, (_, i) => i);

  // Random duration between 10-14 seconds - optimized for performance
  const getRandomDuration = () => 10 + Math.random() * 4;

  // Random delay to desynchronize squares
  const getRandomDelay = () => Math.random() * 4;

  // Animation for each square - breathing in/out (translateZ) with shadows
  // Different shadows for light and dark mode
  const breathingAnimation = (index: number) => {
    const lightShadows = [
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest state
      '0 25px 50px rgba(0, 0, 0, 0.2)', // Forward
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest
      '0 2px 6px rgba(0, 0, 0, 0.05)', // Back
      '0 6px 20px rgba(0, 0, 0, 0.1)', // Rest
    ];

    const darkShadows = [
      '0 6px 20px rgba(255, 255, 255, 0.03), 0 2px 8px rgba(255, 51, 51, 0.08)', // Rest state with red glow
      '0 25px 50px rgba(255, 255, 255, 0.08), 0 10px 30px rgba(255, 51, 51, 0.15)', // Forward with stronger glow
      '0 6px 20px rgba(255, 255, 255, 0.03), 0 2px 8px rgba(255, 51, 51, 0.08)', // Rest
      '0 2px 6px rgba(255, 255, 255, 0.02), 0 1px 3px rgba(255, 51, 51, 0.05)', // Back
      '0 6px 20px rgba(255, 255, 255, 0.03), 0 2px 8px rgba(255, 51, 51, 0.08)', // Rest
    ];

    return {
      translateZ: [0, 30, 0, -20, 0],
      boxShadow: theme === 'dark' ? darkShadows : lightShadows,
      transition: {
        duration: getRandomDuration(),
        delay: getRandomDelay(),
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
        times: [0, 0.35, 0.5, 0.65, 1],
      },
    };
  };

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
            className="relative bg-paper border dark:border-foreground/[0.08] border-foreground/[0.03]"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, box-shadow',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden', // Optimize rendering
            }}
            animate={breathingAnimation(index)}
          >
            {/* Subtle grain overlay */}
            <div className="absolute inset-0 grain-overlay dark:opacity-[0.03] opacity-[0.02]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LivingGrid;
