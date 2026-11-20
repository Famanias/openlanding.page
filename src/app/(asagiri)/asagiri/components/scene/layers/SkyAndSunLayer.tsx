'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { DayNightPalette } from '../../../lib/day-night-cycle';

export interface SkyAndSunLayerProps {
  enableMotion: boolean;
  wireframe: boolean;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
}

const SKY_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uZenithColor;
  uniform vec3 uMidSkyColor;
  uniform vec3 uMistBandColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uWarmGlowColor;
  uniform float uWarmStrength;
  uniform float uStarOpacity;
  uniform vec2 uSunUv;
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
      p = p * 2.03 + vec2(13.1, 7.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float y = clamp(vUv.y, 0.0, 1.0);

    // Woodblock-inspired bokashi sky gradient driven by the 30-second day-night cycle
    vec3 col = mix(uHorizonColor, uMistBandColor, smoothstep(0.28, 0.52, y));
    col = mix(col, uMidSkyColor, smoothstep(0.48, 0.72, y));
    col = mix(col, uZenithColor, smoothstep(0.66, 0.96, y));

    // Asymmetric celestial atmospheric bloom on the right third, keeping left text-safe field calm
    vec2 aspectDelta = (vUv - uSunUv) * vec2(1.65, 1.0);
    float sunDist = length(aspectDelta);
    float warmGlow = exp(-sunDist * 3.1) * uWarmStrength;
    float wideBloom = exp(-sunDist * 1.45) * (uWarmStrength * 0.36);
    col = mix(col, uWarmGlowColor, clamp(wideBloom + warmGlow, 0.0, 0.58));

    // Subtle high-altitude cloud wisps
    vec2 cloudUv = vec2(vUv.x * 3.6 - uTime * 0.008, vUv.y * 7.5);
    float clouds = fbm(cloudUv);
    float cloudBand = smoothstep(0.46, 0.62, y) * (1.0 - smoothstep(0.72, 0.92, y));
    float cloudMask = smoothstep(0.54, 0.82, clouds) * cloudBand * 0.1;
    cloudMask *= mix(0.45, 1.0, smoothstep(0.22, 0.65, vUv.x));
    col = mix(col, mix(uHorizonColor, vec3(0.92, 0.90, 0.88), 0.35), cloudMask);

    // Sparse, delicate twinkling night stars appearing softly during twilight and moonlit night
    if (uStarOpacity > 0.01) {
      vec2 starGrid = floor(vUv * vec2(120.0, 68.0));
      vec2 starLocal = fract(vUv * vec2(120.0, 68.0)) - 0.5;
      float starSeed = hash(starGrid);
      float isStar = step(0.992, starSeed);
      float starDot = 1.0 - smoothstep(0.05, 0.24, length(starLocal));
      float twinkle = 0.65 + 0.35 * sin(uTime * 1.4 + starSeed * 62.0);
      float skyMask = smoothstep(0.54, 0.76, y);
      float starIntensity = isStar * starDot * twinkle * skyMask * uStarOpacity * 0.75;
      col += vec3(0.9, 0.94, 1.0) * starIntensity;
    }

    // Fine washi paper grain to eliminate banding
    float grain = (hash(gl_FragCoord.xy * 0.5) - 0.5) * 0.014;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const SUN_HALO_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SUN_HALO_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCoreColor;
  uniform vec3 uHaloColor;
  varying vec2 vUv;

  void main() {
    float dist = length(vUv - vec2(0.5)) * 2.0;
    float breathe = 1.0 + sin(uTime * 0.35) * 0.025;
    float r = dist / breathe;

    // Soft feathered celestial disc (transitions seamlessly between morning sun and full moon)
    float core = 1.0 - smoothstep(0.165, 0.215, r);
    float innerHalo = exp(-r * 3.4) * 0.55;
    float outerHalo = exp(-r * 1.8) * 0.22;

    vec3 col = mix(uHaloColor, uCoreColor, clamp(core + innerHalo * 0.5, 0.0, 1.0));
    float alpha = clamp(core * 0.95 + innerHalo + outerHalo, 0.0, 1.0);
    alpha *= 1.0 - smoothstep(0.75, 1.0, dist);

    gl_FragColor = vec4(col, alpha);
  }
`;

export function SkyAndSunLayer({ enableMotion, wireframe, cyclePaletteRef }: SkyAndSunLayerProps) {
  const skyMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const sunMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const celestialMeshRef = useRef<THREE.Mesh>(null);
  const simTimeRef = useRef(0);

  const skyUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uZenithColor: { value: new THREE.Color('#1E2B3C') },
      uMidSkyColor: { value: new THREE.Color('#3B5067') },
      uMistBandColor: { value: new THREE.Color('#8E9DAD') },
      uHorizonColor: { value: new THREE.Color('#E8DDD0') },
      uWarmGlowColor: { value: new THREE.Color('#F6D7BC') },
      uWarmStrength: { value: 0.46 },
      uStarOpacity: { value: 0.0 },
      uSunUv: { value: new THREE.Vector2(0.625, 0.605) },
    }),
    []
  );

  const sunUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCoreColor: { value: new THREE.Color('#FFF8EA') },
      uHaloColor: { value: new THREE.Color('#F5D6BA') },
    }),
    []
  );

  useEffect(() => {
    if (skyMaterialRef.current) {
      skyMaterialRef.current.wireframe = wireframe;
    }
    if (sunMaterialRef.current) {
      sunMaterialRef.current.wireframe = wireframe;
    }
  }, [wireframe]);

  useFrame((_, delta) => {
    if (enableMotion) {
      simTimeRef.current += Math.min(delta, 0.1);
    }

    const palette = cyclePaletteRef.current;

    if (skyMaterialRef.current) {
      const u = skyMaterialRef.current.uniforms;
      u.uTime.value = simTimeRef.current;
      if (palette) {
        u.uZenithColor.value.setRGB(palette.skyZenith.r, palette.skyZenith.g, palette.skyZenith.b);
        u.uMidSkyColor.value.setRGB(palette.skyMid.r, palette.skyMid.g, palette.skyMid.b);
        u.uMistBandColor.value.setRGB(palette.skyMistBand.r, palette.skyMistBand.g, palette.skyMistBand.b);
        u.uHorizonColor.value.setRGB(palette.skyHorizon.r, palette.skyHorizon.g, palette.skyHorizon.b);
        u.uWarmGlowColor.value.setRGB(palette.skyWarmGlow.r, palette.skyWarmGlow.g, palette.skyWarmGlow.b);
        u.uWarmStrength.value = palette.skyWarmStrength;
        u.uStarOpacity.value = palette.starOpacity;
        u.uSunUv.value.y = 0.56 + (palette.celestialY - 3.5) * 0.025;
      }
    }

    if (sunMaterialRef.current) {
      const u = sunMaterialRef.current.uniforms;
      u.uTime.value = simTimeRef.current;
      if (palette) {
        u.uCoreColor.value.setRGB(
          palette.celestialCore.r,
          palette.celestialCore.g,
          palette.celestialCore.b
        );
        u.uHaloColor.value.setRGB(
          palette.celestialHalo.r,
          palette.celestialHalo.g,
          palette.celestialHalo.b
        );
      }
    }

    if (celestialMeshRef.current && palette) {
      celestialMeshRef.current.position.y = palette.celestialY;
    }
  });

  return (
    <group name="sky-and-sun-layer">
      {/* Expansive sky backdrop plane */}
      <mesh position={[0, 0.8, -28]} renderOrder={-10}>
        <planeGeometry args={[92, 52, 24, 16]} />
        <shaderMaterial
          ref={skyMaterialRef}
          uniforms={skyUniforms}
          vertexShader={SKY_VERTEX_SHADER}
          fragmentShader={SKY_FRAGMENT_SHADER}
          depthWrite={false}
          wireframe={wireframe}
        />
      </mesh>

      {/* Soft celestial disc & atmospheric halo transitioning between dawn sun and silver moon */}
      <mesh ref={celestialMeshRef} position={[7.7, 4.45, -26.2]} renderOrder={-9}>
        <planeGeometry args={[18.5, 18.5, 12, 12]} />
        <shaderMaterial
          ref={sunMaterialRef}
          uniforms={sunUniforms}
          vertexShader={SUN_HALO_VERTEX_SHADER}
          fragmentShader={SUN_HALO_FRAGMENT_SHADER}
          transparent
          depthWrite={false}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}
