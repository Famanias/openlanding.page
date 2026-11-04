import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  stepSpotlightInertia,
  computeRelativePointerPosition,
  computeMaxCornerRadius,
  resolveSpotlightRadius,
  computeLightLabVisuals,
  validateContactInquiry,
  buildContactMailtoUri,
  DEFAULT_LIGHT_LAB_STATE,
} from './motion';

test('stepSpotlightInertia moves smoothly toward target without overshooting', () => {
  const next = stepSpotlightInertia(100, 300, 0.016, 10);
  assert.ok(next > 100 && next < 300);
  const settled = stepSpotlightInertia(300, 300, 0.016, 10);
  assert.equal(settled, 300);
});

test('computeRelativePointerPosition clamps coordinates to hero bounds', () => {
  const rect = { left: 100, top: 50, width: 1000, height: 500 };
  const inside = computeRelativePointerPosition(600, 300, rect);
  assert.equal(inside.x, 500);
  assert.equal(inside.y, 250);
  assert.equal(inside.xPercent, 50);
  assert.equal(inside.yPercent, 50);

  const outside = computeRelativePointerPosition(20, -40, rect);
  assert.equal(outside.x, 0);
  assert.equal(outside.y, 0);
});

test('computeMaxCornerRadius exceeds distance to farthest viewport corner', () => {
  const r = computeMaxCornerRadius(200, 150, 1440, 900);
  const directCornerDist = Math.hypot(1440 - 200, 900 - 150);
  assert.ok(r > directCornerDist * 2);
});

test('resolveSpotlightRadius arbitrates toggle, scroll, and pointer modes cleanly', () => {
  const toggleState = resolveSpotlightRadius({
    mode: 'pointer',
    baseRadius: 260,
    maxCornerRadius: 3200,
    scrollProgress: 0,
    introProgress: 1,
    pointerActive: false,
    illuminationVisible: true,
  });
  assert.equal(toggleState.fullReveal, true);
  assert.equal(toggleState.radiusPx, 3200);

  const scrollHalf = resolveSpotlightRadius({
    mode: 'scroll',
    baseRadius: 260,
    maxCornerRadius: 2260,
    scrollProgress: 0.5,
    introProgress: 1,
    pointerActive: true,
    illuminationVisible: false,
  });
  assert.equal(scrollHalf.radiusPx, 1260);
  assert.equal(scrollHalf.fullReveal, false);
});

test('computeLightLabVisuals updates opacity, CCT, and beam direction accurately', () => {
  const warm = computeLightLabVisuals(DEFAULT_LIGHT_LAB_STATE);
  assert.equal(warm.revealOpacity, 0.78);
  assert.equal(warm.cctValue, 2700);

  const cool = computeLightLabVisuals({
    intensity: 45,
    temperature: 'cool',
    direction: 30,
  });
  assert.equal(cool.revealOpacity, 0.45);
  assert.equal(cool.cctValue, 4200);
  assert.ok(cool.beamSweepXPercent > 50);
});

test('validateContactInquiry rejects empty/invalid inputs and accepts valid briefs', () => {
  const invalid = validateContactInquiry({
    name: '',
    email: 'not-an-email',
    projectType: 'Cultural',
    timeline: '2027',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const validDraft = {
    name: 'Studio Kengo',
    email: 'architect@example.com',
    projectType: 'Cultural Pavilion',
    timeline: 'Autumn 2027',
    message: 'Exploring low-glare perimeter grazing for a cast-in-place concrete gallery.',
  };
  const valid = validateContactInquiry(validDraft);
  assert.equal(valid.valid, true);
  const mailto = buildContactMailtoUri(validDraft);
  assert.ok(mailto.startsWith('mailto:hello@penumbra.example?subject='));
});
