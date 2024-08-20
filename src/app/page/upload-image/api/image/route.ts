import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "./src/app/page/upload-image/_assets");

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imageName = url.searchParams.get("name");

  if (!imageName) {
    return new Response("Image name is required", { status: 400 });
  }

  const filePath = path.join(root, imageName);

  try {
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return new Response("Image not found", { status: 404 });
    }

    // Baca file gambar
    const imageBuffer = fs.readFileSync(filePath);

    // Tentukan tipe konten (MIME type) berdasarkan ekstensi file
    const mimeType = getMimeType(imageName);

    // Kembalikan gambar sebagai respons
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
      },
    });
  } catch (error) {
    console.error("Error reading image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Helper function untuk mendapatkan MIME type berdasarkan ekstensi file
function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
