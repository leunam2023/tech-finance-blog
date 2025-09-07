import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Tag, Bookmark } from 'lucide-react';

import { HorizontalAd, NativeAd, SidebarAd } from '@/components/AdBanner';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import BlogCard from '@/components/BlogCard';
import StructuredData, { generateArticleStructuredData } from '@/components/StructuredData';
import SocialShare, { QuickShare } from '@/components/SocialShare';
import { getRelatedArticles, getMixedNews } from '@/lib/newsApi';
import { generateBlogPostMetadata } from '@/lib/seo';
import { BlogPost } from '@/types/blog';

interface BlogPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Función que usa los mismos datos que la página principal
async function getPostById(id: string): Promise<BlogPost | null> {
    try {
        console.log('[getPostById] 🔍 Buscando post con ID:', id);

        // Usar exactamente la misma fuente que la página principal
        const allPosts = await getMixedNews(100); // Obtener más posts para asegurar que encontremos el artículo

        console.log('[getPostById] 📰 Posts obtenidos:', allPosts.length);

        // Buscar el post por ID directamente
        const post = allPosts.find(p => p.id === id);

        if (post) {
            console.log('[getPostById] ✅ Post encontrado:', post.title);
            return post;
        }

        console.log('[getPostById] ❌ Post no encontrado para ID:', id);
        console.log('[getPostById] 🔍 IDs disponibles:', allPosts.slice(0, 5).map(p => p.id));

        return null;
    } catch (error) {
        console.error('[getPostById] ❌ Error:', error);
        return null;
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    try {
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
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Artículo | TechFinance Blog',
            description: 'Artículo de TechFinance Blog',
        };
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    try {
        const { id } = await params;
        console.log('BlogPostPage - ID recibido:', id);

        const post = await getPostById(id);

        if (!post) {
            console.log('Post no encontrado, mostrando 404');
            notFound();
        }

        console.log('Post encontrado:', post.title);

        // Obtener artículos relacionados con manejo de errores
        let relatedArticles: BlogPost[] = [];
        try {
            relatedArticles = await getRelatedArticles(post.id, post.category, 4);
        } catch (error) {
            console.error('Error obteniendo artículos relacionados:', error);
            relatedArticles = [];
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

        // Generar datos estructurados para el artículo
        const articleData = generateArticleStructuredData({
            id: post.id,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            publishedAt: post.publishedAt,
            modifiedAt: post.publishedAt,
            author: post.author,
            category: post.category,
            tags: post.tags,
            content: post.content
        });

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Datos estructurados JSON-LD */}
                <StructuredData type="article" data={articleData} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contenido principal */}
                        <article className="lg:col-span-2">
                            {/* Navegación breadcrumb */}
                            <nav className="mb-6">
                                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                                    <li>
                                        <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
                                            Inicio
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <Link
                                            href={`/blog/${post.category}`}
                                            className="hover:text-blue-600 transition-colors duration-200"
                                        >
                                            {getCategoryName(post.category)}
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mx-2">/</span>
                                        <span className="text-gray-900 font-medium truncate max-w-xs">
                                            {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
                                        </span>
                                    </li>
                                </ol>
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
                                <div className="text-gray-700 leading-relaxed space-y-6">
                                    {post.content.split('\n').map((paragraph: string, index: number) => {
                                        if (!paragraph.trim()) return null;

                                        // Detectar headers markdown
                                        if (paragraph.startsWith('##')) {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                                                    {paragraph.replace(/^##\s*/, '')}
                                                </h2>
                                            );
                                        }

                                        if (paragraph.startsWith('###')) {
                                            return (
                                                <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                                                    {paragraph.replace(/^###\s*/, '')}
                                                </h3>
                                            );
                                        }

                                        // Detectar listas numeradas
                                        if (/^\d+\.\s/.test(paragraph)) {
                                            return (
                                                <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                                                    <p className="text-blue-800 font-medium">
                                                        {paragraph}
                                                    </p>
                                                </div>
                                            );
                                        }

                                        return (
                                            <p key={index} className="mb-4 text-lg leading-relaxed">
                                                {paragraph}
                                            </p>
                                        );
                                    })}

                                    {/* Aviso sobre contenido limitado de NewsAPI */}
                                    {post.content.length < 500 && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-yellow-800">
                                                        Vista previa del artículo
                                                    </h3>
                                                    <div className="mt-2 text-sm text-yellow-700">
                                                        <p>
                                                            Este es un resumen del artículo completo. Para leer todo el contenido,
                                                            haz clic en &ldquo;Ver artículo completo&rdquo; abajo.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>                        {/* Botones de acción */}
                            {/* Botones de acción y compartir */}
                            <div className="mb-8 space-y-4">
                                {/* Botones de acción principales */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <QuickShare
                                        url={`https://tech-finance-blog.vercel.app/blog/${post.id}`}
                                        title={post.title}
                                    />
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                            <Bookmark className="w-5 h-5" />
                                            <span>Guardar</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Tiempo de lectura */}
                                <div className="text-center">
                                    <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg inline-block shadow">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Tiempo de lectura: {post.readTime} minutos
                                    </div>
                                </div>
                            </div>

                            {/* Anuncio nativo en el medio del contenido */}
                            <NativeAd />

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string, index: number) => (
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

                            {/* Enlace a fuente original - mejorado */}
                            {post.sourceUrl && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-blue-900 text-lg mb-2">
                                                📰 Lee el artículo completo
                                            </h3>
                                            <p className="text-blue-700 mb-3">
                                                Encuentra la versión completa de &ldquo;<strong>{post.title}</strong>&rdquo; en <span className="font-semibold">{post.source || 'la fuente original'}</span> para
                                                obtener todos los detalles, análisis completo y información adicional.
                                            </p>
                                            <div className="flex items-center text-sm text-blue-600">
                                                <span className="mr-2">✨</span>
                                                <span>Recomendado: Usar búsqueda en Google para mejores resultados</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 ml-6">
                                            {/* Búsqueda en Google - ÚNICO BOTÓN */}
                                            <a
                                                href={`https://www.google.com/search?q=${encodeURIComponent(post.title)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center font-semibold"
                                                title={`Buscar "${post.title}" en Google`}
                                            >
                                                🔍 Buscar artículo en Google
                                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Aviso sobre enlaces */}
                                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                        <p className="text-xs text-green-800">
                                            ✅ <strong>Buscar en Google:</strong> La forma más efectiva de encontrar el artículo completo.
                                        </p>
                                        <p className="text-xs text-green-700 mt-1">
                                            � Los enlaces directos de NewsAPI suelen estar limitados o expirar.
                                        </p>
                                    </div>
                                </div>
                            )}                            {/* Call to action mejorado */}
                            <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-8 text-center mb-8">
                                <h3 className="text-2xl font-bold mb-3">
                                    ¿Te gustó este artículo?
                                </h3>
                                <p className="mb-6 text-lg">
                                    Mantente al día con las últimas noticias de tecnología y finanzas.
                                </p>
                                <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                                    <input
                                        type="email"
                                        placeholder="Tu email"
                                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                                        Suscribirse
                                    </button>
                                </div>
                                <p className="text-sm text-purple-100 mt-3">
                                    Únete a más de 10,000 lectores que reciben contenido exclusivo.
                                </p>
                            </div>

                            {/* Artículos relacionados */}
                            {relatedArticles.length > 0 && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Artículos relacionados en {getCategoryName(post.category)}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {relatedArticles.map((article) => (
                                            <BlogCard key={article.id} post={article} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-20 space-y-8">
                                {/* Estadísticas del artículo */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Información del artículo</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-800 font-medium">Tiempo de lectura:</span>
                                            <span className="font-semibold text-gray-900">{post.readTime} min</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-800 font-medium">Categoría:</span>
                                            <span className="font-semibold text-gray-900">{getCategoryName(post.category)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-800 font-medium">Autor:</span>
                                            <span className="font-semibold text-gray-900">{post.author}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-800 font-medium">Fuente:</span>
                                            <span className="font-semibold text-gray-900">{post.source}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-800 font-medium">Publicado:</span>
                                            <span className="font-semibold text-gray-900">{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla de contenidos si hay headers */}
                                {post.content.includes('##') && (
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Contenido</h3>
                                        <div className="space-y-2">
                                            {post.content.split('\n')
                                                .filter((line: string) => line.startsWith('##'))
                                                .map((header: string, index: number) => (
                                                    <div key={index} className="text-sm">
                                                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                            {header.replace(/^##\s*/, '').replace(/^###\s*/, '  • ')}
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Componente de compartir social */}
                                <SocialShare
                                    url={`https://tech-finance-blog.vercel.app/blog/${post.id}`}
                                    title={post.title}
                                    description={post.description}
                                    hashtags={post.category ? [post.category, 'blog', 'tecnologia', 'finanzas'] : ['blog']}
                                />

                                <SidebarAd />
                                <AffiliateSidebar />

                                {/* Navegación de categoría */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        📰 Más en {getCategoryName(post.category)}
                                    </h3>
                                    <div className="space-y-3">
                                        <Link
                                            href={`/blog/${post.category}`}
                                            className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                        >
                                            Ver todos los artículos de {getCategoryName(post.category)}
                                        </Link>
                                        <Link
                                            href="/"
                                            className="block text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                        >
                                            Volver al inicio
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error en BlogPostPage:', error);
        notFound();
    }
}
