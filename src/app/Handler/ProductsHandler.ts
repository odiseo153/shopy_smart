import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { Product } from '../Interfaces/Products';
import { ProductCategory } from './CategoryHandler';
import { setTimeout } from 'timers/promises';

dotenv.config();

const API_KEY_GEMINI = process.env.API_KEY_GEMINI;

// Cache simple para almacenar resultados previos
interface CacheItem<T> {
  timestamp: number;
  data: T;
}

class ProductsHandler {
  private productCache: Map<string, CacheItem<Product[]>> = new Map();
  private categoryCache: Map<string, CacheItem<ProductCategory>> = new Map();
  private CACHE_TTL = 1000 * 60 * 30; // 30 minutos de caducidad para el cache
  private MAX_RETRIES = 3;
  private RETRY_DELAY = 1000;
  private REQUEST_TIMEOUT = 15000; // 15 segundos de timeout

  // Rotación de User-Agents para evitar bloqueos
  private userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  ];

  // Función para obtener un User-Agent aleatorio
  private getRandomUserAgent(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  // Función para obtener headers con User-Agent aleatorio
  private getHeaders(): Record<string, string> {
    return {
      'User-Agent': this.getRandomUserAgent(),
      'Accept-Language': 'en-US;q=0.5',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
    };
  }

  // Función mejorada para hacer solicitudes HTTP con reintentos y timeout
  private async fetchWithRetry(url: string, options: AxiosRequestConfig = {}): Promise<any> {
    let lastError: Error | null = null;
    
    // Verificar si existe en cache
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    const cachedItem = this.productCache.get(cacheKey);
    
    if (cachedItem && (Date.now() - cachedItem.timestamp) < this.CACHE_TTL) {
      console.log('🔄 Usando datos del cache para:', url);
      return { data: cachedItem.data, fromCache: true };
    }
    
    // Configurar las opciones de la solicitud
    const requestOptions: AxiosRequestConfig = {
      ...options,
      timeout: this.REQUEST_TIMEOUT,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {})
      }
    };
    
    // Intentar la solicitud con reintentos
    for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
      try {
        // Pequeña espera entre solicitudes para evitar detección
        if (attempt > 0) {
          await setTimeout(this.RETRY_DELAY * attempt);
        }
        
        console.log(`📡 Solicitud a ${url} (intento ${attempt + 1}/${this.MAX_RETRIES})`);
        const response = await axios(url, requestOptions);
        
        // Guardar en cache si es exitoso
        if (!options.method || options.method.toUpperCase() === 'GET') {
          this.productCache.set(cacheKey, {
            timestamp: Date.now(),
            data: response.data
          });
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        const axiosError = error as AxiosError;
        
        // No reintentar en ciertos casos como errores 404
        if (axiosError.response && axiosError.response.status === 404) {
          console.error(`⚠️ Recurso no encontrado (404) para ${url}`);
          break;
        }
        
        // Esperar un poco más si recibimos un error 429 (demasiadas solicitudes)
        if (axiosError.response && axiosError.response.status === 429) {
          const retryAfter = parseInt(axiosError.response.headers['retry-after'] || '5', 10);
          console.warn(`⏳ Demasiadas solicitudes (429) para ${url}, esperando ${retryAfter} segundos`);
          await setTimeout(retryAfter * 1000);
        }
        
        console.error(`❌ Error en intento ${attempt + 1}/${this.MAX_RETRIES} para ${url}:`, 
          (axiosError.response?.status || 'no-status'), 
          (axiosError.message || 'no-message')
        );
      }
    }
    
    // Si llegamos aquí, todos los intentos fallaron
    throw lastError || new Error(`Falló después de ${this.MAX_RETRIES} intentos`);
  }
  
  // Función helper para extraer texto seguro con Cheerio
  private safeText($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>, selector: string): string {
    try {
      return $(element).find(selector).text().trim() || 'N/A';
    } catch (e) {
      return 'N/A';
    }
  }
  
  // Función helper para extraer atributos seguros con Cheerio
  private safeAttr($: cheerio.CheerioAPI, element: cheerio.Cheerio<any>, selector: string, attr: string): string {
    try {
      const found = $(element).find(selector);
      return found.attr(attr)?.trim() || 'N/A';
    } catch (e) {
      return 'N/A';
    }
  }

  // Función para normalizar URLs
  private normalizeUrl(url: string, baseUrl: string): string {
    if (!url || url === 'N/A') return 'N/A';
    
    try {
      if (url.startsWith('http')) return url;
      if (url.startsWith('//')) return `https:${url}`;
      return new URL(url, baseUrl).toString();
    } catch (e) {
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
  }

  // Función para normalizar precios
  private normalizePrice(price: string): string {
    if (!price || price === 'N/A') return 'N/A';
    return price.replace(/\s+/g, ' ').trim();
  }

  async getEbayProducts(search: string): Promise<Product[]> {
    const cacheKey = `ebay_${search}`;
    const cached = this.productCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('Usando cache para productos de eBay');
      return cached.data;
    }
    
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(search)}`;
    
    try {
      const response = await this.fetchWithRetry(url);
      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $('div.s-item__wrapper').each((_, container) => {
        try {
          const title = this.safeText($, $(container), 'div.s-item__title');
          const link = this.safeAttr($, $(container), 'a', 'href');
          const price = this.safeText($, $(container), 'span.s-item__price');
          const imageUrl = this.safeAttr($, $(container), 'img', 'src');

          if (title !== 'Shop on eBay' && title !== 'N/A') {
            products.push({
              product_photo: imageUrl,
              product_title: title,
              product_price: this.normalizePrice(price),
              product_url: link,
              product_star_rating: 5,
              brand: 'ebay',
              icon: 'https://w7.pngwing.com/pngs/622/371/png-transparent-ebay-logo-ebay-sales-amazon-com-coupon-online-shopping-ebay-logo-text-logo-number.png',
            });
          }
        } catch (e) {
          console.error(`Error parsing eBay product: ${e}`);
        }
      });

      // Guardar en cache
      this.productCache.set(cacheKey, {
        timestamp: Date.now(),
        data: products
      });

      return products;
    } catch (error) {
      console.error(`Error fetching eBay products: ${error}`);
      return [];
    }
  }

  async getWalmartProducts(search: string): Promise<Product[]> {
    const cacheKey = `walmart_${search}`;
    const cached = this.productCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('Usando cache para productos de Walmart');
      return cached.data;
    }
    
    const url = `https://www.walmart.com/search?q=${encodeURIComponent(search)}`;
    
    try {
      const response = await this.fetchWithRetry(url);
      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      // Mejorado selector para mejores resultados
      $('div[data-automation-id="product"]').each((_, product) => {
        try {
          const title = this.safeText($, $(product), 'span[data-automation-id="product-title"]');
          const price = this.safeText($, $(product), 'div[data-automation-id="product-price"]');
          const image = this.safeAttr($, $(product), 'img[data-testid="productTileImage"]', 'src');
          const link = this.safeAttr($, $(product), 'a[data-automation-id="product-title-link"]', 'href');
          
          const normalizedUrl = this.normalizeUrl(link, 'https://www.walmart.com');

          if (title !== 'N/A') {
            products.push({
              product_title: title,
              product_price: this.normalizePrice(price),
              product_photo: image,
              product_url: normalizedUrl,
              brand: 'walmart',
              icon: 'https://e7.pngegg.com/pngimages/45/625/png-clipart-yellow-logo-illustration-walmart-logo-grocery-store-retail-asda-stores-limited-icon-walmart-logo-miscellaneous-company-thumbnail.png',
            });
          }
        } catch (e) {
          console.error(`Error processing Walmart product: ${e}`);
        }
      });

      // Verificar selector alternativo si no encontramos productos
      if (products.length === 0) {
        $('div.mb0.ph0-xl.pt0-xl.bb.b--near-white.w-25.pb3-m.ph1, div.sans-serif.mid-gray.relative.pb1-xl.mt3-m.mt0-xl.bb.b--near-white').each((_, product) => {
          try {
            const title = this.safeText($, $(product), 'span.w_iUH7, span[data-automation-id="product-title"]');
            const price = this.safeText($, $(product), 'div[data-automation-id="product-price"] span.f2, span[data-automation-id="product-price-amount"]');
            const image = this.safeAttr($, $(product), 'img[data-testid="productTileImage"]', 'src');
            const link = this.safeAttr($, $(product), 'a', 'href');
            
            const normalizedUrl = this.normalizeUrl(link, 'https://www.walmart.com');

            if (title !== 'N/A') {
              products.push({
                product_title: title,
                product_price: this.normalizePrice(price),
                product_photo: image,
                product_url: normalizedUrl,
                brand: 'walmart',
                icon: 'https://e7.pngegg.com/pngimages/45/625/png-clipart-yellow-logo-illustration-walmart-logo-grocery-store-retail-asda-stores-limited-icon-walmart-logo-miscellaneous-company-thumbnail.png',
              });
            }
          } catch (e) {
            console.error(`Error processing Walmart product (alternative selector): ${e}`);
          }
        });
      }

      // Guardar en cache
      this.productCache.set(cacheKey, {
        timestamp: Date.now(),
        data: products
      });

      return products;
    } catch (error) {
      console.error(`Error fetching Walmart products: ${error}`);
      return [];
    }
  }

  async getAliExpressProducts(search: string): Promise<Product[]> {
    const cacheKey = `aliexpress_${search}`;
    const cached = this.productCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('Usando cache para productos de AliExpress');
      return cached.data;
    }
    
    const url = `https://www.aliexpress.us/w/wholesale-${encodeURIComponent(search)}.html`;
    
    try {
      const response = await this.fetchWithRetry(url);
      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      // Utilizando selectores más robustos
      $('div.multi--container--1UZxxHY, div.search-card-item, div[class*="SearchProductFeed_cardV"]').each((_, product) => {
        try {
          const image = this.safeAttr($, $(product), 'img.images--image--34Xc9F, img.product-img, img[class*="Image_img"]', 'src');
          const title = this.safeText($, $(product), 'h3.multi--titleText--nXeOvyr, div.product-title, h1[class*="Title_title"]');
          const priceOriginal = this.safeText($, $(product), 'div.multi--price-original--1zEQqOK, div.price-original, div[class*="PriceOption_original"]');
          const price = this.safeText($, $(product), 'div.multi--price-sale--U-S0jtj, div.price-current, div[class*="PriceOption_sale"]');
          const link = this.safeAttr($, $(product), 'a', 'href');
          
          const normalizedUrl = this.normalizeUrl(link, 'https://www.aliexpress.us');

          if (title !== 'N/A') {
            products.push({
              product_photo: image,
              product_title: title,
              product_original_price: this.normalizePrice(priceOriginal),
              product_price: this.normalizePrice(price || priceOriginal),
              product_url: normalizedUrl,
              brand: 'aliexpress',
              icon: 'https://c0.klipartz.com/pngpicture/900/512/gratis-png-iconos-del-ordenador-fuente-aliexpress-thumbnail.png',
            });
          }
        } catch (e) {
          console.error(`Error parsing AliExpress product: ${e}`);
        }
      });

      // Guardar en cache
      this.productCache.set(cacheKey, {
        timestamp: Date.now(),
        data: products
      });

      return products;
    } catch (error) {
      console.error(`Error fetching AliExpress products: ${error}`);
      return [];
    }
  }

  // Implementando getProductsGearbest con el patrón mejorado
  async getProductsGearbest(search: string): Promise<Product[]> {
    const cacheKey = `gearbest_${search}`;
    const cached = this.productCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('Usando cache para productos de Gearbest');
      return cached.data;
    }
    
    const url = `https://www.gearbest.ma/?s=${encodeURIComponent(search)}&post_type=product&product_cat=`;
    
    try {
      const response = await this.fetchWithRetry(url);
      const $ = cheerio.load(response.data);
      const products: Product[] = [];

      $("div.product").each((_, element) => {
        try {
          const title = this.safeText($, $(element), "h3 a");
          const price = this.safeText($, $(element), "span.price");
          const link = this.safeAttr($, $(element), "a", "href");
          const imgTag = this.safeAttr($, $(element), "img", "data-src") || 
                        this.safeAttr($, $(element), "img", "src");

          // Obtener la cantidad de estrellas activas
          const ratingStars = $(element).find("div.rh_woo_star span.active").length;
          const rating = ratingStars || 0;

          if (title !== 'N/A') {
            products.push({
              product_title: title,
              product_price: this.normalizePrice(price),
              product_url: link,
              brand: "gearbest",
              icon: "https://www.gearbest.ma/wp-content/uploads/2023/12/favicon-gearbest-100x100.ico",
              product_photo: imgTag,
              product_star_rating: rating,
            });
          }
        } catch (e) {
          console.error(`Error parsing Gearbest product: ${e}`);
        }
      });

      // Guardar en cache
      this.productCache.set(cacheKey, {
        timestamp: Date.now(),
        data: products
      });

      return products;
    } catch (error) {
      console.error(`Error fetching Gearbest products: ${error}`);
      return [];
    }
  }

  // Función para obtener productos de múltiples fuentes en paralelo
  async getAllProducts(search: string): Promise<Record<string, Product[]>> {
    const methods: Record<string, () => Promise<Product[]>> = {
      ebay: () => this.getEbayProducts(search),
      walmart: () => this.getWalmartProducts(search),
      aliexpress: () => this.getAliExpressProducts(search),
      gearbest: () => this.getProductsGearbest(search),
      // Agrega las demás tiendas aquí siguiendo el mismo patrón
    };

    const results: Record<string, Product[]> = {};
    const promises = Object.entries(methods).map(async ([store, method]) => {
      try {
        console.log(`🔍 Iniciando búsqueda en ${store} para "${search}"`);
        const startTime = Date.now();
        const products = await method();
        const elapsedTime = Date.now() - startTime;
        
        console.log(`✅ Encontrados ${products.length} productos en ${store} (${elapsedTime}ms)`);
        results[store] = products;
      } catch (error) {
        console.error(`❌ Error obteniendo productos de ${store}:`, error);
        results[store] = [];
      }
    });

    await Promise.all(promises);
    return results;
  }

  // Las demás funciones de scraping pueden ser actualizadas siguiendo el mismo patrón

  async getCategorieFromProduct(product: string): Promise<ProductCategory> {
    const cacheKey = `category_${product}`;
    const cached = this.categoryCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      console.log('Usando cache para categoría del producto');
      return cached.data;
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY_GEMINI}`;
    const headers = { 'Content-Type': 'application/json' };

    const prompt = `
    Quiero que actúes como un clasificadór profesional de productos. 
    Devuelve la categoría del producto en esta estructura JSON:
    {
      "category": "general | clothing | electronics | sports | luxury"
    }
    teniendo en cuenta que el producto es "${product}".
    `;

    const data = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'POST',
        headers,
        data
      });

      if (!response.data.candidates || !response.data.candidates.length) {
        console.error("No se encontraron candidatos en la respuesta de la API.");
        return ProductCategory.GENERAL;
      }

      const generatedText = response.data.candidates[0].content.parts[0].text;
      const cleanedText = generatedText.replace(/```json|```/g, '').trim();

      let parsedResponse: any;

      try {
        parsedResponse = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Error al parsear el JSON generado:", parseError);
        return ProductCategory.GENERAL;
      }

      const category = parsedResponse.category?.toLowerCase();
      const result = category in ProductCategory 
        ? ProductCategory[category as keyof typeof ProductCategory] 
        : ProductCategory.GENERAL;
        
      // Guardar en cache correctamente tipado
      this.categoryCache.set(cacheKey, {
        timestamp: Date.now(),
        data: result
      });
      
      return result;
    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
      return ProductCategory.GENERAL;
    }
  }

  // Método para limpiar cache vencido (se puede llamar periódicamente)
  purgeExpiredCache(): void {
    const now = Date.now();
    let purgedCount = 0;
    
    // Limpiar caché de productos
    for (const [key, item] of this.productCache.entries()) {
      if (now - item.timestamp > this.CACHE_TTL) {
        this.productCache.delete(key);
        purgedCount++;
      }
    }
    
    // Limpiar caché de categorías
    for (const [key, item] of this.categoryCache.entries()) {
      if (now - item.timestamp > this.CACHE_TTL) {
        this.categoryCache.delete(key);
        purgedCount++;
      }
    }
    
    console.log(`🧹 Cache limpiado, ${purgedCount} elementos eliminados. Tamaño actual: ${this.productCache.size + this.categoryCache.size}`);
  }
}

export default ProductsHandler;
