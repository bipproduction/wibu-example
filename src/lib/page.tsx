import { Card, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";


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
  },
  {
    id: "3",
    name: "react html",
    url: "/page/react-html"
  },
  {
    id: "3",
    name: "scroll flex",
    url: "/page/scroll-flex"
  }
]
export default function Home() {
  return (
    <Stack h={"100vh"} align="center" justify="center">
      <Title>WIBU EXAMPLE</Title>
      <Flex wrap={"wrap"} gap={"md"} justify={"center"}>
        {listMenu.map((item, index) => <Card w={200} component={Link} href={item.url} key={index} >
          <Stack>
            {item.name}
          </Stack>
        </Card>)}
      </Flex>
    </Stack>
  );
}
