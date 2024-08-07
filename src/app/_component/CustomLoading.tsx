import { Skeleton, Stack } from "@mantine/core";

export function CustomLoading() {
    return <Stack gap={"md"}>
        <Skeleton h={10} />
        <Skeleton h={10} />
        <Skeleton h={10} />
        <Skeleton h={10} />
        <Skeleton h={10} />
        <Skeleton h={10} />
        <Skeleton h={10} />
    </Stack>
}