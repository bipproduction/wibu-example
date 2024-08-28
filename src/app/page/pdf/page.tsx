'use client'
import { Stack } from "@mantine/core";
import { PdfToImage } from "./_ui/PdfViewer";

export default function Page() {

    return <Stack>
        <PdfToImage  />
        {/* <PDF /> */}
    </Stack>
}