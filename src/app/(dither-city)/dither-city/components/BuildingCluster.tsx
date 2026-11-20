'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { generateCityGeometry } from '../lib/BuildingGenerator';
import { createSeededRandom } from '../lib/cityConfig';

interface BuildingClusterProps {
  motionEnabled: boolean;
  wireframe: boolean;
  accentIntensity: number;
}

const WASH_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const WASH_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uIntensity;
uniform float uPhase;

varying vec2 vUv;

void main() {
  // Soft vertical-biased architectural floodlight falloff (dithered into dots in post)
  vec2 centered = vUv - vec2(0.5, 0.48);
  float radial = length(centered * vec2(2.15, 1.45));
  float mask = exp(-radial * radial * 2.8) * smoothstep(1.0, 0.15, radial);

  // Slow organic industrial light pulse traveling subtly along tower seams
  float sweep = 0.78 + 0.22 * sin(vUv.y * 5.0 - uTime * 0.65 + uPhase);
  float alpha = clamp(mask * sweep * uIntensity * 0.72, 0.0, 0.92);

  if (alpha < 0.01) discard;

  // Pure saturated acid-green signal so the post-processing pass isolates it cleanly
  vec3 acidGreen = vec3(0.42, 0.98, 0.14);
  gl_FragColor = vec4(acidGreen, alpha);
}
`;

/**
 * Generates a deterministic procedural weathered brutalist concrete & riveted panel
 * CanvasTexture (100% procedural, zero external image 404s) for architectural faces.
 */
function createBrutalistFacadeTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rand = createSeededRandom(77312);

  // Neutral high-value concrete base so directional lighting drives chiaroscuro
  ctx.fillStyle = '#e5e3d8';
  ctx.fillRect(0, 0, size, size);

  // Subtle horizontal and vertical concrete panel seams
  ctx.strokeStyle = 'rgba(20, 22, 18, 0.28)';
  ctx.lineWidth = 2;
  const rows = 8;
  const cols = 4;
  for (let r = 0; r < rows; r++) {
    const y = (r / rows) * size;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();

    // Subtle tonal variation per panel slab
    for (let c = 0; c < cols; c++) {
      const x = (c / cols) * size;
      const shade = Math.floor(205 + (rand() - 0.5) * 34);
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade - 8}, 0.35)`;
      ctx.fillRect(x + 2, y + 2, size / cols - 4, size / rows - 4);
    }
  }
  for (let c = 0; c < cols; c++) {
    const x = (c / cols) * size;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  // Weathered diagonal concrete cracks & industrial grime streaks (like Tower C in reference)
  ctx.strokeStyle = 'rgba(15, 17, 13, 0.55)';
  for (let i = 0; i < 14; i++) {
    ctx.lineWidth = 0.8 + rand() * 1.4;
    let cx = rand() * size;
    let cy = rand() * size;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const steps = 4 + Math.floor(rand() * 5);
    for (let s = 0; s < steps; s++) {
      cx += (rand() - 0.5) * 44;
      cy += 12 + rand() * 34;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  // Fine industrial speckle & weathering grain
  for (let i = 0; i < 1600; i++) {
    const px = rand() * size;
    const py = rand() * size;
    const dark = rand() < 0.65;
    ctx.fillStyle = dark ? 'rgba(20, 22, 18, 0.14)' : 'rgba(250, 248, 238, 0.16)';
    ctx.fillRect(px, py, 1 + rand() * 3, 1 + rand() * 6);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const _dummyObj = new THREE.Object3D();
const _tmpColor = new THREE.Color();

export default function BuildingCluster({
  motionEnabled,
  wireframe,
  accentIntensity,
}: BuildingClusterProps) {
  const cityData = useMemo(() => generateCityGeometry(204907), []);
  const facadeTexture = useMemo(() => createBrutalistFacadeTexture(), []);

  const windowInstancedRef = useRef<THREE.InstancedMesh>(null);
  const accentMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const washRefs = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const elapsedRef = useRef(0);

  // Main brutalist architectural material — high contrast under right-side key light
  const mainMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: facadeTexture,
        vertexColors: true,
        roughness: 0.88,
        metalness: 0.12,
        envMapIntensity: 0.22,
      }),
    [facadeTexture],
  );

  // Dark recessed vents, structural ribs, bulkheads, shadow housings
  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.65,
        metalness: 0.28,
        envMapIntensity: 0.18,
      }),
    [],
  );

  // Exposed external steel trusses, ladders, scaffolding, and antennas
  const scaffoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.52,
        metalness: 0.4,
        envMapIntensity: 0.34,
      }),
    [],
  );

  // Distant low-contrast skyline silhouettes fading into atmospheric fog
  const distantMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.96,
        metalness: 0.05,
        envMapIntensity: 0.12,
      }),
    [],
  );

  // Selective acid-green structural edge seams & scaffolding accents
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x52ff1e),
        transparent: true,
        opacity: 0.92,
      }),
    [],
  );

  // Shared unit plane for instanced intermittent windows
  const windowGeo = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const windowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      }),
    [],
  );

  // Individual shader materials for soft localized green wall washes
  const washMaterials = useMemo(
    () =>
      cityData.greenWashPlanes.map(
        (wash) =>
          new THREE.ShaderMaterial({
            uniforms: {
              uTime: { value: 0 },
              uIntensity: { value: wash.intensity * accentIntensity },
              uPhase: { value: wash.phase },
            },
            vertexShader: WASH_VERTEX,
            fragmentShader: WASH_FRAGMENT,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1,
          }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cityData.greenWashPlanes],
  );

  // Initialize instanced window transforms once
  useEffect(() => {
    const mesh = windowInstancedRef.current;
    if (!mesh) return;
    cityData.animatedWindows.forEach((slot, i) => {
      _dummyObj.position.set(slot.position[0], slot.position[1], slot.position[2]);
      _dummyObj.rotation.set(0, slot.rotationY, 0);
      _dummyObj.scale.set(slot.width, slot.height, 1);
      _dummyObj.updateMatrix();
      mesh.setMatrixAt(i, _dummyObj.matrix);
      _tmpColor.setRGB(0.15, 0.15, 0.14);
      mesh.setColorAt(i, _tmpColor);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [cityData.animatedWindows]);

  const mainMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const darkMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const scaffoldMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const distantMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Sync wireframe & accent intensity reactively via material refs
  useEffect(() => {
    const mats = [
      mainMatRef.current,
      darkMatRef.current,
      scaffoldMatRef.current,
      distantMatRef.current,
    ];
    for (const m of mats) {
      if (m) m.wireframe = wireframe;
    }
  }, [wireframe]);

  useEffect(() => {
    if (accentMatRef.current) {
      accentMatRef.current.opacity = THREE.MathUtils.clamp(accentIntensity * 0.9, 0, 1);
      accentMatRef.current.visible = accentIntensity > 0.02;
    }
    washRefs.current.forEach((mat, idx) => {
      if (mat && cityData.greenWashPlanes[idx]) {
        mat.uniforms.uIntensity.value = cityData.greenWashPlanes[idx].intensity * accentIntensity;
      }
    });
  }, [accentIntensity, cityData.greenWashPlanes]);

  // Clean GPU resource disposal on unmount
  useEffect(() => {
    return () => {
      cityData.mainGeometry.dispose();
      cityData.darkDetailGeometry.dispose();
      cityData.scaffoldGeometry.dispose();
      cityData.accentGeometry.dispose();
      cityData.distantGeometry.dispose();
      windowGeo.dispose();
      windowMat.dispose();
      mainMaterial.dispose();
      darkMaterial.dispose();
      scaffoldMaterial.dispose();
      distantMaterial.dispose();
      accentMaterial.dispose();
      facadeTexture?.dispose();
      washMaterials.forEach((m) => m.dispose());
    };
  }, [
    cityData,
    windowGeo,
    windowMat,
    mainMaterial,
    darkMaterial,
    scaffoldMaterial,
    distantMaterial,
    accentMaterial,
    facadeTexture,
    washMaterials,
  ]);

  // Subtle ambient animation: intermittent window illumination + slow green seam drift
  useFrame((_, delta) => {
    const dt = motionEnabled ? Math.min(delta, 0.05) : 0;
    elapsedRef.current += dt;
    const t = elapsedRef.current;

    // Gentle green architectural wash wave
    for (let i = 0; i < washRefs.current.length; i++) {
      const mat = washRefs.current[i];
      if (mat) mat.uniforms.uTime.value = t;
    }

    // Subtle breathing on accent seam strips
    if (accentMatRef.current && accentIntensity > 0.02) {
      const pulse = 0.88 + 0.12 * Math.sin(t * 0.85);
      accentMatRef.current.opacity = THREE.MathUtils.clamp(
        accentIntensity * 0.9 * pulse,
        0,
        1,
      );
    }

    // Selective intermittent windows — slow, realistic timing (no frantic flickering)
    const mesh = windowInstancedRef.current;
    if (mesh && cityData.animatedWindows.length > 0) {
      for (let i = 0; i < cityData.animatedWindows.length; i++) {
        const slot = cityData.animatedWindows[i];
        const wave = Math.sin(t * slot.speed + slot.phase);
        // Only illuminate top ~22% of each slow cycle for sparse realism
        const lit = THREE.MathUtils.smoothstep(wave, 0.58, 0.92);
        if (slot.isGreen && accentIntensity > 0.05) {
          const g = lit * 0.92 * Math.min(1.2, accentIntensity);
          _tmpColor.setRGB(g * 0.45, g, g * 0.16);
        } else {
          const v = 0.06 + lit * 0.82;
          _tmpColor.setRGB(v, v, v * 0.94);
        }
        mesh.setColorAt(i, _tmpColor);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group name="megacity-skyline">
      {/* Primary Brutalist Architectural Shells */}
      <mesh geometry={cityData.mainGeometry}>
        <primitive object={mainMaterial} ref={mainMatRef} attach="material" />
      </mesh>

      {/* Recessed Vents, Ribs, Mechanical Housings */}
      <mesh geometry={cityData.darkDetailGeometry}>
        <primitive object={darkMaterial} ref={darkMatRef} attach="material" />
      </mesh>

      {/* Exposed External Scaffolding, Steel Trusses, Ladders & Antennas */}
      <mesh geometry={cityData.scaffoldGeometry}>
        <primitive object={scaffoldMaterial} ref={scaffoldMatRef} attach="material" />
      </mesh>

      {/* Distant Low-Contrast Skyline Silhouettes */}
      <mesh geometry={cityData.distantGeometry}>
        <primitive object={distantMaterial} ref={distantMatRef} attach="material" />
      </mesh>

      {/* Crisp Selective Acid-Green Architectural Seams & Truss Rails */}
      <mesh geometry={cityData.accentGeometry}>
        <primitive object={accentMaterial} ref={accentMatRef} attach="material" />
      </mesh>

      {/* Soft Localized Acid-Green Industrial Wall Washes (halftoned in post pass) */}
      {cityData.greenWashPlanes.map((wash, idx) => (
        <mesh
          key={`wash-${idx}`}
          position={wash.position}
          rotation={wash.rotation}
          renderOrder={6}
        >
          <planeGeometry args={[wash.width, wash.height]} />
          <primitive
            object={washMaterials[idx]}
            ref={(el: THREE.ShaderMaterial | null) => {
              washRefs.current[idx] = el;
            }}
            attach="material"
          />
        </mesh>
      ))}

      {/* Instanced Intermittent Illuminated Windows */}
      {cityData.animatedWindows.length > 0 && (
        <instancedMesh
          ref={windowInstancedRef}
          args={[windowGeo, windowMat, cityData.animatedWindows.length]}
          frustumCulled={false}
        />
      )}
    </group>
  );
}
