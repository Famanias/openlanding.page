import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DAY_NIGHT_CYCLE_DURATION_SECONDS,
  computeCyclePhase,
  evaluateDayNightPalette,
  getCyclePeriodLabel,
} from './day-night-cycle';
import {
  HIRAJOSHI_CHIME_FREQUENCIES,
  computeNextIntervalMs,
  selectChimeFrequency,
} from './ambient-audio';

test('computeCyclePhase wraps cleanly over the 30-second duration', () => {
  assert.equal(DAY_NIGHT_CYCLE_DURATION_SECONDS, 30);
  assert.equal(computeCyclePhase(0), 0);
  assert.equal(computeCyclePhase(15), 0.5);
  assert.equal(computeCyclePhase(30), 0);
  assert.ok(Math.abs(computeCyclePhase(45) - 0.5) < 1e-9);
  assert.ok(Math.abs(computeCyclePhase(7.5, 30, 0.5) - 0.75) < 1e-9);
});

test('evaluateDayNightPalette transitions seamlessly across Dawn, Day, Dusk, Night and wraps cleanly', () => {
  const dawnStart = evaluateDayNightPalette(0.0);
  const dawnWrap = evaluateDayNightPalette(1.0);
  const day = evaluateDayNightPalette(0.25);
  const dusk = evaluateDayNightPalette(0.5);
  const night = evaluateDayNightPalette(0.75);

  // Seamless periodic wrap at 0s and 30s
  assert.equal(dawnStart.ambientIntensity, dawnWrap.ambientIntensity);
  assert.deepEqual(dawnStart.ambientColor, dawnWrap.ambientColor);
  assert.deepEqual(dawnStart.skyZenith, dawnWrap.skyZenith);

  // Period labels
  assert.equal(getCyclePeriodLabel(0.0), 'Dawn');
  assert.equal(getCyclePeriodLabel(0.25), 'Day');
  assert.equal(getCyclePeriodLabel(0.5), 'Dusk');
  assert.equal(getCyclePeriodLabel(0.75), 'Night');

  // Ambient & key lighting are brightest during Day and dimmest at Night
  assert.ok(day.ambientIntensity > dawnStart.ambientIntensity);
  assert.ok(dawnStart.ambientIntensity > night.ambientIntensity);
  assert.ok(day.hemiIntensity > dusk.hemiIntensity);
  assert.ok(dusk.hemiIntensity > night.hemiIntensity);

  // Stone lantern glows brightest at Night and dimmest during Day
  assert.ok(night.lanternEmissiveIntensity > dusk.lanternEmissiveIntensity);
  assert.ok(dusk.lanternEmissiveIntensity > day.lanternEmissiveIntensity);
  assert.ok(night.starOpacity > 0.75 && day.starOpacity === 0);
});

test('ambient audio helpers return valid Hirajoshi pentatonic frequencies and bounded intervals', () => {
  for (const r of [0, 0.25, 0.5, 0.88, 1]) {
    const freq = selectChimeFrequency(r);
    assert.ok(HIRAJOSHI_CHIME_FREQUENCIES.includes(freq));
  }

  assert.equal(computeNextIntervalMs(2000, 5000, 0), 2000);
  assert.equal(computeNextIntervalMs(2000, 5000, 1), 5000);
  assert.equal(computeNextIntervalMs(2000, 5000, 0.5), 3500);
});
