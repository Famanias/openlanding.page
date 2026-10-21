/**
 * The house is one corridor of rooms, and the page is the camera walking down it.
 *
 * Units are CSS pixels in a y-down, z-toward-the-viewer space (the same space CSS 3D
 * transforms use), so the DOM plaques and the WebGL walls share one camera.
 * Everything is expressed in multiples of P, the perspective distance: a plane P in
 * front of the camera renders at exactly 1:1, which is where every plaque is read.
 */

export const FOV_DEG = 55;

/** P as a percentage of the viewport height (vh). CSS mirrors this as `--nl-p`. */
export const P_VH = (0.5 / Math.tan(((FOV_DEG / 2) * Math.PI) / 180)) * 100;

/** Station-to-station distance, in P. */
export const ROOM_DEPTH_P = 2.6;

/** How far past a station's reading plane its doorway stands, in P. */
export const DOOR_OFFSET_P = 1.7;

/** Fraction of each station's scroll stride spent standing still to read. */
export const DWELL = 0.3;

/** Scroll stride per station, as a multiple of the viewport height. */
export const STRIDE_VH = 1.6;

/** A room is 7.2 m long in the fiction of the building. */
export const ROOM_METRES = 7.2;

export function perspectivePx(viewportHeight: number): number {
  return (viewportHeight * P_VH) / 100;
}

/** The corridor's cross-section. CSS mirrors these as `--nl-hw`, `--nl-ceil`, `--nl-floor`. */
export function tunnelBox(viewportWidth: number, viewportHeight: number) {
  return {
    hw: Math.min(0.36 * viewportWidth, 0.66 * viewportHeight),
    ceil: -0.4 * viewportHeight,
    floor: 0.33 * viewportHeight,
  };
}

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** Ken Perlin's smootherstep: zero velocity and acceleration at both ends. */
export function smootherstep(x: number): number {
  const t = clamp01(x);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function scrollForStation(index: number, stride: number): number {
  return index * stride;
}

export type CameraInput = { stride: number; stations: number; p: number };
export type Camera = {
  /** Camera z in px (0 at the foyer, negative going in). */
  z: number;
  /** Continuous station position, 0 … stations − 1. */
  station: number;
  /** The station the camera is at or travelling to the nearer of. */
  nearest: number;
};

/**
 * Scroll offset (px, measured from the top of the track) → camera.
 * Each stride starts with a dwell where the camera holds on the station, then
 * travels to the next station with smootherstep, so it settles on every plaque.
 */
export function cameraAt(scroll: number, { stride, stations, p }: CameraInput): Camera {
  const last = stations - 1;
  const s = Math.max(0, scroll) / stride;
  const index = Math.min(Math.floor(s), last);
  if (index >= last) {
    return { z: -last * ROOM_DEPTH_P * p, station: last, nearest: last };
  }
  const local = s - index;
  const travel = smootherstep((local - DWELL) / (1 - DWELL));
  const station = index + travel;
  return {
    z: noNegZero(-station * ROOM_DEPTH_P * p),
    station,
    nearest: Math.round(station),
  };
}

/** Opacity of a plaque glimpsed through the next doorway: present, not competing. */
export const GHOST = 0.28;

/**
 * Opacity for a plane at `distance` (in P) in front of the camera.
 * Solid from 0.8 P to 2.6 P, dissolving as the camera walks through it. Further
 * off (the next room, seen through the door) it's a ghost, fading in from 6 P.
 */
export function planeOpacity(distance: number): number {
  if (distance <= 0.35 || distance >= 6) return 0;
  if (distance < 0.8) return smootherstep((distance - 0.35) / 0.45);
  if (distance <= 2.6) return 1;
  if (distance <= 3.4) return 1 - (1 - GHOST) * smootherstep((distance - 2.6) / 0.8);
  if (distance <= 4.6) return GHOST;
  return GHOST * (1 - smootherstep((distance - 4.6) / 1.4));
}

/**
 * A label that waits for its plaque: in the wide rooms the plaque covers the
 * opposite wall, so the label only appears once the plaque has dissolved.
 */
export function revealAfter(labelDistance: number, plaqueDistance: number): number {
  return Math.min(planeOpacity(labelDistance), 1 - planeOpacity(plaqueDistance));
}

/** Which room's walls a point at depth z belongs to. Rooms change at each doorway. */
export function roomAtZ(z: number, p: number, rooms: number): number {
  const along = -z / p;
  const index = Math.floor((along - DOOR_OFFSET_P) / ROOM_DEPTH_P) + 1;
  return Math.max(0, Math.min(rooms - 1, index));
}

export function depthMetres(z: number, p: number): number {
  return noNegZero((-z / (ROOM_DEPTH_P * p)) * ROOM_METRES);
}

/** −0 + 0 is +0; keeps readouts from printing "−0.0". */
function noNegZero(x: number): number {
  return x + 0;
}

/**
 * Flow mode (phones, reduced motion): which room is in view, as a fraction.
 * `probe` is the document y of the viewport's middle; `tops` are the rooms'
 * document tops in order. Crossing from room i to i+1 fades over `blend` px
 * centred on room i+1's top.
 */
export function flowRoomAt(probe: number, tops: number[], blend = 240): number {
  if (tops.length === 0) return 0;
  let room = 0;
  for (let i = 1; i < tops.length; i++) {
    const start = tops[i] - blend / 2;
    if (probe <= start) break;
    room = i - 1 + clamp01((probe - start) / blend);
  }
  return room;
}
