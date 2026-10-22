export type Tier = "high" | "medium" | "low";

export type TierSettings = {
  pixelRatioCap: number;
  shadows: boolean;
  shadowMapSize: number;
  post: boolean;
  bloom: boolean;
  msaa: number;
  blurSamples: number;
  /** Prop density multiplier. */
  density: number;
  rainDrops: number;
  speedLines: number;
  particles: number;
  terrainStep: number;
  cloudOctaves: number;
  dynamicLights: boolean;
  traffic: number;
};

export const TIERS: Record<Tier, TierSettings> = {
  high: {
    pixelRatioCap: 1.75,
    shadows: true,
    shadowMapSize: 2048,
    post: true,
    bloom: true,
    msaa: 4,
    blurSamples: 10,
    density: 1,
    rainDrops: 3200,
    speedLines: 520,
    particles: 900,
    terrainStep: 4,
    cloudOctaves: 5,
    dynamicLights: true,
    traffic: 6,
  },
  medium: {
    pixelRatioCap: 1.5,
    shadows: true,
    shadowMapSize: 1024,
    post: true,
    bloom: false,
    msaa: 2,
    blurSamples: 7,
    density: 0.72,
    rainDrops: 2000,
    speedLines: 320,
    particles: 600,
    terrainStep: 5,
    cloudOctaves: 4,
    dynamicLights: true,
    traffic: 4,
  },
  low: {
    pixelRatioCap: 1.25,
    shadows: false,
    shadowMapSize: 512,
    post: false,
    bloom: false,
    msaa: 0,
    blurSamples: 0,
    density: 0.45,
    rainDrops: 1000,
    speedLines: 160,
    particles: 360,
    terrainStep: 6,
    cloudOctaves: 3,
    dynamicLights: false,
    traffic: 3,
  },
};

/**
 * Starting tier from coarse device hints; the engine then steps down on
 * its own if the measured frame time says so.
 */
export function pickTier(env: {
  width: number;
  coarsePointer: boolean;
  cores: number | undefined;
  memory: number | undefined;
}): Tier {
  const weak = (env.cores !== undefined && env.cores <= 4) || (env.memory !== undefined && env.memory <= 4);
  if (env.coarsePointer || env.width < 660) return weak ? "low" : "medium";
  return weak ? "medium" : "high";
}

export function lowerTier(tier: Tier): Tier | null {
  return tier === "high" ? "medium" : tier === "medium" ? "low" : null;
}
