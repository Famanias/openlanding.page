export interface ExtractedMedia {
  bytes: Uint8Array;
  mime: string;
}

const MIME_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
};

function inferMimeFromUrl(url: string): string {
  const clean = url.split(/[?#]/)[0].toLowerCase();
  const ext = clean.slice(clean.lastIndexOf(".") + 1);
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export function decodeDataUrl(dataUrl: string): ExtractedMedia | null {
  if (dataUrl.slice(0, 5).toLowerCase() !== "data:") return null;
  const comma = dataUrl.indexOf(",");
  if (comma === -1) return null;

  const meta = dataUrl.slice(5, comma);
  const payload = dataUrl.slice(comma + 1);
  const parts = meta.split(";").filter(Boolean);
  const isBase64 = parts.some((p) => p.toLowerCase() === "base64");
  const mime =
    parts[0] && !parts[0].includes("=") && parts[0].toLowerCase() !== "base64"
      ? parts[0].toLowerCase()
      : "text/plain";

  try {
    if (isBase64) {
      const bin = atob(payload.replace(/\s+/g, ""));
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return { bytes, mime };
    }
    return { bytes: new TextEncoder().encode(decodeURIComponent(payload)), mime };
  } catch {
    return null;
  }
}

export function hashBytes(bytes: Uint8Array): string {
  let hash = 0xcbf29ce484222325n;
  for (let i = 0; i < bytes.length; i++) {
    hash ^= BigInt(bytes[i]);
    hash = (hash * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function drawElementToPng(
  source: CanvasImageSource,
  width: number,
  height: number
): ExtractedMedia | null {
  if (typeof document === "undefined" || width <= 0 || height <= 0) return null;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width));
    canvas.height = Math.max(1, Math.round(height));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return decodeDataUrl(canvas.toDataURL("image/png"));
  } catch {
    return null;
  }
}

export async function extractImageBytes(
  url: string,
  options?: { fetchTimeoutMs?: number; imgEl?: HTMLImageElement }
): Promise<ExtractedMedia | null> {
  if (!url) return null;
  if (url.slice(0, 5).toLowerCase() === "data:") return decodeDataUrl(url);

  if (typeof fetch === "function") {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutMs = Math.min(Math.max(1, options?.fetchTimeoutMs ?? 4000), 4000);
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const res = await fetch(url, controller ? { signal: controller.signal } : undefined);
      if (res.ok) {
        const bytes = new Uint8Array(await res.arrayBuffer());
        if (bytes.length > 0) {
          const ct = res.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
          return { bytes, mime: ct || inferMimeFromUrl(url) };
        }
      }
    } catch {
      // Fall through to canvas readback on imgEl if available.
    } finally {
      if (timer !== null) clearTimeout(timer);
    }
  }

  const img = options?.imgEl;
  if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
    return drawElementToPng(img, img.naturalWidth, img.naturalHeight);
  }
  return null;
}

function isCanvasBlank(canvas: HTMLCanvasElement): boolean {
  if (typeof document === "undefined" || canvas.width * canvas.height > 4_000_000) return false;
  try {
    const sample = document.createElement("canvas");
    sample.width = canvas.width;
    sample.height = canvas.height;
    const ctx = sample.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(canvas, 0, 0);
    const pixels = new Uint32Array(ctx.getImageData(0, 0, sample.width, sample.height).data.buffer);
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i] !== 0) return false;
    }
    return true;
  } catch {
    return false;
  }
}

function readCanvasPng(canvas: HTMLCanvasElement): ExtractedMedia | null {
  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || dataUrl === "data:,") return null;
    if (isCanvasBlank(canvas)) return null;
    return decodeDataUrl(dataUrl);
  } catch {
    return null;
  }
}

export async function captureCanvasBytes(canvas: HTMLCanvasElement): Promise<ExtractedMedia | null> {
  if (canvas.width <= 0 || canvas.height <= 0) return null;

  const first = readCanvasPng(canvas);
  if (first) return first;

  // WebGL canvases without preserveDrawingBuffer clear before synchronous readback; retry once on next frame.
  if (typeof requestAnimationFrame === "function") {
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return readCanvasPng(canvas);
  }
  return null;
}

export async function captureVideoPosterBytes(
  video: HTMLVideoElement,
  maxDim = 1280
): Promise<ExtractedMedia | null> {
  const vw = video.videoWidth || 0;
  const vh = video.videoHeight || 0;
  if (vw > 0 && vh > 0) {
    const scale = Math.min(1, maxDim / Math.max(vw, vh));
    const captured = drawElementToPng(video, vw * scale, vh * scale);
    if (captured) return captured;
  }

  if (video.poster) {
    return extractImageBytes(video.poster);
  }
  return null;
}
