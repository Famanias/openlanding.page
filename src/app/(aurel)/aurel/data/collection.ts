export interface AnatomyHotspot {
  id: string;
  index: string;
  label: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  specNote: string;
  frequencyOrMetric: string;
  /** Percentage coordinates (0-100) on the 16:9 exploded movement canvas */
  markerX: number;
  markerY: number;
  /** Percentage coordinates for the outer annotation callout anchor */
  calloutX: number;
  calloutY: number;
  align: 'left' | 'right';
}

export interface GallerySlide {
  id: 'dial' | 'case' | 'movement';
  index: string;
  tabLabel: string;
  subtitle: string;
  heading: string;
  caption: string;
  description: string;
  image: string;
  imageAlt: string;
  aspectRatio: string;
  specs: Array<{ label: string; value: string }>;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  city: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export const NAV_ITEMS = [
  { label: 'COLLECTIONS', href: '#collections', sectionId: 'collections' },
  { label: 'SAVOIR-FAIRE', href: '#savoir-faire', sectionId: 'savoir-faire' },
  { label: 'MANIFESTO', href: '#manifesto', sectionId: 'manifesto' },
  { label: 'ATELIER', href: '#atelier', sectionId: 'atelier' },
] as const;

export const HERO_METADATA = {
  eyebrow: 'INDEPENDENT HOROLOGY / COLLECTION 01',
  heading: 'TIME, REIMAGINED.',
  subtitle: 'An exploration of precision, permanence, and the art of making time.',
  nearWatchLabel: 'THE ORIGIN COLLECTION',
  ctaLabel: 'EXPLORE THE COLLECTION',
  leftCaption: 'CALIBRE AU-01 / 42MM BRUSHED TITANIUM / 50-HOUR RESERVE',
  rightCaption: 'LIMITED EDITION / COLLECTION 01 / NO. 01–50',
} as const;

export const ORIGIN_SPECS = [
  { label: 'CALIBRE', value: 'AU-01 Manual Architecture' },
  { label: 'CASE MATERIAL', value: 'Grade 5 Brushed Titanium' },
  { label: 'DIMENSIONS', value: '42.0 mm Diameter · 9.8 mm Profile' },
  { label: 'POWER RESERVE', value: '50 Hours Autonomous Tension' },
  { label: 'STRAP', value: 'Hand-Stitched Matte Black Calfskin' },
  { label: 'EDITION CONCEPT', value: 'Collection 01 · Numbered 01–50' },
] as const;

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'escapement',
    index: '01',
    label: '01 / THE ESCAPEMENT',
    shortTitle: 'THE ESCAPEMENT',
    subtitle: 'Regulating motion.',
    description:
      'Positioned within the lower openworked plane, the escapement meters stored mainspring torque into exact, audible impulses without ornamental excess.',
    specNote: 'OPENWORKED IMPULSE STAGE · LOW-MASS GEOMETRY',
    frequencyOrMetric: '21,600 VPH / 3.0 HZ CONCEPT',
    markerX: 46,
    markerY: 53,
    calloutX: 16,
    calloutY: 30,
    align: 'left',
  },
  {
    id: 'balance',
    index: '02',
    label: '02 / THE BALANCE',
    shortTitle: 'THE BALANCE',
    subtitle: 'A study in rhythm.',
    description:
      'Suspended beneath a twin-arm titanium bridge at six o’clock, the free-sprung balance wheel oscillates with steady isochronous poise.',
    specNote: 'FREE-SPRUNG OSCILLATOR · TWIN-POINT SUSPENSION',
    frequencyOrMetric: 'ISOCHRONOUS ARC ±1.5°',
    markerX: 52,
    markerY: 59,
    calloutX: 16,
    calloutY: 74,
    align: 'left',
  },
  {
    id: 'gear-train',
    index: '03',
    label: '03 / THE GEAR TRAIN',
    shortTitle: 'THE GEAR TRAIN',
    subtitle: 'Movement transmitted through form.',
    description:
      'Circular-grained wheels and chamfered pinions align along a deliberate central axis, turning mechanical necessity into visible depth.',
    specNote: 'COAXIAL TORQUE TRANSMISSION · CIRCULAR GRAINING',
    frequencyOrMetric: '50-HOUR BARREL COUPLE',
    markerX: 57,
    markerY: 32,
    calloutX: 84,
    calloutY: 26,
    align: 'right',
  },
  {
    id: 'bridges',
    index: '04',
    label: '04 / THE BRIDGES',
    shortTitle: 'THE BRIDGES',
    subtitle: 'Structure, symmetry, and stability.',
    description:
      'Matte anthracite mainplates and hand-beveled architectural bridges anchor the calibre while admitting light across every recessed bevel.',
    specNote: 'BEVELED ANTHRACITE BRIDGES · HEAT-BLUED SCREWS',
    frequencyOrMetric: '4-PLANE RIGID CHASSIS',
    markerX: 63,
    markerY: 46,
    calloutX: 84,
    calloutY: 72,
    align: 'right',
  },
];

export const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'dial',
    index: '01',
    tabLabel: '01 / DIAL',
    subtitle: 'OBJECT / ARCHITECTURAL APERTURE',
    heading: 'Skeletonized depth with ice-blue indices.',
    caption: 'FIG. 01 — OPENWORKED DIAL & APPLIED LUMINOUS BATONS',
    description:
      'The dial dispenses with a traditional opaque surface. Brushed anthracite bridges frame the barrel, gear train, and balance wheel, while faceted baton markers and syringe hands in cool steel-blue provide instantaneous legibility.',
    image: '/templates/aurel/aurel-dial-macro.webp',
    imageAlt: 'Macro study of the AUREL Origin skeleton dial, faceted ice-blue hour indices, and exposed mechanical calibre',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'DIAL ARCHITECTURE', value: 'Multi-level openworked anthracite' },
      { label: 'INDICES & HANDS', value: 'Diamond-cut steel with ice-blue tone' },
      { label: 'CRYSTAL', value: 'Box-domed sapphire, dual anti-reflective' },
    ],
  },
  {
    id: 'case',
    index: '02',
    tabLabel: '02 / CASE',
    subtitle: 'MATERIAL / GRADE 5 TITANIUM',
    heading: 'Linear satin brushing against polished bevels.',
    caption: 'FIG. 02 — 42MM TITANIUM CASE PROFILE & KNURLED CROWN',
    description:
      'Sculpted from solid Grade 5 titanium, the 42mm case balances Featherweight ergonomics with architectural presence. Continuous longitudinal brushing meets a single mirror-polished chamfer running from lug tip to lug tip.',
    image: '/templates/aurel/aurel-case-side.webp',
    imageAlt: 'Three-quarter profile of the AUREL brushed titanium watch case, polished lug chamfer, and fluted crown',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'CASE ALLOY', value: 'Grade 5 Titanium (Ti-6Al-4V concept)' },
      { label: 'SURFACE FINISH', value: 'Longitudinal satin brush & hand-beveled edge' },
      { label: 'CROWN', value: 'Fluted titanium with etched radial emblem' },
    ],
  },
  {
    id: 'movement',
    index: '03',
    tabLabel: '03 / MOVEMENT',
    subtitle: 'MOVEMENT / CALIBRE AU-01 CASEBACK',
    heading: 'Every component finished on both sides.',
    caption: 'FIG. 03 — EXHIBITION SAPPHIRE CASEBACK & BARREL RATCHET',
    description:
      'Seen through the exhibition sapphire caseback, Calibre AU-01 reveals sunray-brushed winding wheels, thermally blued screws, ruby jewel sinks, and bead-blasted bridges engineered for visual quietude.',
    image: '/templates/aurel/aurel-caseback.webp',
    imageAlt: 'Exhibition caseback of the AUREL Origin watch showing the mechanical movement, blued screws, and balance assembly',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'CALIBRE DESIGNATION', value: 'AU-01 Concept Mechanical' },
      { label: 'FASTENERS & JEWELS', value: 'Blued steel screws · Rubies in polished sinks' },
      { label: 'ENGRAVING', value: 'ORIGIN 01 · TITANIUM · INDIVIDUAL NUMBERING' },
    ],
  },
];

export function getHotspotById(id: string): AnatomyHotspot {
  return ANATOMY_HOTSPOTS.find((item) => item.id === id) ?? ANATOMY_HOTSPOTS[0];
}

export function getAdjacentHotspotId(currentId: string, direction: 'next' | 'prev'): string {
  const idx = ANATOMY_HOTSPOTS.findIndex((item) => item.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const delta = direction === 'next' ? 1 : -1;
  const nextIdx = (safeIdx + delta + ANATOMY_HOTSPOTS.length) % ANATOMY_HOTSPOTS.length;
  return ANATOMY_HOTSPOTS[nextIdx].id;
}

export function getAdjacentGalleryIndex(currentIndex: number, direction: 'next' | 'prev', total = GALLERY_SLIDES.length): number {
  if (total <= 0) return 0;
  const normalized = ((currentIndex % total) + total) % total;
  const delta = direction === 'next' ? 1 : -1;
  return (normalized + delta + total) % total;
}

export function formatGalleryProgress(index: number, total = GALLERY_SLIDES.length): string {
  const safeIndex = Math.max(0, Math.min(total - 1, index)) + 1;
  return `${String(safeIndex).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

export function validatePrivateViewingInquiry(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for correspondence.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a brief note regarding your viewing interest.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please provide at least 10 characters in your inquiry note.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
