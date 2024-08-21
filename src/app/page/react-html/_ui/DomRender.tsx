'use client'

import { renderToString } from "react-dom/server"

export function DomRender({ data }: { data: any }) {
    const html = renderToString(data)
    return <div data-lyrics-container="true" dangerouslySetInnerHTML={{ __html: html }}>
       
    </div>
}