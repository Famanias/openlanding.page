'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  WORKFLOW_CORRIDORS,
  WORKFLOW_HUBS,
  WORKFLOW_LAYERS,
  WorkflowStageIndex,
  computeWorkflowStageChoreography,
} from '../simulation/workflowTwinMath';
import { dampValue } from '../simulation/cameraMath';
import { createBudgetedRenderLoop, disposeSceneResources, getRenderPixelRatio } from './renderBudget';

export interface ProjectedHubCoord {
  x: number;
  y: number;
  visible: boolean;
}

interface WorkflowTwinCanvasProps {
  activeStage: WorkflowStageIndex;
  selectedHubId: string | null;
  hoveredHubId: string | null;
  activeLayerFilter: 'all' | 'mobility' | 'energy' | 'logistics';
  resetViewTick: number;
  replayAssemblyTick: number;
  onSelectHub: (hubId: string | null) => void;
  onHoverHub: (hubId: string | null) => void;
  onProjectedHubsUpdate: (coords: Record<string, ProjectedHubCoord>) => void;
  onWebGLFailure: () => void;
}

const PULSE_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PULSE_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uDensity;
  uniform vec3 uBaseColor;
  uniform vec3 uPulseColor;
  varying vec2 vUv;

  void main() {
    if (uOpacity <= 0.01) discard;
    float wave = fract(vUv.x * uDensity - uTime * uSpeed);
    float pulse = smoothstep(0.0, 0.18, wave) * (1.0 - smoothstep(0.18, 0.52, wave));
    vec3 col = mix(uBaseColor, uPulseColor, pulse * 0.9);
    float alpha = uOpacity * (0.42 + pulse * 0.58);
    gl_FragColor = vec4(col, alpha);
  }
`;

const WATER_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const WATER_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float ripple1 = sin(vUv.x * 42.0 + uTime * 1.4) * 0.5 + 0.5;
    float ripple2 = cos(vUv.y * 18.0 - uTime * 0.9) * 0.5 + 0.5;
    float band = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    vec3 shallow = vec3(0.74, 0.80, 0.83);
    vec3 channel = vec3(0.60, 0.69, 0.74);
    vec3 highlight = vec3(0.88, 0.91, 0.92);
    vec3 col = mix(shallow, channel, band);
    col = mix(col, highlight, ripple1 * ripple2 * 0.14);
    gl_FragColor = vec4(col, 0.95);
  }
`;

function createMicroStoneBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 128, 128);
    let seed = 42109;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let y = 0; y < 128; y += 2) {
      for (let x = 0; x < 128; x += 2) {
        const v = Math.floor(118 + rand() * 20);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.strokeStyle = '#6e6e6e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 128; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 5);
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
    grad.addColorStop(0, 'rgba(23, 26, 28, 0.34)');
    grad.addColorStop(0.6, 'rgba(23, 26, 28, 0.14)');
    grad.addColorStop(1, 'rgba(23, 26, 28, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

export const WorkflowTwinCanvas: React.FC<WorkflowTwinCanvasProps> = ({
  activeStage,
  selectedHubId,
  hoveredHubId,
  activeLayerFilter,
  resetViewTick,
  replayAssemblyTick,
  onSelectHub,
  onHoverHub,
  onProjectedHubsUpdate,
  onWebGLFailure,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const activeStageRef = useRef<WorkflowStageIndex>(activeStage);
  activeStageRef.current = activeStage;

  const selectedHubIdRef = useRef<string | null>(selectedHubId);
  selectedHubIdRef.current = selectedHubId;

  const hoveredHubIdRef = useRef<string | null>(hoveredHubId);
  hoveredHubIdRef.current = hoveredHubId;

  const activeLayerFilterRef = useRef(activeLayerFilter);
  activeLayerFilterRef.current = activeLayerFilter;

  const onSelectHubRef = useRef(onSelectHub);
  onSelectHubRef.current = onSelectHub;

  const onHoverHubRef = useRef(onHoverHub);
  onHoverHubRef.current = onHoverHub;

  const onProjectedHubsUpdateRef = useRef(onProjectedHubsUpdate);
  onProjectedHubsUpdateRef.current = onProjectedHubsUpdate;
  const onWebGLFailureRef = useRef(onWebGLFailure);
  onWebGLFailureRef.current = onWebGLFailure;

  const resetCameraFnRef = useRef<(() => void) | null>(null);
  const replayAssemblyFnRef = useRef<(() => void) | null>(null);
  const wakeUpLoopFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    wakeUpLoopFnRef.current?.();
  }, [activeStage, selectedHubId, hoveredHubId, activeLayerFilter]);

  useEffect(() => {
    if (resetViewTick > 0) {
      resetCameraFnRef.current?.();
      wakeUpLoopFnRef.current?.();
    }
  }, [resetViewTick]);

  useEffect(() => {
    if (replayAssemblyTick > 0) {
      replayAssemblyFnRef.current?.();
      wakeUpLoopFnRef.current?.();
    }
  }, [replayAssemblyTick]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'low-power',
        alpha: false,
      });
    } catch {
      onWebGLFailureRef.current();
      return;
    }

    const gl = renderer.getContext();
    if (!gl) {
      renderer.dispose();
      onWebGLFailureRef.current();
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software/i.test(rendererStr);

    const width = Math.max(320, container.clientWidth || 640);
    const height = Math.max(280, container.clientHeight || 440);

    renderer.setSize(width, height);
    renderer.setPixelRatio(getRenderPixelRatio(width, height));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false;

    container.innerHTML = '';
    renderer.domElement.setAttribute('data-testid', 'workflow-webgl-canvas');
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      onWebGLFailureRef.current();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    // Studio Scene & Warm Alabaster Atmosphere matching PARALLEL V2 Light Section
    const scene = new THREE.Scene();
    const bgHex = 0xefece6;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.015);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Camera & OrbitControls
    const initialChoreo = computeWorkflowStageChoreography(activeStageRef.current, {
      isMobile: width < 640,
    });
    const camera = new THREE.PerspectiveCamera(
      initialChoreo.fov,
      width / height,
      0.5,
      90
    );
    camera.position.set(
      initialChoreo.cameraPosition.x,
      initialChoreo.cameraPosition.y,
      initialChoreo.cameraPosition.z
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // Never hijack vertical page scroll
    controls.enablePan = false;
    controls.minPolarAngle = 0.32;
    controls.maxPolarAngle = 1.28;
    controls.minAzimuthAngle = -0.95;
    controls.maxAzimuthAngle = 0.95;
    controls.target.set(
      initialChoreo.cameraTarget.x,
      initialChoreo.cameraTarget.y,
      initialChoreo.cameraTarget.z
    );
    controls.update();

    let userInteracting = false;
    let userOrbitHoldTimer = 0;
    const onControlStart = () => {
      userInteracting = true;
      userOrbitHoldTimer = 3.2;
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onControlEnd = () => {
      userInteracting = false;
      renderer.domElement.style.cursor = 'grab';
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);

    // Three-Point Architectural Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd8d3c8, 0.95);
    hemiLight.position.set(0, 18, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7eb, 1.45);
    keyLight.position.set(11, 17, 12);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(512, 512);
      keyLight.shadow.camera.near = 2;
      keyLight.shadow.camera.far = 38;
      const d = 10.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.55);
    rimLight.position.set(-12, 10, -11);
    scene.add(rimLight);

    // Shared Textures & Materials
    const bumpTex = createMicroStoneBumpTexture();
    const shadowDiscTex = createContactShadowTexture();

    const plinthSubBaseMat = new THREE.MeshStandardMaterial({
      color: 0x24282b,
      roughness: 0.78,
      metalness: 0.12,
    });
    const plinthStoneMat = new THREE.MeshStandardMaterial({
      color: 0xd6d2c9,
      roughness: 0.82,
      metalness: 0.05,
      bumpMap: bumpTex,
      bumpScale: 0.015,
    });
    const terraceMat = new THREE.MeshStandardMaterial({
      color: 0xe6e3dc,
      roughness: 0.74,
      metalness: 0.04,
      bumpMap: bumpTex,
      bumpScale: 0.01,
    });
    const porcelainMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f4,
      roughness: 0.42,
      metalness: 0.06,
    });
    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0xe8e4db,
      roughness: 0.68,
      metalness: 0.05,
    });
    const mineralGrayMat = new THREE.MeshStandardMaterial({
      color: 0xd0ccc2,
      roughness: 0.62,
      metalness: 0.1,
    });
    const roofCapMat = new THREE.MeshStandardMaterial({
      color: 0x3b4046,
      roughness: 0.5,
      metalness: 0.22,
    });
    const roadDeckMat = new THREE.MeshStandardMaterial({
      color: 0x2b3036,
      roughness: 0.58,
      metalness: 0.15,
    });
    const bridgePylonMat = new THREE.MeshStandardMaterial({
      color: 0x454c54,
      roughness: 0.45,
      metalness: 0.24,
    });

    // Root Model Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 1. Soft Studio Table Contact Shadow beneath the Plinth
    const tableShadowGeo = new THREE.PlaneGeometry(18.5, 12.2);
    const tableShadowMat = new THREE.MeshBasicMaterial({
      map: shadowDiscTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const tableShadow = new THREE.Mesh(tableShadowGeo, tableShadowMat);
    tableShadow.rotation.x = -Math.PI / 2;
    tableShadow.position.y = -0.36;
    modelRoot.add(tableShadow);

    // 2. Stepped Architectural Base Plinth + Meridian River Channel
    const plinthGroup = new THREE.Group();
    modelRoot.add(plinthGroup);

    const subBaseGeo = new THREE.BoxGeometry(15.2, 0.16, 9.6);
    const subBaseMesh = new THREE.Mesh(subBaseGeo, plinthSubBaseMat);
    subBaseMesh.position.y = -0.26;
    subBaseMesh.receiveShadow = true;
    plinthGroup.add(subBaseMesh);

    const mainPlinthGeo = new THREE.BoxGeometry(14.8, 0.28, 9.2);
    const mainPlinthMesh = new THREE.Mesh(mainPlinthGeo, plinthStoneMat);
    mainPlinthMesh.position.y = -0.04;
    mainPlinthMesh.receiveShadow = true;
    plinthGroup.add(mainPlinthMesh);

    // North and South Elevated Urban Bank Terraces leaving central river channel (z in [-0.82, 0.82])
    const bankGeo = new THREE.BoxGeometry(14.2, 0.26, 3.6);
    const northBank = new THREE.Mesh(bankGeo, terraceMat);
    northBank.position.set(0, 0.23, -2.62);
    northBank.receiveShadow = true;
    northBank.castShadow = !isSoftwareGl;
    plinthGroup.add(northBank);

    const southBank = new THREE.Mesh(bankGeo, terraceMat);
    southBank.position.set(0, 0.23, 2.62);
    southBank.receiveShadow = true;
    southBank.castShadow = !isSoftwareGl;
    plinthGroup.add(southBank);

    // Embankment retaining walls along river corridor
    const embankmentGeo = new THREE.BoxGeometry(14.24, 0.14, 0.12);
    const northEmbankment = new THREE.Mesh(embankmentGeo, mineralGrayMat);
    northEmbankment.position.set(0, 0.34, -0.84);
    plinthGroup.add(northEmbankment);

    const southEmbankment = new THREE.Mesh(embankmentGeo, mineralGrayMat);
    southEmbankment.position.set(0, 0.34, 0.84);
    plinthGroup.add(southEmbankment);

    // Meridian River Water Shader Surface
    const waterGeo = new THREE.PlaneGeometry(14.2, 1.56);
    const waterMat = new THREE.ShaderMaterial({
      vertexShader: WATER_VERTEX_SHADER,
      fragmentShader: WATER_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.14, 0);
    plinthGroup.add(waterMesh);

    // 3. Six District Hubs & Procedural Multi-Part Building Clusters
    const unitBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const unitConeGeo = new THREE.ConeGeometry(0.65, 0.45, 4);
    const hubDiskGeo = new THREE.CylinderGeometry(1.42, 1.52, 0.06, 28);
    const hubRingGeo = new THREE.RingGeometry(1.38, 1.48, 32);
    const substationBaseGeo = new THREE.CylinderGeometry(0.24, 0.3, 0.32, 16);
    const substationCoreGeo = new THREE.OctahedronGeometry(0.18, 0);
    const hitProxyGeo = new THREE.CylinderGeometry(1.45, 1.45, 2.6, 16);
    const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });

    interface AnimatedBuildingItem {
      group: THREE.Group;
      targetScaleY: number;
      staggerDelay: number;
    }

    interface HubVisualRecord {
      id: string;
      root: THREE.Group;
      ringMat: THREE.MeshBasicMaterial;
      beaconMat: THREE.MeshStandardMaterial;
      beaconMesh: THREE.Mesh;
      buildings: AnimatedBuildingItem[];
      worldAnchor: THREE.Vector3;
    }

    const hubRecords: HubVisualRecord[] = [];
    const interactables: THREE.Object3D[] = [];

    WORKFLOW_HUBS.forEach((hub, hubIdx) => {
      const hubGroup = new THREE.Group();
      hubGroup.position.set(hub.position.x, hub.position.y, hub.position.z);
      modelRoot.add(hubGroup);

      const hubShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 3.2),
        new THREE.MeshBasicMaterial({
          map: shadowDiscTex,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        })
      );
      hubShadow.rotation.x = -Math.PI / 2;
      hubShadow.position.y = 0.01;
      hubGroup.add(hubShadow);

      const padMesh = new THREE.Mesh(hubDiskGeo, warmStoneMat);
      padMesh.position.y = 0.03;
      padMesh.receiveShadow = true;
      hubGroup.add(padMesh);

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe85d36,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(hubRingGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.07;
      hubGroup.add(ringMesh);

      const subPedestal = new THREE.Mesh(substationBaseGeo, bridgePylonMat);
      subPedestal.position.set(0, 0.2, 0);
      subPedestal.castShadow = !isSoftwareGl;
      hubGroup.add(subPedestal);

      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xe85d36,
        emissive: 0xe85d36,
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.2,
      });
      const beaconMesh = new THREE.Mesh(substationCoreGeo, beaconMat);
      beaconMesh.position.set(0, 0.56, 0);
      hubGroup.add(beaconMesh);

      const hubBuildings: AnimatedBuildingItem[] = [];
      hub.buildings.forEach((bSpec, bIdx) => {
        const bGroup = new THREE.Group();
        bGroup.position.set(bSpec.dx, 0.06, bSpec.dz);

        const bodyMat =
          bSpec.tone === 'porcelain'
            ? porcelainMat
            : bSpec.tone === 'warm_stone'
              ? warmStoneMat
              : mineralGrayMat;

        // Part 1: Podium Collar Base
        const podiumH = Math.min(0.28, bSpec.h * 0.22);
        const podium = new THREE.Mesh(unitBoxGeo, warmStoneMat);
        podium.scale.set(bSpec.w * 1.08, podiumH, bSpec.d * 1.08);
        podium.position.y = podiumH * 0.5;
        podium.castShadow = !isSoftwareGl;
        podium.receiveShadow = true;
        bGroup.add(podium);

        // Part 2: Main Architectural Tower Shaft
        const shaft = new THREE.Mesh(unitBoxGeo, bodyMat);
        shaft.scale.set(bSpec.w, bSpec.h, bSpec.d);
        shaft.position.y = bSpec.h * 0.5;
        shaft.castShadow = !isSoftwareGl;
        shaft.receiveShadow = true;
        bGroup.add(shaft);

        // Part 3: Rooftop Architectural Profile
        if (bSpec.roofStyle === 'stepped_crown') {
          const crownH = 0.22;
          const crown = new THREE.Mesh(unitBoxGeo, porcelainMat);
          crown.scale.set(bSpec.w * 0.68, crownH, bSpec.d * 0.68);
          crown.position.y = bSpec.h + crownH * 0.5;
          bGroup.add(crown);

          const mech = new THREE.Mesh(unitBoxGeo, roofCapMat);
          mech.scale.set(bSpec.w * 0.36, 0.1, bSpec.d * 0.36);
          mech.position.y = bSpec.h + crownH + 0.05;
          bGroup.add(mech);
        } else if (bSpec.roofStyle === 'spire_deck') {
          const tier = new THREE.Mesh(unitBoxGeo, roofCapMat);
          tier.scale.set(bSpec.w * 0.62, 0.16, bSpec.d * 0.62);
          tier.position.y = bSpec.h + 0.08;
          bGroup.add(tier);

          const spire = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          spire.scale.set(0.05, 0.48, 0.05);
          spire.position.set(0, bSpec.h + 0.4, 0);
          bGroup.add(spire);
        } else if (bSpec.roofStyle === 'sawtooth') {
          const roof = new THREE.Mesh(unitConeGeo, roofCapMat);
          roof.scale.set(bSpec.w * 0.85, 0.35, bSpec.d * 0.85);
          roof.rotation.y = Math.PI / 4;
          roof.position.y = bSpec.h + 0.12;
          bGroup.add(roof);
        } else {
          const parapet = new THREE.Mesh(unitBoxGeo, roofCapMat);
          parapet.scale.set(bSpec.w * 0.82, 0.09, bSpec.d * 0.82);
          parapet.position.y = bSpec.h + 0.045;
          bGroup.add(parapet);
        }

        hubGroup.add(bGroup);
        hubBuildings.push({
          group: bGroup,
          targetScaleY: 1,
          staggerDelay: hubIdx * 0.06 + bIdx * 0.035,
        });
      });

      const hitMesh = new THREE.Mesh(hitProxyGeo, hitProxyMat);
      hitMesh.position.y = 1.1;
      hitMesh.userData = { hubId: hub.id };
      hubGroup.add(hitMesh);
      interactables.push(hitMesh);

      hubRecords.push({
        id: hub.id,
        root: hubGroup,
        ringMat,
        beaconMat,
        beaconMesh,
        buildings: hubBuildings,
        worldAnchor: new THREE.Vector3(
          hub.position.x,
          hub.position.y + 1.85,
          hub.position.z
        ),
      });
    });

    // 4. Physical Bridges, Pylons, Supports & Road Corridors
    const roadNetworkGroup = new THREE.Group();
    modelRoot.add(roadNetworkGroup);

    interface CorridorVisualRecord {
      spec: (typeof WORKFLOW_CORRIDORS)[number];
      curve: THREE.CatmullRomCurve3;
      deckMat: THREE.MeshStandardMaterial;
      pulseMat: THREE.ShaderMaterial;
    }

    const corridorRecords: CorridorVisualRecord[] = [];

    WORKFLOW_CORRIDORS.forEach((corr) => {
      const pts = corr.controlPoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
      const curve = new THREE.CatmullRomCurve3(pts);

      const deckTubeGeo = new THREE.TubeGeometry(
        curve,
        corr.isBridge ? 32 : 20,
        corr.isBridge ? 0.14 : 0.1,
        8,
        false
      );
      const deckMat = roadDeckMat.clone();
      const deckMesh = new THREE.Mesh(deckTubeGeo, deckMat);
      deckMesh.scale.set(1, 0.42, 1);
      deckMesh.castShadow = !isSoftwareGl;
      deckMesh.receiveShadow = true;
      roadNetworkGroup.add(deckMesh);

      const pulsePts = corr.controlPoints.map(
        (p) => new THREE.Vector3(p.x, p.y + 0.07, p.z)
      );
      const pulseCurve = new THREE.CatmullRomCurve3(pulsePts);
      const pulseGeo = new THREE.TubeGeometry(pulseCurve, 28, 0.055, 6, false);
      const pulseMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.75 },
          uSpeed: { value: 0.65 },
          uDensity: { value: 3.0 },
          uBaseColor: { value: new THREE.Color(0x525860) },
          uPulseColor: { value: new THREE.Color(0xe85d36) },
        },
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      roadNetworkGroup.add(pulseMesh);

      if (corr.isBridge) {
        const midPt = curve.getPointAt(0.5);
        const northPierPt = curve.getPointAt(0.32);
        const southPierPt = curve.getPointAt(0.68);

        [northPierPt, southPierPt].forEach((pierPt) => {
          const leftTower = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          leftTower.scale.set(0.11, 1.55, 0.11);
          leftTower.position.set(pierPt.x - 0.24, 0.85, pierPt.z);
          leftTower.castShadow = !isSoftwareGl;
          roadNetworkGroup.add(leftTower);

          const rightTower = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          rightTower.scale.set(0.11, 1.55, 0.11);
          rightTower.position.set(pierPt.x + 0.24, 0.85, pierPt.z);
          rightTower.castShadow = !isSoftwareGl;
          roadNetworkGroup.add(rightTower);

          const crossBeam = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          crossBeam.scale.set(0.58, 0.08, 0.09);
          crossBeam.position.set(pierPt.x, 1.42, pierPt.z);
          roadNetworkGroup.add(crossBeam);

          const footing = new THREE.Mesh(unitBoxGeo, mineralGrayMat);
          footing.scale.set(0.66, 0.45, 0.28);
          footing.position.set(pierPt.x, 0.25, pierPt.z);
          roadNetworkGroup.add(footing);
        });

        const archLinePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 16; i++) {
          const t = i / 16;
          const p = curve.getPointAt(t);
          const archLift = Math.sin(t * Math.PI) * 0.55;
          archLinePts.push(new THREE.Vector3(p.x, p.y + archLift, p.z));
        }
        const archGeo = new THREE.BufferGeometry().setFromPoints(archLinePts);
        const archLine = new THREE.Line(
          archGeo,
          new THREE.LineBasicMaterial({
            color: 0x666d70,
            transparent: true,
            opacity: 0.65,
          })
        );
        roadNetworkGroup.add(archLine);

        if (corr.isPrimaryDisrupted) {
          const disruptionGroup = new THREE.Group();
          disruptionGroup.position.set(midPt.x, midPt.y + 0.12, midPt.z);
          disruptionGroup.name = 'central-bridge-disruption';
          roadNetworkGroup.add(disruptionGroup);

          const alertRingGeo = new THREE.RingGeometry(0.32, 0.48, 28);
          const alertRingMat = new THREE.MeshBasicMaterial({
            color: 0xd94e3e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
          });
          const alertRing = new THREE.Mesh(alertRingGeo, alertRingMat);
          alertRing.rotation.x = -Math.PI / 2;
          disruptionGroup.add(alertRing);

          const barrierGeo = new THREE.BoxGeometry(0.46, 0.16, 0.1);
          const barrierMat = new THREE.MeshStandardMaterial({
            color: 0xd94e3e,
            emissive: 0xd94e3e,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0,
          });
          const northBarrier = new THREE.Mesh(barrierGeo, barrierMat);
          northBarrier.position.set(0, 0.08, -0.35);
          disruptionGroup.add(northBarrier);

          const southBarrier = new THREE.Mesh(barrierGeo, barrierMat);
          southBarrier.position.set(0, 0.08, 0.35);
          disruptionGroup.add(southBarrier);

          disruptionGroup.userData = { alertRingMat, barrierMat };
        }
      }

      corridorRecords.push({
        spec: corr,
        curve,
        deckMat,
        pulseMat,
      });
    });

    // 5. Stage 02 & 03 Elevated Scenario Branching Pathways
    const scenarioArcsGroup = new THREE.Group();
    modelRoot.add(scenarioArcsGroup);

    // 5A. Baseline Spillback Pathway (Muted Coral #D94E3E)
    const baselineCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(0.0, 1.35, 1.85),
        new THREE.Vector3(0.0, 1.45, 0.55),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.9, 0.55, 3.25),
        new THREE.Vector3(-1.4, 1.15, 3.32),
        new THREE.Vector3(0.0, 1.25, 3.35),
        new THREE.Vector3(1.4, 1.15, 3.32),
        new THREE.Vector3(2.9, 0.55, 3.25),
      ]),
    ];

    const baselinePulseMats: THREE.ShaderMaterial[] = [];
    baselineCurves.forEach((bCurve) => {
      const bGeo = new THREE.TubeGeometry(bCurve, 28, 0.075, 8, false);
      const bMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uSpeed: { value: 0.25 },
          uDensity: { value: 5.0 },
          uBaseColor: { value: new THREE.Color(0x992f24) },
          uPulseColor: { value: new THREE.Color(0xd94e3e) },
        },
      });
      baselinePulseMats.push(bMat);
      scenarioArcsGroup.add(new THREE.Mesh(bGeo, bMat));
    });

    // 5B. Intervention Coordinated Bypass Pathways
    const interventionCurves = [
      // West Bypass Arc: SOUTH_PORT -> WEST_HARBOR -> MIDTOWN -> FINANCIAL_CBD
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(-2.6, 0.95, 3.25),
        new THREE.Vector3(-5.2, 1.15, 3.1),
        new THREE.Vector3(-4.8, 1.65, 0.0),
        new THREE.Vector3(-4.4, 1.15, -3.05),
        new THREE.Vector3(-2.2, 0.95, -3.25),
        new THREE.Vector3(0.0, 0.65, -3.35),
      ]),
      // East Crossing Arc: SOUTH_PORT -> SOUTH_IND -> EAST_HUB -> FINANCIAL_CBD
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(2.6, 0.95, 3.25),
        new THREE.Vector3(5.2, 1.15, 3.1),
        new THREE.Vector3(4.8, 1.65, 0.0),
        new THREE.Vector3(4.4, 1.15, -3.05),
        new THREE.Vector3(2.2, 0.95, -3.25),
        new THREE.Vector3(0.0, 0.65, -3.35),
      ]),
    ];

    const interventionPulseMats: THREE.ShaderMaterial[] = [];
    interventionCurves.forEach((iCurve, idx) => {
      const iGeo = new THREE.TubeGeometry(iCurve, 44, 0.09, 10, false);
      const iMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uSpeed: { value: 0.95 },
          uDensity: { value: 3.5 },
          uBaseColor: {
            value: new THREE.Color(idx === 0 ? 0x2d8a61 : 0xe85d36),
          },
          uPulseColor: {
            value: new THREE.Color(idx === 0 ? 0x6ee7b7 : 0xff8a65),
          },
        },
      });
      interventionPulseMats.push(iMat);
      scenarioArcsGroup.add(new THREE.Mesh(iGeo, iMat));
    });

    // 6. Three Elevated Translucent Analytical Layers (Mobility, Energy, Logistics)
    interface AnalyticalLayerVisual {
      id: 'mobility' | 'energy' | 'logistics';
      group: THREE.Group;
      baseElevationY: number;
      frameMat: THREE.LineBasicMaterial;
      stemMat: THREE.LineBasicMaterial;
      nodeDiscMat: THREE.MeshBasicMaterial;
      pulseMat: THREE.ShaderMaterial;
    }

    const analyticalLayers: AnalyticalLayerVisual[] = [];
    const layerNodeGeo = new THREE.RingGeometry(0.18, 0.34, 24);

    WORKFLOW_LAYERS.forEach((layerSpec, lIdx) => {
      const lGroup = new THREE.Group();
      lGroup.position.y = layerSpec.elevationY;
      modelRoot.add(lGroup);

      const layerColor = new THREE.Color(layerSpec.colorHex);

      const hw = 6.2 - lIdx * 0.22;
      const hd = 3.8 - lIdx * 0.14;
      const framePts = [
        new THREE.Vector3(-hw, 0, -hd),
        new THREE.Vector3(hw, 0, -hd),
        new THREE.Vector3(hw, 0, hd),
        new THREE.Vector3(-hw, 0, hd),
      ];
      const frameGeo = new THREE.BufferGeometry().setFromPoints(framePts);
      const frameMat = new THREE.LineBasicMaterial({
        color: layerColor,
        transparent: true,
        opacity: 0.45,
      });
      const frameLoop = new THREE.LineLoop(frameGeo, frameMat);
      lGroup.add(frameLoop);

      const nodeDiscMat = new THREE.MeshBasicMaterial({
        color: layerColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });

      const stemPositions: number[] = [];
      WORKFLOW_HUBS.forEach((hub) => {
        const disc = new THREE.Mesh(layerNodeGeo, nodeDiscMat);
        disc.rotation.x = -Math.PI / 2;
        disc.position.set(hub.position.x, 0, hub.position.z);
        lGroup.add(disc);

        stemPositions.push(
          hub.position.x,
          0,
          hub.position.z,
          hub.position.x,
          -(layerSpec.elevationY - hub.position.y - 0.5),
          hub.position.z
        );
      });

      const stemGeo = new THREE.BufferGeometry();
      stemGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(stemPositions, 3)
      );
      const stemMat = new THREE.LineBasicMaterial({
        color: layerColor,
        transparent: true,
        opacity: 0.26,
      });
      const stems = new THREE.LineSegments(stemGeo, stemMat);
      lGroup.add(stems);

      const loopCurve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-5.2, 0, 3.1),
          new THREE.Vector3(0.0, 0, 3.35),
          new THREE.Vector3(5.2, 0, 3.1),
          new THREE.Vector3(4.4, 0, -3.05),
          new THREE.Vector3(0.0, 0, -3.35),
          new THREE.Vector3(-4.4, 0, -3.05),
        ],
        true
      );
      const loopTubeGeo = new THREE.TubeGeometry(loopCurve, 48, 0.032, 6, true);
      const pulseMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.65 },
          uSpeed: { value: 0.45 + lIdx * 0.12 },
          uDensity: { value: 4.0 },
          uBaseColor: { value: layerColor.clone().multiplyScalar(0.75) },
          uPulseColor: { value: layerColor },
        },
      });
      const loopTubeMesh = new THREE.Mesh(loopTubeGeo, pulseMat);
      lGroup.add(loopTubeMesh);

      analyticalLayers.push({
        id: layerSpec.id,
        group: lGroup,
        baseElevationY: layerSpec.elevationY,
        frameMat,
        stemMat,
        nodeDiscMat,
        pulseMat,
      });
    });

    // 7. Instanced Animated Flow Vehicles on Physical Corridors
    const vehicleCount = 36;
    const vehicleGeo = new THREE.BoxGeometry(0.22, 0.08, 0.11);
    const vehicleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
    });
    const vehicleInstanced = new THREE.InstancedMesh(
      vehicleGeo,
      vehicleMat,
      vehicleCount
    );
    roadNetworkGroup.add(vehicleInstanced);

    const dummyVehicle = new THREE.Object3D();
    const vehicleColor = new THREE.Color();
    const pointPos = new THREE.Vector3();
    const tangentVec = new THREE.Vector3();

    // Raycasting setup for Hub Hover & Click
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const updateRaycast = (clientX: number, clientY: number, isClick: boolean) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(interactables, false);
      const hitHubId: string | null =
        hits.length > 0 ? (hits[0].object.userData?.hubId ?? null) : null;

      if (isClick) {
        if (hitHubId) {
          onSelectHubRef.current(
            selectedHubIdRef.current === hitHubId ? null : hitHubId
          );
        }
      } else {
        if (hoveredHubIdRef.current !== hitHubId) {
          onHoverHubRef.current(hitHubId);
        }
        if (!userInteracting) {
          renderer.domElement.style.cursor = hitHubId ? 'pointer' : 'grab';
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (userInteracting) return;
      updateRaycast(e.clientX, e.clientY, false);
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) < 6) {
        updateRaycast(e.clientX, e.clientY, true);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = Math.max(320, container.clientWidth || 640);
      const h = Math.max(280, container.clientHeight || 440);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(getRenderPixelRatio(w, h));
      renderer.setSize(w, h);
      renderLoop.requestRender();
    };
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let assemblyClock = 0;
    let lastObservedStage = activeStageRef.current;

    resetCameraFnRef.current = () => {
      userOrbitHoldTimer = 0;
      onSelectHubRef.current(null);
    };

    replayAssemblyFnRef.current = () => {
      assemblyClock = 0;
    };

    let elapsed = 0;
    let lastShadowUpdate = -Infinity;
    let lastProjectionTime = 0;
    let lastProjectedCache: Record<string, ProjectedHubCoord> = {};
    const scratchProj = new THREE.Vector3();

    const centralDisruptionObj = roadNetworkGroup.getObjectByName(
      'central-bridge-disruption'
    );

    let smoothedLayerVis = initialChoreo.layerVisibility;
    let smoothedBaselineAlpha = initialChoreo.baselineArcAlpha;
    let smoothedInterventionAlpha = initialChoreo.interventionArcAlpha;
    let smoothedResolvedAlpha = initialChoreo.resolvedPathAlpha;
    let smoothedDisruption = initialChoreo.bridgeDisrupted ? 1 : 0;

    const tick = (now: number, frameDt: number, reducedMotion: boolean) => {
      const dt = reducedMotion ? 1 : frameDt;
      if (!reducedMotion) elapsed += dt;
      assemblyClock = reducedMotion ? 10 : assemblyClock + dt;

      if (lastObservedStage !== activeStageRef.current) {
        if (activeStageRef.current === 0 && !reducedMotion) {
          assemblyClock = 0.15;
        }
        userOrbitHoldTimer = 0;
        lastObservedStage = activeStageRef.current;
      }

      if (userOrbitHoldTimer > 0 && !userInteracting) {
        userOrbitHoldTimer = Math.max(0, userOrbitHoldTimer - dt);
      }

      const w = container.clientWidth || 640;
      const h = container.clientHeight || 440;
      const activeHubFocus =
        selectedHubIdRef.current || hoveredHubIdRef.current;

      const choreo = computeWorkflowStageChoreography(activeStageRef.current, {
        isMobile: w < 640,
        focusedHubId: activeHubFocus,
      });

      if (!userInteracting && userOrbitHoldTimer <= 0) {
        camera.position.x = dampValue(
          camera.position.x,
          choreo.cameraPosition.x,
          4.5,
          dt
        );
        camera.position.y = dampValue(
          camera.position.y,
          choreo.cameraPosition.y,
          4.5,
          dt
        );
        camera.position.z = dampValue(
          camera.position.z,
          choreo.cameraPosition.z,
          4.5,
          dt
        );
        controls.target.x = dampValue(
          controls.target.x,
          choreo.cameraTarget.x,
          5.0,
          dt
        );
        controls.target.y = dampValue(
          controls.target.y,
          choreo.cameraTarget.y,
          5.0,
          dt
        );
        controls.target.z = dampValue(
          controls.target.z,
          choreo.cameraTarget.z,
          5.0,
          dt
        );
      }
      controls.update();

      smoothedLayerVis = dampValue(
        smoothedLayerVis,
        choreo.layerVisibility,
        5.0,
        dt
      );
      smoothedBaselineAlpha = dampValue(
        smoothedBaselineAlpha,
        choreo.baselineArcAlpha,
        5.0,
        dt
      );
      smoothedInterventionAlpha = dampValue(
        smoothedInterventionAlpha,
        choreo.interventionArcAlpha,
        5.0,
        dt
      );
      smoothedResolvedAlpha = dampValue(
        smoothedResolvedAlpha,
        choreo.resolvedPathAlpha,
        5.0,
        dt
      );
      smoothedDisruption = dampValue(
        smoothedDisruption,
        choreo.bridgeDisrupted ? 1.0 : 0.0,
        5.5,
        dt
      );

      waterMat.uniforms.uTime.value = elapsed;

      const focusedHub = WORKFLOW_HUBS.find((hb) => hb.id === activeHubFocus);

      hubRecords.forEach((hRec) => {
        const isFocused = hRec.id === activeHubFocus;
        const isConnectedInDecide =
          activeStageRef.current === 2 &&
          (hRec.id === 'WEST_HARBOR' ||
            hRec.id === 'MIDTOWN' ||
            hRec.id === 'FINANCIAL_CBD' ||
            hRec.id === 'EAST_HUB' ||
            hRec.id === 'SOUTH_IND');

        hRec.buildings.forEach((bItem) => {
          const localProgress = THREE.MathUtils.clamp(
            (assemblyClock - bItem.staggerDelay) / 0.55,
            0.05,
            1.0
          );
          const eased = 1 - Math.pow(1 - localProgress, 3);
          bItem.group.scale.y = eased;
        });

        hRec.beaconMesh.rotation.y = elapsed * 0.9;
        hRec.ringMat.opacity = isFocused
          ? 0.95
          : isConnectedInDecide
            ? 0.78
            : 0.42;
        hRec.ringMat.color.setHex(
          isFocused
            ? 0xe85d36
            : activeStageRef.current === 2 && isConnectedInDecide
              ? 0x2d8a61
              : 0xe85d36
        );
        hRec.beaconMat.emissiveIntensity = isFocused
          ? 0.9
          : isConnectedInDecide
            ? 0.65
            : 0.32;
      });

      corridorRecords.forEach((cRec) => {
        cRec.pulseMat.uniforms.uTime.value = elapsed;

        const isConnectedToFocusedHub = Boolean(
          focusedHub && focusedHub.connectedCorridors.includes(cRec.spec.id)
        );

        if (cRec.spec.isPrimaryDisrupted) {
          cRec.pulseMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
            0.85,
            0.12,
            smoothedDisruption
          );
          cRec.deckMat.color.setHex(
            smoothedDisruption > 0.5 ? 0x4b3634 : 0x2b3036
          );
        } else {
          const baseOp =
            activeStageRef.current === 2 && cRec.spec.isInterventionRoute
              ? 0.95
              : 0.72;
          cRec.pulseMat.uniforms.uOpacity.value = isConnectedToFocusedHub
            ? 1.0
            : baseOp;
          cRec.pulseMat.uniforms.uPulseColor.value.setHex(
            isConnectedToFocusedHub || smoothedResolvedAlpha > 0.5
              ? 0xe85d36
              : 0xd97706
          );
        }
      });

      if (centralDisruptionObj && centralDisruptionObj.userData) {
        const { alertRingMat, barrierMat } = centralDisruptionObj.userData as {
          alertRingMat: THREE.MeshBasicMaterial;
          barrierMat: THREE.MeshStandardMaterial;
        };
        const pulseWave = 0.65 + 0.35 * Math.sin(elapsed * 4.5);
        alertRingMat.opacity = smoothedDisruption * 0.85 * pulseWave;
        barrierMat.opacity = smoothedDisruption * 0.92;
      }

      baselinePulseMats.forEach((mat) => {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uOpacity.value = smoothedBaselineAlpha;
      });

      interventionPulseMats.forEach((mat, idx) => {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uOpacity.value = smoothedInterventionAlpha;
        mat.uniforms.uSpeed.value =
          smoothedResolvedAlpha > 0.5 ? 1.25 : 0.85;
        if (smoothedResolvedAlpha > 0.5) {
          mat.uniforms.uBaseColor.value.setHex(
            idx === 0 ? 0x2d8a61 : 0xe85d36
          );
        }
      });

      const layerRiseFactor = THREE.MathUtils.smoothstep(
        assemblyClock,
        0.25,
        1.1
      );
      const filter = activeLayerFilterRef.current;

      analyticalLayers.forEach((layer, idx) => {
        const filterMult =
          filter === 'all' ? 1.0 : filter === layer.id ? 1.35 : 0.18;
        const effectiveVis =
          smoothedLayerVis * layerRiseFactor * filterMult;

        layer.group.position.y =
          layer.baseElevationY * (0.45 + 0.55 * layerRiseFactor) +
          Math.sin(elapsed * 1.4 + idx) * 0.03;

        layer.frameMat.opacity = Math.min(0.85, 0.42 * effectiveVis);
        layer.stemMat.opacity = Math.min(0.65, 0.28 * effectiveVis);
        layer.nodeDiscMat.opacity = Math.min(0.95, 0.68 * effectiveVis);
        layer.pulseMat.uniforms.uTime.value = elapsed;
        layer.pulseMat.uniforms.uOpacity.value = Math.min(
          0.95,
          0.72 * effectiveVis
        );
      });

      const openCorridors = corridorRecords.filter(
        (c) => !(c.spec.isPrimaryDisrupted && smoothedDisruption > 0.55)
      );
      if (openCorridors.length > 0) {
        for (let i = 0; i < vehicleCount; i++) {
          const cRec = openCorridors[i % openCorridors.length];
          const speed =
            cRec.spec.isInterventionRoute && smoothedInterventionAlpha > 0.5
              ? 0.24
              : 0.16;
          const u = (elapsed * speed + i / vehicleCount) % 1.0;
          cRec.curve.getPointAt(u, pointPos);
          cRec.curve.getTangentAt(u, tangentVec);

          dummyVehicle.position.set(pointPos.x, pointPos.y + 0.08, pointPos.z);
          dummyVehicle.rotation.set(
            0,
            Math.atan2(tangentVec.x, tangentVec.z) + Math.PI / 2,
            0
          );
          dummyVehicle.updateMatrix();
          vehicleInstanced.setMatrixAt(i, dummyVehicle.matrix);

          if (smoothedResolvedAlpha > 0.5 && cRec.spec.isInterventionRoute) {
            vehicleColor.setHex(i % 2 === 0 ? 0xe85d36 : 0x2d8a61);
          } else {
            vehicleColor.setHex(i % 3 === 0 ? 0xe85d36 : 0xfaf8f4);
          }
          vehicleInstanced.setColorAt(i, vehicleColor);
        }
        vehicleInstanced.instanceMatrix.needsUpdate = true;
        if (vehicleInstanced.instanceColor) {
          vehicleInstanced.instanceColor.needsUpdate = true;
        }
      }

      if (reducedMotion || now - lastShadowUpdate >= 250) {
        renderer.shadowMap.needsUpdate = true;
        lastShadowUpdate = now;
      }
      renderer.render(scene, camera);

      // Project 3D Hub World Anchors to 2D Screen Coordinates (only notify React if coordinates moved >= 2px)
      if (now - lastProjectionTime > 120) {
        lastProjectionTime = now;
        const nextProjected: Record<string, ProjectedHubCoord> = {};
        let changed = false;

        hubRecords.forEach((hRec) => {
          scratchProj.copy(hRec.worldAnchor);
          scratchProj.project(camera);
          const rawX = Math.round((scratchProj.x * 0.5 + 0.5) * w);
          const rawY = Math.round((-(scratchProj.y * 0.5) + 0.5) * h);
          const inBounds =
            scratchProj.z < 1.0 &&
            rawX >= 10 &&
            rawX <= w - 10 &&
            rawY >= 16 &&
            rawY <= h - 12;

          const sx = Math.max(48, Math.min(w - 48, rawX));
          const sy = Math.max(52, Math.min(h - 18, rawY));

          nextProjected[hRec.id] = {
            x: sx,
            y: sy,
            visible: inBounds,
          };

          const prev = lastProjectedCache[hRec.id];
          if (
            !prev ||
            prev.visible !== inBounds ||
            Math.abs(prev.x - sx) >= 2 ||
            Math.abs(prev.y - sy) >= 2
          ) {
            changed = true;
          }
        });

        if (changed) {
          lastProjectedCache = nextProjected;
          onProjectedHubsUpdateRef.current(nextProjected);
        }
      }

    };

    const renderLoop = createBudgetedRenderLoop(container, tick, isSoftwareGl, undefined, gl);
    wakeUpLoopFnRef.current = renderLoop.requestRender;
    controls.addEventListener('change', renderLoop.requestRender);

    return () => {
      renderLoop.dispose();
      wakeUpLoopFnRef.current = null;
      resetCameraFnRef.current = null;
      replayAssemblyFnRef.current = null;
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      controls.removeEventListener('change', renderLoop.requestRender);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      envTarget.dispose();
      disposeSceneResources(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="workflow-3d-canvas-container"
      className="w-full h-full relative select-none"
    />
  );
};
