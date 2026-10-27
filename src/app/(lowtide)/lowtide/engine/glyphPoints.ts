/** A tiny drawing surface: enough to rasterise a word and read back its coverage. */
export type GlyphCanvas = {
  width: number;
  height: number;
  clear(): void;
  drawText(text: string): void;
  alpha(): Uint8ClampedArray;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Rasterise `text` and scatter `count` points over its filled pixels.
 * Returns xy pairs in a width-normalised box: x ∈ [−0.5, 0.5], y scaled by the canvas aspect, centred, y up.
 */
export function sampleGlyphPoints(text: string, count: number, canvas: GlyphCanvas, seed: number): Float32Array {
  canvas.clear();
  canvas.drawText(text);
  const a = canvas.alpha();
  const filled: number[] = [];
  for (let i = 0; i < canvas.width * canvas.height; i++) if (a[i * 4 + 3] > 128) filled.push(i);
  const out = new Float32Array(count * 2);
  if (!filled.length) return out;
  const rand = mulberry32(seed);
  for (let k = 0; k < count; k++) {
    const i = filled[Math.floor(rand() * filled.length)];
    const px = (i % canvas.width) + rand() * 0.98;
    const py = Math.floor(i / canvas.width) + rand() * 0.98;
    out[k * 2] = Math.min(0.5, px / canvas.width - 0.5);
    out[k * 2 + 1] = -(py / canvas.height - 0.5) * (canvas.height / canvas.width);
  }
  return out;
}

/** The browser version: a 2D canvas drawing the word in the display face, as large as fits. */
export function createBrowserGlyphCanvas(fontFamily: string, width = 640, height = 240): GlyphCanvas {
  const el = document.createElement("canvas");
  el.width = width;
  el.height = height;
  const g = el.getContext("2d", { willReadFrequently: true })!;
  return {
    width,
    height,
    clear: () => g.clearRect(0, 0, width, height),
    drawText(text: string) {
      let size = height * 0.86;
      g.font = `600 ${size}px ${fontFamily}`;
      const w = g.measureText(text).width;
      if (w > width * 0.94) size *= (width * 0.94) / w;
      g.font = `600 ${size}px ${fontFamily}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = "white";
      g.fillText(text, width / 2, height / 2 + size * 0.04);
    },
    alpha: () => g.getImageData(0, 0, width, height).data,
  };
}
