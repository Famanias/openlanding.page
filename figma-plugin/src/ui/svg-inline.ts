const PRESENTATION_ATTRS = ["fill", "stroke", "stroke-width", "opacity", "color"] as const;
const MAX_USE_DEPTH = 8;

const camelCase = (prop: string): string =>
  prop.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());

function readStyleProp(style: CSSStyleDeclaration, prop: string): string {
  const val =
    typeof style.getPropertyValue === "function"
      ? style.getPropertyValue(prop)
      : (style as unknown as Record<string, string>)[camelCase(prop)];
  return typeof val === "string" ? val.trim() : "";
}

function findElementById(doc: Document | null, root: Element, id: string): Element | null {
  const found = doc?.getElementById(id);
  if (found) return found;
  const stack: Element[] = [root];
  while (stack.length) {
    const cur = stack.pop()!;
    if (cur.getAttribute("id") === id) return cur;
    for (let i = cur.children.length - 1; i >= 0; i--) stack.push(cur.children[i]);
  }
  return null;
}

function getTargetId(el: Element): string | null {
  const raw = el.getAttribute("href") ?? el.getAttributeNS("http://www.w3.org/1999/xlink", "href");
  if (!raw) return null;
  const idx = raw.indexOf("#");
  return idx >= 0 ? raw.slice(idx + 1) : null;
}

function copyAttributes(from: Element, to: Element, skip: Set<string>): void {
  for (let i = 0; i < from.attributes.length; i++) {
    const attr = from.attributes[i];
    if (!skip.has(attr.name)) to.setAttribute(attr.name, attr.value);
  }
}

function bakeElementStyles(
  sourceEl: Element,
  targetEl: Element,
  readStyle: (el: Element) => CSSStyleDeclaration
): void {
  let style: CSSStyleDeclaration;
  try {
    style = readStyle(sourceEl);
  } catch {
    return;
  }
  if (!style) return;

  for (const prop of PRESENTATION_ATTRS) {
    const existing = targetEl.getAttribute(prop);
    if (existing && existing.startsWith("url(#")) continue;
    const val = readStyleProp(style, prop);
    if (val) targetEl.setAttribute(prop, val);
  }
}

function syncSubtreeStyles(
  origEl: Element,
  cloneEl: Element,
  readStyle: (el: Element) => CSSStyleDeclaration,
  doc: Document,
  rootSvg: SVGSVGElement,
  depth = 0,
  seenIds = new Set<string>()
): void {
  bakeElementStyles(origEl, cloneEl, readStyle);

  const origChildren = Array.from(origEl.children);
  const cloneChildren = Array.from(cloneEl.children);

  for (let i = 0; i < origChildren.length && i < cloneChildren.length; i++) {
    const oChild = origChildren[i];
    const cChild = cloneChildren[i];
    const tag = (oChild.localName || oChild.tagName).toLowerCase();

    if (tag === "script" || tag === "foreignobject") {
      cChild.remove();
      continue;
    }

    if (tag === "use" && depth < MAX_USE_DEPTH) {
      const id = getTargetId(oChild);
      const refEl = id && !seenIds.has(id) ? findElementById(doc, rootSvg, id) : null;
      if (refEl) {
        const g = doc.createElementNS("http://www.w3.org/2000/svg", "g");
        copyAttributes(oChild, g, new Set(["href", "xlink:href", "x", "y", "width", "height"]));
        const x = parseFloat(oChild.getAttribute("x") || "0") || 0;
        const y = parseFloat(oChild.getAttribute("y") || "0") || 0;
        if (x || y) {
          const prev = g.getAttribute("transform") || "";
          g.setAttribute("transform", `translate(${x}, ${y})${prev ? ` ${prev}` : ""}`);
        }
        bakeElementStyles(oChild, g, readStyle);

        const nextSeen = new Set(seenIds);
        nextSeen.add(id!);

        const refTag = (refEl.localName || refEl.tagName).toLowerCase();
        if (refTag === "symbol") {
          if (!rootSvg.getAttribute("viewBox") && refEl.getAttribute("viewBox")) {
            rootSvg.setAttribute("viewBox", refEl.getAttribute("viewBox")!);
          }
          const inner = doc.createElementNS("http://www.w3.org/2000/svg", "g");
          copyAttributes(refEl, inner, new Set(["id", "viewBox"]));
          for (const child of Array.from(refEl.children)) {
            inner.appendChild(child.cloneNode(true));
          }
          g.appendChild(inner);
          syncSubtreeStyles(refEl, inner, readStyle, doc, rootSvg, depth + 1, nextSeen);
        } else {
          const refClone = refEl.cloneNode(true) as Element;
          refClone.removeAttribute("id");
          g.appendChild(refClone);
          syncSubtreeStyles(refEl, refClone, readStyle, doc, rootSvg, depth + 1, nextSeen);
        }

        cChild.replaceWith(g);
        continue;
      }
    }

    syncSubtreeStyles(oChild, cChild, readStyle, doc, rootSvg, depth, seenIds);
  }
}

export function sanitizeSvgMarkup(markup: string): string {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    .replace(/<script\b[^>]*\/\s*>/gi, "")
    .replace(/<foreignObject\b[^>]*>[\s\S]*?<\/foreignObject\s*>/gi, "")
    .replace(/<foreignObject\b[^>]*\/\s*>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+(?:xlink:)?href\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, "");
}

export function inlineSvgElement(
  svg: SVGSVGElement,
  getStyle?: (el: Element) => CSSStyleDeclaration
): string {
  const doc = svg.ownerDocument;
  const view = doc?.defaultView;
  const readStyle =
    getStyle ?? ((el: Element) => (view ? view.getComputedStyle(el) : getComputedStyle(el)));

  const clone = svg.cloneNode(true) as SVGSVGElement;
  if (!clone.getAttribute("xmlns")) {
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }

  const rect = typeof svg.getBoundingClientRect === "function" ? svg.getBoundingClientRect() : null;
  const width = rect && rect.width > 0 ? rect.width : parseFloat(clone.getAttribute("width") || "0") || 0;
  const height = rect && rect.height > 0 ? rect.height : parseFloat(clone.getAttribute("height") || "0") || 0;

  if (doc) {
    syncSubtreeStyles(svg, clone, readStyle, doc, clone);
  }

  if (width > 0) clone.setAttribute("width", String(width));
  if (height > 0) clone.setAttribute("height", String(height));
  if (!clone.getAttribute("viewBox") && width > 0 && height > 0) {
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  const serialized =
    typeof XMLSerializer !== "undefined"
      ? new XMLSerializer().serializeToString(clone)
      : clone.outerHTML;

  return sanitizeSvgMarkup(serialized);
}
