'use client'
import MarkdownPreview from "@uiw/react-markdown-preview";
export function DisplayPwaMd({ data }: { data: string }) {
    return <MarkdownPreview style={{
        padding: "1rem",
    }} source={data} />
}