import { Smartphone, Laptop, Shirt, Home, Gift, Car, Utensils, Dumbbell, Palette } from "lucide-react"

const categories = [
  { name: "Electrónica", icon: <Smartphone className="w-8 h-8" /> },
  { name: "Computación", icon: <Laptop className="w-8 h-8" /> },
  { name: "Moda", icon: <Shirt className="w-8 h-8" /> },
  { name: "Hogar", icon: <Home className="w-8 h-8" /> },
  { name: "Regalos", icon: <Gift className="w-8 h-8" /> },
  { name: "Automotriz", icon: <Car className="w-8 h-8" /> },
  { name: "Cocina", icon: <Utensils className="w-8 h-8" /> },
  { name: "Deportes", icon: <Dumbbell className="w-8 h-8" /> },
  { name: "Arte", icon: <Palette className="w-8 h-8" /> },
]

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Explora nuestras categorías</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full shadow-md mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

