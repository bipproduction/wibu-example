import { ActionIcon, Card, CloseIcon, Group, Stack, Text, Title } from "@mantine/core";
import { LoadDataRevalidate } from "./_ui/LoadDataRevalidate";
import { FormRevalidateExample } from "./_ui/FormRevalidateExample";
import { DeleteItemButton } from "./_ui/DeleteItemButton";

export default function Page() {
    return <Stack p={"lg"} gap={"lg"}>
        <Title order={2}>REVALIDATE</Title>
        <FormRevalidateExample />
        <LoadDataRevalidate>
            {(data: any[]) => <Stack>
                <Title order={3}>LIST DATA</Title>
                {data.map((item, index) => <Stack key={index}>
                    <Card>
                        <Group justify="end">
                            <DeleteItemButton id={item.id} />
                        </Group>
                        <Text>{item.name}</Text>
                        <Text fz={12} c={"gray"}>{item.desc}</Text>
                    </Card>
                </Stack>)}
            </Stack>}
        </LoadDataRevalidate>
    </Stack>
}