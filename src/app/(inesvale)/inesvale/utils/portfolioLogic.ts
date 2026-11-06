import { ArchiveCategory, ArchivePhoto } from '../data/portfolioData';

export interface InquiryFormInput {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: InquiryValidationErrors;
}

export function getNextSlideIndex(
  currentIndex: number,
  total: number,
  direction: 'next' | 'prev'
): number {
  if (total <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function formatSlideCounter(indexZeroBased: number, total: number): string {
  const safeCurrent = Math.max(1, Math.min(total, indexZeroBased + 1));
  const paddedCurrent = String(safeCurrent).padStart(2, '0');
  const paddedTotal = String(Math.max(1, total)).padStart(2, '0');
  return `${paddedCurrent} — ${paddedTotal}`;
}

export function filterArchivePhotos(
  photos: ArchivePhoto[],
  category: ArchiveCategory
): ArchivePhoto[] {
  if (category === 'All') {
    return photos;
  }
  return photos.filter((photo) => photo.category === category);
}

export function getCategoryCounts(
  photos: ArchivePhoto[]
): Record<ArchiveCategory, number> {
  const counts: Record<ArchiveCategory, number> = {
    All: photos.length,
    Portraits: 0,
    Places: 0,
    Architecture: 0,
    Details: 0
  };
  for (const photo of photos) {
    counts[photo.category] = (counts[photo.category] || 0) + 1;
  }
  return counts;
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedType = input.projectType.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please share your name or studio.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for correspondence.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
  }

  if (!trimmedType) {
    errors.projectType = 'Please select the nature of your inquiry.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a brief note about your project or print inquiry.';
  } else if (trimmedMessage.length < 12) {
    errors.message = 'Please share a few more details (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildInquiryMailtoUrl(input: InquiryFormInput): string {
  const recipient = 'studio@inesvale.studio';
  const subject = `Commission / Archive Inquiry — ${input.projectType.trim()} (${input.name.trim()})`;
  const lines = [
    'Dear Ines Vale Studio,',
    '',
    input.message.trim(),
    '',
    '—',
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Inquiry Type: ${input.projectType.trim()}`,
    `Preferred Timeline: ${input.timeline.trim() || 'Flexible / Open'}`
  ];
  const body = lines.join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function computeCloserLookStep(
  progressZeroToOne: number,
  totalSteps: number
): { activeIndex: number; stepProgress: number } {
  const clamped = Math.max(0, Math.min(1, progressZeroToOne));
  if (totalSteps <= 1) {
    return { activeIndex: 0, stepProgress: clamped };
  }
  const scaled = clamped * totalSteps;
  const activeIndex = Math.min(totalSteps - 1, Math.floor(scaled));
  const stepProgress = Math.max(0, Math.min(1, scaled - activeIndex));
  return { activeIndex, stepProgress };
}
