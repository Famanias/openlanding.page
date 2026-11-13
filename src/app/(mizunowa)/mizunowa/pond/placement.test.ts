import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  PlacementRegistry,
  computeCollisionFreeStreamTrajectory,
  pointInRotatedEllipse,
  type ExclusionFootprint,
} from './placement';
import {
  WATERFALL_IMPACT_POINT,
  WATERFALL_SOURCE_POINT,
  isInsideNaturalPond,
  sampleTerrain,
  terrainElevation,
} from './model';
import { getSubmergedStoneFootprints } from './water';

test('pointInRotatedEllipse accurately tests rotated ellipses with clearance', () => {
  const fp: ExclusionFootprint = {
    kind: 'rock',
    x: 2.0,
    z: -1.0,
    rx: 0.8,
    rz: 0.35,
    yaw: Math.PI / 4,
    margin: 0.05,
  };

  // Center is always inside
  assert.equal(pointInRotatedEllipse(2.0, -1.0, fp), true);

  // Point along rotated major axis (+0.7m in world local X) should be inside
  const cos = Math.cos(fp.yaw!);
  const sin = Math.sin(fp.yaw!);
  const alongX = fp.x + 0.7 * cos;
  const alongZ = fp.z - 0.7 * sin;
  assert.equal(pointInRotatedEllipse(alongX, alongZ, fp), true);

  // Point at same 0.7m distance along minor axis should be outside (since rz + margin = 0.40)
  const orthoX = fp.x + 0.7 * sin;
  const orthoZ = fp.z + 0.7 * cos;
  assert.equal(pointInRotatedEllipse(orthoX, orthoZ, fp), false);

  // Adding 0.35 clearance expands minor axis to 0.75 so ortho point becomes excluded
  assert.equal(pointInRotatedEllipse(orthoX, orthoZ, fp, 0.35), true);
});

test('PlacementRegistry spatial hash enforces rock, tree, shrine, stepStone, and shore exclusions for vegetation', () => {
  const registry = new PlacementRegistry(1.2);
  registry.register({ id: 'shoreRock', kind: 'rock', x: 3.1, z: 2.0, rx: 0.65, rz: 0.5, margin: 0.12 });
  registry.register({ id: 'sakuraRoot', kind: 'tree', x: 3.55, z: -0.95, rx: 0.72, rz: 0.72, margin: 0.15 });
  registry.register({ id: 'stepStone', kind: 'stepStone', x: -3.2, z: 0.5, rx: 0.52, rz: 0.38, margin: 0.1 });

  // Inside rock footprint -> rejected
  assert.equal(
    registry.isVegetationValid({
      x: 3.25,
      z: 2.05,
      clearance: 0.08,
      shoreDistance: 0.4,
      slope: 0.08,
    }),
    false,
  );

  // Inside sakura root footprint -> rejected
  assert.equal(
    registry.isVegetationValid({
      x: 3.8,
      z: -0.75,
      clearance: 0.1,
      shoreDistance: 0.65,
      slope: 0.12,
    }),
    false,
  );

  // Inside stepping stone -> rejected
  assert.equal(
    registry.isVegetationValid({
      x: -3.15,
      z: 0.52,
      clearance: 0.08,
      shoreDistance: 0.85,
      slope: 0.05,
    }),
    false,
  );

  // Steep slope -> rejected
  assert.equal(
    registry.isVegetationValid({
      x: 4.5,
      z: -2.5,
      clearance: 0.08,
      shoreDistance: 1.5,
      slope: 0.55,
      maxSlope: 0.35,
    }),
    false,
  );

  // Open mossy ground away from all footprints -> accepted
  const openPt = { x: 4.15, z: -2.85 };
  const sample = sampleTerrain(openPt);
  assert.equal(
    registry.isVegetationValid({
      x: openPt.x,
      z: openPt.z,
      clearance: 0.1,
      shoreDistance: sample.shoreDistance,
      slope: sample.slope,
    }),
    true,
  );
});

test('computeCollisionFreeStreamTrajectory clears terrain and bank boulders and lands in open water', () => {
  const obstacles: ExclusionFootprint[] = [
    // Pot base
    { id: 'pot', kind: 'waterFeature', x: WATERFALL_SOURCE_POINT.x, z: WATERFALL_SOURCE_POINT.z, rx: 0.42, rz: 0.42, topY: 0.68 },
    // Flanking side rocks strictly off the central channel
    { id: 'rockL', kind: 'rock', x: 3.25, z: 1.12, rx: 0.36, rz: 0.34, topY: 0.34 },
    { id: 'rockR', kind: 'rock', x: 3.25, z: -0.05, rx: 0.36, rz: 0.34, topY: 0.34 },
    // Hypothetical low shoreline stone near edge that the stream must arch cleanly above or land past
    { id: 'lowShelf', kind: 'cobble', x: 2.86, z: 0.51, rx: 0.2, rz: 0.22, topY: 0.08 },
  ];

  const sourceHeight = terrainElevation(WATERFALL_SOURCE_POINT.x, WATERFALL_SOURCE_POINT.z);
  const traj = computeCollisionFreeStreamTrajectory({
    source: {
      x: WATERFALL_SOURCE_POINT.x - 0.28,
      y: sourceHeight + 0.52,
      z: WATERFALL_SOURCE_POINT.z - 0.02,
    },
    target: {
      x: WATERFALL_IMPACT_POINT.x,
      y: 0.004,
      z: WATERFALL_IMPACT_POINT.z,
    },
    obstacles,
    terrainHeightFn: terrainElevation,
    isInsideWaterFn: isInsideNaturalPond,
  });

  assert.equal(traj.clearedAll, true, `Expected unobstructed stream clearance, got terrainGap=${traj.minTerrainClearance}, obsGap=${traj.minObstacleClearance}`);
  assert.ok(traj.minTerrainClearance >= 0.045);
  assert.equal(isInsideNaturalPond({ x: traj.landing.x, z: traj.landing.z }, 0.22), true);
});

test('submerged pond stones remain strictly beneath water surface and clear of waterfall landing impact', () => {
  const submerged = getSubmergedStoneFootprints();
  assert.ok(submerged.length >= 10);

  for (const stone of submerged) {
    assert.ok(
      (stone.topY ?? 0) <= -0.055,
      `Submerged stone ${stone.id} topY=${stone.topY} breaks/grazes water surface`,
    );
    assert.equal(
      pointInRotatedEllipse(WATERFALL_IMPACT_POINT.x, WATERFALL_IMPACT_POINT.z, stone, 0.22),
      false,
      `Submerged stone ${stone.id} lies inside waterfall landing basin`,
    );
  }

  // Passing all submerged stones plus a hypothetical blocking stone forces collision avoidance to steer clear
  const sourceHeight = terrainElevation(WATERFALL_SOURCE_POINT.x, WATERFALL_SOURCE_POINT.z);
  const blocker: ExclusionFootprint = {
    id: 'hypothetical-sub-blocker',
    kind: 'submergedRock',
    x: WATERFALL_IMPACT_POINT.x,
    z: WATERFALL_IMPACT_POINT.z,
    rx: 0.28,
    rz: 0.28,
    topY: -0.06,
  };
  const diverted = computeCollisionFreeStreamTrajectory({
    source: { x: WATERFALL_SOURCE_POINT.x - 0.3, y: sourceHeight + 0.38, z: WATERFALL_SOURCE_POINT.z },
    target: { x: WATERFALL_IMPACT_POINT.x, y: 0.004, z: WATERFALL_IMPACT_POINT.z },
    obstacles: [...submerged, blocker],
    terrainHeightFn: terrainElevation,
    isInsideWaterFn: isInsideNaturalPond,
  });

  assert.equal(pointInRotatedEllipse(diverted.landing.x, diverted.landing.z, blocker, 0.18), false);
  assert.equal(isInsideNaturalPond({ x: diverted.landing.x, z: diverted.landing.z }, 0.28), true);
});

test('PlacementRegistry enforces lantern and shrub exclusions alongside rocks and trees', () => {
  const registry = new PlacementRegistry(1.25);
  registry.register({ id: 'lantern-1', kind: 'lantern', x: -0.82, z: -4.28, rx: 0.38, rz: 0.38, margin: 0.14 });
  registry.register({ id: 'shrub-1', kind: 'shrub', x: 2.65, z: -5.05, rx: 0.32, rz: 0.32, margin: 0.08 });

  assert.equal(
    registry.isVegetationValid({
      x: -0.9,
      z: -4.22,
      clearance: 0.12,
      shoreDistance: 0.9,
      slope: 0.08,
    }),
    false,
  );
  assert.equal(
    registry.isVegetationValid({
      x: 2.7,
      z: -5.02,
      clearance: 0.12,
      shoreDistance: 1.8,
      slope: 0.1,
    }),
    false,
  );
});
