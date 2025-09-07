'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    sizes?: string;
    priority?: boolean;
}

export default function LazyImage({
    src,
    alt,
    className = '',
    fill = false,
    width,
    height,
    sizes,
    priority = false,
}: LazyImageProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '50px' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const imageProps = {
        src,
        alt,
        className: `${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
        onLoad: () => setIsLoaded(true),
        onError: () => setHasError(true),
        ...(fill && { fill: true }),
        ...(width && height && { width, height }),
        ...(sizes && { sizes }),
        ...(priority && { priority }),
    };

    if (hasError) {
        return (
            <div
                ref={ref}
                className={`${className} ${fill ? 'absolute inset-0' : ''} bg-gray-200 flex items-center justify-center`}
            >
                <div className="text-gray-400 text-sm">Error al cargar imagen</div>
            </div>
        );
    }

    return (
        <div ref={ref} className="relative w-full h-full">
            {isInView ? (
                <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image {...imageProps} />
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                </>
            ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                </div>
            )}
        </div>
    );
}
