import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const CardGridSkeleton = () => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Radio Button Skeleton */}
      <div className="mb-4">
        <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Product Image Skeleton */}
      <div className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-300 animate-pulse">
        <div className="h-full w-full bg-gray-400"></div>
      </div>

      {/* Product Information Skeleton */}
      <div className="pt-4">
        {/* Brand and Icon Skeleton */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
            <span className="h-4 w-20 bg-gray-300 animate-pulse"></span>
          </span>
        </div>

        {/* Product Title Skeleton */}
        <div className="block line-clamp-2 min-h-[3rem] bg-gray-300 animate-pulse"></div>

        {/* Rating Skeleton */}
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className="h-4 w-4 text-gray-300 animate-pulse"
            />
          ))}
        </div>

        {/* Price Skeleton */}
        <div className="mt-4 flex items-center justify-between">
          <span className="h-6 w-16 bg-gray-300 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};