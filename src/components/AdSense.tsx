'use client';

import { useEffect } from 'react';

interface AdSenseProps {
    adSlot: string;
    adFormat?: string;
    fullWidthResponsive?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdSense({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    style = { display: 'block' },
    className = ''
}: AdSenseProps) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (error) {
                console.error('AdSense error:', error);
            }
        }
    }, []);

    // Solo mostrar en producción
    if (process.env.NODE_ENV !== 'production') {
        return (
            <div
                className={`bg-gray-200 border-2 border-dashed border-gray-400 p-4 text-center text-gray-600 ${className}`}
                style={style}
            >
                <p className="text-sm">AdSense Ad Placeholder</p>
                <p className="text-xs">Slot: {adSlot}</p>
            </div>
        );
    }

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={style}
            data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive.toString()}
        />
    );
}

// Componentes predefinidos para diferentes tipos de anuncios
export function BannerAd({ className }: { className?: string }) {
    return (
        <AdSense
            adSlot="1234567890" // Reemplazar con tu slot real
            adFormat="horizontal"
            style={{ display: 'block', width: '100%', height: '280px' }}
            className={className}
        />
    );
}

export function SidebarAd({ className }: { className?: string }) {
    return (
        <AdSense
            adSlot="0987654321" // Reemplazar con tu slot real
            adFormat="rectangle"
            style={{ display: 'block', width: '300px', height: '250px' }}
            className={className}
        />
    );
}

export function InArticleAd({ className }: { className?: string }) {
    return (
        <AdSense
            adSlot="1122334455" // Reemplazar con tu slot real
            adFormat="fluid"
            style={{ display: 'block', textAlign: 'center' }}
            className={className}
        />
    );
}
