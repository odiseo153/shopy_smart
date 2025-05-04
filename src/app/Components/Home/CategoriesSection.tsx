import { Smartphone, Laptop, Shirt, Home, Gift, Car, Utensils, Dumbbell, Palette } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  { 
    name: "Electrónica", 
    icon: <Smartphone className="w-8 h-8" />,
    bgColor: "bg-blue-500",
    hoverColor: "group-hover:bg-blue-600",
    textColor: "text-blue-600" 
  },
  { 
    name: "Computación", 
    icon: <Laptop className="w-8 h-8" />,
    bgColor: "bg-purple-500",
    hoverColor: "group-hover:bg-purple-600",
    textColor: "text-purple-600" 
  },
  { 
    name: "Moda", 
    icon: <Shirt className="w-8 h-8" />,
    bgColor: "bg-pink-500",
    hoverColor: "group-hover:bg-pink-600",
    textColor: "text-pink-600" 
  },
  { 
    name: "Hogar", 
    icon: <Home className="w-8 h-8" />,
    bgColor: "bg-green-500",
    hoverColor: "group-hover:bg-green-600",
    textColor: "text-green-600" 
  },
  { 
    name: "Regalos", 
    icon: <Gift className="w-8 h-8" />,
    bgColor: "bg-red-500",
    hoverColor: "group-hover:bg-red-600",
    textColor: "text-red-600" 
  },
  { 
    name: "Automotriz", 
    icon: <Car className="w-8 h-8" />,
    bgColor: "bg-gray-700",
    hoverColor: "group-hover:bg-gray-800",
    textColor: "text-gray-700" 
  },
  { 
    name: "Cocina", 
    icon: <Utensils className="w-8 h-8" />,
    bgColor: "bg-amber-500",
    hoverColor: "group-hover:bg-amber-600",
    textColor: "text-amber-600" 
  },
  { 
    name: "Deportes", 
    icon: <Dumbbell className="w-8 h-8" />,
    bgColor: "bg-cyan-500",
    hoverColor: "group-hover:bg-cyan-600",
    textColor: "text-cyan-600" 
  },
  { 
    name: "Arte", 
    icon: <Palette className="w-8 h-8" />,
    bgColor: "bg-indigo-500",
    hoverColor: "group-hover:bg-indigo-600",
    textColor: "text-indigo-600" 
  },
]

// Animación para el contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Animación para cada categoría
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Explora nuestras categorías</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-xl mx-auto">Encuentra lo que buscas entre nuestras diversas categorías de productos, cuidadosamente seleccionadas para ti</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div 
              key={index} 
              className="group cursor-pointer"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                <div className={`${category.bgColor} p-5 rounded-2xl shadow-lg mb-4 transform transition-all duration-300 text-white`}>
                  <div className="relative">
                    {category.icon}
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping"></span>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold ${category.textColor}`}>{category.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

