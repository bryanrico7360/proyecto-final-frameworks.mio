"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeOff, User, Mail, Lock, MapPin, Phone } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mensaje, setMensaje] = useState<string | null>(null) // 👈 mensaje de éxito
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null) // 👈 error general

  const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.name.trim()) {
    newErrors.name = "El nombre es requerido"
  }

  if (!formData.email.trim()) {
    newErrors.email = "El email es requerido"
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "El email no es válido"
  }

  if (!formData.password) {
    newErrors.password = "La contraseña es requerida"
  } else if (formData.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres"
  }

  if (!formData.address.trim()) {
    newErrors.address = "La dirección es requerida"
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "El teléfono es requerido"
  } else if (!/^\d+$/.test(formData.phone)) {
    newErrors.phone = "El teléfono solo puede contener números"
  } else if (Number(formData.phone) <= 0) {
    newErrors.phone = "El teléfono no puede ser negativo ni cero"
  } else if (formData.phone.length > 10) {
    newErrors.phone = "El teléfono no puede tener más de 10 dígitos"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje(null)
    setErrorGeneral(null)

    if (validateForm()) {
      try {
        const res = await fetch("/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const data = await res.json()

        if (!res.ok) {
          setErrorGeneral(data.error || "Error en el registro")
          return
        }

        // ✅ Mensaje de éxito
        setMensaje("Cuenta creada exitosamente 🎉")

        // Opcional: limpiar formulario
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
        })
      } catch (err) {
        setErrorGeneral("Ocurrió un error en el registro")
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/5 via-background to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <span className="text-secondary-foreground font-bold text-2xl">E</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Únete a EcoShop</h1>
          <p className="text-muted-foreground mt-2">
            Crea tu cuenta y comienza a comprar
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Completa tus datos para registrarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Tu dirección completa"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.address ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              {/* Botón */}
              <Button type="submit" className="w-full" size="lg">
                Crear Cuenta
              </Button>

              {/* Mensajes */}
              {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
              {errorGeneral && <p className="text-red-600 text-center">{errorGeneral}</p>}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </div>
            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Volver al inicio
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
