import { describe, it, expect, vi, afterEach } from "vitest";
import {
  decodeDataUrl,
  hashBytes,
  extractImageBytes,
  captureCanvasBytes,
  captureVideoPosterBytes,
} from "../src/ui/media";
import { sanitizeSvgMarkup, inlineSvgElement } from "../src/ui/svg-inline";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("media helpers", () => {
  it("decodes base64 and UTF-8 data URLs and deduplicates identical bytes by hash", () => {
    const a = decodeDataUrl("data:image/png;base64,iVBORw0KGgo=");
    const b = decodeDataUrl("data:image/png;base64,iVBORw0KGgo=");
    const c = decodeDataUrl("data:image/png;base64,AQID");
    expect(a?.mime).toBe("image/png");
    expect(Array.from(a!.bytes)).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(hashBytes(a!.bytes)).toBe(hashBytes(b!.bytes));
    expect(hashBytes(a!.bytes)).not.toBe(hashBytes(c!.bytes));
    expect(hashBytes(a!.bytes)).toMatch(/^[0-9a-f]{16}$/);

    const svg = decodeDataUrl("data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E");
    expect(new TextDecoder().decode(svg!.bytes)).toBe("<svg></svg>");
  });

  it("returns null gracefully when remote fetch fails or times out", async () => {
    const res = await extractImageBytes("https://invalid.example.invalid/missing.png", { fetchTimeoutMs: 50 });
    expect(res).toBeNull();
  });

  it("retries canvas readback once after requestAnimationFrame and skips 0x0 canvases", async () => {
    expect(await captureCanvasBytes({ width: 0, height: 10 } as HTMLCanvasElement)).toBeNull();

    let calls = 0;
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
    const canvas = {
      width: 10,
      height: 10,
      toDataURL: () => (++calls === 1 ? "data:," : "data:image/png;base64,iVBORw0KGgo="),
    } as unknown as HTMLCanvasElement;

    const captured = await captureCanvasBytes(canvas);
    expect(calls).toBe(2);
    expect(captured?.mime).toBe("image/png");
  });

  it("falls back to video poster URL when video dimensions are zero", async () => {
    const video = {
      videoWidth: 0,
      videoHeight: 0,
      poster: "data:image/png;base64,iVBORw0KGgo=",
    } as unknown as HTMLVideoElement;

    const captured = await captureVideoPosterBytes(video);
    expect(captured?.mime).toBe("image/png");
    expect(captured?.bytes.length).toBe(8);
  });
});

describe("svg sanitization and inlining", () => {
  it("strips script and foreignObject tags from serialized SVG markup", () => {
    const cleaned = sanitizeSvgMarkup(
      '<svg viewBox="0 0 10 10"><script>alert(1)</script><foreignObject><div>x</div></foreignObject><path d="M0 0h10v10H0z" onclick="evil()"/></svg>'
    );
    expect(cleaned).not.toContain("<script");
    expect(cleaned).not.toContain("<foreignObject");
    expect(cleaned).not.toContain("onclick");
    expect(cleaned).toContain("<path");
  });

  it("expands <use> references, sets explicit dimensions, and bakes computed styles", () => {
    class MockEl {
      localName: string;
      tagName: string;
      attrs = new Map<string, string>();
      children: MockEl[] = [];
      parent: MockEl | null = null;
      ownerDocument: {
        defaultView: null;
        getElementById: (id: string) => MockEl | null;
        createElementNS: (_ns: string, tag: string) => MockEl;
      };

      constructor(
        tag: string,
        ownerDocument: MockEl["ownerDocument"],
        attrs: Record<string, string> = {},
        children: MockEl[] = []
      ) {
        this.localName = tag;
        this.tagName = tag;
        this.ownerDocument = ownerDocument;
        for (const [k, v] of Object.entries(attrs)) this.attrs.set(k, v);
        for (const c of children) this.appendChild(c);
      }

      get attributes() {
        return Array.from(this.attrs, ([name, value]) => ({ name, value }));
      }
      getAttribute(name: string) {
        return this.attrs.get(name) ?? null;
      }
      getAttributeNS(_ns: string | null, name: string) {
        return this.attrs.get(name) ?? this.attrs.get(`xlink:${name}`) ?? null;
      }
      setAttribute(name: string, value: string) {
        this.attrs.set(name, value);
      }
      removeAttribute(name: string) {
        this.attrs.delete(name);
      }
      appendChild(child: MockEl) {
        child.parent = this;
        this.children.push(child);
        return child;
      }
      remove() {
        if (!this.parent) return;
        this.parent.children = this.parent.children.filter((c) => c !== this);
        this.parent = null;
      }
      replaceWith(next: MockEl) {
        if (!this.parent) return;
        const idx = this.parent.children.indexOf(this);
        if (idx >= 0) {
          next.parent = this.parent;
          this.parent.children[idx] = next;
          this.parent = null;
        }
      }
      cloneNode(deep?: boolean): MockEl {
        const copy = new MockEl(this.localName, this.ownerDocument, Object.fromEntries(this.attrs));
        if (deep) {
          for (const c of this.children) copy.appendChild(c.cloneNode(true));
        }
        return copy;
      }
      getBoundingClientRect() {
        return { width: 24, height: 24 };
      }
      get outerHTML(): string {
        const attrs = Array.from(this.attrs, ([k, v]) => ` ${k}="${v}"`).join("");
        return `<${this.localName}${attrs}>${this.children.map((c) => c.outerHTML).join("")}</${this.localName}>`;
      }
    }

    const byId = new Map<string, MockEl>();
    const doc = {
      defaultView: null,
      getElementById: (id: string) => byId.get(id) ?? null,
      createElementNS: (_ns: string, tag: string) => new MockEl(tag, doc),
    };

    const symPath = new MockEl("path", doc, { d: "M1 1h8v8H1z" });
    const sym = new MockEl("symbol", doc, { id: "icon-box", viewBox: "0 0 10 10" }, [symPath]);
    byId.set("icon-box", sym);

    const useEl = new MockEl("use", doc, { href: "#icon-box", x: "2", y: "3" });
    const scriptEl = new MockEl("script", doc);
    const svg = new MockEl("svg", doc, {}, [useEl, scriptEl]);

    const markup = inlineSvgElement(svg as unknown as SVGSVGElement, (el) => {
      const tag = (el as unknown as MockEl).localName;
      const fill = tag === "path" ? "rgb(255, 0, 0)" : "";
      return { getPropertyValue: (p: string) => (p === "fill" ? fill : "") } as CSSStyleDeclaration;
    });

    expect(markup).toContain('width="24"');
    expect(markup).toContain('height="24"');
    expect(markup).toContain('viewBox="0 0 10 10"');
    expect(markup).toContain('transform="translate(2, 3)"');
    expect(markup).toContain('fill="rgb(255, 0, 0)"');
    expect(markup).not.toContain("<use");
    expect(markup).not.toContain("<script");
  });
});
