import { Button, Center, Stack, Title } from "@mantine/core";
import Link from "next/link";
const rootPath = "/page/copy-dir";
export default function Page() {
  return (
    <Stack>
      <Title order={3}>Page Copy Dir</Title>
      <Center>
        <Button component={Link} href={rootPath + "/root"}>
          yuk !
        </Button>
      </Center>
    </Stack>
  );
}
