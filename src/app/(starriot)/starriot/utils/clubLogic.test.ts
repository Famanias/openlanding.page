import { describe, it, expect } from 'vitest';
import { clamp01, computeScrollStage, validateGuestlistSubmission } from './clubLogic';

describe('clubLogic', () => {
  it('clamp01 clamps out-of-range and NaN values safely', () => {
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0.45)).toBe(0.45);
    expect(clamp01(1.8)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
  });

  it('computeScrollStage transitions accurately across WARM UP, TURN UP, and ALL OUT', () => {
    const stage0 = computeScrollStage(0.1);
    expect(stage0.phaseIndex).toBe(0);
    expect(stage0.phaseLabel).toBe('WARM UP');
    expect(stage0.bpm).toBe(116);

    const stage1 = computeScrollStage(0.5);
    expect(stage1.phaseIndex).toBe(1);
    expect(stage1.phaseLabel).toBe('TURN UP');
    expect(stage1.bpm).toBe(122);

    const stage2 = computeScrollStage(0.85);
    expect(stage2.phaseIndex).toBe(2);
    expect(stage2.phaseLabel).toBe('ALL OUT');
    expect(stage2.headline).toBe('LOSE YOURSELF. FIND YOUR PEOPLE.');
    expect(stage2.bpm).toBe(128);
  });

  it('validateGuestlistSubmission rejects empty or invalid inputs and generates deterministic passCode on valid input', () => {
    const emptyRes = validateGuestlistSubmission({ name: '', email: '', nightPreference: 'friday-frequency' });
    expect(emptyRes.valid).toBe(false);
    expect(emptyRes.errors.name).toBeDefined();
    expect(emptyRes.errors.email).toBeDefined();

    const badEmailRes = validateGuestlistSubmission({ name: 'Nova', email: 'not-an-email', nightPreference: 'saturday-starburst' });
    expect(badEmailRes.valid).toBe(false);
    expect(badEmailRes.errors.name).toBeUndefined();
    expect(badEmailRes.errors.email).toBeDefined();

    const validRes = validateGuestlistSubmission({
      name: 'Nova Star',
      email: 'nova@starriot.club',
      nightPreference: 'saturday-starburst',
    });
    expect(validRes.valid).toBe(true);
    expect(validRes.passCode?.startsWith('SR-NOVA-')).toBe(true);
  });
});
