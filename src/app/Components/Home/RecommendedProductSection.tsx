import { Product } from "@/app/Interfaces/Products";
import { CardGrid } from "../Cards/grid/CardGrid";
import { CardGridSkeleton } from "../skeletons/CardGridSkeleton";
import { useState, useEffect } from "react";


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
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center relative">
       Productos
        <span className="block w-20 h-1.5 bg-blue-500 mx-auto mt-3 rounded-full"></span>
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(16)].map((_, i) => (
            <CardGridSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product, i) => (
            <CardGrid key={i} product={product} isSelected={false} onSelect={function (product: Product): void {
              throw new Error("Function not implemented.");
            } } />
          ))}
        </div>
      )}
    </section>
  );
}