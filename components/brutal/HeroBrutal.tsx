'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelBackground from './PixelBackground';
import styles from './HeroBrutal.module.css';

interface HeroBrutalProps {
  title: string;
  subtitle?: string;
  videoSrc?: string;
}

export default function HeroBrutal({ title, subtitle, videoSrc }: HeroBrutalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax sur le titre
  const titleY = useTransform(scrollY, [0, 500], [0, 150]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} ref={containerRef} data-dark-bg>
      {/* Background avec pixels animés */}
      <div className={styles.staticBackground} />
      <PixelBackground density="high" animated color="red" />

      {/* Titre BRUTAL avec effet pixel */}
      <motion.div
        className={styles.content}
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h1 className={styles.title}>
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className={styles.titleChar}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Pixel Matrix décorative */}
        <div className={styles.pixelMatrix}>
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.matrixPixel}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: 1 }}
              transition={{
                delay: i * 0.05,
                repeat: Infinity,
                duration: 2,
                repeatDelay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Grid indicator pixel */}
        <div className={styles.gridIndicator}>
          <span className={styles.coordsLabel}>POSITION</span>
          <span className={styles.coords}>
            X:{Math.floor(cursorPos.x)} Y:{Math.floor(cursorPos.y)}
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator pixel */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollSquare} />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
