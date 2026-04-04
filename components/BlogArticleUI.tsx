'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Article } from '@/app/blog/data/articles';

interface HeroProps {
  article: Pick<Article, 'categoryLabel' | 'title' | 'author' | 'publishedAt' | 'readingTime'>;
}

interface FooterProps {
  article: Pick<Article, 'author' | 'authorTitle'>;
}

export function BlogArticleHero({ article }: HeroProps) {
  const { t, locale } = useLanguage();

  return (
    <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors duration-300 mb-12"
        >
          <span className="mr-2">←</span>
          {t('blog.title')}
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
            {new Date(article.publishedAt).toLocaleDateString(locale, {
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
  );
}

export function BlogArticleFooter({ article }: FooterProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Author bio */}
      <div className="mt-20 pt-12 border-t border-secondary/10">
        <div className="flex items-start gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-2">
              {t('blog.author')}
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
          {t('blog.haveProject')}
        </p>
        <h2 className="font-display font-normal text-2xl lg:text-3xl text-foreground mb-6">
          {t('blog.talkIdentity')}
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.12em] hover:bg-primary/85 transition-colors duration-300"
        >
          {t('blog.startProject')}
          <span>→</span>
        </Link>
      </div>
    </>
  );
}
