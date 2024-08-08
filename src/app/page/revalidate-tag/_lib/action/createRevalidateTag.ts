"use server";

import prisma from "@/lib/db/prisma";
import { revalidateTag } from "next/cache";

export async function createRevalidateTag(formData: FormData) {
  const name = formData.get("name") as string;
  const desc = formData.get("desc") as string;

  const create = await prisma.revalidateTag.create({
    data: {
      name,
      desc,
    },
  });

  revalidateTag("revalidate-tag");
  console.log("success");
  return {
    success: true,
    data: create,
  };
}
