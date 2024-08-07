import { Box, Flex, Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <Stack h={"100vh"}  pos={"relative"}>
        <Flex flex={1}>
            <Stack miw={200} style={{
                borderRight: "1px solid gray"
            }}>
                kiri
            </Stack>
            <Box flex={1}>
                {children}
            </Box>
        </Flex>
    </Stack>;
}