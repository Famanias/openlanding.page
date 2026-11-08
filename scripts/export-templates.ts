import path from "node:path";
import { selectSlugs } from "./standalone/config";
import { exportTemplate } from "./standalone/export";

async function main() {
  const args = process.argv.slice(2);
  const list = args.includes("--list");
  if (list) args.splice(args.indexOf("--list"), 1);
  const outputIndex = args.indexOf("--output");
  if (outputIndex !== -1 && (!args[outputIndex + 1] || args[outputIndex + 1].startsWith("--"))) throw new Error("--output requires a directory");
  const output = outputIndex === -1 ? path.resolve("public/downloads") : path.resolve(args.splice(outputIndex, 2)[1] ?? "");
  const slugs = selectSlugs(args);
  if (list) { console.log(slugs.join("\n")); return; }
  if (!slugs.length) { console.log("No component templates selected."); return; }
  for (const slug of slugs) console.log(JSON.stringify(await exportTemplate(slug, output)));
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
