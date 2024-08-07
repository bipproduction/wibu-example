import { dataPage } from "@/lib/list_page";
import { Box, Card, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { LoadReadme } from "./_component/LoadReadme";
import { DisplayReadme } from "./_component/DisplayReadme";


export default function Page() {
    return <Stack flex={1} h={"100vh"} w={"100%"}  p={"md"}>
        <Title>WIBU EXAMPLE</Title>
        <Flex wrap={"wrap"} gap={"md"} justify={"center"}>
            {dataPage.map((v, k) => <Card w={300} key={k} component={Link} href={v.url}>
                <Stack>
                    <Text>{v.name}</Text>
                </Stack>
            </Card>)}
        </Flex>
        <Box flex={1}>
            <LoadReadme >
                {(data) => <DisplayReadme data={data} />}
            </LoadReadme>
        </Box>
    </Stack>
}