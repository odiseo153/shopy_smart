/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react';
import { SortBar } from '../Components/SortBar';
//import { get_recomendation, get_recomendation_IA } from '../Api/ApiHandler';
import { Loading } from '../Components/Loading';
import { CardGrid } from '../Components/Cards/grid/CardGrid';
import { Input } from '../Components/Input';
import Header from '../Components/Header';
import { Eventos } from '../Data/Events';
import { CardList } from '../Components/Cards/List/CardList';
import { Autocomplete } from '../Components/AutoComplete';
import { Trash } from 'lucide-react';
import { Product } from '../Interfaces/Products';

interface Recommendation {
  recommendation_text: string;
  products: Record<string, any[]>;
  additional_info: string;
}

export default function Page() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState<string>("reunion");
  const [why, setWhy] = useState<string>('');
  const [gender, setGender] = useState<string>('hombres');
  const [productsApi, setProductsApi] = useState<Record<string, any[]> | null>(null);
  const [randomRecomendation, setRandomRecomendation] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [descripcionUser, setDescripcionUser] = useState<string>("");
  const [RecomendationDescripcionUser, setRecomendationDescripcionUser] = useState<Recommendation>();
  const [filterType, setFilterType] = useState("best-match");


  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/recomendation/${encodeURIComponent(search)}/${gender}`);
      const data = await response.json();

      console.log(data)

      setWhy(data.why);
      setProductsApi(data.respuesta.recommendations );
      setActiveFilters([]);


      getRandomRecomendation();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      getData();
    }
  };

  const handleSearchRecomendation = async () => {
    setIsLoading(true);

    if (descripcionUser.trim()) {
      const descRecomendation = await fetch(`/api/recomendation-ia/${encodeURIComponent(descripcionUser)}/${gender}`);
      const response = await descRecomendation.json();

      console.log(response);
      setRecomendationDescripcionUser(response);
      setIsLoading(false);
      
    }
  };

  const getRandomRecomendation = () => {
    if (productsApi) {
      const products = Object.entries(productsApi);
      const recomendations: any[] = [];
      products.forEach(([_, productArray]) => {
        const randomIndex = Math.floor(Math.random() * productArray.length);
        recomendations.push(productArray[randomIndex]);
      });
      setRandomRecomendation(recomendations);
      //   console.log(recomendations);
    }
  };

  const toggleFilter = (key: string) => {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(key)) {
        return prevFilters.filter(filter => filter !== key);
      } else {
        return [...prevFilters, key];
      }
    });
  };

  const getFilteredProducts = () => {
    if (!productsApi) return null;
    if (activeFilters.length === 0) return productsApi;

    const filteredProducts: Record<string, any[]> = {};
    Object.entries(productsApi).forEach(([key, products]) => {
      if (activeFilters.includes(key)) {
        filteredProducts[key] = products;
      }
    });
    return filteredProducts;
  };

  const renderRecomendationText = () => {
    if (!RecomendationDescripcionUser) return null;
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Recommendation</h2>
        <p>{RecomendationDescripcionUser.recommendation_text}</p>
        <h2 className="text-lg font-semibold mt-4 mb-2">Additional Info</h2>
        <p>{RecomendationDescripcionUser.additional_info}</p>
      </div>
    );
  };

  const renderFilters = () => {
    return (
      <div className="p-4  rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        {productsApi &&
          Object.keys(productsApi).map((key) => (
            <div key={key} className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(key)}
                  onChange={() => toggleFilter(key)}
                  className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
                />
                <span className="text-sm">{key}</span>
              </label>
            </div>
          ))}
      </div>
    );
  };

  const renderSection = (title: string, products: any[]) => (
    <div key={title} className="mb-8 mt-3 p-3">
      <div className="flex p-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-400 text-white flex-col items-center text-2xl font-bold shadow-lg mb-6">
        <h1>{title}</h1>
      </div>
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6'
            : 'space-y-4'
        }
      >
        {products.map((product, index) =>
          view === 'grid' ? (
            <CardGrid key={index} product={product} />
          ) : (
            <CardList key={index} product={product} />
          )
        )}
      </div>
    </div>
  );

  function handleSelectEvento(evento: string): void {
    console.log(evento)
    setSearch(evento);
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gray-100 py-4 shadow-sm">
        <SortBar view={view} onViewChange={setView}>
          <div className="flex flex-wrap items-center gap-4 px-4">
            <Input
              onChange={(e) => setDescripcionUser(e.target.value)}
              hidden
              placeholder="Describe tus características físicas"
              className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2"
            />
            <button
            hidden
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:outline-none"
            >
              Obtener Recomendación
            </button>

            <Autocomplete eventos={Eventos} onSelect={handleSelectEvento} />

            <button
              onClick={handleSearch}
              disabled={search.length < 2}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition focus:outline-none"
            >
              Buscar
            </button>

            <button
              onClick={getRandomRecomendation}
              hidden={!productsApi}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:outline-none"
            >
              No sé qué elegir
            </button>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="hombres">Hombre</option>
              <option value="mujeres">Mujer</option>
            </select>
          </div>
        </SortBar>
      </div>

      <div className="w-screen py-7 px-4 flex flex-wrap gap-6">
        {productsApi && (
          <aside className="w-full lg:w-1/5  shadow-md rounded-lg p-6 sticky top-6 h-fit">
            <div>
              {renderFilters()}
            </div>
          </aside>
        )}

        {/* Bloque de recomendaciones personalizadas */}
        {RecomendationDescripcionUser && (
          <aside className="w-full lg:w-1/3  shadow-md rounded-lg p-6 sticky top-6 h-fit">
            {renderRecomendationText()}
          </aside>
        )}

        {/* Sección principal */}
        <main className="flex-1">
          {/* Carga inicial */}
          {isLoading && <Loading />}

          {/* Mensaje inicial cuando no hay datos */}
          {!RecomendationDescripcionUser && !productsApi && !isLoading && (
            <div className="text-center mt-16">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Selecciona un evento !
              </h1>
              <p className="text-gray-600">
                Recibe recomendaciones personalizadas sobre qué usar en tu próximo evento o basadas en tu descripción física.
              </p>
            </div>
          )}

          {/* Bloque de recomendaciones aleatorias */}
          {randomRecomendation.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Recomendación</h1>
                <button
                  onClick={() => setRandomRecomendation([])}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <Trash />
                </button>
              </div>
              <div
                className={`${view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "space-y-4"
                  }`}
              >
                {randomRecomendation.map((product: any, index: number) =>
                  view === "grid" ? (
                    <CardGrid key={index} product={product} />
                  ) : (
                    <CardList key={index} product={product} />
                  )
                )}
              </div>
            </section>
          )}

          {/* Recomendaciones basadas en descripción */}
          {!isLoading &&
            RecomendationDescripcionUser &&
            Object.entries(RecomendationDescripcionUser?.products || {}).map(
              ([key, products]) => renderSection(key, products)
            )}

          {/* Productos filtrados */}
          {!isLoading &&
            productsApi &&
            !RecomendationDescripcionUser &&
            Object.entries(getFilteredProducts() || {}).map(([key, products]) =>
              renderSection(key, products)
            )}
        </main>
      </div>


    </div>
  );

}
