'use client';

import { useEffect, useRef, useState } from 'react';

interface Pixel {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  headerX: number;
  headerY: number;
  appearTime: number;
  migrationDelay: number; // Each pixel starts migration at different time
}

export default function PixelMigrationIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Check if animation was already shown
    if (typeof window !== 'undefined') {
      const hasSeenIntro = sessionStorage.getItem('sqwr-intro-seen');
      if (hasSeenIntro) {
        setIsAnimating(false);
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/Logo SQWR/sqwr-logo.png';

    img.onload = () => {
      // Create temporary canvas to read pixels
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Scale for performance
      const scale = 2;

      // Center logo size (large)
      const centerLogoWidth = 400;
      const centerLogoHeight = (img.height / img.width) * centerLogoWidth;

      // Header logo size (small) - h-8 = 32px
      const headerLogoHeight = 32;
      const headerLogoWidth = (img.width / img.height) * headerLogoHeight;

      tempCanvas.width = centerLogoWidth / scale;
      tempCanvas.height = centerLogoHeight / scale;

      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels: Pixel[] = [];

      // Header position - EXACT match with Header.tsx
      // Structure: <header px-6 lg:px-16><nav max-w-6xl mx-auto>
      // lg breakpoint = 1024px (not 768px!)
      const padding = width < 1024 ? 24 : 64; // px-6 = 24px, lg:px-16 = 64px
      const maxNavWidth = 1152; // max-w-6xl = 1152px (6 * 16 * 12)
      const availableWidth = width - 2 * padding;
      const navWidth = Math.min(availableWidth, maxNavWidth);
      const navOffsetX = padding + (availableWidth - navWidth) / 2;

      const headerPaddingX = navOffsetX; // Exact position of logo in header
      const headerPaddingY = 12; // py-3

      // Extract black pixels
      for (let y = 0; y < tempCanvas.height; y++) {
        for (let x = 0; x < tempCanvas.width; x++) {
          const index = (y * tempCanvas.width + x) * 4;
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const a = imageData.data[index + 3];

          // If pixel is dark (black logo pixels)
          if (r < 128 && g < 128 && b < 128 && a > 128) {
            // Center position (large logo)
            const centerX = (width - centerLogoWidth) / 2 + x * scale;
            const centerY = (height - centerLogoHeight) / 2 + y * scale;

            // Header position (small logo) - scale down
            const scaleRatio = headerLogoHeight / centerLogoHeight;
            const headerX = headerPaddingX + x * scale * scaleRatio;
            const headerY = headerPaddingY + y * scale * scaleRatio;

            // Random appear time
            const appearTime = Math.random();

            // Random migration delay for staggered effect
            const migrationDelay = Math.random();

            pixels.push({
              x: centerX,
              y: centerY,
              centerX,
              centerY,
              headerX,
              headerY,
              appearTime,
              migrationDelay,
            });
          }
        }
      }

      // Sort pixels by appear time for smooth reveal
      pixels.sort((a, b) => a.appearTime - b.appearTime);

      console.log(`Animating ${pixels.length} pixels`);

      // Animation timeline - FASTER
      const startTime = Date.now();
      const revealDuration = 800; // 0.8s reveal (faster!)
      const holdDuration = 300; // 0.3s hold at center
      const migrationDuration = 1400; // 1.4s migration (longer for better stagger)
      const fadeDuration = 200; // 0.2s fade
      const totalDuration = revealDuration + holdDuration + migrationDuration + fadeDuration;

      const pixelSize = scale;

      function easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
      }

      function animate() {
        if (!ctx || !canvas) return;

        const elapsed = Date.now() - startTime;

        // Clear canvas
        ctx.fillStyle = '#ffffff'; // White background for light mode
        ctx.fillRect(0, 0, width, height);

        if (elapsed < revealDuration) {
          // Phase 1: Progressive reveal at center
          const revealProgress = elapsed / revealDuration;
          const visibleCount = Math.floor(pixels.length * revealProgress);

          ctx.fillStyle = '#000000';
          for (let i = 0; i < visibleCount; i++) {
            const pixel = pixels[i];
            ctx.fillRect(pixel.centerX, pixel.centerY, pixelSize, pixelSize);
          }
        } else if (elapsed < revealDuration + holdDuration) {
          // Phase 2: Hold at center - full logo visible
          ctx.fillStyle = '#000000';
          pixels.forEach((pixel) => {
            ctx.fillRect(pixel.centerX, pixel.centerY, pixelSize, pixelSize);
          });
        } else if (elapsed < revealDuration + holdDuration + migrationDuration) {
          // Phase 3: STAGGERED MIGRATION - pixels escape one by one
          const migrationElapsed = elapsed - revealDuration - holdDuration;

          ctx.fillStyle = '#000000';
          pixels.forEach((pixel) => {
            // WIDE STAGGER: Each pixel starts at very different times
            // migrationDelay 0 = starts immediately
            // migrationDelay 1 = starts at 70% of migration duration
            const pixelStartTime = pixel.migrationDelay * migrationDuration * 0.7;
            const pixelDuration = migrationDuration * 0.6; // Fast individual travel

            // Calculate individual pixel progress
            let pixelProgress = (migrationElapsed - pixelStartTime) / pixelDuration;
            pixelProgress = Math.max(0, Math.min(1, pixelProgress)); // Clamp 0-1

            if (pixelProgress > 0) {
              // Pixel has started moving
              const easedProgress = easeOutCubic(pixelProgress);

              // Interpolate position
              const x = pixel.centerX + (pixel.headerX - pixel.centerX) * easedProgress;
              const y = pixel.centerY + (pixel.headerY - pixel.centerY) * easedProgress;

              // Scale down pixel size during migration
              const currentPixelSize = pixelSize * (1 - easedProgress * 0.5);

              ctx.fillRect(x, y, currentPixelSize, currentPixelSize);
            } else {
              // Pixel still at center (hasn't started yet)
              ctx.fillRect(pixel.centerX, pixel.centerY, pixelSize, pixelSize);
            }
          });
        } else if (elapsed < totalDuration) {
          // Phase 4: Fade out at header position
          const fadeProgress = (elapsed - revealDuration - holdDuration - migrationDuration) / fadeDuration;
          const opacity = 1 - fadeProgress;

          ctx.fillStyle = '#000000';
          ctx.globalAlpha = opacity;
          pixels.forEach((pixel) => {
            const currentPixelSize = pixelSize * 0.5;
            ctx.fillRect(pixel.headerX, pixel.headerY, currentPixelSize, currentPixelSize);
          });
          ctx.globalAlpha = 1;
        } else {
          // Animation complete
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('sqwr-intro-seen', 'true');
          }
          setIsAnimating(false);
          return;
        }

        requestAnimationFrame(animate);
      }

      animate();
    };

    img.onerror = () => {
      console.error('Failed to load logo image');
      setIsAnimating(false);
    };
  }, []);

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sqwr-intro-seen', 'true');
    }
    setIsAnimating(false);
  };

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background">
      <canvas ref={canvasRef} className="w-full h-full" onClick={handleSkip} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-sm font-mono">
        Cliquez pour passer
      </div>
    </div>
  );
}
