'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { DayNightPalette } from '../../../lib/day-night-cycle';
import { GLSL_WATER_DEPTH_FN, LANTERN_ANCHOR, TORII_ANCHOR, WATER_LEVEL } from '../../../lib/terrain';
import { WIND_DIRECTION, evaluateWindGust } from '../../../lib/wind';
import {
  MAX_WATER_RIPPLES,
  type WaterObstacleCircle,
  type WaterRipplePool,
} from '../../../lib/water-ripples';

export { MAX_WATER_RIPPLES };

const MAX_SHORE_ROCKS = 6;

export interface WaterReflectionLayerProps {
  enableMotion: boolean;
  wireframe: boolean;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
  waterRipplePoolRef: React.RefObject<WaterRipplePool>;
  shoreObstaclesRef: React.RefObject<WaterObstacleCircle[]>;
  lanternLightY: number;
}

const WATER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uWindDir;

  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    // Calm, low-amplitude mountain-lake swell synchronized with sampleWaterSurfaceY()
    float swell =
      sin(dot(wp.xz, uWindDir) * 1.15 - uTime * 0.72) * 0.0065 +
      cos(wp.x * 0.64 - wp.z * 1.05 + uTime * 0.54) * 0.004;
    wp.y += swell;
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uWindGust;
  uniform vec2 uWindDir;
  uniform vec3 uNearWaterColor;
  uniform vec3 uFarWaterColor;
  uniform vec3 uSunReflectColor;
  uniform vec3 uToriiReflectColor;
  uniform vec3 uLanternGlowColor;
  uniform float uLanternStrength;
  uniform vec3 uMountainReflectColor;
  uniform vec3 uHorizonMistColor;
  uniform vec3 uToriiWorldPos;
  uniform vec3 uLanternWorldPos;
  uniform float uCelestialY;
  uniform vec4 uRipples[${MAX_WATER_RIPPLES}]; // xy = world xz, z = normalized age (0..1), w = strength
  uniform vec4 uShoreRocks[${MAX_SHORE_ROCKS}]; // xy = world xz, z = radius, w = active

  varying vec2 vUv;
  varying vec3 vWorldPos;

  ${GLSL_WATER_DEPTH_FN}

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm3(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.04 + vec2(11.3, 5.7);
      a *= 0.5;
    }
    return v;
  }

  // Layer 1: Broad, slow, low-frequency primary lake swells defining coherent drift direction
  float primaryRipple(vec2 xz, float t) {
    vec2 dirA = normalize(uWindDir);
    vec2 dirB = normalize(vec2(uWindDir.x * 0.92 - uWindDir.y * 0.38, uWindDir.x * 0.38 + uWindDir.y * 0.92));
    // Horizontally elongated lake perspective banding (gentle ridges viewed across the water)
    vec2 stretched = vec2(xz.x * 0.44, xz.y * 1.95);
    float warp = fbm3(stretched * 0.55 - dirA * (t * 0.14)) * 1.85;
    float swellA = sin(dot(vec2(xz.x * 0.52, xz.y * 2.25), dirA) - t * 0.68 + warp);
    float swellB = sin(dot(vec2(xz.x * 0.38, xz.y * 1.55), dirB) - t * 0.48 - warp * 0.6);
    return (swellA * 0.62 + swellB * 0.38) * 0.5 + 0.5;
  }

  // Layer 2: Finer, softer, slightly faster secondary ripples adding calm reflection breakup
  float secondaryRipple(vec2 xz, float t) {
    vec2 dirC = normalize(vec2(uWindDir.x * 0.85 + uWindDir.y * 0.52, -uWindDir.x * 0.52 + uWindDir.y * 0.85));
    vec2 drift = dirC * (t * 0.34);
    float n = noise(vec2(xz.x * 1.35, xz.y * 5.2) - drift);
    float fine = sin(dot(vec2(xz.x * 1.45, xz.y * 5.6), dirC) - t * 1.32 + n * 2.6) * 0.5 + 0.5;
    return mix(n, fine, 0.55);
  }

  // Combined ripple height scaled by distance fade (smoother in distance, more readable in near foreground)
  float combinedRippleHeight(vec2 xz, float t, float nearWeight) {
    float p = primaryRipple(xz, t);
    float s = secondaryRipple(xz, t);
    float secWeight = mix(0.18, 0.44, nearWeight);
    return mix(p, s, secWeight);
  }

  // Signed distance outside the Torii stone platform's rotated horizontal footprint
  float sdToriiPlatform(vec2 xz) {
    vec2 d = xz - uToriiWorldPos.xz;
    // Rotate into Torii local space (rotationY = -0.15)
    float c = cos(0.15);
    float s = sin(0.15);
    vec2 local = vec2(c * d.x - s * d.y, s * d.x + c * d.y);
    vec2 q = abs(local) - vec2(1.56, 0.82);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  // Stylized, softly blurred 2D silhouette of the Myōjin Torii gate in its own local (x, yAbovePlatform) frame
  float evaluateToriiSilhouette(vec2 localXY, float blurWidth) {
    float lx = localXY.x;
    float ly = localXY.y;

    // Tapered slightly inward-leaning pillars (hashira)
    float pillarOffset = mix(0.82, 0.74, clamp(ly / 2.2, 0.0, 1.0));
    float pillarSpanY = smoothstep(-0.08, 0.12, ly) * (1.0 - smoothstep(2.12, 2.34, ly));
    float pillarL = exp(-pow((lx + pillarOffset) / (0.14 + blurWidth), 2.0));
    float pillarR = exp(-pow((lx - pillarOffset) / (0.14 + blurWidth), 2.0));
    float pillars = max(pillarL, pillarR) * pillarSpanY;

    // Lower tie beam (nuki)
    float nukiX = 1.0 - smoothstep(1.18, 1.46 + blurWidth, abs(lx));
    float nukiY = exp(-pow((ly - 1.78) / (0.11 + blurWidth * 0.75), 2.0));
    float nuki = nukiX * nukiY;

    // Upper curved lintel (shimaki + kasagi with upward sori curve)
    float soriCurve = 2.28 + lx * lx * 0.082;
    float kasagiX = 1.0 - smoothstep(1.42, 1.74 + blurWidth, abs(lx));
    float kasagiY = exp(-pow((ly - soriCurve) / (0.15 + blurWidth * 0.85), 2.0));
    float kasagi = kasagiX * kasagiY;

    // Central strut plaque (gakuzuka)
    float plaque = exp(-pow(lx / (0.14 + blurWidth * 0.5), 2.0)) *
                   exp(-pow((ly - 2.02) / (0.18 + blurWidth * 0.5), 2.0)) * 0.85;

    // Subtle stone terrace front edge directly under the pillars
    float terraceX = 1.0 - smoothstep(1.36, 1.62 + blurWidth, abs(lx));
    float terraceY = smoothstep(-0.42, -0.22, ly) * (1.0 - smoothstep(-0.02, 0.12, ly));
    float terrace = terraceX * terraceY * 0.62;

    return clamp(max(max(pillars, nuki), max(max(kasagi, plaque), terrace)), 0.0, 1.0);
  }

  void main() {
    // 1. Irregular natural shoreline depth & smooth dry-bank cutoff
    float rawDepth = sampleWaterDepth(vWorldPos.xz);
    float shoreBreakNoise =
      (noise(vWorldPos.xz * 2.15 + vec2(3.1, 1.7)) - 0.5) * 0.09 +
      (noise(vWorldPos.xz * 5.4 - vec2(1.4, 2.9)) - 0.5) * 0.035;
    float waterDepth = rawDepth + shoreBreakNoise * smoothstep(0.48, -0.04, rawDepth);

    if (waterDepth < -0.022) discard;

    // World-space distance factor: 0.0 = far horizon near mountains, 1.0 = near foreground
    float nearT = smoothstep(-14.6, 4.2, vWorldPos.z);
    float rippleDistanceFade = mix(0.26, 1.0, smoothstep(0.06, 0.82, nearT));

    // 2. Layered Primary + Secondary Ripples & Analytical Surface Normal
    float pC = primaryRipple(vWorldPos.xz, uTime);
    float sC = secondaryRipple(vWorldPos.xz, uTime);
    float hC = mix(pC, sC, mix(0.18, 0.44, nearT));

    float epsX = 0.11;
    float epsZ = 0.065;
    float hX = combinedRippleHeight(vWorldPos.xz + vec2(epsX, 0.0), uTime, nearT);
    float hZ = combinedRippleHeight(vWorldPos.xz + vec2(0.0, epsZ), uTime, nearT);

    // Subtle local disturbance around Torii stone terrace & protruding waterline rocks
    float toriiEdgeDist = max(sdToriiPlatform(vWorldPos.xz), 0.0);
    float platformProximity = exp(-toriiEdgeDist * 3.8);
    float platformLapWave = sin(toriiEdgeDist * 28.0 - uTime * 1.15 + pC * 3.2) * platformProximity;

    float rockContactTotal = 0.0;
    float rockDisturbWave = 0.0;
    vec2 rockNormalPush = vec2(0.0);
    for (int i = 0; i < ${MAX_SHORE_ROCKS}; i++) {
      vec4 rk = uShoreRocks[i];
      if (rk.w > 0.5) {
        vec2 diff = vWorldPos.xz - rk.xy;
        float dist = length(diff);
        float dEdge = max(dist - rk.z, 0.0);
        float prox = exp(-dEdge * 4.6);
        rockContactTotal = max(rockContactTotal, exp(-dEdge * 7.0));
        float rw = sin(dEdge * 30.0 - uTime * 1.3 + pC * 2.5) * prox;
        rockDisturbWave += rw;
        if (dist > 0.001) {
          rockNormalPush += (diff / dist) * rw * 0.08;
        }
      }
    }

    // 3. Sparse, delicate expanding circular petal-impact ripple rings (normal + sheen)
    float petalRippleSheen = 0.0;
    vec2 petalRippleNormal = vec2(0.0);
    for (int i = 0; i < ${MAX_WATER_RIPPLES}; i++) {
      vec4 rp = uRipples[i];
      if (rp.w > 0.001 && rp.z < 1.0) {
        float age = rp.z;
        vec2 delta = vWorldPos.xz - rp.xy;
        // Slight elliptical compensation for low-angle perspective readability
        vec2 scaled = delta * vec2(1.0, 1.32);
        float dist = length(scaled);
        float radius = 0.03 + age * 0.44;
        float ringWidth = mix(0.02, 0.044, age);

        // Two delicate expanding rings: primary crest + softer trailing inner echo
        float dOuter = (dist - radius) / ringWidth;
        float dInner = (dist - radius * 0.62) / (ringWidth * 1.2);
        float outerRing = exp(-dOuter * dOuter);
        float innerRing = exp(-dInner * dInner) * 0.38;

        // Smooth fade-in and gentle lingering cubic fade-out
        float env = smoothstep(0.0, 0.10, age) * pow(1.0 - age, 2.35) * rp.w;
        float ringAmp = (outerRing + innerRing) * env;
        petalRippleSheen += ringAmp;

        if (dist > 0.004) {
          vec2 radialDir = delta / max(length(delta), 0.004);
          float slopeOuter = -dOuter * outerRing;
          float slopeInner = -dInner * innerRing;
          petalRippleNormal += radialDir * (slopeOuter + slopeInner) * env * 0.15;
        }
      }
    }

    // Keep the left hero text-safe side extra calm and silky while preserving subtle life on the right
    float leftCalmMask = mix(0.58, 1.0, smoothstep(-5.2, 0.6, vWorldPos.x));
    float normalStrength = (0.21 + uWindGust * 0.08) * rippleDistanceFade * leftCalmMask;
    vec2 gradXZ = vec2((hC - hX) / epsX, (hC - hZ) / epsZ) * normalStrength;
    gradXZ += rockNormalPush * rippleDistanceFade * 0.72 + petalRippleNormal;
    vec3 surfNormal = normalize(vec3(gradXZ.x, 1.0, gradXZ.y));

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 incident = -viewDir;
    vec3 reflDir = reflect(incident, surfNormal);
    reflDir.y = max(reflDir.y, 0.014);

    float ndotv = clamp(dot(surfNormal, viewDir), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 3.1);

    // 4. Water Shading, Depth Gradient & Subtle Local Tonal Variation
    // Richer darker value in the near foreground, lifting and desaturating gently toward the horizon
    vec3 nearTone = uNearWaterColor * 0.88;
    vec3 farTone = mix(uFarWaterColor, uHorizonMistColor, 0.24);
    vec3 baseWater = mix(farTone, nearTone, smoothstep(0.05, 0.92, nearT));

    // Restrained broad organic tonal patches across the lake so it never reads as a uniform flat plane
    float macroPatch = fbm3(vWorldPos.xz * vec2(0.16, 0.26) + vec2(2.4, -1.8) - uWindDir * (uTime * 0.014));
    float toneVar = (macroPatch - 0.5) * 0.13 * mix(0.42, 1.0, nearT);
    baseWater *= (1.0 + toneVar);

    // Subtle shallow shoreline jade-slate undertone
    float shallowFactor = 1.0 - smoothstep(0.02, 0.46, waterDepth);
    vec3 shallowTint = mix(uNearWaterColor * 0.78, vec3(0.18, 0.24, 0.28), 0.32);
    vec3 col = mix(baseWater, shallowTint, shallowFactor * 0.38);

    // Restrained directional ripple shading (silky crest lift without heavy striping)
    float rippleSlope = clamp(dot(surfNormal.xz, normalize(vec2(0.55, -0.84))) * 1.35, -1.0, 1.0);
    float primaryBand = (pC - 0.5) * 0.075 * rippleDistanceFade * leftCalmMask;
    col *= (1.0 + primaryBand + rippleSlope * 0.048);

    // Soft sky Fresnel reflection modulated subtly by secondary ripples
    vec3 skyReflectCol = mix(uFarWaterColor, uSunReflectColor, 0.20);
    float skySheen = clamp(fresnel * 0.36 + (sC - 0.46) * 0.042 * rippleDistanceFade * leftCalmMask, 0.0, 0.44);
    col = mix(col, skyReflectCol, skySheen);

    // 5. Soft Inverted Distant Mountain Silhouette Reflection
    float mX = vWorldPos.x + surfNormal.x * 1.9;
    float fujiRefl = exp(-pow((mX - 5.1) / 4.8, 2.0)) * 0.68;
    float ridgeRefl = exp(-pow((mX - 1.6) / 8.0, 2.0)) * 0.36 + exp(-pow((mX + 8.6) / 6.6, 2.0)) * 0.24;
    float mZMask = smoothstep(-13.8, -9.2, vWorldPos.z) * (1.0 - smoothstep(-4.8, 0.6, vWorldPos.z));
    float mBreakup = 0.72 + 0.28 * smoothstep(0.24, 0.78, hC);
    float mStrength = clamp(fujiRefl + ridgeRefl, 0.0, 1.0) * mZMask * mBreakup * (1.0 - shallowFactor * 0.55);
    col = mix(col, uMountainReflectColor, mStrength * 0.29);

    // 6. Soft Diffused Moon / Sun Reflection Band (atmospheric, restrained, ripple-broken)
    vec3 celestialWorld = vec3(7.7, uCelestialY, -26.2);
    vec3 toCelestial = normalize(celestialWorld - vWorldPos);
    float azDelta = (reflDir.x - toCelestial.x);
    float bandSpread = mix(0.25, 0.145, nearT);
    float broadGlow = exp(-pow(azDelta / (bandSpread * 2.0), 2.0));
    float coreBand = exp(-pow(azDelta / bandSpread, 2.0));

    // Break the vertical path gently into calm horizontal shimmer zones
    float bandRippleWave = smoothstep(0.36, 0.86, mix(pC, sC, 0.52));
    float shimmerZones = smoothstep(0.30, 0.84, sin(vWorldPos.z * 2.0 - uTime * 0.58 + pC * 3.8) * 0.5 + 0.5);
    float celestialZFade = smoothstep(-14.2, -9.4, vWorldPos.z) * (1.0 - smoothstep(1.1, 4.2, vWorldPos.z));
    float moonBand = (broadGlow * 0.20 + coreBand * (0.24 + 0.76 * bandRippleWave * (0.45 + 0.55 * shimmerZones)))
                     * celestialZFade * (1.0 - shallowFactor * 0.55);
    col = mix(col, uSunReflectColor, clamp(moonBand * 0.30, 0.0, 0.34));

    // Whisper-quiet occasional glints strictly in the right cove reflection path
    float rightZoneMask = smoothstep(-0.8, 1.4, vWorldPos.x);
    float glintSpec = pow(clamp(dot(reflDir, toCelestial), 0.0, 1.0), 52.0);
    float glintSpark = smoothstep(0.78, 0.95, sC) * smoothstep(0.60, 0.88, pC);
    float softGlint = (glintSpec * 0.35 + coreBand * glintSpark * 0.24) * rightZoneMask * celestialZFade * (1.0 - shallowFactor);
    col += uSunReflectColor * clamp(softGlint, 0.0, 0.11);

    // 7. Atmospheric, Ripple-Broken Dark Red-Black Torii Gate Reflection
    vec3 toriiReflNormal = normalize(vec3(surfNormal.x * 1.9, 1.0, surfNormal.z * 2.5));
    vec3 rTorii = reflect(incident, toriiReflNormal);
    rTorii.y = max(rTorii.y, 0.01);

    vec2 tPlaneN = vec2(-sin(0.15), cos(0.15));
    vec2 tPlaneT = vec2(cos(0.15), sin(0.15));
    float denom = dot(rTorii.xz, tPlaneN);
    float signedPlaneDist = dot(vWorldPos.xz - uToriiWorldPos.xz, tPlaneN);
    if (signedPlaneDist > 0.14 && denom < -0.025) {
      float tHit = -signedPlaneDist / denom;
      if (tHit > 0.0 && tHit < 18.0) {
        vec3 hitP = vWorldPos + rTorii * tHit;
        float localX = dot(hitP.xz - uToriiWorldPos.xz, tPlaneT);
        // More organic horizontal liquid slicing so the silhouette feels softly dissolved & broken
        float sliceOffset =
          sin(vWorldPos.z * 7.4 - uTime * 1.02 + pC * 5.2) * 0.115 +
          (sC - 0.5) * 0.145 +
          (pC - 0.5) * 0.09;
        float localY = hitP.y - uToriiWorldPos.y;
        float distFade = exp(-max(0.0, signedPlaneDist - 0.35) * 0.26);
        float blurAmt = 0.115 + signedPlaneDist * 0.044;

        float sil = evaluateToriiSilhouette(vec2(localX + sliceOffset, localY), blurAmt);
        // Deeper horizontal ripple gaps & misty atmospheric fading across the reflection
        float bandGap = smoothstep(0.22, 0.78, sin(vWorldPos.z * 5.8 - uTime * 0.95 + pC * 4.6) * 0.5 + 0.5);
        float rippleFragment = mix(0.24, 0.94, mix(bandGap, smoothstep(0.24, 0.82, sC), 0.42));
        float toriiAlpha = sil * distFade * rippleFragment * (1.0 - shallowFactor * 0.28) * 0.50;

        // Atmospheric mist-veiled dark red-black reflection tone
        vec3 mistVeiledTorii = mix(uToriiReflectColor, uMountainReflectColor, clamp(0.22 + signedPlaneDist * 0.06, 0.0, 0.55));
        vec3 toriiDarkTone = mix(col * 0.42, mistVeiledTorii, 0.65);
        col = mix(col, toriiDarkTone, clamp(toriiAlpha, 0.0, 0.50));
      }
    }

    // 8. Softer, Warmer Localized Stone Lantern Reflection (intimate honey-amber cove shimmer)
    vec2 lDeltaXZ = vWorldPos.xz - uLanternWorldPos.xz;
    float lanternRadialDist = length(lDeltaXZ * vec2(0.86, 0.56));
    float lanternLocalBounds = exp(-lanternRadialDist * lanternRadialDist * 0.46);

    float lanternColumn = 0.0;
    if (vWorldPos.z > uLanternWorldPos.z - 0.55 && reflDir.z < -0.02) {
      float tL = (uLanternWorldPos.z - vWorldPos.z) / reflDir.z;
      if (tL > 0.0 && tL < 11.0) {
        vec3 lHit = vWorldPos + reflDir * tL;
        float dxL = (lHit.x - uLanternWorldPos.x) + (sC - 0.5) * 0.28 + sin(vWorldPos.z * 8.4 - uTime * 1.25) * 0.085;
        float dyL = (lHit.y - uLanternWorldPos.y);
        float horizMatch = exp(-pow(dxL / 0.68, 2.0));
        float vertMatch = exp(-pow(dyL / 1.65, 2.0));
        lanternColumn = horizMatch * vertMatch;
      }
    }

    // Soft warm amber reflection cradled right off the rocky lantern bank
    vec2 coveDelta = vec2(
      (vWorldPos.x - (uLanternWorldPos.x - 1.28) + surfNormal.x * 0.65) / 0.88,
      (vWorldPos.z - (uLanternWorldPos.z + 0.95)) / 1.85
    );
    float coveSpill = exp(-dot(coveDelta, coveDelta) * 1.25);

    // Gentle candlelit liquid ripple breakup (soft, warm, never flashy)
    float lanternRippleBreak = 0.48 + 0.52 * smoothstep(0.24, 0.84, mix(sC, pC, 0.5));
    float lanternShimmer = 0.94 + 0.06 * sin(uTime * 1.35 + vWorldPos.z * 4.0 + pC * 2.8);
    float lanternReflect = (lanternColumn * 0.72 + coveSpill * 0.46) * lanternLocalBounds * lanternRippleBreak * lanternShimmer * uLanternStrength;

    // Warm candle-amber tint blended gently into the cool water tone
    vec3 warmWaterTone = mix(col, uLanternGlowColor, 0.68);
    col = mix(col, warmWaterTone, clamp(lanternReflect * 0.54, 0.0, 0.44));
    col += uLanternGlowColor * clamp(lanternReflect * 0.13, 0.0, 0.13);

    // 9. Quiet Shoreline, Torii Platform & Rock Contact Shading + Subtle Lapping Edges
    float shoreContactDark = (1.0 - smoothstep(0.0, 0.24, waterDepth)) * 0.24;
    float objContactDark = max(platformProximity * 0.26, rockContactTotal * 0.22);
    col *= (1.0 - clamp(shoreContactDark + objContactDark * 0.82, 0.0, 0.36));

    float shoreLapBand = smoothstep(0.012, 0.065, waterDepth) * (1.0 - smoothstep(0.08, 0.22, waterDepth));
    float shoreSelector = smoothstep(0.44, 0.82, noise(vWorldPos.xz * 0.85 + vec2(1.2, -0.7)));
    float shoreLapWave = smoothstep(0.60, 0.94, sin(waterDepth * 36.0 - uTime * 1.08 + pC * 3.8) * 0.5 + 0.5);
    float objLapHighlight =
      smoothstep(0.58, 0.94, platformLapWave * 0.5 + 0.5) * platformProximity * 0.075 +
      smoothstep(0.62, 0.95, rockDisturbWave * 0.5 + 0.5) * rockContactTotal * 0.068;
    float subtleEdgeRim = shoreLapBand * shoreSelector * shoreLapWave * 0.09 + objLapHighlight;
    vec3 edgeLightCol = mix(uHorizonMistColor, uSunReflectColor, 0.28);
    col = mix(col, edgeLightCol, clamp(subtleEdgeRim, 0.0, 0.13));

    // 10. Delicate Petal-Impact Ripple Ring Sheen (faint, meditative pale echo)
    vec3 rippleRingCol = mix(uHorizonMistColor, uSunReflectColor, 0.48);
    col = mix(col, rippleRingCol, clamp(petalRippleSheen * 0.17, 0.0, 0.22));
    col += uSunReflectColor * clamp(petalRippleSheen * 0.055, 0.0, 0.085);

    // 11. Atmospheric Horizon Mist Fade (smooth transition into distant mountain haze)
    float horizonFade = smoothstep(0.0, 0.32, nearT);
    col = mix(uHorizonMistColor, col, horizonFade);

    // Soft organic shoreline alpha feathering
    float shoreAlpha = smoothstep(-0.014, 0.095, waterDepth);
    gl_FragColor = vec4(col, shoreAlpha);
  }
`;

export function WaterReflectionLayer({
  enableMotion,
  wireframe,
  cyclePaletteRef,
  waterRipplePoolRef,
  shoreObstaclesRef,
  lanternLightY,
}: WaterReflectionLayerProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const simTimeRef = useRef(0);

  const rippleUniformArray = useMemo(
    () => Array.from({ length: MAX_WATER_RIPPLES }, () => new THREE.Vector4(0, 0, 1, 0)),
    []
  );

  const shoreRockUniformArray = useMemo(
    () => Array.from({ length: MAX_SHORE_ROCKS }, () => new THREE.Vector4(0, 0, 0.2, 0)),
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindGust: { value: 0.2 },
      uWindDir: { value: new THREE.Vector2(WIND_DIRECTION.x, WIND_DIRECTION.z) },
      uNearWaterColor: { value: new THREE.Color('#213041') },
      uFarWaterColor: { value: new THREE.Color('#7F8E9D') },
      uSunReflectColor: { value: new THREE.Color('#F5DFC6') },
      uToriiReflectColor: { value: new THREE.Color('#381619') },
      uLanternGlowColor: { value: new THREE.Color('#EE9E52') },
      uLanternStrength: { value: 0.36 },
      uMountainReflectColor: { value: new THREE.Color('#2C3C4E') },
      uHorizonMistColor: { value: new THREE.Color('#BFC6CE') },
      uToriiWorldPos: {
        value: new THREE.Vector3(TORII_ANCHOR.x, TORII_ANCHOR.platformTopY, TORII_ANCHOR.z),
      },
      uLanternWorldPos: {
        value: new THREE.Vector3(LANTERN_ANCHOR.x, lanternLightY, LANTERN_ANCHOR.z),
      },
      uCelestialY: { value: 4.45 },
      uRipples: { value: rippleUniformArray },
      uShoreRocks: { value: shoreRockUniformArray },
    }),
    [rippleUniformArray, shoreRockUniformArray, lanternLightY]
  );

  useEffect(() => {
    if (matRef.current) {
      matRef.current.wireframe = wireframe;
    }
  }, [wireframe]);

  useFrame((_, delta) => {
    const safeDt = Math.min(delta, 0.1);
    if (enableMotion) {
      simTimeRef.current += safeDt;
    }
    if (!matRef.current) return;

    const u = matRef.current.uniforms;
    u.uTime.value = simTimeRef.current;
    u.uWindGust.value = evaluateWindGust(simTimeRef.current, 0.5);

    const palette = cyclePaletteRef.current;
    if (palette) {
      u.uNearWaterColor.value.setRGB(palette.waterNear.r, palette.waterNear.g, palette.waterNear.b);
      u.uFarWaterColor.value.setRGB(palette.waterFar.r, palette.waterFar.g, palette.waterFar.b);
      u.uSunReflectColor.value.setRGB(
        palette.waterReflect.r,
        palette.waterReflect.g,
        palette.waterReflect.b
      );
      u.uHorizonMistColor.value.setRGB(palette.fogColor.r, palette.fogColor.g, palette.fogColor.b);
      u.uCelestialY.value = palette.celestialY;

      // Scale warm lantern reflection naturally with the day-night lantern glow (softer & warmly restrained)
      u.uLanternStrength.value = THREE.MathUtils.clamp(
        0.12 + palette.lanternEmissiveIntensity * 0.26,
        0.14,
        0.78
      );

      // Subtle atmospheric mountain reflection tone
      u.uMountainReflectColor.value.setRGB(
        palette.waterNear.r * 0.58 + palette.mountainTint.r * 0.12 * palette.mountainLightScale,
        palette.waterNear.g * 0.62 + palette.mountainTint.g * 0.14 * palette.mountainLightScale,
        palette.waterNear.b * 0.68 + palette.mountainTint.b * 0.18 * palette.mountainLightScale
      );

      // Subdued dark crimson-charcoal Torii silhouette reflection tone adapting smoothly across dawn/day/dusk/night
      const toriiToneScale = 0.42 + palette.mountainLightScale * 0.42;
      u.uToriiReflectColor.value.setRGB(
        0.31 * toriiToneScale,
        0.105 * toriiToneScale,
        0.115 * toriiToneScale
      );
    }

    // Sync waterline boulder obstacles into shader uniform array (zero allocations)
    const rocks = shoreObstaclesRef.current;
    if (rocks) {
      for (let i = 0; i < MAX_SHORE_ROCKS; i++) {
        const slot = shoreRockUniformArray[i];
        const rk = rocks[i];
        if (rk) {
          slot.set(rk.x, rk.z, rk.radius, 1);
        } else {
          slot.set(0, 0, 0.2, 0);
        }
      }
    }

    // Sync active pooled petal-impact ripples into shader uniform array (zero allocations)
    const pool = waterRipplePoolRef.current;
    if (pool) {
      for (let i = 0; i < MAX_WATER_RIPPLES; i++) {
        const slot = rippleUniformArray[i];
        const ev = pool.slots[i];
        if (ev && ev.strength > 0.001 && ev.age < ev.maxAge) {
          slot.set(ev.x, ev.z, ev.age / ev.maxAge, ev.strength);
        } else {
          slot.set(0, 0, 1, 0);
        }
      }
    }
  });

  return (
    <mesh
      name="calm-lake-water"
      position={[-2.0, WATER_LEVEL, -5.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={1}
    >
      <planeGeometry args={[72, 30, 64, 32]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={WATER_VERTEX_SHADER}
        fragmentShader={WATER_FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        wireframe={wireframe}
      />
    </mesh>
  );
}
