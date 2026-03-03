import type { Metadata } from 'next';
import { articles } from './data/articles';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Branding, Web & Stratégie créative',
  description:
    'Articles sur le branding, le design, le développement web et la stratégie créative par SQWR Studio, agence créative bruxelloise.',
  alternates: {
    canonical: 'https://sqwr.be/blog',
  },
  openGraph: {
    title: 'Blog SQWR Studio — Branding, Web & Stratégie',
    description:
      'Articles sur le branding, le design et la stratégie créative par SQWR Studio, studio familial bruxellois.',
    url: 'https://sqwr.be/blog',
    type: 'website',
  },
};

const blogListSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog SQWR Studio',
  description: 'Articles sur le branding, le design, le développement web et la stratégie créative.',
  url: 'https://sqwr.be/blog',
  publisher: {
    '@type': 'Organization',
    name: 'SQWR Studio',
    '@id': 'https://sqwr.be/#organization',
  },
  blogPost: articles.map((article) => ({
    '@type': 'BlogPosting',
    headline: article.title,
    url: `https://sqwr.be/blog/${article.slug}`,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8">
            Blog
          </p>
          <h1 className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground max-w-4xl">
            Articles & ressources
          </h1>
          <p className="mt-8 text-lg text-secondary/50 font-light max-w-lg">
            Branding, design, web et stratégie créative — par SQWR Studio.
          </p>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      <section className="px-6 lg:px-16 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <p className="text-secondary/40 font-mono text-sm uppercase tracking-[0.2em]">
              Prochains articles bientôt disponibles.
            </p>
          ) : (
            <div className="border-t border-secondary/10">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block border-b border-secondary/10 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 hover:bg-secondary/[0.02] transition-colors duration-300 -mx-6 lg:-mx-0 px-6 lg:px-0"
                >
                  <div className="lg:col-span-2">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-primary">
                      {article.categoryLabel}
                    </span>
                  </div>
                  <div className="lg:col-span-7">
                    <h2 className="font-display font-normal text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
                      {article.title}
                    </h2>
                    <p className="text-secondary/55 font-light leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="lg:col-span-3 lg:text-right flex lg:flex-col items-start lg:items-end gap-4 lg:gap-3">
                    <span className="text-xs font-mono text-secondary/50">
                      {new Date(article.publishedAt).toLocaleDateString('fr-BE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-xs font-mono text-secondary/40">
                      {article.readingTime} min de lecture
                    </span>
                    <span className="text-primary text-lg group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
