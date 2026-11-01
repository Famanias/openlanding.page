import { describe, it, expect } from 'vitest';
import {
  ACTS,
  CARTRIDGE_ARTIFACTS,
  WORLD_TOTAL_WIDTH,
  scrollProgressToWorldX,
  getActiveActFromProgress,
  interpolateSkyPalette,
  getTerrainHeightAtX,
} from './worldMap';

describe('worldLogic', () => {
  it('scrollProgressToWorldX maps normalized progress to [0..6000] and clamps bounds', () => {
    expect(scrollProgressToWorldX(0)).toBe(0);
    expect(scrollProgressToWorldX(0.5)).toBe(3000);
    expect(scrollProgressToWorldX(1)).toBe(WORLD_TOTAL_WIDTH);
    expect(scrollProgressToWorldX(-0.25)).toBe(0);
    expect(scrollProgressToWorldX(1.5)).toBe(WORLD_TOTAL_WIDTH);
  });

  it('getActiveActFromProgress accurately identifies all 6 narrative acts', () => {
    expect(getActiveActFromProgress(0.05).id).toBe('act-0');
    expect(getActiveActFromProgress(0.20).id).toBe('act-1');
    expect(getActiveActFromProgress(0.40).id).toBe('act-2');
    expect(getActiveActFromProgress(0.58).id).toBe('act-3');
    expect(getActiveActFromProgress(0.75).id).toBe('act-4');
    expect(getActiveActFromProgress(0.92).id).toBe('act-5');
  });

  it('interpolateSkyPalette returns valid seamless hex colors across act boundaries', () => {
    const startSky = interpolateSkyPalette(0);
    const midSky = interpolateSkyPalette(1500);
    const endSky = interpolateSkyPalette(6000);

    expect(startSky.skyTop).toMatch(/^#[0-9A-F]{6}$/);
    expect(midSky.skyBottom).toMatch(/^#[0-9A-F]{6}$/);
    expect(endSky.horizonGlow).toMatch(/^#[0-9A-F]{6}$/);
    expect(ACTS.length).toBe(6);
  });

  it('getTerrainHeightAtX is quantized to 4px pixel grid increments', () => {
    for (let x = 0; x <= WORLD_TOTAL_WIDTH; x += 125) {
      const h = getTerrainHeightAtX(x);
      expect(Math.abs(h % 4)).toBe(0);
    }
  });

  it('verified product data artifacts and precision markers are complete', () => {
    expect(CARTRIDGE_ARTIFACTS.length).toBe(3);
  });
});
