import { Stack, TextInput } from "@mantine/core";
import { useState } from "react";

export function FormCreateMenu() {
    const [formData, setFormData] = useState({
        name: "",
    })
    return <Stack>
        <TextInput />
    </Stack>
}