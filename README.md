# TechFinance Blog

Un blog moderno sobre tecnología y finanzas construido con Next.js, optimizado para SEO y monetización.

## 🚀 Características

- **⚡ Next.js 15** con App Router y TypeScript
- **🎨 Tailwind CSS** para diseño moderno y responsivo
- **📰 API de Noticias** integración automática con NewsAPI
- **🔍 SEO Optimizado** con metadatos dinámicos y sitemap
- **💰 Monetización Integrada**:
  - Google AdSense
  - Enlaces de afiliados
  - Newsletter
  - Banners promocionales
- **📱 Diseño Responsivo** optimizado para móviles
- **🎯 Performance** optimizado para Core Web Vitals

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo>
cd tech-finance-blog
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.local.example .env.local
```

4. Configura tu archivo `.env.local`:
```env
# NewsAPI Configuration
NEWS_API_KEY=tu_news_api_key

# Google AdSense Configuration
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx

# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Ejecuta el proyecto en desarrollo:
```bash
npm run dev
```

## 🔧 Configuración

### NewsAPI
1. Regístrate en [NewsAPI](https://newsapi.org/)
2. Obtén tu API key
3. Agrégala a tu `.env.local`

### Google AdSense
1. Regístrate en [Google AdSense](https://www.google.com/adsense/)
2. Obtén tu Publisher ID
3. Configura los ad slots en los componentes

### Google Analytics
1. Crea una propiedad en [Google Analytics](https://analytics.google.com/)
2. Obtén tu Measurement ID
3. Agrégalo a tu `.env.local`

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API routes
│   ├── blog/              # Páginas del blog
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── AdBanner.tsx       # Componentes de anuncios
│   ├── AffiliateCard.tsx  # Tarjetas de afiliados
│   ├── BlogCard.tsx       # Tarjetas de artículos
│   ├── Footer.tsx         # Footer
│   └── Header.tsx         # Header
├── lib/                   # Utilidades y configuración
│   ├── newsApi.ts         # Cliente de NewsAPI
│   └── seo.ts             # Utilidades de SEO
└── types/                 # Tipos de TypeScript
    └── blog.ts            # Tipos del blog
```

## 💰 Estrategias de Monetización

### 1. Google AdSense
- Banners horizontales
- Anuncios nativos
- Sidebar ads
- Anuncios responsive

### 2. Marketing de Afiliados
- Exchanges de criptomonedas (Binance, Coinbase)
- Brokers de inversión (eToro, Plus500)
- Productos tecnológicos (Amazon)
- Servicios financieros

### 3. Newsletter
- Captura de leads
- Email marketing
- Contenido premium
- Patrocinios

### 4. Contenido Patrocinado
- Reviews de productos
- Artículos patrocinados
- Colocación de productos

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta .next a Netlify
```

### Manual
```bash
npm run build
npm start
```

## 📈 SEO y Performance

- **Sitemap automático** con next-sitemap
- **Metadatos dinámicos** para cada página
- **Open Graph** y Twitter Cards
- **Schema.org** structured data
- **Core Web Vitals** optimizado
- **Imágenes optimizadas** con Next.js Image

## 🔄 Actualización de Contenido

El blog se actualiza automáticamente cada hora usando:
- NewsAPI para noticias de tecnología
- NewsAPI para noticias financieras
- Cache de Next.js para optimizar rendimiento

## 📝 Personalización

### Cambiar Categorías
Edita `src/lib/newsApi.ts` para modificar las categorías y keywords de búsqueda.

### Añadir Nuevos Afiliados
Edita `src/components/AffiliateCard.tsx` para agregar nuevos partners.

### Modificar Diseño
Utiliza las clases de Tailwind CSS en los componentes para personalizar el diseño.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un issue en GitHub
- Contacta por email: tu-email@ejemplo.com

---

**¡Feliz blogging! 🚀**
