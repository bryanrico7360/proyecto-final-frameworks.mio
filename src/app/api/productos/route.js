import prisma from "@/lib/prisma"

export async function GET() {
  const productos = await prisma.productos.findMany()
  return Response.json(productos)
}

export async function POST(req) {
  const data = await req.json()
  const nuevoProducto = await prisma.productos.create({
    data
  })
  return Response.json(nuevoProducto)
}
