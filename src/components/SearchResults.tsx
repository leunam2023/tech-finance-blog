'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from './BlogCard';
import { Search, Filter, X } from 'lucide-react';
import { searchPosts } from '@/lib/search';
import { BlogPost } from '@/types/blog';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('relevance');

    const categories = [
        { value: 'all', label: 'Todas las categorías' },
        { value: 'technology', label: 'Tecnología' },
        { value: 'finance', label: 'Finanzas' },
        { value: 'general', label: 'General' },
    ];

    const sortOptions = [
        { value: 'relevance', label: 'Relevancia' },
        { value: 'date', label: 'Fecha' },
        { value: 'title', label: 'Título A-Z' },
    ];

    const performSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const searchResults = await searchPosts(searchQuery, selectedCategory, sortBy);
            setResults(searchResults);
        } catch (error) {
            console.error('Error searching posts:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, sortBy]);

    useEffect(() => {
        const initialQuery = searchParams.get('q');
        if (initialQuery) {
            setQuery(initialQuery);
            performSearch(initialQuery);
        }
    }, [searchParams, performSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Update URL
            window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
            performSearch(query);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        window.history.pushState({}, '', '/search');
    };

    useEffect(() => {
        if (query) {
            performSearch(query);
        }
    }, [selectedCategory, sortBy, query, performSearch]);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Search Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar artículos sobre tecnología, finanzas, crypto..."
                            className="w-full pl-12 pr-12 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                aria-label="Limpiar búsqueda"
                                title="Limpiar búsqueda"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                <Filter className="inline w-4 h-4 mr-1" />
                                Categoría
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Seleccionar categoría"
                                title="Seleccionar categoría"
                            >
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value} className="bg-gray-800">
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Ordenar por
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Ordenar resultados por"
                                title="Ordenar resultados por"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value} className="bg-gray-800">
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {loading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Search Results */}
            <div>
                {query && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Resultados para: &ldquo;{query}&rdquo;
                        </h2>
                        <p className="text-gray-300">
                            {loading ? 'Buscando...' : `${results.length} resultados encontrados`}
                        </p>
                    </div>
                )}

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-pulse">
                                <div className="h-4 bg-white/20 rounded mb-3"></div>
                                <div className="h-4 bg-white/20 rounded mb-3 w-3/4"></div>
                                <div className="h-32 bg-white/20 rounded mb-3"></div>
                                <div className="h-4 bg-white/20 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : query ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No se encontraron resultados
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Intenta con términos diferentes o revisa la ortografía
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md mx-auto">
                            <h4 className="text-lg font-semibold text-white mb-3">Sugerencias:</h4>
                            <ul className="text-gray-300 text-left space-y-1">
                                <li>• Usa palabras clave más generales</li>
                                <li>• Revisa la ortografía</li>
                                <li>• Prueba con sinónimos</li>
                                <li>• Busca por categoría</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            ¿Qué estás buscando?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Escribe en el buscador para encontrar artículos sobre tecnología, finanzas y más
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <button
                                onClick={() => {
                                    setQuery('blockchain');
                                    performSearch('blockchain');
                                }}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/20 transition-colors"
                            >
                                <span className="text-2xl mb-2 block">⛓️</span>
                                <span className="text-white font-medium">Blockchain</span>
                            </button>
                            <button
                                onClick={() => {
                                    setQuery('inteligencia artificial');
                                    performSearch('inteligencia artificial');
                                }}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/20 transition-colors"
                            >
                                <span className="text-2xl mb-2 block">🤖</span>
                                <span className="text-white font-medium">IA</span>
                            </button>
                            <button
                                onClick={() => {
                                    setQuery('inversión');
                                    performSearch('inversión');
                                }}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/20 transition-colors"
                            >
                                <span className="text-2xl mb-2 block">💰</span>
                                <span className="text-white font-medium">Inversión</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
