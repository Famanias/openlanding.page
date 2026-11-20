import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  LANTERN_ANCHOR,
  SAKURA_TRUNK_ANCHOR,
  TORII_ANCHOR,
  WATER_LEVEL,
  evaluateShorelineX,
  generateToriiWalkwaySlabs,
  isClearOfArchitecture,
  isDryLand,
  sampleTerrainHeight,
  sampleWaterDepth,
} from './terrain';
import { WIND_DIRECTION, computeBranchWindSway, evaluateWindGust, sampleWindField } from './wind';
import {
  createInitialPetalPopulation,
  spawnPetalFromEmitter,
  stepSimulatedPetal,
  type BlossomEmitter,
} from './petal-sim';
import {
  MAX_CONCURRENT_ACTIVE_RIPPLES,
  RIPPLE_MIN_COOLDOWN_SECONDS,
  advanceWaterRipples,
  countActiveWaterRipples,
  createWaterRipplePool,
  sampleWaterSurfaceY,
  seedInitialCalmRipples,
  tryTriggerWaterRipple,
} from './water-ripples';

test('terrain heightfield keeps open lake on left and dry shoreline foundations on right', () => {
  // Open water in the left/center hero field must be cleanly submerged
  assert.ok(sampleWaterDepth(-4.5, -4.0) > 0.4, 'left-center lake must have open water depth');
  assert.ok(sampleWaterDepth(-1.2, -3.5) > 0.25, 'center lake must remain submerged');
  assert.equal(isDryLand(-3.0, -3.0), false);

  // Shoreline curve must be irregular (varies smoothly along z)
  const shoreBack = evaluateShorelineX(-8.0);
  const shoreTorii = evaluateShorelineX(TORII_ANCHOR.z);
  const shoreLantern = evaluateShorelineX(LANTERN_ANCHOR.z);
  assert.ok(shoreTorii < shoreBack, 'Torii headland should project gently into the lake');
  assert.ok(Math.abs(shoreLantern - shoreTorii) > 0.05, 'shoreline should curve naturally');

  // Torii sanctuary platform & ground mound must be cleanly above WATER_LEVEL
  assert.ok(
    TORII_ANCHOR.platformTopY > WATER_LEVEL + 0.25,
    'Torii platform must sit clearly above WATER_LEVEL'
  );
  assert.ok(
    sampleTerrainHeight(TORII_ANCHOR.x, TORII_ANCHOR.z) > WATER_LEVEL + 0.15,
    'Torii ground knoll must be dry land'
  );

  // Every walkway flagstone must remain strictly above WATER_LEVEL
  const slabs = generateToriiWalkwaySlabs();
  assert.ok(slabs.length >= 7);
  for (const slab of slabs) {
    const slabTopY = slab.y + slab.thickness * 0.5;
    assert.ok(
      slabTopY > WATER_LEVEL + 0.15,
      `walkway slab at (${slab.x.toFixed(2)}, ${slab.z.toFixed(2)}) must stay above WATER_LEVEL`
    );
  }

  // Lantern foundation and sakura trunk base must both be on dry ground
  assert.ok(
    sampleTerrainHeight(LANTERN_ANCHOR.x, LANTERN_ANCHOR.z) > WATER_LEVEL + 0.25,
    'Lantern bank must sit dry above WATER_LEVEL'
  );
  assert.ok(
    sampleTerrainHeight(SAKURA_TRUNK_ANCHOR.x, SAKURA_TRUNK_ANCHOR.z) > WATER_LEVEL + 0.45,
    'Sakura trunk must be rooted in elevated dry terrain'
  );

  // Clearance helper rejects architectural footprints and accepts open dry shore
  assert.equal(isClearOfArchitecture(TORII_ANCHOR.x, TORII_ANCHOR.z, 0.2), false);
  assert.equal(isClearOfArchitecture(LANTERN_ANCHOR.x, LANTERN_ANCHOR.z, 0.2), false);
  assert.equal(isClearOfArchitecture(SAKURA_TRUNK_ANCHOR.x, SAKURA_TRUNK_ANCHOR.z, 0.2), false);
  assert.equal(isClearOfArchitecture(6.2, -0.5, 0.25), true);
});

test('shared wind system drives coherent direction and progressive hierarchical sway', () => {
  assert.ok(WIND_DIRECTION.x < 0, 'prevailing valley breeze should drift gently right-to-left');

  const wind = sampleWindField(4.2, 3.0, 1.5, -2.0);
  assert.ok(wind.vx < 0, 'wind velocity X should align with prevailing breeze');
  assert.ok(wind.gust >= 0 && wind.gust <= 1, 'wind gust factor must be normalized');

  // Measure peak angular deflection across a 20-second window for each branch tier
  let maxTrunk = 0;
  let maxPrimary = 0;
  let maxSecondary = 0;
  let maxTwig = 0;

  for (let t = 0; t < 20; t += 0.15) {
    const g = evaluateWindGust(t, 1.0);
    assert.ok(g >= 0 && g <= 1);
    maxTrunk = Math.max(maxTrunk, Math.abs(computeBranchWindSway('trunk', t, 0.2).rotZ));
    maxPrimary = Math.max(maxPrimary, Math.abs(computeBranchWindSway('primary', t, 0.8).rotZ));
    maxSecondary = Math.max(maxSecondary, Math.abs(computeBranchWindSway('secondary', t, 1.5).rotZ));
    maxTwig = Math.max(maxTwig, Math.abs(computeBranchWindSway('twig', t, 2.3).rotZ));
  }

  const toDeg = 180 / Math.PI;
  assert.ok(maxTrunk * toDeg < maxPrimary * toDeg, 'trunk must sway less than primary branches');
  assert.ok(maxPrimary * toDeg < maxSecondary * toDeg, 'primary must sway less than secondary');
  assert.ok(maxSecondary * toDeg < maxTwig * toDeg, 'secondary must sway less than thin twigs');
  assert.ok(maxTrunk * toDeg >= 0.15 && maxTrunk * toDeg <= 0.8, `trunk sway ${maxTrunk * toDeg}deg in range`);
  assert.ok(maxTwig * toDeg >= 1.5 && maxTwig * toDeg <= 5.5, `twig sway ${maxTwig * toDeg}deg in range`);
});

test('falling petals spawn at blossom emitters, trigger water ripples, float without sinking, and recycle cleanly', () => {
  const emitters: BlossomEmitter[] = [
    { x: 4.5, y: 2.6, z: -1.4 },
    { x: 3.4, y: 2.2, z: -1.3 },
  ];

  const spawned = spawnPetalFromEmitter(emitters, 0, 12.3);
  assert.equal(spawned.state, 'falling');
  assert.ok(Math.hypot(spawned.x - emitters[0].x, spawned.y - emitters[0].y) < 0.6);

  // Drop a petal directly over open lake water and verify water impact + ripple + floating
  let overWater = {
    ...spawned,
    x: -2.0,
    y: WATER_LEVEL + 0.12,
    z: -3.5,
    vy: -0.4,
  };

  let triggeredRipple: { x: number; z: number } | null = null;
  for (let step = 0; step < 30; step++) {
    const res = stepSimulatedPetal(overWater, 0.05, step * 0.05, emitters, step + 5);
    overWater = res.petal;
    if (res.rippleTriggered) {
      triggeredRipple = res.rippleTriggered;
      break;
    }
  }

  assert.ok(triggeredRipple !== null, 'petal contacting open lake must trigger a water ripple');
  assert.equal(overWater.state, 'floating', 'petal must transition to floating on water');
  assert.ok(overWater.y >= WATER_LEVEL, 'floating petal must never fall below WATER_LEVEL');

  // Step while floating: should drift gently with surface current and stay at WATER_LEVEL
  const startFloatX = overWater.x;
  for (let step = 0; step < 20; step++) {
    const res = stepSimulatedPetal(overWater, 0.05, 2.0 + step * 0.05, emitters, step + 99);
    overWater = res.petal;
    assert.ok(overWater.y >= WATER_LEVEL, 'floating petal stays above water plane');
  }
  assert.ok(overWater.x < startFloatX, 'floating petal should drift with weak prevailing current');

  // Verify pre-warmed population stays bounded, includes floating petals, and never penetrates water/terrain
  const pop = createInitialPetalPopulation(48, emitters);
  assert.equal(pop.length, 48);
  let floatingCount = 0;
  for (const p of pop) {
    const floorY = Math.max(WATER_LEVEL, sampleTerrainHeight(p.x, p.z));
    assert.ok(p.y >= floorY - 0.01, `petal y=${p.y} must not penetrate floorY=${floorY}`);
    if (p.state === 'floating') {
      floatingCount++;
      assert.ok(p.x >= -3.9, `floating petal x=${p.x} should stay clear of far-left text-safe zone`);
    }
  }
  assert.ok(floatingCount >= 1, 'pre-warmed population should naturally include floating surface petals');
});

test('water ripple pool enforces sparse cooldown, spacing, open-water depth, and calm active cap', () => {
  const pool = createWaterRipplePool();
  assert.equal(countActiveWaterRipples(pool), 0);

  // Reject dry land impacts (e.g., at the lantern or sakura bank)
  assert.equal(tryTriggerWaterRipple(pool, LANTERN_ANCHOR.x, LANTERN_ANCHOR.z, 2.0), false);
  assert.equal(countActiveWaterRipples(pool), 0);

  // Accept valid open-water impact
  assert.equal(tryTriggerWaterRipple(pool, -0.5, -3.2, 2.0), true);
  assert.equal(countActiveWaterRipples(pool), 1);

  // Cooldown rejects immediate second impact
  assert.equal(tryTriggerWaterRipple(pool, -2.5, -4.5, 2.0 + RIPPLE_MIN_COOLDOWN_SECONDS * 0.4), false);

  // Spacing rejects impact too close to an active ring even after cooldown
  assert.equal(tryTriggerWaterRipple(pool, -0.3, -3.1, 2.0 + RIPPLE_MIN_COOLDOWN_SECONDS + 0.1), false);

  // Accept well-spaced subsequent ripple up to MAX_CONCURRENT_ACTIVE_RIPPLES (2)
  const t2 = 2.0 + RIPPLE_MIN_COOLDOWN_SECONDS + 0.2;
  assert.equal(tryTriggerWaterRipple(pool, -2.6, -4.4, t2), true);
  assert.equal(countActiveWaterRipples(pool), MAX_CONCURRENT_ACTIVE_RIPPLES);

  // Cap rejects extra concurrent ripples while active ones are still expanding
  const t3 = t2 + RIPPLE_MIN_COOLDOWN_SECONDS + 0.2;
  assert.equal(tryTriggerWaterRipple(pool, 0.8, -1.6, t3), false);

  // Advancing time expires old ripples cleanly so pool slots recycle
  for (let i = 0; i < 60; i++) {
    advanceWaterRipples(pool, 0.1);
  }
  assert.equal(countActiveWaterRipples(pool), 0);

  // Initial calm seeding places 1 subtle open-water ring without overcrowding
  seedInitialCalmRipples(pool);
  const seededCount = countActiveWaterRipples(pool);
  assert.equal(seededCount, 1, `seededCount=${seededCount} should be 1`);

  // Water surface micro-swell stays bounded closely around WATER_LEVEL
  const ySample = sampleWaterSurfaceY(-1.2, -3.0, 4.5, WIND_DIRECTION.x, WIND_DIRECTION.z);
  assert.ok(Math.abs(ySample - WATER_LEVEL) < 0.02, 'lake surface swell must remain calm and low-amplitude');
});

