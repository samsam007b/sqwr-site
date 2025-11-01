'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const TextReveal = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.02
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split text into lines
  const lines = children.split('\n').filter(line => line.trim());

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: 'blur(4px)'
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {lines.map((line, index) => (
        <div key={index} style={{ overflow: 'hidden' }}>
          <motion.div variants={child}>
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default TextReveal;
