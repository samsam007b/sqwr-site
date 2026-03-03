import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/app/blog/data/articles';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? 'Blog — SQWR Studio';
  const category = article?.categoryLabel ?? 'Article';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#111111',
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
        {/* Red top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#E01919',
          }}
        />

        {/* Top: brand + category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            SQWR STUDIO
          </div>
          <div
            style={{
              color: '#E01919',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </div>
        </div>

        {/* Center: article title */}
        <div
          style={{
            fontSize: title.length > 50 ? '52px' : '64px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '16px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            sqwr.be/blog
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.2)',
              fontSize: '14px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Bruxelles · Belgique
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
