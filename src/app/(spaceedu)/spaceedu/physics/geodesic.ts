export type Vec3 = { x: number; y: number; z: number };
const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const scale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: Vec3, b: Vec3): Vec3 => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const length = (a: Vec3) => Math.sqrt(dot(a, a));
const normalize = (a: Vec3) => scale(a, 1 / Math.max(length(a), 1e-9));

export type RayResult = { captured: boolean; escaped: boolean; position: Vec3; direction: Vec3; steps: number };

export function traceSchwarzschild(origin: Vec3, direction: Vec3, maxSteps = 512): RayResult {
  let pos = origin;
  let vel = normalize(direction);
  const h = cross(pos, vel);
  const h2 = dot(h, h);
  for (let step = 0; step < maxSteps; step += 1) {
    const r2 = dot(pos, pos);
    const r = Math.sqrt(r2);
    if (r < 1) return { captured: true, escaped: false, position: pos, direction: vel, steps: step };
    if (r > 60 && dot(pos, vel) > 0) return { captured: false, escaped: true, position: pos, direction: vel, steps: step };
    const dt = Math.min(0.28, Math.max(0.012, 0.025 * (r - 0.9)));
    const acceleration = scale(pos, -1.5 * h2 / Math.max(r2 * r2 * r, 1e-6));
    vel = normalize(add(vel, scale(acceleration, dt)));
    pos = add(pos, scale(vel, dt));
  }
  return { captured: false, escaped: false, position: pos, direction: vel, steps: maxSteps };
}

export function criticalImpactParameter() { return 1.5 * Math.sqrt(3); }
export function impactParameter(origin: Vec3, direction: Vec3) { return length(cross(origin, normalize(direction))); }
export { add, cross, dot, length, normalize, scale };
