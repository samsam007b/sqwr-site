'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MobileHomePage from '@/components/MobileHomePage';

const DesktopHomePage = dynamic(() => import('@/components/DesktopHomePage'), {
  loading: () => <div className="min-h-screen bg-background" />,
  ssr: false, // Canvas + APIs scroll = client-only
});

export default function HomePageWrapper() {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // SSR / first paint : render mobile version (Google mobile-first indexing)
  // No hydration mismatch — client initial render is also MobileHomePage (same state)
  // Desktop switches after useEffect fires (~100ms)
  if (isMobile === null) {
    return <MobileHomePage />;
  }

  if (isMobile) {
    return <MobileHomePage />;
  }

  return <DesktopHomePage />;
}
