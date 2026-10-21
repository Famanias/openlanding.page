import type { RoomId } from "../rooms/rooms";

/**
 * The light of each room. These colours are content (like a photograph of the
 * sky), not UI, so this file is exempt from the palette guard.
 *
 * Stops run deep → mid → bright → highlight. `style` picks the field shape in
 * the shader; `speed` is flow per second; `scale` is the size of the forms.
 */

export type FieldStyle = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const STYLE = {
  mist: 0,
  horizon: 1,
  curtain: 2,
  sparks: 3,
  band: 4,
  score: 5,
  zodiacal: 6,
} as const satisfies Record<string, FieldStyle>;

export type Phenomenon = {
  stops: [string, string, string, string];
  style: FieldStyle;
  speed: number;
  scale: number;
  /** Wall brightness, 0–1.5. */
  glow: number;
};

export const PHENOMENA: Record<RoomId, Phenomenon> = {
  foyer: { stops: ["#0B0A1A", "#2A2152", "#6E5BC8", "#D9CCFF"], style: STYLE.mist, speed: 0.06, scale: 1.0, glow: 0.9 },
  "blue-hour": { stops: ["#040A22", "#0E2A6B", "#2F63D6", "#F2A66E"], style: STYLE.horizon, speed: 0.05, scale: 1.1, glow: 1.05 },
  aurora: { stops: ["#030F0D", "#0F5E47", "#33F0A4", "#C08AFF"], style: STYLE.curtain, speed: 0.12, scale: 1.0, glow: 1.5 },
  noctiluca: { stops: ["#010611", "#04223D", "#0FA3DA", "#8AF7FF"], style: STYLE.sparks, speed: 0.08, scale: 1.0, glow: 1.0 },
  alpenglow: { stops: ["#1A0912", "#6E2142", "#F27C68", "#FFD6A6"], style: STYLE.band, speed: 0.05, scale: 1.2, glow: 1.05 },
  score: { stops: ["#0B0A1A", "#2A2152", "#6E5BC8", "#D9CCFF"], style: STYLE.score, speed: 0.15, scale: 1.4, glow: 1.0 },
  visit: { stops: ["#07060D", "#221A3A", "#8C7BD9", "#EADFCB"], style: STYLE.zodiacal, speed: 0.03, scale: 1.0, glow: 0.8 },
  exit: { stops: ["#07060D", "#1B1530", "#5C4FA0", "#C9B8FF"], style: STYLE.mist, speed: 0.04, scale: 1.0, glow: 0.6 },
};

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}
