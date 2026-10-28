import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

// One-time migration. Dates remain literals: Git is never needed at build/runtime.
const file = "src/app/(index)/data/templates.ts";
const source = readFileSync(file, "utf8");
const start = source.indexOf("const RAW_TEMPLATES");
if (start < 0) throw new Error("RAW_TEMPLATES not found");
const updated = source.slice(0, start) + source.slice(start).replace(
  /(slug: "([a-z0-9-]+)",\r?\n)([\s\S]*?)(?=\r?\n  \})/g,
  (match, line: string, slug: string, fields: string) => {
    if (/\bcreatedAt:/.test(fields)) return match;
    const date = execFileSync("git", ["log", "--diff-filter=A", "--format=%ad", "--date=short", "--reverse", "--", `src/app/(${slug})`], { encoding: "utf8" }).trim().split(/\r?\n/)[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`No creation date for ${slug}`);
    return `${line}    createdAt: "${date}",\n${fields}`;
  },
);
writeFileSync(file, updated);
