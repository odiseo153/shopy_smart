import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      title: "Regístrate",
      description: "Crea tu cuenta en segundos y personaliza tus preferencias de compra.",
    },
    {
      title: "Explora",
      description: "Navega por miles de productos de tus tiendas favoritas en un solo lugar.",
    },
    {
      title: "Recibe recomendaciones",
      description: "Nuestra IA analiza tu físico y te sugiere los mejores productos.",
    },
    {
      title: "Compra con confianza",
      description: "Realiza tus compras de forma segura y ahorra tiempo y dinero.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Cómo funciona <span className="text-blue-600">Shopy Smart</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg">
              <CardContent className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 text-blue-600 p-3 mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
