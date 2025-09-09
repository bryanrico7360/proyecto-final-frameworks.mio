"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Minus, Plus } from "lucide-react"

export default function CarritoPage() {
  const { items, clearCart, addToCart, removeFromCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [productosActualizados, setProductosActualizados] = useState<any[]>([])

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = "/login"
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          items,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error en el pedido")

      setMensaje(data.message)
      clearCart()
      setProductosActualizados(data.productos) // 👈 refresca catálogo
    } catch (err) {
      setMensaje("❌ Hubo un problema con el pedido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">Tu carrito está vacío</p>
      ) : (
        <Card className="p-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Botón disminuir */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    item.quantity > 1
                      ? addToCart({ ...item, quantity: -1 })
                      : removeFromCart(item.id)
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <span className="px-2">{item.quantity}</span>

                {/* Botón aumentar */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                >
                  <Plus className="w-4 h-4" />
                </Button>

                {/* Botón quitar */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between pt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button onClick={handleCheckout} disabled={loading} className="w-full">
            {loading ? "Procesando..." : "Finalizar Compra"}
          </Button>
        </Card>
      )}

      {mensaje && <p className="mt-4 font-medium">{mensaje}</p>}

      {productosActualizados.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Catálogo actualizado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productosActualizados.map((p) => (
              <Card key={p.id} className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p>${Number(p.price).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Stock: {p.stock}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
