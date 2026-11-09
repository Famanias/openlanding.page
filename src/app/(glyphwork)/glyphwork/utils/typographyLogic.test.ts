import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  DEFAULT_AXES,
  DEFAULT_SNAPSHOT,
  buildFontVariationSettings,
  formatTrackingDisplay,
  formatTrackingCss,
  formatSlantDisplay,
  computeGuideMetrics,
  applyCaseTransform,
  pushHistory,
  popHistory,
  computeLiveGlyphMetrics,
  calculateLicenseQuote,
  validateSpecimenEmail,
} from './typographyLogic';

test('default variable axes match GLYPHWORK reference specifications', () => {
  assert.equal(DEFAULT_AXES.weight, 720);
  assert.equal(DEFAULT_AXES.width, 135);
  assert.equal(DEFAULT_AXES.tracking, -4);
  assert.equal(DEFAULT_AXES.slant, 3.5);
  assert.equal(formatTrackingDisplay(DEFAULT_AXES.tracking), '-0.04');
  assert.equal(formatTrackingCss(DEFAULT_AXES.tracking), '-0.004em');
  assert.equal(formatSlantDisplay(DEFAULT_AXES.slant), '3.5°');
});

test('buildFontVariationSettings generates valid CSS font-variation-settings string', () => {
  const css = buildFontVariationSettings(DEFAULT_AXES);
  assert.match(css, /'wght' 720/);
  assert.match(css, /'wdth' 135/);
  assert.match(css, /'slnt' -/);
  assert.match(css, /'opsz' 144/);
});

test('computeGuideMetrics calculates dynamic cap-height, x-height, and coordinate labels', () => {
  const guides = computeGuideMetrics(DEFAULT_AXES, 9);
  assert.equal(guides.capHeightLabel, 'CAP-HEIGHT // 840pt');
  assert.equal(guides.xHeightLabel, 'X-HEIGHT // 520pt');
  assert.equal(guides.baselineLabel, 'BASELINE // 0.00px');
  assert.match(guides.coordinateReadout, /t: -0\.02/);
});

test('applyCaseTransform handles upper, lower, and preserve modes accurately', () => {
  assert.equal(applyCaseTransform('GlyphWork', 'upper'), 'GLYPHWORK');
  assert.equal(applyCaseTransform('GlyphWork', 'lower'), 'glyphwork');
  assert.equal(applyCaseTransform('GlyphWork', 'preserve'), 'GlyphWork');
});

test('history stack pushes snapshots and pops previous state on undo', () => {
  let history = pushHistory([], DEFAULT_SNAPSHOT);
  assert.equal(history.length, 1);

  // Duplicate snapshot should not bloat stack
  history = pushHistory(history, DEFAULT_SNAPSHOT);
  assert.equal(history.length, 1);

  const modified = {
    ...DEFAULT_SNAPSHOT,
    text: 'SPECIMEN',
    axes: { ...DEFAULT_AXES, weight: 850 },
  };
  const popped = popHistory(history, modified);
  assert.equal(popped.restored.text, 'GLYPHWORK');
  assert.equal(popped.restored.axes.weight, 720);
  assert.equal(popped.nextHistory.length, 0);
});

test('computeLiveGlyphMetrics returns responsive advance width and sidebearings', () => {
  const narrow = computeLiveGlyphMetrics('G', { ...DEFAULT_AXES, width: 60 });
  const wide = computeLiveGlyphMetrics('G', { ...DEFAULT_AXES, width: 150 });
  assert.ok(wide.effectiveAdvanceEm > narrow.effectiveAdvanceEm);
  assert.equal(narrow.unicode, 'U+0047');
  assert.ok(narrow.nodeCoordinates.length >= 4);
});

test('calculateLicenseQuote starts at $49 and applies academic discount', () => {
  const starter = calculateLicenseQuote('desktop-web', 0, false);
  assert.equal(starter.total, 49);
  assert.equal(starter.formattedTotal, '$49');

  const academic = calculateLicenseQuote('desktop-web', 0, true);
  assert.ok(academic.total < 49);
});

test('validateSpecimenEmail validates email syntax and returns dispatch code', () => {
  const empty = validateSpecimenEmail('   ');
  assert.equal(empty.valid, false);

  const invalid = validateSpecimenEmail('not-an-email');
  assert.equal(invalid.valid, false);

  const valid = validateSpecimenEmail('curator@zurich-design.ch');
  assert.equal(valid.valid, true);
  assert.match(valid.dispatchCode || '', /^SPEC-090-\d+$/);
});
