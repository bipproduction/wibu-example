import { ActionIcon, Box, Flex, Skeleton, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

    return <Stack gap={0}>
        <Flex p={"sm"} pos={"sticky"} top={0} w={"100%"} style={{
            zIndex: 99,
            backdropFilter: "blur(30px)",
        }}>
            <ActionIcon variant="outline" radius={100} component={Link} href="/">
                <Text>{"<"}</Text>
            </ActionIcon>
        </Flex>
        <Box flex={1}>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </Box>
    </Stack>
}

function Loading() {
    return <Stack>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
    </Stack>
}