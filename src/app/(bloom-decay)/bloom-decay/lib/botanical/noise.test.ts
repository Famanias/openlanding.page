import { test } from 'vitest';
import assert from 'node:assert/strict';
import { fbm2D, generateDiffusionField, mulberry32, valueNoise2D } from './noise';

test('seeded PRNG produces deterministic bounded sequence in [0, 1)', () => {
  const a = mulberry32(4242);
  const b = mulberry32(4242);
  for (let i = 0; i < 20; i++) {
    const va = a();
    const vb = b();
    assert.equal(va, vb);
    assert.ok(va >= 0 && va < 1);
  }
});

test('coherent 2D noise and FBM remain deterministic and bounded in [0, 1]', () => {
  const n1 = valueNoise2D(3.25, 7.8, 101);
  const n2 = valueNoise2D(3.25, 7.8, 101);
  assert.equal(n1, n2);
  assert.ok(n1 >= 0 && n1 <= 1);

  const f1 = fbm2D(1.4, 2.9, 77, 4);
  const f2 = fbm2D(1.4, 2.9, 77, 4);
  assert.equal(f1, f2);
  assert.ok(f1 >= 0 && f1 <= 1);
});

test('procedural ink diffusion field is repeatable and expands from center outward', () => {
  const fieldA = generateDiffusionField(32, 703, 5);
  const fieldB = generateDiffusionField(32, 703, 5);

  assert.equal(fieldA.arrival.length, 32 * 32);
  assert.deepEqual(fieldA.arrival, fieldB.arrival);

  // Center pixel should saturate much earlier (lower arrival threshold) than outer corner
  const centerIdx = 16 * 32 + 16;
  const cornerIdx = 0;
  assert.ok(
    fieldA.arrival[centerIdx] < fieldA.arrival[cornerIdx],
    `Expected center (${fieldA.arrival[centerIdx]}) < corner (${fieldA.arrival[cornerIdx]})`
  );

  // Every border pixel must exceed maximum ink expansion threshold (~1.03) so stains never clip into squares
  for (let i = 0; i < 32; i++) {
    assert.ok(fieldA.arrival[i] > 1.15, `Top border pixel ${i} clipped: ${fieldA.arrival[i]}`);
    assert.ok(fieldA.arrival[31 * 32 + i] > 1.15, `Bottom border pixel ${i} clipped`);
    assert.ok(fieldA.arrival[i * 32] > 1.15, `Left border pixel ${i} clipped`);
    assert.ok(fieldA.arrival[i * 32 + 31] > 1.15, `Right border pixel ${i} clipped`);
  }
});
