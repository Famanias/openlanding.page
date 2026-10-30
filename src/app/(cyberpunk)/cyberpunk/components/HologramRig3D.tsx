import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ProductSpec } from '../data/products';
import {
  HologramCameraZone,
  getAuxPlaneTransform,
  getCameraPoseForZone,
} from '../utils/storeLogic';

export type OpticalMode = 'HOLO-SCAN' | 'TRUE OPTICAL';

interface HologramRig3DProps {
  shell: ProductSpec;
  bottom: ProductSpec;
  gear: ProductSpec;
  activeZone: HologramCameraZone;
  opticalMode: OpticalMode;
  onSelectZone: (zone: HologramCameraZone) => void;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform int uMode;
  uniform float uScanProgress;
  uniform float uActiveBoost;

  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    vec3 bgRef = vec3(0.035, 0.043, 0.055); // #090B0E studio backdrop

    // Auto Background Removal (Luma Key)
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float bgLuma = dot(bgRef, vec3(0.299, 0.587, 0.114));
    float colorDist = distance(texColor.rgb, bgRef);
    float dist = max(colorDist, abs(luma - bgLuma) * 1.15);

    // Soft outer border feather so rectangular image edges never clip
    float featherX = smoothstep(0.0, 0.035, vUv.x) * smoothstep(1.0, 0.965, vUv.x);
    float featherY = smoothstep(0.0, 0.035, vUv.y) * smoothstep(1.0, 0.965, vUv.y);
    float borderMask = featherX * featherY;

    float alpha = smoothstep(0.02, 0.09, dist) * borderMask * texColor.a;
    if (alpha < 0.01) discard;

    // Subtle studio shadow recovery so dark stealth fabrics show crisp seam & buckle detail
    vec3 rgb = pow(clamp(texColor.rgb, 0.0, 1.0), vec3(0.86)) * 1.18;

    if (uMode == 1) {
      // TRUE OPTICAL Mode: clean transparent studio cutout composite
      gl_FragColor = vec4(rgb, alpha);
      return;
    }

    // HOLO-SCAN Mode (Default): preserve 85% studio photo detail + 15% hologram chromatic grade
    vec3 holoTint = rgb * 0.82 + uAccentColor * (0.24 + luma * 0.52);
    vec3 finalRgb = mix(rgb, holoTint, 0.15);

    // Fine horizontal CRT/hologram scanlines
    float scanline = 0.92 + 0.08 * sin(vUv.y * 220.0 - uTime * 3.0);
    finalRgb *= scanline;

    // Chromatic edge glow in the slot's accent color
    float edgeBand = smoothstep(0.025, 0.22, dist) * (1.0 - smoothstep(0.22, 0.62, dist));
    finalRgb += uAccentColor * edgeBand * (0.30 + 0.28 * uActiveBoost);

    // Animated vertical laser scan beam (uScanProgress: 0.0 -> 1.0 over 0.65s)
    if (uScanProgress > 0.001 && uScanProgress < 0.999) {
      float beamY = 1.0 - uScanProgress;
      float dBeam = abs(vUv.y - beamY);
      float core = smoothstep(0.032, 0.0, dBeam);
      float halo = smoothstep(0.14, 0.0, dBeam) * 0.45;
      finalRgb += uAccentColor * (core * 1.45 + halo);
      alpha = min(1.0, alpha + core * 0.6);
    }

    gl_FragColor = vec4(finalRgb, alpha * 0.96);
  }
`;

/**
 * Generates a high-resolution procedural CAD fallback texture on #090B0E
 * if any studio image fails to load or before it resolves.
 */
function createCadFallbackTexture(product: ProductSpec, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Solid #090B0E backdrop so the Luma-Key shader cleanly keys out the background
  ctx.fillStyle = '#090B0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle CAD silhouette fill (above luma threshold so it remains visible)
  ctx.fillStyle = '#18222F';
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 4;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (product.category === 'shells') {
    // Tactical Jacket CAD contour
    ctx.beginPath();
    ctx.moveTo(-85, -210);
    ctx.lineTo(85, -210);
    ctx.lineTo(175, -90);
    ctx.lineTo(140, 140);
    ctx.lineTo(100, 130);
    ctx.lineTo(95, -50);
    ctx.lineTo(90, 200);
    ctx.lineTo(-90, 200);
    ctx.lineTo(-95, -50);
    ctx.lineTo(-100, 130);
    ctx.lineTo(-140, 140);
    ctx.lineTo(-175, -90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (product.category === 'bottoms') {
    // Articulated Cargo Pant CAD contour
    ctx.beginPath();
    ctx.moveTo(-95, -220);
    ctx.lineTo(95, -220);
    ctx.lineTo(115, 220);
    ctx.lineTo(45, 220);
    ctx.lineTo(0, -35);
    ctx.lineTo(-45, 220);
    ctx.lineTo(-115, 220);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    // Modular Pack / Footwear / Visor CAD contour
    ctx.beginPath();
    ctx.roundRect(-110, -150, 220, 300, 18);
    ctx.fill();
    ctx.stroke();
  }

  // Internal CAD crosshairs
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-60, 0);
  ctx.lineTo(60, 0);
  ctx.moveTo(0, -120);
  ctx.lineTo(0, 120);
  ctx.stroke();

  // SKU Callout Text
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(product.code, 0, -10);

  ctx.fillStyle = accentHex;
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.fillText(product.waterproofLabel, 0, 24);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a crisp 3D HUD SKU callout tag plane texture
 */
function createSkuBadgeTexture(code: string, weightLabel: string, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(9, 11, 14, 0.92)';
  ctx.fillRect(0, 0, 256, 64);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 253, 61);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText(code, 14, 29);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '15px "JetBrains Mono", monospace';
  ctx.fillText(`SPEC // ${weightLabel}`, 14, 51);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Builds corner bracket tick segments + thin bounding frame around a 1x1 plane
 */
function createBracketFrameGroup(accentHex: string): {
  group: THREE.Group;
  frameMat: THREE.LineBasicMaterial;
  cornerMat: THREE.LineBasicMaterial;
} {
  const group = new THREE.Group();

  // Subtle full perimeter wireframe
  const planeGeo = new THREE.PlaneGeometry(1.02, 1.02);
  const edgesGeo = new THREE.EdgesGeometry(planeGeo);
  const frameMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const perimeterLines = new THREE.LineSegments(edgesGeo, frameMat);
  group.add(perimeterLines);

  // Bold corner bracket L-ticks
  const w = 0.525;
  const h = 0.525;
  const tick = 0.12;
  const pts: number[] = [
    // Top-left
    -w, h - tick, 0.01, -w, h, 0.01,
    -w, h, 0.01, -w + tick, h, 0.01,
    // Top-right
    w - tick, h, 0.01, w, h, 0.01,
    w, h, 0.01, w, h - tick, 0.01,
    // Bottom-right
    w, -h + tick, 0.01, w, -h, 0.01,
    w, -h, 0.01, w - tick, -h, 0.01,
    // Bottom-left
    -w + tick, -h, 0.01, -w, -h, 0.01,
    -w, -h, 0.01, -w, -h + tick, 0.01,
  ];
  const cornerGeo = new THREE.BufferGeometry();
  cornerGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const cornerMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const cornerSegments = new THREE.LineSegments(cornerGeo, cornerMat);
  group.add(cornerSegments);

  return { group, frameMat, cornerMat };
}

/**
 * Builds the 3D wireframe & point-cloud human mannequin core at z = -0.25
 */
function createMannequinCoreGroup(): THREE.Group {
  const group = new THREE.Group();
  group.position.set(0, 0, -0.25);

  // Anatomical wireframe segments (head, neck, shoulders, ribcage, spine, pelvis, legs, arms)
  const segments: number[] = [
    // Head octagon
    -0.14, 1.66, 0, 0.14, 1.66, 0,
    0.14, 1.66, 0, 0.19, 1.48, 0.04,
    0.19, 1.48, 0.04, 0.12, 1.28, 0,
    0.12, 1.28, 0, -0.12, 1.28, 0,
    -0.12, 1.28, 0, -0.19, 1.48, 0.04,
    -0.19, 1.48, 0.04, -0.14, 1.66, 0,
    // Visor bar
    -0.16, 1.50, 0.05, 0.16, 1.50, 0.05,
    // Central spine axis
    0, 1.28, 0, 0, -0.18, 0,
    // Clavicle & shoulders
    -0.54, 1.12, 0, 0.54, 1.12, 0,
    -0.12, 1.28, 0, -0.54, 1.12, 0,
    0.12, 1.28, 0, 0.54, 1.12, 0,
    // Ribcage horizontal ribs
    -0.46, 0.86, 0.05, 0.46, 0.86, 0.05,
    -0.42, 0.62, 0.06, 0.42, 0.62, 0.06,
    -0.36, 0.36, 0.04, 0.36, 0.36, 0.04,
    // Torso lateral contours
    -0.54, 1.12, 0, -0.36, 0.36, 0.04,
    0.54, 1.12, 0, 0.36, 0.36, 0.04,
    -0.36, 0.36, 0.04, -0.32, -0.12, 0,
    0.36, 0.36, 0.04, 0.32, -0.12, 0,
    // Pelvis cradle
    -0.32, -0.12, 0, 0.32, -0.12, 0,
    -0.32, -0.12, 0, -0.24, -0.36, 0,
    0.32, -0.12, 0, 0.24, -0.36, 0,
    -0.24, -0.36, 0, 0.24, -0.36, 0,
    // Arms (left & right)
    -0.54, 1.12, 0, -0.68, 0.52, 0.02,
    -0.68, 0.52, 0.02, -0.62, -0.05, 0.05,
    0.54, 1.12, 0, 0.68, 0.52, 0.02,
    0.68, 0.52, 0.02, 0.62, -0.05, 0.05,
    // Articulated legs (left & right)
    -0.24, -0.36, 0, -0.28, -1.15, 0.03,
    -0.28, -1.15, 0.03, -0.24, -1.98, 0,
    0.24, -0.36, 0, 0.28, -1.15, 0.03,
    0.28, -1.15, 0.03, 0.24, -1.98, 0,
    // Knee & ankle calibration rings
    -0.34, -1.15, 0.03, -0.20, -1.15, 0.03,
    0.20, -1.15, 0.03, 0.34, -1.15, 0.03,
    -0.32, -1.98, 0, -0.16, -1.98, 0,
    0.16, -1.98, 0, 0.32, -1.98, 0,
  ];

  const wireGeo = new THREE.BufferGeometry();
  wireGeo.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3));
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });
  group.add(new THREE.LineSegments(wireGeo, wireMat));

  // Volumetric point-cloud silhouette along anatomical landmarks
  const pointCoords: number[] = [];
  for (let i = 0; i < 220; i++) {
    const t = i / 220;
    const y = -2.0 + t * 3.68;
    let halfWidth = 0.28;
    if (y > 1.25) halfWidth = 0.16; // head
    else if (y > 0.35) halfWidth = 0.44; // chest
    else if (y > -0.35) halfWidth = 0.32; // waist/pelvis
    else halfWidth = 0.28; // legs

    const angle = i * 2.39996; // golden angle spiral
    const r = Math.sqrt((i % 17) / 17) * halfWidth;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r * 0.35;
    pointCoords.push(x, y, z);
  }

  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(pointCoords, 3));
  const ptsMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.028,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  group.add(new THREE.Points(ptsGeo, ptsMat));

  return group;
}

export const HologramRig3D: React.FC<HologramRig3DProps> = ({
  shell,
  bottom,
  gear,
  activeZone,
  opticalMode,
  onSelectZone,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredZone, setHoveredZone] = useState<HologramCameraZone | null>(null);

  // Refs to synchronize React state into the Three.js animation loop without recreating the WebGL context
  const activeZoneRef = useRef<HologramCameraZone>(activeZone);
  const hoveredZoneRef = useRef<HologramCameraZone | null>(null);
  const opticalModeRef = useRef<OpticalMode>(opticalMode);
  const gearCodeRef = useRef<string>(gear.code);
  const onSelectZoneRef = useRef(onSelectZone);
  onSelectZoneRef.current = onSelectZone;

  // Store plane shader materials & meshes for live texture / scan updates
  const sceneHandlesRef = useRef<{
    shellMat: THREE.ShaderMaterial;
    bottomMat: THREE.ShaderMaterial;
    gearMat: THREE.ShaderMaterial;
    shellBadgeMat: THREE.MeshBasicMaterial;
    bottomBadgeMat: THREE.MeshBasicMaterial;
    gearBadgeMat: THREE.MeshBasicMaterial;
    gearGroup: THREE.Group;
    leaderGeo: THREE.BufferGeometry;
    leaderLine: THREE.Line;
    frameHandles: {
      zone: HologramCameraZone;
      frameMat: THREE.LineBasicMaterial;
      cornerMat: THREE.LineBasicMaterial;
    }[];
    scanTimers: {
      shellStart: number;
      bottomStart: number;
      gearStart: number;
    };
    cameraGoalPos: THREE.Vector3;
    cameraGoalTarget: THREE.Vector3;
    autoCameraLocked: boolean;
    textureLoader: THREE.TextureLoader;
    loadedTextures: Map<string, THREE.Texture>;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL (SwiftShader / llvmpipe) per threejs skill guidelines
    const probe = document.createElement('canvas').getContext('webgl');
    const dbg = probe?.getExtension('WEBGL_debug_renderer_info');
    const isSoftwareGl = Boolean(
      dbg &&
        /swiftshader|llvmpipe|softpipe/i.test(
          String(probe!.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
        )
    );

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const initAspectFactor = Math.max(1.0, 1.24 / Math.max(0.72, width / height));
    camera.position.set(0, 0.0, 5.2 * initAspectFactor);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 2.1;
    controls.maxDistance = 8.2;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.68;
    controls.minAzimuthAngle = -Math.PI * 0.38;
    controls.maxAzimuthAngle = Math.PI * 0.38;
    controls.target.set(0, -0.05, 0);

    // 1. Holographic Turntable Pedestal (Floor at y = -2.2)
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.2, 0);

    const polarGrid = new THREE.PolarGridHelper(1.85, 16, 6, 64, 0x00f0ff, 0x00f0ff);
    const polarMat = polarGrid.material as THREE.Material;
    polarMat.transparent = true;
    polarMat.opacity = 0.18;
    polarMat.depthWrite = false;
    pedestalGroup.add(polarGrid);

    const outerRingGeo = new THREE.RingGeometry(1.74, 1.86, 64);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    pedestalGroup.add(new THREE.Mesh(outerRingGeo, outerRingMat));

    const innerRingGeo = new THREE.RingGeometry(1.05, 1.09, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    pedestalGroup.add(new THREE.Mesh(innerRingGeo, outerRingMat));

    scene.add(pedestalGroup);

    // 2. Anatomical Core Reference Grid (Background Layer at z = -0.25)
    const mannequinCore = createMannequinCoreGroup();
    scene.add(mannequinCore);

    // 3. Three Layered 3D Garment Hologram Planes (4:5 aspect ratio)
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = new Map<string, THREE.Texture>();

    const makeShaderMat = (initialProduct: ProductSpec, accentHex: string) =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: createCadFallbackTexture(initialProduct, accentHex) },
          uAccentColor: { value: new THREE.Color(accentHex) },
          uTime: { value: 0 },
          uMode: { value: opticalModeRef.current === 'TRUE OPTICAL' ? 1 : 0 },
          uScanProgress: { value: 0.0 },
          uActiveBoost: { value: 1.0 },
        },
      });

    const shellMat = makeShaderMat(shell, '#00F0FF');
    const bottomMat = makeShaderMat(bottom, '#FF007F');
    const gearMat = makeShaderMat(gear, '#D4FF00');

    const unitPlaneGeo = new THREE.PlaneGeometry(1, 1);

    // Helper to build each garment plane assembly with 3D bracket frame + SKU callout badge
    const buildGarmentAssembly = (
      zone: HologramCameraZone,
      shaderMat: THREE.ShaderMaterial,
      product: ProductSpec,
      accentHex: string,
      scaleX: number,
      scaleY: number
    ) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(unitPlaneGeo, shaderMat);
      mesh.scale.set(scaleX, scaleY, 1);
      mesh.userData.zone = zone;
      group.add(mesh);

      const { group: bracketGroup, frameMat, cornerMat } = createBracketFrameGroup(accentHex);
      bracketGroup.scale.set(scaleX, scaleY, 1);
      group.add(bracketGroup);

      // Floating 3D SKU callout tag at top-right of the bracket frame
      const badgeGeo = new THREE.PlaneGeometry(0.68, 0.17);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: createSkuBadgeTexture(product.code, product.weightLabel, accentHex),
        transparent: true,
        depthWrite: false,
      });
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(scaleX * 0.5 - 0.34, scaleY * 0.5 + 0.12, 0.03);
      group.add(badgeMesh);

      return { group, mesh, badgeMat, frameMat, cornerMat };
    };

    // Plane 01 — UPPER SHELL (Slot 01): (0, 0.85, 0.15), scale 1.8 x 2.25
    const shellAssembly = buildGarmentAssembly(
      'UPPER SHELL',
      shellMat,
      shell,
      '#00F0FF',
      1.8,
      2.25
    );
    shellAssembly.group.position.set(0, 0.85, 0.15);
    scene.add(shellAssembly.group);

    // Plane 02 — LOWER SYSTEM (Slot 02): (0, -0.95, 0.05), scale 1.75 x 2.2
    const bottomAssembly = buildGarmentAssembly(
      'LOWER RIG',
      bottomMat,
      bottom,
      '#FF007F',
      1.75,
      2.2
    );
    bottomAssembly.group.position.set(0, -0.95, 0.05);
    scene.add(bottomAssembly.group);

    // Plane 03 — CARRY & AUX (Slot 03): dynamic offset, 4:5 aspect ratio (1.28 x 1.6)
    const gearAssembly = buildGarmentAssembly(
      'CARRY / FOOTWEAR',
      gearMat,
      gear,
      '#D4FF00',
      1.28,
      1.6
    );
    const initialAux = getAuxPlaneTransform(gear.code);
    gearAssembly.group.position.set(...initialAux.position);
    gearAssembly.group.rotation.y = initialAux.rotationY;
    scene.add(gearAssembly.group);

    // 3D Glowing Dashed Leader Line connecting Plane 03 to the Mannequin Core
    const leaderGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...initialAux.position),
      new THREE.Vector3(...initialAux.anchorPoint),
    ]);
    const leaderMat = new THREE.LineDashedMaterial({
      color: 0xd4ff00,
      dashSize: 0.09,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const leaderLine = new THREE.Line(leaderGeo, leaderMat);
    leaderLine.computeLineDistances();
    scene.add(leaderLine);

    const initialPose = getCameraPoseForZone(activeZoneRef.current, gear.code);
    const cameraGoalPos = new THREE.Vector3(...initialPose.position);
    const cameraGoalTarget = new THREE.Vector3(...initialPose.target);

    sceneHandlesRef.current = {
      shellMat,
      bottomMat,
      gearMat,
      shellBadgeMat: shellAssembly.badgeMat,
      bottomBadgeMat: bottomAssembly.badgeMat,
      gearBadgeMat: gearAssembly.badgeMat,
      gearGroup: gearAssembly.group,
      leaderGeo,
      leaderLine,
      frameHandles: [
        {
          zone: 'UPPER SHELL',
          frameMat: shellAssembly.frameMat,
          cornerMat: shellAssembly.cornerMat,
        },
        {
          zone: 'LOWER RIG',
          frameMat: bottomAssembly.frameMat,
          cornerMat: bottomAssembly.cornerMat,
        },
        {
          zone: 'CARRY / FOOTWEAR',
          frameMat: gearAssembly.frameMat,
          cornerMat: gearAssembly.cornerMat,
        },
      ],
      scanTimers: {
        shellStart: performance.now(),
        bottomStart: performance.now(),
        gearStart: performance.now(),
      },
      cameraGoalPos,
      cameraGoalTarget,
      autoCameraLocked: true,
      textureLoader,
      loadedTextures,
    };

    // Release auto camera lerp if the user manually orbits with mouse/touch
    const onControlStart = () => {
      if (sceneHandlesRef.current) {
        sceneHandlesRef.current.autoCameraLocked = false;
      }
    };
    controls.addEventListener('start', onControlStart);

    // Raycasting for hovering and clicking the 3D hologram planes directly
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const mouseParallax = new THREE.Vector2(0, 0);
    const pickableMeshes = [
      shellAssembly.mesh,
      bottomAssembly.mesh,
      gearAssembly.mesh,
    ];

    const updateRayPointer = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      mouseParallax.set(pointer.x * 0.12, pointer.y * 0.08);
    };

    const onPointerMove = (ev: PointerEvent) => {
      updateRayPointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshes, false);
      const hitZone =
        (hits[0]?.object?.userData?.zone as HologramCameraZone | undefined) ?? null;
      if (hitZone !== hoveredZoneRef.current) {
        hoveredZoneRef.current = hitZone;
        setHoveredZone(hitZone);
      }
    };

    let downPos = { x: 0, y: 0 };
    const onPointerDown = (ev: PointerEvent) => {
      downPos = { x: ev.clientX, y: ev.clientY };
    };

    const onPointerUp = (ev: PointerEvent) => {
      const distMoved = Math.hypot(ev.clientX - downPos.x, ev.clientY - downPos.y);
      if (distMoved > 6) return; // Ignore orbit drags
      updateRayPointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshes, false);
      const hitZone = hits[0]?.object?.userData?.zone as HologramCameraZone | undefined;
      if (hitZone) {
        onSelectZoneRef.current(hitZone);
      }
    };

    const onDoubleClick = () => {
      onSelectZoneRef.current('FULL RIG');
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    // ResizeObserver for crisp responsive rendering
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(260, entry.contentRect.width);
        const h = Math.max(320, entry.contentRect.height);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause WebGL loop when Section 03 is scrolled off-screen
    let isInViewport = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isInViewport = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Software WebGL frame-pacing helper per threejs skill so headless screenshots never stall
    const gl = renderer.getContext() as WebGL2RenderingContext;
    const afterDraw = (cb: () => void) => {
      if (typeof gl.fenceSync !== 'function') {
        setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)!;
      gl.flush();
      const poll = () => {
        const s = gl.clientWaitSync(sync, 0, 0);
        if (s === gl.ALREADY_SIGNALED || s === gl.CONDITION_SATISFIED) {
          gl.deleteSync(sync);
          setTimeout(cb, 80);
        } else {
          setTimeout(poll, 16);
        }
      };
      setTimeout(poll, 16);
    };

    let stopped = false;
    let rafId = 0;

    const tick = () => {
      if (stopped) return;

      if (isInViewport && sceneHandlesRef.current) {
        const now = performance.now();
        const elapsedSec = now * 0.001;
        const handles = sceneHandlesRef.current;

        // Slowly rotate Holographic Turntable Pedestal (0.003 rad/frame)
        pedestalGroup.rotation.y += 0.003;

        // Subtle floating breathing motion on garment planes
        shellAssembly.group.position.y = 0.85 + Math.sin(elapsedSec * 1.6) * 0.018;
        bottomAssembly.group.position.y = -0.95 + Math.sin(elapsedSec * 1.6 + 1.1) * 0.015;

        // Smoothly interpolate Plane 03 (Carry & Aux) to its target offset & tilt
        const desiredAux = getAuxPlaneTransform(gearCodeRef.current);
        handles.gearGroup.position.x = THREE.MathUtils.lerp(
          handles.gearGroup.position.x,
          desiredAux.position[0],
          0.12
        );
        handles.gearGroup.position.y = THREE.MathUtils.lerp(
          handles.gearGroup.position.y,
          desiredAux.position[1] + Math.sin(elapsedSec * 1.8 + 2.2) * 0.02,
          0.12
        );
        handles.gearGroup.position.z = THREE.MathUtils.lerp(
          handles.gearGroup.position.z,
          desiredAux.position[2],
          0.12
        );
        handles.gearGroup.rotation.y = THREE.MathUtils.lerp(
          handles.gearGroup.rotation.y,
          desiredAux.rotationY,
          0.12
        );

        // Update 3D dashed leader line endpoints
        const linePositions = handles.leaderGeo.attributes.position as THREE.BufferAttribute;
        linePositions.setXYZ(
          0,
          handles.gearGroup.position.x,
          handles.gearGroup.position.y,
          handles.gearGroup.position.z - 0.02
        );
        linePositions.setXYZ(
          1,
          desiredAux.anchorPoint[0],
          desiredAux.anchorPoint[1],
          desiredAux.anchorPoint[2]
        );
        linePositions.needsUpdate = true;
        handles.leaderLine.computeLineDistances();

        // Update shader uniforms (time, optical mode, 0.65s vertical laser scan progress, active boost)
        const modeInt = opticalModeRef.current === 'TRUE OPTICAL' ? 1 : 0;
        const calcScan = (startMs: number) => Math.min(1.0, Math.max(0.0, (now - startMs) / 650));

        handles.shellMat.uniforms.uTime.value = elapsedSec;
        handles.shellMat.uniforms.uMode.value = modeInt;
        handles.shellMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.shellStart);
        handles.shellMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'UPPER SHELL' || hoveredZoneRef.current === 'UPPER SHELL'
            ? 1.0
            : 0.35;

        handles.bottomMat.uniforms.uTime.value = elapsedSec;
        handles.bottomMat.uniforms.uMode.value = modeInt;
        handles.bottomMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.bottomStart);
        handles.bottomMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'LOWER RIG' || hoveredZoneRef.current === 'LOWER RIG'
            ? 1.0
            : 0.35;

        handles.gearMat.uniforms.uTime.value = elapsedSec;
        handles.gearMat.uniforms.uMode.value = modeInt;
        handles.gearMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.gearStart);
        handles.gearMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'CARRY / FOOTWEAR' ||
          hoveredZoneRef.current === 'CARRY / FOOTWEAR'
            ? 1.0
            : 0.35;

        // Illuminate 3D Bracket Frames when active or hovered
        for (const fh of handles.frameHandles) {
          const isHighlighted =
            activeZoneRef.current === fh.zone ||
            hoveredZoneRef.current === fh.zone ||
            activeZoneRef.current === 'FULL RIG';
          fh.frameMat.opacity = THREE.MathUtils.lerp(
            fh.frameMat.opacity,
            isHighlighted ? 0.55 : 0.16,
            0.15
          );
          fh.cornerMat.opacity = THREE.MathUtils.lerp(
            fh.cornerMat.opacity,
            isHighlighted ? 1.0 : 0.35,
            0.15
          );
        }

        // Smooth camera zoom & orbit choreography with subtle mouse-parallax sway
        if (handles.autoCameraLocked) {
          const aspectFactor =
            activeZoneRef.current === 'FULL RIG'
              ? Math.max(1.0, 1.24 / Math.max(0.72, camera.aspect))
              : Math.max(1.0, 1.08 / Math.max(0.76, camera.aspect));
          const desiredCamX = handles.cameraGoalPos.x + mouseParallax.x;
          const desiredCamY = handles.cameraGoalPos.y + mouseParallax.y;
          const desiredCamZ = handles.cameraGoalPos.z * aspectFactor;
          camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.08);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.08);
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.08);
          controls.target.lerp(handles.cameraGoalTarget, 0.09);
        }

        controls.update();
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(() => {
          if (!stopped) rafId = requestAnimationFrame(tick);
        });
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Load / swap Plane 01 (Shell) texture & trigger 0.65s vertical laser scan beam
  useEffect(() => {
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.shellStart = performance.now();
    handles.shellBadgeMat.map = createSkuBadgeTexture(
      shell.code,
      shell.weightLabel,
      '#00F0FF'
    );
    handles.shellBadgeMat.needsUpdate = true;

    const cached = handles.loadedTextures.get(shell.image);
    if (cached) {
      handles.shellMat.uniforms.uTexture.value = cached;
      return;
    }

    // Immediate CAD fallback until studio PNG resolves
    handles.shellMat.uniforms.uTexture.value = createCadFallbackTexture(shell, '#00F0FF');
    handles.textureLoader.load(
      shell.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(shell.image, tex);
        handles.shellMat.uniforms.uTexture.value = tex;
        handles.scanTimers.shellStart = performance.now();
      },
      undefined,
      () => {
        handles.shellMat.uniforms.uTexture.value = createCadFallbackTexture(shell, '#00F0FF');
      }
    );
  }, [shell]);

  // Load / swap Plane 02 (Bottom) texture & trigger 0.65s vertical laser scan beam
  useEffect(() => {
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.bottomStart = performance.now();
    handles.bottomBadgeMat.map = createSkuBadgeTexture(
      bottom.code,
      bottom.weightLabel,
      '#FF007F'
    );
    handles.bottomBadgeMat.needsUpdate = true;

    const cached = handles.loadedTextures.get(bottom.image);
    if (cached) {
      handles.bottomMat.uniforms.uTexture.value = cached;
      return;
    }

    handles.bottomMat.uniforms.uTexture.value = createCadFallbackTexture(bottom, '#FF007F');
    handles.textureLoader.load(
      bottom.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(bottom.image, tex);
        handles.bottomMat.uniforms.uTexture.value = tex;
        handles.scanTimers.bottomStart = performance.now();
      },
      undefined,
      () => {
        handles.bottomMat.uniforms.uTexture.value = createCadFallbackTexture(bottom, '#FF007F');
      }
    );
  }, [bottom]);

  // Load / swap Plane 03 (Carry & Aux) texture, update dynamic 3D offset, & trigger 0.65s laser scan
  useEffect(() => {
    gearCodeRef.current = gear.code;
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.gearStart = performance.now();
    handles.gearBadgeMat.map = createSkuBadgeTexture(
      gear.code,
      gear.weightLabel,
      '#D4FF00'
    );
    handles.gearBadgeMat.needsUpdate = true;

    // If camera is locked on CARRY / FOOTWEAR, update camera goal to follow the new Aux 3D position
    if (activeZoneRef.current === 'CARRY / FOOTWEAR') {
      const nextPose = getCameraPoseForZone('CARRY / FOOTWEAR', gear.code);
      handles.cameraGoalPos.set(...nextPose.position);
      handles.cameraGoalTarget.set(...nextPose.target);
      handles.autoCameraLocked = true;
    }

    const cached = handles.loadedTextures.get(gear.image);
    if (cached) {
      handles.gearMat.uniforms.uTexture.value = cached;
      return;
    }

    handles.gearMat.uniforms.uTexture.value = createCadFallbackTexture(gear, '#D4FF00');
    handles.textureLoader.load(
      gear.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(gear.image, tex);
        handles.gearMat.uniforms.uTexture.value = tex;
        handles.scanTimers.gearStart = performance.now();
      },
      undefined,
      () => {
        handles.gearMat.uniforms.uTexture.value = createCadFallbackTexture(gear, '#D4FF00');
      }
    );
  }, [gear]);

  // Sync camera pose choreography when activeZone changes
  useEffect(() => {
    activeZoneRef.current = activeZone;
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    const pose = getCameraPoseForZone(activeZone, gearCodeRef.current);
    handles.cameraGoalPos.set(...pose.position);
    handles.cameraGoalTarget.set(...pose.target);
    handles.autoCameraLocked = true;
  }, [activeZone]);

  // Sync optical mode uniform ('HOLO-SCAN' vs 'TRUE OPTICAL')
  useEffect(() => {
    opticalModeRef.current = opticalMode;
  }, [opticalMode]);

  return (
    <div className="relative w-full h-[460px] sm:h-[510px] bg-[#090B0E] border border-[rgba(226,232,240,0.14)] overflow-hidden select-none">
      {/* Subtle 3D Chamber Radial Depth Vignette (pointer-events-none) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(0, 240, 255, 0.08) 0%, rgba(9, 11, 14, 0.0) 68%)',
        }}
      />

      {/* Dedicated Empty Container for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        data-testid="hologram-rig-canvas-container"
        className={`w-full h-full ${hoveredZone ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
        aria-label="Three.js 2.5D Volumetric Hologram Chamber"
      />

      {/* Bottom Telemetry Strip inside 3D Chamber (Solid Dark Background, No Backdrop-Filter) */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none flex items-center justify-between font-mono-tech text-[10px] text-[#94A3B8] bg-[#090B0E]/90 border border-[rgba(226,232,240,0.14)] px-2.5 py-1.5">
        <span>DRAG: ORBIT // DBL-CLICK: FULL RIG</span>
        <span className="text-[#00F0FF]">
          SHADER: {opticalMode === 'HOLO-SCAN' ? 'GLSL LUMA-KEY + CRT SCAN' : 'TRUE STUDIO CUTOUT'}
        </span>
      </div>
    </div>
  );
};
