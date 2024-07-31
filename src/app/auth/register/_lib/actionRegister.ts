"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
}
export async function actionRegister(data: FormData) {
  try {
    const res = await prisma.user.create({ data });
    return {
        success: true,
        message: "success"
    }
  } catch (error) {
    console.log(error);
    return {
        success: false,
        message: "terjadi kesalahan"
    };
  }
}
