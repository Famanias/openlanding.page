/**
 * Pure world map geometry, scroll-to-camera interpolation, act definitions,
 * and verified Analogue Pocket product data for WARP & WANDER.
 */

export const PALETTE = {
  twilightIndigo: '#23244F',
  fernForest: '#2F644F',
  goldenNectar: '#FFD06A',
  coralBloom: '#FF907A',
  daylightCream: '#FFF1D3',
  lagoonMist: '#6DDCC5',
  mulberryShadow: '#604A79',
} as const;

export const PARALLAX_RATIOS = {
  farSky: 0.15,
  mountains: 0.30,
  midground: 0.58,
  walkableGround: 0.85,
  foreground: 1.0,
} as const;

export interface ActDefinition {
  id: string;
  actNumber: number;
  code: string;
  shortTitle: string;
  title: string;
  headline: string;
  supportCopy: string;
  worldXStart: number;
  worldXEnd: number;
  skyTopHex: string;
  skyBottomHex: string;
  horizonGlowHex: string;
  pipNarrativeNote: string;
}

export const WORLD_TOTAL_WIDTH = 6000;

export const ACTS: ActDefinition[] = [
  {
    id: 'act-0',
    actNumber: 0,
    code: 'ACT 00',
    shortTitle: 'The Portal',
    title: 'THE PORTAL / HERO',
    headline: 'EVERY WORLD BEGINS WITH PLAY.',
    supportCopy: 'Meet the handheld that brings the classics along for the ride.',
    worldXStart: 0,
    worldXEnd: 1000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'Pip waits beside the Daybreak Archway where pixel paths meet physical hardware.',
  },
  {
    id: 'act-1',
    actNumber: 1,
    code: 'ACT 01',
    shortTitle: 'Cartridge Forest',
    title: 'THE FOREST OF CARTRIDGES',
    headline: 'OLD ADVENTURES. NEW JOURNEYS.',
    supportCopy:
      'Out of the box, Analogue Pocket is compatible with the 2,780+ Game Boy, Game Boy Color, and Game Boy Advance game cartridge library—with optional cartridge adapters for other classic portable formats.',
    worldXStart: 1000,
    worldXEnd: 2000,
    skyTopHex: '#23244F',
    skyBottomHex: '#2F644F',
    horizonGlowHex: '#FFD06A',
    pipNarrativeNote: 'Beneath the oversized fern canopy, three cartridge relics hum with multi-system memory.',
  },
  {
    id: 'act-2',
    actNumber: 2,
    code: 'ACT 02',
    shortTitle: 'Crystal Lake',
    title: 'THE CRYSTAL LAKE / DISPLAY',
    headline: 'A WINDOW INTO EVERY DETAIL.',
    supportCopy:
      'A custom 3.5-inch, 1600 × 1440 resolution LCD delivering 615 ppi and 10× the resolution of the original Game Boy—engineered for razor-sharp integer scaling and faithful display modes.',
    worldXStart: 2000,
    worldXEnd: 3000,
    skyTopHex: '#23244F',
    skyBottomHex: '#604A79',
    horizonGlowHex: '#6DDCC5',
    pipNarrativeNote: 'The Crystalline Basin reflects every individual sub-pixel with zero blur or distortion.',
  },
  {
    id: 'act-3',
    actNumber: 3,
    code: 'ACT 03',
    shortTitle: 'Clockwork Ridge',
    title: 'THE CLOCKWORK RIDGE / PRECISION',
    headline: 'BUILT FOR THE WAY PLAY FEELS.',
    supportCopy:
      'Engineered with dual dedicated FPGAs—no software emulation—paired with responsive physical controls, a precision directional pad, and an iconic handheld silhouette.',
    worldXStart: 3000,
    worldXEnd: 4000,
    skyTopHex: '#23244F',
    skyBottomHex: '#604A79',
    horizonGlowHex: '#FF907A',
    pipNarrativeNote: 'Brass gears interlock on Clockwork Ridge, mirroring hardware-level FPGA timing accuracy.',
  },
  {
    id: 'act-4',
    actNumber: 4,
    code: 'ACT 04',
    shortTitle: 'Cloud City',
    title: 'THE CLOUD CITY / PLAYFUL INTERLUDE',
    headline: 'FOLLOW THE NEXT LITTLE ADVENTURE.',
    supportCopy:
      'Take an optional detour across the wind-swept platforms of Cloud City to gather three Compass Shards with Pip—or skip straight ahead to the final gate.',
    worldXStart: 4000,
    worldXEnd: 5000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'Floating stepping stones drift in the warm afternoon breeze—an optional browser interlude.',
  },
  {
    id: 'act-5',
    actNumber: 5,
    code: 'ACT 05',
    shortTitle: 'The Last Gate',
    title: 'THE LAST GATE / PRODUCT REVEAL',
    headline: 'THE ADVENTURE FITS IN YOUR HANDS.',
    supportCopy: 'A tribute to portable play, made for real cartridges and real moments.',
    worldXStart: 5000,
    worldXEnd: 6000,
    skyTopHex: '#23244F',
    skyBottomHex: '#FFD06A',
    horizonGlowHex: '#FFF1D3',
    pipNarrativeNote: 'The ancient stone sanctuary opens onto the real Analogue Pocket.',
  },
];

export interface CartridgeArtifact {
  id: string;
  name: string;
  systemBadge: string;
  worldLandmark: string;
  scrollUnlockMark: string;
  verifiedFact: string;
  detailDescription: string;
  accentColor: string;
  glyphPattern: number[][];
}

export const CARTRIDGE_ARTIFACTS: CartridgeArtifact[] = [
  {
    id: 'artifact-gb',
    name: 'Sunstone Relic',
    systemBadge: 'Game Boy & Game Boy Color',
    worldLandmark: 'Canopy Trail Marker (25% Traverse)',
    scrollUnlockMark: '01 · NATIVE SLOT',
    verifiedFact: 'Supports original Game Boy and Game Boy Color physical cartridges right out of the box.',
    detailDescription:
      'Slide your original monochrome or color cartridges directly into the built-in rear cartridge slot. No ROM dumps, no software emulation layers—just immediate hardware-level recognition of your physical collection.',
    accentColor: '#FFD06A',
    glyphPattern: [
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
    ],
  },
  {
    id: 'artifact-gba',
    name: 'Lagoon Prism Slate',
    systemBadge: 'Game Boy Advance',
    worldLandmark: 'Old Moss Bridge (55% Traverse)',
    scrollUnlockMark: '02 · 32-BIT PORTABLE',
    verifiedFact: 'Natively plays Game Boy Advance cartridges through the same multi-format cartridge bay.',
    detailDescription:
      'Across the Old Moss Bridge, 32-bit portable classics come to life with dedicated aspect-ratio framing and authentic hardware timing across the entire Game Boy Advance cartridge catalog.',
    accentColor: '#6DDCC5',
    glyphPattern: [
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 0],
    ],
  },
  {
    id: 'artifact-adapters',
    name: 'Coral Wayfinder Crest',
    systemBadge: 'Optional Cartridge Adapters',
    worldLandmark: 'Lakeside Archway (80% Traverse)',
    scrollUnlockMark: '03 · EXPANDED SYSTEMS',
    verifiedFact:
      'Optional snap-in cartridge adapters expand support to Game Gear, Neo Geo Pocket Color, Atari Lynx, and TurboGrafx-16 / PC Engine.',
    detailDescription:
      'Engineered as a true multi-system tribute to portable history, Analogue Pocket transforms with optional physical cartridge adapters while preserving direct FPGA hardware execution.',
    accentColor: '#FF907A',
    glyphPattern: [
      [1, 0, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 0, 1],
    ],
  },
];

export interface PrecisionFeatureMarker {
  id: 'dpad' | 'buttons' | 'fpga' | 'shell';
  code: string;
  label: string;
  subtitle: string;
  verifiedClaim: string;
  description: string;
  coordinates: { xPercent: number; yPercent: number };
}

export const PRECISION_MARKERS: PrecisionFeatureMarker[] = [
  {
    id: 'dpad',
    code: 'M-01',
    label: 'Tactile Directional Pad',
    subtitle: 'Pivot-balanced four-way input',
    verifiedClaim: 'Engineered physical D-pad designed for crisp diagonals and responsive directional control.',
    description:
      'Every step across a pixel world relies on muscle memory. The physical directional pad sits flush against the matte shell with a central pivot that prevents false inputs during rapid platforming.',
    coordinates: { xPercent: 26, yPercent: 64 },
  },
  {
    id: 'buttons',
    code: 'M-02',
    label: 'Action & System Controls',
    subtitle: 'Four face buttons + Analogue / Start / Select',
    verifiedClaim: 'Physical face buttons, shoulder triggers, and dedicated system controls—zero touchscreen gimmicks.',
    description:
      'Textured face buttons and sculpted shoulder buttons on the back casing provide unmistakable mechanical travel and immediate tactile rebound.',
    coordinates: { xPercent: 74, yPercent: 62 },
  },
  {
    id: 'fpga',
    code: 'M-03',
    label: 'Dual FPGA Architecture',
    subtitle: 'Altera Cyclone V + Cyclone 10',
    verifiedClaim: 'Uses FPGA-based hardware rather than software emulation for cycle-accurate cartridge execution.',
    description:
      'Instead of approximating classic consoles in software, Analogue Pocket configures Field Programmable Gate Arrays at the transistor logic level to operate directly with physical cartridges.',
    coordinates: { xPercent: 50, yPercent: 34 },
  },
  {
    id: 'shell',
    code: 'M-04',
    label: 'Sculpted Handheld Form',
    subtitle: 'Gorilla Glass lens & precision enclosure',
    verifiedClaim: 'Compact vertical handheld ergonomics built around a custom alkali-aluminosilicate glass display lens.',
    description:
      'Balanced weight distribution, recessed cartridge guides, USB-C charging, a 3.5mm headphone jack, and an original link cable port honor the heritage of portable hardware.',
    coordinates: { xPercent: 50, yPercent: 84 },
  },
];

/**
 * Clamp a number between min and max.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Convert normalized document scroll progress [0..1] to world X coordinate [0..WORLD_TOTAL_WIDTH].
 */
export function scrollProgressToWorldX(progress: number): number {
  const clamped = clamp(progress, 0, 1);
  return Math.round(clamped * WORLD_TOTAL_WIDTH);
}

/**
 * Determine which Act (0..5) is currently active given normalized scroll progress [0..1].
 */
export function getActiveActFromProgress(progress: number): ActDefinition {
  const worldX = scrollProgressToWorldX(progress);
  for (let i = ACTS.length - 1; i >= 0; i--) {
    if (worldX >= ACTS[i].worldXStart) {
      return ACTS[i];
    }
  }
  return ACTS[0];
}

/**
 * Parse a 6-digit hex color string into RGB [0..255].
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Convert RGB [0..255] back to #RRGGBB hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Linearly interpolate between two hex colors.
 */
export function lerpHexColor(hexA: string, hexB: string, t: number): string {
  const ratio = clamp(t, 0, 1);
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(
    a.r + (b.r - a.r) * ratio,
    a.g + (b.g - a.g) * ratio,
    a.b + (b.b - a.b) * ratio
  );
}

/**
 * Compute continuous sky colors for any worldX position so there are never section seams.
 */
export function interpolateSkyPalette(worldX: number): {
  skyTop: string;
  skyBottom: string;
  horizonGlow: string;
} {
  const x = clamp(worldX, 0, WORLD_TOTAL_WIDTH);
  const rawIndex = x / 1000;
  const idxA = clamp(Math.floor(rawIndex), 0, ACTS.length - 1);
  const idxB = clamp(idxA + 1, 0, ACTS.length - 1);
  const localT = clamp(rawIndex - idxA, 0, 1);

  const actA = ACTS[idxA];
  const actB = ACTS[idxB];

  return {
    skyTop: lerpHexColor(actA.skyTopHex, actB.skyTopHex, localT),
    skyBottom: lerpHexColor(actA.skyBottomHex, actB.skyBottomHex, localT),
    horizonGlow: lerpHexColor(actA.horizonGlowHex, actB.horizonGlowHex, localT),
  };
}

/**
 * Compute walkable ground elevation offset (in logical pixels from baseline) at worldX.
 * Quantized to 4px steps for authentic pixel-art terrain contour.
 */
export function getTerrainHeightAtX(worldX: number): number {
  const x = clamp(worldX, 0, WORLD_TOTAL_WIDTH);

  // Act 0 (0..1000): Gentle sunrise valley slope leading to stone archway
  if (x < 1000) {
    const wave = Math.sin((x / 1000) * Math.PI) * 16;
    return Math.round(wave / 4) * 4;
  }
  // Act 1 (1000..2000): Forest path with arched wooden bridge between 1500..1800
  if (x < 2000) {
    const localX = x - 1000;
    if (localX >= 500 && localX <= 800) {
      const bridgeT = (localX - 500) / 300;
      const bridgeArch = Math.sin(bridgeT * Math.PI) * 28;
      return Math.round(bridgeArch / 4) * 4;
    }
    return Math.round((Math.sin(localX * 0.01) * 8) / 4) * 4;
  }
  // Act 2 (2000..3000): Low crystalline lakeshore boardwalk
  if (x < 3000) {
    return -8;
  }
  // Act 3 (3000..4000): Clockwork Ridge ascending mechanical lift & terraced cliff
  if (x < 4000) {
    const localX = x - 3000;
    const climb = Math.min(48, (localX / 800) * 48);
    return Math.round(climb / 4) * 4;
  }
  // Act 4 (4000..5000): Cloud City stepped floating islands
  if (x < 5000) {
    const localX = x - 4000;
    const step = Math.sin((localX / 1000) * Math.PI * 2) * 20 + 28;
    return Math.round(step / 4) * 4;
  }
  // Act 5 (5000..6000): Sanctuary chamber level stone terrace
  return 16;
}
