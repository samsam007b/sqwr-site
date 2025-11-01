'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
  sizes?: string;
}

const ParallaxImage = ({
  src,
  alt,
  className = '',
  speed = 0.5,
  priority = false,
  sizes = '100vw'
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Reduce parallax intensity on mobile for better performance
  const mobileRange = ['-5%', '5%'];
  const desktopRange = ['-10%', '10%'];
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? mobileRange : desktopRange
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={isMobile ? {} : { y }} // Disable on mobile for better performance
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
