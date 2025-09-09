import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { userId, items } = await req.json()

    // 1. Buscar el cliente relacionado al usuario
    const cliente = await prisma.clientes.findFirst({
      where: { usuario_id: userId }, // 👈 findFirst en lugar de findUnique
    })

    if (!cliente) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 400 }
      )
    }

    // 2. Crear pedido
    const pedido = await prisma.pedidos.create({
      data: {
        cliente_id: cliente.id,
        total: 0,
        status: "pending",
      },
    })

    let total = 0

    // 3. Insertar detalles y actualizar stock
    for (const item of items) {
      const producto = await prisma.productos.findUnique({
        where: { id: item.id },
      })

      if (!producto || producto.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${item?.name || "Producto"}` },
          { status: 400 }
        )
      }

      // 👇 Convertir Decimal a número
      const precio = Number(producto.price)
      const subtotal = precio * item.quantity
      total += subtotal

      await prisma.detalles_pedido.create({
        data: {
          pedido_id: pedido.id,
          producto_id: producto.id,
          cantidad: item.quantity,
          subtotal,
        },
      })

      await prisma.productos.update({
        where: { id: producto.id },
        data: { stock: producto.stock - item.quantity },
      })
    }

    // 4. Actualizar total del pedido
    await prisma.pedidos.update({
      where: { id: pedido.id },
      data: { total, status: "confirmed" },
    })

    // 5. Retornar productos actualizados
    const productos = await prisma.productos.findMany()

    return NextResponse.json({
      message: "✅ Pedido realizado con éxito",
      pedidoId: pedido.id,
      productos,
    })
  } catch (err) {
    console.error("Error en pedido:", err)
    return NextResponse.json(
      { error: "Error procesando el pedido" },
      { status: 500 }
    )
  }
}
