'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log to external monitoring when available
    // console.error is acceptable here (error boundary, not debug)
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p aria-hidden="true" className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-6">
        {t('error.label500')}
      </p>
      <h1 className="font-display font-normal text-5xl lg:text-7xl text-foreground mb-6 leading-tight">
        {t('error.serverError')}
      </h1>
      <p className="text-secondary/50 font-light mb-12 max-w-sm leading-relaxed">
        {t('error.serverErrorDesc')}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 bg-primary text-white text-xs font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
        >
          {t('error.retry')}
        </button>
        <Link
          href="/"
          className="px-8 py-3 border border-secondary/20 text-xs font-mono uppercase tracking-[0.15em] text-secondary/60 hover:text-foreground hover:border-secondary/40 transition-colors duration-300"
        >
          {t('error.backHome')}
        </Link>
      </div>
    </div>
  );
}
