import { Button, Card, Flex, Stack, Text, TextInput, Title } from "@mantine/core";
import _ from "lodash";
import { headers } from 'next/headers';
import { createRevalidateTag } from "./_lib/action/createRevalidateTag";
import { getListRevalidateTag } from "./_lib/action/getListRevalidateTag";

export default async function Page() {
    const proto = headers().get("x-forwarded-proto");
    const host = headers().get("x-forwarded-host");
    const orign: any = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${proto}://${host}`)
        }, 500)
    })

    const list: any[] = await getListRevalidateTag(orign);
    return <Stack p={"md"}>
        {orign + ""}
        <Title order={3}>revalidate tag</Title>
        <Flex>
            <Card>
                <form action={createRevalidateTag}>
                    <Stack key={_.uniqueId()}>
                        <TextInput name="name" placeholder="name" />
                        <TextInput name="desc" placeholder="desc" />
                        <Button type="submit">Submit</Button>
                    </Stack>
                </form>
            </Card>
        </Flex>
        <Title order={3}>List Result</Title>
        <Stack gap={"0"}>
            {list.map((v, k) => <Flex gap={"md"} key={k}>
                <Text bg={"gray"} px={10} w={200} style={{
                    textAlign: "end"
                }}>{v.name}</Text>
                <Text>{v.desc}</Text>
            </Flex>)}
        </Stack>
    </Stack>
}