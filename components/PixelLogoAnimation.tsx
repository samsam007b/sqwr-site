'use client';

import { useEffect, useRef, useState } from 'react';

interface Pixel {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
}

interface PixelLogoAnimationProps {
  onComplete?: () => void;
}

export default function PixelLogoAnimation({ onComplete }: PixelLogoAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
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
    img.src = '/sqwr-logo.png';

    img.onload = () => {
      // Create temporary canvas to read pixels
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Scale down for performance (sample every 2-3 pixels)
      const scale = 2;
      const logoWidth = 400;
      const logoHeight = (img.height / img.width) * logoWidth;

      tempCanvas.width = logoWidth / scale;
      tempCanvas.height = logoHeight / scale;

      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels: Pixel[] = [];

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
            // Target position (center of screen)
            const targetX = (width - logoWidth) / 2 + x * scale;
            const targetY = (height - logoHeight) / 2 + y * scale;

            // Random start position
            const currentX = Math.random() * width;
            const currentY = Math.random() * height;

            pixels.push({
              x,
              y,
              targetX,
              targetY,
              currentX,
              currentY,
            });
          }
        }
      }

      console.log(`Found ${pixels.length} pixels to animate`);

      // Animation parameters
      let startTime = Date.now();
      const chaosDuration = 500; // 0.5s chaos
      const formDuration = 1200; // 1.2s formation
      const holdDuration = 400; // 0.4s hold
      const fadeDuration = 300; // 0.3s fade
      const totalDuration = chaosDuration + formDuration + holdDuration + fadeDuration;

      const pixelSize = scale;

      function easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
      }

      function animate() {
        if (!ctx || !canvas) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        if (elapsed < chaosDuration) {
          // Phase 1: Chaos - pixels appear randomly
          const chaosProgress = elapsed / chaosDuration;
          const visiblePixels = Math.floor(pixels.length * chaosProgress);

          ctx.fillStyle = '#FFFFFF';
          for (let i = 0; i < visiblePixels; i++) {
            const pixel = pixels[i];
            ctx.fillRect(pixel.currentX, pixel.currentY, pixelSize, pixelSize);
          }
        } else if (elapsed < chaosDuration + formDuration) {
          // Phase 2: Formation - pixels move to target
          const formProgress = (elapsed - chaosDuration) / formDuration;
          const easedProgress = easeOutCubic(formProgress);

          ctx.fillStyle = '#FFFFFF';
          pixels.forEach((pixel) => {
            const x = pixel.currentX + (pixel.targetX - pixel.currentX) * easedProgress;
            const y = pixel.currentY + (pixel.targetY - pixel.currentY) * easedProgress;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          });
        } else if (elapsed < chaosDuration + formDuration + holdDuration) {
          // Phase 3: Hold - logo complete
          ctx.fillStyle = '#FFFFFF';
          pixels.forEach((pixel) => {
            ctx.fillRect(pixel.targetX, pixel.targetY, pixelSize, pixelSize);
          });
        } else if (elapsed < totalDuration) {
          // Phase 4: Fade out
          const fadeProgress = (elapsed - chaosDuration - formDuration - holdDuration) / fadeDuration;
          const opacity = 1 - fadeProgress;

          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = opacity;
          pixels.forEach((pixel) => {
            ctx.fillRect(pixel.targetX, pixel.targetY, pixelSize, pixelSize);
          });
          ctx.globalAlpha = 1;
        } else {
          // Animation complete
          setIsAnimating(false);
          if (onComplete) {
            onComplete();
          }
          return;
        }

        requestAnimationFrame(animate);
      }

      animate();
    };

    img.onerror = () => {
      console.error('Failed to load logo image');
    };
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={() => {
          setIsAnimating(false);
          if (onComplete) onComplete();
        }}
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono">
        Cliquez pour passer
      </div>
    </div>
  );
}
