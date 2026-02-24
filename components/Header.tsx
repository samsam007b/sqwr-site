'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

const WAVE_MS = 500;
const CELL_ANIM_MS = 120;

interface GridCell {
  openDelay: number;
  closeDelay: number;
}

interface GridData {
  cells: GridCell[];
  cols: number;
  rows: number;
  cellSize: number;
  cellGap: number;
}

type OverlayPhase = 'closed' | 'mounting' | 'filling' | 'open' | 'emptying';

const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>('closed');
  const [showContent, setShowContent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [gridData, setGridData] = useState<GridData | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Build pixel grid on mount
  useEffect(() => {
    const cellSize = window.innerWidth < 768 ? 40 : 60;
    const cellGap = window.innerWidth < 768 ? 2 : 3;
    const step = cellSize + cellGap;
    const cols = Math.ceil(window.innerWidth / step) + 1;
    const rows = Math.ceil(window.innerHeight / step) + 1;
    const originCol = cols - 1;
    const originRow = 0;
    const maxDist = originCol + (rows - 1);

    const cells: GridCell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.abs(c - originCol) + Math.abs(r - originRow);
        const norm = dist / maxDist;
        cells.push({
          openDelay: norm * (WAVE_MS / 1000),
          closeDelay: (1 - norm) * (WAVE_MS / 1000),
        });
      }
    }

    setGridData({ cells, cols, rows, cellSize, cellGap });
  }, []);

  // Open menu — pixels propagate from top-right
  const handleOpenMenu = useCallback(() => {
    clearTimers();
    setIsMenuOpen(true);
    setOverlayPhase('mounting');

    // After mount paint, start filling
    const t0 = setTimeout(() => setOverlayPhase('filling'), 20);
    // Show menu content mid-wave
    const t1 = setTimeout(() => setShowContent(true), WAVE_MS * 0.6 + 20);
    // Mark fully open
    const t2 = setTimeout(() => setOverlayPhase('open'), WAVE_MS + CELL_ANIM_MS + 20);
    timersRef.current = [t0, t1, t2];
  }, [clearTimers]);

  // Close menu — pixels retract back to top-right
  const handleCloseMenu = useCallback(() => {
    clearTimers();
    setIsMenuOpen(false);
    setShowContent(false);
    setOverlayPhase('emptying');

    const t1 = setTimeout(() => setOverlayPhase('closed'), WAVE_MS + CELL_ANIM_MS + 70);
    timersRef.current = [t1];
  }, [clearTimers]);

  const handleToggleMenu = useCallback(() => {
    if (overlayPhase === 'closed') {
      handleOpenMenu();
    } else if (overlayPhase === 'open' || overlayPhase === 'filling') {
      handleCloseMenu();
    }
  }, [overlayPhase, handleOpenMenu, handleCloseMenu]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide menu button & controls during video reveal
  useEffect(() => {
    const handler = (e: Event) => {
      const hide = (e as CustomEvent).detail as number;
      if (menuBtnRef.current) {
        menuBtnRef.current.style.opacity = String(1 - hide);
        menuBtnRef.current.style.pointerEvents = hide > 0.5 ? 'none' : 'auto';
      }
      if (controlsRef.current && !isMenuOpen) {
        controlsRef.current.style.opacity = String(1 - hide);
        controlsRef.current.style.pointerEvents = hide > 0.5 ? 'none' : 'auto';
      }
    };
    window.addEventListener('videoRevealUIHidden', handler);
    return () => window.removeEventListener('videoRevealUIHidden', handler);
  }, [isMenuOpen]);

  // Lock body scroll when overlay is visible
  useEffect(() => {
    if (overlayPhase !== 'closed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [overlayPhase]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const menuItems = [
    { href: '/', label: t('nav.home'), num: '01' },
    { href: '/services', label: t('nav.services'), num: '02' },
    { href: '/portfolio', label: t('nav.portfolio'), num: '03' },
    { href: '/about', label: t('nav.about'), num: '04' },
    { href: '/contact', label: t('nav.contact'), num: '05' },
  ];

  const gridClassName =
    overlayPhase === 'filling' ? 'pixel-grid-filling' :
    overlayPhase === 'open' ? 'pixel-grid-open' :
    overlayPhase === 'emptying' ? 'pixel-grid-emptying' : '';

  return (
    <>
      {/* Floating Mark — top left */}
      <motion.div
        className="fixed top-6 left-6 lg:left-10 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Link
          href="/"
          className="block group"
          onClick={handleCloseMenu}
        >
          <motion.div
            className={`w-6 h-6 transition-colors duration-500 ${
              isMenuOpen
                ? 'bg-paper group-hover:bg-primary'
                : 'bg-foreground group-hover:bg-primary'
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
        </Link>
      </motion.div>

      {/* Menu Trigger — top right */}
      <motion.button
        ref={menuBtnRef}
        className="fixed top-6 right-6 lg:right-10 z-[60] flex items-center gap-3 group"
        onClick={handleToggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <motion.span
          className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
            isMenuOpen ? 'text-paper' : 'text-foreground'
          }`}
          animate={{ opacity: isScrolled || isMenuOpen ? 1 : 0.5 }}
        >
          {isMenuOpen ? 'Fermer' : 'Menu'}
        </motion.span>

        {/* Hamburger — square-proportioned */}
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <motion.span
            className={`block w-6 h-[2px] origin-center ${
              isMenuOpen ? 'bg-paper' : 'bg-foreground'
            }`}
            animate={
              isMenuOpen
                ? { rotate: 45, y: 9 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className={`block h-[2px] ml-auto ${
              isMenuOpen ? 'bg-paper' : 'bg-foreground'
            }`}
            animate={
              isMenuOpen
                ? { opacity: 0, width: 0 }
                : { opacity: 1, width: 16 }
            }
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block w-6 h-[2px] origin-center ${
              isMenuOpen ? 'bg-paper' : 'bg-foreground'
            }`}
            animate={
              isMenuOpen
                ? { rotate: -45, y: -9 }
                : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.button>

      {/* Controls — bottom right floating */}
      <motion.div
        ref={controlsRef}
        className="fixed bottom-6 right-6 lg:right-10 z-[55] flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 0 : 1, pointerEvents: isMenuOpen ? 'none' as const : 'auto' as const }}
        transition={{ duration: 0.3 }}
      >
        <LanguageSelector />
      </motion.div>

      {/* Pixel Grid Menu Overlay */}
      {overlayPhase !== 'closed' && gridData && (
        <div className="fixed inset-0 z-[55] overflow-hidden">
          {/* Pixel cells — propagate from top-right corner */}
          <div
            className={`absolute inset-0 ${gridClassName}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridData.cols}, ${gridData.cellSize}px)`,
              gridAutoRows: `${gridData.cellSize}px`,
              gap: `${gridData.cellGap}px`,
            }}
          >
            {gridData.cells.map((cell, i) => (
              <div
                key={i}
                className="pixel-overlay-cell"
                style={{
                  '--d-open': `${cell.openDelay}s`,
                  '--d-close': `${cell.closeDelay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Menu content — appears once grid mostly filled */}
          <div
            className="absolute inset-0 flex items-center"
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

              {/* Footer info in overlay */}
              <motion.div
                className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
                animate={showContent ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: showContent ? 0.4 : 0, duration: 0.6 }}
              >
                <div>
                  {/* Numéro de téléphone — priorité sur mobile */}
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
        </div>
      )}
    </>
  );
};

export default Header;
