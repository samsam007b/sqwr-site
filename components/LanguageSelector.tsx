'use client';

import { useLanguage, Locale } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const languages: { code: Locale; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'nl', label: 'NL' },
  { code: 'de', label: 'DE' },
];

interface LanguageSelectorProps {
  /** When true, uses inverted colors (white square, dark text) for the overlay menu */
  inverted?: boolean;
}

const LanguageSelector = ({ inverted = false }: LanguageSelectorProps) => {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SSR placeholder — matches the square dimensions
  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  const otherLanguages = languages.filter(l => l.code !== locale);
  const currentLabel = languages.find(l => l.code === locale)?.label ?? 'FR';

  const bgClass = inverted
    ? 'bg-paper hover:bg-primary'
    : 'bg-foreground hover:bg-primary';

  const textClass = inverted
    ? 'text-foreground'
    : 'text-paper';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Other languages — stacked above */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {otherLanguages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-6 h-6 flex items-center justify-center transition-colors duration-300 ${bgClass}`}
                initial={{ opacity: 0, y: 8, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.6 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={`text-[7px] font-mono font-bold leading-none tracking-wider ${textClass} group-hover:text-paper`}>
                  {lang.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Current language square */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-6 h-6 flex items-center justify-center transition-colors duration-500 ${bgClass}`}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className={`text-[7px] font-mono font-bold leading-none tracking-wider ${textClass}`}>
          {currentLabel}
        </span>
      </motion.button>
    </div>
  );
};

export default LanguageSelector;
