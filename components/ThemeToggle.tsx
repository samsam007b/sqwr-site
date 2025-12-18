'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full backdrop-blur-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-300 group backdrop-blur-xl backdrop-saturate-150"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)',
        border: theme === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.15)'
          : '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: theme === 'dark'
          ? 'inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -1px 1px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)'
          : 'inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.1)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        backdropFilter: 'blur(20px) saturate(150%)',
      }}
      whileHover={{
        scale: 1.1,
        background: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon */}
      <motion.svg
        className="w-5 h-5 text-foreground"
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </motion.svg>

      {/* Moon Icon */}
      <motion.svg
        className="w-5 h-5 text-foreground"
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>

      {/* Placeholder pour maintenir la taille */}
      <div className="w-5 h-5 opacity-0">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
