import prisma from "@/lib/db/prisma";

export async function POST(
  request: Request,
  { params }: { params: { dir: string } }
) {
  try {
    const dirId = params.dir === "root" ? null : params.dir;
    const body = await request.json();
    const { name, variant } = body;
    const create = await prisma.dir.create({
      data: {
        name,
        dirId: dirId || null,
        variant: variant || "DIR"
      }
    });

    return new Response(JSON.stringify({ data: create }));
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
