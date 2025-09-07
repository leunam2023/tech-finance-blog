'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(options: UseInViewOptions = {}) {
    const [isInView, setIsInView] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const ref = useRef<T>(null);

    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Si ya se activó una vez y triggerOnce es true, no hacer nada
        if (hasTriggered && triggerOnce) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;
                setIsInView(inView);
                
                if (inView && triggerOnce) {
                    setHasTriggered(true);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce, hasTriggered]);

    return { ref, isInView: triggerOnce ? (hasTriggered || isInView) : isInView };
}
