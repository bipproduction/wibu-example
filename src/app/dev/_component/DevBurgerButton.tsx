'use client'

import { ActionIcon, Burger, Drawer, Stack } from "@mantine/core"
import { useState } from "react"
import { useOpenDrawer } from "../_state/useOpenDrawer"
import { PanelMenu } from "../_ui/PanelMenu"

export function DevburgerButton() {
    const [open, setOpen] = useOpenDrawer()
    return <Stack gap={0} hiddenFrom="md">
        <Burger color="white" opened={open} onClick={() => setOpen(!open)} />
        <Drawer classNames={{ content: "theme", header: "theme" }} opened={open} onClose={() => setOpen(false)}>
            <PanelMenu />
        </Drawer>
    </Stack>
}
