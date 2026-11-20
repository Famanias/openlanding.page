export const DESERT_PALETTE = {
  // Sky & paper tones
  chalkCream: '#F5EEE0',
  warmCream: '#F3E9DA',
  paleSand: '#E7D4BF',
  warmPaperEdge: '#E8D8C4',

  // Sun & golden glow
  sunTop: '#E5BE78',
  sunMid: '#DDB876',
  sunLower: '#DEC08A',
  sunGlow: '#EFE0C4',

  // Atmospheric haze & dust
  dustHazeLight: '#E8D5C4',
  dustHaze: '#D8C0B0',
  dustHazeDeep: '#CAA893',
  mistCream: '#F4ECDF',

  // Midground dunes & sandstone ledges
  duneBeige: '#DFBE9F',
  warmDune: '#D9B49A',
  sunlitOchre: '#D59C73',
  mutedOchre: '#C98962',

  // Terracotta & burnt sienna canyon forms
  terracottaLight: '#C57B55',
  terracotta: '#B96B4A',
  terracottaDeep: '#A35538',
  burntSienna: '#8A4C38',
  burntSiennaDeep: '#6E392B',

  // Deep shadows, fissures & figure
  umberShadow: '#543029',
  deepUmber: '#4A2E2B',
  charcoalUmber: '#331D1A',
  inkDark: '#261412',

  // Sparse vegetation highlights
  dryGrassLight: '#ECD6BE',
  dryGrassMid: '#7D4B3A',
  dryGrassDark: '#361E1B',
} as const;

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
}

export function mixHex(hexA: string, hexB: string, t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const a = hexA.replace('#', '');
  const b = hexB.replace('#', '');
  const ar = parseInt(a.slice(0, 2), 16);
  const ag = parseInt(a.slice(2, 4), 16);
  const ab = parseInt(a.slice(4, 6), 16);
  const br = parseInt(b.slice(0, 2), 16);
  const bg = parseInt(b.slice(2, 4), 16);
  const bb = parseInt(b.slice(4, 6), 16);
  const r = Math.round(ar + (br - ar) * clamped);
  const g = Math.round(ag + (bg - ag) * clamped);
  const bl = Math.round(ab + (bb - ab) * clamped);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}
