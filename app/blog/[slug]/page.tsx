import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles, getArticleBySlug } from '../data/articles';

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

      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors duration-300 mb-12"
          >
            <span className="mr-2">←</span>
            Blog
          </Link>

          <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-6">
            {article.categoryLabel}
          </p>

          <h1 className="font-display font-normal text-3xl md:text-4xl lg:text-6xl leading-[0.95] text-foreground mb-8">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-xs font-mono text-secondary/50 uppercase tracking-[0.15em]">
            <span>{article.author}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('fr-BE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

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

          {/* Author bio */}
          <div className="mt-20 pt-12 border-t border-secondary/10">
            <div className="flex items-start gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-2">
                  Auteur
                </p>
                <p className="font-display font-normal text-xl text-foreground mb-1">
                  {article.author}
                </p>
                <p className="text-sm text-secondary/50 font-light">
                  {article.authorTitle}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 lg:p-12 border border-secondary/10">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-4">
              Vous avez un projet ?
            </p>
            <h2 className="font-display font-normal text-2xl lg:text-3xl text-foreground mb-6">
              Parlons de votre identité visuelle.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.12em] hover:bg-primary/85 transition-colors duration-300"
            >
              Démarrer un projet
              <span>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
