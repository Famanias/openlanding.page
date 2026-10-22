import type { CanvasTexture } from "three";
import { createRng } from "./noise";

type ThreeModule = typeof import("three");

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  return [c, ctx];
}

function toTexture(THREE: ThreeModule, c: HTMLCanvasElement, srgb = true): CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

const SIGN_FONT = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

/**
 * Highway asphalt, 11.2 m wide x 12 m long per tile: shoulders, solid edge
 * lines, a dashed center line (3 m dash / 9 m gap) and worn wheel paths.
 */
export function asphaltTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 512;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  const px = (m: number) => ((m + 5.6) / 11.2) * W;
  ctx.fillStyle = "#3a3f45";
  ctx.fillRect(0, 0, W, H);
  // Shoulders.
  ctx.fillStyle = "#555a5f";
  ctx.fillRect(0, 0, px(-4.2), H);
  ctx.fillRect(px(4.2), 0, W - px(4.2), H);
  // Worn wheel paths (slightly darker, smoother).
  ctx.fillStyle = "rgba(20,24,28,0.22)";
  for (const lane of [-1.95, 1.95]) {
    ctx.fillRect(px(lane - 1.15), 0, px(-5.6 + 0.55), H);
    ctx.fillRect(px(lane + 0.6), 0, px(-5.6 + 0.55), H);
  }
  // Aggregate speckle.
  const rng = createRng(7);
  for (let i = 0; i < 9000; i++) {
    const v = rng();
    ctx.fillStyle = v > 0.5 ? `rgba(255,255,255,${0.04 + rng() * 0.07})` : `rgba(0,0,0,${0.06 + rng() * 0.1})`;
    ctx.fillRect(rng() * W, rng() * H, 1 + rng() * 1.5, 1 + rng() * 1.5);
  }
  // Tar-sealed cracks.
  ctx.strokeStyle = "rgba(15,17,20,0.45)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 5; i++) {
    let x = px(-3.6) + rng() * (px(3.6) - px(-3.6));
    let y = rng() * H;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let k = 0; k < 6; k++) {
      x += (rng() - 0.5) * 24;
      y += 10 + rng() * 22;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // Edge lines.
  ctx.fillStyle = "rgba(242,240,232,0.92)";
  ctx.fillRect(px(-4.05), 0, px(-5.6 + 0.16), H);
  ctx.fillRect(px(3.89), 0, px(-5.6 + 0.16), H);
  // Center dash.
  ctx.fillRect(px(-0.075), 0, px(-5.6 + 0.15), (3 / 12) * H);
  const t = toTexture(THREE, c);
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  return t;
}

/** Concrete yard apron with slab joints. */
export function concreteTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 512;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  ctx.fillStyle = "#9b968c";
  ctx.fillRect(0, 0, W, H);
  const rng = createRng(11);
  for (let i = 0; i < 7000; i++) {
    ctx.fillStyle = rng() > 0.5 ? `rgba(255,255,255,${rng() * 0.08})` : `rgba(0,0,0,${rng() * 0.08})`;
    ctx.fillRect(rng() * W, rng() * H, 2, 2);
  }
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = `rgba(60,55,50,${0.04 + rng() * 0.06})`;
    ctx.beginPath();
    ctx.ellipse(rng() * W, rng() * H, 20 + rng() * 60, 10 + rng() * 30, rng() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(70,66,60,0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  // Faded yellow lane guides.
  ctx.fillStyle = "rgba(226,178,52,0.55)";
  ctx.fillRect(4, 0, 7, H);
  ctx.fillRect(W - 11, 0, 7, H);
  const t = toTexture(THREE, c);
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  return t;
}

/** Soft round glow (for lamp pools, particles, flares). White, alpha falloff. */
export function glowTexture(THREE: ThreeModule, size = 128, hardness = 0): CanvasTexture {
  const [c, ctx] = canvas(size, size);
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(Math.min(0.9, 0.2 + hardness), "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return toTexture(THREE, c, false);
}

/** Headlight throw on the road: a widening, fading trapezoid. */
export function headlightPoolTexture(THREE: ThreeModule): CanvasTexture {
  const W = 256;
  const H = 256;
  const [c, ctx] = canvas(W, H);
  const grad = ctx.createLinearGradient(0, H, 0, 0);
  grad.addColorStop(0, "rgba(255,255,255,0.0)");
  grad.addColorStop(0.08, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.45, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(W * 0.36, H);
  ctx.lineTo(W * 0.64, H);
  ctx.lineTo(W, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  // Feather the sides.
  const side = ctx.createLinearGradient(0, 0, W, 0);
  side.addColorStop(0, "rgba(0,0,0,1)");
  side.addColorStop(0.3, "rgba(0,0,0,0)");
  side.addColorStop(0.7, "rgba(0,0,0,0)");
  side.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, W, H);
  return toTexture(THREE, c, false);
}

/** Vertical light beam gradient (bright at the source, fading out). */
export function beamTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(64, 256);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 256);
  const side = ctx.createLinearGradient(0, 0, 64, 0);
  side.addColorStop(0, "rgba(0,0,0,1)");
  side.addColorStop(0.5, "rgba(0,0,0,0)");
  side.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, 64, 256);
  return toTexture(THREE, c, false);
}

/** Scanner curtain: vertical scan lines with a bright bottom edge. */
export function scannerTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(256, 128);
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgba(255,255,255,0.75)");
  g.addColorStop(0.18, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0.05)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let x = 0; x < 256; x += 16) ctx.fillRect(x, 0, 1, 128);
  const t = toTexture(THREE, c, false);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

type SignOptions = {
  width: number;
  height: number;
  background: string;
  border?: string;
  lines: Array<{ text: string; size: number; color: string; weight?: number; y: number; font?: string; tracking?: number }>;
};

/** Generic sign panel (highway sign, facade lettering, gantry board). */
export function signTexture(THREE: ThreeModule, o: SignOptions, anisotropy: number): CanvasTexture {
  const [c, ctx] = canvas(o.width, o.height);
  ctx.fillStyle = o.background;
  ctx.fillRect(0, 0, o.width, o.height);
  if (o.border) {
    ctx.strokeStyle = o.border;
    ctx.lineWidth = Math.max(4, o.height * 0.03);
    const inset = ctx.lineWidth * 1.4;
    roundRect(ctx, inset, inset, o.width - inset * 2, o.height - inset * 2, o.height * 0.06);
    ctx.stroke();
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const line of o.lines) {
    ctx.fillStyle = line.color;
    ctx.font = `${line.weight ?? 700} ${line.size}px ${line.font ?? SIGN_FONT}`;
    let x = o.width / 2;
    if (line.tracking && "letterSpacing" in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${line.tracking}px`;
      // Tracking also trails the last glyph; shift right by half so the text stays centered.
      x += line.tracking / 2;
    }
    ctx.fillText(line.text, x, line.y);
    if ("letterSpacing" in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
    }
  }
  const t = toTexture(THREE, c);
  t.anisotropy = anisotropy;
  return t;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Cargo-box livery: the HighwayTMS brand mark and wordmark, centered.
 * The mark SVG loads asynchronously and is painted in when ready.
 */
export function liveryTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 1024;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  const texture = toTexture(THREE, c);
  texture.anisotropy = anisotropy;

  const paint = (mark: HTMLImageElement | null) => {
    ctx.clearRect(0, 0, W, H);
    // Brand lockup (mark + wordmark + tagline), centered on the box side.
    const markSize = H * 0.36;
    const gap = mark ? 28 : 0;
    const titleFont = `800 ${Math.round(H * 0.2)}px ${SIGN_FONT}`;
    const tagFont = `600 ${Math.round(H * 0.075)}px ${SIGN_FONT}`;
    ctx.font = titleFont;
    const titleWidth = ctx.measureText("KINETIC").width;
    ctx.font = tagFont;
    const tagWidth = ctx.measureText("Megamarket drops, delivered by hand.").width + 4;
    const lockupWidth = (mark ? markSize + gap : 0) + Math.max(titleWidth, tagWidth);
    const left = (W - lockupWidth) / 2;
    const top = (H - markSize) / 2;
    const textX = mark ? left + markSize + gap : left;
    if (mark) ctx.drawImage(mark, left, top, markSize, markSize);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#10263D";
    ctx.font = titleFont;
    ctx.fillText("KINETIC", textX, top + H * 0.23);
    ctx.fillStyle = "#2F5D7C";
    ctx.font = tagFont;
    ctx.fillText("Megamarket drops, delivered by hand.", textX + 4, top + H * 0.35);
    texture.needsUpdate = true;
  };
  paint(null);
  const img = new Image();
  img.decoding = "async";
  img.onload = () => paint(img);
  img.src = "/templates/kinetic/icon.svg";
  return texture;
}

/** Roll-up dock door (corrugated slats). */
export function dockDoorTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.fillStyle = "#c9cdd0";
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 8) {
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, y, 128, 2);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(0, y + 2, 128, 1);
  }
  ctx.fillStyle = "#e0a238";
  ctx.fillRect(0, 118, 128, 10);
  return toTexture(THREE, c);
}
