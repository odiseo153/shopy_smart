import OpenAI from "openai";
import { Product } from "../Interfaces/Products";
import dotenv from 'dotenv';

dotenv.config();

const api_key = process.env.NEXT_PUBLIC_API_URL; 

if (!api_key) {
  throw new Error("La variable de entorno NEXT_PUBLIC_API_URL no está definida.");
}

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: api_key,
  dangerouslyAllowBrowser: true
});

export class ComparationHandler {
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
}