export type LayerId = "paper" | "image" | "ink" | "signal";
export type Composition = "compose" | "unpack";
export type Pose = { x: number; y: number; z: number; rx: number; ry: number; rz: number };
export type Spring = { value: number; velocity: number };

export const MATERIALS: { id: LayerId; label: string; width: number; height: number; pose: Pose }[] = [
  { id: "paper", label: "Paper", width: 3.25, height: 4.25, pose: { x: -.48, y: .24, z: 0, rx: -.06, ry: -.1, rz: .12 } },
  { id: "image", label: "Image", width: 3, height: 2.9, pose: { x: .62, y: .75, z: .25, rx: .04, ry: -.08, rz: -.14 } },
  { id: "ink", label: "Ink", width: 2.65, height: 2.8, pose: { x: -.3, y: -.95, z: .58, rx: -.05, ry: .07, rz: -.06 } },
  { id: "signal", label: "Signal", width: 2, height: 2.25, pose: { x: 1.03, y: -.85, z: .92, rx: .06, ry: -.12, rz: .16 } },
];

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Semi-implicit spring integration. Substeps keep a dropped frame from destabilizing a held sheet. */
export function stepSpring(spring: Spring, target: number, dt: number, immediate = false) {
  if (immediate) { spring.value = target; spring.velocity = 0; return; }
  const steps = Math.max(1, Math.ceil(Math.min(dt, .064) / .008));
  const step = Math.min(dt, .064) / steps;
  for (let i = 0; i < steps; i++) {
    spring.velocity += ((target - spring.value) * 135 - spring.velocity * 18) * step;
    spring.value += spring.velocity * step;
  }
}

export function materialPose(index: number, mode: Composition, spread: number, revision: number, selected: LayerId | null): Pose {
  const material = MATERIALS[index];
  const phase = revision * 1.7 + index * 2.4;
  const randomX = revision ? Math.sin(phase) * .5 : 0;
  const randomY = revision ? Math.cos(phase * 1.3) * .4 : 0;
  const fan = mode === "unpack" ? 1 : spread / 100 * .4;
  return {
    x: material.pose.x + (index % 2 ? 1 : -1) * fan * .95 + randomX,
    y: material.pose.y + (index < 2 ? 1 : -1) * fan * .48 + randomY,
    z: material.pose.z + fan * index * .28 + (selected === material.id ? 1.15 : 0),
    rx: material.pose.rx + fan * .17,
    ry: material.pose.ry + (index % 2 ? -.25 : .25) * fan,
    rz: material.pose.rz + (revision ? Math.sin(phase) * .18 : 0),
  };
}
