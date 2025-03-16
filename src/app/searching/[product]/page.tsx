'use client';

import { useEffect, useState } from "react";
import { SortBar } from "../../Components/SortBar";
import { Filters } from "../../Components/Filters";
import  FilterComponent  from "../../Components/FilterComponent";
import { CardList } from "../../Components/Cards/List/CardList";
import Header from "../../Components/Header";
import { Product } from "@/app/Interfaces/Products";
import { useParams } from "next/navigation";
import { CardGrid } from "@/app/Components/Cards/grid/CardGrid";
import { IA_Handler } from "@/app/Handler/IA_Handler";
import ComparationModal from "@/app/Components/ComparationModal";
import { CardGridSkeleton } from "@/app/Components/skeletons/CardGridSkeleton";
import ReactPaginate from "react-paginate";
import { FilterSkeleton } from "@/app/Components/skeletons/FilterSkeleton";



export default function Page() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComparation, setIsLoadingComparation] = useState(false);
  const [filterType, setFilterType] = useState("best-match");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparaciones, setComparaciones] = useState("");
  const [resultadoFinal, setResultadoFinal] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Número de productos por página

  const comparation = new IA_Handler();

  const { product: query } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;

      setIsLoading(true);
      setProducts([]);

      try {
        const response = await fetch(`/api/search/${encodeURIComponent(query as string)}`);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        if (!reader) {
          console.error("No readable stream available.");
          return;
        }

        let dataBuffer = "";
        setIsLoading(false);

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          dataBuffer += decoder.decode(value, { stream: true });
          const chunks = dataBuffer.split("\n");
          dataBuffer = chunks.pop() || "";

          for (const chunk of chunks) {
            if (chunk.trim()) {
              const parsedData = JSON.parse(chunk);
              setProducts((prev) => [...prev, ...(parsedData.products || [])]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [query]);

  const cleanPrice = (price: string = "") => parseFloat(price.replace(/[^0-9.]/g, "")) || 0;

  const filterProducts = (products: Product[], filterType: string): Product[] => {
    const sortFunctions = {
      "price-low": (a: Product, b: Product) => cleanPrice(a.product_price) - cleanPrice(b.product_price),
      "price-high": (a: Product, b: Product) => cleanPrice(b.product_price) - cleanPrice(a.product_price),
      orders_asc: (a: Product, b: Product) => a.product_title.localeCompare(b.product_title),
      orders_desc: (a: Product, b: Product) => b.product_title.localeCompare(a.product_title),
    };

    return sortFunctions[filterType as keyof typeof sortFunctions] ? [...products].sort(sortFunctions[filterType as keyof typeof sortFunctions]) : products;
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

  const preciosRangos = agruparPorRangos(
    products.filter((product) => product.brand === "ebay").map((x) => x.product_price),
    6
  );

  const filteredProducts = () => {
    const { min: minFilter, max: maxFilter } = priceFilter === "all"
      ? { min: 0, max: Infinity }
      : (() => {
          const [min, max] = priceFilter.replace("$", "").split("-").map(cleanPrice);
          return { min, max };
        })();

    return products.filter((product) => {
      const productPrice = cleanPrice(product.product_price);
      return (
        (platformFilter === "all" || product.brand.toLowerCase() === platformFilter) &&
        (priceFilter === "all" || (productPrice >= minFilter && productPrice <= maxFilter))
      );
    });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.product_url === product.product_url)
        ? prev.filter((p) => p !== product)
        : [...prev, product]
    );
  };

  const onPlatatformChange = (app:string) => {

    setPlatformFilter(app);
    setCurrentPage(1);
  };


  const handleExtractSelectedProducts =async () => {
    console.log("Productos seleccionados:", selectedProducts);
    setIsLoadingComparation(true);

    const comparaciones = await comparation.get_comparation(selectedProducts);

    setComparaciones(comparaciones.comparaciones);
    setResultadoFinal(comparaciones.resultadoFinal);
    setIsModalOpen(true);
    setIsLoadingComparation(false);

  }; 

  const uniqueBrands = Array.from(new Set(products.map((product) => product.brand.toLowerCase())));
  const filterlProducts = filterProducts(filteredProducts(), filterType);

  // Calcular los productos a mostrar en la página actual
  const offset = currentPage * itemsPerPage;
  const currentProducts = filterlProducts.slice(offset, offset + itemsPerPage);

  // Manejar el cambio de página
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-gray-100 py-3">
        <SortBar view={view} onViewChange={setView}>
          <div className="font-bold">Products: {filterlProducts.length}</div>
          <div className="container mx-auto flex items-center justify-between">
            <select
              className="px-3 py-2 border rounded-lg"
              onChange={(e) => setFilterType(e.target.value)}
            >
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
          <>
            <FilterComponent
              onPlatformChange={onPlatatformChange}
              onPriceChange={setPriceFilter}
              options={uniqueBrands}
              prices={preciosRangos}
              />
          </>
        )}
        {!products.length && <FilterSkeleton />}
        <main className="py-6 flex-1">
          {isLoading ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
           {[...Array(10)].map((_, i) => (
          <CardGridSkeleton key={i} />
        ))}
          </div>
          ) : !products.length ? (  
            <div className="text-center text-gray-700 py-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto mb-2 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.375 1.943 3.375h14.71c1.725 0 2.81-.875 1.943-3.375L12.7 9.75a1.5 1.5 0 00-2.4 0l-9.303 12.75z" />
              </svg>
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm text-gray-500">Please adjust your filters or search criteria.</p>
            </div>
          ) : (
            <>
              <div className={view === "grid" ? "p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" : "p-2 space-y-4"}>
                {currentProducts.map((product, i) =>
                  view === "grid" ? (
                    <CardGrid
                      key={i}
                      product={product}
                      isSelected={selectedProducts.some((p) => p.product_url === product.product_url)}
                      onSelect={handleSelectProduct}
                    />
                  ) : (
                    <CardList
                      key={i}
                      product={product}
                      isSelected={selectedProducts.some((p) => p.product_url === product.product_url)}
                      onSelect={handleSelectProduct}
                    />
                  )
                )}
              </div>
              <div className="mt-8 flex justify-center">
              <nav className="flex justify-center mt-4">
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={Math.ceil(filterlProducts.length / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination flex space-x-2"}
                  pageLinkClassName={"bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"}
                  previousLinkClassName={"bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"}
                  nextLinkClassName={"bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"}
                  activeClassName={"bg-blue-500 text-white font-medium py-2 px-2 rounded-md"}
                />
              </nav>
                </div>
            </>
          )}
        </main>
      </div>
      {selectedProducts.length > 1 &&(
        <>
          <ComparationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            comparaciones={comparaciones}
            resultadoFinal={resultadoFinal}
          />
          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleExtractSelectedProducts}
              disabled={isLoadingComparation}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
            >
              {isLoadingComparation ? <span>Loading...</span> : "Comparar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}