'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import {
  CAUSAL_SEQUENCE,
  SelectedEntityInfo,
  useParallelStore,
} from '../store/useParallelStore';
import {
  CityWorldData,
  DistrictId,
} from '../world/cityGenerator';
import { computeModeChoreography, dampValue } from '../simulation/cameraMath';
import { createBudgetedRenderLoop, disposeSceneResources, getRenderPixelRatio } from './renderBudget';

interface ParallelWorldCanvasProps {
  onWebGLFailure: () => void;
}

// Pre-allocated scratch math objects to guarantee zero GC inside animation loop
const _scratchVec3 = new THREE.Vector3();
const _scratchVec3B = new THREE.Vector3();
const _scratchMat4 = new THREE.Matrix4();
const _scratchQuat = new THREE.Quaternion();
const _scratchScale = new THREE.Vector3();
const _scratchEuler = new THREE.Euler();
const _scratchColor = new THREE.Color();

function createWindowGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#181B20';
  ctx.fillRect(0, 0, 256, 256);

  const cols = 8;
  const rows = 16;
  const padX = 5;
  const padY = 4;
  const cellW = 256 / cols;
  const cellH = 256 / rows;

  // Deterministic pseudo-random pattern for warm architectural interior lighting
  let s = 42;
  const nextRand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const roll = nextRand();
      if (roll > 0.62) {
        ctx.fillStyle = roll > 0.88 ? '#FFE4B5' : '#D9C39E';
      } else if (roll > 0.35) {
        ctx.fillStyle = '#2B303A';
      } else {
        ctx.fillStyle = '#14171C';
      }
      ctx.fillRect(
        c * cellW + padX,
        r * cellH + padY,
        cellW - padX * 2,
        cellH - padY * 2
      );
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createMicroBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 128, 128);

  let s = 1337;
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 128; x += 2) {
      s = (s * 1664525 + 1013904223) % 4294967296;
      const v = 110 + Math.floor((s / 4294967296) * 36);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Custom GLSL Shader for procedural moving flow along curved infrastructure routes
 */
function createFlowShaderMaterial(baseColorHex: number, pulseColorHex: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color(baseColorHex) },
      uPulseColor: { value: new THREE.Color(pulseColorHex) },
      uCongestion: { value: 0.2 },
      uOpacity: { value: 0.85 },
      uClosed: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uBaseColor;
      uniform vec3 uPulseColor;
      uniform float uCongestion;
      uniform float uOpacity;
      uniform float uClosed;
      varying vec2 vUv;

      void main() {
        if (uClosed > 0.5) {
          float stripe = step(0.5, fract(vUv.x * 16.0));
          vec3 closedCol = mix(vec3(0.18, 0.08, 0.07), vec3(0.85, 0.25, 0.18), stripe);
          gl_FragColor = vec4(closedCol, uOpacity * 0.85);
          return;
        }
        float speed = mix(1.6, 0.35, uCongestion);
        float density = mix(5.0, 12.0, uCongestion);
        float wave = fract(vUv.x * density - uTime * speed);
        float pulse = smoothstep(0.65, 0.95, wave) * smoothstep(1.0, 0.92, wave);
        float edgeFade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
        vec3 col = mix(uBaseColor, uPulseColor, pulse * 0.9 + uCongestion * 0.35);
        float alpha = (0.35 + pulse * 0.65) * edgeFade * uOpacity;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

/**
 * Composite multi-part architectural building generator (merged per material tier for fast draw calls)
 */
function buildCityArchitectureGroup(
  world: CityWorldData,
  materials: {
    porcelainMat: THREE.MeshStandardMaterial;
    mineralGrayMat: THREE.MeshStandardMaterial;
    titaniumMat: THREE.MeshStandardMaterial;
    glassTowerMat: THREE.MeshStandardMaterial;
    plinthMat: THREE.MeshStandardMaterial;
    darkTrimMat: THREE.MeshStandardMaterial;
    waterMat: THREE.MeshStandardMaterial;
    parkGrassMat: THREE.MeshStandardMaterial;
    treeTrunkMat: THREE.MeshStandardMaterial;
    treeCanopyMat: THREE.MeshStandardMaterial;
    amberEdgeMat: THREE.LineBasicMaterial;
  },
  futureId: 'A' | 'B'
): {
  root: THREE.Group;
  infrastructureLayerGroup: THREE.Group;
  mobilityLayerGroup: THREE.Group;
  energyLayerGroup: THREE.Group;
  logisticsLayerGroup: THREE.Group;
  roadGroup: THREE.Group;
  edgeMeshes: Map<string, THREE.Mesh>;
  districtFrames: Map<DistrictId, THREE.LineLoop>;
  bridgeBarrierGroup: THREE.Group;
  carInstanced: THREE.InstancedMesh;
  busInstanced: THREE.InstancedMesh;
  truckInstanced: THREE.InstancedMesh;
  interactables: THREE.Object3D[];
} {
  const root = new THREE.Group();
  root.name = `CityWorld_${futureId}`;
  const interactables: THREE.Object3D[] = [];

  // 1. MULTI-PART ARCHITECTURAL PLINTH (5 distinct parts)
  const plinthGroup = new THREE.Group();
  const pw = world.plinthWidth;
  const pd = world.plinthDepth;

  // Part 1: Main concrete/ceramic plinth slab
  const mainSlab = new THREE.Mesh(
    new THREE.BoxGeometry(pw, 1.4, pd),
    materials.plinthMat
  );
  mainSlab.position.set(0, -0.7, 0);
  mainSlab.receiveShadow = true;
  plinthGroup.add(mainSlab);

  // Part 2: Stepped lower brushed titanium under-chassis
  const subSlab = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 1.6, 0.8, pd - 1.6),
    materials.darkTrimMat
  );
  subSlab.position.set(0, -1.7, 0);
  plinthGroup.add(subSlab);

  // Part 3: Warm illuminated perimeter edge light frame
  const edgePts = [
    new THREE.Vector3(-pw * 0.502, 0.02, -pd * 0.502),
    new THREE.Vector3(pw * 0.502, 0.02, -pd * 0.502),
    new THREE.Vector3(pw * 0.502, 0.02, pd * 0.502),
    new THREE.Vector3(-pw * 0.502, 0.02, pd * 0.502),
  ];
  const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePts);
  const edgeLoop = new THREE.LineLoop(edgeGeo, materials.amberEdgeMat);
  plinthGroup.add(edgeLoop);

  // Part 4: Meridian River channel recessed water plane
  const riverMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(pw - 0.6, 5.4),
    materials.waterMat
  );
  riverMesh.rotation.x = -Math.PI * 0.5;
  riverMesh.position.set(0, 0.04, 0);
  plinthGroup.add(riverMesh);

  // Part 5: River embankment retaining walls (North & South)
  const northQuay = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 0.6, 0.26, 0.45),
    materials.titaniumMat
  );
  northQuay.position.set(0, 0.13, -2.85);
  const southQuay = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 0.6, 0.26, 0.45),
    materials.titaniumMat
  );
  southQuay.position.set(0, 0.13, 2.85);
  plinthGroup.add(northQuay, southQuay);

  root.add(plinthGroup);

  // 2. DISTRICT PLATES & HOVER FRAMES
  const districtFrames = new Map<DistrictId, THREE.LineLoop>();
  for (const dist of world.districts) {
    const dw = dist.bounds.maxX - dist.bounds.minX;
    const dd = dist.bounds.maxZ - dist.bounds.minZ;
    const cx = (dist.bounds.minX + dist.bounds.maxX) * 0.5;
    const cz = (dist.bounds.minZ + dist.bounds.maxZ) * 0.5;

    if (dist.id !== 'central_park') {
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(dw - 0.3, 0.16, dd - 0.3),
        materials.darkTrimMat
      );
      plate.position.set(cx, 0.08, cz);
      plate.receiveShadow = true;
      plate.userData = {
        entityType: 'district',
        id: dist.id,
        title: dist.name,
        subtitle: dist.code,
        detail: dist.purpose,
        metric: `Baseline Load: ${dist.baselineDemandMw} MW`,
        worldPos: { x: cx, y: 1.5, z: cz },
        futureId,
      };
      interactables.push(plate);
      root.add(plate);
    }

    const framePts = [
      new THREE.Vector3(dist.bounds.minX + 0.15, 0.22, dist.bounds.minZ + 0.15),
      new THREE.Vector3(dist.bounds.maxX - 0.15, 0.22, dist.bounds.minZ + 0.15),
      new THREE.Vector3(dist.bounds.maxX - 0.15, 0.22, dist.bounds.maxZ - 0.15),
      new THREE.Vector3(dist.bounds.minX + 0.15, 0.22, dist.bounds.maxZ - 0.15),
    ];
    const frameLoop = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(framePts),
      new THREE.LineBasicMaterial({
        color: 0xff5522,
        transparent: true,
        opacity: 0.18,
      })
    );
    districtFrames.set(dist.id, frameLoop);
    root.add(frameLoop);
  }

  // 3. COMPOSITE BUILDINGS (Merged into 3 material buckets + interactive proxy meshes for landmarks)
  const porcelainGeos: THREE.BufferGeometry[] = [];
  const mineralGeos: THREE.BufferGeometry[] = [];
  const glassGeos: THREE.BufferGeometry[] = [];
  const titaniumGeos: THREE.BufferGeometry[] = [];

  for (const b of world.buildings) {
    const baseY = 0.16;
    // Part 1: Primary architectural volume (or podium)
    const podiumH = b.height * 0.22;
    const podiumGeo = new THREE.BoxGeometry(b.width * 1.06, podiumH, b.depth * 1.06);
    podiumGeo.translate(b.x, baseY + podiumH * 0.5, b.z);
    mineralGeos.push(podiumGeo);

    // Part 2: Main tower shaft
    const shaftH = b.height * 0.78;
    const shaftGeo = new THREE.BoxGeometry(b.width, shaftH, b.depth);
    shaftGeo.translate(b.x, baseY + podiumH + shaftH * 0.5, b.z);

    if (b.family === 'glass_tower' || b.facadeStyle === 'curtain_wall') {
      glassGeos.push(shaftGeo);
    } else if (b.family === 'residential_block' || b.family === 'civic_building') {
      porcelainGeos.push(shaftGeo);
    } else {
      mineralGeos.push(shaftGeo);
    }

    // Part 3: Architectural facade fins / recessed framing + rooftop structures
    const roofBaseY = baseY + b.height;
    if (b.roofType === 'crown_spire') {
      const crownGeo = new THREE.BoxGeometry(b.width * 0.65, 0.65, b.depth * 0.65);
      crownGeo.translate(b.x, roofBaseY + 0.32, b.z);
      titaniumGeos.push(crownGeo);

      const spireGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.3, 6);
      spireGeo.translate(b.x, roofBaseY + 1.25, b.z);
      titaniumGeos.push(spireGeo);
    } else if (b.roofType === 'stepped_terrace') {
      const tier1 = new THREE.BoxGeometry(b.width * 0.76, 0.45, b.depth * 0.76);
      tier1.translate(b.x, roofBaseY + 0.22, b.z);
      porcelainGeos.push(tier1);

      const hvac = new THREE.BoxGeometry(b.width * 0.35, 0.28, b.depth * 0.35);
      hvac.translate(b.x + b.width * 0.1, roofBaseY + 0.58, b.z);
      titaniumGeos.push(hvac);
    } else {
      // Rooftop mechanical unit + parapet
      const mech = new THREE.BoxGeometry(b.width * 0.42, 0.32, b.depth * 0.42);
      mech.translate(b.x, roofBaseY + 0.16, b.z);
      titaniumGeos.push(mech);
    }

    // Add landmark selection proxy for raycasting
    if (b.isLandmark) {
      const proxy = new THREE.Mesh(
        new THREE.BoxGeometry(b.width, b.height, b.depth),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      proxy.position.set(b.x, baseY + b.height * 0.5, b.z);
      proxy.userData = {
        entityType: 'building',
        id: b.id,
        title: b.name,
        subtitle: `${b.family.replace(/_/g, ' ').toUpperCase()} · ${b.districtId.toUpperCase()}`,
        detail: `Facade: ${b.facadeStyle.replace(/_/g, ' ')} | Roof: ${b.roofType.replace(/_/g, ' ')}`,
        metric: `Peak Demand: ${b.energyDemandKw} kW`,
        worldPos: { x: b.x, y: baseY + b.height + 0.8, z: b.z },
        futureId,
      };
      interactables.push(proxy);
      root.add(proxy);
    }
  }

  if (porcelainGeos.length > 0) {
    const mergedPorcelain = BufferGeometryUtils.mergeGeometries(porcelainGeos, false);
    const mesh = new THREE.Mesh(mergedPorcelain, materials.porcelainMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (mineralGeos.length > 0) {
    const mergedMineral = BufferGeometryUtils.mergeGeometries(mineralGeos, false);
    const mesh = new THREE.Mesh(mergedMineral, materials.mineralGrayMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (glassGeos.length > 0) {
    const mergedGlass = BufferGeometryUtils.mergeGeometries(glassGeos, false);
    const mesh = new THREE.Mesh(mergedGlass, materials.glassTowerMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (titaniumGeos.length > 0) {
    const mergedTitanium = BufferGeometryUtils.mergeGeometries(titaniumGeos, false);
    const mesh = new THREE.Mesh(mergedTitanium, materials.titaniumMat);
    mesh.castShadow = true;
    root.add(mesh);
  }

  // 4. MERIDIAN CENTRAL SUSPENSION BRIDGE & VIADUCTS (Multi-part composite landmark)
  const bridgeGroup = new THREE.Group();
  const pylonPositions = [
    { x: -0.95, z: -1.9 },
    { x: 0.95, z: -1.9 },
    { x: -0.95, z: 1.9 },
    { x: 0.95, z: 1.9 },
  ];
  for (const pp of pylonPositions) {
    const pylon = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 3.8, 0.28),
      materials.porcelainMat
    );
    pylon.position.set(pp.x, 1.9, pp.z);
    pylon.castShadow = true;
    bridgeGroup.add(pylon);
  }
  // Crossbeams on pylons
  for (const zPos of [-1.9, 1.9]) {
    const crossBeam = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.22, 0.24),
      materials.titaniumMat
    );
    crossBeam.position.set(0, 3.2, zPos);
    bridgeGroup.add(crossBeam);
  }
  root.add(bridgeGroup);

  // Closure barrier indicator on Meridian Central Bridge
  const bridgeBarrierGroup = new THREE.Group();
  const barrierBeacon = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.48, 0),
    new THREE.MeshBasicMaterial({ color: 0xff5522, wireframe: true })
  );
  barrierBeacon.position.set(0, 2.2, 0);
  const barrierGateN = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.25, 0.18),
    new THREE.MeshBasicMaterial({ color: 0xe05a47 })
  );
  barrierGateN.position.set(0, 1.05, -2.5);
  const barrierGateS = barrierGateN.clone();
  barrierGateS.position.set(0, 1.05, 2.5);
  bridgeBarrierGroup.add(barrierBeacon, barrierGateN, barrierGateS);
  root.add(bridgeBarrierGroup);

  // 5. ROAD GRAPH & CUSTOM SHADER FLOW PATHS
  const roadGroup = new THREE.Group();
  const edgeMeshes = new Map<string, THREE.Mesh>();

  for (const edge of world.edges) {
    // Render physical road geometry once per bidirectional pair, plus shader flow ribbons for each directed edge
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(edge.points[0].x, edge.points[0].y, edge.points[0].z),
      new THREE.Vector3(edge.points[1].x, edge.points[1].y, edge.points[1].z),
      new THREE.Vector3(edge.points[2].x, edge.points[2].y, edge.points[2].z)
    );

    const isFwd = edge.id.endsWith('-FWD');
    const tubeRadius = edge.isBridge ? 0.22 : 0.15;
    const flowGeo = new THREE.TubeGeometry(curve, 20, isFwd ? tubeRadius : tubeRadius * 0.65, 6, false);

    const baseHex = futureId === 'A' ? 0x52433e : 0x3b4954;
    const pulseHex = futureId === 'A' ? 0xe05a47 : 0xff5522;
    const flowMat = createFlowShaderMaterial(baseHex, pulseHex);

    const flowMesh = new THREE.Mesh(flowGeo, flowMat);
    flowMesh.position.y = isFwd ? 0.04 : 0.08;
    flowMesh.userData = {
      entityType: 'road',
      id: edge.id,
      title: edge.name,
      subtitle: edge.isBridge
        ? 'PRIMARY CROSS-RIVER ARTERIAL'
        : edge.isAlternateRoute
        ? 'ALTERNATE BYPASS CORRIDOR'
        : 'URBAN COLLECTOR CORRIDOR',
      detail: `Base Capacity: ${edge.baseCapacity} veh/min · Length: ${edge.length}m`,
      metric: `Corridor ID: ${edge.id}`,
      worldPos: {
        x: edge.points[1].x,
        y: edge.points[1].y + 1.2,
        z: edge.points[1].z,
      },
      futureId,
    };

    if (isFwd) {
      interactables.push(flowMesh);
    }
    edgeMeshes.set(edge.id, flowMesh);
    roadGroup.add(flowMesh);
  }
  root.add(roadGroup);

  // 6. PLANTED TREES (InstancedMesh with composite trunk + canopy)
  const treeCount = Math.max(1, world.trees.length);
  const canopyGeo = new THREE.ConeGeometry(0.28, 0.68, 6);
  canopyGeo.translate(0, 0.52, 0);
  const trunkGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.28, 5);
  trunkGeo.translate(0, 0.14, 0);
  const treeMergedGeo = BufferGeometryUtils.mergeGeometries([trunkGeo, canopyGeo], false);
  const treeInstanced = new THREE.InstancedMesh(
    treeMergedGeo,
    materials.treeCanopyMat,
    treeCount
  );
  for (let i = 0; i < world.trees.length; i++) {
    const t = world.trees[i];
    _scratchVec3.set(t.x, 0.16, t.z);
    _scratchQuat.identity();
    _scratchScale.setScalar(t.scale);
    _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);
    treeInstanced.setMatrixAt(i, _scratchMat4);
    _scratchColor.setHSL(0.36 + t.tint * 0.15, 0.28, 0.32 + t.tint * 0.2);
    treeInstanced.setColorAt(i, _scratchColor);
  }
  treeInstanced.instanceMatrix.needsUpdate = true;
  if (treeInstanced.instanceColor) treeInstanced.instanceColor.needsUpdate = true;
  treeInstanced.computeBoundingSphere();
  root.add(treeInstanced);

  // 7. COMPOSITE INSTANCED VEHICLES (Cars, Buses, Freight Trucks)
  // Car composite geometry (body + cabin)
  const carHull = new THREE.BoxGeometry(0.26, 0.12, 0.52);
  carHull.translate(0, 0.08, 0);
  const carCabin = new THREE.BoxGeometry(0.22, 0.10, 0.26);
  carCabin.translate(0, 0.18, -0.03);
  const carGeo = BufferGeometryUtils.mergeGeometries([carHull, carCabin], false);

  const busHull = new THREE.BoxGeometry(0.32, 0.24, 0.88);
  busHull.translate(0, 0.14, 0);
  const busRoof = new THREE.BoxGeometry(0.26, 0.06, 0.72);
  busRoof.translate(0, 0.28, 0);
  const busGeo = BufferGeometryUtils.mergeGeometries([busHull, busRoof], false);

  const truckCab = new THREE.BoxGeometry(0.30, 0.24, 0.30);
  truckCab.translate(0, 0.14, 0.32);
  const truckTrailer = new THREE.BoxGeometry(0.32, 0.28, 0.68);
  truckTrailer.translate(0, 0.16, -0.20);
  const truckGeo = BufferGeometryUtils.mergeGeometries([truckCab, truckTrailer], false);

  const carMat = new THREE.MeshStandardMaterial({
    color: futureId === 'A' ? 0xf2d1c9 : 0xf4f1ea,
    roughness: 0.3,
    metalness: 0.2,
  });
  const busMat = new THREE.MeshStandardMaterial({
    color: 0xff5522,
    roughness: 0.35,
    metalness: 0.3,
  });
  const truckMat = new THREE.MeshStandardMaterial({
    color: 0xd9a441,
    roughness: 0.4,
    metalness: 0.25,
  });

  const carInstanced = new THREE.InstancedMesh(carGeo, carMat, 60);
  const busInstanced = new THREE.InstancedMesh(busGeo, busMat, 20);
  const truckInstanced = new THREE.InstancedMesh(truckGeo, truckMat, 25);
  carInstanced.frustumCulled = false;
  busInstanced.frustumCulled = false;
  truckInstanced.frustumCulled = false;
  root.add(carInstanced, busInstanced, truckInstanced);

  // 8. CHAPTER 02 & 05 ELEVATED INFRASTRUCTURE GLASS LAYERS
  const infrastructureLayerGroup = new THREE.Group();
  const mobilityLayerGroup = new THREE.Group();
  const energyLayerGroup = new THREE.Group();
  const logisticsLayerGroup = new THREE.Group();

  const createGlassPlane = (yElev: number, borderColor: number) => {
    const g = new THREE.Group();
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(pw - 2, pd - 2),
      new THREE.MeshBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.045,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = yElev;
    g.add(plane);

    const pts = [
      new THREE.Vector3(-(pw - 2) * 0.5, yElev, -(pd - 2) * 0.5),
      new THREE.Vector3((pw - 2) * 0.5, yElev, -(pd - 2) * 0.5),
      new THREE.Vector3((pw - 2) * 0.5, yElev, (pd - 2) * 0.5),
      new THREE.Vector3(-(pw - 2) * 0.5, yElev, (pd - 2) * 0.5),
    ];
    const border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.45,
      })
    );
    g.add(border);
    return g;
  };

  mobilityLayerGroup.add(createGlassPlane(2.8, 0xff5522));
  energyLayerGroup.add(createGlassPlane(4.4, 0x38bdf8));
  logisticsLayerGroup.add(createGlassPlane(6.0, 0xf59e0b));

  // Populate Energy Layer with translucent demand columns and substation links
  for (const dist of world.districts) {
    const colH = Math.max(1.2, dist.baselineDemandMw * 0.085);
    const colMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.65, colH, 16),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      })
    );
    colMesh.position.set(dist.center.x, 4.4 + colH * 0.5, dist.center.z);
    energyLayerGroup.add(colMesh);

    // Feeder line from Substation (6, 4.4, 11) to district center
    const feederPts = [
      new THREE.Vector3(6, 4.4, 11),
      new THREE.Vector3((6 + dist.center.x) * 0.5, 5.2, (11 + dist.center.z) * 0.5),
      new THREE.Vector3(dist.center.x, 4.4, dist.center.z),
    ];
    const feederCurve = new THREE.QuadraticBezierCurve3(
      feederPts[0],
      feederPts[1],
      feederPts[2]
    );
    const feederLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(feederCurve.getPoints(20)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    );
    energyLayerGroup.add(feederLine);
  }

  // Populate Logistics Layer with Harbor-to-Hub elevated freight arcs
  const logisticsTargets = [
    { x: 13, z: -13 },
    { x: 2, z: -13 },
    { x: -8, z: -13 },
    { x: 15, z: 12 },
  ];
  for (const lt of logisticsTargets) {
    const arc = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-12, 6.0, 11),
      new THREE.Vector3((-12 + lt.x) * 0.5, 8.2, (11 + lt.z) * 0.5),
      new THREE.Vector3(lt.x, 6.0, lt.z)
    );
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(arc, 24, 0.12, 6, false),
      createFlowShaderMaterial(0x78552b, 0xf59e0b)
    );
    logisticsLayerGroup.add(tube);
  }

  // Infrastructure interactive nodes
  for (const inf of world.infrastructure) {
    const markerGroup = new THREE.Group();
    const yBase =
      inf.layer === 'mobility' ? 2.8 : inf.layer === 'energy' ? 4.4 : 6.0;
    const colorHex =
      inf.layer === 'mobility'
        ? 0xff5522
        : inf.layer === 'energy'
        ? 0x38bdf8
        : 0xf59e0b;

    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.MeshBasicMaterial({ color: colorHex })
    );
    beacon.position.set(inf.x, yBase + 0.5, inf.z);

    // Vertical drop stem connecting elevated layer to physical city node
    const stemPts = [
      new THREE.Vector3(inf.x, 0.25, inf.z),
      new THREE.Vector3(inf.x, yBase + 0.5, inf.z),
    ];
    const stem = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(stemPts),
      new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.55 })
    );

    beacon.userData = {
      entityType: 'infrastructure',
      id: inf.id,
      title: inf.name,
      subtitle: `${inf.layer.toUpperCase()} NODE · ${inf.capacityLabel}`,
      detail: inf.dependencySummary,
      metric: `Connected Nodes: ${inf.connectedNodeIds.join(', ')}`,
      worldPos: { x: inf.x, y: yBase + 0.8, z: inf.z },
      futureId,
    };
    interactables.push(beacon);
    markerGroup.add(beacon, stem);

    if (inf.layer === 'mobility') mobilityLayerGroup.add(markerGroup);
    else if (inf.layer === 'energy') energyLayerGroup.add(markerGroup);
    else logisticsLayerGroup.add(markerGroup);
  }

  infrastructureLayerGroup.add(
    mobilityLayerGroup,
    energyLayerGroup,
    logisticsLayerGroup
  );
  root.add(infrastructureLayerGroup);

  return {
    root,
    infrastructureLayerGroup,
    mobilityLayerGroup,
    energyLayerGroup,
    logisticsLayerGroup,
    roadGroup,
    edgeMeshes,
    districtFrames,
    bridgeBarrierGroup,
    carInstanced,
    busInstanced,
    truckInstanced,
    interactables,
  };
}

export const ParallelWorldCanvas: React.FC<ParallelWorldCanvasProps> = React.memo(
  function ParallelWorldCanvas({ onWebGLFailure }) {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const onWebGLFailureRef = useRef(onWebGLFailure);
    onWebGLFailureRef.current = onWebGLFailure;

    useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      // 1. Software-WebGL probe and WebGL2 availability check
      let isSoftwareGl = false;
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2', { powerPreference: 'low-power', antialias: false });
        if (!gl) {
          onWebGLFailureRef.current();
          return;
        }
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
          gpu
        );
      } catch {
        onWebGLFailureRef.current();
        return;
      }

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          powerPreference: 'low-power',
        });
      } catch {
        onWebGLFailureRef.current();
        return;
      }

      const getStageWidth = () => Math.max(300, container.clientWidth || window.innerWidth);
      const getStageHeight = () => Math.max(300, container.clientHeight || window.innerHeight);

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.setPixelRatio(
        getRenderPixelRatio(getStageWidth(), getStageHeight())
      );
      renderer.setSize(getStageWidth(), getStageHeight());
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.shadowMap.autoUpdate = false;

      renderer.domElement.setAttribute('data-testid', 'parallel-webgl-canvas');
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.touchAction = 'pan-y';
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        onWebGLFailureRef.current();
      };
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

      // 2. Scene, Studio RoomEnvironment & Lighting Rig
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101315);
      scene.fog = new THREE.FogExp2(0x101315, 0.0052);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const roomEnvironment = new RoomEnvironment();
      const environmentTarget = pmremGenerator.fromScene(roomEnvironment, 0.04);
      scene.environment = environmentTarget.texture;
      roomEnvironment.dispose();
      pmremGenerator.dispose();

      const camera = new THREE.PerspectiveCamera(
        36,
        getStageWidth() / getStageHeight(),
        0.5,
        260
      );
      camera.position.set(-20.5, 14.8, 33.5);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 2.2, -1);
      controls.enableDamping = !isSoftwareGl;
      controls.dampingFactor = 0.06;
      controls.maxPolarAngle = Math.PI * 0.46;
      controls.minPolarAngle = 0.15;
      controls.minDistance = 12;
      controls.maxDistance = 95;
      controls.enableZoom = false; // Never hijack mouse wheel over the hero stage
      controls.update();

    // Balanced 3-point architectural studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xe4eefb, 0x262a34, 1.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e0, 3.2);
    keyLight.position.set(28, 46, 28);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(512, 512);
    keyLight.shadow.camera.near = 5;
    keyLight.shadow.camera.far = 120;
    const d = 42;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9cb8e8, 1.35);
    fillLight.position.set(-28, 30, 22);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff6a33, 1.45);
    rimLight.position.set(-34, 20, -28);
    scene.add(rimLight);

    // Studio floor with radial contact shadow beneath plinth
    const studioFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(240, 240),
      new THREE.MeshStandardMaterial({
        color: 0x090a0c,
        roughness: 0.88,
        metalness: 0.12,
      })
    );
    studioFloor.rotation.x = -Math.PI * 0.5;
    studioFloor.position.y = -2.4;
    studioFloor.receiveShadow = true;
    scene.add(studioFloor);

    // 3. Shared Procedural Textures & Materials
    const maxAniso = Math.min(2, renderer.capabilities.getMaxAnisotropy());
    const windowTex = createWindowGridTexture(maxAniso);
    const bumpTex = createMicroBumpTexture(maxAniso);

    const materials = {
      porcelainMat: new THREE.MeshStandardMaterial({
        color: 0xd8d3c8,
        roughness: 0.52,
        metalness: 0.15,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffe4bc),
        emissiveIntensity: 0.38,
        bumpMap: bumpTex,
        bumpScale: 0.015,
      }),
      mineralGrayMat: new THREE.MeshStandardMaterial({
        color: 0xb8c0ca,
        roughness: 0.42,
        metalness: 0.25,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffd7a8),
        emissiveIntensity: 0.55,
      }),
      titaniumMat: new THREE.MeshStandardMaterial({
        color: 0x8d95a0,
        roughness: 0.25,
        metalness: 0.72,
        emissive: 0x1a1d22,
        emissiveIntensity: 0.25,
      }),
      glassTowerMat: new THREE.MeshStandardMaterial({
        color: 0xe2ecf5,
        roughness: 0.16,
        metalness: 0.65,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffe0b5),
        emissiveIntensity: 0.68,
      }),
      plinthMat: new THREE.MeshStandardMaterial({
        color: 0x20242c,
        roughness: 0.65,
        metalness: 0.22,
        bumpMap: bumpTex,
        bumpScale: 0.02,
      }),
      darkTrimMat: new THREE.MeshStandardMaterial({
        color: 0x161920,
        roughness: 0.58,
        metalness: 0.35,
      }),
      waterMat: new THREE.MeshStandardMaterial({
        color: 0x142638,
        roughness: 0.14,
        metalness: 0.6,
        emissive: 0x0b1929,
        emissiveIntensity: 0.45,
      }),
      parkGrassMat: new THREE.MeshStandardMaterial({
        color: 0x2d4238,
        roughness: 0.8,
        metalness: 0.05,
      }),
      treeTrunkMat: new THREE.MeshStandardMaterial({
        color: 0x4a3e33,
        roughness: 0.9,
      }),
      treeCanopyMat: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
        metalness: 0.05,
      }),
      amberEdgeMat: new THREE.LineBasicMaterial({
        color: 0xff5522,
      }),
    };

    // 4. Build Synchronized Dual Cities (Future A & Future B) from identical seeded world
    const storeState = useParallelStore.getState();
    const cityA = buildCityArchitectureGroup(storeState.world, materials, 'A');
    const cityB = buildCityArchitectureGroup(storeState.world, materials, 'B');
    scene.add(cityA.root, cityB.root);

    // 5. Chapter 05 Causal Dependency Arcs Group
    const causalArcGroup = new THREE.Group();
    const causalArcMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < CAUSAL_SEQUENCE.length; i++) {
      const step = CAUSAL_SEQUENCE[i];
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(step.fromPos.x, step.fromPos.y, step.fromPos.z),
        new THREE.Vector3(
          (step.fromPos.x + step.toPos.x) * 0.5,
          Math.max(step.fromPos.y, step.toPos.y) + 3.2,
          (step.fromPos.z + step.toPos.z) * 0.5
        ),
        new THREE.Vector3(step.toPos.x, step.toPos.y, step.toPos.z)
      );
      const arcMat = createFlowShaderMaterial(0x7c2d12, 0xff5522);
      const arcMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 28, 0.16, 8, false),
        arcMat
      );
      causalArcMeshes.push(arcMesh);
      causalArcGroup.add(arcMesh);
    }
    scene.add(causalArcGroup);

      // 6. Pointer Parallax & Raycast Selection
      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2(0, 0);
      let lastRaycastMs = 0;
      let userOrbiting = false;
      let hasManualOrbit = false;
      let lastCameraResetTick = useParallelStore.getState().cameraResetTick;

      const handleControlStart = () => {
        userOrbiting = true;
        hasManualOrbit = true;
      };
      const handleControlEnd = () => {
        userOrbiting = false;
      };
      controls.addEventListener('start', handleControlStart);
      controls.addEventListener('end', handleControlEnd);

      const onPointerMove = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const now = performance.now();
        if (now - lastRaycastMs < 65) return;
        lastRaycastMs = now;

        raycaster.setFromCamera(pointerNdc, camera);
        const st = useParallelStore.getState();
        const isDualMode =
          st.heroState === 'interactive' &&
          (st.heroMode === 'disrupt' || st.heroMode === 'simulate');
        const targets = isDualMode
          ? [...cityA.interactables, ...cityB.interactables]
          : cityA.interactables;

        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length > 0) {
          const data = hits[0].object.userData;
          if (data.entityType === 'district') {
            st.setHoveredDistrictId(data.id);
          }
          if (data.futureId) {
            st.setHoveredWorld(data.futureId);
          }
          renderer.domElement.style.cursor = 'pointer';
        } else {
          st.setHoveredDistrictId(null);
          st.setHoveredWorld(null);
          renderer.domElement.style.cursor = 'grab';
        }
      };

      const onPointerClick = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointerNdc, camera);
        const st = useParallelStore.getState();
        const isDualMode =
          st.heroState === 'interactive' &&
          (st.heroMode === 'disrupt' || st.heroMode === 'simulate');
        const targets = isDualMode
          ? [...cityA.interactables, ...cityB.interactables]
          : cityA.interactables;

        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length > 0) {
          const data = hits[0].object.userData;
          if (data && data.title) {
            const info: SelectedEntityInfo = {
              type: data.entityType,
              id: data.id,
              title: data.title,
              subtitle: data.subtitle,
              detail: data.detail,
              metric: data.metric,
              worldPos: data.worldPos,
            };
            st.setSelectedEntity(info);
            if (data.entityType === 'road') {
              st.setHighlightedRoadId(data.id);
            }
          }
        }
      };

      const onDoubleClick = () => {
        const st = useParallelStore.getState();
        if (st.selectedEntity) {
          hasManualOrbit = false;
          st.setPresentationMode('exploration');
        }
      };

      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('click', onPointerClick);
      renderer.domElement.addEventListener('dblclick', onDoubleClick);

      const onResize = () => {
        const w = getStageWidth();
        const h = getStageHeight();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(getRenderPixelRatio(w, h));
        renderer.setSize(w, h);
        renderLoop.requestRender();
      };
      window.addEventListener('resize', onResize);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          onResize();
        });
        resizeObserver.observe(container);
      }

      // 7. Animation & simulation share a capped, visibility-aware scheduler.
      let elapsed = 0;
      let lastShadowUpdate = -Infinity;
      let simPlayAccumulator = 0;
      let lastLabelSyncTime = -1;

      function updateVehiclesForCity(
        cityObj: ReturnType<typeof buildCityArchitectureGroup>,
        vehicles: ReturnType<
          typeof useParallelStore.getState
        >['timeline']['futureA'][0]['vehicles'],
        elapsed: number,
        roadElevOffset: number
      ) {
        let carIdx = 0;
        let busIdx = 0;
        let truckIdx = 0;

        for (let i = 0; i < vehicles.length; i++) {
          const v = vehicles[i];
          const microDrift = ((elapsed * v.speedRatio * 0.45) % 0.6) - 0.3;
          const vx = v.x + Math.sin(v.headingRad) * microDrift;
          const vz = v.z + Math.cos(v.headingRad) * microDrift;
          const vy = v.y + 0.08 + roadElevOffset;

          _scratchVec3.set(vx, vy, vz);
          _scratchEuler.set(0, v.headingRad, 0);
          _scratchQuat.setFromEuler(_scratchEuler);
          _scratchScale.set(1, 1, 1);
          _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);

          if (v.vehicleType === 'bus' && busIdx < 20) {
            cityObj.busInstanced.setMatrixAt(busIdx++, _scratchMat4);
          } else if (v.vehicleType === 'delivery' && truckIdx < 25) {
            cityObj.truckInstanced.setMatrixAt(truckIdx++, _scratchMat4);
          } else if (carIdx < 60) {
            cityObj.carInstanced.setMatrixAt(carIdx++, _scratchMat4);
          }
        }

        _scratchScale.set(0, 0, 0);
        _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);
        for (let i = carIdx; i < 60; i++) cityObj.carInstanced.setMatrixAt(i, _scratchMat4);
        for (let i = busIdx; i < 20; i++) cityObj.busInstanced.setMatrixAt(i, _scratchMat4);
        for (let i = truckIdx; i < 25; i++) cityObj.truckInstanced.setMatrixAt(i, _scratchMat4);

        cityObj.carInstanced.instanceMatrix.needsUpdate = true;
        cityObj.busInstanced.instanceMatrix.needsUpdate = true;
        cityObj.truckInstanced.instanceMatrix.needsUpdate = true;
      }

      function tick(nowMs: number, frameDt: number, reducedMotion: boolean) {
        const dt = reducedMotion ? 1 : frameDt;
        if (!reducedMotion) elapsed += dt;
        const st = useParallelStore.getState();
        const isInteractive = st.heroState === 'interactive';
        const effectiveMode = isInteractive ? st.heroMode : 'explore';

        // Atmospheric opening sequence: ramp architectural window & street illumination over first ~2.0s
        const introAwaken = isSoftwareGl || reducedMotion
          ? 1.0
          : Math.min(1.0, 0.35 + (elapsed / 2.0) * 0.65);
        materials.porcelainMat.emissiveIntensity = 0.38 * introAwaken;
        materials.mineralGrayMat.emissiveIntensity = 0.55 * introAwaken;
        materials.glassTowerMat.emissiveIntensity = 0.68 * introAwaken;

        // Clear manual orbit lock when mode changes or Reset View is triggered
        if (st.cameraResetTick !== lastCameraResetTick) {
          lastCameraResetTick = st.cameraResetTick;
          hasManualOrbit = false;
          userOrbiting = false;
        }

        // Advance simulation playback clock if playing
        if (st.isPlaying) {
          simPlayAccumulator += frameDt * 35;
          if (simPlayAccumulator >= 5) {
            const nextMin = st.simTimeMinutes + Math.floor(simPlayAccumulator);
            simPlayAccumulator = 0;
            if (nextMin >= 1320) {
              st.setSimTimeMinutes(360);
            } else {
              st.setSimTimeMinutes(nextMin);
            }
          }
        }

        const causalStep = CAUSAL_SEQUENCE[st.causalStepIndex];
        const choreo = computeModeChoreography(effectiveMode, {
          heroState: st.heroState,
          inspectionTarget:
            st.presentationMode === 'exploration' && st.selectedEntity
              ? st.selectedEntity.worldPos
              : null,
          causalTarget:
            isInteractive && effectiveMode === 'explain'
              ? causalStep.cameraTarget
              : null,
          comparisonBias: isInteractive ? st.comparisonBias : 0,
          aspectRatio: camera.aspect,
        });

        // Only allow wheel zoom when expanded fullscreen so normal page wheel scrolling is never hijacked
        controls.enableZoom = st.isStageExpanded;
        const camLambda = reducedMotion ? 100 : isSoftwareGl ? 16.0 : 5.2;

        if (!userOrbiting && !hasManualOrbit) {
          // Subtle living drift + pointer parallax
          const driftX = reducedMotion ? 0 : Math.sin(elapsed * 0.22) * 0.45;
          const driftZ = reducedMotion ? 0 : Math.cos(elapsed * 0.18) * 0.35;
          const px = choreo.pose.position.x + pointerNdc.x * 1.15 + driftX;
          const py = choreo.pose.position.y + pointerNdc.y * 0.65;
          const pz = choreo.pose.position.z + driftZ;

          camera.position.x = dampValue(camera.position.x, px, camLambda, dt);
          camera.position.y = dampValue(camera.position.y, py, camLambda, dt);
          camera.position.z = dampValue(camera.position.z, pz, camLambda, dt);

          controls.target.x = dampValue(
            controls.target.x,
            choreo.pose.target.x,
            camLambda,
            dt
          );
          controls.target.y = dampValue(
            controls.target.y,
            choreo.pose.target.y,
            camLambda,
            dt
          );
          controls.target.z = dampValue(
            controls.target.z,
            choreo.pose.target.z,
            camLambda,
            dt
          );
          camera.fov = dampValue(camera.fov, choreo.pose.fov, camLambda, dt);
          camera.updateProjectionMatrix();
        }
        controls.update();

        keyLight.intensity = (1.5 + choreo.studioLightReveal * 1.85) * introAwaken;
        rimLight.intensity = 1.45 * introAwaken;

        // Position Dual Cities (Baseline Future A left, Intervention Future B right)
        const splitDist = 26.5;
        const targetAx = -splitDist * choreo.splitFactor;
        const targetBx = splitDist * choreo.splitFactor;

        cityA.root.position.x = dampValue(
          cityA.root.position.x,
          targetAx,
          camLambda,
          dt
        );
        cityB.root.position.x = dampValue(
          cityB.root.position.x,
          targetBx,
          camLambda,
          dt
        );

        // Show City B during split (Disrupt & Simulate modes) or subtle realignment (Outcome mode)
        cityB.root.visible =
          isInteractive &&
          (choreo.splitFactor > 0.01 || choreo.realignGhostAlpha > 0.02);

        // Mode 02 (Systems) & Mode 05 (Explain Cutaway) vertical layer elevation
        const isLayerMode =
          isInteractive && (effectiveMode === 'systems' || st.cutawayMode);
        cityA.infrastructureLayerGroup.visible = isLayerMode;
        cityB.infrastructureLayerGroup.visible =
          isInteractive && st.cutawayMode && cityB.root.visible;

        const targetLayerScaleY = isLayerMode ? 1.0 : 0.01;
        cityA.infrastructureLayerGroup.scale.y = dampValue(
          cityA.infrastructureLayerGroup.scale.y,
          targetLayerScaleY,
          6.0,
          dt
        );

        // Toggle visibility of specific layers in Systems mode vs all layers in Cutaway mode
        cityA.mobilityLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'mobility';
        cityA.energyLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'energy';
        cityA.logisticsLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'logistics';

        // Exploded cutaway road elevation in Explain mode
        const targetRoadY = isInteractive && st.cutawayMode ? 1.45 : 0;
        cityA.roadGroup.position.y = dampValue(
          cityA.roadGroup.position.y,
          targetRoadY,
          5.5,
          dt
        );

        // Update Causal Dependency Arcs in Mode 05 (Explain)
        causalArcGroup.visible = isInteractive && effectiveMode === 'explain';
        if (causalArcGroup.visible) {
          for (let i = 0; i < causalArcMeshes.length; i++) {
            const m = causalArcMeshes[i];
            const mat = m.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = elapsed;
            const isCurrent = i === st.causalStepIndex;
            const isPast = i < st.causalStepIndex;
            mat.uniforms.uOpacity.value = isCurrent ? 0.95 : isPast ? 0.35 : 0.1;
          }
        }

        // Update Road Shaders, Bridge Closure Beacons & Vehicles from deterministic snapshots
        const { snapshotA, snapshotB } = st.getCurrentSnapshots();
        const isDisruptionActive =
          isInteractive &&
          (effectiveMode === 'disrupt' ||
            effectiveMode === 'simulate' ||
            effectiveMode === 'explain');
        const bridgeClosedNow =
          st.scenarioParams.bridgeClosed &&
          st.simTimeMinutes >= 450 &&
          isDisruptionActive;

        cityA.bridgeBarrierGroup.visible = bridgeClosedNow;
        cityB.bridgeBarrierGroup.visible = bridgeClosedNow;
        if (bridgeClosedNow) {
          cityA.bridgeBarrierGroup.children[0].rotation.y = elapsed * 1.5;
          cityB.bridgeBarrierGroup.children[0].rotation.y = elapsed * 1.5;
        }

        // In Outcome mode, City A displays the optimized Future B flow state on the unified plinth
        const primarySnapshot =
          isInteractive && effectiveMode === 'outcome' ? snapshotB : snapshotA;

        const updateCityEdges = (
          cityObj: ReturnType<typeof buildCityArchitectureGroup>,
          snap: typeof snapshotA
        ) => {
          for (const [edgeId, mesh] of cityObj.edgeMeshes.entries()) {
            const mat = mesh.material as THREE.ShaderMaterial;
            const eState = snap.edgeStates[edgeId];
            mat.uniforms.uTime.value = elapsed;
            if (eState) {
              mat.uniforms.uCongestion.value =
                !isInteractive || effectiveMode === 'explore'
                  ? 0.14
                  : eState.congestionLevel;
              mat.uniforms.uClosed.value =
                eState.closed && isDisruptionActive ? 1.0 : 0.0;
            }
            const isHighlighted =
              isInteractive &&
              (st.highlightedRoadId === edgeId ||
                (effectiveMode === 'explain' &&
                  causalStep.highlightEdgeIds.includes(edgeId)));
            mat.uniforms.uOpacity.value =
              (!isInteractive || effectiveMode === 'explore'
                ? 0.32
                : isHighlighted
                ? 1.0
                : 0.78) * introAwaken;
          }

          for (const [distId, frame] of cityObj.districtFrames.entries()) {
            const mat = frame.material as THREE.LineBasicMaterial;
            const isHovered =
              st.hoveredDistrictId === distId ||
              (isInteractive &&
                effectiveMode === 'explain' &&
                causalStep.highlightDistrictId === distId);
            mat.opacity = isHovered
              ? 0.85
              : !isInteractive || effectiveMode === 'explore'
              ? 0.08
              : 0.16;
          }
        };

        updateCityEdges(cityA, primarySnapshot);
        if (cityB.root.visible) {
          updateCityEdges(cityB, snapshotB);
        }

        updateVehiclesForCity(
          cityA,
          primarySnapshot.vehicles,
          elapsed,
          cityA.roadGroup.position.y
        );
        if (cityB.root.visible) {
          updateVehiclesForCity(
            cityB,
            snapshotB.vehicles,
            elapsed,
            cityB.roadGroup.position.y
          );
        }

        // Throttled World-to-Stage projection for anchored HTML labels (<= 8Hz)
        if (reducedMotion || elapsed - lastLabelSyncTime > 0.12) {
          lastLabelSyncTime = elapsed;
          const stageW = getStageWidth();
          const stageH = getStageHeight();
          const nextLabels: Record<string, { x: number; y: number; visible: boolean }> = {};

          const projectPoint = (id: string, wx: number, wy: number, wz: number) => {
            _scratchVec3B.set(wx, wy, wz);
            _scratchVec3B.project(camera);
            const sx = ((_scratchVec3B.x + 1) * 0.5) * stageW;
            const sy = (-(_scratchVec3B.y - 1) * 0.5) * stageH;
            const inBounds =
              _scratchVec3B.z >= -1 &&
              _scratchVec3B.z <= 1 &&
              sx >= 40 &&
              sx <= stageW - 40 &&
              sy >= 55 &&
              sy <= stageH - 130;
            nextLabels[id] = { x: Math.round(sx), y: Math.round(sy), visible: inBounds };
          };

          if (st.selectedEntity) {
            const p = st.selectedEntity.worldPos;
            projectPoint('selected', p.x + cityA.root.position.x, p.y, p.z);
          }

          if (isInteractive && effectiveMode === 'systems') {
            for (const inf of st.world.infrastructure) {
              if (inf.layer === st.invisibleLayer) {
                const yElev =
                  inf.layer === 'mobility' ? 3.3 : inf.layer === 'energy' ? 4.9 : 6.5;
                projectPoint(inf.id, inf.x, yElev, inf.z);
              }
            }
          }

          if (isInteractive && effectiveMode === 'explain') {
            const cs = CAUSAL_SEQUENCE[st.causalStepIndex];
            projectPoint('causal_active', cs.toPos.x, cs.toPos.y + 1.2, cs.toPos.z);
          }

          const prevLabels = st.projectedLabels;
          const nextKeys = Object.keys(nextLabels);
          const prevKeys = Object.keys(prevLabels);
          let labelsChanged = nextKeys.length !== prevKeys.length;
          if (!labelsChanged) {
            for (const k of nextKeys) {
              const a = nextLabels[k];
              const b = prevLabels[k];
              if (
                !b ||
                a.visible !== b.visible ||
                Math.abs(a.x - b.x) > 1 ||
                Math.abs(a.y - b.y) > 1
              ) {
                labelsChanged = true;
                break;
              }
            }
          }
          if (labelsChanged) {
            st.setProjectedLabels(nextLabels);
          }
        }

        if (reducedMotion || nowMs - lastShadowUpdate >= 250) {
          renderer.shadowMap.needsUpdate = true;
          lastShadowUpdate = nowMs;
        }
        renderer.render(scene, camera);
        return st.isPlaying;
      }

      const renderLoop = createBudgetedRenderLoop(container, tick, isSoftwareGl, () =>
        useParallelStore.getState().isStageExpanded ||
        window.scrollY <= Math.max(600, window.innerHeight * 0.92),
        renderer.getContext()
      );
      const unsubscribe = useParallelStore.subscribe((next, prev) => {
        // Projected labels are output of rendering, not an invalidation source.
        if (next.projectedLabels === prev.projectedLabels) renderLoop.requestRender();
      });
      controls.addEventListener('change', renderLoop.requestRender);
      renderer.domElement.addEventListener('pointermove', renderLoop.requestRender);

      return () => {
        renderLoop.dispose();
        unsubscribe();
        window.removeEventListener('resize', onResize);
        resizeObserver?.disconnect();
        controls.removeEventListener('change', renderLoop.requestRender);
        renderer.domElement.removeEventListener('pointermove', renderLoop.requestRender);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('click', onPointerClick);
        renderer.domElement.removeEventListener('dblclick', onDoubleClick);
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        controls.dispose();
        disposeSceneResources(scene, Object.values(materials));
        environmentTarget.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    }, []);

    return (
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
        aria-label="Interactive 3D urban simulation model of Meridian City"
      />
    );
  }
);
