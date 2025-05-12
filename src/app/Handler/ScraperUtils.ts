import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import { setTimeout } from 'timers/promises';

// Tipos para el sistema de caché
export interface CachedData<T> {
  data: T;
  timestamp: number;
}

export interface ScraperOptions {
  cacheEnabled?: boolean;
  cacheTTL?: number;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  useRandomUserAgent?: boolean;
}

export class ScraperUtils {
  private cache: Map<string, CachedData<any>> = new Map();
  private options: Required<ScraperOptions>;

  // Lista de User-Agents para rotación
  private userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  ];

  constructor(options?: ScraperOptions) {
    this.options = {
      cacheEnabled: options?.cacheEnabled ?? true,
      cacheTTL: options?.cacheTTL ?? 1000 * 60 * 30, // 30 minutos
      maxRetries: options?.maxRetries ?? 3,
      retryDelay: options?.retryDelay ?? 1000,
      timeout: options?.timeout ?? 15000,
      useRandomUserAgent: options?.useRandomUserAgent ?? true
    };
  }

  /**
   * Obtiene un User-Agent aleatorio de la lista
   */
  getRandomUserAgent(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  /**
   * Genera headers HTTP con opciones comunes y un User-Agent aleatorio si está habilitado
   */
  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
    };

    if (this.options.useRandomUserAgent) {
      headers['User-Agent'] = this.getRandomUserAgent();
    }

    return headers;
  }

  /**
   * Función para hacer fetch con reintentos, caché y manejo de errores
   */
  async fetchWithRetry<T>(url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    // Verificar caché primero si está habilitado
    if (this.options.cacheEnabled) {
      const cacheKey = `${url}_${JSON.stringify(options)}`;
      const cachedItem = this.cache.get(cacheKey);
      
      if (cachedItem && (Date.now() - cachedItem.timestamp) < this.options.cacheTTL) {
        console.log(`🔄 Usando datos en caché para: ${url}`);
        return { 
          data: cachedItem.data,
          status: 200,
          statusText: 'OK (Cached)',
          headers: {},
          config: options as any,
          fromCache: true
        } as AxiosResponse<T>;
      }
    }

    // Configurar opciones
    const requestOptions: AxiosRequestConfig = {
      ...options,
      timeout: this.options.timeout,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {})
      }
    };

    let lastError: Error | null = null;

    // Intentar con reintentos
    for (let attempt = 0; attempt < this.options.maxRetries; attempt++) {
      try {
        // Agregar delay entre reintentos
        if (attempt > 0) {
          await setTimeout(this.options.retryDelay * attempt);
          console.log(`🔄 Reintento ${attempt + 1}/${this.options.maxRetries} para: ${url}`);
        } else {
          console.log(`📡 Solicitud a: ${url}`);
        }

        const response = await axios(url, requestOptions);

        // Guardar en caché si es exitoso y es una solicitud GET
        if (this.options.cacheEnabled && (!options.method || options.method.toUpperCase() === 'GET')) {
          const cacheKey = `${url}_${JSON.stringify(options)}`;
          this.cache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now()
          });
        }

        return response;
      } catch (error: any) {
        lastError = error;
        const axiosError = error as AxiosError;
        
        // No reintentar en ciertos casos
        if (axiosError.response?.status === 404) {
          console.error(`⚠️ Recurso no encontrado (404): ${url}`);
          break;
        }
        
        // Esperar más tiempo en caso de límite de tasa
        if (axiosError.response?.status === 429) {
          const retryAfter = parseInt(axiosError.response.headers['retry-after'] || '5', 10);
          console.warn(`⏳ Demasiadas solicitudes (429), esperando ${retryAfter}s: ${url}`);
          await setTimeout(retryAfter * 1000);
        }
        
        console.error(`❌ Error en solicitud (intento ${attempt + 1}/${this.options.maxRetries}): ${url}`, {
          status: axiosError.response?.status,
          message: axiosError.message
        });
      }
    }
    
    // Si llegamos aquí, todos los intentos fallaron
    throw lastError || new Error(`Todos los intentos fallaron para: ${url}`);
  }

  /**
   * Carga y devuelve un documento Cheerio desde una URL
   */
  async loadCheerioFromUrl(url: string, options?: AxiosRequestConfig): Promise<cheerio.CheerioAPI> {
    const response = await this.fetchWithRetry<string>(url, options);
    return cheerio.load(response.data);
  }

  /**
   * Obtiene texto seguro desde un selector Cheerio
   */
  safeText($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>, selector: string): string {
    try {
      return $(element).find(selector).text().trim() || 'N/A';
    } catch (e) {
      return 'N/A';
    }
  }
  
  /**
   * Obtiene un atributo seguro desde un selector Cheerio
   */
  safeAttr($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>, selector: string, attr: string): string {
    try {
      const found = $(element).find(selector);
      return found.attr(attr)?.trim() || 'N/A';
    } catch (e) {
      return 'N/A';
    }
  }

  /**
   * Normaliza un precio eliminando espacios extra
   */
  normalizePrice(price: string): string {
    if (!price || price === 'N/A') return 'N/A';
    return price.replace(/\s+/g, ' ').trim();
  }

  /**
   * Normaliza una URL, asegurando que sea absoluta
   */
  normalizeUrl(url: string, baseUrl: string): string {
    if (!url || url === 'N/A') return 'N/A';
    
    try {
      if (url.startsWith('http')) return url;
      if (url.startsWith('//')) return `https:${url}`;
      return new URL(url, baseUrl).toString();
    } catch (e) {
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
  }

  /**
   * Limpia los elementos en caché que han expirado
   */
  purgeExpiredCache(): number {
    if (!this.options.cacheEnabled) return 0;
    
    const now = Date.now();
    let purgedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.options.cacheTTL) {
        this.cache.delete(key);
        purgedCount++;
      }
    }
    
    if (purgedCount > 0) {
      console.log(`🧹 Caché limpiado: ${purgedCount} elementos eliminados, quedan ${this.cache.size}`);
    }
    
    return purgedCount;
  }

  /**
   * Limpia toda la caché
   */
  clearCache(): void {
    const count = this.cache.size;
    this.cache.clear();
    console.log(`🗑️ Caché eliminado completamente: ${count} elementos eliminados`);
  }
}

export default ScraperUtils; 