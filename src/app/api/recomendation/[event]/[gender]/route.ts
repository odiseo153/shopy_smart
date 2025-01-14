import ProductScraper from "@/app/ScrappingHandler/ApiHandler";
import { RecommendationScraper } from "@/app/ScrappingHandler/Recomendation";
import {  NextResponse } from 'next/server';

const scraper = new RecommendationScraper(); // Instancia de la clase

export async function GET(request:Request,context:any) {
    const {event,gender} = context.params;
   // const aliexpress = await scraper.getAliExpressProducts(params.search);
    const allData = await scraper.getRecommendation(event,gender);


 return NextResponse.json({ respuesta:allData });
}

