export type LayerId = "paper" | "image" | "ink" | "signal";
export type Spring = { value: number; velocity: number };
export const MATERIALS: { id: LayerId; label: string; width: number; height: number }[] = [
  { id: "paper", label: "Paper", width: 3.25, height: 4.25 },
  { id: "image", label: "Image", width: 3, height: 2.9 },
  { id: "ink", label: "Ink", width: 2.65, height: 2.8 },
  { id: "signal", label: "Signal", width: 2, height: 2.25 },
];
export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const wrapIndex = (value: number, count = MATERIALS.length) => ((value % count) + count) % count;
export const carouselDistance = (index: number, position: number) => wrapIndex(index - position + 2) - 2;
export const nearestSlide = (index: number, position: number) => position + carouselDistance(index, position);
export const releaseSlide = (position: number, velocity: number) => Math.round(position + clamp(velocity * .18, -1, 1)) || 0;

export const CLOCKWISE_SPEED = -.34;
export const MANUAL_SPEED = -.072;
export type DriftState = { speed: number };

/** Exact integration of the speed blend keeps drift consistent across frame rates. */
export function advanceDrift(state: DriftState, seconds: number, interacting: boolean, reduced = false) {
  if (reduced) { state.speed = 0; return 0; }
  const desired = interacting ? MANUAL_SPEED : CLOCKWISE_SPEED;
  const decay = Math.exp(-seconds * 5);
  const distance = desired * seconds + (state.speed - desired) * (1 - decay) / 5;
  state.speed = desired + (state.speed - desired) * decay;
  return distance;
}

export function carouselPose(index: number, position: number, spacing = 4.1) {
  const distance = carouselDistance(index, position);
  const depth = Math.abs(distance);
  const focus = Math.exp(-depth * depth * 1.8);
  const angle = distance * Math.PI / 2;
  return {
    // Negative track motion carries the front sheet rightward around the vertical axis.
    x: Math.sin(angle) * spacing, y: depth * .08, z: (Math.cos(angle) - 1) * 1.5,
    rx: -.025, ry: -clamp(distance, -1, 1) * .28, rz: -clamp(distance, -1, 1) * .045,
    scale: .76 + focus * .24,
    opacity: depth > .85 ? clamp((1.12 - depth) / .27) * (.46 + Math.exp(-.85 * .85 * 1.8) * .54) : .46 + focus * .54,
  };
}

/** Halve the empty edge-to-edge gaps, rather than halving centers and overlapping the artwork. */
export function carouselLayout(position: number, spacing = 4.1, cameraZ = 9.8, gapRatio = .5) {
  const poses = MATERIALS.map((_, index) => carouselPose(index, position, spacing));
  const visible = poses.map((pose, index) => {
    const perspective = cameraZ / (cameraZ - pose.z);
    const material = MATERIALS[index];
    const half = (material.width * Math.abs(Math.cos(pose.ry)) + material.height * Math.abs(Math.sin(pose.rz))) * pose.scale * perspective / 2;
    return { index, x: pose.x * perspective, half, perspective, weight: pose.opacity * pose.opacity, next: 0 };
  }).filter(item => poses[item.index].opacity > .001).sort((a, b) => a.x - b.x);
  if (visible.length < 2) return poses;
  for (let index = 1; index < visible.length; index++) {
    const previous = visible[index - 1], current = visible[index];
    const gap = Math.max(0, current.x - previous.x - previous.half - current.half);
    current.next = previous.next + previous.half + current.half + gap * gapRatio;
  }
  const weight = visible.reduce((sum, item) => sum + item.weight, 0);
  const shift = visible.reduce((sum, item) => sum + (item.x - item.next) * item.weight, 0) / weight;
  visible.forEach(item => { poses[item.index].x = (item.next + shift) / item.perspective; });
  return poses;
}

/** Substepped spring integration remains stable when a renderer drops a frame. */
export function stepSpring(spring: Spring, target: number, dt: number, immediate = false) {
  if (immediate) { spring.value = target; spring.velocity = 0; return; }
  const steps = Math.max(1, Math.ceil(Math.min(dt, .064) / .008));
  const step = Math.min(dt, .064) / steps;
  for (let i = 0; i < steps; i++) {
    spring.velocity += ((target - spring.value) * 135 - spring.velocity * 18) * step;
    spring.value += spring.velocity * step;
  }
}
