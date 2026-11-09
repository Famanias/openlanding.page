export interface ForumAssetEntry {
  id: string;
  filename: string;
  src: string;
  fallbackSrc: string;
  width: number;
  height: number;
  aspectRatio: string;
  role: 'reference-only' | 'production-hero' | 'production-plate' | 'production-wide';
  alt: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
}

export const FORUM_ASSETS = {
  heroApprovedReference: {
    id: '01-hero-forum-approved',
    filename: '01-hero-forum-approved.webp',
    src: '/templates/forum/forum/01-hero-forum-approved.webp',
    fallbackSrc: '/templates/forum/01-hero-forum-approved.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'reference-only',
    alt: 'Approved hero design mockup reference (not displayed in live layout)',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
  heroMonolithClean: {
    id: '02-hero-monolith-clean',
    filename: '02-hero-monolith-clean.webp',
    src: '/templates/forum/forum/02-hero-monolith-clean.webp',
    fallbackSrc: '/templates/forum/02-hero-monolith-clean.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'production-hero',
    alt: 'Monumental dithered black monolith occluding a solar eclipse with radiant khaki halo',
    objectPositionDesktop: '74% 50%',
    objectPositionMobile: '72% 38%',
  },
  cardSignalObservatory: {
    id: '03-card-signal-observatory',
    filename: '03-card-signal-observatory.webp',
    src: '/templates/forum/forum/03-card-signal-observatory.webp',
    fallbackSrc: '/templates/forum/03-card-signal-observatory.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Dithered circular orbital signal observatory dish aligned against a solar eclipse',
    objectPositionDesktop: '50% 48%',
    objectPositionMobile: '50% 45%',
  },
  cardNetworkField: {
    id: '04-card-network-field',
    filename: '04-card-network-field.webp',
    src: '/templates/forum/forum/04-card-network-field.webp',
    fallbackSrc: '/templates/forum/04-card-network-field.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Vast ordered perspective grid of signal nodes converging on a luminous horizon core',
    objectPositionDesktop: '50% 45%',
    objectPositionMobile: '50% 45%',
  },
  cardCommandInterface: {
    id: '05-card-command-interface',
    filename: '05-card-command-interface.webp',
    src: '/templates/forum/forum/05-card-command-interface.webp',
    fallbackSrc: '/templates/forum/05-card-command-interface.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Architectural command canyon flanking a suspended circular radar intelligence core',
    objectPositionDesktop: '50% 42%',
    objectPositionMobile: '50% 40%',
  },
  cardOrbitalArchive: {
    id: '06-card-orbital-archive',
    filename: '06-card-orbital-archive.webp',
    src: '/templates/forum/forum/06-card-orbital-archive.webp',
    fallbackSrc: '/templates/forum/06-card-orbital-archive.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Interconnected vertical towers and sweeping orbital archive rings around a distant star',
    objectPositionDesktop: '50% 50%',
    objectPositionMobile: '50% 50%',
  },
  cardAlignmentEngine: {
    id: '07-card-alignment-engine',
    filename: '07-card-alignment-engine.webp',
    src: '/templates/forum/forum/07-card-alignment-engine.webp',
    fallbackSrc: '/templates/forum/07-card-alignment-engine.webp',
    width: 1792,
    height: 2400,
    aspectRatio: '1792 / 2400',
    role: 'production-plate',
    alt: 'Central architectural pillar encircled by interlocking gyroscope alignment rings',
    objectPositionDesktop: '50% 50%',
    objectPositionMobile: '50% 50%',
  },
  dividerWide: {
    id: '08-divider-wide',
    filename: '08-divider-wide.webp',
    src: '/templates/forum/forum/08-divider-wide.webp',
    fallbackSrc: '/templates/forum/08-divider-wide.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'production-wide',
    alt: 'Panoramic landscape of monolithic pillars receding toward a horizon solar eclipse',
    objectPositionDesktop: '50% 52%',
    objectPositionMobile: '45% 50%',
  },
  footerMockupReference: {
    id: '09-footer-mockup',
    filename: '09-footer-mockup.webp',
    src: '/templates/forum/forum/09-footer-mockup.webp',
    fallbackSrc: '/templates/forum/09-footer-mockup.webp',
    width: 2752,
    height: 1536,
    aspectRatio: '2752 / 1536',
    role: 'reference-only',
    alt: 'Approved final orbit and footer layout reference (not displayed in live layout)',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
} as const satisfies Record<string, ForumAssetEntry>;

export type ForumAssetKey = keyof typeof FORUM_ASSETS;
