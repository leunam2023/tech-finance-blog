'use client';

import { useEffect } from 'react';

export default function AdSenseScript() {
    const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

    useEffect(() => {
        // Solo cargar en producción o si hay ID configurado
        if (!adsenseId || adsenseId === 'ca-pub-xxxxxxxxxxxxxxxx') {
            return;
        }

        // Verificar si el script ya existe
        const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
        if (existingScript) {
            return;
        }

        // Crear y agregar el script manualmente
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`;
        script.crossOrigin = 'anonymous';

        // Agregar al head
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            const scriptToRemove = document.querySelector(`script[src*="adsbygoogle.js"]`);
            if (scriptToRemove) {
                document.head.removeChild(scriptToRemove);
            }
        };
    }, [adsenseId]);

    return null; // No renderizar nada en el DOM
}
