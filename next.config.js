/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.net',
                port: '',
                pathname: '/**',
            }
        ],
    },
    // Configuración adicional para SEO
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ];
    },
};

module.exports = nextConfig;
