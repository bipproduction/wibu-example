import { Stack, Title } from "@mantine/core";
import { CustomHookStateExample } from "./_ui/CutomHookstateExample";
import { LoadExampleHookState } from "./_component/LoadExampleHookState";

export default function Page() {
    return <Stack p={"md"}>
        <Title order={3}>Custom Hookstate</Title>
        <LoadExampleHookState>
            {(data) => <CustomHookStateExample data={data} />}
        </LoadExampleHookState>
    </Stack>
}