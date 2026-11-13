import * as THREE from 'three/webgpu';
import {
  abs,
  cameraPosition,
  clamp,
  color,
  cos,
  dot,
  equirectUV,
  exp,
  float,
  length,
  max,
  mix,
  normalLocal,
  normalWorld,
  positionLocal,
  positionWorld,
  pow,
  reflect,
  reflector,
  screenUV,
  sin,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
  vertexColor,
  viewportSharedTexture,
} from 'three/tsl';
import { MAX_SHADER_RIPPLES, NATURAL_POND_RX, NATURAL_POND_RZ } from './model';
import type { PondTextureSuite } from './textures';

export type FloatUniform = ReturnType<typeof uniform<'float'>>;
export type Vec4Uniform = ReturnType<typeof uniform<'vec4'>>;

export const PALETTE = {
  pond: 0x112c2a,
  paper: 0xf4efe2,
  moss: 0x203d33,
  vermilion: 0x9e3f32,
  sakura: 0xc7a6a2,
  stone: 0xd6c7a9,
  leaf: 0x526e58,
  ink: 0x1e2320,
  porcelain: 0xfdfbf5,
  gold: 0xcb9462,
} as const;

export type KoiVariant = 'kohaku' | 'yamabuki' | 'shiro' | 'sanke';

/**
 * Analytic sunlit caustic filaments projected in world XZ space.
 */
function computeWaterCaustics(
  worldXZ: typeof positionWorld.xz,
  elapsed: FloatUniform,
) {
  const p1 = worldXZ.mul(2.15).add(vec2(elapsed.mul(0.24), elapsed.mul(-0.19)));
  const p2 = worldXZ.mul(2.85).add(vec2(elapsed.mul(-0.18), elapsed.mul(0.26)));

  const w1 = sin(p1.x.add(sin(p1.y.mul(1.35).add(elapsed.mul(0.48))))).mul(
    cos(p1.y.add(cos(p1.x.mul(1.15).sub(elapsed.mul(0.35))))),
  );
  const w2 = sin(p2.x.sub(cos(p2.y.mul(1.4).sub(elapsed.mul(0.42))))).mul(
    cos(p2.y.add(sin(p2.x.mul(1.2).add(elapsed.mul(0.38))))),
  );

  const ridge1 = float(1.0).sub(abs(w1));
  const ridge2 = float(1.0).sub(abs(w2));
  return pow(clamp(ridge1.mul(ridge2).mul(1.18), 0.0, 1.0), 4.4);
}

export function createPondBedMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  const bedUv = positionWorld.xz.mul(0.58);
  const baseTex = texture(textures.bedAlbedo, bedUv).rgb.mul(0.82);

  // Depth-based organic silt darkening in center basin + sunlit warmth in shallows
  const depthFactor = clamp(positionWorld.y.negate().div(0.72), 0.0, 1.0);
  const deepSiltTint = mix(baseTex, baseTex.mul(vec3(0.34, 0.48, 0.44)), depthFactor.mul(0.76));

  // Dappled morning caustics (softened under deep shadows near sakura left cove)
  const caustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const sunSpread = smoothstep(-4.4, 3.6, positionWorld.x.add(positionWorld.z.mul(0.35)));
  const causticBoost = caustic.mul(sunSpread).mul(mix(0.36, 0.18, depthFactor));
  const sunlitColor = deepSiltTint.add(vec3(0.95, 0.91, 0.76).mul(causticBoost));

  mat.colorNode = sunlitColor;
  mat.normalMap = textures.bedNormal;
  mat.normalScale = new THREE.Vector2(0.75, 0.75);
  mat.roughnessNode = float(0.94);
  mat.metalnessNode = float(0.02);
  return mat;
}

export function createSubmergedStoneMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  const stoneUv = uv().mul(2.2);
  const albedo = texture(textures.stoneAlbedo, stoneUv).rgb.mul(vec3(0.54, 0.62, 0.58));
  const caustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const upFacing = smoothstep(0.15, 0.75, normalWorld.y);

  mat.colorNode = albedo.add(vec3(0.92, 0.88, 0.74).mul(caustic.mul(upFacing).mul(0.38)));
  mat.normalMap = textures.stoneNormal;
  mat.normalScale = new THREE.Vector2(0.9, 0.9);
  mat.roughnessNode = float(0.58);
  mat.metalnessNode = float(0.03);
  return mat;
}

export function createShoreStoneMaterial(textures: PondTextureSuite): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  // Higher-frequency world-space triplanar projection gives crisp granite mineral grain
  const uvTop = positionWorld.xz.mul(1.35);
  const uvSide = positionWorld.xy.add(vec2(positionWorld.z.mul(0.6), 0.0)).mul(1.35);
  const sideBlend = smoothstep(0.35, 0.75, abs(normalWorld.y));
  const rockTop = texture(textures.stoneAlbedo, uvTop).rgb;
  const rockSide = texture(textures.stoneAlbedo, uvSide).rgb;
  const rockRgb = mix(rockSide, rockTop, sideBlend).mul(vec3(0.76, 0.77, 0.75));
  const rockRough = mix(
    texture(textures.stoneRoughness, uvSide).r,
    texture(textures.stoneRoughness, uvTop).r,
    sideBlend,
  );

  // Wet shoreline zone darkens granite and lowers roughness realistically
  const wetness = float(1.0).sub(smoothstep(-0.04, 0.13, positionWorld.y));
  const wetRock = rockRgb.mul(vec3(0.36, 0.4, 0.39));
  const dryOrWet = mix(rockRgb, wetRock, wetness.mul(0.9));

  // Restrained moss flecks only in sheltered crevices
  const mossNoise = sin(positionWorld.x.mul(2.1).add(positionWorld.z.mul(2.6)))
    .mul(0.5)
    .add(0.5);
  const mossMask = smoothstep(0.76, 0.95, normalWorld.y)
    .mul(smoothstep(0.16, 0.32, positionWorld.y))
    .mul(smoothstep(0.62, 0.9, mossNoise))
    .mul(0.42);
  const mossColor = color(PALETTE.leaf).mul(0.72);

  mat.colorNode = mix(dryOrWet, mossColor, mossMask);
  mat.normalMap = textures.stoneNormal;
  mat.normalScale = new THREE.Vector2(1.1, 1.1);
  mat.roughnessNode = mix(rockRough, float(0.16), wetness.mul(0.9));
  mat.metalnessNode = float(0.02);
  return mat;
}

export function createGroundTerraceMaterial(
  textures: PondTextureSuite,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  // World-space multi-scale UV sampling eliminates visible tiling across slopes and distances
  const macroUv = positionWorld.xz.mul(0.21);
  const medUv = positionWorld.xz.mul(0.78);
  const microUv = positionWorld.xz.mul(1.65);

  const soilMacro = texture(textures.groundAlbedo, macroUv).rgb;
  const soilMicro = texture(textures.groundAlbedo, medUv).rgb;
  const soilFine = texture(textures.groundAlbedo, microUv).rgb;
  const mossMed = texture(textures.mossAlbedo, medUv.mul(1.35)).rgb;
  const mossMacro = texture(textures.mossAlbedo, macroUv.mul(1.6)).rgb;
  const litterTex = texture(textures.litterAlbedo, medUv.mul(1.15)).rgb;
  const stoneGrit = texture(textures.stoneAlbedo, microUv.mul(0.95)).rgb;

  // Vertex biome weights computed from unified terrain sampler:
  // r = gravel/path approach, g = woodland/bamboo forest litter, b = damp shoreline rim
  const biomeWeights = vertexColor();
  const pathWeight = clamp(biomeWeights.r, 0.0, 1.0);
  const forestWeight = clamp(biomeWeights.g, 0.0, 1.0);
  const rimWeight = clamp(biomeWeights.b, 0.0, 1.0);

  // 1. Rich damp garden loam & dark mineral slope earth (calibrated for linear-space ACES rendering)
  const soilMix = mix(mix(soilMacro, soilMicro, 0.55), soilFine, 0.32);
  const baseSoil = mix(soilMix, stoneGrit, 0.16).mul(vec3(0.96, 0.85, 0.68));
  const slopeMask = smoothstep(0.92, 0.72, normalWorld.y);

  // 2. Multi-scale velvety moss carpets (rich emerald-olive depth with warm moss shoulders)
  const mossNoiseA = sin(positionWorld.x.mul(1.12).add(0.45)).mul(
    cos(positionWorld.z.mul(0.92).sub(0.35)),
  );
  const mossNoiseB = sin(positionWorld.x.mul(2.45).sub(positionWorld.z.mul(2.1)));
  const mossNoiseC = cos(positionWorld.x.mul(4.3).add(positionWorld.z.mul(3.9)));
  const organicMossMask = clamp(
    mossNoiseA.mul(0.3).add(mossNoiseB.mul(0.18)).add(mossNoiseC.mul(0.08)).add(0.52),
    0.0,
    1.0,
  );
  const heightMossBias = smoothstep(0.04, 0.28, positionWorld.y);
  const mossWeight = clamp(
    organicMossMask
      .mul(mix(0.42, 0.96, heightMossBias))
      .mul(float(1.0).sub(pathWeight.mul(0.9)))
      .mul(float(1.0).sub(slopeMask.mul(0.42)))
      .mul(float(1.0).sub(forestWeight.mul(0.38))),
    0.1,
    0.92,
  );

  const layeredMoss = mix(mossMacro, mossMed, 0.64).mul(vec3(0.76, 0.96, 0.48));
  const soilAndMoss = mix(baseSoil, layeredMoss, mossWeight);

  // 3. Woodland / bamboo forest floor (deep mossy humus, fallen leaves, rich shaded loam)
  const forestFloor = mix(
    soilAndMoss.mul(vec3(0.64, 0.74, 0.52)),
    litterTex.mul(vec3(0.68, 0.64, 0.46)),
    0.42,
  );
  const withForest = mix(soilAndMoss, forestFloor, forestWeight.mul(0.72));

  // 4. Compacted dark soil & weathered granite grit along winding shrine approach path
  const pathBed = mix(
    litterTex.mul(vec3(0.92, 0.86, 0.72)),
    stoneGrit.mul(vec3(0.84, 0.82, 0.74)),
    0.42,
  );
  const withPath = mix(withForest, pathBed, pathWeight.mul(0.82));

  // 5. Damp dark pond shoreline collar (organic edge moisture broken up by noise)
  const shoreNoise = sin(positionWorld.x.mul(2.9).add(positionWorld.z.mul(2.5)))
    .mul(0.5)
    .add(0.5);
  const wetShore = float(1.0).sub(smoothstep(-0.04, 0.14, positionWorld.y));
  const wetness = clamp(
    max(wetShore.mul(0.78), rimWeight.mul(mix(0.42, 0.82, shoreNoise))),
    0.0,
    1.0,
  );
  const wetMineral = mix(
    stoneGrit.mul(vec3(0.36, 0.4, 0.36)),
    withPath.mul(vec3(0.42, 0.46, 0.38)),
    0.45,
  );
  const dampGround = mix(withPath, wetMineral, wetness.mul(0.82));

  // 6. Physically restrained morning sun warmth + quiet dark left woodland beneath typography
  const dappleA = sin(positionWorld.x.mul(0.82).add(positionWorld.z.mul(0.44)).add(0.5));
  const dappleB = cos(positionWorld.x.mul(1.6).sub(positionWorld.z.mul(1.18)));
  const dappleMask = smoothstep(
    0.16,
    0.84,
    dappleA.mul(0.55).add(dappleB.mul(0.45)).mul(0.5).add(0.5),
  );
  const rightSunCorridor = smoothstep(-3.6, 2.8, positionWorld.x.sub(positionWorld.z.mul(0.15)));
  const sunWarmth = dappleMask.mul(rightSunCorridor);
  const sunlitGround = dampGround.mul(
    mix(vec3(0.76, 0.82, 0.72), vec3(1.06, 1.04, 0.84), sunWarmth),
  );

  const leftWoodShade = smoothstep(-2.4, -6.2, positionWorld.x).mul(0.42);
  mat.colorNode = mix(sunlitGround, sunlitGround.mul(vec3(0.52, 0.56, 0.48)), leftWoodShade);

  mat.normalMap = textures.groundNormal;
  mat.normalScale = new THREE.Vector2(1.6, 1.6);
  mat.roughnessNode = mix(
    mix(float(0.95), float(0.88), pathWeight),
    float(0.32),
    wetness,
  );
  mat.metalnessNode = float(0.01);
  return mat;
}

export function createTrickleStreamMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshPhysicalNodeMaterial {
  const mat = new THREE.MeshPhysicalNodeMaterial();
  const uvCoord = uv();
  // Flow runs along U (spout/lip -> basin/pond)
  const flowUvA = vec2(uvCoord.x.mul(1.8).sub(elapsedUniform.mul(2.1)), uvCoord.y.mul(2.4));
  const flowUvB = vec2(uvCoord.x.mul(3.1).sub(elapsedUniform.mul(3.2)), uvCoord.y.mul(1.5).add(0.35));

  const streakA = sin(flowUvA.x.mul(9.0).add(texture(textures.waterNormalA, flowUvA).r.mul(3.2)))
    .mul(0.5)
    .add(0.5);
  const streakB = sin(flowUvB.x.mul(14.0).add(texture(textures.waterNormalB, flowUvB).g.mul(2.6)))
    .mul(0.5)
    .add(0.5);

  const foamStreak = pow(clamp(streakA.mul(0.62).add(streakB.mul(0.48)), 0.0, 1.0), 2.4);
  const waterTint = mix(vec3(0.36, 0.58, 0.54), vec3(0.86, 0.93, 0.9), foamStreak.mul(0.55));

  mat.colorNode = waterTint;
  mat.emissiveNode = vec3(0.12, 0.19, 0.17).mul(foamStreak.mul(0.24));
  mat.roughnessNode = float(0.06);
  mat.metalnessNode = float(0.04);
  mat.opacityNode = float(0.22).add(foamStreak.mul(0.44));
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createKoiBodyMaterial(
  variant: KoiVariant,
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  speedUniform: FloatUniform,
  phase: number,
): THREE.MeshPhysicalNodeMaterial {
  const mat = new THREE.MeshPhysicalNodeMaterial();

  // Body runs local x in [-0.36, +0.36]; u = 0 at tail root, 1 at snout
  const uCoord = clamp(positionLocal.x.add(0.36).div(0.72), 0.0, 1.0);
  const tailWeight = pow(float(1.0).sub(uCoord), 1.55);
  const headCounterSway = sin(float(3.4).mul(elapsedUniform).add(phase)).mul(0.005).mul(uCoord);
  const speedScale = clamp(speedUniform.div(0.66), 0.75, 1.45);
  const swimWave = sin(
    float(8.6)
      .mul(float(1.0).sub(uCoord))
      .sub(float(3.6).mul(elapsedUniform).mul(speedScale))
      .add(phase),
  );
  const lateralOffset = float(0.042).mul(tailWeight).mul(swimWave).add(headCounterSway);
  mat.positionNode = positionLocal.add(vec3(0, 0, lateralOffset));

  const uvCoord = uv();
  const dorsalMask = smoothstep(-0.16, 0.1, normalLocal.y);
  const ventralHighlight = smoothstep(0.1, -0.35, normalLocal.y);

  const porcelain = color(PALETTE.porcelain);
  const vermilion = color(PALETTE.vermilion).mul(1.12);
  const gold = color(PALETTE.gold).mul(1.06);
  const ink = color(PALETTE.ink);

  let baseColor;
  if (variant === 'kohaku') {
    const p1 = length(
      vec2(
        uvCoord.x.sub(0.74).mul(2.15),
        uvCoord.y.sub(0.5).add(sin(uvCoord.x.mul(9.0)).mul(0.055)).mul(1.7),
      ),
    );
    const p2 = length(
      vec2(
        uvCoord.x.sub(0.38).mul(2.05),
        uvCoord.y.sub(0.47).sub(sin(uvCoord.x.mul(7.5)).mul(0.05)).mul(1.75),
      ),
    );
    const p3 = length(vec2(uvCoord.x.sub(0.9).mul(3.5), uvCoord.y.sub(0.51).mul(2.4)));
    const m1 = float(1.0).sub(smoothstep(0.41, 0.54, p1));
    const m2 = float(1.0).sub(smoothstep(0.37, 0.5, p2));
    const m3 = float(1.0).sub(smoothstep(0.34, 0.48, p3));
    const redMask = clamp(m1.add(m2).add(m3), 0.0, 1.0).mul(dorsalMask);
    baseColor = mix(porcelain, vermilion, redMask);
  } else if (variant === 'yamabuki') {
    const crownGold = mix(color(0xf1d292), gold, smoothstep(-0.15, 0.45, normalLocal.y));
    baseColor = mix(crownGold, color(0xf9efe0), ventralHighlight.mul(0.55));
  } else if (variant === 'shiro') {
    const s1 = length(
      vec2(uvCoord.x.sub(0.71).mul(2.15), uvCoord.y.sub(0.52).add(sin(uvCoord.x.mul(7.0)).mul(0.04)).mul(1.8)),
    );
    const s2 = length(vec2(uvCoord.x.sub(0.36).mul(2.1), uvCoord.y.sub(0.45).mul(1.85)));
    const s3 = length(vec2(uvCoord.x.sub(0.56).mul(3.1), uvCoord.y.sub(0.6).mul(2.5)));
    const m1 = float(1.0).sub(smoothstep(0.37, 0.5, s1));
    const m2 = float(1.0).sub(smoothstep(0.35, 0.48, s2));
    const m3 = float(1.0).sub(smoothstep(0.28, 0.4, s3));
    const inkMask = clamp(m1.add(m2).add(m3), 0.0, 1.0).mul(dorsalMask);
    baseColor = mix(porcelain, ink, inkMask);
  } else {
    const r1 = length(vec2(uvCoord.x.sub(0.77).mul(2.3), uvCoord.y.sub(0.51).mul(1.85)));
    const r2 = length(vec2(uvCoord.x.sub(0.29).mul(2.4), uvCoord.y.sub(0.49).mul(1.95)));
    const k1 = length(vec2(uvCoord.x.sub(0.54).mul(2.7), uvCoord.y.sub(0.46).mul(2.15)));
    const k2 = length(vec2(uvCoord.x.sub(0.41).mul(3.2), uvCoord.y.sub(0.58).mul(2.45)));

    const redMask = clamp(
      float(1.0).sub(smoothstep(0.38, 0.52, r1)).add(float(1.0).sub(smoothstep(0.33, 0.47, r2))),
      0.0,
      1.0,
    ).mul(dorsalMask);
    const inkMask = clamp(
      float(1.0).sub(smoothstep(0.31, 0.45, k1)).add(float(1.0).sub(smoothstep(0.25, 0.39, k2))),
      0.0,
      1.0,
    ).mul(dorsalMask);

    const withRed = mix(porcelain, vermilion, redMask);
    baseColor = mix(withRed, ink, inkMask);
  }

  // Subtle animated caustics shimmering across the koi's back underwater
  const fishCaustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const dorsalCaustic = fishCaustic.mul(smoothstep(0.05, 0.72, normalWorld.y)).mul(0.26);
  mat.colorNode = baseColor.add(vec3(0.95, 0.91, 0.76).mul(dorsalCaustic));

  // Scale micro-relief fades cleanly toward smooth snout (u > 0.76)
  const scaleZone = float(1.0).sub(smoothstep(0.7, 0.84, uCoord));
  mat.normalMap = textures.scaleNormal;
  mat.normalScale = new THREE.Vector2(0.45, 0.45);
  mat.roughnessNode = mix(float(0.16), float(0.26), scaleZone);
  mat.metalnessNode = float(0.04);
  mat.clearcoat = 0.72;
  mat.clearcoatRoughness = 0.14;
  return mat;
}

export interface WaterSurfaceMaterialHandle {
  material: THREE.MeshBasicNodeMaterial;
  reflectorTarget: THREE.Object3D | null;
}

export function createWaterSurfaceMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  rippleUniforms: Vec4Uniform[],
  sunDirection: THREE.Vector3,
  usePlanarReflector: boolean,
  reflectionScale: number,
): WaterSurfaceMaterialHandle {
  const mat = new THREE.MeshBasicNodeMaterial();
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;

  const sunDir = vec3(sunDirection.x, sunDirection.y, sunDirection.z).normalize();

  // 1. Two scrolling + cross-drifting procedural normal map layers + fine capillary shimmer
  const uvA = positionWorld.xz
    .mul(0.26)
    .add(vec2(elapsedUniform.mul(0.024), elapsedUniform.mul(0.017)));
  const uvB = positionWorld.xz
    .mul(0.47)
    .add(vec2(elapsedUniform.mul(-0.021), elapsedUniform.mul(0.028)));
  const uvC = positionWorld.xz
    .mul(0.92)
    .add(vec2(elapsedUniform.mul(0.016), elapsedUniform.mul(-0.024)));

  const nA = texture(textures.waterNormalA, uvA).xy.mul(2.0).sub(1.0);
  const nB = texture(textures.waterNormalB, uvB).xy.mul(2.0).sub(1.0);
  const nC = texture(textures.waterNormalB, uvC).xy.mul(2.0).sub(1.0);

  let nx = nA.x.mul(0.055).add(nB.x.mul(0.045)).add(nC.x.mul(0.022));
  let nz = nA.y.mul(0.055).add(nB.y.mul(0.045)).add(nC.y.mul(0.022));

  // 2. Accumulate localized physical ring ripples (clicks, fish wakes, sakura petals, food pellets)
  let rippleCrest = float(0.0).mul(1.0);
  for (let i = 0; i < MAX_SHADER_RIPPLES; i++) {
    const rData = rippleUniforms[i];
    const age = elapsedUniform.sub(rData.z);
    const active = smoothstep(-0.001, 0.02, age).mul(float(1.0).sub(smoothstep(2.0, 2.55, age)));
    const strength = rData.w.mul(active);

    const delta = positionWorld.xz.sub(rData.xy);
    const dist = length(delta).add(0.0001);
    const dir = delta.div(dist);

    const front = age.mul(0.95);
    const ringDist = dist.sub(front);
    // Double concentric crest per ripple for lifelike surface tension feel
    const band1 = exp(ringDist.mul(ringDist).mul(-52.0));
    const band2 = exp(ringDist.add(0.14).mul(ringDist.add(0.14)).mul(-68.0)).mul(0.55);
    const wave = sin(ringDist.mul(36.0));
    const radialEnvelope = band1.add(band2).mul(exp(age.mul(-1.25))).mul(strength);

    const slope = wave.mul(radialEnvelope).mul(0.26);
    nx = nx.add(dir.x.mul(slope));
    nz = nz.add(dir.y.mul(slope));
    rippleCrest = rippleCrest.add(max(float(0.0), wave).mul(radialEnvelope));
  }

  const surfaceNormal = vec3(nx, float(1.0), nz).normalize();
  const worldToEye = cameraPosition.sub(positionWorld);
  const eyeDir = worldToEye.normalize();

  // 3. Real-time optical refraction sampling behind-water framebuffer (koi + pebbles + caustics)
  const refractDistort = vec2(surfaceNormal.x, surfaceNormal.z.negate()).mul(0.032);
  const refrUV = clamp(screenUV.add(refractDistort), 0.002, 0.998);
  const refractedBg = viewportSharedTexture(refrUV).rgb;

  // 4. Depth-dependent Beer-Lambert absorption: luminous shallow mint (#7FB5A3) -> deeper jade (#3D8576)
  const normPos = vec2(
    positionWorld.x.div(NATURAL_POND_RX),
    positionWorld.z.div(NATURAL_POND_RZ),
  );
  const rho = clamp(length(normPos), 0.0, 1.0);
  const waterDepth = float(0.05).add(float(0.64).mul(float(1.0).sub(rho.mul(rho))));
  const absorption = exp(waterDepth.negate().mul(vec3(1.65, 0.38, 0.68)));
  const deepScatter = vec3(0.13, 0.39, 0.31).mul(float(1.0).sub(absorption)).mul(0.94);
  const submergedColor = refractedBg.mul(absorption).add(deepScatter);

  // 5. Planar real-time reflections + procedural morning canopy/sky environment fallback
  const reflVec = reflect(eyeDir.negate(), surfaceNormal);
  const envReflect = texture(textures.envEquirect, equirectUV(reflVec)).rgb;

  let reflectorTarget: THREE.Object3D | null = null;
  let reflectedSceneColor;

  if (usePlanarReflector) {
    const mirrorSampler = reflector({ resolutionScale: reflectionScale, bounces: false });
    if (mirrorSampler.uvNode) {
      mirrorSampler.uvNode = mirrorSampler.uvNode.add(surfaceNormal.xz.mul(0.055));
    }
    reflectorTarget = mirrorSampler.target;
    // Blend planar reflected sakura/bamboo/shrine over morning sky env wherever sky is open
    reflectedSceneColor = mix(envReflect, mirrorSampler.rgb, clamp(mirrorSampler.a, 0.0, 1.0));
  } else {
    reflectedSceneColor = envReflect;
  }

  // 6. Physical Schlick Fresnel: clear view down onto koi & bed stones, misty canopy reflection at glancing angles
  const ndotv = max(dot(surfaceNormal, eyeDir), 0.001);
  const rawFresnel = float(0.025).add(float(0.975).mul(pow(float(1.0).sub(ndotv), 4.6)));
  const fresnel = clamp(rawFresnel.mul(0.76), 0.03, 0.46);

  // 7. Morning sun specular glints + crisp concentric ripple catchlights
  const sunReflect = reflect(sunDir.negate(), surfaceNormal).normalize();
  const sunSpec = pow(max(dot(sunReflect, eyeDir), 0.0), 180.0)
    .mul(vec3(1.0, 0.96, 0.86))
    .mul(1.2);
  const crestHighlight = clamp(rippleCrest, 0.0, 1.0).mul(vec3(0.96, 0.95, 0.88)).mul(0.32);

  const combined = mix(submergedColor, reflectedSceneColor, fresnel).add(sunSpec).add(crestHighlight);
  mat.colorNode = combined;
  mat.opacityNode = float(0.985);

  return { material: mat, reflectorTarget };
}

export function createSunbeamMaterial(
  elapsedUniform: FloatUniform,
  opacityScale: FloatUniform,
): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  const uvCoord = uv();
  // Soft across shaft width (u: 0..1) and fading out cleanly well above the midground floor
  const across = sin(uvCoord.x.mul(Math.PI));
  const edgeFade = pow(clamp(across, 0.0, 1.0), 2.3);
  const alongFade = smoothstep(0.26, 0.62, uvCoord.y).mul(smoothstep(1.0, 0.74, uvCoord.y));
  const shimmer = float(0.85).add(
    sin(uvCoord.x.mul(8.0).add(elapsedUniform.mul(0.45))).mul(0.15),
  );

  mat.colorNode = vec3(1.0, 0.94, 0.78);
  mat.opacityNode = edgeFade.mul(alongFade).mul(shimmer).mul(opacityScale).mul(0.34);
  mat.transparent = true;
  mat.depthWrite = false;
  mat.blending = THREE.NormalBlending;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createMistSheetMaterial(
  elapsedUniform: FloatUniform,
  phaseOffset: number,
  baseOpacity = 0.18,
): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  const uvCoord = uv();
  const horiz = pow(clamp(sin(uvCoord.x.mul(Math.PI)), 0.0, 1.0), 1.5);
  // Keep lower edge above forest floor so mist drifts through distant bamboo trunks without washing out terrain
  const vert = smoothstep(0.16, 0.56, uvCoord.y).mul(smoothstep(1.0, 0.35, uvCoord.y));
  const drift = sin(
    uvCoord.x.mul(5.2).sub(elapsedUniform.mul(0.16)).add(phaseOffset),
  )
    .mul(0.22)
    .add(0.78);

  mat.colorNode = vec3(0.62, 0.69, 0.58);
  mat.opacityNode = horiz.mul(vert).mul(drift).mul(baseOpacity);
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createRippleRingMaterial(opacityUniform: FloatUniform): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  mat.colorNode = color(PALETTE.paper);
  mat.opacityNode = opacityUniform;
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createMatteNodeMaterial(
  hex: number,
  roughness = 0.85,
  metalness = 0.04,
  bumpTex?: THREE.Texture,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial({
    color: hex,
    roughness,
    metalness,
  });
  if (bumpTex) {
    mat.bumpMap = bumpTex;
    mat.bumpScale = 0.025;
  }
  return mat;
}
