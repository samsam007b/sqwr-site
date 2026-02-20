'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface GridCell {
  x: number;
  y: number;
  targetOpacity: number;
  currentOpacity: number;
  isLetter: boolean;
  delay: number;
  baseScale: number;
  currentScale: number;
  breathPhase: number;
  breathSpeed: number;
}

const CELL_SIZE = 24;
const GAP = 2;
const STEP = CELL_SIZE + GAP;

const PixelGridHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<GridCell[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationPhaseRef = useRef<'scatter' | 'forming' | 'breathing'>('scatter');
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  // Sample the SVG logo to find which grid cells should be "on"
  // Uses high-res rendering + multi-point sampling for accurate reproduction
  const sampleLogo = useCallback((
    canvasWidth: number,
    canvasHeight: number,
    cellSize: number,
    step: number,
  ): Promise<Set<string>> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Render at 4x resolution for precise sampling
        const scale = 4;
        const offscreen = document.createElement('canvas');
        offscreen.width = canvasWidth * scale;
        offscreen.height = canvasHeight * scale;
        const ctx = offscreen.getContext('2d');
        if (!ctx) { resolve(new Set()); return; }

        // Calculate logo dimensions to fill ~60% of viewport width
        const targetWidth = canvasWidth * 0.6;
        const logoAspect = img.naturalWidth / img.naturalHeight;
        const logoWidth = targetWidth;
        const logoHeight = logoWidth / logoAspect;

        // Center the logo
        const logoX = (canvasWidth - logoWidth) / 2;
        const logoY = (canvasHeight - logoHeight) / 2 - logoHeight * 0.05;

        // Draw at high resolution
        ctx.drawImage(
          img,
          logoX * scale, logoY * scale,
          logoWidth * scale, logoHeight * scale
        );

        const imgW = offscreen.width;
        const imgH = offscreen.height;
        const imageData = ctx.getImageData(0, 0, imgW, imgH);
        const letterCells = new Set<string>();

        const cols = Math.ceil(canvasWidth / step);
        const rows = Math.ceil(canvasHeight / step);

        // Multi-point sampling: 6x6 grid per cell
        const samplesPerSide = 6;
        const coverageThreshold = 0.2; // 20% coverage = cell is "on"

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            let hits = 0;
            const totalSamples = samplesPerSide * samplesPerSide;

            for (let sy = 0; sy < samplesPerSide; sy++) {
              for (let sx = 0; sx < samplesPerSide; sx++) {
                // Sample points distributed across the cell area
                const px = (col * step + (sx + 0.5) * cellSize / samplesPerSide) * scale;
                const py = (row * step + (sy + 0.5) * cellSize / samplesPerSide) * scale;

                if (px < imgW && py < imgH) {
                  const idx = (Math.floor(py) * imgW + Math.floor(px)) * 4;
                  const alpha = imageData.data[idx + 3];
                  if (alpha > 30) hits++;
                }
              }
            }

            if (hits / totalSamples >= coverageThreshold) {
              letterCells.add(`${col},${row}`);
            }
          }
        }

        resolve(letterCells);
      };

      img.onerror = () => resolve(new Set());

      // Load SVG and ensure all paths render as solid black
      fetch('/Logo SQWR/sqwr-logo.svg')
        .then(r => r.text())
        .then(svgText => {
          // Add explicit fill to paths without one, and replace currentColor
          let colored = svgText.replace(/currentColor/g, '#000000');
          // Inject a default style for paths without explicit fill
          colored = colored.replace(
            '<svg',
            '<svg style="fill:#000000"'
          );
          const blob = new Blob([colored], { type: 'image/svg+xml' });
          img.src = URL.createObjectURL(blob);
        })
        .catch(() => resolve(new Set()));
    });
  }, []);

  const initGrid = useCallback(async (width: number, height: number) => {
    const cols = Math.ceil(width / STEP);
    const rows = Math.ceil(height / STEP);
    const letterCells = await sampleLogo(width, height, CELL_SIZE, STEP);

    const grid: GridCell[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * STEP;
        const y = row * STEP;
        const key = `${col},${row}`;
        const isLetter = letterCells.has(key);

        // Distance from center for staggered animation
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

        grid.push({
          x,
          y,
          targetOpacity: isLetter ? 1 : 0.04,
          currentOpacity: 0,
          isLetter,
          delay: (dist / maxDist) * 1.2 + Math.random() * 0.3,
          baseScale: 1,
          currentScale: isLetter ? 0 : 0.5,
          breathPhase: Math.random() * Math.PI * 2,
          breathSpeed: 0.3 + Math.random() * 0.4,
        });
      }
    }

    gridRef.current = grid;
    animationPhaseRef.current = 'scatter';
    startTimeRef.current = performance.now();
  }, [sampleLogo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setup = async () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      await initGrid(rect.width, rect.height);
      setIsReady(true);

      const handleMouse = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      };

      const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
      };

      canvas.addEventListener('mousemove', handleMouse);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      const animate = (time: number) => {
        const elapsed = (time - startTimeRef.current) / 1000;
        const grid = gridRef.current;
        const isDark = document.documentElement.classList.contains('dark');

        // Colors
        const bgColor = isDark ? '#0A0A0A' : '#FAFAF8';
        const letterColor = isDark ? '#FAFAF8' : '#111111';
        const gridColor = isDark ? 'rgba(255,255,255,' : 'rgba(17,17,17,';
        const accentColor = '#E01919';

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, rect.width, rect.height);

        const { x: mx, y: my } = mouseRef.current;

        for (let i = 0; i < grid.length; i++) {
          const cell = grid[i];

          // Animation progress
          const cellElapsed = Math.max(0, elapsed - cell.delay);

          if (animationPhaseRef.current === 'scatter') {
            // Phase 1: Background grid fades in
            if (!cell.isLetter) {
              const bgProgress = Math.min(1, cellElapsed / 0.6);
              cell.currentOpacity = cell.targetOpacity * easeOutCubic(bgProgress);
              cell.currentScale = 0.5 + 0.5 * easeOutCubic(bgProgress);
            } else {
              cell.currentOpacity = 0;
              cell.currentScale = 0;
            }

            if (elapsed > 2.0) {
              animationPhaseRef.current = 'forming';
              startTimeRef.current = time;
            }
          } else if (animationPhaseRef.current === 'forming') {
            // Phase 2: Logo cells emerge
            if (cell.isLetter) {
              const formProgress = Math.min(1, cellElapsed / 0.8);
              const eased = easeOutQuart(formProgress);
              cell.currentOpacity = eased;
              cell.currentScale = eased;
            } else {
              cell.currentOpacity = cell.targetOpacity;
              cell.currentScale = 1;
            }

            if (elapsed > 2.0) {
              animationPhaseRef.current = 'breathing';
              startTimeRef.current = time;
            }
          } else {
            // Phase 3: Breathing
            const breathTime = elapsed;
            const breath = Math.sin(breathTime * cell.breathSpeed + cell.breathPhase) * 0.02;

            cell.currentOpacity = cell.targetOpacity + (cell.isLetter ? breath : breath * 0.5);
            cell.currentScale = 1;
          }

          // Mouse interaction — magnetic repulsion
          const cellCenterX = cell.x + CELL_SIZE / 2;
          const cellCenterY = cell.y + CELL_SIZE / 2;
          const dmx = cellCenterX - mx;
          const dmy = cellCenterY - my;
          const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
          const mouseRadius = 120;

          let offsetX = 0;
          let offsetY = 0;
          let mouseScale = 1;
          let isHovered = false;

          if (mouseDist < mouseRadius) {
            const force = (1 - mouseDist / mouseRadius);
            const easedForce = force * force;
            offsetX = dmx * easedForce * 0.3;
            offsetY = dmy * easedForce * 0.3;
            mouseScale = 1 + easedForce * 0.4;
            isHovered = mouseDist < CELL_SIZE * 2;
          }

          // Draw cell
          const finalScale = cell.currentScale * mouseScale;
          const size = CELL_SIZE * finalScale;
          const drawX = cell.x + offsetX + (CELL_SIZE - size) / 2;
          const drawY = cell.y + offsetY + (CELL_SIZE - size) / 2;

          if (cell.currentOpacity <= 0.001) continue;

          if (cell.isLetter) {
            if (isHovered) {
              ctx.fillStyle = accentColor;
              ctx.globalAlpha = Math.min(1, cell.currentOpacity * 1.2);
            } else {
              ctx.fillStyle = letterColor;
              ctx.globalAlpha = cell.currentOpacity;
            }
          } else {
            const opacity = cell.currentOpacity * (isHovered ? 3 : 1);
            ctx.fillStyle = isHovered ? accentColor : `${gridColor}${Math.min(1, opacity).toFixed(3)})`;
            ctx.globalAlpha = isHovered ? 0.6 : 1;
          }

          ctx.fillRect(drawX, drawY, size, size);
          ctx.globalAlpha = 1;
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(rafRef.current);
        canvas.removeEventListener('mousemove', handleMouse);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    setup();
  }, [initGrid, theme]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      initGrid(rect.width, rect.height);
      animationPhaseRef.current = 'breathing';
      startTimeRef.current = performance.now() - 5000;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initGrid]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Subtitle — appears after grid forms */}
      <div
        className={`absolute bottom-16 left-0 right-0 text-center transition-all duration-1000 delay-[3000ms] ${
          isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/50">
          Studio cr&eacute;atif &middot; Bruxelles
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[3500ms] ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-[1px] h-8 bg-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-foreground/60 animate-scroll-line" />
        </div>
      </div>
    </div>
  );
};

// Easing functions
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default PixelGridHero;
