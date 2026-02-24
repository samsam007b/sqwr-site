'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, memo } from 'react';
import type { ProjectMockup } from '@/app/data/projects';

// ── Pixel aesthetic — matches PixelGridHero constants ─────────────────────────
const PIXEL_SIZE = 10;
const GAP = 1;
const STEP = PIXEL_SIZE + GAP;
const MAX_LIFT = 14;      // px translateZ on hover peak
const HOVER_RADIUS = 90;  // px from cursor
const SPRING = 0.12;
const IDLE_AMP = 1.5;     // subtle idle wave amplitude (px)

// ── PixelGrid — image sliced into many pixels with 3-D magnetic hover ─────────
const PixelGrid = memo(({ image }: { image: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const liftRef = useRef<Float32Array | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const [dims, setDims] = useState<{ cols: number; rows: number } | null>(null);

  // Phase 1: measure container after first paint
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setDims({
      cols: Math.max(1, Math.floor(width / STEP)),
      rows: Math.max(1, Math.floor(height / STEP)),
    });
  }, []);

  // Phase 2: RAF animation loop — runs once dims are known
  useEffect(() => {
    if (!dims) return;
    const { cols, rows } = dims;
    liftRef.current = new Float32Array(cols * rows);

    const container = containerRef.current!;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, inside: true };
    };
    const onLeave = () => { mouseRef.current.inside = false; };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    const loop = (time: number) => {
      const t = time / 1000;
      const lift = liftRef.current!;
      const { x: mx, y: my, inside } = mouseRef.current;
      const rect = container.getBoundingClientRect();
      const rx = mx - rect.left;
      const ry = my - rect.top;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const el = pixelRefs.current[i];
          if (!el) continue;

          const cx = c * STEP + PIXEL_SIZE / 2;
          const cy = r * STEP + PIXEL_SIZE / 2;

          // Magnetic attraction (always positive — toward viewer)
          let magnetTarget = 0;
          if (inside) {
            const dx = cx - rx;
            const dy = cy - ry;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < HOVER_RADIUS) {
              magnetTarget = ((1 - d / HOVER_RADIUS) ** 2) * MAX_LIFT;
            }
          }

          // Idle wave — organic ripple, dampened while hovering
          const wave =
            Math.sin(t * 1.1 + c * 0.39 + r * 0.28) *
            Math.cos(t * 0.7 - c * 0.21 + r * 0.35) *
            IDLE_AMP * (inside ? 0.15 : 1.0);

          // Spring lerp toward target
          lift[i] += (magnetTarget + wave - lift[i]) * SPRING;

          const z = lift[i];
          el.style.transform = Math.abs(z) > 0.02 ? `translateZ(${z.toFixed(2)}px)` : '';
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [dims]);

  // Before measurement: invisible placeholder that sets the ref
  if (!dims) {
    return <div ref={containerRef} className="absolute inset-0" />;
  }

  const { cols, rows } = dims;
  const bgW = cols * STEP;
  const bgH = rows * STEP;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${PIXEL_SIZE}px)`,
        gridTemplateRows: `repeat(${rows}, ${PIXEL_SIZE}px)`,
        gap: `${GAP}px`,
        justifyContent: 'center',
        alignContent: 'center',
        perspective: '480px',
        transformStyle: 'preserve-3d',
        background: '#FAFAF8',
      }}
    >
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (
          <div
            key={i}
            ref={el => { pixelRefs.current[i] = el; }}
            style={{
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              backgroundImage: `url(${image})`,
              backgroundSize: `${bgW}px ${bgH}px`,
              backgroundPosition: `-${c * STEP}px -${r * STEP}px`,
              backgroundRepeat: 'no-repeat',
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
});

PixelGrid.displayName = 'PixelGrid';

// ── ProjectCard ───────────────────────────────────────────────────────────────
interface ProjectCardProps {
  title: string;
  client?: string;
  category: string;
  year?: string;
  color: string;
  image?: string;
  video?: string;
  mockup?: ProjectMockup;
  href: string;
  aspectRatio?: string;
  size?: 'small' | 'medium' | 'large';
}

const ProjectCard = ({
  title,
  client,
  category,
  year,
  color,
  image,
  video,
  mockup,
  href,
  aspectRatio = '4/5',
  size = 'medium',
}: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const titleSize = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl lg:text-4xl',
  }[size];

  return (
    <Link href={href} className="group block" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        {/* Media container */}
        <div className="relative overflow-visible" style={{ aspectRatio }}>

          {video ? (
            /* ── Video + landing-page mockup overlay (unchanged) ── */
            <motion.div
              className="absolute inset-0 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src={video.replace('.mp4', '.webm')} type="video/webm" />
                <source src={video} type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

              {mockup && (
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center justify-between px-[5%] py-[3%]">
                    <div className="hidden sm:flex items-center gap-[1.2em]">
                      {mockup.navLeft.map((item) => (
                        <span key={item} className="text-white/70 font-light" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.65rem)', letterSpacing: '0.08em' }}>{item}</span>
                      ))}
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-white font-light tracking-wide" style={{ fontSize: 'clamp(0.45rem, 1vw, 0.75rem)', fontFamily: 'serif', letterSpacing: '0.1em' }}>{mockup.brandName}</span>
                      <span className="text-white/40" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.5rem)', fontFamily: 'serif', fontStyle: 'italic' }}>{mockup.brandSub}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-[1.2em]">
                      {mockup.navRight.map((item) => (
                        <span key={item} className="text-white/70 font-light" style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.65rem)', letterSpacing: '0.08em' }}>{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center text-center px-[8%]">
                    <span className="text-white/50 uppercase font-light mb-[2%]" style={{ fontSize: 'clamp(0.3rem, 0.55vw, 0.45rem)', letterSpacing: '0.3em' }}>{mockup.eyebrow}</span>
                    <h3 className="text-white font-light leading-[0.95] mb-[2%] whitespace-pre-line" style={{ fontSize: 'clamp(0.9rem, 2.8vw, 2.8rem)', fontFamily: 'serif', letterSpacing: '-0.01em' }}>{mockup.heroTitle}</h3>
                    <div className="w-[3em] h-[1px] bg-white/30 mb-[2%]" />
                    <p className="text-white/70 font-light italic" style={{ fontSize: 'clamp(0.35rem, 0.75vw, 0.65rem)', fontFamily: 'serif', letterSpacing: '0.04em' }}>{mockup.heroSub}</p>
                    <div className="mt-[3%] flex gap-[0.8em]">
                      <span className="border border-white/60 text-white px-[1.2em] py-[0.4em] font-light" style={{ fontSize: 'clamp(0.3rem, 0.6vw, 0.5rem)', letterSpacing: '0.12em' }}>{mockup.cta}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center pb-[3%]">
                    <span className="text-white/30 uppercase" style={{ fontSize: 'clamp(0.25rem, 0.4vw, 0.35rem)', letterSpacing: '0.25em' }}>Défiler</span>
                    <div className="w-[1px] h-[1.5em] bg-white/20 mt-1 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-white/50 animate-scroll-line" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

          ) : image ? (
            /* ── Pixel grid with magnetic hover ── */
            <PixelGrid image={image} />

          ) : (
            /* ── Fallback gradient ── */
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
            />
          )}

          {/* Year badge */}
          {year && (
            <motion.div
              className="absolute top-4 right-4 glass-surface px-3 py-1 rounded z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              <span className="text-xs font-mono text-foreground">{year}</span>
            </motion.div>
          )}
        </div>

        {/* Project info */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">
              {category}
            </span>
            {client && (
              <span className="text-xs font-mono text-secondary/40">{client}</span>
            )}
          </div>
          <h3 className={`${titleSize} font-display font-normal text-foreground group-hover:text-primary transition-colors duration-400`}>
            {title}
          </h3>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
