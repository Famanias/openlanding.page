'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { HeroCompositionId } from '../domain/tesseraSystem';
import {
  HeroMaterialModeId,
  RESONANCE_COLS,
  RESONANCE_ROWS,
  RESONANCE_TILE_SIZE,
  ResonanceTileSpec,
  TileQuarterTurns,
  buildResonanceWallCatalog,
  computeResonanceTileBaseTransform,
  rotateTileQuarterTurns,
  sampleGlobalSCurveRelief,
  snapClockwiseAngleToQuarterTurns,
} from '../domain/resonanceWall';
import { playTactileClick } from '../utils/acousticAudio';

interface HeroCanvas3DProps {
  composition: HeroCompositionId;
  materialMode: HeroMaterialModeId;
  exploded: boolean;
  reducedMotion: boolean;
  tileRotations: Record<string, TileQuarterTurns>;
  selectedTileId: string | null;
  scrollProgressRef: React.MutableRefObject<number>;
  onSelectTile: (tileId: string | null) => void;
  onCommitTileRotation: (tileId: string, nextTurns: TileQuarterTurns) => void;
  onWebGLUnavailable?: () => void;
}

function detectSoftwareWebGL(): { supported: boolean; isSoftwareGl: boolean } {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return { supported: false, isSoftwareGl: true };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { supported: true, isSoftwareGl };
  } catch {
    return { supported: false, isSoftwareGl: true };
  }
}

/**
 * Generates procedural tileable PBR albedo & bump textures for:
 * 1) Ivory Mineral Plaster, 2) Charcoal Acoustic Felt, 3) Pale Nordic Oak
 */
function createProceduralMaterialTextures(maxAnisotropy: number) {
  const createSeededRandom = (seedInit: number) => {
    let s = seedInit;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };

  // 1. Ivory Plaster Albedo & Fine Mineral Bump
  const plasterSize = 256;
  const plasterColorCanvas = document.createElement('canvas');
  plasterColorCanvas.width = plasterSize;
  plasterColorCanvas.height = plasterSize;
  const pCtx = plasterColorCanvas.getContext('2d')!;
  pCtx.fillStyle = '#E4DBCC';
  pCtx.fillRect(0, 0, plasterSize, plasterSize);

  const randP = createSeededRandom(1091);
  // Subtle warm mineral clouding
  for (let i = 0; i < 240; i++) {
    const x = randP() * plasterSize;
    const y = randP() * plasterSize;
    const r = 8 + randP() * 28;
    const tone = randP() > 0.5 ? 'rgba(200, 185, 165, 0.08)' : 'rgba(244, 238, 228, 0.08)';
    pCtx.fillStyle = tone;
    pCtx.beginPath();
    pCtx.arc(x, y, r, 0, Math.PI * 2);
    pCtx.fill();
  }
  // Fine sintered mineral pores
  for (let i = 0; i < 1800; i++) {
    const x = randP() * plasterSize;
    const y = randP() * plasterSize;
    const r = 0.5 + randP() * 1.3;
    pCtx.fillStyle = randP() > 0.45 ? 'rgba(178, 164, 145, 0.22)' : 'rgba(248, 243, 235, 0.2)';
    pCtx.fillRect(x, y, r, r);
  }

  const plasterColorTex = new THREE.CanvasTexture(plasterColorCanvas);
  plasterColorTex.colorSpace = THREE.SRGBColorSpace;
  plasterColorTex.wrapS = THREE.RepeatWrapping;
  plasterColorTex.wrapT = THREE.RepeatWrapping;
  plasterColorTex.repeat.set(1.5, 1.5);
  plasterColorTex.anisotropy = maxAnisotropy;

  const plasterBumpCanvas = document.createElement('canvas');
  plasterBumpCanvas.width = 128;
  plasterBumpCanvas.height = 128;
  const pbCtx = plasterBumpCanvas.getContext('2d')!;
  pbCtx.fillStyle = '#808080';
  pbCtx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 1400; i++) {
    const x = randP() * 128;
    const y = randP() * 128;
    const v = Math.floor(105 + randP() * 50);
    pbCtx.fillStyle = `rgb(${v},${v},${v})`;
    pbCtx.fillRect(x, y, 1.5, 1.5);
  }
  const plasterBumpTex = new THREE.CanvasTexture(plasterBumpCanvas);
  plasterBumpTex.wrapS = THREE.RepeatWrapping;
  plasterBumpTex.wrapT = THREE.RepeatWrapping;
  plasterBumpTex.repeat.set(2, 2);
  plasterBumpTex.anisotropy = maxAnisotropy;

  // 2. Charcoal Acoustic Felt Albedo & Fiber Bump
  const feltCanvas = document.createElement('canvas');
  feltCanvas.width = 256;
  feltCanvas.height = 256;
  const fCtx = feltCanvas.getContext('2d')!;
  fCtx.fillStyle = '#332F2C';
  fCtx.fillRect(0, 0, 256, 256);

  const randF = createSeededRandom(3371);
  for (let i = 0; i < 2600; i++) {
    const x = randF() * 256;
    const y = randF() * 256;
    const len = 3 + randF() * 7;
    const ang = randF() * Math.PI;
    fCtx.strokeStyle =
      randF() > 0.5 ? 'rgba(84, 78, 72, 0.34)' : 'rgba(28, 25, 22, 0.38)';
    fCtx.lineWidth = 0.9;
    fCtx.beginPath();
    fCtx.moveTo(x, y);
    fCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    fCtx.stroke();
  }
  const feltColorTex = new THREE.CanvasTexture(feltCanvas);
  feltColorTex.colorSpace = THREE.SRGBColorSpace;
  feltColorTex.wrapS = THREE.RepeatWrapping;
  feltColorTex.wrapT = THREE.RepeatWrapping;
  feltColorTex.repeat.set(2, 2);
  feltColorTex.anisotropy = maxAnisotropy;

  const feltBumpCanvas = document.createElement('canvas');
  feltBumpCanvas.width = 128;
  feltBumpCanvas.height = 128;
  const fbCtx = feltBumpCanvas.getContext('2d')!;
  fbCtx.fillStyle = '#787878';
  fbCtx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 1800; i++) {
    const x = randF() * 128;
    const y = randF() * 128;
    const v = Math.floor(80 + randF() * 90);
    fbCtx.fillStyle = `rgb(${v},${v},${v})`;
    fbCtx.fillRect(x, y, 1.5, 1.5);
  }
  const feltBumpTex = new THREE.CanvasTexture(feltBumpCanvas);
  feltBumpTex.wrapS = THREE.RepeatWrapping;
  feltBumpTex.wrapT = THREE.RepeatWrapping;
  feltBumpTex.repeat.set(3, 3);
  feltBumpTex.anisotropy = maxAnisotropy;

  // 3. Pale Nordic Oak Albedo & Longitudinal Grain Bump
  const oakCanvas = document.createElement('canvas');
  oakCanvas.width = 256;
  oakCanvas.height = 256;
  const oCtx = oakCanvas.getContext('2d')!;
  oCtx.fillStyle = '#B89E80';
  oCtx.fillRect(0, 0, 256, 256);

  const randO = createSeededRandom(7723);
  for (let x = 0; x < 256; x += 2) {
    const wave = Math.sin(x * 0.08) * 6;
    const shade = randO() > 0.45 ? 'rgba(154, 126, 95, 0.26)' : 'rgba(208, 185, 156, 0.22)';
    oCtx.strokeStyle = shade;
    oCtx.lineWidth = 1 + randO() * 1.4;
    oCtx.beginPath();
    oCtx.moveTo(x, 0);
    oCtx.bezierCurveTo(x + wave, 85, x - wave, 170, x, 256);
    oCtx.stroke();
  }
  const oakColorTex = new THREE.CanvasTexture(oakCanvas);
  oakColorTex.colorSpace = THREE.SRGBColorSpace;
  oakColorTex.wrapS = THREE.RepeatWrapping;
  oakColorTex.wrapT = THREE.RepeatWrapping;
  oakColorTex.repeat.set(1, 1);
  oakColorTex.anisotropy = maxAnisotropy;

  const oakBumpCanvas = document.createElement('canvas');
  oakBumpCanvas.width = 128;
  oakBumpCanvas.height = 128;
  const obCtx = oakBumpCanvas.getContext('2d')!;
  obCtx.fillStyle = '#808080';
  obCtx.fillRect(0, 0, 128, 128);
  for (let x = 0; x < 128; x += 2) {
    const v = Math.floor(110 + randO() * 40);
    obCtx.strokeStyle = `rgb(${v},${v},${v})`;
    obCtx.beginPath();
    obCtx.moveTo(x, 0);
    obCtx.lineTo(x, 128);
    obCtx.stroke();
  }
  const oakBumpTex = new THREE.CanvasTexture(oakBumpCanvas);
  oakBumpTex.wrapS = THREE.RepeatWrapping;
  oakBumpTex.wrapT = THREE.RepeatWrapping;
  oakBumpTex.anisotropy = maxAnisotropy;

  // 4. Soft Radial Contact Shadow Texture (Deep shadow pooling under the installation plinth)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(128, 64, 8, 128, 64, 120);
  grad.addColorStop(0, 'rgba(4, 4, 3, 0.92)');
  grad.addColorStop(0.45, 'rgba(8, 8, 6, 0.64)');
  grad.addColorStop(0.78, 'rgba(12, 12, 10, 0.24)');
  grad.addColorStop(1, 'rgba(12, 12, 10, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 128);
  const contactShadowTex = new THREE.CanvasTexture(shadowCanvas);
  contactShadowTex.colorSpace = THREE.SRGBColorSpace;
  contactShadowTex.anisotropy = maxAnisotropy;

  // 5. Dark Architectural Micro-Concrete / Venetian Plaster Texture (256x256 for fast init)
  const gwCanvas = document.createElement('canvas');
  gwCanvas.width = 256;
  gwCanvas.height = 256;
  const gwCtx = gwCanvas.getContext('2d')!;
  gwCtx.fillStyle = '#1E1D1A';
  gwCtx.fillRect(0, 0, 256, 256);

  const randGW = createSeededRandom(5501);
  for (let i = 0; i < 160; i++) {
    const x = randGW() * 256;
    const y = randGW() * 256;
    const r = 10 + randGW() * 32;
    gwCtx.fillStyle =
      randGW() > 0.46 ? 'rgba(54, 50, 44, 0.14)' : 'rgba(12, 12, 10, 0.16)';
    gwCtx.beginPath();
    gwCtx.arc(x, y, r, 0, Math.PI * 2);
    gwCtx.fill();
  }
  for (let i = 0; i < 900; i++) {
    const x = randGW() * 256;
    const y = randGW() * 256;
    gwCtx.fillStyle =
      randGW() > 0.5 ? 'rgba(68, 63, 56, 0.18)' : 'rgba(10, 10, 9, 0.22)';
    gwCtx.fillRect(x, y, 1.2, 1.2);
  }

  const galleryWallColorTex = new THREE.CanvasTexture(gwCanvas);
  galleryWallColorTex.colorSpace = THREE.SRGBColorSpace;
  galleryWallColorTex.wrapS = THREE.RepeatWrapping;
  galleryWallColorTex.wrapT = THREE.RepeatWrapping;
  galleryWallColorTex.repeat.set(3, 1.5);
  galleryWallColorTex.anisotropy = maxAnisotropy;

  // 6. Dark Polished Concrete / Honed Basalt Floor Texture & Roughness Map
  const flCanvas = document.createElement('canvas');
  flCanvas.width = 256;
  flCanvas.height = 256;
  const flCtx = flCanvas.getContext('2d')!;
  flCtx.fillStyle = '#1B1A18';
  flCtx.fillRect(0, 0, 256, 256);

  const flRoughCanvas = document.createElement('canvas');
  flRoughCanvas.width = 128;
  flRoughCanvas.height = 128;
  const flRCtx = flRoughCanvas.getContext('2d')!;
  flRCtx.fillStyle = '#525252';
  flRCtx.fillRect(0, 0, 128, 128);

  const randFL = createSeededRandom(8843);
  for (let i = 0; i < 180; i++) {
    const x = randFL() * 256;
    const y = randFL() * 256;
    const rx = 14 + randFL() * 38;
    const ry = 6 + randFL() * 16;
    flCtx.fillStyle =
      randFL() > 0.46 ? 'rgba(54, 50, 44, 0.15)' : 'rgba(10, 10, 9, 0.18)';
    flCtx.beginPath();
    flCtx.ellipse(x, y, rx, ry, randFL() * 0.4, 0, Math.PI * 2);
    flCtx.fill();

    const rVal = Math.floor(55 + randFL() * 70);
    flRCtx.fillStyle = `rgba(${rVal},${rVal},${rVal},0.3)`;
    flRCtx.beginPath();
    flRCtx.ellipse(x * 0.5, y * 0.5, rx * 0.5, ry * 0.5, 0, 0, Math.PI * 2);
    flRCtx.fill();
  }
  // Honed stone slab expansion joints
  flCtx.strokeStyle = 'rgba(8, 8, 7, 0.52)';
  flCtx.lineWidth = 1.1;
  for (const p of [85, 170]) {
    flCtx.beginPath();
    flCtx.moveTo(p, 0);
    flCtx.lineTo(p, 256);
    flCtx.stroke();
    flCtx.beginPath();
    flCtx.moveTo(0, p);
    flCtx.lineTo(256, p);
    flCtx.stroke();
  }

  const stoneFloorColorTex = new THREE.CanvasTexture(flCanvas);
  stoneFloorColorTex.colorSpace = THREE.SRGBColorSpace;
  stoneFloorColorTex.wrapS = THREE.RepeatWrapping;
  stoneFloorColorTex.wrapT = THREE.RepeatWrapping;
  stoneFloorColorTex.repeat.set(4, 3);
  stoneFloorColorTex.anisotropy = maxAnisotropy;

  const stoneFloorRoughnessTex = new THREE.CanvasTexture(flRoughCanvas);
  stoneFloorRoughnessTex.wrapS = THREE.RepeatWrapping;
  stoneFloorRoughnessTex.wrapT = THREE.RepeatWrapping;
  stoneFloorRoughnessTex.repeat.set(4, 3);
  stoneFloorRoughnessTex.anisotropy = maxAnisotropy;

  // 7. Gentle Blurred Floor Reflection Texture (Seamless elliptical falloff with zero hard border)
  const reflCanvas = document.createElement('canvas');
  reflCanvas.width = 256;
  reflCanvas.height = 256;
  const rCtx = reflCanvas.getContext('2d')!;
  rCtx.clearRect(0, 0, 256, 256);

  // Soft blurred column reflections of the illuminated ivory & pale oak bays
  for (let col = 0; col < 11; col++) {
    const cx = 24 + col * 19;
    const isDarkFeltBay = col === 2 || col === 6 || col === 9;
    const colGrad = rCtx.createLinearGradient(cx, 16, cx, 220);
    if (isDarkFeltBay) {
      colGrad.addColorStop(0, 'rgba(16, 15, 13, 0.25)');
      colGrad.addColorStop(1, 'rgba(16, 15, 13, 0)');
    } else {
      colGrad.addColorStop(0, 'rgba(242, 226, 200, 0.34)');
      colGrad.addColorStop(0.45, 'rgba(204, 180, 146, 0.14)');
      colGrad.addColorStop(1, 'rgba(204, 180, 146, 0)');
    }
    rCtx.fillStyle = colGrad;
    rCtx.fillRect(cx, 16, 16, 204);
  }

  // Smooth elliptical radial mask that reaches 0 well inside all 4 canvas edges
  rCtx.globalCompositeOperation = 'destination-in';
  rCtx.save();
  rCtx.translate(128, 72);
  rCtx.scale(1.0, 0.72);
  const maskGrad = rCtx.createRadialGradient(0, 0, 10, 0, 0, 108);
  maskGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  maskGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.55)');
  maskGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.12)');
  maskGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  rCtx.fillStyle = maskGrad;
  rCtx.beginPath();
  rCtx.arc(0, 0, 112, 0, Math.PI * 2);
  rCtx.fill();
  rCtx.restore();
  rCtx.globalCompositeOperation = 'source-over';

  const floorReflectionTex = new THREE.CanvasTexture(reflCanvas);
  floorReflectionTex.colorSpace = THREE.SRGBColorSpace;
  floorReflectionTex.anisotropy = maxAnisotropy;

  // 8. Restrained Warm Spotlight Bloom Texture behind the Acoustic Wall
  const bloomCanvas = document.createElement('canvas');
  bloomCanvas.width = 256;
  bloomCanvas.height = 256;
  const bCtx = bloomCanvas.getContext('2d')!;
  const bloomGrad = bCtx.createRadialGradient(128, 128, 12, 128, 128, 122);
  bloomGrad.addColorStop(0.0, 'rgba(246, 216, 172, 0.42)');
  bloomGrad.addColorStop(0.42, 'rgba(204, 168, 120, 0.18)');
  bloomGrad.addColorStop(0.76, 'rgba(132, 106, 76, 0.05)');
  bloomGrad.addColorStop(1.0, 'rgba(20, 19, 17, 0)');
  bCtx.fillStyle = bloomGrad;
  bCtx.fillRect(0, 0, 256, 256);

  const spotlightBloomTex = new THREE.CanvasTexture(bloomCanvas);
  spotlightBloomTex.colorSpace = THREE.SRGBColorSpace;
  spotlightBloomTex.anisotropy = maxAnisotropy;

  return {
    plasterColorTex,
    plasterBumpTex,
    feltColorTex,
    feltBumpTex,
    oakColorTex,
    oakBumpTex,
    contactShadowTex,
    galleryWallColorTex,
    stoneFloorColorTex,
    stoneFloorRoughnessTex,
    floorReflectionTex,
    spotlightBloomTex,
    disposeAll: () => {
      plasterColorTex.dispose();
      plasterBumpTex.dispose();
      feltColorTex.dispose();
      feltBumpTex.dispose();
      oakColorTex.dispose();
      oakBumpTex.dispose();
      contactShadowTex.dispose();
      galleryWallColorTex.dispose();
      stoneFloorColorTex.dispose();
      stoneFloorRoughnessTex.dispose();
      floorReflectionTex.dispose();
      spotlightBloomTex.dispose();
    },
  };
}

/**
 * Builds an individual tile's custom 3D sculpted relief geometry.
 * Samples the global S-curve in shared wall coordinates (u, v) so adjacent tiles at 0°
 * form a continuous flowing S-shaped architectural ribbon across module seams,
 * combined with 8+ differentiated module family profiles.
 */
function buildTileReliefGeometry(
  spec: ResonanceTileSpec,
  cols: number,
  rows: number,
  isSoftwareGl: boolean,
): THREE.BufferGeometry {
  const segs = isSoftwareGl ? 20 : 26;
  const size = RESONANCE_TILE_SIZE;
  const depth = 0.24;
  // Subdivided BoxGeometry so front face, beveled edges, sides, and back are watertight
  const geo = new THREE.BoxGeometry(size, size, depth, segs, segs, 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);

  const halfSize = size * 0.5;
  const halfDepth = depth * 0.5;

  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const halfWallSpanX = (centerX + 0.5) * 0.92;
  const halfWallSpanY = (centerY + 0.5) * 0.92;
  const tileCenterX = (spec.col - centerX) * 0.92;
  const tileCenterY = (spec.row - centerY) * 0.92;

  for (let i = 0; i < pos.count; i++) {
    const lx = pos.getX(i); // -halfSize .. +halfSize
    const ly = pos.getY(i); // -halfSize .. +halfSize
    const lz = pos.getZ(i); // -halfDepth .. +halfDepth

    const nx = lx / halfSize;
    const ny = ly / halfSize;

    // Smooth perimeter bevel factor so panel seams catch grazing light cleanly
    const edgeDistX = Math.max(0, 1 - Math.abs(nx));
    const edgeDistY = Math.max(0, 1 - Math.abs(ny));
    const edgeBevel = Math.min(1, Math.min(edgeDistX, edgeDistY) / 0.065);
    const interiorMask = Math.min(1, Math.min(edgeDistX, edgeDistY) / 0.13);

    if (lz > 0) {
      const worldX = tileCenterX + lx;
      const worldY = tileCenterY + ly;
      const u = worldX / halfWallSpanX;
      const v = worldY / halfWallSpanY;

      const sCurve = sampleGlobalSCurveRelief(u, v);

      let familyRelief = 0;
      let cavityShade = 0.94;

      switch (spec.family) {
        case 's-ribbon': {
          const secondaryFlutes =
            (1 - sCurve.proximity) * (Math.cos(ny * Math.PI * 7) * 0.028) * interiorMask;
          familyRelief = sCurve.displacement * (0.45 + 0.55 * edgeBevel) + secondaryFlutes;
          // Crisp architectural rib & channel shading along the continuous S-curve
          const ribContrast = 0.36 + 0.72 * Math.pow(sCurve.grooves, 0.85);
          const bgFluteContrast = 0.86 + 0.14 * Math.cos(ny * Math.PI * 7);
          cavityShade =
            sCurve.proximity * ribContrast + (1 - sCurve.proximity) * bgFluteContrast;
          break;
        }
        case 'convex': {
          // Pillowed cylindrical outward swell
          const swell =
            Math.cos(nx * Math.PI * 0.5) * (0.78 + 0.22 * Math.cos(ny * Math.PI * 0.5));
          familyRelief = swell * 0.14 * edgeBevel + sCurve.displacement * 0.65;
          cavityShade = 0.76 + 0.28 * swell - lx * 0.08 + ly * 0.08;
          break;
        }
        case 'concave': {
          // Half-pipe concave architectural scoop
          const scoop = Math.cos(nx * Math.PI * 0.5);
          familyRelief = (0.095 - scoop * 0.115) * interiorMask + sCurve.displacement * 0.5;
          cavityShade = 0.98 - scoop * 0.42 + lx * 0.12;
          break;
        }
        case 'fluted-v': {
          // 7 bold vertical architectural flutes
          const groove = Math.cos(nx * Math.PI * 7);
          familyRelief = (0.055 + groove * 0.052) * interiorMask + sCurve.displacement * 0.7;
          cavityShade = 0.68 + 0.36 * (groove * 0.5 + 0.5);
          break;
        }
        case 'fluted-h': {
          // 7 bold horizontal architectural flutes
          const groove = Math.cos(ny * Math.PI * 7);
          familyRelief = (0.055 + groove * 0.052) * interiorMask + sCurve.displacement * 0.7;
          cavityShade = 0.68 + 0.36 * (groove * 0.5 + 0.5);
          break;
        }
        case 'folded': {
          // Diagonal architectural crease
          const crease = 1 - Math.abs(nx * 0.7 + ny * 0.3);
          familyRelief = (crease * 0.13 - 0.01) * interiorMask + sCurve.displacement * 0.6;
          cavityShade = 0.72 + 0.32 * crease + (nx - ny) * 0.08;
          break;
        }
        case 'crescent': {
          // Sweeping arched crescent ridge
          const arcDist = Math.hypot(nx - 0.45, ny + 0.35);
          const ridge = Math.exp(-Math.pow((arcDist - 0.85) / 0.28, 2));
          familyRelief = (ridge * 0.14 - 0.01) * interiorMask + sCurve.displacement * 0.65;
          cavityShade = 0.7 + 0.35 * ridge;
          break;
        }
        case 'recess': {
          // Stepped architectural recess
          const inCavity = Math.abs(nx) < 0.66 && Math.abs(ny) < 0.66;
          familyRelief = inCavity ? -0.028 : 0.065 * edgeBevel;
          familyRelief += sCurve.displacement * 0.4;
          cavityShade = inCavity ? 0.56 : 0.96;
          break;
        }
        case 'slit': {
          // Twin beveled slabs flanking a recessed vertical acoustic reveal
          const inSlit = Math.abs(nx - 0.06) < 0.22 && Math.abs(ny) < 0.76;
          const slabSlope = (0.55 - nx * 0.28) * 0.085;
          familyRelief = inSlit ? -0.025 : slabSlope * interiorMask;
          familyRelief += sCurve.displacement * 0.5;
          cavityShade = inSlit ? 0.46 : 0.88 + slabSlope * 1.2;
          break;
        }
      }

      // Blend global S-curve rib contrast on non-ribbon tiles that border the S-curve
      if (spec.family !== 's-ribbon' && sCurve.proximity > 0.04) {
        const ribContrast = 0.38 + 0.68 * Math.pow(sCurve.grooves, 0.85);
        cavityShade =
          cavityShade * (1 - sCurve.proximity * 0.75) + ribContrast * (sCurve.proximity * 0.75);
      }

      const bevelDrop = (1 - edgeBevel) * -0.024;
      const totalDelta = Math.max(-0.045, familyRelief + bevelDrop);
      const zScale = lz / halfDepth;
      pos.setZ(i, lz + totalDelta * zScale);

      const finalShade = Math.max(
        0.28,
        Math.min(1.06, cavityShade * (0.58 + 0.42 * edgeBevel)),
      );
      colors[i * 3] = finalShade;
      colors[i * 3 + 1] = finalShade * 0.99;
      colors[i * 3 + 2] = finalShade * 0.96;
    } else {
      // Deep architectural shadow joint on tile side walls & rear
      colors[i * 3] = 0.34;
      colors[i * 3 + 1] = 0.32;
      colors[i * 3 + 2] = 0.29;
    }
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function createTurnedBrassPinGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.026, 0.0),
    new THREE.Vector2(0.026, 0.045),
    new THREE.Vector2(0.018, 0.055),
    new THREE.Vector2(0.032, 0.075),
    new THREE.Vector2(0.028, 0.095),
    new THREE.Vector2(0.0, 0.095),
  ];
  const lathe = new THREE.LatheGeometry(points, 12);
  lathe.rotateX(Math.PI / 2);
  lathe.computeVertexNormals();
  return lathe;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({
  composition,
  materialMode,
  exploded,
  reducedMotion,
  tileRotations,
  selectedTileId,
  scrollProgressRef,
  onSelectTile,
  onCommitTileRotation,
  onWebGLUnavailable,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Store latest props/callbacks in refs so React UI updates never rebuild the WebGLRenderer
  const compositionRef = useRef<HeroCompositionId>(composition);
  const materialModeRef = useRef<HeroMaterialModeId>(materialMode);
  const explodedRef = useRef<boolean>(exploded);
  const reducedMotionRef = useRef<boolean>(reducedMotion);
  const tileRotationsRef = useRef<Record<string, TileQuarterTurns>>(tileRotations);
  const selectedTileIdRef = useRef<string | null>(selectedTileId);
  const onSelectTileRef = useRef(onSelectTile);
  const onCommitTileRotationRef = useRef(onCommitTileRotation);
  const onWebGLUnavailableRef = useRef(onWebGLUnavailable);

  compositionRef.current = composition;
  materialModeRef.current = materialMode;
  explodedRef.current = exploded;
  reducedMotionRef.current = reducedMotion;
  tileRotationsRef.current = tileRotations;
  selectedTileIdRef.current = selectedTileId;
  onSelectTileRef.current = onSelectTile;
  onCommitTileRotationRef.current = onCommitTileRotation;
  onWebGLUnavailableRef.current = onWebGLUnavailable;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { supported, isSoftwareGl } = detectSoftwareWebGL();
    if (!supported) {
      onWebGLUnavailableRef.current?.();
      return;
    }

    const initW = Math.max(320, container.clientWidth || window.innerWidth);
    const initH = Math.max(320, container.clientHeight || window.innerHeight);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: isSoftwareGl,
        alpha: true,
      });
    } catch {
      onWebGLUnavailableRef.current?.();
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initW, initH);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'pan-y';

    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      onWebGLUnavailableRef.current?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();
    scene.background = null;
    // Subtle atmospheric gallery haze for depth perception across the chamber
    scene.fog = new THREE.FogExp2(0x141311, 0.018);

    // Studio PBR environment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.42;
    pmremGenerator.dispose();

    // Long-focal-length architectural gallery camera (30 deg FOV)
    const camera = new THREE.PerspectiveCamera(30, initW / initH, 0.1, 70);

    // Gallery Lighting Rig: Dramatic grazing warm key light from upper-left/top to sculpt deep shadows
    const hemiLight = new THREE.HemisphereLight(0xdccfbe, 0x161513, 0.52);
    hemiLight.position.set(0, 12, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe6c2, 3.85);
    keyLight.position.set(-5.8, 7.6, 4.2);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.set(1024, 1024);
      const d = 7.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Secondary warm upper-right gallery spot to kiss the upper S-curve crest
    const crestSpot = new THREE.DirectionalLight(0xffdfb3, 1.3);
    crestSpot.position.set(6.5, 5.5, 3.5);
    scene.add(crestSpot);

    // Subtle counter fill from lower left so dark felt cavities and micro-concrete planes retain tactile grain
    const fillLight = new THREE.DirectionalLight(0x9aa8ba, 0.45);
    fillLight.position.set(-7.0, -2.5, 5.5);
    scene.add(fillLight);

    let softboxLight: THREE.RectAreaLight | null = null;
    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      softboxLight = new THREE.RectAreaLight(0xfff0d6, 2.4, 9, 4);
      softboxLight.position.set(1.2, 6.2, 5.0);
      softboxLight.lookAt(2.5, 0.2, 0);
      scene.add(softboxLight);
    }

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const textures = createProceduralMaterialTextures(maxAniso);

    // Reusable PBR Materials with vertexColors enabled for crisp architectural cavity shading
    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.plasterColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.015,
      roughnessMap: textures.plasterBumpTex,
      roughness: 0.88,
      metalness: 0.02,
    });

    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0xe2d0b9,
      vertexColors: true,
      map: textures.plasterColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.016,
      roughness: 0.84,
      metalness: 0.03,
    });

    const feltMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.feltColorTex,
      bumpMap: textures.feltBumpTex,
      bumpScale: 0.02,
      roughness: 0.96,
      metalness: 0.0,
    });

    const oakMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      map: textures.oakColorTex,
      bumpMap: textures.oakBumpTex,
      bumpScale: 0.016,
      roughness: 0.64,
      metalness: 0.02,
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x181715,
      roughness: 0.62,
      metalness: 0.36,
    });

    const brassPinMat = new THREE.MeshPhysicalMaterial({
      color: 0xc49f6c,
      roughness: 0.24,
      metalness: 0.88,
      anisotropy: 0.6,
    });

    const hoverRimMat = new THREE.LineBasicMaterial({
      color: 0xd5b07c,
      transparent: true,
      opacity: 0.55,
    });

    const selectedRimMat = new THREE.LineBasicMaterial({
      color: 0xf3d29e,
      transparent: true,
      opacity: 0.95,
    });

    // Transparent (opacity: 0) rather than visible: false so THREE.Raycaster intersects it reliably
    const pickInvisibleMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const disposables: { dispose: () => void }[] = [
      envTarget,
      plasterMat,
      warmStoneMat,
      feltMat,
      oakMat,
      frameMat,
      brassPinMat,
      hoverRimMat,
      selectedRimMat,
      pickInvisibleMat,
    ];

    // Root Architectural Installation Group (positioned on the right in 3/4 perspective)
    const installationGroup = new THREE.Group();
    scene.add(installationGroup);

    const wallSpanW = RESONANCE_COLS * 0.92;
    const wallSpanH = RESONANCE_ROWS * 0.92;
    const floorY = -wallSpanH * 0.5 - 0.14;

    // 1. Stepped Architectural Gallery Alcove Surround & Plinth Pedestal
    const galleryWallMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc2,
      map: textures.galleryWallColorTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.012,
      roughness: 0.84,
      metalness: 0.08,
    });
    const galleryRecessMat = new THREE.MeshStandardMaterial({
      color: 0x141311,
      roughness: 0.88,
      metalness: 0.1,
    });
    disposables.push(galleryWallMat, galleryRecessMat);

    // Outer Architectural Micro-Concrete Alcove Casing framing the Acoustic Wall
    const alcoveSurroundGeo = new THREE.BoxGeometry(wallSpanW + 0.52, wallSpanH + 0.42, 0.26);
    const alcoveSurroundMesh = new THREE.Mesh(alcoveSurroundGeo, galleryWallMat);
    alcoveSurroundMesh.position.set(0, 0.04, -0.5);
    alcoveSurroundMesh.receiveShadow = !isSoftwareGl;
    installationGroup.add(alcoveSurroundMesh);
    disposables.push(alcoveSurroundGeo);

    // 2. Restrained Warm Spotlight Bloom Behind the Acoustic Wall
    const bloomMat = new THREE.MeshBasicMaterial({
      map: textures.spotlightBloomTex,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const primaryBloomGeo = new THREE.PlaneGeometry(wallSpanW + 5.2, wallSpanH + 3.8);
    const primaryBloomMesh = new THREE.Mesh(primaryBloomGeo, bloomMat);
    primaryBloomMesh.position.set(-0.4, 0.45, -0.7);
    installationGroup.add(primaryBloomMesh);
    disposables.push(bloomMat, primaryBloomGeo);

    // 3. Dark Polished Concrete / Honed Stone Gallery Floor Plane (Level World-Space Horizon)
    const floorGeo = new THREE.PlaneGeometry(36, 18);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xc2b8aa,
      map: textures.stoneFloorColorTex,
      roughnessMap: textures.stoneFloorRoughnessTex,
      bumpMap: textures.plasterBumpTex,
      bumpScale: 0.006,
      roughness: 0.3,
      metalness: 0.2,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0.5, floorY - 0.08, 2.6);
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // 4. Gentle Blurred Floor Reflection Plane directly in front of the Acoustic Wall (+0.008 Y offset)
    const floorReflGeo = new THREE.PlaneGeometry(wallSpanW + 3.6, 5.8);
    floorReflGeo.rotateX(-Math.PI / 2);
    const floorReflMat = new THREE.MeshBasicMaterial({
      map: textures.floorReflectionTex,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const floorReflMesh = new THREE.Mesh(floorReflGeo, floorReflMat);
    floorReflMesh.position.set(0.0, floorY + 0.01, 1.95);
    installationGroup.add(floorReflMesh);
    disposables.push(floorReflGeo, floorReflMat);

    // 5. Realistic Multi-Stage Shadow Pooling under the Monumental Wall & Alcove Corner (+0.018 Y offset)
    const contactShadowGeo = new THREE.PlaneGeometry(wallSpanW + 3.4, 3.6);
    contactShadowGeo.rotateX(-Math.PI / 2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: textures.contactShadowTex,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    });
    const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadowMesh.position.set(-0.2, floorY + 0.02, 0.18);
    installationGroup.add(contactShadowMesh);
    disposables.push(contactShadowGeo, contactShadowMat);

    // 6. Solid Architectural Shadow Frame & Backing behind the tiles (-0.36) so seams read as deep shadow joints
    const backingGeo = new THREE.BoxGeometry(wallSpanW + 0.16, wallSpanH + 0.16, 0.24);
    const backingMesh = new THREE.Mesh(backingGeo, frameMat);
    backingMesh.position.set(0, 0, -0.36);
    backingMesh.receiveShadow = !isSoftwareGl;
    installationGroup.add(backingMesh);
    disposables.push(backingGeo);

    // Architectural Recessed Plinth Pedestal under the Wall Frame
    const wallPedestalGeo = new THREE.BoxGeometry(wallSpanW + 0.24, 0.16, 0.36);
    const wallPedestalMesh = new THREE.Mesh(wallPedestalGeo, galleryRecessMat);
    wallPedestalMesh.position.set(0, floorY + 0.07, -0.2);
    installationGroup.add(wallPedestalMesh);
    disposables.push(wallPedestalGeo);

    // Horizontal Calibration Rails (revealed when Explode Assembly is active)
    const railGeo = new THREE.CylinderGeometry(0.015, 0.015, wallSpanW - 0.1, 10);
    railGeo.rotateZ(Math.PI / 2);
    const railMeshes: THREE.Mesh[] = [];
    for (let r = 0; r < RESONANCE_ROWS; r++) {
      const ry = (r - (RESONANCE_ROWS - 1) / 2) * 0.92;
      const rail = new THREE.Mesh(railGeo, brassPinMat);
      rail.position.set(0, ry, -0.18);
      rail.visible = false;
      installationGroup.add(rail);
      railMeshes.push(rail);
    }
    disposables.push(railGeo);

    // Build all 66 Individually Addressable Tile Entities
    const catalog = buildResonanceWallCatalog(RESONANCE_COLS, RESONANCE_ROWS);
    const pinGeo = createTurnedBrassPinGeometry();
    const subLiningGeo = new THREE.BoxGeometry(
      RESONANCE_TILE_SIZE * 0.88,
      RESONANCE_TILE_SIZE * 0.88,
      0.06,
    );
    const pickBoxGeo = new THREE.BoxGeometry(
      RESONANCE_TILE_SIZE * 0.99,
      RESONANCE_TILE_SIZE * 0.99,
      0.38,
    );
    const rimEdgesGeo = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(RESONANCE_TILE_SIZE * 1.006, RESONANCE_TILE_SIZE * 1.006, 0.28),
    );
    disposables.push(pinGeo, subLiningGeo, pickBoxGeo, rimEdgesGeo);

    interface TileEntityRuntime {
      spec: ResonanceTileSpec;
      anchorGroup: THREE.Group;
      userPivotGroup: THREE.Group;
      reliefMesh: THREE.Mesh;
      subLiningMesh: THREE.Mesh;
      pinMesh: THREE.Mesh | null;
      rimLines: THREE.LineSegments;
      pickMesh: THREE.Mesh;
      currX: number;
      currY: number;
      currZ: number;
      currRotX: number;
      currRotY: number;
      currPresetRotZ: number;
      currScaleZ: number;
      currUserRotZ: number;
      currLiftZ: number;
      clickPulseZ: number;
      initialized: boolean;
    }

    const tileEntities: TileEntityRuntime[] = [];
    const tileMap = new Map<string, TileEntityRuntime>();
    const pickTargets: THREE.Object3D[] = [];

    const resolveTileMaterials = (
      spec: ResonanceTileSpec,
      mode: HeroMaterialModeId,
    ): { main: THREE.Material; lining: THREE.Material } => {
      if (mode === 'ivory-plaster') {
        if (spec.surfaceRole === 'felt-accent') {
          return { main: feltMat, lining: oakMat };
        }
        if (spec.surfaceRole === 'oak-accent') {
          return { main: oakMat, lining: feltMat };
        }
        if (spec.surfaceRole === 'warm-stone') {
          return { main: warmStoneMat, lining: feltMat };
        }
        return { main: plasterMat, lining: spec.sCurveProximity > 0.25 ? oakMat : feltMat };
      }

      if (mode === 'charcoal-felt') {
        if (spec.surfaceRole === 'felt-accent') {
          return { main: plasterMat, lining: feltMat };
        }
        if (spec.surfaceRole === 'oak-accent') {
          return { main: oakMat, lining: feltMat };
        }
        return { main: feltMat, lining: oakMat };
      }

      // 'pale-oak'
      if (spec.surfaceRole === 'felt-accent') {
        return { main: feltMat, lining: oakMat };
      }
      if (spec.surfaceRole === 'warm-stone') {
        return { main: plasterMat, lining: feltMat };
      }
      return { main: oakMat, lining: feltMat };
    };

    for (const spec of catalog) {
      const anchorGroup = new THREE.Group();
      const userPivotGroup = new THREE.Group();
      anchorGroup.add(userPivotGroup);

      const reliefGeo = buildTileReliefGeometry(
        spec,
        RESONANCE_COLS,
        RESONANCE_ROWS,
        isSoftwareGl,
      );
      disposables.push(reliefGeo);

      const mats = resolveTileMaterials(spec, materialModeRef.current);

      const reliefMesh = new THREE.Mesh(reliefGeo, mats.main);
      reliefMesh.castShadow = !isSoftwareGl;
      reliefMesh.receiveShadow = !isSoftwareGl;
      reliefMesh.userData.tileId = spec.id;
      userPivotGroup.add(reliefMesh);
      pickTargets.push(reliefMesh);

      const subLiningMesh = new THREE.Mesh(subLiningGeo, mats.lining);
      subLiningMesh.position.z = -0.09;
      userPivotGroup.add(subLiningMesh);

      let pinMesh: THREE.Mesh | null = null;
      if (spec.hasBrassPin) {
        pinMesh = new THREE.Mesh(pinGeo, brassPinMat);
        const pinOffsetX = spec.family === 's-ribbon' ? 0.0 : -0.24;
        const pinOffsetY = spec.family === 's-ribbon' ? 0.0 : 0.22;
        pinMesh.position.set(pinOffsetX, pinOffsetY, 0.125);
        userPivotGroup.add(pinMesh);
      }

      const rimLines = new THREE.LineSegments(rimEdgesGeo, hoverRimMat);
      rimLines.visible = false;
      rimLines.position.z = 0.04;
      userPivotGroup.add(rimLines);

      const pickMesh = new THREE.Mesh(pickBoxGeo, pickInvisibleMat);
      pickMesh.position.z = 0.06;
      pickMesh.userData.tileId = spec.id;
      userPivotGroup.add(pickMesh);
      pickTargets.push(pickMesh);

      installationGroup.add(anchorGroup);

      const initialTurns = tileRotationsRef.current[spec.id] ?? 0;
      const entity: TileEntityRuntime = {
        spec,
        anchorGroup,
        userPivotGroup,
        reliefMesh,
        subLiningMesh,
        pinMesh,
        rimLines,
        pickMesh,
        currX: 0,
        currY: 0,
        currZ: 0,
        currRotX: 0,
        currRotY: 0,
        currPresetRotZ: 0,
        currScaleZ: 1,
        currUserRotZ: -initialTurns * (Math.PI * 0.5),
        currLiftZ: 0,
        clickPulseZ: 0,
        initialized: false,
      };
      tileEntities.push(entity);
      tileMap.set(spec.id, entity);
    }

    let appliedMaterialMode: HeroMaterialModeId = materialModeRef.current;

    // Responsive Framing: Monumental 3/4 view on right at desktop so left copy is 100% clear of 3D geometry
    const updateCameraAndWallFraming = () => {
      const w = Math.max(1, container.clientWidth || window.innerWidth);
      const h = Math.max(1, container.clientHeight || window.innerHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w >= 1200) {
        installationGroup.position.set(3.25, -0.04, -0.35);
        installationGroup.rotation.set(0.015, -0.47, 0);
        camera.position.set(-0.35, -0.18, 12.6);
      } else if (w >= 960) {
        installationGroup.position.set(2.85, -0.04, -0.5);
        installationGroup.rotation.set(0.02, -0.42, 0);
        camera.position.set(-0.25, -0.18, 12.8);
      } else if (w >= 768) {
        installationGroup.position.set(2.15, -0.08, -0.9);
        installationGroup.rotation.set(0.02, -0.36, 0);
        camera.position.set(0, -0.12, 13.0);
      } else {
        installationGroup.position.set(0.65, -0.65, -0.8);
        installationGroup.rotation.set(0.03, -0.28, 0);
        camera.position.set(0, -0.2, 12.2);
      }
    };
    updateCameraAndWallFraming();

    // Raycasting & Direct Tile Manipulation Controller (Click +90° CW & Drag-to-Twist with Snap)
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();

    let hoveredTileId: string | null = null;
    let pointerWallX = 0;
    let pointerWallY = 0;
    let pointerActive = false;

    let activeGesture: {
      tileId: string;
      pointerId: number;
      startX: number;
      startY: number;
      baseClockwiseRad: number;
      liveClockwiseRad: number;
      isDragging: boolean;
    } | null = null;

    let lastHoverRaycastMs = 0;

    const getCanvasNdc = (clientX: number, clientY: number): boolean => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      return true;
    };

    const pickTileAtClientPoint = (clientX: number, clientY: number): string | null => {
      if (!getCanvasNdc(clientX, clientY)) return null;
      camera.updateMatrixWorld();
      installationGroup.updateMatrixWorld(true);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(pickTargets, false);
      for (let i = 0; i < hits.length; i++) {
        const hitId = hits[i].object?.userData?.tileId;
        if (typeof hitId === 'string') return hitId;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const hitTileId = pickTileAtClientPoint(e.clientX, e.clientY);
      if (!hitTileId) {
        // Clicked gallery background -> clear selection without resetting any tile rotations
        if (selectedTileIdRef.current !== null) {
          onSelectTileRef.current(null);
        }
        return;
      }

      const currentTurns = tileRotationsRef.current[hitTileId] ?? 0;
      const baseClockwiseRad = currentTurns * (Math.PI * 0.5);
      activeGesture = {
        tileId: hitTileId,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        baseClockwiseRad,
        liveClockwiseRad: baseClockwiseRad,
        isDragging: false,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerWallX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerWallY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        pointerActive = true;
      }

      if (activeGesture && e.pointerId === activeGesture.pointerId) {
        const dx = e.clientX - activeGesture.startX;
        const dy = e.clientY - activeGesture.startY;
        const dist = Math.hypot(dx, dy);

        // Only enter drag-twist mode on mouse/pen or intentional horizontal gesture >= 8px
        if (!activeGesture.isDragging && dist >= 8) {
          if (e.pointerType !== 'touch' || Math.abs(dx) > Math.abs(dy) * 1.25) {
            activeGesture.isDragging = true;
            try {
              renderer.domElement.setPointerCapture(e.pointerId);
            } catch {
              // ignore synthetic pointer events without capture
            }
          }
        }

        if (activeGesture.isDragging) {
          // Convert horizontal/arc drag into clockwise rotation radians
          const deltaRad = dx * 0.022 - dy * 0.008;
          activeGesture.liveClockwiseRad = activeGesture.baseClockwiseRad + deltaRad;
          renderer.domElement.style.cursor = 'grabbing';
          return;
        }
      }

      // Throttled hover raycast (<= 25Hz)
      const now = performance.now();
      if (now - lastHoverRaycastMs < 40) return;
      lastHoverRaycastMs = now;

      const hitId = pickTileAtClientPoint(e.clientX, e.clientY);
      hoveredTileId = hitId;
      renderer.domElement.style.cursor = hitId ? 'pointer' : 'default';
    };

    const finishGesture = (e: PointerEvent, cancelled: boolean) => {
      if (!activeGesture || e.pointerId !== activeGesture.pointerId) return;
      const gesture = activeGesture;
      activeGesture = null;

      try {
        if (renderer.domElement.hasPointerCapture(e.pointerId)) {
          renderer.domElement.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      if (cancelled) return;

      const entity = tileMap.get(gesture.tileId);
      if (gesture.isDragging) {
        // Drag release: snap smoothly to nearest 90° quarter-turn without firing a second click rotation
        const snappedTurns = snapClockwiseAngleToQuarterTurns(gesture.liveClockwiseRad);
        playTactileClick(280);
        if (entity) entity.clickPulseZ = 0.032;
        onCommitTileRotationRef.current(gesture.tileId, snappedTurns);
        onSelectTileRef.current(gesture.tileId);
      } else {
        // Single click/tap: rotate THAT tile +90° clockwise around outward normal
        const currentTurns = tileRotationsRef.current[gesture.tileId] ?? 0;
        const nextTurns = rotateTileQuarterTurns(currentTurns, 1);
        playTactileClick(320);
        if (entity) entity.clickPulseZ = 0.055;
        onCommitTileRotationRef.current(gesture.tileId, nextTurns);
        onSelectTileRef.current(gesture.tileId);
      }

      renderer.domElement.style.cursor = hoveredTileId ? 'pointer' : 'default';
    };

    const onPointerUp = (e: PointerEvent) => finishGesture(e, false);
    const onPointerCancel = (e: PointerEvent) => finishGesture(e, true);
    const onPointerLeave = () => {
      pointerActive = false;
      hoveredTileId = null;
      if (!activeGesture) {
        renderer.domElement.style.cursor = 'default';
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    domEl.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', updateCameraAndWallFraming);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const startTimeMs = performance.now();
    let prevTimeMs = startTimeMs;
    let frameId = 0;
    let disposed = false;
    let explodedBlend = explodedRef.current ? 1 : 0;
    let camParallaxX = 0;
    let camParallaxY = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (disposed) return;

      const nowMs = performance.now();
      const dt = Math.min(isSoftwareGl ? 0.25 : 0.05, Math.max(0.016, (nowMs - prevTimeMs) / 1000));
      prevTimeMs = nowMs;
      const elapsedSec = (nowMs - startTimeMs) / 1000;

      // Update PBR materials immediately if global materialMode changed
      if (appliedMaterialMode !== materialModeRef.current) {
        appliedMaterialMode = materialModeRef.current;
        for (const entity of tileEntities) {
          const mats = resolveTileMaterials(entity.spec, appliedMaterialMode);
          entity.reliefMesh.material = mats.main;
          entity.subLiningMesh.material = mats.lining;
        }
      }

      // Entrance wave progress (0 -> 1 over ~2.1s on hardware GPU; immediate in reducedMotion or softwareGl)
      const entranceDuration = 2.1;
      const entranceProgress =
        reducedMotionRef.current || isSoftwareGl
          ? 1
          : Math.min(1, elapsedSec / entranceDuration);

      const dampFast = 1 - Math.exp(-10.0 * dt);
      const dampTile = 1 - Math.exp(-9.0 * dt);
      const dampUserRot = 1 - Math.exp(-12.0 * dt);

      const targetExplode = explodedRef.current ? 1 : 0;
      explodedBlend += (targetExplode - explodedBlend) * dampFast;
      for (const rail of railMeshes) {
        rail.visible = explodedBlend > 0.04;
      }

      // Suspend camera pointer parallax while user is actively dragging a tile
      const targetParallaxX = activeGesture?.isDragging
        ? camParallaxX
        : (pointerActive ? pointerWallX : 0) * 0.16;
      const targetParallaxY = activeGesture?.isDragging
        ? camParallaxY
        : (pointerActive ? pointerWallY : 0) * 0.1;
      camParallaxX += (targetParallaxX - camParallaxX) * dampFast;
      camParallaxY += (targetParallaxY - camParallaxY) * dampFast;

      // Scroll-driven camera & light angle shift
      const scrollProg = reducedMotionRef.current ? 0 : scrollProgressRef.current;
      const activeScroll = Math.max(0, Math.min(1, (scrollProg - 0.15) / 0.75));

      const w = container?.clientWidth || window.innerWidth;
      const baseCamX = w >= 1200 ? -0.35 : w >= 960 ? -0.25 : 0;
      const baseCamY = w >= 1200 ? -0.18 : w >= 768 ? -0.18 : -0.2;
      const baseCamZ = w >= 1200 ? 12.6 : w >= 960 ? 12.8 : 13.0;

      camera.position.x = baseCamX + camParallaxX - activeScroll * 0.55;
      camera.position.y = baseCamY + camParallaxY + activeScroll * 0.28;
      camera.position.z = baseCamZ - activeScroll * 0.45 + explodedBlend * 0.65;

      const lookX = w >= 1200 ? 0.25 : w >= 960 ? 0.25 : 0.15;
      camera.lookAt(lookX, 0.04 + activeScroll * 0.08, 0);

      // Shift grazing key light subtly on scroll to reveal material grain
      keyLight.position.x = -4.2 + activeScroll * 2.8;
      keyLight.position.y = 6.8 - activeScroll * 1.1;

      const currentRotMap = tileRotationsRef.current;
      const currentSelectedId = selectedTileIdRef.current;

      for (let i = 0; i < tileEntities.length; i++) {
        const entity = tileEntities[i];
        const { spec } = entity;

        const base = computeResonanceTileBaseTransform(
          spec,
          RESONANCE_COLS,
          RESONANCE_ROWS,
          compositionRef.current,
          pointerWallX,
          pointerWallY,
          pointerActive && !activeGesture?.isDragging && !reducedMotionRef.current,
          scrollProg,
          entranceProgress,
          reducedMotionRef.current ? 0 : elapsedSec,
        );

        if (!entity.initialized) {
          entity.currX = base.x;
          entity.currY = base.y;
          entity.currZ = base.z;
          entity.currRotX = base.rotX;
          entity.currRotY = base.rotY;
          entity.currPresetRotZ = base.presetRotZ;
          entity.currScaleZ = base.scaleZ;
          entity.initialized = true;
        } else {
          entity.currX += (base.x - entity.currX) * dampTile;
          entity.currY += (base.y - entity.currY) * dampTile;
          entity.currZ += (base.z - entity.currZ) * dampTile;
          entity.currRotX += (base.rotX - entity.currRotX) * dampTile;
          entity.currRotY += (base.rotY - entity.currRotY) * dampTile;
          entity.currPresetRotZ += (base.presetRotZ - entity.currPresetRotZ) * dampTile;
          entity.currScaleZ += (base.scaleZ - entity.currScaleZ) * dampTile;
        }

        // Layer 1: Anchor Group (Grid + Preset + Scroll + Entrance)
        const explodeOffsetZ =
          explodedBlend * (0.28 + ((spec.row + spec.col) % 3) * 0.16);
        entity.anchorGroup.position.set(
          entity.currX,
          entity.currY,
          entity.currZ + explodeOffsetZ,
        );
        entity.anchorGroup.rotation.set(
          entity.currRotX,
          entity.currRotY,
          entity.currPresetRotZ,
        );

        // Layer 2: User Rotation Pivot (Strictly isolated user rotation around outward normal Z)
        const isBeingDragged =
          activeGesture?.isDragging && activeGesture.tileId === spec.id;
        const committedTurns = currentRotMap[spec.id] ?? 0;
        const targetClockwiseRad = isBeingDragged
          ? activeGesture!.liveClockwiseRad
          : committedTurns * (Math.PI * 0.5);
        // Clockwise when viewed from front (+Z) is negative Z rotation in Three.js
        const targetUserRotZ = -targetClockwiseRad;

        // Shortest-angle wrap so cycling 270° -> 0° rotates +90° clockwise smoothly
        let angleDiff =
          ((targetUserRotZ - entity.currUserRotZ + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        // Prefer clockwise direction when angleDiff is near -PI/2
        if (reducedMotionRef.current) {
          entity.currUserRotZ = targetUserRotZ;
        } else {
          entity.currUserRotZ += angleDiff * dampUserRot;
        }

        // Hover & Click/Drag normal lift
        const isHovered = hoveredTileId === spec.id;
        const isSelected = currentSelectedId === spec.id;
        entity.clickPulseZ *= Math.exp(-9.0 * dt);
        const targetLift =
          (isBeingDragged ? 0.055 : isHovered ? 0.022 : isSelected ? 0.015 : 0) +
          entity.clickPulseZ;
        entity.currLiftZ += (targetLift - entity.currLiftZ) * dampFast;

        entity.userPivotGroup.position.set(0, 0, entity.currLiftZ);
        entity.userPivotGroup.rotation.set(0, 0, entity.currUserRotZ);
        entity.reliefMesh.scale.set(1, 1, entity.currScaleZ);

        // Separate sub-lining and pin during Explode Assembly
        entity.subLiningMesh.position.z = -0.09 - explodedBlend * 0.22;
        if (entity.pinMesh) {
          entity.pinMesh.position.z =
            0.125 * entity.currScaleZ + explodedBlend * 0.34;
        }

        // Rim outline feedback for hovered or selected module
        if (isSelected || isHovered || isBeingDragged) {
          entity.rimLines.visible = true;
          entity.rimLines.material = isSelected || isBeingDragged ? selectedRimMat : hoverRimMat;
        } else {
          entity.rimLines.visible = false;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      domEl.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', updateCameraAndWallFraming);
      domEl.removeEventListener('webglcontextlost', onContextLost);
      if (softboxLight) scene.remove(softboxLight);
      textures.disposeAll();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={mountRef}
      data-testid="hero-webgl-canvas"
      className="absolute inset-0 w-full h-full overflow-hidden"
    />
  );
};
