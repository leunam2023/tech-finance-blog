'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { AffiliateSidebar } from '@/components/AffiliateCard';
import { StarkTechnologiaSidebar } from '@/components/StarkTechnologiaBanner';
import NewsletterForm from '@/components/NewsletterForm';
import AnimatedSection from '@/components/AnimatedSection';
import { Smartphone, DollarSign, Globe, TrendingUp } from 'lucide-react';

interface CategorySidebarProps {
    category?: 'technology' | 'finance' | 'general';
    postsCount?: number;
    children?: ReactNode;
}

export default function CategorySidebar({ children }: CategorySidebarProps) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const triggerPoint = 200; // Punto donde la sidebar debe volverse sticky
            setIsSticky(scrollY > triggerPoint);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="lg:col-span-1">
            <div
                className={`space-y-8 transition-all duration-300 custom-scrollbar ${isSticky
                    ? 'sticky top-24 max-h-screen-sidebar overflow-y-auto'
                    : 'relative'
                    }`}
            >
                {/* Stark Tecnología - Oportunidad de Inversión */}
                <AnimatedSection animation="slideLeft" delay={300}>
                    <StarkTechnologiaSidebar />
                </AnimatedSection>

                {/* Sidebar de afiliados */}
                <AnimatedSection animation="slideLeft" delay={400}>
                    <AffiliateSidebar />
                </AnimatedSection>

                {/* Newsletter */}
                <AnimatedSection animation="slideLeft" delay={500}>
                    <NewsletterForm compact={true} />
                </AnimatedSection>

                {/* Categorías populares */}
                <AnimatedSection animation="slideLeft" delay={600}>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Categorías Populares</h3>
                        <div className="space-y-3">
                            <Link href="/blog/technology" className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                <div className="flex items-center">
                                    <Smartphone className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium text-gray-900">Tecnología</span>
                                </div>
                                <span className="text-sm text-gray-500">142 artículos</span>
                            </Link>
                            <Link href="/blog/finance" className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                                    <span className="font-medium text-gray-900">Finanzas</span>
                                </div>
                                <span className="text-sm text-gray-500">89 artículos</span>
                            </Link>
                            <Link href="/blog/general" className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200">
                                <div className="flex items-center">
                                    <Globe className="w-5 h-5 text-pink-600 mr-3" />
                                    <span className="font-medium text-gray-900">General</span>
                                </div>
                                <span className="text-sm text-gray-500">76 artículos</span>
                            </Link>
                            <Link href="/blog/trending" className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                                    <span className="font-medium text-gray-900">Tendencias</span>
                                </div>
                                <span className="text-sm text-gray-500">67 artículos</span>
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Custom children if any */}
                {children}
            </div>
        </div>
    );
}
