import { test } from 'vitest';
import assert from 'node:assert/strict';
import { deriveFoldChain, segmentsIntersect } from './geometry';
import {
  computeDemoFoldChoreography,
  computeEntranceChoreography,
  DEMO_FOLD_DURATION_SEC,
  ENTRANCE_DURATION_SEC,
} from './unfold';

test('entrance choreography starts gathered, propagates progressive accordion wave, and settles to targetOpening', () => {
  const start = computeEntranceChoreography(0, 50, false);
  assert.equal(start.done, false);
  assert.equal(start.panelOpenings.length, 16);
  assert.ok(start.averageOpening <= 5);

  // Mid-unfold (~1.0s): leading panel 0 is substantially further open than trailing panel 15
  const mid = computeEntranceChoreography(1.0, 50, false);
  assert.equal(mid.done, false);
  assert.ok(mid.panelOpenings[0] > mid.panelOpenings[7]);
  assert.ok(mid.panelOpenings[7] > mid.panelOpenings[15]);

  // Verify no self-intersection across sampled entrance timestamps
  for (let t = 0; t <= ENTRANCE_DURATION_SEC; t += 0.1) {
    const frame = computeEntranceChoreography(t, 50, false);
    const pose = deriveFoldChain(frame.panelOpenings);
    const poly = [...pose.front, ...[...pose.back].reverse()];
    for (let i = 0; i < poly.length; i += 1) {
      for (let k = i + 2; k < poly.length; k += 1) {
        if (i === 0 && k === poly.length - 1) continue;
        assert.equal(
          segmentsIntersect(poly[i], poly[(i + 1) % poly.length], poly[k], poly[(k + 1) % poly.length]),
          false,
          `entrance self-intersection at t=${t.toFixed(2)}`,
        );
      }
    }
  }

  // Settled end
  const end = computeEntranceChoreography(ENTRANCE_DURATION_SEC, 50, false);
  assert.equal(end.done, true);
  assert.equal(end.averageOpening, 50);
  for (const p of end.panelOpenings) assert.equal(p, 50);
});

test('reducedMotion resolves entrance and demo choreography immediately to settled pose', () => {
  const entrance = computeEntranceChoreography(0.2, 65, true);
  assert.equal(entrance.done, true);
  assert.equal(entrance.averageOpening, 65);

  const demo = computeDemoFoldChoreography(0.4, 72, true);
  assert.equal(demo.done, true);
  assert.equal(demo.averageOpening, 72);
});

test('demo choreography gathers, unfolds wide, and returns cleanly to anchorOpening without self-intersection', () => {
  const gather = computeDemoFoldChoreography(0.75, 42, false);
  assert.ok(gather.averageOpening <= 6, 'should pause gathered around 4%');

  const wide = computeDemoFoldChoreography(2.1, 42, false);
  assert.ok(wide.averageOpening >= 75, 'should open wide during showcase');

  const settled = computeDemoFoldChoreography(DEMO_FOLD_DURATION_SEC + 0.1, 42, false);
  assert.equal(settled.done, true);
  assert.equal(settled.averageOpening, 42);

  for (let t = 0; t <= DEMO_FOLD_DURATION_SEC; t += 0.12) {
    const frame = computeDemoFoldChoreography(t, 42, false);
    const pose = deriveFoldChain(frame.panelOpenings);
    for (let j = 0; j < 16; j += 1) {
      const len = Math.hypot(
        pose.hinges[j + 1].x - pose.hinges[j].x,
        pose.hinges[j + 1].z - pose.hinges[j].z,
      );
      assert.ok(Math.abs(len - 0.18) < 1e-9);
    }
  }
});
