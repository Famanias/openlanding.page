import { readFileSync } from "node:fs";
import path from "node:path";

// The gallery and the downloadable template serve the same self-contained document.
export function GET() {
  const html = readFileSync(path.join(process.cwd(), "public", "downloads", "pitchlane.html"), "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
