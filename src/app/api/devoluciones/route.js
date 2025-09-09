import prisma from "@/lib/prisma"

export async function GET() {
  const devoluciones = await prisma.devoluciones.findMany()
  return Response.json(devoluciones)
}

export async function POST(req) {
  const data = await req.json()
  const devolucion = await prisma.devoluciones.create({ data })
  return Response.json(devolucion)
}
