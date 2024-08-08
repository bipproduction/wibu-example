import { spawn } from "child_process";

const cmd = `
curl -X POST \
-H "Authorization: token YOUR_PERSONAL_ACCESS_TOKEN" \
-H "Accept: application/vnd.github.v3+json" \
-d '{"head":"upstream-branch-name","base":"your-fork-branch-name"}' \
https://api.github.com/repos/your-username/repo/pulls

`;
export default async function forkSync() {
  const child = spawn("/bin/bash", ["-c", 'echo "hello"']);
  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  child.stderr.on("data", (data) => {
    console.log(data.toString());
  });

  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
