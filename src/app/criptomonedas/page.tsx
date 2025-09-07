import StarkTechnologiaBanner from '@/components/StarkTechnologiaBanner';
import { getMixedNews } from '@/lib/newsApi';
import BlogCard from '@/components/BlogCard';
import { Metadata } from 'next';
import { TrendingUp, Shield, Users, Award, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Criptomonedas y Trading - TechFinance Blog',
    description: 'Descubre las mejores oportunidades de inversión en criptomonedas, trading profesional y estrategias de inversión con Stark Tecnología.',
    keywords: 'criptomonedas, bitcoin, trading, inversión, stark tecnología, crypto, blockchain',
};

export default async function CryptocurrencyPage() {
    // Obtener noticias relacionadas con finanzas y crypto
    const posts = await getMixedNews(8);
    const cryptoPosts = posts.filter(post =>
        post.category === 'finance' ||
        post.title.toLowerCase().includes('crypto') ||
        post.title.toLowerCase().includes('bitcoin')
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            💰 Criptomonedas & <span className="text-yellow-200">Trading</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
                            Descubre las mejores oportunidades de inversión en el mundo cripto.
                            Únete a miles de inversionistas exitosos.
                        </p>
                        <div className="flex justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                +10,000 usuarios activos
                            </div>
                            <div className="flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2" />
                                ROI promedio 15-25%
                            </div>
                            <div className="flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Plataforma segura
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Banner principal de Stark Tecnología */}
                <section className="mb-12">
                    <StarkTechnologiaBanner />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2">
                        {/* ¿Por qué Stark Tecnología? */}
                        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                🚀 ¿Por qué elegir Stark Tecnología?
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">Trading Profesional</h3>
                                        <p className="text-gray-600">
                                            Acceso a herramientas avanzadas de trading con análisis técnico y fundamental.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <Shield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">Seguridad Garantizada</h3>
                                        <p className="text-gray-600">
                                            Plataforma regulada con los más altos estándares de seguridad.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">Comunidad Activa</h3>
                                        <p className="text-gray-600">
                                            Únete a una comunidad de +10,000 traders e inversionistas exitosos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <BarChart3 className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">Resultados Comprobados</h3>
                                        <p className="text-gray-600">
                                            ROI promedio del 15-25% con estrategias probadas y exitosas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                    <Award className="w-6 h-6 text-orange-600 mr-2" />
                                    Beneficios Exclusivos por Registro
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                        Bonificación especial para nuevos usuarios
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                        Acceso a webinars y cursos gratuitos
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                        Asesoría personalizada los primeros 30 días
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                        Herramientas de análisis premium gratis
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Noticias relacionadas */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📰 Últimas Noticias de Criptomonedas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {cryptoPosts.slice(0, 6).map((post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-6">
                            {/* Call to Action */}
                            <div className="bg-gradient-to-b from-orange-500 to-red-500 text-white rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-bold mb-3">¡Empieza Hoy!</h3>
                                <p className="text-orange-100 text-sm mb-4">
                                    No pierdas más tiempo. Las mejores oportunidades están esperándote.
                                </p>
                                <Link
                                    href="https://www.starktecnologia.com/consultant/jchp95"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                                >
                                    Registrarme Ahora 🚀
                                </Link>
                                <p className="text-xs text-orange-200 mt-2">
                                    Registro seguro y sin comisiones
                                </p>
                            </div>

                            {/* Estadísticas */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Estadísticas en Tiempo Real</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Usuarios Activos:</span>
                                        <span className="font-bold text-green-600">10,247</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">ROI Promedio:</span>
                                        <span className="font-bold text-blue-600">22.5%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Operaciones Exitosas:</span>
                                        <span className="font-bold text-purple-600">87.3%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Capital Gestionado:</span>
                                        <span className="font-bold text-orange-600">$2.1M</span>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonios */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">💬 Testimonios</h3>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-orange-400 pl-4">
                                        <p className="text-sm text-gray-600 italic">
                                            &ldquo;En 3 meses recuperé mi inversión inicial y sigo generando ganancias pasivas.&rdquo;
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">- Carlos M., Inversor</p>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4">
                                        <p className="text-sm text-gray-600 italic">
                                            &ldquo;Las herramientas de análisis son increíbles. Mis resultados mejoraron 300%.&rdquo;
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">- Ana R., Trader</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
