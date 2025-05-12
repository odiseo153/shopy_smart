import CategoryHandler from "@/app/Handler/CategoryHandler";
import ProductsHandler from "@/app/Handler/ProductsHandler";
import { NextResponse } from 'next/server';

const scraper = new ProductsHandler(); // Instancia de la clase
const categoryHandler = new CategoryHandler(scraper); // Instancia de la clase

export async function GET(
  request: Request,
  context: any
) {
  try {
    const { search } = context.params;

    if (!search) {
      return NextResponse.json(
        { error: "Search term is missing" },
        { status: 400 }
      );
    }

    const platforms = [
      { name: "Ebay", method: () => scraper.getEbayProducts(search) },
      { name: "Gearbest", method: () => scraper.getProductsGearbest(search) },
    ];

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          // Iniciar todas las solicitudes en paralelo y manejar cada resultado a medida que se resuelven
          const promises = platforms.map(async (platform) => {
            const startTime = Date.now();
            try {
              console.log(`🔍 Iniciando búsqueda en ${platform.name} para "${search}"`);
              const products = await platform.method();
              const elapsedTime = Date.now() - startTime;
              
              console.log(`✅ ${platform.name}: ${products.length} productos encontrados en ${elapsedTime}ms`);
              
              const data = JSON.stringify({
                platform: platform.name,
                products,
                count: products.length,
                elapsed_ms: elapsedTime
              });

              controller.enqueue(encoder.encode(data + "\n"));
              return { platform: platform.name, success: true, count: products.length };
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Unknown error';
              const elapsedTime = Date.now() - startTime;
              
              console.error(`❌ ${platform.name}: Error en ${elapsedTime}ms - ${errorMessage}`);
              
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    platform: platform.name,
                    error: `Failed to fetch data: ${errorMessage}`,
                    elapsed_ms: elapsedTime
                  }) + "\n"
                )
              );
              return { platform: platform.name, success: false, error: errorMessage };
            }
          });

          // No esperamos a que todas las promesas terminen, cada una envía su resultado cuando esté listo
          // Pero al final, esperamos a que todas terminen
          try {
            const results = await Promise.allSettled(promises);
            
            // Estadísticas generales
            const summary = {
              timestamp: new Date().toISOString(),
              query: search,
              platforms_total: platforms.length,
              platforms_success: results.filter(r => r.status === 'fulfilled' && (r.value as any).success).length,
              platforms_error: results.filter(r => r.status === 'rejected' || ((r.status === 'fulfilled' && !(r.value as any).success))).length
            };
            
            controller.enqueue(encoder.encode(JSON.stringify({ summary }) + "\n"));
          } finally {
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        },
      }
    );
  } catch (error) {
    console.error("Error global en la API:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
