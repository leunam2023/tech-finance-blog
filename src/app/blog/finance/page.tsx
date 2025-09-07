import BlogCard from '@/components/BlogCard';
import { HorizontalAd, SidebarAd } from '@/components/AdBanner';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import AnimatedSection from '@/components/AnimatedSection';
import { getFinanceNews, convertNewsArticleToBlogPost } from '@/lib/newsApi';
import { generateCategoryMetadata } from '@/lib/seo';
import { DollarSign, TrendingUp } from 'lucide-react';

export async function generateMetadata() {
    return generateCategoryMetadata('finance');
}

export default async function FinancePage() {
    // Obtener noticias de finanzas
    const financeNewsResponse = await getFinanceNews(1, 20);
    const posts = financeNewsResponse.articles.map(article =>
        convertNewsArticleToBlogPost(article, 'finance')
    );

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la página */}
            <AnimatedSection animation="fadeIn" delay={0}>
                <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <DollarSign className="w-12 h-12 mr-4" />
                                <h1 className="text-4xl md:text-5xl font-bold">Finanzas</h1>
                            </div>
                            <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
                                Noticias financieras, criptomonedas, mercados e inversiones
                            </p>
                            <div className="flex items-center justify-center text-sm">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                <span>Datos actualizados en tiempo real</span>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={100}>
                <HorizontalAd />
            </AnimatedSection>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {/* Artículo destacado */}
                        {featuredPost && (
                            <AnimatedSection animation="slideUp" delay={200}>
                                <section className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Destacado en Finanzas</h2>
                                    <BlogCard post={featuredPost} featured={true} />
                                </section>
                            </AnimatedSection>
                        )}

                        {/* Lista de artículos */}
                        <AnimatedSection animation="fadeIn" delay={300}>
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Últimas Noticias Financieras</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {remainingPosts.map((post, index) => (
                                        <AnimatedSection
                                            key={post.id}
                                            animation="slideUp"
                                            delay={400 + (index * 100)}
                                        >
                                            <BlogCard post={post} />
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </section>
                        </AnimatedSection>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-8">
                            <AnimatedSection animation="slideLeft" delay={200}>
                                <SidebarAd />
                            </AnimatedSection>

                            <AnimatedSection animation="slideLeft" delay={300}>
                                <AffiliateSidebar />
                            </AnimatedSection>

                            {/* Widget de precios crypto */}
                            <AnimatedSection animation="slideLeft" delay={400}>
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">₿ Precios Crypto</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Bitcoin (BTC)</span>
                                            <span className="text-green-600 font-semibold">$67,234</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Ethereum (ETH)</span>
                                            <span className="text-green-600 font-semibold">$3,456</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">BNB (BNB)</span>
                                            <span className="text-red-600 font-semibold">$621</span>
                                        </div>
                                        <div className="text-xs text-gray-500 text-center mt-4">
                                            * Precios aproximados para demo
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            {/* Stats de categoría */}
                            <AnimatedSection animation="slideLeft" delay={500}>
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Estadísticas</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Artículos publicados:</span>
                                            <span className="font-semibold text-green-600">{posts.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Última actualización:</span>
                                            <span className="font-semibold text-green-600">Hace minutos</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoría:</span>
                                            <span className="font-semibold text-green-600">Finanzas</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
