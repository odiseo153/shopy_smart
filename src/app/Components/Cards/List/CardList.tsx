import { Product } from "../../../Interfaces/Products";
import { useState } from "react";
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProductProps {
  product: Product;
  isSelected?: boolean; // Nuevo prop para indicar si el producto está seleccionado
  onSelect?: (product: Product) => void; // Nuevo prop para manejar la selección
}

export const CardList: React.FC<ProductProps> = ({ product, isSelected, onSelect }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="animate-fade-in transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardContent className="p-6 flex space-x-6 items-start">
        {/* Radio Button */}
        {isSelected && onSelect &&
          <div className="flex-shrink-0">
            <RadioGroup defaultValue={isSelected ? "item-1" : ""} onValueChange={() => onSelect(product)}>
              <RadioGroupItem value="item-1" className="h-5 w-5 cursor-pointer"  />
            </RadioGroup>
          </div>
        }

        {/* Product Image */}
        <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
          <a href={product?.product_url} target="_blank" rel="noopener noreferrer">
            <Image
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              src={product?.product_photo}
              alt={product?.product_title || "Product"}
            />
          </a>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <CardHeader className="p-0 pb-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Image
                  src={product?.icon}
                  className="h-8 w-8"
                  alt={`${product?.brand} logo`}
                />
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300 p-0">
                  {product?.brand}
                </CardTitle>
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <a
              href={product?.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-semibold leading-snug text-gray-900 hover:underline dark:text-white"
            >
              {product?.product_title}
            </a>

            {/* Rating
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`h-4 w-4 ${
                    i < (product?.product_star_rating || 5)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {product?.product_star_rating?.toFixed(1) || "5.0"}
              </span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                ({product?.product_star_rating || 455})
              </span>
            </div>
                */}

            {/* Price */}
            <div className="mt-4">
              <CardDescription className="block text-xl font-bold text-gray-900 dark:text-gray-200 p-0">
                {product?.product_price}
              </CardDescription>
            </div>
          </CardContent>
        </div>
      </CardContent>
    </Card>
  );
};