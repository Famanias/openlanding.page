import { describe, it, expect } from 'vitest';
import {
  SPRITE_CROPS,
  computeSpriteCssMetrics,
  computeSpiritRepulsion,
  computeBatState,
  detectOuterBackgroundType,
  validatePassageReservation,
} from './cenoteMath';

describe('Xibalba Math & Physics Utilities', () => {
  it('computeSpriteCssMetrics matches normalized 1024x765 formulas', () => {
    const s1 = computeSpriteCssMetrics(SPRITE_CROPS.spirit1);
    expect(s1.backgroundSizeX).toBe(330.3226);
    expect(s1.backgroundSizeY).toBe(294.2308);
    expect(s1.aspectRatio).toBe('310 / 260');

    const batDown = computeSpriteCssMetrics(SPRITE_CROPS.batDown);
    expect(batDown.aspectRatio).toBe('435 / 185');
    expect(batDown.backgroundPosX).toBe(60.781);
  });

  it('computeSpiritRepulsion pushes spirit away within 260px and zeroes outside', () => {
    const far = computeSpiritRepulsion(100, 100, 500, 500);
    expect(far.tx).toBe(0);
    expect(far.ty).toBe(0);

    const near = computeSpiritRepulsion(200, 200, 150, 200);
    expect(near.tx).toBeGreaterThan(0);
    expect(near.ty).toBe(0);
  });

  it('computeBatState wraps horizontally between -8% and +108% and alternates wing flap', () => {
    const b0 = computeBatState(0, { y0: 20, dur: 10, offset: 0, amp: 2, flapRate: 10 });
    expect(b0.xPct).toBe(-8);
    expect(b0.isDown).toBe(false);

    const bHalf = computeBatState(0.15, { y0: 20, dur: 10, offset: 0, amp: 2, flapRate: 10 });
    expect(bHalf.isDown).toBe(true);
    expect(bHalf.xPct).toBeGreaterThan(-8);
  });

  it('detectOuterBackgroundType identifies black, white, and transparent outer pixels', () => {
    expect(detectOuterBackgroundType(0, 0, 0, 255)).toBe('black');
    expect(detectOuterBackgroundType(255, 255, 255, 255)).toBe('white');
    expect(detectOuterBackgroundType(0, 0, 0, 0)).toBe('transparent');
    expect(detectOuterBackgroundType(40, 110, 95, 255)).toBe('opaque');
  });

  it('validatePassageReservation enforces required fields and produces confirmation code', () => {
    const invalid = validatePassageReservation({
      fullName: 'A',
      email: 'not-an-email',
      waveTime: '18:00',
      partySize: 0,
      censerOption: 'borrow',
      barkWish: '',
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.fullName).toBeDefined();
    expect(invalid.errors.email).toBeDefined();
    expect(invalid.errors.partySize).toBeDefined();

    const valid = validatePassageReservation({
      fullName: 'Ixchel Balam',
      email: 'ixchel@xibalba.org',
      waveTime: '21:00',
      partySize: 2,
      censerOption: 'borrow',
      barkWish: 'May the subterranean river carry our light.',
    });
    expect(valid.valid).toBe(true);
    expect(valid.confirmationCode).toMatch(/^XIB-2100-\d{4}$/);
  });
});
