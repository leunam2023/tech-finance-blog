import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { generateHomeMetadata } from "@/lib/seo";
import Script from 'next/script';

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Datos estructurados para el sitio web
  const websiteData = {
    name: "TechFinance Blog",
    url: "https://tech-finance-blog.vercel.app",
    description: "Blog especializado en tecnología y finanzas con noticias, análisis y consejos para profesionales y entusiastas.",
    publisher: "TechFinance Blog",
    language: "es"
  };

  const organizationData = {
    name: "TechFinance Blog",
    url: "https://tech-finance-blog.vercel.app",
    description: "Plataforma digital especializada en contenido de tecnología y finanzas",
    logo: "https://tech-finance-blog.vercel.app/logo.png",
    sameAs: [
      "https://twitter.com/techfinanceblog",
      "https://linkedin.com/company/techfinanceblog"
    ]
  };

  return (
    <html lang="es" className="font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-4107404773575160" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4107404773575160"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased bg-gray-50 min-h-screen flex flex-col">
        {/* Datos estructurados del sitio web */}
        <StructuredData type="website" data={websiteData} />
        <StructuredData type="organization" data={organizationData} />

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
