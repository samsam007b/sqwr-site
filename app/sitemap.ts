import { MetadataRoute } from 'next';
import { projects } from './data/projects';
import { articles } from './blog/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sqwr.be';

  // Date du dernier déploiement significatif
  const SITE_LAST_UPDATED = new Date('2026-03-01');

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ];

  // Dates réelles de livraison par projet
  const projectDates: Record<string, Date> = {
    'la-villa':        new Date('2024-12-01'),
    'nanou':           new Date('2025-04-01'),
    'izzico':          new Date('2025-06-01'),
    'villa-coladeira': new Date('2025-09-01'),
  };

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: projectDates[project.id] ?? SITE_LAST_UPDATED,
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }));

  const legalPages = [
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...projectPages, ...legalPages, ...blogPages];
}
