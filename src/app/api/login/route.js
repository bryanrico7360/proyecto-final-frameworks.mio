import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // Buscar usuario por email
    const usuario = await prisma.usuarios.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 })
    }

    // Comparar contraseñas
    const valido = await bcrypt.compare(password, usuario.password)
    if (!valido) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 400 })
    }

    // Retornar usuario sin la contraseña
    const { password: _, ...safeUser } = usuario
    return NextResponse.json({ usuario: safeUser }, { status: 200 })
  } catch (error) {
    console.error("❌ Error en login:", error)
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
