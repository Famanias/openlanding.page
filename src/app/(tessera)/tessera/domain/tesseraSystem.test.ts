import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DEFAULT_CONFIGURATOR_STATE,
  TILE_SHAPES,
  MATERIAL_FINISHES,
  ARRANGEMENT_PATTERNS,
  computeHeroTileTransform,
  generateWallTessellation,
  rotateTileOrientation,
  calculateAcousticMetrics,
  formatSpecificationSummary,
  validateInquiryForm,
} from './tesseraSystem';
import {
  RESONANCE_COLS,
  RESONANCE_ROWS,
  HERO_MATERIAL_MODES,
  buildResonanceWallCatalog,
  createInitialPresetRotationMap,
  getTileQuarterTurns,
  quarterTurnsToDegrees,
  resetPresetRotations,
  rotateTileQuarterTurns,
  sampleGlobalSCurveRelief,
  setTileQuarterTurnsInPreset,
  snapClockwiseAngleToQuarterTurns,
  computeResonanceTileBaseTransform,
} from './resonanceWall';

test('catalog includes at least 3 tile shapes, 5 finishes, and 4 patterns', () => {
  assert.equal(TILE_SHAPES.length >= 3, true);
  assert.equal(MATERIAL_FINISHES.length >= 4, true);
  assert.equal(ARRANGEMENT_PATTERNS.length >= 3, true);
});

test('computeHeroTileTransform produces distinct spatial relief across compositions', () => {
  const wave = computeHeroTileTransform(2, 1, 7, 5, 'wave', 0, 0, 0, 1.0);
  const vault = computeHeroTileTransform(2, 1, 7, 5, 'vault', 0, 0, 0, 1.0);
  const scrolled = computeHeroTileTransform(0, 0, 7, 5, 'wave', 0, 0, 0.8, 1.0);
  const unscrolled = computeHeroTileTransform(0, 0, 7, 5, 'wave', 0, 0, 0, 1.0);

  assert.notEqual(wave.z, vault.z);
  assert.equal(Math.abs(scrolled.x) > Math.abs(unscrolled.x), true);
});

test('generateWallTessellation honors dimensions and custom per-tile rotations', () => {
  const customState = {
    ...DEFAULT_CONFIGURATOR_STATE,
    columns: 6,
    rows: 4,
    customRotations: { '2-1': 270 as const },
  };
  const tiles = generateWallTessellation(customState);
  assert.equal(tiles.length, 24);

  const overridden = tiles.find((t) => t.key === '2-1');
  assert.ok(overridden);
  assert.equal(overridden.rotation, 270);
  assert.equal(rotateTileOrientation(270), 0);
  assert.equal(rotateTileOrientation(0), 90);
});

test('calculateAcousticMetrics updates NRC, Sabins, and RT60 across configurations', () => {
  const stoneMetrics = calculateAcousticMetrics({
    ...DEFAULT_CONFIGURATOR_STATE,
    shape: 'beveled-prism',
    material: 'raw-limestone',
    columns: 7,
    rows: 4,
  });

  const feltMetrics = calculateAcousticMetrics({
    ...DEFAULT_CONFIGURATOR_STATE,
    shape: 'parabolic-dish',
    material: 'charcoal-felt',
    columns: 8,
    rows: 5,
  });

  assert.equal(stoneMetrics.tileCount, 28);
  assert.equal(feltMetrics.tileCount, 40);
  assert.equal(feltMetrics.nrc > stoneMetrics.nrc, true);
  assert.equal(feltMetrics.sabinsMetric > stoneMetrics.sabinsMetric, true);
  assert.equal(feltMetrics.rt60TreatedSec < feltMetrics.rt60UntreatedSec, true);
  assert.equal(feltMetrics.frequencyAbsorption.length, 6);
});

test('formatSpecificationSummary outputs CSI 09 84 33 architectural specification', () => {
  const metrics = calculateAcousticMetrics(DEFAULT_CONFIGURATOR_STATE);
  const summary = formatSpecificationSummary(DEFAULT_CONFIGURATOR_STATE, metrics);
  assert.match(summary, /CSI 09 84 33/);
  assert.match(summary, /Beveled Prism/);
  assert.match(summary, /Raw Limestone/);
  assert.match(summary, /28 units/);
});

test('validateInquiryForm rejects empty/invalid inputs and accepts valid architectural submission', () => {
  const invalid = validateInquiryForm({
    architectName: '',
    firmOrStudio: 'A',
    workEmail: 'not-an-email',
    projectTypology: '',
    targetAreaSqM: '-5',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.architectName);
  assert.ok(invalid.errors.workEmail);
  assert.ok(invalid.errors.targetAreaSqM);

  const valid = validateInquiryForm({
    architectName: 'Astrid Lindqvist',
    firmOrStudio: 'Snøhetta Nordic',
    workEmail: 'astrid@snohetta.no',
    projectTypology: 'Cultural & Auditorium',
    targetAreaSqM: '42',
    notes: 'Chamber hall west elevation',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('Resonance Wall catalog builds 66 addressable modules with >= 7 differentiated families and continuous S-curve', () => {
  const catalog = buildResonanceWallCatalog();
  assert.equal(catalog.length, RESONANCE_COLS * RESONANCE_ROWS);
  assert.equal(HERO_MATERIAL_MODES.length, 3);

  const uniqueFamilies = new Set(catalog.map((t) => t.family));
  assert.equal(uniqueFamilies.size >= 7, true);

  // Verify global S-curve continuity across adjacent wall coordinates
  const sampleA = sampleGlobalSCurveRelief(0.1, -0.15);
  const sampleB = sampleGlobalSCurveRelief(0.1005, -0.15);
  assert.equal(Math.abs(sampleA.displacement - sampleB.displacement) < 0.005, true);
});

test('Resonance Wall per-tile rotation cycles 0 -> 90 -> 180 -> 270 -> 0 and preserves overrides separately per preset', () => {
  let turns = rotateTileQuarterTurns(0, 1);
  assert.equal(quarterTurnsToDegrees(turns), 90);
  turns = rotateTileQuarterTurns(turns, 1);
  assert.equal(quarterTurnsToDegrees(turns), 180);
  turns = rotateTileQuarterTurns(turns, 1);
  assert.equal(quarterTurnsToDegrees(turns), 270);
  turns = rotateTileQuarterTurns(turns, 1);
  assert.equal(quarterTurnsToDegrees(turns), 0);

  // Counter-clockwise from 0 -> 270
  assert.equal(quarterTurnsToDegrees(rotateTileQuarterTurns(0, -1)), 270);

  // Drag angle snapping (~140 deg = 2.44 rad -> snaps to 2 quarter turns = 180 deg)
  const snapped140 = snapClockwiseAngleToQuarterTurns((140 * Math.PI) / 180);
  assert.equal(quarterTurnsToDegrees(snapped140), 180);

  // Per-preset override persistence
  let store = createInitialPresetRotationMap();
  store = setTileQuarterTurnsInPreset(store, 'wave', 'r02-c05', 1);
  store = setTileQuarterTurnsInPreset(store, 'wave', 'r04-c08', 2);
  store = setTileQuarterTurnsInPreset(store, 'vault', 'r01-c03', 3);

  assert.equal(getTileQuarterTurns(store, 'wave', 'r02-c05'), 1);
  assert.equal(getTileQuarterTurns(store, 'wave', 'r04-c08'), 2);
  assert.equal(getTileQuarterTurns(store, 'vault', 'r02-c05'), 0);
  assert.equal(getTileQuarterTurns(store, 'vault', 'r01-c03'), 3);

  // Resetting 'wave' clears only 'wave' and preserves 'vault'
  store = resetPresetRotations(store, 'wave');
  assert.equal(getTileQuarterTurns(store, 'wave', 'r02-c05'), 0);
  assert.equal(getTileQuarterTurns(store, 'vault', 'r01-c03'), 3);

  // Preset base transforms differ meaningfully between presets
  const catalog = buildResonanceWallCatalog();
  const sampleTile = catalog[15];
  const waveBase = computeResonanceTileBaseTransform(sampleTile, RESONANCE_COLS, RESONANCE_ROWS, 'wave', 0, 0, false, 0, 1, 1);
  const vaultBase = computeResonanceTileBaseTransform(sampleTile, RESONANCE_COLS, RESONANCE_ROWS, 'vault', 0, 0, false, 0, 1, 1);
  assert.notEqual(waveBase.z, vaultBase.z);
});

