import { clamp, lerp, progress } from "../motion/math";

/** Where the 3D submersible sits on screen for a given scroll position. Pixels, viewport-relative. */
export type Pose = {
  cx: number;
  cy: number;
  /** Width of the whole vehicle (pod tip to pod tip) in screen pixels. */
  width: number;
  yaw: number;
  pitch: number;
  opacity: number;
  /** 1 = hero callouts fully visible, 0 = hidden. */
  callouts: number;
};

export type PoseInput = {
  scrollY: number;
  heroHeight: number;
  docMax: number;
  vw: number;
  vh: number;
};

const HERO_YAW = -0.55;
const CONTENT_MAX = 1280;
const CONTENT_PAD = 64;

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function heroPose(vw: number, vh: number): Pick<Pose, "cx" | "cy" | "width" | "opacity" | "callouts"> {
  if (vw >= 1280) {
    const width = Math.min(vw * 0.33, 520);
    return { width, cx: vw - width * 0.5 - vw * 0.085, cy: vh * 0.5, opacity: 1, callouts: 1 };
  }
  if (vw >= 1024) {
    const width = vw * 0.36;
    return { width, cx: vw - width * 0.5 - vw * 0.03, cy: vh * 0.48, opacity: 1, callouts: 0 };
  }
  if (vw >= 768) {
    const width = vw * 0.5;
    return { width, cx: vw - width * 0.45, cy: vh * 0.55, opacity: 0.4, callouts: 0 };
  }
  return { width: vw * 0.78, cx: vw * 0.64, cy: vh * 0.74, opacity: 0.3, callouts: 0 };
}

function companionPose(vw: number, vh: number, p: number): Pick<Pose, "cx" | "cy" | "width" | "opacity"> {
  const cy = vh * (0.5 + 0.32 * Math.sin(p * 8 + 0.6));
  if (vw >= 1280) {
    const free = (Math.max(vw, CONTENT_MAX) - CONTENT_MAX) / 2 + CONTENT_PAD;
    // Keep clear of the depth rail that hugs the right edge of the descent stage.
    const width = clamp(free * 0.7, 84, 170);
    return { width, cx: vw - 48 - width / 2, cy, opacity: 1 };
  }
  if (vw >= 768) return { width: 84, cx: vw - 44, cy, opacity: 0.35 };
  return { width: 64, cx: vw - 36, cy, opacity: 0.4 };
}

export function computePose({ scrollY, heroHeight, docMax, vw, vh }: PoseInput): Pose {
  const t = smooth(progress(scrollY, 0, Math.max(heroHeight * 0.85, 1)));
  const p = docMax > 0 ? clamp(scrollY / docMax, 0, 1) : 0;
  const a = heroPose(vw, vh);
  const b = companionPose(vw, vh, p);

  return {
    cx: lerp(a.cx, b.cx, t),
    cy: lerp(a.cy, b.cy, t),
    width: lerp(a.width, b.width, t),
    opacity: lerp(a.opacity, b.opacity, t),
    callouts: a.callouts * (1 - clamp(t * 3, 0, 1)),
    yaw: HERO_YAW + p * Math.PI * 5,
    pitch: 0.1 + 0.06 * Math.sin(p * 12),
  };
}
