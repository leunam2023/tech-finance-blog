import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import NewsletterForm from '@/components/NewsletterForm';
import AnimatedSection from '@/components/AnimatedSection';
import { getTrendingNews, convertNewsArticleToBlogPost } from '@/lib/newsApi';
import { generateMetadata } from '@/lib/seo';
import { COMPANY_INFO, pageConfigs } from '@/config/company';

export const metadata: Metadata = generateMetadata({
    title: pageConfigs.trending.title,
    description: pageConfigs.trending.description,
    keywords: ['tendencias', 'trending', 'tecnología', 'finanzas', 'criptomonedas', 'noticias', 'viral', 'popular'],
});

export default async function TrendingPage() {
    const trendingNewsResponse = await getTrendingNews(1, 12);
    const trendingPosts = trendingNewsResponse.articles.map(article =>
        convertNewsArticleToBlogPost(article, 'general')
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <AnimatedSection animation="fadeIn" delay={0}>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Tendencias 🔥
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Descubre las noticias más populares y trending del momento en tecnología,
                            finanzas, criptomonedas y el mundo digital.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Trending Categories */}
                <AnimatedSection animation="slideUp" delay={100}>
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <AnimatedSection animation="slideUp" delay={200}>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">🚀</span>
                                    <h3 className="text-xl font-semibold text-white">Tech Viral</h3>
                                </div>
                                <p className="text-gray-300">
                                    Las últimas innovaciones tecnológicas que están revolucionando el mundo digital.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={300}>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">💰</span>
                                    <h3 className="text-xl font-semibold text-white">Crypto Trends</h3>
                                </div>
                                <p className="text-gray-300">
                                    Movimientos del mercado crypto y las monedas digitales más populares.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={400}>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">📈</span>
                                    <h3 className="text-xl font-semibold text-white">Market Movers</h3>
                                </div>
                                <p className="text-gray-300">
                                    Las empresas y sectores que están marcando tendencia en los mercados.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </AnimatedSection>

                {/* Newsletter CTA */}
                <AnimatedSection animation="scaleIn" delay={500}>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 mb-12 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            🔔 ¡No te pierdas las tendencias!
                        </h2>
                        <p className="text-purple-100 mb-6">
                            Suscríbete a nuestro newsletter y recibe las tendencias más importantes
                            directamente en tu inbox.
                        </p>
                        <NewsletterForm compact={false} theme="dark" />
                    </div>
                </AnimatedSection>

                {/* News Grid */}
                <AnimatedSection animation="fadeIn" delay={600}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-yellow-400">⭐</span>
                            Noticias Trending
                        </h2>

                        {trendingPosts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trendingPosts.map((post, index) => (
                                    <AnimatedSection
                                        key={post.id}
                                        animation="slideUp"
                                        delay={700 + (index * 150)}
                                    >
                                        <BlogCard post={post} />
                                    </AnimatedSection>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <span className="text-6xl mb-4 block">🔄</span>
                                <p className="text-gray-300 text-lg">
                                    Cargando las últimas tendencias...
                                </p>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* Stats Section */}
                <AnimatedSection animation="slideUp" delay={800}>
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                            📊 Estadísticas de Tendencias
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            <AnimatedSection animation="scaleIn" delay={900}>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                                    <div className="text-gray-300">Monitoreo</div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animation="scaleIn" delay={1000}>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                                    <div className="text-gray-300">Fuentes</div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animation="scaleIn" delay={1100}>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
                                    <div className="text-gray-300">Artículos/día</div>
                                </div>
                            </AnimatedSection>
                            <AnimatedSection animation="scaleIn" delay={1200}>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-2">Real-time</div>
                                    <div className="text-gray-300">Actualizaciones</div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Contact Info */}
                <AnimatedSection animation="fadeIn" delay={1300}>
                    <div className="text-center mt-12 text-gray-400">
                        <p>
                            Análisis y curación por{' '}
                            <span className="text-white font-semibold">{COMPANY_INFO.founder.name}</span>
                        </p>
                        <p className="text-sm mt-2">
                            Sígueme en redes sociales para más insights sobre tendencias tecnológicas y financieras
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
