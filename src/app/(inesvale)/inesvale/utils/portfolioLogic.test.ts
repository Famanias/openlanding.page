import { describe, it, expect } from 'vitest';
import {
  getNextSlideIndex,
  formatSlideCounter,
  filterArchivePhotos,
  getCategoryCounts,
  validateInquiryForm,
  buildInquiryMailtoUrl,
  computeCloserLookStep
} from './portfolioLogic';
import { ARCHIVE_PHOTOS } from '../data/portfolioData';

describe('Ines Vale portfolio logic', () => {
  it('getNextSlideIndex wraps cleanly forward and backward', () => {
    expect(getNextSlideIndex(0, 6, 'next')).toBe(1);
    expect(getNextSlideIndex(5, 6, 'next')).toBe(0);
    expect(getNextSlideIndex(0, 6, 'prev')).toBe(5);
    expect(getNextSlideIndex(3, 6, 'prev')).toBe(2);
  });

  it('formatSlideCounter formats 2-digit editorial counter matching reference', () => {
    expect(formatSlideCounter(0, 6)).toBe('01 — 06');
    expect(formatSlideCounter(5, 6)).toBe('06 — 06');
    expect(formatSlideCounter(11, 15)).toBe('12 — 15');
  });

  it('filterArchivePhotos filters accurately across all categories', () => {
    const all = filterArchivePhotos(ARCHIVE_PHOTOS, 'All');
    expect(all.length).toBe(ARCHIVE_PHOTOS.length);
    expect(all.length).toBeGreaterThanOrEqual(12);

    const arch = filterArchivePhotos(ARCHIVE_PHOTOS, 'Architecture');
    expect(arch.length).toBeGreaterThanOrEqual(3);
    expect(arch.every((p) => p.category === 'Architecture')).toBe(true);

    const counts = getCategoryCounts(ARCHIVE_PHOTOS);
    expect(counts.Portraits + counts.Places + counts.Architecture + counts.Details).toBe(counts.All);
  });

  it('validateInquiryForm rejects empty or invalid fields and accepts valid input', () => {
    const emptyRes = validateInquiryForm({
      name: '',
      email: 'invalid-email',
      projectType: '',
      timeline: '',
      message: 'short'
    });
    expect(emptyRes.valid).toBe(false);
    expect(emptyRes.errors.name).toBeTruthy();
    expect(emptyRes.errors.email).toBeTruthy();
    expect(emptyRes.errors.projectType).toBeTruthy();
    expect(emptyRes.errors.message).toBeTruthy();

    const validRes = validateInquiryForm({
      name: 'Elena Rostova',
      email: 'elena@rostova-art.org',
      projectType: 'Editorial Commission',
      timeline: 'Autumn 2026',
      message: 'We are curating an architectural monograph on coastal Portugal.'
    });
    expect(validRes.valid).toBe(true);
    expect(validRes.errors).toEqual({});
  });

  it('buildInquiryMailtoUrl builds a properly encoded mailto URI', () => {
    const uri = buildInquiryMailtoUrl({
      name: 'Elena Rostova',
      email: 'elena@rostova-art.org',
      projectType: 'Fine Art Print Acquisition',
      timeline: 'November 2026',
      message: 'Interested in Plate I from The Quiet Coast in 60x75cm edition.'
    });
    expect(uri.startsWith('mailto:studio@inesvale.studio?subject=')).toBe(true);
    expect(uri).toContain('Fine%20Art%20Print%20Acquisition');
    expect(uri).toContain('Plate%20I');
  });

  it('computeCloserLookStep maps scroll progress to 0..2 chapters cleanly', () => {
    expect(computeCloserLookStep(0, 3)).toEqual({ activeIndex: 0, stepProgress: 0 });
    const mid = computeCloserLookStep(0.5, 3);
    expect(mid.activeIndex).toBe(1);
    const end = computeCloserLookStep(1, 3);
    expect(end.activeIndex).toBe(2);
    expect(end.stepProgress).toBe(1);
  });
});
