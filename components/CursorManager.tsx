'use client';

import { useEffect } from 'react';
import { useCursorColor } from '@/hooks/useCursorColor';
import { useIsTouchDevice } from '@/hooks/useIsMobile';

const CursorManager = () => {
  const isOnDark = useCursorColor();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    // Don't manage cursor on touch devices
    if (isTouch) return;

    if (isOnDark) {
      document.body.classList.add('cursor-on-dark');
    } else {
      document.body.classList.remove('cursor-on-dark');
    }

    return () => {
      document.body.classList.remove('cursor-on-dark');
    };
  }, [isOnDark, isTouch]);

  return null; // This component only manages body classes
};

export default CursorManager;
