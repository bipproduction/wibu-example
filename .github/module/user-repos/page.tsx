import storage from "@/lib/db/storage";
import { Card, Flex, Stack, Text } from "@mantine/core";
import _ from "lodash";
import Link from "next/link";
import { RepoPagenation } from "./_component/RepoPageNation";
const GITHUB_SECRET = process.env.GITHUB_SECRET!


const dataModel = {
    "id": 800477381,
    "node_id": "R_kgDOL7ZQxQ",
    "name": "3d-force-graph",
    "full_name": "bipproduction/3d-force-graph",
    "private": false,
    "owner": {
        "login": "bipproduction",
        "id": 119274726,
        "node_id": "U_kgDOBxv85g",
        "avatar_url": "https://avatars.githubusercontent.com/u/119274726?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/bipproduction",
        "html_url": "https://github.com/bipproduction",
        "followers_url": "https://api.github.com/users/bipproduction/followers",
        "following_url": "https://api.github.com/users/bipproduction/following{/other_user}",
        "gists_url": "https://api.github.com/users/bipproduction/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/bipproduction/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/bipproduction/subscriptions",
        "organizations_url": "https://api.github.com/users/bipproduction/orgs",
        "repos_url": "https://api.github.com/users/bipproduction/repos",
        "events_url": "https://api.github.com/users/bipproduction/events{/privacy}",
        "received_events_url": "https://api.github.com/users/bipproduction/received_events",
        "type": "User",
        "site_admin": false
    },
    "html_url": "https://github.com/bipproduction/3d-force-graph",
    "description": "3D force-directed graph component using ThreeJS/WebGL",
    "fork": true,
    "url": "https://api.github.com/repos/bipproduction/3d-force-graph",
    "forks_url": "https://api.github.com/repos/bipproduction/3d-force-graph/forks",
    "keys_url": "https://api.github.com/repos/bipproduction/3d-force-graph/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/bipproduction/3d-force-graph/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/bipproduction/3d-force-graph/teams",
    "hooks_url": "https://api.github.com/repos/bipproduction/3d-force-graph/hooks",
    "issue_events_url": "https://api.github.com/repos/bipproduction/3d-force-graph/issues/events{/number}",
    "events_url": "https://api.github.com/repos/bipproduction/3d-force-graph/events",
    "assignees_url": "https://api.github.com/repos/bipproduction/3d-force-graph/assignees{/user}",
    "branches_url": "https://api.github.com/repos/bipproduction/3d-force-graph/branches{/branch}",
    "tags_url": "https://api.github.com/repos/bipproduction/3d-force-graph/tags",
    "blobs_url": "https://api.github.com/repos/bipproduction/3d-force-graph/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/bipproduction/3d-force-graph/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/bipproduction/3d-force-graph/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/bipproduction/3d-force-graph/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/bipproduction/3d-force-graph/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/bipproduction/3d-force-graph/languages",
    "stargazers_url": "https://api.github.com/repos/bipproduction/3d-force-graph/stargazers",
    "contributors_url": "https://api.github.com/repos/bipproduction/3d-force-graph/contributors",
    "subscribers_url": "https://api.github.com/repos/bipproduction/3d-force-graph/subscribers",
    "subscription_url": "https://api.github.com/repos/bipproduction/3d-force-graph/subscription",
    "commits_url": "https://api.github.com/repos/bipproduction/3d-force-graph/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/bipproduction/3d-force-graph/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/bipproduction/3d-force-graph/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/bipproduction/3d-force-graph/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/bipproduction/3d-force-graph/contents/{+path}",
    "compare_url": "https://api.github.com/repos/bipproduction/3d-force-graph/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/bipproduction/3d-force-graph/merges",
    "archive_url": "https://api.github.com/repos/bipproduction/3d-force-graph/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/bipproduction/3d-force-graph/downloads",
    "issues_url": "https://api.github.com/repos/bipproduction/3d-force-graph/issues{/number}",
    "pulls_url": "https://api.github.com/repos/bipproduction/3d-force-graph/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/bipproduction/3d-force-graph/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/bipproduction/3d-force-graph/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/bipproduction/3d-force-graph/labels{/name}",
    "releases_url": "https://api.github.com/repos/bipproduction/3d-force-graph/releases{/id}",
    "deployments_url": "https://api.github.com/repos/bipproduction/3d-force-graph/deployments",
    "created_at": "2024-05-14T12:09:23Z",
    "updated_at": "2024-05-14T12:09:23Z",
    "pushed_at": "2024-03-27T21:30:09Z",
    "git_url": "git://github.com/bipproduction/3d-force-graph.git",
    "ssh_url": "git@github.com:bipproduction/3d-force-graph.git",
    "clone_url": "https://github.com/bipproduction/3d-force-graph.git",
    "svn_url": "https://github.com/bipproduction/3d-force-graph",
    "homepage": "https://vasturiano.github.io/3d-force-graph/example/large-graph/",
    "size": 2442,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": false,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": {
        "key": "mit",
        "name": "MIT License",
        "spdx_id": "MIT",
        "url": "https://api.github.com/licenses/mit",
        "node_id": "MDc6TGljZW5zZTEz"
    },
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "topics": [],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "permissions": {
        "admin": true,
        "maintain": true,
        "push": true,
        "triage": true,
        "pull": true
    }
}

export default async function Page() {
    await storage.init()
    const page = await storage.get("page") || 1
    console.log("page", page)
    const res = await fetch(`https://api.github.com/users/bipproduction/repos?page=${page}`, {
        headers: {
            'Authorization': `token ${GITHUB_SECRET}`,
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
        },
        cache: "no-cache",
        next: {
            tags: ["repo"]
        }
    })

    const data: typeof dataModel[] = await res.json()
    const link = res.headers.get("link")
    const parsed = parseLinkHeader(link)
    return <Stack p={"md"}>
        <Flex wrap={"wrap"} gap={"md"}>
            {data.map((v, k) => <Card component={Link} href={`/page/github/${v.name}`} w={200} key={k}>
                <Stack pos={"relative"} gap={0} style={{
                    textWrap: "wrap",
                    wordWrap: "break-word"
                }}>
                    <Text fw={"bold"}>{v.name}</Text>
                    <Text fz={12}>{v.created_at}</Text>
                </Stack>
            </Card>)}
        </Flex>
        {/* {JSON.stringify(parsed, null, 2)} */}
        <RepoPagenation dataPage={parsed} />
    </Stack>
}

function parseLinkHeader(header: string | null) {
    if (!header) {
        return null;
    }

    const links = header.split(',').map(link => link.trim()).reduce((acc: any, curr) => {
        const [urlPart, relPart] = curr.split(';');
        const url = urlPart.trim().slice(1, -1);
        const rel = relPart.trim().replace(/rel="(.*)"/, '$1');
        const page = new URL(url).searchParams.get('page');
        acc[rel] = page;
        return acc;
    }, {});

    return links;
}