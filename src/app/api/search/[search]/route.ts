import CategoryHandler from "@/app/ScrappingHandler/CategoryHandler";
import ProductsHandler from "@/app/ScrappingHandler/ProductsHandler";
import {  NextResponse } from 'next/server';

const scraper = new ProductsHandler(); // Instancia de la clase
const categoryHandler = new CategoryHandler(scraper); // Instancia de la clase

// /app/api/search/[search]/route.ts
export async function GET(
  request: Request,
  context:any
) {
  const {search} = context.params;

  if (!search) {
    return NextResponse.json(
      { error: "Search term is missing" },
      { status: 400 } 
    );
  }

  const scraper = new ProductsHandler();

  try {

    const allData = [
     // ...(await scraper.getAliExpressProducts(search)),
      ...(await scraper.getEbayProducts(search)),
      ...(await scraper.getProductsGearbest(search)),
       ...(await scraper.getProductsRomwe(search)),
       ...(await scraper.getNikeProducts(search)),
       ...(await scraper.getAsosProducts(search)),
       ...(await scraper.getBestBuyProducts(search)),
       ...(await scraper.getPatagoniaProducts(search)),
     //  ...(await scraper.getWalmartProducts(search)),
    ];
    
    const allCategoryData = await categoryHandler.getProductsByCategory(search);

    return NextResponse.json({ respuesta: allData });
  } catch (error) {
    console.error("Error during scraping:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}


