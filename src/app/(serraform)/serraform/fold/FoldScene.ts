import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FOLD_CONSTANTS, PALETTE, ViewState } from './config';
import {
  computePanelUVSpan,
  deriveFoldChain,
  FoldPose,
  normalizeOpening,
} from './geometry';
import { createSceneMaterials, SceneMaterials } from './materials';
import { getBitmapKey } from './artwork';
import {
  computeAtelierCameraDistance,
  computeCameraDistance,
  computeFullBleedViewOffset,
  computeShadowCameraFrustum,
  StageSlotRect,
} from './projection';
import {
  DesignState,
  normalizeElevationDeg,
  normalizeYawDeg,
  viewDirectionFromAngles,
} from './state';
import { mixHex } from './color';
import { damp } from '../motion/math';

export interface RoomLightingState {
  lightTint: string;
  ambientTint: string;
  shadowTint: string;
  floorBase: string;
  isDarkEnvelope: boolean;
}

export interface FoldSceneController {
  setPose: (opening: number, immediate?: boolean) => void;
  setChainPose: (panelOpenings: readonly number[], glintProgress?: number) => void;
  setDesign: (
    design: DesignState,
    uploadedBitmap: ImageBitmap | null,
    immediate?: boolean,
  ) => void;
  setViewAngles: (view: ViewState, immediate?: boolean) => void;
  setPointerParallax: (nx: number, ny: number) => void;
  setHovered: (hovered: boolean) => void;
  setRoomLighting: (lighting: RoomLightingState, immediate?: boolean) => void;
  resize: (width: number, height: number, slotRect?: StageSlotRect | null) => void;
  setActive: (active: boolean) => void;
  renderOnce: () => void;
  getStats: () => { triangles: number; calls: number };
  dispose: () => void;
}

export interface CreateFoldSceneOptions {
  container: HTMLElement;
  initialDesign: DesignState;
  initialPanelOpenings?: readonly number[];
  initialUpload: ImageBitmap | null;
  initialView: ViewState;
  initialRoomLighting?: RoomLightingState;
  isCoarsePointer: boolean;
  fitPadding?: number;
  atelierFraming?: boolean;
  initialSlotRect?: StageSlotRect | null;
  onFirstFrame?: () => void;
  onContextLost?: () => void;
}

const _targetVec = new THREE.Vector3(0, FOLD_CONSTANTS.height * 0.5, 0);
const _camDir = new THREE.Vector3();
const _hingeMat = new THREE.Matrix4();
const _hingePos = new THREE.Vector3();
const _hingeQuat = new THREE.Quaternion();
const _hingeScale = new THREE.Vector3(1, 1, 1);

const HINGE_HEIGHTS = [0.024, 1.576] as const;

function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

/**
 * Builds the fixed-topology BufferGeometry for Fold 16 with 2 material groups:
 * - Group 0 (32 quads: 16 front + 16 back faces): printed textile artwork texture
 * - Group 1 (34 quads: 16 top + 16 bottom + 2 end caps): solid base felt color
 *
 * Uses continuous developed-sheet UVs:
 * - Front side reads left-to-right [j/16 .. (j+1)/16]
 * - Back side reverses horizontally [uBack = 1 - uFront] so landscapes & prints read left-to-right from both sides
 */
function createRibbonGeometry(): THREE.BufferGeometry {
  const N = FOLD_CONSTANTS.panels;
  const faceQuadCount = N * 2;
  const edgeQuadCount = N * 2 + 2;
  const quadCount = faceQuadCount + edgeQuadCount;
  const vertexCount = quadCount * 6;

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  geo.clearGroups();
  geo.addGroup(0, faceQuadCount * 6, 0);
  geo.addGroup(faceQuadCount * 6, edgeQuadCount * 6, 1);
  return geo;
}

function writeQuad(
  pos: Float32Array,
  norm: Float32Array,
  uv: Float32Array,
  quadIndex: number,
  ax: number, ay: number, az: number, au: number, av: number,
  bx: number, by: number, bz: number, bu: number, bv: number,
  cx: number, cy: number, cz: number, cu: number, cv: number,
  dx: number, dy: number, dz: number, du: number, dv: number,
): void {
  const e1x = bx - ax;
  const e1y = by - ay;
  const e1z = bz - az;
  const e2x = cx - ax;
  const e2y = cy - ay;
  const e2z = cz - az;
  let nx = e1y * e2z - e1z * e2y;
  let ny = e1z * e2x - e1x * e2z;
  let nz = e1x * e2y - e1y * e2x;
  const len = Math.hypot(nx, ny, nz) || 1;
  nx /= len;
  ny /= len;
  nz /= len;

  const pBase = quadIndex * 18;
  const uBase = quadIndex * 12;

  pos[pBase + 0] = ax; pos[pBase + 1] = ay; pos[pBase + 2] = az;
  pos[pBase + 3] = bx; pos[pBase + 4] = by; pos[pBase + 5] = bz;
  pos[pBase + 6] = cx; pos[pBase + 7] = cy; pos[pBase + 8] = cz;

  pos[pBase + 9] = ax; pos[pBase + 10] = ay; pos[pBase + 11] = az;
  pos[pBase + 12] = cx; pos[pBase + 13] = cy; pos[pBase + 14] = cz;
  pos[pBase + 15] = dx; pos[pBase + 16] = dy; pos[pBase + 17] = dz;

  for (let v = 0; v < 6; v += 1) {
    const ni = pBase + v * 3;
    norm[ni] = nx;
    norm[ni + 1] = ny;
    norm[ni + 2] = nz;
  }

  uv[uBase + 0] = au; uv[uBase + 1] = av;
  uv[uBase + 2] = bu; uv[uBase + 3] = bv;
  uv[uBase + 4] = cu; uv[uBase + 5] = cv;
  uv[uBase + 6] = au; uv[uBase + 7] = av;
  uv[uBase + 8] = cu; uv[uBase + 9] = cv;
  uv[uBase + 10] = du; uv[uBase + 11] = dv;
}

function updateRibbonGeometry(geo: THREE.BufferGeometry, pose: FoldPose): void {
  const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
  const normAttr = geo.getAttribute('normal') as THREE.BufferAttribute;
  const uvAttr = geo.getAttribute('uv') as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;
  const norm = normAttr.array as Float32Array;
  const uv = uvAttr.array as Float32Array;

  const N = FOLD_CONSTANTS.panels;
  const H = FOLD_CONSTANTS.height;
  let q = 0;

  // Group 0: Printed Front & Back Faces (continuous developed UVs)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];

    const frontUV = computePanelUVSpan(j, 'front', N);
    const backUV = computePanelUVSpan(j, 'back', N);

    // Front face (+Z), left-to-right
    writeQuad(
      pos, norm, uv, q++,
      f0.x, 0, f0.z, frontUV.uStart, 0,
      f1.x, 0, f1.z, frontUV.uEnd, 0,
      f1.x, H, f1.z, frontUV.uEnd, 1,
      f0.x, H, f0.z, frontUV.uStart, 1,
    );

    // Back face (-Z), reversed U so prints & landscapes read left-to-right from back side too
    writeQuad(
      pos, norm, uv, q++,
      b1.x, 0, b1.z, backUV.uStart, 0,
      b0.x, 0, b0.z, backUV.uEnd, 0,
      b0.x, H, b0.z, backUV.uEnd, 1,
      b1.x, H, b1.z, backUV.uStart, 1,
    );
  }

  // Group 1: Narrow Top, Bottom & End Felt Edges (solid base color)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];
    const u0 = j / N;
    const u1 = (j + 1) / N;

    // Top cap (+Y)
    writeQuad(
      pos, norm, uv, q++,
      f0.x, H, f0.z, u0, 0,
      f1.x, H, f1.z, u1, 0,
      b1.x, H, b1.z, u1, 0.04,
      b0.x, H, b0.z, u0, 0.04,
    );

    // Bottom cap (-Y)
    writeQuad(
      pos, norm, uv, q++,
      b0.x, 0, b0.z, u0, 0,
      b1.x, 0, b1.z, u1, 0,
      f1.x, 0, f1.z, u1, 0.04,
      f0.x, 0, f0.z, u0, 0.04,
    );
  }

  // Left end cap (-X)
  writeQuad(
    pos, norm, uv, q++,
    pose.back[0].x, 0, pose.back[0].z, 0, 0,
    pose.front[0].x, 0, pose.front[0].z, 0.02, 0,
    pose.front[0].x, H, pose.front[0].z, 0.02, 1,
    pose.back[0].x, H, pose.back[0].z, 0, 1,
  );

  // Right end cap (+X)
  writeQuad(
    pos, norm, uv, q++,
    pose.front[N].x, 0, pose.front[N].z, 0.98, 0,
    pose.back[N].x, 0, pose.back[N].z, 1, 0,
    pose.back[N].x, H, pose.back[N].z, 1, 1,
    pose.front[N].x, H, pose.front[N].z, 0.98, 1,
  );

  posAttr.needsUpdate = true;
  normAttr.needsUpdate = true;
  uvAttr.needsUpdate = true;
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
}

function createCreaseLineGeometry(): THREE.BufferGeometry {
  const N = FOLD_CONSTANTS.panels;
  const segCount = (N + 1) * 2 + N * 2;
  const positions = new Float32Array(segCount * 2 * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

function updateCreaseLineGeometry(geo: THREE.BufferGeometry, pose: FoldPose): void {
  const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;
  const N = FOLD_CONSTANTS.panels;
  const H = FOLD_CONSTANTS.height + 0.001;
  let idx = 0;

  const pushSeg = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) => {
    pos[idx++] = x0; pos[idx++] = y0; pos[idx++] = z0;
    pos[idx++] = x1; pos[idx++] = y1; pos[idx++] = z1;
  };

  for (let j = 0; j <= N; j += 1) {
    const f = pose.front[j];
    const b = pose.back[j];
    pushSeg(f.x, 0.002, f.z, f.x, H, f.z);
    pushSeg(b.x, 0.002, b.z, b.x, H, b.z);
  }

  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];
    pushSeg(f0.x, H, f0.z, f1.x, H, f1.z);
    pushSeg(b0.x, H, b0.z, b1.x, H, b1.z);
  }

  posAttr.needsUpdate = true;
}

function updateHingeInstances(mesh: THREE.InstancedMesh, pose: FoldPose): void {
  const N = FOLD_CONSTANTS.panels;
  let idx = 0;
  for (let j = 1; j < N; j += 1) {
    const p = pose.hinges[j];
    for (let k = 0; k < HINGE_HEIGHTS.length; k += 1) {
      _hingePos.set(p.x, HINGE_HEIGHTS[k], p.z);
      _hingeMat.compose(_hingePos, _hingeQuat, _hingeScale);
      mesh.setMatrixAt(idx++, _hingeMat);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function createBeveledFootGeometry(): THREE.BufferGeometry {
  const w = FOLD_CONSTANTS.footWidth;
  const d = FOLD_CONSTANTS.footDepth;
  const h = FOLD_CONSTANTS.footHeight;
  const r = 0.012;

  const shape = new THREE.Shape();
  const hw = w * 0.5 - r;
  const hd = d * 0.5 - r;

  shape.moveTo(-hw, -hd - r);
  shape.lineTo(hw, -hd - r);
  shape.quadraticCurveTo(hw + r, -hd - r, hw + r, -hd);
  shape.lineTo(hw + r, hd);
  shape.quadraticCurveTo(hw + r, hd + r, hw, hd + r);
  shape.lineTo(-hw, hd + r);
  shape.quadraticCurveTo(-hw - r, hd + r, -hw - r, hd);
  shape.lineTo(-hw - r, -hd);
  shape.quadraticCurveTo(-hw - r, -hd - r, -hw, -hd - r);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h - 0.004,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
    curveSegments: 8,
  });

  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -h + 0.002, 0);
  geo.computeVertexNormals();
  return geo;
}

function stepAngleShortestArc(currentDeg: number, targetDeg: number, t: number): number {
  const diff = (((targetDeg - currentDeg) % 360) + 540) % 360 - 180;
  return normalizeYawDeg(currentDeg + diff * t);
}

export function createFoldScene(options: CreateFoldSceneOptions): FoldSceneController {
  const {
    container,
    initialDesign,
    initialPanelOpenings,
    initialUpload,
    initialView,
    initialRoomLighting,
    isCoarsePointer,
    fitPadding = FOLD_CONSTANTS.cameraFitPadding,
    atelierFraming = false,
    initialSlotRect = null,
    onFirstFrame,
    onContextLost,
  } = options;

  const isSoftwareGl = detectSoftwareGl();

  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    powerPreference: 'high-performance',
    alpha: atelierFraming,
    preserveDrawingBuffer: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const maxDpr = isSoftwareGl ? 0.75 : isCoarsePointer ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const rect = container.getBoundingClientRect();
  const initW = Math.max(1, Math.round(rect.width || 800));
  const initH = Math.max(1, Math.round(rect.height || 560));
  renderer.setSize(initW, initH, false);
  let lastRenderW = initW;
  let lastRenderH = initH;

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.tabIndex = -1;
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  if (atelierFraming) {
    renderer.setClearColor(0x000000, 0);
    scene.background = null;
    scene.fog = null;
  } else {
    scene.background = new THREE.Color(PALETTE.rose);
    scene.fog = new THREE.Fog(PALETTE.rose, 10, 24);
  }

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmremGenerator.dispose();

  const aspect = initW / initH;
  const camera = new THREE.PerspectiveCamera(
    FOLD_CONSTANTS.cameraFovDeg,
    aspect,
    FOLD_CONSTANTS.cameraNear,
    FOLD_CONSTANTS.cameraFar,
  );

  // Architectural atelier lighting: warm upper-left key, cool neutral fill, subtle back rim + glint sweep
  const hemiLight = new THREE.HemisphereLight('#FFFBF7', '#C8AFB2', 0.56);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight('#FFF8F1', 1.04);
  keyLight.position.set(-3.1, 4.9, 3.2);
  keyLight.target.position.set(0.35, 0.25, -0.3);
  scene.add(keyLight);
  scene.add(keyLight.target);
  keyLight.target.updateMatrixWorld();
  if (!isSoftwareGl) {
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    const frustum = computeShadowCameraFrustum(
      {
        x: keyLight.position.x,
        y: keyLight.position.y,
        z: keyLight.position.z,
      },
      {
        x: keyLight.target.position.x,
        y: keyLight.target.position.y,
        z: keyLight.target.position.z,
      },
    );
    keyLight.shadow.camera.left = frustum.left;
    keyLight.shadow.camera.right = frustum.right;
    keyLight.shadow.camera.bottom = frustum.bottom;
    keyLight.shadow.camera.top = frustum.top;
    keyLight.shadow.camera.near = frustum.near;
    keyLight.shadow.camera.far = frustum.far;
    keyLight.shadow.camera.updateProjectionMatrix();
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.018;
  }

  const backFillLight = new THREE.DirectionalLight('#F4F5F8', 0.48);
  backFillLight.position.set(3.4, 3.3, -3.2);
  scene.add(backFillLight);

  const rimLight = new THREE.DirectionalLight('#FFFCF8', 0.28);
  rimLight.position.set(2.0, 2.8, -4.4);
  scene.add(rimLight);

  // Subtle traveling glint point light during initial gather & hinge reveal
  const glintLight = new THREE.PointLight('#FFF5EB', 0, 2.4, 1.5);
  glintLight.position.set(-0.6, 1.0, 0.65);
  scene.add(glintLight);

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const materials: SceneMaterials = createSceneMaterials(
    initialDesign,
    initialUpload,
    maxAniso,
    isCoarsePointer || isSoftwareGl,
  );

  // Room-synchronized target lighting colors
  const targetHemiSkyColor = new THREE.Color('#FFFBF7');
  const targetHemiGroundColor = new THREE.Color('#C8AFB2');
  const targetKeyColor = new THREE.Color('#FFF8F1');
  const targetFillColor = new THREE.Color('#F4F5F8');
  const targetRimColor = new THREE.Color('#FFFCF8');
  const targetShadowColor = new THREE.Color(PALETTE.oxblood);
  let targetFloorShadowOpacity = 0.12;
  let targetContactShadowOpacity = 0.88;
  let lightingColorDirty = false;

  const applyRoomLightingTargets = (lighting: RoomLightingState, immediate: boolean) => {
    targetHemiSkyColor.set(mixHex(lighting.lightTint, '#FFFFFF', 0.35));
    targetHemiGroundColor.set(mixHex(lighting.floorBase, lighting.ambientTint, 0.45));
    targetKeyColor.set(lighting.lightTint);
    targetFillColor.set(mixHex(lighting.ambientTint, '#F4F5F8', 0.42));
    targetRimColor.set(mixHex(lighting.lightTint, '#FFFCF8', 0.28));
    targetShadowColor.set(lighting.shadowTint);
    targetFloorShadowOpacity = lighting.isDarkEnvelope ? 0.18 : 0.13;
    targetContactShadowOpacity = lighting.isDarkEnvelope ? 0.94 : 0.88;

    if (immediate) {
      hemiLight.color.copy(targetHemiSkyColor);
      hemiLight.groundColor.copy(targetHemiGroundColor);
      keyLight.color.copy(targetKeyColor);
      backFillLight.color.copy(targetFillColor);
      rimLight.color.copy(targetRimColor);
      materials.floor.color.copy(targetShadowColor);
      materials.contactShadow.color.copy(targetShadowColor);
      materials.floor.opacity = targetFloorShadowOpacity;
      materials.contactShadow.opacity = targetContactShadowOpacity;
      lightingColorDirty = false;
    } else {
      lightingColorDirty = true;
    }
  };

  if (initialRoomLighting) {
    applyRoomLightingTargets(initialRoomLighting, true);
  }

  const floorGeo = new THREE.PlaneGeometry(180, 180);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMesh = new THREE.Mesh(floorGeo, materials.floor);
  floorMesh.position.y = -FOLD_CONSTANTS.footHeight;
  floorMesh.receiveShadow = !isSoftwareGl;
  scene.add(floorMesh);

  const floorGlowGeo = new THREE.PlaneGeometry(5.2, 3.4);
  floorGlowGeo.rotateX(-Math.PI / 2);
  const floorGlowMesh = new THREE.Mesh(floorGlowGeo, materials.floorGlow);
  floorGlowMesh.position.y = -FOLD_CONSTANTS.footHeight + 0.0006;
  floorGlowMesh.visible = !atelierFraming;
  scene.add(floorGlowMesh);

  const dividerGroup = new THREE.Group();
  scene.add(dividerGroup);

  const ribbonGeo = createRibbonGeometry();
  const ribbonMesh = new THREE.Mesh(ribbonGeo, [materials.feltFace, materials.feltEdge]);
  ribbonMesh.castShadow = !isSoftwareGl;
  ribbonMesh.receiveShadow = !isSoftwareGl;
  dividerGroup.add(ribbonMesh);

  const creaseGeo = createCreaseLineGeometry();
  const creaseLines = new THREE.LineSegments(creaseGeo, materials.edgeCrease);
  dividerGroup.add(creaseLines);

  // 30 muted brushed-oxblood hinge pins at top & bottom seams across folds 1..15 (1 draw call)
  const hingeCount = (FOLD_CONSTANTS.panels - 1) * HINGE_HEIGHTS.length;
  const hingeGeo = new THREE.CylinderGeometry(0.0046, 0.0046, 0.036, 10);
  const hingeInstanced = new THREE.InstancedMesh(hingeGeo, materials.hingeMetal, hingeCount);
  hingeInstanced.castShadow = !isSoftwareGl;
  dividerGroup.add(hingeInstanced);

  const footGeo = createBeveledFootGeometry();
  const leftFoot = new THREE.Mesh(footGeo, materials.foot);
  leftFoot.castShadow = !isSoftwareGl;
  leftFoot.receiveShadow = !isSoftwareGl;
  dividerGroup.add(leftFoot);

  const rightFoot = new THREE.Mesh(footGeo, materials.foot);
  rightFoot.castShadow = !isSoftwareGl;
  rightFoot.receiveShadow = !isSoftwareGl;
  dividerGroup.add(rightFoot);

  const glideGeo = new THREE.BoxGeometry(
    FOLD_CONSTANTS.footWidth * 0.72,
    0.0025,
    FOLD_CONSTANTS.footDepth * 0.85,
  );
  const leftGlide = new THREE.Mesh(glideGeo, materials.glide);
  const rightGlide = new THREE.Mesh(glideGeo, materials.glide);
  dividerGroup.add(leftGlide);
  dividerGroup.add(rightGlide);

  const shadowGeo = new THREE.PlaneGeometry(1, 1);
  shadowGeo.rotateX(-Math.PI / 2);
  const contactShadowMesh = new THREE.Mesh(shadowGeo, materials.contactShadow);
  contactShadowMesh.position.y = -FOLD_CONSTANTS.footHeight + 0.0015;
  dividerGroup.add(contactShadowMesh);

  const N = FOLD_CONSTANTS.panels;
  const currentPanelOpenings = new Float32Array(N);
  const targetPanelOpenings = new Float32Array(N);
  for (let i = 0; i < N; i += 1) {
    const val = normalizeOpening(
      initialPanelOpenings && i < initialPanelOpenings.length
        ? initialPanelOpenings[i]
        : initialDesign.opening,
    );
    currentPanelOpenings[i] = val;
    targetPanelOpenings[i] = val;
  }

  let currentYawDeg = normalizeYawDeg(initialView.yawDeg);
  let targetYawDeg = currentYawDeg;
  let currentElevDeg = normalizeElevationDeg(initialView.elevationDeg);
  let targetElevDeg = currentElevDeg;

  let targetParallaxNx = 0;
  let targetParallaxNy = 0;
  let currentParallaxNx = 0;
  let currentParallaxNy = 0;
  let targetHovered = false;
  let targetGlintIntensity = 0;

  let currentSlotRect: StageSlotRect | null = initialSlotRect;
  const getEffectiveSlotAspect = (): number =>
    atelierFraming && currentSlotRect && currentSlotRect.width >= 4 && currentSlotRect.height >= 4
      ? currentSlotRect.width / currentSlotRect.height
      : lastRenderW / lastRenderH;

  let currentAspect = getEffectiveSlotAspect();
  const applyCameraProjection = () => {
    camera.aspect = lastRenderW / lastRenderH;
    if (
      atelierFraming &&
      currentSlotRect &&
      currentSlotRect.width >= 4 &&
      currentSlotRect.height >= 4
    ) {
      const vo = computeFullBleedViewOffset(lastRenderW, lastRenderH, currentSlotRect);
      camera.setViewOffset(
        vo.fullWidth,
        vo.fullHeight,
        vo.offsetX,
        vo.offsetY,
        vo.width,
        vo.height,
      );
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  };

  const getMeanOpening = (arr: ArrayLike<number>): number => {
    let sum = 0;
    for (let i = 0; i < N; i += 1) sum += arr[i];
    return sum / N;
  };
  const computeTargetCamDist = (): number =>
    atelierFraming
      ? computeAtelierCameraDistance(getMeanOpening(currentPanelOpenings), currentAspect)
      : computeCameraDistance(
          { yawDeg: currentYawDeg, elevationDeg: currentElevDeg },
          currentAspect,
          fitPadding,
        );

  let targetCamDist = computeTargetCamDist();
  let currentCamDist = targetCamDist;

  let lastTextureKey = `${initialDesign.baseHex}|${initialDesign.designHex}|${initialDesign.print}|${initialDesign.motifScale}|${Boolean(initialDesign.tintUpload)}|${getBitmapKey(initialUpload)}`;
  let lastOpeningTarget = normalizeOpening(initialDesign.opening);

  let disposed = false;
  let active = true;
  let firstFrameReported = false;
  let renderBusy = false;
  let renderDirty = false;
  let rafId = 0;
  let pollTimeoutId = 0;
  let lastTime = performance.now();

  const applyChainPose = (openings: ArrayLike<number>) => {
    const pose = deriveFoldChain(openings as number[]);
    updateRibbonGeometry(ribbonGeo, pose);
    updateCreaseLineGeometry(creaseGeo, pose);
    updateHingeInstances(hingeInstanced, pose);

    const [f0, f1] = pose.feetCenters;
    leftFoot.position.set(f0.x, 0, f0.z);
    rightFoot.position.set(f1.x, 0, f1.z);

    leftGlide.position.set(f0.x, -FOLD_CONSTANTS.footHeight - 0.0008, f0.z);
    rightGlide.position.set(f1.x, -FOLD_CONSTANTS.footHeight - 0.0008, f1.z);

    contactShadowMesh.scale.set(
      pose.metrics.outerSpan + 0.56,
      1,
      Math.max(0.72, pose.metrics.outerDepth + 0.48),
    );

    targetCamDist = computeTargetCamDist();
  };

  const applyCamera = () => {
    const yawWithParallax = currentYawDeg + currentParallaxNx * 2.2;
    const elevWithParallax = clampElevation(currentElevDeg + currentParallaxNy * 1.1);
    const dir = viewDirectionFromAngles({
      yawDeg: yawWithParallax,
      elevationDeg: elevWithParallax,
    });
    _camDir.set(dir[0], dir[1], dir[2]).normalize();
    camera.position.copy(_camDir).multiplyScalar(currentCamDist).add(_targetVec);
    camera.lookAt(_targetVec);
  };

  function clampElevation(e: number): number {
    return Math.max(FOLD_CONSTANTS.minElevationDeg, Math.min(FOLD_CONSTANTS.maxElevationDeg, e));
  }

  applyCameraProjection();
  applyChainPose(currentPanelOpenings);
  targetCamDist = computeTargetCamDist();
  currentCamDist = targetCamDist;
  applyCamera();

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  function afterDraw(cb: () => void) {
    try {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          pollTimeoutId = window.setTimeout(poll, 4);
        } else {
          if (sync) gl.deleteSync(sync);
          cb();
        }
      };
      pollTimeoutId = window.setTimeout(poll, 0);
    } catch {
      pollTimeoutId = window.setTimeout(cb, 0);
    }
  }

  function stepAnimation(dt: number): boolean {
    let needsMore = false;

    // 1. Coupled panel chain damping (allows smooth blending if user interrupts an unfold wave)
    let poseDirty = false;
    for (let i = 0; i < N; i += 1) {
      const diff = Math.abs(currentPanelOpenings[i] - targetPanelOpenings[i]);
      if (diff > 0.02) {
        if (isSoftwareGl) {
          currentPanelOpenings[i] = targetPanelOpenings[i];
        } else {
          const next = damp(currentPanelOpenings[i], targetPanelOpenings[i], 13, dt);
          if (Math.abs(next - targetPanelOpenings[i]) <= 0.02) {
            currentPanelOpenings[i] = targetPanelOpenings[i];
          } else {
            currentPanelOpenings[i] = next;
            needsMore = true;
          }
        }
        poseDirty = true;
      }
    }
    if (poseDirty) {
      applyChainPose(currentPanelOpenings);
    }

    // 2. Camera orbit & subtle pointer parallax damping
    const yawDiff = Math.abs((((targetYawDeg - currentYawDeg) % 360) + 540) % 360 - 180);
    const elevDiff = Math.abs(targetElevDeg - currentElevDeg);
    const pxDiff = Math.abs(targetParallaxNx - currentParallaxNx);
    const pyDiff = Math.abs(targetParallaxNy - currentParallaxNy);
    let camDirty = false;

    if (yawDiff > 0.05 || elevDiff > 0.05) {
      if (isSoftwareGl) {
        currentYawDeg = targetYawDeg;
        currentElevDeg = targetElevDeg;
      } else {
        const t = 1 - Math.exp(-10 * dt);
        currentYawDeg = stepAngleShortestArc(currentYawDeg, targetYawDeg, t);
        currentElevDeg = damp(currentElevDeg, targetElevDeg, 10, dt);
        if (
          Math.abs((((targetYawDeg - currentYawDeg) % 360) + 540) % 360 - 180) <= 0.05 &&
          Math.abs(targetElevDeg - currentElevDeg) <= 0.05
        ) {
          currentYawDeg = targetYawDeg;
          currentElevDeg = targetElevDeg;
        } else {
          needsMore = true;
        }
      }
      camDirty = true;
    }

    if (!isSoftwareGl && (pxDiff > 0.005 || pyDiff > 0.005)) {
      currentParallaxNx = damp(currentParallaxNx, targetParallaxNx, 6, dt);
      currentParallaxNy = damp(currentParallaxNy, targetParallaxNy, 6, dt);
      if (
        Math.abs(targetParallaxNx - currentParallaxNx) <= 0.005 &&
        Math.abs(targetParallaxNy - currentParallaxNy) <= 0.005
      ) {
        currentParallaxNx = targetParallaxNx;
        currentParallaxNy = targetParallaxNy;
      } else {
        needsMore = true;
      }
      camDirty = true;
    }

    if (Math.abs(targetCamDist - currentCamDist) > 0.004) {
      if (isSoftwareGl) {
        currentCamDist = targetCamDist;
      } else {
        currentCamDist = damp(currentCamDist, targetCamDist, 9, dt);
        if (Math.abs(targetCamDist - currentCamDist) <= 0.004) {
          currentCamDist = targetCamDist;
        } else {
          needsMore = true;
        }
      }
      camDirty = true;
    }

    if (camDirty) {
      applyCamera();
    }

    // 3. Smooth material color/print cross-wash & hover sheen
    if (materials.stepTransition(dt)) {
      needsMore = true;
    }
    if (!isSoftwareGl && materials.setHoverHighlight(targetHovered, dt)) {
      needsMore = true;
    }

    const rimTarget = targetHovered ? 0.42 : 0.28;
    if (!isSoftwareGl && Math.abs(rimLight.intensity - rimTarget) > 0.01) {
      rimLight.intensity = damp(rimLight.intensity, rimTarget, 8, dt);
      needsMore = true;
    } else {
      rimLight.intensity = rimTarget;
    }

    if (Math.abs(glintLight.intensity - targetGlintIntensity) > 0.01) {
      glintLight.intensity = isSoftwareGl
        ? targetGlintIntensity
        : damp(glintLight.intensity, targetGlintIntensity, 8, dt);
      if (Math.abs(glintLight.intensity - targetGlintIntensity) <= 0.01) {
        glintLight.intensity = targetGlintIntensity;
      } else {
        needsMore = true;
      }
    }

    // 4. Smoothly harmonize Three.js lighting and shadow tint with the 2.5D architectural room
    if (lightingColorDirty) {
      if (isSoftwareGl) {
        hemiLight.color.copy(targetHemiSkyColor);
        hemiLight.groundColor.copy(targetHemiGroundColor);
        keyLight.color.copy(targetKeyColor);
        backFillLight.color.copy(targetFillColor);
        rimLight.color.copy(targetRimColor);
        materials.floor.color.copy(targetShadowColor);
        materials.contactShadow.color.copy(targetShadowColor);
        materials.floor.opacity = targetFloorShadowOpacity;
        materials.contactShadow.opacity = targetContactShadowOpacity;
        lightingColorDirty = false;
      } else {
        const k = 1 - Math.exp(-5.4 * dt);
        hemiLight.color.lerp(targetHemiSkyColor, k);
        hemiLight.groundColor.lerp(targetHemiGroundColor, k);
        keyLight.color.lerp(targetKeyColor, k);
        backFillLight.color.lerp(targetFillColor, k);
        rimLight.color.lerp(targetRimColor, k);
        materials.floor.color.lerp(targetShadowColor, k);
        materials.contactShadow.color.lerp(targetShadowColor, k);
        materials.floor.opacity = damp(materials.floor.opacity, targetFloorShadowOpacity, 5.4, dt);
        materials.contactShadow.opacity = damp(materials.contactShadow.opacity, targetContactShadowOpacity, 5.4, dt);

        const residual =
          Math.abs(keyLight.color.r - targetKeyColor.r) +
          Math.abs(keyLight.color.g - targetKeyColor.g) +
          Math.abs(keyLight.color.b - targetKeyColor.b) +
          Math.abs(hemiLight.groundColor.r - targetHemiGroundColor.r) +
          Math.abs(materials.contactShadow.color.r - targetShadowColor.r);

        if (residual < 0.004) {
          hemiLight.color.copy(targetHemiSkyColor);
          hemiLight.groundColor.copy(targetHemiGroundColor);
          keyLight.color.copy(targetKeyColor);
          backFillLight.color.copy(targetFillColor);
          rimLight.color.copy(targetRimColor);
          materials.floor.color.copy(targetShadowColor);
          materials.contactShadow.color.copy(targetShadowColor);
          materials.floor.opacity = targetFloorShadowOpacity;
          materials.contactShadow.opacity = targetContactShadowOpacity;
          lightingColorDirty = false;
        } else {
          needsMore = true;
        }
      }
    }

    return needsMore;
  }

  function drawFrame() {
    if (disposed) return;
    renderer.render(scene, camera);
    if (!firstFrameReported) {
      firstFrameReported = true;
      onFirstFrame?.();
    }
  }

  function requestRender() {
    if (disposed || !active) return;
    if (renderBusy) {
      renderDirty = true;
      return;
    }
    renderBusy = true;
    rafId = requestAnimationFrame((now) => {
      if (disposed) {
        renderBusy = false;
        return;
      }
      renderDirty = false;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const more = stepAnimation(dt);
      drawFrame();

      const done = () => {
        renderBusy = false;
        if (!disposed && active && (more || renderDirty)) {
          requestRender();
        }
      };

      if (isSoftwareGl) {
        afterDraw(done);
      } else {
        done();
      }
    });
  }

  const handleContextLost = (e: Event) => {
    e.preventDefault();
    if (!disposed) {
      onContextLost?.();
    }
  };
  canvas.addEventListener('webglcontextlost', handleContextLost);

  requestRender();

  return {
    setPose(opening: number, immediate = false) {
      const clamped = normalizeOpening(opening);
      for (let i = 0; i < N; i += 1) {
        targetPanelOpenings[i] = clamped;
        if (immediate) {
          currentPanelOpenings[i] = clamped;
        }
      }
      targetGlintIntensity = 0;
      if (immediate) {
        applyChainPose(currentPanelOpenings);
      }
      requestRender();
    },

    setChainPose(panelOpenings: readonly number[], glintProgress = 1) {
      for (let i = 0; i < N; i += 1) {
        const val = normalizeOpening(
          i < panelOpenings.length ? panelOpenings[i] : FOLD_CONSTANTS.defaultOpening,
        );
        currentPanelOpenings[i] = val;
        targetPanelOpenings[i] = val;
      }
      if (glintProgress > 0 && glintProgress < 0.99) {
        glintLight.position.x = -0.55 + glintProgress * 1.1;
        glintLight.position.z = 0.55;
        targetGlintIntensity = Math.sin(glintProgress * Math.PI) * 0.72;
        glintLight.intensity = targetGlintIntensity;
      } else {
        targetGlintIntensity = 0;
        glintLight.intensity = 0;
      }
      applyChainPose(currentPanelOpenings);
      requestRender();
    },

    setDesign(
      design: DesignState,
      uploadedBitmap: ImageBitmap | null,
      immediate = false,
    ) {
      const nextTexKey = `${design.baseHex}|${design.designHex}|${design.print}|${design.motifScale}|${Boolean(design.tintUpload)}|${getBitmapKey(uploadedBitmap)}`;
      if (nextTexKey !== lastTextureKey) {
        lastTextureKey = nextTexKey;
        materials.updateDesign(design, uploadedBitmap, !immediate && !isSoftwareGl);
      }
      const clamped = normalizeOpening(design.opening);
      if (immediate || Math.abs(clamped - lastOpeningTarget) > 0.001) {
        lastOpeningTarget = clamped;
        for (let i = 0; i < N; i += 1) {
          targetPanelOpenings[i] = clamped;
          if (immediate) {
            currentPanelOpenings[i] = clamped;
          }
        }
        if (immediate) {
          applyChainPose(currentPanelOpenings);
        }
      }
      requestRender();
    },

    setViewAngles(view: ViewState, immediate = false) {
      targetYawDeg = normalizeYawDeg(view.yawDeg);
      targetElevDeg = normalizeElevationDeg(view.elevationDeg);
      if (immediate) {
        currentYawDeg = targetYawDeg;
        currentElevDeg = targetElevDeg;
        applyCamera();
      }
      requestRender();
    },

    setPointerParallax(nx: number, ny: number) {
      if (isSoftwareGl || isCoarsePointer) return;
      targetParallaxNx = Math.max(-1, Math.min(1, nx));
      targetParallaxNy = Math.max(-1, Math.min(1, ny));
      requestRender();
    },

    setHovered(hovered: boolean) {
      if (targetHovered === hovered) return;
      targetHovered = hovered;
      requestRender();
    },

    setRoomLighting(lighting: RoomLightingState, immediate = false) {
      applyRoomLightingTargets(lighting, immediate || isSoftwareGl);
      requestRender();
    },

    resize(width: number, height: number, slotRect?: StageSlotRect | null) {
      if (disposed || width < 4 || height < 4) return;
      const rw = Math.round(width);
      const rh = Math.round(height);
      const nextSlot =
        slotRect && slotRect.width >= 4 && slotRect.height >= 4 ? slotRect : null;
      const slotChanged =
        (nextSlot === null) !== (currentSlotRect === null) ||
        (nextSlot !== null &&
          currentSlotRect !== null &&
          (Math.abs(nextSlot.x - currentSlotRect.x) >= 0.5 ||
            Math.abs(nextSlot.y - currentSlotRect.y) >= 0.5 ||
            Math.abs(nextSlot.width - currentSlotRect.width) >= 0.5 ||
            Math.abs(nextSlot.height - currentSlotRect.height) >= 0.5));
      if (rw === lastRenderW && rh === lastRenderH && !slotChanged) return;
      lastRenderW = rw;
      lastRenderH = rh;
      currentSlotRect = nextSlot;
      currentAspect = getEffectiveSlotAspect();
      applyCameraProjection();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      renderer.setSize(rw, rh, false);
      targetCamDist = computeTargetCamDist();
      currentCamDist = targetCamDist;
      applyCamera();
      drawFrame();
      requestRender();
    },

    setActive(nextActive: boolean) {
      active = nextActive;
      if (active && !disposed) {
        lastTime = performance.now();
        requestRender();
      }
    },

    renderOnce() {
      if (disposed) return;
      applyChainPose(currentPanelOpenings);
      currentYawDeg = targetYawDeg;
      currentElevDeg = targetElevDeg;
      targetCamDist = computeTargetCamDist();
      currentCamDist = targetCamDist;
      applyCamera();
      drawFrame();
    },

    getStats() {
      return {
        triangles: renderer.info.render.triangles,
        calls: renderer.info.render.calls,
      };
    },

    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(pollTimeoutId);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      ribbonGeo.dispose();
      creaseGeo.dispose();
      hingeGeo.dispose();
      footGeo.dispose();
      glideGeo.dispose();
      floorGeo.dispose();
      floorGlowGeo.dispose();
      shadowGeo.dispose();
      envTex.dispose();
      materials.dispose();
      renderer.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    },
  };
}
