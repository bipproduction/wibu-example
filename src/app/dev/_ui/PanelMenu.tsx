'use client'
import { Stack, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const listPanelMenu = [
    {
        id: "0",
        name: "page",
        url: "/dev/"
    },
    {
        id: "1",
        name: "create menu",
        url: "/dev/page/create-menu"
    }
]
export function PanelMenu() {
    const segment = "/dev/" + useSelectedLayoutSegments().join("/")
    return <Stack>
        {listPanelMenu.map((item) => {
            return <Link style={{
                color: "white",
                fontWeight: segment === item.url ? "bold" : "normal"
            }} href={item.url} key={item.id}>
                <UnstyledButton >{item.name}</UnstyledButton>
            </Link>
        })}
    </Stack>
}