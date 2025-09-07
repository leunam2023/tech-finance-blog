export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'technology' | 'finance' | 'general';
  tags: string[];
  imageUrl?: string;
  publishedAt: string;
  author: string;
  readTime: number;
  source?: string;
  sourceUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
