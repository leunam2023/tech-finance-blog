'use client';

import { useState, useEffect } from 'react';
import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [isClient, setIsClient] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
    }, []);

    const handleNativeShare = async () => {
        if (canShare) {
            try {
                await navigator.share({ title, url });
            } catch {
                // Si falla, copiar al portapapeles como fallback
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    alert('¡Enlace copiado al portapapeles!');
                }
            }
        }
    };

    if (!isClient) {
        // Renderizado del servidor - mostrar placeholders
        return (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    📱 Comparte esta noticia
                </h3>
                <div className="flex justify-center space-x-4">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <Twitter className="w-5 h-5" />
                    </div>
                    <div className="bg-blue-700 text-white p-3 rounded-full">
                        <Facebook className="w-5 h-5" />
                    </div>
                    <div className="bg-blue-600 text-white p-3 rounded-full">
                        <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="bg-gray-600 text-white p-3 rounded-full">
                        <Share2 className="w-5 h-5" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                📱 Comparte esta noticia
            </h3>
            <div className="flex justify-center space-x-4">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200"
                    title="Compartir en Twitter"
                >
                    <Twitter className="w-5 h-5" />
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full transition-colors duration-200"
                    title="Compartir en Facebook"
                >
                    <Facebook className="w-5 h-5" />
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
                    title="Compartir en LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                </a>
                {canShare && (
                    <button
                        onClick={handleNativeShare}
                        className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                        title="Compartir"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                )}
                {!canShare && (
                    <button
                        onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(url);
                                alert('¡Enlace copiado al portapapeles!');
                            }
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200"
                        title="Copiar enlace"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
