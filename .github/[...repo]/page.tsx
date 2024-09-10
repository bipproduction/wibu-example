import { ActionIcon, Flex, Paper, Stack, Text } from '@mantine/core'
import _ from 'lodash'
import Link from 'next/link'
import { LoadRepo } from './_component/LoadRepo'
export default async function Page({ params }: { params: { repo: string } }) {

    return <Stack w={"100%"} p={"md"}>
        <Flex>
            <ActionIcon component={Link} href={"/page/github/module/user-repos"} variant='outline' radius={100}>
                <Text>{"<"}</Text>
            </ActionIcon>
        </Flex>
        <LoadRepo repo={params.repo}>
            {(data) => <Stack p={"md"}>
                <DisplayByType data={data} />
            </Stack>}
        </LoadRepo>
    </Stack>
}




function DisplayByType({ data }: { data: any }) {

    // url
    if (isValidURL(data)) {
        return <Link target={"_blank"} href={data} style={{
            textDecoration: "none",
            color: "ButtonFace"
        }} >{data}</Link>
    }

    // type string
    // if (typeof data === "string") {
    //     return <Text c={"cyan"}>{data}</Text>
    // }

    // type boolean
    if (typeof data === "boolean") {
        return <Text c={data ? "green" : "red"}>{JSON.stringify(data)}</Text>
    }

    // type number
    if (typeof data === "number") {
        return <Text c={"yellow"}>{data}</Text>
    }

    // type array
    if (data instanceof Array) {
        return <Text bg={"blue"}>{JSON.stringify(data)}</Text>
    }

    // type object {}
    if (data instanceof Object) {
        return <Stack>
            {_.keys(data).map((v, k) => <Paper withBorder p={"md"} key={k}>
                <Flex gap={"md"} >
                    <Text w={200} style={{
                        textAlign: "end",
                        wordBreak: "break-word",
                        textWrap: "pretty"
                    }}>{v}</Text>
                    <DisplayByType data={data[v]} />
                </Flex>
            </Paper>)}
        </Stack>
    }

    return <Text >{data + ""}</Text>

}

function isValidURL(string: string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}