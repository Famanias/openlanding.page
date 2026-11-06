import { describe, it, expect } from 'vitest';
import {
  SAMPLE_PROFILES,
  SCENE_PLAYLISTS,
  calculateTasteOverlap,
  filterPlaylists,
  validatePreviewPass,
} from './matching';

describe('Riff matching logic', () => {
  it('calculateTasteOverlap returns 0 when user selects no genres and no habits', () => {
    const mila = SAMPLE_PROFILES[0];
    const res = calculateTasteOverlap([], [], mila);
    expect(res.percentage).toBe(0);
    expect(res.sharedGenres).toEqual([]);
    expect(res.sharedHabits).toEqual([]);
  });

  it('calculateTasteOverlap computes high overlap for identical taste profile', () => {
    const mila = SAMPLE_PROFILES[0];
    const res = calculateTasteOverlap(mila.genres, mila.habits, mila);
    expect(res.percentage).toBeGreaterThanOrEqual(90);
    expect(res.sharedGenres.length).toBe(mila.genres.length);
    expect(res.sharedHabits.length).toBe(mila.habits.length);
    expect(res.sharedScenes).toContain('Shoegaze');
    expect(res.introPrompt).toContain('shoegaze');
  });

  it('calculateTasteOverlap computes lower baseline when no shared items exist', () => {
    const mila = SAMPLE_PROFILES[0];
    // Mila has shoegaze, post-punk, indie rock, alt folk & night drives, live gigs, late-night headphones
    const res = calculateTasteOverlap(['darkwave'], ['vinyl'], mila);
    expect(res.percentage).toBe(18);
    expect(res.sharedGenres.length).toBe(0);
    expect(res.sharedHabits.length).toBe(0);
  });

  it('filterPlaylists returns all items for "all" and filters accurately by mood', () => {
    const all = filterPlaylists(SCENE_PLAYLISTS, 'all');
    expect(all.length).toBe(SCENE_PLAYLISTS.length);

    const shoegazeOnly = filterPlaylists(SCENE_PLAYLISTS, 'shoegaze');
    expect(shoegazeOnly.length).toBeGreaterThan(0);
    expect(shoegazeOnly.every((p) => p.mood === 'shoegaze')).toBe(true);
  });

  it('validatePreviewPass enforces required name and favorite record', () => {
    expect(validatePreviewPass('', 'Souvlaki').valid).toBe(false);
    expect(validatePreviewPass('Mila', '').valid).toBe(false);
    const ok = validatePreviewPass('  Mila ', 'Punisher');
    expect(ok.valid).toBe(true);
    expect(ok.normalizedHandle).toBe('Mila');
  });

  it('SCENE_PLAYLISTS maps 6 square sleeves and 4 dedicated gatefold spreads accurately', () => {
    expect(SCENE_PLAYLISTS.length).toBe(6);
    const withGatefold = SCENE_PLAYLISTS.filter((p) => p.gatefoldAsset !== null);
    const sleeveOnly = SCENE_PLAYLISTS.filter((p) => p.gatefoldAsset === null);
    expect(withGatefold.length).toBe(4);
    expect(sleeveOnly.length).toBe(2);
    expect(SCENE_PLAYLISTS.every((p) => p.sleeveAsset.startsWith('/assets/riff/sleeves/'))).toBe(true);
  });
});
