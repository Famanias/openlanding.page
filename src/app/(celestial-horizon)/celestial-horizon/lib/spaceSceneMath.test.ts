import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  BASE_CAMERA_POSITION,
  BASE_CAMERA_TARGET,
  DEFAULT_BLOOM_CONFIG,
  HERO_SAFE_ZONE_NDC,
  computeCameraRigTarget,
  computeLayerParallaxOffset,
  createSeededRandom,
  dampValue,
  generateAsteroidFieldData,
  generateDustFieldData,
  generateStarFieldData,
  isPointInsideSafeZone,
  resolveBloomConfig,
  safeZoneClearanceFactor,
} from './spaceSceneMath';

test('createSeededRandom is deterministic for the same seed', () => {
  const a = createSeededRandom(42);
  const b = createSeededRandom(42);
  for (let i = 0; i < 20; i++) {
    assert.equal(a(), b());
  }
});

test('safeZoneClearanceFactor attenuates center of text-safe area and restores outside', () => {
  const inside = safeZoneClearanceFactor(-0.45, 0.05);
  const outsideRight = safeZoneClearanceFactor(0.75, -0.1);
  assert.ok(inside < 0.4, `Expected inside clearance < 0.4, got ${inside}`);
  assert.equal(outsideRight, 1.0);
  assert.equal(isPointInsideSafeZone(-0.5, 0.1, HERO_SAFE_ZONE_NDC), true);
  assert.equal(isPointInsideSafeZone(0.65, -0.2, HERO_SAFE_ZONE_NDC), false);
});

test('generateStarFieldData produces deterministic depth-layered stars', () => {
  const s1 = generateStarFieldData(120, 999);
  const s2 = generateStarFieldData(120, 999);
  assert.equal(s1.count, 120);
  assert.deepEqual(Array.from(s1.positions), Array.from(s2.positions));

  for (let i = 0; i < s1.count; i++) {
    const z = s1.positions[i * 3 + 2];
    assert.ok(z <= -18 && z >= -36, `Star z out of background range: ${z}`);
    assert.ok(s1.sizes[i] > 0);
  }
});

test('generateDustFieldData populates foreground/midground depth range', () => {
  const dust = generateDustFieldData(60, 12345);
  assert.equal(dust.count, 60);
  for (let i = 0; i < dust.count; i++) {
    const z = dust.positions[i * 3 + 2];
    assert.ok(z >= -4.5 && z <= 5.0, `Dust z out of expected range: ${z}`);
    assert.ok(dust.speeds[i] > 0);
  }
});

test('generateAsteroidFieldData keeps foreground silhouettes strictly out of left text-safe zone', () => {
  const asteroids = generateAsteroidFieldData(51923);
  const foreground = asteroids.filter((a) => a.layer === 'foreground');
  const midground = asteroids.filter((a) => a.layer === 'midground');
  assert.equal(foreground.length, 3);
  assert.ok(midground.length >= 15);

  for (const fg of foreground) {
    assert.ok(
      fg.position.x > 3.5,
      `Foreground asteroid x=${fg.position.x} should stay on right framing edge`,
    );
  }
});

test('computeCameraRigTarget returns neutral hero pose when idle and resets cleanly', () => {
  const neutral = computeCameraRigTarget({
    aspect: 16 / 9,
    pointerX: 0.8,
    pointerY: -0.6,
    dragOffsetX: 0,
    dragOffsetY: 0,
    zoomOffset: 0,
    elapsedTime: 12,
    motionEnabled: false,
    parallaxEnabled: false,
  });

  assert.equal(neutral.position.x, BASE_CAMERA_POSITION.x);
  assert.equal(neutral.position.y, BASE_CAMERA_POSITION.y);
  assert.equal(neutral.position.z, BASE_CAMERA_POSITION.z);
  assert.equal(neutral.lookAt.x, BASE_CAMERA_TARGET.x);
  assert.equal(neutral.lookAt.y, BASE_CAMERA_TARGET.y);
  assert.equal(neutral.lookAt.z, BASE_CAMERA_TARGET.z);
});

test('computeCameraRigTarget responds smoothly to parallax and narrow mobile aspect ratio', () => {
  const desktop = computeCameraRigTarget({
    aspect: 1440 / 900,
    pointerX: 1,
    pointerY: 0.5,
    dragOffsetX: 0,
    dragOffsetY: 0,
    zoomOffset: 0,
    elapsedTime: 0,
    motionEnabled: false,
    parallaxEnabled: true,
  });
  assert.ok(desktop.position.x > BASE_CAMERA_POSITION.x);
  assert.ok(desktop.position.y > BASE_CAMERA_POSITION.y);

  const mobile = computeCameraRigTarget({
    aspect: 390 / 844,
    pointerX: 0,
    pointerY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    zoomOffset: 0,
    elapsedTime: 0,
    motionEnabled: false,
    parallaxEnabled: false,
  });
  assert.ok(
    mobile.position.z > BASE_CAMERA_POSITION.z + 2.5,
    'Mobile camera should pull back for clean planet framing',
  );
});

test('computeLayerParallaxOffset returns zero when parallax is disabled and scales with depth', () => {
  assert.deepEqual(computeLayerParallaxOffset(1.0, 0.8, -0.5, false), {
    x: 0,
    y: 0,
  });
  const near = computeLayerParallaxOffset(1.0, 1.0, 0, true);
  const far = computeLayerParallaxOffset(0.25, 1.0, 0, true);
  assert.ok(near.x > far.x && far.x > 0);
});

test('dampValue converges monotonically toward target without overshoot', () => {
  let current = 0;
  for (let i = 0; i < 40; i++) {
    const next = dampValue(current, 10, 5, 0.016);
    assert.ok(next > current && next <= 10);
    current = next;
  }
  assert.ok(current > 9.5);
});

test('resolveBloomConfig returns defaults, clamps out-of-range overrides, and halves software-GL buffers', () => {
  const defaults = resolveBloomConfig(undefined, { width: 1440, height: 900, isSoftwareGl: false });
  assert.equal(defaults.strength, DEFAULT_BLOOM_CONFIG.strength);
  assert.equal(defaults.radius, DEFAULT_BLOOM_CONFIG.radius);
  assert.equal(defaults.threshold, DEFAULT_BLOOM_CONFIG.threshold);
  assert.equal(defaults.passWidth, 1440);
  assert.equal(defaults.passHeight, 900);

  const clampedSoft = resolveBloomConfig(
    { strength: 99, radius: -5, threshold: 4 },
    { width: 1440, height: 900, isSoftwareGl: true },
  );
  assert.equal(clampedSoft.strength, 2.0);
  assert.equal(clampedSoft.radius, 0);
  assert.equal(clampedSoft.threshold, 1.5);
  assert.equal(clampedSoft.passWidth, 720);
  assert.equal(clampedSoft.passHeight, 450);
});
