"use server";

import storage from "@/lib/db/storage";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateRepoPage(page: number) {
  await storage.init();
  storage.set("page", page);
//   revalidateTag("repo");
  revalidatePath("/page/github/module/user-repos");
}
