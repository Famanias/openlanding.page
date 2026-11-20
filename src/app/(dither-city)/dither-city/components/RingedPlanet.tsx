'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface RingedPlanetProps {
  motionEnabled: boolean;
  wireframe: boolean;
  fogDensity: number;
  offset?: [number, number, number];
  scale?: number;
}

const PLANET_VERTEX = /* glsl */ `
varying vec3 vNormalWorld;
varying vec3 vLocalPos;
varying vec3 vWorldPos;

void main() {
  vLocalPos = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vNormalWorld = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const PLANET_FRAGMENT = /* glsl */ `
precision highp float;

uniform vec3 uLightDir;
uniform float uTime;
uniform float uOpacity;
uniform float uBaseDark;
uniform float uAtmosphereFade;

varying vec3 vNormalWorld;
varying vec3 vLocalPos;
varying vec3 vWorldPos;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
    f.z
  );
}

void main() {
  vec3 N = normalize(vNormalWorld);
  vec3 L = normalize(uLightDir);
  vec3 V = normalize(cameraPosition - vWorldPos);

  // Rotate sample coordinates very slowly for subtle planetary drift
  float ang = uTime * 0.012;
  float ca = cos(ang);
  float sa = sin(ang);
  vec3 sp = normalize(vLocalPos);
  vec3 rotPos = vec3(sp.x * ca - sp.z * sa, sp.y, sp.x * sa + sp.z * ca);

  // Gas giant equatorial bands + fine stormy variation
  float bands = sin(rotPos.y * 14.0 + noise(rotPos * 4.0) * 1.4) * 0.5 + 0.5;
  float detail = noise(rotPos * 9.0) * 0.5 + noise(rotPos * 18.0) * 0.25;
  float albedo = mix(0.76, 1.0, bands * 0.65 + detail * 0.35);

  // Stark crescent illumination from upper-right
  float ndotl = dot(N, L);
  float terminator = smoothstep(-0.22, 0.72, ndotl);
  // Bright sunlit upper-right rim crescent
  float rim = pow(1.0 - max(dot(N, V), 0.0), 2.4) * smoothstep(-0.15, 0.5, ndotl);

  float shade = mix(uBaseDark, 0.92 * albedo, terminator);
  shade += rim * 0.36;

  // Atmospheric separation fading planet slightly into distant sky haze
  shade = mix(shade, 0.36, uAtmosphereFade);

  vec3 col = vec3(shade, shade, shade * 0.97);
  gl_FragColor = vec4(col, uOpacity);
}
`;

const RING_VERTEX = /* glsl */ `
varying vec3 vLocalPos;
varying vec3 vWorldPos;

void main() {
  vLocalPos = position;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const RING_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uInnerRadius;
uniform float uOuterRadius;
uniform float uTime;
uniform float uOpacity;
uniform vec3 uPlanetCenter;
uniform float uPlanetRadius;
uniform vec3 uLightDir;

varying vec3 vLocalPos;
varying vec3 vWorldPos;

void main() {
  float r = length(vLocalPos.xy);
  float t = clamp((r - uInnerRadius) / max(0.001, uOuterRadius - uInnerRadius), 0.0, 1.0);

  // Delicate multi-band concentric ring structure matching the reference illustration:
  // thin inner arc, subtle translucent mid ring, wide Cassini gap, razor-crisp outer rings
  float innerBand  = smoothstep(0.03, 0.05, t) * (1.0 - smoothstep(0.08, 0.11, t)) * 0.85;
  float midBand    = smoothstep(0.22, 0.26, t) * (1.0 - smoothstep(0.40, 0.44, t)) * 0.34;
  float outerBand1 = smoothstep(0.64, 0.67, t) * (1.0 - smoothstep(0.71, 0.74, t)) * 0.92;
  float outerBand2 = smoothstep(0.84, 0.87, t) * (1.0 - smoothstep(0.92, 0.95, t)) * 0.88;

  // Fine concentric ringlets
  float angle = atan(vLocalPos.y, vLocalPos.x) + uTime * 0.014;
  float ringlets = 0.82 + 0.18 * sin(t * 110.0) * (0.85 + 0.15 * sin(angle * 3.0));

  float density = (innerBand + midBand + outerBand1 + outerBand2) * ringlets;

  // Soft planet shadow across the back-left arc of the rings
  vec3 rel = vWorldPos - uPlanetCenter;
  vec3 L = normalize(uLightDir);
  float proj = dot(rel, L);
  float perpDist = length(rel - L * proj);
  float shadowMask = 1.0;
  if (proj < 0.0) {
    shadowMask = smoothstep(uPlanetRadius * 0.86, uPlanetRadius * 1.08, perpDist);
  }

  float brightness = mix(0.32, 0.95, shadowMask);
  float alpha = clamp(density * uOpacity * mix(0.45, 1.0, shadowMask), 0.0, 0.95);

  if (alpha < 0.02) discard;

  gl_FragColor = vec4(vec3(brightness, brightness, brightness * 0.96), alpha);
}
`;

export default function RingedPlanet({
  motionEnabled,
  wireframe,
  fogDensity,
  offset = [0, 0, 0],
  scale = 1,
}: RingedPlanetProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const planetMatRef = useRef<THREE.ShaderMaterial>(null);
  const ringMatRef = useRef<THREE.ShaderMaterial>(null);
  const moonMatRef = useRef<THREE.ShaderMaterial>(null);

  const planetCenter = useMemo(
    () => new THREE.Vector3(7.4 + offset[0], 30.8 + offset[1], -85.0 + offset[2]),
    [offset],
  );

  const lightDir = useMemo(() => new THREE.Vector3(0.86, 0.34, 0.36).normalize(), []);

  const primaryPlanetMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: lightDir },
          uTime: { value: 0 },
          uOpacity: { value: 1.0 },
          uBaseDark: { value: 0.14 },
          uAtmosphereFade: { value: 0.10 },
        },
        vertexShader: PLANET_VERTEX,
        fragmentShader: PLANET_FRAGMENT,
        depthWrite: true,
        fog: false,
      }),
    [lightDir],
  );

  const primaryRingMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uInnerRadius: { value: 14.8 },
          uOuterRadius: { value: 26.8 },
          uTime: { value: 0 },
          uOpacity: { value: 0.92 },
          uPlanetCenter: { value: planetCenter.clone() },
          uPlanetRadius: { value: 11.4 * scale },
          uLightDir: { value: lightDir },
        },
        vertexShader: RING_VERTEX,
        fragmentShader: RING_FRAGMENT,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lightDir],
  );

  const moonMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: lightDir },
          uTime: { value: 0 },
          uOpacity: { value: 0.98 },
          uBaseDark: { value: 0.14 },
          uAtmosphereFade: { value: 0.06 },
        },
        vertexShader: PLANET_VERTEX,
        fragmentShader: PLANET_FRAGMENT,
        fog: false,
      }),
    [lightDir],
  );

  const distantOrbMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: new THREE.Vector3(0.6, 0.5, 0.4).normalize() },
          uTime: { value: 0 },
          uOpacity: { value: 0.36 },
          uBaseDark: { value: 0.32 },
          uAtmosphereFade: { value: 0.56 },
        },
        vertexShader: PLANET_VERTEX,
        fragmentShader: PLANET_FRAGMENT,
        transparent: true,
        depthWrite: false,
        fog: false,
      }),
    [],
  );

  const distantRingMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uInnerRadius: { value: 10.6 },
          uOuterRadius: { value: 14.8 },
          uTime: { value: 0 },
          uOpacity: { value: 0.3 },
          uPlanetCenter: { value: new THREE.Vector3(48.0, 44.0, -96.0) },
          uPlanetRadius: { value: 8.6 },
          uLightDir: { value: lightDir },
        },
        vertexShader: RING_VERTEX,
        fragmentShader: RING_FRAGMENT,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      }),
    [lightDir],
  );

  const distantOrbMatRef = useRef<THREE.ShaderMaterial>(null);
  const distantRingMatRef = useRef<THREE.ShaderMaterial>(null);

  // Keep uniforms synced when props update
  useEffect(() => {
    const mats = [
      planetMatRef.current,
      ringMatRef.current,
      moonMatRef.current,
      distantOrbMatRef.current,
      distantRingMatRef.current,
    ];
    for (const m of mats) {
      if (m) m.wireframe = wireframe;
    }
  }, [wireframe]);

  useEffect(() => {
    const fade = THREE.MathUtils.clamp(fogDensity * 9.5, 0.04, 0.38);
    if (planetMatRef.current) {
      planetMatRef.current.uniforms.uAtmosphereFade.value = fade;
    }
    if (ringMatRef.current) {
      ringMatRef.current.uniforms.uPlanetCenter.value.copy(planetCenter);
      ringMatRef.current.uniforms.uPlanetRadius.value = 11.4 * scale;
    }
  }, [fogDensity, planetCenter, scale]);

  useEffect(() => {
    return () => {
      primaryPlanetMat.dispose();
      primaryRingMat.dispose();
      moonMat.dispose();
      distantOrbMat.dispose();
      distantRingMat.dispose();
    };
  }, [primaryPlanetMat, primaryRingMat, moonMat, distantOrbMat, distantRingMat]);

  useFrame((_, delta) => {
    if (!motionEnabled) return;
    const dt = Math.min(delta, 0.05);
    if (planetMatRef.current) {
      planetMatRef.current.uniforms.uTime.value += dt;
    }
    if (ringMatRef.current) {
      ringMatRef.current.uniforms.uTime.value += dt;
    }
    if (moonMatRef.current) {
      moonMatRef.current.uniforms.uTime.value += dt;
    }
    if (ringRef.current && planetMatRef.current) {
      ringRef.current.rotation.z =
        0.16 + Math.sin(planetMatRef.current.uniforms.uTime.value * 0.05) * 0.008;
    }
  });

  return (
    <group name="celestial-system">
      {/* Primary Massive Ringed Planet (upper-middle-left, behind midground skyline) */}
      <group
        position={[planetCenter.x, planetCenter.y, planetCenter.z]}
        scale={scale}
      >
        <mesh renderOrder={1}>
          <sphereGeometry args={[11.4, 48, 36]} />
          <primitive object={primaryPlanetMat} ref={planetMatRef} attach="material" />
        </mesh>

        {/* Elliptical Layered Ring System tilted gently upward-right */}
        <mesh
          ref={ringRef}
          rotation={[1.30, -0.09, 0.16]}
          renderOrder={2}
        >
          <ringGeometry args={[14.8, 26.8, 128, 4]} />
          <primitive object={primaryRingMat} ref={ringMatRef} attach="material" />
        </mesh>

        {/* Small Companion Crescent Moon visible cleanly above planet (~1 o'clock) */}
        <mesh position={[6.8, 14.4, 3.0]} renderOrder={2}>
          <sphereGeometry args={[1.45, 24, 18]} />
          <primitive object={moonMat} ref={moonMatRef} attach="material" />
        </mesh>
      </group>

      {/* Subtle Secondary Distant Ringed Orb peeking through upper-right haze */}
      <group position={[47.0 + offset[0] * 0.4, 44.5 + offset[1] * 0.4, -96.0]}>
        <mesh renderOrder={0}>
          <sphereGeometry args={[8.6, 32, 24]} />
          <primitive object={distantOrbMat} ref={distantOrbMatRef} attach="material" />
        </mesh>
        <mesh rotation={[0.55, -0.35, -0.4]} renderOrder={0}>
          <ringGeometry args={[10.6, 14.8, 72, 2]} />
          <primitive object={distantRingMat} ref={distantRingMatRef} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
