import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative">
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white rounded-full"></div>
          <div className="absolute top-40 right-10 w-20 h-20 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-10 left-40 w-40 h-40 bg-indigo-300 rounded-full"></div>
          <div className="absolute top-60 left-1/4 w-16 h-16 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 right-1/3 w-32 h-32 bg-blue-400 rounded-full"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start md:w-1/2 z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-blue-100 text-sm mb-8">
            <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
            <span>¡Nuevo! Recomendaciones personalizadas con IA</span>
          </div>
        
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Compra inteligente, <span className="text-yellow-300 inline-block">ahorra tiempo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-md leading-relaxed">
            Shopy Smart revoluciona tu experiencia de compra en línea con IA personalizada que entiende tus necesidades
          </p>
          
    
          
          <div className="mt-10 flex items-center space-x-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4,5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 overflow-hidden bg-gray-200">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${i+10}`}
                    alt={`User ${i}`}
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-blue-100">
              <strong className="text-white">+100</strong> usuarios confían en nosotros
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:w-1/2 mt-16 md:mt-0 z-10"
        >
          <motion.div 
            className="relative"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-30"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20"></div>
            <Image
              src="https://fal.media/files/panda/ufZvyywJxR93m9kX-pZ-Y.png"
              alt="Shopy Smart App"
              width={800}
              height={400}
              className="rounded-2xl shadow-2xl relative z-10 border border-white/10"
              priority
            />
            
            {/* Indicador flotante de características */}
            <motion.div 
              className="absolute -top-8 -right-8 bg-white rounded-xl shadow-lg p-3 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs font-medium text-gray-700">
                  Comparación inteligente
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>  
    </section>
  )
}

