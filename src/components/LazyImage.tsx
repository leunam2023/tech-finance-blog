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
    placeholder?: string;
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
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Im0xNS4zNjIxIDI1LjA1IDMuNTMzNy00LjcxMTZMMjIuNDk5NyAyNWgwbDIuNS0zLjMzMzNMMjggMjcuNVY0MGgtMTlWMjUuMDVaIiBmaWxsPSIjQzFDN0NEIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTUiIHI9IjIiIGZpbGw9IiNDMUM3Q0QiLz4KPC9zdmc+Cg=='
}: LazyImageProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1, rootMargin: '50px' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const imageProps = {
        src: isInView ? src : placeholder,
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
                className={`${className} bg-gray-200 flex items-center justify-center`}
            >
                <div className="text-gray-400 text-sm">Error al cargar imagen</div>
            </div>
        );
    }

    return (
        <div ref={ref} className="relative">
            {isInView && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image {...imageProps} />
            )}
            {!isLoaded && isInView && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
}
