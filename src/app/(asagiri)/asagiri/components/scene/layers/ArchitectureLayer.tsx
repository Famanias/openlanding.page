'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { computeLayerParallaxOffset, dampValue, evaluateRidgeHeight } from '../../../lib/scenic-math';
import type { DayNightPalette } from '../../../lib/day-night-cycle';
import type { ProceduralTextureSet } from '../../../lib/procedural-textures';
import {
  LANTERN_ANCHOR,
  PAGODA_ANCHOR,
  TORII_ANCHOR,
  WATER_LEVEL,
  generateToriiWalkwaySlabs,
  sampleTerrainHeight,
} from '../../../lib/terrain';
import { PINE_HEADLAND_PARALLAX, PINE_HEADLAND_RIDGE } from './MountainRangesLayer';

export interface ArchitectureLayerProps {
  enableMotion: boolean;
  enableParallax: boolean;
  wireframe: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
  textures: ProceduralTextureSet;
}

/**
 * Gracefully upward-sweeping curved kasagi (top lintel) of a Myōjin-style Japanese torii gate
 * with realistic structural thickness and upturned sori tips.
 */
function buildKasagiGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.46, 0.11);
  shape.quadraticCurveTo(0, -0.055, 1.46, 0.11);
  shape.lineTo(1.62, 0.28);
  shape.quadraticCurveTo(0, 0.095, -1.62, 0.28);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.024,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 24,
  });
  geo.translate(0, 0, -0.12);
  return geo;
}

/**
 * Curved secondary shimaki beam nestled directly underneath the kasagi.
 */
function buildShimakiGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.32, 0.06);
  shape.quadraticCurveTo(0, -0.04, 1.32, 0.06);
  shape.lineTo(1.38, 0.145);
  shape.quadraticCurveTo(0, 0.04, -1.38, 0.145);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.19,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 20,
  });
  geo.translate(0, 0, -0.095);
  return geo;
}

/**
 * Dark copper-slate weather cap (kasagi-yane) crowning the curved kasagi.
 */
function buildKasagiCapGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-1.64, 0.265);
  shape.quadraticCurveTo(0, 0.088, 1.64, 0.265);
  shape.lineTo(1.69, 0.34);
  shape.quadraticCurveTo(0, 0.155, -1.69, 0.34);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.016,
    bevelSize: 0.016,
    bevelSegments: 2,
    curveSegments: 24,
  });
  geo.translate(0, 0, -0.15);
  return geo;
}

/**
 * Traditional Japanese curved tiered pagoda roof with pronounced upturned eaves (sori)
 * and distinct ridge overhang.
 */
function buildPagodaRoofGeometry(halfWidth: number, height: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-halfWidth, 0.085);
  shape.quadraticCurveTo(-halfWidth * 0.56, -0.025, 0, 0.0);
  shape.quadraticCurveTo(halfWidth * 0.56, -0.025, halfWidth, 0.085);
  shape.quadraticCurveTo(halfWidth * 0.62, height * 0.44, halfWidth * 0.44, height);
  shape.lineTo(-halfWidth * 0.44, height);
  shape.quadraticCurveTo(-halfWidth * 0.62, height * 0.44, -halfWidth, 0.085);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 1,
    curveSegments: 14,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

/**
 * Hexagonal curved granite umbrella roof (kasa) for the stone lantern with upturned corner eaves.
 */
function buildLanternRoofGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.0, 0.31),
    new THREE.Vector2(0.11, 0.24),
    new THREE.Vector2(0.27, 0.13),
    new THREE.Vector2(0.46, 0.025),
    new THREE.Vector2(0.52, 0.068), // characteristic upturned warabite tip
    new THREE.Vector2(0.49, -0.02),
    new THREE.Vector2(0.22, -0.025),
    new THREE.Vector2(0.0, 0.0),
  ];
  return new THREE.LatheGeometry(points, 6);
}

/**
 * Bevelled stone flagstone block for the curved walkway leading to the Torii sanctuary.
 */
function buildFlagstoneGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const w = 0.5;
  const h = 0.5;
  shape.moveTo(-w + 0.08, -h);
  shape.lineTo(w - 0.08, -h);
  shape.quadraticCurveTo(w, -h, w, -h + 0.08);
  shape.lineTo(w, h - 0.08);
  shape.quadraticCurveTo(w, h, w - 0.08, h);
  shape.lineTo(-w + 0.08, h);
  shape.quadraticCurveTo(-w, h, -w, h - 0.08);
  shape.lineTo(-w, -h + 0.08);
  shape.quadraticCurveTo(-w, -h, -w + 0.08, -h);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.0,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.04,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geo.rotateX(Math.PI / 2);
  geo.translate(0, 0.5, 0);
  return geo;
}

export function ArchitectureLayer({
  enableMotion,
  enableParallax,
  wireframe,
  pointerRef,
  cyclePaletteRef,
  textures,
}: ArchitectureLayerProps) {
  const pagodaGroupRef = useRef<THREE.Group>(null);
  const lanternCoreMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lanternHaloMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const simTimeRef = useRef(0);

  // Compute exact grounded elevations from shared terrain heightfield
  const groundedPositions = useMemo(() => {
    const lanternGroundY = sampleTerrainHeight(LANTERN_ANCHOR.x, LANTERN_ANCHOR.z);
    // Dressed stone foundation pad rises cleanly above the sloped rocky bank (and well above WATER_LEVEL)
    const lanternPadTopY = Math.max(lanternGroundY + 0.14, WATER_LEVEL + 0.52);

    // Sample the exact pine-headland hillside elevation where the pagoda rests
    const pagodaU = PAGODA_ANCHOR.x / PINE_HEADLAND_RIDGE.width + 0.5;
    const pagodaRidgeY = evaluateRidgeHeight(pagodaU, PINE_HEADLAND_RIDGE);

    const walkwaySlabs = generateToriiWalkwaySlabs();

    return {
      lanternGroundY,
      lanternPadTopY,
      pagodaBaseY: pagodaRidgeY - 0.12,
      walkwaySlabs,
    };
  }, []);

  // Shared procedural architectural geometries
  const geometries = useMemo(() => {
    const kasagi = buildKasagiGeometry();
    const shimaki = buildShimakiGeometry();
    const kasagiCap = buildKasagiCapGeometry();
    const lanternRoof = buildLanternRoofGeometry();
    const flagstone = buildFlagstoneGeometry();
    const pagodaRoofs = [
      buildPagodaRoofGeometry(0.76, 0.25, 0.36),
      buildPagodaRoofGeometry(0.65, 0.23, 0.32),
      buildPagodaRoofGeometry(0.55, 0.21, 0.28),
      buildPagodaRoofGeometry(0.46, 0.19, 0.24),
      buildPagodaRoofGeometry(0.38, 0.18, 0.2),
    ];
    return { kasagi, shimaki, kasagiCap, lanternRoof, flagstone, pagodaRoofs };
  }, []);

  // Soft warm radial glow texture for the stone lantern's restrained candle aura
  const lanternGlowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255, 224, 168, 0.78)');
      grad.addColorStop(0.32, 'rgba(244, 182, 114, 0.28)');
      grad.addColorStop(0.7, 'rgba(235, 162, 92, 0.06)');
      grad.addColorStop(1, 'rgba(235, 162, 92, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    return () => {
      geometries.kasagi.dispose();
      geometries.shimaki.dispose();
      geometries.kasagiCap.dispose();
      geometries.lanternRoof.dispose();
      geometries.flagstone.dispose();
      geometries.pagodaRoofs.forEach((g) => g.dispose());
      lanternGlowTexture?.dispose();
    };
  }, [geometries, lanternGlowTexture]);

  useFrame((_, delta) => {
    const pointer = pointerRef.current ?? { x: 0, y: 0 };

    // Lock Pagoda parallax strictly to the pine-headland hillside so it never slides off its foundation
    if (pagodaGroupRef.current) {
      const pOff = computeLayerParallaxOffset(
        pointer.x,
        pointer.y,
        PINE_HEADLAND_PARALLAX,
        enableParallax
      );
      pagodaGroupRef.current.position.x = dampValue(
        pagodaGroupRef.current.position.x,
        PAGODA_ANCHOR.x + pOff.x,
        4.0,
        delta
      );
      pagodaGroupRef.current.position.y = dampValue(
        pagodaGroupRef.current.position.y,
        groundedPositions.pagodaBaseY + pOff.y,
        4.0,
        delta
      );
    }

    // Very restrained, peaceful warm lantern glow variation (no exaggerated flashing)
    if (enableMotion) {
      simTimeRef.current += Math.min(delta, 0.1);
    }
    const palette = cyclePaletteRef.current;
    const baseEmissive = palette ? palette.lanternEmissiveIntensity : 1.45;
    const baseHalo = palette ? palette.lanternHaloOpacity : 0.56;
    const calmBreath =
      0.97 +
      Math.sin(simTimeRef.current * 1.15) * 0.022 +
      Math.sin(simTimeRef.current * 2.6 + 1.1) * 0.01;
    if (lanternCoreMatRef.current) {
      lanternCoreMatRef.current.emissiveIntensity = baseEmissive * calmBreath;
    }
    if (lanternHaloMatRef.current) {
      lanternHaloMatRef.current.opacity = Math.min(0.85, baseHalo * 0.82 * calmBreath);
    }
  });

  // Torii stone platform masonry height extends deep below terrain so zero gap is ever visible
  const toriiPlatformBottomY = WATER_LEVEL - 0.72;
  const toriiPlatformHeight = TORII_ANCHOR.platformTopY - toriiPlatformBottomY;
  const toriiPlatformCenterY = toriiPlatformBottomY + toriiPlatformHeight * 0.5;

  // Lantern foundation pedestal height extends firmly into the dry rocky embankment
  const lanternBaseBottomY = groundedPositions.lanternGroundY - 0.45;
  const lanternBaseHeight = groundedPositions.lanternPadTopY - lanternBaseBottomY;
  const lanternBaseCenterY = lanternBaseBottomY + lanternBaseHeight * 0.5;

  return (
    <group name="architecture-layer">
      {/* =====================================================================
          1. FIVE-TIER HILLSIDE TEMPLE PAGODA (Grounded solidly on pine headland)
         ===================================================================== */}
      <group
        ref={pagodaGroupRef}
        name="hillside-pagoda"
        position={[PAGODA_ANCHOR.x, groundedPositions.pagodaBaseY, PAGODA_ANCHOR.z]}
        scale={[0.84, 0.84, 0.84]}
      >
        {/* Tapered battered stone hillside foundation blending naturally into the wooded crest */}
        <mesh position={[0, -0.14, 0.0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.74, 1.05, 0.52, 4]} />
          <meshStandardMaterial
            color="#243343"
            roughness={0.95}
            bumpMap={textures.graniteBump}
            bumpScale={0.03}
            fog={false}
            wireframe={wireframe}
          />
        </mesh>
        {/* Dressed stone terrace coping */}
        <mesh position={[0, 0.14, 0.0]}>
          <boxGeometry args={[1.08, 0.11, 0.48]} />
          <meshStandardMaterial color="#314152" roughness={0.9} fog={false} wireframe={wireframe} />
        </mesh>

        {/* Five graduated temple tiers with timber bracket trim & curved sori tiled roofs */}
        {[0, 1, 2, 3, 4].map((tier) => {
          const yBase = 0.24 + tier * 0.355;
          const coreW = 0.72 - tier * 0.095;
          const coreD = 0.32 - tier * 0.028;
          return (
            <group key={tier} position={[0, yBase, 0]}>
              {/* Recessed warm cedar wall core for refined contrast against the misty indigo hillside */}
              <mesh position={[0, 0.105, 0]}>
                <boxGeometry args={[coreW, 0.21, coreD]} />
                <meshStandardMaterial color="#463C40" roughness={0.88} fog={false} wireframe={wireframe} />
              </mesh>
              {/* Subtle timber corner posts & eaves trim (tokyō bracket suggestion) */}
              <mesh position={[0, 0.195, 0]}>
                <boxGeometry args={[coreW + 0.08, 0.045, coreD + 0.06]} />
                <meshStandardMaterial color="#5A4540" roughness={0.82} fog={false} wireframe={wireframe} />
              </mesh>
              {/* Curved sori tiled roof */}
              <mesh position={[0, 0.2, 0]} geometry={geometries.pagodaRoofs[tier]}>
                <meshStandardMaterial
                  color="#1E2B3A"
                  roughness={0.78}
                  metalness={0.08}
                  fog={false}
                  wireframe={wireframe}
                />
              </mesh>
            </group>
          );
        })}

        {/* Ornate bronze sōrin finial spire with decorative rings */}
        <mesh position={[0, 2.34, 0]}>
          <cylinderGeometry args={[0.012, 0.034, 0.68, 8]} />
          <meshStandardMaterial
            color="#3B4957"
            roughness={0.52}
            metalness={0.35}
            fog={false}
            wireframe={wireframe}
          />
        </mesh>
        {[2.18, 2.28, 2.38].map((ry, i) => (
          <mesh key={i} position={[0, ry, 0]}>
            <cylinderGeometry args={[0.045 - i * 0.008, 0.045 - i * 0.008, 0.024, 8]} />
            <meshStandardMaterial
              color="#525D68"
              roughness={0.48}
              metalness={0.38}
              fog={false}
              wireframe={wireframe}
            />
          </mesh>
        ))}
      </group>

      {/* =====================================================================
          2. ELEVATED TORII SANCTUARY PLATFORM, STONE WALKWAY & MYŌJIN TORII GATE
             (Locked rigidly to world terrain above WATER_LEVEL — zero submersion)
         ===================================================================== */}
      <group name="torii-sanctuary-complex">
        {/* Elevated dressed stone foundation terrace rising cleanly out of the dry shoreline knoll */}
        <group
          name="torii-stone-terrace"
          position={[TORII_ANCHOR.x, 0, TORII_ANCHOR.z]}
          rotation={[0, TORII_ANCHOR.rotationY, 0]}
        >
          {/* Main masonry retaining plinth descending deep below the terrain */}
          <mesh position={[0, toriiPlatformCenterY, 0]} receiveShadow castShadow>
            <boxGeometry
              args={[
                TORII_ANCHOR.platformHalfWidth * 2,
                toriiPlatformHeight,
                TORII_ANCHOR.platformHalfDepth * 2,
              ]}
            />
            <meshStandardMaterial
              color="#3A434D"
              roughness={0.93}
              metalness={0.03}
              bumpMap={textures.graniteBump}
              bumpScale={0.04}
              wireframe={wireframe}
            />
          </mesh>

          {/* Lower battered stone footing skirt anchoring the platform to the bank */}
          <mesh position={[0, WATER_LEVEL + 0.02, 0]} receiveShadow>
            <boxGeometry
              args={[
                TORII_ANCHOR.platformHalfWidth * 2 + 0.28,
                0.38,
                TORII_ANCHOR.platformHalfDepth * 2 + 0.28,
              ]}
            />
            <meshStandardMaterial
              color="#2A333D"
              roughness={0.95}
              bumpMap={textures.graniteBump}
              bumpScale={0.05}
              wireframe={wireframe}
            />
          </mesh>

          {/* Overhanging bevelled granite coping slab (top sits exactly at TORII_ANCHOR.platformTopY) */}
          <mesh position={[0, TORII_ANCHOR.platformTopY - 0.045, 0]} receiveShadow castShadow>
            <boxGeometry
              args={[
                TORII_ANCHOR.platformHalfWidth * 2 + 0.14,
                0.09,
                TORII_ANCHOR.platformHalfDepth * 2 + 0.14,
              ]}
            />
            <meshStandardMaterial
              color="#4B5560"
              roughness={0.86}
              metalness={0.04}
              bumpMap={textures.graniteBump}
              bumpScale={0.03}
              wireframe={wireframe}
            />
          </mesh>

          {/* Low stone step leading off the eastern edge of the terrace onto the walkway */}
          <mesh position={[TORII_ANCHOR.platformHalfWidth + 0.18, TORII_ANCHOR.platformTopY - 0.12, 0.08]} receiveShadow>
            <boxGeometry args={[0.42, 0.16, 0.92]} />
            <meshStandardMaterial
              color="#46505A"
              roughness={0.88}
              bumpMap={textures.graniteBump}
              bumpScale={0.03}
              wireframe={wireframe}
            />
          </mesh>
        </group>

        {/* Curved Stepped Granite Flagstone Walkway connecting Torii Terrace to Eastern Shore */}
        <group name="torii-stone-walkway">
          {groundedPositions.walkwaySlabs.map((slab, idx) => (
            <group key={idx} position={[slab.x, slab.y, slab.z]} rotation={[0, slab.rotY, 0]}>
              <mesh
                geometry={geometries.flagstone}
                scale={[slab.width, slab.thickness, slab.depth]}
                receiveShadow
                castShadow
              >
                <meshStandardMaterial
                  color={idx % 2 === 0 ? '#4B555F' : '#434D57'}
                  roughness={0.88}
                  metalness={0.03}
                  bumpMap={textures.graniteBump}
                  bumpScale={0.03}
                  wireframe={wireframe}
                />
              </mesh>
              {/* Solid stone bedding sub-base extending slightly downward so slabs never float */}
              <mesh position={[0, -slab.thickness * 0.9, 0]} receiveShadow>
                <boxGeometry args={[slab.width * 0.88, slab.thickness * 1.4, slab.depth * 0.88]} />
                <meshStandardMaterial color="#2D3640" roughness={0.95} wireframe={wireframe} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Composite Multi-Part Myōjin Torii Gate seated cleanly atop the dry stone terrace */}
        <group
          name="sanctuary-torii-gate"
          position={[TORII_ANCHOR.x, TORII_ANCHOR.platformTopY, TORII_ANCHOR.z]}
          rotation={[0, TORII_ANCHOR.rotationY, 0]}
          scale={[1.0, 1.0, 1.0]}
        >
          {/* Left & Right grounded stone pedestals (kamebara / nemaki) + inward-canted hashira pillars */}
          {[-0.82, 0.82].map((xPos, idx) => (
            <group key={idx} position={[xPos, 0, 0]}>
              {/* Soft radial contact shadow directly on the stone terrace top */}
              {textures.contactShadowMap && !wireframe && (
                <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
                  <planeGeometry args={[0.72, 0.72]} />
                  <meshBasicMaterial
                    map={textures.contactShadowMap}
                    transparent
                    depthWrite={false}
                    opacity={0.58}
                  />
                </mesh>
              )}

              {/* Square plinth stone (kamebara) */}
              <mesh position={[0, 0.055, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.36, 0.11, 0.36]} />
                <meshStandardMaterial
                  color="#323B45"
                  roughness={0.92}
                  bumpMap={textures.graniteBump}
                  bumpScale={0.03}
                  wireframe={wireframe}
                />
              </mesh>

              {/* Tapered dark stone collar (nemaki) seated flush atop kamebara */}
              <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.112, 0.142, 0.32, 16]} />
                <meshStandardMaterial
                  color="#262E38"
                  roughness={0.88}
                  metalness={0.06}
                  bumpMap={textures.graniteBump}
                  bumpScale={0.025}
                  wireframe={wireframe}
                />
              </mesh>

              {/* Gently inward-canted vermilion cedar pillar (hashira) */}
              <mesh
                position={[idx === 0 ? 0.038 : -0.038, 1.24, 0]}
                rotation={[0, 0, idx === 0 ? -0.034 : 0.034]}
                castShadow
                receiveShadow
              >
                <cylinderGeometry args={[0.076, 0.098, 1.94, 18]} />
                <meshStandardMaterial
                  color={textures.vermilionWoodMap ? '#ffffff' : '#9C3E35'}
                  map={textures.vermilionWoodMap}
                  bumpMap={textures.vermilionBump}
                  bumpScale={0.018}
                  roughness={0.72}
                  metalness={0.04}
                  wireframe={wireframe}
                />
              </mesh>

              {/* Dark lacquered upper ring collar (daiwa) */}
              <mesh position={[idx === 0 ? 0.068 : -0.068, 2.13, 0]} castShadow>
                <cylinderGeometry args={[0.096, 0.096, 0.075, 16]} />
                <meshStandardMaterial color="#222933" roughness={0.48} metalness={0.18} wireframe={wireframe} />
              </mesh>
            </group>
          ))}

          {/* Lower horizontal tie beam (nuki) piercing cleanly through both pillars */}
          <mesh position={[0, 1.76, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.38, 0.115, 0.135]} />
            <meshStandardMaterial
              color={textures.vermilionWoodMap ? '#ffffff' : '#923830'}
              map={textures.vermilionWoodMap}
              bumpMap={textures.vermilionBump}
              bumpScale={0.015}
              roughness={0.76}
              metalness={0.04}
              wireframe={wireframe}
            />
          </mesh>

          {/* Projecting dark wooden wedges (kusabi) securing the nuki */}
          {[-0.76, 0.76].map((xPos, idx) => (
            <mesh key={idx} position={[xPos, 1.76, 0]} castShadow>
              <boxGeometry args={[0.17, 0.165, 0.175]} />
              <meshStandardMaterial color="#232A34" roughness={0.58} metalness={0.12} wireframe={wireframe} />
            </mesh>
          ))}

          {/* Curved secondary beam (shimaki) directly beneath the kasagi */}
          <mesh position={[0, 2.12, 0]} geometry={geometries.shimaki} castShadow receiveShadow>
            <meshStandardMaterial
              color={textures.vermilionWoodMap ? '#ffffff' : '#9B3E35'}
              map={textures.vermilionWoodMap}
              bumpMap={textures.vermilionBump}
              bumpScale={0.015}
              roughness={0.72}
              metalness={0.05}
              wireframe={wireframe}
            />
          </mesh>

          {/* Sculpted upward-curved top lintel (kasagi) */}
          <mesh position={[0, 2.16, 0]} geometry={geometries.kasagi} castShadow receiveShadow>
            <meshStandardMaterial
              color={textures.vermilionWoodMap ? '#ffffff' : '#A24238'}
              map={textures.vermilionWoodMap}
              bumpMap={textures.vermilionBump}
              bumpScale={0.016}
              roughness={0.68}
              metalness={0.06}
              wireframe={wireframe}
            />
          </mesh>

          {/* Dark weathered copper-slate weather cap (kasagi-yane) */}
          <mesh position={[0, 2.16, 0]} geometry={geometries.kasagiCap} castShadow>
            <meshStandardMaterial color="#1F2732" roughness={0.44} metalness={0.22} wireframe={wireframe} />
          </mesh>

          {/* Central vertical strut (gakuzuka) and framed sanctuary tablet (hengaku) */}
          <mesh position={[0, 1.96, 0]} castShadow>
            <boxGeometry args={[0.115, 0.35, 0.115]} />
            <meshStandardMaterial color="#83322B" roughness={0.8} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 1.96, 0.035]} castShadow>
            <boxGeometry args={[0.26, 0.35, 0.065]} />
            <meshStandardMaterial color="#212832" roughness={0.5} metalness={0.18} wireframe={wireframe} />
          </mesh>
          {/* Subtle antique brass inner bezel & dark plaque face */}
          <mesh position={[0, 1.96, 0.07]}>
            <boxGeometry args={[0.21, 0.29, 0.012]} />
            <meshStandardMaterial color="#8C744A" roughness={0.45} metalness={0.42} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 1.96, 0.078]}>
            <boxGeometry args={[0.17, 0.24, 0.008]} />
            <meshStandardMaterial color="#1D232C" roughness={0.68} metalness={0.12} wireframe={wireframe} />
          </mesh>
        </group>
      </group>

      {/* =====================================================================
          3. FOREGROUND SHORELINE GRANITE TŌRŌ STONE LANTERN
             (Anchored solidly onto elevated dry rocky shoreline foundation)
         ===================================================================== */}
      <group
        name="shoreline-stone-lantern-complex"
        position={[LANTERN_ANCHOR.x, 0, LANTERN_ANCHOR.z]}
      >
        {/* Solid natural granite foundation plinth extending firmly down into the dry rocky bank */}
        <mesh position={[0, lanternBaseCenterY, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.52, 0.72, lanternBaseHeight, 8]} />
          <meshStandardMaterial
            color="#353F4B"
            roughness={0.93}
            metalness={0.03}
            bumpMap={textures.graniteBump}
            bumpScale={0.045}
            wireframe={wireframe}
          />
        </mesh>

        {/* Dressed octagonal stone cap slab directly beneath the lantern base */}
        <mesh position={[0, groundedPositions.lanternPadTopY - 0.04, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.46, 0.5, 0.08, 8]} />
          <meshStandardMaterial
            color="#47525E"
            roughness={0.86}
            metalness={0.04}
            bumpMap={textures.graniteBump}
            bumpScale={0.03}
            wireframe={wireframe}
          />
        </mesh>

        {/* Soft radial contact shadow anchoring lantern base to the granite slab */}
        {textures.contactShadowMap && !wireframe && (
          <mesh
            position={[0, groundedPositions.lanternPadTopY + 0.006, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            renderOrder={2}
          >
            <planeGeometry args={[0.88, 0.88]} />
            <meshBasicMaterial
              map={textures.contactShadowMap}
              transparent
              depthWrite={false}
              opacity={0.55}
            />
          </mesh>
        )}

        {/* Composite 10-Part Carved Granite Tōrō Stone Lantern */}
        <group
          name="granite-toro-lantern"
          position={[0, groundedPositions.lanternPadTopY, 0]}
          scale={[0.95, 0.95, 0.95]}
        >
          {/* Kiso (stepped hexagonal granite base) */}
          <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.33, 0.18, 6]} />
            <meshStandardMaterial
              color="#434E5B"
              roughness={0.92}
              bumpMap={textures.graniteBump}
              bumpScale={0.035}
              wireframe={wireframe}
            />
          </mesh>
          {/* Kaeribana (carved lotus collar transition) */}
          <mesh position={[0, 0.205, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.23, 0.07, 6]} />
            <meshStandardMaterial
              color="#4C5866"
              roughness={0.9}
              bumpMap={textures.graniteBump}
              bumpScale={0.03}
              wireframe={wireframe}
            />
          </mesh>
          {/* Sao (tapered stone vertical support shaft) */}
          <mesh position={[0, 0.56, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.098, 0.128, 0.66, 12]} />
            <meshStandardMaterial
              color="#4B5664"
              roughness={0.89}
              bumpMap={textures.graniteBump}
              bumpScale={0.035}
              wireframe={wireframe}
            />
          </mesh>
          {/* Fushi (subtle decorative central shaft ring) */}
          <mesh position={[0, 0.56, 0]}>
            <cylinderGeometry args={[0.124, 0.124, 0.045, 12]} />
            <meshStandardMaterial color="#3E4956" roughness={0.9} wireframe={wireframe} />
          </mesh>
          {/* Chūdai (flared hexagonal lotus platform supporting firebox) */}
          <mesh position={[0, 0.94, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.29, 0.155, 0.15, 6]} />
            <meshStandardMaterial
              color="#414D5A"
              roughness={0.9}
              bumpMap={textures.graniteBump}
              bumpScale={0.032}
              wireframe={wireframe}
            />
          </mesh>

          {/* Hibukuro (open light chamber with warm inner washi lantern core + 6 carved stone mullions) */}
          <mesh position={[0, 1.16, 0]}>
            <cylinderGeometry args={[0.132, 0.132, 0.28, 6]} />
            <meshStandardMaterial
              ref={lanternCoreMatRef}
              color="#FFE6BC"
              emissive="#F4BA6F"
              emissiveIntensity={1.45}
              roughness={0.38}
              wireframe={wireframe}
            />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const angle = (idx / 6) * Math.PI * 2 + Math.PI / 6;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * 0.165, 1.16, Math.sin(angle) * 0.165]}
                castShadow
              >
                <boxGeometry args={[0.038, 0.31, 0.038]} />
                <meshStandardMaterial
                  color="#384350"
                  roughness={0.92}
                  bumpMap={textures.graniteBump}
                  bumpScale={0.025}
                  wireframe={wireframe}
                />
              </mesh>
            );
          })}

          {/* Restrained warm candle halo sprite */}
          {lanternGlowTexture && !wireframe && (
            <mesh position={[0, 1.16, 0.24]} renderOrder={4}>
              <planeGeometry args={[1.38, 1.38]} />
              <meshBasicMaterial
                ref={lanternHaloMatRef}
                map={lanternGlowTexture}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.48}
              />
            </mesh>
          )}

          {/* Kasa (curved hexagonal stone umbrella roof with upturned corner scrolls) */}
          <mesh position={[0, 1.31, 0]} geometry={geometries.lanternRoof} castShadow receiveShadow>
            <meshStandardMaterial
              color="#394451"
              roughness={0.86}
              bumpMap={textures.graniteBump}
              bumpScale={0.035}
              wireframe={wireframe}
            />
          </mesh>
          {/* Hōju (lotus-bud granite finial) */}
          <mesh position={[0, 1.66, 0]} castShadow>
            <coneGeometry args={[0.072, 0.155, 6]} />
            <meshStandardMaterial
              color="#465260"
              roughness={0.85}
              bumpMap={textures.graniteBump}
              bumpScale={0.025}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
