import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '../data/articles';
import { BlogArticleHero, BlogArticleFooter } from '@/components/BlogArticleUI';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article non trouvé' };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://sqwr.be/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://sqwr.be/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [`https://sqwr.be/about`],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: `https://sqwr.be/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorTitle,
      url: 'https://sqwr.be/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SQWR Studio',
      '@id': 'https://sqwr.be/#organization',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sqwr.be/Logo%20SQWR/sqwr-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sqwr.be/blog/${article.slug}`,
    },
    articleSection: article.categoryLabel,
    inLanguage: 'fr-BE',
    timeRequired: `PT${article.readingTime}M`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://sqwr.be' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sqwr.be/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://sqwr.be/blog/${article.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogArticleHero article={article} />

      {/* Article content */}
      <article className="px-6 lg:px-16 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg prose-neutral max-w-none
              prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-secondary/65 prose-p:font-light prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-normal
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-li:text-secondary/65 prose-li:font-light
              prose-ul:space-y-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <BlogArticleFooter article={article} />
        </div>
      </article>
    </>
  );
}
