import { test } from 'vitest';
import assert from 'node:assert/strict';
import { boundedProgress, clamp, damp, smoothstep } from './math';

test('clamp handles bounds and nonfinite inputs', () => {
  assert.equal(clamp(-5, 0, 100), 0);
  assert.equal(clamp(150, 0, 100), 100);
  assert.equal(clamp(42, 0, 100), 42);
  assert.equal(clamp(Number.NaN, 0, 100), 0);
  assert.equal(clamp(Number.POSITIVE_INFINITY, 0, 100), 0);
});

test('smoothstep returns smooth monotonic interpolation across [edge0, edge1]', () => {
  assert.equal(smoothstep(0.12, 0.62, 0), 0);
  assert.equal(smoothstep(0.12, 0.62, 0.12), 0);
  assert.equal(smoothstep(0.12, 0.62, 0.37), 0.5);
  assert.equal(smoothstep(0.12, 0.62, 0.62), 1);
  assert.equal(smoothstep(0.12, 0.62, 0.9), 1);
  assert.equal(smoothstep(0.5, 0.5, 0.5), 1);
  assert.equal(smoothstep(0.5, 0.5, 0.4), 0);
});

test('boundedProgress returns 0 for nonpositive ranges or nonfinite inputs', () => {
  assert.equal(boundedProgress(100, 200, 200), 0);
  assert.equal(boundedProgress(100, 300, 200), 0);
  assert.equal(boundedProgress(Number.NaN, 0, 100), 0);
  assert.equal(boundedProgress(50, 0, 100), 0.5);
  assert.equal(boundedProgress(-20, 0, 100), 0);
  assert.equal(boundedProgress(180, 0, 100), 1);
});

test('damp converges exponentially toward target', () => {
  const next = damp(0, 10, 8, 0.1);
  assert.ok(next > 0 && next < 10);
  assert.equal(damp(5, 10, 8, 0), 5);
  assert.equal(damp(Number.NaN, 10, 8, 0.1), 10);
});
