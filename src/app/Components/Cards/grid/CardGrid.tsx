import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../../Interfaces/Products";
import Link from 'next/link';

interface ProductProps {
  product: Product;
}

export const CardGrid: React.FC<ProductProps> = ({ product }) => {
  
  
  const Styles = {
    amazon: {
      cardBg: "bg-green-500",
      hoverBg: "hover:bg-green-100",
      borderColor: "border-green-300",
      cardDark: "dark:bg-green-900",
      priceColor: "text-green-700",
      iconBg: "bg-green-100 dark:bg-green-800",
    },
    aliexpress: {
      cardBg: "bg-red-500",
      hoverBg: "hover:bg-red-100",
      borderColor: "border-red-300",
      cardDark: "dark:bg-red-900",
      priceColor: "text-red-700",
      iconBg: "bg-red-100 dark:bg-red-800",
    },
    ebay: {
      cardBg: "bg-blue-500",
      hoverBg: "hover:bg-blue-100",
      borderColor: "border-blue-300",
      cardDark: "dark:bg-blue-900",
      priceColor: "text-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-800",
    },
    ikea: {
      cardBg: "bg-yellow-500",
      hoverBg: "hover:bg-yellow-100",
      borderColor: "border-yellow-300",
      cardDark: "dark:bg-yellow-900",
      priceColor: "text-yellow-700",
      iconBg: "bg-yellow-100 dark:bg-yellow-800",
    },
    romwe: {
      cardBg: "bg-pink-500",
      hoverBg: "hover:bg-pink-100",
      borderColor: "border-pink-300",
      cardDark: "dark:bg-pink-900",
      priceColor: "text-pink-700",
      iconBg: "bg-pink-100 dark:bg-pink-800",
    },
    gearbest: {
      cardBg: "bg-purple-500",
      hoverBg: "hover:bg-purple-100",
      borderColor: "border-purple-300",
      cardDark: "dark:bg-purple-900",
      priceColor: "text-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-800",
    },
    default: {
      cardBg: "bg-gray-500",
      hoverBg: "hover:bg-gray-100",
      borderColor: "border-gray-200",
      cardDark: "dark:bg-gray-800",
      priceColor: "text-gray-900",
      iconBg: "bg-gray-200 dark:bg-gray-700",
    },
  };
  

  const brandStyles = Styles[product.brand?.toLowerCase() as keyof typeof Styles] || Styles.default;

  return (
    <div
      className={`max-w-sm rounded-lg border ${brandStyles.borderColor} ${brandStyles.cardBg} p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${brandStyles.cardDark}`}
    >
      {/* Imagen del producto */}
      <div className="relative h-56 w-full overflow-hidden rounded-lg ">
        <Link href={product?.product_url} target="_blank" rel="noopener noreferrer">
          <img
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            src={product?.product_photo}
            alt={product?.product_title || "Product"}
            loading="lazy"
          />
        </Link>
      </div>

      {/* Información del producto */}
      <div className="pt-4">
        {/* Marca e icono */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${brandStyles.iconBg}`}
            >
              <img
                src={product?.icon}
                className="h-6 w-6 object-contain"
                alt={`${product?.brand} logo`}
                loading="lazy"
              />
            </div>
            <span className="text-bold font-medium  ">
              {product?.brand}
            </span>
          </span>
        </div>

        {/* Título del producto */}
        <Link
          href={product?.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block line-clamp-2 min-h-[3rem] font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product?.product_title}
        </Link>

        {/* Calificación */}
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className="h-4 w-4 text-yellow-400"
            />
          ))}
        </div>

        {/* Precio */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`text-lg font-bold  dark:text-dark`}
          >
            {product?.product_price}
          </span>
        </div>
      </div>
    </div>
  );
};
