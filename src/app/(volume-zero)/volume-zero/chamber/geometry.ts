import { clamp01, lerp, smoothstep } from "../motion/math";

export type SurfaceId = "felt" | "slat" | "stone";

export type Surface = {
  id: SurfaceId;
  label: string;
  description: string;
  absorption: number;
  reflections: number;
};

export const SURFACES: Record<SurfaceId, Surface> = {
  felt: { id: "felt", label: "Wool felt", description: "Softens early reflections for spoken word.", absorption: 0.82, reflections: 3 },
  slat: { id: "slat", label: "Oak slat", description: "Keeps detail while spreading the upper field.", absorption: 0.44, reflections: 5 },
  stone: { id: "stone", label: "Honed stone", description: "Returns a hard, bright first reflection.", absorption: 0.18, reflections: 7 },
};

export function surfaceAt(id: SurfaceId): Surface {
  return SURFACES[id];
}

export function cameraAt(progress: number): { depth: number; yaw: number } {
  const t = smoothstep(progress);
  return { depth: t, yaw: lerp(-0.18, 0.18, t) };
}

export function listenerAt(progress: number, offset: number): { x: number; y: number; z: number } {
  const p = clamp01(progress);
  const o = clamp01(offset);
  return {
    x: lerp(-0.75, 0.75, o),
    y: lerp(0.18, 0.42, p),
    z: lerp(-0.65, 0.65, p),
  };
}

export type ReflectionPoint = { x: number; y: number; z: number; strength: number };

export function reflectionPoints(listener: { x: number; y: number; z: number }, surface: SurfaceId): ReflectionPoint[] {
  const count = surfaceAt(surface).reflections;
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const radius = 0.28 + (index % 2) * 0.08;
    return {
      x: listener.x + Math.cos(angle) * radius,
      y: listener.y + Math.sin(angle * 1.7) * 0.18,
      z: listener.z + Math.sin(angle) * radius,
      strength: 1 - index / (count + 2),
    };
  });
}
