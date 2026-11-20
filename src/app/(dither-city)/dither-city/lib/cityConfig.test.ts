import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  PALETTE,
  createSeededRandom,
  computeCameraFrame,
  resolveQualityTier,
  getDprCap,
} from './cityConfig';

test('deterministic PRNG produces identical sequences for identical seeds', () => {
  const r1 = createSeededRandom(204907);
  const r2 = createSeededRandom(204907);
  for (let i = 0; i < 20; i++) {
    assert.equal(r1(), r2());
  }
});

test('palette matches art direction specification', () => {
  assert.equal(PALETTE.nearBlack, '#0A0B09');
  assert.equal(PALETTE.charcoal, '#232520');
  assert.equal(PALETTE.darkGray, '#50524A');
  assert.equal(PALETTE.agedPaper, '#D3D0BA');
  assert.equal(PALETTE.boneWhite, '#EEEBD8');
  assert.equal(PALETTE.acidGreen, '#A8F23A');
});

test('camera parallax stays subtly clamped and disables on touch devices', () => {
  const center = computeCameraFrame({
    aspect: 16 / 9,
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 0,
    parallaxEnabled: true,
    isTouchDevice: false,
  });

  const extremeRight = computeCameraFrame({
    aspect: 16 / 9,
    pointerX: 5.0, // out-of-range input should be clamped
    pointerY: -5.0,
    scrollProgress: 0,
    parallaxEnabled: true,
    isTouchDevice: false,
  });

  const dx = extremeRight.position[0] - center.position[0];
  assert.ok(dx > 0 && dx <= 0.9, `expected subtle positive parallax, got ${dx}`);

  const touchFrame = computeCameraFrame({
    aspect: 16 / 9,
    pointerX: 1,
    pointerY: 1,
    scrollProgress: 0,
    parallaxEnabled: true,
    isTouchDevice: true,
  });
  assert.deepEqual(touchFrame.position, center.position);
});

test('scroll progress continuously elevates and advances the camera', () => {
  const start = computeCameraFrame({
    aspect: 16 / 9,
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 0,
    parallaxEnabled: false,
    isTouchDevice: false,
  });
  const end = computeCameraFrame({
    aspect: 16 / 9,
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 1,
    parallaxEnabled: false,
    isTouchDevice: false,
  });

  assert.ok(end.position[1] > start.position[1], 'camera should rise with scroll');
  assert.ok(end.position[2] < start.position[2], 'camera should glide forward with scroll');
});

test('mobile portrait aspect reframes camera and adjusts planet transform', () => {
  const desktop = computeCameraFrame({
    aspect: 1440 / 900,
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 0,
    parallaxEnabled: false,
    isTouchDevice: false,
  });
  const mobile = computeCameraFrame({
    aspect: 390 / 844,
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 0,
    parallaxEnabled: false,
    isTouchDevice: true,
  });

  assert.ok(mobile.fov > desktop.fov, 'narrow viewport widens FOV to keep skyline dramatic');
  assert.ok(mobile.planetScale < desktop.planetScale, 'narrow viewport scales planet cleanly');
  assert.ok(mobile.planetOffset[0] > 0, 'narrow viewport shifts planet into visible frame');
});

test('quality tier and DPR cap respect software WebGL and viewport width', () => {
  assert.equal(resolveQualityTier('auto', 1440, false), 'high');
  assert.equal(resolveQualityTier('auto', 390, false), 'low');
  assert.equal(resolveQualityTier('auto', 1440, true), 'medium');
  assert.equal(getDprCap('high', true), 1);
  assert.equal(getDprCap('high', false), 2);
});
