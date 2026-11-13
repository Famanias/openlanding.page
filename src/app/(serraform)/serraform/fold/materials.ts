import * as THREE from 'three';
import { renderTextileToCanvas } from './artwork';
import { mixHex } from './color';
import { PALETTE } from './config';
import type { DesignState } from './state';

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/**
 * Generates a tileable grayscale wool-felt / washi bump map (linear data texture)
 * so tactile micro-relief catches raking studio light across every fold.
 */
export function createFeltBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  bCtx.fillStyle = 'rgb(128, 128, 128)';
  bCtx.fillRect(0, 0, size, size);

  const rand = seededRand(160288);
  for (let i = 0; i < 4800; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 1.4 + rand() * 3.8;
    const angle = rand() * Math.PI * 2;
    const delta = Math.round((rand() - 0.5) * 22);
    const bumpLum = 128 + delta * 2;

    bCtx.strokeStyle = `rgba(${bumpLum}, ${bumpLum}, ${bumpLum}, 0.58)`;
    bCtx.lineWidth = 0.85;
    bCtx.beginPath();
    bCtx.moveTo(x, y);
    bCtx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    bCtx.stroke();
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(16, 4);
  bumpMap.generateMipmaps = true;
  bumpMap.anisotropy = Math.min(8, maxAnisotropy);
  bumpMap.needsUpdate = true;
  return bumpMap;
}

export function createSoftShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.06,
    size * 0.5,
    size * 0.5,
    size * 0.49,
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.36)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.14)');
  grad.addColorStop(0.78, 'rgba(255, 255, 255, 0.04)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createStudioFloorGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.04,
    size * 0.5,
    size * 0.5,
    size * 0.48,
  );
  grad.addColorStop(0, 'rgba(255, 252, 248, 0.45)');
  grad.addColorStop(0.58, 'rgba(255, 252, 248, 0.16)');
  grad.addColorStop(1, 'rgba(243, 232, 228, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export interface SceneMaterials {
  feltFace: THREE.MeshPhysicalMaterial;
  feltEdge: THREE.MeshPhysicalMaterial;
  edgeCrease: THREE.LineBasicMaterial;
  hingeMetal: THREE.MeshStandardMaterial;
  foot: THREE.MeshStandardMaterial;
  glide: THREE.MeshStandardMaterial;
  floor: THREE.ShadowMaterial;
  floorGlow: THREE.MeshBasicMaterial;
  contactShadow: THREE.MeshBasicMaterial;
  updateDesign: (
    design: DesignState,
    uploadedBitmap: ImageBitmap | null,
    animate?: boolean,
  ) => void;
  stepTransition: (dt: number) => boolean;
  setHoverHighlight: (hovered: boolean, dt: number) => boolean;
  dispose: () => void;
}

export function createSceneMaterials(
  initialDesign: DesignState,
  initialUpload: ImageBitmap | null,
  maxAnisotropy: number,
  isCompactTexture: boolean,
): SceneMaterials {
  const bumpMap = createFeltBumpTexture(maxAnisotropy);
  const shadowTex = createSoftShadowTexture();
  const floorGlowTex = createStudioFloorGlowTexture();

  // Fixed aspect ratio ~ 2.88 : 1.60 (1536x853 desktop, 1024x569 mobile)
  const texW = isCompactTexture ? 1024 : 1536;
  const texH = isCompactTexture ? 569 : 853;

  const texCanvas = document.createElement('canvas');
  texCanvas.width = texW;
  texCanvas.height = texH;

  const prevCanvas = document.createElement('canvas');
  prevCanvas.width = texW;
  prevCanvas.height = texH;

  const nextCanvas = document.createElement('canvas');
  nextCanvas.width = texW;
  nextCanvas.height = texH;

  renderTextileToCanvas(texCanvas, initialDesign, initialUpload);

  const texCtx = texCanvas.getContext('2d');
  const prevCtx = prevCanvas.getContext('2d');

  const faceMap = new THREE.CanvasTexture(texCanvas);
  faceMap.colorSpace = THREE.SRGBColorSpace;
  faceMap.wrapS = THREE.ClampToEdgeWrapping;
  faceMap.wrapT = THREE.ClampToEdgeWrapping;
  faceMap.generateMipmaps = true;
  faceMap.anisotropy = Math.min(8, maxAnisotropy);
  faceMap.needsUpdate = true;

  // Tactile wool felt / washi material with restrained low sheen (never plastic/emissive)
  const feltFace = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    map: faceMap,
    bumpMap,
    bumpScale: 0.0028,
    roughness: 0.92,
    metalness: 0,
    sheen: 0.16,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#FFF8F3'),
    envMapIntensity: 0.14,
  });

  // Narrow top/bottom/end felt edges stay clean base felt color
  const feltEdge = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(initialDesign.baseHex),
    bumpMap,
    bumpScale: 0.0028,
    roughness: 0.92,
    metalness: 0,
    sheen: 0.14,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#FFF8F3'),
    envMapIntensity: 0.14,
  });

  const edgeCrease = new THREE.LineBasicMaterial({
    color: new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34)),
    transparent: true,
    opacity: 0.26,
  });

  // Brushed oxblood/burnished hardware knuckles along the 15 interior folds
  const hingeMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5A2732'),
    roughness: 0.34,
    metalness: 0.74,
    envMapIntensity: 1.0,
  });

  const foot = new THREE.MeshStandardMaterial({
    color: new THREE.Color(PALETTE.oxblood),
    roughness: 0.38,
    metalness: 0.68,
    envMapIntensity: 0.92,
  });

  const glide = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2E1218'),
    roughness: 0.85,
    metalness: 0.05,
  });

  const floor = new THREE.ShadowMaterial({
    color: new THREE.Color(PALETTE.oxblood),
    opacity: 0.12,
  });

  const floorGlow = new THREE.MeshBasicMaterial({
    map: floorGlowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });

  const contactShadow = new THREE.MeshBasicMaterial({
    map: shadowTex,
    color: new THREE.Color(PALETTE.oxblood),
    transparent: true,
    depthWrite: false,
    opacity: 0.88,
  });

  let transitionProgress = 1;
  const TRANSITION_DUR = 0.24;
  const targetEdgeColor = new THREE.Color(initialDesign.baseHex);
  const startEdgeColor = new THREE.Color(initialDesign.baseHex);
  const targetCreaseColor = new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34));
  const startCreaseColor = new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34));

  return {
    feltFace,
    feltEdge,
    edgeCrease,
    hingeMetal,
    foot,
    glide,
    floor,
    floorGlow,
    contactShadow,

    updateDesign(design: DesignState, uploadedBitmap: ImageBitmap | null, animate = false) {
      if (!animate || !texCtx || !prevCtx) {
        renderTextileToCanvas(texCanvas, design, uploadedBitmap);
        faceMap.needsUpdate = true;
        feltEdge.color.set(design.baseHex);
        edgeCrease.color.set(mixHex(design.baseHex, '#201014', 0.34));
        transitionProgress = 1;
        return;
      }

      // Snapshot current canvas and prepare smooth directional cross-wash
      prevCtx.clearRect(0, 0, texW, texH);
      prevCtx.drawImage(texCanvas, 0, 0);
      renderTextileToCanvas(nextCanvas, design, uploadedBitmap);

      startEdgeColor.copy(feltEdge.color);
      targetEdgeColor.set(design.baseHex);
      startCreaseColor.copy(edgeCrease.color);
      targetCreaseColor.set(mixHex(design.baseHex, '#201014', 0.34));
      transitionProgress = 0;
    },

    stepTransition(dt: number): boolean {
      if (transitionProgress >= 1 || !texCtx) return false;
      transitionProgress = Math.min(1, transitionProgress + dt / TRANSITION_DUR);

      texCtx.clearRect(0, 0, texW, texH);
      if (transitionProgress >= 1) {
        texCtx.drawImage(nextCanvas, 0, 0);
        feltEdge.color.copy(targetEdgeColor);
        edgeCrease.color.copy(targetCreaseColor);
      } else {
        const u = 1 - Math.pow(1 - transitionProgress, 3);
        texCtx.drawImage(prevCanvas, 0, 0);

        // Soft directional veil + crossfade across the 16-panel sheet
        texCtx.save();
        texCtx.globalAlpha = u;
        texCtx.drawImage(nextCanvas, 0, 0);
        texCtx.restore();

        feltEdge.color.copy(startEdgeColor).lerp(targetEdgeColor, u);
        edgeCrease.color.copy(startCreaseColor).lerp(targetCreaseColor, u);
      }

      faceMap.needsUpdate = true;

      return transitionProgress < 1;
    },

    setHoverHighlight(hovered: boolean, dt: number): boolean {
      const targetSheen = hovered ? 0.28 : 0.16;
      const diff = targetSheen - feltFace.sheen;
      if (Math.abs(diff) < 0.004) {
        feltFace.sheen = targetSheen;
        return false;
      }
      const k = 1 - Math.exp(-8 * dt);
      feltFace.sheen += diff * k;
      return true;
    },

    dispose: () => {
      faceMap.dispose();
      bumpMap.dispose();
      shadowTex.dispose();
      floorGlowTex.dispose();
      feltFace.dispose();
      feltEdge.dispose();
      edgeCrease.dispose();
      hingeMetal.dispose();
      foot.dispose();
      glide.dispose();
      floor.dispose();
      floorGlow.dispose();
      contactShadow.dispose();
    },
  };
}
