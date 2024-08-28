import { Stack } from "@mantine/core";
import { PdfViewer } from "./_ui/PdfViewer";
import { PDF } from "./_ui/PDF";

export default function Page() {

    return <Stack>
        <PdfViewer />
        {/* <PDF /> */}
    </Stack>
}