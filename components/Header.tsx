'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if intro has already been seen
    const introSeen = sessionStorage.getItem('intro-seen') === 'true';
    if (introSeen || window.location.hash) {
      setShowLogo(true);
    }

    // Listen for intro complete event
    const handleIntroComplete = () => {
      // Small delay to let the morph animation finish
      setTimeout(() => {
        setShowLogo(true);
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('intro-complete', handleIntroComplete);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('intro-complete', handleIntroComplete);
    };
  }, []);

  const menuItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-surface shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - fades in after intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/"
              className="text-2xl font-display font-normal tracking-tight text-foreground hover:text-primary transition-colors duration-200"
            >
              Créative Design
            </Link>
          </motion.div>

          {/* Desktop Menu - fades in after intro */}
          <motion.ul
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-sans font-normal text-foreground tracking-wide hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button - Larger touch target (44x44px minimum) - fades in after intro */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-11 h-11 flex items-center justify-center focus:outline-none group"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block w-6 h-0.5 bg-foreground group-hover:bg-primary group-active:bg-primary transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute block w-6 h-0.5 bg-foreground group-hover:bg-primary group-active:bg-primary top-3 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute block w-6 h-0.5 bg-foreground group-hover:bg-primary group-active:bg-primary transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-surface border-t border-border-light"
          >
            <ul className="container mx-auto px-6 py-8 space-y-6">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-display font-normal text-foreground block hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
