'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeaderBrutal.module.css';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function HeaderBrutal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Fixed */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo Pixel */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoPixel}>SQWR</div>
        </Link>

        {/* Menu Toggle - Carré Rouge */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.square} />
          <span className={styles.menuLabel}>MENU</span>
        </button>
      </header>

      {/* Menu Fullscreen Pixel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Grille de pixels animée en background */}
            <div className={styles.pixelGrid} />

            {/* Close Button */}
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={styles.closeSquare} />
              <span>CLOSE</span>
            </button>

            {/* Navigation */}
            <nav className={styles.nav}>
              <motion.ul className={styles.navList}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className={styles.navIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={styles.navLabel}>{item.label}</span>
                      <div className={styles.navSquare} />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Info Section */}
              <motion.div
                className={styles.menuInfo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className={styles.infoBlock}>
                  <p className={styles.infoLabel}>STUDIO</p>
                  <p className={styles.infoText}>Bruxelles, Belgique</p>
                  <p className={styles.infoText}>AI-Driven Design</p>
                </div>

                <div className={styles.infoBlock}>
                  <p className={styles.infoLabel}>CONTACT</p>
                  <a href="mailto:samuelbaudon@sqwr.be" className={styles.infoLink}>
                    samuelbaudon@sqwr.be
                  </a>
                  <a href="tel:+32493302752" className={styles.infoLink}>
                    +32 493 30 27 52
                  </a>
                </div>
              </motion.div>
            </nav>

            {/* Pixel Pattern décoratif */}
            <div className={styles.decorPattern}>
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.decorPixel}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: Math.random() > 0.5 ? 0.1 : 0, scale: 1 }}
                  transition={{ delay: Math.random() * 0.5 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
