'use client';

import { Bot, Menu, Search, ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Input } from './Input';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false); // Add loading state for image upload
  const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();


  const searchProduct = async () => {
    if (search.trim()) {
      setIsLoading(true);
      await router.push(`/searching/${encodeURIComponent(search.trim())}`);
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    setUploadLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/image-search', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al procesar la imagen');
    }
    setUploadLoading(false); // Set loading state to false after upload
    return await response.json();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadImage(file);
        await router.push(`/searching/${encodeURIComponent(result.respuesta.busquedas[0].trim())}`);
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

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between">
        {/* Logo & Categories */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <CategoriesMenu />
          <Link href="/" className="flex items-center space-x-2">
            <img src="favicon.ico" alt="Shopy Smart Logo" className="h-8 w-auto" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 hover:text-green-500 transition">
              Shopy Smart
            </h1>
          </Link>
        </div>

        {/* Search Bar & Image Upload */}
        <div className="w-full sm:flex-1 sm:mx-6 mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
          <div className="relative flex items-center w-full">
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchProduct()}
              className="p-2 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <Search className="absolute left-3 text-gray-500 w-5 h-5" />

            <label className="ml-2 cursor-pointer bg-blue-300 border rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-200 transition text-sm font-medium">
              <ScanSearch className="w-5 h-5 text-gray-600" />
            {uploadLoading  
            ?
            <span className="animate-spin ml-2">&#9696;</span>
            :     
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            } 
            </label>

            <button
              onClick={searchProduct}
              disabled={isLoading}
              className={`ml-2 px-4 py-2 flex items-center text-white rounded-lg transition-all ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isLoading ? (
                <span className="animate-spin mr-2">&#9696;</span>
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 mt-4 sm:mt-0">
            <Link href="/recomendation" className="flex items-center text-gray-800 hover:text-green-500 font-medium transition text-sm sm:text-base">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Recomendaciones
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const categories = [
    { name: 'Electronics', icon: '📱', url: '/searching/electronics' },
    { name: 'Home Appliances', icon: '🏠', url: '/searching/home' },
    { name: 'Fashion', icon: '👗', url: '/searching/fashion' },
    { name: 'Watches', icon: '⌚', url: '/searching/watches' },
    { name: 'Toys & Games', icon: '🧸', url: '/searching/toys' },
  ];

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition">
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Link href={category.url} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                  {category.icon} {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
