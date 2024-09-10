import prisma from "@/lib/db/prisma";

export async function GET(
  req: Request,
  { params }: { params: { dir: string } }
) {
  const dirId = params.dir === "root" ? null : params.dir;
  const list = await prisma.dir.findMany({
    where: {
      dirId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return new Response(JSON.stringify({ data: list }));
}
