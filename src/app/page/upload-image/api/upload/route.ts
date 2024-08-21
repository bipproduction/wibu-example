import fs from "fs";
import path from "path";
import _ from "lodash";

const root = path.join(process.cwd(), "./src/app/page/upload-image/_assets");

export async function POST(request: Request) {
  // Terima file gambar dari klien
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!file) {
    return new Response("No file", { status: 400 });
  }

  const fileName = _.kebabCase(file.name)+'.png';
  const filePath = path.join(root, fileName);

  // Konversi ArrayBuffer ke Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Tulis file ke sistem
  fs.writeFileSync(filePath, buffer);

  return new Response(fileName);
}
