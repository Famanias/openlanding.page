import { isTemplatePagePath, TEMPLATE_BAR_SCRIPT_PATH } from "./lib/template-bar";

// Runs on every App Router page before hydration. On live template pages (/templates/<slug>) it loads the
// "free template from openlanding.page" bar once the page has loaded. Nothing is server-rendered, so
// prerendered template HTML and the standalone downloads built from it never contain the bar.
// See docs/seo.md, "Live template info bar".

function loadTemplateBar(): void {
  try {
    if (document.querySelector(`script[src="${TEMPLATE_BAR_SCRIPT_PATH}"]`)) return;
    const script = document.createElement("script");
    script.src = TEMPLATE_BAR_SCRIPT_PATH;
    script.async = true;
    script.setAttribute("data-olp-chrome", "");
    document.body.append(script);
  } catch {
    // Never let the bar affect the template.
  }
}

if (isTemplatePagePath(window.location.pathname)) {
  // After `load`, so hydration has finished and the template's own resources go first.
  if (document.readyState === "complete") window.setTimeout(loadTemplateBar, 0);
  else window.addEventListener("load", loadTemplateBar, { once: true });
}
