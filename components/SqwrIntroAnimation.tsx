'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const SqwrIntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro
    const seen = sessionStorage.getItem('intro-seen');

    // Skip intro if hash in URL or already seen
    if (window.location.hash || seen === 'true') {
      setIsVisible(false);
      setHasSeenIntro(true);
      return;
    }

    // Hide after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('intro-seen', 'true');
    }, 2500); // 2.5 seconds total

    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  // Allow user to skip by clicking/pressing key
  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem('intro-seen', 'true');
  };

  // Don't render if already seen
  if (hasSeenIntro && !isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background cursor-pointer"
          onClick={handleSkip}
          onKeyDown={(e) => e.key === 'Escape' && handleSkip()}
          tabIndex={0}
          role="button"
          aria-label="Skip intro animation"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 grain-overlay opacity-30" />

          {/* Logo Container with pixel art animation */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo appears with scale and fade */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1] // Bounce effect
              }}
              className="relative"
            >
              <Image
                src="/sqwr-logo.png"
                alt="sqwr."
                width={501}
                height={243}
                className="w-64 md:w-80 h-auto"
                priority
              />

              {/* Pixel glitch effect overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0, 0.2, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 1]
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay"
                style={{
                  clipPath: 'polygon(0 20%, 100% 20%, 100% 25%, 0 25%, 0 45%, 100% 45%, 100% 50%, 0 50%, 0 70%, 100% 70%, 100% 75%, 0 75%)'
                }}
              />
            </motion.div>

            {/* Animated dots underneath (pixel style loading) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="flex gap-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-foreground"
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute bottom-12 text-xs font-mono uppercase tracking-[0.2em] text-secondary/40"
            >
              Cliquez pour passer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SqwrIntroAnimation;
