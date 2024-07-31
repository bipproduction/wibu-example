"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
interface FormData {
  name: string;
  desc: string;
}
export async function createRevalidate(data: FormData) {
  try {
    const res = await prisma.revalidateExample.create({ data });
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
