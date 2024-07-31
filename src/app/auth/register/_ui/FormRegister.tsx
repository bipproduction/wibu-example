'use client'

import { Button, Flex, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { actionRegister } from "../_lib/actionRegister"
import { redirect } from "next/navigation"

export function FormRegister() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function onRegister() {
        setLoading(true)
        if (formData.name === "" || formData.email === "" || formData.password === "") {
            setLoading(false)
            return alert("data tidak boleh ada yang kosong")
        }
        const action = await actionRegister(formData)
        // console.log(action)
        if (!action.success) {
            setLoading(false)
            return alert("terjadi kesalahan")
        }
        setLoading(false)
        window.location.href = "/auth/login"
    }
    return <Stack>
        <TextInput value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} label={"name"} placeholder="ex: paijo" />
        <TextInput value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} label={"email"} placeholder="ex: 0s0bH@example.com" />
        <PasswordInput value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} label={"password"} placeholder="ex: 12345678" />
        <Group justify="end">
            <Button loading={loading} onClick={onRegister}>REGISTER</Button>
        </Group>
        <Flex align={"center"}>
            <Text>jika anda sudah memiliki akun silahkan login</Text>
            <Link href={'/auth/login'}>
                <Button variant="transparent">LOGIN</Button>
            </Link>
        </Flex>
    </Stack>
}