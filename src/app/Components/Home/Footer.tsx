import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Shopy Smart</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolucionando las compras en línea con inteligencia artificial, personalización y comparación multi-tienda.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-600">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white flex items-center group">
                  <span className="transform transition-transform group-hover:translate-x-1">Inicio</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white flex items-center group">
                  <span className="transform transition-transform group-hover:translate-x-1">Cómo funciona</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white flex items-center group">
                  <span className="transform transition-transform group-hover:translate-x-1">Características</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white flex items-center group">
                  <span className="transform transition-transform group-hover:translate-x-1">Testimonios</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-600">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-400">odiseorincon@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <span className="text-gray-400">México, Ciudad de México</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-10 after:bg-blue-600">
              Newsletter
            </h3>
            <p className="text-gray-400">Suscríbete para recibir novedades, ofertas exclusivas y consejos de compra.</p>
            <div className="flex mt-4">
              <Input 
                type="email" 
                placeholder="Tu email" 
                className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 rounded-l-md rounded-r-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-l-none">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Shopy Smart. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

