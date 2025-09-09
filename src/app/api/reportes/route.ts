export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma"

export async function GET() {
  const ventas = await prisma.$queryRaw`SELECT ventas_totales() AS total`
  return Response.json(ventas[0])
}
