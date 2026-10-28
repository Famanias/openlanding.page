import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom, generateTrayMorphCoordinates } from '../../logic/networkGenerator';

export interface BuiltTrayModel {
  group: THREE.Group;
  solidTrayGroup: THREE.Group;
  morphPoints: THREE.Points;
  hitProxy: THREE.Mesh;
  updateMorphAndOpacity: (
    morphProgress: number,
    solidOpacity: number,
    elapsedSec: number,
    fragileSettle?: number,
    foxfireGlowFade?: number,
  ) => void;
}

/**
 * Evaluates the molded packaging tray height and thickness at local (x, z)
 * matching `material-top_9cdf4064.png` and `material-underside-and-cut-edge_69208517.png`:
 * - Rounded rectangular outer perimeter with a soft rolled flange lip
 * - Smooth drafted walls descending into a recessed inner cavity with a subtle bottom stacking ridge
 * - One irregular broken front-right corner exposing the coarse fibrous hemp + mycelium core
 */
function sampleTrayCrossSection(x: number, z: number): {
  topY: number;
  bottomY: number;
  insideOuter: boolean;
  inBrokenCut: boolean;
} {
  const halfW = 1.32;
  const halfD = 0.86;
  const cornerR = 0.30;

  const qx = Math.abs(x) - (halfW - cornerR);
  const qz = Math.abs(z) - (halfD - cornerR);
  const outDist =
    Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) +
    Math.min(Math.max(qx, qz), 0) -
    cornerR;

  if (outDist > 0) {
    return { topY: 0, bottomY: 0, insideOuter: false, inBrokenCut: false };
  }

  // Organic bite-like broken corner across the front-right corner (x > 0.38, z > 0.18)
  const jag =
    Math.sin(x * 17 - z * 14) * 0.028 + Math.cos(x * 33 + z * 27) * 0.015;
  const cutDist = Math.hypot((x - 1.16) * 0.88, (z - 0.74) * 1.05) + jag;
  const inBrokenCut = cutDist < 0.62;

  const wallThickness = 0.15;
  let topY = -0.22;
  let bottomY = topY - wallThickness;

  if (outDist > -0.14) {
    // Softly rolled perimeter lip
    const u = (outDist + 0.14) / 0.14; // 0 at inner lip edge, 1 at outer rim
    const lipArch = Math.sin(u * Math.PI) * 0.036;
    const outerRoll = u > 0.65 ? -Math.pow((u - 0.65) / 0.35, 2) * 0.045 : 0;
    topY = 0.23 + lipArch + outerRoll;
    bottomY = 0.09 + lipArch * 0.5 + outerRoll;
  } else if (outDist > -0.38) {
    // Smooth drafted wall transition
    const wt = (outDist + 0.38) / 0.24; // 0 at cavity floor, 1 at lip inner edge
    const smoothW = wt * wt * (3 - 2 * wt);
    topY = -0.22 + smoothW * 0.45;
    bottomY = topY - wallThickness;
  } else {
    // Recessed cavity floor with subtle molded stacking ridge
    const ridgeBand = outDist < -0.45 && outDist > -0.52 ? 0.016 : 0;
    const innerPad = outDist <= -0.52 ? 0.012 : 0;
    topY = -0.22 + ridgeBand + innerPad;
    bottomY = -0.37 + ridgeBand + innerPad;
  }

  return { topY, bottomY, insideOuter: true, inBrokenCut };
}

/**
 * Builds the Chapter 5 Molded Mycelium Packaging Tray, nestled fragile glass perfume flacon,
 * and scrub-able thread convergence morph:
 * - Rounded rectangle with soft edges, recessed cavity, and rolled lip
 * - Matte off-white to warm cream mycelium skin with faint velvety fuzz (sheen at grazing angles)
 *   and scattered small brown fibre speckles
 * - One broken front-right corner revealing the dense fibrous hemp + mycelium core
 * - A precious, fragile glass perfume bottle with stopper nestled inside the cavity that settles with scroll
 * - Glowing incoming threads that converge into the tray and fade out completely once the studio is lit
 */
export function buildPackagingTray(
  textures: ProceduralTextureSet,
  seed = 505,
  isSoftwareGl = false,
): BuiltTrayModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'PackagingTraySpecimen';

  const solidTrayGroup = new THREE.Group();
  group.add(solidTrayGroup);

  const gridX = 96;
  const gridZ = 68;
  const minX = -1.34;
  const maxX = 1.34;
  const minZ = -0.88;
  const maxZ = 0.88;

  const positions: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const coreIndices: number[] = [];

  const topVertexGrid: number[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(-1),
  );
  const botVertexGrid: number[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(-1),
  );
  const validCellGrid: boolean[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(false),
  );
  const cutCellGrid: boolean[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(false),
  );

  let vertCount = 0;

  for (let iz = 0; iz <= gridZ; iz++) {
    const z = minZ + (iz / gridZ) * (maxZ - minZ);
    for (let ix = 0; ix <= gridX; ix++) {
      const x = minX + (ix / gridX) * (maxX - minX);
      const sample = sampleTrayCrossSection(x, z);
      if (sample.insideOuter && !sample.inBrokenCut) {
        validCellGrid[iz][ix] = true;
        const u = (x - minX) / (maxX - minX);
        const v = (z - minZ) / (maxZ - minZ);

        topVertexGrid[iz][ix] = vertCount++;
        positions.push(x, sample.topY, z);
        uvs.push(u, v);

        botVertexGrid[iz][ix] = vertCount++;
        positions.push(x, sample.bottomY, z);
        // Offset bottom UVs by wall height so vertical cut faces never stretch a single texel into stripes
        uvs.push(u + 0.14, v + 0.16);
      } else if (sample.insideOuter && sample.inBrokenCut) {
        cutCellGrid[iz][ix] = true;
      }
    }
  }

  // Record all boundary coordinates along the broken cut face so 3D hemp hurd fibres pack across the entire cut
  const cutEdgeSamples: Array<{ x: number; z: number; topY: number; bottomY: number }> = [];

  for (let iz = 0; iz < gridZ; iz++) {
    for (let ix = 0; ix < gridX; ix++) {
      const v00 = validCellGrid[iz][ix];
      const v10 = validCellGrid[iz][ix + 1];
      const v01 = validCellGrid[iz + 1][ix];
      const v11 = validCellGrid[iz + 1][ix + 1];

      if (v00 && v10 && v01 && v11) {
        const t00 = topVertexGrid[iz][ix];
        const t10 = topVertexGrid[iz][ix + 1];
        const t01 = topVertexGrid[iz + 1][ix];
        const t11 = topVertexGrid[iz + 1][ix + 1];
        skinIndices.push(t00, t01, t10, t10, t01, t11);

        const b00 = botVertexGrid[iz][ix];
        const b10 = botVertexGrid[iz][ix + 1];
        const b01 = botVertexGrid[iz + 1][ix];
        const b11 = botVertexGrid[iz + 1][ix + 1];
        skinIndices.push(b00, b10, b01, b10, b11, b01);
      }

      const recordCutVertex = (vIdx: number, bIdx: number) => {
        cutEdgeSamples.push({
          x: positions[vIdx * 3],
          topY: positions[vIdx * 3 + 1],
          bottomY: positions[bIdx * 3 + 1],
          z: positions[vIdx * 3 + 2],
        });
      };

      if (v00 && v10 && !v01) {
        const isCutFace = cutCellGrid[iz + 1][ix] || cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix], botVertexGrid[iz][ix]);
        targetArr.push(
          topVertexGrid[iz][ix],
          botVertexGrid[iz][ix],
          topVertexGrid[iz][ix + 1],
          topVertexGrid[iz][ix + 1],
          botVertexGrid[iz][ix],
          botVertexGrid[iz][ix + 1],
        );
      }
      if (!v00 && v01 && v11) {
        const isCutFace = cutCellGrid[iz][ix] || cutCellGrid[iz][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz + 1][ix], botVertexGrid[iz + 1][ix]);
        targetArr.push(
          topVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz + 1][ix + 1],
          topVertexGrid[iz + 1][ix],
          topVertexGrid[iz + 1][ix],
          botVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz + 1][ix],
        );
      }
      if (v00 && v01 && !v10) {
        const isCutFace = cutCellGrid[iz][ix + 1] || cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix], botVertexGrid[iz][ix]);
        targetArr.push(
          topVertexGrid[iz + 1][ix],
          botVertexGrid[iz + 1][ix],
          topVertexGrid[iz][ix],
          topVertexGrid[iz][ix],
          botVertexGrid[iz + 1][ix],
          botVertexGrid[iz][ix],
        );
      }
      if (!v00 && v10 && v11) {
        const isCutFace = cutCellGrid[iz][ix] || cutCellGrid[iz + 1][ix];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix + 1], botVertexGrid[iz][ix + 1]);
        targetArr.push(
          topVertexGrid[iz][ix + 1],
          botVertexGrid[iz][ix + 1],
          topVertexGrid[iz + 1][ix + 1],
          topVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz][ix + 1],
          botVertexGrid[iz + 1][ix + 1],
        );
      }

      if (v00 && v10 && v01 && !v11) {
        const t10 = topVertexGrid[iz][ix + 1];
        const t01 = topVertexGrid[iz + 1][ix];
        const t00 = topVertexGrid[iz][ix];
        skinIndices.push(t00, t01, t10);

        const b10 = botVertexGrid[iz][ix + 1];
        const b01 = botVertexGrid[iz + 1][ix];
        const b00 = botVertexGrid[iz][ix];
        skinIndices.push(b00, b10, b01);

        const isCutFace = cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(t10, b10);
        targetArr.push(t01, b01, t10, t10, b01, b10);
      }
    }
  }

  const trayGeo = new THREE.BufferGeometry();
  trayGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  trayGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  const combinedIndices = [...skinIndices, ...coreIndices];
  trayGeo.setIndex(combinedIndices);
  trayGeo.addGroup(0, skinIndices.length, 0);
  trayGeo.addGroup(skinIndices.length, coreIndices.length, 1);
  trayGeo.computeVertexNormals();

  // Matte off-white to warm cream mycelium skin with faint velvety fuzz (grazing-angle sheen)
  // and scattered brown fibre speckles (matches material-top_9cdf4064.png)
  const skinMat = new THREE.MeshPhysicalMaterial({
    map: textures.traySkinColor,
    bumpMap: textures.traySkinBump,
    bumpScale: 0.032,
    color: new THREE.Color('#f4ecde'),
    roughness: 0.87,
    metalness: 0.0,
    sheen: 0.65,
    sheenRoughness: 0.78,
    sheenColor: new THREE.Color('#fffdf9'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  // Coarse fibrous hemp + mycelium cut face (matches material-underside-and-cut-edge_69208517.png)
  const coreMat = new THREE.MeshStandardMaterial({
    map: textures.trayCoreColor,
    bumpMap: textures.trayCoreBump,
    bumpScale: 0.072,
    color: new THREE.Color('#dfd0b8'),
    roughness: 0.96,
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  const trayMesh = new THREE.Mesh(trayGeo, [skinMat, coreMat]);
  trayMesh.castShadow = true;
  trayMesh.receiveShadow = true;
  solidTrayGroup.add(trayMesh);

  // 2. Dense 3D shredded hemp hurd & mycelium slivers packed across the ENTIRE broken corner cross-section
  //    matching `material-underside-and-cut-edge_69208517.png`
  const fibreCount = 680;
  const fibreGeo = new THREE.BoxGeometry(0.056, 0.015, 0.022);
  const fibreMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.95,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  const fibreInst = new THREE.InstancedMesh(fibreGeo, fibreMat, fibreCount);
  const dummy = new THREE.Object3D();
  const fibreColor = new THREE.Color();

  for (let i = 0; i < fibreCount; i++) {
    const anchor =
      cutEdgeSamples.length > 0
        ? cutEdgeSamples[Math.floor(rand() * cutEdgeSamples.length)]
        : { x: 0.82, z: 0.45, topY: 0.18, bottomY: -0.14 };

    const fx = anchor.x + (rand() - 0.35) * 0.055;
    const fz = anchor.z + (rand() - 0.35) * 0.055;
    const spanY = Math.max(0.06, anchor.topY - anchor.bottomY);
    const fy = anchor.bottomY + 0.012 + rand() * (spanY - 0.022);

    dummy.position.set(fx, fy, fz);
    dummy.rotation.set(
      (rand() - 0.5) * 1.15,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 1.15,
    );
    dummy.scale.set(
      0.55 + rand() * 1.15,
      0.55 + rand() * 0.95,
      0.55 + rand() * 1.05,
    );
    dummy.updateMatrix();
    fibreInst.setMatrixAt(i, dummy.matrix);

    const toneRoll = rand();
    if (toneRoll > 0.58) {
      // Unbleached cream mycelium binder strand
      fibreColor.setRGB(0.94, 0.90, 0.82);
    } else if (toneRoll > 0.22) {
      // Warm straw/tan hemp hurd splinter
      fibreColor.setRGB(0.80, 0.68, 0.52);
    } else {
      // Darker woody core fleck
      fibreColor.setRGB(0.60, 0.46, 0.31);
    }
    fibreInst.setColorAt(i, fibreColor);
  }
  fibreInst.count = fibreCount;
  fibreInst.instanceMatrix.needsUpdate = true;
  if (fibreInst.instanceColor) fibreInst.instanceColor.needsUpdate = true;
  fibreInst.computeBoundingSphere();
  solidTrayGroup.add(fibreInst);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. "SHOW IT DOING ITS JOB": Fragile Glass Perfume Bottle with Stopper
  //    Nestled inside the tray's cavity, settling gently with scroll and staying
  //    inside the tray during Hold-to-Inspect rotation.
  // ─────────────────────────────────────────────────────────────────────────
  const perfumeBottleGroup = new THREE.Group();
  perfumeBottleGroup.name = 'NestledGlassPerfumeBottle';

  // Soft moulded cradle shadow directly beneath the bottle on the cavity floor
  const cradleShadowCanvas = document.createElement('canvas');
  cradleShadowCanvas.width = 128;
  cradleShadowCanvas.height = 128;
  const csCtx = cradleShadowCanvas.getContext('2d')!;
  const csGrad = csCtx.createRadialGradient(64, 64, 8, 64, 64, 60);
  csGrad.addColorStop(0.0, 'rgba(46, 35, 22, 0.52)');
  csGrad.addColorStop(0.55, 'rgba(62, 48, 32, 0.24)');
  csGrad.addColorStop(1.0, 'rgba(62, 48, 32, 0.0)');
  csCtx.fillStyle = csGrad;
  csCtx.fillRect(0, 0, 128, 128);
  const cradleShadowTex = new THREE.CanvasTexture(cradleShadowCanvas);
  cradleShadowTex.colorSpace = THREE.SRGBColorSpace;

  const cradleShadowMat = new THREE.MeshBasicMaterial({
    map: cradleShadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const cradleShadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 0.78),
    cradleShadowMat,
  );
  cradleShadowMesh.rotation.x = -Math.PI / 2;
  cradleShadowMesh.position.set(-0.08, -0.188, -0.02);
  solidTrayGroup.add(cradleShadowMesh);

  // Moulded mycelium side-cradle ribs that hug the perfume bottle in the cavity
  const cradleRibGeo = new THREE.BoxGeometry(0.14, 0.08, 0.72);
  const leftCradleRib = new THREE.Mesh(cradleRibGeo, skinMat);
  leftCradleRib.position.set(-0.46, -0.15, -0.02);
  solidTrayGroup.add(leftCradleRib);

  const rightCradleRib = new THREE.Mesh(cradleRibGeo, skinMat);
  rightCradleRib.position.set(0.16, -0.15, -0.02);
  solidTrayGroup.add(rightCradleRib);

  // Refractive optical glass material (with clean translucent fallback on software WebGL)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e6ede8'),
    metalness: 0.05,
    roughness: 0.07,
    transmission: isSoftwareGl ? 0 : 0.78,
    transparent: true,
    opacity: isSoftwareGl ? 0.62 : 0.96,
    ior: 1.52,
    thickness: 0.55,
    attenuationColor: new THREE.Color('#dfe8dc'),
    attenuationDistance: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 0.95,
  });

  // Warm cognac-amber botanical parfum liquid inside the flacon
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#c97f22'),
    metalness: 0.02,
    roughness: 0.14,
    transparent: true,
    opacity: 0.90,
    clearcoat: 0.6,
  });

  // Brushed warm brass atomizer collar
  const brassMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#be984e'),
    metalness: 0.84,
    roughness: 0.24,
    transparent: true,
    opacity: 1,
  });

  // Apothecary paper label with fine dark typography lines
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 160;
  const lbCtx = labelCanvas.getContext('2d')!;
  lbCtx.fillStyle = '#f6f1e6';
  lbCtx.fillRect(0, 0, 256, 160);
  lbCtx.strokeStyle = '#1e1914';
  lbCtx.lineWidth = 4;
  lbCtx.strokeRect(8, 8, 240, 144);
  lbCtx.fillStyle = '#181410';
  lbCtx.font = 'bold 28px serif';
  lbCtx.textAlign = 'center';
  lbCtx.fillText('L O A M', 128, 66);
  lbCtx.font = '13px monospace';
  lbCtx.fillStyle = '#3a3128';
  lbCtx.fillText('BOTANICAL EXTRACTS · 50 ML', 128, 100);
  lbCtx.beginPath();
  lbCtx.moveTo(44, 120);
  lbCtx.lineTo(212, 120);
  lbCtx.lineWidth = 1.6;
  lbCtx.stroke();
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;

  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.85,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  // Assemble the bottle along local X axis (lying nestled in the tray cavity)
  // 1) Heavy bevelled glass flacon body
  const flaconShape = new THREE.Shape();
  const fw = 0.28;
  const fh = 0.14;
  const bevel = 0.045;
  flaconShape.moveTo(-fw + bevel, -fh);
  flaconShape.lineTo(fw - bevel, -fh);
  flaconShape.lineTo(fw, -fh + bevel);
  flaconShape.lineTo(fw, fh - bevel);
  flaconShape.lineTo(fw - bevel, fh);
  flaconShape.lineTo(-fw + bevel, fh);
  flaconShape.lineTo(-fw, fh - bevel);
  flaconShape.lineTo(-fw, -fh + bevel);
  flaconShape.closePath();

  const flaconGeo = new THREE.ExtrudeGeometry(flaconShape, {
    steps: 1,
    depth: 0.74,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.022,
    bevelSegments: 4,
  });
  flaconGeo.center();
  // Rotate so depth (0.74) runs along X, width (2*fw = 0.56) along Z, thickness (2*fh = 0.28) along Y
  flaconGeo.rotateY(Math.PI / 2);
  const flaconMesh = new THREE.Mesh(flaconGeo, glassMat);
  flaconMesh.position.set(-0.15, 0, 0);
  flaconMesh.renderOrder = 2;
  perfumeBottleGroup.add(flaconMesh);

  // Smoked-crystal glass edge highlight wireframe for unmistakable glass silhouette read against cream cavity
  const flaconEdgesGeo = new THREE.EdgesGeometry(flaconGeo, 28);
  const flaconEdgesMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#6b5842'),
    transparent: true,
    opacity: 0.45,
  });
  const flaconEdges = new THREE.LineSegments(flaconEdgesGeo, flaconEdgesMat);
  flaconEdges.position.copy(flaconMesh.position);
  perfumeBottleGroup.add(flaconEdges);

  // 2) Inner amber parfum liquid chamber
  const liquidGeo = new THREE.BoxGeometry(0.58, 0.19, 0.44);
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.set(-0.17, -0.01, 0);
  liquidMesh.renderOrder = 1;
  perfumeBottleGroup.add(liquidMesh);

  // 3) Internal glass capillary dip tube running from neck into amber liquid
  const dipTubeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 0.0, 0.0),
    new THREE.Vector3(-0.08, -0.01, 0.03),
    new THREE.Vector3(-0.40, -0.04, 0.14),
  ]);
  const dipTubeGeo = new THREE.TubeGeometry(dipTubeCurve, 12, 0.009, 6, false);
  const dipTubeMesh = new THREE.Mesh(dipTubeGeo, brassMat);
  perfumeBottleGroup.add(dipTubeMesh);

  // 4) Apothecary cream paper label on the top face of the glass flacon
  const labelGeo = new THREE.PlaneGeometry(0.42, 0.28);
  labelGeo.rotateX(-Math.PI / 2);
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.set(-0.15, 0.163, 0);
  labelMesh.renderOrder = 3;
  perfumeBottleGroup.add(labelMesh);

  // 5) Glass neck + Brushed Brass Crimp Collar (at +X end of the flacon)
  const neckGeo = new THREE.CylinderGeometry(0.072, 0.082, 0.12, 24);
  neckGeo.rotateZ(-Math.PI / 2);
  const neckMesh = new THREE.Mesh(neckGeo, brassMat);
  neckMesh.position.set(0.28, 0, 0);
  perfumeBottleGroup.add(neckMesh);

  const collarRingGeo = new THREE.TorusGeometry(0.082, 0.016, 12, 24);
  collarRingGeo.rotateY(Math.PI / 2);
  const collarRing = new THREE.Mesh(collarRingGeo, brassMat);
  collarRing.position.set(0.23, 0, 0);
  perfumeBottleGroup.add(collarRing);

  // 6) Faceted Crystal / Glass Stopper (octagonal-chamfered disc stopper)
  const stopperGeo = new THREE.CylinderGeometry(0.135, 0.115, 0.16, 12);
  stopperGeo.rotateZ(-Math.PI / 2);
  const stopperMesh = new THREE.Mesh(stopperGeo, glassMat);
  stopperMesh.position.set(0.43, 0, 0);
  stopperMesh.renderOrder = 2;
  perfumeBottleGroup.add(stopperMesh);

  const stopperCoreGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.18, 12);
  stopperCoreGeo.rotateZ(-Math.PI / 2);
  const stopperCore = new THREE.Mesh(stopperCoreGeo, brassMat);
  stopperCore.position.set(0.38, 0, 0);
  perfumeBottleGroup.add(stopperCore);

  perfumeBottleGroup.position.set(-0.04, -0.03, -0.02);
  perfumeBottleGroup.rotation.set(0.0, 0.06, 0.0);
  solidTrayGroup.add(perfumeBottleGroup);

  // Scale & orient the hero tray so it occupies ~44% of viewport width at rest in a three-quarter
  // view from above (showing cavity, nestled bottle, and broken fibrous corner), and fits inside
  // the viewport with generous margin during 360-degree Hold-to-Inspect rotation.
  const TRAY_SCALE = 0.84;
  solidTrayGroup.scale.setScalar(TRAY_SCALE);
  solidTrayGroup.rotation.set(0.25, -0.44, 0.03);

  // 4. Scrub-able particle/thread morph cloud that converges and braids into the tray
  //    Only the incoming threads glow, and their glow fades out completely once the studio is lit
  const morphData = generateTrayMorphCoordinates(1600, 9001);
  const morphGeo = new THREE.BufferGeometry();
  morphGeo.setAttribute('position', new THREE.BufferAttribute(morphData.targetPositions, 3));
  morphGeo.setAttribute('aSource', new THREE.BufferAttribute(morphData.sourcePositions, 3));
  morphGeo.setAttribute('aSeed', new THREE.BufferAttribute(morphData.randomSeeds, 1));

  const morphMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uMorph: { value: 0 },
      uFade: { value: 0 },
      uTime: { value: 0 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute vec3 aSource;
      attribute float aSeed;
      uniform float uMorph;
      uniform float uTime;
      varying float vSeed;
      varying float vMorph;

      void main() {
        vSeed = aSeed;
        vMorph = uMorph;

        float localT = clamp((uMorph - aSeed * 0.22) / 0.78, 0.0, 1.0);
        float smoothT = localT * localT * (3.0 - 2.0 * localT);

        vec3 srcLocal = aSource - vec3(0.0, -5.45, 0.0);
        vec3 pos = mix(srcLocal, position, smoothT);

        float braidEnv = sin(smoothT * 3.14159265);
        float angle = aSeed * 6.28318 + uTime * 1.6 + smoothT * 4.0;
        pos.x += cos(angle) * 0.26 * braidEnv;
        pos.y += sin(angle * 1.3) * 0.20 * braidEnv;
        pos.z += sin(angle) * 0.26 * braidEnv;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (13.0 + aSeed * 11.0) * (1.0 / max(0.6, -mvPosition.z));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uFade;
      uniform sampler2D uSprite;
      varying float vSeed;
      varying float vMorph;

      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.05) discard;
        vec3 foxfire = vec3(0.72, 0.86, 0.26);
        vec3 warmSpore = vec3(0.88, 0.83, 0.74);
        vec3 col = mix(foxfire, warmSpore, smoothstep(0.55, 0.92, vMorph));
        gl_FragColor = vec4(col, tex.a * uFade);
      }
    `,
  });

  const morphPoints = new THREE.Points(morphGeo, morphMat);
  morphPoints.scale.setScalar(TRAY_SCALE);
  morphPoints.rotation.copy(solidTrayGroup.rotation);
  group.add(morphPoints);

  // Invisible raycast proxy box for Hold-to-Inspect
  const hitProxyGeo = new THREE.BoxGeometry(2.4, 0.85, 1.65);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'tray';
  group.add(hitProxy);

  const updateMorphAndOpacity = (
    morphProgress: number,
    solidOpacity: number,
    elapsedSec: number,
    fragileSettle = 1,
    foxfireGlowFade?: number,
  ) => {
    const active = morphProgress > 0.01 || solidOpacity > 0.01;
    group.visible = active;
    if (!active) return;

    solidTrayGroup.visible = solidOpacity > 0.01;
    skinMat.opacity = solidOpacity;
    coreMat.opacity = solidOpacity;
    fibreMat.opacity = solidOpacity;

    // Gentle scroll-scrubbed settling of the fragile glass perfume bottle into the tray cavity
    const bottleVis = Math.min(solidOpacity, Math.max(0, fragileSettle));
    perfumeBottleGroup.visible = bottleVis > 0.01;
    cradleShadowMesh.visible = bottleVis > 0.01;
    if (perfumeBottleGroup.visible) {
      const easeSettle = 1 - Math.pow(1 - Math.min(1, fragileSettle), 3);
      perfumeBottleGroup.position.y = -0.03 + (1 - easeSettle) * 0.42;
      perfumeBottleGroup.rotation.z = (1 - easeSettle) * 0.08;

      glassMat.opacity = (isSoftwareGl ? 0.56 : 1.0) * bottleVis;
      flaconEdgesMat.opacity = 0.42 * bottleVis;
      liquidMat.opacity = 0.84 * bottleVis;
      brassMat.opacity = bottleVis;
      labelMat.opacity = bottleVis;
      cradleShadowMat.opacity = easeSettle * bottleVis * 0.85;
    }

    // Incoming threads glow while converging and fade out completely (to 0) once studio is lit
    const computedGlowFade =
      foxfireGlowFade !== undefined
        ? foxfireGlowFade
        : Math.sin(Math.min(1, morphProgress) * Math.PI) *
          Math.pow(Math.max(0, 1 - solidOpacity), 1.6);
    morphPoints.visible = computedGlowFade > 0.005;
    morphMat.uniforms.uMorph.value = morphProgress;
    morphMat.uniforms.uFade.value = Math.min(0.78, computedGlowFade);
    morphMat.uniforms.uTime.value = elapsedSec;
  };

  return {
    group,
    solidTrayGroup,
    morphPoints,
    hitProxy,
    updateMorphAndOpacity,
  };
}

