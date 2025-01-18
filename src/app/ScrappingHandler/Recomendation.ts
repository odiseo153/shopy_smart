import { EventData } from '../Interfaces/EventData';
import { Product } from '../Interfaces/Products';
import ProductsHandler from './ProductsHandler'; // Importa la clase ProductScraper
import { conjuntos_por_evento } from './data';


export class RecommendationScraper {
  private productScraper: ProductsHandler;

  constructor() {
    this.productScraper = new ProductsHandler();
  }

  async getRecommendation(evento: string, gender: string): Promise<{recommendations: {[key: string]: Product[]}, description: string}> {
    console.log(`Evento: ${evento}, Género: ${gender}`);

    // Filtrar datos por evento
    const filteredData = conjuntos_por_evento.filter((x) => x.evento.toLowerCase() === evento.toLowerCase());

    if (filteredData.length === 0) {
      console.log(`Evento '${evento}' no encontrado.`);
      return {recommendations: {}, description: ''}; 
    }

    const dataKey = gender.toLowerCase() as keyof EventData; 
    const descriptionKey = `descripcion_${gender.toLowerCase()}`;
    const data = filteredData[0][dataKey as keyof EventData] || '';
    const description = filteredData[0][descriptionKey as keyof EventData] || '';

    if (!data) {
      console.log(`No se encontraron datos para género '${gender}' en el evento '${evento}'.`);
      return {recommendations: {}, description: ''}; 
    }

    const items = data.split(',');
    const recommendations: {[key: string]: Product[]} = {};

    // Determinar el sufijo de búsqueda según el género
    const searchSuffix = gender.toLowerCase() === 'hombres' ? 'man' : 'woman';

    for (const item of items) {
      const itemCleaned = item.trim();
      const search = `${itemCleaned} for ${searchSuffix}`;

      // Obtener productos de todas las plataformas
      const allData = [
         ...(await this.productScraper.getAliExpressProducts(search)),
         ...(await this.productScraper.getEbayProducts(search)),
         ...(await this.productScraper.getProductsGearbest(search)),
          ...(await this.productScraper.getProductsRomwe(search)),
          ...(await this.productScraper.getWalmartProducts(search)),
          ...(await this.productScraper.getAsosProducts(search)),
          ...(await this.productScraper.getBestBuyProducts(search)),
          ...(await this.productScraper.getPatagoniaProducts(search)),
          ...(await this.productScraper.getNikeProducts(search)),
       ];

      // Combinar todas las recomendaciones en una sola lista
      recommendations[itemCleaned] = allData;
    }

    return {recommendations, description};
  }
}
