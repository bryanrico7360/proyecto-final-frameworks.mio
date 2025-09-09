"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"  // 👈 importamos el contexto

export interface Product {
  id: number
  name: string
  description: string
  price: string | number  
  stock: number
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()   // 👈 obtenemos el usuario

  const handleAddToCart = async () => {
    if (!user) {
      // 👈 si no hay usuario, redirige a login
      window.location.href = "/login"
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
    })

    setIsLoading(false)
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          <Badge
            variant={product.stock > 0 ? "default" : "secondary"}
            className="text-xs"
          >
            {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(Number(product.price))}
        </span>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isLoading}
          size="sm"
          className="min-w-[100px]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-1" />
              Agregar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
