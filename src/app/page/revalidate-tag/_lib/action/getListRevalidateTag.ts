"use server";


export async function getListRevalidateTag(origin: string) {

  const res = await fetch(
    `${origin}/page/revalidate-tag/api/revalidate-tag`,
    {
      next: {
        tags: ["revalidate-tag"],
      },
      cache: "no-cache"
    }
  );

  return res.json();
}
