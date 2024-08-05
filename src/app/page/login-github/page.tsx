"use client";
import { Stack, Text } from "@mantine/core";
import { SessionProvider } from "next-auth/react"
import { LoginUi } from "./_ui/LoginUi";

export default function Page({ session }: { session: any }) {
    return <Stack>
        <Text>Login Github</Text>
        <SessionProvider session={session}>
            <LoginUi />
        </SessionProvider>
    </Stack>
}