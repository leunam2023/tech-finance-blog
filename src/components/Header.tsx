'use client';

import Link from 'next/link';
import { Search, Menu, X, TrendingUp, Smartphone, DollarSign } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: 'Inicio', href: '/', icon: null },
        { name: 'Tecnología', href: '/blog/technology', icon: Smartphone },
        { name: 'Finanzas', href: '/blog/finance', icon: DollarSign },
        { name: 'Tendencias', href: '/blog/trending', icon: TrendingUp },
    ];

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
                        {/* Search Button */}
                        <button
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            aria-label="Buscar artículos"
                            title="Buscar artículos"
                        >
                            <Search className="w-5 h-5" />
                        </button>

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
