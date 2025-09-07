import { NewsAPIResponse, NewsArticle, BlogPost } from '@/types/blog';

const NEWS_API_KEY = process.env.NEWS_API_KEY || 'demo';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Datos de demostración para desarrollo
const demoTechArticles: NewsArticle[] = [
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Sarah Perez',
    title: 'OpenAI lanza una nueva versión de ChatGPT con capacidades mejoradas de razonamiento',
    description: 'La nueva actualización incluye mejor comprensión contextual y capacidades de análisis más profundas para tareas complejas.',
    url: 'https://techcrunch.com/demo-article-1',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'OpenAI ha anunciado una actualización significativa de ChatGPT que promete revolucionar la forma en que interactuamos con la inteligencia artificial. Esta nueva versión incluye capacidades mejoradas de razonamiento que permiten al modelo abordar problemas más complejos con mayor precisión. Los desarrolladores podrán aprovechar estas mejoras para crear aplicaciones más sofisticadas y útiles.'
  },
  {
    source: { id: 'wired', name: 'Wired' },
    author: 'Michael Rodriguez',
    title: 'El futuro de la computación cuántica: nuevos avances prometen ordenadores ultra-rápidos',
    description: 'Investigadores logran un avance significativo en la corrección de errores cuánticos, acercándonos a la computación cuántica práctica.',
    url: 'https://wired.com/demo-article-2',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'Un equipo de investigadores ha logrado un avance crucial en la computación cuántica al desarrollar un nuevo método de corrección de errores que podría hacer viable la computación cuántica a gran escala. Este desarrollo promete revolucionar campos como la criptografía, la simulación molecular y la optimización de algoritmos.'
  },
  {
    source: { id: 'ars-technica', name: 'Ars Technica' },
    author: 'Jennifer Kim',
    title: 'Apple introduce chips M4 con arquitectura revolucionaria para MacBooks',
    description: 'Los nuevos procesadores M4 prometen un 40% más de rendimiento y mejor eficiencia energética.',
    url: 'https://arstechnica.com/demo-article-3',
    urlToImage: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'Apple ha presentado su nueva línea de chips M4, que representan un salto significativo en rendimiento y eficiencia. Estos procesadores utilizan una arquitectura de 3nm que permite mayor densidad de transistores y mejor gestión térmica, resultando en laptops más rápidas y con mayor autonomía de batería.'
  }
];

const demoFinanceArticles: NewsArticle[] = [
  {
    source: { id: 'coindesk', name: 'CoinDesk' },
    author: 'David Martinez',
    title: 'Bitcoin alcanza nuevo máximo histórico superando los $100,000',
    description: 'La criptomoneda líder continúa su rally alcista impulsada por la adopción institucional y regulaciones favorables.',
    url: 'https://coindesk.com/demo-article-1',
    urlToImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'Bitcoin ha roto todos los récords anteriores al superar la marca de $100,000 por primera vez en su historia. Este hito refleja la creciente confianza institucional en las criptomonedas y el impacto de las recientes regulaciones favorables en varios países desarrollados.'
  },
  {
    source: { id: 'bloomberg', name: 'Bloomberg' },
    author: 'Lisa Thompson',
    title: 'Las mejores fintech de 2024: revolucionando los servicios bancarios digitales',
    description: 'Análisis de las startups financieras que están transformando la industria con innovación y tecnología.',
    url: 'https://bloomberg.com/demo-article-2',
    urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: 'El sector fintech continúa expandiéndose con nuevas empresas que ofrecen soluciones bancarias más eficientes y accesibles. Desde pagos móviles hasta préstamos algorítmicos, estas compañías están redefiniendo cómo las personas gestionan sus finanzas personales.'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Carlos Rodriguez',
    title: 'Los bancos centrales consideran nuevas políticas monetarias para 2025',
    description: 'Análisis de las próximas decisiones de política monetaria y su impacto en la economía global.',
    url: 'https://reuters.com/demo-article-3',
    urlToImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    content: 'Los principales bancos centrales del mundo están evaluando nuevas estrategias monetarias para abordar los desafíos económicos del próximo año. Las decisiones incluyen ajustes en las tasas de interés y nuevos programas de estímulo económico.'
  }
];

const demoBusinessArticles: NewsArticle[] = [
  {
    source: { id: 'business-insider', name: 'Business Insider' },
    author: 'Alex Chen',
    title: 'Las startups más prometedoras de 2024: tecnología que cambiará el mundo',
    description: 'Un vistazo a las empresas emergentes que están captando la atención de los inversores este año.',
    url: 'https://businessinsider.com/demo-article-1',
    urlToImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'El ecosistema de startups continúa floreciendo con empresas innovadoras que abordan problemas globales. Desde soluciones de energía renovable hasta plataformas de educación digital, estas compañías están atrayendo inversiones millonarias.'
  },
  {
    source: { id: 'forbes', name: 'Forbes' },
    author: 'Maria Gonzalez',
    title: 'Tendencias de inversión para 2025: dónde poner tu dinero',
    description: 'Expertos analizan las mejores oportunidades de inversión para el próximo año.',
    url: 'https://forbes.com/demo-article-2',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 2700000).toISOString(),
    content: 'Los analistas financieros identifican sectores prometedores para la inversión en 2025, incluyendo tecnología verde, inteligencia artificial y biotecnología. Las estrategias de diversificación serán clave para maximizar retornos.'
  }
];

// Funciones para obtener noticias de diferentes categorías
export async function getTechnologyNews(page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  try {
    // Si tenemos una API key válida, usar la API real
    if (NEWS_API_KEY !== 'demo' && NEWS_API_KEY !== 'a52b8a8ca84d4f1484b5d8cd505394be') {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/everything?q=technology OR programming OR software OR AI OR tech startup&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { next: { revalidate: 3600 } } // Cache por 1 hora
      );
      
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Usar datos de demostración
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = demoTechArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: demoTechArticles.length,
      articles
    };
  } catch (error) {
    console.error('Error fetching technology news:', error);
    return { status: 'error', totalResults: 0, articles: [] };
  }
}

export async function getFinanceNews(page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  try {
    // Si tenemos una API key válida, usar la API real
    if (NEWS_API_KEY !== 'demo' && NEWS_API_KEY !== 'a52b8a8ca84d4f1484b5d8cd505394be') {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/everything?q=finance OR cryptocurrency OR bitcoin OR stock market OR investment OR fintech&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Usar datos de demostración
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = demoFinanceArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: demoFinanceArticles.length,
      articles
    };
  } catch (error) {
    console.error('Error fetching finance news:', error);
    return { status: 'error', totalResults: 0, articles: [] };
  }
}

export async function getBusinessNews(page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  try {
    // Si tenemos una API key válida, usar la API real
    if (NEWS_API_KEY !== 'demo' && NEWS_API_KEY !== 'a52b8a8ca84d4f1484b5d8cd505394be') {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/top-headlines?category=business&language=en&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Usar datos de demostración
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = demoBusinessArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: demoBusinessArticles.length,
      articles
    };
  } catch (error) {
    console.error('Error fetching business news:', error);
    return { status: 'error', totalResults: 0, articles: [] };
  }
}

// Función para obtener todas las noticias combinadas
export async function getAllNews(page: number = 1, pageSize: number = 12): Promise<NewsAPIResponse> {
  try {
    const [techNews, financeNews, businessNews] = await Promise.all([
      getTechnologyNews(1, 4),
      getFinanceNews(1, 4), 
      getBusinessNews(1, 4)
    ]);
    
    const allArticles = [
      ...techNews.articles,
      ...financeNews.articles,
      ...businessNews.articles
    ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = allArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: allArticles.length,
      articles: paginatedArticles
    };
  } catch (error) {
    console.error('Error fetching all news:', error);
    return { status: 'error', totalResults: 0, articles: [] };
  }
}

// Función para obtener noticias por categoría
export async function getNewsByCategory(category: string, page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  switch (category.toLowerCase()) {
    case 'technology':
    case 'tech':
      return getTechnologyNews(page, pageSize);
    case 'finance':
    case 'finanzas':
      return getFinanceNews(page, pageSize);
    case 'business':
    case 'negocios':
      return getBusinessNews(page, pageSize);
    default:
      return getTechnologyNews(page, pageSize);
  }
}

// Función para generar un ID único basado en la URL
function generateId(url: string): string {
  // Crear un hash más único usando timestamp y URL
  const timestamp = Date.now().toString(36);
  const urlHash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
  return `${urlHash.substring(0, 8)}_${timestamp}_${Math.random().toString(36).substring(2, 6)}`;
}

// Función para extraer tags relevantes del título y descripción
function extractTags(text: string): string[] {
  const techKeywords = ['AI', 'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'fintech', 'startup', 'investment', 'stock', 'market', 'technology', 'software', 'programming', 'development'];
  const words = text.toLowerCase().split(/\s+/);
  const foundTags = techKeywords.filter(keyword => 
    words.some(word => word.includes(keyword.toLowerCase()))
  );
  
  return foundTags.slice(0, 5); // Máximo 5 tags
}

// Función para calcular tiempo de lectura estimado
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Función para convertir un artículo de NewsAPI a nuestro formato BlogPost
export function convertNewsArticleToBlogPost(article: NewsArticle, category: 'technology' | 'finance' | 'general'): BlogPost {
  return {
    id: generateId(article.url),
    title: article.title,
    description: article.description || '',
    content: article.content || article.description || '',
    category,
    tags: extractTags(article.title + ' ' + article.description),
    imageUrl: article.urlToImage || undefined,
    publishedAt: article.publishedAt,
    author: article.author || article.source.name || 'Unknown',
    readTime: calculateReadTime(article.content || article.description || ''),
    source: article.source.name,
    sourceUrl: article.url
  };
}

// Función para obtener artículos mezclados de todas las categorías
export async function getMixedNews(pageSize: number = 20): Promise<BlogPost[]> {
  try {
    const [techNews, financeNews, businessNews] = await Promise.all([
      getTechnologyNews(1, Math.ceil(pageSize / 3)),
      getFinanceNews(1, Math.ceil(pageSize / 3)),
      getBusinessNews(1, Math.ceil(pageSize / 3))
    ]);

    const allPosts: BlogPost[] = [
      ...techNews.articles.map(article => convertNewsArticleToBlogPost(article, 'technology')),
      ...financeNews.articles.map(article => convertNewsArticleToBlogPost(article, 'finance')),
      ...businessNews.articles.map(article => convertNewsArticleToBlogPost(article, 'general'))
    ];

    // Eliminar duplicados basados en títulos similares y URLs
    const uniquePosts = allPosts.filter((post, index, self) => 
      index === self.findIndex(p => p.sourceUrl === post.sourceUrl || p.title === post.title)
    );

    // Mezclar y ordenar por fecha
    return uniquePosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, pageSize);
  } catch (error) {
    console.error('Error fetching mixed news:', error);
    
    // Retornar datos de fallback si hay error
    const allPosts: BlogPost[] = [
      ...demoTechArticles.map(article => convertNewsArticleToBlogPost(article, 'technology')),
      ...demoFinanceArticles.map(article => convertNewsArticleToBlogPost(article, 'finance')),
      ...demoBusinessArticles.map(article => convertNewsArticleToBlogPost(article, 'general'))
    ];

    // Eliminar duplicados en los datos de fallback también
    const uniquePosts = allPosts.filter((post, index, self) => 
      index === self.findIndex(p => p.sourceUrl === post.sourceUrl || p.title === post.title)
    );

    return uniquePosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, pageSize);
  }
}
