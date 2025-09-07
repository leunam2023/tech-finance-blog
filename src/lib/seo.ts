import { Metadata } from 'next';
import { SEOMetadata } from '@/types/blog';

const SITE_NAME = 'TechFinance Blog';
const SITE_DESCRIPTION = 'Tu fuente de información sobre tecnología, finanzas y criptomonedas. Noticias actualizadas, análisis y oportunidades de inversión.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
    title: 'Inicio',
    description: SITE_DESCRIPTION,
    keywords: ['tecnología', 'finanzas', 'criptomonedas', 'blockchain', 'inversión', 'startup', 'noticias', 'análisis'],
  });
}

export function generateCategoryMetadata(category: string): Metadata {
  const descriptions = {
    technology: 'Las últimas noticias y tendencias en tecnología, IA, software y startups.',
    finance: 'Análisis financiero, criptomonedas, inversiones y mercados.',
    general: 'Noticias generales de negocios y emprendimiento.',
  };

  return generateMetadata({
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: descriptions[category as keyof typeof descriptions] || SITE_DESCRIPTION,
    keywords: [category, 'noticias', 'tecnología', 'finanzas'],
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
