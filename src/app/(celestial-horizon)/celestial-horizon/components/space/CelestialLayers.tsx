'use client';
/* eslint-disable react-hooks/immutability */

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import {
  computeLayerParallaxOffset,
  dampValue,
  generateAsteroidFieldData,
  generateDustFieldData,
  generateStarFieldData,
} from '../../lib/spaceSceneMath';
import {
  createCompanionMoonTextures,
  createHeroPlanetTextures,
  createSculptedAsteroidGeometry,
} from '../../lib/proceduralSpaceTextures';
import {
  ATMOSPHERE_RIM_FRAGMENT,
  ATMOSPHERE_RIM_VERTEX,
  COSMIC_DUST_FRAGMENT,
  COSMIC_DUST_VERTEX,
  NEBULA_CLOUD_FRAGMENT,
  NEBULA_CLOUD_VERTEX,
  OUTER_CORONA_FRAGMENT,
  PLANETARY_RING_FRAGMENT,
  PLANETARY_RING_VERTEX,
  SKY_BACKDROP_FRAGMENT,
  SKY_BACKDROP_VERTEX,
  STARFIELD_FRAGMENT,
  STARFIELD_VERTEX,
} from './SpaceShaders';

export interface PointerRefState {
  x: number;
  y: number;
}

export interface SharedLayerProps {
  motionEnabled: boolean;
  parallaxEnabled: boolean;
  wireframe: boolean;
  pointerRef: React.MutableRefObject<PointerRefState>;
  timeRef: React.MutableRefObject<number>;
}

/** Shared key-star light direction illuminating a dramatic upper-left crescent limb */
export const SUN_LIGHT_DIRECTION = new THREE.Vector3(-0.88, 0.43, 0.2).normalize();

/** Hero planet world-space center (anchored right-third so left 52% text-safe zone is 100% clear) */
export const HERO_PLANET_CENTER = new THREE.Vector3(5.25, -0.68, -6.5);
export const HERO_PLANET_RADIUS = 3.22;

// Pre-allocated scratch helpers outside render loops (zero GC allocations)
const _dummyObj = new THREE.Object3D();
const _tempColor = new THREE.Color();

/**
 * Layer 0: Deep atmospheric gradient backdrop plane.
 */
export function DeepBackdropLayer({ timeRef }: { timeRef: React.MutableRefObject<number> }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },
        vertexShader: SKY_BACKDROP_VERTEX,
        fragmentShader: SKY_BACKDROP_FRAGMENT,
        depthWrite: false,
        depthTest: false,
      }),
    [],
  );

  useEffect(() => {
    return () => material.dispose();
  }, [material]);

  useFrame(() => {
    material.uniforms.uTime.value = timeRef.current;
  });

  return (
    <mesh position={[0.4, 0, -38]} renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[128, 76, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/**
 * Layer 1: Multi-depth distant starfield with blackbody tinting and subtle twinkle.
 */
export function StarfieldLayer({
  parallaxEnabled,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);

  const { geometry, material } = useMemo(() => {
    const data = generateStarFieldData(2200, 104729);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(data.sizes, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(data.phases, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: gl.getPixelRatio() },
      },
      vertexShader: STARFIELD_VERTEX,
      fragmentShader: STARFIELD_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    return { geometry: geo, material: mat };
  }, [gl]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    material.uniforms.uTime.value = timeRef.current;
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();

    if (groupRef.current) {
      const offset = computeLayerParallaxOffset(
        -0.32,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      groupRef.current.position.x = dampValue(groupRef.current.position.x, offset.x, 3.2, delta);
      groupRef.current.position.y = dampValue(groupRef.current.position.y, offset.y, 3.2, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

interface NebulaPlaneConfig {
  id: string;
  position: [number, number, number];
  size: [number, number];
  rotationZ: number;
  depthFactor: number;
  primary: string;
  secondary: string;
  opacity: number;
  seed: number;
}

const NEBULA_PLANES: NebulaPlaneConfig[] = [
  {
    id: 'deep-sapphire-veil',
    position: [5.4, 2.2, -24],
    size: [42, 26],
    rotationZ: -0.16,
    depthFactor: -0.22,
    primary: '#163566',
    secondary: '#2d6fa3',
    opacity: 0.64,
    seed: 1.4,
  },
  {
    id: 'celestial-teal-band',
    position: [2.6, -2.5, -19.5],
    size: [36, 20],
    rotationZ: 0.2,
    depthFactor: -0.08,
    primary: '#153b60',
    secondary: '#3782a6',
    opacity: 0.52,
    seed: 4.8,
  },
  {
    id: 'indigo-horizon-mist',
    position: [-4.2, -4.6, -16],
    size: [30, 17],
    rotationZ: -0.09,
    depthFactor: 0.08,
    primary: '#232757',
    secondary: '#374c8a',
    opacity: 0.36,
    seed: 7.2,
  },
  {
    id: 'twilight-amber-whisper',
    position: [2.4, 1.5, -13.5],
    size: [22, 15],
    rotationZ: 0.28,
    depthFactor: 0.2,
    primary: '#35456d',
    secondary: '#d48d59',
    opacity: 0.34,
    seed: 11.6,
  },
];

/**
 * Layer 2: Staggered 2.5D feathered nebula gas cloud planes for atmospheric depth.
 */
export function NebulaCloudLayers({
  parallaxEnabled,
  wireframe,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);

  const materials = useMemo(
    () =>
      NEBULA_PLANES.map(
        (cfg) =>
          new THREE.ShaderMaterial({
            uniforms: {
              uTime: { value: 0 },
              uColorPrimary: { value: new THREE.Color(cfg.primary) },
              uColorSecondary: { value: new THREE.Color(cfg.secondary) },
              uOpacity: { value: cfg.opacity },
              uSeed: { value: cfg.seed },
            },
            vertexShader: NEBULA_CLOUD_VERTEX,
            fragmentShader: NEBULA_CLOUD_FRAGMENT,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            wireframe: false,
          }),
      ),
    [],
  );

  useEffect(() => {
    materials.forEach((mat) => {
      mat.wireframe = wireframe;
    });
  }, [materials, wireframe]);

  useEffect(() => {
    return () => {
      materials.forEach((mat) => mat.dispose());
    };
  }, [materials]);

  useFrame((_, delta) => {
    for (let i = 0; i < NEBULA_PLANES.length; i++) {
      const cfg = NEBULA_PLANES[i];
      materials[i].uniforms.uTime.value = timeRef.current;

      const mesh = meshRefs.current[i];
      if (mesh) {
        const offset = computeLayerParallaxOffset(
          cfg.depthFactor,
          pointerRef.current.x,
          pointerRef.current.y,
          parallaxEnabled,
        );
        mesh.position.x = dampValue(mesh.position.x, cfg.position[0] + offset.x, 3.0, delta);
        mesh.position.y = dampValue(mesh.position.y, cfg.position[1] + offset.y, 3.0, delta);
      }
    }
  });

  return (
    <group>
      {NEBULA_PLANES.map((cfg, idx) => (
        <mesh
          key={cfg.id}
          ref={(el) => {
            meshRefs.current[idx] = el;
          }}
          position={cfg.position}
          rotation={[0, 0, cfg.rotationZ]}
          renderOrder={-5 + idx}
        >
          <planeGeometry args={[cfg.size[0], cfg.size[1], 12, 8]} />
          <primitive object={materials[idx]} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Layer 4: Composite multi-part Hero Ringed Planet Assembly.
 * Parts:
 *  1. Core stratified planetary sphere (procedural albedo/bump/roughness)
 *  2. Translucent upper cloud deck rotating independently
 *  3. Inner Rayleigh/twilight Fresnel atmospheric rim shell
 *  4. Outer soft coronal scatter shell (BackSide)
 *  5. Multi-band tilted planetary ring disc with analytical sphere-shadow casting
 *  6. Orbiting shepherd moonlet near the outer ring perimeter
 */
export function HeroPlanetAssembly({
  motionEnabled,
  parallaxEnabled,
  wireframe,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const rootRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const cloudMeshRef = useRef<THREE.Mesh>(null);
  const moonletRef = useRef<THREE.Mesh>(null);
  const gl = useThree((s) => s.gl);

  const textures = useMemo(
    () => createHeroPlanetTextures(gl.capabilities.getMaxAnisotropy()),
    [gl],
  );

  const innerAtmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: SUN_LIGHT_DIRECTION.clone() },
          uDayColor: { value: new THREE.Color('#7bc9ff') },
          uTwilightColor: { value: new THREE.Color('#f0b07a') },
          uIntensity: { value: 1.05 },
          uPower: { value: 3.1 },
        },
        vertexShader: ATMOSPHERE_RIM_VERTEX,
        fragmentShader: ATMOSPHERE_RIM_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    [],
  );

  const outerCoronaMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: SUN_LIGHT_DIRECTION.clone() },
          uDayColor: { value: new THREE.Color('#5bb2f5') },
          uTwilightColor: { value: new THREE.Color('#e29a62') },
          uIntensity: { value: 0.72 },
          uPower: { value: 3.4 },
        },
        vertexShader: ATMOSPHERE_RIM_VERTEX,
        fragmentShader: OUTER_CORONA_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      }),
    [],
  );

  const ringMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uInnerRadius: { value: 4.05 },
          uOuterRadius: { value: 6.45 },
          uPlanetCenter: { value: HERO_PLANET_CENTER.clone() },
          uPlanetRadius: { value: HERO_PLANET_RADIUS },
          uLightDir: { value: SUN_LIGHT_DIRECTION.clone() },
          uTime: { value: 0 },
        },
        vertexShader: PLANETARY_RING_VERTEX,
        fragmentShader: PLANETARY_RING_FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(() => {
    innerAtmosphereMat.wireframe = wireframe;
    outerCoronaMat.wireframe = wireframe;
    ringMat.wireframe = wireframe;
  }, [innerAtmosphereMat, outerCoronaMat, ringMat, wireframe]);

  useEffect(() => {
    return () => {
      textures.dispose();
      innerAtmosphereMat.dispose();
      outerCoronaMat.dispose();
      ringMat.dispose();
    };
  }, [textures, innerAtmosphereMat, outerCoronaMat, ringMat]);

  useFrame((_, delta) => {
    const t = timeRef.current;
    ringMat.uniforms.uTime.value = t;

    if (rootRef.current) {
      const offset = computeLayerParallaxOffset(
        0.48,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      const floatY = motionEnabled ? Math.sin(t * 0.28) * 0.14 : 0;
      const targetX = HERO_PLANET_CENTER.x + offset.x;
      const targetY = HERO_PLANET_CENTER.y + offset.y + floatY;

      rootRef.current.position.x = dampValue(rootRef.current.position.x, targetX, 3.6, delta);
      rootRef.current.position.y = dampValue(rootRef.current.position.y, targetY, 3.6, delta);

      // Keep analytical ring shadow synced with current planet world center
      ringMat.uniforms.uPlanetCenter.value.copy(rootRef.current.position);
    }

    if (planetMeshRef.current) {
      planetMeshRef.current.rotation.y = 0.65 + t * 0.022;
    }
    if (cloudMeshRef.current) {
      cloudMeshRef.current.rotation.y = 1.2 + t * 0.034;
    }
    if (moonletRef.current) {
      const orbitAngle = 0.85 + t * 0.075;
      moonletRef.current.position.set(
        Math.cos(orbitAngle) * 6.05,
        Math.sin(orbitAngle) * 6.05,
        0.06,
      );
    }
  });

  return (
    <group
      ref={rootRef}
      position={[HERO_PLANET_CENTER.x, HERO_PLANET_CENTER.y, HERO_PLANET_CENTER.z]}
      rotation={[0.28, -0.22, -0.38]}
    >
      {/* 1. Core planetary body */}
      <mesh ref={planetMeshRef}>
        <sphereGeometry args={[HERO_PLANET_RADIUS, 64, 48]} />
        <meshStandardMaterial
          color="#ffffff"
          map={textures.albedoMap}
          bumpMap={wireframe ? null : textures.bumpMap}
          bumpScale={wireframe ? 0 : 0.045}
          roughnessMap={textures.roughnessMap}
          roughness={0.88}
          metalness={0.06}
          wireframe={wireframe}
        />
      </mesh>

      {/* 2. Translucent upper cloud veil */}
      <mesh ref={cloudMeshRef}>
        <sphereGeometry args={[HERO_PLANET_RADIUS * 1.014, 48, 36]} />
        <meshStandardMaterial
          color="#e8f3ff"
          map={textures.cloudMap}
          transparent
          opacity={0.68}
          roughness={0.94}
          metalness={0.0}
          depthWrite={false}
          wireframe={wireframe}
        />
      </mesh>

      {/* 3. Inner Rayleigh Fresnel atmospheric rim */}
      <mesh renderOrder={3}>
        <sphereGeometry args={[HERO_PLANET_RADIUS * 1.032, 48, 36]} />
        <primitive object={innerAtmosphereMat} attach="material" />
      </mesh>

      {/* 4. Outer atmospheric corona glow (smooth BackSide falloff) */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[HERO_PLANET_RADIUS * 1.24, 40, 32]} />
        <primitive object={outerCoronaMat} attach="material" />
      </mesh>

      {/* 5. Multi-band tilted planetary ring system + 6. shepherd moonlet */}
      <group rotation={[Math.PI * 0.42, 0.08, 0.16]}>
        <mesh renderOrder={4}>
          <ringGeometry args={[4.05, 6.45, 96, 6]} />
          <primitive object={ringMat} attach="material" />
        </mesh>

        <mesh ref={moonletRef} position={[6.05, 0, 0.06]}>
          <sphereGeometry args={[0.095, 18, 14]} />
          <meshStandardMaterial
            color="#9cb0c9"
            roughness={0.82}
            metalness={0.1}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Layer 3: Distant crescent-lit companion moon balancing the upper-right sky.
 */
export function CompanionMoonLayer({
  motionEnabled,
  parallaxEnabled,
  wireframe,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const gl = useThree((s) => s.gl);

  const textures = useMemo(
    () => createCompanionMoonTextures(gl.capabilities.getMaxAnisotropy()),
    [gl],
  );

  const rimMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uLightDir: { value: SUN_LIGHT_DIRECTION.clone() },
          uDayColor: { value: new THREE.Color('#9ac5ee') },
          uTwilightColor: { value: new THREE.Color('#c9b196') },
          uIntensity: { value: 0.48 },
          uPower: { value: 3.6 },
        },
        vertexShader: ATMOSPHERE_RIM_VERTEX,
        fragmentShader: ATMOSPHERE_RIM_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    rimMat.wireframe = wireframe;
  }, [rimMat, wireframe]);

  useEffect(() => {
    return () => {
      textures.dispose();
      rimMat.dispose();
    };
  }, [textures, rimMat]);

  useFrame((_, delta) => {
    const t = timeRef.current;
    if (groupRef.current) {
      const offset = computeLayerParallaxOffset(
        0.18,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      groupRef.current.position.x = dampValue(groupRef.current.position.x, 1.95 + offset.x, 3.2, delta);
      groupRef.current.position.y = dampValue(groupRef.current.position.y, 3.85 + offset.y, 3.2, delta);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = 0.4 + t * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[1.95, 3.85, -14.8]}>
      <Float
        speed={motionEnabled ? 0.85 : 0}
        rotationIntensity={0}
        floatIntensity={motionEnabled ? 0.22 : 0}
        floatingRange={[-0.1, 0.1]}
      >
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.64, 36, 28]} />
          <meshStandardMaterial
            color="#ffffff"
            map={textures.albedoMap}
            bumpMap={wireframe ? null : textures.bumpMap}
            bumpScale={wireframe ? 0 : 0.03}
            roughness={0.94}
            metalness={0.04}
            wireframe={wireframe}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.675, 28, 22]} />
          <primitive object={rimMat} attach="material" />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Layers 3 & 6: Instanced sculpted asteroid silhouettes.
 * - Midground orbital arc curving behind/around the ringed planet.
 * - Sparse dark foreground silhouettes tucked strictly near right/bottom-right edges.
 */
export function AsteroidSilhouetteLayer({
  motionEnabled,
  parallaxEnabled,
  wireframe,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const midMeshRef = useRef<THREE.InstancedMesh>(null);
  const fgMeshRef = useRef<THREE.InstancedMesh>(null);
  const midGroupRef = useRef<THREE.Group>(null);
  const fgGroupRef = useRef<THREE.Group>(null);

  const { geometry, midground, foreground } = useMemo(() => {
    const all = generateAsteroidFieldData(51923);
    return {
      geometry: createSculptedAsteroidGeometry(2026),
      midground: all.filter((a) => a.layer === 'midground'),
      foreground: all.filter((a) => a.layer === 'foreground'),
    };
  }, []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  // Apply per-instance subtle mineral tint variation once on mount
  useEffect(() => {
    if (midMeshRef.current) {
      midground.forEach((a, i) => {
        _tempColor.setRGB(a.tint[0], a.tint[1], a.tint[2]);
        midMeshRef.current!.setColorAt(i, _tempColor);
      });
      if (midMeshRef.current.instanceColor) {
        midMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
    if (fgMeshRef.current) {
      foreground.forEach((a, i) => {
        _tempColor.setRGB(a.tint[0], a.tint[1], a.tint[2]);
        fgMeshRef.current!.setColorAt(i, _tempColor);
      });
      if (fgMeshRef.current.instanceColor) {
        fgMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [midground, foreground]);

  useFrame((_, delta) => {
    const t = timeRef.current;

    if (midGroupRef.current) {
      const offset = computeLayerParallaxOffset(
        0.34,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      midGroupRef.current.position.x = dampValue(midGroupRef.current.position.x, offset.x, 3.2, delta);
      midGroupRef.current.position.y = dampValue(midGroupRef.current.position.y, offset.y, 3.2, delta);
    }

    if (fgGroupRef.current) {
      const offset = computeLayerParallaxOffset(
        1.15,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      fgGroupRef.current.position.x = dampValue(fgGroupRef.current.position.x, offset.x, 4.2, delta);
      fgGroupRef.current.position.y = dampValue(fgGroupRef.current.position.y, offset.y, 4.2, delta);
    }

    if (midMeshRef.current) {
      for (let i = 0; i < midground.length; i++) {
        const a = midground[i];
        const bob = motionEnabled ? Math.sin(t * 0.4 + a.phase) * a.bobAmplitude : 0;
        _dummyObj.position.set(a.position.x, a.position.y + bob, a.position.z);
        _dummyObj.rotation.set(
          a.rotation.x + t * a.spinSpeed * 0.6,
          a.rotation.y + t * a.spinSpeed,
          a.rotation.z,
        );
        _dummyObj.scale.set(a.scale.x, a.scale.y, a.scale.z);
        _dummyObj.updateMatrix();
        midMeshRef.current.setMatrixAt(i, _dummyObj.matrix);
      }
      midMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (fgMeshRef.current) {
      for (let i = 0; i < foreground.length; i++) {
        const a = foreground[i];
        const bob = motionEnabled ? Math.sin(t * 0.35 + a.phase) * a.bobAmplitude : 0;
        _dummyObj.position.set(a.position.x, a.position.y + bob, a.position.z);
        _dummyObj.rotation.set(
          a.rotation.x + t * a.spinSpeed * 0.5,
          a.rotation.y + t * a.spinSpeed,
          a.rotation.z,
        );
        _dummyObj.scale.set(a.scale.x, a.scale.y, a.scale.z);
        _dummyObj.updateMatrix();
        fgMeshRef.current.setMatrixAt(i, _dummyObj.matrix);
      }
      fgMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <group ref={midGroupRef}>
        <instancedMesh
          ref={midMeshRef}
          args={[geometry, undefined, midground.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#657b99"
            roughness={0.9}
            metalness={0.1}
            wireframe={wireframe}
          />
        </instancedMesh>
      </group>

      <group ref={fgGroupRef}>
        <instancedMesh
          ref={fgMeshRef}
          args={[geometry, undefined, foreground.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#31415a"
            roughness={0.94}
            metalness={0.08}
            wireframe={wireframe}
          />
        </instancedMesh>
      </group>
    </>
  );
}

/**
 * Layer 5: Luminous soft-bokeh foreground & midground cosmic dust particles.
 */
export function CosmicDustLayer({
  parallaxEnabled,
  pointerRef,
  timeRef,
}: SharedLayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gl = useThree((s) => s.gl);

  const { geometry, material } = useMemo(() => {
    const data = generateDustFieldData(150, 77317);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(data.sizes, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(data.speeds, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(data.phases, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: gl.getPixelRatio() },
      },
      vertexShader: COSMIC_DUST_VERTEX,
      fragmentShader: COSMIC_DUST_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    return { geometry: geo, material: mat };
  }, [gl]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    material.uniforms.uTime.value = timeRef.current;
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();

    if (groupRef.current) {
      const offset = computeLayerParallaxOffset(
        0.88,
        pointerRef.current.x,
        pointerRef.current.y,
        parallaxEnabled,
      );
      groupRef.current.position.x = dampValue(groupRef.current.position.x, offset.x, 3.8, delta);
      groupRef.current.position.y = dampValue(groupRef.current.position.y, offset.y, 3.8, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} renderOrder={6} frustumCulled={false} />
    </group>
  );
}
