'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsTouchDevice } from '@/hooks/useIsMobile';
import { useCursorColor } from '@/hooks/useCursorColor';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string; // Store color at time of creation
}

const CustomCursorTrail = () => {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const particleIdRef = useRef(0);
  const isTouch = useIsTouchDevice();
  const isOnDark = useCursorColor();

  useEffect(() => {
    // Don't show cursor trail on touch devices
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const currentPos = { x: e.clientX, y: e.clientY };

      // Calculate velocity
      const dx = currentPos.x - lastPosRef.current.x;
      const dy = currentPos.y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeDelta = currentTime - lastTimeRef.current;
      const velocity = distance / (timeDelta || 1);

      // Only create trail if moving fast enough (velocity > 1.5)
      if (velocity > 1.5 && timeDelta > 10) {
        const newParticle: TrailParticle = {
          id: particleIdRef.current++,
          x: currentPos.x,
          y: currentPos.y,
          size: Math.min(8 + velocity * 0.5, 14), // Size based on velocity (8-14px)
          opacity: Math.min(0.4 + velocity * 0.05, 0.8), // Opacity based on velocity
          color: isOnDark ? '#FFFFFF' : '#111111', // White on dark, black on light
        };

        setParticles((prev) => [...prev, newParticle]);

        // Remove particle after animation completes
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 600);
      }

      lastPosRef.current = currentPos;
      lastTimeRef.current = currentTime;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch, isOnDark]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              opacity: particle.opacity,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0.3,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursorTrail;
