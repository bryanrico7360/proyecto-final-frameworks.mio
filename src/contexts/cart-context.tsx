"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // 🔹 Persistencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, itemCount, totalPrice, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider")
  return context
}
