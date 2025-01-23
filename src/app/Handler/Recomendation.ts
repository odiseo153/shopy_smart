import { EventData } from '../Interfaces/EventData';
import { Product } from '../Interfaces/Products';
import ProductsHandler from './ProductsHandler';
import { conjuntos_por_evento } from './data';

export class RecommendationScraper {
  private productScraper = new ProductsHandler();



  async getRecommendation(evento: string, gender: string): Promise<{ recommendations: { [key: string]: Product[] }, description: string }> {
    console.log(`Evento: ${evento}, Género: ${gender}`);

    const filteredData = conjuntos_por_evento.find(x => x.evento.toLowerCase() === evento.toLowerCase());
    if (!filteredData) {
      console.log(`Evento '${evento}' no encontrado.`);
      return { recommendations: {}, description: '' };
    }

    const data = filteredData[gender.toLowerCase() as keyof EventData] || '';
    const description = filteredData[`descripcion_${gender.toLowerCase()}` as keyof EventData] || '';

    if (!data) {
      console.log(`No se encontraron datos para género '${gender}' en el evento '${evento}'.`);
      return { recommendations: {}, description: '' };
    }

    const searchSuffix = gender.toLowerCase() === 'hombres' ? 'man' : 'woman';
    const recommendations = await this.getRecommendationsForItems(data.split(','), searchSuffix);

    return { recommendations, description };
  }

  private async getRecommendationsForItems(items: string[], searchSuffix: string): Promise<{ [key: string]: Product[] }> {
    const recommendations: { [key: string]: Product[] } = {};
    for (const item of items) {
      const itemCleaned = item.trim();
      const search = `${itemCleaned} for ${searchSuffix}`;
      recommendations[itemCleaned] = await this.fetchAllProducts(search);
    }
    return recommendations;
  }

  private async fetchAllProducts(search: string): Promise<Product[]> {
    const platforms = [
      this.productScraper.getEbayProducts
    /*
    this.productScraper.getAliExpressProducts,
    this.productScraper.getProductsGearbest,
    this.productScraper.getProductsRomwe,
    this.productScraper.getWalmartProducts,
    this.productScraper.getAsosProducts,
    this.productScraper.getBestBuyProducts,
    this.productScraper.getPatagoniaProducts,
    this.productScraper.getNikeProducts,
    */  
    ];

    const allData: Product[][] = [];
    for (const fn of platforms) {
      const data = await fn.call(this.productScraper, search);
      allData.push(data);
    }
  
    return allData.flat();
  }



}
