import BlogCard from '@/components/BlogCard';
import { HorizontalAd, SidebarAd } from '@/components/AdBanner';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import AnimatedSection from '@/components/AnimatedSection';
import LazyImage from '@/components/LazyImage';
import { getTechnologyNews, convertNewsArticleToBlogPost } from '@/lib/newsApi';
import { generateCategoryMetadata } from '@/lib/seo';
import { Smartphone, TrendingUp } from 'lucide-react';

export async function generateMetadata() {
    return generateCategoryMetadata('technology');
}

export default async function TechnologyPage() {
    // Obtener noticias de tecnología
    const techNewsResponse = await getTechnologyNews(1, 20);
    const posts = techNewsResponse.articles.map(article =>
        convertNewsArticleToBlogPost(article, 'technology')
    );

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la página */}
            <AnimatedSection animation="fadeIn" delay={0}>
                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <Smartphone className="w-12 h-12 mr-4" />
                                <h1 className="text-4xl md:text-5xl font-bold">Tecnología</h1>
                            </div>
                            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                                Las últimas noticias y tendencias en tecnología, IA, software y startups
                            </p>
                            <div className="flex items-center justify-center text-sm">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                <span>Actualizado en tiempo real</span>
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
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Destacado en Tecnología</h2>
                                    <BlogCard post={featuredPost} featured={true} />
                                </section>
                            </AnimatedSection>
                        )}

                        {/* Lista de artículos */}
                        <AnimatedSection animation="fadeIn" delay={300}>
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Últimas Noticias de Tecnología</h2>
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

                            {/* Stats de categoría */}
                            <AnimatedSection animation="slideLeft" delay={400}>
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Estadísticas</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Artículos publicados:</span>
                                            <span className="font-semibold text-blue-600">{posts.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Última actualización:</span>
                                            <span className="font-semibold text-green-600">Hace minutos</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoría:</span>
                                            <span className="font-semibold text-purple-600">Tecnología</span>
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
