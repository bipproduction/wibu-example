import { Stack } from "@mantine/core";
import { DisplayPwaMd } from "./_component/DisplayPwaMd";
import fs from "fs";
import path from "path";
const root = path.join(process.cwd(), "./src/app/page/pwa/_assets");

export default async function Page() {
    const data = await fs.promises.readFile(path.join(root, "PWA.md"), "utf-8");
    return (
        <Stack p={"md"}>
            <DisplayPwaMd data={data} />
        </Stack>
    );
}