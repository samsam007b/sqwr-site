'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface GridCell {
  x: number;
  y: number;
  col: number;
  row: number;
  isLetter: boolean;
  emergeDelay: number;
  breathPhase: number;
  breathSpeed: number;
  scatterAngle: number;
  scatterDist: number;
}

interface Traveler {
  path: [number, number][];
  startTime: number;
  speed: number;
}

const CELL_SIZE = 10;
const GAP = 2;
const STEP = CELL_SIZE + GAP;
const TRAIL_LENGTH = 3;
const SCATTER_RADIUS = 1200;
const BG_OP = 0.04;

// Animation timeline (seconds)
const T_EMERGE = 0.2;
const T_EMERGE_WAVE = 1.6;
const T_TRAVEL = 2.2;
const T_CONVERGE = 5.2;
const T_BREATHE = 5.6;

const PixelGridHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridCell[]>([]);
  const travelersRef = useRef<Traveler[]>([]);
  const colsRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const displayScrollRef = useRef(0);
  const scrollAccelRef = useRef(0);
  const introCompleteRef = useRef(false);
  const t0Ref = useRef(0);
  const rafRef = useRef<number>(0);
  const skipIntroRef = useRef(false);
  const isReadyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const loadLogo = useCallback((): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      fetch('/Logo SQWR/sqwr-logo.svg')
        .then(r => r.text())
        .then(svg => {
          let s = svg.replace(/currentColor/g, '#000000');
          s = s.replace('<svg', '<svg style="fill:#000000"');
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
        })
        .catch(reject);
    });
  }, []);

  const sampleLogo = useCallback((
    img: HTMLImageElement, w: number, h: number,
  ): Set<string> => {
    const S = 2;
    const rw = Math.ceil(w * S), rh = Math.ceil(h * S);
    const off = document.createElement('canvas');
    off.width = rw; off.height = rh;
    const c = off.getContext('2d');
    if (!c) return new Set();
    const tw = w * 0.6;
    const aspect = img.naturalWidth / img.naturalHeight;
    const lw = tw, lh = lw / aspect;
    const lx = (w - lw) / 2, ly = (h - lh) / 2 - lh * 0.05;
    c.drawImage(img, lx * S, ly * S, lw * S, lh * S);
    const id = c.getImageData(0, 0, rw, rh);
    const result = new Set<string>();
    const cols = Math.ceil(w / STEP), rows = Math.ceil(h / STEP);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x0 = Math.floor(col * STEP * S), y0 = Math.floor(row * STEP * S);
        const x1 = Math.min(Math.floor((col * STEP + CELL_SIZE) * S), rw);
        const y1 = Math.min(Math.floor((row * STEP + CELL_SIZE) * S), rh);
        let hit = 0, total = 0;
        for (let py = y0; py < y1; py++) {
          for (let px = x0; px < x1; px++) {
            total++;
            if (id.data[(py * rw + px) * 4 + 3] > 30) hit++;
          }
        }
        if (total > 0 && hit / total >= 0.4) result.add(`${col},${row}`);
      }
    }
    return result;
  }, []);

  const makePath = useCallback((
    sc: number, sr: number, ec: number, er: number,
    cols: number, rows: number,
  ): [number, number][] => {
    const path: [number, number][] = [[sc, sr]];
    let c = sc, r = sr;
    const maxSteps = (Math.abs(ec - sc) + Math.abs(er - sr)) * 2 + 20;
    for (let i = 0; i < maxSteps && (c !== ec || r !== er); i++) {
      const dx = ec - c, dy = er - r;
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (ax + ay <= 3) {
        if (ax >= ay && ax > 0) c += Math.sign(dx);
        else if (ay > 0) r += Math.sign(dy);
        else c += Math.sign(dx);
        path.push([c, r]); continue;
      }
      const rnd = Math.random();
      if (rnd < 0.5) {
        if (ax >= ay) c += Math.sign(dx); else r += Math.sign(dy);
      } else if (rnd < 0.8) {
        if (ax < ay && ax > 0) c += Math.sign(dx);
        else if (ay > 0) r += Math.sign(dy);
        else if (ax > 0) c += Math.sign(dx);
        else r += Math.random() > 0.5 ? 1 : -1;
      } else {
        if (ax >= ay) r += Math.random() > 0.5 ? 1 : -1;
        else c += Math.random() > 0.5 ? 1 : -1;
      }
      c = Math.max(0, Math.min(cols - 1, c));
      r = Math.max(0, Math.min(rows - 1, r));
      path.push([c, r]);
    }
    if (c !== ec || r !== er) path.push([ec, er]);
    return path;
  }, []);

  const initGrid = useCallback(async (width: number, height: number) => {
    const img = await loadLogo();
    const cols = Math.ceil(width / STEP);
    const rows = Math.ceil(height / STEP);
    colsRef.current = cols;
    const letters = sampleLogo(img, width, height);
    const grid: GridCell[] = [];
    const travelers: Traveler[] = [];
    const cx = width / 2, cy = height / 2;
    const maxD = Math.sqrt(cx * cx + cy * cy);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * STEP, y = row * STEP;
        const isLetter = letters.has(`${col},${row}`);
        const dx = x + CELL_SIZE / 2 - cx;
        const dy = y + CELL_SIZE / 2 - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
        const sDist = 0.6 + Math.random() * 0.8;

        grid.push({
          x, y, col, row, isLetter,
          emergeDelay: (dist / maxD) * T_EMERGE_WAVE,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.3 + Math.random() * 0.4,
          scatterAngle: angle,
          scatterDist: sDist,
        });

        if (isLetter) {
          const edge = Math.floor(Math.random() * 4);
          let sc: number, sr: number;
          if (edge === 0) { sc = Math.floor(Math.random() * cols); sr = 0; }
          else if (edge === 1) { sc = cols - 1; sr = Math.floor(Math.random() * rows); }
          else if (edge === 2) { sc = Math.floor(Math.random() * cols); sr = rows - 1; }
          else { sc = 0; sr = Math.floor(Math.random() * rows); }
          const path = makePath(sc, sr, col, row, cols, rows);
          const speed = 40 + Math.random() * 35;
          const dur = path.length / speed;
          const win = T_CONVERGE - T_TRAVEL;
          const target = win - 0.3 + Math.random() * 0.6;
          const startTime = Math.max(0, target - dur);
          travelers.push({ path, startTime, speed });
        }
      }
    }

    gridRef.current = grid;
    travelersRef.current = travelers;
    t0Ref.current = performance.now();
  }, [loadLogo, sampleLogo, makePath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cleanup: (() => void) | undefined;

    const setup = async () => {
      const dpr = window.devicePixelRatio || 1;
      // Overflow by one STEP so edge cells are never clipped
      const W = window.innerWidth + STEP;
      const H = window.innerHeight + STEP;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      await initGrid(W, H);
      isReadyRef.current = true;
      setIsReady(true);

      // Listen on window since canvas has pointer-events-none
      const onMouse = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
      const onScroll = () => {
        // Scatter completes over 70vh of scroll (slower, more progressive)
        scrollRef.current = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)));
      };

      // During intro, wheel events accelerate the timeline instead of scrolling
      const onWheel = (e: WheelEvent) => {
        if (!introCompleteRef.current && !skipIntroRef.current) {
          // Only accelerate on scroll-down gestures
          if (e.deltaY > 0) {
            scrollAccelRef.current += e.deltaY * 0.003;
          }
        }
      };

      window.addEventListener('mousemove', onMouse);
      document.addEventListener('mouseleave', onLeave);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('wheel', onWheel, { passive: true });

      // If intro was already completed (e.g. navigated back), signal immediately
      if (skipIntroRef.current) {
        introCompleteRef.current = true;
        window.dispatchEvent(new CustomEvent('introComplete'));
      }

      const animate = (time: number) => {
        const baseTime = (time - t0Ref.current) / 1000;
        const t = skipIntroRef.current
          ? T_BREATHE + baseTime
          : baseTime + scrollAccelRef.current;

        // Detect when intro animation reaches the breathe phase
        if (!introCompleteRef.current && !skipIntroRef.current && t >= T_BREATHE) {
          introCompleteRef.current = true;
          window.dispatchEvent(new CustomEvent('introComplete'));
        }

        const grid = gridRef.current;
        const travelers = travelersRef.current;
        // Lerp toward the real scroll target — rend l'explosion fluide même au scroll brusque
        displayScrollRef.current += (scrollRef.current - displayScrollRef.current) * 0.035;
        const scroll = displayScrollRef.current;
        // easeIn — démarre au ralenti, accélère ensuite
        const scatterEased = scroll * scroll * scroll;

        const bg = '#FAFAF8';
        const letterCol = '#111111';
        const gridPre = 'rgba(17,17,17,';
        const accent = '#E01919';

        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        const { x: mx, y: my } = mouseRef.current;
        const breathing = t > T_BREATHE;

        // ── Background grid — ALL cells including letter positions ──
        for (let i = 0; i < grid.length; i++) {
          const cell = grid[i];

          const eElapsed = Math.max(0, t - T_EMERGE - cell.emergeDelay);
          const eProg = Math.min(1, eElapsed / 0.4);
          if (eProg <= 0) continue;
          const eased = easeOutCubic(eProg);

          let op = BG_OP * eased;
          let scale = 0.3 + 0.7 * eased;

          if (breathing) {
            const bt = t - T_BREATHE;
            op = BG_OP + Math.sin(bt * cell.breathSpeed + cell.breathPhase) * 0.01;
            scale = 1;
          }

          let ox = 0, oy = 0, ms = 1, hov = false;
          if (breathing && scroll === 0) {
            const cxc = cell.x + CELL_SIZE / 2, cyc = cell.y + CELL_SIZE / 2;
            const dmx = cxc - mx, dmy = cyc - my;
            const d = Math.sqrt(dmx * dmx + dmy * dmy);
            if (d < 120) {
              const f = ((1 - d / 120) ** 2);
              ox = dmx * f * 0.3; oy = dmy * f * 0.3;
              ms = 1 + f * 0.4;
              hov = d < 30;
            }
          }

          const sz = CELL_SIZE * scale * ms;
          const drawX = cell.x + ox + (CELL_SIZE - sz) / 2;
          const drawY = cell.y + oy + (CELL_SIZE - sz) / 2;
          if (op <= 0.001) continue;

          const finalOp = op * (hov ? 3 : 1);
          ctx.fillStyle = hov ? accent : `${gridPre}${Math.min(1, finalOp).toFixed(3)})`;
          ctx.globalAlpha = hov ? 0.6 : 1;
          ctx.fillRect(drawX, drawY, sz, sz);
          ctx.globalAlpha = 1;
        }

        // ── Letter cells (drawn on top of background) ──
        if (t > T_TRAVEL) {
          const tRel = t - T_TRAVEL;

          for (let i = 0; i < travelers.length; i++) {
            const tr = travelers[i];
            const te = tRel - tr.startTime;
            if (te < 0) continue;

            const pi = Math.min(Math.floor(te * tr.speed), tr.path.length - 1);
            const atDest = pi >= tr.path.length - 1;
            const [fc, fr] = tr.path[tr.path.length - 1];

            if (atDest && breathing) {
              // Letter at destination — scatter on scroll
              const baseX = fc * STEP, baseY = fr * STEP;
              const gi = fr * colsRef.current + fc;
              const gc = grid[gi];
              const bt = t - T_BREATHE;
              const breath = gc ? Math.sin(bt * gc.breathSpeed + gc.breathPhase) * 0.02 : 0;

              let scX = 0, scY = 0;
              let cellOp = 1 + breath;
              if (scroll > 0 && gc) {
                const dist = scatterEased * SCATTER_RADIUS * gc.scatterDist;
                scX = Math.cos(gc.scatterAngle) * dist;
                scY = Math.sin(gc.scatterAngle) * dist;
                cellOp *= (1 - scatterEased);
              }

              let ox = scX, oy = scY, ms = 1, hov = false;
              if (scroll === 0) {
                const ccx = baseX + CELL_SIZE / 2, ccy = baseY + CELL_SIZE / 2;
                const dmx = ccx - mx, dmy = ccy - my;
                const d = Math.sqrt(dmx * dmx + dmy * dmy);
                if (d < 120) {
                  const f = ((1 - d / 120) ** 2);
                  ox += dmx * f * 0.3; oy += dmy * f * 0.3;
                  ms = 1 + f * 0.4;
                  hov = d < 30;
                }
              }

              if (cellOp <= 0.001) continue;

              const sz = CELL_SIZE * ms;
              ctx.fillStyle = hov ? accent : letterCol;
              ctx.globalAlpha = Math.min(1, cellOp * (hov ? 1.2 : 1));
              ctx.fillRect(
                baseX + ox + (CELL_SIZE - sz) / 2,
                baseY + oy + (CELL_SIZE - sz) / 2,
                sz, sz
              );
              ctx.globalAlpha = 1;
            } else if (!atDest) {
              // Traveling: head + trail
              for (let trail = TRAIL_LENGTH; trail >= 0; trail--) {
                const idx = pi - trail;
                if (idx < 0) continue;
                const [c, r] = tr.path[idx];
                const fade = trail === 0 ? 1 : (1 - trail / (TRAIL_LENGTH + 1)) * 0.35;
                ctx.fillStyle = letterCol;
                ctx.globalAlpha = fade;
                ctx.fillRect(c * STEP, r * STEP, CELL_SIZE, CELL_SIZE);
              }
              ctx.globalAlpha = 1;
            } else {
              // At dest but not yet breathing — draw static
              ctx.fillStyle = letterCol;
              ctx.globalAlpha = 1;
              ctx.fillRect(fc * STEP, fr * STEP, CELL_SIZE, CELL_SIZE);
            }
          }
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
      cleanup = () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('mousemove', onMouse);
        document.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('wheel', onWheel);
      };
    };

    setup();
    return () => cleanup?.();
  }, [initGrid]);

  useEffect(() => {
    const handleResize = () => {
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
      skipIntroRef.current = true;
      initGrid(W, H);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initGrid]);

  // External opacity control for video reveal
  useEffect(() => {
    const handler = (e: Event) => {
      const opacity = (e as CustomEvent).detail as number;
      if (containerRef.current) {
        containerRef.current.style.opacity = String(isReadyRef.current ? opacity : 0);
      }
    };
    window.addEventListener('videoRevealGridOpacity', handler);
    return () => window.removeEventListener('videoRevealGridOpacity', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden transition-opacity duration-1000 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default PixelGridHero;
