import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_TARGET,
  computeCameraRigTarget,
  computeLayerParallaxOffset,
  dampValue,
  evaluateRidgeHeight,
  generateRidgeProfile,
  stepPetalParticle,
  type PetalParticle,
  type RidgeProfileConfig,
} from './scenic-math';
import { createSeededRandom, isSoftwareWebGLRendererString } from './webgl-utils';

test('generateRidgeProfile produces deterministic bounded points spanning width', () => {
  const config: RidgeProfileConfig = {
    width: 32,
    segments: 64,
    baseY: -0.5,
    bottomY: -5.0,
    peaks: [
      { center: 0.25, height: 3.2, spread: 0.2, craterFlatness: 0.5 },
      { center: -0.6, height: 1.4, spread: 0.28 },
    ],
    undulationAmp: 0.12,
    undulationFreq: 2.0,
    phase: 0.4,
    leftCalmDip: 0.45,
  };

  const first = generateRidgeProfile(config);
  const second = generateRidgeProfile(config);

  assert.equal(first.length, 65);
  assert.deepEqual(first, second);
  assert.equal(first[0].x, -16);
  assert.equal(first[first.length - 1].x, 16);

  for (const pt of first) {
    assert.ok(pt.y >= config.bottomY + 0.15, `point y=${pt.y} must stay above bottom`);
  }

  // Right peak near u=0.625 (nx=0.25) should rise significantly above the calm left zone (u=0.28)
  const rightPeakY = evaluateRidgeHeight(0.625, config);
  const leftCalmY = evaluateRidgeHeight(0.28, config);
  assert.ok(rightPeakY > leftCalmY + 1.5, 'right sacred peak must clear left text-safe valley');
});

test('computeCameraRigTarget respects parallax and motion flags and clamps pointer input', () => {
  const neutral = computeCameraRigTarget({
    pointerX: 0.8,
    pointerY: -0.6,
    enableParallax: false,
    enableMotion: false,
    elapsedTime: 12,
  });

  assert.equal(neutral.x, DEFAULT_CAMERA_POSITION.x);
  assert.equal(neutral.y, DEFAULT_CAMERA_POSITION.y);
  assert.equal(neutral.z, DEFAULT_CAMERA_POSITION.z);
  assert.equal(neutral.lookAtX, DEFAULT_CAMERA_TARGET.x);

  const clampedHigh = computeCameraRigTarget({
    pointerX: 99,
    pointerY: -99,
    enableParallax: true,
    enableMotion: false,
    elapsedTime: 0,
  });
  const unitHigh = computeCameraRigTarget({
    pointerX: 1,
    pointerY: -1,
    enableParallax: true,
    enableMotion: false,
    elapsedTime: 0,
  });
  assert.deepEqual(clampedHigh, unitHigh);
  assert.ok(unitHigh.x > DEFAULT_CAMERA_POSITION.x);
  assert.ok(unitHigh.y < DEFAULT_CAMERA_POSITION.y);
});

test('computeLayerParallaxOffset scales by depth factor and zeroes when disabled', () => {
  const off = computeLayerParallaxOffset(0.5, -0.5, 1.0, false);
  assert.deepEqual(off, { x: 0, y: 0 });

  const far = computeLayerParallaxOffset(1, 0, 0.2, true);
  const near = computeLayerParallaxOffset(1, 0, 1.0, true);
  assert.ok(Math.abs(near.x) > Math.abs(far.x) * 4.5);
});

test('dampValue converges monotonically toward target without overshoot', () => {
  let value = 0;
  for (let i = 0; i < 60; i++) {
    const next = dampValue(value, 1, 5, 1 / 60);
    assert.ok(next >= value && next <= 1);
    value = next;
  }
  assert.ok(value > 0.99);
});

test('stepPetalParticle advances position, rotates, and wraps cleanly within bounds', () => {
  const bounds = { minX: -10, maxX: 10, minY: -4, maxY: 6 };
  const petal: PetalParticle = {
    x: -9.95,
    y: -3.98,
    z: 0,
    vx: -1.5,
    vy: -0.8,
    swayPhase: 0,
    swayAmp: 0,
    swayFreq: 1,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    rotSpeedX: 1,
    rotSpeedY: 0.5,
    rotSpeedZ: -0.4,
    scale: 1,
  };

  const stepped = stepPetalParticle(petal, 0.1, 0, bounds);
  assert.ok(stepped.x >= bounds.minX && stepped.x <= bounds.maxX);
  assert.ok(stepped.y >= bounds.minY && stepped.y <= bounds.maxY);
  assert.ok(stepped.y > 5.0, 'wrapped petal should re-enter near top of scenic stage');
  assert.ok(stepped.rotX > 0);
});

test('deterministic PRNG and software WebGL detector behave accurately', () => {
  const rngA = createSeededRandom(42);
  const rngB = createSeededRandom(42);
  for (let i = 0; i < 10; i++) {
    const a = rngA();
    const b = rngB();
    assert.equal(a, b);
    assert.ok(a >= 0 && a < 1);
  }

  assert.equal(isSoftwareWebGLRendererString('Google SwiftShader'), true);
  assert.equal(isSoftwareWebGLRendererString('llvmpipe (LLVM 15.0.7, 256 bits)'), true);
  assert.equal(isSoftwareWebGLRendererString('ANGLE (Apple, Apple M3 Pro, OpenGL 4.1)'), false);
});
