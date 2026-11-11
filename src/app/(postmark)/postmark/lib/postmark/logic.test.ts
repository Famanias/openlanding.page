import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  POSTCARD_NOTE_MAX_LENGTH,
  computeCurvedRouteGeometry,
  createInitialBuilderState,
  getBuilderStageFromProgress,
  getProgressForBuilderStage,
  getRemainingNoteChars,
  isPointInPostageZone,
  sanitizePostcardNote,
  selectBuilderDestination,
  validateDemoEmail,
} from './logic';

test('builder scroll progress maps cleanly across all three dwell plateaus (1/3, 2/3, 3/3)', () => {
  const start = getBuilderStageFromProgress(0);
  assert.equal(start.activeStage, 0);
  assert.equal(start.stepCounterLabel, '1/3');
  assert.deepEqual(start.stageWeights, [1, 0, 0]);

  const stage1Mid = getBuilderStageFromProgress(0.22);
  assert.equal(stage1Mid.activeStage, 0);
  assert.equal(stage1Mid.stepCounterLabel, '1/3');

  const stage2Mid = getBuilderStageFromProgress(0.48);
  assert.equal(stage2Mid.activeStage, 1);
  assert.equal(stage2Mid.stepCounterLabel, '2/3');
  assert.deepEqual(stage2Mid.stageWeights, [0, 1, 0]);

  const stage3Mid = getBuilderStageFromProgress(0.80);
  assert.equal(stage3Mid.activeStage, 2);
  assert.equal(stage3Mid.stepCounterLabel, '3/3');
  assert.deepEqual(stage3Mid.stageWeights, [0, 0, 1]);

  const end = getBuilderStageFromProgress(1);
  assert.equal(end.activeStage, 2);
  assert.equal(end.stepCounterLabel, '3/3');
  assert.deepEqual(end.stageWeights, [0, 0, 1]);
});

test('manual stage target progress lands strictly inside each stage dwell plateau', () => {
  for (const stage of [0, 1, 2] as const) {
    const targetProgress = getProgressForBuilderStage(stage);
    const resolved = getBuilderStageFromProgress(targetProgress);
    assert.equal(resolved.activeStage, stage);
    assert.equal(resolved.stageWeights[stage], 1);
  }
});

test('postcard note sanitization enforces 180 character limit and remaining count', () => {
  const longText = 'A'.repeat(225);
  const sanitized = sanitizePostcardNote(longText);
  assert.equal(sanitized.length, POSTCARD_NOTE_MAX_LENGTH);
  assert.equal(getRemainingNoteChars(sanitized), 0);
  assert.equal(getRemainingNoteChars('Hello Lisbon'), POSTCARD_NOTE_MAX_LENGTH - 12);
});

test('destination switching updates defaults while optionally preserving user custom note', () => {
  const initial = createInitialBuilderState('lisbon');
  assert.equal(initial.destinationId, 'lisbon');

  const switchedSample = selectBuilderDestination(initial, 'kyoto', true);
  assert.equal(switchedSample.destinationId, 'kyoto');
  assert.ok(switchedSample.note.includes('Cedar rain'));

  const customEdited = { ...switchedSample, note: 'My own handwritten memory from Gion.' };
  const switchedPreserved = selectBuilderDestination(customEdited, 'copenhagen', true);
  assert.equal(switchedPreserved.destinationId, 'copenhagen');
  assert.equal(switchedPreserved.note, 'My own handwritten memory from Gion.');
});

test('postage drop zone hit-testing supports direct hit and magnet margin', () => {
  const zone = { left: 400, top: 200, right: 520, bottom: 340 };
  assert.equal(isPointInPostageZone({ x: 460, y: 270 }, zone), true);
  assert.equal(isPointInPostageZone({ x: 380, y: 210 }, zone, 28), true);
  assert.equal(isPointInPostageZone({ x: 120, y: 80 }, zone, 28), false);
});

test('curved SVG route geometry interpolates start, midpoint, and end coordinates', () => {
  const from = { x: 200, y: 300 };
  const to = { x: 700, y: 260 };
  const atStart = computeCurvedRouteGeometry(from, to, 0);
  const atMid = computeCurvedRouteGeometry(from, to, 0.5);
  const atEnd = computeCurvedRouteGeometry(from, to, 1);

  assert.deepEqual(atStart.point, from);
  assert.deepEqual(atEnd.point, to);
  assert.ok(atMid.point.y < Math.min(from.y, to.y), 'arch lifts upward at midpoint');
  assert.ok(atMid.svgPath.startsWith('M 200.0 300.0 Q '));
});

test('demo email validation rejects empty or malformed addresses and normalizes valid input', () => {
  assert.equal(validateDemoEmail('   ').valid, false);
  assert.equal(validateDemoEmail('not-an-email').valid, false);
  const ok = validateDemoEmail('  Clara.Voyage@Postmark.example  ');
  assert.equal(ok.valid, true);
  assert.equal(ok.normalized, 'clara.voyage@postmark.example');
});
