import Link from 'next/link';
import { Home, Search, TrendingUp } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Logo y título */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold text-2xl inline-block mb-4">
                        TF
                    </div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Página no encontrada
                    </h2>
                    <p className="text-gray-600">
                        Lo sentimos, no pudimos encontrar la página que buscas.
                    </p>
                </div>

                {/* Ilustración simple */}
                <div className="mb-8">
                    <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto flex items-center justify-center">
                        <Search className="w-16 h-16 text-gray-400" />
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Volver al inicio
                    </Link>

                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href="/blog/technology"
                            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                        >
                            📱 Tecnología
                        </Link>
                        <Link
                            href="/blog/finance"
                            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                        >
                            💰 Finanzas
                        </Link>
                    </div>
                </div>

                {/* Sugerencias */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-900">Artículos populares</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                        Descubre las últimas noticias de tecnología y finanzas en nuestra página principal.
                    </p>
                </div>
            </div>
        </div>
    );
}
