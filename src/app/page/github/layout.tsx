import { Flex, Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {

    return <Stack h={"100vh"} pos={"relative"} w={"100%"}>
        <Flex flex={1} >
            <Stack miw={200} p={"md"} style={{
                borderRight: "1px solid #444",
            }} >
                ini menunya
            </Stack>
            <Stack flex={1} >
                {children}
            </Stack>
        </Flex>
    </Stack>
}