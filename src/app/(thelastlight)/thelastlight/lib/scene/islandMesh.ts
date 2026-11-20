import * as THREE from 'three';
import {
  COTTAGE_POS,
  COTTAGE_ROTATION_Y,
  distanceToConnectingWalkway,
  fbm2D,
  ISLAND_COLLIDERS,
  islandHeightAt,
  LIGHTHOUSE_POS,
  SAFE_WATER_BOUNDS,
  sampleBluffStaircase,
} from '../sim/island';
import { ProceduralTextureSet } from './textures';
import { applyIslandRockShader } from './shaders';

export interface IslandRig {
  group: THREE.Group;
  collisionGroup: THREE.Group;
  rockUniforms: { uRainWetness: { value: number }; uWaveHeight: { value: number } };
  grassUniforms: {
    uTime: { value: number };
    uWindDir: { value: THREE.Vector2 };
    uWindStrength: { value: number };
    uGustFactor: { value: number };
  };
  update: (params: {
    time: number;
    windDirX: number;
    windDirZ: number;
    windStrength: number;
    gustFactor: number;
    rockWetness: number;
    waveAmplitude: number;
    showCollisions: boolean;
  }) => void;
  dispose: () => void;
}

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function isNearArchitecturalExclusion(x: number, z: number, margin: number): boolean {
  // Exclude Lighthouse pad
  if (Math.hypot(x - LIGHTHOUSE_POS.x, z - LIGHTHOUSE_POS.z) < 4.1 + margin) {
    return true;
  }

  // Exclude rotated Keeper's Cottage + front porch pad
  const dx = x - COTTAGE_POS.x;
  const dz = z - COTTAGE_POS.z;
  const c = Math.cos(-COTTAGE_ROTATION_Y);
  const s = Math.sin(-COTTAGE_ROTATION_Y);
  const lx = dx * c - dz * s;
  const lz = dx * s + dz * c;
  if (Math.abs(lx) < 3.9 + margin && lz > -3.1 - margin && lz < 4.3 + margin) {
    return true;
  }

  // Exclude connecting stone walkway corridor
  if (x >= 11.4 && x <= 18.8 && z >= -2.0 && z <= 3.8) {
    if (distanceToConnectingWalkway(x, z).dist < 1.55 + margin * 0.5) {
      return true;
    }
  }

  // Exclude winding bluff stone staircase corridor
  if (z >= 3.2 && z <= 13.0) {
    const t = Math.max(0, Math.min(1, (z - 3.6) / 8.9));
    const sp = sampleBluffStaircase(t);
    if (Math.abs(x - sp.x) < 1.65 + margin * 0.5) {
      return true;
    }
  }

  return false;
}

/**
 * Builds the expanded procedural rocky island terrain, organic stratified basalt
 * rock outcrops, varied multi-tone windswept coastal vegetation (strictly excluded
 * from buildings, walkways, and sheer cliffs), distant misty horizon mountains,
 * and toggleable collision boundary visualizers.
 */
export function buildIsland(
  textures: ProceduralTextureSet,
  grassCount: number
): IslandRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    disposables.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    disposables.push(m);
    return m;
  };

  // =========================================================================
  // 1. EXPANDED PROCEDURAL ROCKY ISLAND TERRAIN MESH (with Wet-Rock Shader)
  // =========================================================================
  const terrainW = 76;
  const terrainD = 68;
  const segX = 120;
  const segZ = 108;
  const centerX = 14.5;
  const centerZ = 1.5;

  const terrainGeo = trackGeo(
    new THREE.PlaneGeometry(terrainW, terrainD, segX, segZ)
  );
  terrainGeo.rotateX(-Math.PI / 2);

  const posAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    const lx = posAttr.getX(i);
    const lz = posAttr.getZ(i);
    const wx = lx + centerX;
    const wz = lz + centerZ;
    posAttr.setY(i, islandHeightAt(wx, wz));
  }
  terrainGeo.computeVertexNormals();

  const rockMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textures.rockColor,
      bumpMap: textures.rockBump,
      bumpScale: 0.38,
      roughness: 0.9,
      metalness: 0.05,
    })
  );
  const rockUniforms = applyIslandRockShader(rockMat);

  const terrainMesh = new THREE.Mesh(terrainGeo, rockMat);
  terrainMesh.position.set(centerX, 0, centerZ);
  terrainMesh.castShadow = true;
  terrainMesh.receiveShadow = true;
  group.add(terrainMesh);

  // =========================================================================
  // 2. VARIED ORGANIC BASALT CLIFF OUTCROPS & SHORELINE BOULDERS (2 Silhouettes)
  // =========================================================================
  const rand = seededRand(8821);

  const buildErodedRockGeo = (variant: number): THREE.BufferGeometry => {
    const g = trackGeo(new THREE.IcosahedronGeometry(1.0, 2));
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const vx = p.getX(i);
      const vy = p.getY(i);
      const vz = p.getZ(i);
      // Organic stepped basalt strata + asymmetric coastal wave erosion
      const strata = Math.sin(vy * (variant === 0 ? 5.6 : 4.2) + vx * 1.4) * 0.13;
      const ledge = Math.cos(vz * 3.1 + variant * 2.2) * 0.11;
      const erode =
        0.78 +
        0.24 * Math.sin(vx * 2.7 + vy * 2.1 + variant) * Math.cos(vz * 2.4 - vx * 1.6) +
        strata +
        ledge;
      const ySquash = variant === 0 ? 0.72 : 1.05;
      p.setXYZ(i, vx * erode, vy * erode * ySquash, vz * erode);
    }
    g.computeVertexNormals();
    return g;
  };

  const boulderGeoA = buildErodedRockGeo(0); // broad weathered shoreline ledge rock
  const boulderGeoB = buildErodedRockGeo(1); // taller angular cliff spire rock

  const boulderCountA = 52;
  const boulderCountB = 38;
  const boulderMeshA = new THREE.InstancedMesh(boulderGeoA, rockMat, boulderCountA);
  const boulderMeshB = new THREE.InstancedMesh(boulderGeoB, rockMat, boulderCountB);
  boulderMeshA.castShadow = true;
  boulderMeshA.receiveShadow = true;
  boulderMeshB.castShadow = true;
  boulderMeshB.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const tint = new THREE.Color();
  let placedA = 0;
  let placedB = 0;

  for (let attempt = 0; attempt < 1100 && (placedA < boulderCountA || placedB < boulderCountB); attempt++) {
    const x = -4 + rand() * 38;
    const z = -15 + rand() * 35;
    const h = islandHeightAt(x, z);

    if (h > -1.3 && h < 6.6 && !isNearArchitecturalExclusion(x, z, 0.9)) {
      const pickA = rand() < 0.58 && placedA < boulderCountA;
      const useA = pickA || placedB >= boulderCountB;
      const sx = useA ? 0.95 + rand() * 2.1 : 0.65 + rand() * 1.45;
      const sy = useA ? 0.55 + rand() * 1.25 : 0.85 + rand() * 1.75;
      const sz = useA ? 0.9 + rand() * 1.95 : 0.65 + rand() * 1.5;

      dummy.position.set(x, h - sy * 0.58, z);
      dummy.rotation.set(
        (rand() - 0.5) * 0.28,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.28
      );
      dummy.scale.set(sx, sy, sz);
      dummy.updateMatrix();

      // Subtle mineral color variety (cool slate vs warm granite)
      const shade = 0.7 + rand() * 0.32;
      const warm = (rand() - 0.48) * 0.1;
      tint.setRGB(shade + warm, shade + warm * 0.4, shade - warm * 0.4);

      if (useA && placedA < boulderCountA) {
        boulderMeshA.setMatrixAt(placedA, dummy.matrix);
        boulderMeshA.setColorAt(placedA, tint);
        placedA++;
      } else if (placedB < boulderCountB) {
        boulderMeshB.setMatrixAt(placedB, dummy.matrix);
        boulderMeshB.setColorAt(placedB, tint);
        placedB++;
      }
    }
  }
  boulderMeshA.count = placedA;
  boulderMeshB.count = placedB;
  boulderMeshA.instanceMatrix.needsUpdate = true;
  boulderMeshB.instanceMatrix.needsUpdate = true;
  if (boulderMeshA.instanceColor) boulderMeshA.instanceColor.needsUpdate = true;
  if (boulderMeshB.instanceColor) boulderMeshB.instanceColor.needsUpdate = true;
  boulderMeshA.computeBoundingSphere();
  boulderMeshB.computeBoundingSphere();
  group.add(boulderMeshA, boulderMeshB);

  // =========================================================================
  // 3. VARIED ORGANIC COASTAL GRASS VEGETATION (Clustered, Multi-Tone, Wind-Bent)
  // =========================================================================
  // Build an asymmetric multi-blade grass tuft with varied blade heights, widths & lean angles
  const bladePositions: number[] = [];
  const bladeNormals: number[] = [];
  const bladeUvs: number[] = [];
  const bladeIndices: number[] = [];

  const bladeSpecs = [
    { ang: 0.15, lean: 0.24, h: 1.05, w: 0.062, ox: 0.07, oz: 0.04 },
    { ang: 1.28, lean: 0.18, h: 0.72, w: 0.055, ox: -0.04, oz: 0.09 },
    { ang: 2.35, lean: 0.31, h: 1.18, w: 0.068, ox: -0.09, oz: -0.03 },
    { ang: 3.65, lean: 0.15, h: 0.64, w: 0.052, ox: 0.03, oz: -0.08 },
    { ang: 4.82, lean: 0.28, h: 0.92, w: 0.058, ox: 0.09, oz: -0.06 },
    { ang: 5.75, lean: 0.21, h: 0.80, w: 0.048, ox: -0.02, oz: 0.02 },
  ];

  let vOffset = 0;
  for (const spec of bladeSpecs) {
    const ca = Math.cos(spec.ang);
    const sa = Math.sin(spec.ang);
    const segs = 3;
    for (let s = 0; s <= segs; s++) {
      const f = s / segs;
      const hw = spec.w * (1 - f * 0.86);
      const curve = f * f * spec.lean;
      const cx = spec.ox + ca * curve;
      const cy = f * spec.h;
      const cz = spec.oz + sa * curve;

      bladePositions.push(cx - sa * hw, cy, cz + ca * hw);
      bladePositions.push(cx + sa * hw, cy, cz - ca * hw);
      bladeNormals.push(0, 1, 0, 0, 1, 0);
      bladeUvs.push(0, f, 1, f);

      if (s < segs) {
        const r0 = vOffset + s * 2;
        const r1 = r0 + 2;
        bladeIndices.push(r0, r0 + 1, r1, r0 + 1, r1 + 1, r1);
      }
    }
    vOffset += (segs + 1) * 2;
  }

  const grassGeo = trackGeo(new THREE.BufferGeometry());
  grassGeo.setAttribute('position', new THREE.Float32BufferAttribute(bladePositions, 3));
  grassGeo.setAttribute('normal', new THREE.Float32BufferAttribute(bladeNormals, 3));
  grassGeo.setAttribute('uv', new THREE.Float32BufferAttribute(bladeUvs, 2));
  grassGeo.setIndex(bladeIndices);

  const grassUniforms = {
    uTime: { value: 0 },
    uWindDir: { value: new THREE.Vector2(0.92, -0.38) },
    uWindStrength: { value: 1.0 },
    uGustFactor: { value: 0.3 },
  };

  const grassMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })
  );

  grassMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = grassUniforms.uTime;
    shader.uniforms.uWindDir = grassUniforms.uWindDir;
    shader.uniforms.uWindStrength = grassUniforms.uWindStrength;
    shader.uniforms.uGustFactor = grassUniforms.uGustFactor;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime;
        uniform vec2 uWindDir;
        uniform float uWindStrength;
        uniform float uGustFactor;
        varying float vGrassHeight;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vGrassHeight = uv.y;
        #ifdef USE_INSTANCING
          vec4 instWorld = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        #else
          vec4 instWorld = vec4(0.0, 0.0, 0.0, 1.0);
        #endif
        float proj = dot(instWorld.xz, uWindDir);
        float gustWave = sin(proj * 0.34 - uTime * (2.3 + uWindStrength * 1.45)) * 0.5 + 0.5;
        float flutter = sin(uTime * 5.0 + instWorld.x * 1.85 + instWorld.z * 2.2) * 0.15;
        float bend = (uWindStrength * (0.26 + gustWave * 0.34 + uGustFactor * 0.36) + flutter) * uv.y * uv.y;
        transformed.x += uWindDir.x * bend;
        transformed.z += uWindDir.y * bend;
        transformed.y -= abs(bend) * 0.25;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying float vGrassHeight;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        // Muted coastal heather-green roots fading into weathered olive & dry golden-straw tips
        vec3 rootCol = vec3(0.13, 0.17, 0.075);
        vec3 tipCol = vec3(0.54, 0.49, 0.26);
        diffuseColor.rgb *= mix(rootCol, tipCol, smoothstep(0.04, 0.96, vGrassHeight));`
      );
  };
  grassMat.customProgramCacheKey = () => 'coastal-wind-grass-v2';

  const grassMesh = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);
  grassMesh.frustumCulled = false;

  // Varied coastal grass palette: muted sage, deep coastal olive, dry straw, damp moss
  const grassPalette: Array<[number, number, number]> = [
    [0.86, 0.92, 0.72], // muted sage-olive
    [1.12, 0.98, 0.68], // dry golden sea straw
    [0.72, 0.84, 0.64], // damp coastal moss green
    [1.02, 0.90, 0.74], // weathered dune grass
  ];

  let gPlaced = 0;
  for (let attempt = 0; attempt < grassCount * 9 && gPlaced < grassCount; attempt++) {
    const isForegroundBluff = rand() < 0.48;
    const x = isForegroundBluff ? 6.8 + rand() * 15.5 : 3.2 + rand() * 24.0;
    const z = isForegroundBluff ? 9.8 + rand() * 9.5 : -9.5 + rand() * 23.5;

    // Organic cluster density field: creates natural pockets & bare rock clearings instead of uniform carpet
    const clusterField = fbm2D(x * 0.28 + 1.9, z * 0.28 - 3.4, 2) * 0.5 + 0.5;
    if (rand() > clusterField * 1.15 + 0.18) continue;

    const h = islandHeightAt(x, z);
    const hx = islandHeightAt(x + 0.4, z);
    const hz = islandHeightAt(x, z + 0.4);
    const slope = Math.hypot(hx - h, hz - h) / 0.4;

    // Strict root anchoring on soil ledges only — zero intersection with buildings, walkway, or sheer cliffs
    if (h > 2.35 && slope < 0.96 && !isNearArchitecturalExclusion(x, z, 0.18)) {
      const heightTier = rand();
      const scaleH =
        (isForegroundBluff ? 0.75 : 0.48) +
        (heightTier < 0.25 ? rand() * 0.35 : heightTier < 0.75 ? 0.35 + rand() * 0.5 : 0.8 + rand() * 0.65);
      const scaleW = 0.68 + rand() * 0.72;
      // Align slight root tilt toward local terrain slope + organic irregular angle
      const tiltX = Math.max(-0.22, Math.min(0.22, (hz - h) * 0.4)) + (rand() - 0.5) * 0.14;
      const tiltZ = Math.max(-0.22, Math.min(0.22, -(hx - h) * 0.4)) + (rand() - 0.5) * 0.14;

      dummy.position.set(x, h - 0.08, z);
      dummy.rotation.set(tiltX, rand() * Math.PI * 2, tiltZ);
      dummy.scale.set(scaleW, scaleH, scaleW);
      dummy.updateMatrix();
      grassMesh.setMatrixAt(gPlaced, dummy.matrix);

      const pal = grassPalette[Math.floor(rand() * grassPalette.length)];
      const brightness = 0.8 + rand() * 0.35;
      tint.setRGB(pal[0] * brightness, pal[1] * brightness, pal[2] * brightness);
      grassMesh.setColorAt(gPlaced, tint);
      gPlaced++;
    }
  }
  grassMesh.count = gPlaced;
  grassMesh.instanceMatrix.needsUpdate = true;
  if (grassMesh.instanceColor) grassMesh.instanceColor.needsUpdate = true;
  group.add(grassMesh);

  // =========================================================================
  // 4. DISTANT MISTY HORIZON MOUNTAINS / COASTAL ISLANDS
  // =========================================================================
  const mountainMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x222530,
      roughness: 0.98,
      metalness: 0.0,
    })
  );

  const buildMountainRidge = (
    cx: number,
    cz: number,
    length: number,
    width: number,
    maxH: number,
    rotY: number,
    seed: number
  ) => {
    const geo = trackGeo(new THREE.PlaneGeometry(length, width, 48, 12));
    geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const lx = p.getX(i);
      const lz = p.getZ(i);
      const nx = lx / (length * 0.5);
      const nz = lz / (width * 0.5);
      const env = Math.pow(Math.max(0, 1 - nx * nx), 1.35) * Math.max(0, 1 - nz * nz);
      const ridge =
        Math.abs(Math.sin(nx * 3.8 + seed)) * 0.52 +
        Math.abs(Math.cos(nx * 8.4 - seed * 1.7)) * 0.28 +
        Math.abs(Math.sin(nx * 14.5 + seed * 2.3)) * 0.12 +
        0.18;
      p.setY(i, env * ridge * maxH - 1.8);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mountainMat);
    mesh.position.set(cx, 0, cz);
    mesh.rotation.y = rotY;
    group.add(mesh);
  };

  // Layered distant coastal mountain range under the left sunset horizon (never intruding behind tower base)
  buildMountainRidge(-142, -92, 138, 34, 15.5, 0.28, 1.4);
  buildMountainRidge(-172, -30, 118, 30, 11.5, 0.88, 3.1);
  buildMountainRidge(-110, -145, 110, 32, 13.0, 0.12, 4.7);

  // =========================================================================
  // 5. DEBUG COLLISION BOUNDARY VISUALIZER (Boat & Shoreline Safety Bounds)
  // =========================================================================
  const collisionGroup = new THREE.Group();
  collisionGroup.visible = false;
  group.add(collisionGroup);

  const colMat = trackMat(
    new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.88 })
  );
  const safeMat = trackMat(
    new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.88 })
  );

  ISLAND_COLLIDERS.forEach((c) => {
    const pts: THREE.Vector3[] = [];
    const segs = 32;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(c.x + Math.cos(a) * c.radius, 1.2, c.z + Math.sin(a) * c.radius)
      );
    }
    const geo = trackGeo(new THREE.BufferGeometry().setFromPoints(pts));
    collisionGroup.add(new THREE.Line(geo, colMat));
  });

  const { minX, maxX, minZ, maxZ } = SAFE_WATER_BOUNDS;
  const safePts = [
    new THREE.Vector3(minX, 1.0, minZ),
    new THREE.Vector3(maxX, 1.0, minZ),
    new THREE.Vector3(maxX, 1.0, maxZ),
    new THREE.Vector3(minX, 1.0, maxZ),
    new THREE.Vector3(minX, 1.0, minZ),
  ];
  collisionGroup.add(
    new THREE.Line(
      trackGeo(new THREE.BufferGeometry().setFromPoints(safePts)),
      safeMat
    )
  );

  return {
    group,
    collisionGroup,
    rockUniforms,
    grassUniforms,
    update: ({
      time,
      windDirX,
      windDirZ,
      windStrength,
      gustFactor,
      rockWetness,
      waveAmplitude,
      showCollisions,
    }) => {
      rockUniforms.uRainWetness.value = rockWetness;
      rockUniforms.uWaveHeight.value = waveAmplitude;

      grassUniforms.uTime.value = time;
      grassUniforms.uWindDir.value.set(windDirX, windDirZ);
      grassUniforms.uWindStrength.value = windStrength;
      grassUniforms.uGustFactor.value = gustFactor;

      collisionGroup.visible = showCollisions;
    },
    dispose: () => {
      disposables.forEach((d) => d.dispose());
    },
  };
}
