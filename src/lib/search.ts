import { BlogPost } from '@/types/blog';
import { getMixedNews } from './newsApi';

// Cache de posts para búsqueda
let cachedPosts: BlogPost[] = [];
let lastCacheUpdate = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Función para obtener todos los posts (con cache)
async function getAllPosts(): Promise<BlogPost[]> {
  const now = Date.now();
  
  if (cachedPosts.length === 0 || now - lastCacheUpdate > CACHE_DURATION) {
    try {
      cachedPosts = await getMixedNews(50); // Obtener más posts para búsqueda
      lastCacheUpdate = now;
    } catch (error) {
      console.error('Error loading posts for search:', error);
      return [];
    }
  }
  
  return cachedPosts;
}

// Función para calcular relevancia de búsqueda
function calculateRelevance(post: BlogPost, query: string): number {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  let score = 0;
  
  const title = post.title.toLowerCase();
  const description = post.description.toLowerCase();
  const content = post.content.toLowerCase();
  const tags = post.tags?.join(' ').toLowerCase() || '';
  
  searchTerms.forEach(term => {
    // Título tiene mayor peso
    if (title.includes(term)) {
      score += title.indexOf(term) === 0 ? 10 : 5; // Más puntos si está al inicio
    }
    
    // Descripción
    if (description.includes(term)) {
      score += 3;
    }
    
    // Contenido
    if (content.includes(term)) {
      score += 1;
    }
    
    // Tags
    if (tags.includes(term)) {
      score += 4;
    }
    
    // Coincidencia exacta en categoría
    if (post.category.toLowerCase().includes(term)) {
      score += 6;
    }
  });
  
  return score;
}

// Función principal de búsqueda
export async function searchPosts(
  query: string,
  category: string = 'all',
  sortBy: string = 'relevance'
): Promise<BlogPost[]> {
  if (!query.trim()) {
    return [];
  }
  
  const allPosts = await getAllPosts();
  
  // Filtrar por categoría si no es 'all'
  let filteredPosts = allPosts;
  if (category !== 'all') {
    filteredPosts = allPosts.filter(post => post.category === category);
  }
  
  // Filtrar por query y calcular relevancia
  const searchResults = filteredPosts
    .map(post => ({
      ...post,
      relevance: calculateRelevance(post, query)
    }))
    .filter(post => post.relevance > 0);
  
  // Ordenar resultados
  switch (sortBy) {
    case 'date':
      return searchResults.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case 'title':
      return searchResults.sort((a, b) => a.title.localeCompare(b.title));
    case 'relevance':
    default:
      return searchResults.sort((a, b) => b.relevance - a.relevance);
  }
}

// Función para búsqueda rápida (sugerencias)
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (query.length < 2) {
    return [];
  }
  
  const allPosts = await getAllPosts();
  const suggestions = new Set<string>();
  
  // Extraer palabras relevantes de títulos y tags
  allPosts.forEach(post => {
    const words = [
      ...post.title.split(' '),
      ...(post.tags || []),
      post.category
    ];
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-záéíóúñ]/g, '');
      if (cleanWord.length > 2 && cleanWord.includes(query.toLowerCase())) {
        suggestions.add(cleanWord);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 8); // Máximo 8 sugerencias
}

// Función para obtener términos populares
export function getPopularSearchTerms(): string[] {
  return [
    'inteligencia artificial',
    'blockchain',
    'criptomonedas',
    'bitcoin',
    'ethereum',
    'inversión',
    'startup',
    'fintech',
    'trading',
    'NFT',
    'defi',
    'web3',
    'metaverso',
    'cyberseguridad',
    'cloud computing'
  ];
}

// Función para buscar por categorías relacionadas
export async function getRelatedPosts(post: BlogPost, limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  const related = allPosts
    .filter(p => p.id !== post.id)
    .map(p => ({
      ...p,
      similarity: calculateSimilarity(post, p)
    }))
    .filter(p => p.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
  
  return related;
}

// Función para calcular similaridad entre posts
function calculateSimilarity(post1: BlogPost, post2: BlogPost): number {
  let score = 0;
  
  // Misma categoría
  if (post1.category === post2.category) {
    score += 5;
  }
  
  // Tags en común
  const tags1 = post1.tags || [];
  const tags2 = post2.tags || [];
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  score += commonTags.length * 2;
  
  // Palabras en común en títulos
  const words1 = post1.title.toLowerCase().split(' ');
  const words2 = post2.title.toLowerCase().split(' ');
  const commonWords = words1.filter(word => 
    word.length > 3 && words2.includes(word)
  );
  score += commonWords.length;
  
  return score;
}
