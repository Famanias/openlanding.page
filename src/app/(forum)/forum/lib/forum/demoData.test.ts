import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  INITIAL_SIGNALS,
  filterAndSortSignals,
  resolveSelectedSignalId,
  toggleSignalReviewStatus,
  formatSignalBriefForClipboard,
  generateManifestoDots,
} from './demoData';

test('filterAndSortSignals filters by category and sorts deterministically by RECENT and PRIORITY', () => {
  const allRecent = filterAndSortSignals(INITIAL_SIGNALS, 'ALL', 'RECENT');
  assert.equal(allRecent.length, 4);
  assert.equal(allRecent[0].id, 'sig-contact-01');

  const allPriority = filterAndSortSignals(INITIAL_SIGNALS, 'ALL', 'PRIORITY');
  assert.equal(allPriority.length, 4);
  assert.equal(allPriority[0].id, 'sig-pipeline-02');

  const onlyPipeline = filterAndSortSignals(INITIAL_SIGNALS, 'PIPELINE', 'RECENT');
  assert.equal(onlyPipeline.length, 1);
  assert.equal(onlyPipeline[0].category, 'PIPELINE');
});

test('resolveSelectedSignalId preserves valid selection or falls back deterministically to first visible', () => {
  const onlyForecast = filterAndSortSignals(INITIAL_SIGNALS, 'FORECAST', 'RECENT');
  const resolvedWhenExcluded = resolveSelectedSignalId(onlyForecast, 'sig-contact-01');
  assert.equal(resolvedWhenExcluded, 'sig-forecast-04');

  const resolvedWhenValid = resolveSelectedSignalId(INITIAL_SIGNALS, 'sig-followup-03');
  assert.equal(resolvedWhenValid, 'sig-followup-03');
});

test('toggleSignalReviewStatus toggles between ACTIVE and REVIEWED immutably', () => {
  const updated = toggleSignalReviewStatus(INITIAL_SIGNALS, 'sig-contact-01');
  assert.equal(updated[0].status, 'REVIEWED');
  assert.equal(INITIAL_SIGNALS[0].status, 'ACTIVE');

  const reverted = toggleSignalReviewStatus(updated, 'sig-contact-01');
  assert.equal(reverted[0].status, 'ACTIVE');
});

test('formatSignalBriefForClipboard includes title, category, next move, and concept disclaimer', () => {
  const text = formatSignalBriefForClipboard(INITIAL_SIGNALS[0]);
  assert.ok(text.includes(INITIAL_SIGNALS[0].title));
  assert.ok(text.includes(INITIAL_SIGNALS[0].suggestedNextAction));
  assert.ok(text.includes('no live CRM connection'));
});

test('generateManifestoDots creates 72 deterministic nodes within SVG bounds', () => {
  const dots = generateManifestoDots(72);
  assert.equal(dots.length, 72);
  for (const d of dots) {
    assert.ok(d.noiseX >= 0 && d.noiseX <= 720);
    assert.ok(d.noiseY >= 0 && d.noiseY <= 320);
    assert.ok(d.gridX >= 0 && d.gridX <= 720);
    assert.ok(d.gridY >= 0 && d.gridY <= 320);
  }
});
