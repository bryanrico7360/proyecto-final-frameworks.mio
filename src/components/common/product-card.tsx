"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  rating?: number
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    addItem({ id: product.id, 
              name: product.name, 
              price: product.price, 
              quantity: 1 })
    setIsLoading(false)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card
      className={cn(
        "group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs">
              Agotado
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 hover:bg-background"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
            )}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-xs",
                      i < Math.floor(product.rating!) ? "text-yellow-400" : "text-muted-foreground",
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.rating})</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <Button onClick={handleAddToCart} disabled={!product.inStock || isLoading} size="sm" className="min-w-[100px]">
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
