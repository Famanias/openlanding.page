import { readFileSync } from "node:fs";
import path from "node:path";

// The live route and download share the original self-contained document.
export function GET() {
  const html = readFileSync(path.join(process.cwd(), "public", "downloads", "vyra.html"), "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
