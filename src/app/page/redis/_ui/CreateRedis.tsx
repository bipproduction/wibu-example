'use client'

import { Button, Group, Stack } from "@mantine/core"
import { setName } from "../_lib/redis"
import _ from "lodash"

export function CreateRedis() {

    async function onCreate() {
        const res = await setName("apa kabar" + _.random(999, 9999))
        console.log(res)
    }
    return <Group>
        <Button onClick={onCreate}>CREATE</Button>
    </Group>
}