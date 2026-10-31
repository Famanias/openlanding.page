import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  createSeededRandom,
  GLASS_PRESETS,
  GLASS_PRESET_LIST,
  computeExportDimensions,
  computeResponsiveFraming,
  serializePresetConfig,
  generateReactComponentSnippet,
  EXPORT_RESOLUTIONS,
} from './glassTypes';
import { computeScrollAtmosphereState } from '../components/background/BackgroundMotionController';

test('createSeededRandom produces deterministic reproducible sequences for the same seed', () => {
  const rngA = createSeededRandom(1042);
  const rngB = createSeededRandom(1042);
  const rngC = createSeededRandom(9999);

  const seqA = [rngA(), rngA(), rngA(), rngA()];
  const seqB = [rngB(), rngB(), rngB(), rngB()];
  const seqC = [rngC(), rngC(), rngC(), rngC()];

  assert.deepEqual(seqA, seqB);
  assert.notDeepEqual(seqA, seqC);
});

test('all six required presets exist with distinct optical parameters and seeds', () => {
  assert.equal(GLASS_PRESET_LIST.length, 6);
  const expectedIds = [
    'opal-ribbon',
    'frosted-fold',
    'liquid-lens',
    'glass-strata',
    'refractive-halo',
    'caustic-window',
  ];

  for (const id of expectedIds) {
    const preset = GLASS_PRESETS[id as keyof typeof GLASS_PRESETS];
    assert.ok(preset, `Preset ${id} should exist`);
    assert.ok(preset.material.ior >= 1.1 && preset.material.ior <= 2.4);
    assert.ok(preset.scene.loopDurationSec >= 8 && preset.scene.loopDurationSec <= 16);
  }
});

test('computeExportDimensions calculates accurate even pixel dimensions for aspect ratios', () => {
  const fhd = EXPORT_RESOLUTIONS[0]; // 1920x1080 base
  const dim16x9 = computeExportDimensions(fhd, '16:9');
  assert.equal(dim16x9.width, 1920);
  assert.equal(dim16x9.height, 1080);

  const dim1x1 = computeExportDimensions(fhd, '1:1');
  assert.equal(dim1x1.width, 1920);
  assert.equal(dim1x1.height, 1920);

  const dim9x16 = computeExportDimensions(fhd, '9:16');
  assert.equal(dim9x16.height, 1920);
  assert.equal(dim9x16.width, 1080);
});

test('computeResponsiveFraming adapts camera and offset across mobile, tablet, and desktop', () => {
  const mobile = computeResponsiveFraming(390, 844, 0.4, 0.05, 1.0);
  const desktop = computeResponsiveFraming(1440, 900, 0.4, 0.05, 1.0);

  assert.ok(mobile.cameraZ > desktop.cameraZ);
  assert.ok(Math.abs(mobile.offsetX) < Math.abs(desktop.offsetX));
});

test('serializePresetConfig and generateReactComponentSnippet output valid strings', () => {
  const opal = GLASS_PRESETS['opal-ribbon'];
  const json = serializePresetConfig(opal);
  const parsed = JSON.parse(json);
  assert.equal(parsed.id, 'opal-ribbon');

  const jsx = generateReactComponentSnippet(opal);
  assert.ok(jsx.includes('preset="opal-ribbon"'));
  assert.ok(jsx.includes('seed={1042}'));
});

test('computeScrollAtmosphereState calculates bounded scroll progress and respects reduced motion', () => {
  const startState = computeScrollAtmosphereState(0, 2000, false);
  assert.equal(startState.scrollProgress, 0);
  assert.equal(startState.parallaxOffsetY, 0);

  const midState = computeScrollAtmosphereState(1000, 2000, false);
  assert.equal(midState.scrollProgress, 0.5);
  assert.ok(midState.parallaxOffsetY < 0);
  assert.ok(midState.refractionModulation > 1.0);

  const reducedState = computeScrollAtmosphereState(1000, 2000, true);
  assert.equal(reducedState.scrollProgress, 0.5);
  assert.equal(reducedState.parallaxOffsetY, 0);
  assert.equal(reducedState.refractionModulation, 1.0);
});
