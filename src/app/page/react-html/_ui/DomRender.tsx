'use client'

import { renderToString } from "react-dom/server"

export function DomRender({ data }: { data: any }) {
    const html = renderToString(data)
    return <div>
        {html}
        disini datanaya
    </div>
}