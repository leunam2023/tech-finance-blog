import BlogCard from '@/components/BlogCard';
import { HorizontalAd, SidebarAd } from '@/components/AdBanner';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import { getGeneralNews, convertNewsArticleToBlogPost } from '@/lib/newsApi';
import { generateCategoryMetadata } from '@/lib/seo';
import { Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata() {
    return generateCategoryMetadata('general');
}

export default async function GeneralPage() {
    // Obtener noticias generales
    const generalNewsResponse = await getGeneralNews(1, 20);
    const posts = generalNewsResponse.articles.map(article =>
        convertNewsArticleToBlogPost(article, 'general')
    );

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la página */}
            <section className="bg-gradient-to-br from-purple-600 to-pink-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Globe className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">General</h1>
                        </div>
                        <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
                            Noticias y acontecimientos de interés general del mundo actual
                        </p>
                        <div className="flex items-center justify-center text-sm">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            <span>Actualizado en tiempo real</span>
                        </div>
                    </div>
                </div>
            </section>

            <HorizontalAd />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {/* Artículo destacado */}
                        {featuredPost && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Destacado en General</h2>
                                <BlogCard post={featuredPost} featured={true} />
                            </section>
                        )}

                        {/* Lista de artículos */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Últimas Noticias Generales</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {remainingPosts.map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-8">
                            <SidebarAd />
                            <AffiliateSidebar />

                            {/* Stats de categoría */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Estadísticas</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Artículos publicados:</span>
                                        <span className="font-semibold text-purple-600">{posts.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Última actualización:</span>
                                        <span className="font-semibold text-green-600">Hace minutos</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Categoría:</span>
                                        <span className="font-semibold text-pink-600">General</span>
                                    </div>
                                </div>
                            </div>

                            {/* Categorías relacionadas */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 Explorar más</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/blog/technology"
                                        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded hover:bg-blue-50"
                                    >
                                        📱 Tecnología
                                    </Link>
                                    <Link
                                        href="/blog/finance"
                                        className="block text-green-600 hover:text-green-800 transition-colors duration-200 p-2 rounded hover:bg-green-50"
                                    >
                                        💰 Finanzas
                                    </Link>
                                    <Link
                                        href="/"
                                        className="block text-gray-600 hover:text-gray-800 transition-colors duration-200 p-2 rounded hover:bg-gray-50"
                                    >
                                        🏠 Inicio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
