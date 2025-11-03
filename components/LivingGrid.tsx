'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const LivingGrid = () => {
  const { theme } = useTheme();

  // Generate 9 squares (3x3 grid)
  const squares = Array.from({ length: 9 }, (_, i) => i);

  // Random duration between 12-18 seconds for slower, more visible breathing
  const getRandomDuration = () => 12 + Math.random() * 6;

  // Random delay to desynchronize squares
  const getRandomDelay = () => Math.random() * 5;

  // Animation for each square - enhanced breathing in/out (translateZ) with dramatic shadows
  // Different shadows for light and dark mode
  const breathingAnimation = (index: number) => {
    const lightShadows = [
      '0 8px 30px rgba(0, 0, 0, 0.12)', // Rest state - enhanced
      '0 40px 80px rgba(0, 0, 0, 0.3)', // Forward - much more dramatic
      '0 8px 30px rgba(0, 0, 0, 0.12)', // Rest
      '0 2px 8px rgba(0, 0, 0, 0.06)', // Back - subtle
      '0 8px 30px rgba(0, 0, 0, 0.12)', // Rest
    ];

    const darkShadows = [
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)', // Rest state with enhanced red glow
      '0 40px 80px rgba(255, 255, 255, 0.12), 0 20px 50px rgba(255, 51, 51, 0.25)', // Forward - dramatic glow
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)', // Rest
      '0 2px 8px rgba(255, 255, 255, 0.03), 0 1px 4px rgba(255, 51, 51, 0.06)', // Back
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)', // Rest
    ];

    return {
      translateZ: [0, 50, 0, -35, 0], // Enhanced movement: forward 50px, back 35px
      boxShadow: theme === 'dark' ? darkShadows : lightShadows,
      transition: {
        duration: getRandomDuration(),
        delay: getRandomDelay(),
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1], // Smoother easing for breathing effect
        times: [0, 0.35, 0.5, 0.65, 1],
      },
    };
  };

  // Animation for grid lines - enhanced breathing effect
  const lineBreathingAnimation = (lineIndex: number) => {
    const lightShadows = [
      '0 4px 20px rgba(0, 0, 0, 0.08)', // Rest state
      '0 20px 60px rgba(0, 0, 0, 0.25)', // Forward - dramatic shadow
      '0 4px 20px rgba(0, 0, 0, 0.08)', // Rest
      '0 1px 4px rgba(0, 0, 0, 0.04)', // Back
      '0 4px 20px rgba(0, 0, 0, 0.08)', // Rest
    ];

    const darkShadows = [
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)', // Rest with red glow
      '0 20px 60px rgba(255, 255, 255, 0.1), 0 10px 40px rgba(255, 51, 51, 0.2)', // Forward - dramatic glow
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)', // Rest
      '0 1px 4px rgba(255, 255, 255, 0.02), 0 1px 2px rgba(255, 51, 51, 0.05)', // Back
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)', // Rest
    ];

    return {
      translateZ: [0, 45, 0, -30, 0], // Slightly less movement than squares but still dramatic
      boxShadow: theme === 'dark' ? darkShadows : lightShadows,
      transition: {
        duration: getRandomDuration(),
        delay: getRandomDelay(),
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
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
            className="relative bg-paper border-0"
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

      {/* Animated horizontal lines */}
      {[0, 1].map((lineIndex) => (
        <motion.div
          key={`h-line-${lineIndex}`}
          className="absolute left-0 right-0 dark:bg-foreground/[0.08] bg-foreground/[0.03]"
          style={{
            height: '1px',
            top: `${((lineIndex + 1) / 3) * 100}%`,
            transformStyle: 'preserve-3d',
            willChange: 'transform, box-shadow',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          animate={lineBreathingAnimation(lineIndex)}
        />
      ))}

      {/* Animated vertical lines */}
      {[0, 1].map((lineIndex) => (
        <motion.div
          key={`v-line-${lineIndex}`}
          className="absolute top-0 bottom-0 dark:bg-foreground/[0.08] bg-foreground/[0.03]"
          style={{
            width: '1px',
            left: `${((lineIndex + 1) / 3) * 100}%`,
            transformStyle: 'preserve-3d',
            willChange: 'transform, box-shadow',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          animate={lineBreathingAnimation(lineIndex + 2)}
        />
      ))}
    </div>
  );
};

export default LivingGrid;
