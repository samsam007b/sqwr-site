'use client';

import { useEffect, useRef, useState } from 'react';

interface Pixel {
  x: number;
  y: number;
  appearTime: number;
}

interface PixelRevealAnimationProps {
  onComplete?: () => void;
}

export default function PixelRevealAnimation({ onComplete }: PixelRevealAnimationProps) {
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

      // Scale down for performance
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
            // Position (center of screen)
            const posX = (width - logoWidth) / 2 + x * scale;
            const posY = (height - logoHeight) / 2 + y * scale;

            // Random appear time for each pixel
            const appearTime = Math.random();

            pixels.push({
              x: posX,
              y: posY,
              appearTime,
            });
          }
        }
      }

      // Sort pixels by appear time for smooth reveal
      pixels.sort((a, b) => a.appearTime - b.appearTime);

      console.log(`Found ${pixels.length} pixels to reveal`);

      // Animation parameters
      const startTime = Date.now();
      const revealDuration = 1500; // 1.5s reveal
      const holdDuration = 400; // 0.4s hold
      const fadeDuration = 300; // 0.3s fade
      const totalDuration = revealDuration + holdDuration + fadeDuration;

      const pixelSize = scale;

      function animate() {
        if (!ctx || !canvas) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        // Clear canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        if (elapsed < revealDuration) {
          // Phase 1: Progressive reveal
          const revealProgress = elapsed / revealDuration;
          const visibleCount = Math.floor(pixels.length * revealProgress);

          ctx.fillStyle = '#FFFFFF';
          for (let i = 0; i < visibleCount; i++) {
            const pixel = pixels[i];
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
          }
        } else if (elapsed < revealDuration + holdDuration) {
          // Phase 2: Hold - logo complete
          ctx.fillStyle = '#FFFFFF';
          pixels.forEach((pixel) => {
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
          });
        } else if (elapsed < totalDuration) {
          // Phase 3: Fade out
          const fadeProgress = (elapsed - revealDuration - holdDuration) / fadeDuration;
          const opacity = 1 - fadeProgress;

          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = opacity;
          pixels.forEach((pixel) => {
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
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
