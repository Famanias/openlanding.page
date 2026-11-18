import { describe, expect, it } from "vitest";
import { TEMPLATES } from "../app/(index)/data/templates";
import { templateDetailPath } from "./catalog-routes";
import { isTemplatePagePath, TEMPLATE_BAR_STORAGE_KEY, templateSlugFromPath } from "./template-bar";
import { runTemplateBar } from "./template-bar-runtime";
import { buildTemplateBarScript, templateBarConfig, templateBarTitles } from "./template-bar-script";

/** Just enough DOM for the runtime: element tree, attributes, listeners, shadow roots. */
class FakeElement {
  children: (FakeElement | string)[] = [];
  attributes = new Map<string, string>();
  listeners = new Map<string, (event: unknown) => void>();
  parent: FakeElement | null = null;
  shadow: FakeElement | null = null;
  className = "";
  href = "";
  type = "";
  innerHTML = "";
  private ownText = "";
  classList = { add: (name: string) => (this.className = `${this.className} ${name}`.trim()) };

  constructor(readonly tagName: string) {}

  setAttribute(name: string, value: string) { this.attributes.set(name, value); }
  getAttribute(name: string) { return this.attributes.get(name) ?? null; }
  hasAttribute(name: string) { return this.attributes.has(name); }
  addEventListener(type: string, listener: (event: unknown) => void) { this.listeners.set(type, listener); }
  attachShadow() { return (this.shadow = new FakeElement("#shadow-root")); }
  append(...nodes: (FakeElement | string)[]) {
    for (const node of nodes) {
      if (node instanceof FakeElement) node.parent = this;
      this.children.push(node);
    }
  }
  remove() {
    if (this.parent) this.parent.children = this.parent.children.filter(child => child !== this);
    this.parent = null;
  }
  set textContent(value: string) { this.ownText = value; this.children = []; }
  get textContent(): string {
    return this.ownText + this.children.map(child => (typeof child === "string" ? child : child.textContent)).join("");
  }
  find(predicate: (element: FakeElement) => boolean): FakeElement | null {
    for (const child of [...this.children, ...(this.shadow ? [this.shadow] : [])]) {
      if (typeof child === "string") continue;
      if (predicate(child)) return child;
      const found = child.find(predicate);
      if (found) return found;
    }
    return null;
  }
}

function fakeWindow(pathname: string, { stored = null as string | null, storageThrows = false, reducedMotion = true } = {}) {
  const store = new Map<string, string>(stored ? [[TEMPLATE_BAR_STORAGE_KEY, stored]] : []);
  const html = new FakeElement("html");
  const body = new FakeElement("body");
  html.append(body);
  const blocked = () => { throw new Error("blocked"); };
  const document = {
    body,
    createElement: (tag: string) => new FakeElement(tag),
    querySelector: (tag: string) => body.find(element => element.tagName === tag),
  };
  const window = {
    document,
    location: { pathname },
    localStorage: storageThrows
      ? { getItem: blocked, setItem: blocked }
      : { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => void store.set(key, value) },
    matchMedia: () => ({ matches: reducedMotion }),
    setTimeout: (callback: () => void) => { callback(); return 0; },
    __olpTemplateBar: undefined as undefined | (() => unknown),
  };
  return { window, body, store };
}

const titles = templateBarTitles(TEMPLATES);
const run = (window: ReturnType<typeof fakeWindow>["window"]) =>
  runTemplateBar(window as unknown as Window, templateBarConfig(titles)) as unknown as FakeElement | null;

describe("templateSlugFromPath", () => {
  it("matches live template pages and paths below them", () => {
    expect(templateSlugFromPath("/templates/calder")).toBe("calder");
    expect(templateSlugFromPath("/templates/calder/")).toBe("calder");
    expect(templateSlugFromPath("/templates/keytu/cairn")).toBe("keytu");
    expect(templateSlugFromPath("/templates/alpine-reel")).toBe("alpine-reel");
  });

  it("ignores the gallery, catalog, community and legacy paths", () => {
    for (const path of ["/", "/templates", "/templates/", "/landing-page-templates/calder", "/landing-page-templates", "/community-terms", "/calder", "/templatesx/calder"]) {
      expect(isTemplatePagePath(path), path).toBe(false);
    }
  });
});

describe("templateBarTitles", () => {
  it("maps every public template slug to its registry title and nothing else", () => {
    expect(Object.keys(titles).sort()).toEqual(TEMPLATES.map(t => t.slug).sort());
    expect(titles.calder).toBe("CALDER & ROWE");
  });

  it("stays small enough to ship (no prompts or descriptions)", () => {
    expect(JSON.stringify(titles).length).toBeLessThan(6000);
  });
});

describe("runTemplateBar", () => {
  it("mounts a labelled, data-olp-chrome region with the title and links", () => {
    const { window, body } = fakeWindow("/templates/calder");
    const host = run(window);
    expect(host).not.toBeNull();
    expect(body.children).toContain(host);
    expect(host!.tagName).toBe("olp-template-bar");
    expect(host!.hasAttribute("data-olp-chrome")).toBe(true);
    expect(host!.getAttribute("role")).toBe("region");
    expect(host!.getAttribute("aria-label")).toBe("About this template");
    expect(host!.getAttribute("style")).toContain("position:fixed!important");
    expect(host!.shadow!.textContent).toContain("This is CALDER & ROWE, a free MIT landing page template from openlanding.page.");
    expect(host!.find(e => e.className === "cta")!.href).toBe(templateDetailPath("calder"));
    expect(host!.find(e => e.tagName === "a" && e.textContent === "openlanding.page")!.href).toBe("/");
    expect(host!.find(e => e.tagName === "button")!.getAttribute("aria-label")).toBe("Dismiss template info");
  });

  it("does nothing off template pages or for unknown slugs", () => {
    for (const path of ["/", "/landing-page-templates/calder", "/community-terms", "/templates/not-a-template"]) {
      const { window, body } = fakeWindow(path);
      expect(run(window), path).toBeNull();
      expect(body.children).toHaveLength(0);
    }
  });

  it("is idempotent", () => {
    const { window, body } = fakeWindow("/templates/orrery");
    const first = run(window);
    expect(window.__olpTemplateBar!()).toBe(first);
    expect(body.children).toHaveLength(1);
  });

  it("stays hidden once dismissed and still shows when storage is blocked", () => {
    expect(run(fakeWindow("/templates/orrery", { stored: "1" }).window)).toBeNull();
    expect(run(fakeWindow("/templates/orrery", { storageThrows: true }).window)).not.toBeNull();
  });

  it("dismisses from the close button and remembers it", () => {
    const { window, body, store } = fakeWindow("/templates/orrery");
    const host = run(window)!;
    host.find(e => e.tagName === "button")!.listeners.get("click")!({});
    expect(body.children).toHaveLength(0);
    expect(store.get(TEMPLATE_BAR_STORAGE_KEY)).toBe("1");
    expect(run(window)).toBeNull();
  });

  it("dismisses on Escape, with the exit animation when motion is allowed", () => {
    const { window, body } = fakeWindow("/templates/orrery", { reducedMotion: false });
    const host = run(window)!;
    const bar = host.find(e => e.className === "bar")!;
    bar.listeners.get("keydown")!({ key: "Enter" });
    expect(body.children).toHaveLength(1);
    bar.listeners.get("keydown")!({ key: "Escape" });
    expect(bar.className).toContain("leaving");
    expect(body.children).toHaveLength(0);
  });

  it("still dismisses when storage is blocked", () => {
    const { window, body } = fakeWindow("/templates/orrery", { storageThrows: true });
    run(window)!.find(e => e.tagName === "button")!.listeners.get("click")!({});
    expect(body.children).toHaveLength(0);
  });
});

describe("buildTemplateBarScript", () => {
  it("serialises a self-contained runtime that works on its own", () => {
    const script = buildTemplateBarScript(titles);
    const { window, body } = fakeWindow("/templates/calder");
    new Function("window", script)(window);
    const host = body.children[0] as FakeElement;
    expect(host.hasAttribute("data-olp-chrome")).toBe(true);
    expect(host.shadow!.textContent).toContain("CALDER & ROWE");
  });

  it("cannot close a surrounding script element", () => {
    const script = buildTemplateBarScript({ evil: "</script><img src=x onerror=alert(1)>" });
    expect(script).not.toContain("</script>");
    const { window, body } = fakeWindow("/templates/evil");
    new Function("window", script)(window);
    expect((body.children[0] as FakeElement).shadow!.textContent).toContain("</script><img src=x onerror=alert(1)>");
  });
});
