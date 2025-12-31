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

      // Debug: log when state changes
      if (isDark !== isOnDark) {
        console.log('🎯 Cursor on dark background:', isDark, 'Element:', element.tagName, element.className);
      }

      setIsOnDark(isDark);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOnDark]);

  return isOnDark;
};
