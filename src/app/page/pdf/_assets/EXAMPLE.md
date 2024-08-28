```tsx
'use client'
import { useEffect, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Image, Skeleton, Stack } from '@mantine/core';

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';

export const PdfToImage = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const renderPages = async () => {
      try {
        const loadingTask = getDocument('/assets/ternak_lele.pdf');
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;
        const imagePromises = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const renderPage = async (pageNum: number) => {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2.0 });

            // Buat elemen canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Render halaman PDF ke dalam canvas
            const renderContext: any = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;

            // Konversi canvas ke gambar (data URL)
            return canvas.toDataURL('image/png');
          };

          imagePromises.push(renderPage(pageNum));
        }

        const imageSrcs = await Promise.all(imagePromises);
        setImages(imageSrcs);
      } catch (error) {
        console.error('Error rendering PDF to images:', error);
      }
    };

    renderPages();
  }, []);

  return (
    <div>
      {images.length > 0
        ? images.map((src, index) => <Image key={index} src={src} alt={`Page ${index + 1}`} />)
        : <CustomLoading />}
    </div>
  );
};

function CustomLoading() {
  return <Stack p={"md"}>
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
  </Stack>
}

```