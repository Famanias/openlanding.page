import * as THREE from "three";

// Normalized contours traced from the original footer reference (.img2threejs/reference.png).
// Depth is inferred from single-view occlusion and curvature cues; zero reference image pixels are used.
type Control = readonly [number, number, number];

type SheetSpec = {
  id: "rear" | "front" | "sail";
  upper: readonly Control[];
  lower: readonly Control[];
  color: string;
  roughness: number;
  opacity: number;
  clearcoat: number;
  specularIntensity: number;
  normalStrength: number;
  bowAmplitude: number;
  renderOrder: number;
};

export const SHEETS: readonly SheetSpec[] = [
  {
    id: "rear",
    color: "#ffffff",
    roughness: 0.62,
    opacity: 0.86,
    clearcoat: 0.06,
    specularIntensity: 0.22,
    normalStrength: 0.18,
    bowAmplitude: 0.10,
    renderOrder: 1,
    upper: [
      [-0.03, 0.535, -1.15],
      [0.09, 0.476, -1.10],
      [0.19, 0.490, -1.00],
      [0.28, 0.532, -0.86],
      [0.39, 0.603, -0.72],
      [0.49, 0.541, -0.84],
      [0.58, 0.478, -1.04],
      [0.695, 0.382, -1.28],
      [0.80, 0.442, -1.50],
      [0.90, 0.548, -1.70],
      [0.984, 0.735, -1.85],
    ],
    lower: [
      [-0.03, 0.781, -1.80],
      [0.09, 0.758, -1.68],
      [0.19, 0.720, -1.50],
      [0.28, 0.678, -1.25],
      [0.39, 0.738, -0.70],
      [0.49, 0.708, -0.58],
      [0.58, 0.638, -0.55],
      [0.695, 0.654, -0.66],
      [0.80, 0.666, -0.78],
      [0.90, 0.692, -0.88],
      [0.984, 0.738, -0.96],
    ],
  },
  {
    id: "front",
    color: "#ffffff",
    roughness: 0.74,
    opacity: 0.94,
    clearcoat: 0.03,
    specularIntensity: 0.18,
    normalStrength: 0.42,
    bowAmplitude: 0.06,
    renderOrder: 2,
    upper: [
      [-0.03, 0.296, 0.65],
      [0.05, 0.325, 0.78],
      [0.11, 0.398, 0.92],
      [0.16, 0.476, 1.06],
      [0.22, 0.496, 1.18],
      [0.30, 0.534, 1.28],
      [0.41, 0.603, 1.34],
      [0.50, 0.684, 1.10],
      [0.585, 0.746, 0.82],
      [0.66, 0.718, 0.56],
      [0.74, 0.656, 0.22],
      [0.83, 0.569, -0.16],
      [0.90, 0.485, -0.52],
      [0.962, 0.415, -0.80],
    ],
    lower: [
      [-0.03, 0.540, 0.80],
      [0.05, 0.504, 0.90],
      [0.11, 0.476, 1.00],
      [0.16, 0.494, 1.06],
      [0.22, 0.556, 1.32],
      [0.30, 0.696, 1.64],
      [0.41, 0.808, 1.76],
      [0.50, 0.790, 1.56],
      [0.585, 0.752, 1.22],
      [0.66, 0.786, 0.90],
      [0.74, 0.686, 0.38],
      [0.83, 0.659, -0.02],
      [0.91, 0.682, -0.30],
      [0.982, 0.736, -0.52],
    ],
  },
  {
    id: "sail",
    color: "#ffffff",
    roughness: 0.48,
    opacity: 0.56,
    clearcoat: 0.14,
    specularIntensity: 0.24,
    normalStrength: 0.24,
    bowAmplitude: 0.10,
    renderOrder: 3,
    upper: [
      [0.41, 0.625, 0.35],
      [0.49, 0.647, 0.28],
      [0.55, 0.625, 0.38],
      [0.61, 0.562, 0.58],
      [0.68, 0.435, 0.84],
      [0.76, 0.305, 1.10],
      [0.85, 0.182, 1.36],
      [0.943, 0.046, 1.62],
    ],
    lower: [
      [0.41, 0.642, 0.72],
      [0.49, 0.684, 1.04],
      [0.58, 0.750, 1.34],
      [0.655, 0.788, 1.54],
      [0.72, 0.712, 1.58],
      [0.78, 0.666, 1.50],
      [0.88, 0.678, 1.32],
      [0.984, 0.738, 1.16],
    ],
  },
];

const COLUMNS = 144;
const ROWS = 28;

function toWorld([u, v, z]: Control): THREE.Vector3 {
  return new THREE.Vector3((u - 0.5) * 18, (0.5 - v) * 6, z);
}

function buildCurve(points: readonly Control[]): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(points.map(toWorld), false, "centripetal");
}

function hash2D(ix: number, iy: number, seed: number): number {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1442695041);
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function valueNoise2D(x: number, y: number, periodX: number, periodY: number, seed: number): number {
  const fx = ((x % periodX) + periodX) % periodX;
  const fy = ((y % periodY) + periodY) % periodY;
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const x1 = (x0 + 1) % periodX;
  const y1 = (y0 + 1) % periodY;
  const tx = fx - x0;
  const ty = fy - y0;
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  const n00 = hash2D(x0, y0, seed);
  const n10 = hash2D(x1, y0, seed);
  const n01 = hash2D(x0, y1, seed);
  const n11 = hash2D(x1, y1, seed);
  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

function createProceduralSurfaceMaps() {
  const size = 256;
  const heightField = new Float32Array(size * size);
  const roughnessData = new Uint8Array(size * size * 4);
  const normalData = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    const ny = y / size;
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      // Macro (freq 2), meso fibrous grain (freq 14x8), and micro mineral speckle (freq 64)
      const macro = valueNoise2D(nx * 4, ny * 4, 4, 4, 11);
      const meso = valueNoise2D(nx * 28, ny * 14, 28, 14, 29);
      const streak = valueNoise2D(nx * 52 + ny * 14, ny * 22, 52, 22, 47);
      const micro = hash2D(x, y, 83) * 0.72 + valueNoise2D(nx * 64, ny * 64, 64, 64, 71) * 0.28;

      const h = macro * 0.26 + meso * 0.32 + streak * 0.22 + micro * 0.20;
      heightField[y * size + x] = h;

      // Independent roughness variation (not aliased from height)
      const roughNoise =
        valueNoise2D(nx * 6, ny * 6, 6, 6, 101) * 0.45 +
        valueNoise2D(nx * 24, ny * 18, 24, 18, 137) * 0.35 +
        hash2D(x, y, 199) * 0.20;
      const rByte = Math.max(0, Math.min(255, Math.round(192 + (roughNoise - 0.5) * 80)));
      const idx = (y * size + x) * 4;
      roughnessData[idx] = rByte;
      roughnessData[idx + 1] = rByte;
      roughnessData[idx + 2] = rByte;
      roughnessData[idx + 3] = 255;
    }
  }

  const strength = 2.8;
  for (let y = 0; y < size; y++) {
    const yPrev = (y - 1 + size) % size;
    const yNext = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xPrev = (x - 1 + size) % size;
      const xNext = (x + 1) % size;
      const dx = (heightField[y * size + xNext] - heightField[y * size + xPrev]) * strength;
      const dy = (heightField[yNext * size + x] - heightField[yPrev * size + x]) * strength;
      const invLen = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const idx = (y * size + x) * 4;
      normalData[idx] = Math.round((-dx * invLen * 0.5 + 0.5) * 255);
      normalData[idx + 1] = Math.round((-dy * invLen * 0.5 + 0.5) * 255);
      normalData[idx + 2] = Math.round((invLen * 0.5 + 0.5) * 255);
      normalData[idx + 3] = 255;
    }
  }

  const roughnessMap = new THREE.DataTexture(roughnessData, size, size, THREE.RGBAFormat);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(5, 2.5);
  roughnessMap.needsUpdate = true;

  const normalMap = new THREE.DataTexture(normalData, size, size, THREE.RGBAFormat);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(6, 3);
  normalMap.needsUpdate = true;

  return { roughnessMap, normalMap };
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function createStudioFloorTexture(): THREE.DataTexture {
  const width = 512;
  const height = 256;
  const data = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y++) {
    const v = 1 - y / (height - 1);
    for (let x = 0; x < width; x++) {
      const u = x / (width - 1);

      // Base dark olive backdrop (#131712 center-left, #0a0d09 upper-right)
      const upperRightFade = Math.max(0, Math.min(1, (u - 0.52) * 1.6)) * Math.max(0, 1 - v * 1.25);
      let r = 18 - upperRightFade * 7;
      let g = 22 - upperRightFade * 8;
      let b = 17 - upperRightFade * 7;

      // Studio floor region (v >= 0.66)
      if (v > 0.66) {
        const floorT = Math.max(0, Math.min(1, (v - 0.66) / 0.34));
        const grain =
          (valueNoise2D(u * 96, v * 320, 96, 320, 311) - 0.5) * 7 +
          (hash2D(x, y, 409) - 0.5) * 3.5;

        // Contact shadow trough directly under the sheets (v around 0.73..0.81)
        const shadowCenterV =
          u < 0.45
            ? 0.77 + 0.04 * Math.sin(((u - 0.15) / 0.3) * Math.PI)
            : 0.75 + 0.04 * Math.exp(-Math.pow((u - 0.65) / 0.08, 2));
        const contactShadow = Math.exp(-Math.pow((v - shadowCenterV) / 0.038, 2)) * (u > 0.02 ? 0.76 : 0.54);
        r *= 1 - contactShadow;
        g *= 1 - contactShadow;
        b *= 1 - contactShadow;

        // Left-center subdued cool slate floor reflection (u ~ 0.08..0.58, v ~ 0.81..0.98)
        const coolPool =
          Math.exp(-Math.pow((u - 0.32) / 0.28, 2)) *
          Math.exp(-Math.pow((v - 0.89) / 0.10, 2));
        r += coolPool * (20 + grain * 0.45);
        g += coolPool * (22 + grain * 0.50);
        b += coolPool * (20 + grain * 0.45);

        // Warm coral-peach reflection pool under the lower-right crossing (u ~ 0.772, v ~ 0.815)
        const duWarm = (u - 0.772) / 0.064;
        const dvWarm = (v - 0.815) / 0.135;
        const warmPool = Math.exp(-(duWarm * duWarm + dvWarm * dvWarm)) * smoothstep(0.06, 0.36, floorT);
        const warmCore =
          Math.exp(-Math.pow((u - 0.774) / 0.036, 2)) *
          Math.exp(-Math.pow((v - 0.772) / 0.058, 2));
        const warmFineNoise = 0.88 + 0.24 * valueNoise2D(u * 48, v * 120, 48, 120, 521);
        r += (warmPool * 54 + warmCore * 32) * warmFineNoise;
        g += (warmPool * 34 + warmCore * 19) * warmFineNoise;
        b += (warmPool * 27 + warmCore * 15) * warmFineNoise;

        // Far-right pale mint edge reflection on the floor beneath the sail base (u ~ 0.96, v ~ 0.86)
        const mintFloor =
          Math.exp(-Math.pow((u - 0.962) / 0.034, 2)) *
          Math.exp(-Math.pow((v - 0.865) / 0.11, 2));
        r += mintFloor * (20 + grain * 0.5);
        g += mintFloor * (28 + grain * 0.65);
        b += mintFloor * (23 + grain * 0.55);

        const floorSpec = (coolPool * 0.35 + warmPool * 0.65 + mintFloor * 0.45) * grain;
        r += floorSpec;
        g += floorSpec * 0.92;
        b += floorSpec * 0.85;
      }

      const idx = (y * width + x) * 4;
      data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      data[idx + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function gaussian(x: number, center: number, width: number): number {
  const d = (x - center) / width;
  return Math.exp(-(d * d));
}

function computeVertexColor(
  sheetId: SheetSpec["id"],
  u: number,
  v: number,
  worldU: number,
  worldV: number,
  target: THREE.Color
): void {
  const fineGrain =
    (valueNoise2D(worldU * 140 + worldV * 32, worldV * 96, 140, 96, sheetId === "front" ? 17 : 53) - 0.5) * 0.022 +
    (valueNoise2D(u * 96, v * 48, 96, 48, 97) - 0.5) * 0.014;

  if (sheetId === "front") {
    // Tactile matte neutral-charcoal ribbon across left wing (u=0..0.16) and foreground valley (u=0.18..0.56)
    const leftWing = smoothstep(0.24, 0.0, worldU) * (0.036 - v * 0.006);
    const valleyBelt = gaussian(worldU, 0.35, 0.20) * (0.040 - 0.006 * Math.abs(v - 0.45));
    const pinchCrease = gaussian(worldU, 0.160, 0.024) * 0.016;
    const rightTailDarken = smoothstep(0.66, 0.86, worldU);

    // Warm coral-peach illumination along the right crossing and diagonal (u ~ 0.62..0.85, v ~ 0.56..0.72)
    const coralGlow =
      gaussian(worldU, 0.755, 0.068) *
      gaussian(worldV, 0.652, 0.055) *
      0.24;
    const coralSeamBand =
      gaussian(worldU, 0.78, 0.095) *
      Math.exp(-Math.pow(v - 0.12, 2) / 0.05) *
      0.16;

    const matteLevel = Math.max(0.020, 0.068 + leftWing + valleyBelt - pinchCrease + fineGrain);
    const shade = matteLevel * (1 - rightTailDarken * 0.74);

    target.setRGB(
      Math.min(1, shade * 0.90 + coralGlow * 0.96 + coralSeamBand * 0.88),
      Math.min(1, shade * 0.93 + coralGlow * 0.52 + coralSeamBand * 0.48),
      Math.min(1, shade * 0.86 + coralGlow * 0.38 + coralSeamBand * 0.35)
    );
    return;
  }

  if (sheetId === "rear") {
    // Subtle dark charcoal underside on the left (worldU < 0.36), smoky translucent olive-mint dome in center-right
    const leftShadow = smoothstep(0.38, 0.22, worldU);
    const leftUnderside = smoothstep(0.32, 0.04, worldU) * (1 - v * 0.35) * 0.018;
    const domeSheen = gaussian(worldU, 0.64, 0.15) * Math.exp(-Math.pow(v - 0.32, 2) / 0.18) * 0.055;
    const innerFoldPocket = gaussian(worldU, 0.56, 0.085) * gaussian(worldV, 0.59, 0.065) * 0.065;
    const rightFade = smoothstep(0.82, 0.96, worldU);
    const coralTransmit =
      gaussian(worldU, 0.745, 0.085) *
      gaussian(worldV, 0.61, 0.085) *
      0.14;
    const base =
      (0.052 * (1 - leftShadow * 0.86) + leftUnderside + domeSheen + innerFoldPocket + fineGrain * 0.45) *
      (1 - rightFade * 0.68);

    target.setRGB(
      Math.max(0.012, base * 0.84 + coralTransmit * 0.92),
      Math.max(0.014, base * 0.96 + coralTransmit * 0.54),
      Math.max(0.012, base * 0.86 + coralTransmit * 0.42)
    );
    return;
  }

  // "sail": smoky-mint translucent sheet with frosted mottling near top-right apex and warm coral-peach crossing glow
  const mottle = (valueNoise2D(worldU * 18, worldV * 14, 18, 14, 211) - 0.45) * 0.036;
  const apexFrost =
    gaussian(worldU, 0.90, 0.095) *
    Math.exp(-Math.pow(worldV - 0.18, 2) / 0.048) *
    (0.095 + mottle);
  const upperSlopeFrost = gaussian(worldU, 0.80, 0.12) * Math.exp(-Math.pow(v - 0.20, 2) / 0.09) * 0.062;
  const centerMintCaustic = gaussian(worldU, 0.61, 0.085) * gaussian(worldV, 0.61, 0.075) * 0.085;
  const lowerRightPocketDarken =
    smoothstep(0.76, 0.88, worldU) * smoothstep(0.42, 0.58, worldV) * 0.052;
  const coralPocket =
    gaussian(worldU, 0.745, 0.085) * gaussian(worldV, 0.605, 0.085) * 0.18 +
    gaussian(worldU, 0.772, 0.052) * gaussian(worldV, 0.658, 0.045) * 0.22;
  const base = Math.max(
    0.018,
    0.066 + apexFrost + upperSlopeFrost + centerMintCaustic - lowerRightPocketDarken + fineGrain * 0.85
  );

  target.setRGB(
    Math.min(1, base * 0.78 + coralPocket * 0.98),
    Math.min(1, base * 0.98 + coralPocket * 0.56),
    Math.min(1, base * 0.88 + coralPocket * 0.42)
  );
}

type InterpolatedSample = {
  colFloat: number;
  rowFloat: number;
};

function sampleGridPosition(
  posArray: Float32Array,
  colFloat: number,
  rowFloat: number,
  out: THREE.Vector3
): void {
  const c0 = Math.max(0, Math.min(COLUMNS - 1, Math.floor(colFloat)));
  const r0 = Math.max(0, Math.min(ROWS - 1, Math.floor(rowFloat)));
  const c1 = c0 + 1;
  const r1 = r0 + 1;
  const tc = Math.max(0, Math.min(1, colFloat - c0));
  const tr = Math.max(0, Math.min(1, rowFloat - r0));

  const i00 = (r0 * (COLUMNS + 1) + c0) * 3;
  const i10 = (r0 * (COLUMNS + 1) + c1) * 3;
  const i01 = (r1 * (COLUMNS + 1) + c0) * 3;
  const i11 = (r1 * (COLUMNS + 1) + c1) * 3;

  const w00 = (1 - tc) * (1 - tr);
  const w10 = tc * (1 - tr);
  const w01 = (1 - tc) * tr;
  const w11 = tc * tr;

  out.set(
    posArray[i00] * w00 + posArray[i10] * w10 + posArray[i01] * w01 + posArray[i11] * w11,
    posArray[i00 + 1] * w00 + posArray[i10 + 1] * w10 + posArray[i01 + 1] * w01 + posArray[i11 + 1] * w11,
    posArray[i00 + 2] * w00 + posArray[i10 + 2] * w10 + posArray[i01 + 2] * w01 + posArray[i11 + 2] * w11
  );
}

function buildSheetEdgeSegments(
  spec: SheetSpec,
  basePositions: Float32Array
): { samples: InterpolatedSample[]; colors: Float32Array } {
  const samples: InterpolatedSample[] = [];
  const rgbList: number[] = [];

  const pushGridSegment = (
    c0: number,
    r0: number,
    c1: number,
    r1: number,
    rCol0: number,
    gCol0: number,
    bCol0: number,
    rCol1 = rCol0,
    gCol1 = gCol0,
    bCol1 = bCol0
  ) => {
    samples.push({ colFloat: c0, rowFloat: r0 }, { colFloat: c1, rowFloat: r1 });
    rgbList.push(rCol0, gCol0, bCol0, rCol1, gCol1, bCol1);
  };

  const worldUV = (col: number, row: number): [number, number] => {
    const vertexIdx = row * (COLUMNS + 1) + col;
    const x = basePositions[vertexIdx * 3];
    const y = basePositions[vertexIdx * 3 + 1];
    return [x / 18 + 0.5, 0.5 - y / 6];
  };

  // 1. Upper boundary segments
  for (let c = 0; c < COLUMNS; c++) {
    const [u0] = worldUV(c, 0);
    const [u1] = worldUV(c + 1, 0);
    if (u0 < 0.002 && u1 < 0.002) continue;

    const colorForUpper = (u: number): [number, number, number] => {
      if (spec.id === "sail") {
        // Signature pale-mint diagonal rim on the rising sail (u ~ 0.52..0.943)
        const fadeStart = smoothstep(0.42, 0.54, u);
        const mintPeak =
          (0.46 + 0.42 * gaussian(u, 0.64, 0.11) + 0.36 * gaussian(u, 0.91, 0.055)) * fadeStart;
        return [0.62 * mintPeak, 0.86 * mintPeak, 0.72 * mintPeak];
      }
      if (spec.id === "front") {
        // Soft matte left ridge, glowing warm coral-peach diagonal seam on the right (u ~ 0.60..0.96)
        const leftEdge = u < 0.48 ? 0.11 * (1 - 0.35 * gaussian(u, 0.16, 0.04)) : 0.06;
        const coralSeam =
          gaussian(u, 0.785, 0.078) * 0.92 +
          gaussian(u, 0.675, 0.065) * 0.42 +
          gaussian(u, 0.885, 0.055) * 0.34;
        return [
          Math.min(1, leftEdge * 0.82 + coralSeam * 0.98),
          Math.min(1, leftEdge * 0.88 + coralSeam * 0.62),
          Math.min(1, leftEdge * 0.80 + coralSeam * 0.48),
        ];
      }
      // "rear" dome crest rim: delicate smoked-olive glass edge in center-right (u ~ 0.40..0.84)
      const dome =
        (gaussian(u, 0.55, 0.11) * 0.24 + gaussian(u, 0.70, 0.10) * 0.22) *
        smoothstep(0.37, 0.44, u) *
        (1 - smoothstep(0.84, 0.94, u));
      return [dome * 0.76, dome * 0.88, dome * 0.79];
    };

    const [r0, g0, b0] = colorForUpper(u0);
    const [r1, g1, b1] = colorForUpper(u1);
    pushGridSegment(c, 0, c + 1, 0, r0, g0, b0, r1, g1, b1);
  }

  // 2. Lower boundary segments
  for (let c = 0; c < COLUMNS; c++) {
    const [u0] = worldUV(c, ROWS);
    const [u1] = worldUV(c + 1, ROWS);

    const colorForLower = (u: number): [number, number, number] => {
      if (spec.id === "front") {
        const arch = gaussian(u, 0.10, 0.06) * 0.10;
        const valley = gaussian(u, 0.38, 0.14) * 0.24;
        const coral = gaussian(u, 0.765, 0.058) * 0.62;
        const tail = gaussian(u, 0.92, 0.055) * 0.22;
        const cool = arch + valley + tail;
        return [
          Math.min(1, cool * 0.78 + coral * 0.96),
          Math.min(1, cool * 0.88 + coral * 0.60),
          Math.min(1, cool * 0.82 + coral * 0.46),
        ];
      }
      if (spec.id === "sail") {
        const centerTip = gaussian(u, 0.585, 0.10) * 0.36;
        const coralFold = gaussian(u, 0.765, 0.058) * 0.68;
        const rightBase = gaussian(u, 0.935, 0.055) * 0.34;
        const cool = centerTip + rightBase;
        return [
          Math.min(1, cool * 0.76 + coralFold * 0.96),
          Math.min(1, cool * 0.90 + coralFold * 0.60),
          Math.min(1, cool * 0.82 + coralFold * 0.48),
        ];
      }
      // "rear" lower edge: subtle inner shadow edge
      const subtle = gaussian(u, 0.62, 0.10) * 0.08 * smoothstep(0.44, 0.54, u);
      return [subtle * 0.75, subtle * 0.84, subtle * 0.76];
    };

    const [r0, g0, b0] = colorForLower(u0);
    const [r1, g1, b1] = colorForLower(u1);
    pushGridSegment(c, ROWS, c + 1, ROWS, r0, g0, b0, r1, g1, b1);
  }

  // 3. Sail steep right edge from apex (0.943, 0.046) to base (0.984, 0.738)
  if (spec.id === "sail") {
    for (let r = 0; r < ROWS; r++) {
      const t0 = r / ROWS;
      const t1 = (r + 1) / ROWS;
      const intensity0 = 0.56 * (1 - 0.18 * Math.sin(t0 * Math.PI));
      const intensity1 = 0.56 * (1 - 0.18 * Math.sin(t1 * Math.PI));
      pushGridSegment(
        COLUMNS,
        r,
        COLUMNS,
        r + 1,
        intensity0 * 0.66,
        intensity0 * 0.88,
        intensity0 * 0.75,
        intensity1 * 0.66,
        intensity1 * 0.88,
        intensity1 * 0.75
      );
    }
  }

  // 4. Smooth internal S-curve fold crease on "rear" (bilinearly interpolated across grid, zero stair-stepping)
  if (spec.id === "rear") {
    const foldSteps = 40;
    const startCol = 0.575 * COLUMNS;
    const endCol = 0.765 * COLUMNS;
    for (let s = 0; s < foldSteps; s++) {
      const t0 = s / foldSteps;
      const t1 = (s + 1) / foldSteps;
      const c0 = startCol + (endCol - startCol) * t0;
      const c1 = startCol + (endCol - startCol) * t1;
      const r0 = (1 - Math.pow(1 - t0, 2.35)) * (ROWS - 0.5);
      const r1 = (1 - Math.pow(1 - t1, 2.35)) * (ROWS - 0.5);

      const colorAt = (t: number): [number, number, number] => {
        const fadeEnds = Math.sin(t * Math.PI);
        const crossingPeak = gaussian(t, 0.24, 0.22) * 0.42 * fadeEnds;
        const warmTail = gaussian(t, 0.78, 0.24) * 0.34 * fadeEnds;
        return [
          crossingPeak * 0.78 + warmTail * 0.92,
          crossingPeak * 0.92 + warmTail * 0.62,
          crossingPeak * 0.84 + warmTail * 0.50,
        ];
      };
      const [cr0, cg0, cb0] = colorAt(t0);
      const [cr1, cg1, cb1] = colorAt(t1);
      pushGridSegment(c0, r0, c1, r1, cr0, cg0, cb0, cr1, cg1, cb1);
    }
  }

  return { samples, colors: new Float32Array(rgbList) };
}

export type FooterSculpturePointer = {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  strength: number;
  phase?: number;
};

export function createFooterSculpture() {
  const root = new THREE.Group();
  root.name = "footer-sheet-sculpture";

  const { roughnessMap, normalMap } = createProceduralSurfaceMaps();
  const floorTexture = createStudioFloorTexture();

  const stage = new THREE.Group();
  stage.name = "footer-stage";
  const stageGeometry = new THREE.PlaneGeometry(18, 6, 1, 1);
  const stageMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    depthWrite: false,
  });
  const stageMesh = new THREE.Mesh(stageGeometry, stageMaterial);
  stageMesh.name = "studio-floor-stage";
  stageMesh.position.set(0, 0, -4.5);
  stageMesh.renderOrder = 0;
  stage.add(stageMesh);

  const sheets = SHEETS.map((spec, index) => {
    const upper = buildCurve(spec.upper);
    const lower = buildCurve(spec.lower);
    const geometry = new THREE.PlaneGeometry(1, 1, COLUMNS, ROWS);
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(positions.array.length);
    const colors = new Float32Array(positions.count * 3);

    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const point = new THREE.Vector3();
    const color = new THREE.Color();

    for (let row = 0; row <= ROWS; row++) {
      const v = row / ROWS;
      for (let column = 0; column <= COLUMNS; column++) {
        const u = column / COLUMNS;
        upper.getPoint(u, a);
        lower.getPoint(u, b);
        point.copy(a).lerp(b, v);

        const neckFlatten = spec.id === "front" ? 1 - 0.85 * gaussian(u, 0.16, 0.05) : 1;
        const archBow = Math.sin(v * Math.PI) * Math.sin(u * Math.PI) * spec.bowAmplitude * neckFlatten;
        const creaseRelief =
          spec.id === "rear"
            ? gaussian(u, 0.65, 0.08) * Math.sin(v * Math.PI * 2) * 0.08
            : spec.id === "front"
              ? gaussian(u, 0.35, 0.15) * (1 - v) * 0.06 * neckFlatten
              : -gaussian(u, 0.72, 0.16) * Math.sin(v * Math.PI) * 0.08;
        point.z += archBow + creaseRelief;

        const vertexIndex = row * (COLUMNS + 1) + column;
        base.set(point.toArray(), vertexIndex * 3);

        const worldU = point.x / 18 + 0.5;
        const worldV = 0.5 - point.y / 6;
        computeVertexColor(spec.id, u, v, worldU, worldV, color);
        colors[vertexIndex * 3] = color.r;
        colors[vertexIndex * 3 + 1] = color.g;
        colors[vertexIndex * 3 + 2] = color.b;
      }
    }

    positions.array.set(base);
    positions.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    const material = new THREE.MeshPhysicalMaterial({
      color: spec.color,
      roughness: spec.roughness,
      roughnessMap,
      normalMap,
      normalScale: new THREE.Vector2(spec.normalStrength, spec.normalStrength),
      metalness: 0.0,
      clearcoat: spec.clearcoat,
      clearcoatRoughness: 0.42,
      specularIntensity: spec.specularIntensity,
      transparent: true,
      opacity: spec.opacity,
      depthWrite: spec.id !== "sail",
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = spec.id;
    mesh.renderOrder = spec.renderOrder;

    const pivot = new THREE.Group();
    pivot.name = `${spec.id}-pivot`;

    const { samples: rimSamples, colors: rimColors } = buildSheetEdgeSegments(spec, base);
    const rimPositions = new Float32Array(rimSamples.length * 3);
    const samplePt = new THREE.Vector3();
    for (let i = 0; i < rimSamples.length; i++) {
      const s = rimSamples[i];
      sampleGridPosition(base, s.colFloat, s.rowFloat, samplePt);
      rimPositions[i * 3] = samplePt.x;
      rimPositions[i * 3 + 1] = samplePt.y;
      rimPositions[i * 3 + 2] = samplePt.z + 0.015;
    }

    const rimGeometry = new THREE.BufferGeometry();
    rimGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(rimPositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    rimGeometry.setAttribute("color", new THREE.BufferAttribute(rimColors, 3));

    const rimMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
    });

    const rim = new THREE.LineSegments(rimGeometry, rimMaterial);
    rim.name = `${spec.id}-edge`;
    rim.renderOrder = spec.renderOrder + 3;
    rim.userData.explodeWithParent = true;

    pivot.add(mesh, rim);
    root.add(pivot);

    return {
      mesh,
      pivot,
      geometry,
      material,
      base,
      spec,
      index,
      rim,
      rimGeometry,
      rimMaterial,
      rimSamples,
    };
  });

  const modelCenter = new THREE.Vector3();
  for (const sheet of sheets) {
    modelCenter.add(sheet.geometry.boundingSphere!.center);
  }
  modelCenter.divideScalar(sheets.length);

  root.userData.sculptRuntime = {
    nodes: {
      ...Object.fromEntries(sheets.map((s) => [s.spec.id, s.pivot])),
      ...Object.fromEntries(sheets.map((s) => [`${s.spec.id}-edge`, s.rim])),
    },
    setExplode: (amount: number) => {
      const clamped = Math.max(0, Math.min(1, amount));
      for (const sheet of sheets) {
        const center = sheet.geometry.boundingSphere!.center;
        sheet.pivot.position.copy(center).sub(modelCenter).multiplyScalar(clamped * 0.65);
      }
    },
    pick: (raycaster: THREE.Raycaster) =>
      raycaster.intersectObjects(sheets.map((s) => s.mesh))[0]?.object.name ?? null,
  };

  const samplePt = new THREE.Vector3();
  let hadDeformation = false;

  return {
    root,
    stage,
    update: (time: number, pointer?: FooterSculpturePointer) => {
      const ramp = Math.min(1, Math.max(0, time * 0.6));
      const pointerStrength = Math.max(0, Math.min(1, pointer?.strength ?? 0));
      if (ramp === 0 && pointerStrength === 0 && !hadDeformation) return;
      hadDeformation = ramp > 0 || pointerStrength > 0;

      const px = pointer?.x ?? 0;
      const py = pointer?.y ?? 0;
      const vx = pointer?.vx ?? 0;
      const vy = pointer?.vy ?? 0;
      const pPhase = pointer?.phase ?? 0;
      const speedBoost = 1 + Math.min(1.5, Math.hypot(vx, vy) * 0.12) * 0.55;

      for (const sheet of sheets) {
        const posAttr = sheet.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const base = sheet.base;
        const phase = sheet.index * 1.35;
        const sheetGain =
          (sheet.spec.id === "sail" ? 1.15 : sheet.spec.id === "front" ? 1.0 : 0.85) * speedBoost;

        for (let row = 0; row <= ROWS; row++) {
          const v = row / ROWS;
          const vSin = Math.sin(v * Math.PI);
          const vEnvelope = 0.35 + 0.65 * vSin;
          const wakeLift = 0.88 + 0.12 * vSin;
          for (let col = 0; col <= COLUMNS; col++) {
            const u = col / COLUMNS;
            const uPin = Math.sin(u * Math.PI);
            const weight = ramp * uPin * vEnvelope;

            const wave1 = Math.sin(time * 0.52 + u * 4.2 + phase);
            const wave2 = Math.cos(time * 0.34 - u * 2.8 + v * 2.1 + phase * 0.7);
            let dx = 0;
            let dy = (wave1 * 0.055 + wave2 * 0.032) * weight;
            let dz = (wave1 * 0.095 - wave2 * 0.065) * weight;

            const idx = (row * (COLUMNS + 1) + col) * 3;
            const bx = base[idx];
            const by = base[idx + 1];
            const bz = base[idx + 2];

            if (pointerStrength > 0.0001) {
              const relX = bx - px;
              const relY = by - py;
              const dist = Math.hypot(relX * 0.55, relY);
              const localField = smoothstep(4.2, 0.0, dist) * pointerStrength;
              const ribbonField =
                smoothstep(8.5, 0.0, Math.abs(relX)) *
                smoothstep(4.8, 0.0, Math.abs(relY)) *
                pointerStrength;

              if (localField > 0 || ribbonField > 0) {
                const leftAnchor = smoothstep(-9.05, -7.8, bx);
                const rightAnchor = smoothstep(8.95, 7.6, bx);
                const seamAnchor =
                  sheet.spec.id === "sail" ? 0.35 + 0.65 * smoothstep(0.0, 0.22, u) : 1;
                const hoverPin = leftAnchor * rightAnchor * seamAnchor * sheetGain;

                const radialWave = Math.sin(dist * 1.85 - time * 3.2 - pPhase * 1.1 + phase);
                const contourWave = Math.sin(
                  relX * 0.72 + (v - 0.5) * 2.2 - time * 2.4 + pPhase * 0.85 + phase
                );
                const twistWave = Math.cos(
                  relX * 1.15 - relY * 1.35 + time * 1.9 - pPhase * 0.65 + phase * 1.3
                );
                const velocityPullY = Math.max(-0.35, Math.min(0.35, vy * 0.032)) * localField;
                const velocityPullX = Math.max(-0.25, Math.min(0.25, vx * 0.022)) * localField;

                dx += (twistWave * 0.09 * localField + velocityPullX) * hoverPin;
                dy +=
                  (radialWave * 0.32 * localField +
                    contourWave * 0.2 * ribbonField +
                    twistWave * 0.09 * localField * (v - 0.5) +
                    velocityPullY) *
                  hoverPin *
                  wakeLift;
                dz +=
                  (radialWave * 0.46 * localField -
                    contourWave * 0.26 * ribbonField +
                    twistWave * 0.14 * localField) *
                  hoverPin;
              }
            }

            posArray[idx] = bx + dx;
            posArray[idx + 1] = by + dy;
            posArray[idx + 2] = bz + dz;
          }
        }
        posAttr.needsUpdate = true;
        sheet.geometry.computeVertexNormals();

        const rimPosAttr = sheet.rimGeometry.attributes.position as THREE.BufferAttribute;
        const rimArray = rimPosAttr.array as Float32Array;
        const rimSamples = sheet.rimSamples;
        for (let i = 0; i < rimSamples.length; i++) {
          const s = rimSamples[i];
          sampleGridPosition(posArray, s.colFloat, s.rowFloat, samplePt);
          rimArray[i * 3] = samplePt.x;
          rimArray[i * 3 + 1] = samplePt.y;
          rimArray[i * 3 + 2] = samplePt.z + 0.015;
        }
        rimPosAttr.needsUpdate = true;
      }
    },
    dispose: () => {
      roughnessMap.dispose();
      normalMap.dispose();
      floorTexture.dispose();
      stageGeometry.dispose();
      stageMaterial.dispose();
      for (const sheet of sheets) {
        sheet.geometry.dispose();
        sheet.material.dispose();
        sheet.rimGeometry.dispose();
        sheet.rimMaterial.dispose();
      }
    },
  };
}
