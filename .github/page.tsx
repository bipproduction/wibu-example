import { Stack } from "@mantine/core";
const GITHUB_SECRET = process.env.GITHUB_SECRET!

export default async function Page() {

    const res = await fetch("https://api.github.com/repos/bipproduction/hipmi/commits", {
        headers: {
            'Authorization': `token ${GITHUB_SECRET}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    const data = await res.json()

    return <Stack>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </Stack>
}