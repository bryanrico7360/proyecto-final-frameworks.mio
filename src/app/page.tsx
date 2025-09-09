import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Shield, Truck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Descubre Productos
              <span className="text-primary"> Increíbles</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              La mejor selección de productos con calidad garantizada, envío rápido y precios competitivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/productos">
                <Button size="lg" className="w-full sm:w-auto">
                  Ver Catálogo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Crear Cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Por qué elegir EcoShop?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compra online con garantías que nos respaldan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Amplio Catálogo</h3>
              <p className="text-muted-foreground">Miles de productos de las mejores marcas disponibles para ti.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground">Recibe tus productos en 24-48 horas en toda la ciudad.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Compra Segura</h3>
              <p className="text-muted-foreground">Tus datos y pagos están protegidos con la mejor tecnología.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para comenzar?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos y descubre por qué somos la tienda online preferida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/productos">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explorar Productos
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
