/**
 * Prints a DOM region onto a canvas so the glass carries its text: the DOM is the layout,
 * the canvas is the ink. Each `[data-print]` element is drawn where it sits, in its own font,
 * in the colour its `--print` variables give it (the DOM text itself turns transparent in GL mode
 * and stays for selection, focus and hit testing).
 *
 *   data-print="text"  one line of text; `--print` colour, `--print-line: 1` draws an underline
 *   data-print="box"   a filled rounded box (`--print-bg`), e.g. a button's pill
 *   data-print="mark"  the Cullet mark: an ink tile with the cut shard
 *   data-print="ring"  a hairline registration circle
 */
function offsetIn(el: HTMLElement, region: HTMLElement) {
  let x = 0, y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== region) {
    x += node.offsetLeft; y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

const prop = (cs: CSSStyleDeclaration, name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;

export function printRegion(canvas: HTMLCanvasElement, region: HTMLElement, dpr: number) {
  const w = region.offsetWidth, h = region.offsetHeight;
  const cw = Math.max(1, Math.round(w * dpr)), ch = Math.max(1, Math.round(h * dpr));
  if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cw, ch);
  ctx.scale(dpr, dpr);

  region.querySelectorAll<HTMLElement>("[data-print]").forEach((el) => {
    if (el.offsetParent === null && el !== region) return; // display: none
    const kind = el.dataset.print;
    const cs = getComputedStyle(el);
    const { x, y } = offsetIn(el, region);
    const ew = el.offsetWidth, eh = el.offsetHeight;

    if (kind === "box") {
      ctx.fillStyle = prop(cs, "--print-bg", "transparent");
      roundRect(ctx, x, y, ew, eh, parseFloat(cs.borderTopLeftRadius) || 0);
      ctx.fill();
      return;
    }
    if (kind === "mark") {
      const ink = prop(cs, "--print", "black"), paper = prop(cs, "--print-bg", "white");
      ctx.fillStyle = ink;
      roundRect(ctx, x, y, ew, ew, ew * 0.225);
      ctx.fill();
      ctx.strokeStyle = paper;
      ctx.lineWidth = Math.max(1.2, ew * 0.075);
      ctx.lineJoin = "round";
      const k = ew / 24;
      ctx.beginPath();
      ctx.moveTo(x + 5.3 * k, y + 6.7 * k);
      ctx.lineTo(x + 13.4 * k, y + 4.3 * k);
      ctx.lineTo(x + 19.7 * k, y + 12.5 * k);
      ctx.lineTo(x + 10.6 * k, y + 19.7 * k);
      ctx.closePath();
      ctx.stroke();
      return;
    }
    if (kind === "ring") {
      ctx.strokeStyle = prop(cs, "--print", "black");
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + ew / 2, y + eh / 2, ew / 2, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }

    const raw = (el.textContent ?? "").trim();
    const text = cs.textTransform === "uppercase" ? raw.toUpperCase() : raw;
    if (!text) return;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const tracking = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    const c2d = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    if ("letterSpacing" in c2d) c2d.letterSpacing = tracking;
    ctx.fillStyle = prop(cs, "--print", "black");
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(text);
    const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.97;
    const desc = m.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.24;
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pt = parseFloat(cs.paddingTop) || 0, pb = parseFloat(cs.paddingBottom) || 0;
    const lineH = eh - pt - pb;
    const baseline = y + pt + (lineH - (asc + desc)) / 2 + asc;
    let tx = x + pl;
    if (cs.textAlign === "center") tx = x + (ew - m.width) / 2;
    ctx.fillText(text, tx, baseline);
    if (prop(cs, "--print-line", "0") === "1") {
      ctx.fillRect(tx, baseline + Math.max(2, desc * 0.45), m.width, Math.max(1, parseFloat(cs.fontSize) / 14));
    }
    if ("letterSpacing" in c2d) c2d.letterSpacing = "0px";
  });
}
