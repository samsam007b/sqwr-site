'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  delay?: number;
}

const ImageReveal = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  delay = 0
}: ImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Image */}
      <motion.div
        initial={{ scale: 1.3 }}
        animate={isInView ? { scale: 1 } : { scale: 1.3 }}
        transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes={sizes}
        />
      </motion.div>

      {/* Reveal Overlay */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: 1 }}
        className="absolute inset-0 bg-foreground z-10"
      />
    </div>
  );
};

export default ImageReveal;
