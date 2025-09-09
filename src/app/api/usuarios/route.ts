export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const data = await req.json()
    console.log("📩 Datos recibidos en el backend:", data)

    // Verificar si el email ya existe
    const existe = await prisma.usuarios.findUnique({
      where: { email: data.email },
    })

    if (existe) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    // Crear usuario y cliente en un solo paso
    const usuario = await prisma.usuarios.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "cliente",
        clientes: {
          create: {
            address: data.address,
            phone: data.phone,
          },
        },
      },
      include: {
        clientes: true, // para devolver también los datos del cliente
      },
    })

    console.log("✅ Usuario guardado en BD:", usuario)

    return NextResponse.json(usuario, { status: 201 })
  } catch (error) {
    console.error("❌ Error en POST /usuarios:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
