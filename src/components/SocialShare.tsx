'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link, Mail, MessageCircle, Check } from 'lucide-react';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
    hashtags?: string[];
    via?: string;
}

export default function SocialShare({
    url,
    title,
    description = '',
    hashtags = [],
    via = 'TechFinanceBlog'
}: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const hashtagString = hashtags.length > 0 ? encodeURIComponent(hashtags.join(',')) : '';

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=${via}${hashtagString ? `&hashtags=${hashtagString}` : ''}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
        whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error copying to clipboard:', err);
        }
    };

    const openShareWindow = (shareUrl: string) => {
        window.open(
            shareUrl,
            'share-window',
            'width=600,height=400,scrollbars=yes,resizable=yes'
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📢</span>
                Comparte este artículo
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Twitter */}
                <button
                    onClick={() => openShareWindow(shareLinks.twitter)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Compartir en Twitter"
                >
                    <Twitter className="w-4 h-4" />
                    <span className="hidden sm:inline">Twitter</span>
                </button>

                {/* Facebook */}
                <button
                    onClick={() => openShareWindow(shareLinks.facebook)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Compartir en Facebook"
                >
                    <Facebook className="w-4 h-4" />
                    <span className="hidden sm:inline">Facebook</span>
                </button>

                {/* LinkedIn */}
                <button
                    onClick={() => openShareWindow(shareLinks.linkedin)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Compartir en LinkedIn"
                >
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                </button>

                {/* WhatsApp */}
                <button
                    onClick={() => openShareWindow(shareLinks.whatsapp)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Compartir en WhatsApp"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                </button>

                {/* Email */}
                <button
                    onClick={() => window.location.href = shareLinks.email}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Compartir por email"
                >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Email</span>
                </button>

                {/* Copy Link */}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                    title="Copiar enlace"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Copiado</span>
                        </>
                    ) : (
                        <>
                            <Link className="w-4 h-4" />
                            <span className="hidden sm:inline">Copiar</span>
                        </>
                    )}
                </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                    ¡Ayúdanos a crecer compartiendo nuestro contenido! 🚀
                </p>
            </div>
        </div>
    );
}

// Componente ligero para redes sociales específicas
export function QuickShare({ url, title }: { url: string; title: string }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const quickLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };

    const openShare = (platform: keyof typeof quickLinks) => {
        window.open(quickLinks[platform], 'share', 'width=600,height=400');
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Compartir:</span>
            <button
                onClick={() => openShare('twitter')}
                className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Compartir en Twitter"
            >
                <Twitter className="w-4 h-4" />
            </button>
            <button
                onClick={() => openShare('facebook')}
                className="p-2 text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Compartir en Facebook"
            >
                <Facebook className="w-4 h-4" />
            </button>
            <button
                onClick={() => openShare('linkedin')}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Compartir en LinkedIn"
            >
                <Linkedin className="w-4 h-4" />
            </button>
        </div>
    );
}
