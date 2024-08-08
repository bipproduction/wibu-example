import { Button, Card, Flex, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { createRevalidateTag } from "./_lib/action/createRevalidateTag";
import { getListRevalidateTag } from "./_lib/action/getListRevalidateTag";
import _ from "lodash";

export default async function Page() {
    const list: any[] = await getListRevalidateTag();
    return <Stack p={"md"}>
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