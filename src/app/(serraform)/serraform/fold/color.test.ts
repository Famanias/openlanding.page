import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  hexToHsv,
  hexToRgb,
  hsvToHex,
  hsvToRgb,
  mixHex,
  normalizeHex,
  rgbToHex,
} from './color';

test('normalizeHex accepts #RGB, RGB, #RRGGBB, RRGGBB and rejects invalid values', () => {
  assert.equal(normalizeHex('#9a463d'), '#9A463D');
  assert.equal(normalizeHex('9a463d'), '#9A463D');
  assert.equal(normalizeHex(' #3a7 '), '#33AA77');
  assert.equal(normalizeHex('abc'), '#AABBCC');

  assert.equal(normalizeHex(''), null);
  assert.equal(normalizeHex('#'), null);
  assert.equal(normalizeHex('#12'), null);
  assert.equal(normalizeHex('#12345'), null);
  assert.equal(normalizeHex('#GGGGGG'), null);
  assert.equal(normalizeHex('not-a-hex'), null);
});

test('HSV <-> RGB <-> Hex conversions round-trip accurately including wraparound and grayscale', () => {
  // Primary hue anchors: 0 red, 120 green, 240 blue, 359 red wrap
  assert.equal(hsvToHex(0, 100, 100), '#FF0000');
  assert.equal(hsvToHex(120, 100, 100), '#00FF00');
  assert.equal(hsvToHex(240, 100, 100), '#0000FF');
  assert.equal(hsvToHex(360, 100, 100), '#FF0000');

  // Target custom color check (#32AA77)
  const hsv = hexToHsv('#32AA77');
  const roundTrip = hsvToHex(hsv.h, hsv.s, hsv.v);
  const origRgb = hexToRgb('#32AA77');
  const rtRgb = hexToRgb(roundTrip);
  assert.ok(Math.abs(origRgb.r - rtRgb.r) <= 3);
  assert.ok(Math.abs(origRgb.g - rtRgb.g) <= 3);
  assert.ok(Math.abs(origRgb.b - rtRgb.b) <= 3);

  // Black, white, grayscale preserve fallbackHue
  assert.deepEqual(hexToHsv('#000000', 215), { h: 215, s: 0, v: 0 });
  assert.deepEqual(hexToHsv('#FFFFFF', 142), { h: 142, s: 0, v: 100 });
  assert.deepEqual(hexToHsv('#808080', 48), { h: 48, s: 0, v: 50 });

  assert.deepEqual(hsvToRgb(180, 0, 0), { r: 0, g: 0, b: 0 });
  assert.equal(rgbToHex(50, 170, 119), '#32AA77');
});

test('mixHex interpolates cleanly across endpoints', () => {
  assert.equal(mixHex('#000000', '#FFFFFF', 0), '#000000');
  assert.equal(mixHex('#000000', '#FFFFFF', 1), '#FFFFFF');
  assert.equal(mixHex('#000000', '#FFFFFF', 0.5), '#808080');
});
