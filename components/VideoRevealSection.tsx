'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import type { ProjectMockup } from '@/app/data/projects';

interface VideoRevealSectionProps {
  videoSrc: string;
  webmSrc: string;
  mockup: ProjectMockup;
  projectColor: string;
  projectHref: string;
}

const VideoRevealSection = ({
  videoSrc,
  webmSrc,
  mockup,
  projectHref,
}: VideoRevealSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Phase 1: Video fades in behind grid
  const videoOpacity = useTransform(scrollYProgress, [0.18, 0.32, 0.68, 0.82], [0, 1, 1, 0]);
  // Phase 2: Grid dissolves → Phase 4: Grid returns
  const gridOpacity = useTransform(scrollYProgress, [0.28, 0.42, 0.62, 0.80], [1, 0, 0, 1]);
  // Phase 3: Mockup appears during full video
  const mockupOpacity = useTransform(scrollYProgress, [0.36, 0.46, 0.62, 0.70], [0, 1, 1, 0]);
  // UI hide/show
  const uiHidden = useTransform(scrollYProgress, [0.30, 0.42, 0.65, 0.80], [0, 1, 1, 0]);

  // Dispatch grid opacity to PixelGridHero
  useMotionValueEvent(gridOpacity, 'change', (latest) => {
    window.dispatchEvent(new CustomEvent('videoRevealGridOpacity', { detail: latest }));
  });

  // Dispatch UI hidden to Header
  useMotionValueEvent(uiHidden, 'change', (latest) => {
    window.dispatchEvent(new CustomEvent('videoRevealUIHidden', { detail: latest }));
  });

  // Toggle grain suppression
  useEffect(() => {
    const handler = () => {
      const v = videoOpacity.get();
      if (v > 0.05) {
        document.body.classList.add('video-reveal-active');
      } else {
        document.body.classList.remove('video-reveal-active');
      }
    };
    const unsub = videoOpacity.on('change', handler);
    return () => {
      unsub();
      document.body.classList.remove('video-reveal-active');
    };
  }, [videoOpacity]);

  // Play/pause video based on visibility
  useMotionValueEvent(videoOpacity, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  });

  return (
    <section ref={sectionRef} id="work" className="relative" style={{ height: '250vh' }}>
      {/* Magnetic checkpoint at full video position */}
      <div data-snap-section className="absolute" style={{ top: '52%' }} />

      {/* Fixed video layer — behind pixel grid */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -2 }}
      >
        <motion.div style={{ opacity: videoOpacity }} className="w-full h-full">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={webmSrc} type="video/webm" />
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Sticky content for mockup overlay */}
      <div className="sticky top-0 h-screen pointer-events-none">
        <motion.div
          style={{ opacity: mockupOpacity }}
          className="absolute inset-0 flex flex-col"
        >
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
                href={projectHref}
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
        </motion.div>
      </div>
    </section>
  );
};

export default VideoRevealSection;
