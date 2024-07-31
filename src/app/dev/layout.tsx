
import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import { getDevDrawer, toggleDevDrawer } from "./_action/toggleDrawer";
import { DevburgerButton } from "./_component/DevBurgerButton";
import { PanelMenu } from "./_ui/PanelMenu";
import Link from "next/link";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const open = await getDevDrawer()

    return <Stack gap={0} h={"100vh"} pos={"relative"} style={{
        overflowY: "scroll"
    }}>

        <Flex gap={"md"} p={"md"} justify={"space-between"}>
            <Flex gap={"md"}>
                <DevburgerButton />
                <Title order={3}>DEV</Title>
            </Flex>
            <Flex gap={"md"}>
                <Link href={"/"} style={{
                    textDecoration: "none",
                    color: "wheat"
                }}>Home</Link>
            </Flex>
        </Flex>
        <Flex gap={0} flex={1}>
            <Stack w={open ? 200 : 80} visibleFrom="md" p={"md"} className="border-right">
                <Flex justify={"end"} >
                    <form action={toggleDevDrawer}>
                        <ActionIcon variant="outline" radius={100} type="submit">
                            {open ? "x" : ">"}
                        </ActionIcon>
                    </form>
                </Flex>
                <PanelMenu />
            </Stack>
            <Stack flex={1}>
                {children}
            </Stack>
        </Flex>
    </Stack>
}