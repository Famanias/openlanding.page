/** Everything the browser runtime needs; serialised into `/olp-template-bar.js` as JSON. */
export interface TemplateBarConfig {
  /** slug → display title, for public templates only. */
  titles: Record<string, string>;
  /** Regex source; group 1 is the slug (TEMPLATE_PAGE_PATTERN). */
  pathPattern: string;
  /** Detail page path with a `:slug` placeholder (templateDetailPath(":slug")). */
  detailPath: string;
  galleryPath: string;
  storageKey: string;
  hostTag: string;
}

type TemplateBarWindow = Window & { __olpTemplateBar?: () => Element | null };

/**
 * Mounts the bar on a live template page. Returns the host element, or null when it does not apply.
 *
 * SELF-CONTAINED: `buildTemplateBarScript` serialises this function with `Function.prototype.toString`,
 * so it must not reference imports or module-level bindings (only its parameters and browser globals).
 * Do not split helpers out of it. `template-bar.test.ts` runs the serialised copy to enforce this.
 */
export function runTemplateBar(win: TemplateBarWindow, config: TemplateBarConfig): Element | null {
  const doc = win.document;
  const CSS = [
    "*,*::before,*::after{box-sizing:border-box}",
    ".wrap{display:flex;justify-content:center;padding:0 12px calc(12px + env(safe-area-inset-bottom,0px))}",
    ".bar{pointer-events:auto;display:flex;align-items:center;gap:12px;max-width:min(760px,100%);margin:0;padding:6px 6px 6px 16px;",
    "border-radius:999px;border:1px solid rgba(255,255,255,.16);background:#111214;color:#f5f5f2;",
    "box-shadow:0 10px 30px rgba(0,0,0,.28),0 1px 3px rgba(0,0,0,.2);",
    "font:500 13px/1.4 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;",
    "letter-spacing:0;text-align:left;text-transform:none;-webkit-font-smoothing:antialiased;",
    "animation:olp-in .4s cubic-bezier(.2,.8,.2,1) both}",
    ".bar.leaving{animation:olp-out .2s ease-in both}",
    "@keyframes olp-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}",
    "@keyframes olp-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(16px)}}",
    ".text{margin:0;flex:1 1 auto;min-width:0}",
    ".text strong{font-weight:700}",
    ".text a{color:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}",
    ".cta{flex:none;display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:6px 14px;border-radius:999px;",
    "background:#f5f5f2;color:#111214;font-weight:650;text-decoration:none;white-space:nowrap}",
    ".cta:hover{background:#ffffff}",
    ".close{flex:none;display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;margin:0;padding:0;",
    "border:0;border-radius:999px;background:transparent;color:inherit;font:inherit;cursor:pointer}",
    ".close:hover{background:rgba(255,255,255,.14)}",
    ".close svg{width:14px;height:14px;display:block}",
    "a:focus-visible,.close:focus-visible{outline:2px solid #8fb8ff;outline-offset:2px}",
    "@media (max-width:600px){.bar{flex-wrap:wrap;gap:8px 10px;border-radius:18px;padding:10px 6px 10px 14px}",
    ".text{flex:1 1 calc(100% - 50px)}.close{order:2;align-self:flex-start}.cta{order:3}}",
    "@media (prefers-reduced-motion:reduce){.bar,.bar.leaving{animation:none}}",
    "@media print{.wrap{display:none}}",
  ].join("");

  function reducedMotion(): boolean {
    try {
      return win.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }

  function dismissed(): boolean {
    try {
      return win.localStorage.getItem(config.storageKey) === "1";
    } catch {
      return false;
    }
  }

  function mount(): Element | null {
    const match = new RegExp(config.pathPattern).exec(win.location.pathname);
    const slug = match ? match[1] : "";
    if (!slug || !Object.prototype.hasOwnProperty.call(config.titles, slug) || dismissed()) return null;
    const existing = doc.querySelector(config.hostTag);
    if (existing) return existing;
    if (!doc.body) return null;

    const host = doc.createElement(config.hostTag);
    host.setAttribute("data-olp-chrome", "");
    host.setAttribute("role", "region");
    host.setAttribute("aria-label", "About this template");
    // Inline !important beats any template stylesheet; `all:initial` stops inherited fonts and colours leaking in.
    host.setAttribute(
      "style",
      "all:initial!important;display:block!important;position:fixed!important;left:0!important;right:0!important;" +
        "bottom:0!important;z-index:48!important;pointer-events:none!important;margin:0!important;padding:0!important;",
    );
    const root = host.attachShadow({ mode: "open" });

    const style = doc.createElement("style");
    style.textContent = CSS;
    const wrap = doc.createElement("div");
    wrap.className = "wrap";
    const bar = doc.createElement("div");
    bar.className = "bar";

    const text = doc.createElement("p");
    text.className = "text";
    const name = doc.createElement("strong");
    name.textContent = config.titles[slug];
    const gallery = doc.createElement("a");
    gallery.href = config.galleryPath;
    gallery.textContent = "openlanding.page";
    text.append("This is ", name, ", a free MIT landing page template from ", gallery, ".");

    const cta = doc.createElement("a");
    cta.className = "cta";
    cta.href = config.detailPath.replace(":slug", slug);
    cta.textContent = "Get the code";
    const arrow = doc.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    cta.append(arrow);

    const close = doc.createElement("button");
    close.type = "button";
    close.className = "close";
    close.setAttribute("aria-label", "Dismiss template info");
    close.innerHTML =
      '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>';

    function dismiss(): void {
      try {
        win.localStorage.setItem(config.storageKey, "1");
      } catch {
        // Storage blocked: hide for this page view only.
      }
      if (reducedMotion()) {
        host.remove();
        return;
      }
      bar.classList.add("leaving");
      win.setTimeout(() => host.remove(), 220);
    }

    close.addEventListener("click", dismiss);
    bar.addEventListener("keydown", event => {
      if ((event as KeyboardEvent).key === "Escape") dismiss();
    });

    bar.append(text, cta, close);
    wrap.append(bar);
    root.append(style, wrap);
    doc.body.append(host);
    return host;
  }

  win.__olpTemplateBar = mount;
  return mount();
}
