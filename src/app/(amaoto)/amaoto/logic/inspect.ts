import type { Vec3 } from "./rng";
export type Quaternion = [number, number, number, number];
export const IDENTITY: Quaternion = [0, 0, 0, 1];
export function normalize(q: Quaternion): Quaternion {
  const n = Math.hypot(...q);
  return n > 1e-10 && Number.isFinite(n)
    ? (q.map((v) => v / n) as Quaternion)
    : [...IDENTITY];
}
export function fromAxisAngle(axis: Vec3, angle: number): Quaternion {
  const n = Math.hypot(...axis) || 1,
    s = Math.sin(angle / 2) / n;
  return normalize([
    axis[0] * s,
    axis[1] * s,
    axis[2] * s,
    Math.cos(angle / 2),
  ]);
}
export function multiply(a: Quaternion, b: Quaternion): Quaternion {
  const [x, y, z, w] = a,
    [u, v, t, s] = b;
  return normalize([
    w * u + x * s + y * t - z * v,
    w * v - x * t + y * s + z * u,
    w * t + x * v - y * u + z * s,
    w * s - x * u - y * v - z * t,
  ]);
}
export function slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
  let dot = a.reduce((n, v, i) => n + v * b[i], 0);
  if (dot < 0) {
    b = b.map((v) => -v) as Quaternion;
    dot = -dot;
  }
  dot = Math.min(1, dot);
  if (dot > 0.9995)
    return normalize(a.map((v, i) => v + (b[i] - v) * t) as Quaternion);
  const theta = Math.acos(dot),
    s = Math.sin(theta);
  return normalize(
    a.map(
      (v, i) =>
        (v * Math.sin((1 - t) * theta) + b[i] * Math.sin(t * theta)) / s,
    ) as Quaternion,
  );
}
export function rotateVec3(q: Quaternion, v: Vec3): Vec3 {
  const [x, y, z, w] = normalize(q),
    [a, b, c] = v,
    tx = 2 * (y * c - z * b),
    ty = 2 * (z * a - x * c),
    tz = 2 * (x * b - y * a);
  return [
    a + w * tx + y * tz - z * ty,
    b + w * ty + z * tx - x * tz,
    c + w * tz + x * ty - y * tx,
  ];
}
export type InspectState = {
  phase: "idle" | "engaged" | "returning";
  rotation: Quaternion;
  velocity: Vec3;
  pointer: [number, number] | null;
  chapterKey: string;
};
export const createInspect = (): InspectState => ({
  phase: "idle",
  rotation: [...IDENTITY],
  velocity: [0, 0, 0],
  pointer: null,
  chapterKey: "",
});
export function toggleKeyboardEngage(s: InspectState, key = "1"): InspectState {
  return s.phase === "engaged"
    ? exit(s)
    : { ...s, phase: "engaged", chapterKey: key };
}
export function onPointerDown(
  s: InspectState,
  x: number,
  y: number,
): InspectState {
  return { ...s, phase: "engaged", pointer: [x, y], velocity: [0, 0, 0] };
}
export function onPointerMove(
  s: InspectState,
  x: number,
  y: number,
  camera: Quaternion = IDENTITY,
): InspectState {
  if (!s.pointer) return s;
  const dx = (x - s.pointer[0]) * 0.0075,
    dy = (y - s.pointer[1]) * 0.0075;
  const rotation = multiply(
    fromAxisAngle(rotateVec3(camera, [0, 1, 0]), dx),
    multiply(fromAxisAngle(rotateVec3(camera, [1, 0, 0]), dy), s.rotation),
  );
  return {
    ...s,
    rotation,
    pointer: [x, y],
    velocity: rotateVec3(camera, [dy * 60, dx * 60, 0]),
  };
}
export const onPointerUp = (s: InspectState): InspectState => ({
  ...s,
  pointer: null,
});
export const exit = (s: InspectState): InspectState => ({
  ...s,
  phase: "returning",
  pointer: null,
  velocity: [0, 0, 0],
});
export function applyKeyboardStep(
  s: InspectState,
  x: number,
  y: number,
  camera: Quaternion = IDENTITY,
) {
  return {
    ...onPointerUp(
      onPointerMove(onPointerDown(s, 0, 0), x * 34, y * 34, camera),
    ),
    velocity: [0, 0, 0] as Vec3,
  };
}
export function tick(s: InspectState, dtMs: number): InspectState {
  const dt = Math.max(0, Math.min(0.1, dtMs / 1000));
  if (s.phase === "returning") {
    const rotation = slerp(s.rotation, IDENTITY, 1 - Math.exp(-9 * dt));
    return 2 * Math.acos(Math.min(1, Math.abs(rotation[3]))) < 0.01
      ? createInspect()
      : { ...s, rotation };
  }
  if (s.phase !== "engaged" || s.pointer) return s;
  return {
    ...s,
    rotation: multiply(
      fromAxisAngle(s.velocity, Math.hypot(...s.velocity) * dt),
      s.rotation,
    ),
    velocity: s.velocity.map((v) => v * Math.exp(-8.5 * dt)) as Vec3,
  };
}
export const exitOnChapterChange = (s: InspectState, key: string) =>
  s.phase === "engaged" && s.chapterKey !== key ? exit(s) : s;
export function isPinFacingCamera(
  normal: Vec3,
  toCamera: Vec3,
  projected: Vec3,
) {
  const n = Math.hypot(...normal) * Math.hypot(...toCamera);
  return (
    n > 0 &&
    normal.reduce((v, x, i) => v + x * toCamera[i], 0) / n > -0.05 &&
    projected.every((v) => v >= -1 && v <= 1)
  );
}
