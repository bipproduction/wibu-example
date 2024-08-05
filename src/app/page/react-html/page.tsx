import { Stack } from "@mantine/core";
import fs from "fs";
import parse, { htmlToDOM } from 'html-react-parser';
import path from "path";
import { DomRender } from "./_ui/DomRender";

const root = path.join(process.cwd(), 'src/app/page/react-html/_assets');
export default function Page() {
    const file = fs.readFileSync(root + '/example-html.html', 'utf8');
    const html = parse(file);
    const html2 = htmlToDOM(file)[0];

    return <Stack p={"md"}>
        <DomRender data={html} />
        {/* {JSON.stringify(html2)} */}
    </Stack>
}