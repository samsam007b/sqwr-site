'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import type { ProjectMockup } from '@/app/data/projects';
import { useLanguage } from '@/context/LanguageContext';

/* ── Grid constants — must match PixelGridHero ── */
const CELL_SIZE = 10;
const GAP = 2;
const STEP = CELL_SIZE + GAP;
const BG_COLOR = '#FAFAF8';
const BG_OP = 0.04; // matches PixelGridHero background cell opacity
const GRID_COL = 'rgba(17,17,17,'; // dark cells on light bg, like PixelGridHero

/* ── HD dissolve: canvas fades out to reveal real media when flip completes ── */
const DISSOLVE_START = 0.88; // start dissolving canvas at 88% of flip wave
const DISSOLVE_END = 1.0;    // fully dissolved at 100%

/* ── Phase timings, expressed in vh (tuned for the original 2-project cut,
 * then reused as fixed building blocks so N projects extend the section
 * height instead of squeezing the choreography). ── */
const BREATH_VH = 15;   // initial breathing-grid zone
const FLIP_VH = 85;     // width of a single flip animation
const VIEW_VH = 100;    // width of a project's viewing window
const OVERLAP_VH = 10;  // view starts this many vh before its flip fully ends
const GAP_VH = 10;      // pause between a view ending and the next flip starting
const EXIT_VH = 60;     // final flip back to white
const TAIL_VH = 55;     // settle zone after the exit flip

/* ── Corner used for each entrance/mid-transition flip, cycling if N > 3.
 * 'BL' (bottom-left) is reserved for the exit flip. ── */
const FLIP_CORNER_CYCLE: Array<'TR' | 'TL' | 'BR'> = ['TR', 'TL', 'BR'];

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
  /** Normalized delay from bottom-right corner (0-1) */
  delayBR: number;
  /** Normalized delay from bottom-left corner (0-1) */
  delayBL: number;
}

export interface FlipProject {
  /** Either a looping video (videoSrc/webmSrc) or a static image (imageSrc) can be supplied. */
  videoSrc?: string;
  webmSrc?: string;
  imageSrc?: string;
  mockup: ProjectMockup;
  projectColor: string;
  projectHref: string;
  year: string;
}

interface PixelFlipRevealProps {
  projects: FlipProject[];
}

/* ── Helpers ── */
function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Draw a video or image onto the canvas using object-cover mapping */
function drawMediaObjectCover(
  ctx: CanvasRenderingContext2D,
  media: HTMLVideoElement | HTMLImageElement,
  W: number,
  H: number,
) {
  const isVideo = media instanceof HTMLVideoElement;
  const mw = isVideo ? media.videoWidth : media.naturalWidth;
  const mh = isVideo ? media.videoHeight : media.naturalHeight;
  if (!mw || !mh) return;
  const ma = mw / mh;
  const ca = W / H;
  let dw: number, dh: number, dx: number, dy: number;
  if (ca > ma) {
    dw = W; dh = W / ma; dx = 0; dy = (H - dh) / 2;
  } else {
    dh = H; dw = H * ma; dx = (W - dw) / 2; dy = 0;
  }
  ctx.drawImage(media, dx, dy, dw, dh);
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

/* ── Phase geometry, generalized to N projects ──
 * flip[k] transitions from state k (0 = white, k>0 = project k-1) to project k.
 * view[k] is project k's viewing window. A final exit flip returns to white. */
interface Phases {
  breathEnd: number;
  flipStart: number[];
  flipEnd: number[];
  viewStart: number[];
  viewEnd: number[];
  exitStart: number;
  exitEnd: number;
  totalVh: number;
}

function computePhases(n: number): Phases {
  const flipStart: number[] = [];
  const flipEnd: number[] = [];
  const viewStart: number[] = [];
  const viewEnd: number[] = [];

  let pos = BREATH_VH;
  for (let k = 0; k < n; k++) {
    const fs = pos;
    const fe = fs + FLIP_VH;
    const vs = fe - OVERLAP_VH;
    const ve = vs + VIEW_VH;
    flipStart.push(fs);
    flipEnd.push(fe);
    viewStart.push(vs);
    viewEnd.push(ve);
    pos = ve + GAP_VH;
  }
  const exitStart = pos;
  const exitEnd = exitStart + EXIT_VH;
  const totalVh = exitEnd + TAIL_VH;

  return { breathEnd: BREATH_VH, flipStart, flipEnd, viewStart, viewEnd, exitStart, exitEnd, totalVh };
}

function getDelay(cell: FlipCell, corner: 'TR' | 'TL' | 'BR' | 'BL'): number {
  switch (corner) {
    case 'TR': return cell.delayTR;
    case 'TL': return cell.delayTL;
    case 'BR': return cell.delayBR;
    case 'BL': return cell.delayBL;
  }
}

/* ── Component ── */
const PixelFlipReveal = ({ projects }: PixelFlipRevealProps) => {
  const N = projects.length;
  const phasesRef = useRef<Phases>(computePhases(N));
  const P = phasesRef.current;
  const totalVh = P.totalVh;

  // Fractions of total scroll range (0-1), derived from the vh phase geometry.
  const flipStartFrac = P.flipStart.map(v => v / totalVh);
  const flipEndFrac = P.flipEnd.map(v => v / totalVh);
  const viewStartFrac = P.viewStart.map(v => v / totalVh);
  const viewEndFrac = P.viewEnd.map(v => v / totalVh);
  const exitStartFrac = P.exitStart / totalVh;
  const exitEndFrac = P.exitEnd / totalVh;

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(new Array(N).fill(null));
  const cellsRef = useRef<FlipCell[]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const scrollRef = useRef(0);
  const displayScrollRef = useRef(0);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);
  const yearMasksRef = useRef<Set<number>[]>([]);

  const [mockupOpacities, setMockupOpacities] = useState<number[]>(() => new Array(N).fill(0));
  const [hdOpacities, setHdOpacities] = useState<number[]>(() => new Array(N).fill(0));
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [yearOpacities, setYearOpacities] = useState<number[]>(() => new Array(N).fill(0));

  /* ── Init grid cells ── */
  const initGrid = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / STEP);
    const rows = Math.ceil(height / STEP);
    colsRef.current = cols;
    rowsRef.current = rows;

    const maxCol = cols - 1;
    const maxRow = rows - 1;
    const maxDist = maxCol + maxRow;

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
          delayTR: ((maxCol - col) + row) / maxDist,
          delayTL: (col + row) / maxDist,
          delayBR: ((maxCol - col) + (maxRow - row)) / maxDist,
          delayBL: ((maxRow - row) + col) / maxDist,
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
      yearMasksRef.current = projects.map(p => computeYearMask(p.year, colsRef.current, rowsRef.current));
      measureSection();
      t0Ref.current = performance.now();

      /* ── Scroll handler ── */
      const onScroll = () => {
        measureSection();
        const rangeStart = sectionTopRef.current;
        const rangeEnd = sectionTopRef.current + sectionHeightRef.current;
        const totalRange = rangeEnd - rangeStart;
        if (totalRange <= 0) return;
        scrollRef.current = clamp((window.scrollY - rangeStart) / totalRange, 0, 1);
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      /* ── Compute per-cell flip progress for a given phase ── */
      const FLIP_WINDOW = 0.5; // each cell takes 50% of the wave duration to flip
      const GAP_CLOSE_START = 0.15; // start closing gaps at 15% of flip wave

      const cellFlipProgress = (
        globalProgress: number,
        delay: number,
      ): number => {
        const cellStart = delay * (1 - FLIP_WINDOW);
        const cellEnd = cellStart + FLIP_WINDOW;
        const raw = clamp((globalProgress - cellStart) / (cellEnd - cellStart), 0, 1);
        return easeInOutCubic(raw);
      };

      /* ── Animation zones — bounded max playback duration per transition ── */
      const ANIMATION_ZONES = [
        ...flipStartFrac.map((s, k) => ({ start: s, end: flipEndFrac[k], duration: 1.6 })),
        { start: exitStartFrac, end: exitEndFrac, duration: 1.2 },
      ];

      /* ── Render loop ── */
      let prevTime = performance.now();

      const animate = (time: number) => {
        const dt = Math.min((time - prevTime) / 1000, 0.05); // clamp to 50ms max
        prevTime = time;
        const t = (time - t0Ref.current) / 1000;

        const rawScroll = scrollRef.current;
        let disp = displayScrollRef.current;

        if (rawScroll < disp) {
          disp = rawScroll;
        } else if (rawScroll > disp) {
          const zone = ANIMATION_ZONES.find(z => disp >= z.start && disp < z.end);
          if (zone) {
            const rate = (zone.end - zone.start) / zone.duration;
            disp = Math.min(disp + rate * dt, rawScroll);
          } else {
            disp = rawScroll;
          }
        }
        displayScrollRef.current = disp;
        const scroll = disp;

        const cells = cellsRef.current;
        const cols = colsRef.current;
        const W = canvas.width / (window.devicePixelRatio || 1);
        const H = canvas.height / (window.devicePixelRatio || 1);

        const isVisible = scroll > 0.001 && scroll < 0.999;

        const gridHeroOpacity = scroll < 0.02 ? 1 : scroll > exitEndFrac + 0.02 ? 1 : 0;
        window.dispatchEvent(new CustomEvent('videoRevealGridOpacity', { detail: gridHeroOpacity }));

        const anyVideoVisible = scroll > flipStartFrac[0] + 0.15 && scroll < exitEndFrac - 0.04;
        window.dispatchEvent(new CustomEvent('videoRevealUIHidden', { detail: anyVideoVisible ? 1 : 0 }));

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

        // Mockup overlay opacities — symmetric bump within each view window
        const mockupOps = viewStartFrac.map((vs, k) => {
          const ve = viewEndFrac[k];
          return scroll >= vs && scroll <= ve
            ? clamp((scroll - vs) / 0.04, 0, 1) * clamp((ve - scroll) / 0.04, 0, 1)
            : 0;
        });
        setMockupOpacities(mockupOps);

        // Year overlays — visible from mid-flip through the whole viewing phase
        const yearOps = flipStartFrac.map((fs, k) => {
          const nextStart = k < N - 1 ? flipStartFrac[k + 1] : exitStartFrac;
          return scroll >= fs + 0.08 && scroll < nextStart
            ? clamp((scroll - fs - 0.08) / 0.04, 0, 1) * clamp((nextStart - scroll) / 0.04, 0, 1)
            : 0;
        });
        setYearOpacities(yearOps);

        // Flip ratio per transition (0→1 across its own range, 1 once passed)
        const flipRatio = flipStartFrac.map((fs, k) => {
          const fe = flipEndFrac[k];
          return scroll >= fs && scroll <= fe
            ? clamp((scroll - fs) / (fe - fs), 0, 1)
            : scroll > fe ? 1 : 0;
        });
        const exitRatio = scroll >= exitStartFrac
          ? clamp((scroll - exitStartFrac) / (exitEndFrac - exitStartFrac), 0, 1)
          : 0;

        // Dissolve per project — HD media fades in as its own flip completes
        const dissolve = flipRatio.map(r => clamp((r - DISSOLVE_START) / (DISSOLVE_END - DISSOLVE_START), 0, 1));

        // Canvas opacity — opaque during the pixel-flip effect, fades to reveal HD media
        let cOpacity = 1;
        for (let k = 0; k < N; k++) {
          const nextRatio = k < N - 1 ? flipRatio[k + 1] : exitRatio;
          if (dissolve[k] > 0 && nextRatio === 0 && exitRatio === 0) {
            cOpacity = 1 - dissolve[k];
          }
        }
        if (exitRatio > 0) {
          cOpacity = exitRatio > 0.1 ? 1 : exitRatio / 0.1;
        }
        for (let k = 1; k < N; k++) {
          if (scroll >= flipStartFrac[k] - 0.02 && scroll <= flipStartFrac[k] + 0.04) {
            cOpacity = 1;
          }
        }
        setCanvasOpacity(cOpacity);

        // HD media opacity per project
        const hdOps = dissolve.map((d, k) => {
          if (k < N - 1) {
            const nextRatio = flipRatio[k + 1];
            return nextRatio === 0 ? d : 1 - clamp(nextRatio / 0.1, 0, 1);
          }
          return d > 0 ? d : (exitRatio > 0 ? 1 - exitRatio : 0);
        });
        setHdOpacities(hdOps);

        // Play/pause videos (images need no playback)
        for (let k = 0; k < N; k++) {
          const v = videoRefs.current[k];
          if (!v) continue;
          const start = flipStartFrac[k] - 0.02;
          const end = k < N - 1 ? flipEndFrac[k + 1] : exitEndFrac;
          if (scroll >= start && scroll <= end) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }

        // ── Determine flip states (highest-index active transition wins) ──
        const gapCloseRaw = exitRatio > 0
          ? 1 - easeInOutCubic(clamp(exitRatio / 0.35, 0, 1))
          : flipRatio[0] >= 1
            ? 1
            : flipRatio[0] > GAP_CLOSE_START
              ? easeInOutCubic(clamp((flipRatio[0] - GAP_CLOSE_START) / (1 - GAP_CLOSE_START), 0, 1))
              : 0;

        // ── Clear canvas ──
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, W, H);

        // ── Build clip paths for HD media + draw white cells ──
        const paths: Path2D[] = Array.from({ length: N }, () => new Path2D());
        const hasClip = new Array(N).fill(false);

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const cellIdx = cell.row * cols + cell.col;

          let inYearMask = false;
          for (let k = N - 1; k >= 0; k--) {
            const activeThis = flipRatio[k] > 0 && (k === N - 1 ? exitRatio === 0 : flipRatio[k + 1] === 0);
            if (activeThis && yearMasksRef.current[k]?.has(cellIdx)) { inYearMask = true; break; }
          }

          let mediaNum = 0; // 0 = white, 1..N = project index+1
          let scaleX = 1;

          if (inYearMask) {
            // Force white — skip all flip logic
          } else if (exitRatio > 0) {
            const p = cellFlipProgress(exitRatio, cell.delayBL);
            if (p > 0 && p < 1) {
              const angle = p * Math.PI;
              scaleX = Math.abs(Math.cos(angle));
              mediaNum = p < 0.5 ? N : 0;
            } else if (p >= 1) {
              mediaNum = 0;
            } else {
              mediaNum = N;
            }
          } else {
            for (let k = N - 1; k >= 0; k--) {
              if (flipRatio[k] > 0) {
                const corner = k === 0 ? 'TR' : FLIP_CORNER_CYCLE[(k - 1) % FLIP_CORNER_CYCLE.length];
                const p = cellFlipProgress(flipRatio[k], getDelay(cell, corner));
                if (p > 0 && p < 1) {
                  const angle = p * Math.PI;
                  scaleX = Math.abs(Math.cos(angle));
                  mediaNum = p >= 0.5 ? k + 1 : k;
                } else if (p >= 1) {
                  mediaNum = k + 1;
                } else {
                  mediaNum = k;
                }
                break;
              }
            }
          }

          if (mediaNum > 0) {
            const expand = GAP * gapCloseRaw;
            const fullW = CELL_SIZE + expand;
            const fullH = CELL_SIZE + expand;
            const vidW = fullW * Math.max(scaleX, 0.02);
            const vidX = cell.x - expand / 2 + (fullW - vidW) / 2;
            const vidY = cell.y - expand / 2;

            const idx = mediaNum - 1;
            paths[idx].rect(vidX, vidY, vidW, fullH);
            hasClip[idx] = true;
          } else {
            const bt = t * cell.breathSpeed + cell.breathPhase;
            const op = BG_OP + Math.sin(bt) * 0.01;
            if (op <= 0.001) continue;

            const sz = CELL_SIZE * Math.max(scaleX, 0.02);
            const bx = cell.x + (CELL_SIZE - sz) / 2;
            ctx.fillStyle = `${GRID_COL}${Math.min(1, op).toFixed(3)})`;
            ctx.fillRect(bx, cell.y, sz, CELL_SIZE);
          }
        }

        // ── Draw HD media through clip paths ──
        for (let k = 0; k < N; k++) {
          if (!hasClip[k]) continue;
          const v = videoRefs.current[k];
          const ready = v && (v.readyState >= 2);
          if (!v || !ready) continue;
          ctx.save();
          ctx.clip(paths[k]);
          drawMediaObjectCover(ctx, v, W, H);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        yearMasksRef.current = projects.map(p => computeYearMask(p.year, colsRef.current, rowsRef.current));
        measureSection();
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initGrid, measureSection]);

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ height: `${totalVh}vh` }}>
      {/* Snap checkpoints — at the peak of each project's viewing window */}
      {viewStartFrac.map((vs, k) => (
        <div key={k} data-snap-section className="absolute" style={{ top: `${((vs + viewEndFrac[k]) / 2) * 100}%` }} />
      ))}

      {/* HD media layers — positioned behind canvas, revealed on dissolve */}
      {projects.map((project, k) => (
        <div
          key={k}
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -2, opacity: hdOpacities[k] ?? 0 }}
        >
          {project.videoSrc || project.webmSrc ? (
            <video
              ref={el => { videoRefs.current[k] = el; }}
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            >
              {project.webmSrc && <source src={project.webmSrc} type="video/webm" />}
              {project.videoSrc && <source src={project.videoSrc} type="video/mp4" />}
            </video>
          ) : project.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={el => { videoRefs.current[k] = el as unknown as HTMLVideoElement; }}
              src={project.imageSrc}
              alt=""
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      ))}

      {/* Fixed canvas — fades out to reveal HD media */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1, opacity: 0 }}
      >
        <canvas ref={canvasRef} className="block" style={{ opacity: canvasOpacity }} />
      </div>

      {/* Mockup overlays */}
      {projects.map((project, k) => (
        <div key={k} className="sticky top-0 h-screen pointer-events-none" style={{ zIndex: 10 }}>
          <div
            className="absolute inset-0 flex flex-col transition-opacity duration-300"
            style={{ opacity: mockupOpacities[k] ?? 0 }}
          >
            <MockupOverlay mockup={project.mockup} href={project.projectHref} />
          </div>
        </div>
      ))}

      {/* Year overlays — DOM-based, persist through entire viewing phase */}
      {projects.map((project, k) => (
        <div
          key={k}
          className="fixed bottom-[6%] right-[4%] pointer-events-none font-mono text-white/90 tracking-[0.25em]"
          style={{
            zIndex: 11,
            fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
            opacity: yearOpacities[k] ?? 0,
            transition: 'opacity 0.3s ease',
            mixBlendMode: 'difference',
          }}
        >
          {project.year}
        </div>
      ))}
    </section>
  );
};

/* ── Mockup Overlay (reused from VideoRevealSection) ── */
function MockupOverlay({ mockup, href }: { mockup: ProjectMockup; href: string }) {
  const { t } = useLanguage();
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
          {t('home.scroll')}
        </span>
        <div className="w-[1px] h-6 bg-white/20 mt-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 animate-scroll-line" />
        </div>
      </div>
    </>
  );
}

export default PixelFlipReveal;
