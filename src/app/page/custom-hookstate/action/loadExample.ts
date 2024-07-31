"use server";
import fs from "fs";
import path from "path";
const root = path.join(process.cwd(), "./src/app/page/custom-hookstate");
export async function loadExampleHookState() {
  const example = fs.readFileSync(
    path.join(root, "_assets/example.md"),
    "utf-8"
  );

  console.log(example);
  return example;
}
