import { ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Acerca de Shopy Smart</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Tu compañero de compras inteligente que revoluciona la forma en que compras en línea
        </p>
      </div>

      <div className="grid gap-12">
        <section className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Que es?</h2>
            <p className="text-muted-foreground text-lg"> 
              Shopy Smart es una plataforma innovadora diseñada para optimizar la experiencia de compra en línea. Nuestra misión es
              empoderar a los compradores con las herramientas y la información que necesitan para tomar decisiones de compra más inteligentes.
            </p>
            <p className="text-muted-foreground text-lg">
              Creemos que comprar debe ser eficiente, transparente y adaptado a tus necesidades. Es por eso que hemos
              construido una plataforma que reúne productos de múltiples tiendas, permitiéndote comparar y encontrar las
              mejores opciones en un solo lugar.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6 grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <ShoppingBag className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Compara</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Busca y compara productos de múltiples tiendas en un solo lugar</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <ShoppingBag className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Descubre</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Encuentra las mejores opciones en términos de precio, calidad y disponibilidad</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <ShoppingBag className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Rastrea</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Recibe alertas sobre descuentos o cambios de precio en artículos de interés</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <ShoppingBag className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Recomienda</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Toma decisiones informadas basada en Inteligencia artificial</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
