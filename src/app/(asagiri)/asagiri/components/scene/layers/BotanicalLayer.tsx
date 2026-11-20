'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createSeededRandom } from '../../../lib/webgl-utils';
import type { DayNightPalette } from '../../../lib/day-night-cycle';
import type { ProceduralTextureSet } from '../../../lib/procedural-textures';
import { SAKURA_TRUNK_ANCHOR, sampleTerrainHeight } from '../../../lib/terrain';
import { computeBranchWindSway, sampleWindField } from '../../../lib/wind';
import type { BlossomEmitter } from '../../../lib/petal-sim';

export interface BotanicalLayerProps {
  enableMotion: boolean;
  wireframe: boolean;
  cyclePaletteRef: React.RefObject<DayNightPalette>;
  textures: ProceduralTextureSet;
  blossomEmittersRef: React.RefObject<BlossomEmitter[]>;
}

/**
 * Build a custom tapered organic branch BufferGeometry along a 3D CatmullRomCurve3.
 * Radius tapers gracefully from rStart to rEnd with natural subtle gnarl so trunks,
 * primary boughs, secondary branches, and thin twigs read as a true living Japanese sakura tree.
 */
function buildTaperedBranchGeometry(
  curve: THREE.CatmullRomCurve3,
  tubularSegments: number,
  radialSegments: number,
  rStart: number,
  rEnd: number,
  gnarlAmp = 0.04,
  seed = 1.0
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const ringVerts = radialSegments + 1;
  const vertCount = (tubularSegments + 1) * ringVerts;

  const positions = new Float32Array(vertCount * 3);
  const normals = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);
  const indices: number[] = [];

  const pt = new THREE.Vector3();
  const normalVec = new THREE.Vector3();

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    curve.getPointAt(t, pt);

    const N = frames.normals[i];
    const B = frames.binormals[i];
    // Natural organic taper (slightly flared root/collar at base, graceful taper toward tip)
    const baseRadius = THREE.MathUtils.lerp(rStart, rEnd, Math.pow(t, 0.78));
    const rootFlare = t < 0.16 ? Math.pow(1 - t / 0.16, 2) * rStart * 0.22 : 0;
    const radius = baseRadius + rootFlare;

    for (let j = 0; j <= radialSegments; j++) {
      const u = j / radialSegments;
      const theta = u * Math.PI * 2;
      const sin = Math.sin(theta);
      const cos = -Math.cos(theta);

      const gnarl = 1 + Math.sin(theta * 3 + t * 9.0 + seed) * gnarlAmp;
      const rLocal = radius * gnarl;

      normalVec.x = cos * N.x + sin * B.x;
      normalVec.y = cos * N.y + sin * B.y;
      normalVec.z = cos * N.z + sin * B.z;
      normalVec.normalize();

      const idx = i * ringVerts + j;
      positions[idx * 3] = pt.x + rLocal * normalVec.x;
      positions[idx * 3 + 1] = pt.y + rLocal * normalVec.y;
      positions[idx * 3 + 2] = pt.z + rLocal * normalVec.z;

      normals[idx * 3] = normalVec.x;
      normals[idx * 3 + 1] = normalVec.y;
      normals[idx * 3 + 2] = normalVec.z;

      uvs[idx * 2] = u;
      uvs[idx * 2 + 1] = t * 2.5;
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * ringVerts + j;
      const b = (i + 1) * ringVerts + j;
      const c = (i + 1) * ringVerts + (j + 1);
      const d = i * ringVerts + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

/**
 * Create a sculpted 3D sakura blossom floret geometry (5 gently cupped notched petals)
 * that reads gracefully from any camera angle and parallax shift.
 */
function buildSakuraFloretGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const petals = 5;
  for (let i = 0; i < petals; i++) {
    const a0 = (i / petals) * Math.PI * 2;
    const aMid = ((i + 0.5) / petals) * Math.PI * 2;
    const a1 = ((i + 1) / petals) * Math.PI * 2;
    const rOuter = 0.145;
    const rInner = 0.048;

    const sx = Math.cos(a0) * rInner;
    const sy = Math.sin(a0) * rInner;
    if (i === 0) shape.moveTo(sx, sy);

    shape.quadraticCurveTo(
      Math.cos(a0 + 0.28) * rOuter,
      Math.sin(a0 + 0.28) * rOuter,
      Math.cos(aMid) * (rOuter * 0.92),
      Math.sin(aMid) * (rOuter * 0.92)
    );
    shape.quadraticCurveTo(
      Math.cos(a1 - 0.28) * rOuter,
      Math.sin(a1 - 0.28) * rOuter,
      Math.cos(a1) * rInner,
      Math.sin(a1) * rInner
    );
  }
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape, 4);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Subtle 3D floral cup curvature
    pos.setZ(i, (x * x + y * y) * 1.65);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Slender tapering bamboo leaf geometry.
 */
function buildBambooLeafGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.055, 0.18, 0.015, 0.44);
  shape.quadraticCurveTo(-0.045, 0.2, 0, 0);
  return new THREE.ShapeGeometry(shape, 5);
}

interface BlossomTransform {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  scale: number;
  color: THREE.Color;
}

interface TwigSpec {
  id: string;
  pivot: [number, number, number];
  phase: number;
  geometry: THREE.BufferGeometry;
  blossoms: BlossomTransform[];
  emitterLocalPos: THREE.Vector3;
}

interface SecondaryBranchSpec {
  id: string;
  pivot: [number, number, number];
  phase: number;
  geometry: THREE.BufferGeometry;
  blossoms: BlossomTransform[];
  twigs: TwigSpec[];
}

interface PrimaryBranchSpec {
  id: string;
  pivot: [number, number, number];
  phase: number;
  geometry: THREE.BufferGeometry;
  secondaryBranches: SecondaryBranchSpec[];
}

/**
 * Populate an organic multi-floret blossom spray clustered naturally around a branch/twig tip.
 */
function sampleClusterBlossoms(
  curve: THREE.CatmullRomCurve3,
  count: number,
  tStart: number,
  spread: number,
  rng: () => number,
  palette: THREE.Color[]
): BlossomTransform[] {
  const list: BlossomTransform[] = [];
  for (let i = 0; i < count; i++) {
    // Organic clumping toward middle/outer portions of the twig rather than uniform spacing
    const u = Math.pow(rng(), 0.78);
    const t = THREE.MathUtils.clamp(tStart + u * (1.0 - tStart), 0.15, 1.0);
    const base = curve.getPoint(t);
    const radial = spread * (0.45 + rng() * 0.85);
    const angle = rng() * Math.PI * 2;
    const zOff = (rng() - 0.5) * spread * 1.15;

    list.push({
      pos: new THREE.Vector3(
        base.x + Math.cos(angle) * radial,
        base.y + Math.sin(angle) * radial * 0.78,
        base.z + zOff
      ),
      rot: new THREE.Euler(
        (rng() - 0.5) * 1.15,
        (rng() - 0.5) * 1.15,
        rng() * Math.PI * 2
      ),
      scale: 0.75 + rng() * 0.92,
      color: palette[Math.floor(rng() * palette.length)].clone(),
    });
  }
  return list;
}

/**
 * Helper component that renders an InstancedMesh of blossoms strictly inside its parent branch group
 * so every cluster moves seamlessly with hierarchical branch wind animation.
 */
function BranchBlossomInstances({
  blossoms,
  geometry,
  material,
}: {
  blossoms: BlossomTransform[];
  geometry: THREE.BufferGeometry;
  material: THREE.MeshStandardMaterial;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < blossoms.length; i++) {
      const b = blossoms[i];
      dummy.position.copy(b.pos);
      dummy.rotation.copy(b.rot);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, b.color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [blossoms]);

  if (blossoms.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, blossoms.length]}
      frustumCulled={false}
    />
  );
}

const _worldPosTmp = new THREE.Vector3();

export function BotanicalLayer({
  enableMotion,
  wireframe,
  cyclePaletteRef,
  textures,
  blossomEmittersRef,
}: BotanicalLayerProps) {
  const trunkGroupRef = useRef<THREE.Group>(null);
  const primaryRefs = useRef<(THREE.Group | null)[]>([]);
  const secondaryRefs = useRef<Record<string, THREE.Group | null>>({});
  const twigRefs = useRef<Record<string, THREE.Group | null>>({});
  const bambooGroupRef = useRef<THREE.Group>(null);
  const bambooLeavesRef = useRef<THREE.InstancedMesh>(null);
  const simTimeRef = useRef(0);

  // Grounded elevation on dry eastern embankment for the sakura trunk and bamboo grove
  const anchors = useMemo(() => {
    const trunkGroundY = sampleTerrainHeight(SAKURA_TRUNK_ANCHOR.x, SAKURA_TRUNK_ANCHOR.z);
    const bambooX = 6.95;
    const bambooZ = -2.35;
    const bambooGroundY = sampleTerrainHeight(bambooX, bambooZ);
    return {
      trunkX: SAKURA_TRUNK_ANCHOR.x,
      trunkY: trunkGroundY - 0.32,
      trunkZ: SAKURA_TRUNK_ANCHOR.z,
      bambooX,
      bambooY: bambooGroundY - 0.16,
      bambooZ,
    };
  }, []);

  // Shared blossom geometry and shared materials (minimal draw calls & clean lifecycle)
  const floretGeo = useMemo(() => buildSakuraFloretGeometry(), []);
  const bambooLeafGeo = useMemo(() => buildBambooLeafGeometry(), []);

  const barkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A252B',
        roughness: 0.92,
        metalness: 0.02,
        bumpMap: textures.barkBump,
        bumpScale: 0.032,
      }),
    [textures.barkBump]
  );

  const blossomMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: new THREE.Color('#E9C8D0'),
        emissiveIntensity: 0.44,
        roughness: 0.68,
        metalness: 0.0,
        transparent: true,
        opacity: 0.94,
        side: THREE.DoubleSide,
        fog: false,
      }),
    []
  );

  const barkMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const blossomMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    barkMaterialRef.current = barkMaterial;
    blossomMaterialRef.current = blossomMaterial;
    if (barkMaterialRef.current) {
      barkMaterialRef.current.wireframe = wireframe;
    }
    if (blossomMaterialRef.current) {
      blossomMaterialRef.current.wireframe = wireframe;
    }
  }, [wireframe, barkMaterial, blossomMaterial]);

  // Build complete 4-level hierarchical sakura tree rooted on dry right embankment
  // and curving gracefully across the upper-right frame
  const treeHierarchy = useMemo(() => {
    const rng = createSeededRandom(202607);
    const blossomPalette = [
      new THREE.Color('#FAF0F2'),
      new THREE.Color('#F6DFE4'),
      new THREE.Color('#EFCAD4'),
      new THREE.Color('#E6B6C4'),
      new THREE.Color('#FDEFF0'),
    ];

    // Level 0: Gnarled, leaning sakura main trunk rooted firmly into dry terrain
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, 0.0, 0.0),
      new THREE.Vector3(-0.16, 1.35, 0.06),
      new THREE.Vector3(-0.4, 2.65, 0.1),
      new THREE.Vector3(-0.82, 3.95, 0.04),
      new THREE.Vector3(-1.42, 4.95, -0.05),
    ]);
    const trunkGeo = buildTaperedBranchGeometry(trunkCurve, 24, 10, 0.36, 0.145, 0.06, 1.3);

    // Flared surface root buttresses descending deeply into the dry right soil bank
    const rootCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.12, 0.72, 0.04),
        new THREE.Vector3(-0.5, 0.25, 0.22),
        new THREE.Vector3(-0.98, -0.25, 0.32),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.05, 0.65, -0.1),
        new THREE.Vector3(-0.24, 0.2, -0.45),
        new THREE.Vector3(-0.6, -0.28, -0.78),
      ]),
    ];
    const rootGeos = rootCurves.map((c, idx) =>
      buildTaperedBranchGeometry(c, 10, 7, 0.17, 0.05, 0.05, idx + 4.2)
    );

    // Level 1: Three graceful primary boughs extending leftward into the upper-right sky
    const primaryConfigs = [
      {
        // Main sweeping hero bough framing gracefully above the dawn sun
        id: 'primary-hero',
        tOnTrunk: 0.86,
        phase: 0.35,
        rStart: 0.135,
        rEnd: 0.042,
        points: [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-1.15, 0.38, 0.16),
          new THREE.Vector3(-2.35, 0.3, 0.24),
          new THREE.Vector3(-3.45, 0.05, 0.18),
          new THREE.Vector3(-4.25, -0.08, 0.08),
        ],
        secondaries: [
          {
            t: 0.26,
            phase: 1.1,
            rStart: 0.068,
            rEnd: 0.02,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.55, 0.44, 0.14),
              new THREE.Vector3(-1.25, 0.62, 0.18),
              new THREE.Vector3(-1.82, 0.54, 0.1),
            ],
            twigs: [
              {
                t: 0.45,
                phase: 2.2,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.28, 0.24, 0.08),
                  new THREE.Vector3(-0.58, 0.32, 0.05),
                ],
              },
              {
                t: 0.82,
                phase: 3.7,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.34, -0.08, 0.1),
                  new THREE.Vector3(-0.68, -0.14, 0.04),
                ],
              },
            ],
          },
          {
            t: 0.54,
            phase: 2.35,
            rStart: 0.056,
            rEnd: 0.017,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.46, -0.38, 0.16),
              new THREE.Vector3(-1.02, -0.66, 0.12),
              new THREE.Vector3(-1.5, -0.78, 0.04),
            ],
            twigs: [
              {
                t: 0.52,
                phase: 0.9,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.32, -0.18, 0.1),
                  new THREE.Vector3(-0.62, -0.26, 0.06),
                ],
              },
              {
                t: 0.88,
                phase: 4.1,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.3, -0.12, -0.06),
                  new THREE.Vector3(-0.56, -0.22, -0.08),
                ],
              },
            ],
          },
          {
            t: 0.78,
            phase: 3.4,
            rStart: 0.044,
            rEnd: 0.014,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.44, 0.22, 0.08),
              new THREE.Vector3(-0.98, 0.26, 0.02),
            ],
            twigs: [
              {
                t: 0.65,
                phase: 1.75,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.34, 0.14, 0.06),
                  new THREE.Vector3(-0.62, 0.12, 0.03),
                ],
              },
              {
                t: 0.95,
                phase: 5.0,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.32, -0.09, 0.05),
                  new THREE.Vector3(-0.58, -0.16, 0.01),
                ],
              },
            ],
          },
        ],
      },
      {
        // Upper canopy crown bough sweeping gently across top-right corner
        id: 'primary-crown',
        tOnTrunk: 0.98,
        phase: 1.6,
        rStart: 0.115,
        rEnd: 0.032,
        points: [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-0.85, 0.56, -0.06),
          new THREE.Vector3(-1.95, 0.74, -0.08),
          new THREE.Vector3(-2.95, 0.62, -0.12),
        ],
        secondaries: [
          {
            t: 0.35,
            phase: 0.55,
            rStart: 0.054,
            rEnd: 0.016,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.45, 0.36, 0.08),
              new THREE.Vector3(-1.05, 0.48, 0.1),
            ],
            twigs: [
              {
                t: 0.7,
                phase: 2.9,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.34, 0.18, 0.06),
                  new THREE.Vector3(-0.64, 0.22, 0.04),
                ],
              },
            ],
          },
          {
            t: 0.72,
            phase: 2.85,
            rStart: 0.046,
            rEnd: 0.014,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.52, -0.12, 0.12),
              new THREE.Vector3(-1.12, -0.26, 0.14),
            ],
            twigs: [
              {
                t: 0.6,
                phase: 4.4,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.32, -0.14, 0.08),
                  new THREE.Vector3(-0.62, -0.22, 0.04),
                ],
              },
              {
                t: 0.92,
                phase: 1.2,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.28, 0.08, -0.04),
                  new THREE.Vector3(-0.54, 0.06, -0.06),
                ],
              },
            ],
          },
        ],
      },
      {
        // Lower graceful foreground-right draping bough framing above the lantern
        id: 'primary-lower',
        tOnTrunk: 0.66,
        phase: 2.9,
        rStart: 0.095,
        rEnd: 0.026,
        points: [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-0.82, 0.12, 0.22),
          new THREE.Vector3(-1.68, -0.16, 0.28),
          new THREE.Vector3(-2.38, -0.48, 0.22),
        ],
        secondaries: [
          {
            t: 0.42,
            phase: 1.85,
            rStart: 0.048,
            rEnd: 0.014,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.42, -0.22, 0.16),
              new THREE.Vector3(-0.88, -0.44, 0.14),
            ],
            twigs: [
              {
                t: 0.72,
                phase: 3.1,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.28, -0.16, 0.08),
                  new THREE.Vector3(-0.52, -0.26, 0.04),
                ],
              },
            ],
          },
          {
            t: 0.78,
            phase: 4.2,
            rStart: 0.038,
            rEnd: 0.012,
            pts: [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(-0.44, 0.08, 0.08),
              new THREE.Vector3(-0.88, -0.04, 0.04),
            ],
            twigs: [
              {
                t: 0.75,
                phase: 0.7,
                pts: [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(-0.28, -0.12, 0.06),
                  new THREE.Vector3(-0.54, -0.2, 0.02),
                ],
              },
            ],
          },
        ],
      },
    ];

    const primaryBranches: PrimaryBranchSpec[] = primaryConfigs.map((pCfg, pIdx) => {
      const attachPt = trunkCurve.getPoint(pCfg.tOnTrunk);
      const pCurve = new THREE.CatmullRomCurve3(pCfg.points);
      const pGeo = buildTaperedBranchGeometry(
        pCurve,
        20,
        8,
        pCfg.rStart,
        pCfg.rEnd,
        0.05,
        pIdx * 3.1 + 2.0
      );

      const secondaryBranches: SecondaryBranchSpec[] = pCfg.secondaries.map((sCfg, sIdx) => {
        const sAttach = pCurve.getPoint(sCfg.t);
        const sCurve = new THREE.CatmullRomCurve3(sCfg.pts);
        const sGeo = buildTaperedBranchGeometry(
          sCurve,
          14,
          7,
          sCfg.rStart,
          sCfg.rEnd,
          0.04,
          pIdx * 7 + sIdx * 2.3
        );
        const secBlossoms = sampleClusterBlossoms(sCurve, 12, 0.28, 0.28, rng, blossomPalette);

        const twigs: TwigSpec[] = sCfg.twigs.map((tCfg, tIdx) => {
          const tAttach = sCurve.getPoint(tCfg.t);
          const tCurve = new THREE.CatmullRomCurve3(tCfg.pts);
          const tGeo = buildTaperedBranchGeometry(
            tCurve,
            8,
            5,
            sCfg.rEnd * 0.95,
            0.007,
            0.03,
            pIdx * 11 + sIdx * 5 + tIdx
          );
          const twigBlossoms = sampleClusterBlossoms(tCurve, 15, 0.18, 0.26, rng, blossomPalette);
          const tip = tCurve.getPoint(0.85);
          return {
            id: `${pCfg.id}-s${sIdx}-t${tIdx}`,
            pivot: [tAttach.x, tAttach.y, tAttach.z],
            phase: tCfg.phase,
            geometry: tGeo,
            blossoms: twigBlossoms,
            emitterLocalPos: tip,
          };
        });

        return {
          id: `${pCfg.id}-s${sIdx}`,
          pivot: [sAttach.x, sAttach.y, sAttach.z],
          phase: sCfg.phase,
          geometry: sGeo,
          blossoms: secBlossoms,
          twigs,
        };
      });

      return {
        id: pCfg.id,
        pivot: [attachPt.x, attachPt.y, attachPt.z],
        phase: pCfg.phase,
        geometry: pGeo,
        secondaryBranches,
      };
    });

    return { trunkGeo, rootGeos, primaryBranches };
  }, []);

  // Grounded bamboo culms rooted cleanly on the far-right dry embankment
  const bambooData = useMemo(() => {
    const culmSpecs = [
      {
        pts: [
          new THREE.Vector3(0.0, 0.0, 0),
          new THREE.Vector3(-0.08, 1.05, 0.04),
          new THREE.Vector3(-0.24, 2.2, 0.05),
          new THREE.Vector3(-0.48, 3.25, 0.02),
        ],
        radius: 0.025,
      },
      {
        pts: [
          new THREE.Vector3(0.38, 0.0, -0.14),
          new THREE.Vector3(0.32, 1.15, -0.1),
          new THREE.Vector3(0.18, 2.35, -0.08),
          new THREE.Vector3(-0.04, 3.45, -0.05),
        ],
        radius: 0.021,
      },
    ];

    const rng = createSeededRandom(5512);
    const curves = culmSpecs.map((c) => new THREE.CatmullRomCurve3(c.pts));
    const geos = curves.map((curve, i) =>
      buildTaperedBranchGeometry(curve, 16, 7, culmSpecs[i].radius, culmSpecs[i].radius * 0.45, 0.02, i + 1)
    );

    const leaves: Array<{ pos: THREE.Vector3; rot: THREE.Euler; scale: number }> = [];
    curves.forEach((curve) => {
      for (let n = 0; n < 10; n++) {
        const t = 0.36 + (n / 10) * 0.6;
        const pt = curve.getPoint(t);
        const side = n % 2 === 0 ? 1 : -1;
        leaves.push({
          pos: pt.clone(),
          rot: new THREE.Euler(
            (rng() - 0.5) * 0.25,
            (rng() - 0.5) * 0.35,
            side * (1.2 + rng() * 0.65)
          ),
          scale: 0.68 + rng() * 0.5,
        });
      }
    });

    return { geos, leaves };
  }, []);

  useEffect(() => {
    const mesh = bambooLeavesRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    bambooData.leaves.forEach((l, i) => {
      dummy.position.copy(l.pos);
      dummy.rotation.copy(l.rot);
      dummy.scale.setScalar(l.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [bambooData]);

  // Dispose all procedural geometries & materials cleanly on unmount
  useEffect(() => {
    return () => {
      treeHierarchy.trunkGeo.dispose();
      treeHierarchy.rootGeos.forEach((g) => g.dispose());
      treeHierarchy.primaryBranches.forEach((p) => {
        p.geometry.dispose();
        p.secondaryBranches.forEach((s) => {
          s.geometry.dispose();
          s.twigs.forEach((t) => t.geometry.dispose());
        });
      });
      bambooData.geos.forEach((g) => g.dispose());
      floretGeo.dispose();
      bambooLeafGeo.dispose();
      barkMaterial.dispose();
      blossomMaterial.dispose();
    };
  }, [treeHierarchy, bambooData, floretGeo, bambooLeafGeo, barkMaterial, blossomMaterial]);

  // Hierarchical multi-frequency procedural wind animation + live blossom emitter updates
  useFrame((_, delta) => {
    const safeDt = Math.min(delta, 0.1);
    if (enableMotion) {
      simTimeRef.current += safeDt;
    }
    const t = simTimeRef.current;

    // Level 0: Rooted main trunk sways very slightly (~0.25–0.55 deg)
    if (trunkGroupRef.current) {
      const s = enableMotion ? computeBranchWindSway('trunk', t, 0.2, anchors.trunkX) : { rotX: 0, rotY: 0, rotZ: 0 };
      trunkGroupRef.current.rotation.set(s.rotX, s.rotY, s.rotZ);
    }

    // Level 1 -> Level 2 -> Level 3: Independent phased sway propagating down the hierarchy
    let emitterCursor = 0;
    const emitterArray = blossomEmittersRef.current;

    treeHierarchy.primaryBranches.forEach((pBranch, pIdx) => {
      const pNode = primaryRefs.current[pIdx];
      if (pNode) {
        const ps = enableMotion
          ? computeBranchWindSway('primary', t, pBranch.phase, anchors.trunkX - 1.5)
          : { rotX: 0, rotY: 0, rotZ: 0 };
        pNode.rotation.set(ps.rotX, ps.rotY, ps.rotZ);
      }

      pBranch.secondaryBranches.forEach((sBranch) => {
        const sNode = secondaryRefs.current[sBranch.id];
        if (sNode) {
          const ss = enableMotion
            ? computeBranchWindSway('secondary', t, sBranch.phase, anchors.trunkX - 2.6)
            : { rotX: 0, rotY: 0, rotZ: 0 };
          sNode.rotation.set(ss.rotX, ss.rotY, ss.rotZ);
        }

        sBranch.twigs.forEach((twig) => {
          const tNode = twigRefs.current[twig.id];
          if (tNode) {
            const ts = enableMotion
              ? computeBranchWindSway('twig', t, twig.phase, anchors.trunkX - 3.4)
              : { rotX: 0, rotY: 0, rotZ: 0 };
            tNode.rotation.set(ts.rotX, ts.rotY, ts.rotZ);

            // Export live world-space blossom cluster positions for falling petal detachment
            if (emitterArray) {
              tNode.updateWorldMatrix(true, false);
              _worldPosTmp.copy(twig.emitterLocalPos).applyMatrix4(tNode.matrixWorld);
              if (emitterArray[emitterCursor]) {
                emitterArray[emitterCursor].x = _worldPosTmp.x;
                emitterArray[emitterCursor].y = _worldPosTmp.y;
                emitterArray[emitterCursor].z = _worldPosTmp.z;
              } else {
                emitterArray.push({
                  x: _worldPosTmp.x,
                  y: _worldPosTmp.y,
                  z: _worldPosTmp.z,
                });
              }
              emitterCursor++;
            }
          }
        });
      });
    });

    // Subtle wind-aligned sway for the rooted far-right bamboo culms
    if (bambooGroupRef.current) {
      const wind = sampleWindField(t, anchors.bambooX, anchors.bambooY + 1.2, anchors.bambooZ);
      const bambooSway = enableMotion
        ? 0.015 + wind.gust * 0.025 + Math.sin(t * 0.95 + 1.1) * 0.018
        : 0;
      bambooGroupRef.current.rotation.z = bambooSway;
    }

    // Sync translucent sakura blossom emissive tint to 30-second day-night cycle
    const palette = cyclePaletteRef.current;
    const activeBlossomMat = blossomMaterialRef.current;
    if (palette && activeBlossomMat) {
      activeBlossomMat.emissive.setRGB(
        palette.blossomEmissive.r,
        palette.blossomEmissive.g,
        palette.blossomEmissive.b
      );
      activeBlossomMat.emissiveIntensity = palette.blossomEmissiveIntensity;
    }
  });

  return (
    <group name="botanical-layer">
      {/* =====================================================================
          HIERARCHICAL JAPANESE SAKURA TREE
          Rooted into dry elevated terrain on the right embankment;
          graceful primary/secondary/twig boughs frame the upper-right sky
         ===================================================================== */}
      <group
        ref={trunkGroupRef}
        name="rooted-sakura-tree"
        position={[anchors.trunkX, anchors.trunkY, anchors.trunkZ]}
      >
        {/* Sculpted tapered trunk + root buttresses */}
        <mesh geometry={treeHierarchy.trunkGeo} material={barkMaterial} castShadow receiveShadow />
        {treeHierarchy.rootGeos.map((rGeo, idx) => (
          <mesh key={idx} geometry={rGeo} material={barkMaterial} receiveShadow />
        ))}

        {/* Level 1: Primary boughs */}
        {treeHierarchy.primaryBranches.map((pBranch, pIdx) => (
          <group
            key={pBranch.id}
            name={pBranch.id}
            position={pBranch.pivot}
            ref={(el) => {
              primaryRefs.current[pIdx] = el;
            }}
          >
            <mesh geometry={pBranch.geometry} material={barkMaterial} castShadow />

            {/* Level 2: Secondary branches attached to parent primary bough */}
            {pBranch.secondaryBranches.map((sBranch) => (
              <group
                key={sBranch.id}
                name={sBranch.id}
                position={sBranch.pivot}
                ref={(el) => {
                  secondaryRefs.current[sBranch.id] = el;
                }}
              >
                <mesh geometry={sBranch.geometry} material={barkMaterial} />
                <BranchBlossomInstances
                  blossoms={sBranch.blossoms}
                  geometry={floretGeo}
                  material={blossomMaterial}
                />

                {/* Level 3: Thin terminal twigs & blossom clusters attached to secondary branch */}
                {sBranch.twigs.map((twig) => (
                  <group
                    key={twig.id}
                    name={twig.id}
                    position={twig.pivot}
                    ref={(el) => {
                      twigRefs.current[twig.id] = el;
                    }}
                  >
                    <mesh geometry={twig.geometry} material={barkMaterial} />
                    <BranchBlossomInstances
                      blossoms={twig.blossoms}
                      geometry={floretGeo}
                      material={blossomMaterial}
                    />
                  </group>
                ))}
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* Subtle bamboo silhouettes rooted on far bottom-right dry shoreline bank */}
      <group
        ref={bambooGroupRef}
        name="foreground-bamboo-grove"
        position={[anchors.bambooX, anchors.bambooY, anchors.bambooZ]}
      >
        {bambooData.geos.map((geo, idx) => (
          <mesh key={idx} geometry={geo}>
            <meshStandardMaterial color="#18252E" roughness={0.86} wireframe={wireframe} />
          </mesh>
        ))}

        <instancedMesh
          ref={bambooLeavesRef}
          args={[bambooLeafGeo, undefined, bambooData.leaves.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            color="#1D2E35"
            roughness={0.88}
            side={THREE.DoubleSide}
            wireframe={wireframe}
          />
        </instancedMesh>
      </group>
    </group>
  );
}
