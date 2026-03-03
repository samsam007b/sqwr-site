import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Red bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#E01919',
          }}
        />
        {/* sqwr. wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: '64px',
            fontWeight: 700,
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#FAFAF8' }}>sqwr</span>
          <span style={{ color: '#E01919' }}>.</span>
        </div>
        {/* Studio label */}
        <div
          style={{
            color: 'rgba(250,250,248,0.25)',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'monospace',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginTop: '10px',
          }}
        >
          STUDIO
        </div>
      </div>
    ),
    { ...size },
  );
}
