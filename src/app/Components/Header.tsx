'use client';

import { Bot, Menu, Search, ScanSearch, X, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AuthForm from './Auth/AuthComponent';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const searchProduct = async () => {
    if (search.trim()) {
      setIsLoading(true);
      await router.push(`/searching/${encodeURIComponent(search.trim())}`);
      setIsLoading(false);
      setIsMobileMenuOpen(false);
    }
  };

  const uploadImage = async (file: File) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/image-search', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al procesar la imagen');
      }
      
      const result = await response.json();
      setUploadLoading(false);
      return result;
    } catch (error) {
      setUploadLoading(false);
      console.error('Error:', error);
      throw error;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadImage(file);
        await router.push(`/searching/${encodeURIComponent(result.respuesta.busquedas[0].trim())}`);
        setIsMobileMenuOpen(false);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Enfocar input de búsqueda cuando se abre el menú móvil
  useEffect(() => {
    if (isMobileMenuOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }, [isMobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Categories - Izquierda */}
          <div className="flex items-center">
            <div className="block md:hidden mr-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-800 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded text-white hidden sm:flex">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Shopy Smart
              </h1>
            </Link>

            {/* Categorías - Visible solo en desktop */}
            <div className="hidden md:block ml-10">
              <CategoriesMenu />
            </div>
          </div>

          {/* Navegación - Centro - Desktop only */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Inicio
            </Link>
            <Link href="/recomendation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Recomendaciones
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Categorías
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Ofertas
            </Link>
          </nav>

          {/* Búsqueda y Acciones - Derecha */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda - Solo ícono en móvil */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchProduct()}
                  className="w-60 lg:w-80 pl-10 rounded-full border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
              
              <Button
                onClick={searchProduct}
                disabled={isLoading}
                className="ml-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                {isLoading ? (
                  <span className="animate-spin">&#9696;</span>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>

            {/* Ícono de búsqueda en móvil */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-800 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Botón principal de acción */}
            <Button 
              onClick={() => setIsAuthModalOpen(true)} 
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200"
              size="sm"
            >
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Iniciar sesión</span>
              <span className="sm:hidden">Login</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil con AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="bg-blue-600 p-1.5 rounded text-white">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Shopy Smart
                  </h1>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Buscador móvil */}
              <div className="p-4 border-b">
                <div className="relative flex items-center">
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchProduct()}
                    className="w-full pl-10 rounded-full"
                  />
                  <Search className="absolute left-3 text-gray-500 w-5 h-5" />
                  
                  <Button
                    onClick={searchProduct}
                    disabled={isLoading}
                    className="absolute right-1 rounded-full bg-blue-600 hover:bg-blue-700 px-3 h-8"
                  >
                    {isLoading ? (
                      <span className="animate-spin">&#9696;</span>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                {/* Botón de búsqueda por imagen */}
                <div className="mt-3 flex">
                  <Button variant="outline" size="sm" asChild className="w-full justify-center rounded-full">
                    <label className="cursor-pointer flex items-center gap-2">
                      <ScanSearch className="w-5 h-5 text-gray-600" />
                      <span>Buscar con imagen</span>
                      {uploadLoading ? (
                        <span className="animate-spin">&#9696;</span>
                      ) : (
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      )}
                    </label>
                  </Button>
                </div>
              </div>

              {/* Navegación móvil */}
              <nav className="p-4 space-y-1 border-b">
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-blue-600">🏠</span>
                  <span className="font-medium">Inicio</span>
                </Link>
                <Link 
                  href="/recomendation" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Recomendaciones IA</span>
                </Link>
                <div className="p-3 text-sm font-semibold text-gray-500 uppercase">Categorías</div>
                {/* Categorías en el menú móvil */}
                {[
                  { name: 'Electrónica', icon: '📱', url: '/searching/electronics' },
                  { name: 'Hogar', icon: '🏠', url: '/searching/home' },
                  { name: 'Moda', icon: '👗', url: '/searching/fashion' },
                  { name: 'Relojes', icon: '⌚', url: '/searching/watches' },
                  { name: 'Juguetes', icon: '🧸', url: '/searching/toys' },
                ].map((category, index) => (
                  <Link 
                    key={index}
                    href={category.url}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 pl-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Acciones en móvil */}
              <div className="p-4">
                <Button 
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                >
                  <User className="w-5 h-5 mr-2" />
                  Iniciar sesión
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Iniciar sesión o registrarse</DialogTitle>
            <DialogDescription>
              Accede a tu cuenta para disfrutar de todas las funciones de Shopy Smart.
            </DialogDescription>
          </DialogHeader>
          <AuthForm />
          <DialogFooter className="sm:justify-between">
            <div className="text-sm text-gray-500">
              ¿Aún no tienes cuenta? <Link href="#" className="text-blue-600 hover:underline">Regístrate</Link>
            </div>
            <Button 
              onClick={() => setIsAuthModalOpen(false)} 
              variant="outline"
              className="mt-2 sm:mt-0"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

function CategoriesMenu() {
  const categories = [
    { name: 'Electrónica', icon: '📱', url: '/searching/electronics' },
    { name: 'Hogar', icon: '🏠', url: '/searching/home' },
    { name: 'Moda', icon: '👗', url: '/searching/fashion' },
    { name: 'Relojes', icon: '⌚', url: '/searching/watches' },
    { name: 'Juguetes', icon: '🧸', url: '/searching/toys' },
    { name: 'Deportes', icon: '⚽', url: '/searching/sports' },
    { name: 'Belleza', icon: '💄', url: '/searching/beauty' },
    { name: 'Libros', icon: '📚', url: '/searching/books' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 px-3 py-2 rounded-full border-gray-300 hover:bg-gray-100 transition flex items-center gap-2 text-gray-700"
        >
          <Menu className="w-4 h-4" />
          <span>Categorías</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 bg-white rounded-xl shadow-xl border border-gray-200">
        <div className="grid grid-cols-2 gap-1">
          {categories.map((category, index) => (
            <DropdownMenuItem key={index} asChild className="rounded-lg px-3 py-2 hover:bg-blue-50">
              <Link href={category.url} className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
