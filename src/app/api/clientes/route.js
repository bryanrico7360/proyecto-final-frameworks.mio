export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma"

export async function GET() {
  const clientes = await prisma.clientes.findMany({
    include: { usuario: true }
  })
  return Response.json(clientes)
}

export async function POST(req) {
  const data = await req.json()
  const nuevoCliente = await prisma.clientes.create({
    data
  })
  return Response.json(nuevoCliente)
}
