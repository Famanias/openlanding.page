import { clamp } from "../motion/math";

export const PHASES = [
  { name: "Pencil", progress: 0, label: "01 / Find the feeling", copy: "A loose line. A small observation. A world waiting to happen." },
  { name: "Colour", progress: .55, label: "02 / Give it a world", copy: "We find the light, mix the colours, and leave room for happy accidents." },
  { name: "Life", progress: 1, label: "03 / Let it breathe", copy: "A breeze through the grass. One little movement that makes it real." },
] as const;

export function phaseForProgress(progress: number) {
  const p = clamp(progress);
  return PHASES[p < .34 ? 0 : p < .75 ? 1 : 2];
}
