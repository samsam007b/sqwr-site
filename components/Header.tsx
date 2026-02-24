'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

// Exact same dimensions as PixelGridHero background
const CELL_SIZE = 10;
const GAP = 2;
const STEP = CELL_SIZE + GAP;
const CELL_COLOR = '#111111';

const FILL_DURATION = 700;  // ms — vague de remplissage
const DRAIN_DURATION = 600; // ms — vague de retrait
const TRAIL = 0.12;         // largeur de la vague (fraction de la distance max)
const CONTENT_REVEAL_AT = 0.78; // progress à partir duquel le menu s'affiche

type OverlayPhase = 'closed' | 'filling' | 'open' | 'draining';

// ─── Canvas draw ─────────────────────────────────────────────────────────────
function drawOverlayFrame(
  canvas: HTMLCanvasElement,
  progress: number,
  phase: 'filling' | 'draining',
) {
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width / dpr;
  const H = canvas.height / dpr;
  const cols = Math.ceil(W / STEP) + 1;
  const rows = Math.ceil(H / STEP) + 1;

  // Origin = coin haut-droit
  const originCol = cols - 1;
  const originRow = 0;
  const maxDist = originCol + (rows - 1);

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = CELL_COLOR;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = Math.abs(c - originCol) + Math.abs(r - originRow);
      const distNorm = maxDist > 0 ? dist / maxDist : 0;

      let cellScale: number;

      if (phase === 'filling') {
        // La vague part de l'origine (distNorm=0) vers le coin opposé (distNorm=1)
        const t = (progress - distNorm * (1 - TRAIL)) / TRAIL;
        cellScale = Math.max(0, Math.min(1, t));
      } else {
        // La vague de retrait part du coin opposé (distNorm=1) vers l'origine
        const drainNorm = 1 - distNorm;
        const t = (progress - drainNorm * (1 - TRAIL)) / TRAIL;
        cellScale = Math.max(0, Math.min(1, 1 - t));
      }

      if (cellScale <= 0.005) continue;

      // Scale jusqu'à STEP (pas CELL_SIZE) pour combler les gaps et obtenir du noir plein
      const sz = STEP * cellScale;
      const x = c * STEP + (STEP - sz) / 2;
      const y = r * STEP + (STEP - sz) / 2;
      ctx.fillRect(x, y, sz, sz);
    }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
const Header = () => {
  const { t } = useLanguage();
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>('closed');
  const [showContent, setShowContent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  // phaseRef = source of vérité synchrone pour les callbacks
  const phaseRef = useRef<OverlayPhase>('closed');

  const overlayVisible = overlayPhase !== 'closed';

  // ── Initialise le canvas au mount ─────────────────────────────────────────
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  // ── Animation de remplissage ──────────────────────────────────────────────
  const runFill = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const start = performance.now();
    let contentRevealed = false;

    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / FILL_DURATION);
      drawOverlayFrame(canvas, progress, 'filling');

      if (!contentRevealed && progress >= CONTENT_REVEAL_AT) {
        contentRevealed = true;
        setShowContent(true);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setOverlayPhase('open');
        phaseRef.current = 'open';
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  }, []);

  // ── Animation de retrait ──────────────────────────────────────────────────
  const runDrain = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    setShowContent(false);
    const start = performance.now();

    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / DRAIN_DURATION);
      drawOverlayFrame(canvas, progress, 'draining');

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setOverlayPhase('closed');
        phaseRef.current = 'closed';
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        if (ctx) ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  }, []);

  const handleOpenMenu = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setOverlayPhase('filling');
    phaseRef.current = 'filling';
    runFill();
  }, [runFill]);

  const handleCloseMenu = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setOverlayPhase('draining');
    phaseRef.current = 'draining';
    runDrain();
  }, [runDrain]);

  const handleToggle = useCallback(() => {
    const phase = phaseRef.current;
    if (phase === 'closed' || phase === 'draining') {
      handleOpenMenu();
    } else {
      handleCloseMenu();
    }
  }, [handleOpenMenu, handleCloseMenu]);

  // ── Scroll ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Masquer pendant le video reveal ───────────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const hide = (e as CustomEvent).detail as number;
      if (menuBtnRef.current) {
        menuBtnRef.current.style.opacity = String(1 - hide);
        menuBtnRef.current.style.pointerEvents = hide > 0.5 ? 'none' : 'auto';
      }
      if (controlsRef.current && phaseRef.current === 'closed') {
        controlsRef.current.style.opacity = String(1 - hide);
        controlsRef.current.style.pointerEvents = hide > 0.5 ? 'none' : 'auto';
      }
    };
    window.addEventListener('videoRevealUIHidden', handler);
    return () => window.removeEventListener('videoRevealUIHidden', handler);
  }, []);

  // ── Lock scroll quand overlay visible ────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = overlayPhase !== 'closed' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayPhase]);

  // ── Cleanup RAF ───────────────────────────────────────────────────────────
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const menuItems = [
    { href: '/', label: t('nav.home'), num: '01' },
    { href: '/services', label: t('nav.services'), num: '02' },
    { href: '/portfolio', label: t('nav.portfolio'), num: '03' },
    { href: '/about', label: t('nav.about'), num: '04' },
    { href: '/contact', label: t('nav.contact'), num: '05' },
  ];

  return (
    <>
      {/* ── Logo carré — haut gauche ───────────────────────────────────────── */}
      <motion.div
        className="fixed top-6 left-6 lg:left-10 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link
          href="/"
          className="block group"
          onClick={overlayVisible ? handleCloseMenu : undefined}
        >
          <motion.div
            className={`w-6 h-6 transition-colors duration-500 ${
              overlayVisible
                ? 'bg-paper group-hover:bg-primary'
                : 'bg-foreground group-hover:bg-primary'
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
        </Link>
      </motion.div>

      {/* ── Bouton menu : carré noir — haut droite ────────────────────────── */}
      <motion.button
        ref={menuBtnRef}
        className="fixed top-6 right-6 lg:right-10 z-[60]"
        onClick={handleToggle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        aria-label="Toggle menu"
        aria-expanded={overlayVisible}
      >
        <motion.div
          className={`w-6 h-6 transition-colors duration-500 ${
            overlayVisible
              ? 'bg-paper hover:bg-primary'
              : 'bg-foreground hover:bg-primary'
          }`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        />
      </motion.button>

      {/* ── Language selector — bas droite ───────────────────────────────── */}
      <motion.div
        ref={controlsRef}
        className="fixed bottom-6 right-6 lg:right-10 z-[55] flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{
          opacity: overlayVisible ? 0 : 1,
          pointerEvents: overlayVisible ? 'none' : 'auto',
        }}
        transition={{ duration: 0.3 }}
      >
        <LanguageSelector />
      </motion.div>

      {/* ── Canvas pixel overlay ──────────────────────────────────────────── */}
      <canvas
        ref={overlayCanvasRef}
        className={`fixed inset-0 z-[55] pointer-events-none ${
          overlayPhase === 'closed' ? 'hidden' : ''
        }`}
      />

      {/* ── Contenu du menu ───────────────────────────────────────────────── */}
      {overlayPhase !== 'closed' && (
        <div
          className="fixed inset-0 z-[56] flex items-center"
          style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showContent ? 'auto' : 'none',
          }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-16">
            <nav className="flex flex-col">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  animate={
                    showContent
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -40 }
                  }
                  transition={{
                    delay: showContent ? 0.05 + index * 0.06 : 0,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-paper/10 first:border-t"
                >
                  <Link
                    href={item.href}
                    onClick={handleCloseMenu}
                    className="group flex items-baseline gap-6 py-6 lg:py-8 transition-colors duration-300"
                  >
                    <span className="text-xs font-mono text-paper/30 group-hover:text-primary transition-colors duration-300">
                      {item.num}
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-paper/80 group-hover:text-paper transition-colors duration-300">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
              animate={showContent ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: showContent ? 0.4 : 0, duration: 0.6 }}
            >
              <div>
                <a
                  href="tel:+32493302752"
                  className="text-paper/50 hover:text-paper text-base font-light transition-colors duration-300 block mb-2 md:hidden"
                >
                  +32 493 30 27 52
                </a>
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-paper/40 hover:text-paper text-sm font-light transition-colors duration-300 block mb-2"
                >
                  studio@sqwr.be
                </a>
                <p className="text-paper/20 text-xs font-mono uppercase tracking-[0.15em]">
                  Bruxelles, Belgique
                </p>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSelector />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
