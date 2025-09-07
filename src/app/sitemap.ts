import { MetadataRoute } from 'next';
import { getMixedNews } from '@/lib/newsApi';
import { BlogPost } from '@/types/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tech-finance-blog.vercel.app';
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/technology`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/finance`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/general`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
  ];

  // Obtener artículos dinámicos
  let dynamicPages: MetadataRoute.Sitemap = [];
  
  try {
    const articles: BlogPost[] = await getMixedNews(100); // Obtener los últimos 100 artículos
    
    dynamicPages = articles.map((article) => ({
      url: `${baseUrl}/blog/${article.id}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating sitemap for articles:', error);
    // En caso de error, continuar solo con páginas estáticas
  }

  return [...staticPages, ...dynamicPages];
}
