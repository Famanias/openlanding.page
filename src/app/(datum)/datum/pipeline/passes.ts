import { clamp, easeOutExpo, lerp } from "../motion/math";

export type PassId = "geometry" | "normals" | "shadows" | "bloom" | "composite";
export type TargetFps = 60 | 120;

export interface RenderPass {
  id: PassId;
  index: number;
  code: string;
  name: string;
  shortName: string;
  stageRole: string;
  description: string;
  baseMs: number;
  drawCalls: number;
  vramMb: number;
  /** Fraction of cost that scales with pixel count (0.25 = vertex bound, 1.15 = full-res post-FX). */
  resolutionWeight: number;
  shaderEntry: string;
  glslLines: readonly string[];
  accentRole: "emerald" | "ink" | "amber" | "phosphor";
}

export const RENDER_PASSES: readonly RenderPass[] = [
  {
    id: "geometry",
    index: 0,
    code: "01",
    name: "Geometry / Depth Pre-Pass",
    shortName: "Geometry",
    stageRole: "Opaque vertex transform & early-Z occlusion culling",
    description:
      "Transforms 142 instanced mesh batches into clip space and populates the hi-Z buffer so occluded fragments never enter heavy shading.",
    baseMs: 2.1,
    drawCalls: 142,
    vramMb: 48,
    resolutionWeight: 0.25,
    shaderEntry: "vs_depth_prepass",
    glslLines: [
      "vec4 clipPos = uViewProj * uModel * vec4(aPosition, 1.0);",
      "vLinearDepth = -(uView * uModel * vec4(aPosition, 1.0)).z;",
      "gl_Position = clipPos;",
    ],
    accentRole: "emerald",
  },
  {
    id: "normals",
    index: 1,
    code: "02",
    name: "Normals / G-Buffer",
    shortName: "Normals",
    stageRole: "Octahedral normal & perceptual roughness packing",
    description:
      "Packs world-space surface normals, roughness, and specular F0 into two RGBA16F render targets for deferred lighting evaluation.",
    baseMs: 1.4,
    drawCalls: 96,
    vramMb: 64,
    resolutionWeight: 1.0,
    shaderEntry: "fs_pack_gbuffer",
    glslLines: [
      "vec2 octN = encodeOctahedral(normalize(vWorldNormal));",
      "outNormalRough = vec4(octN, clamp(uRoughness, 0.04, 1.0), 1.0);",
      "outAlbedoMetal = vec4(albedoLinear, uMetallic);",
    ],
    accentRole: "ink",
  },
  {
    id: "shadows",
    index: 2,
    code: "03",
    name: "Cascaded Shadows",
    shortName: "Shadows",
    stageRole: "3-split directional PCF shadow atlas (2048px)",
    description:
      "Renders dynamic casters into a 3-cascade shadow atlas and evaluates 9-tap Poisson PCF filtering across contact edges.",
    baseMs: 3.8,
    drawCalls: 184,
    vramMb: 92,
    resolutionWeight: 0.85,
    shaderEntry: "fs_pcf_cascade3",
    glslLines: [
      "int cascade = selectCascade(vViewDepth, uCascadeSplits);",
      "vec3 shadowCoord = projectLightSpace(vWorldPos, uLightMat[cascade]);",
      "float vis = samplePoissonPCF9(uShadowAtlas, shadowCoord, bias);",
    ],
    accentRole: "amber",
  },
  {
    id: "bloom",
    index: 3,
    code: "04",
    name: "Bloom / Dual Kawase",
    shortName: "Bloom / FX",
    stageRole: "5-mip HDR luminance threshold & energy-conserving blur",
    description:
      "Extracts specular highlights above 1.0 EV through a 5-mip Dual Kawase downsample pyramid before additive screen recombination.",
    baseMs: 2.6,
    drawCalls: 18,
    vramMb: 36,
    resolutionWeight: 1.15,
    shaderEntry: "fs_kawase_upsample",
    glslLines: [
      "vec3 sum = texture(uMipSrc, vUv + d * vec2(-1.0, -1.0)).rgb;",
      "sum += 2.0 * texture(uMipSrc, vUv + vec2(0.0, d.y)).rgb;",
      "outHdrBloom = max(sum * 0.125 - uKneeThreshold, 0.0);",
    ],
    accentRole: "phosphor",
  },
  {
    id: "composite",
    index: 4,
    code: "05",
    name: "ACES Composite",
    shortName: "Composite",
    stageRole: "Filmic tone mapping, blue-noise dither & sRGB encode",
    description:
      "Applies ACES fitted filmic curve, eliminates 8-bit sky banding via screen-space blue-noise dithering, and writes the final swapchain frame.",
    baseMs: 1.2,
    drawCalls: 4,
    vramMb: 16,
    resolutionWeight: 1.0,
    shaderEntry: "fs_aces_composite",
    glslLines: [
      "vec3 hdr = texelFetch(uLitBuffer, px, 0).rgb + bloom * uBloomMix;",
      "vec3 mapped = acesFilmicToneMap(hdr * uExposure);",
      "outSrgb = vec4(linearToSrgb(mapped) + blueNoiseDither(px), 1.0);",
    ],
    accentRole: "emerald",
  },
] as const;

export function passById(id: PassId): RenderPass {
  return RENDER_PASSES.find((p) => p.id === id) ?? RENDER_PASSES[0];
}

export type PassExplosionOffset = {
  id: PassId;
  zOffset: number;
  liftY: number;
  scale: number;
  opacity: number;
};

/**
 * Pure spatial placement of the 5 render slabs along the optical Z-axis.
 * At progress=0 the stack sits compressed (0.08 units apart); at progress=1
 * slabs separate smoothly into [-2.10, -1.05, 0, +1.05, +2.10] inspectable planes.
 */
export function computeExplosionOffsets(
  rawProgress: number,
  activeIndex: number,
): PassExplosionOffset[] {
  const t = easeOutExpo(clamp(rawProgress, 0, 1));
  const spacing = lerp(0.08, 1.05, t);
  const centerIndex = (RENDER_PASSES.length - 1) / 2;

  return RENDER_PASSES.map((pass, idx) => {
    const isActive = activeIndex >= 0 && idx === activeIndex;
    const hasFocus = activeIndex >= 0 && t > 0.2;
    const zOffset = (idx - centerIndex) * spacing;
    const liftY = isActive ? lerp(0.04, 0.24, t) : 0;
    const scale = isActive ? lerp(1, 1.045, t) : 1;
    const opacity = !hasFocus ? 1 : isActive ? 1 : lerp(1, 0.72, t);
    return {
      id: pass.id,
      zOffset: Number(zOffset.toFixed(4)),
      liftY: Number(liftY.toFixed(4)),
      scale: Number(scale.toFixed(4)),
      opacity: Number(opacity.toFixed(4)),
    };
  });
}

/** Maps normalized scroll progress [0..1] to one of the 5 pass indices [0..4]. */
export function activePassForProgress(rawProgress: number): number {
  const c = clamp(rawProgress, 0, 0.9999);
  return Math.min(RENDER_PASSES.length - 1, Math.floor(c * RENDER_PASSES.length));
}

export type PassCostBreakdown = {
  id: PassId;
  shortName: string;
  enabled: boolean;
  ms: number;
  drawCalls: number;
  vramMb: number;
  sharePct: number;
};

export type BudgetSummary = {
  resolutionScale: number;
  targetFps: TargetFps;
  targetMs: number;
  totalMs: number;
  headroomMs: number;
  utilizationPct: number;
  overBudget: boolean;
  totalDrawCalls: number;
  totalVramMb: number;
  bottleneckId: PassId | null;
  passes: PassCostBreakdown[];
};

export const MIN_RESOLUTION_SCALE = 0.5;
export const MAX_RESOLUTION_SCALE = 2.0;

/** Computes deterministic GPU frame time, VRAM, draw calls and bottleneck pass. */
export function computePassBudget(
  enabledIds: readonly PassId[],
  rawScale: number,
  targetFps: TargetFps,
): BudgetSummary {
  const scale = Number(clamp(rawScale, MIN_RESOLUTION_SCALE, MAX_RESOLUTION_SCALE).toFixed(2));
  const pixelFactor = scale * scale;
  const enabledSet = new Set(enabledIds);
  const targetMs = targetFps === 120 ? 8.3 : 16.6;

  let totalMs = 0;
  let totalDrawCalls = 0;
  let totalVramMb = 0;
  let bottleneckId: PassId | null = null;
  let maxMs = -1;

  const rawCosts = RENDER_PASSES.map((pass) => {
    const enabled = enabledSet.has(pass.id);
    if (!enabled) {
      return {
        id: pass.id,
        shortName: pass.shortName,
        enabled: false,
        ms: 0,
        drawCalls: 0,
        vramMb: 0,
      };
    }
    const scaledMs = Math.max(0.1, pass.baseMs * (1 + (pixelFactor - 1) * pass.resolutionWeight));
    const ms = Number(scaledMs.toFixed(2));
    const vramMb = Math.round(pass.vramMb * (1 + (pixelFactor - 1) * 0.55));
    totalMs += ms;
    totalDrawCalls += pass.drawCalls;
    totalVramMb += vramMb;
    if (ms > maxMs) {
      maxMs = ms;
      bottleneckId = pass.id;
    }
    return {
      id: pass.id,
      shortName: pass.shortName,
      enabled: true,
      ms,
      drawCalls: pass.drawCalls,
      vramMb,
    };
  });

  const roundedTotal = Number(totalMs.toFixed(1));
  const passes: PassCostBreakdown[] = rawCosts.map((item) => ({
    ...item,
    sharePct: totalMs > 0 ? Math.round((item.ms / totalMs) * 100) : 0,
  }));

  return {
    resolutionScale: scale,
    targetFps,
    targetMs,
    totalMs: roundedTotal,
    headroomMs: Number((targetMs - roundedTotal).toFixed(1)),
    utilizationPct: Math.round((roundedTotal / targetMs) * 100),
    overBudget: roundedTotal > targetMs,
    totalDrawCalls,
    totalVramMb,
    bottleneckId,
    passes,
  };
}
