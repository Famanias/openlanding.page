import * as THREE from 'three';
import type { ProceduralTextureSet } from './textures';
import { createSeededRandom, type NeighborMushroomTarget } from '../logic/networkGenerator';
import {
  buildParasolMushroom,
  type BuiltMushroomModel,
  type MushroomGrowthStage,
} from './models/mushroomModel';
import { computeSunlightState, smoothstep } from '../logic/chapters';
import { buildSoilDescentCrossSection } from './soilDescent';

export interface BuiltForestAndSoil {
  rootGroup: THREE.Group;
  neighborMushrooms: BuiltMushroomModel[];
  fairyRingMushrooms: BuiltMushroomModel[];
  updateAtProgress: (params: {
    progress: number;
    undergroundFactor: number;
    gillSporeIntensity: number;
    fairyRingGrowth: number;
    elapsedSec: number;
    sunlight?: number;
  }) => void;
  triggerMushroomGlow: (mushroomIndex: number) => void;
}

/**
 * Builds the macro forest floor and subterranean ant-farm soil cross-section:
 * 1. Damp dark loam soil ground with procedural normal/roughness relief & Ch 6 foxfire surface shimmer
 * 2. Low clumps of moss built from 2,600 dense short moss fibres clustered in natural colonies
 * 3. Sculpted, curled, veined brown/ochre fallen leaves, branched twigs, and pine needles
 * 4. Chapter 2->4 Ant-Farm Soil Cross-Section Descent (leaf litter with white underside hyphae,
 *    moist crumbly humus with pale root hairs & woodlouse tunnel, brown topsoil with pebbles &
 *    thick diagonal branching tree root, redder clay subsoil with rounded rocks, foxfire cracks,
 *    earthen clump pocket, and foreground parallax crumbs)
 * 5. Chapter 4 neighboring mushrooms & Chapter 6 varied-age fairy ring (drumstick, half-open, open)
 */
export function buildForestAndSoil(
  textures: ProceduralTextureSet,
  neighborTargets: NeighborMushroomTarget[],
  seed = 2026,
): BuiltForestAndSoil {
  const rand = createSeededRandom(seed);
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ForestFloorAndSoilStrata';

  const getGroundHeightAt = (x: number, z: number): number => {
    const dist = Math.hypot(x, z);
    if (dist < 0.68) return 0;
    const blend = Math.min(1, (dist - 0.68) / 1.8);
    return (
      (Math.sin(x * 0.65) * Math.cos(z * 0.65) * 0.12 +
        Math.sin(x * 1.8 + z * 1.4) * 0.04 +
        Math.cos(x * 3.4 - z * 2.9) * 0.015) *
      blend
    );
  };

  // Remap helper so surface props in front of the cut line (z > 0.34, |x| < 1.9) sit right along
  // the cut edge for a crisp silhouette at Breaking Ground without floating over the camera trench
  const constrainToCutLip = (x: number, z: number): [number, number] => {
    if (Math.abs(x) < 1.95 && z > 0.34 && z < 3.4) {
      const lipZ = 0.08 + (z - 0.34) * 0.095 + Math.sin(x * 3.2) * 0.05;
      return [x, lipZ];
    }
    return [x, z];
  };

  // 1. Damp dark forest soil surface (y = 0)
  const floorGeo = new THREE.PlaneGeometry(36, 36, 64, 64);
  floorGeo.rotateX(-Math.PI / 2);
  const fPos = floorGeo.attributes.position;
  for (let i = 0; i < fPos.count; i++) {
    const fx = fPos.getX(i);
    const fz = fPos.getZ(i);
    fPos.setY(i, getGroundHeightAt(fx, fz));
  }
  floorGeo.computeVertexNormals();

  const floorCutUniform = { value: 0.0 };
  const floorMat = new THREE.MeshStandardMaterial({
    map: textures.soilColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.09,
    color: new THREE.Color('#221912'),
    roughness: 0.88,
    metalness: 0.02,
    transparent: true,
    opacity: 1,
  });
  floorMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTrenchCut = floorCutUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vFloorWorldPos;',
      )
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvFloorWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nuniform float uTrenchCut;\nvarying vec3 vFloorWorldPos;',
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        if (uTrenchCut > 0.01) {
          float cutZ = 0.24 + 0.07 * sin(vFloorWorldPos.x * 2.8);
          if (abs(vFloorWorldPos.x) < 3.6 && vFloorWorldPos.z > cutZ) {
            discard;
          }
        }`,
      );
  };
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.receiveShadow = true;
  rootGroup.add(floorMesh);

  // Soft radial contact shadow directly beneath the hero mushroom bulb
  const contactGeo = new THREE.CircleGeometry(1.35, 32);
  contactGeo.rotateX(-Math.PI / 2);
  const contactMat = new THREE.MeshBasicMaterial({
    color: 0x030201,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });
  const contactDisc = new THREE.Mesh(contactGeo, contactMat);
  contactDisc.position.y = 0.012;
  rootGroup.add(contactDisc);

  // Subtle Foxfire shimmer ring on the soil in Chapter 6 where the underground network surfaces
  const shimmerGeo = new THREE.RingGeometry(1.15, 2.55, 64, 4);
  shimmerGeo.rotateX(-Math.PI / 2);
  const shimmerMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uStrength: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uStrength;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        float r = length(vPos.xz);
        float ring = exp(-pow((r - 1.85) / 0.38, 2.0));
        float angle = atan(vPos.z, vPos.x);
        float veins = 0.5 + 0.5 * sin(angle * 14.0 + r * 6.0 - uTime * 1.4) * cos(angle * 9.0 - r * 8.0);
        vec3 foxfire = vec3(0.68, 0.84, 0.24);
        float alpha = ring * veins * uStrength * 0.22;
        gl_FragColor = vec4(foxfire, alpha);
      }
    `,
  });
  const shimmerMesh = new THREE.Mesh(shimmerGeo, shimmerMat);
  shimmerMesh.position.y = 0.02;
  shimmerMesh.visible = false;
  rootGroup.add(shimmerMesh);

  const surfaceDetailsGroup = new THREE.Group();
  rootGroup.add(surfaceDetailsGroup);

  const dummy = new THREE.Object3D();
  const itemColor = new THREE.Color();

  // 2. Low clumps of moss built as 2,600 dense short moss fibres clustered in natural colonies
  const mossClusterCenters: Array<{ x: number; z: number; spread: number }> = [];
  for (let c = 0; c < 42; c++) {
    const ang = (c / 42) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const rad = 0.48 + Math.pow(rand(), 0.72) * 6.2;
    mossClusterCenters.push({
      x: Math.cos(ang) * rad,
      z: Math.sin(ang) * rad,
      spread: 0.22 + rand() * 0.38,
    });
  }

  const mossFibreCount = 2600;
  // Tapered curved moss stalk blade
  const mossStalkGeo = new THREE.ConeGeometry(0.014, 0.095, 3);
  mossStalkGeo.translate(0, 0.045, 0);
  const msPos = mossStalkGeo.attributes.position;
  for (let i = 0; i < msPos.count; i++) {
    const my = msPos.getY(i);
    msPos.setX(i, msPos.getX(i) + my * my * 0.18);
  }
  mossStalkGeo.computeVertexNormals();

  const mossMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.92,
    metalness: 0.0,
  });
  const mossInst = new THREE.InstancedMesh(mossStalkGeo, mossMat, mossFibreCount);
  mossInst.receiveShadow = true;

  for (let i = 0; i < mossFibreCount; i++) {
    const cluster = mossClusterCenters[i % mossClusterCenters.length];
    const localR = Math.pow(rand(), 0.65) * cluster.spread;
    const localAng = rand() * Math.PI * 2;
    const rawX = cluster.x + Math.cos(localAng) * localR;
    const rawZ = cluster.z + Math.sin(localAng) * localR;
    const [mx, mz] = constrainToCutLip(rawX, rawZ);
    const my = getGroundHeightAt(mx, mz) - 0.008;

    dummy.position.set(mx, my, mz);
    dummy.rotation.set(
      (rand() - 0.5) * 0.55,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.55,
    );
    const hScale = (0.65 + rand() * 0.85) * (1 - (localR / cluster.spread) * 0.45);
    dummy.scale.set(0.8 + rand() * 0.6, Math.max(0.35, hScale), 0.8 + rand() * 0.6);
    dummy.updateMatrix();
    mossInst.setMatrixAt(i, dummy.matrix);

    // Muted forest moss olive & deep bryophyte green
    itemColor.setHSL(0.24 + (rand() - 0.5) * 0.04, 0.44, 0.11 + rand() * 0.08);
    mossInst.setColorAt(i, itemColor);
  }
  mossInst.instanceMatrix.needsUpdate = true;
  if (mossInst.instanceColor) mossInst.instanceColor.needsUpdate = true;
  mossInst.computeBoundingSphere();
  surfaceDetailsGroup.add(mossInst);

  // 3. Curled, veined brown & ochre leaf litter (sculpted ovate leaf blade with petiole & curled edges)
  const leafCount = 190;
  const leafGeo = new THREE.PlaneGeometry(0.34, 0.20, 6, 4);
  leafGeo.rotateX(-Math.PI / 2);
  const lPos = leafGeo.attributes.position;
  for (let i = 0; i < lPos.count; i++) {
    const lx = lPos.getX(i); // -0.17 to +0.17 along midrib
    const lz = lPos.getZ(i); // -0.10 to +0.10 across blade width
    const u = Math.max(0, Math.min(1, (lx + 0.17) / 0.34)); // 0 at base, 1 at tip
    // Ovate leaf silhouette tapering to a point at u=1 and pinched petiole at u=0
    const widthProfile = Math.sin(Math.pow(u, 0.85) * Math.PI) * (1 + 0.12 * Math.sin(u * Math.PI * 5));
    const shapedZ = lz * Math.max(0.06, widthProfile);
    // Natural upward dry-leaf curl at margins and longitudinal arch
    const marginCurl = Math.pow(shapedZ / 0.10, 2) * 0.032;
    const midribArch = Math.sin(u * Math.PI) * 0.018 - Math.pow(u - 0.5, 2) * 0.025;
    lPos.setXYZ(i, lx, marginCurl + midribArch, shapedZ);
  }
  leafGeo.computeVertexNormals();

  const leafMat = new THREE.MeshStandardMaterial({
    map: textures.leafColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.015,
    color: new THREE.Color('#ffffff'),
    roughness: 0.82,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  const leafInst = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
  leafInst.receiveShadow = true;

  for (let i = 0; i < leafCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.52 + Math.pow(rand(), 0.72) * 7.8;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [lx, lz] = constrainToCutLip(rawX, rawZ);
    const ly = getGroundHeightAt(lx, lz) + 0.008 + rand() * 0.018;

    dummy.position.set(lx, ly, lz);
    dummy.rotation.set(
      (rand() - 0.5) * 0.28,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.28,
    );
    const s = 0.7 + rand() * 1.1;
    dummy.scale.set(s, s, s * (0.85 + rand() * 0.3));
    dummy.updateMatrix();
    leafInst.setMatrixAt(i, dummy.matrix);

    // Varied autumn/forest floor umber, russet, and muted ochre
    itemColor.setHSL(0.065 + rand() * 0.035, 0.42 + rand() * 0.18, 0.18 + rand() * 0.14);
    leafInst.setColorAt(i, itemColor);
  }
  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();
  surfaceDetailsGroup.add(leafInst);

  // 4. Fallen twigs & pine needles on the forest floor
  const twigCount = 65;
  const twigGeo = new THREE.CylinderGeometry(0.008, 0.014, 0.48, 5, 4);
  twigGeo.rotateZ(Math.PI * 0.5);
  const twPos = twigGeo.attributes.position;
  for (let i = 0; i < twPos.count; i++) {
    const tx = twPos.getX(i);
    twPos.setY(i, twPos.getY(i) + Math.sin(tx * 9) * 0.014);
  }
  twigGeo.computeVertexNormals();

  const twigMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    roughness: 0.92,
    metalness: 0.0,
  });
  const twigInst = new THREE.InstancedMesh(twigGeo, twigMat, twigCount);
  for (let i = 0; i < twigCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.58 + Math.pow(rand(), 0.75) * 7.2;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [tx, tz] = constrainToCutLip(rawX, rawZ);
    dummy.position.set(tx, getGroundHeightAt(tx, tz) + 0.01, tz);
    dummy.rotation.set((rand() - 0.5) * 0.15, rand() * Math.PI * 2, (rand() - 0.5) * 0.15);
    dummy.scale.set(0.6 + rand() * 1.1, 0.7 + rand() * 0.6, 0.7 + rand() * 0.6);
    dummy.updateMatrix();
    twigInst.setMatrixAt(i, dummy.matrix);
  }
  twigInst.instanceMatrix.needsUpdate = true;
  twigInst.computeBoundingSphere();
  surfaceDetailsGroup.add(twigInst);

  // Pine needles (LineSegments)
  const needleCount = 900;
  const needlePositions = new Float32Array(needleCount * 6);
  for (let i = 0; i < needleCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.42 + Math.pow(rand(), 0.7) * 6.8;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [nx, nz] = constrainToCutLip(rawX, rawZ);
    const ny = getGroundHeightAt(nx, nz) + 0.006;
    const dir = rand() * Math.PI * 2;
    const len = 0.11 + rand() * 0.08;
    needlePositions[i * 6 + 0] = nx;
    needlePositions[i * 6 + 1] = ny;
    needlePositions[i * 6 + 2] = nz;
    needlePositions[i * 6 + 3] = nx + Math.cos(dir) * len;
    needlePositions[i * 6 + 4] = ny + 0.004;
    needlePositions[i * 6 + 5] = nz + Math.sin(dir) * len;
  }
  const needleGeo = new THREE.BufferGeometry();
  needleGeo.setAttribute('position', new THREE.BufferAttribute(needlePositions, 3));
  const needleMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#3b2818'),
    transparent: true,
    opacity: 0.65,
  });
  const needleLines = new THREE.LineSegments(needleGeo, needleMat);
  surfaceDetailsGroup.add(needleLines);

  // 5. Subtle warm shaft of forest light from upper-left (angle & color synchronized with Sunlight slider)
  const shaftGeo = new THREE.CylinderGeometry(1.0, 2.5, 8.5, 24, 1, true);
  shaftGeo.translate(0, 4.1, 0);
  const shaftMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uOpacity: { value: 0.055 },
      uColor: { value: new THREE.Color('#e0bc84') },
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
      uniform float uOpacity;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      void main() {
        vec3 viewDir = normalize(vViewPos);
        float edgeFade = pow(abs(dot(vNormal, viewDir)), 1.7);
        float verticalFade = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));
        gl_FragColor = vec4(uColor, edgeFade * verticalFade * uOpacity);
      }
    `,
  });
  const lightShaft = new THREE.Mesh(shaftGeo, shaftMat);
  lightShaft.rotation.z = 0.22;
  lightShaft.rotation.x = 0.08;
  rootGroup.add(lightShaft);

  // 6. Chapter 02 -> 04 "Ant-Farm Glass" Soil Cross-Section Descent & Clump Pocket
  const soilDescent = buildSoilDescentCrossSection(textures, seed + 101);
  rootGroup.add(soilDescent.group);

  // 7. Drifting Spore Motes above ground + Falling Gill Spores in Ch 2 + Underground Soil Dust in Ch 3-4
  const moteCount = 380;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount);

  for (let i = 0; i < moteCount; i++) {
    moteSeeds[i] = rand();
    const angle = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.65) * 4.2;
    motePositions[i * 3 + 0] = Math.cos(angle) * r;
    // Half above ground (0.1..4.2), half subterranean soil dust (-3.4..0.0)
    motePositions[i * 3 + 1] = i < moteCount * 0.55 ? 0.15 + rand() * 4.2 : -0.1 - rand() * 3.3;
    motePositions[i * 3 + 2] = Math.sin(angle) * r;
  }

  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  moteGeo.setAttribute('aSeed', new THREE.BufferAttribute(moteSeeds, 1));

  const moteMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uGillFall: { value: 0 },
      uUnderground: { value: 0 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute float aSeed;
      uniform float uTime;
      uniform float uGillFall;
      uniform float uUnderground;
      varying float vAlpha;
      varying float vIsSubterranean;

      void main() {
        vec3 pos = position;
        vIsSubterranean = pos.y < 0.0 ? 1.0 : 0.0;

        if (pos.y >= 0.0) {
          float fallSpeed = mix(0.06, 0.52, uGillFall);
          pos.y = mod(pos.y - uTime * fallSpeed + aSeed * 4.2, 4.2);
          pos.x += sin(uTime * 0.65 + aSeed * 12.0) * 0.12;
          pos.z += cos(uTime * 0.55 + aSeed * 9.0) * 0.12;
          pos.xz *= mix(1.0, 0.46, uGillFall);
        } else {
          // Slow drifting underground soil dust
          pos.x += sin(uTime * 0.35 + aSeed * 15.0) * 0.08;
          pos.y += cos(uTime * 0.28 + aSeed * 11.0) * 0.05;
          pos.z += sin(uTime * 0.32 + aSeed * 19.0) * 0.08;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (10.0 + aSeed * 12.0) * (1.0 / max(0.5, -mvPosition.z));
        float pulse = 0.35 + 0.65 * sin(uTime * 1.4 + aSeed * 6.28);
        vAlpha = pulse * (vIsSubterranean > 0.5 ? uUnderground * 0.55 : (1.0 - uUnderground * 0.7));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uSprite;
      varying float vAlpha;
      varying float vIsSubterranean;

      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.05) discard;
        vec3 warmMote = vec3(0.84, 0.76, 0.62);
        vec3 soilDust = vec3(0.58, 0.52, 0.40);
        vec3 col = mix(warmMote, soilDust, vIsSubterranean);
        gl_FragColor = vec4(col, tex.a * vAlpha * 0.75);
      }
    `,
  });

  const sporeMotes = new THREE.Points(moteGeo, moteMat);
  rootGroup.add(sporeMotes);

  // 8. Chapter 4 Neighboring Mushrooms linked by the underground mycelium network
  const neighborMushrooms: BuiltMushroomModel[] = [];
  const mushroomGlowTimers = new Float32Array(neighborTargets.length);

  for (let i = 0; i < neighborTargets.length; i++) {
    const target = neighborTargets[i];
    const stage: MushroomGrowthStage = i % 3 === 1 ? 'half' : 'open';
    const m = buildParasolMushroom(textures, 800 + i * 31, false, stage);
    m.group.position.set(target.position[0], target.position[1], target.position[2]);
    m.group.scale.setScalar(target.scale);
    m.group.rotation.y = rand() * Math.PI * 2;
    neighborMushrooms.push(m);
    rootGroup.add(m.group);
  }

  // 9. Chapter 6 Fairy Ring of new mushrooms fruiting around the original
  //    Varied in size, age (closed drumstick-shaped young caps, half-open ones, fully open parasols),
  //    tilt, and rotation. Zero glow on them.
  const fairyRingMushrooms: BuiltMushroomModel[] = [];
  const fairyRingBaseScales: number[] = [];
  const fairyStages: MushroomGrowthStage[] = [
    'drumstick',
    'open',
    'half',
    'drumstick',
    'half',
    'open',
    'drumstick',
    'half',
  ];
  const fairyCount = fairyStages.length;

  for (let i = 0; i < fairyCount; i++) {
    const stage = fairyStages[i];
    const angle = (i / fairyCount) * Math.PI * 2 + 0.28 + (rand() - 0.5) * 0.22;
    const radius = 1.65 + (rand() - 0.5) * 0.65;
    const m = buildParasolMushroom(textures, 1200 + i * 19, false, stage);
    const targetScale =
      stage === 'drumstick'
        ? 0.28 + rand() * 0.14
        : stage === 'half'
        ? 0.42 + rand() * 0.16
        : 0.52 + rand() * 0.18;
    fairyRingBaseScales.push(targetScale);

    const gx = Math.cos(angle) * radius;
    const gz = Math.sin(angle) * radius;
    m.group.position.set(gx, getGroundHeightAt(gx, gz), gz);
    m.group.rotation.set(
      (rand() - 0.5) * 0.22,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.22,
    );
    m.group.scale.setScalar(0.001);
    m.group.visible = false;
    // Never glow in Chapter 6
    m.setBioluminescence(0);
    fairyRingMushrooms.push(m);
    rootGroup.add(m.group);
  }

  let lastElapsed = 0;

  const updateAtProgress = (params: {
    progress: number;
    undergroundFactor: number;
    gillSporeIntensity: number;
    fairyRingGrowth: number;
    elapsedSec: number;
    sunlight?: number;
  }) => {
    const dt = Math.max(0, Math.min(0.1, params.elapsedSec - lastElapsed));
    lastElapsed = params.elapsedSec;
    const sunState = computeSunlightState(params.sunlight ?? 0.75);

    moteMat.uniforms.uTime.value = params.elapsedSec;
    moteMat.uniforms.uGillFall.value = params.gillSporeIntensity;
    moteMat.uniforms.uUnderground.value = params.undergroundFactor;
    sporeMotes.visible = params.progress < 0.77 || params.progress > 0.895;

    const inDescentTrench =
      smoothstep(0.21, 0.245, params.progress) *
      (1 - smoothstep(0.58, 0.63, params.progress));
    floorCutUniform.value = inDescentTrench;

    floorMat.opacity = 1 - params.undergroundFactor * 0.25;
    floorMesh.visible = params.progress < 0.35 || params.progress > 0.86;
    contactDisc.visible = params.progress < 0.265 || params.progress > 0.88;
    surfaceDetailsGroup.visible = params.progress < 0.35 || params.progress > 0.86;

    soilDescent.updateDescent({
      progress: params.progress,
      undergroundFactor: params.undergroundFactor,
      networkGrowth: 0,
      elapsedSec: params.elapsedSec,
      sunColorRgb: sunState.sunColorRgb,
      sunlight: sunState.sunlight,
    });

    shaftMat.uniforms.uOpacity.value =
      0.055 * (1 - params.undergroundFactor * 0.75) * sunState.godRayOpacityMultiplier;
    shaftMat.uniforms.uColor.value.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    lightShaft.rotation.z = 0.42 - sunState.sunlight * 0.32;
    lightShaft.visible = params.undergroundFactor < 0.95;

    // Chapter 6 faint foxfire shimmer on the soil where the network surfaces
    shimmerMesh.visible = params.fairyRingGrowth > 0.05;
    shimmerMat.uniforms.uStrength.value = params.fairyRingGrowth;
    shimmerMat.uniforms.uTime.value = params.elapsedSec;

    // Neighboring mushrooms are only revealed during Chapter 4b (wide underground network view)
    const showNeighbors = params.progress >= 0.54 && params.progress < 0.74;
    for (let i = 0; i < neighborMushrooms.length; i++) {
      neighborMushrooms[i].group.visible = showNeighbors;
      if (mushroomGlowTimers[i] > 0) {
        mushroomGlowTimers[i] = Math.max(0, mushroomGlowTimers[i] - dt * 1.1);
      }
      // Only glow briefly when a click pulse reaches them
      const pulseBoost = Math.sin(mushroomGlowTimers[i] * Math.PI) * 0.85;
      neighborMushrooms[i].setBioluminescence(pulseBoost);
    }

    // Update Chapter 6 fairy ring fruiting growth (no glow, natural light)
    for (let i = 0; i < fairyRingMushrooms.length; i++) {
      const m = fairyRingMushrooms[i];
      const stagger = i * 0.07;
      const localG = Math.max(
        0,
        Math.min(1, (params.fairyRingGrowth - stagger) / (1 - stagger * 0.65)),
      );
      m.group.visible = localG > 0.01;
      if (localG > 0.01) {
        const ease = 1 - Math.pow(1 - localG, 3);
        const s = fairyRingBaseScales[i] * ease;
        m.group.scale.set(s * (0.88 + (i % 3) * 0.08), s * (0.72 + 0.28 * ease), s);
        const baseGroundY = getGroundHeightAt(m.group.position.x, m.group.position.z);
        m.group.position.y = baseGroundY + (1 - ease) * -0.55;
        m.setBioluminescence(0);
      }
    }
  };

  const triggerMushroomGlow = (mushroomIndex: number) => {
    if (mushroomIndex >= 0 && mushroomIndex < mushroomGlowTimers.length) {
      mushroomGlowTimers[mushroomIndex] = 1.0;
    }
  };

  return {
    rootGroup,
    neighborMushrooms,
    fairyRingMushrooms,
    updateAtProgress,
    triggerMushroomGlow,
  };
}
