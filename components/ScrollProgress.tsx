'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface ScrollProgressProps {
  sections: Section[];
}

const IDLE_DELAY = 1200; // ms before labels fade out after scroll stops

const ScrollProgress = ({ sections }: ScrollProgressProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cache element refs once — avoids getElementById on every scroll event
  const elRefs = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isVisibleRef = useRef(false);

  const startIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsScrolling(false), IDLE_DELAY);
  }, []);

  // Populate element cache whenever sections list changes
  useEffect(() => {
    elRefs.current = sections.map(s => document.getElementById(s.id));
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Only setState when value changes (avoids re-renders on every scroll tick)
      const nowVisible = scrollY > windowHeight * 0.5;
      if (nowVisible !== isVisibleRef.current) {
        isVisibleRef.current = nowVisible;
        setIsVisible(nowVisible);
      }

      setIsScrolling(true);
      startIdleTimer();

      // Find active section using cached refs
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = elRefs.current[i];
        if (el && el.getBoundingClientRect().top < windowHeight * 0.5) {
          if (i !== activeIndexRef.current) {
            activeIndexRef.current = i;
            setActiveIndex(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [sections, startIdleTimer]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden lg:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center gap-3"
          aria-label={section.label}
        >
          {/* Square indicator — always visible, active is larger */}
          <motion.div
            animate={{
              width: index === activeIndex ? 10 : 6,
              height: index === activeIndex ? 10 : 6,
              backgroundColor:
                index === activeIndex
                  ? 'var(--foreground)'
                  : 'var(--secondary)',
              opacity: index === activeIndex ? 1 : 0.25,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Label — visible while scrolling, fades out when idle */}
          <motion.span
            className="text-[10px] font-mono uppercase tracking-[0.15em] whitespace-nowrap"
            animate={{
              opacity: isScrolling ? 0.6 : 0,
              x: isScrolling ? 0 : -4,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: 'var(--foreground)' }}
          >
            {section.label}
          </motion.span>
        </button>
      ))}
    </motion.div>
  );
};

export default ScrollProgress;
