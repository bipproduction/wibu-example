import { Text } from "@mantine/core";

const GITHUB_SECRET = process.env.GITHUB_SECRET
export async function LoadRepo({ repo, children }: { repo: string, children: (val: any) => React.ReactNode }) {

    try {
        const res = await fetch(`https://api.github.com/repos/bipproduction/${repo}`, {
            headers: {
                'Authorization': `token ${GITHUB_SECRET}`,
                'Accept': 'application/vnd.github.v3+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return <div>{children(data)}</div>
    } catch (error) {
        return <Text>Not found</Text>
    }
}