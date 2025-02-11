import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "../../../Interfaces/Products";
import Link from 'next/link';
import Image from 'next/image';
import { Star } from "lucide-react";
import React from "react";

interface ProductProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

export const CardGrid: React.FC<ProductProps> = ({ product, isSelected, onSelect }) => {
  return (
    <Card className="max-w-sm shadow-md transition-transform duration-300 hover:scale-105">
      <CardHeader className="flex flex-col items-start gap-2">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(product)}
          aria-label={`Select ${product.product_title} for comparison`}
          className="self-end"
        />
        <div className="flex items-center gap-2">
          {product?.icon && (
            <Image src={product.icon} alt={`${product.brand} icon`} width={32} height={32}   className="" unoptimized />
          )}
          < CardTitle className="line-clamp-3">{product?.product_title}</CardTitle >
        </div>
        < CardDescription className="line-clamp-1 text-sm text-gray-500">{product?.brand}</CardDescription >
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-56 w-full overflow-hidden rounded-md">
          <Link href={product?.product_url} target="_blank" rel="noopener noreferrer">
            <Image src={product.product_photo} alt={product.product_title} fill sizes="(max-width: 768px) 100vw, 768px" unoptimized  style={{ objectFit: 'cover' }} className="h-full w-full object-contain transition-transform duration-500 hover:scale-110" />
          </Link>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{product?.brand}</Badge>
          <span className="text-lg font-semibold text-gray-900">{product?.product_price}</span>
        </div>
        {product.product_star_rating && (
          <div className="mt-2 flex items-center gap-1">
            {typeof product.product_star_rating === 'number' ? (
              <>
                {[...Array(product.product_star_rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </>
            ) : (
              <span className="text-gray-800 text-sm">{product.product_star_rating}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
