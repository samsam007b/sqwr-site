'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ── Intro lock ──
    // Start with scroll locked — the pixel grid intro must finish first.
    // Wheel events during intro are captured by PixelGridHero to accelerate
    // the animation. Once the logo is formed, we get the 'introComplete' event.
    const hasSnapSections = document.querySelectorAll('[data-snap-section]').length > 0;
    let introLocked = hasSnapSections;

    if (introLocked) {
      lenis.stop();
      window.scrollTo(0, 0);
    }

    const onIntroComplete = () => {
      if (!introLocked) return;
      introLocked = false;

      // Magnetic hold at logo formation, then release scroll
      setTimeout(() => {
        lenis.start();
      }, 600);
    };

    window.addEventListener('introComplete', onIntroComplete, { once: true });

    // ── Checkpoint system ──
    // Free scroll, but entering a checkpoint's capture zone triggers
    // smooth deceleration (magnetic pull) instead of an abrupt stop.
    let isHolding = false;
    let lastBoundary: number | null = null;
    let prevScrollY = window.scrollY;

    const CAPTURE = 100; // px — magnetic pull begins this far from checkpoint

    const onScroll = () => {
      if (introLocked) return;

      const scrollY = window.scrollY;

      if (isHolding) {
        prevScrollY = scrollY;
        return;
      }

      const sections = document.querySelectorAll('[data-snap-section]');

      for (let i = 0; i < sections.length; i++) {
        const rect = (sections[i] as HTMLElement).getBoundingClientRect();
        const top = Math.round(rect.top + window.scrollY);

        // Entered the capture zone?
        const enteredDown = prevScrollY < top - CAPTURE && scrollY >= top - CAPTURE;
        const enteredUp   = prevScrollY > top + CAPTURE && scrollY <= top + CAPTURE;

        if ((enteredDown || enteredUp) && top !== lastBoundary) {
          lastBoundary = top;
          isHolding = true;

          // Smooth deceleration to the exact checkpoint (easeOutQuart)
          lenis.scrollTo(top, {
            duration: 0.8,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            lock: true,
            onComplete: () => {
              // Brief hold, then release — user must re-scroll to continue
              lenis.stop();
              setTimeout(() => {
                lenis.start();
                isHolding = false;
                setTimeout(() => { lastBoundary = null; }, 300);
              }, 400);
            },
          });

          break;
        }
      }

      prevScrollY = scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('introComplete', onIntroComplete);
      window.removeEventListener('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
