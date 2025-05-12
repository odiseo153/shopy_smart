import { ScraperUtils } from '../../Handler/ScraperUtils';
import { NextResponse } from 'next/server';

interface Product {
  product_photo: string;
  product_title: string;
  product_price: string;
  product_url: string;
  product_star_rating?: number;
  brand: string;
  icon: string;
}

/**
 * Ejemplo de uso de ScraperUtils para obtener productos de eBay
 */
export async function GET(request: Request) {
  try {
    // Obtener el parámetro de búsqueda de la URL
    const url = new URL(request.url);
    const search = url.searchParams.get('q');
    
    if (!search) {
      return NextResponse.json({ error: 'Se requiere un término de búsqueda (parámetro q)' }, { status: 400 });
    }
    
    // Crear una instancia de ScraperUtils con opciones personalizadas
    const scraperUtils = new ScraperUtils({
      cacheTTL: 1000 * 60 * 15, // 15 minutos de caché
      maxRetries: 2,            // Máximo 2 reintentos
      timeout: 10000            // 10 segundos de timeout
    });
    
    const startTime = Date.now();
    console.log(`🔍 Iniciando búsqueda en eBay para: "${search}"`);
    
    // Construir la URL de eBay
    const ebayUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(search)}`;
    
    // Cargar el HTML y obtener un documento Cheerio
    const $ = await scraperUtils.loadCheerioFromUrl(ebayUrl);
    const products: Product[] = [];
    
    // Procesar los resultados
    $('div.s-item__wrapper').each((_, container) => {
      try {
        const title = scraperUtils.safeText($, $(container), 'div.s-item__title');
        const link = scraperUtils.safeAttr($, $(container), 'a', 'href');
        const price = scraperUtils.safeText($, $(container), 'span.s-item__price');
        const imageUrl = scraperUtils.safeAttr($, $(container), 'img', 'src');
        
        // Filtrar elementos no deseados
        if (title !== 'Shop on eBay' && title !== 'N/A') {
          products.push({
            product_photo: imageUrl,
            product_title: title,
            product_price: scraperUtils.normalizePrice(price),
            product_url: link,
            product_star_rating: 5,
            brand: 'ebay',
            icon: 'https://w7.pngwing.com/pngs/622/371/png-transparent-ebay-logo-ebay-sales-amazon-com-coupon-online-shopping-ebay-logo-text-logo-number.png',
          });
        }
      } catch (e) {
        console.error(`Error procesando producto: ${e instanceof Error ? e.message : e}`);
      }
    });
    
    const elapsedTime = Date.now() - startTime;
    console.log(`✅ Se encontraron ${products.length} productos en ${elapsedTime}ms`);
    
    // Limpiar caché si es necesario
    scraperUtils.purgeExpiredCache();
    
    // Devolver los resultados
    return NextResponse.json({
      query: search,
      source: 'ebay',
      count: products.length,
      elapsed_ms: elapsedTime,
      products,
    });
  } catch (error) {
    console.error('❌ Error en el scraping:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener productos', 
        message: error instanceof Error ? error.message : 'Error desconocido' 
      }, 
      { status: 500 }
    );
  }
} 