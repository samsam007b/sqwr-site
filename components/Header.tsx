'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background layer - Glassmorphism */}
      <div
        className="absolute inset-0 backdrop-blur-3xl backdrop-saturate-150"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, rgba(15, 15, 18, 0.85), rgba(15, 15, 18, 0.75), rgba(15, 15, 18, 0.65))'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.7), rgba(255,255,255,0.6))',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          backdropFilter: 'blur(40px) saturate(150%)'
        }}
      />

      {/* Border layer */}
      <div
        className="absolute inset-0 shadow-lg"
        style={{
          borderBottom: `1px solid ${theme === 'dark' ? 'rgba(42, 42, 48, 0.5)' : 'rgba(255,255,255,0.3)'}`,
        }}
      />

      {/* Content */}
      <nav className="relative max-w-6xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo - aligned with page content */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <svg
              width="400"
              height="200"
              viewBox="0 0 400 200"
              className={`h-8 w-auto transition-colors duration-200 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              fill="currentColor"
            >
              {/* S */}
              <rect x="20" y="40" width="20" height="20"/>
              <rect x="40" y="40" width="20" height="20"/>
              <rect x="60" y="40" width="20" height="20"/>
              <rect x="80" y="40" width="20" height="20"/>
              <rect x="20" y="60" width="20" height="20"/>
              <rect x="20" y="80" width="20" height="20"/>
              <rect x="40" y="80" width="20" height="20"/>
              <rect x="60" y="80" width="20" height="20"/>
              <rect x="80" y="80" width="20" height="20"/>
              <rect x="80" y="100" width="20" height="20"/>
              <rect x="80" y="120" width="20" height="20"/>
              <rect x="20" y="140" width="20" height="20"/>
              <rect x="40" y="140" width="20" height="20"/>
              <rect x="60" y="140" width="20" height="20"/>
              <rect x="80" y="140" width="20" height="20"/>
              {/* Q */}
              <rect x="110" y="40" width="20" height="20"/>
              <rect x="130" y="40" width="20" height="20"/>
              <rect x="150" y="40" width="20" height="20"/>
              <rect x="170" y="40" width="20" height="20"/>
              <rect x="110" y="60" width="20" height="20"/>
              <rect x="170" y="60" width="20" height="20"/>
              <rect x="110" y="80" width="20" height="20"/>
              <rect x="170" y="80" width="20" height="20"/>
              <rect x="110" y="100" width="20" height="20"/>
              <rect x="150" y="100" width="20" height="20"/>
              <rect x="170" y="100" width="20" height="20"/>
              <rect x="110" y="120" width="20" height="20"/>
              <rect x="170" y="120" width="20" height="20"/>
              <rect x="110" y="140" width="20" height="20"/>
              <rect x="130" y="140" width="20" height="20"/>
              <rect x="150" y="140" width="20" height="20"/>
              <rect x="170" y="140" width="20" height="20"/>
              <rect x="190" y="160" width="20" height="20"/>
              {/* W */}
              <rect x="200" y="40" width="20" height="20"/>
              <rect x="280" y="40" width="20" height="20"/>
              <rect x="200" y="60" width="20" height="20"/>
              <rect x="280" y="60" width="20" height="20"/>
              <rect x="200" y="80" width="20" height="20"/>
              <rect x="280" y="80" width="20" height="20"/>
              <rect x="200" y="100" width="20" height="20"/>
              <rect x="240" y="100" width="20" height="20"/>
              <rect x="280" y="100" width="20" height="20"/>
              <rect x="200" y="120" width="20" height="20"/>
              <rect x="220" y="120" width="20" height="20"/>
              <rect x="260" y="120" width="20" height="20"/>
              <rect x="280" y="120" width="20" height="20"/>
              <rect x="200" y="140" width="20" height="20"/>
              <rect x="220" y="140" width="20" height="20"/>
              <rect x="260" y="140" width="20" height="20"/>
              <rect x="280" y="140" width="20" height="20"/>
              {/* R */}
              <rect x="310" y="40" width="20" height="20"/>
              <rect x="330" y="40" width="20" height="20"/>
              <rect x="350" y="40" width="20" height="20"/>
              <rect x="370" y="40" width="20" height="20"/>
              <rect x="310" y="60" width="20" height="20"/>
              <rect x="370" y="60" width="20" height="20"/>
              <rect x="310" y="80" width="20" height="20"/>
              <rect x="330" y="80" width="20" height="20"/>
              <rect x="350" y="80" width="20" height="20"/>
              <rect x="370" y="80" width="20" height="20"/>
              <rect x="310" y="100" width="20" height="20"/>
              <rect x="350" y="100" width="20" height="20"/>
              <rect x="310" y="120" width="20" height="20"/>
              <rect x="370" y="120" width="20" height="20"/>
              <rect x="310" y="140" width="20" height="20"/>
              <rect x="380" y="140" width="20" height="20"/>
              {/* Dot */}
              <rect x="390" y="140" width="20" height="20"/>
            </svg>
          </Link>

          {/* Desktop Menu - pushed to the right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
            <ul className="flex items-center space-x-10">
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
            </ul>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button + Controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-11 h-11 flex items-center justify-center focus:outline-none group"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
            </button>
          </div>
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
