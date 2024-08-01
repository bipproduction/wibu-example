"use server";
import Redis from "ioredis";
const redis = new Redis();

export async function setName(name: string) {
  const res = await redis.set("name", name);
  return res;
}

export async function getName() {
  const res = await redis.get("name");
  return res;
}
