
import { Stack } from "@mantine/core";
import { UploadImagePage } from "./_ui/UploadImagePage";
import fs from 'fs'
import path from "path";
import { LoadMarkdown } from "./_ui/LoadMarkdown";
const root = path.join(process.cwd(), './src/app/page/upload-image/_assets');


export default function Page() {
    const data = fs.readFileSync(root + '/NOTE.md', 'utf8');
    return <Stack p={"md"}>
        <UploadImagePage />
        <LoadMarkdown data={data} />
    </Stack>
}