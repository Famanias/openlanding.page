/**
 * The threshold push-in. The exterior plate dollies toward its own glass door until the doorway fills the
 * stage; the matching interior plate rides inside the doorway and takes over. Everything here is pure:
 * stage size and scroll progress in, transforms out.
 */
import { clamp, easeInOutCubic, lerp, progress } from "../motion/math";

export type Size = { w: number; h: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type DoorFractions = { x0: number; x1: number; y0: number; y1: number };

/** The exterior plates share one camera position, so one door rectangle serves all three seasons. */
export const PLATE: Size = { w: 1376, h: 768 };
/** The glass of the sliding door, as fractions of the plate. */
export const DOOR: DoorFractions = { x0: 0.625, x1: 0.757, y0: 0.458, y1: 0.712 };

/** Scroll progress at which the dolly starts and ends; the rests either side are for reading the captions. */
export const PUSH_START = 0.08;
export const PUSH_END = 0.84;

/** The box an image occupies under `object-fit: cover`, with `object-position` given as 0..1 focal points. */
export function coverBox(stage: Size, plate: Size, focalX = 0.5, focalY = 0.5): Rect {
  const scale = Math.max(stage.w / plate.w, stage.h / plate.h);
  const w = plate.w * scale;
  const h = plate.h * scale;
  return { x: (stage.w - w) * focalX, y: (stage.h - h) * focalY, w, h };
}

/**
 * The horizontal `object-position` for the exterior plate. A centred crop is kept while the door stays in
 * the middle 70% of the stage; on tall phone screens the door would be cropped away, so it is centred instead.
 */
export function doorFocal(stage: Size, plate: Size = PLATE, door: DoorFractions = DOOR): number {
  const centred = coverBox(stage, plate);
  const slack = stage.w - centred.w;
  if (slack > -1) return 0.5;
  const doorCentre = ((door.x0 + door.x1) / 2) * centred.w;
  const onStage = centred.x + doorCentre;
  if (onStage >= stage.w * 0.15 && onStage <= stage.w * 0.85) return 0.5;
  return clamp((stage.w / 2 - doorCentre) / slack);
}

/** The door's rectangle in stage pixels. */
export function doorRect(stage: Size, focalX = 0.5, plate: Size = PLATE, door: DoorFractions = DOOR): Rect {
  const box = coverBox(stage, plate, focalX);
  return {
    x: box.x + door.x0 * box.w,
    y: box.y + door.y0 * box.h,
    w: (door.x1 - door.x0) * box.w,
    h: (door.y1 - door.y0) * box.h,
  };
}

/** World scale at which the interior plate, riding in the doorway, reaches full stage size. */
export function lockScale(stage: Size, door: Rect): number {
  return 1 / Math.max(door.w / stage.w, door.h / stage.h);
}

/** World scale at which the door frame has left the stage on every side. */
export function endScale(stage: Size, door: Rect): number {
  return 1.06 / Math.min(door.w / stage.w, door.h / stage.h);
}

export type Beat = 0 | 1 | 2;

export type ThresholdFrame = {
  /** Exterior plate: scale about the door's centre, plus a translation that carries the door to the stage centre. */
  worldScale: number;
  worldX: number;
  worldY: number;
  /** Interior plate: scale about the stage centre and an offset that keeps it centred on the door. */
  interiorScale: number;
  interiorX: number;
  interiorY: number;
  interiorOpacity: number;
  /** `clip-path: inset()` of the interior layer, tracking the door's edges in stage pixels. */
  clipTop: number;
  clipRight: number;
  clipBottom: number;
  clipLeft: number;
  /** The bough cutout nearest the lens: it scales faster than the plate and slides off to the left. */
  boughsX: number;
  boughsScale: number;
  boughsOpacity: number;
  /** Which caption is showing: at the door, crossing, inside. */
  beat: Beat;
};

export function beatAt(p: number): Beat {
  if (p < 0.3) return 0;
  if (p < 0.7) return 1;
  return 2;
}

export function thresholdFrame(p: number, stage: Size, door: Rect): ThresholdFrame {
  const t = clamp(p);
  const sLock = lockScale(stage, door);
  const sEnd = endScale(stage, door);
  // exponential zoom: equal scroll distances feel like equal steps forward
  const push = easeInOutCubic(progress(t, PUSH_START, PUSH_END));
  const worldScale = sEnd ** push;

  // the door's centre is carried to the stage centre by the time the interior locks to the stage
  const centring = easeInOutCubic(progress(worldScale, 1, sLock));
  const doorCx = door.x + door.w / 2;
  const doorCy = door.y + door.h / 2;
  // `+ 0` turns a negative zero into a plain zero, so resting values compare and print cleanly
  const worldX = (stage.w / 2 - doorCx) * centring + 0;
  const worldY = (stage.h / 2 - doorCy) * centring + 0;

  // on stage, the door is its rectangle scaled about its own centre and moved by the world translation
  const cx = doorCx + worldX;
  const cy = doorCy + worldY;
  const halfW = (door.w * worldScale) / 2;
  const halfH = (door.h * worldScale) / 2;

  // the interior covers the doorway while it is small, then stays one stage in size and eases a little further in
  const cover = 1 / sLock;
  const locked = worldScale >= sLock;
  const interiorScale = locked ? 1 + 0.04 * progress(worldScale, sLock, sEnd) : cover * worldScale;
  const fadeEnd = lerp(1.1, sLock, 0.6);

  // the boughs belong to the outside: they have left the frame before the doorway is half the stage
  const boughs = progress(t, 0.02, 0.4);
  const boughsScale = 1 + 0.9 * boughs;

  return {
    worldScale,
    worldX,
    worldY,
    interiorScale,
    interiorX: locked ? 0 : cx - stage.w / 2,
    interiorY: locked ? 0 : cy - stage.h / 2,
    interiorOpacity: progress(worldScale, 1.1, fadeEnd),
    clipTop: Math.max(0, cy - halfH),
    clipRight: Math.max(0, stage.w - (cx + halfW)),
    clipBottom: Math.max(0, stage.h - (cy + halfH)),
    clipLeft: Math.max(0, cx - halfW),
    // the cutout's needles reach 56% across, so it has to travel that far at its current scale to clear the stage
    boughsX: -stage.w * 0.6 * boughsScale * easeInOutCubic(boughs) + 0,
    boughsScale,
    boughsOpacity: 1 - progress(t, 0.3, 0.4),
    beat: beatAt(t),
  };
}
