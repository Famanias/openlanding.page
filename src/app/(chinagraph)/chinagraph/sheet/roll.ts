import { clamp01, easeInOutCubic, flashCurve, segment } from "../motion/math";

export type Frame = { n: number; image: string; select: boolean; alt: string };

/** The six frames marked on the sheet, in roll order. Each becomes a look. */
export const SELECTS = [2, 4, 5, 7, 10, 12];

const ALT: string[] = [
  "Model walking fast through a concrete underpass at night in an oversized coat, motion-blurred under direct flash",
  "Look 01: the navy melton box coat against a brutalist concrete wall, hard flash shadow behind",
  "Model sitting on a car-park stairwell, knees up, flash bouncing off painted concrete",
  "Look 02: the black waxed-cotton work jacket on a petrol-station forecourt under sodium light and flash",
  "Look 03: charcoal flannel pleated trousers mid-stride on a wet zebra crossing",
  "Out-take: a blurred, laughing frame, eyes closed against the flash",
  "Look 04: the bone boiled-wool rollneck against a corrugated metal shutter",
  "Model walking away down a tiled tunnel, back to camera",
  "Hands in coat pockets on a rooftop car-park ramp",
  "Look 05: the rain-grey gabardine double-breasted suit on a rooftop car park, city haze behind",
  "Out-take: a flash flare burning out half the frame",
  "Look 06: the oxblood leather car coat, leaning on a dark car in an empty multi-storey",
];

export const FRAMES: Frame[] = ALT.map((alt, index) => {
  const n = index + 1;
  return { n, image: `roll-${String(n).padStart(2, "0")}`, select: SELECTS.includes(n), alt };
});

/** Scene timeline (share of the pinned scroll). */
export const SWEEP_START = 0.04;
export const SWEEP_END = 0.68;
export const ENLARGE_START = 0.74;
export const ENLARGE_END = 0.96;

const sweep = (p: number) => segment(p, SWEEP_START, SWEEP_END) * FRAMES.length;

/** The frame (1–12) under the loupe. */
export function frameAt(p: number): number {
  return Math.min(FRAMES.length, Math.floor(sweep(p)) + 1);
}

/** Continuous loupe position, 0 = centre of frame 1 … 11 = centre of frame 12. */
export function loupeAt(p: number): number {
  return Math.min(FRAMES.length - 1, Math.max(0, sweep(p) - 0.5));
}

/** How much of a select's grease-pencil mark is drawn (0–1). Non-selects are never marked. */
export function markAt(p: number, frame: number): number {
  if (!SELECTS.includes(frame)) return 0;
  return clamp01(sweep(p) - (frame - 1));
}

/** The first select's enlargement from its cell to full screen, eased. */
export function enlargeAt(p: number): number {
  return easeInOutCubic(segment(p, ENLARGE_START, ENLARGE_END));
}

/** The strobe that lands with the enlargement; it has fully decayed by the end of the pinned scroll. */
export function flashAt(p: number): number {
  return flashCurve(p, ENLARGE_END - 0.04, 1);
}

export function counterAt(p: number): string {
  const n = p >= ENLARGE_START ? SELECTS[0] : frameAt(p);
  return `Frame ${String(n).padStart(2, "0")} / ${FRAMES.length}`;
}

export type Rect = { x: number; y: number; w: number; h: number };
export type Flip = { x: number; y: number; s: number };

/**
 * The transform that shrinks a stage-covering square (side = the stage's longer edge, centred)
 * back onto a contact-sheet cell. Animating it to identity enlarges the frame with transforms only.
 */
export function flipToSquare(cell: Rect, stage: { w: number; h: number }): Flip {
  const side = Math.max(stage.w, stage.h);
  return {
    x: cell.x + cell.w / 2 - stage.w / 2,
    y: cell.y + cell.h / 2 - stage.h / 2,
    s: side ? cell.w / side : 1,
  };
}

export function lerpFlip(flip: Flip, t: number): Flip {
  const k = clamp01(t);
  return { x: flip.x * (1 - k) + 0, y: flip.y * (1 - k) + 0, s: flip.s + (1 - flip.s) * k };
}
