import ProductsHandler from "@/app/ScrappingHandler/ProductsHandler";
import { RecommendationScraper } from "@/app/ScrappingHandler/Recomendation";
import {  NextResponse } from 'next/server';

const scraper = new RecommendationScraper(); // Instancia de la clase

export async function GET(request:Request,context:any) {
    const {event,gender} = context.params;
   // const aliexpress = await scraper.getAliExpressProducts(params.search);
   console.log(context.params)
    const allData = await scraper.getRecommendation(event,gender);


 return NextResponse.json({ respuesta:allData });
}

