import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
    title: 'Búsqueda',
    description: 'Busca artículos sobre tecnología, finanzas, criptomonedas y más en TechFinance Blog.',
    keywords: ['búsqueda', 'artículos', 'tecnología', 'finanzas', 'criptomonedas', 'noticias'],
});

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🔍 Buscar Artículos
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Encuentra exactamente lo que buscas en nuestro blog de tecnología y finanzas
                    </p>
                </div>

                <Suspense
                    fallback={
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-gray-300">Cargando resultados...</p>
                        </div>
                    }
                >
                    <SearchResults />
                </Suspense>
            </div>
        </div>
    );
}
