import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SQWR Studio — Agence créative Bruxelles';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px 96px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: wordmark */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 300,
            letterSpacing: '0.35em',
            color: '#111111',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          SQWR STUDIO
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 300,
              color: '#111111',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            Design.
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 300,
              color: '#E01919',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            Code.
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 300,
              color: '#111111',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            Impact.
          </div>
        </div>

        {/* Bottom: tagline + location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: '#666666',
              letterSpacing: '0.05em',
            }}
          >
            Branding · Web · Social Media
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#999999',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            Bruxelles, Belgique
          </div>
        </div>

        {/* Red accent line */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 8,
            height: '100%',
            background: '#E01919',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
