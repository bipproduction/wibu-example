import { Stack } from "@mantine/core";
import { Note } from "./_ui/Note";
import fs from "fs";
import path from "path";
const rootAssets = path.join(process.cwd(), 'src/app/page/auth/_assets');
export default function Page() {
    const data = fs.readFileSync(rootAssets + '/NOTE.md', 'utf8');
    return <Stack>
        <Note data={data} />
    </Stack>
}