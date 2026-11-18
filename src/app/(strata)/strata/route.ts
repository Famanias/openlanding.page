import { readFileSync } from "node:fs";
import path from "node:path";

// Live-only "free template from openlanding.page" bar (docs/seo.md, "Live template info bar"),
// added to the response only: the download file on disk is never modified.
const TEMPLATE_BAR = '<script src="/olp-template-bar.js" defer data-olp-chrome></script>';

// The gallery and the downloadable template serve the same self-contained document.
export function GET() {
  const html = readFileSync(path.join(process.cwd(), "public", "downloads", "strata.html"), "utf8");
  const end = html.lastIndexOf("</body>");
  const live = end < 0 ? html + TEMPLATE_BAR : html.slice(0, end) + TEMPLATE_BAR + html.slice(end);
  return new Response(live, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
