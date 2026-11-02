import { describe, it, expect } from 'vitest';
import {
  CASE_STUDIES,
  ANATOMY_PARTS,
  LOOP_TRACKS,
  getAnatomyPartTransform,
  cycleAnatomyPart,
  cycleLoopTrack,
  formatTrackTime,
  calculateAsteriskSpokes,
  validateContactForm,
  buildMailtoHref
} from './portfolioData';

describe('portfolioData', () => {
  it('CASE_STUDIES contains all three required projects (LOOP, FORMA, KINDRED)', () => {
    expect(CASE_STUDIES.length).toBe(3);
    expect(CASE_STUDIES.map((c) => c.id)).toEqual(['loop', 'forma', 'kindred']);
    for (const study of CASE_STUDIES) {
      expect(study.metrics.length).toBeGreaterThanOrEqual(3);
      expect(study.deliverables.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('getAnatomyPartTransform returns identity when assembled and scaled offsets when exploded', () => {
    const cover = ANATOMY_PARTS[0];
    const assembled = getAnatomyPartTransform(cover, false);
    expect(assembled).toEqual({ x: 0, y: 0, rotate: 0, scale: 1 });

    const explodedFull = getAnatomyPartTransform(cover, true, 1);
    expect(explodedFull.x).toBe(cover.explodeDx);
    expect(explodedFull.y).toBe(cover.explodeDy);
    expect(explodedFull.rotate).toBe(cover.explodeRotate);
    expect(explodedFull.scale).toBe(cover.explodeScale);

    const explodedHalf = getAnatomyPartTransform(cover, true, 0.5);
    expect(explodedHalf.x).toBe(cover.explodeDx * 0.5);
    expect(explodedHalf.y).toBe(cover.explodeDy * 0.5);
  });

  it('cycleAnatomyPart and cycleLoopTrack wrap around deterministically', () => {
    const firstPart = ANATOMY_PARTS[0];
    const lastPart = ANATOMY_PARTS[ANATOMY_PARTS.length - 1];
    expect(cycleAnatomyPart(firstPart.id, -1).id).toBe(lastPart.id);
    expect(cycleAnatomyPart(lastPart.id, 1).id).toBe(firstPart.id);

    const firstTrack = LOOP_TRACKS[0];
    const secondTrack = LOOP_TRACKS[1];
    expect(cycleLoopTrack(firstTrack.id, 1).id).toBe(secondTrack.id);
    expect(cycleLoopTrack(firstTrack.id, -1).id).toBe(LOOP_TRACKS[LOOP_TRACKS.length - 1].id);
  });

  it('formatTrackTime formats seconds as MM:SS tabular strings', () => {
    expect(formatTrackTime(0)).toBe('00:00');
    expect(formatTrackTime(65)).toBe('01:05');
    expect(formatTrackTime(168)).toBe('02:48');
  });

  it('calculateAsteriskSpokes computes symmetric 8-pointed asterisk geometry', () => {
    const spokes = calculateAsteriskSpokes(4, 0, 50);
    expect(spokes.length).toBe(4);
    expect(spokes[0]).toEqual({ x1: -50, y1: -0, x2: 50, y2: 0, angleDeg: 0 });
    expect(spokes[2].angleDeg).toBe(90);
  });

  it('validateContactForm rejects empty or invalid fields and accepts complete inquiry', () => {
    const invalidResult = validateContactForm({
      name: 'N',
      email: 'invalid-email',
      projectScope: '',
      message: 'Too short'
    });
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors.name).toBeTruthy();
    expect(invalidResult.errors.email).toBeTruthy();
    expect(invalidResult.errors.projectScope).toBeTruthy();
    expect(invalidResult.errors.message).toBeTruthy();

    const validInput = {
      name: 'Elena Vance',
      email: 'elena@teenage-atelier.io',
      projectScope: 'Industrial Design & Hardware',
      message: 'We are building a handheld synthesizer and would love to collaborate on the enclosure.'
    };
    const validResult = validateContactForm(validInput);
    expect(validResult.valid).toBe(true);
    expect(validResult.errors).toEqual({});

    const mailto = buildMailtoHref(validInput);
    expect(mailto.startsWith('mailto:nico@nicopark.design?subject=')).toBe(true);
    expect(mailto.includes('Elena%20Vance')).toBe(true);
  });
});
