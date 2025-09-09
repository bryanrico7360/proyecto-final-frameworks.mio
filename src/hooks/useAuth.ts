"use client"

import { useState, useEffect } from "react"

// 🔹 Este hook simula autenticación simple leyendo desde localStorage
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Aquí podrías leer un token guardado en localStorage o cookies
    const token = localStorage.getItem("auth_token")
    setIsAuthenticated(!!token)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}
