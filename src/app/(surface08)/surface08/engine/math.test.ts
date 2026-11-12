import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  dampFactor,
  dampValue,
  stepSpring,
  normalizePointerToUv,
  computeClampedVelocity,
  resolveQualitySettings,
  selectTransitionFamily,
} from './math';

test('dampFactor and dampValue are frame-rate independent and bounded', () => {
  const fZero = dampFactor(10, 0);
  assert.equal(fZero, 0);

  const fNormal = dampFactor(10, 0.016);
  assert.ok(fNormal > 0 && fNormal < 1);

  const v = dampValue(0, 100, 12, 0.016);
  assert.ok(v > 0 && v < 100);
});

test('stepSpring converges toward target with physical velocity', () => {
  let state = { value: 0, velocity: 0 };
  for (let i = 0; i < 120; i++) {
    state = stepSpring(state, 1.0, 140, 14, 1 / 60);
  }
  assert.ok(Math.abs(state.value - 1.0) < 0.05, `Expected value near 1.0, got ${state.value}`);
});

test('normalizePointerToUv maps canvas bounding rect with inverted WebGL Y', () => {
  const rect = { left: 100, top: 50, width: 800, height: 400 };
  const center = normalizePointerToUv(500, 250, rect);
  assert.ok(Math.abs(center.u - 0.5) < 1e-6);
  assert.ok(Math.abs(center.v - 0.5) < 1e-6);

  const topLeft = normalizePointerToUv(100, 50, rect);
  assert.equal(topLeft.u, 0);
  assert.equal(topLeft.v, 1);

  const outOfBounds = normalizePointerToUv(-50, 9999, rect);
  assert.equal(outOfBounds.u, 0);
  assert.equal(outOfBounds.v, 0);
});

test('computeClampedVelocity caps extreme pointer jumps', () => {
  const vel = computeClampedVelocity(0.1, 0.1, 0.9, 0.9, 0.005, 5.0);
  const mag = Math.hypot(vel.vx, vel.vy);
  assert.ok(mag <= 5.0001, `Expected velocity magnitude <= 5.0, got ${mag}`);
});

test('resolveQualitySettings respects software GL and auto FPS thresholds', () => {
  const sw = resolveQualitySettings('high', 60, 2.0, true);
  assert.equal(sw.effectiveTier, 'low');
  assert.equal(sw.dpr, 1.0);

  const autoHigh = resolveQualitySettings('auto', 59, 2.0, false);
  assert.equal(autoHigh.effectiveTier, 'high');
  assert.equal(autoHigh.dpr, 1.75);

  const autoLow = resolveQualitySettings('auto', 25, 2.0, false);
  assert.equal(autoLow.effectiveTier, 'low');
  assert.equal(autoLow.dpr, 1.0);
});

test('selectTransitionFamily maps effect pairs to distinct optical transitions', () => {
  const tFluid = selectTransitionFamily('glass-lens', 'fluted-light');
  assert.equal(tFluid.id, 0);

  const tSilk = selectTransitionFamily('chroma-fluid', 'silk-atmosphere');
  assert.equal(tSilk.id, 1);

  const tLens = selectTransitionFamily('silk-atmosphere', 'glass-lens');
  assert.equal(tLens.id, 2);

  const tFacet = selectTransitionFamily('aurora-field', 'refraction-field');
  assert.equal(tFacet.id, 3);
});
