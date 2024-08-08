"use server";
import { headers } from "next/headers";

export async function getListRevalidateTag() {
  // host
  const host = headers().get("host");

  // protocol
  const protocol = headers().get("x-forwarded-proto") || "http";
  const res = await fetch(
    `${protocol}://${host}/page/revalidate-tag/api/revalidate-tag`,
    {
      next: {
        tags: ["revalidate-tag"],
      },
    }
  );

  return res.json();
}
