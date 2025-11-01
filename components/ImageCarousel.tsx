'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

const ImageCarousel = ({ images, interval = 5000 }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Slower interval on mobile to reduce battery drain
    const mobileInterval = interval * 1.5;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, isMobile ? mobileInterval : interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: isMobile ? 1 : 1.5,
            ease: 'easeInOut'
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Background carousel"
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
            quality={isMobile ? 60 : 75}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlay for text readability - stronger on mobile */}
          <div className={`absolute inset-0 ${
            isMobile
              ? 'bg-gradient-to-b from-background/98 via-background/92 to-background/98'
              : 'bg-gradient-to-b from-background/95 via-background/85 to-background/95'
          }`} />
          {/* Blur overlay for glass effect - lighter on mobile for performance */}
          <div className={`absolute inset-0 ${isMobile ? 'backdrop-blur-[1px]' : 'backdrop-blur-[2px]'}`} />
        </motion.div>
      </AnimatePresence>

      {/* Additional gradient to ensure hero section text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
};

export default ImageCarousel;
