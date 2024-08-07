'use client'
import { Container } from '@mantine/core';
import MarkdownPreview from '@uiw/react-markdown-preview';
export function DisplayReadme({ data }: { data: string }) {
    return <Container p={"md"}>
        <MarkdownPreview style={{
            padding: "1rem",
        }} source={data} />
    </Container>
}