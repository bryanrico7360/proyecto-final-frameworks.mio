import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET → obtener todos los productos
export async function GET() {
  try {
    const productos = await prisma.productos.findMany()
    return NextResponse.json(productos, { status: 200 })
  } catch (error: any) {
    console.error("❌ Error GET productos:", error)
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

// POST → crear un nuevo producto
export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.name || !data.price) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const nuevoProducto = await prisma.productos.create({
      data: {
        name: data.name,
        description: data.description || "",
        price: data.price,
        stock: data.stock || 0,
      },
    })

    return NextResponse.json(nuevoProducto, { status: 201 })
  } catch (error: any) {
    console.error("❌ Error POST productos:", error)
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}
