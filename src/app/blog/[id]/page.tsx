import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, ExternalLink, ArrowLeft, Tag } from 'lucide-react';

import { HorizontalAd, NativeAd, SidebarAd } from '@/components/AdBanner';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import { getMixedNews } from '@/lib/newsApi';
import { generateBlogPostMetadata, generateArticleStructuredData } from '@/lib/seo';

interface BlogPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Esta función busca el post por ID en nuestras fuentes de datos
async function getPostById(id: string) {
    const posts = await getMixedNews(50); // Obtenemos más posts para tener más probabilidad de encontrar el ID
    return posts.find(post => post.id === id);
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        return {
            title: 'Artículo no encontrado | TechFinance Blog',
            description: 'El artículo que buscas no existe o ha sido movido.',
        };
    }

    return generateBlogPostMetadata(
        post.title,
        post.description,
        post.imageUrl,
        post.publishedAt,
        post.tags
    );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    const formattedDate = format(new Date(post.publishedAt), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'technology':
                return 'bg-blue-100 text-blue-800';
            case 'finance':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryName = (category: string) => {
        switch (category) {
            case 'technology':
                return 'Tecnología';
            case 'finance':
                return 'Finanzas';
            default:
                return 'General';
        }
    };

    const structuredData = generateArticleStructuredData(
        post.title,
        post.description,
        post.imageUrl,
        post.publishedAt,
        post.author
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* JSON-LD para datos estructurados */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <article className="lg:col-span-2">
                        {/* Navegación */}
                        <nav className="mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver al inicio
                            </Link>
                        </nav>

                        {/* Header del artículo */}
                        <header className="mb-8">
                            <div className="mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
                                    {getCategoryName(post.category)}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                                {post.description}
                            </p>

                            {/* Meta información */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{post.readTime} minutos de lectura</span>
                                </div>
                            </div>

                            {/* Imagen destacada */}
                            {post.imageUrl && (
                                <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                </div>
                            )}
                        </header>

                        {/* Anuncio horizontal */}
                        <HorizontalAd />

                        {/* Contenido del artículo */}
                        <div className="prose prose-lg max-w-none mb-8">
                            <div className="text-gray-700 leading-relaxed space-y-4">
                                {post.content.split('\n').map((paragraph, index) => (
                                    paragraph.trim() && (
                                        <p key={index} className="mb-4">
                                            {paragraph}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Anuncio nativo en el medio del contenido */}
                        <NativeAd />

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            <Tag className="w-3 h-3 mr-1" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Enlace a fuente original */}
                        {post.sourceUrl && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-blue-900">Fuente original</h3>
                                        <p className="text-blue-700 text-sm">
                                            Lee el artículo completo en {post.source}
                                        </p>
                                    </div>
                                    <a
                                        href={post.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                                    >
                                        Ver original
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Call to action */}
                        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-6 text-center">
                            <h3 className="text-xl font-bold mb-2">
                                ¿Te gustó este artículo?
                            </h3>
                            <p className="mb-4">
                                Suscríbete para recibir más contenido como este directamente en tu email.
                            </p>
                            <div className="flex max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Tu email"
                                    className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                                />
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-r-lg transition-colors duration-200">
                                    Suscribirse
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-20 space-y-8">
                            <SidebarAd />
                            <AffiliateSidebar />

                            {/* Artículos relacionados */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">📰 Más en {getCategoryName(post.category)}</h3>
                                <div className="space-y-3">
                                    <Link href={`/blog/${post.category}`} className="block text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                        Ver todos los artículos de {getCategoryName(post.category)}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
