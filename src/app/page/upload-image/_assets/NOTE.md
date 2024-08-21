# Upload Image


page.tsx
```ts
'use client'
import { Box, Button, Flex, Image, Stack, TextInput } from "@mantine/core";
import { useState } from "react";

export function UploadImagePage() {
    const [form, setForm] = useState<FileList | null>(null)
    const [image, setImage] = useState<string | null>(null)


    async function onClick() {
        if (!form) {
            return alert("no file");
        }
        const formData = new FormData();

        // file
        formData.append("file", form[0]);

        // name
        formData.append("name", "test");

        const res = await fetch("/page/upload-image/api/upload", {
            method: "POST",
            body: formData
        })

        if (res.ok) {
            const img = await res.text();
            setImage(img)
        }
    }
    return <Stack p={"md"}>
        <Box w={300}>
            <Image w={"100%"} src={"/page/upload-image/api/image?name=" + image} alt="" />
        </Box>
        <Flex>
            <Stack>
                <TextInput type="file" onChange={(e) => setForm(e.target.files)} />
                <Button onClick={onClick}>Upload</Button>
            </Stack>
        </Flex>
    </Stack>
}
```

api/image/route.ts

```ts
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

```

api/upload/route.png

```ts
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

```