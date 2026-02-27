'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import type { ProjectMockup } from '@/app/data/projects';

/* ── Grid constants — must match PixelGridHero ── */
const CELL_SIZE = 10;
const GAP = 2;
const STEP = CELL_SIZE + GAP;
const BG_COLOR = '#FAFAF8';
const BG_OP = 0.04; // matches PixelGridHero background cell opacity
const GRID_COL = 'rgba(17,17,17,'; // dark cells on light bg, like PixelGridHero

/* ── HD dissolve: canvas fades out to reveal real video when flip completes ── */
const DISSOLVE_START = 0.88; // start dissolving canvas at 88% of flip wave
const DISSOLVE_END = 1.0;    // fully dissolved at 100%

/* ── Scroll-phase boundaries (fraction of section scroll 0-1) ── */
/* Section = 500vh → each 1% = 5vh ≈ 0.4s of scroll                */
const P = {
  // Phase 0: breathing grid visible (15vh)
  breathEnd: 0.03,
  // Phase 1: flip top-right → reveal video 1 (85vh)
  flip1Start: 0.03,
  flip1End: 0.20,
  // Phase 2: video 1 fully visible + mockup (~100vh viewing ≈ 8s)
  mock1Start: 0.18,
  mock1End: 0.38,
  // Phase 3: flip top-left → reveal video 2 (85vh)
  flip2Start: 0.40,
  flip2End: 0.57,
  // Phase 4: video 2 fully visible + mockup (~100vh viewing ≈ 8s)
  mock2Start: 0.55,
  mock2End: 0.75,
  // Phase 5: reverse flip → back to white (60vh)
  exitStart: 0.77,
  exitEnd: 0.89,
};

/* ── Flip animation params ── */
const FLIP_WINDOW = 0.5; // each cell takes 50% of the wave duration to flip
const GAP_CLOSE_START = 0.15; // start closing gaps at 15% of flip wave

interface FlipCell {
  x: number;
  y: number;
  col: number;
  row: number;
  breathPhase: number;
  breathSpeed: number;
  /** Normalized delay from top-right corner (0-1) */
  delayTR: number;
  /** Normalized delay from top-left corner (0-1) */
  delayTL: number;
  /** Normalized delay from bottom-left corner (0-1) */
  delayBL: number;
}

export interface FlipProject {
  videoSrc: string;
  webmSrc: string;
  mockup: ProjectMockup;
  projectColor: string;
  projectHref: string;
  year: string;
}

interface PixelFlipRevealProps {
  projects: [FlipProject, FlipProject];
}

/* ── Helpers ── */
function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Draw a video onto the canvas using object-cover mapping */
function drawVideoObjectCover(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  W: number,
  H: number,
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;
  const va = vw / vh;
  const ca = W / H;
  let dw: number, dh: number, dx: number, dy: number;
  if (ca > va) {
    dw = W; dh = W / va; dx = 0; dy = (H - dh) / 2;
  } else {
    dh = H; dw = H * va; dx = (W - dw) / 2; dy = 0;
  }
  ctx.drawImage(video, dx, dy, dw, dh);
}

/* ── Pixel font for year display — 5×7 bitmap per digit, scaled up ── */
const FONT_SCALE = 3; // each font pixel = 3×3 grid cells
const DIGIT_W = 5;
const DIGIT_H = 7;
const DIGIT_GAP = 2; // grid-cell gap between digits

const DIGIT_BITMAPS: Record<string, string[]> = {
  '0': ['.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  '1': ['..X..', '.XX..', '..X..', '..X..', '..X..', '..X..', '.XXX.'],
  '2': ['.XXX.', 'X...X', '....X', '..XX.', '.X...', 'X....', 'XXXXX'],
  '3': ['.XXX.', 'X...X', '....X', '..XX.', '....X', 'X...X', '.XXX.'],
  '4': ['X...X', 'X...X', 'X...X', 'XXXXX', '....X', '....X', '....X'],
  '5': ['XXXXX', 'X....', 'XXXX.', '....X', '....X', 'X...X', '.XXX.'],
  '6': ['.XXX.', 'X....', 'X....', 'XXXX.', 'X...X', 'X...X', '.XXX.'],
  '7': ['XXXXX', '....X', '...X.', '..X..', '..X..', '..X..', '..X..'],
  '8': ['.XXX.', 'X...X', 'X...X', '.XXX.', 'X...X', 'X...X', '.XXX.'],
  '9': ['.XXX.', 'X...X', 'X...X', '.XXXX', '....X', '....X', '.XXX.'],
};

/** Build a Set of cell indices (row * cols + col) that form the year text */
function computeYearMask(year: string, cols: number, rows: number): Set<number> {
  const scaledW = DIGIT_W * FONT_SCALE;
  const scaledH = DIGIT_H * FONT_SCALE;
  const totalW = year.length * scaledW + (year.length - 1) * DIGIT_GAP;

  // Position: bottom-right with ~4-6% margin
  const padR = Math.max(4, Math.floor(cols * 0.04));
  const padB = Math.max(4, Math.floor(rows * 0.06));
  const startCol = cols - padR - totalW;
  const startRow = rows - padB - scaledH;

  const mask = new Set<number>();
  for (let d = 0; d < year.length; d++) {
    const bitmap = DIGIT_BITMAPS[year[d]];
    if (!bitmap) continue;
    const dCol = startCol + d * (scaledW + DIGIT_GAP);
    for (let br = 0; br < DIGIT_H; br++) {
      for (let bc = 0; bc < DIGIT_W; bc++) {
        if (bitmap[br][bc] === 'X') {
          for (let sy = 0; sy < FONT_SCALE; sy++) {
            for (let sx = 0; sx < FONT_SCALE; sx++) {
              const c = dCol + bc * FONT_SCALE + sx;
              const r = startRow + br * FONT_SCALE + sy;
              if (c >= 0 && c < cols && r >= 0 && r < rows) {
                mask.add(r * cols + c);
              }
            }
          }
        }
      }
    }
  }
  return mask;
}

/* ── Component ── */
const PixelFlipReveal = ({ projects }: PixelFlipRevealProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const cellsRef = useRef<FlipCell[]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const scrollRef = useRef(0);
  const displayScrollRef = useRef(0);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);
  const yearMask1Ref = useRef<Set<number>>(new Set());
  const yearMask2Ref = useRef<Set<number>>(new Set());

  const [mockup1Opacity, setMockup1Opacity] = useState(0);
  const [mockup2Opacity, setMockup2Opacity] = useState(0);
  const [hdVideo1Opacity, setHdVideo1Opacity] = useState(0);
  const [hdVideo2Opacity, setHdVideo2Opacity] = useState(0);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [year1Opacity, setYear1Opacity] = useState(0);
  const [year2Opacity, setYear2Opacity] = useState(0);

  /* ── Init grid cells ── */
  const initGrid = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / STEP);
    const rows = Math.ceil(height / STEP);
    colsRef.current = cols;
    rowsRef.current = rows;

    const maxCol = cols - 1;
    const maxRow = rows - 1;
    const maxDistTR = maxCol + maxRow;
    const maxDistTL = maxCol + maxRow;
    const maxDistBL = maxCol + maxRow;

    const cells: FlipCell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push({
          x: col * STEP,
          y: row * STEP,
          col,
          row,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.3 + Math.random() * 0.4,
          delayTR: ((maxCol - col) + row) / maxDistTR,
          delayTL: (col + row) / maxDistTL,
          delayBL: ((maxRow - row) + col) / maxDistBL,
        });
      }
    }
    cellsRef.current = cells;
  }, []);

  /* ── Measure section position ── */
  const measureSection = useCallback(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      sectionTopRef.current = rect.top + window.scrollY;
      sectionHeightRef.current = sectionRef.current.offsetHeight;
    }
  }, []);

  /* ── Main setup + render loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cleanup: (() => void) | undefined;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = window.innerWidth + STEP;
      const H = window.innerHeight + STEP;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      initGrid(W, H);
      yearMask1Ref.current = computeYearMask(projects[0].year, colsRef.current, rowsRef.current);
      yearMask2Ref.current = computeYearMask(projects[1].year, colsRef.current, rowsRef.current);
      measureSection();
      t0Ref.current = performance.now();

      /* ── Scroll handler ── */
      const onScroll = () => {
        measureSection();
        const vh = window.innerHeight;
        const rangeStart = sectionTopRef.current;
        const rangeEnd = sectionTopRef.current + sectionHeightRef.current;
        const totalRange = rangeEnd - rangeStart;
        if (totalRange <= 0) return;
        scrollRef.current = clamp((window.scrollY - rangeStart) / totalRange, 0, 1);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      /* ── Compute per-cell flip progress for a given phase ── */
      const cellFlipProgress = (
        globalProgress: number,
        delay: number,
      ): number => {
        const cellStart = delay * (1 - FLIP_WINDOW);
        const cellEnd = cellStart + FLIP_WINDOW;
        const raw = clamp((globalProgress - cellStart) / (cellEnd - cellStart), 0, 1);
        return easeInOutCubic(raw);
      };

      /* ── Render loop ── */
      const animate = (time: number) => {
        const t = (time - t0Ref.current) / 1000;

        // Direct scroll tracking — Lenis handles smoothing, no double-interpolation
        const scroll = scrollRef.current;

        const cells = cellsRef.current;
        const cols = colsRef.current;
        const W = canvas.width / (window.devicePixelRatio || 1);
        const H = canvas.height / (window.devicePixelRatio || 1);

        // Determine active phase and visibility
        const isVisible = scroll > 0.001 && scroll < 0.999;

        // Control PixelGridHero visibility
        const gridHeroOpacity = scroll < 0.02 ? 1 : scroll > 0.91 ? 1 : 0;
        window.dispatchEvent(new CustomEvent('videoRevealGridOpacity', { detail: gridHeroOpacity }));

        // Control header visibility
        const anyVideoVisible = scroll > P.flip1Start + 0.15 && scroll < P.exitEnd - 0.04;
        window.dispatchEvent(new CustomEvent('videoRevealUIHidden', { detail: anyVideoVisible ? 1 : 0 }));

        // Grain suppression
        if (anyVideoVisible) {
          document.body.classList.add('video-reveal-active');
        } else {
          document.body.classList.remove('video-reveal-active');
        }

        if (!isVisible) {
          container.style.opacity = '0';
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        container.style.opacity = '1';

        // Mockup overlay opacity
        const m1 = scroll >= P.mock1Start && scroll <= P.mock1End
          ? clamp((scroll - P.mock1Start) / 0.04, 0, 1) * clamp((P.mock1End - scroll) / 0.04, 0, 1)
          : 0;
        const m2 = scroll >= P.mock2Start && scroll <= P.mock2End
          ? clamp((scroll - P.mock2Start) / 0.04, 0, 1) * clamp((P.mock2End - scroll) / 0.04, 0, 1)
          : 0;
        setMockup1Opacity(m1);
        setMockup2Opacity(m2);

        // Year overlay — visible from mid-flip through entire viewing phase
        const y1 = scroll >= P.flip1Start + 0.08 && scroll < P.flip2Start
          ? clamp((scroll - P.flip1Start - 0.08) / 0.04, 0, 1) * clamp((P.flip2Start - scroll) / 0.04, 0, 1)
          : 0;
        const y2 = scroll >= P.flip2Start + 0.08 && scroll < P.exitStart
          ? clamp((scroll - P.flip2Start - 0.08) / 0.04, 0, 1) * clamp((P.exitStart - scroll) / 0.04, 0, 1)
          : 0;
        setYear1Opacity(y1);
        setYear2Opacity(y2);

        // ── HD video dissolve logic ──
        const flip1Ratio = scroll >= P.flip1Start && scroll <= P.flip1End
          ? clamp((scroll - P.flip1Start) / (P.flip1End - P.flip1Start), 0, 1)
          : scroll > P.flip1End && scroll < P.flip2Start ? 1 : 0;
        const dissolve1 = clamp((flip1Ratio - DISSOLVE_START) / (DISSOLVE_END - DISSOLVE_START), 0, 1);

        const flip2Ratio = scroll >= P.flip2Start && scroll <= P.flip2End
          ? clamp((scroll - P.flip2Start) / (P.flip2End - P.flip2Start), 0, 1)
          : scroll > P.flip2End && scroll < P.exitStart ? 1 : 0;
        const dissolve2 = clamp((flip2Ratio - DISSOLVE_START) / (DISSOLVE_END - DISSOLVE_START), 0, 1);

        const exitRatio = scroll >= P.exitStart
          ? clamp((scroll - P.exitStart) / (P.exitEnd - P.exitStart), 0, 1)
          : 0;

        let cOpacity = 1;
        if (dissolve1 > 0 && flip2Ratio === 0 && exitRatio === 0) {
          cOpacity = 1 - dissolve1;
        } else if (dissolve2 > 0 && exitRatio === 0) {
          cOpacity = 1 - dissolve2;
        } else if (exitRatio > 0) {
          cOpacity = exitRatio > 0.1 ? 1 : exitRatio / 0.1;
        }
        if (scroll >= P.flip2Start - 0.02 && scroll <= P.flip2Start + 0.04) {
          cOpacity = 1;
        }

        setCanvasOpacity(cOpacity);
        setHdVideo1Opacity(dissolve1 > 0 && flip2Ratio === 0 ? dissolve1 : (flip2Ratio > 0 ? 1 - clamp(flip2Ratio / 0.1, 0, 1) : 0));
        setHdVideo2Opacity(dissolve2 > 0 ? dissolve2 : (exitRatio > 0 ? 1 - exitRatio : 0));

        // Play/pause videos
        const v1 = videoRefs.current[0];
        const v2 = videoRefs.current[1];
        if (v1) {
          if (scroll >= P.flip1Start - 0.02 && scroll <= P.flip2End) {
            v1.play().catch(() => {});
          } else {
            v1.pause();
          }
        }
        if (v2) {
          if (scroll >= P.flip2Start - 0.02 && scroll <= P.exitEnd) {
            v2.play().catch(() => {});
          } else {
            v2.pause();
          }
        }

        // ── Determine flip states ──
        const flip1Global = scroll >= P.flip1Start && scroll <= P.flip1End
          ? clamp((scroll - P.flip1Start) / (P.flip1End - P.flip1Start), 0, 1)
          : scroll > P.flip1End ? 1 : 0;

        const flip2Global = scroll >= P.flip2Start && scroll <= P.flip2End
          ? clamp((scroll - P.flip2Start) / (P.flip2End - P.flip2Start), 0, 1)
          : scroll > P.flip2End ? 1 : 0;

        const exitGlobal = scroll >= P.exitStart
          ? clamp((scroll - P.exitStart) / (P.exitEnd - P.exitStart), 0, 1)
          : 0;

        // ── Gap closing ──
        const gapCloseRaw = exitGlobal > 0
          ? 1 - easeInOutCubic(clamp(exitGlobal / 0.35, 0, 1))
          : flip1Global >= 1
            ? 1
            : flip1Global > GAP_CLOSE_START
              ? easeInOutCubic(clamp((flip1Global - GAP_CLOSE_START) / (1 - GAP_CLOSE_START), 0, 1))
              : 0;

        // ── Clear canvas ──
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, W, H);

        // ── Build clip paths for HD video + draw white cells ──
        const v1Path = new Path2D();
        const v2Path = new Path2D();
        let hasV1Clip = false;
        let hasV2Clip = false;

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const cellIdx = cell.row * cols + cell.col;

          // Year mask: cells forming the year text stay white during flip
          const inYearMask =
            (flip1Global > 0 && flip2Global === 0 && exitGlobal === 0 && yearMask1Ref.current.has(cellIdx))
            || (flip2Global > 0 && exitGlobal === 0 && yearMask2Ref.current.has(cellIdx));

          let videoNum = 0; // 0=white, 1=video1, 2=video2
          let scaleX = 1;

          if (inYearMask) {
            // Force white — skip all flip logic
          } else if (exitGlobal > 0) {
            // Phase 5: video 2 → white (bottom-left propagation)
            const p = cellFlipProgress(exitGlobal, cell.delayBL);
            if (p > 0 && p < 1) {
              const angle = p * Math.PI;
              scaleX = Math.abs(Math.cos(angle));
              videoNum = p < 0.5 ? 2 : 0;
            } else if (p >= 1) {
              videoNum = 0;
            } else {
              videoNum = 2;
            }
          } else if (flip2Global > 0) {
            // Phase 3: video 1 → video 2 (top-left propagation)
            const p = cellFlipProgress(flip2Global, cell.delayTL);
            if (p > 0 && p < 1) {
              const angle = p * Math.PI;
              scaleX = Math.abs(Math.cos(angle));
              videoNum = p < 0.5 ? 1 : 2;
            } else if (p >= 1) {
              videoNum = 2;
            } else {
              videoNum = 1;
            }
          } else if (flip1Global > 0) {
            // Phase 1: white → video 1 (top-right propagation)
            const p = cellFlipProgress(flip1Global, cell.delayTR);
            if (p > 0 && p < 1) {
              const angle = p * Math.PI;
              scaleX = Math.abs(Math.cos(angle));
              videoNum = p >= 0.5 ? 1 : 0;
            } else if (p >= 1) {
              videoNum = 1;
            }
            // else p===0: white cell (no flip started)
          }

          if (videoNum > 0) {
            // Video cell — add to clip path (with gap closing expansion)
            const expand = GAP * gapCloseRaw;
            const fullW = CELL_SIZE + expand;
            const fullH = CELL_SIZE + expand;
            const vidW = fullW * Math.max(scaleX, 0.02);
            const vidX = cell.x - expand / 2 + (fullW - vidW) / 2;
            const vidY = cell.y - expand / 2;

            if (videoNum === 1) {
              v1Path.rect(vidX, vidY, vidW, fullH);
              hasV1Clip = true;
            } else {
              v2Path.rect(vidX, vidY, vidW, fullH);
              hasV2Clip = true;
            }
          } else {
            // White / breathing cell
            const bt = t * cell.breathSpeed + cell.breathPhase;
            const op = BG_OP + Math.sin(bt) * 0.01;
            if (op <= 0.001) continue;

            const sz = CELL_SIZE * Math.max(scaleX, 0.02);
            const bx = cell.x + (CELL_SIZE - sz) / 2;
            ctx.fillStyle = `${GRID_COL}${Math.min(1, op).toFixed(3)})`;
            ctx.fillRect(bx, cell.y, sz, CELL_SIZE);
          }
        }

        // ── Draw HD videos through clip paths ──
        if (hasV1Clip && v1 && v1.readyState >= 2) {
          ctx.save();
          ctx.clip(v1Path);
          drawVideoObjectCover(ctx, v1, W, H);
          ctx.restore();
        }

        if (hasV2Clip && v2 && v2.readyState >= 2) {
          ctx.save();
          ctx.clip(v2Path);
          drawVideoObjectCover(ctx, v2, W, H);
          ctx.restore();
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('scroll', onScroll);
        document.body.classList.remove('video-reveal-active');
      };
    };

    setup();
    return () => cleanup?.();
  }, [initGrid, measureSection]);

  /* ── Resize handler ── */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const W = window.innerWidth + STEP;
        const H = window.innerHeight + STEP;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.scale(dpr, dpr);
        initGrid(W, H);
        yearMask1Ref.current = computeYearMask(projects[0].year, colsRef.current, rowsRef.current);
        yearMask2Ref.current = computeYearMask(projects[1].year, colsRef.current, rowsRef.current);
        measureSection();
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, [initGrid, measureSection]);

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ height: '500vh' }}>
      {/* Snap checkpoints — at peak of each video viewing window */}
      <div data-snap-section className="absolute" style={{ top: '28%' }} />
      <div data-snap-section className="absolute" style={{ top: '65%' }} />

      {/* HD video layers — positioned behind canvas, revealed on dissolve */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -2, opacity: hdVideo1Opacity }}
      >
        <video
          ref={el => { videoRefs.current[0] = el; }}
          loop
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        >
          <source src={projects[0].webmSrc} type="video/webm" />
          <source src={projects[0].videoSrc} type="video/mp4" />
        </video>
      </div>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -2, opacity: hdVideo2Opacity }}
      >
        <video
          ref={el => { videoRefs.current[1] = el; }}
          loop
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        >
          <source src={projects[1].webmSrc} type="video/webm" />
          <source src={projects[1].videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Fixed canvas — fades out to reveal HD video */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1, opacity: 0 }}
      >
        <canvas ref={canvasRef} className="block" style={{ opacity: canvasOpacity }} />
      </div>


      {/* Mockup overlay — Project 1 */}
      <div className="sticky top-0 h-screen pointer-events-none" style={{ zIndex: 10 }}>
        <div
          className="absolute inset-0 flex flex-col transition-opacity duration-300"
          style={{ opacity: mockup1Opacity }}
        >
          <MockupOverlay mockup={projects[0].mockup} href={projects[0].projectHref} />
        </div>
      </div>

      {/* Mockup overlay — Project 2 */}
      <div className="sticky top-0 h-screen pointer-events-none" style={{ zIndex: 10 }}>
        <div
          className="absolute inset-0 flex flex-col transition-opacity duration-300"
          style={{ opacity: mockup2Opacity }}
        >
          <MockupOverlay mockup={projects[1].mockup} href={projects[1].projectHref} />
        </div>
      </div>

      {/* Year overlay — DOM-based, persists through entire video viewing */}
      <div
        className="fixed bottom-[6%] right-[4%] pointer-events-none font-mono text-white/90 tracking-[0.25em]"
        style={{
          zIndex: 11,
          fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
          opacity: year1Opacity,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'difference',
        }}
      >
        {projects[0].year}
      </div>
      <div
        className="fixed bottom-[6%] right-[4%] pointer-events-none font-mono text-white/90 tracking-[0.25em]"
        style={{
          zIndex: 11,
          fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
          opacity: year2Opacity,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'difference',
        }}
      >
        {projects[1].year}
      </div>
    </section>
  );
};

/* ── Mockup Overlay (reused from VideoRevealSection) ── */
function MockupOverlay({ mockup, href }: { mockup: ProjectMockup; href: string }) {
  return (
    <>
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      {/* Navigation bar */}
      <div className="relative z-10 flex items-center justify-between px-[5%] py-[3%]">
        <div className="hidden sm:flex items-center gap-[2em]">
          {mockup.navLeft.map((item) => (
            <span
              key={item}
              className="text-white/70 font-light"
              style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.8rem)', letterSpacing: '0.08em' }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center">
          <span
            className="text-white font-light tracking-wide"
            style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)', fontFamily: 'serif', letterSpacing: '0.1em' }}
          >
            {mockup.brandName}
          </span>
          <span
            className="text-white/40"
            style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.7rem)', fontFamily: 'serif', fontStyle: 'italic' }}
          >
            {mockup.brandSub}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-[2em]">
          {mockup.navRight.map((item) => (
            <span
              key={item}
              className="text-white/70 font-light"
              style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.8rem)', letterSpacing: '0.08em' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-[10%]">
        <span
          className="text-white/50 uppercase font-light mb-6"
          style={{ fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)', letterSpacing: '0.3em' }}
        >
          {mockup.eyebrow}
        </span>
        <h3
          className="text-white font-light leading-[0.95] mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 4.5rem)', fontFamily: 'serif', letterSpacing: '-0.01em' }}
        >
          {mockup.heroTitle}
        </h3>
        <div className="w-16 h-[1px] bg-white/30 mb-6" />
        <p
          className="text-white/70 font-light italic"
          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)', fontFamily: 'serif', letterSpacing: '0.04em' }}
        >
          {mockup.heroSub}
        </p>
        <div className="mt-8 pointer-events-auto">
          <Link
            href={href}
            className="border border-white/60 text-white px-8 py-3 font-light hover:bg-white/10 transition-colors duration-300"
            style={{ fontSize: 'clamp(0.55rem, 0.8vw, 0.75rem)', letterSpacing: '0.12em' }}
          >
            {mockup.cta}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex flex-col items-center pb-[3%]">
        <span
          className="text-white/30 uppercase"
          style={{ fontSize: 'clamp(0.4rem, 0.5vw, 0.45rem)', letterSpacing: '0.25em' }}
        >
          Défiler
        </span>
        <div className="w-[1px] h-6 bg-white/20 mt-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 animate-scroll-line" />
        </div>
      </div>
    </>
  );
}

export default PixelFlipReveal;
