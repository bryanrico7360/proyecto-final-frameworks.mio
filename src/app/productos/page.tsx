"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/common/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid3X3, List } from "lucide-react"
import { sampleProducts, categories } from "@/lib/product"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"
type SortOption = "name" | "price-low" | "price-high" | "rating"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sampleProducts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo de Productos</h1>
        <p className="text-muted-foreground">Descubre nuestra amplia selección de productos de calidad</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground",
                selectedCategory === category && "bg-primary text-primary-foreground",
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">{filteredAndSortedProducts.length} productos encontrados</div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
          )}
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} className={viewMode === "list" ? "flex-row" : ""} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>
          <p className="text-muted-foreground mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("Todos")
            }}
          >
            Limpiar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
