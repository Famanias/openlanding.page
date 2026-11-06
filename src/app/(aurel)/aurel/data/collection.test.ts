import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  ANATOMY_HOTSPOTS,
  GALLERY_SLIDES,
  getHotspotById,
  getAdjacentHotspotId,
  getAdjacentGalleryIndex,
  formatGalleryProgress,
  validatePrivateViewingInquiry,
} from './collection';

test('Anatomy hotspots include all 4 required calibre stations with valid coordinates', () => {
  assert.equal(ANATOMY_HOTSPOTS.length, 4);
  assert.equal(ANATOMY_HOTSPOTS[0].label, '01 / THE ESCAPEMENT');
  assert.equal(ANATOMY_HOTSPOTS[1].label, '02 / THE BALANCE');
  assert.equal(ANATOMY_HOTSPOTS[2].label, '03 / THE GEAR TRAIN');
  assert.equal(ANATOMY_HOTSPOTS[3].label, '04 / THE BRIDGES');

  for (const spot of ANATOMY_HOTSPOTS) {
    assert.ok(spot.markerX > 0 && spot.markerX < 100);
    assert.ok(spot.markerY > 0 && spot.markerY < 100);
  }
});

test('getHotspotById and getAdjacentHotspotId cycle deterministically', () => {
  assert.equal(getHotspotById('balance').shortTitle, 'THE BALANCE');
  assert.equal(getHotspotById('unknown-id').id, 'escapement');
  assert.equal(getAdjacentHotspotId('escapement', 'next'), 'balance');
  assert.equal(getAdjacentHotspotId('escapement', 'prev'), 'bridges');
  assert.equal(getAdjacentHotspotId('bridges', 'next'), 'escapement');
});

test('Gallery navigation wraps cleanly across all 3 slides and formats progress', () => {
  assert.equal(GALLERY_SLIDES.length, 3);
  assert.equal(getAdjacentGalleryIndex(0, 'prev'), 2);
  assert.equal(getAdjacentGalleryIndex(2, 'next'), 0);
  assert.equal(formatGalleryProgress(0), '01 / 03');
  assert.equal(formatGalleryProgress(2), '03 / 03');
});

test('validatePrivateViewingInquiry rejects empty or malformed inputs and accepts valid input', () => {
  const emptyRes = validatePrivateViewingInquiry({
    name: ' ',
    email: '',
    city: 'Geneva',
    message: '',
  });
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.message);

  const badEmailRes = validatePrivateViewingInquiry({
    name: 'Clara Vance',
    email: 'not-an-email',
    city: 'Zurich',
    message: 'Interested in inspecting Collection 01 in person.',
  });
  assert.equal(badEmailRes.valid, false);
  assert.ok(badEmailRes.errors.email);

  const validRes = validatePrivateViewingInquiry({
    name: 'Clara Vance',
    email: 'clara@example.com',
    city: 'Zurich',
    message: 'Interested in inspecting Collection 01 in person.',
  });
  assert.equal(validRes.valid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});
