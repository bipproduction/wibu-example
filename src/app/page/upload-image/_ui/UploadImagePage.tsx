'use client'
import { Box, Button, Flex, Image, Stack, TextInput } from "@mantine/core";
import { useState } from "react";

export function UploadImagePage() {
    const [form, setForm] = useState<FileList | null>(null)
    const [image, setImage] = useState<string | null>(null)


    async function onClick() {
        if (!form) {
            return alert("no file");
        }
        const formData = new FormData();

        // file
        formData.append("file", form[0]);

        // name
        formData.append("name", "test");

        const res = await fetch("/page/upload-image/api/upload", {
            method: "POST",
            body: formData
        })

        if (res.ok) {
            const img = await res.text();
            setImage(img)
        }
    }
    return <Stack p={"md"}>
        <Box w={300}>
            <Image w={"100%"} src={"/page/upload-image/api/image?name=" + image} alt="" />
        </Box>
        <Flex>
            <Stack>
                <TextInput type="file" onChange={(e) => setForm(e.target.files)} />
                <Button onClick={onClick}>Upload</Button>
            </Stack>
        </Flex>
    </Stack>
}