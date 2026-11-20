import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  clampToSafeWater,
  COTTAGE_POS,
  getShorelineSprayAnchors,
  islandHeightAt,
  islandShoreSDF,
  isSafeWaterPosition,
  LIGHTHOUSE_POS,
  SAFE_WATER_BOUNDS,
  verifyArchitecturalPlacement,
} from './island';
import { sampleOcean, sampleOceanAtWorldXZ, sampleOceanSurface } from './ocean';
import { evaluateWind } from './wind';
import { evaluateTimeOfDay } from './timeOfDay';
import {
  dampWeatherState,
  evaluateStormSequence,
  WEATHER_PRESETS,
} from './weather';
import {
  createInitialBoatState,
  repositionBoat,
  stepBoatPhysics,
} from './buoyancy';
import { HERO_CAMERA_CONFIG } from './types';

function projectPointToNDC(
  pt: { x: number; y: number; z: number },
  aspect: number
): { ndcX: number; ndcY: number; depth: number } {
  const cam = HERO_CAMERA_CONFIG.pos;
  const look = HERO_CAMERA_CONFIG.look;

  const fx = look.x - cam.x;
  const fy = look.y - cam.y;
  const fz = look.z - cam.z;
  const fLen = Math.hypot(fx, fy, fz);
  const F = { x: fx / fLen, y: fy / fLen, z: fz / fLen };

  // Right = normalize(F x Up(0,1,0)) = (-Fz, 0, Fx)
  const rx = -F.z;
  const rz = F.x;
  const rLen = Math.hypot(rx, rz);
  const R = { x: rx / rLen, y: 0, z: rz / rLen };

  // Up = R x F
  const U = {
    x: R.y * F.z - R.z * F.y,
    y: R.z * F.x - R.x * F.z,
    z: R.x * F.y - R.y * F.x,
  };

  const dx = pt.x - cam.x;
  const dy = pt.y - cam.y;
  const dz = pt.z - cam.z;

  const depth = dx * F.x + dy * F.y + dz * F.z;
  const camX = dx * R.x + dy * R.y + dz * R.z;
  const camY = dx * U.x + dy * U.y + dz * U.z;

  const halfH = Math.tan(((HERO_CAMERA_CONFIG.fov * Math.PI) / 180) * 0.5);
  return {
    ndcX: camX / (depth * halfH * aspect),
    ndcY: camY / (depth * halfH),
    depth,
  };
}

test('architectural separation: lighthouse and keeper cottage have zero Box3/roof/wall overlap and grounded pads', () => {
  const check = verifyArchitecturalPlacement();

  assert.ok(
    check.centerDistance > 9.0,
    `Expected center distance > 9m, got ${check.centerDistance.toFixed(2)}m`
  );
  assert.ok(
    check.box3GapX > 1.8,
    `Expected positive conservative Box3 X gap > 1.8m, got ${check.box3GapX.toFixed(2)}m`
  );
  assert.ok(
    check.roofToTowerClearance > 2.4,
    `Expected roof-to-tower clearance > 2.4m, got ${check.roofToTowerClearance.toFixed(2)}m`
  );
  assert.ok(
    check.foundationClearance > 2.2,
    `Expected foundation clearance > 2.2m, got ${check.foundationClearance.toFixed(2)}m`
  );
  assert.ok(
    check.lighthousePadMaxError < 0.08,
    `Lighthouse foundation pad error too high: ${check.lighthousePadMaxError.toFixed(3)}m`
  );
  assert.ok(
    check.cottagePadMaxError < 0.12,
    `Cottage foundation pad error too high: ${check.cottagePadMaxError.toFixed(3)}m`
  );
  assert.ok(
    check.walkwayMaxGap < 0.35,
    `Connecting walkway terrain gap too high: ${check.walkwayMaxGap.toFixed(3)}m`
  );

  // Far open ocean remains underwater
  const hOcean = islandHeightAt(-35, 10);
  assert.ok(hOcean < -3.0, `Expected deep seafloor in open ocean, got ${hOcean}`);
});

test('default hero 16:9 composition frames lighthouse, separated cottage, and entire boat + buoy with margin', () => {
  const aspect = 16 / 9;

  const lhBase = projectPointToNDC(LIGHTHOUSE_POS, aspect);
  const lhSpire = projectPointToNDC(
    { x: LIGHTHOUSE_POS.x, y: LIGHTHOUSE_POS.y + 19.5, z: LIGHTHOUSE_POS.z },
    aspect
  );
  const cotCenter = projectPointToNDC(
    { x: COTTAGE_POS.x, y: COTTAGE_POS.y + 2.5, z: COTTAGE_POS.z },
    aspect
  );

  // Lighthouse on right half, cottage clearly further right, both inside viewport
  assert.ok(lhBase.ndcX > 0.15 && lhBase.ndcX < 0.45, `Lighthouse ndcX=${lhBase.ndcX}`);
  assert.ok(lhSpire.ndcY < 0.92, `Lighthouse spire clipped at top: ndcY=${lhSpire.ndcY}`);
  assert.ok(cotCenter.ndcX > lhBase.ndcX + 0.18 && cotCenter.ndcX < 0.78, `Cottage ndcX=${cotCenter.ndcX}`);

  // Simulate boat motion across stormy waves and assert FULL hull + buoy remain inside viewport above bottom dock
  let boat = createInitialBoatState();
  const stormOcean = {
    time: 0,
    amplitude: 1.5,
    frequency: 1.15,
    waveSpeed: 1.2,
    windDirX: 0.9,
    windDirZ: -0.4,
    windStrength: 1.5,
    foamIntensity: 1.5,
  };
  for (let step = 0; step < 120; step++) {
    boat = stepBoatPhysics(boat, 1 / 30, { ...stormOcean, time: step / 30 });
    const hullProj = projectPointToNDC({ x: boat.x, y: boat.y, z: boat.z }, aspect);
    const buoyProj = projectPointToNDC({ x: boat.buoyX, y: boat.buoyY, z: boat.buoyZ }, aspect);

    assert.ok(
      hullProj.ndcX > -0.75 && hullProj.ndcX < 0.05,
      `Boat hull horizontal framing out of lower-left cove: ndcX=${hullProj.ndcX}`
    );
    assert.ok(
      hullProj.ndcY > -0.82 && hullProj.ndcY < -0.2,
      `Boat hull too close to bottom edge/dock: ndcY=${hullProj.ndcY}`
    );
    assert.ok(
      buoyProj.ndcX > -0.85 && buoyProj.ndcY > -0.86,
      `Mooring buoy clipped at edge: (${buoyProj.ndcX}, ${buoyProj.ndcY})`
    );
  }
});

test('island SDF separates land and safe water and clamps collisions safely', () => {
  const sdfLand = islandShoreSDF(LIGHTHOUSE_POS.x, LIGHTHOUSE_POS.z);
  const sdfCottage = islandShoreSDF(COTTAGE_POS.x, COTTAGE_POS.z);
  const sdfOpenWater = islandShoreSDF(-18, 12);
  assert.ok(sdfLand < -5, `Expected negative SDF at lighthouse, got ${sdfLand}`);
  assert.ok(sdfCottage < -5, `Expected negative SDF at cottage, got ${sdfCottage}`);
  assert.ok(sdfOpenWater > 5, `Expected positive SDF in open water, got ${sdfOpenWater}`);

  const clamped = clampToSafeWater(LIGHTHOUSE_POS.x, LIGHTHOUSE_POS.z);
  assert.equal(isSafeWaterPosition(clamped.x, clamped.z), true);
  assert.ok(
    islandShoreSDF(clamped.x, clamped.z) >= SAFE_WATER_BOUNDS.minShoreClearance
  );

  const anchors = getShorelineSprayAnchors();
  assert.ok(anchors.length >= 10, `Expected >= 10 shoreline spray anchors, got ${anchors.length}`);
});

test('shared Gerstner ocean model returns unit normals, slopes, velocities, and scales with storm & waveSpeed', () => {
  const calmParams = {
    time: 3.5,
    amplitude: 0.4,
    frequency: 0.9,
    waveSpeed: 0.8,
    windDirX: 0.9,
    windDirZ: -0.4,
    windStrength: 0.3,
    foamIntensity: 0.6,
  };
  const stormParams = {
    ...calmParams,
    amplitude: 1.6,
    waveSpeed: 1.4,
    windStrength: 1.6,
    foamIntensity: 1.6,
  };

  let calmVariance = 0;
  let stormVariance = 0;
  for (let i = 0; i < 20; i++) {
    const x = -22 + i * 1.1;
    const z = 8 + (i % 5) * 2.2;
    const c = sampleOceanSurface(x, z, calmParams);
    const s = sampleOceanSurface(x, z, stormParams);

    const nLen = Math.hypot(s.normalX, s.normalY, s.normalZ);
    assert.ok(Math.abs(nLen - 1) < 1e-4, `Normal must be unit length, got ${nLen}`);
    assert.ok(s.normalY > 0.2, `Normal Y must point upward, got ${s.normalY}`);
    assert.ok(Number.isFinite(s.slopeX) && Number.isFinite(s.velocityY));

    calmVariance += Math.abs(c.y);
    stormVariance += Math.abs(s.y);
  }

  assert.ok(
    stormVariance > calmVariance * 2.2,
    `Storm wave amplitude (${stormVariance}) must significantly exceed calm (${calmVariance})`
  );

  // Unified sampleOcean(position, time, weatherState) matches sampleOceanAtWorldXZ
  const unified = sampleOcean(
    { x: -10.4, z: 9.2 },
    4.2,
    {
      waveAmplitude: 1.15,
      waveFrequency: 1.0,
      waveSpeed: 1.0,
      windDirX: 0.9,
      windDirZ: -0.4,
      windStrength: 1.1,
      foamIntensity: 1.15,
    }
  );
  assert.ok(Number.isFinite(unified.y) && unified.normalY > 0.3);
});

test('5-point boat buoyancy tracks wave height, exposes sample points/normal, reacts stronger in storms, and avoids rocks', () => {
  const calmOcean = {
    time: 0,
    amplitude: 0.4,
    frequency: 0.9,
    waveSpeed: 0.85,
    windDirX: 0.85,
    windDirZ: -0.5,
    windStrength: 0.35,
    foamIntensity: 0.5,
  };
  const stormOcean = {
    ...calmOcean,
    amplitude: 1.65,
    waveSpeed: 1.25,
    windStrength: 1.65,
    foamIntensity: 1.6,
  };

  let calmBoat = createInitialBoatState();
  let stormBoat = createInitialBoatState();
  let calmPitchEnergy = 0;
  let stormPitchEnergy = 0;

  for (let step = 0; step < 180; step++) {
    const t = step * (1 / 30);
    calmBoat = stepBoatPhysics(calmBoat, 1 / 30, { ...calmOcean, time: t });
    stormBoat = stepBoatPhysics(stormBoat, 1 / 30, { ...stormOcean, time: t });
    calmPitchEnergy += Math.abs(calmBoat.pitch) + Math.abs(calmBoat.roll);
    stormPitchEnergy += Math.abs(stormBoat.pitch) + Math.abs(stormBoat.roll);

    assert.equal(stormBoat.samplePoints.length, 5);
    assert.ok(
      islandShoreSDF(stormBoat.x, stormBoat.z) >= SAFE_WATER_BOUNDS.minShoreClearance - 0.1,
      `Boat violated island boundary at step ${step}`
    );
  }

  const finalWave = sampleOceanAtWorldXZ(stormBoat.x, stormBoat.z, {
    ...stormOcean,
    time: 179 / 30,
  });
  assert.ok(
    Math.abs(stormBoat.y - finalWave.y) < 1.2,
    `Boat height ${stormBoat.y} should track wave height ${finalWave.y}`
  );
  assert.ok(
    stormPitchEnergy > calmPitchEnergy * 1.8,
    `Storm boat rocking (${stormPitchEnergy}) should clearly exceed calm (${calmPitchEnergy})`
  );

  // Toggling buoyancy off settles boat smoothly
  let calmDisabled = stormBoat;
  for (let i = 0; i < 60; i++) {
    calmDisabled = stepBoatPhysics(calmDisabled, 1 / 30, stormOcean, false);
  }
  assert.ok(Math.abs(calmDisabled.pitch) < 0.02 && Math.abs(calmDisabled.roll) < 0.02);

  // Interactive reposition clamps unsafe coordinates into safe water
  const moved = repositionBoat(stormBoat, 12, 0);
  assert.equal(isSafeWaterPosition(moved.x, moved.z), true);
});

test('30-second cinematic storm sequence is deterministic, reversible, and matches all 5 acts', () => {
  const s2a = evaluateStormSequence(2.0);
  const s20a = evaluateStormSequence(20.0);
  const s2b = evaluateStormSequence(2.0);
  const s20b = evaluateStormSequence(20.0);

  assert.deepEqual(s2a, s2b);
  assert.deepEqual(s20a, s20b);

  assert.equal(s2a.phaseIndex, 0);
  assert.equal(s2a.targets.rainIntensity, 0);
  assert.equal(s2a.beaconActive, false);

  const s8 = evaluateStormSequence(8.0);
  assert.equal(s8.phaseIndex, 1);
  assert.ok(s8.targets.cloudCoverage > s2a.targets.cloudCoverage + 0.28);
  assert.ok(s8.targets.windStrength > s2a.targets.windStrength);

  const s13 = evaluateStormSequence(13.0);
  assert.equal(s13.phaseIndex, 2);
  assert.ok(s13.targets.rainIntensity > 0.3);
  assert.equal(s13.beaconActive, true);

  const sStrike = evaluateStormSequence(18.85);
  assert.equal(sStrike.phaseIndex, 3);
  assert.ok(sStrike.targets.waveAmplitude > 1.3);
  assert.ok(sStrike.lightningFlash > 0.35, `Expected lightning flash at 18.85s, got ${sStrike.lightningFlash}`);

  const s29 = evaluateStormSequence(29.0);
  assert.equal(s29.phaseIndex, 4);
  assert.ok(s29.targets.rainIntensity < 0.25);
  assert.ok(s29.targets.waveAmplitude < sStrike.targets.waveAmplitude);
  assert.ok(s29.timeOfDay > 21.0);
  assert.equal(s29.beaconActive, true);
});

test('weather interpolation, wind coherence, and time-of-day lighting remain smooth and finite', () => {
  let state = { ...WEATHER_PRESETS.CLEAR };
  for (let i = 0; i < 80; i++) {
    state = dampWeatherState(state, WEATHER_PRESETS.THUNDERSTORM, 0.05);
  }
  assert.ok(state.rainIntensity > 0.85);
  assert.ok(state.waveAmplitude > 1.3);
  assert.ok(state.stormIntensity > 0.8);

  const wind = evaluateWind(12.4, 1.2);
  const wLen = Math.hypot(wind.dirX, wind.dirZ);
  assert.ok(Math.abs(wLen - 1) < 1e-5);
  assert.ok(wind.effectiveSpeed >= 1.2);

  const noon = evaluateTimeOfDay(12.5, 0.2, 0.0, 0.1);
  const night = evaluateTimeOfDay(23.0, 0.2, 0.0, 0.1);
  assert.ok(noon.sunIntensity > 1.4);
  assert.ok(night.sunIntensity < 0.05);
  assert.ok(night.moonIntensity > 0.4);
  assert.ok(night.beaconProminence > noon.beaconProminence * 2.0);
});
