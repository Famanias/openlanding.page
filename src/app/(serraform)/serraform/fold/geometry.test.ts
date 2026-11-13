import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  deriveFold,
  deriveFoldChain,
  formatMeters,
  normalizeOpening,
  segmentsIntersect,
} from './geometry';

test('normalizeOpening clamps and handles nonfinite numbers', () => {
  assert.equal(normalizeOpening(-10), 0);
  assert.equal(normalizeOpening(140), 100);
  assert.equal(normalizeOpening(Number.NaN), 50);
  assert.equal(normalizeOpening(Number.POSITIVE_INFINITY), 50);
  assert.equal(normalizeOpening(35), 35);
});

test('reference poses match exact numerical values within 1e-6', () => {
  const p0 = deriveFold(0);
  assert.ok(Math.abs((p0.metrics.angleRadians * 180) / Math.PI - 76) < 1e-6);
  assert.ok(Math.abs(p0.metrics.centerlineSpan - 0.6967350593) < 1e-6);
  assert.ok(Math.abs(p0.metrics.outerSpan - 0.708378608) < 1e-6);
  assert.ok(Math.abs(p0.metrics.outerDepth - 0.224256017) < 1e-6);

  const p50 = deriveFold(50);
  assert.ok(Math.abs((p50.metrics.angleRadians * 180) / Math.PI - 53.38113282) < 1e-6);
  assert.ok(Math.abs(p50.metrics.centerlineSpan - 1.7178889131) < 1e-6);
  assert.ok(Math.abs(p50.metrics.outerSpan - 1.727520366) < 1e-6);
  assert.ok(Math.abs(p50.metrics.outerDepth - 0.164589513) < 1e-6);
  assert.equal(formatMeters(p50.metrics.outerSpan), '1.73 m');

  const p100 = deriveFold(100);
  assert.ok(Math.abs((p100.metrics.angleRadians * 180) / Math.PI - 18) < 1e-6);
  assert.ok(Math.abs(p100.metrics.centerlineSpan - 2.7390427669) < 1e-6);
  assert.ok(Math.abs(p100.metrics.outerSpan - 2.742750971) < 1e-6);
  assert.ok(Math.abs(p100.metrics.outerDepth - 0.068240606) < 1e-6);
});

test('topology invariants: 17 hinges, 0.18 m pitch, 2.88 m developed length, increasing X, simple polygon across 0..100', () => {
  for (let opening = 0; opening <= 100; opening += 1) {
    const pose = deriveFold(opening);
    assert.equal(pose.hinges.length, 17);
    assert.equal(pose.front.length, 17);
    assert.equal(pose.back.length, 17);

    let totalLen = 0;
    for (let j = 0; j < 16; j += 1) {
      const dx = pose.hinges[j + 1].x - pose.hinges[j].x;
      const dz = pose.hinges[j + 1].z - pose.hinges[j].z;
      const segLen = Math.hypot(dx, dz);
      assert.ok(Math.abs(segLen - 0.18) < 1e-9, `segment ${j} length mismatch at ${opening}`);
      assert.ok(dx > 0, `X must strictly increase at ${opening}`);
      totalLen += segLen;
    }
    assert.ok(Math.abs(totalLen - 2.88) < 1e-9);

    // Closed boundary polygon: front[0..16], back[16..0]
    const polygon = [...pose.front, ...[...pose.back].reverse()];
    for (const pt of polygon) {
      assert.ok(Number.isFinite(pt.x) && Number.isFinite(pt.z));
    }

    // Check nonadjacent edges do not intersect
    const m = polygon.length;
    for (let i = 0; i < m; i += 1) {
      const a1 = polygon[i];
      const a2 = polygon[(i + 1) % m];
      for (let k = i + 2; k < m; k += 1) {
        if (i === 0 && k === m - 1) continue;
        const b1 = polygon[k];
        const b2 = polygon[(k + 1) % m];
        assert.equal(
          segmentsIntersect(a1, a2, b1, b2),
          false,
          `polygon self-intersection at opening=${opening} edges (${i},${k})`,
        );
      }
    }
  }
});

test('deriveFoldChain matches uniform deriveFold when openings are uniform and remains simple during wave propagation', () => {
  for (const uniformOpening of [0, 35, 50, 100]) {
    const uniform = deriveFold(uniformOpening);
    const chain = deriveFoldChain(new Array(16).fill(uniformOpening));
    assert.ok(Math.abs(chain.metrics.outerSpan - uniform.metrics.outerSpan) < 1e-9);
    assert.ok(Math.abs(chain.metrics.outerDepth - uniform.metrics.outerDepth) < 1e-9);
    for (let j = 0; j <= 16; j += 1) {
      assert.ok(Math.abs(chain.hinges[j].x - uniform.hinges[j].x) < 1e-9);
      assert.ok(Math.abs(chain.hinges[j].z - uniform.hinges[j].z) < 1e-9);
      assert.ok(Math.abs(chain.front[j].x - uniform.front[j].x) < 1e-9);
      assert.ok(Math.abs(chain.front[j].z - uniform.front[j].z) < 1e-9);
    }
  }

  // Steep asymmetric progressive wave: panel 0 wide open, panel 15 compactly gathered
  const asymmetricWave = Array.from({ length: 16 }, (_, i) => Math.max(0, 92 - i * 6));
  const pose = deriveFoldChain(asymmetricWave);
  for (let j = 0; j < 16; j += 1) {
    const dx = pose.hinges[j + 1].x - pose.hinges[j].x;
    const dz = pose.hinges[j + 1].z - pose.hinges[j].z;
    assert.ok(Math.abs(Math.hypot(dx, dz) - 0.18) < 1e-9);
    assert.ok(dx > 0);
    // Alternating Z sign across consecutive panels
    const expectedSign = j % 2 === 0 ? 1 : -1;
    assert.ok(dz * expectedSign > 0);
  }
  const polygon = [...pose.front, ...[...pose.back].reverse()];
  const m = polygon.length;
  for (let i = 0; i < m; i += 1) {
    for (let k = i + 2; k < m; k += 1) {
      if (i === 0 && k === m - 1) continue;
      assert.equal(
        segmentsIntersect(polygon[i], polygon[(i + 1) % m], polygon[k], polygon[(k + 1) % m]),
        false,
        `wave polygon self-intersection at edges (${i}, ${k})`,
      );
    }
  }
});

