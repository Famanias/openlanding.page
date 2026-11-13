import { test } from 'vitest';
import assert from 'node:assert/strict';
import { DEFAULT_DESIGN, DEFAULT_VIEW } from '../config';
import { deriveRoomScene } from './deriveRoomScene';
import {
  contrastRatio,
  deriveRoomPalette,
  harmonizeRoomPalette,
  hexToOklch,
  interpolateRoomPaletteLabs,
  oklchToHex,
  paletteToOklabMap,
} from './paletteHarmonizer';

function angularHueDiff(aDeg: number, bDeg: number): number {
  const diff = Math.abs((((aDeg - bDeg) % 360) + 540) % 360 - 180);
  return diff;
}

test('all 5 built-in prints and upload map deterministically to 6 distinct room families', () => {
  const families = new Set([
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'bloom' } }).family,
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'stripes' } }).family,
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'landscape' } }).family,
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'waves' } }).family,
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'solid' } }).family,
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'upload' }, hasUpload: true }).family,
  ]);
  assert.equal(families.size, 6);
  assert.equal(
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'bloom' } }).decorVariant,
    'arch-alcove-ikebana',
  );
  assert.equal(
    deriveRoomScene({ design: { ...DEFAULT_DESIGN, print: 'stripes' } }).decorVariant,
    'vertical-ribs-blade-light',
  );
});

test('OKLCH round-trip preserves perceptual luminance and hue cleanly', () => {
  for (const hex of ['#D8C4A7', '#4B202A', '#9A463D', '#A6B3A0', '#2E5240', '#2B2426', '#EF5A73', '#9EC3E6']) {
    const lch = hexToOklch(hex);
    const back = oklchToHex(lch);
    const backLch = hexToOklch(back);
    assert.ok(Math.abs(lch.l - backLch.l) < 0.02, `Luminance drift on ${hex}`);
  }
});

test('hot pink (#EF5A73) + Solid generates a genuine rose-tinted interior, not neutral beige/gray', () => {
  const pinkSolid = deriveRoomPalette({
    baseColor: '#EF5A73',
    designColor: '#4B202A',
    print: 'solid',
    openness: 50,
    view: 'quarter',
  });
  const blueSolid = deriveRoomPalette({
    baseColor: '#9EC3E6',
    designColor: '#2B3A4E',
    print: 'solid',
    openness: 50,
    view: 'quarter',
  });
  const sandSolid = deriveRoomPalette({
    baseColor: '#D8C4A7',
    designColor: '#6B442E',
    print: 'solid',
    openness: 50,
    view: 'quarter',
  });

  const pinkInputHue = hexToOklch('#EF5A73').h;
  const pinkWallLch = hexToOklch(pinkSolid.wallBase);
  const pinkFloorLch = hexToOklch(pinkSolid.floorBase);
  const pinkRugLch = hexToOklch(pinkSolid.rug);

  assert.ok(pinkWallLch.c >= 0.025, `Hot pink room wall should carry visible chroma (got ${pinkWallLch.c})`);
  assert.ok(angularHueDiff(pinkWallLch.h, pinkInputHue) < 25, 'Wall hue should stay faithful to pink');
  assert.ok(angularHueDiff(pinkFloorLch.h, pinkInputHue) < 35, 'Floor hue should stay harmonized with pink');
  assert.ok(angularHueDiff(pinkRugLch.h, pinkInputHue) < 25, 'Rug hue should echo pink');

  assert.notEqual(pinkSolid.wallBase, sandSolid.wallBase);
  assert.notEqual(pinkSolid.wallBase, blueSolid.wallBase);
  assert.notEqual(pinkSolid.floorBase, blueSolid.floorBase);
  assert.ok(angularHueDiff(hexToOklch(blueSolid.wallBase).h, hexToOklch('#9EC3E6').h) < 25);
});

test('designColor drives decorative objects, rug trims, and secondary room accents across prints', () => {
  const withOchre = deriveRoomPalette({
    baseColor: '#A6B3A0',
    designColor: '#C68D47',
    print: 'waves',
    openness: 50,
    view: 'quarter',
  });
  const withBurgundy = deriveRoomPalette({
    baseColor: '#A6B3A0',
    designColor: '#5A1E2B',
    print: 'waves',
    openness: 50,
    view: 'quarter',
  });

  assert.equal(withOchre.wallBase, withBurgundy.wallBase);
  assert.notEqual(withOchre.decorPrimary, withBurgundy.decorPrimary);
  assert.notEqual(withOchre.decorAccent, withBurgundy.decorAccent);
  assert.notEqual(withOchre.rugTrim, withBurgundy.rugTrim);
});

test('switching print preserves base & design color identity without resetting room palette to beige', () => {
  const baseColor = '#EF5A73';
  const designColor = '#4B202A';
  const pinkInputHue = hexToOklch(baseColor).h;

  for (const print of ['bloom', 'stripes', 'landscape', 'waves', 'solid'] as const) {
    const recipe = deriveRoomScene({
      design: { ...DEFAULT_DESIGN, baseHex: baseColor, designHex: designColor, print },
      view: DEFAULT_VIEW,
    });
    const wallHue = hexToOklch(recipe.palette.wallBase).h;
    assert.ok(angularHueDiff(wallHue, pinkInputHue) < 25, `Print ${print} drifted away from selected base hue`);
    assert.ok(hexToOklch(recipe.palette.wallBase).c >= 0.025);
  }
});

test('full test matrix maintains WCAG AA >= 4.5 contrast for headlines and scoped Hero UI chrome', () => {
  const matrix = [
    { baseHex: '#EF5A73', designHex: '#4B202A', print: 'solid' as const },
    { baseHex: '#F4B8C4', designHex: '#5A1E2B', print: 'bloom' as const },
    { baseHex: '#A6B3A0', designHex: '#C68D47', print: 'waves' as const },
    { baseHex: '#2B2426', designHex: '#9A463D', print: 'stripes' as const },
    { baseHex: '#D8C4A7', designHex: '#6B442E', print: 'landscape' as const },
    { baseHex: '#9EC3E6', designHex: '#2B3A4E', print: 'solid' as const },
    { baseHex: '#7B3FF2', designHex: '#2A1D3D', print: 'bloom' as const },
    { baseHex: '#FFFFFF', designHex: '#2B2426', print: 'solid' as const },
    { baseHex: '#000000', designHex: '#D8C4A7', print: 'solid' as const },
  ];

  for (const row of matrix) {
    const recipe = deriveRoomScene({
      design: {
        opening: 60,
        baseHex: row.baseHex,
        designHex: row.designHex,
        print: row.print,
        motifScale: 100,
      },
      view: DEFAULT_VIEW,
    });

    const p = recipe.palette;
    assert.ok(
      contrastRatio(p.textPrimary, p.quietZoneBg) >= 4.5,
      `Primary text contrast too low for ${row.baseHex}/${row.print}`,
    );
    assert.ok(
      contrastRatio(p.textPrimary, p.wallBase) >= 4.5,
      `Wall primary text contrast too low for ${row.baseHex}/${row.print}`,
    );
    assert.ok(
      contrastRatio(p.uiAccentText, p.uiAccent) >= 4.5,
      `Hero CTA button contrast too low for ${row.baseHex}/${row.print}`,
    );
    if (row.baseHex === '#2B2426' || row.baseHex === '#000000') {
      assert.equal(p.isDarkEnvelope, true);
    }
  }
});

test('extreme vivid inputs are restrained on room walls while preserving contrast across all families', () => {
  const prints = ['bloom', 'stripes', 'landscape', 'waves', 'solid', 'upload'] as const;
  for (const print of prints) {
    const p = harmonizeRoomPalette(
      deriveRoomScene({ design: { ...DEFAULT_DESIGN, print } }).family,
      '#FF00AA',
      '#00FF88',
    );
    const wallChroma = hexToOklch(p.wallBase).c;
    assert.ok(wallChroma < 0.08, `Wall chroma too high (${wallChroma}) for ${print}`);
    assert.ok(contrastRatio(p.textPrimary, p.quietZoneBg) >= 4.5);
  }
});

test('OKLab palette interpolation cleanly transitions endpoints without muddying or invalid hexes', () => {
  const from = deriveRoomPalette({
    baseColor: '#D8C4A7',
    designColor: '#4B202A',
    print: 'bloom',
    openness: 50,
    view: 'quarter',
  });
  const to = deriveRoomPalette({
    baseColor: '#9EC3E6',
    designColor: '#2B3A4E',
    print: 'solid',
    openness: 50,
    view: 'quarter',
  });

  const fromLabs = paletteToOklabMap(from);
  const toLabs = paletteToOklabMap(to);

  const start = interpolateRoomPaletteLabs(fromLabs, toLabs, 0, { isDarkEnvelope: from.isDarkEnvelope });
  const mid = interpolateRoomPaletteLabs(fromLabs, toLabs, 0.5, { isDarkEnvelope: to.isDarkEnvelope });
  const end = interpolateRoomPaletteLabs(fromLabs, toLabs, 1, { isDarkEnvelope: to.isDarkEnvelope });

  assert.match(mid.wallBase, /^#[0-9A-F]{6}$/);
  assert.match(mid.decorAccent, /^#[0-9A-F]{6}$/);
  assert.notEqual(mid.wallBase, start.wallBase);
  assert.notEqual(mid.wallBase, end.wallBase);
  assert.ok(Math.abs(hexToOklch(end.wallBase).h - hexToOklch(to.wallBase).h) < 1.5);
});

test('openness, view yaw, and motifScale affect spatial metrics deterministically without altering family', () => {
  const tight = deriveRoomScene({
    design: { ...DEFAULT_DESIGN, opening: 10, motifScale: 75 },
    view: { yawDeg: 0, elevationDeg: 8 },
  });
  const wide = deriveRoomScene({
    design: { ...DEFAULT_DESIGN, opening: 90, motifScale: 160 },
    view: { yawDeg: 84, elevationDeg: 28 },
  });

  assert.equal(tight.family, wide.family);
  assert.ok(wide.spatial.spread > tight.spatial.spread);
  assert.ok(wide.spatial.motifRatio > tight.spatial.motifRatio);
  assert.ok(wide.spatial.cameraBiasX > tight.spatial.cameraBiasX);
  assert.ok(wide.spatial.horizonLiftPx > tight.spatial.horizonLiftPx);
});
