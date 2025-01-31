import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format",
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format",
  },
  {
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format",
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format",
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
  },
  {
    name: "Toys",
    image: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=500&auto=format",
  },
];

export default function CategoriesSection() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    setIsRouterReady(true); // Removed the router.isReady check as it's unreliable with next/navigation
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCategoryClick = (categoryName: string) => {
      router.push(`/searching/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Título */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center relative">
        Explora nuestras categorías
        <span className="block w-20 h-1.5 bg-blue-500 mx-auto mt-3 rounded-full"></span>
      </h2>



      {/* Grid de categorías */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Imagen de la categoría */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay con el nombre de la categoría */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <p className="text-white text-lg font-semibold text-center transition-transform duration-300 transform group-hover:scale-110">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}