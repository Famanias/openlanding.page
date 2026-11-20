import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  advanceTimelineState,
  computeViewportTransform,
  evaluateFlowerGrowth,
  evaluateTimeline,
  getPhaseForTime,
  LOOP_DISSOLVE_SEC,
  LOOP_HOLD_SEC,
  TIMELINE_DURATION_SEC,
} from './timeline';
import { FLOWERS } from './composition';

test('master timeline maps all 8 artistic phases cleanly across 0..18s', () => {
  assert.equal(getPhaseForTime(0).id, 'phase-01');
  assert.equal(getPhaseForTime(1.9).id, 'phase-01');
  assert.equal(getPhaseForTime(2.5).id, 'phase-02');
  assert.equal(getPhaseForTime(5.0).id, 'phase-03');
  assert.equal(getPhaseForTime(7.2).id, 'phase-04');
  assert.equal(getPhaseForTime(10.5).id, 'phase-05');
  assert.equal(getPhaseForTime(13.2).id, 'phase-06');
  assert.equal(getPhaseForTime(15.5).id, 'phase-07');
  assert.equal(getPhaseForTime(17.5).id, 'phase-08');
  assert.equal(getPhaseForTime(18.0).id, 'phase-08');
});

test('timeline evaluation is deterministic for arbitrary forward and backward scrubbing', () => {
  const first = evaluateTimeline(9.75, { ambientClockSec: 0 });
  const second = evaluateTimeline(9.75, { ambientClockSec: 0 });
  assert.deepEqual(first, second);
  assert.equal(first.progress, 9.75 / TIMELINE_DURATION_SEC);
  assert.equal(first.phase.id, 'phase-05');
});

test('reduced-motion mode resolves immediately to completed artwork with zero ambient weight', () => {
  const snap = evaluateTimeline(0.5, { reducedMotion: true, ambientClockSec: 12 });
  assert.equal(snap.timeSec, TIMELINE_DURATION_SEC);
  assert.equal(snap.progress, 1);
  assert.equal(snap.phase.id, 'phase-08');
  assert.equal(snap.ambientWeight, 0);
});

test('default playback holds completed artwork at 18s without auto-restarting', () => {
  const res = advanceTimelineState({
    timeSec: 17.95,
    loopPhase: 'playing',
    loopTimerSec: 0,
    isPlaying: true,
    loop: false,
    speed: 1,
    dtSec: 0.1,
  });
  assert.equal(res.timeSec, TIMELINE_DURATION_SEC);
  assert.equal(res.isPlaying, false);
  assert.equal(res.loopPhase, 'playing');
  assert.equal(res.visibilityEnvelope, 1);
});

test('loop mode holds for ~3s, dissolves back toward blank paper, and restarts cleanly', () => {
  const hitEnd = advanceTimelineState({
    timeSec: 17.96,
    loopPhase: 'playing',
    loopTimerSec: 0,
    isPlaying: true,
    loop: true,
    speed: 1,
    dtSec: 0.1,
  });
  assert.equal(hitEnd.loopPhase, 'holding');
  assert.equal(hitEnd.timeSec, TIMELINE_DURATION_SEC);
  assert.equal(hitEnd.isPlaying, true);

  const afterHold = advanceTimelineState({
    timeSec: TIMELINE_DURATION_SEC,
    loopPhase: 'holding',
    loopTimerSec: LOOP_HOLD_SEC - 0.02,
    isPlaying: true,
    loop: true,
    speed: 1,
    dtSec: 0.05,
  });
  assert.equal(afterHold.loopPhase, 'dissolving');

  const midDissolve = advanceTimelineState({
    timeSec: TIMELINE_DURATION_SEC,
    loopPhase: 'dissolving',
    loopTimerSec: LOOP_DISSOLVE_SEC * 0.6,
    isPlaying: true,
    loop: true,
    speed: 1,
    dtSec: 0.05,
  });
  assert.equal(midDissolve.loopPhase, 'dissolving');
  assert.ok(midDissolve.timeSec < TIMELINE_DURATION_SEC);
  assert.ok(midDissolve.visibilityEnvelope < 1);

  const restarted = advanceTimelineState({
    timeSec: 1.0,
    loopPhase: 'dissolving',
    loopTimerSec: LOOP_DISSOLVE_SEC - 0.01,
    isPlaying: true,
    loop: true,
    speed: 1,
    dtSec: 0.05,
  });
  assert.equal(restarted.loopPhase, 'playing');
  assert.equal(restarted.timeSec, 0);
  assert.equal(restarted.visibilityEnvelope, 1);
});

test('bloom choreography opens small burgundy flower before charcoal rose and primary dusty peony', () => {
  const wildAnemone = FLOWERS.find((f) => f.id === 'flower-wild-anemone')!;
  const charcoalRose = FLOWERS.find((f) => f.id === 'flower-charcoal-rose')!;
  const focalPeony = FLOWERS.find((f) => f.id === 'flower-focal-peony')!;
  const burgundyRose = FLOWERS.find((f) => f.id === 'flower-burgundy-rose')!;

  assert.ok(wildAnemone.bloomStartSec < charcoalRose.bloomStartSec);
  assert.ok(charcoalRose.bloomStartSec < focalPeony.bloomStartSec);
  assert.ok(focalPeony.bloomStartSec < burgundyRose.bloomStartSec);

  // At t = 8.4s: wild anemone has already begun opening, while focal peony is still in tight bud
  const gAnemone = evaluateFlowerGrowth(wildAnemone, 8.4, true);
  const gPeony = evaluateFlowerGrowth(focalPeony, 8.4, true);
  assert.ok(gAnemone.outerOpen > 0.1);
  assert.equal(gPeony.outerOpen, 0);
  assert.ok(gPeony.budProgress > 0.4);
});

test('responsive viewport transform preserves negative space on desktop and focal cluster on mobile', () => {
  const desktop = computeViewportTransform(1440, 900);
  assert.equal(desktop.isMobile, false);
  // Right edge of virtual artwork aligns with desktop right edge
  assert.ok(Math.abs(desktop.offsetX + desktop.virtualWidth * desktop.scale - 1440) < 1);

  const mobile = computeViewportTransform(390, 844);
  assert.equal(mobile.isMobile, true);
  // Focal dusty peony (1495, 550) must be clearly visible inside mobile viewport bounds
  const peonyScreenX = mobile.offsetX + 1495 * mobile.scale;
  const peonyScreenY = mobile.offsetY + 550 * mobile.scale;
  assert.ok(peonyScreenX > 40 && peonyScreenX < 350, `Expected peony X in frame, got ${peonyScreenX}`);
  assert.ok(peonyScreenY > 240 && peonyScreenY < 760, `Expected peony Y in lower frame, got ${peonyScreenY}`);
});
