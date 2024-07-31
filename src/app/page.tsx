import { Card, Flex, Stack, Title } from "@mantine/core";


const listMenu = [
  {
    id: "1",
    name: "custom hookstate",
    url: "/page/custom-hookstate"
  },
  {
    id: "2",
    name: "revalidate",
    url: "/page/revalidate"
  }
]
export default function Home() {
  return (
    <Stack h={"100vh"} align="center" justify="center">
      <Title>WIBU EXAMPLE</Title>
      <Flex wrap={"wrap"} gap={"md"}>
        {listMenu.map((item, index) => <Card w={200} component="a" href={item.url} key={index} >
          <Stack>
            {item.name}
          </Stack>
        </Card>)}
      </Flex>
    </Stack>
  );
}
