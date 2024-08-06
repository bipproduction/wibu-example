import fs from "fs";
import _ from "lodash";
type APIMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
import jsonData from "../GIT_API.json";
import path from "path";

interface APIEndpoint {
  type: string;
  name: string;
  method: APIMethod;
  api: string;
  body: Record<string, any>;
}

function generateParam(data: string) {
  const paramMatches = data.match(/{([^}]+)}/g);
  const params = paramMatches ? paramMatches.map((p) => p.slice(1, -1)) : [];
  const paramStr = params.join(", ");
  const prm = _.fromPairs(params.map((p) => [p, ""]));
  return prm;
}

function generateTypeBody(data: any) {
  if (_.isEmpty(data.body)) {
    return null;
  }


  const pair = _.fromPairs(_.keys(data.body).map((k) => [k, ""]));
  const typeBody = `export type ${_.camelCase(data.name)} = ${JSON.stringify(
    pair,
    null,
    2
  )} `;
  return typeBody;
}

const d = jsonData.map(generateTypeBody);
fs.writeFileSync(
  path.join(__dirname, "api.ts"),
  d.filter((x) => x).join("\n\n")
);

// const csvEndpoints = JSON.parse(fs.readFileSync("./GIT_API.json", "utf8"));
// const functions = csvEndpoints.map(generateFunction);

// console.log(JSON.stringify(functions, null, 2));
