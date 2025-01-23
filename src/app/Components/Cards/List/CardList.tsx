import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../../Interfaces/Products";
import { useState } from "react";

interface ProductProps {
  product: Product;
  isSelected?: boolean; // Nuevo prop para indicar si el producto está seleccionado
  onSelect?: (product: Product) => void; // Nuevo prop para manejar la selección
}

export const CardList: React.FC<ProductProps> = ({ product, isSelected, onSelect }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const styles = {
    card: "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800",
    price: "text-gray-900 dark:text-gray-200",
    button: "bg-blue-600 hover:bg-blue-700"
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      className={`flex items-start space-x-6 rounded-lg border p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl ${styles.card} animate-fade-in`}
    >
      {/* Radio Button */}
        {isSelected && onSelect && 
      <div className="flex-shrink-0">
        <input
        placeholder="ra"
          type="radio"
          checked={isSelected}
          onChange={() => onSelect(product)}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
      }

      {/* Product Image */}
      <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <a href={product?.product_url} target="_blank" rel="noopener noreferrer">
          <img
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            src={product?.product_photo}
            alt={product?.product_title || "Product"}
          />
        </a>
      </div>

      {/* Product Information */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2">
            <img
              src={product?.icon}
              className="h-8 w-8"
              alt={`${product?.brand} logo`}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {product?.brand}
            </span>
          </span>
        </div>

        <a
          href={product?.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-lg font-semibold leading-snug text-gray-900 hover:underline dark:text-white"
        >
          {product?.product_title}
        </a>

        {/* Rating */}
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

        {/* Price */}
        <div className="mt-4">
          <span className={`block text-xl font-bold ${styles.price}`}>
            {product?.product_price}
          </span>
        </div>
      </div>
    </div>
  );
};