import { ExternalLink, Star, Gift, TrendingUp } from 'lucide-react';

interface AffiliateCardProps {
    title: string;
    description: string;
    offer: string;
    link: string;
    rating?: number;
    category: 'crypto' | 'broker' | 'fintech' | 'education' | 'other';
    featured?: boolean;
}

const AffiliateCard = ({
    title,
    description,
    offer,
    link,
    rating = 5,
    category,
    featured = false
}: AffiliateCardProps) => {
    const getCategoryColor = () => {
        switch (category) {
            case 'crypto':
                return 'from-orange-400 to-yellow-500';
            case 'broker':
                return 'from-green-400 to-blue-500';
            case 'fintech':
                return 'from-purple-400 to-pink-500';
            case 'education':
                return 'from-blue-400 to-indigo-500';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    const getCategoryIcon = () => {
        switch (category) {
            case 'crypto':
                return '₿';
            case 'broker':
                return '📈';
            case 'fintech':
                return '💳';
            case 'education':
                return '🎓';
            default:
                return '🔗';
        }
    };

    return (
        <div className={`relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${featured ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}>
            {featured && (
                <div className="absolute top-0 left-0 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-br-lg">
                    ⭐ DESTACADO
                </div>
            )}

            {/* Header con gradiente */}
            <div className={`bg-gradient-to-r ${getCategoryColor()} text-white p-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">{getCategoryIcon()}</span>
                        <div>
                            <h3 className="text-lg font-bold">{title}</h3>
                            <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-300 text-yellow-300' : 'text-white opacity-30'}`}
                                    />
                                ))}
                                <span className="ml-2 text-sm">({rating}/5)</span>
                            </div>
                        </div>
                    </div>
                    <TrendingUp className="w-6 h-6" />
                </div>
            </div>

            {/* Contenido */}
            <div className="p-4">
                <p className="text-gray-600 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Oferta especial */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                        <Gift className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-700 font-semibold">Oferta Especial:</span>
                    </div>
                    <p className="text-green-800 mt-1 font-medium">{offer}</p>
                </div>

                {/* Botón CTA */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
                >
                    <span>Obtener Oferta</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-2 text-center">
                    * Este es un enlace de afiliado. Podemos recibir comisión.
                </p>
            </div>
        </div>
    );
};

// Componente para sidebar de afiliados
export const AffiliateSidebar = () => {
    const affiliates = [
        {
            title: 'Binance',
            description: 'La mayor exchange de criptomonedas del mundo. Trading spot, futuros y más.',
            offer: 'Hasta 100 USDT de bono + 0% comisiones',
            link: '#binance-affiliate',
            rating: 5,
            category: 'crypto' as const,
            featured: true,
        },
        {
            title: 'eToro',
            description: 'Plataforma de inversión social. Copia a los mejores traders automáticamente.',
            offer: 'Hasta $1000 sin comisiones',
            link: '#etoro-affiliate',
            rating: 4,
            category: 'broker' as const,
        },
        {
            title: 'Coinbase',
            description: 'Exchange regulado y seguro para principiantes en crypto.',
            offer: '$10 gratis al depositar $100',
            link: '#coinbase-affiliate',
            rating: 4,
            category: 'crypto' as const,
        },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Ofertas Recomendadas</h3>
            {affiliates.map((affiliate, index) => (
                <AffiliateCard
                    key={index}
                    {...affiliate}
                />
            ))}
        </div>
    );
};

// Componente para banner de afiliado horizontal
export const AffiliateBanner = () => {
    return (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6 my-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">
                        🚀 ¿Listo para invertir en crypto?
                    </h3>
                    <p className="text-green-100">
                        Únete a millones de usuarios en Binance y obtén hasta $100 USDT de bono.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <a
                        href="#binance-banner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-blue-600 hover:text-blue-700 font-bold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
                    >
                        Comenzar Ahora
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AffiliateCard;
