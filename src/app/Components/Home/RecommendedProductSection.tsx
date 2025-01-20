import { Product } from "@/app/Interfaces/Products";
import { CardGrid } from "../Cards/grid/CardGrid";
import { useState, useEffect } from "react";
import { Loading } from "../Loading";



export default function RecommendedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Mostrar el spinner al iniciar la carga
      setProducts([]); // Reiniciar la lista de productos antes de una nueva búsqueda

      try {
        const response = await fetch(`/api/search/${encodeURIComponent("shoes")}`);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        if (!reader) {
          console.error("No readable stream available.");
          setIsLoading(false); // Ocultar el spinner si no hay flujo de lectura disponible
          return;
        }

        let dataBuffer = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          dataBuffer += decoder.decode(value, { stream: true });

          const chunks = dataBuffer.split("\n");
          dataBuffer = chunks.pop() || ""; // Mantén datos incompletos para la próxima iteración

          for (const chunk of chunks) {
            if (chunk.trim()) {
              const parsedData = JSON.parse(chunk);

              // Agregar los nuevos productos a la lista existente
              setProducts((prevProducts) => [...prevProducts, ...(parsedData.products || [])]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Ocultar el spinner después de la carga
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {isLoading ? (
<div className="flex items-center justify-center min-h-screen">
  <div className="relative">
    <div className="relative w-32 h-32">
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
        style={{ animationDuration: '3s' }}
      ></div>

      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
        style={{ animationDuration: '2s', animationDirection: 'reverse' }}
      ></div>
    </div>

    <div
      className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"
    ></div>
  </div>
</div>

      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product, i) => (
            <CardGrid key={i} product={product}/>
          ))}
        </div>
      )}
    </section>
  );
}