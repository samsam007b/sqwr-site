'use client';

import { useState, useEffect } from 'react';

export const useCursorColor = () => {
  const [isOnDark, setIsOnDark] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get element under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);

      if (!element) return;

      // Check if element or any parent has data-dark-bg attribute
      let currentElement: Element | null = element;
      let isDark = false;

      while (currentElement && currentElement !== document.body) {
        if (currentElement.hasAttribute('data-dark-bg')) {
          isDark = true;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      // Only re-render when the value actually changes
      setIsOnDark(prev => (prev === isDark ? prev : isDark));
    };

    // passive: true — never blocks scroll
    // [] deps — subscribe once; functional update avoids stale-closure bug
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return isOnDark;
};
