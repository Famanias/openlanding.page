import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { ProceduralTextureSet } from './textures';
import { createSeededRandom } from '../logic/networkGenerator';
import type { SunlightAtmosphereState } from '../logic/chapters';

export interface BuiltForestBackdrop {
  group: THREE.Group;
  updateBackdrop: (params: {
    sunState: SunlightAtmosphereState;
    undergroundFactor: number;
    elapsedSec: number;
    progress: number;
  }) => void;
}

/**
 * Builds the macro-scale forest environment around the mushrooms for Chapters 01 and 06
 * (and the surface seen in transitions):
 * 1. Three depth layers of tree trunks of varied thickness with bark texture and fluted root buttresses,
 *    receding into atmospheric mist (near trunks sharp, mid trunks lightly hazed, distant ones soft & pale).
 * 2. A fallen, mossy log with weathered bark, moss blanket, and shelf fungi in the mid-ground.
 * 3. Woodland ferns (multi-frond arching pinnate rosettes) and low ground cover (wood sorrel & forest sedge).
 * 4. Volumetric light shafts (god rays) through the canopy that follow the time-of-day slider:
 *    golden and slanted in the morning, near-vertical and brighter at midday, faint moonlight at night.
 * 5. Layered atmospheric mist bands between the tree depth planes.
 */
export function buildForestBackdrop(
  textures: ProceduralTextureSet,
  getGroundHeightAt: (x: number, z: number) => number,
  seed = 4012,
): BuiltForestBackdrop {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'MacroForestBackdrop';

  const dummy = new THREE.Object3D();
  const tempColor = new THREE.Color();

  // Helper to build a sculpted tree trunk geometry with flared root buttresses at the base
  const createFlutedTrunkGeo = (
    baseRadius: number,
    topRadius: number,
    height: number,
    radialSegs: number,
    heightSegs: number,
    buttressCount: number,
    seedOffset: number,
  ): THREE.BufferGeometry => {
    const geo = new THREE.CylinderGeometry(
      topRadius,
      baseRadius,
      height,
      radialSegs,
      heightSegs,
      false,
    );
    geo.translate(0, height * 0.5 - 0.15, 0);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const angle = Math.atan2(vz, vx);
      const hNorm = Math.max(0, Math.min(1, (vy + 0.15) / height));

      // Fluted root buttresses flaring outward near the forest floor (y = 0 .. 2.2m)
      const buttressEnv = Math.pow(Math.max(0, 1 - hNorm / 0.24), 2.1);
      const buttressWave =
        0.5 +
        0.5 * Math.sin(angle * buttressCount + seedOffset) +
        0.25 * Math.cos(angle * (buttressCount + 2) - seedOffset * 1.7);
      const rootFlare = 1.0 + buttressEnv * buttressWave * 0.68;

      // Coarse vertical bark furrow relief
      const barkFurrow =
        1.0 +
        0.045 * Math.sin(angle * 14.0 + vy * 1.2 + seedOffset) +
        0.025 * Math.cos(angle * 23.0 - vy * 2.1);

      // Gentle organic trunk lean/curve with height
      const leanX = Math.sin(hNorm * Math.PI * 0.85 + seedOffset) * 0.22 * hNorm;
      const leanZ = Math.cos(hNorm * Math.PI * 0.75 + seedOffset) * 0.16 * hNorm;

      pos.setXYZ(
        i,
        vx * rootFlare * barkFurrow + leanX,
        vy,
        vz * rootFlare * barkFurrow + leanZ,
      );
      uv.setXY(i, uv.getX(i) * 3.0, uv.getY(i) * 5.0);
    }
    geo.computeVertexNormals();
    return geo;
  };

  // Shared uniforms for atmospheric mist & canopy dapple across the 3 trunk depth layers
  const mistUniform = { value: new THREE.Color('#826644') };
  const bgUniform = { value: new THREE.Color('#2a1f13') };
  const sunColorUniform = { value: new THREE.Color('#ffbe6b') };
  const dappleStrengthUniform = { value: 0.55 };
  const sunDirUniform = { value: new THREE.Vector3(-0.6, 0.5, 0.5).normalize() };

  const createTrunkDepthMaterial = (
    mistBlendFactor: number,
    bumpScale: number,
    roughness: number,
  ): THREE.MeshStandardMaterial => {
    const mat = new THREE.MeshStandardMaterial({
      map: textures.barkColor,
      bumpMap: textures.stemBump,
      bumpScale,
      color: new THREE.Color('#ffffff'),
      roughness,
      metalness: 0.0,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMistColor = mistUniform;
      shader.uniforms.uBgColor = bgUniform;
      shader.uniforms.uSunColor = sunColorUniform;
      shader.uniforms.uDappleStrength = dappleStrengthUniform;
      shader.uniforms.uSunDir = sunDirUniform;
      shader.uniforms.uMistBlend = { value: mistBlendFactor };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vTrunkWorldPos;\nvarying vec3 vTrunkWorldNormal;',
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvTrunkWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvTrunkWorldNormal = normalize(mat3(modelMatrix) * objectNormal);',
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          uniform vec3 uMistColor;
          uniform vec3 uBgColor;
          uniform vec3 uSunColor;
          uniform float uDappleStrength;
          uniform vec3 uSunDir;
          uniform float uMistBlend;
          varying vec3 vTrunkWorldPos;
          varying vec3 vTrunkWorldNormal;`,
        )
        .replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
          // Mossy base tint on the lowest 1.2m of near/mid tree trunks
          float baseMossMask = smoothstep(1.35, 0.05, vTrunkWorldPos.y) * (0.5 + 0.5 * sin(vTrunkWorldPos.x * 4.5 + vTrunkWorldPos.z * 4.5));
          vec3 mossTint = vec3(0.14, 0.22, 0.09);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, mossTint, baseMossMask * (1.0 - uMistBlend * 0.7) * 0.55);

          // Raking sunlight / dappled canopy light patches on trunk bark
          float sunFace = max(0.0, dot(normalize(vTrunkWorldNormal), uSunDir));
          float canopyDapple = 0.5 + 0.5 * sin(vTrunkWorldPos.x * 1.4 + vTrunkWorldPos.y * 1.9) * cos(vTrunkWorldPos.z * 1.3 - vTrunkWorldPos.y * 1.5);
          float dapplePatch = smoothstep(0.38, 0.78, canopyDapple) * sunFace * uDappleStrength;
          gl_FragColor.rgb += uSunColor * dapplePatch * (0.28 * (1.0 - uMistBlend * 0.65));

          // Multi-layer atmospheric depth mist & vertical canopy haze
          float heightHaze = smoothstep(1.5, 9.5, vTrunkWorldPos.y) * 0.42;
          float totalMist = clamp(uMistBlend + heightHaze * (0.35 + uMistBlend * 0.65), 0.0, 0.92);
          vec3 targetMistCol = mix(uMistColor, uBgColor, 0.42 + 0.38 * uMistBlend);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, targetMistCol, totalMist);`,
        );
    };
    return mat;
  };

  // ============================================================================
  // 1. THREE DEPTH LAYERS OF TREE TRUNKS (Near sharp, Mid hazed, Distant soft & pale)
  // ============================================================================
  const nearTrunkMat = createTrunkDepthMaterial(0.06, 0.055, 0.88);
  const midTrunkMat = createTrunkDepthMaterial(0.46, 0.025, 0.92);
  const farTrunkMat = createTrunkDepthMaterial(0.78, 0.008, 0.96);

  // Layer 1: Near Trunks (sharp bark, prominent root buttresses framing the clearing)
  const nearPlacements: Array<{ x: number; z: number; r: number; rotY: number }> = [
    { x: -3.25, z: -3.4, r: 0.96, rotY: 0.4 },
    { x: 3.55, z: -3.8, r: 1.08, rotY: 1.9 },
    { x: -5.85, z: -4.9, r: 1.24, rotY: 2.7 },
    { x: 6.10, z: -5.2, r: 1.18, rotY: 0.9 },
    { x: -1.75, z: -5.8, r: 0.82, rotY: 3.8 },
    { x: 2.15, z: -6.1, r: 0.88, rotY: 5.1 },
  ];

  for (let i = 0; i < nearPlacements.length; i++) {
    const p = nearPlacements[i];
    const tGeo = createFlutedTrunkGeo(
      p.r,
      p.r * 0.66,
      14.5,
      28,
      20,
      5 + (i % 3),
      i * 2.1 + 0.5,
    );
    const tMesh = new THREE.Mesh(tGeo, nearTrunkMat);
    tMesh.position.set(p.x, getGroundHeightAt(p.x, p.z), p.z);
    tMesh.rotation.y = p.rotY;
    tMesh.castShadow = true;
    tMesh.receiveShadow = true;
    group.add(tMesh);

    // Snaking surface roots extending from near tree bases onto the forest floor
    for (let rIdx = 0; rIdx < 3; rIdx++) {
      const rootAng =
        Math.atan2(-p.z, -p.x) + (rIdx - 1) * 0.65 + (rand() - 0.5) * 0.25;
      const rootPts: THREE.Vector3[] = [];
      const steps = 6;
      const rootLen = 1.6 + rand() * 1.4;
      for (let s = 0; s <= steps; s++) {
        const st = s / steps;
        const dist = p.r * 0.72 + st * rootLen;
        const rx = p.x + Math.cos(rootAng + Math.sin(st * Math.PI) * 0.18) * dist;
        const rz = p.z + Math.sin(rootAng + Math.sin(st * Math.PI) * 0.18) * dist;
        const ry =
          getGroundHeightAt(rx, rz) +
          Math.pow(1 - st, 1.8) * 0.42 -
          st * 0.04;
        rootPts.push(new THREE.Vector3(rx, ry, rz));
      }
      const rCurve = new THREE.CatmullRomCurve3(rootPts);
      const rGeo = new THREE.TubeGeometry(rCurve, 14, 0.085 * (1 - rIdx * 0.15), 7, false);
      const rMesh = new THREE.Mesh(rGeo, nearTrunkMat);
      rMesh.castShadow = true;
      rMesh.receiveShadow = true;
      group.add(rMesh);
    }
  }

  // Layer 2: Mid-Distance Trunks (z = -7.2 .. -13.5, softened by atmospheric mist)
  const midPlacements: Array<{ x: number; z: number; r: number; rotY: number }> = [
    { x: -8.4, z: -7.8, r: 1.05, rotY: 1.2 },
    { x: -4.6, z: -8.6, r: 0.86, rotY: 2.4 },
    { x: -0.65, z: -9.4, r: 0.92, rotY: 0.7 },
    { x: 4.35, z: -8.8, r: 0.98, rotY: 4.1 },
    { x: 8.6, z: -8.2, r: 1.12, rotY: 3.2 },
    { x: -6.8, z: -11.4, r: 0.94, rotY: 5.0 },
    { x: -2.4, z: -12.0, r: 0.78, rotY: 1.8 },
    { x: 1.75, z: -11.6, r: 0.84, rotY: 2.9 },
    { x: 6.2, z: -12.2, r: 0.90, rotY: 0.3 },
    { x: 10.4, z: -11.5, r: 1.04, rotY: 4.6 },
  ];

  for (let i = 0; i < midPlacements.length; i++) {
    const p = midPlacements[i];
    const tGeo = createFlutedTrunkGeo(
      p.r,
      p.r * 0.68,
      16.0,
      18,
      12,
      5,
      i * 1.7 + 10.0,
    );
    const tMesh = new THREE.Mesh(tGeo, midTrunkMat);
    tMesh.position.set(p.x, getGroundHeightAt(p.x, p.z), p.z);
    tMesh.rotation.y = p.rotY;
    group.add(tMesh);
  }

  // Layer 3: Distant Trunks (z = -14.5 .. -24.0, soft and pale silhouettes in deep forest mist)
  const farPlacements: Array<{ x: number; z: number; r: number }> = [
    { x: -15.5, z: -15.5, r: 0.92 },
    { x: -11.8, z: -16.8, r: 0.76 },
    { x: -8.2, z: -15.8, r: 0.84 },
    { x: -5.1, z: -17.4, r: 0.70 },
    { x: -3.2, z: -19.5, r: 0.66 },
    { x: -1.1, z: -16.6, r: 0.74 },
    { x: 0.85, z: -18.8, r: 0.68 },
    { x: 3.1, z: -16.2, r: 0.80 },
    { x: 5.4, z: -18.2, r: 0.72 },
    { x: 7.8, z: -16.5, r: 0.86 },
    { x: 10.6, z: -19.0, r: 0.78 },
    { x: 13.5, z: -16.8, r: 0.90 },
    { x: -6.6, z: -21.5, r: 0.75 },
    { x: 4.2, z: -22.0, r: 0.78 },
  ];

  for (let i = 0; i < farPlacements.length; i++) {
    const p = farPlacements[i];
    const tGeo = createFlutedTrunkGeo(
      p.r,
      p.r * 0.72,
      18.0,
      12,
      8,
      4,
      i * 2.3 + 30.0,
    );
    const tMesh = new THREE.Mesh(tGeo, farTrunkMat);
    tMesh.position.set(p.x, getGroundHeightAt(p.x, p.z), p.z);
    group.add(tMesh);
  }

  // ============================================================================
  // 2. FALLEN MOSSY LOG (Mid-ground forest floor at z ≈ -2.45)
  // ============================================================================
  const logGroup = new THREE.Group();
  logGroup.name = 'FallenMossyLog';
  // Positioned across mid-ground behind the hero mushroom so it frames both Ch 01 and Ch 06
  logGroup.position.set(-1.35, getGroundHeightAt(-1.35, -2.55) + 0.24, -2.55);
  logGroup.rotation.set(0.03, 0.28, -0.04);
  group.add(logGroup);

  const logLen = 4.6;
  const logRadius = 0.34;
  const logGeo = new THREE.CylinderGeometry(logRadius * 0.88, logRadius, logLen, 24, 28, false);
  logGeo.rotateZ(Math.PI * 0.5);
  const lgPos = logGeo.attributes.position;
  for (let i = 0; i < lgPos.count; i++) {
    const lx = lgPos.getX(i);
    const ly = lgPos.getY(i);
    const lz = lgPos.getZ(i);
    const ang = Math.atan2(lz, ly);
    // Natural sag in the middle and gnarled bark ridges along length
    const sagY = -Math.cos((lx / logLen) * Math.PI) * 0.06;
    const ridge = 1.0 + 0.06 * Math.sin(ang * 9.0 + lx * 3.5) + 0.04 * Math.cos(ang * 5.0 - lx * 2.2);
    lgPos.setXYZ(i, lx, ly * ridge + sagY, lz * ridge);
  }
  logGeo.computeVertexNormals();

  const logMesh = new THREE.Mesh(logGeo, nearTrunkMat);
  logMesh.castShadow = true;
  logMesh.receiveShadow = true;
  logGroup.add(logMesh);

  // Thick velvety green bryophyte moss cushion blanketing the top of the fallen log
  const logMossGeo = new THREE.CylinderGeometry(
    logRadius * 0.91,
    logRadius * 1.03,
    logLen * 0.92,
    20,
    24,
    false,
    -Math.PI * 0.42,
    Math.PI * 0.84,
  );
  logMossGeo.rotateZ(Math.PI * 0.5);
  logMossGeo.rotateX(-Math.PI * 0.5);
  const lmPos = logMossGeo.attributes.position;
  for (let i = 0; i < lmPos.count; i++) {
    const lx = lmPos.getX(i);
    const ly = lmPos.getY(i);
    const lz = lmPos.getZ(i);
    const puff =
      0.028 * (0.5 + 0.5 * Math.sin(lx * 6.5 + lz * 8.0)) +
      0.015 * Math.cos(lx * 13.0 - lz * 11.0);
    lmPos.setXYZ(i, lx, ly + puff + 0.012, lz);
  }
  logMossGeo.computeVertexNormals();

  const logMossMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.035,
    color: new THREE.Color('#2f461b'),
    roughness: 0.94,
    metalness: 0.0,
  });
  const logMossMesh = new THREE.Mesh(logMossGeo, logMossMat);
  logMossMesh.receiveShadow = true;
  logGroup.add(logMossMesh);

  // Bracket shelf fungi (Polypore fans) growing on the front face of the mossy log
  const bracketGeo = new THREE.CylinderGeometry(0.11, 0.03, 0.024, 14, 1, false, 0, Math.PI);
  bracketGeo.rotateY(-Math.PI * 0.5);
  const bracketMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b89b74'),
    roughness: 0.86,
    metalness: 0.0,
  });
  const bracketPositions: Array<[number, number, number, number]> = [
    [-0.65, 0.08, logRadius * 0.92, 1.0],
    [-0.48, 0.02, logRadius * 0.94, 0.72],
    [0.55, 0.06, logRadius * 0.90, 0.88],
    [0.72, 0.11, logRadius * 0.86, 0.64],
  ];
  for (const [bx, by, bz, bs] of bracketPositions) {
    const bMesh = new THREE.Mesh(bracketGeo, bracketMat);
    bMesh.position.set(bx, by, bz);
    bMesh.scale.setScalar(bs);
    logGroup.add(bMesh);
  }

  // ============================================================================
  // 3. WOODLAND FERNS & LOW FOREST GROUND COVER
  // ============================================================================
  // Build a single arching pinnate fern frond geometry with serrated pinnae leaflets
  const buildFernFrondGeo = (): THREE.BufferGeometry => {
    const frondGeos: THREE.BufferGeometry[] = [];
    // Central rachis stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.24, 0.18),
      new THREE.Vector3(0, 0.38, 0.44),
      new THREE.Vector3(0, 0.36, 0.72),
      new THREE.Vector3(0, 0.22, 0.94),
    ]);
    frondGeos.push(new THREE.TubeGeometry(stemCurve, 12, 0.008, 4, false));

    // 11 pairs of opposite pinnae leaflets along the arching rachis
    const pairs = 11;
    for (let p = 1; p <= pairs; p++) {
      const u = p / (pairs + 1);
      const pt = stemCurve.getPointAt(u);
      const tangent = stemCurve.getTangentAt(u);
      const pinnaLen = Math.sin(Math.pow(u, 0.75) * Math.PI) * 0.22;
      const pinnaWidth = 0.036 * (1 - u * 0.35);

      for (const side of [-1, 1]) {
        const blade = new THREE.PlaneGeometry(pinnaLen, pinnaWidth, 3, 1);
        blade.translate(pinnaLen * 0.5 * side, 0, 0);
        const bPos = blade.attributes.position;
        for (let vi = 0; vi < bPos.count; vi++) {
          const vx = bPos.getX(vi);
          const normX = Math.abs(vx) / Math.max(0.01, pinnaLen);
          // Taper leaflet tip and arch slightly
          bPos.setZ(vi, bPos.getZ(vi) * (1 - Math.pow(normX, 1.5) * 0.85));
          bPos.setY(vi, -normX * normX * 0.018);
        }
        blade.rotateX(Math.atan2(-tangent.y, tangent.z) + 0.15);
        blade.rotateY(side * -0.22);
        blade.translate(pt.x, pt.y, pt.z);
        blade.computeVertexNormals();
        frondGeos.push(blade);
      }
    }

    const merged = mergeGeometries(frondGeos, false);
    for (const g of frondGeos) g.dispose();
    return merged;
  };

  const fernFrondGeo = buildFernFrondGeo();
  const fernMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.78,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  // 16 woodland fern rosettes (each with 8 arching fronds = 128 instanced fronds)
  const fernClusterCoords: Array<{ x: number; z: number; scale: number }> = [
    { x: -2.45, z: -1.85, scale: 0.95 },
    { x: -3.15, z: -2.35, scale: 1.12 },
    { x: 2.35, z: -1.95, scale: 0.88 },
    { x: 3.10, z: -2.85, scale: 1.08 },
    { x: -0.45, z: -2.95, scale: 0.85 },
    { x: 0.85, z: -2.80, scale: 0.92 },
    { x: -4.25, z: -3.40, scale: 1.15 },
    { x: 4.40, z: -3.60, scale: 1.10 },
    { x: -1.85, z: -4.20, scale: 1.02 },
    { x: 1.95, z: -4.50, scale: 0.98 },
    { x: -5.20, z: -2.40, scale: 1.05 },
    { x: 5.10, z: -2.50, scale: 1.00 },
    { x: -2.65, z: 0.85, scale: 0.78 },
    { x: 2.75, z: 0.75, scale: 0.76 },
    { x: -3.60, z: -5.20, scale: 1.18 },
    { x: 3.50, z: -5.40, scale: 1.14 },
  ];

  const frondsPerCluster = 8;
  const totalFronds = fernClusterCoords.length * frondsPerCluster;
  const fernInst = new THREE.InstancedMesh(fernFrondGeo, fernMat, totalFronds);
  fernInst.castShadow = true;
  fernInst.receiveShadow = true;

  let frondIdx = 0;
  for (let c = 0; c < fernClusterCoords.length; c++) {
    const cluster = fernClusterCoords[c];
    const cy = getGroundHeightAt(cluster.x, cluster.z);
    for (let f = 0; f < frondsPerCluster; f++) {
      const yaw = (f / frondsPerCluster) * Math.PI * 2 + (rand() - 0.5) * 0.28 + c * 0.4;
      const pitch = -0.12 + (rand() - 0.5) * 0.18;
      dummy.position.set(cluster.x, cy + 0.02, cluster.z);
      dummy.rotation.set(pitch, yaw, (rand() - 0.5) * 0.12);
      const s = cluster.scale * (0.82 + rand() * 0.34);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      fernInst.setMatrixAt(frondIdx, dummy.matrix);

      // Rich woodland fern chlorophyll greens with warm olive variation
      tempColor.setHSL(0.24 + (rand() - 0.5) * 0.04, 0.48 + rand() * 0.14, 0.18 + rand() * 0.10);
      fernInst.setColorAt(frondIdx, tempColor);
      frondIdx++;
    }
  }
  fernInst.instanceMatrix.needsUpdate = true;
  if (fernInst.instanceColor) fernInst.instanceColor.needsUpdate = true;
  fernInst.computeBoundingSphere();
  group.add(fernInst);

  // Low Ground Cover: Wood sorrel / clover trefoil patches & arching forest sedge tufts
  const groundCoverCount = 420;
  const sorrelGeo = new THREE.CircleGeometry(0.065, 6);
  sorrelGeo.rotateX(-Math.PI * 0.5);
  const sPos = sorrelGeo.attributes.position;
  for (let i = 1; i < sPos.count; i++) {
    const ang = Math.atan2(sPos.getZ(i), sPos.getX(i));
    const lobe = 0.65 + 0.35 * Math.abs(Math.cos(ang * 1.5));
    sPos.setX(i, sPos.getX(i) * lobe);
    sPos.setZ(i, sPos.getZ(i) * lobe);
    sPos.setY(i, 0.012);
  }
  sorrelGeo.computeVertexNormals();

  const sorrelInst = new THREE.InstancedMesh(sorrelGeo, fernMat, groundCoverCount);
  sorrelInst.receiveShadow = true;
  for (let i = 0; i < groundCoverCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.72 + Math.pow(rand(), 0.75) * 7.8;
    const gx = Math.cos(angle) * radius;
    let gz = Math.sin(angle) * radius;
    // Keep the immediate front trench lip clear
    if (Math.abs(gx) < 1.8 && gz > 0.32 && gz < 3.2) {
      gz = -Math.abs(gz) - 0.5;
    }
    const gy = getGroundHeightAt(gx, gz) + 0.018 + rand() * 0.025;
    dummy.position.set(gx, gy, gz);
    dummy.rotation.set((rand() - 0.5) * 0.35, rand() * Math.PI * 2, (rand() - 0.5) * 0.35);
    const sc = 0.65 + rand() * 1.15;
    dummy.scale.setScalar(sc);
    dummy.updateMatrix();
    sorrelInst.setMatrixAt(i, dummy.matrix);

    tempColor.setHSL(0.25 + (rand() - 0.5) * 0.04, 0.44, 0.15 + rand() * 0.10);
    sorrelInst.setColorAt(i, tempColor);
  }
  sorrelInst.instanceMatrix.needsUpdate = true;
  if (sorrelInst.instanceColor) sorrelInst.instanceColor.needsUpdate = true;
  sorrelInst.computeBoundingSphere();
  group.add(sorrelInst);

  // ============================================================================
  // 4. LAYERED ATMOSPHERIC MIST PLANES & CANOPY GOD-RAY SHAFTS
  // ============================================================================
  const mistMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uMistColor: { value: new THREE.Color('#d1a164') },
      uOpacity: { value: 0.22 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uMistColor;
      uniform float uOpacity;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float horiz = smoothstep(0.0, 0.22, vUv.x) * (1.0 - smoothstep(0.78, 1.0, vUv.x));
        float vert = smoothstep(0.0, 0.28, vUv.y) * exp(-pow((vUv.y - 0.26) * 2.1, 2.0));
        float drift = 0.72 + 0.28 * sin(vUv.x * 9.0 + uTime * 0.22) * cos(vUv.y * 6.0 - uTime * 0.15);
        gl_FragColor = vec4(uMistColor, horiz * vert * drift * uOpacity);
      }
    `,
  });

  const mistDepths = [
    { z: -4.6, w: 22, h: 5.8, y: 2.2 },
    { z: -9.8, w: 30, h: 7.5, y: 2.8 },
    { z: -16.5, w: 40, h: 9.5, y: 3.4 },
  ];
  for (const m of mistDepths) {
    const mGeo = new THREE.PlaneGeometry(m.w, m.h);
    const mMesh = new THREE.Mesh(mGeo, mistMat);
    mMesh.position.set(0, m.y, m.z);
    group.add(mMesh);
  }

  // Multi-beam Canopy God-Ray Shafts that pivot and change color/brightness with the time-of-day slider
  const rayMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color('#ffbe6b') },
      uOpacity: { value: 0.09 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;

      void main() {
        vec3 viewDir = normalize(vViewPos);
        float rimFade = pow(abs(dot(vNormal, viewDir)), 1.55);
        float verticalFade = smoothstep(0.0, 0.20, vUv.y) * (1.0 - smoothstep(0.62, 1.0, vUv.y));
        float streak = 0.72 + 0.28 * sin(vUv.x * 18.0 + uTime * 0.35);
        gl_FragColor = vec4(uColor, rimFade * verticalFade * streak * uOpacity);
      }
    `,
  });

  const shaftConfigs: Array<{ x: number; z: number; topR: number; botR: number; h: number }> = [
    { x: -0.35, z: -0.30, topR: 0.95, botR: 2.35, h: 10.5 },
    { x: -2.55, z: -3.60, topR: 1.15, botR: 2.85, h: 12.0 },
    { x: 2.25, z: -3.20, topR: 1.05, botR: 2.60, h: 11.5 },
    { x: -4.40, z: -6.80, topR: 1.35, botR: 3.20, h: 13.0 },
    { x: 4.10, z: -6.40, topR: 1.25, botR: 3.10, h: 13.0 },
  ];

  const shaftMeshes: THREE.Mesh[] = [];
  for (const cfg of shaftConfigs) {
    const sGeo = new THREE.CylinderGeometry(cfg.topR, cfg.botR, cfg.h, 20, 1, true);
    sGeo.translate(0, cfg.h * 0.46, 0);
    const sMesh = new THREE.Mesh(sGeo, rayMat);
    sMesh.position.set(cfg.x, -0.2, cfg.z);
    sMesh.rotation.x = 0.06;
    group.add(sMesh);
    shaftMeshes.push(sMesh);
  }

  const updateBackdrop = (params: {
    sunState: SunlightAtmosphereState;
    undergroundFactor: number;
    elapsedSec: number;
    progress: number;
  }) => {
    const { sunState, undergroundFactor, elapsedSec, progress } = params;

    // Visible above ground in Chapters 01, 02, 06 and during Breaking Ground / Return transitions
    const visible = progress < 0.34 || progress > 0.865;
    group.visible = visible;
    if (!visible) return;

    mistUniform.value.setRGB(
      sunState.mistColorRgb[0],
      sunState.mistColorRgb[1],
      sunState.mistColorRgb[2],
    );
    bgUniform.value.setRGB(
      sunState.surfaceBgRgb[0],
      sunState.surfaceBgRgb[1],
      sunState.surfaceBgRgb[2],
    );
    sunColorUniform.value.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    dappleStrengthUniform.value = sunState.dappleStrength;
    sunDirUniform.value
      .set(sunState.sunOffset[0], sunState.sunOffset[1], sunState.sunOffset[2])
      .normalize();

    const surfaceFade = Math.max(0, 1 - undergroundFactor * 0.88);

    // Morning has warmest golden low mist; Night has cool moonlit mist; Midday has lighter sunlit haze
    const mistStrength =
      sunState.sunlight < 0.25
        ? 0.20
        : sunState.sunlight < 0.78
          ? 0.26
          : 0.16;
    mistMat.uniforms.uMistColor.value.copy(mistUniform.value);
    mistMat.uniforms.uOpacity.value = mistStrength * surfaceFade;
    mistMat.uniforms.uTime.value = elapsedSec;

    // Update Canopy God-Ray angle, color, and brightness from the time-of-day slider
    rayMat.uniforms.uColor.value.copy(sunColorUniform.value);
    rayMat.uniforms.uOpacity.value =
      0.068 * sunState.godRayOpacityMultiplier * surfaceFade;
    rayMat.uniforms.uTime.value = elapsedSec;

    for (let i = 0; i < shaftMeshes.length; i++) {
      const m = shaftMeshes[i];
      m.rotation.z = sunState.godRaySlantRad + (i - 2) * 0.025;
      // Shift shaft X slightly so slanted morning rays rake across the clearing
      const baseCfg = shaftConfigs[i];
      m.position.x = baseCfg.x - Math.sin(sunState.godRaySlantRad) * 1.15;
    }
  };

  return {
    group,
    updateBackdrop,
  };
}
