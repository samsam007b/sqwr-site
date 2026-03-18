'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const GA_ID = 'G-LXTJCPRN9D';
const STORAGE_KEY = 'sqwr_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      setAccepted(true);
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setAccepted(true);
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(STORAGE_KEY, 'refused');
    setVisible(false);
  };

  return (
    <>
      {accepted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 md:px-6 md:pb-6">
          <div className="max-w-2xl mx-auto bg-foreground border border-paper/10 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">

            {/* Red accent top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary hidden" />

            <div className="flex-1">
              <p className="text-[11px] font-mono text-paper/50 leading-relaxed tracking-wide">
                Nous utilisons Google Analytics pour mesurer l&apos;audience de ce site.{' '}
                <Link
                  href="/politique-confidentialite"
                  className="text-paper/70 underline underline-offset-2 hover:text-paper transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={refuse}
                className="text-[11px] font-mono text-paper/30 hover:text-paper/60 uppercase tracking-[0.15em] transition-colors duration-200"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="text-[11px] font-mono bg-paper text-foreground px-4 py-2 uppercase tracking-[0.15em] hover:bg-primary hover:text-paper transition-colors duration-200"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
