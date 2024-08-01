import { Stack } from "@mantine/core";
import parse from 'html-react-parser';
import path from "path";
import fs from "fs";

const root = path.join(process.cwd(), 'src/app/page/react-html/_assets');
export default function Page() {
    const file = fs.readFileSync(root + '/example-html.html', 'utf8');
    const html = parse(file);
    return <Stack p={"md"} suppressHydrationWarning={false}>
        {html}
    </Stack>
}