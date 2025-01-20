import CategoryHandler from "@/app/ScrappingHandler/CategoryHandler";
import ProductsHandler from "@/app/ScrappingHandler/ProductsHandler";
import { NextResponse } from 'next/server';

const scraper = new ProductsHandler(); // Instancia de la clase
const categoryHandler = new CategoryHandler(scraper); // Instancia de la clase

export async function GET(
  request: Request,
  context: any
) {
  const { search } = context.params;

  if (!search) {
    return NextResponse.json(
      { error: "Search term is missing" },
      { status: 400 }
    );
  }

  const scraper = new ProductsHandler();

  const platforms = [
    { name: "Ebay", method: () => scraper.getEbayProducts(search) },
    { name: "Gearbest", method: () => scraper.getProductsGearbest(search) },
    { name: "Romwe", method: () => scraper.getProductsRomwe(search) },
    { name: "Nike", method: () => scraper.getNikeProducts(search) },
    { name: "Asos", method: () => scraper.getAsosProducts(search) },
    { name: "BestBuy", method: () => scraper.getBestBuyProducts(search) },
    { name: "Patagonia", method: () => scraper.getPatagoniaProducts(search) },
  ];

  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        for (const platform of platforms) {
          try {
            const products = await platform.method();
            const data = JSON.stringify({
              platform: platform.name,
              products,
            });

            controller.enqueue(encoder.encode(data + "\n"));
          } catch (error) {
            console.error(`Error fetching from ${platform.name}:`, error);
            controller.enqueue(
              encoder.encode(
                JSON.stringify({
                  platform: platform.name,
                  error: "Failed to fetch data",
                }) + "\n"
              )
            );
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
}
