import * as THREE from 'three';
import { HALFTONE_GLSL_CHUNK } from './HalftoneShader';

export const DITHER_VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const DITHER_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uDitherEnabled;
uniform float uHalftoneEnabled;
uniform float uDitherIntensity;
uniform float uDitherResolution;
uniform float uHalftoneScale;
uniform float uContrast;
uniform float uGrainIntensity;
uniform float uAccentIntensity;

varying vec2 vUv;

// Exact 8x8 Bayer ordered dithering matrix normalized to [0, 1]
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float bayer8(vec2 a) {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

// Stable screen-space monochromatic paper grain (zero rapid TV-static flickering)
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float paperGrain(vec2 fragCoord) {
  float fine = hash12(floor(fragCoord));
  float fiber = hash12(floor(fragCoord * vec2(0.45, 1.35)) + 17.3);
  return mix(fine, fiber, 0.35) - 0.5;
}

${HALFTONE_GLSL_CHUNK}

// Map scalar tone [0, 1] onto the curated 5-stop monochrome print palette
vec3 sampleMonochromePalette(float tone) {
  const vec3 cNearBlack = vec3(0.039, 0.043, 0.035); // #0A0B09
  const vec3 cCharcoal  = vec3(0.137, 0.145, 0.125); // #232520
  const vec3 cDarkGray  = vec3(0.314, 0.322, 0.290); // #50524A
  const vec3 cAgedPaper = vec3(0.827, 0.816, 0.729); // #D3D0BA
  const vec3 cBoneWhite = vec3(0.933, 0.922, 0.847); // #EEEBD8

  float t = clamp(tone, 0.0, 1.0);
  if (t < 0.24) {
    return mix(cNearBlack, cCharcoal, t / 0.24);
  } else if (t < 0.50) {
    return mix(cCharcoal, cDarkGray, (t - 0.24) / 0.26);
  } else if (t < 0.82) {
    return mix(cDarkGray, cAgedPaper, (t - 0.50) / 0.32);
  } else {
    return mix(cAgedPaper, cBoneWhite, (t - 0.82) / 0.18);
  }
}

void main() {
  vec2 fragCoord = vUv * uResolution;

  // Sample scene render target
  vec4 raw = texture2D(tDiffuse, vUv);

  // Subtle screen-print ink plate registration offset (~0.75px) on acid-green channel
  vec2 regOffset = vec2(0.75, -0.5) / max(uResolution, vec2(1.0));
  vec4 shifted = texture2D(tDiffuse, clamp(vUv + regOffset, 0.0, 1.0));

  // Separate acid-green illumination independently from grayscale architecture
  float greenRaw = max(0.0, raw.g - max(raw.r * 0.72, raw.b * 1.25));
  float greenShifted = max(0.0, shifted.g - max(shifted.r * 0.72, shifted.b * 1.25));
  float greenSignal = clamp(max(greenRaw, greenShifted * 0.82) * 1.65 * uAccentIntensity, 0.0, 1.25);

  // Grayscale luminance from neutral architecture + planet + sky
  // Subtract green contribution slightly so monochrome structure stays crisp underneath
  vec3 neutralRgb = vec3(raw.r, min(raw.g, max(raw.r, raw.b) * 1.05 + 0.02), raw.b);
  float luma = dot(neutralRgb, vec3(0.299, 0.587, 0.114));

  // Contrast curve tuned for high-contrast sci-fi ink-and-paper illustration
  luma = clamp((luma - 0.44) * uContrast + 0.44, 0.0, 1.0);
  luma = pow(luma, 1.08);

  // Subtle dark editorial shading across left 35% negative space so hero text stays razor crisp
  float leftShadow = mix(0.32, 1.0, smoothstep(0.05, 0.46, vUv.x + vUv.y * 0.22));
  luma *= leftShadow;

  // Paper grain added subtly before dithering for authentic lithograph texture
  float grain = paperGrain(fragCoord) * uGrainIntensity;
  float workingLuma = clamp(luma + grain * 0.48, 0.0, 1.0);

  // Effective tone begins as continuous grayscale
  float finalTone = workingLuma;

  // 1. 8x8 Ordered Bayer Dithering across 5-level print quantization
  if (uDitherEnabled > 0.5) {
    vec2 ditherCoord = floor(fragCoord / max(1.0, uDitherResolution));
    float bayer = bayer8(ditherCoord) - 0.5;
    float levels = 4.0; // 5 discrete tonal stops (0..4)
    float quantized = floor(clamp(workingLuma + bayer * (0.82 / levels), 0.0, 0.9999) * levels + 0.5) / levels;
    finalTone = mix(workingLuma, quantized, clamp(uDitherIntensity, 0.0, 1.0));
  }

  // 2. Rotated 45-degree Halftone Dot Screening
  if (uHalftoneEnabled > 0.5) {
    float dotVal = computeHalftoneScreen(fragCoord, workingLuma, uHalftoneScale, uDitherResolution);
    // Keep deep shadows rich near-black; apply halftone across dark-mid to highlight tones
    float midtoneWeight = smoothstep(0.065, 0.22, workingLuma) * (1.0 - smoothstep(0.92, 0.995, workingLuma) * 0.35);
    float halftoneMix = 0.58 * midtoneWeight;
    float screened = mix(finalTone, dotVal, halftoneMix);
    finalTone = mix(finalTone, screened, clamp(0.42 + uDitherIntensity * 0.58, 0.0, 1.0));
  }

  // Map scalar tone to our strict monochrome palette
  vec3 color = sampleMonochromePalette(finalTone);

  // Subtle tactile paper grain overlay on top of palette
  color += vec3(grain * 0.22, grain * 0.22, grain * 0.18);

  // 3. Selective Acid-Green Architectural Illumination (#A8F23A)
  if (greenSignal > 0.015) {
    const vec3 cAcidGreen = vec3(0.659, 0.949, 0.227); // #A8F23A
    const vec3 cAcidDeep  = vec3(0.28, 0.54, 0.08);

    float gMask = greenSignal;
    if (uHalftoneEnabled > 0.5 || uDitherEnabled > 0.5) {
      float gDot = computeAccentHalftone(fragCoord, greenSignal, uHalftoneScale, uDitherResolution);
      vec2 dCoord = floor(fragCoord / max(1.0, uDitherResolution));
      float gBayer = step(bayer8(dCoord), greenSignal * 1.08);
      float pattern = uHalftoneEnabled > 0.5 ? mix(gBayer, gDot, 0.72) : gBayer;
      // Preserve fine crisp edges on intense thin seams (>0.82), dither soft washes cleanly
      float coreLine = smoothstep(0.82, 0.98, greenSignal);
      gMask = max(coreLine, pattern * smoothstep(0.03, 0.14, greenSignal));
    }

    vec3 greenInk = mix(cAcidDeep, cAcidGreen, smoothstep(0.18, 0.80, greenSignal));
    color = mix(color, greenInk, clamp(gMask * 0.88, 0.0, 0.92));
  }

  // Subtle dark editorial vignette framing bottom-left shadow depth
  vec2 vigUv = vUv - vec2(0.62, 0.52);
  float vig = 1.0 - smoothstep(0.50, 1.12, length(vigUv * vec2(1.08, 0.96))) * 0.34;
  color *= vig;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export function createDitherPostMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      uResolution: { value: new THREE.Vector2(1440, 900) },
      uTime: { value: 0 },
      uDitherEnabled: { value: 1.0 },
      uHalftoneEnabled: { value: 1.0 },
      uDitherIntensity: { value: 0.78 },
      uDitherResolution: { value: 1.0 },
      uHalftoneScale: { value: 1.05 },
      uContrast: { value: 1.18 },
      uGrainIntensity: { value: 0.16 },
      uAccentIntensity: { value: 1.05 },
    },
    vertexShader: DITHER_VERTEX_SHADER,
    fragmentShader: DITHER_FRAGMENT_SHADER,
    depthTest: false,
    depthWrite: false,
  });
}
