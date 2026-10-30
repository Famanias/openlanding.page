import * as THREE from 'three';

export interface ReliquaryRingParts {
  rootGroup: THREE.Group;
  outerBezel: THREE.Group;
  recessedChamber: THREE.Group;
  leftShoulder: THREE.Group;
  rightShoulder: THREE.Group;
  lowerShank: THREE.Group;
  guideLines: THREE.LineSegments;
  dispose: () => void;
}

/**
 * Shared software WebGL detection helper used across 3D ring scenes.
 */
export function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl =
      probeCanvas.getContext('webgl2') ||
      probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

/**
 * Builds the shared high-contrast dark jewellery studio environment for PMREMGenerator.
 * Surround the ring with deep obsidian walls and crisp overhead/grazing studio softboxes.
 */
export function createDarkJewelleryStudioEnv(): {
  scene: THREE.Scene;
  dispose: () => void;
} {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x050507);

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const addSoftbox = (
    w: number,
    h: number,
    colorHex: number,
    intensity: number,
    pos: [number, number, number],
    lookAt: [number, number, number]
  ) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colorHex).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    envScene.add(mesh);
    geometries.push(geo);
    materials.push(mat);
  };

  // 1. Primary Key Softbox (upper front-left, catches the stepped lancet bezel & shoulder crown)
  addSoftbox(7.5, 5.0, 0xf6f8fc, 2.6, [-4.5, 5.8, 5.2], [0, 0, 0]);

  // 2. Right Shoulder Grazing Strip Softbox (illuminates the intaglio trefoil spandrel engraving & hoop)
  addSoftbox(6.5, 4.2, 0xe8eef8, 2.2, [6.2, 2.4, 3.4], [0, 0, 0]);

  // 3. Top-Back Arch Rim Strip (defines the pointed apex and rear shank contour against black)
  addSoftbox(8.0, 2.6, 0xffffff, 2.4, [0.5, 6.2, -5.0], [0, 0, 0]);

  // 4. Subtle Lower Slate Bounce (prevents lower bevels from clipping to dead black)
  addSoftbox(9.0, 6.0, 0x262930, 0.85, [0, -5.5, 1.5], [0, 0, 0]);

  // 5. Front-Right Fill Card (soft pewter midtone reflection across the flat signet table)
  addSoftbox(4.5, 4.5, 0x7a808c, 1.15, [2.8, -0.6, 6.0], [0, 0, 0]);

  return {
    scene: envScene,
    dispose: () => {
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
    },
  };
}

/**
 * Evaluates the outer flank of the upright pointed-arch lancet contour for s in [-1, +1]:
 * s = -1 is the bottom corner of the bezel flank,
 * s = -0.35 is the springing point,
 * s = +1 is the top pointed apex junction.
 */
function sampleLancetFlank(
  s: number,
  width: number,
  height: number
): { x: number; y: number } {
  const halfW = width * 0.5;
  const yBot = -height * 0.46;
  const ySpring = -height * 0.10;
  const yTop = height * 0.54;

  const t = THREE.MathUtils.clamp((s + 1) * 0.5, 0, 1);

  if (t <= 0.32) {
    const u = t / 0.32;
    const cornerEase = Math.min(1, u / 0.22);
    const x = halfW * (0.90 + 0.10 * Math.sin(cornerEase * Math.PI * 0.5));
    const y = THREE.MathUtils.lerp(yBot, ySpring, u);
    return { x, y };
  } else {
    const u = (t - 0.32) / 0.68;
    const inv = 1 - u;
    const p0x = halfW;
    const p0y = ySpring;
    const p1x = halfW;
    const p1y = ySpring + height * 0.35;
    const p2x = halfW * 0.52;
    const p2y = yTop - height * 0.11;
    const p3x = halfW * 0.08;
    const p3y = yTop - height * 0.015;

    const x =
      inv * inv * inv * p0x +
      3 * inv * inv * u * p1x +
      3 * inv * u * u * p2x +
      u * u * u * p3x;
    const y =
      inv * inv * inv * p0y +
      3 * inv * inv * u * p1y +
      3 * inv * u * u * p2y +
      u * u * u * p3y;
    return { x, y };
  }
}

/**
 * Evaluates the 2D pointed Gothic lancet arch contour (x, y) matching morta-reliquary-ring.png.
 */
function createLancetShape(width: number, height: number): THREE.Shape {
  const w = width * 0.5;
  const hBottom = -height * 0.46;
  const hSpring = -height * 0.10;
  const hTop = height * 0.54;
  const corner = width * 0.05;

  const shape = new THREE.Shape();
  shape.moveTo(-w + corner, hBottom);
  shape.lineTo(w - corner, hBottom);
  shape.quadraticCurveTo(w, hBottom, w, hBottom + corner);
  shape.lineTo(w, hSpring);
  shape.bezierCurveTo(
    w,
    hSpring + height * 0.35,
    w * 0.50,
    hTop - height * 0.12,
    0,
    hTop
  );
  shape.bezierCurveTo(
    -w * 0.50,
    hTop - height * 0.12,
    -w,
    hSpring + height * 0.35,
    -w,
    hSpring
  );
  shape.lineTo(-w, hBottom + corner);
  shape.quadraticCurveTo(-w, hBottom, -w + corner, hBottom);

  return shape;
}

function createLancetPath(width: number, height: number): THREE.Path {
  const w = width * 0.5;
  const hBottom = -height * 0.46;
  const hSpring = -height * 0.10;
  const hTop = height * 0.54;
  const corner = width * 0.04;

  const path = new THREE.Path();
  path.moveTo(-w + corner, hBottom);
  path.lineTo(w - corner, hBottom);
  path.quadraticCurveTo(w, hBottom, w, hBottom + corner);
  path.lineTo(w, hSpring);
  path.bezierCurveTo(
    w,
    hSpring + height * 0.35,
    w * 0.50,
    hTop - height * 0.12,
    0,
    hTop
  );
  path.bezierCurveTo(
    -w * 0.50,
    hTop - height * 0.12,
    -w,
    hSpring + height * 0.35,
    -w,
    hSpring
  );
  path.lineTo(-w, hBottom + corner);
  path.quadraticCurveTo(-w, hBottom, -w + corner, hBottom);

  return path;
}

interface SharedSilverTextures {
  brushedBumpTex: THREE.CanvasTexture;
  chamberAlbedoTex: THREE.CanvasTexture;
  shoulderAlbedoTex: THREE.CanvasTexture;
  shoulderBumpTex: THREE.CanvasTexture;
}

let cachedSilverTextures: SharedSilverTextures | null = null;

/**
 * Generates (and caches across sections) procedural brushed & patinated sterling silver textures
 * and the intaglio shoulder gothic tracery engraving textures matching morta-reliquary-ring.png.
 */
function getSharedSilverTextures(maxAnisotropy: number): SharedSilverTextures {
  if (cachedSilverTextures) {
    cachedSilverTextures.brushedBumpTex.anisotropy = Math.max(
      cachedSilverTextures.brushedBumpTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.chamberAlbedoTex.anisotropy = Math.max(
      cachedSilverTextures.chamberAlbedoTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.shoulderAlbedoTex.anisotropy = Math.max(
      cachedSilverTextures.shoulderAlbedoTex.anisotropy,
      maxAnisotropy
    );
    cachedSilverTextures.shoulderBumpTex.anisotropy = Math.max(
      cachedSilverTextures.shoulderBumpTex.anisotropy,
      maxAnisotropy
    );
    return cachedSilverTextures;
  }

  // 1. Brushed & micro-scratched silver bump/roughness map
  const brushCanvas = document.createElement('canvas');
  brushCanvas.width = 512;
  brushCanvas.height = 512;
  const bCtx = brushCanvas.getContext('2d');
  if (bCtx) {
    bCtx.fillStyle = '#848488';
    bCtx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 1500; i++) {
      const y = (i * 19.3) % 512;
      const lum = 108 + ((i * 37) % 52);
      bCtx.strokeStyle = `rgba(${lum}, ${lum}, ${lum}, 0.20)`;
      bCtx.lineWidth = 0.7 + (i % 2) * 0.5;
      bCtx.beginPath();
      bCtx.moveTo(0, y);
      bCtx.lineTo(512, y + ((i % 7) - 3) * 3);
      bCtx.stroke();
    }

    for (let i = 0; i < 280; i++) {
      const x1 = (i * 73.1) % 512;
      const y1 = (i * 41.7) % 512;
      const angle = ((i * 1.9) % 3.14) - 1.57;
      const len = 10 + (i % 38);
      const isDark = i % 3 !== 0;
      bCtx.strokeStyle = isDark
        ? 'rgba(28, 28, 32, 0.42)'
        : 'rgba(225, 228, 235, 0.30)';
      bCtx.lineWidth = 0.7 + (i % 3) * 0.4;
      bCtx.beginPath();
      bCtx.moveTo(x1, y1);
      bCtx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
      bCtx.stroke();
    }
  }

  const brushedBumpTex = new THREE.CanvasTexture(brushCanvas);
  brushedBumpTex.wrapS = THREE.RepeatWrapping;
  brushedBumpTex.wrapT = THREE.RepeatWrapping;
  brushedBumpTex.repeat.set(2, 2);
  brushedBumpTex.anisotropy = maxAnisotropy;

  // 2. Oxidized sunken reliquary chamber texture (albedo + bump)
  const chamberColorCanvas = document.createElement('canvas');
  chamberColorCanvas.width = 512;
  chamberColorCanvas.height = 512;
  const cCtx = chamberColorCanvas.getContext('2d');
  if (cCtx) {
    const grad = cCtx.createRadialGradient(256, 248, 24, 256, 256, 260);
    grad.addColorStop(0, '#646870');
    grad.addColorStop(0.52, '#3a3d42');
    grad.addColorStop(1, '#16181c');
    cCtx.fillStyle = grad;
    cCtx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 650; i++) {
      const x = (i * 17.3) % 512;
      const y = (i * 29.1) % 512;
      const len = 28 + (i % 95);
      const v = i % 2 === 0 ? 115 : 28;
      cCtx.strokeStyle = `rgba(${v}, ${v}, ${v + 3}, 0.25)`;
      cCtx.lineWidth = 0.9;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + ((i % 5) - 2) * 2, y + len);
      cCtx.stroke();
    }

    for (let i = 0; i < 150; i++) {
      const x = 75 + ((i * 53) % 360);
      const y = 70 + ((i * 67) % 370);
      const dx = ((i * 19) % 46) - 23;
      const dy = ((i * 23) % 48) - 24;
      cCtx.strokeStyle =
        i % 3 === 0 ? 'rgba(162, 166, 174, 0.32)' : 'rgba(12, 13, 16, 0.60)';
      cCtx.lineWidth = 1.25;
      cCtx.beginPath();
      cCtx.moveTo(x, y);
      cCtx.lineTo(x + dx, y + dy);
      cCtx.stroke();
    }
  }

  const chamberAlbedoTex = new THREE.CanvasTexture(chamberColorCanvas);
  chamberAlbedoTex.colorSpace = THREE.SRGBColorSpace;
  chamberAlbedoTex.anisotropy = maxAnisotropy;

  // 3. High-resolution (1024x1024) Shoulder Intaglio Engraving Texture (Albedo + Bump/Height)
  const shColorCanvas = document.createElement('canvas');
  shColorCanvas.width = 1024;
  shColorCanvas.height = 1024;
  const scCtx = shColorCanvas.getContext('2d');

  const shBumpCanvas = document.createElement('canvas');
  shBumpCanvas.width = 1024;
  shBumpCanvas.height = 1024;
  const sbCtx = shBumpCanvas.getContext('2d');

  if (scCtx && sbCtx) {
    scCtx.fillStyle = '#c8ccd4';
    scCtx.fillRect(0, 0, 1024, 1024);

    sbCtx.fillStyle = '#d8d8d8';
    sbCtx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 2200; i++) {
      const x = (i * 47.3) % 1024;
      const y = (i * 31.7) % 1024;
      const ang = ((i * 1.3) % 3.14) - 1.57;
      const len = 16 + (i % 58);
      const dark = i % 2 === 0;
      scCtx.strokeStyle = dark
        ? 'rgba(46, 48, 54, 0.16)'
        : 'rgba(246, 248, 252, 0.18)';
      scCtx.lineWidth = 1.1;
      scCtx.beginPath();
      scCtx.moveTo(x, y);
      scCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      scCtx.stroke();

      sbCtx.strokeStyle = dark
        ? 'rgba(125, 125, 125, 0.25)'
        : 'rgba(240, 240, 240, 0.25)';
      sbCtx.lineWidth = 1.1;
      scCtx.beginPath();
      sbCtx.moveTo(x, y);
      scCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
      sbCtx.stroke();
    }

    const drawEngravedStroke = (
      drawFn: (ctx: CanvasRenderingContext2D) => void,
      lineWidth: number
    ) => {
      scCtx.save();
      scCtx.strokeStyle = 'rgba(248, 250, 255, 0.55)';
      scCtx.lineWidth = lineWidth + 5.0;
      scCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(scCtx);
      scCtx.stroke();
      scCtx.restore();

      scCtx.save();
      scCtx.strokeStyle = '#0c0d10';
      scCtx.lineWidth = lineWidth;
      scCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(scCtx);
      scCtx.stroke();
      scCtx.restore();

      sbCtx.save();
      sbCtx.strokeStyle = '#080808';
      sbCtx.lineWidth = lineWidth + 3.0;
      sbCtx.lineCap = 'round';
      scCtx.lineJoin = 'round';
      drawFn(sbCtx);
      sbCtx.stroke();
      sbCtx.restore();
    };

    const drawEngravedPocket = (
      drawFn: (ctx: CanvasRenderingContext2D) => void
    ) => {
      scCtx.save();
      scCtx.fillStyle = '#0e1014';
      scCtx.strokeStyle = 'rgba(245, 248, 255, 0.50)';
      scCtx.lineWidth = 4.0;
      drawFn(scCtx);
      scCtx.fill();
      scCtx.stroke();
      scCtx.restore();

      sbCtx.save();
      sbCtx.fillStyle = '#0a0a0a';
      drawFn(sbCtx);
      sbCtx.fill();
      sbCtx.restore();
    };

    const cy = 512;
    const span = 425;

    for (const dir of [-1, 1]) {
      // 1. Front vertical-parallel border line right behind the smooth front arch bevel
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(78, cy + dir * span * 0.94);
        ctx.quadraticCurveTo(92, cy + dir * span * 0.48, 88, cy);
      }, 8.5);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(104, cy + dir * span * 0.87);
        ctx.quadraticCurveTo(114, cy + dir * span * 0.45, 110, cy);
      }, 6.0);

      // 2. Outer pointed gothic shoulder frame sweeping along the upper/lower edge
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(78, cy + dir * span * 0.94);
        ctx.quadraticCurveTo(
          335,
          cy + dir * span * 0.60,
          635,
          cy + dir * span * 0.15
        );
      }, 9.0);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(104, cy + dir * span * 0.86);
        ctx.quadraticCurveTo(
          325,
          cy + dir * span * 0.52,
          575,
          cy + dir * span * 0.17
        );
      }, 6.0);

      // 3. Central cusped Gothic lancet arch curving from mid-shoulder forward to bezel
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(540, cy);
        ctx.quadraticCurveTo(
          330,
          cy + dir * span * 0.18,
          106,
          cy + dir * span * 0.78
        );
      }, 9.0);

      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(485, cy);
        ctx.quadraticCurveTo(
          310,
          cy + dir * span * 0.14,
          112,
          cy + dir * span * 0.68
        );
      }, 6.5);

      // Inner gothic cusp foil inside the central shoulder arch
      drawEngravedStroke((ctx) => {
        ctx.beginPath();
        ctx.moveTo(114, cy + dir * span * 0.56);
        ctx.quadraticCurveTo(
          258,
          cy + dir * span * 0.28,
          315,
          cy + dir * span * 0.17
        );
        ctx.quadraticCurveTo(
          238,
          cy + dir * span * 0.05,
          200,
          cy
        );
      }, 7.0);

      // 4. Recessed oxidized three-lobed trefoil spandrel cutout
      drawEngravedPocket((ctx) => {
        ctx.beginPath();
        ctx.moveTo(132, cy + dir * span * 0.76);
        ctx.quadraticCurveTo(
          200,
          cy + dir * span * 0.66,
          232,
          cy + dir * span * 0.54
        );
        ctx.quadraticCurveTo(
          302,
          cy + dir * span * 0.45,
          352,
          cy + dir * span * 0.33
        );
        ctx.quadraticCurveTo(
          262,
          cy + dir * span * 0.29,
          216,
          cy + dir * span * 0.40
        );
        ctx.quadraticCurveTo(
          162,
          cy + dir * span * 0.50,
          132,
          cy + dir * span * 0.76
        );
        ctx.closePath();
      });
    }
  }

  const shoulderAlbedoTex = new THREE.CanvasTexture(shColorCanvas);
  shoulderAlbedoTex.colorSpace = THREE.SRGBColorSpace;
  shoulderAlbedoTex.anisotropy = maxAnisotropy;

  const shoulderBumpTex = new THREE.CanvasTexture(shBumpCanvas);
  shoulderBumpTex.anisotropy = maxAnisotropy;

  cachedSilverTextures = {
    brushedBumpTex,
    chamberAlbedoTex,
    shoulderAlbedoTex,
    shoulderBumpTex,
  };

  return cachedSilverTextures;
}

/**
 * Builds the seamless 3D signet shoulder (`leftShoulder` or `rightShoulder`).
 * The finger hole is a vertical cylinder along the Y-axis centered at (0, y, hoopCenterZ = -0.60)
 * with radius rInner = 0.94, so in the three-quarter view the circular band extends clearly
 * to the right of the shoulder and reveals the illuminated inner hoop wall.
 */
function createSeamlessShoulderGroup(
  side: 1 | -1,
  shoulderMat: THREE.MeshPhysicalMaterial,
  disposables: Array<{ dispose: () => void }>
): THREE.Group {
  const group = new THREE.Group();

  const uSteps = 44;
  const vSteps = 52;
  const rInner = 0.94;
  const hoopCenterZ = -0.60;
  const frontBezelZ = 0.52;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const evalOuterPoint = (u: number, v: number): THREE.Vector3 => {
    const s = (v - 0.5) * 2;

    const flank = sampleLancetFlank(s, 1.68, 2.26);
    const frontX = side * flank.x;
    const frontY = flank.y;
    const frontZ = frontBezelZ - (1 - Math.cos(s * Math.PI * 0.45)) * 0.035;

    const theta = THREE.MathUtils.lerp(0.38, 1.72, u);
    const easeU = u * u * (3 - 2 * u);
    const swoopU = 1 - Math.pow(1 - u, 1.85);

    const yBotHoop = THREE.MathUtils.lerp(-1.03, -0.35, swoopU);
    const yTopHoop = THREE.MathUtils.lerp(1.15, 0.35, swoopU);
    const hoopY = THREE.MathUtils.lerp(yBotHoop, yTopHoop, v);

    const wallThick = THREE.MathUtils.lerp(0.26, 0.18, easeU);
    const verticalCrown = Math.cos(s * Math.PI * 0.46);
    const rOuter = rInner + wallThick * (0.68 + 0.32 * verticalCrown);

    const hoopX = side * Math.sin(theta) * rOuter;
    const hoopZ = hoopCenterZ + Math.cos(theta) * rOuter;

    const blendXZ = Math.pow(u, 0.62);
    const x = THREE.MathUtils.lerp(frontX, hoopX, blendXZ);
    const y = THREE.MathUtils.lerp(frontY, hoopY, swoopU);
    const z = THREE.MathUtils.lerp(frontZ, hoopZ, Math.pow(u, 0.78));

    return new THREE.Vector3(x, y, z);
  };

  const outerGrid: THREE.Vector3[][] = [];
  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    const row: THREE.Vector3[] = [];
    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      row.push(evalOuterPoint(u, v));
    }
    outerGrid.push(row);
  }

  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      const p = outerGrid[iu][iv];

      const pUPrev = outerGrid[Math.max(0, iu - 1)][iv];
      const pUNext = outerGrid[Math.min(uSteps, iu + 1)][iv];
      const dU = new THREE.Vector3().subVectors(pUNext, pUPrev);

      const pVPrev = outerGrid[iu][Math.max(0, iv - 1)];
      const pVNext = outerGrid[iu][Math.min(vSteps, iv + 1)];
      const dV = new THREE.Vector3().subVectors(pVNext, pVPrev);

      const n =
        side === 1
          ? new THREE.Vector3().crossVectors(dU, dV).normalize()
          : new THREE.Vector3().crossVectors(dV, dU).normalize();

      positions.push(p.x, p.y, p.z);
      normals.push(n.x, n.y, n.z);
      uvs.push(u, v);
    }
  }

  const baseVertCount = (uSteps + 1) * (vSteps + 1);
  for (let iu = 0; iu <= uSteps; iu++) {
    const u = iu / uSteps;
    const theta = THREE.MathUtils.lerp(0.38, 1.72, u);
    const swoopU = 1 - Math.pow(1 - u, 1.85);
    const yBotInner = THREE.MathUtils.lerp(-0.95, -0.35, swoopU);
    const yTopInner = THREE.MathUtils.lerp(1.04, 0.35, swoopU);
    const sinT = side * Math.sin(theta);
    const cosT = Math.cos(theta);

    for (let iv = 0; iv <= vSteps; iv++) {
      const v = iv / vSteps;
      const y = THREE.MathUtils.lerp(yBotInner, yTopInner, v);
      const x = sinT * rInner;
      const z = hoopCenterZ + cosT * rInner;

      positions.push(x, y, z);
      normals.push(-sinT, 0, -cosT);
      uvs.push(u, v);
    }
  }

  const stride = vSteps + 1;
  for (let iu = 0; iu < uSteps; iu++) {
    for (let iv = 0; iv < vSteps; iv++) {
      const a = iu * stride + iv;
      const b = (iu + 1) * stride + iv;
      const c = (iu + 1) * stride + (iv + 1);
      const d = iu * stride + (iv + 1);

      if (side === 1) {
        indices.push(a, b, c, a, c, d);
      } else {
        indices.push(a, c, b, a, d, c);
      }

      const ia = baseVertCount + a;
      const ib = baseVertCount + b;
      const ic = baseVertCount + c;
      const id = baseVertCount + d;

      if (side === 1) {
        indices.push(ia, ic, ib, ia, id, ic);
      } else {
        indices.push(ia, ib, ic, ia, ic, id);
      }
    }

    const topOutA = iu * stride + vSteps;
    const topOutB = (iu + 1) * stride + vSteps;
    const topInA = baseVertCount + topOutA;
    const topInB = baseVertCount + topOutB;

    const botOutA = iu * stride;
    const botOutB = (iu + 1) * stride;
    const botInA = baseVertCount + botOutA;
    const botInB = baseVertCount + botOutB;

    if (side === 1) {
      indices.push(topOutA, topOutB, topInB, topOutA, topInB, topInA);
      indices.push(botOutA, botInB, botOutB, botOutA, botInA, botInB);
    } else {
      indices.push(topOutA, topInB, topOutB, topOutA, topInA, topInB);
      indices.push(botOutA, botOutB, botInB, botOutA, botInB, botInA);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  disposables.push(geo);

  const mesh = new THREE.Mesh(geo, shoulderMat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  return group;
}

/**
 * Builds the complete 5-part 3D Reliquary signet ring model reconstructed from morta-reliquary-ring.png.
 * Reuses shared procedural silver textures so multiple views (House Study & Signature Assembly) remain lightweight.
 */
export function buildReliquaryRingModel(maxAnisotropy = 4): ReliquaryRingParts {
  const disposables: Array<{ dispose: () => void }> = [];
  const {
    brushedBumpTex,
    chamberAlbedoTex,
    shoulderAlbedoTex,
    shoulderBumpTex,
  } = getSharedSilverTextures(maxAnisotropy);

  // 1. Brushed 925 Sterling Silver Material (satin pewter-silver sheen with micro-scratch relief)
  const brushedSilverMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xc6cad2),
    metalness: 0.92,
    roughness: 0.26,
    bumpMap: brushedBumpTex,
    bumpScale: 0.014,
    roughnessMap: brushedBumpTex,
    anisotropy: 0.5,
    anisotropyRotation: 0.25,
    clearcoat: 0.12,
    clearcoatRoughness: 0.36,
    envMapIntensity: 1.40,
    side: THREE.DoubleSide,
  });

  // 2. Engraved Shoulder Sterling Silver Material (smooth mesh normals + high-res intaglio gothic spandrel tracery)
  const engravedShoulderMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd2d6de),
    map: shoulderAlbedoTex,
    bumpMap: shoulderBumpTex,
    bumpScale: 0.036,
    roughnessMap: brushedBumpTex,
    metalness: 0.91,
    roughness: 0.25,
    anisotropy: 0.45,
    clearcoat: 0.14,
    clearcoatRoughness: 0.32,
    envMapIntensity: 1.40,
    side: THREE.DoubleSide,
  });

  // 3. Polished Sterling Chamfer / Bevel Highlight Material (crisp specular arris on stepped lancet rims)
  const polishedArrisMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xdee2ea),
    metalness: 0.95,
    roughness: 0.16,
    bumpMap: brushedBumpTex,
    bumpScale: 0.006,
    clearcoat: 0.22,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.55,
  });

  // 4. Oxidized Sunken Reliquary Chamber Material (darkened liver-of-sulphur patina with hand-stoned marks)
  const oxidizedChamberMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    map: chamberAlbedoTex,
    bumpMap: chamberAlbedoTex,
    bumpScale: 0.028,
    roughnessMap: brushedBumpTex,
    metalness: 0.72,
    roughness: 0.62,
    envMapIntensity: 0.68,
  });

  // 5. Deep Oxidized Groove / Recess Channel Material
  const deepGrooveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x101114),
    metalness: 0.55,
    roughness: 0.82,
    envMapIntensity: 0.3,
  });

  disposables.push(
    brushedSilverMat,
    engravedShoulderMat,
    polishedArrisMat,
    oxidizedChamberMat,
    deepGrooveMat
  );

  const rootGroup = new THREE.Group();

  // ============================================================================
  // PART 1: OUTER STEPPED LANCET BEZEL (outerBezel)
  // ============================================================================
  const outerBezel = new THREE.Group();

  const outerFrameShape = createLancetShape(1.66, 2.24);
  const outerHolePath = createLancetPath(1.42, 1.96);
  outerFrameShape.holes.push(outerHolePath);

  const outerFrameGeo = new THREE.ExtrudeGeometry(outerFrameShape, {
    steps: 1,
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.042,
    bevelSize: 0.032,
    bevelSegments: 4,
    curveSegments: 40,
  });
  outerFrameGeo.translate(0, 0, 0.52);
  disposables.push(outerFrameGeo);

  const outerFrameMesh = new THREE.Mesh(outerFrameGeo, polishedArrisMat);
  outerFrameMesh.castShadow = true;
  outerFrameMesh.receiveShadow = true;
  outerBezel.add(outerFrameMesh);

  const grooveShape = createLancetShape(1.46, 2.00);
  const grooveHole = createLancetPath(1.28, 1.80);
  grooveShape.holes.push(grooveHole);
  const grooveGeo = new THREE.ExtrudeGeometry(grooveShape, {
    steps: 1,
    depth: 0.12,
    bevelEnabled: false,
    curveSegments: 36,
  });
  grooveGeo.translate(0, 0, 0.52);
  disposables.push(grooveGeo);
  const grooveMesh = new THREE.Mesh(grooveGeo, deepGrooveMat);
  outerBezel.add(grooveMesh);

  const innerLipShape = createLancetShape(1.32, 1.84);
  const innerLipHole = createLancetPath(1.14, 1.64);
  innerLipShape.holes.push(innerLipHole);

  const innerLipGeo = new THREE.ExtrudeGeometry(innerLipShape, {
    steps: 1,
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.026,
    bevelSize: 0.022,
    bevelSegments: 3,
    curveSegments: 36,
  });
  innerLipGeo.translate(0, 0, 0.51);
  disposables.push(innerLipGeo);

  const innerLipMesh = new THREE.Mesh(innerLipGeo, polishedArrisMat);
  innerLipMesh.castShadow = true;
  innerLipMesh.receiveShadow = true;
  outerBezel.add(innerLipMesh);

  // ============================================================================
  // PART 2: RECESSED OXIDIZED RELIQUARY CHAMBER PLATE (recessedChamber)
  // ============================================================================
  const recessedChamber = new THREE.Group();

  const chamberBodyShape = createLancetShape(1.48, 2.04);
  const chamberBodyGeo = new THREE.ExtrudeGeometry(chamberBodyShape, {
    steps: 1,
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 32,
  });
  chamberBodyGeo.translate(0, 0, 0.37);
  disposables.push(chamberBodyGeo);

  const chamberBodyMesh = new THREE.Mesh(chamberBodyGeo, brushedSilverMat);
  chamberBodyMesh.castShadow = true;
  chamberBodyMesh.receiveShadow = true;
  recessedChamber.add(chamberBodyMesh);

  const floorShape = createLancetShape(1.18, 1.68);
  const floorGeo = new THREE.ExtrudeGeometry(floorShape, {
    steps: 1,
    depth: 0.06,
    bevelEnabled: false,
    curveSegments: 36,
  });
  floorGeo.computeBoundingBox();
  const bbox = floorGeo.boundingBox!;
  const uvAttr = floorGeo.attributes.uv;
  const posAttr = floorGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const u = (posAttr.getX(i) - bbox.min.x) / (bbox.max.x - bbox.min.x || 1);
    const v = (posAttr.getY(i) - bbox.min.y) / (bbox.max.y - bbox.min.y || 1);
    uvAttr.setXY(i, u, v);
  }
  floorGeo.translate(0, 0, 0.52);
  disposables.push(floorGeo);

  const floorMesh = new THREE.Mesh(floorGeo, oxidizedChamberMat);
  floorMesh.receiveShadow = true;
  recessedChamber.add(floorMesh);

  // ============================================================================
  // PART 3 & 4: WEST & EAST SEAMLESS ENGRAVED SHOULDERS (leftShoulder, rightShoulder)
  // ============================================================================
  const leftShoulder = createSeamlessShoulderGroup(
    -1,
    engravedShoulderMat,
    disposables
  );
  const rightShoulder = createSeamlessShoulderGroup(
    1,
    engravedShoulderMat,
    disposables
  );

  // ============================================================================
  // PART 5: TAPERED STERLING SHANK & INNER SLEEVE (lowerShank)
  // ============================================================================
  const lowerShank = new THREE.Group();

  const shankUSteps = 40;
  const shankVSteps = 28;
  const rInner = 0.94;
  const hoopCenterZ = -0.60;

  const sPositions: number[] = [];
  const sNormals: number[] = [];
  const sUvs: number[] = [];
  const sIndices: number[] = [];

  for (let iu = 0; iu <= shankUSteps; iu++) {
    const u = iu / shankUSteps;
    const theta = THREE.MathUtils.lerp(1.66, Math.PI * 2 - 1.66, u);
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);

    const backFactor = 1 - Math.sin(u * Math.PI) * 0.06;
    const halfH = 0.35 * backFactor;
    const wallThick = 0.18 * backFactor;

    for (let iv = 0; iv <= shankVSteps; iv++) {
      const v = iv / shankVSteps;
      const phi = v * Math.PI * 2;
      const radialMid = rInner + wallThick * 0.5;
      const rSection = radialMid + Math.cos(phi) * (wallThick * 0.5);
      const y = Math.sin(phi) * halfH;

      const x = sinT * rSection;
      const z = hoopCenterZ + cosT * rSection;

      const nx = sinT * Math.cos(phi);
      const ny = Math.sin(phi);
      const nz = cosT * Math.cos(phi);

      sPositions.push(x, y, z);
      sNormals.push(nx, ny, nz);
      sUvs.push(u * 2, v);
    }
  }

  const sStride = shankVSteps + 1;
  for (let iu = 0; iu < shankUSteps; iu++) {
    for (let iv = 0; iv < shankVSteps; iv++) {
      const a = iu * sStride + iv;
      const b = (iu + 1) * sStride + iv;
      const c = (iu + 1) * sStride + (iv + 1);
      const d = iu * sStride + (iv + 1);
      sIndices.push(a, c, b, a, d, c);
    }
  }

  const shankGeo = new THREE.BufferGeometry();
  shankGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(sPositions, 3)
  );
  shankGeo.setAttribute(
    'normal',
    new THREE.Float32BufferAttribute(sNormals, 3)
  );
  shankGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sUvs, 2));
  shankGeo.setIndex(sIndices);
  shankGeo.computeVertexNormals();
  disposables.push(shankGeo);

  const shankMesh = new THREE.Mesh(shankGeo, brushedSilverMat);
  shankMesh.castShadow = true;
  shankMesh.receiveShadow = true;
  lowerShank.add(shankMesh);

  const sleeveGeo = new THREE.CylinderGeometry(
    rInner + 0.006,
    rInner + 0.006,
    0.68,
    48,
    1,
    true
  );
  sleeveGeo.translate(0, 0, hoopCenterZ);
  disposables.push(sleeveGeo);
  const sleeveMesh = new THREE.Mesh(sleeveGeo, brushedSilverMat);
  lowerShank.add(sleeveMesh);

  // ============================================================================
  // UNDERSTATED ARCHITECTURAL GUIDE LINES (visible when dispersed/converging)
  // ============================================================================
  const guideVerts = new Float32Array([
    0, 0, -2.3, 0, 0, 2.2,
    -2.2, 0, -0.3, 2.2, 0, -0.3,
    0, -1.5, 0.54, 0, 1.6, 0.54,
  ]);
  const guideGeo = new THREE.BufferGeometry();
  guideGeo.setAttribute('position', new THREE.BufferAttribute(guideVerts, 3));
  const guideMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  disposables.push(guideGeo, guideMat);
  const guideLines = new THREE.LineSegments(guideGeo, guideMat);

  rootGroup.add(
    outerBezel,
    recessedChamber,
    leftShoulder,
    rightShoulder,
    lowerShank,
    guideLines
  );

  // Natural resting tilt on the dark slate matching morta-reliquary-ring.png
  rootGroup.rotation.set(-0.16, 0.08, 0.05);

  return {
    rootGroup,
    outerBezel,
    recessedChamber,
    leftShoulder,
    rightShoulder,
    lowerShank,
    guideLines,
    dispose: () => {
      for (const item of disposables) {
        item.dispose();
      }
    },
  };
}
