const GITHUB_SECRET = process.env.GITHUB_SECRET!;
const gitApi = {
  listBranch: {
    method: "GET",
    url: "https://api.github.com/repos/OWNER/REPO/branches",
  },
};

function gitFetch({
  method,
  url,
  repo,
}: {
  method: string;
  url: string;
  branch?: string;
  repo?: string;
}) {
  if (repo) {
    url = url.replace("REPO", repo);
  }
  const fixUrl = url.replace("OWNER", "bipproduction");
  return fetch(fixUrl, {
    headers: {
      Authorization: `token ${GITHUB_SECRET}`,
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    method,
    cache: "no-cache",
  });
}
