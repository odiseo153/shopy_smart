import ProductScraper from "@/app/ScrappingHandler/ApiHandler";
import {  NextResponse } from 'next/server';

const scraper = new ProductScraper(); // Instancia de la clase

export  async function GET() {
 return NextResponse.json({ products: await scraper.getEbayProducts('iphone') }, {
   status: 200,
 });
}
  