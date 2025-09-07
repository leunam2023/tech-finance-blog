'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, X, Instagram, Linkedin, Mail, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Por favor, ingresa un email válido');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Error al suscribirse');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setStatus('error');
            setMessage('Error de conexión. Inténtalo de nuevo.');
        }

        // Limpiar el mensaje después de 5 segundos
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    const quickLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Tecnología', href: '/blog/technology' },
        { name: 'Finanzas', href: '/blog/finance' },
        { name: 'General', href: '/blog/general' },
        { name: 'Sobre Nosotros', href: '/about' },
    ];

    const legalLinks = [
        { name: 'Política de Privacidad', href: '/privacy' },
        { name: 'Términos de Uso', href: '/terms' },
        { name: 'Contacto', href: '/contact' },
    ];

    const affiliateLinks = [
        { name: 'Binance - Trading Crypto', href: '#', description: 'Comisiones 0% en spot' },
        { name: 'eToro - Inversión Social', href: '#', description: 'Copia a inversores exitosos' },
        { name: 'Amazon - Libros de Finanzas', href: '#', description: 'Los mejores libros de inversión' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo y descripción */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                                TF
                            </div>
                            <span className="ml-2 text-xl font-bold">TechFinance</span>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Tu fuente confiable de información sobre tecnología, finanzas y criptomonedas.
                            Mantente actualizado con las últimas tendencias y oportunidades de inversión.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                            <form onSubmit={handleSubmit} className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Tu email"
                                    disabled={status === 'loading'}
                                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-50 placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-r-lg transition-colors duration-200"
                                    aria-label="Suscribirse al newsletter"
                                    title="Suscribirse"
                                >
                                    {status === 'loading' ? '...' : <Mail className="w-5 h-5" />}
                                </button>
                            </form>

                            {/* Mensaje de estado */}
                            {message && (
                                <div className={`mt-3 p-2 rounded-lg flex items-center text-sm ${status === 'success'
                                        ? 'bg-green-900 bg-opacity-50 text-green-300 border border-green-700'
                                        : 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700'
                                    }`}>
                                    {status === 'success' ? (
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                    )}
                                    {message}
                                </div>
                            )}
                        </div>

                        {/* Redes sociales */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Síguenos en Facebook"
                                title="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Síguenos en X (Twitter)"
                                title="X (Twitter)"
                            >
                                <X className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Síguenos en Instagram"
                                title="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Síguenos en LinkedIn"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold mb-4 mt-8">Legal</h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partners y afiliados */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Partners Recomendados</h3>
                        <div className="space-y-4">
                            {affiliateLinks.map((affiliate) => (
                                <div key={affiliate.name} className="border border-gray-700 rounded-lg p-3 hover:border-blue-500 transition-colors duration-200">
                                    <a href={affiliate.href} className="block group">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-semibold text-white group-hover:text-blue-400">
                                                    {affiliate.name}
                                                </h4>
                                                <p className="text-xs text-gray-400">
                                                    {affiliate.description}
                                                </p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="text-center text-gray-400 text-sm">
                        <p className="mb-2">
                            ⚠️ <strong>Disclaimer:</strong> Este contenido es solo informativo. No constituye asesoramiento financiero.
                            Las inversiones conllevan riesgos y puedes perder tu capital.
                        </p>
                        <p>
                            © {currentYear} TechFinance Blog. Todos los derechos reservados.
                            <span className="ml-2">
                                Algunos enlaces son de afiliados y podemos recibir comisiones.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
