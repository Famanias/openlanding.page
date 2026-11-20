'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  WATER_LEVEL,
  evaluateShorelineX,
  isClearOfArchitecture,
  sampleTerrainHeight,
} from '../../../lib/terrain';
import { sampleWindField } from '../../../lib/wind';
import { createSeededRandom } from '../../../lib/webgl-utils';
import type { ProceduralTextureSet } from '../../../lib/procedural-textures';
import type { WaterObstacleCircle } from '../../../lib/water-ripples';

export interface ShorelineTerrainLayerProps {
  enableMotion: boolean;
  wireframe: boolean;
  textures: ProceduralTextureSet;
  shoreObstaclesRef?: React.RefObject<WaterObstacleCircle[]>;
}

/**
 * Sculpted 3D shoreline & lakebed geometry with non-uniform grid spacing
 * (higher density along the irregular eastern shoreline, Torii headland,
 * and lantern promontory; expansive wings extending past all camera parallax bounds).
 */
function buildShorelineTerrainGeometry(): THREE.BufferGeometry {
  const segX = 88;
  const segZ = 56;
  const minX = -28;
  const maxX = 22;
  const minZ = -15.5;
  const maxZ = 8.5;

  const cols = segX + 1;
  const rows = segZ + 1;
  const count = cols * rows;

  const positions = new Float32Array(count * 3);
  const uvs = new Float32Array(count * 2);
  const colors = new Float32Array(count * 3);
  const indices: number[] = [];

  // Painterly muted Japanese stone/moss/gravel shoreline palette
  const deepBedCol = new THREE.Color('#14202D');
  const shallowPebbleCol = new THREE.Color('#2B3A45');
  const wetShoreCol = new THREE.Color('#232C36');
  const dryGravelCol = new THREE.Color('#444B50');
  const mossCol = new THREE.Color('#2E4239');
  const graniteOutcropCol = new THREE.Color('#3B444E');
  const tmpCol = new THREE.Color();

  // Nonlinear X mapping to pack extra resolution around x in [-1, 10]
  const mapX = (u: number): number => {
    // Smooth concentration near shoreline region u ≈ 0.56..0.82
    const linear = minX + u * (maxX - minX);
    const focus = 4.2;
    const pull = Math.sin((u - 0.64) * Math.PI) * 1.1;
    return THREE.MathUtils.clamp(linear - pull * 0.25, minX, maxX) * 0.92 + (minX + u * (maxX - minX)) * 0.08 + (focus - focus);
  };

  for (let iz = 0; iz < rows; iz++) {
    const v = iz / segZ;
    const z = minZ + v * (maxZ - minZ);
    for (let ix = 0; ix < cols; ix++) {
      const u = ix / segX;
      const x = mapX(u);
      const y = sampleTerrainHeight(x, z);
      const idx = iz * cols + ix;

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;

      uvs[idx * 2] = (x - minX) * 0.25;
      uvs[idx * 2 + 1] = (z - minZ) * 0.25;

      // Height- and organic-noise-driven terrain material blending
      const hAbove = y - WATER_LEVEL;
      const organicPatch =
        0.5 +
        0.5 *
          Math.sin(x * 1.35 + z * 1.15) *
          Math.cos(x * 0.72 - z * 1.48);

      if (hAbove < -0.35) {
        tmpCol.copy(deepBedCol).lerp(shallowPebbleCol, THREE.MathUtils.clamp((hAbove + 1.0) / 0.65, 0, 1));
      } else if (hAbove < 0.08) {
        // Darker moisture-wicked stone/gravel band hugging the waterline
        const t = THREE.MathUtils.clamp((hAbove + 0.35) / 0.43, 0, 1);
        tmpCol.copy(shallowPebbleCol).lerp(wetShoreCol, t);
        const wetBand = Math.exp(-Math.pow((hAbove - 0.01) / 0.09, 2));
        tmpCol.multiplyScalar(1 - wetBand * 0.28);
      } else if (hAbove < 0.28) {
        const t = THREE.MathUtils.clamp((hAbove - 0.08) / 0.2, 0, 1);
        tmpCol.copy(wetShoreCol).lerp(dryGravelCol, t * 0.86);
        tmpCol.lerp(mossCol, organicPatch * t * 0.48);
      } else {
        const t = THREE.MathUtils.clamp((hAbove - 0.26) / 0.52, 0, 1);
        tmpCol.copy(dryGravelCol).lerp(mossCol, 0.36 + organicPatch * 0.44);
        tmpCol.lerp(graniteOutcropCol, t * (1 - organicPatch * 0.55) * 0.65);
      }

      colors[idx * 3] = tmpCol.r;
      colors[idx * 3 + 1] = tmpCol.g;
      colors[idx * 3 + 2] = tmpCol.b;
    }
  }

  for (let iz = 0; iz < segZ; iz++) {
    for (let ix = 0; ix < segX; ix++) {
      const a = iz * cols + ix;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Create a smooth-sculpted weathered Japanese river boulder geometry (subdivision 2)
 * with organic strata contours and a grounded underside.
 */
function buildWeatheredRockGeometry(): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(0.42, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const n =
      1.0 +
      Math.sin(x * 5.1 + z * 3.8) * 0.1 +
      Math.cos(y * 6.2 - x * 4.4) * 0.075;
    const flatY = y < 0 ? y * 0.54 : y * 0.78;
    pos.setXYZ(i, x * n * 1.18, flatY * n, z * n * 0.94);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Create a low, irregular organic moss mantle that hugs the terrain slope naturally
 * instead of sitting like a thick smooth disc.
 */
function buildMossPatchGeometry(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(0.38, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.48);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const wobble = 1.0 + Math.sin(Math.atan2(z, x) * 3.0 + 0.7) * 0.18 + Math.cos(x * 7.5 + z * 6.2) * 0.1;
    pos.setXYZ(i, x * 1.25 * wobble, y * 0.11, z * 0.95 * wobble);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Slender arched lakeside reed blade geometry pivoted at its submerged root base.
 */
function buildReedBladeGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(-0.018, 0);
  shape.quadraticCurveTo(-0.014, 0.36, 0.025, 0.72);
  shape.quadraticCurveTo(0.008, 0.36, 0.018, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 5);
}

const _dummy = new THREE.Object3D();

export function ShorelineTerrainLayer({
  enableMotion,
  wireframe,
  textures,
  shoreObstaclesRef,
}: ShorelineTerrainLayerProps) {
  const rocksRef = useRef<THREE.InstancedMesh>(null);
  const pebblesRef = useRef<THREE.InstancedMesh>(null);
  const mossRef = useRef<THREE.InstancedMesh>(null);
  const reedsRef = useRef<THREE.InstancedMesh>(null);
  const simTimeRef = useRef(0);

  const geometries = useMemo(() => {
    return {
      terrain: buildShorelineTerrainGeometry(),
      rock: buildWeatheredRockGeometry(),
      pebble: new THREE.DodecahedronGeometry(0.11, 0),
      moss: buildMossPatchGeometry(),
      reed: buildReedBladeGeometry(),
    };
  }, []);

  // Deterministic grounded placement of shoreline rocks, pebbles, moss pads & reeds
  const propsData = useMemo(() => {
    const rng = createSeededRandom(61243);

    const rocks: Array<{
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
      sx: number;
      sy: number;
      sz: number;
      color: THREE.Color;
    }> = [];

    const rockPalette = [
      new THREE.Color('#2E3843'),
      new THREE.Color('#3B454F'),
      new THREE.Color('#475159'),
      new THREE.Color('#333F46'),
    ];

    // 1. Restrained natural boulders clustered along the waterline & right rocky bank
    for (let attempt = 0; attempt < 240 && rocks.length < 28; attempt++) {
      const z = -7.2 + rng() * 9.6;
      const shoreX = evaluateShorelineX(z);
      const offset = -0.3 + rng() * 4.4;
      const x = shoreX + offset;
      const scaleBase = 0.34 + rng() * 0.72;
      const approxRadius = 0.45 * scaleBase;

      if (!isClearOfArchitecture(x, z, approxRadius + 0.12)) continue;

      const groundY = sampleTerrainHeight(x, z);
      if (groundY < WATER_LEVEL - 0.14) continue;

      let overlaps = false;
      for (const existing of rocks) {
        if (Math.hypot(existing.x - x, existing.z - z) < (existing.sx + scaleBase) * 0.5) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;

      const sx = scaleBase * (0.88 + rng() * 0.42);
      const sy = scaleBase * (0.36 + rng() * 0.34);
      const sz = scaleBase * (0.82 + rng() * 0.4);

      rocks.push({
        x,
        y: groundY + sy * 0.1 - 0.08,
        z,
        rx: (rng() - 0.5) * 0.18,
        ry: rng() * Math.PI * 2,
        rz: (rng() - 0.5) * 0.18,
        sx,
        sy,
        sz,
        color: rockPalette[Math.floor(rng() * rockPalette.length)].clone(),
      });
    }

    // 2. Fine shoreline gravel pebbles scattered along the damp bank & shallow edge
    const pebbles: Array<{
      x: number;
      y: number;
      z: number;
      rotY: number;
      sx: number;
      sy: number;
      sz: number;
      color: THREE.Color;
    }> = [];
    for (let attempt = 0; attempt < 220 && pebbles.length < 56; attempt++) {
      const z = -6.8 + rng() * 9.2;
      const shoreX = evaluateShorelineX(z);
      const x = shoreX + (rng() - 0.28) * 2.6;
      if (!isClearOfArchitecture(x, z, 0.18)) continue;
      const groundY = sampleTerrainHeight(x, z);
      if (groundY < WATER_LEVEL - 0.1 || groundY > WATER_LEVEL + 0.58) continue;

      const s = 0.48 + rng() * 0.85;
      pebbles.push({
        x,
        y: groundY + 0.008,
        z,
        rotY: rng() * Math.PI * 2,
        sx: s * (0.9 + rng() * 0.45),
        sy: s * 0.36,
        sz: s * (0.85 + rng() * 0.4),
        color: rockPalette[Math.floor(rng() * rockPalette.length)]
          .clone()
          .offsetHSL(0, 0, (rng() - 0.5) * 0.05),
      });
    }

    // 3. Subtle low-profile moss patches hugging dry earth & rock crevices
    const mosses: Array<{
      x: number;
      y: number;
      z: number;
      rotY: number;
      sx: number;
      sy: number;
      sz: number;
      color: THREE.Color;
    }> = [];
    const mossPalette = [
      new THREE.Color('#273A32'),
      new THREE.Color('#2E4237'),
      new THREE.Color('#24342E'),
    ];
    for (let attempt = 0; attempt < 150 && mosses.length < 16; attempt++) {
      const z = -6.2 + rng() * 8.4;
      const shoreX = evaluateShorelineX(z);
      const x = shoreX + 0.42 + rng() * 4.0;
      if (!isClearOfArchitecture(x, z, 0.38)) continue;
      const groundY = sampleTerrainHeight(x, z);
      if (groundY < WATER_LEVEL + 0.12) continue;

      const s = 0.55 + rng() * 0.72;
      mosses.push({
        x,
        y: groundY - 0.005,
        z,
        rotY: rng() * Math.PI * 2,
        sx: s * (0.9 + rng() * 0.4),
        sy: 0.7 + rng() * 0.4,
        sz: s * (0.85 + rng() * 0.35),
        color: mossPalette[Math.floor(rng() * mossPalette.length)].clone(),
      });
    }

    // 4. Subtle clusters of lakeside reeds anchored in the shallow right cove & far-right margin
    const reeds: Array<{
      x: number;
      y: number;
      z: number;
      baseRotY: number;
      baseLeanZ: number;
      scaleY: number;
      phase: number;
      color: THREE.Color;
    }> = [];
    const reedClusters = [
      { cx: 4.15, cz: -3.55, count: 14 },
      { cx: 5.55, cz: -0.95, count: 16 },
      { cx: 3.45, cz: -6.45, count: 12 },
    ];
    const reedPalette = [
      new THREE.Color('#253A36'),
      new THREE.Color('#2F453E'),
      new THREE.Color('#3C4D41'),
    ];
    reedClusters.forEach((cluster) => {
      for (let i = 0; i < cluster.count; i++) {
        const angle = rng() * Math.PI * 2;
        const rad = rng() * 0.55;
        const x = cluster.cx + Math.cos(angle) * rad;
        const z = cluster.cz + Math.sin(angle) * rad;
        if (!isClearOfArchitecture(x, z, 0.14)) continue;
        const groundY = sampleTerrainHeight(x, z);
        if (groundY < WATER_LEVEL - 0.25 || groundY > WATER_LEVEL + 0.24) continue;
        reeds.push({
          x,
          y: groundY - 0.02,
          z,
          baseRotY: rng() * Math.PI * 2,
          baseLeanZ: (rng() - 0.5) * 0.22,
          scaleY: 0.65 + rng() * 0.65,
          phase: rng() * Math.PI * 2,
          color: reedPalette[Math.floor(rng() * reedPalette.length)].clone(),
        });
      }
    });

    return { rocks, pebbles, mosses, reeds };
  }, []);

  // Populate static instanced meshes once
  useEffect(() => {
    if (rocksRef.current) {
      propsData.rocks.forEach((r, i) => {
        _dummy.position.set(r.x, r.y, r.z);
        _dummy.rotation.set(r.rx, r.ry, r.rz);
        _dummy.scale.set(r.sx, r.sy, r.sz);
        _dummy.updateMatrix();
        rocksRef.current!.setMatrixAt(i, _dummy.matrix);
        rocksRef.current!.setColorAt(i, r.color);
      });
      rocksRef.current.instanceMatrix.needsUpdate = true;
      if (rocksRef.current.instanceColor) rocksRef.current.instanceColor.needsUpdate = true;
      rocksRef.current.computeBoundingSphere();
    }

    // Export protruding waterline boulders so WaterReflectionLayer adds local wet-edge & lapping disturbance
    if (shoreObstaclesRef) {
      const edgeRocks: WaterObstacleCircle[] = [];
      for (const r of propsData.rocks) {
        const groundY = sampleTerrainHeight(r.x, r.z);
        if (groundY >= WATER_LEVEL - 0.16 && groundY <= WATER_LEVEL + 0.18) {
          edgeRocks.push({
            x: r.x,
            z: r.z,
            radius: Math.max(r.sx, r.sz) * 0.44,
          });
          if (edgeRocks.length >= 6) break;
        }
      }
      shoreObstaclesRef.current = edgeRocks;
    }

    if (pebblesRef.current) {
      propsData.pebbles.forEach((p, i) => {
        _dummy.position.set(p.x, p.y, p.z);
        _dummy.rotation.set(0, p.rotY, 0);
        _dummy.scale.set(p.sx, p.sy, p.sz);
        _dummy.updateMatrix();
        pebblesRef.current!.setMatrixAt(i, _dummy.matrix);
        pebblesRef.current!.setColorAt(i, p.color);
      });
      pebblesRef.current.instanceMatrix.needsUpdate = true;
      if (pebblesRef.current.instanceColor) pebblesRef.current.instanceColor.needsUpdate = true;
      pebblesRef.current.computeBoundingSphere();
    }

    if (mossRef.current) {
      propsData.mosses.forEach((m, i) => {
        _dummy.position.set(m.x, m.y, m.z);
        _dummy.rotation.set(0, m.rotY, 0);
        _dummy.scale.set(m.sx, m.sy, m.sz);
        _dummy.updateMatrix();
        mossRef.current!.setMatrixAt(i, _dummy.matrix);
        mossRef.current!.setColorAt(i, m.color);
      });
      mossRef.current.instanceMatrix.needsUpdate = true;
      if (mossRef.current.instanceColor) mossRef.current.instanceColor.needsUpdate = true;
      mossRef.current.computeBoundingSphere();
    }

    if (reedsRef.current) {
      propsData.reeds.forEach((rd, i) => {
        _dummy.position.set(rd.x, rd.y, rd.z);
        _dummy.rotation.set(0, rd.baseRotY, rd.baseLeanZ);
        _dummy.scale.set(1, rd.scaleY, 1);
        _dummy.updateMatrix();
        reedsRef.current!.setMatrixAt(i, _dummy.matrix);
        reedsRef.current!.setColorAt(i, rd.color);
      });
      reedsRef.current.instanceMatrix.needsUpdate = true;
      if (reedsRef.current.instanceColor) reedsRef.current.instanceColor.needsUpdate = true;
      reedsRef.current.computeBoundingSphere();
    }
  }, [propsData, shoreObstaclesRef]);

  useEffect(() => {
    return () => {
      geometries.terrain.dispose();
      geometries.rock.dispose();
      geometries.pebble.dispose();
      geometries.moss.dispose();
      geometries.reed.dispose();
    };
  }, [geometries]);

  // Animate shoreline reeds softly in sync with the shared wind field
  useFrame((_, delta) => {
    if (!enableMotion || !reedsRef.current || propsData.reeds.length === 0) return;
    simTimeRef.current += Math.min(delta, 0.1);
    const t = simTimeRef.current;

    for (let i = 0; i < propsData.reeds.length; i++) {
      const rd = propsData.reeds[i];
      const wind = sampleWindField(t, rd.x, rd.y, rd.z);
      const sway =
        0.06 +
        wind.gust * 0.14 +
        Math.sin(t * 1.9 + rd.phase) * (0.065 + wind.gust * 0.06);
      _dummy.position.set(rd.x, rd.y, rd.z);
      _dummy.rotation.set(wind.vz * 0.12, rd.baseRotY, rd.baseLeanZ + sway);
      _dummy.scale.set(1, rd.scaleY, 1);
      _dummy.updateMatrix();
      reedsRef.current.setMatrixAt(i, _dummy.matrix);
    }
    reedsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group name="shoreline-terrain-layer">
      {/* Continuous sculpted 3D lakebed, shallow shelf & eastern shoreline terrain */}
      <mesh
        name="sculpted-shoreline-terrain"
        geometry={geometries.terrain}
        receiveShadow
      >
        <meshStandardMaterial
          vertexColors
          roughness={0.91}
          metalness={0.02}
          bumpMap={textures.graniteBump}
          bumpScale={0.035}
          wireframe={wireframe}
        />
      </mesh>

      {/* Grounded weathered shoreline boulders */}
      {propsData.rocks.length > 0 && (
        <instancedMesh
          ref={rocksRef}
          name="shoreline-boulders"
          args={[geometries.rock, undefined, propsData.rocks.length]}
          castShadow
          receiveShadow
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.9}
            metalness={0.04}
            bumpMap={textures.graniteBump}
            bumpScale={0.045}
            wireframe={wireframe}
          />
        </instancedMesh>
      )}

      {/* Fine shoreline gravel & pebbles */}
      {propsData.pebbles.length > 0 && (
        <instancedMesh
          ref={pebblesRef}
          name="shoreline-pebbles"
          args={[geometries.pebble, undefined, propsData.pebbles.length]}
          receiveShadow
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.78}
            metalness={0.05}
            wireframe={wireframe}
          />
        </instancedMesh>
      )}

      {/* Organic moss cushions on dry rocky banks */}
      {propsData.mosses.length > 0 && (
        <instancedMesh
          ref={mossRef}
          name="shoreline-moss-patches"
          args={[geometries.moss, undefined, propsData.mosses.length]}
          receiveShadow
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.96}
            metalness={0.0}
            wireframe={wireframe}
          />
        </instancedMesh>
      )}

      {/* Subtle lakeside reeds swaying with the shared environmental breeze */}
      {propsData.reeds.length > 0 && (
        <instancedMesh
          ref={reedsRef}
          name="shoreline-reeds"
          args={[geometries.reed, undefined, propsData.reeds.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.86}
            metalness={0.0}
            side={THREE.DoubleSide}
            wireframe={wireframe}
          />
        </instancedMesh>
      )}
    </group>
  );
}
