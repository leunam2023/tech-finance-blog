'use client';

import { useEffect } from 'react';

interface AdBannerProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    fullWidthResponsive?: boolean;
    className?: string;
}

const AdBanner = ({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = ''
}: AdBannerProps) => {
    useEffect(() => {
        try {
            // @ts-expect-error - AdSense global variable
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`ad-container ${className}`}>
            <ins
                className="adsbygoogle block"
                data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-xxxxxxxxxxxxxxxx'}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
};

// Componente para anuncio banner horizontal
export const HorizontalAd = ({ className }: { className?: string }) => (
    <AdBanner
        adSlot="1234567890"
        adFormat="horizontal"
        className={`my-8 text-center ${className || ''}`}
    />
);

// Componente para anuncio cuadrado
export const SquareAd = ({ className }: { className?: string }) => (
    <AdBanner
        adSlot="0987654321"
        adFormat="rectangle"
        className={`my-4 min-h-[280px] ${className || ''}`}
    />
);

// Componente para anuncio vertical (sidebar)
export const SidebarAd = ({ className }: { className?: string }) => (
    <AdBanner
        adSlot="5678901234"
        adFormat="vertical"
        className={`sticky top-20 min-h-[600px] ${className || ''}`}
    />
);

// Componente para anuncio nativo (integrado en el contenido)
export const NativeAd = ({ className }: { className?: string }) => (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 my-6 ${className || ''}`}>
        <p className="text-xs text-gray-500 mb-2 text-center">Publicidad</p>
        <AdBanner
            adSlot="2468013579"
            adFormat="auto"
            fullWidthResponsive={true}
        />
    </div>
);

export default AdBanner;
