import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Tag, Search, ArrowLeft } from 'lucide-react';
import { getMixedNews } from '@/lib/newsApi';
import { BlogPost } from '@/types/blog';

interface BlogPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Función simple para obtener el post por ID
async function getPostById(id: string): Promise<BlogPost | null> {
    try {
        // Obtener todos los posts (misma fuente que la página principal)
        const allPosts = await getMixedNews(100);

        // Buscar el post por ID
        const post = allPosts.find(p => p.id === id);

        return post || null;
    } catch (error) {
        console.error('Error obteniendo post:', error);
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

        return {
            title: `${post.title} | TechFinance Blog`,
            description: post.description,
            openGraph: {
                title: post.title,
                description: post.description,
                images: post.imageUrl ? [post.imageUrl] : [],
            },
        };
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

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Botón de regreso */}
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al inicio
                        </Link>
                    </div>

                    {/* Contenido principal */}
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Imagen principal */}
                        {post.imageUrl && (
                            <div className="relative h-64 md:h-96 overflow-hidden">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                        )}

                        {/* Contenido */}
                        <div className="p-6 md:p-8">
                            {/* Categoría */}
                            <div className="mb-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}>
                                    {getCategoryName(post.category)}
                                </span>
                            </div>

                            {/* Título */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta información */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{post.readTime} min de lectura</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                                </div>
                            </div>

                            {/* Descripción/Contenido completo */}
                            <div className="prose prose-lg max-w-none mb-8">
                                <div className="text-gray-700 leading-relaxed">
                                    {/* Descripción principal */}
                                    <p className="text-xl text-gray-800 mb-6 font-medium leading-relaxed">
                                        {post.description}
                                    </p>

                                    {/* Contenido adicional si existe */}
                                    {post.content && post.content !== post.description && (
                                        <div className="space-y-4">
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

                                                return (
                                                    <p key={index} className="mb-4 text-lg leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                            >
                                                <Tag className="w-3 h-3 mr-1" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Botón para buscar más detalles en Google */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                <div className="text-center">
                                    <h3 className="font-bold text-blue-900 text-lg mb-3">
                                        📰 ¿Quieres saber más sobre esta noticia?
                                    </h3>
                                    <p className="text-blue-700 mb-4">
                                        Busca información adicional y análisis más profundos en la web
                                    </p>
                                    <a
                                        href={`https://www.google.com/search?q=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                                    >
                                        <Search className="w-5 h-5 mr-2" />
                                        Buscar más detalles en la web
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error en BlogPostPage:', error);
        notFound();
    }
}
