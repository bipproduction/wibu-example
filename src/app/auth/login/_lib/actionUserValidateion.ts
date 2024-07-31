"use server";

import prisma from "@/lib/db/prisma";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined in environment variables.");
}

export async function actionUserValidation() {
  try {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token")?.value || "";

    if (!token) {
      console.error("Token is missing");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token,
      },
    });

    if (!user) {
      console.error(`No user found with ID: ${token}`);
      return null;
    }

    console.log(token, user, token, secretKey);

    return user;
  } catch (error) {
    console.error("Error validating user:", error);
    return null;
  }
}
