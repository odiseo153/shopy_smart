import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="flex flex-col items-start md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Compra inteligente, ahorra tiempo</h1>
          <p className="text-xl text-blue-100 mb-8">
            Shopy Smart revoluciona tu experiencia de compra en línea con IA personalizada
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Empieza ahora
          </Button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="https://fal.media/files/panda/ufZvyywJxR93m9kX-pZ-Y.png"
            alt="Shopy Smart App"
            width={800}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>  
    </section>
  )
}

