'use client'

import { Button, Stack } from "@mantine/core"
import { setName } from "../_lib/redis"

export function CreateRedis() {

    async function onCreate() {
        const res = await setName("apa kabar")
        console.log(res)
    }
    return <Stack>
        <Button onClick={onCreate}>CREATE</Button>
    </Stack>
}