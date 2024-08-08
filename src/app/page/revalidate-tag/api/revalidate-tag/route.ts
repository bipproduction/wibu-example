import prisma from "@/lib/db/prisma";

async function listRevalidate() {
  const list = await prisma.revalidateTag.findMany();
  return list;
}

export async function GET() {
  const list = await listRevalidate();
  return Response.json(list);
}
