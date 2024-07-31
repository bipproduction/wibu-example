"use server";

import prisma from "@/lib/db/prisma";
import { cookies } from "next/headers";
const secretKey = process.env.SECRET_KEY;
interface FormData {
  email: string;
  password: string;
}
export async function actionLogin(data: FormData) {
  const cookiesStore = cookies();
  try {
    const res = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!res) {
      return {
        success: false,
        message: "email tidak terdaftar",
      };
    }
    if (res.password !== data.password) {
      return {
        success: false,
        message: "password salah",
      };
    }

    cookiesStore.set("token", res.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      message: "success",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "terjadi kesalahan",
    };
  }
}
