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

const demoTrendingArticles: NewsArticle[] = [
  {
    source: { id: 'techcrunch', name: 'TechCrunch' },
    author: 'Alex Rivera',
    title: '🔥 Meta lanza nuevas gafas de realidad aumentada que cambiarán todo',
    description: 'Las nuevas Meta AR Glasses prometen revolucionar la forma en que interactuamos con el mundo digital.',
    url: 'https://techcrunch.com/demo-trending-1',
    urlToImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'Meta ha presentado sus gafas de realidad aumentada más avanzadas hasta la fecha, prometiendo una experiencia inmersiva sin precedentes. Estas gafas incorporan tecnología de seguimiento ocular y procesamiento neuronal que permite una interacción más natural con elementos digitales superpuestos al mundo real.'
  },
  {
    source: { id: 'coindesk', name: 'CoinDesk' },
    author: 'Sarah Bitcoin',
    title: '💰 Ethereum 2.0 alcanza milestone histórico con 32 millones de ETH stakked',
    description: 'La red Ethereum confirma su transición exitosa con niveles de participación récord en el staking.',
    url: 'https://coindesk.com/demo-trending-2',
    urlToImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: 'Ethereum 2.0 ha alcanzado un hito histórico con más de 32 millones de ETH comprometidos en staking, representando aproximadamente el 27% del suministro total de Ethereum. Este nivel de participación demuestra la confianza de la comunidad en la red proof-of-stake.'
  },
  {
    source: { id: 'bloomberg', name: 'Bloomberg' },
    author: 'Tech Insider',
    title: '🚀 Tesla revela su robot humanoide: Optimus Gen-2 ya está en producción',
    description: 'El nuevo robot de Tesla promete revolucionar la automatización doméstica e industrial.',
    url: 'https://bloomberg.com/demo-trending-3',
    urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'Tesla ha anunciado que su robot humanoide Optimus Gen-2 ha entrado en fase de producción limitada. El robot, diseñado para tareas domésticas y de manufactura, incorpora la tecnología de IA más avanzada de la compañía y promete estar disponible para consumidores a finales de 2025.'
  },
  {
    source: { id: 'wired', name: 'Wired' },
    author: 'Future Tech',
    title: '🌟 Google anuncia Gemini Ultra: la IA que supera a GPT-4 en todos los benchmarks',
    description: 'La nueva versión de Gemini establece nuevos récords en razonamiento, matemáticas y programación.',
    url: 'https://wired.com/demo-trending-4',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    content: 'Google DeepMind ha presentado Gemini Ultra, su modelo de IA más avanzado que supera a GPT-4 en todos los benchmarks estándar de la industria. El modelo destaca especialmente en razonamiento matemático, programación y comprensión multimodal, estableciendo un nuevo estándar para los modelos de lenguaje.'
  },
  {
    source: { id: 'forbes', name: 'Forbes' },
    author: 'Market Watch',
    title: '📈 Las 10 startups más valiosas de 2024: unicornios que dominan el mercado',
    description: 'Análisis exclusivo de las startups que han alcanzado valuaciones de más de $1 billón este año.',
    url: 'https://forbes.com/demo-trending-5',
    urlToImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'El ecosistema de startups ha visto un crecimiento explosivo en 2024, con diez nuevas empresas alcanzando valuaciones de unicornio. Estas compañías, que abarcan desde IA hasta biotecnología, están redefiniendo industrias enteras y atrayendo inversiones récord de fondos de capital de riesgo.'
  },
  {
    source: { id: 'ars-technica', name: 'Ars Technica' },
    author: 'Space News',
    title: '🛸 SpaceX logra el primer aterrizaje exitoso en Marte con Starship',
    description: 'Hito histórico: la primera misión tripulada a Marte aterriza exitosamente.',
    url: 'https://arstechnica.com/demo-trending-6',
    urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 9000000).toISOString(),
    content: 'SpaceX ha logrado un hito histórico al conseguir el primer aterrizaje exitoso de una misión tripulada en Marte. La nave Starship, con una tripulación de seis astronautas, aterrizó en la región de Chryse Planitia después de un viaje de siete meses, marcando el comienzo de la era de la exploración humana interplanetaria.'
  }
];

const demoGeneralArticles: NewsArticle[] = [
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'María González',
    title: 'Cambio climático: nuevas políticas ambientales impactan la economía global',
    description: 'Análisis de cómo las nuevas regulaciones ambientales están transformando las industrias mundiales.',
    url: 'https://bbc.com/demo-general-1',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=800&h=400&fit=crop',
    publishedAt: new Date().toISOString(),
    content: 'Las nuevas políticas ambientales están redefiniendo el panorama económico mundial. Empresas de todos los sectores están adaptando sus operaciones para cumplir con regulaciones más estrictas sobre emisiones de carbono y sostenibilidad.'
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'Roberto Silva',
    title: 'Avances en medicina: nueva terapia génica promete curar enfermedades raras',
    description: 'Investigadores desarrollan tratamiento revolucionario que podría cambiar la medicina moderna.',
    url: 'https://cnn.com/demo-general-2',
    urlToImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: 'Un equipo internacional de investigadores ha desarrollado una nueva terapia génica que muestra resultados prometedores en el tratamiento de enfermedades genéticas raras. Los ensayos clínicos iniciales han demostrado una eficacia del 85% en la corrección de defectos genéticos.'
  },
  {
    source: { id: 'reuters', name: 'Reuters' },
    author: 'Ana Martínez',
    title: 'Educación digital: universidades adoptan nuevas tecnologías post-pandemia',
    description: 'El sector educativo abraza la transformación digital con plataformas innovadoras.',
    url: 'https://reuters.com/demo-general-3',
    urlToImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'Las instituciones educativas continúan integrando tecnologías digitales avanzadas en sus currículos. Desde realidad virtual hasta inteligencia artificial, las universidades están redefiniendo la experiencia de aprendizaje del siglo XXI.'
  },
  {
    source: { id: 'associated-press', name: 'Associated Press' },
    author: 'Carlos Rodríguez',
    title: 'Turismo espacial: primera misión comercial exitosa marca nuevo hito',
    description: 'La industria del turismo espacial alcanza un nuevo nivel con vuelos comerciales regulares.',
    url: 'https://ap.org/demo-general-4',
    urlToImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    content: 'La primera misión comercial de turismo espacial ha concluido exitosamente, marcando el inicio de una nueva era en los viajes espaciales. Los pasajeros civiles han experimentado la microgravedad y vistas espectaculares de la Tierra durante su estadía en órbita.'
  },
  {
    source: { id: 'guardian', name: 'The Guardian' },
    author: 'Elena López',
    title: 'Energías renovables: parques solares flotantes revolucionan la industria',
    description: 'Nueva tecnología de paneles solares en agua promete mayor eficiencia energética.',
    url: 'https://guardian.com/demo-general-5',
    urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'Los parques solares flotantes están emergiendo como una solución innovadora para la generación de energía limpia. Esta tecnología no solo ahorra espacio terrestre sino que también aumenta la eficiencia de los paneles debido al efecto de enfriamiento del agua.'
  },
  {
    source: { id: 'washington-post', name: 'The Washington Post' },
    author: 'Jorge Mendoza',
    title: 'Alimentación sostenible: granjas verticales urbanas alimentan las ciudades',
    description: 'La agricultura vertical se expande en centros urbanos para garantizar seguridad alimentaria.',
    url: 'https://washingtonpost.com/demo-general-6',
    urlToImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=400&fit=crop',
    publishedAt: new Date(Date.now() - 9000000).toISOString(),
    content: 'Las granjas verticales urbanas están transformando la forma en que producimos alimentos en las ciudades. Utilizando tecnología hidropónica y LED, estas instalaciones pueden producir cultivos durante todo el año con un 95% menos de agua que la agricultura tradicional.'
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

export async function getTrendingNews(page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  try {
    // Si tenemos una API key válida, usar la API real para trending
    if (NEWS_API_KEY !== 'demo' && NEWS_API_KEY !== 'a52b8a8ca84d4f1484b5d8cd505394be') {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/everything?q=trending OR viral OR popular OR breaking OR latest&language=en&sortBy=popularity&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { next: { revalidate: 1800 } } // Cache por 30 minutos (más frecuente para trending)
      );
      
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Usar datos de demostración para trending
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = demoTrendingArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: demoTrendingArticles.length,
      articles
    };
  } catch (error) {
    console.error('Error fetching trending news:', error);
    return { status: 'error', totalResults: 0, articles: [] };
  }
}

export async function getGeneralNews(page: number = 1, pageSize: number = 10): Promise<NewsAPIResponse> {
  try {
    // Si tenemos una API key válida, usar la API real
    if (NEWS_API_KEY !== 'demo' && NEWS_API_KEY !== 'a52b8a8ca84d4f1484b5d8cd505394be') {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/top-headlines?category=general&language=en&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Usar datos de demostración
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = demoGeneralArticles.slice(startIndex, endIndex);
    
    return {
      status: 'ok',
      totalResults: demoGeneralArticles.length,
      articles
    };
  } catch (error) {
    console.error('Error fetching general news:', error);
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
    case 'general':
      return getGeneralNews(page, pageSize);
    case 'business':
    case 'negocios':
      return getBusinessNews(page, pageSize);
    case 'trending':
    case 'tendencias':
      return getTrendingNews(page, pageSize);
    default:
      return getTechnologyNews(page, pageSize);
  }
}

// Función para obtener noticias por categoría simple (para components)
export async function fetchNews(category: string, pageSize: number = 12): Promise<NewsArticle[]> {
  const response = await getNewsByCategory(category, 1, pageSize);
  return response.articles || [];
}

// Función para generar un ID único basado en la URL y título del artículo
function generateId(url: string, title?: string): string {
  // Crear un hash simple y consistente basado en la URL
  let hash = 0;
  const str = url;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convertir a string positivo en base 36 para generar un ID compacto
  const positiveHash = Math.abs(hash).toString(36);
  
  // Crear un ID limpio sin caracteres especiales problemáticos
  return `news_${positiveHash}`;
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

// Función para expandir el contenido de un artículo con más detalles
function expandArticleContent(article: NewsArticle): string {
  let content = article.content || article.description || '';
  
  // Si el contenido es muy corto, expandirlo con información adicional
  if (content.length < 500) {
    const expandedContent = [
      content,
      '',
      '## Detalles adicionales',
      '',
      'Este artículo ha sido obtenido de fuentes confiables de noticias especializadas en tecnología y finanzas.',
      '',
      '### Puntos clave:',
      ''
    ];

    // Extraer puntos clave del título y descripción
    const keyPoints = extractKeyPoints(article.title, article.description);
    keyPoints.forEach((point, index) => {
      expandedContent.push(`${index + 1}. ${point}`);
    });

    expandedContent.push('');
    expandedContent.push('### Contexto del mercado');
    expandedContent.push('');
    expandedContent.push('En el contexto actual del mercado tecnológico y financiero, esta noticia representa una oportunidad importante para entender las tendencias que están moldeando nuestro futuro digital.');
    
    content = expandedContent.join('\n');
  }

  return content;
}

// Función para extraer puntos clave del título y descripción
function extractKeyPoints(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const keyPoints: string[] = [];

  // Patrones para identificar información importante
  const patterns = [
    { regex: /(\d+%|\d+\.\d+%)/g, prefix: 'Cambio porcentual del' },
    { regex: /(\$\d+[\d,]*(?:\.\d+)?(?:\s*(?:millones?|miles?|billones?))?)/g, prefix: 'Valor monetario de' },
    { regex: /(lanza|presenta|anuncia|revela)/gi, prefix: 'Nuevo anuncio sobre' },
    { regex: /(subir?|bajar?|aumentar?|disminuir?)/gi, prefix: 'Tendencia del mercado:' },
    { regex: /(bitcoin|crypto|blockchain|inteligencia artificial|ai|tecnología)/gi, prefix: 'Sector relevante:' }
  ];

  patterns.forEach(pattern => {
    const matches = text.match(pattern.regex);
    if (matches && matches.length > 0) {
      matches.slice(0, 2).forEach(match => {
        keyPoints.push(`${pattern.prefix} ${match}`);
      });
    }
  });

  // Si no encontramos puntos específicos, crear algunos genéricos
  if (keyPoints.length === 0) {
    keyPoints.push('Desarrollo relevante en el sector tecnológico o financiero');
    keyPoints.push('Impacto potencial en los mercados y usuarios');
    keyPoints.push('Información actualizada de fuentes confiables');
  }

  return keyPoints.slice(0, 4); // Máximo 4 puntos clave
}

// Función para obtener un artículo específico por ID con contenido expandido
export async function getArticleById(id: string): Promise<BlogPost | null> {
  try {
    console.log('🔍 Buscando artículo con ID:', id);
    
    // Obtener todos los artículos originales para regenerar IDs correctamente
    const [techNews, financeNews, businessNews, trendingNews] = await Promise.all([
      getTechnologyNews(1, 50),
      getFinanceNews(1, 50),
      getBusinessNews(1, 50),
      getTrendingNews(1, 50)
    ]);

    const allArticles = [
      ...techNews.articles,
      ...financeNews.articles,
      ...businessNews.articles,
      ...trendingNews.articles
    ];

    console.log('📰 Total artículos disponibles:', allArticles.length);

    // Buscar el artículo que coincida con el ID
    const targetArticle = allArticles.find(article => {
      const generatedId = generateId(article.url, article.title);
      console.log(`🔗 Comparando: ${generatedId} === ${id} ?`, generatedId === id);
      return generatedId === id;
    });

    if (targetArticle) {
      console.log('✅ Artículo encontrado:', targetArticle.title);
      
      // Determinar categoría basada en el contenido
      let category: 'technology' | 'finance' | 'general' = 'general';
      const content = (targetArticle.title + ' ' + targetArticle.description).toLowerCase();
      
      if (content.includes('bitcoin') || content.includes('crypto') || content.includes('finance') || 
          content.includes('investment') || content.includes('trading') || content.includes('stock')) {
        category = 'finance';
      } else if (content.includes('tech') || content.includes('ai') || content.includes('software') || 
                 content.includes('programming') || content.includes('robot') || content.includes('tesla')) {
        category = 'technology';
      }

      // Convertir a BlogPost con contenido expandido
      const blogPost = convertNewsArticleToBlogPost(targetArticle, category);
      blogPost.content = expandArticleContent(targetArticle);
      blogPost.readTime = calculateReadTime(blogPost.content);
      
      console.log('🎯 BlogPost creado exitosamente');
      return blogPost;
    }

    console.log('❌ Artículo no encontrado para ID:', id);
    
    // Como fallback, intentar buscar en los datos convertidos por si acaso
    const allPosts = await getMixedNews(100);
    const fallbackPost = allPosts.find(p => p.id === id);
    
    if (fallbackPost) {
      console.log('🔄 Encontrado en fallback:', fallbackPost.title);
      return fallbackPost;
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching article by ID:', error);
    return null;
  }
}

// Función para obtener artículos relacionados por categoría
export async function getRelatedArticles(postId: string, category: string, limit: number = 4): Promise<BlogPost[]> {
  try {
    const allPosts = await getMixedNews(50);
    return allPosts
      .filter(post => post.id !== postId && post.category === category)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Función para convertir un artículo de NewsAPI a nuestro formato BlogPost
export function convertNewsArticleToBlogPost(article: NewsArticle, category: 'technology' | 'finance' | 'general'): BlogPost {
  return {
    id: generateId(article.url, article.title),
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
    const [techNews, financeNews, generalNews, businessNews, trendingNews] = await Promise.all([
      getTechnologyNews(1, Math.ceil(pageSize / 5)),
      getFinanceNews(1, Math.ceil(pageSize / 5)),
      getGeneralNews(1, Math.ceil(pageSize / 5)),
      getBusinessNews(1, Math.ceil(pageSize / 5)),
      getTrendingNews(1, Math.ceil(pageSize / 5))
    ]);

    const allPosts: BlogPost[] = [
      ...techNews.articles.map(article => convertNewsArticleToBlogPost(article, 'technology')),
      ...financeNews.articles.map(article => convertNewsArticleToBlogPost(article, 'finance')),
      ...generalNews.articles.map(article => convertNewsArticleToBlogPost(article, 'general')),
      ...businessNews.articles.map(article => convertNewsArticleToBlogPost(article, 'general')),
      ...trendingNews.articles.map(article => convertNewsArticleToBlogPost(article, 'general'))
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
      ...demoGeneralArticles.map(article => convertNewsArticleToBlogPost(article, 'general')),
      ...demoBusinessArticles.map(article => convertNewsArticleToBlogPost(article, 'general')),
      ...demoTrendingArticles.map(article => convertNewsArticleToBlogPost(article, 'general'))
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
