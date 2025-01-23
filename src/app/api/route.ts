import ProductsHandler from "@/app/Handler/ProductsHandler";
import {  NextResponse } from 'next/server';

const scraper = new ProductsHandler(); // Instancia de la clase

export  async function GET() {
 return NextResponse.json({ products: await scraper.getEbayProducts('iphone') }, {
   status: 200,
 });
}
  