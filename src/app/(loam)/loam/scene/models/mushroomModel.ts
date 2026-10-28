import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom } from '../../logic/networkGenerator';

export type MushroomGrowthStage = 'open' | 'half' | 'drumstick';

export interface BuiltMushroomModel {
  group: THREE.Group;
  hitProxy: THREE.Mesh;
  emissiveMaterials: THREE.MeshStandardMaterial[];
  setBioluminescence: (intensity: number) => void;
}

/**
 * Builds a high-craft procedural Macrolepiota procera (Parasol Mushroom)
 * matching the 4 reference specimen photographs:
 * 1. Smooth bulbous base clotted with dark loam soil & short fibrous moss tufts (never a faceted ball)
 * 2. Tall slender cream stem with concentric broken snakeskin brown bands
 * 3. Thick, double-edged, frilled ring (annulus) partway up the stem
 * 4. Cap with dark brown central umbo and concentric rings of raised, curled, pointed 3D brown scale tufts
 * 5. Underneath, 260 very thin, densely packed cream-white radiating gills with deep dark crevices between them
 * Supports `stage: 'open' | 'half' | 'drumstick'` so Chapter 6's fairy ring has varied ages.
 */
export function buildParasolMushroom(
  textures: ProceduralTextureSet,
  seed = 101,
  isHero = true,
  stage: MushroomGrowthStage = 'open',
): BuiltMushroomModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = isHero ? 'HeroParasolMushroom' : `ParasolMushroom_${stage}`;

  const emissiveMaterials: THREE.MeshStandardMaterial[] = [];

  // 1. Smooth bulbous base + tall slender stem (LatheGeometry profile from y=0.0 to y=3.32)
  const stemPoints: THREE.Vector2[] = [];
  const stemSteps = 52;
  for (let i = 0; i <= stemSteps; i++) {
    const t = i / stemSteps;
    const y = t * 3.32;
    let r = 0.105;
    if (t < 0.21) {
      // Smooth organic bulbous base peaking around t = 0.085
      const u = t / 0.21;
      const bulbCurve = Math.sin(u * Math.PI);
      const bottomRound = Math.sqrt(Math.max(0.02, Math.sin(Math.min(1, u * 2.2) * (Math.PI * 0.5))));
      r = (0.12 + 0.31 * Math.pow(bulbCurve, 0.82)) * bottomRound;
    } else {
      // Slender tapering stem from 0.142 above bulb to 0.092 inside collarium
      const shaftT = (t - 0.21) / 0.79;
      r = 0.142 * (1 - shaftT * 0.35);
    }
    stemPoints.push(new THREE.Vector2(r, y));
  }

  const stemGeo = new THREE.LatheGeometry(stemPoints, isHero ? 48 : 28);
  // Subtle smooth organic asymmetry on the bulb without sharp facets
  const posAttr = stemGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    if (vy < 0.72) {
      const ang = Math.atan2(vz, vx);
      const swell = 1 + Math.sin(ang * 3 + vy * 5) * 0.045 + Math.cos(ang * 5 - vy * 7) * 0.03;
      posAttr.setXYZ(i, vx * swell, vy, vz * swell);
    }
  }
  stemGeo.computeVertexNormals();

  const stemMat = new THREE.MeshStandardMaterial({
    map: textures.stemColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.028,
    roughness: 0.84,
    metalness: 0.0,
    emissive: new THREE.Color('#a8cc34'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(stemMat);

  const stemMesh = new THREE.Mesh(stemGeo, stemMat);
  stemMesh.castShadow = true;
  stemMesh.receiveShadow = true;
  group.add(stemMesh);

  // Smooth soil & moss coating shell on the lower bulb (y = 0..0.72)
  const bulbPoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    const y = u * 0.72;
    const bulbCurve = Math.sin(u * Math.PI);
    const bottomRound = Math.sqrt(Math.max(0.02, Math.sin(Math.min(1, u * 2.2) * (Math.PI * 0.5))));
    const r = (0.124 + 0.315 * Math.pow(bulbCurve, 0.82)) * bottomRound;
    bulbPoints.push(new THREE.Vector2(r, y));
  }
  const bulbGeo = new THREE.LatheGeometry(bulbPoints, isHero ? 44 : 24);
  const bPos = bulbGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const vx = bPos.getX(i);
    const vy = bPos.getY(i);
    const vz = bPos.getZ(i);
    const ang = Math.atan2(vz, vx);
    const lump = 1 + Math.sin(ang * 4 + vy * 6) * 0.05 + Math.cos(ang * 7 - vy * 9) * 0.035;
    bPos.setXYZ(i, vx * lump, vy, vz * lump);
  }
  bulbGeo.computeVertexNormals();

  const bulbMat = new THREE.MeshStandardMaterial({
    map: textures.bulbColor,
    bumpMap: textures.bulbBump,
    bumpScale: 0.055,
    roughness: 0.94,
    metalness: 0.0,
  });
  const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
  bulbMesh.castShadow = true;
  bulbMesh.receiveShadow = true;
  group.add(bulbMesh);

  // Fine fibrous green moss tufts & organic dark soil crumbs clinging to the bulb
  if (isHero) {
    const tuftCount = 140;
    // Short tapered curved moss filament blade
    const tuftGeo = new THREE.ConeGeometry(0.012, 0.085, 4);
    tuftGeo.translate(0, 0.04, 0);
    const tuftMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
    });
    const tuftInst = new THREE.InstancedMesh(tuftGeo, tuftMat, tuftCount);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < tuftCount; i++) {
      const clusterAngle = (i % 9) * 0.7 + (rand() - 0.5) * 0.38;
      const h = 0.14 + (i % 7) * 0.065 + (rand() - 0.5) * 0.05;
      const u = Math.max(0.05, Math.min(0.95, h / 0.72));
      const rad = (0.12 + 0.31 * Math.pow(Math.sin(u * Math.PI), 0.82)) * 0.98;
      dummy.position.set(Math.cos(clusterAngle) * rad, h, Math.sin(clusterAngle) * rad);
      dummy.lookAt(Math.cos(clusterAngle) * 2, h + 0.4 + rand() * 0.5, Math.sin(clusterAngle) * 2);
      dummy.rotateZ((rand() - 0.5) * 0.6);
      dummy.scale.set(0.8 + rand() * 0.7, 0.6 + rand() * 0.9, 0.8 + rand() * 0.7);
      dummy.updateMatrix();
      tuftInst.setMatrixAt(i, dummy.matrix);

      color.setHSL(0.25 + (rand() - 0.5) * 0.04, 0.46, 0.16 + rand() * 0.09);
      tuftInst.setColorAt(i, color);
    }
    tuftInst.instanceMatrix.needsUpdate = true;
    if (tuftInst.instanceColor) tuftInst.instanceColor.needsUpdate = true;
    tuftInst.computeBoundingSphere();
    group.add(tuftInst);
  }

  // 2. Thick double-edged movable ring (annulus) partway up the stem (y = 2.28)
  const ringGroup = new THREE.Group();
  ringGroup.position.set(0, 2.28, 0);

  const ringPoints: THREE.Vector2[] = [
    new THREE.Vector2(0.112, -0.11),
    new THREE.Vector2(0.26, -0.095),
    new THREE.Vector2(0.33, -0.045),
    new THREE.Vector2(0.26, 0.0),
    new THREE.Vector2(0.32, 0.048),
    new THREE.Vector2(0.24, 0.095),
    new THREE.Vector2(0.112, 0.085),
  ];
  const ringGeo = new THREE.LatheGeometry(ringPoints, isHero ? 56 : 24);
  const rPos = ringGeo.attributes.position;
  const rColors = new Float32Array(rPos.count * 3);
  for (let i = 0; i < rPos.count; i++) {
    const vx = rPos.getX(i);
    const vy = rPos.getY(i);
    const vz = rPos.getZ(i);
    const radial = Math.hypot(vx, vz);
    const ang = Math.atan2(vz, vx);
    if (radial > 0.18) {
      const frill = 1 + Math.sin(ang * 22) * 0.075 + Math.cos(ang * 13) * 0.05 + Math.sin(ang * 37) * 0.025;
      const droop = Math.sin(ang * 17) * 0.016 - (radial - 0.18) * 0.08;
      rPos.setXYZ(i, vx * frill, vy + droop, vz * frill);
    }
    // Warm cream cuff with brown scale rim on the lower double-edge
    const isLowerRim = vy < -0.025 && radial > 0.23 && Math.sin(ang * 14) > 0.1;
    if (isLowerRim) {
      rColors[i * 3 + 0] = 0.44;
      rColors[i * 3 + 1] = 0.31;
      rColors[i * 3 + 2] = 0.21;
    } else {
      const shade = 0.78 + (vy + 0.11) * 0.35;
      rColors[i * 3 + 0] = shade;
      rColors[i * 3 + 1] = shade * 0.94;
      rColors[i * 3 + 2] = shade * 0.85;
    }
  }
  ringGeo.setAttribute('color', new THREE.BufferAttribute(rColors, 3));
  ringGeo.computeVertexNormals();

  const ringMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    vertexColors: true,
    bumpMap: textures.capBump,
    bumpScale: 0.025,
    roughness: 0.88,
    metalness: 0.0,
    emissive: new THREE.Color('#a8cc34'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(ringMat);
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.castShadow = true;
  ringMesh.receiveShadow = true;
  ringGroup.add(ringMesh);
  group.add(ringGroup);

  // 3. Cap profile & radius based on growth stage ('open' parasol, 'half' bell, or 'drumstick' young closed cap)
  const capRadius = stage === 'open' ? 1.48 : stage === 'half' ? 0.96 : 0.48;
  const getCapSurfaceY = (r: number): number => {
    const t = Math.min(1, Math.max(0, r / capRadius));
    if (stage === 'drumstick') {
      return 2.65 + 0.82 * Math.cos(t * Math.PI * 0.52);
    }
    if (stage === 'half') {
      const umbo = 0.14 * Math.exp(-Math.pow(t / 0.22, 2) * 2.0);
      return 2.88 + 0.62 * Math.cos(t * Math.PI * 0.49) + umbo;
    }
    const umboBump = 0.17 * Math.exp(-Math.pow(t / 0.16, 2) * 2.2);
    const mainDome = 0.44 * Math.cos(t * Math.PI * 0.48);
    const rimTuck = t > 0.88 ? -Math.pow((t - 0.88) / 0.12, 2) * 0.065 : 0;
    return 3.08 + mainDome + umboBump + rimTuck;
  };

  const capPoints: THREE.Vector2[] = [];
  const capProfileSteps = 36;
  for (let i = 0; i <= capProfileSteps; i++) {
    const t = i / capProfileSteps;
    const r = t * capRadius;
    const y = getCapSurfaceY(r);
    capPoints.push(new THREE.Vector2(r, y));
  }
  const marginY = getCapSurfaceY(capRadius);
  capPoints.push(new THREE.Vector2(capRadius * 0.97, marginY - 0.02));
  capPoints.push(new THREE.Vector2(0.17, 3.24));
  capPoints.push(new THREE.Vector2(0.10, 3.22));

  const capGeo = new THREE.LatheGeometry(capPoints, isHero ? 64 : 32);
  const capPos = capGeo.attributes.position;
  const capUvs = capGeo.attributes.uv;
  for (let i = 0; i < capPos.count; i++) {
    const vx = capPos.getX(i);
    const vy = capPos.getY(i);
    const vz = capPos.getZ(i);
    const radial = Math.hypot(vx, vz);
    if (radial > capRadius * 0.82) {
      const ang = Math.atan2(vz, vx);
      const fringe =
        1 +
        Math.sin(ang * 31) * 0.018 +
        Math.cos(ang * 19) * 0.014 +
        Math.sin(ang * 53) * 0.008;
      capPos.setXYZ(i, vx * fringe, vy, vz * fringe);
    }
    const u = 0.5 + vx / (capRadius * 2.04);
    const v = 0.5 + vz / (capRadius * 2.04);
    capUvs.setXY(i, u, v);
  }
  capGeo.computeVertexNormals();

  const capMat = new THREE.MeshStandardMaterial({
    map: textures.capColor,
    bumpMap: textures.capBump,
    bumpScale: 0.032,
    roughness: 0.86,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(capMat);

  const capMesh = new THREE.Mesh(capGeo, capMat);
  capMesh.castShadow = true;
  capMesh.receiveShadow = true;
  group.add(capMesh);

  // Dark inner cap recess ceiling so looking up in Chapter 2 shows deep dark crevices between the gills
  if (stage !== 'drumstick') {
    const recessGeo = new THREE.ConeGeometry(capRadius * 0.96, 0.18, 48, 1, true);
    const recessMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#1a120b'),
      side: THREE.BackSide,
    });
    const recessMesh = new THREE.Mesh(recessGeo, recessMat);
    recessMesh.position.set(0, 3.16, 0);
    group.add(recessMesh);
  }

  // 4. Real 3D Cap Scales: raised, curled, pointed tufts arranged in concentric rings,
  // densest and darkest near the umbo, sparser toward the shaggy margin
  const ringRadii = isHero
    ? [0.22, 0.30, 0.39, 0.49, 0.60, 0.72, 0.85, 0.99, 1.13, 1.27, 1.39]
    : [0.24, 0.42, 0.64, 0.88, 1.14, 1.34].map((r) => r * (capRadius / 1.48));
  const ringCounts = isHero
    ? [28, 32, 36, 38, 38, 36, 34, 30, 26, 22, 18]
    : [14, 16, 18, 16, 14, 12];

  const totalScales = ringCounts.reduce((acc, n) => acc + n, 0);

  // Build a custom sculpted 3D curled, pointed tuft geometry
  // Root sits flush on the cap at z = -0.045; body arches and tapers to a curled pointed tip at z = +0.055
  const scaleGeo = new THREE.BoxGeometry(0.088, 0.022, 0.095, 4, 2, 5);
  const sPos = scaleGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const sx = sPos.getX(i);
    const sy = sPos.getY(i);
    const sz = sPos.getZ(i); // -0.0475 (inner root) to +0.0475 (outer tip)
    const u = (sz + 0.0475) / 0.095; // 0 at root, 1 at pointed outer tip
    // Taper width to a pointed tuft tip at u = 1, with subtle ragged fibril serration
    const taperX = (1 - Math.pow(u, 1.35) * 0.82) * (1 + Math.sin(u * 9) * 0.08);
    // Curl upward strongly toward the tip so each scale reads as a raised 3D curled squamule tuft
    const curlY = Math.pow(u, 2.1) * 0.038;
    // Thin the vertical thickness toward the pointed tip
    const thicknessScale = 1 - u * 0.55;
    // Slight dorsal ridge along the center line (sx = 0)
    const ridgeY = (1 - Math.pow(sx / 0.044, 2)) * 0.008;
    sPos.setXYZ(i, sx * taperX, sy * thicknessScale + curlY + ridgeY, sz);
  }
  scaleGeo.computeVertexNormals();

  const scaleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    bumpMap: textures.capBump,
    bumpScale: 0.035,
    roughness: 0.9,
    metalness: 0.0,
  });

  const scalesInst = new THREE.InstancedMesh(scaleGeo, scaleMat, totalScales);
  scalesInst.castShadow = true;
  scalesInst.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const scaleColor = new THREE.Color();
  let scaleIdx = 0;

  for (let rIdx = 0; rIdx < ringRadii.length; rIdx++) {
    const baseR = ringRadii[rIdx];
    const count = ringCounts[rIdx];
    const ringNorm = rIdx / Math.max(1, ringRadii.length - 1);

    for (let k = 0; k < count; k++) {
      const angle =
        (k / count) * Math.PI * 2 +
        (rIdx % 2) * (Math.PI / count) +
        (rand() - 0.5) * 0.07;
      const r = Math.min(capRadius * 0.96, baseR + (rand() - 0.5) * 0.032);
      const y0 = getCapSurfaceY(r);
      const y1 = getCapSurfaceY(Math.min(capRadius, r + 0.03));
      const slopeAngle = Math.atan2(y0 - y1, 0.03);

      dummy.position.set(Math.cos(angle) * r, y0 + 0.005, Math.sin(angle) * r);
      dummy.rotation.set(0, 0, 0);
      dummy.lookAt(
        Math.cos(angle) * (r + 1),
        y0 + 0.005 - Math.tan(slopeAngle),
        Math.sin(angle) * (r + 1),
      );
      // Pitch the curled pointed tuft slightly upward on mid and outer rings
      dummy.rotateX(-0.08 - ringNorm * 0.12 - rand() * 0.08);

      const wScale = (0.72 + Math.sin(ringNorm * Math.PI) * 0.65) * (0.82 + rand() * 0.36);
      const hScale = (0.95 + (1 - ringNorm * 0.3) * 0.45) * (0.85 + rand() * 0.35);
      const lScale = (0.68 + ringNorm * 0.68) * (0.85 + rand() * 0.32);
      dummy.scale.set(wScale, hScale, lScale);
      dummy.updateMatrix();
      scalesInst.setMatrixAt(scaleIdx, dummy.matrix);

      // Densest and darkest umber near the umbo, warm medium brown outward
      const lightness = 0.14 + ringNorm * 0.11 + (rand() - 0.5) * 0.035;
      scaleColor.setHSL(0.072, 0.42, lightness);
      scalesInst.setColorAt(scaleIdx, scaleColor);
      scaleIdx++;
    }
  }
  scalesInst.instanceMatrix.needsUpdate = true;
  if (scalesInst.instanceColor) scalesInst.instanceColor.needsUpdate = true;
  scalesInst.computeBoundingSphere();
  group.add(scalesInst);

  // 5. Very thin, densely packed cream-white radiating gills (lamellae) with visible dark depth between them
  if (stage !== 'drumstick') {
    const gillCount = isHero ? 260 : 84;
    // Thin 3D blade geometry (x in [0..1] radial length, y height, z thin blade thickness)
    const gillGeo = new THREE.BoxGeometry(1.0, 0.11, 0.0042, 8, 3, 1);
    const gPos = gillGeo.attributes.position;
    const gColors = new Float32Array(gPos.count * 3);
    for (let i = 0; i < gPos.count; i++) {
      const gx = gPos.getX(i) + 0.5; // 0 (inner collarium) to 1 (outer cap margin)
      const gy = gPos.getY(i); // -0.055 (lower exposed edge) to +0.055 (upper root inside cap)
      const gz = gPos.getZ(i);

      const archCurve = Math.sin(gx * Math.PI) * 0.036;
      const endTaper = Math.sin(gx * Math.PI);
      // Slight natural organic waviness along the thin gill blade
      const waveZ = Math.sin(gx * Math.PI * 3) * 0.0018;
      gPos.setXYZ(i, gx, gy * (0.32 + 0.68 * endTaper) + archCurve, gz + waveZ);

      // Deep ambient-occlusion shadow gradient from top root (0.14 dark umber) to lower edge (0.76 warm cream)
      // Ensures visible depth between gills and prevents Chapter 2 from blowing out to white
      const heightNorm = (gy + 0.055) / 0.11; // 0 at bottom blade edge, 1 at top root in cap ceiling
      const radialFade = 1 - Math.pow(gx - 0.45, 2) * 0.35;
      const shade = (0.76 * (1 - Math.pow(heightNorm, 0.75) * 0.78)) * radialFade;
      gColors[i * 3 + 0] = shade;
      gColors[i * 3 + 1] = shade * 0.93;
      gColors[i * 3 + 2] = shade * 0.82;
    }
    gillGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));
    gillGeo.computeVertexNormals();

    const gillMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      vertexColors: true,
      roughness: 0.86,
      metalness: 0.0,
      emissive: new THREE.Color('#b8dc3c'),
      emissiveIntensity: 0,
    });
    emissiveMaterials.push(gillMat);

    const gillsInst = new THREE.InstancedMesh(gillGeo, gillMat, gillCount);
    const gillColor = new THREE.Color();

    for (let i = 0; i < gillCount; i++) {
      const angle = (i / gillCount) * Math.PI * 2;
      // 3 tiers of lamellae: primary full-length from free collarium ring, secondary, and short marginal lamellulae
      const tier = i % 4;
      const innerR = (tier === 0 ? 0.185 : tier === 2 ? 0.38 : 0.66) * (capRadius / 1.48);
      const outerR = capRadius * 0.96;
      const bladeLen = Math.max(0.1, outerR - innerR);

      const innerY = 3.16 - ((innerR - 0.185) / capRadius) * 0.06;
      const outerY = marginY;
      const tilt = Math.atan2(outerY - innerY, bladeLen);

      dummy.position.set(Math.cos(angle) * innerR, innerY, Math.sin(angle) * innerR);
      dummy.rotation.set(0, -angle, tilt);
      dummy.scale.set(bladeLen, 0.88 + (i % 3) * 0.09, 1);
      dummy.updateMatrix();
      gillsInst.setMatrixAt(i, dummy.matrix);

      // Alternating micro-contrast between adjacent gill blades so all 260 gills resolve crisply
      const tone = i % 2 === 0 ? 0.96 : 0.78;
      gillColor.setRGB(tone, tone * 0.96, tone * 0.9);
      gillsInst.setColorAt(i, gillColor);
    }
    gillsInst.instanceMatrix.needsUpdate = true;
    if (gillsInst.instanceColor) gillsInst.instanceColor.needsUpdate = true;
    gillsInst.computeBoundingSphere();
    group.add(gillsInst);
  }

  // Invisible raycast proxy cylinder for Hold-to-Inspect pointer picking
  const hitProxyGeo = new THREE.CylinderGeometry(1.5, 0.9, 3.8, 16);
  hitProxyGeo.translate(0, 1.9, 0);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'mushroom';
  group.add(hitProxy);

  const setBioluminescence = (intensity: number) => {
    for (const mat of emissiveMaterials) {
      mat.emissiveIntensity = intensity;
    }
  };

  return {
    group,
    hitProxy,
    emissiveMaterials,
    setBioluminescence,
  };
}
