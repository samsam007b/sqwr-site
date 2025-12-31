'use client';

import { useEffect, useState } from 'react';
import styles from './PixelBackground.module.css';

interface PixelBackgroundProps {
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  color?: 'red' | 'white' | 'mixed';
}

export default function PixelBackground({
  density = 'medium',
  animated = true,
  color = 'red'
}: PixelBackgroundProps) {
  const [pixels, setPixels] = useState<{ id: number; x: number; y: number; size: number; opacity: number; delay: number }[]>([]);

  useEffect(() => {
    const count = density === 'low' ? 30 : density === 'medium' ? 60 : 120;
    const newPixels = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 4,
      opacity: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 2
    }));
    setPixels(newPixels);
  }, [density]);

  return (
    <div className={styles.pixelBackground}>
      {/* Grille statique */}
      <div className={styles.grid} />

      {/* Pixels flottants */}
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className={`${styles.pixel} ${animated ? styles.animated : ''} ${styles[color]}`}
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            opacity: pixel.opacity,
            animationDelay: `${pixel.delay}s`
          }}
        />
      ))}

      {/* Scanlines */}
      <div className={styles.scanlines} />
    </div>
  );
}
