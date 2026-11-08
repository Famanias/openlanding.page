import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  clamp01,
  segment,
  smoothstep,
  computeStoryState,
  validateWaitlistInput,
} from './motion';
import {
  KAIRO_ASSETS,
  getSequenceFrameUrl,
  CITY_HOTSPOTS,
  APERTURE_PRESETS,
  ENGINEERING_CALLOUTS,
  CAMERA_FINISHES,
} from './assets';

test('clamp01 and segment bound scroll progress accurately', () => {
  assert.equal(clamp01(-0.5), 0);
  assert.equal(clamp01(0.45), 0.45);
  assert.equal(clamp01(1.8), 1);

  assert.equal(segment(0.1, 0.2, 0.6), 0);
  assert.ok(Math.abs(segment(0.4, 0.2, 0.6) - 0.5) < 1e-9);
  assert.equal(segment(0.8, 0.2, 0.6), 1);
  assert.equal(smoothstep(0), 0);
  assert.equal(smoothstep(0.5), 0.5);
  assert.equal(smoothstep(1), 1);
});

test('computeStoryState transitions deterministically through all 6 beats and reverses cleanly', () => {
  const start = computeStoryState(0);
  assert.equal(start.beat, 'hero');
  assert.equal(start.stepNumber, 1);
  assert.equal(start.sequenceFrame, 1);
  assert.equal(start.heroOpacity, 1);
  assert.equal(start.fieldNotesInteractive, false);

  const approach = computeStoryState(0.2);
  assert.equal(approach.beat, 'approach');
  assert.equal(approach.stepNumber, 2);
  assert.ok(approach.sequenceFrame > 1 && approach.sequenceFrame < 60);

  const aperture = computeStoryState(0.38);
  assert.equal(aperture.beat, 'aperture');
  assert.equal(aperture.stepNumber, 3);
  assert.ok(aperture.apertureOpacity > 0.8);
  assert.ok(aperture.sequenceFrame >= 50 && aperture.sequenceFrame <= 95);

  const arrival = computeStoryState(0.56);
  assert.equal(arrival.beat, 'arrival');
  assert.equal(arrival.stepNumber, 4);
  assert.ok(arrival.arrivalOpacity > 0.7);

  const fieldNotes = computeStoryState(0.75);
  assert.equal(fieldNotes.beat, 'field-notes');
  assert.equal(fieldNotes.stepNumber, 5);
  assert.equal(fieldNotes.sequenceFrame, 120);
  assert.equal(fieldNotes.fieldNotesInteractive, true);
  assert.ok(fieldNotes.fieldNotesOpacity > 0.9);

  const handoff = computeStoryState(0.95);
  assert.equal(handoff.beat, 'handoff');
  assert.equal(handoff.stepNumber, 6);
  assert.equal(handoff.sequenceFrame, 120);
  assert.ok(handoff.handoffProgress > 0.5);
});

test('asset URLs use /templates/kairok/ prefix and never reference raw green-screen PNG', () => {
  for (const [key, value] of Object.entries(KAIRO_ASSETS)) {
    if (typeof value === 'string') {
      assert.ok(value.startsWith('/templates/kairok/'), `Asset ${key} must start with /templates/kairok/`);
      assert.notEqual(
        value,
        '/templates/kairok/kairo-02-camera-cutout.png',
        'Must never reference unkeyed green-matte PNG directly'
      );
    }
  }
  assert.equal(getSequenceFrameUrl(1), '/templates/kairok/sequence/frame-001.webp');
  assert.equal(getSequenceFrameUrl(120), '/templates/kairok/sequence/frame-120.webp');
  assert.equal(CITY_HOTSPOTS.length, 4);
  assert.equal(APERTURE_PRESETS.length, 3);
  assert.equal(ENGINEERING_CALLOUTS.length, 3);
  assert.equal(CAMERA_FINISHES.length, 3);
});

test('validateWaitlistInput rejects empty and malformed emails and normalizes valid emails', () => {
  assert.equal(validateWaitlistInput('').valid, false);
  assert.equal(validateWaitlistInput('not-an-email').valid, false);
  const valid = validateWaitlistInput('  Photographer@KairoOptics.com ');
  assert.equal(valid.valid, true);
  assert.equal(valid.normalizedEmail, 'photographer@kairooptics.com');
});
