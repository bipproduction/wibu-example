'use client'
import { Stack, Text } from "@mantine/core";
import dynamic from 'next/dynamic';
const PdfToImage = dynamic(() => import('./_ui/PdfViewer').then((mod) => mod.default), { ssr: false });
import { useSearchParams } from "next/navigation";
export default function Page() {
    return <Stack>
        <PdfToImage md="" />
    </Stack>
}