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

const MAX_DIM = 4096;

export function isFigmaSupportedRasterBytes(
  bytes: Uint8Array
): "image/png" | "image/jpeg" | "image/gif" | null {
  if (
    bytes.length >= 24 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const width = view.getUint32(16, false);
    const height = view.getUint32(20, false);
    if (width === 0 || height === 0 || width > MAX_DIM || height > MAX_DIM) return null;
    return "image/png";
  }

  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    bytes.length >= 10 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const width = view.getUint16(6, true);
    const height = view.getUint16(8, true);
    if (width === 0 || height === 0 || width > MAX_DIM || height > MAX_DIM) return null;
    return "image/gif";
  }

  return null;
}

function clampDimensions(
  width: number,
  height: number,
  maxDim = MAX_DIM
): { width: number; height: number } {
  const scale = Math.min(1, maxDim / width, maxDim / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function drawElementToPng(
  source: CanvasImageSource,
  width: number,
  height: number,
  maxDim = MAX_DIM
): ExtractedMedia | null {
  if (typeof document === "undefined" || width <= 0 || height <= 0) return null;
  try {
    const dims = clampDimensions(width, height, maxDim);
    const canvas = document.createElement("canvas");
    canvas.width = dims.width;
    canvas.height = dims.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return readCanvasPng(canvas);
  } catch {
    return null;
  }
}

async function loadImageElement(src: string): Promise<HTMLImageElement | null> {
  if (typeof Image === "undefined") return null;
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => resolve(null), 4000);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = src;
  });
}

async function transcodeBytesToPng(
  url: string,
  media: ExtractedMedia | null
): Promise<ExtractedMedia | null> {
  if (!media || typeof document === "undefined") return null;

  if (typeof createImageBitmap === "function" && typeof Blob !== "undefined") {
    try {
      const bitmap = await createImageBitmap(new Blob([media.bytes.slice()], { type: media.mime }));
      try {
        const png = drawElementToPng(bitmap, bitmap.width, bitmap.height);
        if (png) return png;
      } finally {
        bitmap.close?.();
      }
    } catch {
      // createImageBitmap rejects SVG in Chromium; fall back to offscreen Image.
    }
  }

  let objectUrl: string | null = null;
  try {
    let src = url;
    if (
      url.slice(0, 5).toLowerCase() !== "data:" &&
      typeof URL !== "undefined" &&
      typeof URL.createObjectURL === "function" &&
      typeof Blob !== "undefined"
    ) {
      objectUrl = URL.createObjectURL(new Blob([media.bytes.slice()], { type: media.mime }));
      src = objectUrl;
    }
    const loaded = await loadImageElement(src);
    if (!loaded) return null;
    const w = loaded.naturalWidth || loaded.width;
    const h = loaded.naturalHeight || loaded.height;
    return w > 0 && h > 0 ? drawElementToPng(loaded, w, h) : null;
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

export async function extractImageBytes(
  url: string,
  options?: { fetchTimeoutMs?: number; imgEl?: HTMLImageElement }
): Promise<ExtractedMedia | null> {
  if (!url) return null;

  const img = options?.imgEl;
  const imgReady = Boolean(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
  const imgTooLarge = Boolean(imgReady && (img!.naturalWidth > MAX_DIM || img!.naturalHeight > MAX_DIM));

  let media: ExtractedMedia | null = null;
  if (url.slice(0, 5).toLowerCase() === "data:") {
    media = decodeDataUrl(url);
  } else if (typeof fetch === "function") {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutMs = Math.min(Math.max(1, options?.fetchTimeoutMs ?? 4000), 4000);
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
      const res = await fetch(url, controller ? { signal: controller.signal } : undefined);
      if (res.ok) {
        const bytes = new Uint8Array(await res.arrayBuffer());
        if (bytes.length > 0) {
          const ct = res.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
          media = { bytes, mime: ct || inferMimeFromUrl(url) };
        }
      }
    } catch {
      // Fall through to canvas readback on imgEl if available.
    } finally {
      if (timer !== null) clearTimeout(timer);
    }
  }

  if (media && !imgTooLarge) {
    const supportedMime = isFigmaSupportedRasterBytes(media.bytes);
    if (supportedMime) return { bytes: media.bytes, mime: supportedMime };
  }

  if (imgReady) {
    const drawn = drawElementToPng(img!, img!.naturalWidth, img!.naturalHeight);
    if (drawn) return drawn;
  }

  return transcodeBytesToPng(url, media);
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
    const imgData = ctx.getImageData(0, 0, sample.width, sample.height);
    const pixels = new Uint32Array(
      imgData.data.buffer,
      imgData.data.byteOffset,
      Math.floor(imgData.data.byteLength / 4)
    );
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i] !== 0) return false;
    }
    return true;
  } catch {
    return false;
  }
}

function readCanvasPng(canvas: HTMLCanvasElement): ExtractedMedia | null {
  if (isCanvasBlank(canvas)) return null;
  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || dataUrl === "data:,") return null;
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
    await new Promise<void>((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        clearTimeout(fallback);
        resolve();
      };
      const fallback = setTimeout(done, 50);
      requestAnimationFrame(done);
    });
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
    const captured = drawElementToPng(video, vw, vh, maxDim);
    if (captured) return captured;
  }

  if (video.poster) {
    return extractImageBytes(video.poster);
  }
  return null;
}
