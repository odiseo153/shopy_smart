import ProductsHandler from "@/app/Handler/ProductsHandler";
import { RecommendationScraper } from "@/app/Handler/Recomendation";
import {  NextResponse } from 'next/server';

const scraper = new RecommendationScraper(); // Instancia de la clase

export async function GET(request:Request,context:any) {
    const {event,gender} = context.params;
   // const aliexpress = await scraper.getAliExpressProducts(params.search);
    const allData = await scraper.getRecommendation(event,gender);
    console.log(allData);


 return NextResponse.json({ respuesta:allData });
}

