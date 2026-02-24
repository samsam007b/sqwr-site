'use client';

import { useState, useEffect, ReactNode } from 'react';
import SmoothScroll from './SmoothScroll';
import CustomCursorTrail from './CustomCursorTrail';
import CursorManager from './CursorManager';

interface DesktopOnlyProvidersProps {
  children: ReactNode;
}

export default function DesktopOnlyProviders({ children }: DesktopOnlyProvidersProps) {
  const [isDesktop, setIsDesktop] = useState<null | boolean>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // null = SSR / first paint → on n'initialise pas Lenis du tout
  // false = mobile confirmé → on skip CursorManager, CustomCursorTrail, SmoothScroll
  if (!isDesktop) {
    return <>{children}</>;
  }

  // Desktop confirmé → on monte tous les providers desktop
  return (
    <>
      <CursorManager />
      <CustomCursorTrail />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </>
  );
}
