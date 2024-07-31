import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { FormLogin } from "./_ui/formLogin";
import { cookies } from 'next/headers'
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { actionUserValidation } from "./_lib/actionUserValidateion";
import { redirect } from "next/navigation";
const secretKey =  process.env.SECRET_KEY!

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