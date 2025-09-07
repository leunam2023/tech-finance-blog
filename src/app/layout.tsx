import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseScript from "@/components/AdSenseScript";
import { generateHomeMetadata } from "@/lib/seo";
import Script from 'next/script';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Debug logging - REMOVER EN PRODUCCIÓN
  console.log('AdSense ID:', adsenseId);
  console.log('GA ID:', gaId);

  return (
    <html lang="es" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-4107404773575160" />
      </head>
      <body className="antialiased bg-gray-50 min-h-screen flex flex-col">
        <AdSenseScript />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        {/* Google Analytics - Solo cargar si hay ID configurado */}
        {gaId && gaId !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
