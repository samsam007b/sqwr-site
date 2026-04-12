import type { Metadata } from 'next';
import { articles } from './data/articles';
import BlogListContent from '@/components/BlogListContent';

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
      'Articles sur le branding, le design et la stratégie créative par SQWR Studio, studio fondateur bruxellois.',
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

      <BlogListContent articles={articles} />
    </>
  );
}
