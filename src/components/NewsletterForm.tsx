'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterProps {
    className?: string;
    compact?: boolean;
    theme?: 'light' | 'dark';
}

export default function NewsletterForm({ className = '', compact = false, theme = 'light' }: NewsletterProps) {
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

    if (compact) {
        return (
            <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Newsletter
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    Recibe las mejores noticias de tech y finanzas.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Tu email"
                        disabled={status === 'loading'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 placeholder-gray-500 text-gray-900"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-3 p-3 rounded-lg flex items-center text-sm ${status === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {status === 'success' ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                        ) : (
                            <AlertCircle className="w-4 h-4 mr-2" />
                        )}
                        {message}
                    </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                    * No spam. Cancela cuando quieras.
                </p>
            </div>
        );
    }

    return (
        <div className={`${theme === 'dark' ? '' : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-6 text-center'} ${className}`}>
            {theme !== 'dark' && (
                <>
                    <h3 className="text-xl font-bold mb-2">
                        📧 ¡No te pierdas nada!
                    </h3>
                    <p className="mb-4">
                        Suscríbete para recibir las mejores noticias de tecnología y finanzas.
                    </p>
                </>
            )}

            <form onSubmit={handleSubmit} className={`flex ${theme === 'dark' ? 'flex-col sm:flex-row max-w-lg mx-auto gap-4' : 'max-w-md mx-auto'}`}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    disabled={status === 'loading'}
                    className={`${theme === 'dark'
                        ? 'flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                        : 'flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none disabled:opacity-50'
                        } ${theme === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-500'}`}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`${theme === 'dark'
                        ? 'bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors duration-200'
                        : 'bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 font-semibold px-6 py-2 rounded-r-lg transition-colors duration-200'
                        }`}
                >
                    {status === 'loading' ? (theme === 'dark' ? 'Suscribiendo...' : '...') : 'Suscribirse'}
                </button>
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded-lg flex items-center justify-center text-sm ${status === 'success'
                    ? (theme === 'dark' ? 'bg-green-500 bg-opacity-20 border border-green-300' : 'bg-green-500 bg-opacity-20 border border-green-300')
                    : (theme === 'dark' ? 'bg-red-500 bg-opacity-20 border border-red-300' : 'bg-red-500 bg-opacity-20 border border-red-300')
                    }`}>
                    {status === 'success' ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                        <AlertCircle className="w-4 h-4 mr-2" />
                    )}
                    {message}
                </div>
            )}

            {theme !== 'dark' && (
                <p className="text-xs text-purple-100 mt-3">
                    Unirse a +5,000 suscriptores. Sin spam, solo contenido de calidad.
                </p>
            )}
        </div>
    );
}
