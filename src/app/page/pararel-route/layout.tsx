import { Card, Flex, Stack, Text } from "@mantine/core";

export default function Layout({ children, par1, par2 }: { par1: React.ReactNode, par2: React.ReactNode, children: React.ReactNode }) {
    return <Stack h={"100vh"} pos={"relative"} p={"md"}>
        <Flex gap={"md"}>
            <Card>
                <Stack>
                    <Text>pararel 1</Text>
                    {par1}
                </Stack>
            </Card>
            <Card>
                <Stack>
                    <Text>pararel 2</Text>
                    {par2}
                </Stack>
            </Card>
        </Flex>
        <Stack>
            {children}
        </Stack>
    </Stack>;
}