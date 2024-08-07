"use server";
import Redis from "ioredis";
import { revalidatePath } from "next/cache";
const redis = new Redis();

export async function setName(name: string) {
  const res = await redis.set("name", name);
  revalidatePath("/page/redis");
  return res;
}

export async function getName() {
  const res = await redis.get("name");
  return res;
}
