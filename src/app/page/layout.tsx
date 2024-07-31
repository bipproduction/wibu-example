import { ActionIcon, Box, Flex, Stack, Text } from "@mantine/core";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <Stack gap={0}>
        <Flex p={"sm"} pos={"sticky"} top={0}  w={"100%"} style={{
            zIndex: 99,
            backdropFilter: "blur(30px)",
        }}>
            <ActionIcon variant="outline" radius={100} component={Link} href="/">
                <Text>{"<"}</Text>
            </ActionIcon>
        </Flex>
        <Box flex={1}>
            {children}
        </Box>
    </Stack>
}