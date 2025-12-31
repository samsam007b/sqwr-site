'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import styles from './SplitScreenNarrative.module.css';

interface SplitContent {
  title: string;
  description: string;
  image?: string;
  background?: 'black' | 'white';
}

interface SplitScreenNarrativeProps {
  leftContent: SplitContent;
  rightContent: SplitContent;
}

export default function SplitScreenNarrative({ leftContent, rightContent }: SplitScreenNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section className={styles.splitNarrative} ref={containerRef}>
      {/* Left Side */}
      <motion.div
        className={`${styles.side} ${styles[`side--${leftContent.background || 'black'}`]}`}
        style={{ y: leftY }}
        data-dark-bg={leftContent.background === 'black'}
      >
        {leftContent.image && (
          <div className={styles.imageContainer}>
            <Image
              src={leftContent.image}
              alt={leftContent.title}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{leftContent.title}</h2>
          <p className={styles.description}>{leftContent.description}</p>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className={`${styles.side} ${styles[`side--${rightContent.background || 'white'}`]}`}
        style={{ y: rightY }}
        data-dark-bg={rightContent.background === 'black'}
      >
        {rightContent.image && (
          <div className={styles.imageContainer}>
            <Image
              src={rightContent.image}
              alt={rightContent.title}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{rightContent.title}</h2>
          <p className={styles.description}>{rightContent.description}</p>
        </div>
      </motion.div>

      {/* Divider Line */}
      <div className={styles.divider} />
    </section>
  );
}
