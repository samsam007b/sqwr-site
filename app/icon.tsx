import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
          width: '100%',
          height: '100%',
          display: 'flex',
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
            height: '3px',
            background: '#E01919',
          }}
        />
        {/* s. monogram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'monospace',
            lineHeight: 1,
            paddingBottom: '2px',
          }}
        >
          <span style={{ color: '#FAFAF8' }}>s</span>
          <span style={{ color: '#E01919' }}>.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
