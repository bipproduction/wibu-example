'use client'
import { Container } from '@mantine/core';
import MarkdownPreview from '@uiw/react-markdown-preview';
export function DisplayReadme({ data }: { data: string }) {
    return <MarkdownPreview style={{
        padding: "1rem",
        borderRadius: "0.5rem",
    }} source={data} />
}