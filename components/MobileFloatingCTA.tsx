'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileFloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Apparaît après avoir scrollé 90% de la hauteur de la première section (hero)
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[70] px-4 pb-4"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="flex items-center justify-between w-full bg-primary text-white px-6 py-4 text-sm font-mono uppercase tracking-[0.15em] active:bg-primary/85 transition-colors duration-200"
            >
              <span>Nous contacter</span>
              <span className="text-lg leading-none">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
