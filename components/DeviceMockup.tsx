'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DeviceMockupProps {
  src: string;
  alt: string;
  floatDelay?: number;
  floatAmplitude?: number;
  className?: string;
  sizes?: string;
}

export default function DeviceMockup({
  src,
  alt,
  floatDelay = 0,
  floatAmplitude = 10,
  className = '',
  sizes = '(max-width: 768px) 80vw, 33vw',
}: DeviceMockupProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -floatAmplitude, 0] }}
        transition={reducedMotion ? {} : {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
        style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}
        className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="relative aspect-[9/19.5]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes={sizes}
          />
        </div>
      </motion.div>
    </div>
  );
}
