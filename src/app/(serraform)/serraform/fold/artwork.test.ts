import { test } from 'vitest';
import assert from 'node:assert/strict';
import { derivePrintTones } from './artwork';
import { colorDistanceOklab, contrastRatio, hexToOklch } from './color';

const TEST_MATRIX = [
  { name: 'Burgundy + Ivory', baseHex: '#4B202A', printHex: '#FFFCF8' },
  { name: 'Blush pink + Dark plum', baseHex: '#F3E8E4', printHex: '#4B202A' },
  { name: 'Cream + Oxblood', baseHex: '#D8C4A7', printHex: '#4B202A' },
  { name: 'Sage green + Terracotta', baseHex: '#A6B3A0', printHex: '#9A463D' },
  { name: 'Charcoal + Pale gold', baseHex: '#2B2426', printHex: '#E4C578' },
  { name: 'Bright red + White', baseHex: '#D32F2F', printHex: '#FFFFFF' },
  { name: 'White + Dark charcoal', baseHex: '#FFFFFF', printHex: '#2B2426' },
] as const;

test('derivePrintTones preserves principal Print Color and distinct tonal depth across all matrix combinations', () => {
  for (const row of TEST_MATRIX) {
    const tones = derivePrintTones(row.baseHex, row.printHex);

    assert.equal(tones.primary, row.printHex, `${row.name}: primary must match selected print color`);
    assert.equal(tones.foregroundInk, row.printHex, `${row.name}: foreground ink must match print color`);

    // Secondary and center contrast tones remain visibly distinct from primary, base, and foreground ridge
    assert.ok(
      colorDistanceOklab(tones.primary, tones.secondary) >= 0.08,
      `${row.name}: secondary petal/stripe tone must stay perceptually separated from primary`,
    );
    assert.ok(
      colorDistanceOklab(tones.primary, tones.centerContrast) >= 0.18,
      `${row.name}: blossom center must contrast cleanly against primary petal color`,
    );
    assert.ok(
      colorDistanceOklab(tones.foreRidge, tones.foregroundInk) >= 0.14,
      `${row.name}: landscape trees & ground band must pop against foreground slope`,
    );
    assert.ok(
      contrastRatio(row.baseHex, tones.primary) >= 2.2 || colorDistanceOklab(row.baseHex, tones.primary) >= 0.22,
      `${row.name}: print should read clearly over base felt`,
    );
  }
});

test('derivePrintTones retains pigment hue family rather than turning chromatic motifs gray-muddy', () => {
  const bloomTones = derivePrintTones('#A6B3A0', '#9A463D');
  const primaryOklch = hexToOklch(bloomTones.primary);
  const secondaryOklch = hexToOklch(bloomTones.secondary);
  const hueDiff = Math.min(
    Math.abs(primaryOklch.h - secondaryOklch.h),
    360 - Math.abs(primaryOklch.h - secondaryOklch.h),
  );
  assert.ok(hueDiff < 20, `Expected secondary terracotta hue to stay within 20deg of primary, got ${hueDiff}`);
  assert.ok(secondaryOklch.c >= 0.04, `Expected secondary terracotta tone to remain chromatic, got ${secondaryOklch.c}`);
});
