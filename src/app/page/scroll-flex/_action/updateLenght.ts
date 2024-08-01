"use server";

import storage from "@/lib/db/storage";
import { revalidatePath } from "next/cache";

export async function updateLenght(data: FormData) {
  const angka = data.get("angka") as string;

    await storage.setItem("angka", angka);
    revalidatePath("/page/scroll-flex", "page");
}
