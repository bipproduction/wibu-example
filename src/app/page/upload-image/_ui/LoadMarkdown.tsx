'use client'
import { Stack } from "@mantine/core";
import MarkdownPreview from '@uiw/react-markdown-preview';

export function LoadMarkdown({data}: {data: string}) {
    return <Stack>
        <MarkdownPreview source={data} style={{ padding: 16 }} />
    </Stack>
}