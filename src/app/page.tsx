import BlogCard from '@/components/BlogCard';
import { NativeAd } from '@/components/AdBanner';
import { BannerAd } from '@/components/AdSense';
import { AffiliateBanner, AffiliateSidebar } from '@/components/AffiliateCard';
import StarkTechnologiaBanner, { StarkTechnologiaSidebar } from '@/components/StarkTechnologiaBanner';
import NewsletterForm from '@/components/NewsletterForm';
import AnimatedSection from '@/components/AnimatedSection';
import SafeImage from '@/components/SafeImage';
import { getMixedNews } from '@/lib/newsApi';
import { TrendingUp, Smartphone, DollarSign, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  // Obtener noticias mezcladas de todas las categorías
  const posts = await getMixedNews(12);

  const featuredPost = posts[0];
  const mainPosts = posts.slice(1, 7);
  const latestPosts = posts.slice(7);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" delay={0}>
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                TechFinance <span className="text-yellow-400">Blog</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Tu fuente confiable de noticias sobre tecnología, finanzas y criptomonedas.
                Mantente actualizado con las últimas tendencias del mercado.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                <div className="flex items-center bg-black bg-opacity-20 rounded-full px-4 py-2 text-white">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Tecnología
                </div>
                <div className="flex items-center bg-black bg-opacity-20 rounded-full px-4 py-2 text-white">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Finanzas
                </div>
                <div className="flex items-center bg-black bg-opacity-20 rounded-full px-4 py-2 text-white">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Inversiones
                </div>
                <div className="flex items-center bg-black bg-opacity-20 rounded-full px-4 py-2 text-white">
                  <Clock className="w-5 h-5 mr-2" />
                  Actualizado 24/7
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Anuncio banner horizontal - AdSense */}
      <AnimatedSection animation="fadeIn" delay={100}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BannerAd className="mx-auto" />
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            {/* Artículo destacado */}
            {featuredPost && (
              <AnimatedSection animation="slideUp" delay={200}>
                <section className="mb-12">
                  <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Artículo Destacado</h2>
                    <div className="ml-4 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-full">
                      ⭐ DESTACADO
                    </div>
                  </div>
                  <BlogCard post={featuredPost} featured={true} />
                </section>
              </AnimatedSection>
            )}

            {/* Banner de Stark Tecnología - Oportunidad de Inversión */}
            <AnimatedSection animation="fadeIn" delay={300}>
              <section className="mb-12">
                <StarkTechnologiaBanner />
              </section>
            </AnimatedSection>

            {/* Banner de afiliado */}
            <AnimatedSection animation="slideLeft" delay={400}>
              <AffiliateBanner />
            </AnimatedSection>

            {/* Últimas noticias */}
            <AnimatedSection animation="slideUp" delay={500}>
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Últimas Noticias</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Actualizado hace minutos
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainPosts.map((post, index) => (
                    <AnimatedSection
                      key={post.id}
                      animation="slideUp"
                      delay={600 + (index * 100)}
                    >
                      <div>
                        <BlogCard post={post} />
                        {/* Anuncio nativo cada 3 artículos */}
                        {(index + 1) % 3 === 0 && <NativeAd />}
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Más artículos */}
            {latestPosts.length > 0 && (
              <AnimatedSection animation="fadeIn" delay={800}>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Más Artículos</h2>
                  <div className="space-y-6">
                    {latestPosts.map((post, index) => (
                      <AnimatedSection
                        key={post.id}
                        animation="slideLeft"
                        delay={900 + (index * 150)}
                      >
                        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="sm:w-1/3 h-48 sm:h-auto relative">
                            {post.imageUrl ? (
                              <SafeImage
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">
                                  {post.category === 'technology' ? 'T' : post.category === 'finance' ? 'F' : 'G'}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex items-center mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${post.category === 'technology'
                                ? 'bg-blue-100 text-blue-800'
                                : post.category === 'finance'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                                }`}>
                                {post.category === 'technology' ? 'Tecnología' : post.category === 'finance' ? 'Finanzas' : 'General'}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">{post.readTime} min lectura</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {post.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">{post.author}</span>
                              <time className="text-sm text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                              </time>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </section>
              </AnimatedSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-8">
              {/* Stark Tecnología - Oportunidad de Inversión */}
              <AnimatedSection animation="slideLeft" delay={300}>
                <StarkTechnologiaSidebar />
              </AnimatedSection>

              {/* Sidebar de afiliados */}
              <AnimatedSection animation="slideLeft" delay={400}>
                <AffiliateSidebar />
              </AnimatedSection>

              {/* Newsletter */}
              <AnimatedSection animation="slideLeft" delay={500}>
                <NewsletterForm compact={true} />
              </AnimatedSection>

              {/* Categorías populares */}
              <AnimatedSection animation="slideLeft" delay={600}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Categorías Populares</h3>
                  <div className="space-y-3">
                    <Link href="/blog/technology" className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium text-gray-900">Tecnología</span>
                      </div>
                      <span className="text-sm text-gray-500">142 artículos</span>
                    </Link>
                    <Link href="/blog/finance" className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium text-gray-900">Finanzas</span>
                      </div>
                      <span className="text-sm text-gray-500">89 artículos</span>
                    </Link>
                    <Link href="/blog/general" className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200">
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-pink-600 mr-3" />
                        <span className="font-medium text-gray-900">General</span>
                      </div>
                      <span className="text-sm text-gray-500">76 artículos</span>
                    </Link>
                    <Link href="/blog/trending" className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium text-gray-900">Tendencias</span>
                      </div>
                      <span className="text-sm text-gray-500">67 artículos</span>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
