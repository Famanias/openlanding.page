'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createSeededRandom } from '../lib/cityConfig';

interface AtmosphereProps {
  motionEnabled: boolean;
  fogDensity: number;
  qualityTier: 'high' | 'medium' | 'low';
}

const SKY_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/**
 * Diagonal retro-futuristic atmospheric sky backdrop:
 * - Deep near-black negative space on left 35-40% (for hero typography)
 * - Soft misty charcoal halo behind the ringed planet in upper-middle
 * - Bright aged-paper backlighting on upper-right behind the towering megastructures
 */
const SKY_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uFogDensity;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Subtle slowly drifting atmospheric clouds
  vec2 drift = vec2(uTime * 0.008, uTime * 0.0025);
  float mist = fbm(vUv * vec2(4.6, 3.2) + drift);
  float fineMist = fbm(vUv * vec2(10.0, 7.0) - drift * 0.65);

  // Because the sky backdrop spans wider than the viewport for parallax margin,
  // map the visible camera frame roughly onto u in [0.18..0.82], v in [0.22..0.78]
  vec2 screenApprox = vec2(
    clamp((vUv.x - 0.18) / 0.64, 0.0, 1.0),
    clamp((vUv.y - 0.22) / 0.56, 0.0, 1.0)
  );

  // Deep near-black across left 38%, transitioning softly through misty charcoal
  // around the ringed planet to luminous aged-paper haze in upper-right
  float diag = screenApprox.x * 0.88 + screenApprox.y * 0.36 - 0.42;
  float skyGrad = smoothstep(0.02, 0.82, diag);

  // Keep left 35-40% dark negative space for hero typography
  float leftMask = smoothstep(0.24, 0.58, screenApprox.x);

  // Bright upper-right atmospheric bloom behind foreground towers
  float rightGlow = exp(-length((screenApprox - vec2(0.88, 0.80)) * vec2(1.5, 1.35)) * 2.15) * 0.72;
  // Soft atmospheric mist halo framing the ringed planet
  float planetHalo = exp(-length((screenApprox - vec2(0.52, 0.68)) * vec2(2.0, 1.8)) * 2.3) * 0.28;

  float fogBoost = clamp((uFogDensity - 0.008) * 14.0, -0.05, 0.24);

  float tone = 0.018 + skyGrad * leftMask * 0.62 + rightGlow + planetHalo;
  tone += (mist - 0.48) * (0.12 + fogBoost * 0.22) * (0.16 + leftMask * 0.84);
  tone += (fineMist - 0.5) * 0.035;

  // Deepen lower-left abyss smoothly
  float bottomLeftFade = smoothstep(0.08, 0.62, screenApprox.x + screenApprox.y * 0.46);
  tone *= mix(0.18, 1.0, bottomLeftFade);

  tone = clamp(tone, 0.012, 0.94);

  gl_FragColor = vec4(vec3(tone, tone, tone * 0.96), 1.0);
}
`;

const HAZE_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const HAZE_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uOpacity;
uniform float uSpeed;
uniform float uSeed;

varying vec2 vUv;

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

void main() {
  vec2 p = vUv * vec2(5.0, 2.8) + vec2(uTime * uSpeed + uSeed, uTime * 0.004);
  float n = noise(p) * 0.65 + noise(p * 2.1 + 3.7) * 0.35;

  // Concentrate haze toward middle-right horizon, stay subtle on left text-safe side
  float horiz = smoothstep(0.22, 0.72, vUv.x);
  float vert = smoothstep(0.0, 0.35, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));

  float alpha = smoothstep(0.32, 0.85, n) * horiz * vert * uOpacity;
  if (alpha < 0.005) discard;

  float shade = mix(0.28, 0.72, vUv.x);
  gl_FragColor = vec4(vec3(shade, shade, shade * 0.96), alpha);
}
`;

export default function Atmosphere({
  motionEnabled,
  fogDensity,
  qualityTier,
}: AtmosphereProps) {
  const skyMatRef = useRef<THREE.ShaderMaterial>(null);
  const hazeMidRef = useRef<THREE.ShaderMaterial>(null);
  const hazeFarRef = useRef<THREE.ShaderMaterial>(null);
  const dustPointsRef = useRef<THREE.Points>(null);

  const skyMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uFogDensity: { value: fogDensity },
        },
        vertexShader: SKY_VERTEX,
        fragmentShader: SKY_FRAGMENT,
        depthWrite: false,
        fog: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const hazeMidMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.22 },
          uSpeed: { value: 0.018 },
          uSeed: { value: 1.7 },
        },
        vertexShader: HAZE_VERTEX,
        fragmentShader: HAZE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        fog: false,
      }),
    [],
  );

  const hazeFarMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.26 },
          uSpeed: { value: -0.011 },
          uSeed: { value: 8.3 },
        },
        vertexShader: HAZE_VERTEX,
        fragmentShader: HAZE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        fog: false,
      }),
    [],
  );

  // Depth-layered atmospheric dust motes & sparse distant specks
  const dustCount = qualityTier === 'low' ? 65 : qualityTier === 'medium' ? 110 : 165;

  const { dustGeometry, dustMeta } = useMemo(() => {
    const rand = createSeededRandom(909101);
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);
    const speeds = new Float32Array(dustCount * 2);

    for (let i = 0; i < dustCount; i++) {
      // Keep most floating dust particles in center-right airspace between towers,
      // with only sparse dim specks on the far-left negative space.
      const isRightCity = rand() < 0.82;
      const x = isRightCity ? -2.0 + rand() * 26.0 : -18.0 + rand() * 16.0;
      const y = -4.0 + rand() * 28.0;
      const z = isRightCity ? -16.0 + rand() * 28.0 : -25.0 - rand() * 35.0;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const isGreenMote = isRightCity && rand() < 0.14;
      if (isGreenMote) {
        colors[i * 3] = 0.66;
        colors[i * 3 + 1] = 0.95;
        colors[i * 3 + 2] = 0.23;
      } else {
        const lum = isRightCity ? 0.55 + rand() * 0.35 : 0.22 + rand() * 0.25;
        colors[i * 3] = lum;
        colors[i * 3 + 1] = lum;
        colors[i * 3 + 2] = lum * 0.95;
      }

      speeds[i * 2] = (rand() - 0.3) * 0.28; // slow horizontal drift
      speeds[i * 2 + 1] = 0.08 + rand() * 0.22; // gentle upward float
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { dustGeometry: geo, dustMeta: speeds };
  }, [dustCount]);

  const dustMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.16,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    if (skyMatRef.current) {
      skyMatRef.current.uniforms.uFogDensity.value = fogDensity;
    }
    const hazeScale = THREE.MathUtils.clamp(fogDensity / 0.0145, 0.15, 2.4);
    if (hazeMidRef.current) {
      hazeMidRef.current.uniforms.uOpacity.value = 0.18 * hazeScale;
    }
    if (hazeFarRef.current) {
      hazeFarRef.current.uniforms.uOpacity.value = 0.24 * hazeScale;
    }
  }, [fogDensity]);

  useEffect(() => {
    return () => {
      skyMaterial.dispose();
      hazeMidMaterial.dispose();
      hazeFarMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
    };
  }, [skyMaterial, hazeMidMaterial, hazeFarMaterial, dustGeometry, dustMaterial]);

  useFrame((_, delta) => {
    if (!motionEnabled) return;
    const dt = Math.min(delta, 0.05);

    if (skyMatRef.current) skyMatRef.current.uniforms.uTime.value += dt;
    if (hazeMidRef.current) hazeMidRef.current.uniforms.uTime.value += dt;
    if (hazeFarRef.current) hazeFarRef.current.uniforms.uTime.value += dt;

    if (dustPointsRef.current) {
      const posAttr = dustPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        const idx = i * 3;
        arr[idx] += dustMeta[i * 2] * dt;
        arr[idx + 1] += dustMeta[i * 2 + 1] * dt;
        if (arr[idx + 1] > 24.5) arr[idx + 1] = -4.0;
        if (arr[idx] > 25.0) arr[idx] = -2.0;
        if (arr[idx] < -19.0) arr[idx] = 22.0;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group name="atmosphere-layer">
      {/* Far atmospheric sky backdrop */}
      <mesh position={[14, 24, -125]} renderOrder={-10}>
        <planeGeometry args={[280, 175]} />
        <primitive object={skyMaterial} ref={skyMatRef} attach="material" />
      </mesh>

      {/* Distant atmospheric haze separating planet from silhouettes */}
      <mesh position={[10, 12, -58]} renderOrder={3}>
        <planeGeometry args={[125, 65]} />
        <primitive object={hazeFarMaterial} ref={hazeFarRef} attach="material" />
      </mesh>

      {/* Midground drifting mist layer separating distant towers from foreground */}
      <mesh position={[10, 8, -16]} renderOrder={5}>
        <planeGeometry args={[76, 42]} />
        <primitive object={hazeMidMaterial} ref={hazeMidRef} attach="material" />
      </mesh>

      {/* Floating depth-layered dust motes & distant sky flecks */}
      <points ref={dustPointsRef} geometry={dustGeometry} material={dustMaterial} frustumCulled={false} />
    </group>
  );
}
