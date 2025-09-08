'use client';

import { ReactNode, CSSProperties, useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
    threshold?: number;
    rootMargin?: string;
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    duration = 600,
    animation = 'fadeIn',
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px'
}: AnimatedSectionProps) {
    const [isMounted, setIsMounted] = useState(false);
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold, rootMargin });

    // Evitar hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getAnimationStyles = (): CSSProperties => {
        const baseStyles: CSSProperties = {
            transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            transitionDelay: `${delay}ms`,
        };

        // Durante SSR o antes del mount, mostrar sin animación para evitar hydration mismatch
        if (!isMounted) {
            return {
                opacity: 1,
                transform: 'translateY(0) translateX(0) scale(1)',
            };
        }

        if (!isInView) {
            switch (animation) {
                case 'fadeIn':
                    return {
                        ...baseStyles,
                        opacity: 0,
                    };
                case 'slideUp':
                    return {
                        ...baseStyles,
                        opacity: 0,
                        transform: 'translateY(30px)',
                    };
                case 'slideLeft':
                    return {
                        ...baseStyles,
                        opacity: 0,
                        transform: 'translateX(30px)',
                    };
                case 'slideRight':
                    return {
                        ...baseStyles,
                        opacity: 0,
                        transform: 'translateX(-30px)',
                    };
                case 'scaleIn':
                    return {
                        ...baseStyles,
                        opacity: 0,
                        transform: 'scale(0.95)',
                    };
                default:
                    return baseStyles;
            }
        }

        return {
            ...baseStyles,
            opacity: 1,
            transform: 'translateY(0) translateX(0) scale(1)',
        };
    };

    return (
        <div
            ref={ref}
            className={className}
            style={getAnimationStyles()}
            suppressHydrationWarning={true}
        >
            {children}
        </div>
    );
}
