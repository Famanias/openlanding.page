import { DEFAULT_SCORE, type Score } from "../score/score";

/**
 * The per-frame state of the walk. The house loop writes it; the light engine,
 * the depth rail and the Score Room read it. Plain mutable data, no React.
 */
export type Frame = {
  mode: "corridor" | "flow";
  /** Camera z, css px. */
  z: number;
  yaw: number;
  pitch: number;
  /** Continuous station position (0 … 7). */
  station: number;
  /** In flow mode, the room in view (fractional while crossing). */
  flowRoom: number;
  pointer: { x: number; y: number; energy: number };
  score: Score;
  /** Bumped whenever `score` changes, so the engine re-uploads the palette. */
  scoreVersion: number;
};

export const frame: Frame = {
  mode: "flow",
  z: 0,
  yaw: 0,
  pitch: 0,
  station: 0,
  flowRoom: 0,
  pointer: { x: 0, y: 0, energy: 0 },
  score: { ...DEFAULT_SCORE },
  scoreVersion: 0,
};

type Tick = (now: number) => void;
const ticks = new Set<Tick>();

/** Things that redraw every frame (the light, the depth rail) subscribe here. */
export function onFrame(tick: Tick): () => void {
  ticks.add(tick);
  return () => ticks.delete(tick);
}

export function emitFrame(now: number) {
  for (const t of ticks) t(now);
}

export function setScore(next: Score) {
  frame.score = next;
  frame.scoreVersion++;
}
