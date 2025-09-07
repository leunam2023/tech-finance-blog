import Script from 'next/script';

export default function AdSenseScript() {
    const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

    // Solo cargar en producción o si hay ID configurado
    if (!adsenseId || adsenseId === 'ca-pub-xxxxxxxxxxxxxxxx') {
        return null;
    }

    return (
        <>
            <Script
                id="adsense-script"
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
                crossOrigin="anonymous"
                strategy="beforeInteractive"
            />
        </>
    );
}
