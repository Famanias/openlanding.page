import * as THREE from 'three';
import { createSeededRandom } from '../logic/networkGenerator';

export interface ProceduralTextureSet {
  stemColor: THREE.CanvasTexture;
  stemBump: THREE.CanvasTexture;
  capColor: THREE.CanvasTexture;
  capBump: THREE.CanvasTexture;
  bulbColor: THREE.CanvasTexture;
  bulbBump: THREE.CanvasTexture;
  traySkinColor: THREE.CanvasTexture;
  traySkinBump: THREE.CanvasTexture;
  trayCoreColor: THREE.CanvasTexture;
  trayCoreBump: THREE.CanvasTexture;
  clumpFuzzColor: THREE.CanvasTexture;
  clumpFuzzBump: THREE.CanvasTexture;
  barkColor: THREE.CanvasTexture;
  soilColor: THREE.CanvasTexture;
  soilBump: THREE.CanvasTexture;
  leafColor: THREE.CanvasTexture;
  sporeSprite: THREE.CanvasTexture;
}

function configureTexture(
  tex: THREE.CanvasTexture,
  isColor: boolean,
  maxAnisotropy: number,
  repeatX = 1,
  repeatY = 1,
): THREE.CanvasTexture {
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates high-detail procedural CanvasTextures calibrated for low-key natural specimen lighting,
 * and projects `mushroom-from-above_90ef6842.png` onto the cap top albedo when loaded.
 */
export function createProceduralTextures(renderer: THREE.WebGLRenderer): ProceduralTextureSet {
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1);
  const rand = createSeededRandom(7319);

  // 1. Stem snakeskin banding texture (Macrolepiota procera characteristic broken horizontal chevron bands on warm cream)
  const stemColorCanvas = document.createElement('canvas');
  stemColorCanvas.width = 512;
  stemColorCanvas.height = 1024;
  const sCtx = stemColorCanvas.getContext('2d')!;

  const stemBumpCanvas = document.createElement('canvas');
  stemBumpCanvas.width = 512;
  stemBumpCanvas.height = 1024;
  const sbCtx = stemBumpCanvas.getContext('2d')!;

  sCtx.fillStyle = '#cfc2ad';
  sCtx.fillRect(0, 0, 512, 1024);
  sbCtx.fillStyle = '#505050';
  sbCtx.fillRect(0, 0, 512, 1024);

  // Fine vertical silky stem fibrils
  for (let i = 0; i < 800; i++) {
    const x = rand() * 512;
    sCtx.fillStyle = rand() > 0.5 ? 'rgba(182, 166, 145, 0.35)' : 'rgba(222, 211, 194, 0.35)';
    sCtx.fillRect(x, 0, 1.2, 1024);
  }

  // Horizontal broken snakeskin bands (continuous wrapping zig-zag rings cracked apart as the stem elongates)
  const bandRows = 58;
  for (let row = 0; row < bandRows; row++) {
    const normY = row / bandRows;
    const baseY = normY * 1024;
    const bandHeight = 7 + (1 - normY * 0.45) * 9 + rand() * 4;
    const cracks = 11 + Math.floor(rand() * 6);

    for (let seg = 0; seg < cracks; seg++) {
      const startX = (seg / cracks) * 512 + (rand() - 0.5) * 6;
      const segW = (512 / cracks) * (0.68 + rand() * 0.22);
      const chevronOffset = Math.sin((seg / cracks) * Math.PI * 6 + row * 0.7) * 5;
      const y0 = baseY + chevronOffset;

      const r = 88 + Math.floor(rand() * 28);
      const g = 62 + Math.floor(rand() * 22);
      const b = 40 + Math.floor(rand() * 16);
      sCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      sbCtx.fillStyle = '#d4d4d4';

      sCtx.beginPath();
      sbCtx.beginPath();
      const steps = 6;
      for (let p = 0; p <= steps; p++) {
        const px = startX + (p / steps) * segW;
        const py = y0 + Math.sin(p * 1.3) * 2.5;
        if (p === 0) {
          sCtx.moveTo(px, py);
          sbCtx.moveTo(px, py);
        } else {
          sCtx.lineTo(px, py);
          sbCtx.lineTo(px, py);
        }
      }
      for (let p = steps; p >= 0; p--) {
        const px = startX + (p / steps) * segW;
        const py = y0 + bandHeight + Math.cos(p * 1.3) * 2.5;
        sCtx.lineTo(px, py);
        sbCtx.lineTo(px, py);
      }
      sCtx.closePath();
      sbCtx.closePath();
      sCtx.fill();
      sbCtx.fill();
    }
  }

  // 2. Cap radial fibrous cream surface + dark umbo center (matches mushroom-from-above_90ef6842.png)
  const capColorCanvas = document.createElement('canvas');
  capColorCanvas.width = 512;
  capColorCanvas.height = 512;
  const cCtx = capColorCanvas.getContext('2d')!;

  const capBumpCanvas = document.createElement('canvas');
  capBumpCanvas.width = 512;
  capBumpCanvas.height = 512;
  const cbCtx = capBumpCanvas.getContext('2d')!;

  const capGrad = cCtx.createRadialGradient(256, 256, 6, 256, 256, 256);
  capGrad.addColorStop(0.0, '#382416');
  capGrad.addColorStop(0.14, '#4a311f');
  capGrad.addColorStop(0.22, '#6e4e35');
  capGrad.addColorStop(0.30, '#c2b29b');
  capGrad.addColorStop(0.78, '#cbbca6');
  capGrad.addColorStop(1.0, '#b8a68e');
  cCtx.fillStyle = capGrad;
  cCtx.fillRect(0, 0, 512, 512);

  cbCtx.fillStyle = '#585858';
  cbCtx.fillRect(0, 0, 512, 512);

  // Radial silk fibrils across the cap
  for (let i = 0; i < 1200; i++) {
    const angle = (i / 1200) * Math.PI * 2 + (rand() - 0.5) * 0.015;
    const r0 = 32 + rand() * 25;
    const r1 = 190 + rand() * 64;
    cCtx.strokeStyle = rand() > 0.45 ? 'rgba(218, 205, 186, 0.4)' : 'rgba(105, 76, 52, 0.32)';
    cCtx.lineWidth = 0.8 + rand() * 1.4;
    cCtx.beginPath();
    cCtx.moveTo(256 + Math.cos(angle) * r0, 256 + Math.sin(angle) * r0);
    cCtx.lineTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
    cCtx.stroke();

    cbCtx.strokeStyle = 'rgba(185, 185, 185, 0.4)';
    cbCtx.lineWidth = 1.1;
    cbCtx.beginPath();
    cbCtx.moveTo(256 + Math.cos(angle) * r0, 256 + Math.sin(angle) * r0);
    cbCtx.lineTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
    cbCtx.stroke();
  }

  // Concentric scale base markings on the cap canvas
  const capRingRadii = [52, 72, 94, 118, 144, 172, 200, 226];
  for (let rIdx = 0; rIdx < capRingRadii.length; rIdx++) {
    const rad = capRingRadii[rIdx];
    const patches = 18 + rIdx * 3;
    for (let k = 0; k < patches; k++) {
      const ang = (k / patches) * Math.PI * 2 + (rIdx % 2) * (Math.PI / patches) + (rand() - 0.5) * 0.05;
      const px = 256 + Math.cos(ang) * rad;
      const py = 256 + Math.sin(ang) * rad;
      cCtx.save();
      cCtx.translate(px, py);
      cCtx.rotate(ang);
      cCtx.fillStyle = rIdx < 3 ? 'rgba(72, 48, 30, 0.75)' : 'rgba(96, 68, 45, 0.65)';
      cCtx.beginPath();
      cCtx.ellipse(0, 0, 5 + rand() * 4, 7 + rand() * 5, 0, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.restore();
    }
  }

  const capColorTex = configureTexture(new THREE.CanvasTexture(capColorCanvas), true, maxAniso);
  capColorTex.wrapS = THREE.ClampToEdgeWrapping;
  capColorTex.wrapT = THREE.ClampToEdgeWrapping;

  // Project `/templates/loam/references/mushroom-from-above.webp` onto the cap top albedo when available
  if (typeof Image !== 'undefined') {
    const capImg = new Image();
    capImg.crossOrigin = 'anonymous';
    capImg.onload = () => {
      cCtx.save();
      cCtx.beginPath();
      cCtx.arc(256, 256, 246, 0, Math.PI * 2);
      cCtx.clip();
      cCtx.drawImage(capImg, 0, 0, 512, 512);
      // Apply a subtle darkening multiply pass so the photo albedo matches our low-key specimen exposure
      cCtx.fillStyle = 'rgba(28, 22, 16, 0.16)';
      cCtx.fillRect(0, 0, 512, 512);
      cCtx.restore();
      capColorTex.needsUpdate = true;
    };
    capImg.src = '/templates/loam/references/mushroom-from-above.webp';
  }

  // 3. Bulbous base texture (smooth transition from cream stem base into dark clotted soil & moss)
  const bulbColorCanvas = document.createElement('canvas');
  bulbColorCanvas.width = 512;
  bulbColorCanvas.height = 512;
  const bCtx = bulbColorCanvas.getContext('2d')!;

  const bulbBumpCanvas = document.createElement('canvas');
  bulbBumpCanvas.width = 512;
  bulbBumpCanvas.height = 512;
  const bbCtx = bulbBumpCanvas.getContext('2d')!;

  const bulbGrad = bCtx.createLinearGradient(0, 0, 0, 512);
  bulbGrad.addColorStop(0.0, '#cfc2ad');
  bulbGrad.addColorStop(0.28, '#bfb09a');
  bulbGrad.addColorStop(0.65, '#3b2b1e');
  bulbGrad.addColorStop(1.0, '#16100b');
  bCtx.fillStyle = bulbGrad;
  bCtx.fillRect(0, 0, 512, 512);

  bbCtx.fillStyle = '#505050';
  bbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 650; i++) {
    const x = rand() * 512;
    const y = 90 + Math.pow(rand(), 0.75) * 422;
    const r = 4 + rand() * 20;
    const isMoss = rand() > 0.72 && y > 130 && y < 370;
    if (isMoss) {
      bCtx.fillStyle = `rgba(${46 + Math.floor(rand() * 22)}, ${68 + Math.floor(rand() * 28)}, ${26 + Math.floor(rand() * 14)}, 0.85)`;
    } else {
      const d = 18 + Math.floor(rand() * 22);
      bCtx.fillStyle = `rgba(${d + 8}, ${d + 2}, ${d - 3}, 0.92)`;
    }
    bCtx.beginPath();
    bCtx.arc(x, y, r, 0, Math.PI * 2);
    bCtx.fill();

    bbCtx.fillStyle = isMoss ? '#b8b8b8' : '#e0e0e0';
    bbCtx.beginPath();
    bbCtx.arc(x, y, r * 0.85, 0, Math.PI * 2);
    bbCtx.fill();
  }

  // 4. Molded packaging tray outer mycelium skin (matte off-white to warm cream #f2eadb with scattered small brown hemp fibre speckles)
  const traySkinCanvas = document.createElement('canvas');
  traySkinCanvas.width = 512;
  traySkinCanvas.height = 512;
  const tsCtx = traySkinCanvas.getContext('2d')!;

  const traySkinBumpCanvas = document.createElement('canvas');
  traySkinBumpCanvas.width = 512;
  traySkinBumpCanvas.height = 512;
  const tsbCtx = traySkinBumpCanvas.getContext('2d')!;

  tsCtx.fillStyle = '#f2eadb';
  tsCtx.fillRect(0, 0, 512, 512);
  tsbCtx.fillStyle = '#808080';
  tsbCtx.fillRect(0, 0, 512, 512);

  // Soft cloudy velvety off-white/cream mycelium patches
  for (let i = 0; i < 340; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const rad = 14 + rand() * 46;
    const g = tsCtx.createRadialGradient(x, y, 2, x, y, rad);
    const tint =
      rand() > 0.36
        ? 'rgba(251, 247, 239, 0.56)'
        : 'rgba(232, 222, 204, 0.42)';
    g.addColorStop(0, tint);
    g.addColorStop(1, 'rgba(242, 234, 219, 0)');
    tsCtx.fillStyle = g;
    tsCtx.beginPath();
    tsCtx.arc(x, y, rad, 0, Math.PI * 2);
    tsCtx.fill();

    // Fine velvety micro-fuzz relief on bump map
    tsbCtx.fillStyle = rand() > 0.5 ? 'rgba(162, 162, 162, 0.22)' : 'rgba(96, 96, 96, 0.22)';
    tsbCtx.beginPath();
    tsbCtx.arc(x, y, rad * 0.42, 0, Math.PI * 2);
    tsbCtx.fill();
  }

  // Scattered small golden-brown & warm umber hemp hurd fibre speckles matching material-top_9cdf4064.png
  for (let i = 0; i < 640; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const isSliver = rand() > 0.30;
    const len = isSliver ? 2.4 + rand() * 8.2 : 0.9 + rand() * 1.8;
    const ang = rand() * Math.PI * 2;
    const w = isSliver ? 0.9 + rand() * 1.65 : 1.1 + rand() * 1.5;
    const r = 98 + Math.floor(rand() * 52);
    const gr = 68 + Math.floor(rand() * 38);
    const b = 38 + Math.floor(rand() * 26);
    tsCtx.strokeStyle = `rgba(${r}, ${gr}, ${b}, ${0.56 + rand() * 0.38})`;
    tsCtx.lineWidth = w;
    tsCtx.lineCap = 'round';
    tsCtx.beginPath();
    tsCtx.moveTo(x, y);
    tsCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tsCtx.stroke();

    tsbCtx.strokeStyle = 'rgba(38, 38, 38, 0.65)';
    tsbCtx.lineWidth = w;
    tsbCtx.beginPath();
    tsbCtx.moveTo(x, y);
    tsbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tsbCtx.stroke();
  }

  // 5. Exposed fibrous core texture for the tray's broken corner (matches material-underside-and-cut-edge_69208517.png)
  const trayCoreCanvas = document.createElement('canvas');
  trayCoreCanvas.width = 512;
  trayCoreCanvas.height = 512;
  const tcCtx = trayCoreCanvas.getContext('2d')!;

  const trayCoreBumpCanvas = document.createElement('canvas');
  trayCoreBumpCanvas.width = 512;
  trayCoreBumpCanvas.height = 512;
  const tcbCtx = trayCoreBumpCanvas.getContext('2d')!;

  tcCtx.fillStyle = '#c4ae8e';
  tcCtx.fillRect(0, 0, 512, 512);
  tcbCtx.fillStyle = '#303030';
  tcbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 2400; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const len = 6 + rand() * 20;
    const ang = rand() * Math.PI * 2;
    const isMyceliumStrand = rand() > 0.46;
    tcCtx.strokeStyle = isMyceliumStrand
      ? `rgba(245, 239, 226, ${0.76 + rand() * 0.22})`
      : `rgb(${152 + Math.floor(rand() * 44)}, ${122 + Math.floor(rand() * 36)}, ${86 + Math.floor(rand() * 28)})`;
    tcCtx.lineWidth = isMyceliumStrand ? 1.2 + rand() * 1.6 : 2.0 + rand() * 3.4;
    tcCtx.beginPath();
    tcCtx.moveTo(x, y);
    tcCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tcCtx.stroke();

    tcbCtx.strokeStyle = isMyceliumStrand ? '#f2f2f2' : '#b0b0b0';
    tcbCtx.lineWidth = 2.4;
    tcbCtx.beginPath();
    tcbCtx.moveTo(x, y);
    tcbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tcbCtx.stroke();
  }

  // 6. Clump cottony hyphae texture & bark texture
  const clumpCanvas = document.createElement('canvas');
  clumpCanvas.width = 512;
  clumpCanvas.height = 512;
  const clCtx = clumpCanvas.getContext('2d')!;

  const clumpBumpCanvas = document.createElement('canvas');
  clumpBumpCanvas.width = 512;
  clumpBumpCanvas.height = 512;
  const clbCtx = clumpBumpCanvas.getContext('2d')!;

  clCtx.fillStyle = '#ebe3d5';
  clCtx.fillRect(0, 0, 512, 512);
  clbCtx.fillStyle = '#555555';
  clbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 1800; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const len = 10 + rand() * 28;
    const ang = rand() * Math.PI * 2;
    clCtx.strokeStyle = rand() > 0.14 ? 'rgba(248, 243, 234, 0.72)' : 'rgba(42, 30, 20, 0.65)';
    clCtx.lineWidth = 0.9 + rand() * 2.0;
    clCtx.beginPath();
    clCtx.moveTo(x, y);
    clCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    clCtx.stroke();

    clbCtx.strokeStyle = '#d0d0d0';
    clbCtx.lineWidth = 1.8;
    clbCtx.beginPath();
    clbCtx.moveTo(x, y);
    clbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    clbCtx.stroke();
  }

  const barkCanvas = document.createElement('canvas');
  barkCanvas.width = 256;
  barkCanvas.height = 256;
  const bkCtx = barkCanvas.getContext('2d')!;
  bkCtx.fillStyle = '#4a331f';
  bkCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 360; i++) {
    bkCtx.fillStyle = rand() > 0.5 ? '#2e1e10' : '#66492e';
    bkCtx.fillRect(rand() * 256, 0, 1.5 + rand() * 3.5, 256);
  }

  // 7. Damp dark forest soil normal/bump & albedo texture
  const soilColorCanvas = document.createElement('canvas');
  soilColorCanvas.width = 512;
  soilColorCanvas.height = 512;
  const scCtx = soilColorCanvas.getContext('2d')!;

  const soilBumpCanvas = document.createElement('canvas');
  soilBumpCanvas.width = 512;
  soilBumpCanvas.height = 512;
  const sbumpCtx = soilBumpCanvas.getContext('2d')!;

  scCtx.fillStyle = '#140f0b';
  scCtx.fillRect(0, 0, 512, 512);
  sbumpCtx.fillStyle = '#505050';
  sbumpCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 2400; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const r = 1.5 + rand() * 8;
    const tone = 14 + Math.floor(rand() * 22);
    scCtx.fillStyle = `rgb(${tone + 6}, ${tone + 2}, ${tone - 2})`;
    scCtx.beginPath();
    scCtx.arc(x, y, r, 0, Math.PI * 2);
    scCtx.fill();

    const bVal = 60 + Math.floor(rand() * 170);
    sbumpCtx.fillStyle = `rgb(${bVal}, ${bVal}, ${bVal})`;
    sbumpCtx.beginPath();
    sbumpCtx.arc(x, y, r, 0, Math.PI * 2);
    sbumpCtx.fill();
  }

  // 8. Veined dead leaf texture
  const leafCanvas = document.createElement('canvas');
  leafCanvas.width = 256;
  leafCanvas.height = 256;
  const lfCtx = leafCanvas.getContext('2d')!;
  lfCtx.fillStyle = '#593b22';
  lfCtx.fillRect(0, 0, 256, 256);
  // Central midrib & lateral veins
  lfCtx.strokeStyle = '#332010';
  lfCtx.lineWidth = 3;
  lfCtx.beginPath();
  lfCtx.moveTo(0, 128);
  lfCtx.lineTo(256, 128);
  lfCtx.stroke();
  lfCtx.lineWidth = 1.5;
  for (let v = 24; v < 240; v += 28) {
    lfCtx.beginPath();
    lfCtx.moveTo(v, 128);
    lfCtx.lineTo(v + 26, 20);
    lfCtx.moveTo(v, 128);
    lfCtx.lineTo(v + 26, 236);
    lfCtx.stroke();
  }

  // 9. Soft circular spore particle sprite
  const sporeCanvas = document.createElement('canvas');
  sporeCanvas.width = 64;
  sporeCanvas.height = 64;
  const spCtx = sporeCanvas.getContext('2d')!;
  const spGrad = spCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  spGrad.addColorStop(0, 'rgba(235, 224, 204, 0.95)');
  spGrad.addColorStop(0.45, 'rgba(210, 196, 174, 0.5)');
  spGrad.addColorStop(1, 'rgba(210, 196, 174, 0.0)');
  spCtx.fillStyle = spGrad;
  spCtx.fillRect(0, 0, 64, 64);

  return {
    stemColor: configureTexture(new THREE.CanvasTexture(stemColorCanvas), true, maxAniso),
    stemBump: configureTexture(new THREE.CanvasTexture(stemBumpCanvas), false, maxAniso),
    capColor: capColorTex,
    capBump: configureTexture(new THREE.CanvasTexture(capBumpCanvas), false, maxAniso),
    bulbColor: configureTexture(new THREE.CanvasTexture(bulbColorCanvas), true, maxAniso),
    bulbBump: configureTexture(new THREE.CanvasTexture(bulbBumpCanvas), false, maxAniso),
    traySkinColor: configureTexture(new THREE.CanvasTexture(traySkinCanvas), true, maxAniso, 2, 2),
    traySkinBump: configureTexture(new THREE.CanvasTexture(traySkinBumpCanvas), false, maxAniso, 2, 2),
    trayCoreColor: configureTexture(new THREE.CanvasTexture(trayCoreCanvas), true, maxAniso, 2, 2),
    trayCoreBump: configureTexture(new THREE.CanvasTexture(trayCoreBumpCanvas), false, maxAniso, 2, 2),
    clumpFuzzColor: configureTexture(new THREE.CanvasTexture(clumpCanvas), true, maxAniso, 2, 2),
    clumpFuzzBump: configureTexture(new THREE.CanvasTexture(clumpBumpCanvas), false, maxAniso, 2, 2),
    barkColor: configureTexture(new THREE.CanvasTexture(barkCanvas), true, maxAniso),
    soilColor: configureTexture(new THREE.CanvasTexture(soilColorCanvas), true, maxAniso, 6, 6),
    soilBump: configureTexture(new THREE.CanvasTexture(soilBumpCanvas), false, maxAniso, 6, 6),
    leafColor: configureTexture(new THREE.CanvasTexture(leafCanvas), true, maxAniso),
    sporeSprite: configureTexture(new THREE.CanvasTexture(sporeCanvas), true, 1),
  };
}
