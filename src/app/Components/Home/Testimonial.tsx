import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "María G.",
      role: "Compradora frecuente",
      image: "https://imgcdn.stablediffusionweb.com/2024/5/10/d9622fb4-da27-4341-971c-6f703d897417.jpg",
      quote:
        "Shopy Smart ha cambiado completamente mi forma de comprar en línea. Las recomendaciones son increíblemente precisas.",
      stars: 5
    },
    {
      name: "Carlos R.",
      role: "Entusiasta de la tecnología",
      image: "https://www.next.us/cms/resource/blob/682046/f3f21e3b7dbc3a8acb9172dc053eef1c/170924-trending-feature-1-mens-data.jpg",
      quote:
        "La IA de Shopy Smart es impresionante. Me ahorra horas de búsqueda y siempre encuentra las mejores ofertas.",
      stars: 5
    },
    {
      name: "Laura M.",
      role: "Emprendedora",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg",
      quote:
        "Como dueña de negocio, valoro mucho mi tiempo. Shopy Smart me ayuda a hacer compras eficientes para mi empresa.",
      stars: 4
    },
  ]

  // Variantes para animación
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[80px] opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-[100px] opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Lo que dicen nuestros usuarios</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Testimonios de personas que han transformado su experiencia de compra con Shopy Smart</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative">
                {/* Comilla decorativa */}
                <div className="absolute -top-6 -left-2 text-7xl text-blue-200 opacity-50 font-serif">"</div>
                
                {/* Estrellas */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 relative z-10 text-lg leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center mt-8">
                  <div className="relative h-14 w-14 mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover border-2 border-blue-100"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Botón de acción */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a 
            href="#" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Únete a ellos
          </a>
        </motion.div>
      </div>
    </section>
  )
}

