/**
 * Verified local media inventory for ORBIT & BEYOND (2045 Concept).
 * All 6 media files are present locally in both /templates/orbitbeyond/orbit-beyond/ and /templates/orbitbeyond/.
 */

export const ORBIT_ASSETS = {
  heroPoster: '/templates/orbitbeyond/orbit-beyond/01-hero-lunar-clean.webp',
  heroPosterAltPath: '/templates/orbitbeyond/01-hero-lunar-clean.webp',
  heroVideo: '/templates/orbitbeyond/orbit-beyond/02-hero-lunar-loop.mp4',
  heroVideoAltPath: '/templates/orbitbeyond/02-hero-lunar-loop.mp4',
  orbitalTransit: '/templates/orbitbeyond/orbit-beyond/03-orbital-transit.webp',
  orbitalTransitAltPath: '/templates/orbitbeyond/03-orbital-transit.webp',
  habitatInterior: '/templates/orbitbeyond/orbit-beyond/04-habitat-interior.webp',
  habitatInteriorAltPath: '/templates/orbitbeyond/04-habitat-interior.webp',
  lunarRoverExcursion: '/templates/orbitbeyond/orbit-beyond/05-lunar-rover-excursion.webp',
  lunarRoverExcursionAltPath: '/templates/orbitbeyond/05-lunar-rover-excursion.webp',
  finalEarthrise: '/templates/orbitbeyond/orbit-beyond/06-final-earthrise.webp',
  finalEarthriseAltPath: '/templates/orbitbeyond/06-final-earthrise.webp',
} as const;

export type OrbitAssetKey = keyof typeof ORBIT_ASSETS;
