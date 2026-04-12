'use client';

import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkIfMobile();

    // Check on resize
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
};

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      ('msMaxTouchPoints' in navigator && (navigator as Navigator & { msMaxTouchPoints: number }).msMaxTouchPoints > 0)
    );
  }, []);

  return isTouch;
};
