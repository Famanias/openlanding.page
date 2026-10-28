import type { WagasaPose } from "../model/createWagasaModel";
export const CHAPTERS = [
  "top",
  "structure",
  "light",
  "canopy",
  "making",
  "commission",
] as const;
export type StageRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};
export type ChapterFrame = WagasaPose & {
  open: number;
  explode: number;
  camera: [number, number, number];
  target: [number, number, number];
  rain: number;
  highlight: string | null;
};
export type DirectorState = ChapterFrame & {
  progress: number;
  chapter: number;
  local: number;
  rect: StageRect;
  reduced: boolean;
  introStart: number;
  interrupted: boolean;
  ready: boolean;
  rainIntensity: number;
  stageOpacity: number;
};
export const FRAMES: ChapterFrame[] = [
  {
    position: [0, 0, 0],
    rotation: [0.12, 0, -0.16],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [4, 3.1, 10],
    target: [0, 0.2, 0],
    rain: 0.15,
    highlight: null,
  },
  {
    position: [0, -0.1, 0],
    rotation: [-0.18, 0.5, 0.19],
    scale: 0.92,
    open: 1,
    explode: 0,
    camera: [3, -0.7, 9.6],
    target: [0, 0.4, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, -0.4, 0],
    rotation: [-0.2, 0.9, 0.1],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [0.3, -4.8, 8.8],
    target: [0, 0.7, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, 0, 0],
    rotation: [0.45, 1.6, -0.15],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [3.5, 4.6, 9.5],
    target: [0, 0.2, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, 0, 0],
    rotation: [-0.15, 2.3, 0.2],
    scale: 0.95,
    open: 0.94,
    explode: 0.7,
    camera: [2, 1.2, 9.6],
    target: [0, 0.2, 0],
    rain: 0,
    highlight: "ribs",
  },
  {
    position: [0, 0, 0],
    rotation: [0.08, 2.8, -0.32],
    scale: 1,
    open: 0,
    explode: 0,
    camera: [1, 1, 9],
    target: [0, 0, 0],
    rain: 0.12,
    highlight: null,
  },
];
export function initialDirector(): DirectorState {
  return {
    ...FRAMES[0],
    open: 0,
    progress: 0,
    chapter: 0,
    local: 0,
    rect: { left: 0, top: 0, width: 1, height: 1 },
    reduced: false,
    introStart: Infinity,
    interrupted: false,
    ready: false,
    rainIntensity: 0,
    stageOpacity: 1,
  };
}
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export function sampleChapter(index: number, t: number): ChapterFrame {
  const a = FRAMES[index],
    b = FRAMES[Math.min(index + 1, FRAMES.length - 1)];
  const f = Math.max(0, Math.min(1, (t - 0.62) / 0.38)),
    s = f * f * (3 - 2 * f);
  const vector = (x: [number, number, number], y: [number, number, number]) =>
    x.map((n, i) => mix(n, y[i], s)) as [number, number, number];
  return {
    position: vector(a.position, b.position),
    rotation: vector(a.rotation, b.rotation),
    scale: mix(a.scale, b.scale, s),
    open: mix(a.open, b.open, s),
    explode: mix(a.explode, b.explode, s),
    camera: vector(a.camera, b.camera),
    target: vector(a.target, b.target),
    rain: mix(a.rain, b.rain, s),
    highlight: a.highlight,
  };
}
