import { ShoppingBag, Search, Lightbulb, BellRing, BadgePercent } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const features = [
    {
      icon: <Search className="h-6 w-6 text-blue-500" />,
      title: "Compara",
      description: "Busca y compara productos de múltiples tiendas en un solo lugar"
    },
    {
      icon: <BadgePercent className="h-6 w-6 text-green-500" />,
      title: "Descubre",
      description: "Encuentra las mejores opciones en términos de precio, calidad y disponibilidad"
    },
    {
      icon: <BellRing className="h-6 w-6 text-amber-500" />,
      title: "Rastrea",
      description: "Recibe alertas sobre descuentos o cambios de precio en artículos de interés"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-purple-500" />,
      title: "Recomienda",
      description: "Toma decisiones informadas basada en Inteligencia artificial"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-20 overflow-hidden">
      <motion.div 
        className="flex flex-col items-center text-center space-y-4 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="inline-block p-3 bg-blue-600 rounded-full mb-4">
          <ShoppingBag className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Acerca de Shopy Smart
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-600 max-w-[800px]">
          Tu compañero de compras inteligente que revoluciona la forma en que compras en línea
        </p>
      </motion.div>

      <div className="grid gap-16">
        <section className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-100 rounded-full"></div>
              <h2 className="text-3xl font-bold relative z-10">¿Qué es Shopy Smart?</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed"> 
              Shopy Smart es una plataforma innovadora diseñada para optimizar la experiencia de compra en línea. Nuestra misión es
              empoderar a los compradores con las herramientas y la información que necesitan para tomar decisiones de compra más inteligentes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Creemos que comprar debe ser eficiente, transparente y adaptado a tus necesidades. Es por eso que hemos
              construido una plataforma que reúne productos de múltiples tiendas, permitiéndote comparar y encontrar las
              mejores opciones en un solo lugar.
            </p>
            <div className="flex space-x-2">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Inteligencia Artificial</span>
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">Comparador</span>
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Multi-tienda</span>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardHeader className="pb-2 space-y-1">
                      <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-gray-600">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
