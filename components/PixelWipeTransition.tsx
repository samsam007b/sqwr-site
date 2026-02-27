'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/* ── Grid constants — must match PixelGridHero ── */
const CELL_SIZE = 10;
const GAP = 2;
const STEP = CELL_SIZE + GAP;
const BG_COLOR = '#FAFAF8';

/* ── Timing ── */
const WIPE_IN_MS = 700;   // center → full screen
const HOLD_MS = 150;       // brief pause while scroll resets
const WIPE_OUT_MS = 400;   // fade out (PixelGridHero emerge takes over)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const PixelWipeTransition = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const activeRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onWipeStart = () => {
      if (activeRef.current) return;
      activeRef.current = true;
      setVisible(true);

      const canvas = canvasRef.current;
      if (!canvas) { activeRef.current = false; setVisible(false); return; }
      const ctx = canvas.getContext('2d');
      if (!ctx) { activeRef.current = false; setVisible(false); return; }

      const dpr = window.devicePixelRatio || 1;
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(W / STEP);
      const rows = Math.ceil(H / STEP);
      const centerCol = cols / 2;
      const centerRow = rows / 2;
      const maxDist = centerCol + centerRow;

      const startTime = performance.now();

      /* ── Phase 1: wipe in — cells appear from center outward ── */
      const animateWipeIn = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / WIPE_IN_MS);

        ctx.clearRect(0, 0, W, H);

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            // Manhattan distance from center, normalized 0-1
            const dist = (Math.abs(col - centerCol) + Math.abs(row - centerRow)) / maxDist;
            // Each cell appears when the wave reaches it
            const cellProgress = Math.max(0, Math.min(1, (progress - dist * 0.6) / 0.4));

            if (cellProgress > 0) {
              const scale = easeOutCubic(cellProgress);
              const sz = CELL_SIZE * scale;
              const x = col * STEP + (CELL_SIZE - sz) / 2;
              const y = row * STEP + (CELL_SIZE - sz) / 2;
              ctx.fillStyle = BG_COLOR;
              ctx.fillRect(x, y, sz, sz);
            }
          }
        }

        // Also close gaps progressively in the last 30% of the wipe
        if (progress > 0.7) {
          const gapClose = (progress - 0.7) / 0.3; // 0→1
          ctx.globalAlpha = gapClose;
          ctx.fillStyle = BG_COLOR;
          ctx.fillRect(0, 0, W, H);
          ctx.globalAlpha = 1;
        }

        if (progress < 1) {
          requestAnimationFrame(animateWipeIn);
        } else {
          // Solid fill — screen fully covered
          ctx.fillStyle = BG_COLOR;
          ctx.fillRect(0, 0, W, H);

          // Navigate to home if needed, scroll to top, replay intro
          if (pathname !== '/') {
            router.push('/');
          }
          window.scrollTo(0, 0);

          // Brief hold, then dispatch replayIntro and fade out
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('replayIntro'));

            // Phase 2: fade the wipe canvas out — PixelGridHero emerge takes over
            const fadeStart = performance.now();
            const animateFadeOut = (time: number) => {
              const fadeElapsed = time - fadeStart;
              const fadeProgress = Math.min(1, fadeElapsed / WIPE_OUT_MS);

              if (canvas) {
                canvas.style.opacity = String(1 - easeOutCubic(fadeProgress));
              }

              if (fadeProgress < 1) {
                requestAnimationFrame(animateFadeOut);
              } else {
                // Cleanup
                setVisible(false);
                activeRef.current = false;
                if (canvas) canvas.style.opacity = '1';
              }
            };
            requestAnimationFrame(animateFadeOut);
          }, HOLD_MS);
        }
      };

      requestAnimationFrame(animateWipeIn);
    };

    window.addEventListener('pixelWipeStart', onWipeStart);
    return () => window.removeEventListener('pixelWipeStart', onWipeStart);
  }, [router, pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 9999, pointerEvents: 'all' }}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default PixelWipeTransition;
