import { readFileSync } from "node:fs";
import fg from "fast-glob";
import type { SourceFile } from "./templates.config";

/** Every source file in a template's route group, with POSIX paths relative to the repo root. */
export function readTemplateFiles(slug: string): SourceFile[] {
  const pattern = `src/app/\\(${slug}\\)/**/*.{ts,tsx,js,jsx,css,svg}`;
  return fg
    .sync(pattern, { dot: false })
    .filter((p) => !p.endsWith(".test.ts"))
    .map((p) => ({ path: p, source: readFileSync(p, "utf8") }));
}
