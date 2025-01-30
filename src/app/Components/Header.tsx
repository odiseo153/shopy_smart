'use client';

import { Bot, Menu, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react'; 
import { Input } from './Input';


export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const searchProduct = async () => {
    if (search.trim()) {
      setIsLoading(true);
      await router.push(`/searching/${encodeURIComponent(search.trim())}`);
      setIsLoading(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between">
        {/* Logo and Categories Menu */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <CategoriesMenu />
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="favicon.ico"
              alt="Shopy Smart Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 hover:text-green-500 transition">
              Shopy Smart
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:flex-1 sm:mx-6 mt-4 sm:mt-0">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchProduct()}
              className="p-2 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <button
              onClick={searchProduct}
              disabled={isLoading}
              className={`ml-2 px-4 py-2 text-sm sm:text-base text-white rounded-lg transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <span className="animate-spin mr-2">&#9696;</span>
                  Searching...
                </div>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {/* Recommendations Link */}
        <div className="flex items-center space-x-4 sm:space-x-6 mt-4 sm:mt-0">
          <Link
            href="/recomendation"
            className="flex items-center text-gray-800 hover:text-green-500 font-medium transition text-sm sm:text-base"
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Recomendaciones
          </Link>
        </div>
      </div>
    </header>
  );
}


const MenuUser = () => {
  return (
    <div>
      <div className="rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <button className="block w-full text-left hover:bg-gray-100 p-2 text-sm text-gray-700 rounded-lg transition">
            Iniciar Sesión
          </button>
          <button className="block w-full text-left hover:bg-gray-100 p-2 text-sm text-gray-700 rounded-lg transition">
            Registrarse
          </button>
        </div>
        <ul className="py-2">
          {["Mis Pedidos", "Mis Monedas", "Centro de Mensajes", "Pago", "Lista de Deseos", "Mis Cupones"].map((item, index) => (
            <li key={index}>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function CategoriesMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    { name: "Electronics", icon: "📱", url: "/searching/electronics" },
    { name: "Home Appliances", icon: "🏠", url: "/searching/home" },
    { name: "Fashion", icon: "👗", url: "/searching/fashion" },
    { name: "Watches", icon: "⌚", url: "/searching/watches" },
    { name: "Toys & Games", icon: "🧸", url: "/searching/toys" },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  href={category.url}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
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
