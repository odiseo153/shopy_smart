import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../../Interfaces/Products";
import Link from 'next/link';

interface ProductProps {
  product: Product;
  isSelected: boolean; // Indicates if the product is selected
  onSelect: (product: Product) => void; // Handles product selection
}

export const CardGrid: React.FC<ProductProps> = ({ product, isSelected, onSelect }) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Radio Button */}
      <div className="mb-4">
        <input
        placeholder="radio"
        type="checkbox" 
        checked={isSelected}
        onChange={() => onSelect(product)}
        className="h-5 w-5 cursor-pointer"
        />
      </div>  

      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-lg">
        <Link href={product?.product_url} target="_blank" rel="noopener noreferrer">
          <img
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            src={product?.product_photo}
            alt={product?.product_title || "Product"}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="pt-4">
        {/* Brand and Icon */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200">
              <img
                src={product?.icon}
                className="h-6 w-6 object-contain"
                alt={`${product?.brand} logo`}
                loading="lazy"
              />
            </div>
            <span className="font-medium text-gray-800">
              {product?.brand}
            </span>
          </span>
        </div>

        {/* Product Title */}
        <Link
          href={product?.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block line-clamp-2 min-h-[3rem] font-semibold leading-tight text-gray-900 hover:underline"
        >
          {product?.product_title}
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className="h-4 w-4 text-yellow-400"
            />
          ))}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {product?.product_price}
          </span>
        </div>
      </div>
    </div>
  );
};