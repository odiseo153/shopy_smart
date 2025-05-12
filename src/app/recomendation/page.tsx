'use client';

import { useState, useCallback } from 'react';
import { Trash, Search, Sparkles, User, Tag, RefreshCw, BarChart2 } from 'lucide-react';
import { SortBar } from '../Components/SortBar';
import { Input } from '@/components/ui/input';
import { Eventos } from '../Data/Events';
import { CardList } from '../Components/Cards/List/CardList';
import { Autocomplete } from '../Components/AutoComplete';
import { Product } from '../Interfaces/Products';
import { CardGrid } from '../Components/Cards/grid/CardGrid';
import { IA_Handler } from '../Handler/IA_Handler';
import ComparationModal from '../Components/ComparationModal';
import { CardGridSkeleton } from '../Components/skeletons/CardGridSkeleton';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Recommendation {
  vestimentas: { [key: string]: Product[] };
  por_que: string;
}

// Animaciones
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function RecommendationPage() {
  // Estados
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState<string>("reunion");
  const [gender, setGender] = useState<string>('hombres');
  const [productsApi, setProductsApi] = useState<Record<string, any[]> | null>(null);
  const [randomRecomendation, setRandomRecomendation] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [recommendationsFromDescription, setRecommendationsFromDescription] = useState<Recommendation>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparaciones, setComparaciones] = useState("");
  const [resultadoFinal, setResultadoFinal] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [activeTab, setActiveTab] = useState("evento");

  const comparation = new IA_Handler();

  // Funciones
  const fetchData = useCallback(async (url: string, setData: (data: any) => void) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.respuesta.recommendations);
      setActiveFilters([]);
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEventSearch = useCallback(async () => {
    if (search.trim()) {
      await fetchData(`/api/recomendation/${encodeURIComponent(search)}/${gender}`, setProductsApi);
    }
  }, [search, gender, fetchData]);

  const handleStyleSearch = useCallback(async () => {
    if (userDesc.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/recomendation-ia/${encodeURIComponent(userDesc)}`);
        const data = await response.json();
        setRecommendationsFromDescription(data);
        setProductsApi(data.vestimentas);
        setActiveFilters([]);
      } catch (error) {
        console.error('Error al obtener recomendaciones por descripción:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [userDesc]);

  const getRandomRecommendation = () => {
    if (!productsApi) return;
    
    const randomProducts = Object.entries(productsApi)
      .map(([key, productArray]) => {
        if (Array.isArray(productArray) && productArray.length > 0) {
          return productArray[Math.floor(Math.random() * productArray.length)];
        }
        return null;
      })
      .filter(product => product !== null);
      
    console.log('Random products:', randomProducts);
    setRandomRecomendation(randomProducts);
  };

  const toggleFilter = useCallback((key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) 
        ? prev.filter(filter => filter !== key) 
        : [...prev, key]
    );
  }, []);

  const getFilteredProducts = useCallback(() => {
    if (!productsApi) return null;
    
    return activeFilters.length === 0 
      ? productsApi 
      : Object.fromEntries(
          Object.entries(productsApi).filter(([key]) => 
            activeFilters.includes(key)
          )
        );
  }, [productsApi, activeFilters]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProducts(prev => 
      prev.some(p => p.product_url === product.product_url)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  }, []);

  const handleCompareProducts = useCallback(async () => {
    if (selectedProducts.length < 2) return;
    
    const { comparaciones, resultadoFinal } = await comparation.get_comparation(selectedProducts);
    setComparaciones(comparaciones);
    setResultadoFinal(resultadoFinal);
    setIsModalOpen(true);
  }, [selectedProducts, comparation]);

  // Renderizado de secciones
  const renderProductSection = useCallback((title: string, products: any[]) => (
    <motion.div 
      key={title} 
      className="mb-8 mt-3"
      variants={item}
      initial="hidden"
      animate="show"
    >
      <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-lg">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5"></div>
        <h2 className="relative z-10 text-center text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-4'}>
        {isLoading ? (
          Array(10).fill(0).map((_, i) => <CardGridSkeleton key={i} />)
        ) : (
          products.map((product, index) => 
            view === 'grid' 
              ? <CardGrid 
                  key={index} 
                  product={product} 
                  isSelected={selectedProducts.some(p => p.product_url === product.product_url)} 
                  onSelect={handleSelectProduct} 
                />
              : <CardList key={index} product={product} />
          )
        )}
      </div>
    </motion.div>
  ), [view, isLoading, selectedProducts, handleSelectProduct]);

  const renderEmptyState = useCallback(() => (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8 rounded-full bg-blue-100 p-6">
        <Sparkles className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">¡Encuentra tu estilo perfecto!</h2>
      <p className="max-w-lg text-gray-600">
        Selecciona un evento o descríbete para recibir recomendaciones personalizadas que se adapten a tu ocasión y estilo.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setActiveTab("evento")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Tag className="h-5 w-5" />
          Buscar por evento
        </Button>
        <Button 
          onClick={() => setActiveTab("estilo")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <User className="h-5 w-5" />
          Describir mi estilo
        </Button>
      </div>
    </motion.div>
  ), []);

  // Componente principal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior con pestañas y búsqueda */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="evento" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Buscar por evento
                </TabsTrigger>
                <TabsTrigger value="estilo" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  Describir mi estilo
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center">
                <SortBar view={view} onViewChange={setView} children={undefined} />
              </div>
            </div>
            
            <div className="p-4 pb-6 border-t">
              <TabsContent value="evento" className="mt-0">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-auto flex-1">
                    <label htmlFor="event-autocomplete" className="block text-sm font-medium text-gray-700 mb-1">
                      Evento
                    </label>
                    <Autocomplete eventos={Eventos} onSelect={setSearch} />
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <label htmlFor="gender-select" className="block text-sm font-medium text-gray-700 mb-1">
                      Género
                    </label>
                    <select 
                      id="gender-select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="hombres">Hombre</option>
                      <option value="mujeres">Mujer</option>
                    </select>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      onClick={handleEventSearch} 
                      disabled={search.length < 3 || isLoading}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⟳</span> Buscando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Search className="h-4 w-4" /> Buscar
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="estilo" className="mt-0">
                <div className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="w-full flex-1">
                    <label htmlFor="style-description" className="block text-sm font-medium text-gray-700 mb-1">
                      Describe tu estilo o físico y la ocasión
                    </label>
                    <textarea
                      id="style-description"
                      value={userDesc}
                      onChange={(e) => setUserDesc(e.target.value)}
                      placeholder="Ej: Soy una persona de tez morena, me gusta vestir casual pero elegante y busco outfit para una boda"
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  
                  <div>
                    <Button 
                      onClick={handleStyleSearch} 
                      disabled={userDesc.length < 10 || isLoading}
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⟳</span> Analizando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" /> Recomendar
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Barra lateral con filtros */}
          {productsApi && Object.keys(productsApi).length > 0 && (
            <motion.aside 
              className="w-full lg:w-64 sticky top-4  "
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-sm border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtros</h2>
                  {activeFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActiveFilters([])}
                      className="h-8 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
                
                <Separator className="mb-2" />
                
                <ScrollArea className="pr-4">
                  {Object.keys(productsApi).map((key) => (
                    <div key={key} className="mb-1">
                      <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input 
                          type="checkbox" 
                          checked={activeFilters.includes(key)} 
                          onChange={() => toggleFilter(key)} 
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400" 
                        />
                        <span className="text-sm capitalize">{key}</span>
                      </label>
                    </div>
                  ))}
                </ScrollArea>
                
                {productsApi && (
                  <div className="mt-6">
                    <Button 
                      onClick={getRandomRecommendation} 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Sugerencia aleatoria
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          )}

          {/* Contenido principal */}
          <main className="flex-1">
            {/* Estado inicial */}
            {!recommendationsFromDescription && !productsApi && !isLoading && renderEmptyState()}
            
            {/* Sección de recomendación aleatoria */}
            {randomRecomendation.length > 0 && (
              <motion.section 
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Sugerencia personalizada</h2>
                  </div>
                  <Button 
                    onClick={() => setRandomRecomendation([])} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4 mr-1" /> Descartar
                  </Button>
                </div>
                
                <div className={
                  view === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                    : "space-y-4"
                }>

                  {randomRecomendation.map((product, index) => 
                    view === "grid" 
                      ? <CardGrid 
                          key={index} 
                          product={product} 
                          isSelected={selectedProducts.some(p => p.product_url === product.product_url)} 
                          onSelect={handleSelectProduct} 
                        /> 
                      : <CardList key={index} product={product} />
                  )}
                </div>
              </motion.section>
            )}
            
            {/* Recomendaciones por descripción del usuario */}
            {!isLoading && recommendationsFromDescription && (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
              >
                {Object.entries(recommendationsFromDescription.vestimentas || {}).map(([key, products]) =>
                  renderProductSection(key, products)
                )}
                
                {recommendationsFromDescription.por_que && (
                  <motion.div 
                    className="mt-8 p-6 bg-white rounded-lg shadow-sm border"
                    variants={item}
                  >
                    <h3 className="text-lg font-medium mb-2">¿Por qué estas recomendaciones?</h3>
                    <p className="text-gray-600">{recommendationsFromDescription.por_que}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {/* Recomendaciones por evento */}
            {!isLoading && productsApi && !recommendationsFromDescription && (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
              >
                {Object.entries(getFilteredProducts() || {}).map(([key, products]) => 
                  renderProductSection(key, products)
                )}
              </motion.div>
            )}
            
            {/* Estado de carga */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {Array(8).fill(0).map((_, i) => <CardGridSkeleton key={i} />)}
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Modal de comparación y botón flotante */}
      {selectedProducts.length > 0 && (
        <>
          <ComparationModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            comparaciones={comparaciones} 
            resultadoFinal={resultadoFinal} 
          />
          
          <motion.div 
            className="fixed bottom-6 right-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Button 
              onClick={handleCompareProducts} 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-6 rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Comparar selección ({selectedProducts.length})</span>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
}