import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Red right accent bar */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            background: '#E01919',
          }}
        />

        {/* Top: brand */}
        <div
          style={{
            color: 'rgba(17,17,17,0.4)',
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          SQWR STUDIO
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 300,
              color: '#111',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Démarrer un projet
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 300,
              color: '#E01919',
              lineHeight: 1.2,
            }}
          >
            Branding · Web sur-mesure
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 300,
              color: '#666',
              marginTop: '8px',
            }}
          >
            studio@sqwr.be · +32 493 30 27 52 · Réponse sous 48h
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#999',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          BRUXELLES, BELGIQUE · SQWR.BE
        </div>
      </div>
    ),
    { ...size },
  );
}
