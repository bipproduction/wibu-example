'use client'

import { ActionIcon, CloseIcon } from "@mantine/core"
import { deleteRevalidate } from "../_action/deleteRevalidate"
import { useState } from "react"

export function DeleteItemButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    async function onDeleteItem() {
        if (confirm("mau hapus?")) {
            setLoading(true)
            const res = await deleteRevalidate(id)
            if (!res.success) {
                setLoading(false)
                return alert(res.message)
            }

            setLoading(false)
        }

    }
    return <ActionIcon radius={100} variant="outline" color="orange" onClick={onDeleteItem} loading={loading}>
        <CloseIcon />
    </ActionIcon>
}