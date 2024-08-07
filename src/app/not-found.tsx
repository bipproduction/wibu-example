import { Stack, Flex, ActionIcon, Box, Text } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return <Stack gap={0} >
        <Flex p={"sm"} pos={"sticky"} top={0} w={"100%"} style={{
            zIndex: 99,
            backdropFilter: "blur(30px)",
            borderBottom: "1px solid #444"
        }}>
            <ActionIcon variant="outline" radius={100} component={Link} href="/">
                <Text>{"<"}</Text>
            </ActionIcon>
        </Flex>
        <Box flex={1} p={"md"}>
            <Text>Halaman tidak ditemukan</Text>
        </Box>
    </Stack>
}