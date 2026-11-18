import { test } from 'vitest';
import assert from 'node:assert/strict';
import { MONOLITH, coronaAnchor, ditherLevel, frameOffsetX } from './monolithMath';

const close = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

test('frameOffsetX centres at fraction 0.5 and reaches the frame edge at 0 and 1', () => {
  close(frameOffsetX(16 / 9, 32, 10, 0.5), 0);
  const halfW = Math.tan((32 * Math.PI) / 360) * 10 * (16 / 9);
  close(frameOffsetX(16 / 9, 32, 10, 1), halfW);
  close(frameOffsetX(16 / 9, 32, 10, 0), -halfW);
  // a wider frame pushes the same fraction further out in world units
  assert.ok(frameOffsetX(2.4, 32, 10, 0.7) > frameOffsetX(1.4, 32, 10, 0.7));
});

test('coronaAnchor extends the camera ray through the target onto the back plane', () => {
  const a = coronaAnchor({ x: 0, y: -1.4, z: 9 }, { x: 0, y: 0.6, z: 0 }, -6);
  // 15 units from the camera to the plane versus 9 to the target: 15/9 along the same ray
  close(a.scale, 15 / 9);
  close(a.y, -1.4 + 2 * (15 / 9));
  close(a.x, 0);
  const offset = coronaAnchor({ x: 1, y: 0, z: 9 }, { x: 2, y: 0, z: 0 }, -6);
  close(offset.x, 1 + 15 / 9);
});

test('coronaAnchor rejects a plane in front of the target', () => {
  assert.throws(() => coronaAnchor({ x: 0, y: 0, z: 9 }, { x: 0, y: 0, z: 0 }, 2));
});

test('ditherLevel quantises luminance with an ordered threshold', () => {
  assert.equal(ditherLevel(0, 0.5, 4), 0);
  assert.equal(ditherLevel(1, 0.5, 4), 3);
  // halfway between level 1 and 2: the threshold decides
  const mid = 1.5 / 3;
  assert.equal(ditherLevel(mid, 0.4, 4), 2);
  assert.equal(ditherLevel(mid, 0.6, 4), 1);
  assert.equal(ditherLevel(-1, 0.5, 4), 0);
  assert.equal(ditherLevel(2, 0.5, 4), 3);
});

test('the monolith keeps the reference proportions', () => {
  close(MONOLITH.height / MONOLITH.width, 4.6, 0.01);
  assert.ok(MONOLITH.depth > MONOLITH.width);
});
