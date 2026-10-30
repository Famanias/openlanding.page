import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  COLLECTION_ITEMS,
  MORTA_ASSETS,
  compute3DReliquaryAssembly,
  computeAssemblyState,
  computeHouseRingStudyPose,
  validateCommissionForm,
} from './mortaLogic';

test('MORTA assets and collection items match required filenames and numbering 01-03', () => {
  assert.equal(COLLECTION_ITEMS.length, 3);
  assert.deepEqual(
    COLLECTION_ITEMS.map((item) => item.number),
    ['01', '02', '03']
  );
  assert.deepEqual(
    COLLECTION_ITEMS.map((item) => item.name),
    ['Reliquary', 'Thorn', 'Vigil']
  );
  assert.equal(MORTA_ASSETS.hero.filename, 'morta-hero.png');
  assert.equal(MORTA_ASSETS.reliquaryRing.filename, 'morta-reliquary-ring.png');
  assert.equal(MORTA_ASSETS.thornPendant.filename, 'morta-thorn-pendant.png');
  assert.equal(MORTA_ASSETS.vigilEarrings.filename, 'morta-vigil-earrings.png');
  assert.equal(MORTA_ASSETS.craft.filename, 'morta-craft.png');
  assert.equal(MORTA_ASSETS.bespoke.filename, 'morta-bespoke.png');
});

test('compute3DReliquaryAssembly progresses through Dispersed, Converging, Aligning, and Locked Ring stages', () => {
  const stage1 = compute3DReliquaryAssembly(0, false);
  assert.equal(stage1.stageIndex, 0);
  assert.equal(stage1.isLocked, false);
  assert.ok(stage1.parts.outerBezel.position[2] > 1.0);
  assert.ok(stage1.parts.leftShoulder.position[0] < -1.0);
  assert.ok(stage1.parts.rightShoulder.position[0] > 1.0);
  assert.ok(stage1.parts.lowerShank.position[2] < -1.0);

  const stage2 = compute3DReliquaryAssembly(0.35, false);
  assert.equal(stage2.stageIndex, 1);
  assert.ok(
    stage2.parts.outerBezel.clearanceMm < stage1.parts.outerBezel.clearanceMm
  );

  const stage3 = compute3DReliquaryAssembly(0.65, false);
  assert.equal(stage3.stageIndex, 2);
  // By Stage 3 (Aligning), rotations are axially aligned while a small clearance remains
  assert.deepEqual(stage3.parts.outerBezel.rotation, [0, 0, 0]);
  assert.deepEqual(stage3.parts.leftShoulder.rotation, [0, 0, 0]);
  assert.ok(stage3.parts.outerBezel.clearanceMm > 0);
  assert.ok(
    stage3.parts.outerBezel.clearanceMm < stage2.parts.outerBezel.clearanceMm
  );

  const stage4 = compute3DReliquaryAssembly(1, false);
  assert.equal(stage4.stageIndex, 3);
  assert.equal(stage4.isLocked, true);
  assert.deepEqual(stage4.parts.outerBezel.position, [0, 0, 0]);
  assert.deepEqual(stage4.parts.recessedChamber.position, [0, 0, 0]);
  assert.deepEqual(stage4.parts.leftShoulder.position, [0, 0, 0]);
  assert.deepEqual(stage4.parts.rightShoulder.position, [0, 0, 0]);
  assert.deepEqual(stage4.parts.lowerShank.position, [0, 0, 0]);
  assert.equal(stage4.parts.outerBezel.clearanceMm, 0);
});

test('computeAssemblyState honours reduced-motion default lock while allowing static stage button switching', () => {
  const reducedDefault = computeAssemblyState(0, true, false);
  assert.equal(reducedDefault.isLocked, true);
  assert.equal(reducedDefault.stageIndex, 3);
  assert.deepEqual(
    reducedDefault.assembly3D.parts.outerBezel.position,
    [0, 0, 0]
  );

  // When a reduced-motion user explicitly selects Stage 1 (Dispersed), static position updates without animation
  const reducedExplicitStage1 = computeAssemblyState(0, true, true);
  assert.equal(reducedExplicitStage1.stageIndex, 0);
  assert.equal(reducedExplicitStage1.isLocked, false);
  assert.ok(
    reducedExplicitStage1.assembly3D.parts.outerBezel.position[2] > 1.0
  );
});

test('computeHouseRingStudyPose settles into view, oscillates gently when idle, and stays static under reduced motion', () => {
  const initialPose = computeHouseRingStudyPose(0, 0, 0, false, false);
  assert.equal(initialPose.isSettled, false);
  assert.ok(initialPose.settleOffsetY < 0);
  assert.ok(initialPose.distance > 6.35);

  const settledPose = computeHouseRingStudyPose(2.0, 0, 0, false, false);
  assert.equal(settledPose.isSettled, true);
  assert.equal(settledPose.settleOffsetY, 0);
  assert.equal(settledPose.distance, 6.35);
  assert.notEqual(settledPose.azimuth, 0.70); // gentle slow rotation active

  // Under prefers-reduced-motion, no entrance offset or automatic rotation occurs, while user inspection offsets still apply
  const reducedPose = computeHouseRingStudyPose(0.5, 0.25, -0.1, true, false);
  assert.equal(reducedPose.isSettled, true);
  assert.equal(reducedPose.settleOffsetY, 0);
  assert.equal(reducedPose.distance, 6.35);
  assert.equal(reducedPose.azimuth, 0.95);
  assert.equal(reducedPose.elevation, 0.30);
});

test('validateCommissionForm rejects empty or invalid inputs and accepts complete enquiry', () => {
  const emptyResult = validateCommissionForm({
    name: '',
    email: '',
    pieceReference: '',
    description: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.pieceReference);
  assert.ok(emptyResult.errors.description);

  const badEmailResult = validateCommissionForm({
    name: 'Elena Vance',
    email: 'elena-at-vance',
    pieceReference: 'Bespoke Signet Study',
    description: 'Too short',
  });
  assert.equal(badEmailResult.isValid, false);
  assert.ok(badEmailResult.errors.email);
  assert.ok(badEmailResult.errors.description);

  const validResult = validateCommissionForm({
    name: 'Elena Vance',
    email: 'elena@vance.studio',
    pieceReference: 'Reliquary Signet Variation',
    description:
      'Looking to commission a sterling signet ring with a narrower lancet aperture in size M.',
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});
