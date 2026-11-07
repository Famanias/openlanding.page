import path from "node:path";
import { selectSlugs } from "./standalone/config";
import { exportTemplate } from "./standalone/export";

async function main() {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf("--output");
  if (outputIndex !== -1 && (!args[outputIndex + 1] || args[outputIndex + 1].startsWith("--"))) throw new Error("--output requires a directory");
  const output = outputIndex === -1 ? path.resolve("public/downloads") : path.resolve(args.splice(outputIndex, 2)[1] ?? "");
  for (const slug of selectSlugs(args)) console.log(JSON.stringify(await exportTemplate(slug, output)));
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
