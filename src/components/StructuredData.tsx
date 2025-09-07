'use client';

interface ArticleData {
    title: string;
    description: string;
    imageUrl?: string;
    publishedAt: string;
    modifiedAt?: string;
    author?: string;
    url: string;
    category?: string;
    keywords?: string[];
    content?: string;
}

interface WebsiteData {
    name: string;
    description: string;
    url: string;
}

interface OrganizationData {
    name: string;
    description: string;
    url: string;
    logo?: string;
}

interface StructuredDataProps {
    type: 'article' | 'website' | 'organization';
    data: ArticleData | WebsiteData | OrganizationData;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    const generateStructuredData = () => {
        switch (type) {
            case 'article': {
                const articleData = data as ArticleData;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: articleData.title,
                    description: articleData.description,
                    image: articleData.imageUrl || 'https://tech-finance-blog.vercel.app/og-image.jpg',
                    datePublished: articleData.publishedAt,
                    dateModified: articleData.modifiedAt || articleData.publishedAt,
                    author: {
                        '@type': 'Person',
                        name: articleData.author || 'TechFinance Blog Team',
                        url: 'https://tech-finance-blog.vercel.app/about'
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'TechFinance Blog',
                        logo: {
                            '@type': 'ImageObject',
                            url: 'https://tech-finance-blog.vercel.app/logo.png',
                            width: 300,
                            height: 60
                        }
                    },
                    mainEntityOfPage: {
                        '@type': 'WebPage',
                        '@id': articleData.url
                    },
                    articleSection: articleData.category || 'Technology',
                    keywords: articleData.keywords?.join(', ') || 'tecnología, finanzas, criptomonedas',
                    wordCount: articleData.content?.length || 500,
                    inLanguage: 'es-ES'
                };
            }

            case 'website': {
                const websiteData = data as WebsiteData;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: websiteData.name,
                    description: websiteData.description,
                    url: websiteData.url,
                    publisher: {
                        '@type': 'Organization',
                        name: 'TechFinance Blog'
                    },
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: 'https://tech-finance-blog.vercel.app/search?q={search_term_string}',
                        'query-input': 'required name=search_term_string'
                    },
                    inLanguage: 'es-ES'
                };
            }

            case 'organization': {
                const orgData = data as OrganizationData;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: orgData.name,
                    description: orgData.description,
                    url: orgData.url,
                    logo: orgData.logo || 'https://tech-finance-blog.vercel.app/logo.png',
                    sameAs: [
                        'https://twitter.com/techfinanceblog',
                        'https://linkedin.com/company/techfinanceblog',
                        'https://facebook.com/techfinanceblog'
                    ],
                    contactPoint: {
                        '@type': 'ContactPoint',
                        contactType: 'customer service',
                        email: 'contact@techfinanceblog.com'
                    },
                    foundingDate: '2023',
                    knowsAbout: [
                        'Tecnología',
                        'Finanzas',
                        'Criptomonedas',
                        'Blockchain',
                        'Inversiones',
                        'Trading',
                        'Startups'
                    ]
                };
            }

            default:
                return {};
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateStructuredData())
            }}
        />
    );
}

// Función para generar datos estructurados dinámicamente (para server components)
export function generateArticleStructuredData(post: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    publishedAt: string;
    modifiedAt?: string;
    author?: string;
    category?: string;
    tags?: string[];
    content?: string;
}): ArticleData {
    return {
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        publishedAt: post.publishedAt,
        modifiedAt: post.modifiedAt,
        author: post.author,
        url: `https://tech-finance-blog.vercel.app/blog/${post.id}`,
        category: post.category,
        keywords: post.tags,
        content: post.content
    };
}

// Hook para generar datos estructurados dinámicamente (para client components)
export function useArticleStructuredData(post: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    publishedAt: string;
    modifiedAt?: string;
    author?: string;
    category?: string;
    tags?: string[];
    content?: string;
}): ArticleData {
    return generateArticleStructuredData(post);
}
