import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardGridSkeleton = () => {
  return (
    <Card className="max-w-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <CardContent className="p-6">
        {/* Radio Button Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-5 w-5 rounded" />
        </div>

        {/* Product Image Skeleton */}
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* Product Information Skeleton */}
        <div className="pt-4">
          {/* Brand and Icon Skeleton */}
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </span>
          </div>

          {/* Product Title Skeleton */}
          <Skeleton className="block line-clamp-2 min-h-[3rem]" />

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
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};