import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  FISH_PATHS,
  HERO_INTRO_DURATION,
  POND_RX,
  POND_RZ,
  PondClock,
  SHRINE_CENTER,
  WATERFALL_IMPACT_POINT,
  WATERFALL_SOURCE_POINT,
  createKoiAgents,
  dampCameraParallax,
  fishPolygonalExtents,
  fishPose,
  getGroundMaterialWeights,
  introAtmosphereFactor,
  introCameraState,
  isInsideNaturalPond,
  isInsidePond,
  maxRippleRadius,
  pondBedElevation,
  pondBoundaryPoint,
  sampleTerrain,
  shrinePathCenterX,
  signedDistanceToPond,
  stepKoiAgents,
  terrainElevation,
  terrainNormalAt,
  type FoodPellet,
} from './model';

test('red/white koi starts at (3.05, 0) with yaw -PI/2 and partner starts opposite', () => {
  const redWhite = fishPose(FISH_PATHS[0], 0);
  const gold = fishPose(FISH_PATHS[1], 0);

  assert.ok(Math.abs(redWhite.x - 3.05) < 1e-8);
  assert.ok(Math.abs(redWhite.z - 0) < 1e-8);
  assert.ok(Math.abs(redWhite.yaw - -Math.PI / 2) < 1e-8);

  assert.ok(Math.abs(gold.x - -3.05) < 1e-8);
  assert.ok(Math.abs(gold.z - 0) < 1e-8);
  assert.ok(Math.abs(gold.yaw - Math.PI / 2) < 1e-8);
});

test('outer koi path completes full period in 2*PI/0.18 seconds and preserves phase independence', () => {
  const period = (2 * Math.PI) / 0.18;
  const t0 = fishPose(FISH_PATHS[0], 0);
  const tPeriod = fishPose(FISH_PATHS[0], period);

  assert.ok(Math.abs(tPeriod.x - t0.x) < 1e-8);
  assert.ok(Math.abs(tPeriod.z - t0.z) < 1e-8);
  assert.ok(Math.abs(tPeriod.yaw - t0.yaw) < 1e-8);

  const innerA = fishPose(FISH_PATHS[2], 12.34);
  const innerB = fishPose(FISH_PATHS[3], 12.34);
  assert.ok(Math.hypot(innerA.x - innerB.x, innerA.z - innerB.z) > 1.5);
});

test('nonfinite elapsed time falls back safely to 0', () => {
  const atZero = fishPose(FISH_PATHS[0], 0);
  const atNaN = fishPose(FISH_PATHS[0], Number.NaN);
  const atInf = fishPose(FISH_PATHS[0], Number.POSITIVE_INFINITY);

  assert.deepEqual(atNaN, atZero);
  assert.deepEqual(atInf, atZero);
});

test('all four koi remain strictly inside the pond with >= 0.80 center separation across 100*PI seconds', () => {
  const totalTime = 100 * Math.PI;
  const steps = 1200;
  let minDistance = Number.POSITIVE_INFINITY;

  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * totalTime;
    const poses = FISH_PATHS.map((path) => fishPose(path, t));

    for (const pose of poses) {
      assert.ok(Number.isFinite(pose.x) && Number.isFinite(pose.z) && Number.isFinite(pose.yaw));
      assert.ok(isInsidePond(pose, POND_RX, POND_RZ), `Center outside pond at t=${t}`);

      const corners = fishPolygonalExtents(pose);
      for (const corner of corners) {
        assert.ok(
          isInsidePond(corner, POND_RX, POND_RZ),
          `Fish extent (${corner.x.toFixed(3)}, ${corner.z.toFixed(3)}) crossed pond bank at t=${t}`,
        );
      }
    }

    for (let i = 0; i < poses.length; i++) {
      for (let j = i + 1; j < poses.length; j++) {
        const dist = Math.hypot(poses[i].x - poses[j].x, poses[i].z - poses[j].z);
        if (dist < minDistance) minDistance = dist;
        assert.ok(dist >= 0.8, `Fish ${i} and ${j} closer than 0.80 (${dist}) at t=${t}`);
      }
    }
  }

  assert.ok(minDistance >= 0.8);
});

test('pond containment and ripple radius bounds reject invalid or out-of-pond inputs', () => {
  assert.equal(isInsidePond({ x: 0, z: 0 }, POND_RX, POND_RZ), true);
  assert.equal(isInsidePond({ x: POND_RX + 0.01, z: 0 }, POND_RX, POND_RZ), false);
  assert.equal(isInsidePond({ x: Number.NaN, z: 0 }, POND_RX, POND_RZ), false);
  assert.equal(isInsidePond({ x: 0, z: 0 }, -1, POND_RZ), false);

  assert.equal(maxRippleRadius({ x: POND_RX + 0.01, z: 0 }, POND_RX, POND_RZ), 0);
  assert.equal(maxRippleRadius({ x: Number.POSITIVE_INFINITY, z: 0 }, POND_RX, POND_RZ), 0);
  assert.equal(maxRippleRadius({ x: 0, z: 0 }, 0, POND_RZ), 0);

  const samplePoints = [
    { x: 0, z: 0 },
    { x: 0.35, z: -0.25 },
    { x: -2.4, z: 1.1 },
    { x: 3.8, z: 0.3 },
    { x: 0.2, z: -2.85 },
  ];

  for (const pt of samplePoints) {
    assert.equal(isInsidePond(pt, POND_RX, POND_RZ), true);
    const r = maxRippleRadius(pt, POND_RX, POND_RZ);
    const rho = Math.hypot(pt.x / POND_RX, pt.z / POND_RZ);
    assert.ok(r >= 0);
    assert.ok(rho + r / Math.min(POND_RX, POND_RZ) <= 1 + 1e-12);
  }
});

test('PondClock pauses without advancing, resumes cleanly, and visibility does not override user pause', () => {
  const clock = new PondClock();
  assert.equal(clock.isAdvancing, true);

  clock.step(0.15);
  assert.ok(Math.abs(clock.elapsed - 0.15) < 1e-12);

  clock.pause();
  assert.equal(clock.isAdvancing, false);
  clock.step(0.2);
  assert.ok(Math.abs(clock.elapsed - 0.15) < 1e-12);

  // Hiding and showing tab must not override explicit user pause
  clock.setVisibilityPaused(true);
  clock.setVisibilityPaused(false);
  assert.equal(clock.userPaused, true);
  assert.equal(clock.isAdvancing, false);
  clock.step(0.2);
  assert.ok(Math.abs(clock.elapsed - 0.15) < 1e-12);

  // Resuming continues from frozen elapsed time
  clock.resume();
  assert.equal(clock.isAdvancing, true);
  clock.step(0.1);
  assert.ok(Math.abs(clock.elapsed - 0.25) < 1e-12);

  // Visibility pause alone freezes and resumes cleanly
  clock.setVisibilityPaused(true);
  assert.equal(clock.isAdvancing, false);
  clock.step(0.2);
  assert.ok(Math.abs(clock.elapsed - 0.25) < 1e-12);
  clock.setVisibilityPaused(false);
  assert.equal(clock.isAdvancing, true);
});

test('natural irregular pond basin depth is deeper in center than shallow shelf', () => {
  const centerDepth = pondBedElevation(0, 0);
  const edgeDepth = pondBedElevation(2.35, 0);
  assert.ok(centerDepth < -0.55, `Expected deep basin center, got ${centerDepth}`);
  assert.ok(edgeDepth > centerDepth, 'Shallow bank shelf must be higher than center basin');
  assert.equal(isInsideNaturalPond({ x: 0, z: 0 }), true);
  assert.equal(isInsideNaturalPond({ x: 6.5, z: 0 }), false);
});

test('autonomous koi steering stays submerged, bounded, smooth, and converges on pellets', () => {
  const agents = createKoiAgents();
  const pellets: FoodPellet[] = [{ id: 1, x: 0.35, z: 0.25, createdAt: 0, eaten: false }];
  const obstacles = [{ x: -1.2, z: 0.7, r: 0.32 }];

  let pelletEaten = false;
  let totalWakeRipples = 0;
  const prevYaws = agents.map((a) => a.yaw);

  for (let step = 0; step < 900; step++) {
    const elapsed = step * (1 / 30);
    const out = stepKoiAgents(agents, 1 / 30, elapsed, pellets, [], obstacles);
    if (out.consumedPelletIds.includes(1)) {
      pellets[0].eaten = true;
      pelletEaten = true;
    }
    totalWakeRipples += out.wakeRipples.length;

    for (let i = 0; i < agents.length; i++) {
      const k = agents[i];
      assert.ok(isInsideNaturalPond({ x: k.x, z: k.z }, 0.15), `Koi ${i} left pond at step ${step}`);
      assert.ok(k.y <= -0.068 + 1e-6, `Koi ${i} breached water surface (${k.y})`);
      assert.ok(k.y > pondBedElevation(k.x, k.z), `Koi ${i} clipped pond floor`);

      let dyaw = Math.abs(k.yaw - prevYaws[i]);
      if (dyaw > Math.PI) dyaw = Math.PI * 2 - dyaw;
      assert.ok(dyaw < 0.15, `Koi ${i} snapped heading abruptly (${dyaw})`);
      prevYaws[i] = k.yaw;
    }
  }

  assert.equal(pelletEaten, true, 'At least one koi should swim to and eat the food pellet');
  assert.ok(totalWakeRipples > 0, 'Surface-skimming koi should emit gentle wake ripples');
});

test('camera parallax damping bounds offsets and converges smoothly', () => {
  let x = 0;
  let y = 0;
  for (let i = 0; i < 60; i++) {
    const next = dampCameraParallax(x, y, 2.5, -3.0, 1 / 60);
    x = next.x;
    y = next.y;
  }
  assert.ok(x > 0.9 && x <= 1.0);
  assert.ok(y < -0.9 && y >= -1.0);
});

test('waterfall impact point sits strictly inside natural pond while right-bank vessel source sits outside', () => {
  assert.equal(isInsideNaturalPond(WATERFALL_IMPACT_POINT, 0.08), true);
  assert.equal(isInsideNaturalPond(WATERFALL_SOURCE_POINT, 0), false);
  assert.ok(WATERFALL_SOURCE_POINT.x > WATERFALL_IMPACT_POINT.x, 'Vessel sits on right bank pouring left into pond');
});

test('outer garden terrain elevation stays bounded, elevated on shrine terrace, and rises in mossy ridges', () => {
  const pathX = shrinePathCenterX(0.2);
  const pathH = terrainElevation(pathX, 0.2);
  const shrineH = terrainElevation(-2.15, -7.15);
  const bermH = terrainElevation(-5.6, -0.5);
  const nanH = terrainElevation(Number.NaN, 0);

  assert.equal(isInsideNaturalPond({ x: pathX, z: 0.2 }, 0), false);
  assert.ok(pathH >= 0.02 && pathH < 0.55, `Expected gentle path slope, got ${pathH}`);
  assert.ok(shrineH > 0.65 && shrineH < 1.35, `Expected raised shrine terrace, got ${shrineH}`);
  assert.ok(bermH > 0.5 && bermH < 1.6, `Expected mossy left woodland rise, got ${bermH}`);
  assert.equal(nanH, 0);
});

test('unified terrain sampler exposes consistent shore distance, normals, path-to-shrine continuity, and normalized biome weights', () => {
  assert.ok(signedDistanceToPond({ x: 0, z: 0 }) < -1.5, 'Pond center has negative signed shore distance');
  assert.ok(signedDistanceToPond({ x: 4.5, z: 0 }) > 0.8, 'Right bank has positive signed shore distance');

  // Path reaches smoothly from foreground to shrine front steps
  const shrineFrontX = shrinePathCenterX(-5.9);
  assert.ok(Math.abs(shrineFrontX - SHRINE_CENTER.x) < 0.55, `Expected path end near shrine, got x=${shrineFrontX}`);

  const pathSample = sampleTerrain({ x: shrinePathCenterX(0.2), z: 0.2 });
  assert.equal(pathSample.biome, 'path');
  assert.ok(pathSample.weights.gravel > 0.25, 'Path sample should carry significant gravel/compacted earth weight');

  const forestSample = sampleTerrain({ x: 0.5, z: -12.0 });
  assert.equal(forestSample.biome, 'forest');
  assert.ok(forestSample.weights.forestLitter > 0.35, 'Distant bamboo floor should classify as forest litter');

  const norm = terrainNormalAt(3.5, -2.0);
  const nLen = Math.hypot(norm.x, norm.y, norm.z);
  assert.ok(Math.abs(nLen - 1) < 1e-6 && norm.y > 0.4, 'Terrain normal must be unit upward vector');

  const weights = getGroundMaterialWeights({ x: 3.3, z: 2.2 });
  const totalW =
    weights.wetStone + weights.moss + weights.soil + weights.gravel + weights.forestLitter;
  assert.ok(Math.abs(totalW - 1) < 1e-6, 'Material weights must sum cleanly to 1');
});

test('first-visit intro choreography settles monotonically from back-elevated start into perspective garden framing', () => {
  const startAtmos = introAtmosphereFactor(0);
  const midAtmos = introAtmosphereFactor(HERO_INTRO_DURATION * 0.5);
  const endAtmos = introAtmosphereFactor(HERO_INTRO_DURATION);

  assert.ok(startAtmos < midAtmos && midAtmos < endAtmos);
  assert.equal(endAtmos, 1.0);

  const cam0 = introCameraState(0, 1.6);
  const camEnd = introCameraState(HERO_INTRO_DURATION, 1.6);
  const camBeyond = introCameraState(HERO_INTRO_DURATION + 5, 1.6);
  assert.ok(cam0.position.z > camEnd.position.z + 1.0, 'Camera should dolly forward during intro');
  assert.ok(cam0.position.y > camEnd.position.y + 0.5, 'Camera should settle down into human vantage');
  assert.ok(camEnd.position.y < 3.4, 'Settled camera should be perspective garden height, not top-down miniature');
  assert.ok(camEnd.lookAt.x < -0.5, 'Desktop hero camera shifts focus left so pond sits center/right');
  assert.deepEqual(camEnd, camBeyond);

  const mobileEnd = introCameraState(HERO_INTRO_DURATION, 0.55);
  assert.ok(mobileEnd.lookAt.x > -0.2, 'Narrow mobile camera centers pond horizontally');
});

test('pond basin transitions continuously across shoreline boundary without vertical rim seam or cliff', () => {
  const angles = [0, Math.PI * 0.25, Math.PI * 0.55, Math.PI, -Math.PI * 0.5];
  for (const angle of angles) {
    const startPt = pondBoundaryPoint(angle, 0.825);
    let prevY = terrainElevation(startPt.x, startPt.z);
    for (let s = 0.85; s <= 1.25; s += 0.025) {
      const pt = pondBoundaryPoint(angle, s);
      const y = terrainElevation(pt.x, pt.z);
      const jump = Math.abs(y - prevY);
      assert.ok(
        jump < 0.065,
        `Detected abrupt shoreline step (${jump.toFixed(4)}m) at angle=${angle.toFixed(2)} scale=${s.toFixed(3)}`,
      );
      prevY = y;
    }
  }
});
