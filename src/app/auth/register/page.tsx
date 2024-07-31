import { Card, Stack, TextInput, Title } from "@mantine/core";
import { FormRegister } from "./_ui/FormRegister";

export default function Page() {
    return <Stack h={"100vh"} align="center" justify="center">
        <Card withBorder>
            <Stack>
                <Title order={3}>REGISTER</Title>
                <FormRegister />
            </Stack>
        </Card>
    </Stack>
}