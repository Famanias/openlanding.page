import { describe, expect, it } from 'vitest';
import { clamp, progress } from './math';

describe('Lumen motion math', () => {
  describe('clamp', () => {
    it('clamps values to the default [0, 1] range', () => {
      expect(clamp(0.5)).toBe(0.5);
      expect(clamp(-0.25)).toBe(0);
      expect(clamp(1.25)).toBe(1);
      expect(clamp(0)).toBe(0);
      expect(clamp(1)).toBe(1);
    });

    it('clamps values to custom [min, max] range', () => {
      expect(clamp(15, 10, 20)).toBe(15);
      expect(clamp(5, 10, 20)).toBe(10);
      expect(clamp(25, 10, 20)).toBe(20);
      expect(clamp(-5, -10, 0)).toBe(-5);
      expect(clamp(-15, -10, 0)).toBe(-10);
      expect(clamp(5, -10, 0)).toBe(0);
    });

    it('handles inverted min and max safely', () => {
      expect(clamp(5, 10, 0)).toBe(5);
    });
  });

  describe('progress', () => {
    it('calculates linear progress normalized to 0..1', () => {
      expect(progress(0, 0, 100)).toBe(0);
      expect(progress(50, 0, 100)).toBe(0.5);
      expect(progress(100, 0, 100)).toBe(1);
    });

    it('clamps out-of-range and negative values', () => {
      expect(progress(-20, 0, 100)).toBe(0);
      expect(progress(150, 0, 100)).toBe(1);
      expect(progress(-10, -50, 50)).toBe(0.4);
    });

    it('handles zero or reversed ranges (end <= start)', () => {
      // For end <= start: 0 below start, 1 at or above start
      expect(progress(50, 100, 100)).toBe(0);
      expect(progress(100, 100, 100)).toBe(1);
      expect(progress(150, 100, 100)).toBe(1);

      expect(progress(80, 100, 50)).toBe(0);
      expect(progress(100, 100, 50)).toBe(1);
      expect(progress(120, 100, 50)).toBe(1);
    });
  });
});
