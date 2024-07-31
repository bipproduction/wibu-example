"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRevalidate(id: string) {
  try {
    const res = await prisma.revalidateExample.delete({
      where: {
        id,
      },
    });
    revalidatePath("/page/revalidate", "page");
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      message: error + "",
    };
  }
}
