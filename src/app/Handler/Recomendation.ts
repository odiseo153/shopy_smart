import OpenAI from 'openai';
import { EventData } from '../Interfaces/EventData';
import { Product } from '../Interfaces/Products';
import ProductsHandler from './ProductsHandler';
import { conjuntos_por_evento } from './data';


const api_key_deepseek = process.env.NEXT_PUBLIC_API_URL; // Reemplázalo con tu clave de API

if (!api_key_deepseek) {
  throw new Error("La variable de entorno NEXT_PUBLIC_API_URL no está definida.");
}

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: api_key_deepseek,
  dangerouslyAllowBrowser: true,
});

interface ResponseRecomendation{
  vestimentas:string[];
  por_que:string
}

export class RecommendationScraper {
  private productScraper = new ProductsHandler();


  async getOutfitRecommendation(userDescription: string) {
    try {
      const systemMessage = `
        Eres un asistente experto en moda y estilo personal. Se te proporcionará una descripción de un usuario y deberás:
        1. Extraer sus características físicas (ejemplo: alto, delgado, piel morena, cabello rizado).
        2. Extraer su personalidad (ejemplo: extrovertido, serio, creativo).
        3. Determinar el evento al que asistirá (ejemplo: boda, entrevista de trabajo, fiesta formal).
        4. Basándote en estos datos, proporcionar recomendaciones de vestimenta adecuadas para la ocasión.
        5. Explicar por qué se recomienda ese tipo de vestimenta.
  
        **Formato de respuesta esperado (JSON válido)**:
        {
          "vestimentas": ["Traje azul marino con camisa blanca.", "Blazer gris con pantalón oscuro."],
          "por_que": "Se recomienda esto porque..."
        }
  
        ### Descripción del usuario:
        "${userDescription}"
      `;
  
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          {
            role: "user",
            content: "Genera recomendaciones de vestimenta basadas en la descripción proporcionada.",
          },
        ],
        model: "deepseek-chat",
      });
  
      let response = completion.choices[0].message.content as string;
  
      // **Limpieza de la respuesta**
      response = response.trim(); // Elimina espacios en blanco innecesarios
      response = response.replace(/```json|```/g, ""); // Elimina etiquetas innecesarias (como ```json```)
  
      // **Intentar parsear la respuesta**
      const jsonResponse = JSON.parse(response);
  
      // **Verificar si tiene las claves correctas**
      if (!jsonResponse.vestimentas || !jsonResponse.por_que) {
        throw new Error("Respuesta JSON inválida");
      }
      const data = jsonResponse as ResponseRecomendation;

      const products = {} as {[key:string]:Product[]};
      const por_que = data.por_que;

      data.vestimentas.forEach(async (vestimenta, index) => {
        products[vestimenta] = await this.productScraper.getProductsGearbest(vestimenta);
      })

      return {products,por_que};

    } catch (error) {
      console.error("Error obteniendo la recomendación:", error);
      return {
        vestimentas: [],
        por_que: "No se pudo generar una recomendación en este momento.",
      };
    }
  }
  

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
