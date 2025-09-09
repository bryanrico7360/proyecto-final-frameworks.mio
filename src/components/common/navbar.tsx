"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-foreground">EcoShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/productos" className="text-foreground hover:text-primary transition-colors">
              Catálogo
            </Link>
            <Link
              href="/carrito"
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Carrito</span>
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Registrarse</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                href="/carrito"
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Carrito</span>
                {itemCount > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
