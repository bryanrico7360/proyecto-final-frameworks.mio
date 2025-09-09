import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"   
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoShop - Tu Tienda Online",
  description: "Tienda online moderna con productos de calidad",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <main className="min-h-screen pt-16">{children}</main>
              <Footer />
            </Suspense>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
