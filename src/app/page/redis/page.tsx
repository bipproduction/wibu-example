import { Stack, Text } from "@mantine/core";
import { CreateRedis } from "./_ui/CreateRedis";
import { getName } from "./_lib/redis";

export default async function Page() {
    const name = await getName()
    return <Stack p={"md"}>
        <Text>Redis</Text>
        {name}
        <CreateRedis />
    </Stack>
}