'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = () => {
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

    // Auto-hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('intro-seen', 'true');
    }, 4000); // 4 seconds total

    return () => clearTimeout(timer);
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
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background cursor-pointer"
          onClick={handleSkip}
          onKeyDown={(e) => e.key === 'Escape' && handleSkip()}
          tabIndex={0}
          role="button"
          aria-label="Skip intro animation"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 grain-overlay opacity-30" />

          {/* Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* CD Monogram - Line Drawing Animation */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Letter C */}
              <motion.path
                d="M 45 30 C 30 30, 20 40, 20 60 C 20 80, 30 90, 45 90"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                className="text-foreground"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.2, delay: 1, ease: [0.76, 0, 0.24, 1] },
                  opacity: { duration: 0.3, delay: 1 }
                }}
              />

              {/* Letter D */}
              <motion.path
                d="M 65 30 L 65 90 M 65 30 C 85 30, 100 40, 100 60 C 100 80, 85 90, 65 90"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="text-foreground"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.2, delay: 1.3, ease: [0.76, 0, 0.24, 1] },
                  opacity: { duration: 0.3, delay: 1.3 }
                }}
              />
            </motion.svg>

            {/* Text "Créative Design" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8"
            >
              <h1 className="font-display text-2xl text-foreground tracking-wider">
                Créative Design
              </h1>
            </motion.div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5, delay: 1.5 }}
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

export default IntroAnimation;
