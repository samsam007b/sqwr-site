'use client';

import { useRef, useState } from 'react';

interface WebsiteTourVideoProps {
  src: string;
  posterSrc?: string;
  unmuteLabel: string;
  muteLabel: string;
  className?: string;
}

export default function WebsiteTourVideo({
  src,
  posterSrc,
  unmuteLabel,
  muteLabel,
  className = '',
}: WebsiteTourVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl grain-overlay ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="izzico — visite guidée animée du site web et de l'application"
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? unmuteLabel : muteLabel}
        className="absolute bottom-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors duration-300"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}
