'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  computeLayerParallaxOffset,
  dampValue,
  evaluateRidgeHeight,
  generateRidgeProfile,
  type RidgeProfileConfig,
} from '../../../lib/scenic-math';
import { createSeededRandom } from '../../../lib/webgl-utils';
import type { DayNightPalette } from '../../../lib/day-night-cycle';
import { PAGODA_ANCHOR } from '../../../lib/terrain';

export interface MountainRangesLayerProps {
  enableParallax: boolean;
  wireframe: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
}

interface MountainLayerSpec {
  id: string;
  z: number;
  depthFactor: number;
  ridge: RidgeProfileConfig;
  topColor: string;
  bottomColor: string;
  rimColor: string;
  rimStrength: number;
  snowCapStrength?: number;
  mistHeight: number;
  atmosphereFade: number;
}

export const PINE_HEADLAND_PARALLAX = 0.24;

export const PINE_HEADLAND_RIDGE: RidgeProfileConfig = {
  width: 44,
  segments: 88,
  baseY: -2.38,
  bottomY: -7.2,
  peaks: [
    { center: 0.34, height: 2.08, spread: 0.19 },
    { center: 0.76, height: 2.82, spread: 0.24 },
    { center: -0.78, height: 1.12, spread: 0.17 },
  ],
  undulationAmp: 0.085,
  undulationFreq: 3.6,
  phase: 0.9,
  leftCalmDip: 0.85,
};

const MOUNTAIN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying float vHeightNorm;
  varying vec3 vWorldPos;
  attribute float aHeightNorm;

  void main() {
    vUv = uv;
    vHeightNorm = aHeightNorm;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const MOUNTAIN_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform vec3 uRimColor;
  uniform float uRimStrength;
  uniform float uSnowCapStrength;
  uniform float uMistHeight;
  uniform float uAtmosphereFade;
  uniform vec2 uSunPos;
  uniform vec3 uAmbientTint;
  uniform float uLightScale;
  uniform vec3 uCycleRimColor;
  uniform vec3 uFogColor;

  varying vec2 vUv;
  varying float vHeightNorm;
  varying vec3 vWorldPos;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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
    // Bokashi vertical wash: denser ink near the ridge crest, fading into valley mist below
    float verticalGrad = smoothstep(0.0, uMistHeight, vHeightNorm);
    vec3 col = mix(uBottomColor, uTopColor, verticalGrad);

    // Subtle organic woodblock / ink-wash rock contour shading
    float contourNoise = noise(vec2(vUv.x * 16.0, vHeightNorm * 5.0));
    col += (contourNoise - 0.5) * 0.022 * verticalGrad;

    // Gentle snow-mist dusting on the distant sacred peak summit
    if (uSnowCapStrength > 0.01) {
      float snowNoise = noise(vec2(vUv.x * 26.0, vHeightNorm * 8.0)) * 0.075;
      float snowMask = smoothstep(0.76, 0.96, vHeightNorm + snowNoise) * uSnowCapStrength;
      float peakZone = smoothstep(0.45, 0.58, vUv.x) * (1.0 - smoothstep(0.72, 0.84, vUv.x));
      col = mix(col, vec3(0.92, 0.91, 0.90), snowMask * peakZone * 0.7);
    }

    // Apply day-night ambient color and intensity modulation
    col *= uAmbientTint * uLightScale;

    // Atmospheric perspective: distant ranges soften gracefully into horizon haze
    float baseHaze = (1.0 - smoothstep(0.28, 0.92, vHeightNorm)) * 0.42;
    col = mix(col, uFogColor, clamp(uAtmosphereFade + baseHaze * uAtmosphereFade * 1.4, 0.0, 0.62));

    // Soft celestial rim light catching the upper ridge edge facing the sun or moon
    float sunProximity = exp(-length((vWorldPos.xy - uSunPos) * vec2(0.075, 0.09)));
    float crestRim = smoothstep(0.88, 1.0, vHeightNorm) * uRimStrength * (0.45 + sunProximity * 0.85);
    vec3 activeRim = mix(uRimColor, uCycleRimColor, 0.65);
    col = mix(col, activeRim, clamp(crestRim, 0.0, 0.52));

    gl_FragColor = vec4(col, 1.0);
  }
`;

function buildMountainRidgeGeometry(config: RidgeProfileConfig): THREE.BufferGeometry {
  const profile = generateRidgeProfile(config);
  const cols = profile.length;
  const rows = 5;

  const positions = new Float32Array(cols * rows * 3);
  const uvs = new Float32Array(cols * rows * 2);
  const heightNorms = new Float32Array(cols * rows);
  const indices: number[] = [];

  for (let i = 0; i < cols; i++) {
    const pt = profile[i];
    for (let r = 0; r < rows; r++) {
      const t = r / (rows - 1);
      const idx = i * rows + r;
      const y = THREE.MathUtils.lerp(config.bottomY, pt.y, t);
      const zBulge = (1 - t) * 0.32;

      positions[idx * 3] = pt.x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = zBulge;

      uvs[idx * 2] = pt.u;
      uvs[idx * 2 + 1] = t;

      heightNorms[idx] = t;
    }
  }

  for (let i = 0; i < cols - 1; i++) {
    for (let r = 0; r < rows - 1; r++) {
      const a = i * rows + r;
      const b = (i + 1) * rows + r;
      const c = (i + 1) * rows + (r + 1);
      const d = i * rows + (r + 1);
      indices.push(a, b, c, a, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute('aHeightNorm', new THREE.BufferAttribute(heightNorms, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

const MOUNTAIN_LAYERS: MountainLayerSpec[] = [
  {
    // Layer 1: Distant sacred Fuji-inspired volcanic cone — softest contrast, minimal parallax
    id: 'sacred-peak',
    z: -22.2,
    depthFactor: 0.06,
    ridge: {
      width: 72,
      segments: 96,
      baseY: -2.15,
      bottomY: -8.5,
      peaks: [
        { center: 0.18, height: 6.1, spread: 0.15, craterFlatness: 0.62 },
        { center: -0.58, height: 2.0, spread: 0.26 },
        { center: 0.66, height: 2.65, spread: 0.22 },
      ],
      undulationAmp: 0.08,
      undulationFreq: 2.0,
      phase: 0.3,
      leftCalmDip: 0.55,
    },
    topColor: '#76889B',
    bottomColor: '#DDD5CC',
    rimColor: '#F3DFC8',
    rimStrength: 0.4,
    snowCapStrength: 0.84,
    mistHeight: 0.9,
    atmosphereFade: 0.34,
  },
  {
    // Layer 2: Distant atmospheric mountain range
    id: 'far-ridge',
    z: -17.4,
    depthFactor: 0.12,
    ridge: {
      width: 62,
      segments: 88,
      baseY: -2.2,
      bottomY: -8.0,
      peaks: [
        { center: 0.44, height: 4.05, spread: 0.21 },
        { center: -0.02, height: 1.45, spread: 0.19 },
        { center: -0.62, height: 2.3, spread: 0.24 },
      ],
      undulationAmp: 0.16,
      undulationFreq: 2.6,
      phase: 1.4,
      leftCalmDip: 0.72,
    },
    topColor: '#566A80',
    bottomColor: '#C8CACB',
    rimColor: '#EBD5BE',
    rimStrength: 0.32,
    mistHeight: 0.84,
    atmosphereFade: 0.24,
  },
  {
    // Layer 3: Mid-far indigo ridge framing the lake valley
    id: 'mid-far-ridge',
    z: -12.9,
    depthFactor: 0.18,
    ridge: {
      width: 52,
      segments: 84,
      baseY: -2.24,
      bottomY: -7.5,
      peaks: [
        { center: 0.36, height: 3.05, spread: 0.22 },
        { center: 0.72, height: 3.35, spread: 0.22 },
        { center: -0.64, height: 1.72, spread: 0.2 },
      ],
      undulationAmp: 0.14,
      undulationFreq: 3.1,
      phase: 2.8,
      leftCalmDip: 0.82,
    },
    topColor: '#3B4E62',
    bottomColor: '#9AA6B2',
    rimColor: '#DFC7B0',
    rimStrength: 0.25,
    mistHeight: 0.8,
    atmosphereFade: 0.14,
  },
  {
    // Layer 4: Mid-near forested pine headland supporting the grounded hillside pagoda
    id: 'pine-headland',
    z: -8.85,
    depthFactor: PINE_HEADLAND_PARALLAX,
    ridge: PINE_HEADLAND_RIDGE,
    topColor: '#223242',
    bottomColor: '#546677',
    rimColor: '#C8BBAE',
    rimStrength: 0.16,
    mistHeight: 0.78,
    atmosphereFade: 0.05,
  },
];

/**
 * Refined multi-tiered Japanese cedar (sugi) silhouette geometry with organic crown asymmetry.
 */
function buildCedarTreeGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.0);
  shape.lineTo(0.11, 0.74);
  shape.lineTo(0.06, 0.77);
  shape.lineTo(0.19, 0.52);
  shape.lineTo(0.11, 0.56);
  shape.lineTo(0.25, 0.3);
  shape.lineTo(0.14, 0.34);
  shape.lineTo(0.29, 0.12);
  shape.lineTo(0.06, 0.15);
  shape.lineTo(0.045, 0);
  shape.lineTo(-0.045, 0);
  shape.lineTo(-0.06, 0.15);
  shape.lineTo(-0.27, 0.13);
  shape.lineTo(-0.13, 0.35);
  shape.lineTo(-0.24, 0.31);
  shape.lineTo(-0.1, 0.57);
  shape.lineTo(-0.18, 0.53);
  shape.lineTo(-0.06, 0.77);
  shape.lineTo(-0.12, 0.75);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.07,
    bevelEnabled: false,
    curveSegments: 2,
  });
  geo.translate(0, 0, -0.035);
  return geo;
}

export function MountainRangesLayer({
  enableParallax,
  wireframe,
  pointerRef,
  cyclePaletteRef,
}: MountainRangesLayerProps) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const materialRefs = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const treelineRef = useRef<THREE.InstancedMesh>(null);
  const treelineMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const layerMeshes = useMemo(() => {
    return MOUNTAIN_LAYERS.map((layer) => ({
      spec: layer,
      geometry: buildMountainRidgeGeometry(layer.ridge),
      uniforms: {
        uTopColor: { value: new THREE.Color(layer.topColor) },
        uBottomColor: { value: new THREE.Color(layer.bottomColor) },
        uRimColor: { value: new THREE.Color(layer.rimColor) },
        uRimStrength: { value: layer.rimStrength },
        uSnowCapStrength: { value: layer.snowCapStrength ?? 0 },
        uMistHeight: { value: layer.mistHeight },
        uAtmosphereFade: { value: layer.atmosphereFade },
        uSunPos: { value: new THREE.Vector2(6.5, 3.2) },
        uAmbientTint: { value: new THREE.Color('#FFFFFF') },
        uLightScale: { value: 1.0 },
        uCycleRimColor: { value: new THREE.Color('#F3DFC8') },
        uFogColor: { value: new THREE.Color('#BFC6CE') },
      },
    }));
  }, []);

  const cedarGeo = useMemo(() => buildCedarTreeGeometry(), []);

  // Natural clustered cedar groves anchored cleanly to the wooded hillside slopes,
  // preserving an architectural clearing around the pagoda so zero trees clip through its roofs
  const treelineTransforms = useMemo(() => {
    const pineRidge = PINE_HEADLAND_RIDGE;
    const rng = createSeededRandom(7391);
    const items: Array<{ x: number; y: number; z: number; sx: number; sy: number; tilt: number; tint: THREE.Color }> = [];
    const darkPine = new THREE.Color('#1B2A38');
    const midPine = new THREE.Color('#253748');
    const mistPine = new THREE.Color('#2E4052');

    // Grove clusters across right wooded headland + sparse distant left pine point
    const groves = [
      { uMin: 0.52, uMax: 0.59, count: 16, heightBoost: 0.9 },
      { uMin: 0.64, uMax: 0.94, count: 44, heightBoost: 1.15 },
      { uMin: 0.06, uMax: 0.19, count: 12, heightBoost: 0.72 },
    ];

    groves.forEach((grove) => {
      for (let i = 0; i < grove.count; i++) {
        const u = grove.uMin + (i / Math.max(1, grove.count - 1)) * (grove.uMax - grove.uMin) + (rng() - 0.5) * 0.012;
        const clampedU = Math.max(0.02, Math.min(0.98, u));
        const x = (clampedU - 0.5) * pineRidge.width;

        // Keep an unobstructed architectural clearing right around the hillside pagoda
        if (Math.abs(x - PAGODA_ANCHOR.x) < 0.88) continue;

        const ridgeY = evaluateRidgeHeight(clampedU, pineRidge);
        // Natural height clustering (taller trees near grove centers, smaller saplings on edges)
        const clusterProfile = Math.sin(((i + 0.5) / grove.count) * Math.PI);
        const scaleY = (0.3 + rng() * 0.44) * grove.heightBoost * (0.78 + clusterProfile * 0.35);
        const scaleX = scaleY * (0.68 + rng() * 0.3);
        const zJitter = -0.06 + rng() * 0.24;
        const slopeEmbed = 0.14 + rng() * 0.12;
        const tint = darkPine.clone().lerp(rng() > 0.45 ? midPine : mistPine, rng() * 0.7);

        items.push({
          x,
          y: ridgeY - slopeEmbed,
          z: zJitter,
          sx: scaleX,
          sy: scaleY,
          tilt: (rng() - 0.5) * 0.06,
          tint,
        });
      }
    });

    return items;
  }, []);

  useEffect(() => {
    const mesh = treelineRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    treelineTransforms.forEach((item, i) => {
      dummy.position.set(item.x, item.y, item.z);
      dummy.scale.set(item.sx, item.sy, 1);
      dummy.rotation.set(0, 0, item.tilt);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, item.tint);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [treelineTransforms]);

  useEffect(() => {
    materialRefs.current.forEach((mat) => {
      if (mat) mat.wireframe = wireframe;
    });
    if (treelineMatRef.current) {
      treelineMatRef.current.wireframe = wireframe;
    }
  }, [wireframe]);

  useEffect(() => {
    return () => {
      layerMeshes.forEach((l) => l.geometry.dispose());
      cedarGeo.dispose();
    };
  }, [layerMeshes, cedarGeo]);

  useFrame((_, delta) => {
    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const palette = cyclePaletteRef.current;

    MOUNTAIN_LAYERS.forEach((layer, index) => {
      const grp = groupRefs.current[index];
      if (grp) {
        const target = computeLayerParallaxOffset(pointer.x, pointer.y, layer.depthFactor, enableParallax);
        grp.position.x = dampValue(grp.position.x, target.x, 4.0, delta);
        grp.position.y = dampValue(grp.position.y, target.y, 4.0, delta);
      }
      const mat = materialRefs.current[index];
      if (mat && palette) {
        mat.uniforms.uAmbientTint.value.setRGB(
          palette.mountainTint.r,
          palette.mountainTint.g,
          palette.mountainTint.b
        );
        mat.uniforms.uLightScale.value = palette.mountainLightScale;
        mat.uniforms.uCycleRimColor.value.setRGB(
          palette.celestialHalo.r,
          palette.celestialHalo.g,
          palette.celestialHalo.b
        );
        mat.uniforms.uFogColor.value.setRGB(palette.fogColor.r, palette.fogColor.g, palette.fogColor.b);
      }
    });
  });

  return (
    <group name="mountain-ranges-layer">
      {layerMeshes.map(({ spec, geometry, uniforms }, idx) => (
        <group
          key={spec.id}
          name={`mountain-${spec.id}`}
          position={[0, 0, spec.z]}
          ref={(el) => {
            groupRefs.current[idx] = el;
          }}
        >
          <mesh geometry={geometry} renderOrder={-8 + idx}>
            <shaderMaterial
              ref={(el) => {
                materialRefs.current[idx] = el;
              }}
              uniforms={uniforms}
              vertexShader={MOUNTAIN_VERTEX_SHADER}
              fragmentShader={MOUNTAIN_FRAGMENT_SHADER}
              wireframe={wireframe}
            />
          </mesh>

          {spec.id === 'pine-headland' && (
            <instancedMesh
              ref={treelineRef}
              args={[cedarGeo, undefined, treelineTransforms.length]}
              frustumCulled={false}
            >
              <meshStandardMaterial
                ref={treelineMatRef}
                color="#ffffff"
                roughness={0.95}
                metalness={0.0}
                fog={false}
                wireframe={wireframe}
              />
            </instancedMesh>
          )}
        </group>
      ))}
    </group>
  );
}
