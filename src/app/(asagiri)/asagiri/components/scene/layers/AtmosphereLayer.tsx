'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { computeLayerParallaxOffset, dampValue } from '../../../lib/scenic-math';
import { createSeededRandom } from '../../../lib/webgl-utils';
import type { DayNightPalette } from '../../../lib/day-night-cycle';
import {
  createInitialPetalPopulation,
  stepSimulatedPetal,
  type BlossomEmitter,
  type SimulatedPetal,
} from '../../../lib/petal-sim';
import {
  advanceWaterRipples,
  tryTriggerWaterRipple,
  type WaterRipplePool,
} from '../../../lib/water-ripples';

export interface AtmosphereLayerProps {
  enableMotion: boolean;
  enableParallax: boolean;
  wireframe: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
  blossomEmittersRef: React.RefObject<BlossomEmitter[]>;
  waterRipplePoolRef: React.RefObject<WaterRipplePool>;
}

const MIST_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const MIST_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uSeed;
  uniform float uOpacity;
  uniform vec3 uColor;
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

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.05 + vec2(9.2, 4.1);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Drift right-to-left (+uTime * uSpeed shifts texture coordinates rightward -> mist flows leftward with prevailing wind)
    vec2 uv = vec2(vUv.x * 3.4 + uTime * uSpeed + uSeed, vUv.y * 2.2 + uSeed * 0.37);
    float n1 = fbm(uv);
    float n2 = fbm(uv * 1.65 + vec2(uTime * uSpeed * 0.35, 2.3));
    float mist = mix(n1, n2, 0.45);

    float verticalMask = smoothstep(0.0, 0.38, vUv.y) * (1.0 - smoothstep(0.54, 1.0, vUv.y));
    float horizontalMask = smoothstep(0.0, 0.14, vUv.x) * (1.0 - smoothstep(0.86, 1.0, vUv.x));

    float alpha = smoothstep(0.34, 0.8, mist) * verticalMask * horizontalMask * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

interface MistRibbonSpec {
  id: string;
  position: [number, number, number];
  size: [number, number];
  speed: number;
  seed: number;
  opacity: number;
  color: string;
  depthFactor: number;
  renderOrder: number;
}

const MIST_RIBBONS: MistRibbonSpec[] = [
  {
    id: 'mist-far-valley',
    position: [0, -0.58, -19.6],
    size: [68, 6.8],
    speed: 0.011,
    seed: 1.7,
    opacity: 0.52,
    color: '#EFE3D7',
    depthFactor: 0.09,
    renderOrder: -7,
  },
  {
    id: 'mist-mid-valley',
    position: [0, -1.08, -14.9],
    size: [58, 5.6],
    speed: 0.016,
    seed: 5.3,
    opacity: 0.46,
    color: '#E0DAD3',
    depthFactor: 0.15,
    renderOrder: -5,
  },
  {
    id: 'mist-treeline-base',
    position: [0, -1.55, -10.4],
    size: [48, 4.1],
    speed: 0.022,
    seed: 9.1,
    opacity: 0.38,
    color: '#D5D8DC',
    depthFactor: 0.21,
    renderOrder: -3,
  },
  {
    id: 'mist-lake-surface',
    position: [-0.8, -1.9, -6.9],
    size: [40, 2.4],
    speed: 0.026,
    seed: 14.4,
    opacity: 0.22,
    color: '#E4DFDA',
    depthFactor: 0.12,
    renderOrder: 2,
  },
];

/**
 * Delicate curved Japanese sakura petal geometry with characteristic apical notch.
 */
function buildCurvedPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.068);
  shape.bezierCurveTo(0.062, -0.028, 0.072, 0.052, 0.018, 0.088);
  shape.lineTo(0, 0.066);
  shape.lineTo(-0.018, 0.088);
  shape.bezierCurveTo(-0.072, 0.052, -0.062, -0.028, 0, -0.068);

  const geo = new THREE.ShapeGeometry(shape, 5);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    pos.setZ(i, (x * x + y * y) * 1.45);
  }
  geo.computeVertexNormals();
  return geo;
}

const PETAL_COUNT = 42;
const _dummy = new THREE.Object3D();

export function AtmosphereLayer({
  enableMotion,
  enableParallax,
  wireframe,
  pointerRef,
  cyclePaletteRef,
  blossomEmittersRef,
  waterRipplePoolRef,
}: AtmosphereLayerProps) {
  const mistGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const mistMatRefs = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const petalsMeshRef = useRef<THREE.InstancedMesh>(null);
  const petalsMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const simTimeRef = useRef(0);
  const respawnCounterRef = useRef(1);

  const mistUniforms = useMemo(
    () =>
      MIST_RIBBONS.map((m) => ({
        uTime: { value: 0 },
        uSpeed: { value: m.speed },
        uSeed: { value: m.seed },
        uOpacity: { value: m.opacity },
        uColor: { value: new THREE.Color(m.color) },
      })),
    []
  );

  const petalGeo = useMemo(() => buildCurvedPetalGeometry(), []);

  // Deterministic initial emitter fallback matching the right-side sakura canopy
  const initialEmitters = useMemo<BlossomEmitter[]>(
    () => [
      { x: 5.5, y: 3.15, z: -1.45 },
      { x: 4.35, y: 2.85, z: -1.35 },
      { x: 3.25, y: 2.48, z: -1.3 },
      { x: 4.85, y: 2.25, z: -1.4 },
      { x: 3.75, y: 1.95, z: -1.32 },
      { x: 5.85, y: 2.45, z: -1.5 },
    ],
    []
  );

  const petalInit = useMemo(() => {
    const rng = createSeededRandom(31415);
    const palette = [
      new THREE.Color('#FAEAEF'),
      new THREE.Color('#F3D3DB'),
      new THREE.Color('#ECC1CC'),
      new THREE.Color('#FDF5F6'),
    ];
    const particles = createInitialPetalPopulation(PETAL_COUNT, initialEmitters);
    const colors = Array.from({ length: PETAL_COUNT }, () =>
      palette[Math.floor(rng() * palette.length)].clone()
    );
    return { particles, colors };
  }, [initialEmitters]);

  const petalsRef = useRef<SimulatedPetal[]>([]);

  useEffect(() => {
    petalsRef.current = petalInit.particles.map((p) => ({ ...p }));
    const mesh = petalsMeshRef.current;
    if (!mesh) return;
    petalsRef.current.forEach((p, i) => {
      _dummy.position.set(p.x, p.y, p.z);
      _dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      _dummy.scale.setScalar(p.scale);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
      mesh.setColorAt(i, petalInit.colors[i]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [petalInit]);

  useEffect(() => {
    mistMatRefs.current.forEach((mat) => {
      if (mat) mat.wireframe = wireframe;
    });
  }, [wireframe]);

  useEffect(() => {
    return () => {
      petalGeo.dispose();
    };
  }, [petalGeo]);

  useFrame((_, delta) => {
    const safeDt = Math.min(delta, 0.1);
    if (enableMotion) {
      simTimeRef.current += safeDt;
    }

    const pointer = pointerRef.current ?? { x: 0, y: 0 };
    const palette = cyclePaletteRef.current;

    // 1. Update drifting valley & lake mist ribbons coherently with prevailing wind
    MIST_RIBBONS.forEach((spec, idx) => {
      const mat = mistMatRefs.current[idx];
      if (mat) {
        mat.uniforms.uTime.value = simTimeRef.current;
        if (palette) {
          mat.uniforms.uColor.value.setRGB(palette.mistTint.r, palette.mistTint.g, palette.mistTint.b);
          mat.uniforms.uOpacity.value = spec.opacity * palette.mistOpacityScale;
        }
      }
      const grp = mistGroupRefs.current[idx];
      if (grp) {
        const off = computeLayerParallaxOffset(pointer.x, pointer.y, spec.depthFactor, enableParallax);
        grp.position.x = dampValue(grp.position.x, spec.position[0] + off.x, 3.8, delta);
        grp.position.y = dampValue(grp.position.y, spec.position[1] + off.y, 3.8, delta);
      }
    });

    // 2. Sync petal backlit translucency with day-night cycle
    if (petalsMatRef.current && palette) {
      petalsMatRef.current.emissive.setRGB(
        palette.blossomEmissive.r,
        palette.blossomEmissive.g,
        palette.blossomEmissive.b
      );
      petalsMatRef.current.emissiveIntensity = palette.blossomEmissiveIntensity * 1.1;
    }

    // 3. Advance pooled water ripple ages smoothly
    const ripplePool = waterRipplePoolRef.current;
    if (ripplePool && enableMotion) {
      advanceWaterRipples(ripplePool, safeDt);
    }

    // 4. Advance falling, floating & grounded sakura petals using live blossom cluster emitters
    const mesh = petalsMeshRef.current;
    if (mesh && enableMotion) {
      const liveEmitters =
        blossomEmittersRef.current && blossomEmittersRef.current.length > 0
          ? blossomEmittersRef.current
          : initialEmitters;

      const list = petalsRef.current;
      for (let i = 0; i < list.length; i++) {
        const res = stepSimulatedPetal(
          list[i],
          safeDt,
          simTimeRef.current,
          liveEmitters,
          respawnCounterRef.current++ * 13.7 + i
        );
        const next = res.petal;
        list[i] = next;

        // Sparsely trigger a delicate expanding ripple ring when a petal lands on open water
        if (res.rippleTriggered && ripplePool) {
          tryTriggerWaterRipple(
            ripplePool,
            res.rippleTriggered.x,
            res.rippleTriggered.z,
            simTimeRef.current,
            0.72 + (next.scale - 0.62) * 0.35
          );
        }

        // Smoothly taper scale near end of floating/grounded life so recycling is invisible
        let visualScale = next.scale;
        if (next.state === 'floating' || next.state === 'grounded') {
          const lifeLimit = next.state === 'floating' ? next.maxSurfaceLife : Math.min(2.8, next.maxSurfaceLife * 0.45);
          const fadeT = THREE.MathUtils.clamp((next.surfaceAge - (lifeLimit - 1.25)) / 1.25, 0, 1);
          visualScale = next.scale * (1 - fadeT * 0.88);
        }

        _dummy.position.set(next.x, next.y, next.z);
        _dummy.rotation.set(next.rotX, next.rotY, next.rotZ);
        _dummy.scale.setScalar(visualScale);
        _dummy.updateMatrix();
        mesh.setMatrixAt(i, _dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group name="atmosphere-layer">
      {/* Subtle drifting mist ribbons around mountain bases, distant treeline & lake surface */}
      {MIST_RIBBONS.map((spec, idx) => (
        <group
          key={spec.id}
          name={spec.id}
          position={spec.position}
          ref={(el) => {
            mistGroupRefs.current[idx] = el;
          }}
        >
          <mesh renderOrder={spec.renderOrder}>
            <planeGeometry args={[spec.size[0], spec.size[1], 16, 4]} />
            <shaderMaterial
              ref={(el) => {
                mistMatRefs.current[idx] = el;
              }}
              uniforms={mistUniforms[idx]}
              vertexShader={MIST_VERTEX_SHADER}
              fragmentShader={MIST_FRAGMENT_SHADER}
              transparent
              depthWrite={false}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      ))}

      {/* Falling & water-floating curved sakura petals originating from live blossom clusters */}
      <instancedMesh
        ref={petalsMeshRef}
        name="drifting-sakura-petals"
        args={[petalGeo, undefined, PETAL_COUNT]}
        frustumCulled={false}
        renderOrder={5}
      >
        <meshStandardMaterial
          ref={petalsMatRef}
          color="#ffffff"
          emissive="#EED0D8"
          emissiveIntensity={0.48}
          roughness={0.62}
          metalness={0.0}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          fog={false}
          wireframe={wireframe}
        />
      </instancedMesh>
    </group>
  );
}
