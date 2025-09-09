import prisma from "@/lib/prisma"

// Listar pedidos
export async function GET() {
  const pedidos = await prisma.pedidos.findMany({
    include: {
      cliente: { include: { usuario: true } },
      detalles: { include: { producto: true } }
    }
  })
  return Response.json(pedidos)
}

// Crear pedido vacío
export async function POST(req) {
  const { cliente_id } = await req.json()
  const pedido = await prisma.pedidos.create({
    data: { cliente_id, total: 0, estado: "pendiente" }
  })
  return Response.json(pedido)
}
