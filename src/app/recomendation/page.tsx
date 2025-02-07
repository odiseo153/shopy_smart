'use client';

import { useState } from 'react';
import { SortBar } from '../Components/SortBar';
import { Input } from '../Components/Input';
import Header from '../Components/Header';
import { Eventos } from '../Data/Events';
import { CardList } from '../Components/Cards/List/CardList';
import { Autocomplete } from '../Components/AutoComplete';
import { Trash } from 'lucide-react';
import { Product } from '../Interfaces/Products';
import { CardGrid } from '../Components/Cards/grid/CardGrid';
import { IA_Handler } from '../Handler/IA_Handler';
import ComparationModal from '../Components/ComparationModal';
import { CardGridSkeleton } from '../Components/skeletons/CardGridSkeleton';
import { RecommendationScraper } from '../Handler/Recomendation';


interface Recommendation {
  vestimentas:{[key:string]:Product[]};
  por_que: string;
}

export default function Page() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState<string>("reunion");
  const [gender, setGender] = useState<string>('hombres');
  const [productsApi, setProductsApi] = useState<Record<string, any[]> | null>(null);
  const [randomRecomendation, setRandomRecomendation] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [RecomendationDescripcionUser, setRecomendationDescripcionUser] = useState<Recommendation>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparaciones, setComparaciones] = useState("");
  const [resultadoFinal, setResultadoFinal] = useState("");
  const [userDesc, setUserDesc] = useState("soy una persona morena y soy confiado de mi mismo y voy a una boda");

  const comparation = new IA_Handler();

  const fetchData = async (url: string, setData: (data: any) => void) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.respuesta.recommendations);
      console.log(data);
      setActiveFilters([]);
      getRandomRecomendation();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (search.trim()) {
      console.log(search, gender)
      const data = await fetchData(`/api/recomendation/${encodeURIComponent(search)}/${gender}`, setProductsApi);
      return data;
    }
  };


  const getRecomendationUserDesc = async () => {
    if (userDesc.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/recomendation-ia/${encodeURIComponent(userDesc)}`);
        const data = await response.json();
        setRecomendationDescripcionUser(data);
        setProductsApi(data.vestimentas); // ✅ Guardar las vestimentas en el estado de productos
        setActiveFilters([]); // Resetear filtros
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  const getRandomRecomendation = () => {
    if (productsApi) {
      const recomendations = Object.values(productsApi).flat().map(productArray => productArray[Math.floor(Math.random() * productArray.length)]);
      setRandomRecomendation(recomendations);
    }
  };

  const toggleFilter = (key: string) => {
    setActiveFilters(prevFilters => prevFilters.includes(key) ? prevFilters.filter(filter => filter !== key) : [...prevFilters, key]);
  };

  const getFilteredProducts = () => {
    if (!productsApi) return null;
    return activeFilters.length === 0 ? productsApi : Object.fromEntries(Object.entries(productsApi).filter(([key]) => activeFilters.includes(key)));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProducts(prev => prev.some(p => p.product_url === product.product_url) ? prev.filter(p => p !== product) : [...prev, product]);
  };

  const handleExtractSelectedProducts = async () => {
    const { comparaciones, resultadoFinal } = await comparation.get_comparation(selectedProducts);
    setComparaciones(comparaciones);
    setResultadoFinal(resultadoFinal);
    setIsModalOpen(true);
  };


  const renderSection = (title: string, products: any[]) => (
    <div key={title} className="mb-8 mt-3 p-3">
      <div className="flex p-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-white flex-col items-center text-2xl font-bold shadow-lg mb-6">
        <h1>{title}</h1>
      </div>
      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6' : 'space-y-4'}>
        {isLoading ?
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <CardGridSkeleton key={i} />
            ))}
          </div>
          : products.map((product, index) => view === 'grid' ? <CardGrid key={index} product={product} isSelected={selectedProducts.some(p => p.product_url === product.product_url)} onSelect={handleSelectProduct} /> : <CardList key={index} product={product} />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gray-100 py-4 shadow-sm">

        <SortBar view={view} onViewChange={setView}>
          <div className="flex flex-wrap items-center gap-4 px-4">
            <div>
              <label htmlFor="event-autocomplete">Dime a donde asistirás</label>
              <Autocomplete eventos={Eventos} onSelect={setSearch} />
            </div>
            <hr className="" />
            <div>
              <label htmlFor="event-autocomplete">O describe tu estilo</label>
              <Input placeholder="Ej: busco un vestido elegante para una boda" onChange={(e) => setUserDesc(e.target.value)} />
            </div>

            <button onClick={handleSearch} hidden={search.length < 4} className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition focus:outline-none">Obtener Recomendación</button>
            <button onClick={getRandomRecomendation} hidden={!productsApi} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:outline-none">No sé qué elegir</button>
            <button onClick={getRecomendationUserDesc} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:outline-none">probar</button>

            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setGender(e.target.value)}>
              <option value="hombres">Hombre</option>
              <option value="mujeres">Mujer</option>
            </select>

          </div>
        </SortBar>
      </div>


      <div className="w-screen py-7 px-4 flex flex-wrap gap-6">
        {productsApi && (
          <aside className="w-full lg:w-1/5 shadow-md rounded-lg p-6 sticky top-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            {Object.keys(productsApi).map((key) => (
              <div key={key} className="mb-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={activeFilters.includes(key)} onChange={() => toggleFilter(key)} className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400" />
                  <span className="text-sm">{key}</span>
                </label>
              </div>
            ))}
          </aside>
        )}
        <main className="flex-1">
          {!RecomendationDescripcionUser && !productsApi && !isLoading && (
            <TextDefault />
          )}
          {randomRecomendation.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Recomendación</h1>
                <button onClick={() => setRandomRecomendation([])} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"><Trash /></button>
              </div>
              <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {isLoading ?
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                      <CardGridSkeleton key={i} />
                    ))}
                  </div>
                  : randomRecomendation.map((product, index) => view === "grid" ? <CardGrid key={index} product={product} isSelected={selectedProducts.some(p => p.product_url === product.product_url)} onSelect={handleSelectProduct} /> : <CardList key={index} product={product} />)}
              </div>
            </section>
          )}
         {!isLoading && RecomendationDescripcionUser && Object.entries(RecomendationDescripcionUser.vestimentas || {}).map(([key, products]) => 
  renderSection(key, products)
)}
          {!isLoading && productsApi && !RecomendationDescripcionUser && Object.entries(getFilteredProducts() || {}).map(([key, products]) => renderSection(key, products))}
        </main>
      </div>
      {selectedProducts.length > 0 && (
        <>
          <ComparationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} comparaciones={comparaciones} resultadoFinal={resultadoFinal} />
          <div className="fixed bottom-4 right-4">
            <button onClick={handleExtractSelectedProducts} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600">Comparar</button>
          </div>
        </>
      )}
    </div>
  );
}



const TextDefault = () => {

  return (
    <div className="text-center mt-1 flex flex-col items-center"> {/* Added flexbox for centering */}
      <img src="https://spotme.com/wp-content/uploads/2020/07/Hero-1.jpg" alt="Empty State" className="h-32 rounded-full  mx-auto mb-4" /> {/* Add an illustrative image */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">¡Selecciona un evento o describe tu estilo!</h1>
      <p className="text-gray-600 text-2xl mb-6">Recibe recomendaciones personalizadas sobre qué usar en tu próximo evento o basadas en tu descripción física.  ¡Comienza ahora!</p>
    </div>
  )
}