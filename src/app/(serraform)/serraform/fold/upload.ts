export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MiB
export const MAX_UPLOAD_AXIS = 4096;
export const MAX_UPLOAD_PIXELS = 16_000_000;

export const UPLOAD_ERRORS = {
  type: 'Choose a PNG, JPEG or WebP image.',
  size: 'Choose an image of 8 MiB or less.',
  dimensions: 'Choose an image at most 4096 pixels on each side and 16 megapixels in total.',
  corrupt: 'This image could not be opened.',
} as const;

export type AllowedImageFormat = 'png' | 'jpeg' | 'webp';

export interface ParsedImageHeader {
  format: AllowedImageFormat;
  width: number;
  height: number;
}

export interface UploadedArtworkResource {
  id: string;
  filename: string;
  width: number;
  height: number;
  bitmap: ImageBitmap;
  previewUrl: string;
  dispose: () => void;
}

function readUint16BE(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] << 8) | bytes[offset + 1];
}

function readUint16LE(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint24LE(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}

function readUint32BE(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] << 24) >>> 0) +
    (bytes[offset + 1] << 16) +
    (bytes[offset + 2] << 8) +
    bytes[offset + 3]
  );
}

function matchAscii(bytes: Uint8Array, offset: number, str: string): boolean {
  if (offset + str.length > bytes.length) return false;
  for (let i = 0; i < str.length; i += 1) {
    if (bytes[offset + i] !== str.charCodeAt(i)) return false;
  }
  return true;
}

/**
 * Inspects binary signatures and extracts image dimensions from PNG, JPEG, or WebP headers
 * without allocating a decoded GPU/bitmap buffer first.
 * Explicitly rejects SVG, GIF, HTML, or unrecognized magic bytes.
 */
export function parseSupportedImageHeader(
  bytes: Uint8Array,
): { ok: true; header: ParsedImageHeader } | { ok: false; reason: 'type' | 'corrupt' } {
  if (bytes.length < 12) {
    return { ok: false, reason: 'type' };
  }

  // Explicitly detect text-based markup / SVG / GIF signatures
  const prefix = String.fromCharCode(...bytes.subarray(0, Math.min(32, bytes.length))).trimStart().toLowerCase();
  if (prefix.startsWith('<svg') || prefix.startsWith('<?xml') || prefix.startsWith('<!doctype') || prefix.startsWith('<html')) {
    return { ok: false, reason: 'type' };
  }
  if (matchAscii(bytes, 0, 'GIF87a') || matchAscii(bytes, 0, 'GIF89a')) {
    return { ok: false, reason: 'type' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A + IHDR
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    if (bytes.length < 24 || !matchAscii(bytes, 12, 'IHDR')) {
      return { ok: false, reason: 'corrupt' };
    }
    const width = readUint32BE(bytes, 16);
    const height = readUint32BE(bytes, 20);
    if (width <= 0 || height <= 0) {
      return { ok: false, reason: 'corrupt' };
    }
    return { ok: true, header: { format: 'png', width, height } };
  }

  // JPEG: FF D8
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      // Seek next 0xFF marker
      if (bytes[offset] !== 0xff) {
        return { ok: false, reason: 'corrupt' };
      }
      while (offset < bytes.length && bytes[offset] === 0xff) {
        offset += 1;
      }
      if (offset >= bytes.length) break;
      const marker = bytes[offset];
      offset += 1;

      // Standalone markers (TEM, RST0..7, SOI, EOI)
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        if (marker === 0xd9) break;
        continue;
      }
      // Start of Scan reaches image entropy stream; stop scanning
      if (marker === 0xda) break;

      if (offset + 2 > bytes.length) break;
      const segLen = readUint16BE(bytes, offset);
      if (segLen < 2 || offset + segLen > bytes.length) {
        return { ok: false, reason: 'corrupt' };
      }

      // SOF markers containing dimensions (except DHT=C4, JPG=C8, DAC=CC)
      const isSof =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;

      if (isSof) {
        if (segLen < 7) {
          return { ok: false, reason: 'corrupt' };
        }
        const height = readUint16BE(bytes, offset + 3);
        const width = readUint16BE(bytes, offset + 5);
        if (width <= 0 || height <= 0) {
          return { ok: false, reason: 'corrupt' };
        }
        return { ok: true, header: { format: 'jpeg', width, height } };
      }

      offset += segLen;
    }
    return { ok: false, reason: 'corrupt' };
  }

  // WebP: RIFF....WEBP
  if (matchAscii(bytes, 0, 'RIFF') && matchAscii(bytes, 8, 'WEBP')) {
    if (bytes.length < 25) {
      return { ok: false, reason: 'corrupt' };
    }
    if (matchAscii(bytes, 12, 'VP8X')) {
      if (bytes.length < 30) return { ok: false, reason: 'corrupt' };
      const width = readUint24LE(bytes, 24) + 1;
      const height = readUint24LE(bytes, 27) + 1;
      return width > 0 && height > 0
        ? { ok: true, header: { format: 'webp', width, height } }
        : { ok: false, reason: 'corrupt' };
    }
    if (matchAscii(bytes, 12, 'VP8L')) {
      if (bytes[20] !== 0x2f) {
        return { ok: false, reason: 'corrupt' };
      }
      const b1 = bytes[21];
      const b2 = bytes[22];
      const b3 = bytes[23];
      const b4 = bytes[24];
      const bits = b1 | (b2 << 8) | (b3 << 16) | (b4 << 24);
      const width = (bits & 0x3fff) + 1;
      const height = ((bits >>> 14) & 0x3fff) + 1;
      return { ok: true, header: { format: 'webp', width, height } };
    }
    if (matchAscii(bytes, 12, 'VP8 ')) {
      if (bytes.length < 30 || bytes[23] !== 0x9d || bytes[24] !== 0x01 || bytes[25] !== 0x2a) {
        return { ok: false, reason: 'corrupt' };
      }
      const width = readUint16LE(bytes, 26) & 0x3fff;
      const height = readUint16LE(bytes, 28) & 0x3fff;
      return width > 0 && height > 0
        ? { ok: true, header: { format: 'webp', width, height } }
        : { ok: false, reason: 'corrupt' };
    }
    return { ok: false, reason: 'corrupt' };
  }

  return { ok: false, reason: 'type' };
}

export function validateUploadMetadata(
  mimeType: string,
  byteLength: number,
  bytes: Uint8Array,
): { ok: true; header: ParsedImageHeader } | { ok: false; error: string } {
  const cleanMime = mimeType.toLowerCase().trim();
  const allowedMimes = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']);
  if (cleanMime && !allowedMimes.has(cleanMime)) {
    return { ok: false, error: UPLOAD_ERRORS.type };
  }

  if (!Number.isFinite(byteLength) || byteLength <= 0 || byteLength > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: byteLength > MAX_UPLOAD_BYTES ? UPLOAD_ERRORS.size : UPLOAD_ERRORS.corrupt,
    };
  }

  const parsed = parseSupportedImageHeader(bytes);
  if (!parsed.ok) {
    return {
      ok: false,
      error: parsed.reason === 'type' ? UPLOAD_ERRORS.type : UPLOAD_ERRORS.corrupt,
    };
  }

  const { width, height } = parsed.header;
  if (
    width > MAX_UPLOAD_AXIS ||
    height > MAX_UPLOAD_AXIS ||
    width * height > MAX_UPLOAD_PIXELS
  ) {
    return { ok: false, error: UPLOAD_ERRORS.dimensions };
  }

  return { ok: true, header: parsed.header };
}

export function sanitizeFilename(rawName: string): string {
  const base = rawName.split(/[/\\]/).pop() ?? 'uploaded-image';
  const clean = base.replace(/[^\w.\- ()]/g, '').trim();
  return clean.length > 0 ? clean.slice(0, 64) : 'uploaded-image';
}

/**
 * Decodes and downsamples a validated local image File into a browser-session resource.
 * Never persists bytes externally or leaks object URLs / ImageBitmaps.
 */
export async function loadValidatedImageFile(
  file: File,
  token: number,
  isCurrentToken: (t: number) => boolean,
): Promise<{ ok: true; resource: UploadedArtworkResource } | { ok: false; error: string }> {
  // 1. Pre-check MIME & size before touching bytes
  if (
    file.type &&
    !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
      file.type.toLowerCase().trim(),
    )
  ) {
    return { ok: false, error: UPLOAD_ERRORS.type };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: UPLOAD_ERRORS.size };
  }

  // 2. Read header slice (first 128 KiB covers PNG IHDR, WebP chunks, and JPEG EXIF+SOF)
  let headerBytes: Uint8Array;
  try {
    const slice = file.slice(0, 131072);
    headerBytes = new Uint8Array(await slice.arrayBuffer());
  } catch {
    return { ok: false, error: UPLOAD_ERRORS.corrupt };
  }

  if (!isCurrentToken(token)) {
    return { ok: false, error: '' };
  }

  const check = validateUploadMetadata(file.type, file.size, headerBytes);
  if (!check.ok) {
    return { ok: false, error: check.error };
  }

  // 3. Safe bitmap decode with downsampling cap for texture performance
  let rawBitmap: ImageBitmap | null = null;
  let workingBitmap: ImageBitmap | null = null;
  let previewUrl = '';

  try {
    rawBitmap = await createImageBitmap(file);

    if (!isCurrentToken(token)) {
      rawBitmap.close();
      return { ok: false, error: '' };
    }

    if (
      rawBitmap.width <= 0 ||
      rawBitmap.height <= 0 ||
      rawBitmap.width > MAX_UPLOAD_AXIS ||
      rawBitmap.height > MAX_UPLOAD_AXIS ||
      rawBitmap.width * rawBitmap.height > MAX_UPLOAD_PIXELS
    ) {
      rawBitmap.close();
      return { ok: false, error: UPLOAD_ERRORS.dimensions };
    }

    // Downsample working bitmap if larger than 1536px on longest edge
    const maxWorkingEdge = 1536;
    if (Math.max(rawBitmap.width, rawBitmap.height) > maxWorkingEdge) {
      const scale = maxWorkingEdge / Math.max(rawBitmap.width, rawBitmap.height);
      const dw = Math.max(1, Math.round(rawBitmap.width * scale));
      const dh = Math.max(1, Math.round(rawBitmap.height * scale));
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = dw;
      tempCanvas.height = dh;
      const tCtx = tempCanvas.getContext('2d');
      if (tCtx) {
        tCtx.imageSmoothingEnabled = true;
        tCtx.imageSmoothingQuality = 'high';
        tCtx.drawImage(rawBitmap, 0, 0, dw, dh);
        workingBitmap = await createImageBitmap(tempCanvas);
        rawBitmap.close();
        rawBitmap = null;
      } else {
        workingBitmap = rawBitmap;
        rawBitmap = null;
      }
    } else {
      workingBitmap = rawBitmap;
      rawBitmap = null;
    }

    if (!isCurrentToken(token)) {
      workingBitmap.close();
      return { ok: false, error: '' };
    }

    // Small thumbnail data URL for the upload control card (no lingering object URL leaks)
    const thumbCanvas = document.createElement('canvas');
    const thumbScale = Math.min(1, 160 / Math.max(workingBitmap.width, workingBitmap.height));
    thumbCanvas.width = Math.max(1, Math.round(workingBitmap.width * thumbScale));
    thumbCanvas.height = Math.max(1, Math.round(workingBitmap.height * thumbScale));
    const thCtx = thumbCanvas.getContext('2d');
    if (thCtx) {
      thCtx.drawImage(workingBitmap, 0, 0, thumbCanvas.width, thumbCanvas.height);
      previewUrl = thumbCanvas.toDataURL('image/png');
    }

    const finalBitmap = workingBitmap;
    const cleanFilename = sanitizeFilename(file.name);
    let released = false;

    return {
      ok: true,
      resource: {
        id: `upload-${token}-${Date.now()}`,
        filename: cleanFilename,
        width: check.header.width,
        height: check.header.height,
        bitmap: finalBitmap,
        previewUrl,
        dispose: () => {
          if (released) return;
          released = true;
          try {
            finalBitmap.close();
          } catch {
            // ignore already closed
          }
        },
      },
    };
  } catch {
    try {
      rawBitmap?.close();
    } catch {
      // ignore
    }
    try {
      workingBitmap?.close();
    } catch {
      // ignore
    }
    return { ok: false, error: UPLOAD_ERRORS.corrupt };
  }
}
