import Link from 'next/link';
import { ExternalLink, TrendingUp, Zap, Shield } from 'lucide-react';

export default function StarkTechnologiaBanner() {
    return (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-6 h-6 text-yellow-200" />
                            <span className="text-sm font-semibold uppercase tracking-wide text-yellow-200">
                                Oportunidad de Inversión
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-2">
                            💰 Gana Dinero con Criptomonedas
                        </h3>

                        <p className="text-lg text-orange-100 mb-4">
                            Únete a <strong>Stark Tecnología</strong> y descubre cómo generar ingresos pasivos
                            con las mejores estrategias de trading e inversión en crypto.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-yellow-200" />
                                <span className="text-sm">Trading Profesional</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-yellow-200" />
                                <span className="text-sm">Plataforma Segura</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-200" />
                                <span className="text-sm">Ganancias Rápidas</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block ml-6">
                        <div className="text-right">
                            <div className="text-3xl font-bold text-yellow-200 mb-1">🚀</div>
                            <div className="text-sm text-orange-200">¡Comienza hoy!</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Link
                        href="https://www.starktecnologia.com/consultant/jchp95"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <span>🎯 Registrarse Ahora</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>

                    <div className="text-sm text-orange-200">
                        💡 <strong>Tip:</strong> Regístrate con mi enlace y obtén ventajas exclusivas
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 opacity-20 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-400 opacity-20 rounded-full -ml-8 -mb-8"></div>
        </div>
    );
}

export function StarkTechnologiaSidebar() {
    return (
        <div className="bg-gradient-to-b from-amber-500 to-orange-600 text-white rounded-lg p-6 shadow-lg">
            <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-bold mb-3">Stark Tecnología</h3>
                <p className="text-sm text-amber-100 mb-4">
                    Plataforma líder en trading de criptomonedas con herramientas profesionales
                </p>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <span>ROI Promedio:</span>
                        <span className="font-bold text-yellow-200">15-25%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Tiempo mínimo:</span>
                        <span className="font-bold text-yellow-200">30 días</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Usuarios activos:</span>
                        <span className="font-bold text-yellow-200">+10,000</span>
                    </div>
                </div>

                <Link
                    href="https://www.starktecnologia.com/consultant/jchp95"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm w-full justify-center"
                >
                    <span>Empezar Ahora</span>
                    <ExternalLink className="w-4 h-4" />
                </Link>

                <p className="text-xs text-amber-200 mt-3">
                    🎁 Bonificación especial por registro
                </p>
            </div>
        </div>
    );
}
