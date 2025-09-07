import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, User, Tag, ExternalLink } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
    post: BlogPost;
    featured?: boolean;
}

// Función helper para truncar texto
const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;

    // Buscar el último espacio antes del límite para evitar cortar palabras
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 0
        ? truncated.substring(0, lastSpace) + '...'
        : truncated + '...';
};

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
    const formattedDate = format(new Date(post.publishedAt), 'dd MMM yyyy', { locale: es });

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

    if (featured) {
        return (
            <article className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                {/* Imagen principal */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-6xl font-bold">
                                {getCategoryName(post.category)[0]}
                            </span>
                        </div>
                    )}

                    {/* Overlay con categoría */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                            {getCategoryName(post.category)}
                        </span>
                    </div>

                    {/* Botón de enlace externo si es de fuente externa */}
                    {post.sourceUrl && (
                        <div className="absolute top-4 right-4">
                            <a
                                href={post.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full transition-all duration-200"
                                aria-label="Ver artículo original"
                                title="Ver artículo original"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4">
                        {truncateText(post.description, 120)}
                    </p>

                    {/* Meta información */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>{post.readTime} min lectura</span>
                            </div>
                        </div>
                        <span>{formattedDate}</span>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        );
    }

    // Versión normal (no destacada)
    return (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
            {/* Imagen */}
            <div className="relative h-48 overflow-hidden">
                {post.imageUrl ? (
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                            {getCategoryName(post.category)[0]}
                        </span>
                    </div>
                )}

                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {getCategoryName(post.category)}
                    </span>
                </div>

                {post.sourceUrl && (
                    <div className="absolute top-3 right-3">
                        <a
                            href={post.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-1.5 rounded-full transition-all duration-200"
                            aria-label="Ver artículo original"
                            title="Ver artículo original"
                        >
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                    {truncateText(post.description, 80)}
                </p>

                {/* Meta información */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime} min</span>
                    </div>
                    <span>{formattedDate}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default BlogCard;
