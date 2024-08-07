import { Stack } from "@mantine/core";

export default async function Page() {
    await new Promise(r => setTimeout(r, 5000))
    return <Stack>
        par 2
        ini dari par 2
    </Stack>
}