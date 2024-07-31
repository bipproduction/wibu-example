'use client'

import { Button, Flex, Group, Stack, Text, TextInput } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { actionLogin } from "../_lib/actionLogin"

export function FormLogin() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    async function onLogin() {
        setLoading(true)

        if (formData.email === "" || formData.password === "") {
            setLoading(false)
            return alert("data tidak boleh ada yang kosong")
        }

        const action = await actionLogin(formData)
        if (!action.success) {
            setLoading(false)
            return alert("terjadi kesalahan")
        }

        setLoading(false)
        window.location.href = "/"
    }
    return <Stack>
        <TextInput value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} label={"email"} placeholder="ex: 0s0bH@example.com" />
        <TextInput value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} label={"password"} placeholder="ex: 12345678" />
        <Group justify="end">
            <Button loading={loading} onClick={onLogin}>LOGIN</Button>
        </Group>
        <Flex align={"center"}>
            <Text>jika anda belum memiliki akun silahkan register</Text>
            <Link href={'/auth/register'}>
                <Button variant="transparent">REGISTER</Button>
            </Link>
        </Flex>
    </Stack>
}