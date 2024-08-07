import fs from "fs";
import path from "path";
const root = process.cwd();

export async function LoadReadme({ children }: { children: (data: string) => React.ReactNode }) {
    const data = await fs.promises.readFile(path.join(root, "README.md"), "utf-8")
    return <div>{children(data)}</div>
}