import OpenAI from "openai";
import { Product } from "../Interfaces/Products";
import dotenv from 'dotenv';
import { Buffer } from 'buffer';


dotenv.config();

const api_key_deepseek = process.env.NEXT_PUBLIC_API_URL; 
const API_KEY_GEMINIS = process.env.NEXT_PUBLIC_API_URL_GEMINIS; 


interface ClothingAnalysisResult {
  busquedas: string[];
  error?: string;
}

interface GeminiResponse {
  candidates: Array<{
      content: {
          parts: Array<{
              text: string;
          }>;
      };
  }>;
}





if (!api_key_deepseek) {
  throw new Error("La variable de entorno NEXT_PUBLIC_API_URL no está definida.");
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: api_key_deepseek,
  dangerouslyAllowBrowser: true
});

export class IA_Handler {
  // Método para comparar productos
  async get_comparation(products: Product[]) {
    try {
      // Verificar si hay productos para comparar
      if (products.length === 0) {
        throw new Error("No se proporcionaron productos para comparar.");
      }

      // Crear un mensaje detallado para el modelo
      const productDetails = products
        .map(
          (product, index) => `
          ### Producto ${index + 1}:
          - **Nombre**: ${product.product_title}
          - **Precio**: ${product.product_price}
          - **Marca**: ${product.brand}
          - **URL**: ${product.product_url}
        `
        )
        .join("\n");

      const systemMessage = `
        Eres un comparador de productos profesional. Te proporcionaré una lista de productos y quiero que compares sus características principales, incluyendo:
        1. Precio.
        2. Características destacadas.
        3. Ventajas y desventajas de cada uno.
        4. Una recomendación final basada en la mejor relación calidad-precio.

        Aquí están los detalles de los productos:
        ${productDetails}

        **Formato de respuesta requerido**:
        - La respuesta debe dividirse en dos secciones claras:
          1. **Comparaciones**: Una lista detallada de cada producto con su precio, características, ventajas y desventajas.
          2. **Resultado final**: Una recomendación final que resuma la mejor opción basada en la relación calidad-precio y otras consideraciones.

        **Ejemplo de formato**:
        ---
        ### Comparaciones:
        ### Producto 1: [Nombre del producto]
        - **Precio**: [Precio]
        - **Características destacadas**: [Características]
        - **Ventajas**: [Ventajas]
        - **Desventajas**: [Desventajas]

        ### Producto 2: [Nombre del producto]
        - **Precio**: [Precio]
        - **Características destacadas**: [Características]
        - **Ventajas**: [Ventajas]
        - **Desventajas**: [Desventajas]

        ### Resultado final:
        - **Recomendación final**: [Recomendación final basada en la relación calidad-precio y otras consideraciones].
      `;

      // Llamar a la API de OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          {
            role: "user",
            content: "Por favor, compara estos productos y proporciona una recomendación.",
          },
        ],
        model: "deepseek-chat",
      });

      // Obtener la respuesta del modelo
      const response = completion.choices[0].message.content as string;

      // Procesar la respuesta para dividirla en "Comparaciones" y "Resultado final"
      const [comparaciones, resultadoFinal] = this.processResponse(response);

      console.log("Comparaciones:", comparaciones);
      console.log("Resultado final:", resultadoFinal);

      return { comparaciones, resultadoFinal };
    } catch (error) {
      console.error("Error al comparar productos:", error);
      throw error; // Relanzar el error para que pueda ser manejado externamente
    }
  }

  // Método para procesar la respuesta y dividirla en dos partes
  private processResponse(response: string): [string, string] {
    const comparacionesStart = response.indexOf("### Comparaciones:");
    const resultadoFinalStart = response.indexOf("### Resultado final:");

    if (comparacionesStart === -1 || resultadoFinalStart === -1) {
      throw new Error("La respuesta del modelo no sigue el formato esperado.");
    }

    const comparaciones = response.slice(comparacionesStart, resultadoFinalStart).trim();
    const resultadoFinal = response.slice(resultadoFinalStart).trim();

    return [comparaciones, resultadoFinal];
  }



  async analyzeClothing(imageBase64: string): Promise<ClothingAnalysisResult> {
    const URL: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY_GEMINIS}`;

    try {
        const analysisPrompt: string = `
        Eres un asistente especializado en análisis de moda. Analiza la imagen y:
        1. Identifica todas las prendas de vestir visibles
        2. Para cada prenda:
           a. Proporciona el nombre técnico en español (ej: 'camiseta de manga corta')
           b. Indica color principal y posibles estampados
           c. Describe el estilo (ej: casual, formal, deportivo)
           d. Menciona posibles materiales (si son reconocibles)
           e. Ten en cuenta que es para realizar una búsqueda en diferentes plataformas online de compras
        3. Devuelve solo un JSON válido con la estructura:
           {
               "busquedas": ['vestido rojo con estampado','pantalones deportivos','zapatos elegantes']
           }
        `;

        const payload = {
            contents: [{
                role: "user",
                parts: [
                    { text: analysisPrompt },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: imageBase64
                        }
                    }
                ]
            }]
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: GeminiResponse = await response.json();
        const responseText = responseData.candidates[0].content.parts[0].text;
        
        const cleanedResponse = responseText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        return JSON.parse(cleanedResponse) as ClothingAnalysisResult;

    } catch (error: unknown) {
        let errorMessage = 'Error desconocido';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { 
            busquedas: [],
            error: `Error en el análisis: ${errorMessage}`
        };
    }
}

  
}