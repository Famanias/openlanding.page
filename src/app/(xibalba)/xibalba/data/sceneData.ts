export interface GlowSpot {
  left: number;
  top: number;
  width: number;
  cold?: boolean;
  delay?: number;
}

export interface FallCanvasSpec {
  left: number;
  top: number;
  width: number;
  height: number;
  kind: 'ghost' | 'lava';
  speed: number;
}

export interface MistSpec {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ParticleBoxSpec {
  kind: 'wisp' | 'mote' | 'spray' | 'bubble' | 'shimmer';
  count: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface SpiritPlacement {
  type: 'spirit1' | 'spirit2' | 'spirit3' | 'spirit4';
  left: number;
  top: number;
  width: number;
}

export interface SeamSpec {
  id: string;
  between: string;
  focus: number;
  imgSrc: string;
  fall?: FallCanvasSpec;
  glows: GlowSpot[];
}

export interface CodexFolio {
  numeral: string;
  title: string;
  mayaGlyphName: string;
  depth: string;
  excerpt: string;
  riteNotes: string;
}

export interface DescentStation {
  id: string;
  sceneId: string;
  depthMeters: number;
  title: string;
  subtitle: string;
  highlights: string[];
}

export const ASSET_URLS = {
  scene1: '/templates/xibalba/scene1.png',
  scene2: '/templates/xibalba/scene2.png',
  scene3: '/templates/xibalba/scene3.png',
  scene4: '/templates/xibalba/scene4.png',
  scene5: '/templates/xibalba/scene5.png',
  seam1: '/templates/xibalba/seam1-keyed.webp',
  seam2: '/templates/xibalba/seam2-keyed.webp',
  seam3: '/templates/xibalba/seam3-keyed.webp',
  seam4: '/templates/xibalba/seam4-keyed.webp',
  sprites: '/templates/xibalba/scene-sprites-keyed.webp',
};

export const SEAMS_DATA: SeamSpec[] = [
  {
    id: 'seam-1',
    between: 'Hero → The Cenote',
    focus: 50,
    imgSrc: ASSET_URLS.seam1,
    fall: { left: 48.8, top: 50, width: 6.0, height: 35, kind: 'ghost', speed: 1 },
    glows: [
      { left: 12.8, top: 31.5, width: 3.2 },
      { left: 88.2, top: 31.5, width: 3.2, delay: 0.8 },
    ],
  },
  {
    id: 'seam-2',
    between: 'The Cenote → The Calendar',
    focus: 30,
    imgSrc: ASSET_URLS.seam2,
    fall: { left: 25.5, top: 27, width: 9.2, height: 55, kind: 'ghost', speed: 1 },
    glows: [
      { left: 83.8, top: 19.5, width: 4.5 },
      { left: 19.8, top: 21.0, width: 3.0, delay: 0.5 },
      { left: 45.2, top: 20.5, width: 3.5, delay: 1.2 },
    ],
  },
  {
    id: 'seam-3',
    between: 'The Calendar → Plan Your Descent',
    focus: 75,
    imgSrc: ASSET_URLS.seam3,
    fall: { left: 72.8, top: 36, width: 6.2, height: 46, kind: 'ghost', speed: 1 },
    glows: [
      { left: 29.5, top: 22.5, width: 10.0, cold: true },
      { left: 90.5, top: 22.5, width: 7.0, cold: true, delay: 1.1 },
    ],
  },
  {
    id: 'seam-4',
    between: 'Plan Your Descent → Finale',
    focus: 50,
    imgSrc: ASSET_URLS.seam4,
    glows: [
      { left: 67.2, top: 19.0, width: 6.5 },
      { left: 45.5, top: 30.5, width: 8.0, delay: 0.7 },
    ],
  },
];

export const SCENE1_GLOWS: GlowSpot[] = [
  // Left cliff
  { left: 8.1, top: 38.2, width: 4.5, delay: 0.1 },
  { left: 15.5, top: 45.8, width: 4.0, delay: 0.6 },
  { left: 23.5, top: 49.3, width: 3.6, delay: 1.2 },
  { left: 28.3, top: 57.5, width: 3.2, delay: 0.4 },
  { left: 23.8, top: 67.2, width: 4.2, delay: 1.5 },
  { left: 32.5, top: 69.2, width: 3.4, delay: 0.9 },
  // Right cliff
  { left: 90.8, top: 37.5, width: 4.5, delay: 0.3 },
  { left: 83.8, top: 45.8, width: 4.0, delay: 1.1 },
  { left: 76.5, top: 49.3, width: 3.6, delay: 0.7 },
  { left: 71.4, top: 57.5, width: 3.2, delay: 1.4 },
  { left: 75.2, top: 67.2, width: 4.2, delay: 0.2 },
  { left: 67.2, top: 69.2, width: 3.4, delay: 1.0 },
];

export const SCENE2_GLOWS: GlowSpot[] = [
  // Cold jade-cyan: Obsidian altar mirror + 6 Ghost-orchid cylinders
  { left: 26.5, top: 64.5, width: 6.5, cold: true, delay: 0.2 },
  { left: 73.2, top: 29.0, width: 4.8, cold: true, delay: 0.5 },
  { left: 86.0, top: 34.8, width: 4.8, cold: true, delay: 1.1 },
  { left: 75.2, top: 50.0, width: 4.2, cold: true, delay: 0.8 },
  { left: 79.5, top: 49.2, width: 4.8, cold: true, delay: 1.4 },
  { left: 71.8, top: 58.8, width: 4.8, cold: true, delay: 0.3 },
  { left: 86.0, top: 61.2, width: 4.8, cold: true, delay: 0.9 },
  // Warm glows
  { left: 7.8, top: 77.5, width: 3.8, delay: 0.4 },
  { left: 17.0, top: 81.0, width: 3.8, delay: 1.0 },
  { left: 92.5, top: 81.5, width: 5.5, delay: 0.7 },
];

export const SCENE3_GLOWS: GlowSpot[] = [
  // 5 Warm wheel-brazier glows (width 4.4%)
  { left: 13.8, top: 36.2, width: 4.4, delay: 0.2 },
  { left: 43.8, top: 36.5, width: 4.4, delay: 0.7 },
  { left: 50.0, top: 55.4, width: 4.4, delay: 1.3 },
  { left: 8.2, top: 69.2, width: 4.4, delay: 0.5 },
  { left: 48.2, top: 79.8, width: 4.4, delay: 1.0 },
  // 2 Cold jade-codex glows (width 8.5%)
  { left: 64.2, top: 61.5, width: 8.5, cold: true, delay: 0.3 },
  { left: 89.0, top: 61.5, width: 8.5, cold: true, delay: 1.1 },
  // 3 Warm floor-candle glows (width 2.6%)
  { left: 58.4, top: 81.8, width: 2.6, delay: 0.4 },
  { left: 76.8, top: 81.2, width: 2.6, delay: 0.9 },
  { left: 95.4, top: 82.2, width: 2.6, delay: 1.5 },
];

export const SCENE4_GLOWS: GlowSpot[] = [
  // Warm glows: floor pool, left resin vat, floor braziers
  { left: 74.5, top: 91.5, width: 26.0, delay: 0.1 },
  { left: 25.2, top: 72.5, width: 14.0, delay: 0.8 },
  { left: 14.5, top: 83.2, width: 5.0, delay: 0.4 },
  { left: 40.2, top: 77.2, width: 5.0, delay: 1.2 },
  // Cold glow where jade falls meet cauldron rim
  { left: 75.0, top: 35.5, width: 18.0, cold: true, delay: 0.5 },
];

export const SCENE5_GLOWS: GlowSpot[] = [
  // 15 Warm floating lotus-lantern glows
  { left: 34.0, top: 84.8, width: 2.8, delay: 0.1 },
  { left: 37.6, top: 90.2, width: 3.6, delay: 0.4 },
  { left: 38.0, top: 78.5, width: 2.0, delay: 0.8 },
  { left: 41.8, top: 81.5, width: 2.4, delay: 1.2 },
  { left: 43.6, top: 78.5, width: 2.0, delay: 0.3 },
  { left: 44.0, top: 85.8, width: 3.0, delay: 0.9 },
  { left: 46.4, top: 80.2, width: 2.2, delay: 1.4 },
  { left: 47.8, top: 84.2, width: 2.8, delay: 0.6 },
  { left: 51.8, top: 88.5, width: 3.4, delay: 1.1 },
  { left: 52.0, top: 81.2, width: 2.4, delay: 0.2 },
  { left: 55.6, top: 84.5, width: 2.8, delay: 0.7 },
  { left: 59.2, top: 81.2, width: 2.4, delay: 1.3 },
  { left: 61.2, top: 91.5, width: 3.8, delay: 0.5 },
  { left: 62.6, top: 84.5, width: 2.8, delay: 1.0 },
  { left: 68.8, top: 85.8, width: 3.0, delay: 1.5 },
  // 2 Large cliff-brazier glows
  { left: 12.2, top: 56.5, width: 9.0, delay: 0.3 },
  { left: 91.2, top: 73.5, width: 11.0, delay: 0.9 },
];

export const CODEX_FOLIOS: CodexFolio[] = [
  {
    numeral: 'Folio I',
    title: 'The Rim & Eclipse of Kukulcán',
    mayaGlyphName: 'AKʼAB · 0m Elev.',
    depth: 'Canyon Rim — 0m',
    excerpt:
      'When the autumn sun crosses the celestial equator, the stepped pyramid of the upper jungle casts a ring of amber fire across the sinkhole mouth. At dusk, twelve limestone braziers are lit along the fractured rim.',
    riteNotes:
      'Pilgrims receive unglazed clay copal censers at the upper stelae before descending the root-carved stairway.',
  },
  {
    numeral: 'Folio II',
    title: 'The Vault of Ghost Orchids',
    mayaGlyphName: 'IKʼ · -42m Elev.',
    depth: 'Orchid Vaults — -42m',
    excerpt:
      'Forty-two meters below the canopy, mineral-rich springs mist the carved columns where Dendrophylax lindenii—the leafless ghost orchid—blooms only on the night of the equinox in quartz-sealed reliquaries.',
    riteNotes:
      'Pause before the obsidian scrying mirror on the western ledge; speak no above-ground names past this threshold.',
  },
  {
    numeral: 'Folio III',
    title: 'The Haabʼ Water-Calendar Wheel',
    mayaGlyphName: 'KʼIN · -96m Elev.',
    depth: 'Calendar Chasm — -96m',
    excerpt:
      'Driven by the shearing western cascade, the monolith wheel completes a single revolution between sunset and midnight. Each stone tooth carries strips of beaten amate bark inscribed with prayers.',
    riteNotes:
      'Wedge your bark strip into an ascending tooth as the water-drums sound their slow 60-beat cadence.',
  },
  {
    numeral: 'Folio IV',
    title: 'The Serpent Foundry & Moon River',
    mayaGlyphName: 'HAʼ · -145m to -180m',
    depth: 'Copal Foundry & River Mouth — -180m',
    excerpt:
      'In the lower kiln cavern, jade springwater cools the great three-headed serpent cauldron while molten amber copal resin pours into the stone basin. Beyond the stalactite arch, the subterranean river opens to the low horizon moon.',
    riteNotes:
      'At the twelfth conch blast, carry a floating lotus lantern to the water’s edge and release it toward the sea.',
  },
];

export const DESCENT_STATIONS: DescentStation[] = [
  {
    id: 'station-top',
    sceneId: 'top',
    depthMeters: 0,
    title: 'I. The Jungle Rim & Eclipsed Pyramid',
    subtitle: '18:00 — Rim Gates & Twelve Copal Braziers',
    highlights: ['Upper & Lower Jade Cascade', 'Morpho Spirit Gathering', 'Censer Distribution'],
  },
  {
    id: 'station-story',
    sceneId: 'story',
    depthMeters: -42,
    title: 'II. The Cenote & Ghost-Orchid Vault',
    subtitle: '19:15 — Obsidian Altar Mirror & Six Reliquary Cylinders',
    highlights: ['Central Plunge Pool', 'Obsidian Scrying Altar', 'Bioluminescent Orchid Pillar'],
  },
  {
    id: 'station-rites',
    sceneId: 'rites',
    depthMeters: -96,
    title: 'III. The Turning Stone Calendar',
    subtitle: '21:00 — Mayan Water-Wheel & Twin Jade Codices',
    highlights: ['Hydro-Driven Calendar Monolith', 'Amate Bark Wish Press', 'Twin Illuminated Codices'],
  },
  {
    id: 'station-night',
    sceneId: 'night',
    depthMeters: -145,
    title: 'IV. The Copal Foundry & Serpent Cauldron',
    subtitle: '22:30 — Spiced Cacao, Honey Balché & Molten Resin Conduits',
    highlights: ['Three Serpent Resin Spouts', 'Amber Copal Kiln Vat', 'Foundry Feast Hall'],
  },
  {
    id: 'station-finale',
    sceneId: 'finale',
    depthMeters: -180,
    title: 'V. Sanctuary Where the River Opens',
    subtitle: '00:00 — Twelfth Conch Blast & Floating Lotus Lanterns',
    highlights: ['Seaward Cavern Arch', 'Horizon Moon Shimmer', 'Fifteen Lotus Lantern Fleet'],
  },
];
