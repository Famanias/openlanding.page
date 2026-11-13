import { FOLD_CONSTANTS, VIEW_PRESETS, ViewId, ViewState } from './config';
import { computePanelUVSpan, deriveFold, FoldPose } from './geometry';
import { viewDirectionFromAngles } from './state';

export interface ProjectedPoint {
  x: number;
  y: number;
  zCam: number;
}

export interface ProjectedFace {
  points: { x: number; y: number }[];
  uvs?: { u: number; v: number }[];
  depth: number;
  shade: number; // 0..1 relative luminance factor for front/back/top/cap shading
  kind: 'felt' | 'top' | 'cap' | 'foot';
}

export interface ProjectedFoldResult {
  faces: ProjectedFace[];
  spanBracket: {
    visible: boolean;
    leftX: number;
    rightX: number;
    y: number;
  };
  shadowEllipse: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
  };
}

export interface StageSlotRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FullBleedViewOffset {
  fullWidth: number;
  fullHeight: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export interface ShadowCameraFrustum {
  left: number;
  right: number;
  bottom: number;
  top: number;
  near: number;
  far: number;
  maxProjectedNdc: number;
}

export interface Vec3Point {
  x: number;
  y: number;
  z: number;
}

type Vec3 = Vec3Point;

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export interface CameraBasis {
  position: Vec3;
  target: Vec3;
  right: Vec3;
  up: Vec3;
  forward: Vec3;
  tanHalfFovY: number;
  aspect: number;
}

const TARGET: Vec3 = { x: 0, y: FOLD_CONSTANTS.height * 0.5, z: 0 };

function resolveViewState(view: ViewState | ViewId): ViewState {
  if (typeof view === 'string') {
    const preset = VIEW_PRESETS[view];
    return { yawDeg: preset.yawDeg, elevationDeg: preset.elevationDeg };
  }
  return view;
}

/**
 * Computes a constant camera distance for a given stage aspect ratio that encloses the
 * maximum-open (100%) and maximum-closed (0% depth + steel feet) divider across ALL 360° yaw
 * angles and elevation bounds [5°..30°] so rotating or opening never triggers zoom jumps or clipping.
 */
export function computeCameraDistance(
  _view: ViewState | ViewId,
  aspect: number,
  fitPadding: number = FOLD_CONSTANTS.cameraFitPadding,
): number {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);
  const tanHalfFovX = tanHalfFovY * safeAspect;

  const openPose = deriveFold(100);
  const closedPose = deriveFold(0);

  const halfX = Math.max(openPose.metrics.outerSpan, closedPose.metrics.outerSpan) * 0.5;
  const halfZ = Math.max(
    openPose.metrics.outerDepth * 0.5,
    closedPose.metrics.outerDepth * 0.5,
    FOLD_CONSTANTS.footDepth * 0.5 + 0.06,
  );
  const minY = -FOLD_CONSTANTS.footHeight;
  const maxY = FOLD_CONSTANTS.height;
  const maxHalfY = Math.max(Math.abs(maxY - TARGET.y), Math.abs(minY - TARGET.y));

  // Sample worst-case yaw & elevation bounds over full 360° rotation so distance stays invariant during orbit
  const corners: Vec3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [minY, maxY]) {
      for (const sz of [-1, 1]) {
        corners.push({ x: sx * halfX, y: sy, z: sz * halfZ });
      }
    }
  }

  let requiredDist = 2.55;
  const padding = fitPadding;

  for (let yaw = 0; yaw < 360; yaw += 30) {
    for (const elev of [FOLD_CONSTANTS.minElevationDeg, 18, FOLD_CONSTANTS.maxElevationDeg]) {
      const dirArr = viewDirectionFromAngles({ yawDeg: yaw, elevationDeg: elev });
      const dir = normalize({ x: dirArr[0], y: dirArr[1], z: dirArr[2] });
      const worldUp: Vec3 = { x: 0, y: 1, z: 0 };
      const right = normalize(cross(worldUp, dir));
      const camUp = cross(dir, right);

      for (const corner of corners) {
        const rel = sub(corner, TARGET);
        const rx = Math.abs(dot(rel, right));
        const ry = Math.abs(dot(rel, camUp));
        const rz = dot(rel, dir);

        const distForX = (rx * padding) / tanHalfFovX + rz;
        const distForY = (ry * padding) / tanHalfFovY + rz;
        requiredDist = Math.max(requiredDist, distForX, distForY);
      }
    }
  }

  // Ensure vertical presence meets ~72-78% target when container aspect allows it
  const minVerticalDist = (maxHalfY * padding) / tanHalfFovY;
  return Math.max(requiredDist, minVerticalDist);
}

/**
 * Hero atelier camera framing: keeps the divider dramatically tall (~74-82% of stage height)
 * across gathered..default openings while smoothly easing distance outward only at wide (>65%)
 * openings so full 360° orbit and 100% extension never clip horizontally.
 */
export function computeAtelierCameraDistance(openingInput: number, aspect: number): number {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);
  const tanHalfFovX = tanHalfFovY * safeAspect;

  const pose = deriveFold(Math.max(50, openingInput));
  const halfX = pose.metrics.outerSpan * 0.5;
  const halfZ = Math.max(pose.metrics.outerDepth * 0.5, FOLD_CONSTANTS.footDepth * 0.5 + 0.06);

  // Target ~72-86% apparent projected height across Front..Three-quarter elevations without clipping slot bottom
  const verticalHeight = FOLD_CONSTANTS.height + FOLD_CONSTANTS.footHeight;
  const targetVerticalDist = (verticalHeight * 0.5) / (0.72 * tanHalfFovY);

  // Ensure horizontal width fits cleanly across 360° yaw with generous margin
  const maxProjRadius = Math.hypot(halfX, halfZ);
  const horizontalDist = (maxProjRadius * 1.06) / tanHalfFovX + halfZ * 0.35;

  return Math.max(targetVerticalDist, horizontalDist);
}

export function buildCameraBasis(
  view: ViewState | ViewId,
  aspect: number,
  atelierOpening?: number,
): CameraBasis {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);

  const resolved = resolveViewState(view);
  const dirArr = viewDirectionFromAngles(resolved);
  const forwardToCamera = normalize({ x: dirArr[0], y: dirArr[1], z: dirArr[2] });
  const dist =
    atelierOpening !== undefined
      ? computeAtelierCameraDistance(atelierOpening, safeAspect)
      : computeCameraDistance(resolved, safeAspect);
  const position: Vec3 = {
    x: TARGET.x + forwardToCamera.x * dist,
    y: TARGET.y + forwardToCamera.y * dist,
    z: TARGET.z + forwardToCamera.z * dist,
  };

  const forward = normalize(sub(TARGET, position));
  const right = normalize(cross(forward, { x: 0, y: 1, z: 0 }));
  const up = cross(right, forward);

  return {
    position,
    target: TARGET,
    right,
    up,
    forward,
    tanHalfFovY,
    aspect: safeAspect,
  };
}

/**
 * Computes Three.js `PerspectiveCamera.setViewOffset` parameters so a full-bleed
 * `(fullWidth, fullHeight)` canvas renders an unclipped scene while framing the
 * divider centered inside `slot` with exact pixel scale matching `slot.height`.
 */
export function computeFullBleedViewOffset(
  fullWidth: number,
  fullHeight: number,
  slot: StageSlotRect,
): FullBleedViewOffset {
  const safeFullW = Math.max(1, fullWidth);
  const safeFullH = Math.max(1, fullHeight);
  const safeSlotW = Math.max(1, slot.width);
  const safeSlotH = Math.max(1, slot.height);
  const scale = safeFullH / safeSlotH;
  const slotCenterX = slot.x + safeSlotW * 0.5;
  const slotCenterY = slot.y + safeSlotH * 0.5;

  return {
    fullWidth: safeFullW,
    fullHeight: safeFullH,
    offsetX: safeFullW * 0.5 - slotCenterX * scale,
    offsetY: safeFullH * 0.5 - slotCenterY * scale,
    width: safeFullW * scale,
    height: safeFullH * scale,
  };
}

/**
 * Computes light-space orthographic bounds enclosing the divider's full range
 * (0%..100% openings) AND every corner's projected floor shadow along the key
 * directional light ray so shadows never clip inside the shadow map frustum.
 */
export function computeShadowCameraFrustum(
  lightPos: Vec3Point,
  targetPos: Vec3Point,
  margin = 0.65,
): ShadowCameraFrustum {
  const openPose = deriveFold(100);
  const closedPose = deriveFold(0);

  const halfX = Math.max(openPose.metrics.outerSpan, closedPose.metrics.outerSpan) * 0.5 + 0.04;
  const halfZ =
    Math.max(
      openPose.metrics.outerDepth * 0.5,
      closedPose.metrics.outerDepth * 0.5,
      FOLD_CONSTANTS.footDepth * 0.5,
    ) + 0.04;
  const floorY = -FOLD_CONSTANTS.footHeight;
  const maxY = FOLD_CONSTANTS.height + 0.02;

  const rayDir = normalize(sub(targetPos, lightPos));
  const downFactor = Math.max(0.05, -rayDir.y);

  // Match Three.js Matrix4.lookAt(lightPos, targetPos, +Y) camera basis
  const zAxis = normalize(sub(lightPos, targetPos));
  const xAxis = normalize(cross({ x: 0, y: 1, z: 0 }, zAxis));
  const yAxis = cross(zAxis, xAxis);

  const points: Vec3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [floorY, maxY]) {
      for (const sz of [-1, 1]) {
        const px = sx * halfX;
        const py = sy;
        const pz = sz * halfZ;
        points.push({ x: px, y: py, z: pz });

        // Floor shadow landing point for this divider bounding corner
        const t = Math.max(0, (py - floorY) / downFactor);
        points.push({
          x: px + rayDir.x * t,
          y: floorY,
          z: pz + rayDir.z * t,
        });
      }
    }
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxYCam = -Infinity;
  let minDist = Infinity;
  let maxDist = -Infinity;

  for (const p of points) {
    const rel = sub(p, lightPos);
    const lx = dot(rel, xAxis);
    const ly = dot(rel, yAxis);
    const dist = -dot(rel, zAxis); // positive distance forward from lightPos
    minX = Math.min(minX, lx);
    maxX = Math.max(maxX, lx);
    minY = Math.min(minY, ly);
    maxYCam = Math.max(maxYCam, ly);
    minDist = Math.min(minDist, dist);
    maxDist = Math.max(maxDist, dist);
  }

  const left = minX - margin;
  const right = maxX + margin;
  const bottom = minY - margin;
  const top = maxYCam + margin;
  const near = Math.max(0.5, minDist - 0.8);
  const far = maxDist + 1.4;

  const halfW = (right - left) * 0.5;
  const halfH = (top - bottom) * 0.5;
  const centerX = (left + right) * 0.5;
  const centerY = (bottom + top) * 0.5;
  const halfD = (far - near) * 0.5;
  const centerD = (near + far) * 0.5;

  let maxProjectedNdc = 0;
  for (const p of points) {
    const rel = sub(p, lightPos);
    const lx = dot(rel, xAxis);
    const ly = dot(rel, yAxis);
    const dist = -dot(rel, zAxis);
    const nx = Math.abs((lx - centerX) / halfW);
    const ny = Math.abs((ly - centerY) / halfH);
    const nz = Math.abs((dist - centerD) / halfD);
    maxProjectedNdc = Math.max(maxProjectedNdc, nx, ny, nz);
  }

  return {
    left,
    right,
    bottom,
    top,
    near,
    far,
    maxProjectedNdc,
  };
}

function projectPoint(
  p: Vec3,
  cam: CameraBasis,
  viewportW: number,
  viewportH: number,
  slotRect?: StageSlotRect,
): ProjectedPoint {
  const rel = sub(p, cam.position);
  const xCam = dot(rel, cam.right);
  const yCam = dot(rel, cam.up);
  const zCam = dot(rel, cam.forward);
  const safeZ = Math.max(0.05, zCam);

  const ndcY = yCam / (safeZ * cam.tanHalfFovY);
  const ndcX = xCam / (safeZ * cam.tanHalfFovY * cam.aspect);

  if (slotRect && slotRect.width >= 4 && slotRect.height >= 4) {
    return {
      x: slotRect.x + (ndcX * 0.5 + 0.5) * slotRect.width,
      y: slotRect.y + (0.5 - ndcY * 0.5) * slotRect.height,
      zCam,
    };
  }

  return {
    x: (ndcX * 0.5 + 0.5) * viewportW,
    y: (0.5 - ndcY * 0.5) * viewportH,
    zCam,
  };
}

const KEY_LIGHT = normalize({ x: -0.52, y: 0.72, z: 0.45 });

function computeFaceShade(p0: Vec3, p1: Vec3, p2: Vec3): number {
  const e1 = sub(p1, p0);
  const e2 = sub(p2, p0);
  const n = normalize(cross(e1, e2));
  // Soft two-sided studio fill so both sides of Fold 16 read with dimensional pleats
  const key = Math.max(0, dot(n, KEY_LIGHT));
  const backFill = Math.max(0, dot(n, { x: 0.48, y: 0.45, z: -0.75 })) * 0.65;
  return Math.min(1, 0.58 + 0.42 * Math.max(key, backFill));
}

export function projectFold(
  pose: FoldPose,
  view: ViewState | ViewId,
  aspect: number,
  viewportW = 900,
  viewportH = 640,
  atelierOpening?: number,
  slotRect?: StageSlotRect,
): ProjectedFoldResult {
  const resolved = resolveViewState(view);
  const effectiveAspect =
    slotRect && slotRect.width >= 4 && slotRect.height >= 4
      ? slotRect.width / slotRect.height
      : aspect;
  const cam = buildCameraBasis(resolved, effectiveAspect, atelierOpening);
  const H = FOLD_CONSTANTS.height;
  const N = FOLD_CONSTANTS.panels;

  const faces: ProjectedFace[] = [];

  const pushQuad = (
    a: Vec3,
    b: Vec3,
    c: Vec3,
    d: Vec3,
    kind: ProjectedFace['kind'],
    fixedShade?: number,
    uvs?: { u: number; v: number }[],
  ) => {
    const e1 = sub(b, a);
    const e2 = sub(c, a);
    const normal = cross(e1, e2);
    const center: Vec3 = {
      x: (a.x + b.x + c.x + d.x) * 0.25,
      y: (a.y + b.y + c.y + d.y) * 0.25,
      z: (a.z + b.z + c.z + d.z) * 0.25,
    };
    const toCam = sub(cam.position, center);
    if (dot(normal, toCam) <= 0) return;

    const pa = projectPoint(a, cam, viewportW, viewportH, slotRect);
    const pb = projectPoint(b, cam, viewportW, viewportH, slotRect);
    const pc = projectPoint(c, cam, viewportW, viewportH, slotRect);
    const pd = projectPoint(d, cam, viewportW, viewportH, slotRect);

    faces.push({
      points: [
        { x: pa.x, y: pa.y },
        { x: pb.x, y: pb.y },
        { x: pc.x, y: pc.y },
        { x: pd.x, y: pd.y },
      ],
      uvs,
      depth: (pa.zCam + pb.zCam + pc.zCam + pd.zCam) * 0.25,
      shade: fixedShade ?? computeFaceShade(a, b, c),
      kind,
    });
  };

  // Two oxblood steel feet beneath first and last panel midpoints
  const fw = FOLD_CONSTANTS.footWidth * 0.5;
  const fd = FOLD_CONSTANTS.footDepth * 0.5;
  const fh = FOLD_CONSTANTS.footHeight;

  for (const center of pose.feetCenters) {
    const x0 = center.x - fw;
    const x1 = center.x + fw;
    const z0 = center.z - fd;
    const z1 = center.z + fd;
    const y0 = -fh;
    const y1 = 0;

    pushQuad(
      { x: x0, y: y1, z: z1 },
      { x: x1, y: y1, z: z1 },
      { x: x1, y: y1, z: z0 },
      { x: x0, y: y1, z: z0 },
      'foot',
      0.85,
    );
    pushQuad(
      { x: x0, y: y0, z: z1 },
      { x: x1, y: y0, z: z1 },
      { x: x1, y: y1, z: z1 },
      { x: x0, y: y1, z: z1 },
      'foot',
      0.7,
    );
    pushQuad(
      { x: x1, y: y0, z: z0 },
      { x: x0, y: y0, z: z0 },
      { x: x0, y: y1, z: z0 },
      { x: x1, y: y1, z: z0 },
      'foot',
      0.55,
    );
    pushQuad(
      { x: x0, y: y0, z: z0 },
      { x: x0, y: y0, z: z1 },
      { x: x0, y: y1, z: z1 },
      { x: x0, y: y1, z: z0 },
      'foot',
      0.62,
    );
    pushQuad(
      { x: x1, y: y0, z: z1 },
      { x: x1, y: y0, z: z0 },
      { x: x1, y: y1, z: z0 },
      { x: x1, y: y1, z: z1 },
      'foot',
      0.78,
    );
  }

  // Ribbon panels with continuous developed UVs (v = 0 at top edge, v = 1 at floor in Canvas 2D Y-down)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];

    const frontUV = computePanelUVSpan(j, 'front', N);
    const backUV = computePanelUVSpan(j, 'back', N);

    // Front face (+Z)
    pushQuad(
      { x: f0.x, y: 0, z: f0.z },
      { x: f1.x, y: 0, z: f1.z },
      { x: f1.x, y: H, z: f1.z },
      { x: f0.x, y: H, z: f0.z },
      'felt',
      undefined,
      [
        { u: frontUV.uStart, v: 1 },
        { u: frontUV.uEnd, v: 1 },
        { u: frontUV.uEnd, v: 0 },
        { u: frontUV.uStart, v: 0 },
      ],
    );

    // Back face (-Z), ordered left-to-right from back viewpoint (uBack = 1 - uFront)
    pushQuad(
      { x: b1.x, y: 0, z: b1.z },
      { x: b0.x, y: 0, z: b0.z },
      { x: b0.x, y: H, z: b0.z },
      { x: b1.x, y: H, z: b1.z },
      'felt',
      undefined,
      [
        { u: backUV.uStart, v: 1 },
        { u: backUV.uEnd, v: 1 },
        { u: backUV.uEnd, v: 0 },
        { u: backUV.uStart, v: 0 },
      ],
    );

    // Top thickness cap
    pushQuad(
      { x: f0.x, y: H, z: f0.z },
      { x: f1.x, y: H, z: f1.z },
      { x: b1.x, y: H, z: b1.z },
      { x: b0.x, y: H, z: b0.z },
      'top',
      0.96,
    );
  }

  // Left and right end caps (stay solid base felt color)
  pushQuad(
    { x: pose.back[0].x, y: 0, z: pose.back[0].z },
    { x: pose.front[0].x, y: 0, z: pose.front[0].z },
    { x: pose.front[0].x, y: H, z: pose.front[0].z },
    { x: pose.back[0].x, y: H, z: pose.back[0].z },
    'cap',
    0.72,
  );
  pushQuad(
    { x: pose.front[N].x, y: 0, z: pose.front[N].z },
    { x: pose.back[N].x, y: 0, z: pose.back[N].z },
    { x: pose.back[N].x, y: H, z: pose.back[N].z },
    { x: pose.front[N].x, y: H, z: pose.front[N].z },
    'cap',
    0.8,
  );

  // Painter's algorithm back-to-front
  faces.sort((a, b) => b.depth - a.depth);

  // Span bracket projection
  const leftEnd = projectPoint(
    { x: -pose.metrics.outerSpan * 0.5, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );
  const rightEnd = projectPoint(
    { x: pose.metrics.outerSpan * 0.5, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );
  const centerFloor = projectPoint(
    { x: 0, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );

  const rx = Math.max(26, Math.abs(rightEnd.x - leftEnd.x) * 0.54);
  const nearSide = Math.abs(Math.sin((resolved.yawDeg * Math.PI) / 180)) > 0.85;
  const ry = Math.max(8, nearSide ? 24 : 16);

  return {
    faces,
    spanBracket: {
      visible: !nearSide && Math.abs(rightEnd.x - leftEnd.x) > 36,
      leftX: Math.min(leftEnd.x, rightEnd.x),
      rightX: Math.max(leftEnd.x, rightEnd.x),
      y: Math.max(leftEnd.y, rightEnd.y) + 18,
    },
    shadowEllipse: {
      cx: centerFloor.x,
      cy: centerFloor.y + 4,
      rx,
      ry,
    },
  };
}
