import ProductsHandler from "@/app/Handler/ProductsHandler";
import { RecommendationScraper } from "@/app/Handler/Recomendation";
import {  NextResponse } from 'next/server';

const scraper = new RecommendationScraper(); // Instancia de la clase

export async function GET(request:Request,context:any) {
    const {desc} = context.params;
   // const aliexpress = await scraper.getAliExpressProducts(params.search);
    const allData = await scraper.getOutfitRecommendation(desc);
    console.log(allData);

 return NextResponse.json({ respuesta:allData });
}

