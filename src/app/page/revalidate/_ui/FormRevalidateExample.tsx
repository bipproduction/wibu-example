'use client'
import { Button, Card, Flex, Group, Stack, TextInput, Title } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";
import { createRevalidate } from "../_action/createRevalidate";

export function FormRevalidateExample() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
    })

    async function onCreate() {
        setLoading(true)
        if (_.values(formData).includes("")) {
            setLoading(false)
            return alert("all field must be filled")
        }

        const res = await createRevalidate(formData)
        if (!res.success) {
            setLoading(false)
            return alert(res.message)
        }

        setFormData({ name: "", desc: "" })
        setLoading(false)

    }
    return <Flex>
        <Card w={300}>
            <Stack>
                <Title order={3}>Create Data</Title>
                <TextInput value={formData.name} onChange={(value) => setFormData({ ...formData, name: value.currentTarget.value })} label={"name"} placeholder="name" />
                <TextInput value={formData.desc} onChange={(value) => setFormData({ ...formData, desc: value.target.value })} label={"desc"} placeholder="desc" />
                <Group justify="end">
                    <Button onClick={onCreate}>CREATE</Button>
                </Group>
            </Stack>
        </Card>
    </Flex>
}