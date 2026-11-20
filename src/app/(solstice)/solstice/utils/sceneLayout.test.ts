import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  LAYER_DEPTH_SPECS,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  computeLayerTransform,
  computeScrollState,
  computeViewportFraming,
  createSeededRandom,
} from './sceneLayout';
import { DESERT_PALETTE, hexToRgba, mixHex } from './desertPalette';

test('scroll progression transitions smoothly from compressed (0) to dimensional (1)', () => {
  const start = computeScrollState(0);
  const mid = computeScrollState(0.5);
  const end = computeScrollState(1);

  assert.ok(start.depthSeparation < mid.depthSeparation);
  assert.ok(mid.depthSeparation < end.depthSeparation);

  // Haze is stronger at progress 0 and gently settles by progress 1
  assert.ok(start.hazeMultiplier > mid.hazeMultiplier);
  assert.ok(mid.hazeMultiplier > end.hazeMultiplier);

  // Shadows gain clarity and underpainting reveal increases
  assert.ok(start.shadowClarity < end.shadowClarity);
  assert.ok(start.paintRevealBase < end.paintRevealBase);
});

test('depth layers preserve increasing parallax order from sky to foreground', () => {
  const pointer = { x: 0.8, y: -0.5 };
  const sky = computeLayerTransform(LAYER_DEPTH_SPECS.sky, pointer, 0, 1.0);
  const sun = computeLayerTransform(LAYER_DEPTH_SPECS.sun, pointer, 0, 1.0);
  const ridges = computeLayerTransform(LAYER_DEPTH_SPECS.distantRidges, pointer, 0, 1.0);
  const canyon = computeLayerTransform(LAYER_DEPTH_SPECS.canyonMid, pointer, 0, 1.0);
  const cliff = computeLayerTransform(LAYER_DEPTH_SPECS.cliffWall, pointer, 0, 1.0);
  const fg = computeLayerTransform(LAYER_DEPTH_SPECS.foreground, pointer, 0, 1.0);

  assert.ok(Math.abs(sky.tx) < Math.abs(sun.tx));
  assert.ok(Math.abs(sun.tx) < Math.abs(ridges.tx));
  assert.ok(Math.abs(ridges.tx) < Math.abs(canyon.tx));
  assert.ok(Math.abs(canyon.tx) < Math.abs(cliff.tx));
  assert.ok(Math.abs(cliff.tx) < Math.abs(fg.tx));

  // Scroll-only progression scales closer layers more strongly than background layers
  const skyScroll = computeLayerTransform(LAYER_DEPTH_SPECS.sky, { x: 0, y: 0 }, 1, 1.0);
  const cliffScroll = computeLayerTransform(LAYER_DEPTH_SPECS.cliffWall, { x: 0, y: 0 }, 1, 1.0);
  const fgScroll = computeLayerTransform(LAYER_DEPTH_SPECS.foreground, { x: 0, y: 0 }, 1, 1.0);
  assert.ok(skyScroll.scale < cliffScroll.scale);
  assert.ok(cliffScroll.scale < fgScroll.scale);
});

test('layer transforms clamp within bleed bounds even under extreme pointer and strength values', () => {
  for (const spec of Object.values(LAYER_DEPTH_SPECS)) {
    const t = computeLayerTransform(spec, { x: 10, y: -10 }, 1, 5);
    assert.ok(Math.abs(t.tx) <= spec.maxOffsetX);
    assert.ok(Math.abs(t.ty) <= spec.maxOffsetY);
  }
});

test('reduced motion zeroes pointer parallax and scale expansion', () => {
  const spec = LAYER_DEPTH_SPECS.foreground;
  const reduced = computeLayerTransform(spec, { x: 1, y: 1 }, 0, 1.5, true);
  assert.equal(reduced.tx, 0);
  assert.equal(reduced.ty, 0);
  assert.equal(reduced.scale, 1);
});

test('responsive viewport framing covers entire viewport across desktop, tablet, and mobile', () => {
  const viewports: Array<[number, number, string]> = [
    [1440, 900, 'desktop'],
    [1920, 1080, 'desktop'],
    [820, 1180, 'tablet'],
    [390, 844, 'mobile'],
  ];

  for (const [w, h, expectedProfile] of viewports) {
    const framing = computeViewportFraming(w, h);
    assert.equal(framing.profile, expectedProfile);

    const renderedW = SCENE_WIDTH * framing.coverScale;
    const renderedH = SCENE_HEIGHT * framing.coverScale;

    assert.ok(renderedW >= w, `width covered for ${w}x${h}`);
    assert.ok(renderedH >= h, `height covered for ${w}x${h}`);
    assert.ok(framing.offsetX <= 0 && framing.offsetX + renderedW >= w);
    assert.ok(framing.offsetY <= 0 && framing.offsetY + renderedH >= h);
  }
});

test('seeded PRNG produces deterministic sequences', () => {
  const a = createSeededRandom(42);
  const b = createSeededRandom(42);
  const seqA = [a(), a(), a(), a()];
  const seqB = [b(), b(), b(), b()];
  assert.deepEqual(seqA, seqB);
});

test('palette utilities convert and mix hex colors accurately', () => {
  assert.equal(hexToRgba(DESERT_PALETTE.terracotta, 0.5), 'rgba(185, 107, 74, 0.5)');
  assert.equal(mixHex('#000000', '#ffffff', 0), '#000000');
  assert.equal(mixHex('#000000', '#ffffff', 1), '#ffffff');
});
