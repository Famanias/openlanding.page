import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { generateTrayMorphCoordinates } from '../../logic/networkGenerator';

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

const HALF_W = 1.30;
const HALF_D = 0.84;
const CORNER_R = 0.30;

/**
 * Signed distance to the rounded-rectangle outer perimeter in the XZ plane.
 * Negative inside the tray footprint, 0 on the outer rim, positive outside.
 */
function roundedRectSdf(x: number, z: number): number {
  const qx = Math.abs(x) - (HALF_W - CORNER_R);
  const qz = Math.abs(z) - (HALF_D - CORNER_R);
  return (
    Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) +
    Math.min(Math.max(qx, qz), 0) -
    CORNER_R
  );
}

/**
 * Signed distance to the broken front-right corner cut contour.
 * Positive inside the intact tray, 0 on the clean fibrous break line, negative in the broken-away corner.
 */
function brokenCornerSdf(x: number, z: number): number {
  const angle = Math.atan2(z - 0.75, x - 1.16);
  const fibrousWave =
    Math.sin(angle * 7.0) * 0.018 +
    Math.cos(angle * 13.0 + 0.8) * 0.009 +
    Math.sin(angle * 23.0) * 0.004;
  const distToBreakCenter = Math.hypot((x - 1.16) * 0.88, (z - 0.74) * 1.04);
  return distToBreakCenter - (0.58 + fibrousWave);
}

/**
 * Exact radial distance from (0,0) along direction (cos(theta), sin(theta))
 * to the intact tray perimeter (either the smooth rounded-rectangle rim or the broken corner edge).
 */
function findBoundaryRadiusForAngle(theta: number): {
  radius: number;
  outerRadius: number;
  isBrokenEdge: boolean;
} {
  const dx = Math.cos(theta);
  const dz = Math.sin(theta);

  // Binary search for exact outer rounded-rectangle intersection
  let lo = 0.3;
  let hi = 1.75;
  for (let iter = 0; iter < 22; iter++) {
    const mid = 0.5 * (lo + hi);
    if (roundedRectSdf(dx * mid, dz * mid) <= 0) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const outerRadius = 0.5 * (lo + hi);

  // Check if this ray intersects the front-right broken corner cut before reaching outerRadius
  if (dx > 0.15 && dz > 0.05) {
    const endX = dx * outerRadius;
    const endZ = dz * outerRadius;
    if (brokenCornerSdf(endX, endZ) < 0) {
      let cLo = 0.25;
      let cHi = outerRadius;
      for (let iter = 0; iter < 22; iter++) {
        const mid = 0.5 * (cLo + cHi);
        if (brokenCornerSdf(dx * mid, dz * mid) >= 0) {
          cLo = mid;
        } else {
          cHi = mid;
        }
      }
      const cutRadius = 0.5 * (cLo + cHi);
      return {
        radius: cutRadius,
        outerRadius,
        isBrokenEdge: true,
      };
    }
  }

  return {
    radius: outerRadius,
    outerRadius,
    isBrokenEdge: false,
  };
}

/**
 * Evaluates the molded packaging tray top height, underside height, and cavity ambient-occlusion shade
 * at any interior/boundary point (x, z), matching `material-top_9cdf4064.png` and
 * `material-underside-and-cut-edge_69208517.png`.
 */
function evaluateTrayProfileAt(x: number, z: number): {
  topY: number;
  bottomY: number;
  cavityAo: number;
} {
  const outDist = roundedRectSdf(x, z);
  const wallThickness = 0.145;

  let topY = -0.22;
  let bottomY = topY - wallThickness;
  let cavityAo = 0.93;

  // Fine organic molded surface micro-undulation
  const microMold =
    Math.sin(x * 7.5 + z * 6.2) * 0.0025 + Math.cos(x * 13.0 - z * 11.4) * 0.0015;

  if (outDist > -0.15) {
    // Softly rolled perimeter flange lip
    const u = Math.max(0, Math.min(1, (outDist + 0.15) / 0.15)); // 0 at inner lip edge, 1 at outer rim
    const lipArch = Math.sin(u * Math.PI) * 0.038;
    const outerRoll = u > 0.62 ? -Math.pow((u - 0.62) / 0.38, 2) * 0.042 : 0;
    topY = 0.225 + lipArch + outerRoll + microMold;
    bottomY = 0.085 + lipArch * 0.45 + outerRoll + microMold;
    cavityAo = 0.98 + 0.02 * Math.sin(u * Math.PI);
  } else if (outDist > -0.40) {
    // Smooth drafted inner cavity walls descending from rolled lip into the recessed cavity
    const wt = Math.max(0, Math.min(1, (outDist + 0.40) / 0.25)); // 0 at cavity floor crease, 1 at lip inner edge
    const smoothW = wt * wt * (3 - 2 * wt);
    topY = -0.22 + smoothW * 0.445 + microMold;
    bottomY = topY - wallThickness;
    // Soft ambient occlusion darkening near the lower cavity crease so the empty cavity reads clearly
    cavityAo = 0.83 + smoothW * 0.15;
  } else {
    // Open recessed cavity floor with subtle molded perimeter channel & central cushion pad
    const ridgeSmooth =
      Math.max(0, Math.min(1, (-0.43 - outDist) / 0.06)) *
      (1 - Math.max(0, Math.min(1, (-0.52 - outDist) / 0.06)));
    const innerPad = Math.max(0, Math.min(1, (-0.50 - outDist) / 0.08)) * 0.014;
    const deltaY = ridgeSmooth * 0.012 + innerPad + microMold;
    topY = -0.22 + deltaY;
    bottomY = -0.365 + deltaY;
    // Slight crease shading right where the floor meets the drafted wall
    const floorCrease = Math.max(0, Math.min(1, (-0.40 - outDist) / 0.14));
    cavityAo = 0.83 + floorCrease * 0.10;
  }

  return { topY, bottomY, cavityAo };
}

/**
 * Builds the Chapter 5 Molded Mycelium Packaging Tray and scrub-able thread convergence morph:
 * - Boundary-conforming radial/perimeter topology with zero stair-stepping or jagged rim edges
 * - Empty recessed cavity with clear soft ambient shading and rolled perimeter lip
 * - Matte off-white to warm cream mycelium skin with faint velvety fuzz (grazing-angle sheen)
 *   and scattered small brown fibre speckles (`material-top_9cdf4064.png`)
 * - One clean, cohesive fibrous broken front-right corner (`material-underside-and-cut-edge_69208517.png`)
 *   showing compressed hemp + mycelium strata in the break (no loose confetti chips)
 * - Glowing incoming threads that converge into the tray and fade out completely once the studio is lit
 */
export function buildPackagingTray(
  textures: ProceduralTextureSet,
  seed = 505,
): BuiltTrayModel {
  const group = new THREE.Group();
  group.name = 'PackagingTraySpecimen';

  const solidTrayGroup = new THREE.Group();
  group.add(solidTrayGroup);

  const angularSegments = 192;
  const radialSegments = 40;
  const wallLayers = 7;

  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const skinIndices: number[] = [];
  const coreIndices: number[] = [];

  // Precompute exact boundary radius for each angular step
  const boundaryData: Array<{
    theta: number;
    cos: number;
    sin: number;
    radius: number;
    outerRadius: number;
    isBrokenEdge: boolean;
  }> = [];

  for (let ia = 0; ia <= angularSegments; ia++) {
    const theta = (ia / angularSegments) * Math.PI * 2;
    const info = findBoundaryRadiusForAngle(theta);
    boundaryData.push({
      theta,
      cos: Math.cos(theta),
      sin: Math.sin(theta),
      ...info,
    });
  }

  const topGrid: number[][] = Array.from({ length: radialSegments + 1 }, () =>
    new Array(angularSegments + 1).fill(-1),
  );
  const botGrid: number[][] = Array.from({ length: radialSegments + 1 }, () =>
    new Array(angularSegments + 1).fill(-1),
  );

  let vertCount = 0;

  // 1. Build smooth boundary-conforming top & bottom shells
  for (let ir = 0; ir <= radialSegments; ir++) {
    // Non-linear radial distribution for higher vertex density across the drafted walls and rolled lip
    const linearS = ir / radialSegments;
    const s = linearS < 0.55 ? linearS * 1.05 : 0.5775 + (1 - Math.pow(1 - (linearS - 0.55) / 0.45, 1.35)) * 0.4225;

    for (let ia = 0; ia <= angularSegments; ia++) {
      const b = boundaryData[ia];
      const r = s * b.radius;
      const x = b.cos * r;
      const z = b.sin * r;
      const prof = evaluateTrayProfileAt(x, z);

      const u = (x + HALF_W) / (HALF_W * 2);
      const v = (z + HALF_D) / (HALF_D * 2);

      topGrid[ir][ia] = vertCount++;
      positions.push(x, prof.topY, z);
      uvs.push(u, v);
      colors.push(prof.cavityAo, prof.cavityAo, prof.cavityAo);

      botGrid[ir][ia] = vertCount++;
      positions.push(x, prof.bottomY, z);
      uvs.push(u + 0.11, v + 0.13);
      const botAo = prof.cavityAo * 0.92;
      colors.push(botAo, botAo, botAo);
    }
  }

  for (let ir = 0; ir < radialSegments; ir++) {
    for (let ia = 0; ia < angularSegments; ia++) {
      const t00 = topGrid[ir][ia];
      const t10 = topGrid[ir][ia + 1];
      const t01 = topGrid[ir + 1][ia];
      const t11 = topGrid[ir + 1][ia + 1];
      skinIndices.push(t00, t01, t10, t10, t01, t11);

      const b00 = botGrid[ir][ia];
      const b10 = botGrid[ir][ia + 1];
      const b01 = botGrid[ir + 1][ia];
      const b11 = botGrid[ir + 1][ia + 1];
      skinIndices.push(b00, b10, b01, b10, b11, b01);
    }
  }

  // 2. Build perimeter edge / broken-corner cross-section wall connecting topY to bottomY
  //    - Along intact outer rim: smooth rounded bullnose edge using skinMat
  //    - Along broken front-right corner: sculpted compressed hemp-fibre cross-section using coreMat
  const wallGrid: number[][] = Array.from({ length: wallLayers + 1 }, () =>
    new Array(angularSegments + 1).fill(-1),
  );

  for (let iw = 0; iw <= wallLayers; iw++) {
    const wt = iw / wallLayers; // 0 at topY, 1 at bottomY
    for (let ia = 0; ia <= angularSegments; ia++) {
      const b = boundaryData[ia];
      const baseX = b.cos * b.radius;
      const baseZ = b.sin * b.radius;
      const prof = evaluateTrayProfileAt(baseX, baseZ);

      let wx = baseX;
      let wz = baseZ;
      const wy = prof.topY * (1 - wt) + prof.bottomY * wt;

      if (b.isBrokenEdge) {
        // Clean, cohesive compressed-fibre break relief (horizontal laminated hemp hurd layers)
        const edgeInset = Math.sin(wt * Math.PI);
        const strataRipple =
          Math.sin(wt * Math.PI * 5.0 + b.theta * 19.0) * 0.0085 +
          Math.cos(wt * Math.PI * 11.0 - b.theta * 37.0) * 0.0055 +
          Math.sin(b.theta * 61.0 + wt * 17.0) * 0.0035;
        const radialOffset = strataRipple * (0.35 + 0.65 * edgeInset);
        wx += b.cos * radialOffset;
        wz += b.sin * radialOffset;

        wallGrid[iw][ia] = vertCount++;
        positions.push(wx, wy, wz);
        // Map UVs along arc-length and thickness so the fibrous core texture wraps naturally
        uvs.push(b.theta * 2.4, wt * 0.85);

        // Subtle fibre-layer luminance modulation (cream mycelium binder + warm hemp hurd)
        const fibreShade =
          0.90 +
          0.08 * Math.sin(wt * Math.PI * 6.0 + b.theta * 23.0) +
          0.04 * Math.cos(b.theta * 43.0);
        colors.push(fibreShade, fibreShade * 0.96, fibreShade * 0.90);
      } else {
        // Intact outer rim: smooth bullnose outward curve
        const bullnose = Math.sin(wt * Math.PI) * 0.014;
        wx += b.cos * bullnose;
        wz += b.sin * bullnose;

        wallGrid[iw][ia] = vertCount++;
        positions.push(wx, wy, wz);
        const u = (wx + HALF_W) / (HALF_W * 2);
        const v = (wz + HALF_D) / (HALF_D * 2) + wt * 0.06;
        uvs.push(u, v);
        const rimAo = 0.96 - wt * 0.06;
        colors.push(rimAo, rimAo, rimAo);
      }
    }
  }

  for (let iw = 0; iw < wallLayers; iw++) {
    for (let ia = 0; ia < angularSegments; ia++) {
      const w00 = wallGrid[iw][ia];
      const w10 = wallGrid[iw][ia + 1];
      const w01 = wallGrid[iw + 1][ia];
      const w11 = wallGrid[iw + 1][ia + 1];

      const isCutQuad =
        boundaryData[ia].isBrokenEdge || boundaryData[ia + 1].isBrokenEdge;
      const targetIndices = isCutQuad ? coreIndices : skinIndices;
      targetIndices.push(w00, w01, w10, w10, w01, w11);
    }
  }

  const trayGeo = new THREE.BufferGeometry();
  trayGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  trayGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  trayGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const combinedIndices = [...skinIndices, ...coreIndices];
  trayGeo.setIndex(combinedIndices);
  trayGeo.addGroup(0, skinIndices.length, 0);
  trayGeo.addGroup(skinIndices.length, coreIndices.length, 1);
  trayGeo.computeVertexNormals();

  // Matte off-white to warm cream mycelium skin with faint velvety fuzz (grazing-angle sheen)
  // and scattered brown fibre speckles (matches material-top_9cdf4064.png, never clips to white)
  const skinMat = new THREE.MeshPhysicalMaterial({
    map: textures.traySkinColor,
    bumpMap: textures.traySkinBump,
    bumpScale: 0.028,
    color: new THREE.Color('#fbf6ee'),
    vertexColors: true,
    roughness: 0.90,
    metalness: 0.0,
    sheen: 0.24,
    sheenRoughness: 0.85,
    sheenColor: new THREE.Color('#f7efe2'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  // Compressed fibrous hemp + mycelium cut face (matches material-underside-and-cut-edge_69208517.png)
  const coreMat = new THREE.MeshStandardMaterial({
    map: textures.trayCoreColor,
    bumpMap: textures.trayCoreBump,
    bumpScale: 0.085,
    color: new THREE.Color('#ddd0b8'),
    vertexColors: true,
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

  // 2. Invisible Raycast Hit Proxy for Hold-to-Inspect
  const hitProxyGeo = new THREE.BoxGeometry(2.75, 0.82, 1.85);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.name = 'InspectableTrayProxy';
  group.add(hitProxy);

  // 3. Thread-to-Tray Morphing Particle Cloud (2,400 glowing hyphal nodes that braid into the tray
  //    in the dark and fade out completely once the solid tray and studio light resolve)
  const morphCoords = generateTrayMorphCoordinates(2400, seed + 17);
  const morphGeo = new THREE.BufferGeometry();
  morphGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(morphCoords.targetPositions.slice(), 3),
  );
  morphGeo.setAttribute(
    'aSource',
    new THREE.BufferAttribute(morphCoords.sourcePositions, 3),
  );
  morphGeo.setAttribute(
    'aTarget',
    new THREE.BufferAttribute(morphCoords.targetPositions, 3),
  );

  const morphMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uMorph: { value: 0 },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      attribute vec3 aSource;
      attribute vec3 aTarget;
      uniform float uMorph;
      uniform float uTime;
      varying float vMix;

      void main() {
        float t = clamp(uMorph, 0.0, 1.0);
        float smoothT = t * t * (3.0 - 2.0 * t);

        float spiralAngle = (1.0 - smoothT) * 2.2;
        vec3 sPos = aSource;
        float c = cos(spiralAngle);
        float s = sin(spiralAngle);
        vec3 swirledSource = vec3(
          sPos.x * c - sPos.z * s,
          sPos.y + sin(uTime * 1.6 + sPos.x) * 0.05 * (1.0 - smoothT),
          sPos.x * s + sPos.z * c
        );

        vec3 pos = mix(swirledSource, aTarget, smoothT);
        vMix = smoothT;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = mix(11.0, 5.0, smoothT) * (1.0 / max(0.5, -mvPosition.z));
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vMix;

      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float core = exp(-d * d * 12.0);
        vec3 threadGlow = vec3(0.66, 0.82, 0.24);
        vec3 warmCream = vec3(0.84, 0.78, 0.66);
        vec3 col = mix(threadGlow, warmCream, vMix * 0.78);
        gl_FragColor = vec4(col, core * uOpacity);
      }
    `,
  });

  const morphPoints = new THREE.Points(morphGeo, morphMat);
  group.add(morphPoints);

  const updateMorphAndOpacity = (
    morphProgress: number,
    solidOpacity: number,
    elapsedSec: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _fragileSettle = 1,
    foxfireGlowFade = 1,
  ) => {
    const visible = morphProgress > 0.01 || solidOpacity > 0.01;
    group.visible = visible;
    if (!visible) return;

    solidTrayGroup.visible = solidOpacity > 0.01;
    skinMat.opacity = solidOpacity;
    coreMat.opacity = solidOpacity;

    // Incoming hyphal threads glow in the dark while braiding into the tray,
    // and fade out completely once the solid tray and studio light resolve.
    const pointFade =
      Math.sin(Math.min(1, morphProgress) * Math.PI * 0.85) *
      Math.max(0, 1 - solidOpacity * 0.96) *
      foxfireGlowFade;
    morphPoints.visible = pointFade > 0.01;
    morphMat.uniforms.uMorph.value = morphProgress;
    morphMat.uniforms.uOpacity.value = pointFade * 0.72;
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
