import { Metadata } from 'next';
import { SEOMetadata } from '@/types/blog';

const SITE_NAME = 'TechFinance Blog';
const SITE_DESCRIPTION = '🚀 Noticias de tecnología, finanzas y criptomonedas actualizadas diariamente. Análisis expert, guías de inversión y las mejores oportunidades crypto 2025.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tech-finance-blog.vercel.app';

export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: `${seo.title} | ${SITE_NAME}`,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl || SITE_URL,
      siteName: SITE_NAME,
      images: seo.ogImage ? [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        }
      ] : [],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: seo.canonicalUrl || SITE_URL,
    },
  };
}

export function generateBlogPostMetadata(
  title: string,
  description: string,
  imageUrl?: string,
  publishedAt?: string,
  tags?: string[]
): Metadata {
  const seo: SEOMetadata = {
    title,
    description,
    keywords: tags || ['tecnología', 'finanzas', 'criptomonedas', 'inversión', 'noticias'],
    ogImage: imageUrl,
  };

  const metadata = generateMetadata(seo);

  // Agregar metadatos específicos para artículos
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      authors: ['TechFinance Blog'],
    },
    other: {
      'article:published_time': publishedAt || new Date().toISOString(),
      'article:section': 'Tecnología y Finanzas',
      'article:tag': tags?.join(', ') || '',
    },
  };
}

export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: 'TechFinance Blog - Noticias de Tecnología, Finanzas y Criptomonedas 2025',
    description: '🚀 Las mejores noticias de tecnología, finanzas y crypto actualizadas diariamente. Análisis expert, guías de inversión Bitcoin y Ethereum, tendencias tech.',
    keywords: [
      'noticias tecnología',
      'finanzas 2025', 
      'criptomonedas',
      'bitcoin precio',
      'ethereum',
      'trading crypto',
      'inversión blockchain',
      'startup news',
      'inteligencia artificial',
      'mercados financieros',
      'análisis crypto',
      'tendencias tech'
    ],
  });
}

export function generateCategoryMetadata(category: string): Metadata {
  const descriptions = {
    technology: '📱 Últimas noticias de tecnología 2025: IA, startups, software y tendencias tech. Análisis expert y novedades que cambiarán el mundo.',
    finance: '💰 Noticias financieras, análisis de mercados, criptomonedas y estrategias de inversión. Trading Bitcoin, Ethereum y mejores crypto 2025.',
    general: '🌍 Noticias generales de negocios, emprendimiento y economia global. Tendencias que impactan mercados y oportunidades de inversión.',
    trending: '🔥 Tendencias virales en tecnología y finanzas. Las noticias más populares de crypto, startups y mercados actualizadas en tiempo real.'
  };

  const keywords = {
    technology: ['tecnología', 'inteligencia artificial', 'startups', 'software', 'innovación', 'apps', 'desarrollo', 'programación', 'tech news'],
    finance: ['finanzas', 'criptomonedas', 'bitcoin', 'ethereum', 'trading', 'inversión', 'mercados', 'bolsa', 'crypto'],
    general: ['noticias', 'negocios', 'emprendimiento', 'economia', 'mercados', 'empresas', 'startups', 'actualidad'],
    trending: ['tendencias', 'viral', 'popular', 'trending', 'novedades', 'últimas noticias', 'actualidad', 'tiempo real']
  };

  return generateMetadata({
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Noticias y Análisis 2025`,
    description: descriptions[category as keyof typeof descriptions] || SITE_DESCRIPTION,
    keywords: keywords[category as keyof typeof keywords] || ['noticias', 'tecnología', 'finanzas'],
  });
}

// Función para generar datos estructurados (JSON-LD)
export function generateArticleStructuredData(
  title: string,
  description: string,
  imageUrl?: string,
  publishedAt?: string,
  author?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: author || 'TechFinance Blog',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL,
    },
  };
}
