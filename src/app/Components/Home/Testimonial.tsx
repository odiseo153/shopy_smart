import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "María G.",
      role: "Compradora frecuente",
      image: "https://imgcdn.stablediffusionweb.com/2024/5/10/d9622fb4-da27-4341-971c-6f703d897417.jpg",
      quote:
        "Shopy Smart ha cambiado completamente mi forma de comprar en línea. Las recomendaciones son increíblemente precisas.",
    },
    {
      name: "Carlos R.",
      role: "Entusiasta de la tecnología",
      image: "https://www.next.us/cms/resource/blob/682046/f3f21e3b7dbc3a8acb9172dc053eef1c/170924-trending-feature-1-mens-data.jpg",
      quote:
        "La IA de Shopy Smart es impresionante. Me ahorra horas de búsqueda y siempre encuentra las mejores ofertas.",
    },
    {
      name: "Laura M.",
      role: "Emprendedora",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg",
      quote:
        "Como dueña de negocio, valoro mucho mi tiempo. Shopy Smart me ayuda a hacer compras eficientes para mi empresa.",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Lo que dicen nuestros usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

