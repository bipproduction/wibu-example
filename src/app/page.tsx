import { dataPage } from "@/lib/list_page";
import { Card, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function Page() {
    return <Stack flex={1} h={"100vh"} w={"100%"} justify="center" align="center">
        <Title>WIBU EXAMPLE</Title>
        <Flex wrap={"wrap"} gap={"md"} justify={"center"}>
            {dataPage.map((v, k) => <Card w={300} key={k} component={Link} href={v.url}>
                <Stack>
                    <Text>{v.name}</Text>
                </Stack>
            </Card>)}
        </Flex>
    </Stack>
}