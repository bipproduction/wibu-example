import fs from "fs";
import path from "path";
const root = path.join(process.cwd(), "src");

export default function () {
  const appRoot = path.join(root, "app");

  const listDirApp = fs.readdirSync(path.join(appRoot, "page"));

  const ls = listDirApp
    .filter((v) => path.extname(v) !== ".tsx")
    .map((v) => {
      return {
        name: v,
        url: `/page/${v}`,
      };
    });

  const dataPage = "export const dataPage = " + JSON.stringify(ls, null, 2);
  fs.writeFileSync(path.join(root, "lib/list_page.ts"), dataPage);
  console.log("success");
}
