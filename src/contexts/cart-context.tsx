"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems(prev =>
      prev.find(i => i.id === item.id)
        ? prev.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        : [...prev, item]
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
