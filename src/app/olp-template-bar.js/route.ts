import { PUBLIC_TEMPLATES } from "../../lib/seo";
import { buildTemplateBarScript, templateBarTitles } from "../../lib/template-bar-script";

// Live template info bar, loaded on /templates/<slug> only (see docs/seo.md, "Live template info bar").
// Uses no request-time APIs, so it is prerendered at build like llms.txt.
export function GET() {
  return new Response(buildTemplateBarScript(templateBarTitles(PUBLIC_TEMPLATES)), {
    headers: { "Content-Type": "text/javascript; charset=utf-8", "X-Content-Type-Options": "nosniff" },
  });
}
