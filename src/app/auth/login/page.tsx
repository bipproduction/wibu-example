import { Card, Stack, Title } from "@mantine/core";
import { redirect } from "next/navigation";
import { actionUserValidation } from "./_lib/actionUserValidateion";
import { FormLogin } from "./_ui/formLogin";
// const secretKey =  process.env.SECRET_KEY!

export default async function Page() {
    const user = await actionUserValidation()

    if (user) {
        return redirect("/")
    }
    return <Stack h={"100vh"} align="center" justify="center">
        <Card withBorder>
            <Stack>
                <Title order={3}>LOGIN</Title>
                <FormLogin />
            </Stack>
        </Card>
    </Stack>
}