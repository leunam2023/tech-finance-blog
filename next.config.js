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
                hostname: 'resize.imagekit.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.bwbx.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ichef.bbci.co.uk',
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
            },
            {
                protocol: 'https',
                hostname: '**.sg',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.co.uk',
                port: '',
                pathname: '/**',
            }
        ],
        // Configuración de timeouts para evitar errores de imagen
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: false,
        unoptimized: false,
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
