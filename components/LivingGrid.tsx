'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { memo, useMemo } from 'react';

// Memoized grid square for performance
const GridSquare = memo(({ index, theme }: { index: number; theme: 'light' | 'dark' }) => {
  // Memoize animation config
  const animation = useMemo(() => {
    const getRandomDuration = () => 12 + Math.random() * 6;
    const getRandomDelay = () => Math.random() * 5;

    const startsForward = index % 2 === 0;

    const forwardLightShadows = [
      '0 8px 30px rgba(0, 0, 0, 0.12)',
      '0 40px 80px rgba(0, 0, 0, 0.3)',
      '0 8px 30px rgba(0, 0, 0, 0.12)',
      '0 2px 8px rgba(0, 0, 0, 0.06)',
      '0 8px 30px rgba(0, 0, 0, 0.12)',
    ];

    const forwardDarkShadows = [
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
      '0 40px 80px rgba(255, 255, 255, 0.12), 0 20px 50px rgba(255, 51, 51, 0.25)',
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
      '0 2px 8px rgba(255, 255, 255, 0.03), 0 1px 4px rgba(255, 51, 51, 0.06)',
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
    ];

    const backwardLightShadows = [
      '0 8px 30px rgba(0, 0, 0, 0.12)',
      '0 2px 8px rgba(0, 0, 0, 0.06)',
      '0 8px 30px rgba(0, 0, 0, 0.12)',
      '0 40px 80px rgba(0, 0, 0, 0.3)',
      '0 8px 30px rgba(0, 0, 0, 0.12)',
    ];

    const backwardDarkShadows = [
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
      '0 2px 8px rgba(255, 255, 255, 0.03), 0 1px 4px rgba(255, 51, 51, 0.06)',
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
      '0 40px 80px rgba(255, 255, 255, 0.12), 0 20px 50px rgba(255, 51, 51, 0.25)',
      '0 8px 30px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 51, 51, 0.12)',
    ];

    return {
      translateZ: startsForward ? [0, 50, 0, -35, 0] : [0, -35, 0, 50, 0],
      boxShadow: theme === 'dark'
        ? (startsForward ? forwardDarkShadows : backwardDarkShadows)
        : (startsForward ? forwardLightShadows : backwardLightShadows),
      transition: {
        duration: getRandomDuration(),
        delay: getRandomDelay(),
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
        times: [0, 0.35, 0.5, 0.65, 1],
      },
    };
  }, [index, theme]);

  return (
    <motion.div
      className="relative bg-paper border-0"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      animate={animation}
    >
      <div className="absolute inset-0 grain-overlay dark:opacity-[0.03] opacity-[0.02]" />
    </motion.div>
  );
});

GridSquare.displayName = 'GridSquare';

// Memoized grid line for performance
const GridLine = memo(({ lineIndex, isHorizontal, theme }: { lineIndex: number; isHorizontal: boolean; theme: 'light' | 'dark' }) => {
  const animation = useMemo(() => {
    const getRandomDuration = () => 12 + Math.random() * 6;
    const getRandomDelay = () => Math.random() * 5;

    const lightShadows = [
      '0 4px 20px rgba(0, 0, 0, 0.08)',
      '0 20px 60px rgba(0, 0, 0, 0.25)',
      '0 4px 20px rgba(0, 0, 0, 0.08)',
      '0 1px 4px rgba(0, 0, 0, 0.04)',
      '0 4px 20px rgba(0, 0, 0, 0.08)',
    ];

    const darkShadows = [
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)',
      '0 20px 60px rgba(255, 255, 255, 0.1), 0 10px 40px rgba(255, 51, 51, 0.2)',
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)',
      '0 1px 4px rgba(255, 255, 255, 0.02), 0 1px 2px rgba(255, 51, 51, 0.05)',
      '0 4px 20px rgba(255, 255, 255, 0.04), 0 2px 8px rgba(255, 51, 51, 0.1)',
    ];

    return {
      translateZ: [0, 45, 0, -30, 0],
      boxShadow: theme === 'dark' ? darkShadows : lightShadows,
      transition: {
        duration: getRandomDuration(),
        delay: getRandomDelay(),
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1],
        times: [0, 0.35, 0.5, 0.65, 1],
      },
    };
  }, [theme]); // lineIndex is used only for key, not needed in deps

  const position = `${((lineIndex + 1) / 3) * 100}%`;

  return (
    <motion.div
      className={`absolute dark:bg-foreground/[0.08] bg-foreground/[0.03] ${isHorizontal ? 'left-0 right-0' : 'top-0 bottom-0'}`}
      style={{
        [isHorizontal ? 'height' : 'width']: '1px',
        [isHorizontal ? 'top' : 'left']: position,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      animate={animation}
    />
  );
});

GridLine.displayName = 'GridLine';

const LivingGrid = () => {
  const { theme } = useTheme();

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
        {Array.from({ length: 9 }, (_, index) => (
          <GridSquare key={index} index={index} theme={theme} />
        ))}
      </div>

      {/* Animated horizontal lines */}
      {[0, 1].map((lineIndex) => (
        <GridLine
          key={`h-${lineIndex}`}
          lineIndex={lineIndex}
          isHorizontal={true}
          theme={theme}
        />
      ))}

      {/* Animated vertical lines */}
      {[0, 1].map((lineIndex) => (
        <GridLine
          key={`v-${lineIndex}`}
          lineIndex={lineIndex + 2}
          isHorizontal={false}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default LivingGrid;
