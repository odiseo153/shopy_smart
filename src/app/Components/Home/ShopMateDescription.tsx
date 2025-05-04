import { UserPlus, Search, Brain, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Regístrate",
      description: "Crea tu cuenta en segundos y personaliza tus preferencias de compra.",
      color: "bg-blue-500",
      delay: 0
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Explora",
      description: "Navega por miles de productos de tus tiendas favoritas en un solo lugar.",
      color: "bg-purple-500",
      delay: 0.1
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Recibe recomendaciones",
      description: "Nuestra IA analiza tus preferencias y te sugiere los mejores productos.",
      color: "bg-indigo-500",
      delay: 0.2
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Compra con confianza",
      description: "Realiza tus compras de forma segura y ahorra tiempo y dinero.",
      color: "bg-green-500",
      delay: 0.3
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: custom,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  }

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Cómo funciona <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Shopy Smart</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Descubre cómo nuestra plataforma te ayuda a encontrar los mejores productos con solo unos clics</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              custom={step.delay}
              className="relative"
            >
              {/* Línea conectora para escritorio */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 -right-4 h-0.5 w-8 bg-gray-300 z-0" />
              )}
              
              <Card className="flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className={`${step.color} h-2 w-full`}></div>
                <CardContent className="flex flex-col items-center text-center p-6 relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 rounded-full bg-white border-2 border-gray-100 w-10 h-10 flex items-center justify-center text-white font-bold shadow-md">
                    <div className={`${step.color} rounded-full w-full h-full flex items-center justify-center`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className={`rounded-full ${step.color} bg-opacity-10 p-4 mb-5 mt-4`}>
                    <div className={`text-${step.color.replace('bg-', '')}`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
