import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom } from '../../logic/networkGenerator';

export interface BuiltClumpModel {
  group: THREE.Group;
  hitProxy: THREE.Mesh;
  setRevealAndGlow: (reveal: number, glowIntensity: number) => void;
}

/**
 * Builds the Chapter 4a fist-sized mycelium clump specimen matching
 * `mycelium-clump-front_9ac04e63.png` and `mycelium-clump-back_489a37a5.png`:
 * - Dark crumbly colonized loam soil core
 * - Dense cotton-like fuzzy cream/white hyphal lobes + fine protruding hyphal whiskers
 * - 64 thick cream rope-like rhizomorph cords wrapping and branching across the mass,
 *   including loose trailing strands hanging off the sides and bottom
 * - Weathered wood/bark chips caught inside the cords
 */
export function buildMyceliumClump(
  textures: ProceduralTextureSet,
  seed = 304,
): BuiltClumpModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'MyceliumClumpSpecimen';

  const materialsToFade: THREE.Material[] = [];

  // 1. Dark crumbly soil & humus substrate core with exposed pockets
  const coreGeo = new THREE.SphereGeometry(0.6, 32, 24);
  const cPos = coreGeo.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const vx = cPos.getX(i);
    const vy = cPos.getY(i);
    const vz = cPos.getZ(i);
    const noise =
      1 +
      Math.sin(vx * 5.2 + vy * 4.1) * 0.11 +
      Math.cos(vz * 6.3 - vx * 3.7) * 0.09;
    cPos.setXYZ(i, vx * 1.22 * noise, vy * 0.88 * noise, vz * 0.96 * noise);
  }
  coreGeo.computeVertexNormals();

  const coreMat = new THREE.MeshStandardMaterial({
    map: textures.soilColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.055,
    color: new THREE.Color('#201710'),
    roughness: 0.96,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(coreMat);
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  group.add(coreMesh);

  // 2. Smooth, high-subdivision cotton-like fuzzy cream-white hyphal cushions enveloping the core
  const hyphaeMat = new THREE.MeshStandardMaterial({
    map: textures.clumpFuzzColor,
    bumpMap: textures.clumpFuzzBump,
    bumpScale: 0.055,
    color: new THREE.Color('#f0e8da'),
    roughness: 0.95,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(hyphaeMat);

  const puffCount = 28;
  const puffGeo = new THREE.SphereGeometry(0.27, 22, 16);
  const pPos = puffGeo.attributes.position;
  for (let i = 0; i < pPos.count; i++) {
    const px = pPos.getX(i);
    const py = pPos.getY(i);
    const pz = pPos.getZ(i);
    const n =
      1 +
      Math.sin(px * 11 + py * 9) * 0.09 +
      Math.cos(pz * 13 - px * 7) * 0.08;
    pPos.setXYZ(i, px * n, py * n, pz * n);
  }
  puffGeo.computeVertexNormals();

  const puffInst = new THREE.InstancedMesh(puffGeo, hyphaeMat, puffCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < puffCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / puffCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const rad = 0.45 + (rand() - 0.5) * 0.08;

    dummy.position.set(
      Math.sin(phi) * Math.cos(theta) * rad * 1.2,
      Math.cos(phi) * rad * 0.86,
      Math.sin(phi) * Math.sin(theta) * rad * 0.96,
    );
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    dummy.scale.set(
      0.8 + rand() * 0.45,
      0.72 + rand() * 0.38,
      0.8 + rand() * 0.45,
    );
    dummy.updateMatrix();
    puffInst.setMatrixAt(i, dummy.matrix);
  }
  puffInst.instanceMatrix.needsUpdate = true;
  puffInst.computeBoundingSphere();
  group.add(puffInst);

  // Fine cottony hyphal fuzz & tangential cobweb-like filaments wrapping the cottony lobes
  const whiskerCount = 820;
  const whiskerPositions = new Float32Array(whiskerCount * 6);
  for (let i = 0; i < whiskerCount; i++) {
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(2 * rand() - 1);
    const r0 = 0.56 + (rand() - 0.5) * 0.11;
    const x0 = Math.sin(ph) * Math.cos(th) * r0 * 1.18;
    const y0 = Math.cos(ph) * r0 * 0.86;
    const z0 = Math.sin(ph) * Math.sin(th) * r0 * 0.95;
    const isTangential = i % 3 !== 0;
    const len = isTangential ? 0.09 + rand() * 0.14 : 0.045 + rand() * 0.075;
    const dTh = th + (isTangential ? 1.2 + (rand() - 0.5) * 0.8 : 0);
    const dPh = ph + (isTangential ? (rand() - 0.5) * 0.8 : 0);
    whiskerPositions[i * 6 + 0] = x0;
    whiskerPositions[i * 6 + 1] = y0;
    whiskerPositions[i * 6 + 2] = z0;
    whiskerPositions[i * 6 + 3] =
      x0 + Math.sin(dPh) * Math.cos(dTh) * len + (rand() - 0.5) * 0.03;
    whiskerPositions[i * 6 + 4] =
      y0 + Math.cos(dPh) * len + (rand() - 0.5) * 0.03;
    whiskerPositions[i * 6 + 5] =
      z0 + Math.sin(dPh) * Math.sin(dTh) * len + (rand() - 0.5) * 0.03;
  }
  const whiskerGeo = new THREE.BufferGeometry();
  whiskerGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(whiskerPositions, 3),
  );
  const whiskerMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#f2eadb'),
    transparent: true,
    opacity: 0.65,
  });
  materialsToFade.push(whiskerMat);
  const whiskerLines = new THREE.LineSegments(whiskerGeo, whiskerMat);
  group.add(whiskerLines);

  // 3. Thick cream rope-like rhizomorph cords wrapping and branching across the clump surface
  //    plus loose trailing strands hanging off the sides and bottom
  const cordMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ebe0cc'),
    bumpMap: textures.clumpFuzzBump,
    bumpScale: 0.03,
    roughness: 0.78,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(cordMat);

  const cordCount = 64;
  for (let c = 0; c < cordCount; c++) {
    const pts: THREE.Vector3[] = [];
    const startTheta = rand() * Math.PI * 2;
    const startPhi = 0.18 + rand() * (Math.PI - 0.36);
    const arcSteps = 14;
    // Main artery bundle sweeps diagonally from bottom-left to upper-right like reference photo
    const isMainBundle = c < 18;
    const dTheta = isMainBundle
      ? 1.45 + (rand() - 0.5) * 0.55
      : (rand() - 0.5) * 2.8;
    const dPhi = isMainBundle
      ? -0.92 + (rand() - 0.5) * 0.42
      : (rand() - 0.5) * 1.8;
    const isTrailingStrand = c >= 46;

    for (let s = 0; s <= arcSteps; s++) {
      const st = s / arcSteps;
      const th =
        startTheta + dTheta * st + Math.sin(st * Math.PI * 2.8 + c) * 0.2;
      const ph = Math.max(
        0.12,
        Math.min(Math.PI - 0.12, startPhi + dPhi * st),
      );
      let r = 0.64 + (rand() - 0.5) * 0.03;

      let x = Math.sin(ph) * Math.cos(th) * r * 1.2;
      let y = Math.cos(ph) * r * 0.86;
      let z = Math.sin(ph) * Math.sin(th) * r * 0.96;

      // Loose trailing strands peel away and drape downward/outward at their ends
      if (isTrailingStrand && s > arcSteps - 6) {
        const trailT = (s - (arcSteps - 6)) / 6;
        r += trailT * 0.32;
        x =
          Math.sin(ph) * Math.cos(th) * r * 1.22 +
          Math.sin(trailT * 4 + c) * 0.07;
        y = Math.cos(ph) * r * 0.86 - trailT * 0.3;
        z = Math.sin(ph) * Math.sin(th) * r * 0.96;
      }

      pts.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    const radius = isMainBundle
      ? 0.02 + rand() * 0.015
      : isTrailingStrand
        ? 0.0055 + rand() * 0.0055
        : 0.0095 + rand() * 0.01;
    const tubeGeo = new THREE.TubeGeometry(curve, 32, radius, 8, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, cordMat);
    tubeMesh.castShadow = true;
    tubeMesh.receiveShadow = true;
    group.add(tubeMesh);
  }

  // 4. Embedded weathered bark chips & dark soil granules caught inside the cords
  const barkMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.045,
    color: new THREE.Color('#7a5838'),
    roughness: 0.92,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(barkMat);

  const barkGeo = new THREE.BoxGeometry(0.24, 0.045, 0.095, 3, 1, 2);
  const bPos = barkGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const bx = bPos.getX(i);
    const by = bPos.getY(i);
    const bz = bPos.getZ(i);
    bPos.setXYZ(
      i,
      bx,
      by + Math.sin(bx * 18) * 0.008,
      bz * (1 - Math.abs(bx) * 1.2),
    );
  }
  barkGeo.computeVertexNormals();

  const barkCount = 24;
  const barkInst = new THREE.InstancedMesh(barkGeo, barkMat, barkCount);

  for (let i = 0; i < barkCount; i++) {
    const th = rand() * Math.PI * 2;
    const ph = 0.22 + rand() * (Math.PI - 0.44);
    const r = 0.62;
    dummy.position.set(
      Math.sin(ph) * Math.cos(th) * r * 1.18,
      Math.cos(ph) * r * 0.85,
      Math.sin(ph) * Math.sin(th) * r * 0.95,
    );
    dummy.lookAt(0, 0, 0);
    dummy.rotateZ(rand() * Math.PI);
    dummy.scale.set(
      0.65 + rand() * 0.95,
      0.7 + rand() * 0.85,
      0.65 + rand() * 0.95,
    );
    dummy.updateMatrix();
    barkInst.setMatrixAt(i, dummy.matrix);
  }
  barkInst.instanceMatrix.needsUpdate = true;
  barkInst.computeBoundingSphere();
  group.add(barkInst);

  // Invisible raycast proxy sphere for Hold-to-Inspect
  const hitProxyGeo = new THREE.SphereGeometry(0.95, 16, 16);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'clump';
  group.add(hitProxy);

  const setRevealAndGlow = (reveal: number, glowIntensity: number) => {
    group.visible = reveal > 0.01;
    const scale = (0.35 + 0.65 * reveal) * 0.72;
    group.scale.setScalar(scale);
    for (const mat of materialsToFade) {
      if (mat instanceof THREE.LineBasicMaterial) {
        mat.opacity = reveal * 0.65;
      } else {
        mat.opacity = reveal;
      }
    }
    // Keep emissive near zero at 4a so the clump reads with natural cream cords and white cottony hyphae
    const wideGlow = Math.max(0, (glowIntensity - 0.25) / 0.75);
    cordMat.emissiveIntensity = wideGlow * 0.05;
    hyphaeMat.emissiveIntensity = wideGlow * 0.02;
  };

  return {
    group,
    hitProxy,
    setRevealAndGlow,
  };
}
