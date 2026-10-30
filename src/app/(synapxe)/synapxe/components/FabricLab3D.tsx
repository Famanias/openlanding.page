import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  FabricFocusLayer,
  FabricWeatherMode,
  getFabricCameraPose,
  getFabricLayerOpacities,
  getFabricSlabGap,
} from '../utils/storeLogic';

interface FabricLab3DProps {
  explodePct: number;
  weatherMode: FabricWeatherMode;
  focusedLayer: FabricFocusLayer;
  onSelectLayer: (layer: FabricFocusLayer) => void;
}

// ============================================================================
// LAYER 01 SHADER: 200D Ballistic Cordura® Basket-Weave + Rain Shockwave Ripples
// ============================================================================
const CORDURA_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec4 uImpacts[8]; // xy = impact xz coords, z = elapsed age (sec), w = strength

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vElevation;
  varying float vShockwave;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 200D Ballistic Cordura interlocking basket-weave heightmap
    float weaveX = sin(pos.x * 28.0);
    float weaveZ = sin(pos.z * 28.0);
    float basketWeave = (weaveX * weaveZ) * 0.022;

    // Ripstop reinforcement cross-grid ribs every ~0.35 units
    float ripX = smoothstep(0.92, 1.0, cos(pos.x * 18.0));
    float ripZ = smoothstep(0.92, 1.0, cos(pos.z * 18.0));
    float ripstopRib = max(ripX, ripZ) * 0.024;

    // Subtle macroscopic textile undulation
    float wave = sin(pos.x * 1.8 + uTime * 1.4) * cos(pos.z * 1.8 + uTime * 1.1) * 0.025;

    // Circular shockwave ripple vertex deformations on raindrop impact
    float shockDisp = 0.0;
    float shockGlow = 0.0;
    for (int i = 0; i < 8; i++) {
      vec4 imp = uImpacts[i];
      if (imp.w > 0.01) {
        float dist = distance(pos.xz, imp.xy);
        float radius = imp.z * 2.1;
        float ringEnv = exp(-pow((dist - radius) * 6.5, 2.0));
        float osc = cos((dist - radius) * 28.0);
        float decay = max(0.0, 1.0 - imp.z * 1.1) * imp.w;
        shockDisp += ringEnv * osc * 0.068 * decay;
        shockGlow += ringEnv * decay;
      }
    }

    float totalY = basketWeave + ripstopRib + wave + shockDisp;
    pos.y += totalY;

    vLocalPos = pos;
    vElevation = totalY;
    vShockwave = clamp(shockGlow, 0.0, 1.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const CORDURA_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vElevation;
  varying float vShockwave;

  void main() {
    // High-frequency ballistic weave yarn strands
    float yarnU = abs(sin(vLocalPos.x * 28.0));
    float yarnV = abs(sin(vLocalPos.z * 28.0));
    float weavePattern = smoothstep(0.15, 0.85, yarnU * yarnV);

    // Ripstop reinforcement grid lines
    float ripX = smoothstep(0.93, 0.99, abs(cos(vLocalPos.x * 18.0)));
    float ripZ = smoothstep(0.93, 0.99, abs(cos(vLocalPos.z * 18.0)));
    float ripGrid = max(ripX, ripZ);

    vec3 obsidianBase = vec3(0.04, 0.07, 0.11);
    vec3 cyanWeave = vec3(0.0, 0.58, 0.72);
    vec3 neonCyan = vec3(0.0, 0.94, 1.0);

    vec3 col = mix(obsidianBase, cyanWeave, weavePattern * 0.55 + 0.12);
    col = mix(col, neonCyan, ripGrid * 0.65);

    // Highlight raised weave crests
    col += neonCyan * clamp(vElevation * 6.0, 0.0, 0.45);

    // Bright expanding circular shockwave ripple rings from rain impacts
    col += vec3(0.45, 0.98, 1.0) * vShockwave * 1.15;

    // Perimeter glowing border highlight
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, neonCyan, edgeFactor * 0.85);

    float alpha = (0.86 + vShockwave * 0.14) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ============================================================================
// LAYER 02 SHADER: Microporous Black ePTFE Stretched Voronoi Lattice (#FF007F)
// ============================================================================
const EPTFE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Cellular membrane micro-undulation
    float cellWave = sin(pos.x * 14.0 + uTime * 0.8) * cos(pos.z * 14.0 - uTime * 0.7) * 0.014;
    float macroWave = sin(pos.x * 1.6 + uTime * 1.1 + 1.0) * cos(pos.z * 1.6 + uTime * 0.9) * 0.018;
    pos.y += cellWave + macroWave;

    vLocalPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const EPTFE_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;

  vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
  }

  void main() {
    // Stretched Voronoi cellular lattice (9 billion micropores per sq in)
    vec2 st = vLocalPos.xz * 7.5;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist1 = 8.0;
    float m_dist2 = 8.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash2(i_st + neighbor);
        point = 0.5 + 0.42 * sin(uTime * 0.65 + 6.2831 * point);
        vec2 diff = neighbor + point - f_st;
        float dist = length(diff);
        if (dist < m_dist1) {
          m_dist2 = m_dist1;
          m_dist1 = dist;
        } else if (dist < m_dist2) {
          m_dist2 = dist;
        }
      }
    }

    // Voronoi ridge = stretched ePTFE fibril web; cell center = sub-micron pore throat
    float fibrilEdge = 1.0 - smoothstep(0.0, 0.11, m_dist2 - m_dist1);
    float nodeCore = 1.0 - smoothstep(0.0, 0.22, m_dist1);
    float micropore = smoothstep(0.18, 0.42, m_dist1) * (1.0 - fibrilEdge);

    vec3 darkMembrane = vec3(0.06, 0.02, 0.06);
    vec3 magentaFibril = vec3(1.0, 0.0, 0.5);
    vec3 poreGlow = vec3(1.0, 0.38, 0.72);

    vec3 col = mix(darkMembrane, magentaFibril, fibrilEdge * 0.92);
    col += poreGlow * nodeCore * 0.45;

    // Perimeter edge accent
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, magentaFibril, edgeFactor * 0.9);

    // Micropore throats are semi-translucent so rising vapor particles can be seen passing through
    float baseAlpha = mix(0.92, 0.42, micropore * 0.7);
    gl_FragColor = vec4(col, baseAlpha * uOpacity);
  }
`;

// ============================================================================
// LAYER 03 SHADER: Tricot Micro-Grid Hexagonal Thermal Fleece Baffle (#FF7A00)
// ============================================================================
const TRICOT_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vHexHeight;

  // Hexagonal distance helper
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.7320508))), p.x);
  }

  vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.7320508);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    float d = 0.5 - hexDist(gv);
    return vec4(gv.x, gv.y, d, 0.0);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 3D Hexagonal thermal fleece baffle pillows with recessed wicking channels
    vec4 hc = hexCoords(pos.xz * 4.8);
    float bafflePillow = smoothstep(0.04, 0.22, hc.z);
    float displacement = bafflePillow * 0.045;

    pos.y += displacement + sin(pos.x * 1.5 + uTime * 1.0) * 0.015;
    vLocalPos = pos;
    vHexHeight = bafflePillow;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const TRICOT_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;
  uniform float uThermalBoost; // Boosted in Sub-Zero Gale & Vapor Purge modes

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vHexHeight;

  void main() {
    // Recessed wicking channels (vHexHeight near 0) vs raised thermal fleece pillows (vHexHeight near 1)
    float channelMask = 1.0 - vHexHeight;

    // Radial thermal core warmth from center of slab
    float radialDist = length(vLocalPos.xz);
    float coreHeat = smoothstep(1.85, 0.0, radialDist) * (0.45 + 0.55 * uThermalBoost);
    float pulse = 0.88 + 0.12 * sin(uTime * 3.0 - radialDist * 2.5);

    vec3 darkBaffle = vec3(0.09, 0.05, 0.02);
    vec3 amberChannel = vec3(1.0, 0.48, 0.0);
    vec3 hotCore = vec3(1.0, 0.72, 0.18);

    // Wicking channels glow bright Hazard Amber (#FF7A00); raised baffles retain warm thermal core
    vec3 col = mix(darkBaffle, amberChannel * 0.65, vHexHeight * 0.55);
    col = mix(col, amberChannel, channelMask * 0.88);
    col += hotCore * coreHeat * pulse * 0.48;

    // Perimeter border highlight
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, amberChannel, edgeFactor * 0.9);

    gl_FragColor = vec4(col, 0.90 * uOpacity);
  }
`;

/**
 * Helper to create a 3D extruded slab skirt/frame around each 2.85 x 2.85 textile plane
 * so every layer has unmistakable physical cross-section thickness.
 */
function createSlabSkirtGroup(accentHex: string): {
  group: THREE.Group;
  wallMat: THREE.MeshBasicMaterial;
  edgeMat: THREE.LineBasicMaterial;
} {
  const group = new THREE.Group();
  const size = 2.85;
  const thickness = 0.09;

  // Hollow perimeter skirt walls (4 side strips around the slab)
  const boxGeo = new THREE.BoxGeometry(size, thickness, size);
  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
  wireframe.position.y = -thickness * 0.45;
  group.add(wireframe);

  const wallMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // 4 thin side faces for extruded cross-section thickness
  const sideGeoX = new THREE.PlaneGeometry(size, thickness);
  const frontWall = new THREE.Mesh(sideGeoX, wallMat);
  frontWall.position.set(0, -thickness * 0.45, size * 0.5);
  group.add(frontWall);

  const backWall = new THREE.Mesh(sideGeoX, wallMat);
  backWall.position.set(0, -thickness * 0.45, -size * 0.5);
  group.add(backWall);

  const sideGeoZ = new THREE.PlaneGeometry(size, thickness);
  sideGeoZ.rotateY(Math.PI / 2);
  const leftWall = new THREE.Mesh(sideGeoZ, wallMat);
  leftWall.position.set(-size * 0.5, -thickness * 0.45, 0);
  group.add(leftWall);

  const rightWall = new THREE.Mesh(sideGeoZ, wallMat);
  rightWall.position.set(size * 0.5, -thickness * 0.45, 0);
  group.add(rightWall);

  return { group, wallMat, edgeMat };
}

/**
 * Creates a crisp 3D floating layer callout badge attached to the right edge of each slab
 */
function createLayerBadgeMesh(
  label: string,
  sublabel: string,
  accentHex: string
): { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial } {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 72;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(9, 11, 14, 0.92)';
  ctx.fillRect(0, 0, 320, 72);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 317, 69);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText(label, 14, 30);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '15px "JetBrains Mono", monospace';
  ctx.fillText(sublabel, 14, 54);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;

  const geo = new THREE.PlaneGeometry(0.86, 0.19);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(1.18, 0.13, 0.92);
  mesh.rotation.y = 0.52;
  return { mesh, mat };
}

interface RainParticleState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  bounced: boolean;
  scale: number;
}

interface VaporParticleState {
  x: number;
  y: number;
  z: number;
  vy: number;
  phase: number;
  scale: number;
}

interface WindStreakState {
  x: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
}

export const FabricLab3D: React.FC<FabricLab3DProps> = ({
  explodePct,
  weatherMode,
  focusedLayer,
  onSelectLayer,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Synchronize React props into the Three.js render loop via refs
  const explodePctRef = useRef<number>(explodePct);
  const weatherModeRef = useRef<FabricWeatherMode>(weatherMode);
  const focusedLayerRef = useRef<FabricFocusLayer>(focusedLayer);
  const onSelectLayerRef = useRef(onSelectLayer);
  onSelectLayerRef.current = onSelectLayer;

  const initPose = getFabricCameraPose(focusedLayer, explodePct);
  const cameraLockRef = useRef<{
    goalPos: THREE.Vector3;
    goalTarget: THREE.Vector3;
    autoLocked: boolean;
  }>({
    goalPos: new THREE.Vector3(...initPose.position),
    goalTarget: new THREE.Vector3(...initPose.target),
    autoLocked: true,
  });

  useEffect(() => {
    explodePctRef.current = explodePct;
    const pose = getFabricCameraPose(focusedLayerRef.current, explodePct);
    cameraLockRef.current.goalPos.set(...pose.position);
    cameraLockRef.current.goalTarget.set(...pose.target);
    cameraLockRef.current.autoLocked = true;
  }, [explodePct]);

  useEffect(() => {
    weatherModeRef.current = weatherMode;
  }, [weatherMode]);

  useEffect(() => {
    focusedLayerRef.current = focusedLayer;
    const pose = getFabricCameraPose(focusedLayer, explodePctRef.current);
    cameraLockRef.current.goalPos.set(...pose.position);
    cameraLockRef.current.goalTarget.set(...pose.target);
    cameraLockRef.current.autoLocked = true;
  }, [focusedLayer]);

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

    const width = container.clientWidth || 680;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const startPose = getFabricCameraPose(focusedLayerRef.current, explodePctRef.current);
    camera.position.set(...startPose.position);

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
    controls.minDistance = 1.35;
    controls.maxDistance = 6.2;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.85;

    const onControlStart = () => {
      cameraLockRef.current.autoLocked = false;
    };
    controls.addEventListener('start', onControlStart);

    // Subtle background volumetric calibration grid + vertical axis guide pillars
    const pillarPositions: number[] = [
      -1.425, -1.35, -1.425, -1.425, 1.35, -1.425,
      1.425, -1.35, -1.425, 1.425, 1.35, -1.425,
      -1.425, -1.35, 1.425, -1.425, 1.35, 1.425,
      1.425, -1.35, 1.425, 1.425, 1.35, 1.425,
    ];
    const pillarGeo = new THREE.BufferGeometry();
    pillarGeo.setAttribute('position', new THREE.Float32BufferAttribute(pillarPositions, 3));
    const pillarMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(pillarGeo, pillarMat));

    // Shared 128x128 high-density plane geometry rotated flat onto X-Z plane
    const slabGeo = new THREE.PlaneGeometry(2.85, 2.85, 128, 128);
    slabGeo.rotateX(-Math.PI / 2);

    // Circular buffer of 8 raindrop impact shockwaves on Layer 01
    const impactsArray = Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, 10, 0));
    let nextImpactIdx = 0;

    // ------------------------------------------------------------------------
    // SLAB 01: OUTER SHIELD (200D Ballistic Cordura — #00F0FF)
    // ------------------------------------------------------------------------
    const layer1Group = new THREE.Group();
    const corduraMat = new THREE.ShaderMaterial({
      vertexShader: CORDURA_VERTEX_SHADER,
      fragmentShader: CORDURA_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
        uImpacts: { value: impactsArray },
      },
    });
    const layer1Mesh = new THREE.Mesh(slabGeo, corduraMat);
    layer1Mesh.userData.layerIndex = 1;
    layer1Mesh.renderOrder = 3;
    layer1Group.add(layer1Mesh);

    const skirt1 = createSlabSkirtGroup('#00F0FF');
    layer1Group.add(skirt1.group);

    const badge1 = createLayerBadgeMesh('L01 // 200D CORDURA®', 'BARRIER: 28,000MM', '#00F0FF');
    layer1Group.add(badge1.mesh);
    scene.add(layer1Group);

    // ------------------------------------------------------------------------
    // SLAB 02: CORE MEMBRANE (Microporous Black ePTFE — #FF007F)
    // ------------------------------------------------------------------------
    const layer2Group = new THREE.Group();
    const eptfeMat = new THREE.ShaderMaterial({
      vertexShader: EPTFE_VERTEX_SHADER,
      fragmentShader: EPTFE_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
      },
    });
    const layer2Mesh = new THREE.Mesh(slabGeo, eptfeMat);
    layer2Mesh.userData.layerIndex = 2;
    layer2Mesh.renderOrder = 2;
    layer2Group.add(layer2Mesh);

    const skirt2 = createSlabSkirtGroup('#FF007F');
    layer2Group.add(skirt2.group);

    const badge2 = createLayerBadgeMesh('L02 // ePTFE MEMBRANE', '9B PORES / SQ IN', '#FF007F');
    layer2Group.add(badge2.mesh);
    scene.add(layer2Group);

    // ------------------------------------------------------------------------
    // SLAB 03: INNER MATRIX (Tricot Micro-Grid Backing — #FF7A00)
    // ------------------------------------------------------------------------
    const layer3Group = new THREE.Group();
    const tricotMat = new THREE.ShaderMaterial({
      vertexShader: TRICOT_VERTEX_SHADER,
      fragmentShader: TRICOT_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
        uThermalBoost: { value: 0.3 },
      },
    });
    const layer3Mesh = new THREE.Mesh(slabGeo, tricotMat);
    layer3Mesh.userData.layerIndex = 3;
    layer3Mesh.renderOrder = 1;
    layer3Group.add(layer3Mesh);

    const skirt3 = createSlabSkirtGroup('#FF7A00');
    layer3Group.add(skirt3.group);

    const badge3 = createLayerBadgeMesh('L03 // TRICOT MATRIX', 'RET < 4.5 VAPOR FLUX', '#FF7A00');
    layer3Group.add(badge3.mesh);
    scene.add(layer3Group);

    const initialGap = getFabricSlabGap(explodePctRef.current);
    layer1Group.position.y = initialGap;
    layer2Group.position.y = 0;
    layer3Group.position.y = -initialGap;

    // ========================================================================
    // REAL-TIME PARTICLE PHYSICS:
    // 1) Cyan Rain Droplets + Bouncing Micro-Droplets (Mode 01 Typhoon)
    // 2) Horizontal Cyan Wind-Stream Ribbons (Mode 02 Sub-Zero Gale)
    // 3) Rising Hazard Amber Sweat-Vapor Molecules (Mode 03 Vapor Purge & Baseline)
    // ========================================================================
    const RAIN_COUNT = 56;
    const rainGeo = new THREE.SphereGeometry(0.036, 10, 10);
    const rainMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.92,
    });
    const rainInstanced = new THREE.InstancedMesh(rainGeo, rainMat, RAIN_COUNT);
    scene.add(rainInstanced);

    const rainStates: RainParticleState[] = Array.from({ length: RAIN_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.35,
      y: 0.8 + (i / RAIN_COUNT) * 1.9,
      z: (Math.random() - 0.5) * 2.35,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(2.1 + Math.random() * 0.9),
      vz: (Math.random() - 0.5) * 0.08,
      bounced: false,
      scale: 1.0,
    }));

    // Expanding 3D surface shockwave rings on Layer 01
    const shockRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.RingGeometry(0.08, 0.125, 32);
    ringGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const rMesh = new THREE.Mesh(ringGeo, rMat);
      scene.add(rMesh);
      shockRings.push(rMesh);
    }

    // Rising Hazard Amber Sweat-Vapor Molecules (#FF7A00)
    const VAPOR_COUNT = 78;
    const vaporGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const vaporMat = new THREE.MeshBasicMaterial({
      color: 0xff7a00,
      transparent: true,
      opacity: 0.88,
    });
    const vaporInstanced = new THREE.InstancedMesh(vaporGeo, vaporMat, VAPOR_COUNT);
    scene.add(vaporInstanced);

    const vaporStates: VaporParticleState[] = Array.from({ length: VAPOR_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.3,
      y: -1.6 + (i / VAPOR_COUNT) * 3.2,
      z: (Math.random() - 0.5) * 2.3,
      vy: 0.65 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      scale: 0.75 + Math.random() * 0.45,
    }));

    // Horizontal Sub-Zero Gale Wind-Stream Ribbons (Mode 02)
    const WIND_RIBBON_COUNT = 18;
    const windGroup = new THREE.Group();
    const windLines: { line: THREE.Line; state: WindStreakState }[] = [];
    for (let i = 0; i < WIND_RIBBON_COUNT; i++) {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j < 24; j++) {
        pts.push(new THREE.Vector3(0, 0, 0));
      }
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf8fafc : 0x00f0ff,
        transparent: true,
        opacity: 0.85,
      });
      const line = new THREE.Line(lGeo, lMat);
      windGroup.add(line);
      windLines.push({
        line,
        state: {
          x: -2.2 + Math.random() * 4.4,
          y: 0.08 + (i % 5) * 0.06,
          z: -1.25 + (i / (WIND_RIBBON_COUNT - 1)) * 2.5,
          speed: 3.2 + Math.random() * 1.4,
          phase: i * 0.7,
        },
      });
    }
    scene.add(windGroup);

    // Raycasting so clicking a 3D slab in the viewport also focuses that layer
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pickableSlabs = [layer1Mesh, layer2Mesh, layer3Mesh];
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (ev: PointerEvent) => {
      downPos = { x: ev.clientX, y: ev.clientY };
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - downPos.x, ev.clientY - downPos.y) > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableSlabs, false);
      const hitLayer = hits[0]?.object?.userData?.layerIndex as 1 | 2 | 3 | undefined;
      if (hitLayer) {
        onSelectLayerRef.current(
          focusedLayerRef.current === hitLayer ? null : hitLayer
        );
      }
    };

    const onDoubleClick = () => {
      onSelectLayerRef.current(null);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(280, entry.contentRect.width);
        const h = Math.max(340, entry.contentRect.height);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause WebGL loop when Section 02 is scrolled off-screen
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

    // Software WebGL frame-pacing helper per threejs skill
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

    const dummy = new THREE.Object3D();
    let prevTimeMs = performance.now();
    let stopped = false;
    let rafId = 0;

    const tick = () => {
      if (stopped) return;

      if (isInViewport) {
        const nowMs = performance.now();
        const dt = Math.min(0.05, Math.max(0.008, (nowMs - prevTimeMs) * 0.001));
        prevTimeMs = nowMs;
        const elapsedSec = nowMs * 0.001;

        const mode = weatherModeRef.current;
        const focus = focusedLayerRef.current;
        const targetGap = getFabricSlabGap(explodePctRef.current);

        // Smoothly lerp vertical slab positions (+/- targetGap)
        layer1Group.position.y = THREE.MathUtils.lerp(layer1Group.position.y, targetGap, 0.12);
        layer2Group.position.y = 0;
        layer3Group.position.y = THREE.MathUtils.lerp(layer3Group.position.y, -targetGap, 0.12);

        const currentGap = layer1Group.position.y;

        // Smoothly lerp layer opacities (dim non-focused slabs to 15% opacity)
        const [targetOp1, targetOp2, targetOp3] = getFabricLayerOpacities(focus);
        corduraMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          corduraMat.uniforms.uOpacity.value,
          targetOp1,
          0.12
        );
        eptfeMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          eptfeMat.uniforms.uOpacity.value,
          targetOp2,
          0.12
        );
        tricotMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          tricotMat.uniforms.uOpacity.value,
          targetOp3,
          0.12
        );

        const op1 = corduraMat.uniforms.uOpacity.value;
        const op2 = eptfeMat.uniforms.uOpacity.value;
        const op3 = tricotMat.uniforms.uOpacity.value;

        skirt1.edgeMat.opacity = op1 * 0.85;
        skirt1.wallMat.opacity = op1 * 0.18;
        badge1.mat.opacity = op1;

        skirt2.edgeMat.opacity = op2 * 0.85;
        skirt2.wallMat.opacity = op2 * 0.18;
        badge2.mat.opacity = op2;

        skirt3.edgeMat.opacity = op3 * 0.85;
        skirt3.wallMat.opacity = op3 * 0.18;
        badge3.mat.opacity = op3;

        // Update shader time & thermal core boost
        corduraMat.uniforms.uTime.value = elapsedSec;
        eptfeMat.uniforms.uTime.value = elapsedSec;
        tricotMat.uniforms.uTime.value = elapsedSec;
        tricotMat.uniforms.uThermalBoost.value = THREE.MathUtils.lerp(
          tricotMat.uniforms.uThermalBoost.value,
          mode === 'GALE' || mode === 'VAPOR' ? 1.0 : 0.35,
          0.08
        );

        // Advance shockwave impact timers & update 3D shockRings on Layer 01
        for (let i = 0; i < 8; i++) {
          const imp = impactsArray[i];
          const ringMesh = shockRings[i];
          const ringMat = ringMesh.material as THREE.MeshBasicMaterial;
          if (imp.w > 0.01) {
            imp.z += dt;
            if (imp.z > 0.9) {
              imp.w = 0.0;
              ringMat.opacity = 0;
            } else {
              const progress = imp.z / 0.9;
              const ringScale = 0.35 + progress * 2.6;
              ringMesh.position.set(imp.x, currentGap + 0.03, imp.y);
              ringMesh.scale.set(ringScale, 1, ringScale);
              ringMat.opacity = (1.0 - progress) * 0.78 * op1;
            }
          } else {
            ringMat.opacity = 0;
          }
        }

        // --------------------------------------------------------------------
        // UPDATE RAIN PARTICLES (Active in TYPHOON mode & macro L02 inspection)
        // --------------------------------------------------------------------
        const showRain = mode === 'TYPHOON' || focus === 2;
        rainInstanced.visible = showRain;
        if (showRain) {
          const surfaceY = currentGap + 0.04;
          for (let i = 0; i < RAIN_COUNT; i++) {
            const r = rainStates[i];
            r.x += r.vx * dt;
            r.y += r.vy * dt;
            r.z += r.vz * dt;

            if (!r.bounced && r.y <= surfaceY) {
              // Strike Layer 01: register shockwave ripple & shatter into bouncing micro-droplet
              r.y = surfaceY + 0.01;
              r.bounced = true;
              const angle = Math.random() * Math.PI * 2;
              const outSpeed = 0.85 + Math.random() * 0.95;
              r.vx = Math.cos(angle) * outSpeed;
              r.vz = Math.sin(angle) * outSpeed;
              r.vy = 0.95 + Math.random() * 0.75;
              r.scale = 0.62;

              // Trigger expanding circular shockwave ripple on Layer 01
              impactsArray[nextImpactIdx].set(r.x, r.z, 0.0, 1.0);
              nextImpactIdx = (nextImpactIdx + 1) % 8;
            } else if (r.bounced) {
              // Gravity pulls bounced micro-droplet back toward Layer 01 to roll off the edge
              r.vy -= 3.2 * dt;
              if (r.y < surfaceY) {
                r.y = surfaceY + 0.008;
                r.vy = Math.abs(r.vy) * 0.35;
              }
              // Reset once it rolls off the slab perimeter or after bounce decay
              if (Math.abs(r.x) > 1.48 || Math.abs(r.z) > 1.48 || r.vy < 0.05) {
                r.x = (Math.random() - 0.5) * 2.35;
                r.z = (Math.random() - 0.5) * 2.35;
                r.y = surfaceY + 1.1 + Math.random() * 1.1;
                r.vx = (Math.random() - 0.5) * 0.08;
                r.vz = (Math.random() - 0.5) * 0.08;
                r.vy = -(2.2 + Math.random() * 0.9);
                r.bounced = false;
                r.scale = 1.0;
              }
            }

            dummy.position.set(r.x, r.y, r.z);
            // Elongate falling rain droplets vertically; keep bounced droplets spherical
            dummy.scale.set(
              r.scale,
              r.bounced ? r.scale : r.scale * 2.1,
              r.scale
            );
            dummy.updateMatrix();
            rainInstanced.setMatrixAt(i, dummy.matrix);
          }
          rainInstanced.instanceMatrix.needsUpdate = true;
        }

        // --------------------------------------------------------------------
        // UPDATE HORIZONTAL SUB-ZERO GALE WIND RIBBONS (Mode 02)
        // --------------------------------------------------------------------
        windGroup.visible = mode === 'GALE';
        if (mode === 'GALE') {
          const surfaceY = currentGap + 0.05;
          for (let i = 0; i < windLines.length; i++) {
            const { line, state } = windLines[i];
            state.x += state.speed * dt;
            if (state.x > 1.8) {
              state.x = -2.4;
            }
            const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
            for (let j = 0; j < 24; j++) {
              const segX = state.x - j * 0.065;
              // Deflect wind ribbon sharply upward as it crosses over Layer 01's leading edge
              const overSlab = THREE.MathUtils.smoothstep(segX, -1.45, 0.35);
              const deflectArc =
                overSlab * (0.28 + 0.12 * Math.sin(segX * 3.0 + elapsedSec * 6.0));
              const segY =
                surfaceY +
                state.y +
                deflectArc +
                Math.sin(segX * 4.5 + state.phase + elapsedSec * 5.0) * 0.025;
              const segZ =
                state.z + Math.cos(segX * 3.2 + state.phase) * 0.04;
              posAttr.setXYZ(j, segX, segY, segZ);
            }
            posAttr.needsUpdate = true;
          }
        }

        // --------------------------------------------------------------------
        // UPDATE RISING SWEAT-VAPOR MOLECULES (Accelerated in Mode 03 VAPOR)
        // --------------------------------------------------------------------
        const vaporSpeedMult = mode === 'VAPOR' ? 2.45 : mode === 'GALE' ? 0.85 : 1.15;
        const bottomBound = -currentGap - 0.65;
        const topBound = currentGap + 0.85;

        for (let i = 0; i < VAPOR_COUNT; i++) {
          const v = vaporStates[i];
          v.y += v.vy * vaporSpeedMult * dt;
          if (v.y > topBound) {
            v.y = bottomBound;
            v.x = (Math.random() - 0.5) * 2.25;
            v.z = (Math.random() - 0.5) * 2.25;
          }
          const swayX = v.x + Math.sin(elapsedSec * 2.4 + v.phase + v.y * 2.0) * 0.05;
          const swayZ = v.z + Math.cos(elapsedSec * 2.2 + v.phase + v.y * 2.0) * 0.05;
          dummy.position.set(swayX, v.y, swayZ);
          const s = mode === 'VAPOR' ? v.scale * 1.18 : v.scale * 0.85;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          vaporInstanced.setMatrixAt(i, dummy.matrix);
        }
        vaporInstanced.instanceMatrix.needsUpdate = true;

        // --------------------------------------------------------------------
        // SMOOTH CAMERA CHOREOGRAPHY LERP
        // --------------------------------------------------------------------
        if (cameraLockRef.current.autoLocked) {
          const aspectFactor = Math.max(1.0, 1.18 / Math.max(0.75, camera.aspect));
          const goalPos = cameraLockRef.current.goalPos;
          const goalTarget = cameraLockRef.current.goalTarget;
          camera.position.x = THREE.MathUtils.lerp(
            camera.position.x,
            goalPos.x * aspectFactor,
            0.08
          );
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, goalPos.y, 0.08);
          camera.position.z = THREE.MathUtils.lerp(
            camera.position.z,
            goalPos.z * aspectFactor,
            0.08
          );
          controls.target.lerp(goalTarget, 0.09);
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
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] bg-[#090B0E] overflow-hidden select-none">
      {/* Subtle Radial Chamber Depth Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.07) 0%, rgba(9, 11, 14, 0.0) 70%)',
        }}
      />

      {/* Dedicated Empty Container for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        data-testid="fabric-lab-3d-container"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Three.js 3D Microscopic Fabric Cross-Section and Weather Stress-Test Chamber"
      />
    </div>
  );
};
