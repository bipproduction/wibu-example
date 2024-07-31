"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function toggleDevDrawer() {
  const cookiesStore = cookies();
  const dopen = (cookiesStore.get("dopen")?.value || "true") === "true";
  cookiesStore.set("dopen", "" + !dopen, {});
  console.log(dopen);
  revalidatePath("/dev");
}

export async function getDevDrawer() {
  const cookiesStore = cookies();
  const dopen = (cookiesStore.get("dopen")?.value || "true") === "true";
  return dopen;
}
