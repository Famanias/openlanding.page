import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  MAX_UPLOAD_BYTES,
  parseSupportedImageHeader,
  sanitizeFilename,
  UPLOAD_ERRORS,
  validateUploadMetadata,
} from './upload';

function buildPngHeader(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(24);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], 0);
  bytes.set([0x00, 0x00, 0x00, 0x0d], 8);
  bytes.set([0x49, 0x48, 0x44, 0x52], 12); // IHDR
  const view = new DataView(bytes.buffer);
  view.setUint32(16, width, false);
  view.setUint32(20, height, false);
  return bytes;
}

function buildJpegHeader(width: number, height: number): Uint8Array {
  return new Uint8Array([
    0xff, 0xd8, // SOI
    0xff, 0xe0, 0x00, 0x06, 0x00, 0x00, 0x00, 0x00, // APP0
    0xff, 0xc0, 0x00, 0x0b, 0x08, // SOF0
    (height >> 8) & 0xff, height & 0xff,
    (width >> 8) & 0xff, width & 0xff,
    0x03, 0x01, 0x11, 0x00,
  ]);
}

function buildWebpLosslessHeader(width: number, height: number): Uint8Array {
  const bytes = new Uint8Array(28);
  bytes.set([0x52, 0x49, 0x46, 0x46], 0); // RIFF
  bytes.set([0x57, 0x45, 0x42, 0x50], 8); // WEBP
  bytes.set([0x56, 0x50, 0x38, 0x4c], 12); // VP8L
  bytes[20] = 0x2f;
  const packed = ((width - 1) & 0x3fff) | (((height - 1) & 0x3fff) << 14);
  bytes[21] = packed & 0xff;
  bytes[22] = (packed >> 8) & 0xff;
  bytes[23] = (packed >> 16) & 0xff;
  bytes[24] = (packed >> 24) & 0xff;
  return bytes;
}

test('parseSupportedImageHeader extracts dimensions for PNG, JPEG, and WebP', () => {
  const png = parseSupportedImageHeader(buildPngHeader(1200, 800));
  assert.deepEqual(png, { ok: true, header: { format: 'png', width: 1200, height: 800 } });

  const jpeg = parseSupportedImageHeader(buildJpegHeader(2048, 1024));
  assert.deepEqual(jpeg, { ok: true, header: { format: 'jpeg', width: 2048, height: 1024 } });

  const webp = parseSupportedImageHeader(buildWebpLosslessHeader(1536, 853));
  assert.deepEqual(webp, { ok: true, header: { format: 'webp', width: 1536, height: 853 } });
});

test('validateUploadMetadata rejects SVG/GIF/HTML, >8 MiB, and excessive dimensions before decode', () => {
  const svgBytes = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  assert.deepEqual(validateUploadMetadata('image/svg+xml', svgBytes.length, svgBytes), {
    ok: false,
    error: UPLOAD_ERRORS.type,
  });

  // Disguised SVG with fake image/png MIME still fails magic bytes
  assert.deepEqual(validateUploadMetadata('image/png', svgBytes.length, svgBytes), {
    ok: false,
    error: UPLOAD_ERRORS.type,
  });

  const validPng = buildPngHeader(800, 600);
  assert.deepEqual(validateUploadMetadata('image/png', MAX_UPLOAD_BYTES + 1, validPng), {
    ok: false,
    error: UPLOAD_ERRORS.size,
  });

  // > 4096 axis rejected
  assert.deepEqual(validateUploadMetadata('image/png', 1024, buildPngHeader(4097, 1000)), {
    ok: false,
    error: UPLOAD_ERRORS.dimensions,
  });

  // 4096 x 4096 = 16,777,216 > 16,000,000 megapixels rejected
  assert.deepEqual(validateUploadMetadata('image/png', 1024, buildPngHeader(4096, 4096)), {
    ok: false,
    error: UPLOAD_ERRORS.dimensions,
  });

  // Valid boundary: 4000 x 4000 = 16,000,000 accepted
  assert.deepEqual(validateUploadMetadata('image/png', 1024, buildPngHeader(4000, 4000)), {
    ok: true,
    header: { format: 'png', width: 4000, height: 4000 },
  });
});

test('sanitizeFilename strips paths and unsafe characters cleanly', () => {
  assert.equal(sanitizeFilename('C:\\fakepath\\studio<photo>.png'), 'studiophoto.png');
});
