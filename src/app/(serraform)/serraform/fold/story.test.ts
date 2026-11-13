import { test } from 'vitest';
import assert from 'node:assert/strict';
import { storyChapter, storyOpening, storyProgress } from './story';

test('storyProgress clamps and handles invalid ranges', () => {
  assert.equal(storyProgress(500, 1000, 1000), 0);
  assert.equal(storyProgress(500, 1200, 1000), 0);
  assert.equal(storyProgress(900, 1000, 2000), 0);
  assert.equal(storyProgress(1500, 1000, 2000), 0.5);
  assert.equal(storyProgress(2500, 1000, 2000), 1);
});

test('storyOpening holds and interpolates reversibly across timeline', () => {
  assert.equal(storyOpening(0), 0);
  assert.equal(storyOpening(0.12), 0);
  assert.equal(storyOpening(0.37), 50);
  assert.equal(storyOpening(0.62), 100);
  assert.equal(storyOpening(0.75), 100);
  assert.equal(storyOpening(0.82), 100);
  assert.ok(Math.abs(storyOpening(0.91) - 75) < 1e-9);
  assert.equal(storyOpening(1), 50);
  // Deterministic reversal check
  assert.equal(storyOpening(0.42), storyOpening(0.42));
});

test('storyChapter switches at exact 0.34 and 0.72 boundaries', () => {
  assert.equal(storyChapter(0), 0);
  assert.equal(storyChapter(0.3399), 0);
  assert.equal(storyChapter(0.34), 1);
  assert.equal(storyChapter(0.7199), 1);
  assert.equal(storyChapter(0.72), 2);
  assert.equal(storyChapter(1), 2);
});
