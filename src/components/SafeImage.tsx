'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    fallbackSrc?: string;
    fallbackElement?: React.ReactNode;
}

const SafeImage = ({
    src,
    alt,
    fill,
    className,
    sizes,
    width,
    height,
    priority = false,
    fallbackSrc,
    fallbackElement,
}: SafeImageProps) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    // Si hay error y hay un fallback element personalizado, mostrarlo
    if (hasError && fallbackElement) {
        return <>{fallbackElement}</>;
    }

    // Si hay error y hay una imagen de fallback, usarla
    if (hasError && fallbackSrc) {
        return (
            <Image
                src={fallbackSrc}
                alt={alt}
                fill={fill}
                width={width}
                height={height}
                className={className}
                sizes={sizes}
                priority={priority}
                onError={() => setHasError(true)}
                onLoad={handleLoad}
            />
        );
    }

    // Si hay error y no hay fallback, mostrar placeholder
    if (hasError) {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                <div className="text-center text-gray-500">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-xs">Imagen no disponible</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {isLoading && (
                <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
            )}
            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={width}
                height={height}
                className={className}
                sizes={sizes}
                priority={priority}
                onError={handleError}
                onLoad={handleLoad}
                // Desactivar optimización para URLs problemáticas
                unoptimized={src.includes('ghacks.net') ||
                    src.includes('mmafighting.com') ||
                    src.includes('apnews.com') ||
                    src.includes('yimg.com') ||
                    src.includes('nextbigfuture.s3.amazonaws.com')}
            />
        </>
    );
};

export default SafeImage;
