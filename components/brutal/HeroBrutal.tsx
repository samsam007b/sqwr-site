'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Grain animé
  const [grainOffset, setGrainOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrainOffset(Math.random() * 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className={styles.hero} ref={containerRef} data-dark-bg>
      {/* Video Background avec overlay */}
      {videoSrc ? (
        <div className={styles.videoContainer}>
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Dark overlay de base */}
          <div className={styles.videoOverlay} />
        </div>
      ) : (
        <div className={styles.staticBackground} />
      )}

      {/* Overlay avec grain animé */}
      <div
        className={styles.grain}
        style={{
          backgroundPosition: `${grainOffset}% ${grainOffset}%`
        }}
      />

      {/* Dark overlay qui s'éclaircit autour du curseur */}
      <div
        className={styles.cursorReveal}
        style={{
          background: `radial-gradient(circle 250px at ${cursorPos.x}px ${cursorPos.y}px, rgba(10,10,10,0.2), rgba(10,10,10,0.85))`
        }}
      />

      {/* Titre BRUTAL qui casse tout */}
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

        {/* Grid indicator */}
        <div className={styles.gridIndicator}>
          <span className={styles.coords}>
            [{Math.floor(cursorPos.x)}, {Math.floor(cursorPos.y)}]
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator géométrique */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollSquare} />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
