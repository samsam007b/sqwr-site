'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

type CTAConfig = { label: string; href: string };

function getCTAConfig(pathname: string): CTAConfig | null {
  // Page contact : on masque le CTA (le formulaire est déjà là)
  if (pathname === '/contact') return null;

  // Portfolio (liste + fiches) et Services → devis
  if (pathname.startsWith('/portfolio') || pathname.startsWith('/services')) {
    return { label: 'Obtenir un devis', href: '/contact' };
  }

  // Home, À propos, mentions légales, etc.
  return { label: 'Nous contacter', href: '/contact' };
}

export default function MobileFloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const config = getCTAConfig(pathname);
  const isHome = pathname === '/';

  useEffect(() => {
    // Réinitialise à chaque changement de page
    setVisible(false);

    const threshold = isHome ? window.innerHeight * 0.9 : 100;

    const onScroll = () => setVisible(window.scrollY > threshold);

    // Vérifie immédiatement (utile si déjà scrollé sur les pages non-home)
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, pathname]);

  if (!config) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[70] px-4"
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
              href={config.href}
              className="flex items-center justify-between w-full bg-primary text-white px-6 py-4 text-sm font-mono uppercase tracking-[0.15em] active:bg-primary/85 transition-colors duration-200"
            >
              <span>{config.label}</span>
              <span className="text-lg leading-none">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
