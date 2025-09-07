/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    trailingSlash: false,
    outDir: './public',
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: '/api/',
            },
        ],
    },
    exclude: ['/api/*', '/_next/*', '/favicon.ico'],
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date().toISOString(),
    additionalPaths: async () => {
        const result = [];

        // Add static pages
        const staticPages = [
            '/',
            '/about',
            '/contact',
            '/privacy',
            '/terms',
            '/search',
            '/blog/technology',
            '/blog/finance',
            '/blog/trending'
        ];

        staticPages.forEach(page => {
            result.push({
                loc: page,
                changefreq: 'daily',
                priority: page === '/' ? 1.0 : 0.7,
                lastmod: new Date().toISOString(),
            });
        });

        return result;
    },
};
