import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  SCENE_WIDTH,
  SCENE_HEIGHT,
  BLOSSOM_SPAWN_ANCHORS,
  computeResponsiveViewBox,
  computeLayerParallaxOffset,
} from './sceneCoordinates';
import {
  buildSakuraBlossomPaths,
  buildPineFanPaths,
  buildCypressSpirePath,
  buildGrassBladePath,
  buildFernRosettePath,
  stepPetalParticle,
} from './paperGeometry';
import { clamp01, computeUnfoldState, subProgress } from './unfoldMath';
import { computeEffectiveShadowOpacity } from './paperTextures';

test('responsive viewBox framing adapts cleanly for desktop, tablet, and mobile', () => {
  const desktop = computeResponsiveViewBox(1440, 900);
  assert.equal(desktop.category, 'desktop');
  assert.equal(desktop.viewBox, `0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`);

  const tablet = computeResponsiveViewBox(900, 900);
  assert.equal(tablet.category, 'tablet');
  assert.ok(tablet.width < SCENE_WIDTH && tablet.width >= 900);
  assert.ok(tablet.x >= 0 && tablet.x + tablet.width <= SCENE_WIDTH);

  const mobile = computeResponsiveViewBox(390, 844);
  assert.equal(mobile.category, 'mobile');
  assert.ok(mobile.width < 600);
  // Mobile framing must keep the sun (~800), torii (~865), and river (~680..960) centered
  assert.ok(mobile.x <= 720 && mobile.x + mobile.width >= 1020);
});

test('parallax offsets increase monotonically from background (0) to foreground (7) and stay safely bounded', () => {
  const offsets = ([0, 1, 2, 3, 4, 5, 6, 7] as const).map((layer) =>
    computeLayerParallaxOffset(layer, 1.0, 0.5, 1.0)
  );
  for (let i = 1; i < offsets.length; i++) {
    assert.ok(
      offsets[i].tx > offsets[i - 1].tx,
      `Layer ${i} tx (${offsets[i].tx}) should exceed layer ${i - 1} (${offsets[i - 1].tx})`
    );
  }
  // Over-deflected pointer inputs clamp cleanly
  const clamped = computeLayerParallaxOffset(7, 5.0, -5.0, 1.0);
  assert.equal(clamped.tx, 52);
  assert.equal(clamped.ty, -24);
});

test('sakura blossom builder produces 5 notched petals and 5 stamens', () => {
  const flower = buildSakuraBlossomPaths(100, 100, 18, 12);
  assert.equal(flower.petalPaths.length, 5);
  assert.equal(flower.highlightPaths.length, 5);
  assert.equal(flower.stamenLines.length, 5);
  assert.ok(flower.petalPaths.every((p) => p.startsWith('M ') && p.endsWith('Z')));
});

test('pine fan, cypress, grass, and fern geometry produce valid closed SVG paths', () => {
  const fan = buildPineFanPaths(200, 200, 75, -160, -20, 13);
  assert.ok(fan.fanOutlinePath.startsWith('M ') && fan.fanOutlinePath.endsWith('Z'));
  assert.equal(fan.needleCuts.length, 12);

  const cypress = buildCypressSpirePath(300, 500, 42, 120, 6);
  assert.ok(cypress.startsWith('M ') && cypress.endsWith('Z'));

  const blade = buildGrassBladePath(120, 880, 140, -22, 12);
  assert.ok(blade.startsWith('M ') && blade.endsWith('Z'));

  const rosette = buildFernRosettePath(220, 810, 48, 9);
  assert.ok(rosette.startsWith('M ') && rosette.endsWith('Z'));
});

test('unfold timeline math compresses at 0 and settles identically to reference at 1', () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(1.5), 1);
  assert.equal(subProgress(0.5, 0.2, 0.8) > 0, true);

  const folded = computeUnfoldState(0);
  assert.ok(folded.farMountains.translateY > 100);
  assert.ok(folded.villageHouses.scaleY < 0.4);
  assert.ok(folded.shadowFactor < 0.4);

  const mid = computeUnfoldState(0.5);
  assert.ok(mid.farMountains.translateY < folded.farMountains.translateY);
  assert.ok(mid.shadowFactor > folded.shadowFactor);

  const opened = computeUnfoldState(1);
  assert.equal(opened.sun.translateY, 0);
  assert.equal(opened.farMountains.translateY, 0);
  assert.equal(opened.farMountains.scaleY, 1);
  assert.equal(opened.villageHouses.scaleY, 1);
  assert.equal(opened.toriiGate.rotateDeg, 0);
  assert.equal(opened.cherryBlossomsRight.rotateDeg, 0);
  assert.equal(opened.shadowFactor, 1);
});

test('falling petal physics advances downward and recycles back to real blossom anchors', () => {
  const initial = {
    id: 1,
    x: 1350,
    y: 170,
    vx: -18,
    vy: 34,
    rotation: 10,
    vRot: 28,
    scale: 1,
    phase: 0.4,
    opacity: 0.9,
    anchorIndex: 1,
  };
  const next = stepPetalParticle(initial, 0.03, 1.0, 2.5, BLOSSOM_SPAWN_ANCHORS, {
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
  });
  assert.ok(next.y > initial.y);

  // Out-of-bounds petal recycles to a real blossom anchor
  const fallen = { ...initial, y: SCENE_HEIGHT + 50 };
  const recycled = stepPetalParticle(fallen, 0.03, 1.0, 4.0, BLOSSOM_SPAWN_ANCHORS, {
    width: SCENE_WIDTH,
    height: SCENE_HEIGHT,
  });
  const expectedAnchor = BLOSSOM_SPAWN_ANCHORS[(initial.anchorIndex + 3) % BLOSSOM_SPAWN_ANCHORS.length];
  assert.ok(Math.abs(recycled.x - expectedAnchor.x) <= 20);
  assert.ok(Math.abs(recycled.y - expectedAnchor.y) <= 15);
});

test('shadow opacity responds to toggle, intensity slider, and unfold separation', () => {
  assert.equal(
    computeEffectiveShadowOpacity(0.3, { enabled: false, intensity: 1, unfoldShadowFactor: 1 }),
    0
  );
  const full = computeEffectiveShadowOpacity(0.3, {
    enabled: true,
    intensity: 1,
    unfoldShadowFactor: 1,
  });
  const folded = computeEffectiveShadowOpacity(0.3, {
    enabled: true,
    intensity: 1,
    unfoldShadowFactor: 0.35,
  });
  assert.ok(full > folded && full === 0.3);
});
