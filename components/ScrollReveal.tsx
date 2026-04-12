'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}: ScrollRevealProps) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  useEffect(() => {
    if (reducedMotion || isInView) {
      controls.start('visible');
    }
  }, [isInView, controls, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: reducedMotion ? 1 : 0,
          ...(reducedMotion ? { x: 0, y: 0 } : directions[direction])
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: reducedMotion
            ? { duration: 0 }
            : { duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
