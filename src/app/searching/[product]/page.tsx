'use client';

import { useEffect, useState } from "react";
import { SortBar } from "../../Components/SortBar";
import { Filters } from "../../Components/Filters";
import { Loading } from "../../Components/Loading";
import { CardList } from "../../Components/Cards/List/CardList";
import Header from "../../Components/Header";
import { Product } from "@/app/Interfaces/Products";
import { useParams } from "next/navigation";
import { CardGrid } from "@/app/Components/Cards/grid/CardGrid";

export default function Page() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState("best-match");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const { product: query } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search/${encodeURIComponent(query as string)}`);
        const data = await response.json();
        setProducts(data.respuesta || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  const cleanPrice = (price: string = "") => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

  const filterProducts = (products: Product[], filterType: string):Product[] => {
    const sortedProducts = {
      "price-low": [...products].sort((a, b) => cleanPrice(a.product_price) - cleanPrice(b.product_price)),
      "price-high": [...products].sort((a, b) => cleanPrice(b.product_price) - cleanPrice(a.product_price)),
      orders_asc: [...products].sort((a, b) => a.product_title.localeCompare(b.product_title)),
      orders_desc: [...products].sort((a, b) => b.product_title.localeCompare(a.product_title)),
    } as { [key: string]: Product[] };
    return sortedProducts[filterType] || products;
  };

  const agruparPorRangos = (preciosArray: string[], cantidadRangos: number) => {
    const precios = preciosArray.map(cleanPrice);
    const maxPrecio = Math.max(...precios);
    const minPrecio = Math.min(...precios);
    const rangoTamano = Math.ceil((maxPrecio - minPrecio) / cantidadRangos);
    return Array.from({ length: cantidadRangos }, (_, i) => {
      const inicioRango = minPrecio + i * rangoTamano;
      const finRango = inicioRango + rangoTamano - 1;
      return `${inicioRango.toFixed(0)}-${finRango.toFixed(0)}`;
    });
  };

  const preciosRangos = agruparPorRangos(products.map(product => product.product_price), 6);

  const filteredProducts = () => {
    const cleanedPrice = (priceRange: string) => {
      const [min, max] = priceRange.replace("$", "").split("-").map(parseFloat);
      return { min, max };
    };
    return products.filter(product => {
      const { min: minFilter, max: maxFilter } = cleanedPrice(priceFilter);
      const { min: productMin, max: productMax } = cleanedPrice(product.product_price);
      return (platformFilter === "all" || product.brand.toLowerCase() === platformFilter) &&
             (priceFilter === "all" || (productMin >= minFilter && productMax <= maxFilter));
    });
  };

  const uniqueBrands = Array.from(new Set(products.map(product => product.brand.toLowerCase())));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gray-100 py-3">
        <SortBar view={view} onViewChange={setView}>
          <div className="container mx-auto flex items-center justify-between">
            <select className="px-3 py-2 border rounded-lg" onChange={(e) => setFilterType(e.target.value)}>
              <option value="best-match">Best Match</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="orders_asc">A - Z</option>
              <option value="orders_desc">Z - A</option>
            </select>
          </div>
        </SortBar>
      </div>
      <div className="flex flex-col lg:flex-row">
        {products.length > 0 && (
          <Filters 
            onPlatformChange={setPlatformFilter} 
            onPriceChange={setPriceFilter} 
            options={uniqueBrands}
            prices={preciosRangos} 
          />
        )}
        <main className="py-6 flex-1">
          {isLoading ? <Loading /> : (
            !products.length ? <p className="text-center text-gray-600">No products found.</p> : (
              <div className={view === "grid" ? "p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4" : "p-2 space-y-4"}>
                {filterProducts(filteredProducts(), filterType).map((product, i) =>
                  view === "grid" ? <CardGrid key={i} product={product} /> : <CardList key={i} product={product} />
                )}
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}
