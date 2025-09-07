'use client';

import Link from 'next/link';
import { Search, Menu, X, TrendingUp, Smartphone, DollarSign } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSearchSuggestions } from '@/lib/search';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const navigation = [
        { name: 'Inicio', href: '/', icon: null },
        { name: 'Tecnología', href: '/blog/technology', icon: Smartphone },
        { name: 'Finanzas', href: '/blog/finance', icon: DollarSign },
        { name: 'Tendencias', href: '/blog/trending', icon: TrendingUp },
    ];

    // Función para manejar la búsqueda
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
            setShowSuggestions(false);
        }
    };

    // Función para obtener sugerencias
    const fetchSuggestions = async (query: string) => {
        if (query.length >= 2) {
            try {
                const newSuggestions = await getSearchSuggestions(query);
                setSuggestions(newSuggestions);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Effect para manejar la búsqueda de sugerencias
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 300); // Debounce de 300ms

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Effect para manejar el foco en el input de búsqueda
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Función para manejar clics en sugerencias
    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        router.push(`/search?q=${encodeURIComponent(suggestion)}`);
        setIsSearchOpen(false);
        setShowSuggestions(false);
    };

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                                TF
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                TechFinance
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        {navigation.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search and Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Search Button/Input */}
                        <div className="relative">
                            {isSearchOpen ? (
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onBlur={() => {
                                            // Delay para permitir clicks en sugerencias
                                            setTimeout(() => {
                                                setShowSuggestions(false);
                                            }, 200);
                                        }}
                                        onFocus={() => {
                                            if (suggestions.length > 0) {
                                                setShowSuggestions(true);
                                            }
                                        }}
                                        placeholder="Buscar artículos..."
                                        className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                            setShowSuggestions(false);
                                        }}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label="Cerrar búsqueda"
                                        title="Cerrar búsqueda"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>

                                    {/* Sugerencias */}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                                            {suggestions.map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                                    aria-label={`Buscar ${suggestion}`}
                                                    title={`Buscar ${suggestion}`}
                                                >
                                                    <Search className="inline w-3 h-3 mr-2 text-gray-400" />
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                    aria-label="Buscar artículos"
                                    title="Buscar artículos"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            aria-label="Abrir menú de navegación"
                            title="Menú"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
                            {/* Mobile Search */}
                            <div className="px-3 py-2">
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Buscar artículos..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                </form>
                            </div>

                            {/* Mobile Navigation Links */}
                            {navigation.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Espacio para banner de afiliados */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm">
                <p>
                    💰 ¿Quieres invertir en crypto?
                    <a href="#" className="underline font-semibold ml-1 hover:text-yellow-300">
                        Obtén $10 gratis en Binance
                    </a>
                </p>
            </div>
        </header>
    );
};

export default Header;
