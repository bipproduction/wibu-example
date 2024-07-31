'use client'
import { Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useCustomState } from "../_state/useCustomState";

export function CustomHookStateExample({ data }: { data: string }) {
    const [value, setValue] = useCustomState()
    return <Stack>
        <Card>
            <Stack>
                <Flex>
                    <Text>value : </Text>
                    <Text>{value}</Text>
                </Flex>
                <Group>
                    <Button onClick={() => setValue(value + 1)}>tekan</Button>
                </Group>
            </Stack>
        </Card>

        <MarkdownPreview source={data} style={{ padding: 16 }} />
    </Stack>
}