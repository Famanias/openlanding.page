'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ExperienceMode } from '../utils/signalLogic';

export type CoreHotspotId = 'models' | 'agents' | 'tools' | 'data';

export interface ProjectedCoreAnchors {
  exitDocX: number;
  exitDocY: number;
  entryDocX: number;
  entryDocY: number;
  centerDocX: number;
  centerDocY: number;
  hotspots: Record<CoreHotspotId, { x: number; y: number }>;
}

export interface HeroCoreCanvasProps {
  selectedHotspot: CoreHotspotId;
  hoveredHotspot: CoreHotspotId | null;
  scrollProgress: number;
  reducedMotion: boolean;
  experienceMode?: ExperienceMode;
  syncPulseActive?: boolean;
  routeTriggerCount?: number;
  onProjectedAnchorsChange?: (anchors: ProjectedCoreAnchors) => void;
}

/**
 * Helper to create a 2D annular sector (segmented ring arc) shape for ExtrudeGeometry.
 */
function createArcRingShape(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const span = Math.abs(endAngle - startAngle);
  if (span >= Math.PI * 1.999) {
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    if (innerRadius > 0.001) {
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    return shape;
  }
  shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
  if (innerRadius > 0.001) {
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
  } else {
    shape.lineTo(0, 0);
  }
  shape.closePath();
  return shape;
}

/**
 * Generates a procedural radial brushed gunmetal bump/roughness CanvasTexture.
 */
function createProceduralMetalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#505a7b';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 96; i++) {
      const r = 8 + (i / 96) * 118;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(180,192,230,0.22)' : 'rgba(12,16,32,0.42)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export const HeroCoreCanvas: React.FC<HeroCoreCanvasProps> = ({
  selectedHotspot,
  hoveredHotspot,
  scrollProgress,
  reducedMotion,
  experienceMode = 'idle',
  syncPulseActive = false,
  routeTriggerCount = 0,
  onProjectedAnchorsChange,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  const stateRef = useRef({
    selectedHotspot,
    hoveredHotspot,
    scrollProgress,
    reducedMotion,
    experienceMode,
    syncPulseActive,
    routeTriggerCount,
    onProjectedAnchorsChange,
  });

  const lastRouteTriggerRef = useRef(routeTriggerCount);
  const routeEventStartTimeRef = useRef<number>(-10);

  useEffect(() => {
    if (routeTriggerCount !== lastRouteTriggerRef.current) {
      lastRouteTriggerRef.current = routeTriggerCount;
      routeEventStartTimeRef.current = performance.now() / 1000;
    }
    stateRef.current = {
      selectedHotspot,
      hoveredHotspot,
      scrollProgress,
      reducedMotion,
      experienceMode,
      syncPulseActive,
      routeTriggerCount,
      onProjectedAnchorsChange,
    };
  }, [
    selectedHotspot,
    hoveredHotspot,
    scrollProgress,
    reducedMotion,
    experienceMode,
    syncPulseActive,
    routeTriggerCount,
    onProjectedAnchorsChange,
  ]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglFallback(true);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Restrained exposure so gunmetal stays dark and only optical edges & packets glow
    renderer.toneMappingExposure = 0.92;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(360, container.clientWidth || 720);
    const height = Math.max(360, container.clientHeight || 620);
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('aria-hidden', 'true');

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(-0.08, 0.04, 9.35);
    camera.lookAt(0, 0, 0);

    // High-contrast architectural lighting: dim warm-neutral key + localized cool rim + deep aperture point light
    const hemiLight = new THREE.HemisphereLight(0x9da7c7, 0x060812, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xeef0fa, 1.55);
    keyLight.position.set(4.5, 5.0, 6.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7c66f5, 2.2);
    rimLight.position.set(-5.2, -3.2, 4.8);
    scene.add(rimLight);

    const coreChamberLight = new THREE.PointLight(0x7e64ff, 2.8, 6.5, 1.6);
    coreChamberLight.position.set(0.0, 0.0, -0.35);
    scene.add(coreChamberLight);

    const coreGroup = new THREE.Group();
    const baseRotX = -0.44;
    const baseRotY = -0.34;
    const baseRotZ = 0.22;
    coreGroup.rotation.set(baseRotX, baseRotY, baseRotZ);
    coreGroup.position.set(0.22, 0.04, 0);
    scene.add(coreGroup);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const bumpTex = createProceduralMetalTexture();
    bumpTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Dark obsidian / gunmetal / titanium material hierarchy (no pale washed-out white rings)
    const matAbyssChamber = new THREE.MeshStandardMaterial({
      color: 0x060913,
      emissive: new THREE.Color(0x03050b),
      emissiveIntensity: 0.2,
      metalness: 0.75,
      roughness: 0.85,
    });
    const matDarkGraphite = new THREE.MeshStandardMaterial({
      color: 0x10162a,
      emissive: new THREE.Color(0x070a16),
      emissiveIntensity: 0.25,
      metalness: 0.78,
      roughness: 0.62,
      bumpMap: bumpTex,
      bumpScale: 0.016,
    });
    const matGunmetalTitanium = new THREE.MeshStandardMaterial({
      color: 0x222c4e,
      emissive: new THREE.Color(0x0d1328),
      emissiveIntensity: 0.28,
      metalness: 0.88,
      roughness: 0.34,
      bumpMap: bumpTex,
      bumpScale: 0.02,
    });
    const matBrushedSteel = new THREE.MeshPhysicalMaterial({
      color: 0x4b5989,
      emissive: new THREE.Color(0x172042),
      emissiveIntensity: 0.26,
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
    });
    const matCobaltStructural = new THREE.MeshStandardMaterial({
      color: 0x2c3b82,
      emissive: new THREE.Color(0x162052),
      emissiveIntensity: 0.38,
      metalness: 0.82,
      roughness: 0.28,
    });
    const matOpticalWaveguide = new THREE.MeshPhysicalMaterial({
      color: 0x6b56d6,
      emissive: new THREE.Color(0x3b2b94),
      emissiveIntensity: 0.42,
      metalness: 0.15,
      roughness: 0.18,
      transparent: true,
      opacity: 0.56,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const matOpticalActive = new THREE.MeshPhysicalMaterial({
      color: 0x9980ff,
      emissive: new THREE.Color(0x5c43d6),
      emissiveIntensity: 0.65,
      metalness: 0.18,
      roughness: 0.14,
      transparent: true,
      opacity: 0.68,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const matRimAccent = new THREE.MeshBasicMaterial({
      color: 0xc8baff,
      transparent: true,
      opacity: 0.78,
    });

    materialsToDispose.push(
      matAbyssChamber,
      matDarkGraphite,
      matGunmetalTitanium,
      matBrushedSteel,
      matCobaltStructural,
      matOpticalWaveguide,
      matOpticalActive,
      matRimAccent
    );

    // =========================================================================
    // LAYER 1–3: RECESSED CENTRAL CHAMBER & MID-DEPTH MECHANICAL APERTURE
    // =========================================================================
    const wellGroup = new THREE.Group();
    coreGroup.add(wellGroup);

    // Deep dark chamber floor disk creating true occlusion tunnel
    const floorGeo = new THREE.CircleGeometry(0.46, 48);
    geometriesToDispose.push(floorGeo);
    const floorMesh = new THREE.Mesh(floorGeo, matAbyssChamber);
    floorMesh.position.z = -1.02;
    wellGroup.add(floorMesh);

    // Subtle deep-well optical core ring (parallax anchor deep inside chamber)
    const innerCoreLensGeo = new THREE.TorusGeometry(0.24, 0.022, 16, 48);
    geometriesToDispose.push(innerCoreLensGeo);
    const innerCoreLensMat = new THREE.MeshBasicMaterial({
      color: 0xa58aff,
      transparent: true,
      opacity: 0.85,
    });
    materialsToDispose.push(innerCoreLensMat);
    const innerCoreLens = new THREE.Mesh(innerCoreLensGeo, innerCoreLensMat);
    innerCoreLens.position.z = -0.88;
    wellGroup.add(innerCoreLens);

    const wellSteps = [
      { rIn: 0.24, rOut: 0.48, depth: 0.22, z: -0.92, mat: matAbyssChamber },
      { rIn: 0.42, rOut: 0.68, depth: 0.26, z: -0.7, mat: matDarkGraphite },
      { rIn: 0.6, rOut: 0.88, depth: 0.28, z: -0.46, mat: matGunmetalTitanium },
      { rIn: 0.78, rOut: 1.08, depth: 0.26, z: -0.22, mat: matDarkGraphite },
    ];
    wellSteps.forEach((step, idx) => {
      const shape = createArcRingShape(step.rIn, step.rOut, 0, Math.PI * 2);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: step.depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.018,
        bevelSegments: 2,
        curveSegments: 48,
      });
      geometriesToDispose.push(geo);
      const mesh = new THREE.Mesh(geo, step.mat);
      mesh.position.z = step.z;
      wellGroup.add(mesh);

      const lipGeo = new THREE.TorusGeometry(step.rIn + 0.02, 0.012, 12, 64);
      geometriesToDispose.push(lipGeo);
      const lipMesh = new THREE.Mesh(
        lipGeo,
        idx === 1 ? matRimAccent : matBrushedSteel
      );
      lipMesh.position.z = step.z + step.depth + 0.01;
      wellGroup.add(lipMesh);
    });

    // Mid-depth mechanical aperture blades (36 instanced dark-steel stator blades)
    const ribCount = 36;
    const ribGeo = new THREE.BoxGeometry(0.22, 0.028, 0.18);
    geometriesToDispose.push(ribGeo);
    const ribInstanced = new THREE.InstancedMesh(ribGeo, matBrushedSteel, ribCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < ribCount; i++) {
      const angle = (i / ribCount) * Math.PI * 2;
      const radius = 0.64;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, -0.32);
      dummy.rotation.set(0, 0, angle + 0.28); // angled turbine iris blades
      dummy.scale.set(1, i % 3 === 0 ? 1.55 : 0.85, 1);
      dummy.updateMatrix();
      ribInstanced.setMatrixAt(i, dummy.matrix);
    }
    ribInstanced.instanceMatrix.needsUpdate = true;
    ribInstanced.computeBoundingSphere();
    wellGroup.add(ribInstanced);

    // =========================================================================
    // LAYER 4–7: OUTER STRUCTURAL GUNMETAL ASSEMBLY (Parts 5-8)
    // =========================================================================
    interface AnimatedRingLayer {
      group: THREE.Group;
      speed: number;
      baseZ: number;
      bootOffsetAngle: number;
      sectorCategory: CoreHotspotId;
      emissiveMat?: THREE.MeshPhysicalMaterial;
      edgeMat?: THREE.LineBasicMaterial;
    }
    const animatedRings: AnimatedRingLayer[] = [];

    const mechanicalArcConfigs: {
      rIn: number;
      rOut: number;
      start: number;
      end: number;
      depth: number;
      z: number;
      mat: THREE.Material;
      speed: number;
      withBevelRim?: boolean;
      category: CoreHotspotId;
    }[] = [
      {
        rIn: 0.92,
        rOut: 1.16,
        start: 0.18,
        end: 2.38,
        depth: 0.24,
        z: -0.02,
        mat: matGunmetalTitanium,
        speed: 0.045,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 0.94,
        rOut: 1.14,
        start: 2.72,
        end: 4.58,
        depth: 0.22,
        z: -0.06,
        mat: matDarkGraphite,
        speed: 0.045,
        withBevelRim: true,
        category: 'data',
      },
      {
        rIn: 0.94,
        rOut: 1.14,
        start: 4.92,
        end: 6.08,
        depth: 0.2,
        z: -0.04,
        mat: matCobaltStructural,
        speed: 0.045,
        category: 'tools',
      },
      {
        rIn: 1.22,
        rOut: 1.54,
        start: -0.32,
        end: 1.82,
        depth: 0.28,
        z: 0.02,
        mat: matDarkGraphite,
        speed: -0.032,
        withBevelRim: true,
        category: 'agents',
      },
      {
        rIn: 1.24,
        rOut: 1.52,
        start: 2.22,
        end: 4.15,
        depth: 0.26,
        z: 0.0,
        mat: matGunmetalTitanium,
        speed: -0.032,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 1.26,
        rOut: 1.48,
        start: 4.48,
        end: 5.62,
        depth: 0.22,
        z: -0.02,
        mat: matBrushedSteel,
        speed: -0.032,
        withBevelRim: true,
        category: 'tools',
      },
      {
        rIn: 1.6,
        rOut: 1.92,
        start: 0.68,
        end: 3.48,
        depth: 0.22,
        z: -0.04,
        mat: matGunmetalTitanium,
        speed: 0.022,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 1.62,
        rOut: 1.9,
        start: 3.92,
        end: 6.38,
        depth: 0.22,
        z: -0.06,
        mat: matDarkGraphite,
        speed: 0.022,
        withBevelRim: true,
        category: 'data',
      },
    ];

    mechanicalArcConfigs.forEach((cfg, idx) => {
      const layerGroup = new THREE.Group();
      const shape = createArcRingShape(cfg.rIn, cfg.rOut, cfg.start, cfg.end);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: cfg.depth,
        bevelEnabled: true,
        bevelThickness: 0.026,
        bevelSize: 0.022,
        bevelSegments: 3,
        curveSegments: 56,
      });
      geometriesToDispose.push(geo);

      const mesh = new THREE.Mesh(geo, cfg.mat);
      layerGroup.add(mesh);

      if (cfg.withBevelRim) {
        const rimShape = createArcRingShape(
          cfg.rOut - 0.018,
          cfg.rOut + 0.004,
          cfg.start + 0.04,
          cfg.end - 0.04
        );
        const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
          depth: 0.012,
          bevelEnabled: false,
          curveSegments: 48,
        });
        geometriesToDispose.push(rimGeo);
        const rimMesh = new THREE.Mesh(rimGeo, matRimAccent);
        rimMesh.position.z = cfg.depth + 0.015;
        layerGroup.add(rimMesh);
      }

      layerGroup.position.z = cfg.z;
      coreGroup.add(layerGroup);
      animatedRings.push({
        group: layerGroup,
        speed: cfg.speed,
        baseZ: cfg.z,
        bootOffsetAngle: (idx % 2 === 0 ? 1 : -1) * (0.28 + idx * 0.05),
        sectorCategory: cfg.category,
      });
    });

    // =========================================================================
    // LAYER 8–9: OPTICAL ROUTING RING & SELECTIVE EMISSIVE WAVEGUIDES
    // =========================================================================
    const glassShellConfigs: {
      rIn: number;
      rOut: number;
      start: number;
      end: number;
      depth: number;
      z: number;
      bright?: boolean;
      speed: number;
      category: CoreHotspotId;
    }[] = [
      {
        rIn: 1.7,
        rOut: 2.08,
        start: 1.28,
        end: 3.45,
        depth: 0.09,
        z: 0.22,
        bright: true,
        speed: 0.018,
        category: 'models',
      },
      {
        rIn: 1.72,
        rOut: 2.1,
        start: 4.55,
        end: 6.38,
        depth: 0.09,
        z: 0.24,
        bright: false,
        speed: -0.016,
        category: 'agents',
      },
      {
        rIn: 1.0,
        rOut: 1.22,
        start: 1.05,
        end: 3.12,
        depth: 0.08,
        z: 0.3,
        bright: true,
        speed: -0.025,
        category: 'models',
      },
      {
        rIn: 1.02,
        rOut: 1.24,
        start: 4.2,
        end: 6.12,
        depth: 0.08,
        z: 0.28,
        bright: false,
        speed: 0.025,
        category: 'tools',
      },
      {
        rIn: 2.16,
        rOut: 2.34,
        start: 1.42,
        end: 3.18,
        depth: 0.045,
        z: 0.12,
        bright: false,
        speed: 0.012,
        category: 'data',
      },
      {
        rIn: 2.16,
        rOut: 2.32,
        start: 4.72,
        end: 6.08,
        depth: 0.045,
        z: 0.12,
        bright: false,
        speed: -0.012,
        category: 'tools',
      },
    ];

    glassShellConfigs.forEach((shell, idx) => {
      const shellGroup = new THREE.Group();
      const shape = createArcRingShape(shell.rIn, shell.rOut, shell.start, shell.end);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: shell.depth,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.012,
        bevelSegments: 2,
        curveSegments: 56,
      });
      geometriesToDispose.push(geo);

      const mat = (shell.bright ? matOpticalActive : matOpticalWaveguide).clone();
      materialsToDispose.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.renderOrder = 10 + idx;
      shellGroup.add(mesh);

      const edgeGeo = new THREE.EdgesGeometry(geo, 22);
      geometriesToDispose.push(edgeGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: shell.bright ? 0xd4c9ff : 0x8f7ef2,
        transparent: true,
        opacity: shell.bright ? 0.85 : 0.48,
      });
      materialsToDispose.push(edgeMat);
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLines.renderOrder = 12 + idx;
      shellGroup.add(edgeLines);

      shellGroup.position.z = shell.z;
      coreGroup.add(shellGroup);
      animatedRings.push({
        group: shellGroup,
        speed: shell.speed,
        baseZ: shell.z,
        bootOffsetAngle: (idx % 2 === 0 ? -1 : 1) * (0.35 + idx * 0.06),
        sectorCategory: shell.category,
        emissiveMat: mat,
        edgeMat,
      });
    });

    // =========================================================================
    // LAYER 10: CALIBRATION TRACKS & RADIAL GRADUATION TICKS (InstancedMesh)
    // =========================================================================
    const tickCount = 120;
    const tickGeo = new THREE.BoxGeometry(0.07, 0.012, 0.016);
    geometriesToDispose.push(tickGeo);
    const tickMat = new THREE.MeshBasicMaterial({
      color: 0xc2b6f2,
      transparent: true,
      opacity: 0.68,
    });
    materialsToDispose.push(tickMat);
    const tickInstanced = new THREE.InstancedMesh(tickGeo, tickMat, tickCount);
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const r = i % 2 === 0 ? 1.96 : 1.56;
      dummy.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.34);
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(i % 6 === 0 ? 1.85 : 0.95, 1, 1);
      dummy.updateMatrix();
      tickInstanced.setMatrixAt(i, dummy.matrix);
    }
    tickInstanced.instanceMatrix.needsUpdate = true;
    tickInstanced.computeBoundingSphere();
    coreGroup.add(tickInstanced);

    // Fine concentric technical reference rings
    [1.16, 1.58, 2.12, 2.48].forEach((r, idx) => {
      const trackGeo = new THREE.RingGeometry(r, r + 0.01, 96);
      geometriesToDispose.push(trackGeo);
      const trackMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x9b82ff : 0x6c78a4,
        transparent: true,
        opacity: idx >= 2 ? 0.28 : 0.45,
        side: THREE.DoubleSide,
      });
      materialsToDispose.push(trackMat);
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.position.z = idx >= 2 ? -0.08 : 0.14;
      coreGroup.add(trackMesh);
    });

    // =========================================================================
    // LAYER 11–12: PHYSICAL INTAKE / OUTPUT PORTS & CURVED INTERNAL ROUTING MANIFOLD
    // (Routes around the recessed central aperture rather than cutting across the hole!)
    // =========================================================================
    const exitAnchorObj = new THREE.Object3D();
    exitAnchorObj.position.set(-1.32, -2.06, 0.24);
    coreGroup.add(exitAnchorObj);

    const entryAnchorObj = new THREE.Object3D();
    entryAnchorObj.position.set(1.62, 1.42, 0.26);
    coreGroup.add(entryAnchorObj);

    const centerAnchorObj = new THREE.Object3D();
    centerAnchorObj.position.set(0, 0, 0.12);
    coreGroup.add(centerAnchorObj);

    const hotspotAnchors: Record<CoreHotspotId, THREE.Object3D> = {
      models: new THREE.Object3D(),
      agents: new THREE.Object3D(),
      tools: new THREE.Object3D(),
      data: new THREE.Object3D(),
    };
    hotspotAnchors.models.position.set(-0.98, 1.84, 0.28);
    hotspotAnchors.agents.position.set(1.94, 0.44, 0.28);
    hotspotAnchors.tools.position.set(1.42, -1.54, 0.26);
    hotspotAnchors.data.position.set(-0.54, -1.92, 0.24);
    Object.values(hotspotAnchors).forEach((obj) => coreGroup.add(obj));

    // Machined 3D Port Collars at Upper-Right Intake & Lower-Left Output
    const portCollarGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.14, 24);
    portCollarGeo.rotateX(Math.PI / 2);
    geometriesToDispose.push(portCollarGeo);

    const portEmitterGeo = new THREE.SphereGeometry(0.065, 16, 16);
    geometriesToDispose.push(portEmitterGeo);

    const intakePortMat = new THREE.MeshBasicMaterial({
      color: 0xe2d9ff,
      transparent: true,
      opacity: 0.92,
    });
    const outputPortMat = new THREE.MeshBasicMaterial({
      color: 0xf3f4fa,
      transparent: true,
      opacity: 0.95,
    });
    materialsToDispose.push(intakePortMat, outputPortMat);

    const intakePos = new THREE.Vector3(1.24, 1.12, 0.26);
    const outputPos = new THREE.Vector3(-0.92, -1.24, 0.24);

    const intakeCollar = new THREE.Mesh(portCollarGeo, matBrushedSteel);
    intakeCollar.position.copy(intakePos);
    const intakeEmitter = new THREE.Mesh(portEmitterGeo, intakePortMat);
    intakeEmitter.position.copy(intakePos).setZ(0.32);

    const outputCollar = new THREE.Mesh(portCollarGeo, matBrushedSteel);
    outputCollar.position.copy(outputPos);
    const outputEmitter = new THREE.Mesh(portEmitterGeo, outputPortMat);
    outputEmitter.position.copy(outputPos).setZ(0.3);

    coreGroup.add(intakeCollar, intakeEmitter, outputCollar, outputEmitter);

    // Internal curved routing waveguides that wrap AROUND the central chamber (r ~ 0.95..1.35)
    // so streams enter the intake port, route through the left/right ring manifold, and exit the output port!
    const manifoldDefinitions = [
      {
        // Upper-left MODELS / DATA perimeter manifold curve
        pts: [
          intakePos.clone(),
          new THREE.Vector3(0.45, 1.32, 0.26),
          new THREE.Vector3(-0.62, 1.12, 0.26),
          new THREE.Vector3(-1.18, 0.25, 0.25),
          new THREE.Vector3(-1.16, -0.58, 0.24),
          outputPos.clone(),
        ],
        coreRadius: 0.018,
        haloRadius: 0.052,
        color: 0xf3f4fa,
        haloColor: 0x9b82ff,
        category: 'models' as CoreHotspotId,
      },
      {
        // Lower-right AGENTS / TOOLS perimeter manifold curve
        pts: [
          intakePos.clone(),
          new THREE.Vector3(1.38, 0.38, 0.25),
          new THREE.Vector3(1.18, -0.54, 0.24),
          new THREE.Vector3(0.52, -1.18, 0.24),
          new THREE.Vector3(-0.24, -1.32, 0.24),
          outputPos.clone(),
        ],
        coreRadius: 0.015,
        haloRadius: 0.044,
        color: 0xd9ceff,
        haloColor: 0x5367f9,
        category: 'agents' as CoreHotspotId,
      },
    ];

    const pulseMeshes: {
      mesh: THREE.Mesh;
      haloMesh: THREE.Mesh;
      curve: THREE.CatmullRomCurve3;
      offset: number;
      category: CoreHotspotId;
    }[] = [];

    manifoldDefinitions.forEach((def, idx) => {
      const curve = new THREE.CatmullRomCurve3(def.pts);
      const coreTubeGeo = new THREE.TubeGeometry(curve, 72, def.coreRadius, 12, false);
      const haloTubeGeo = new THREE.TubeGeometry(curve, 72, def.haloRadius, 12, false);
      geometriesToDispose.push(coreTubeGeo, haloTubeGeo);

      const coreMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.88,
      });
      const haloMat = new THREE.MeshBasicMaterial({
        color: def.haloColor,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });
      materialsToDispose.push(coreMat, haloMat);

      const coreMesh = new THREE.Mesh(coreTubeGeo, coreMat);
      const haloMesh = new THREE.Mesh(haloTubeGeo, haloMat);
      coreMesh.renderOrder = 22;
      haloMesh.renderOrder = 21;
      coreGroup.add(coreMesh, haloMesh);

      const beadGeo = new THREE.SphereGeometry(def.coreRadius * 2.3, 14, 14);
      const beadHaloGeo = new THREE.SphereGeometry(def.haloRadius * 1.45, 14, 14);
      geometriesToDispose.push(beadGeo, beadHaloGeo);
      const beadMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
      });
      const beadHaloMat = new THREE.MeshBasicMaterial({
        color: 0xa58aff,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      });
      materialsToDispose.push(beadMat, beadHaloMat);
      const beadMesh = new THREE.Mesh(beadGeo, beadMat);
      const beadHaloMesh = new THREE.Mesh(beadHaloGeo, beadHaloMat);
      beadMesh.renderOrder = 25;
      beadHaloMesh.renderOrder = 24;
      coreGroup.add(beadMesh, beadHaloMesh);
      pulseMeshes.push({
        mesh: beadMesh,
        haloMesh: beadHaloMesh,
        curve,
        offset: idx * 0.48,
        category: def.category,
      });
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (stateRef.current.reducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      // Subtle 2-4 degree maximum tilt
      targetPointerX = THREE.MathUtils.clamp(nx, -1, 1) * 0.055;
      targetPointerY = THREE.MathUtils.clamp(ny, -1, 1) * 0.055;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const _worldVec = new THREE.Vector3();
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    let lastAnchorUpdate = 0;
    const projectAnchorsToDoc = (now: number) => {
      const cb = stateRef.current.onProjectedAnchorsChange;
      if (!cb || now - lastAnchorUpdate < 45) return;
      lastAnchorUpdate = now;

      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      const toDocAndLocal = (obj: THREE.Object3D) => {
        obj.getWorldPosition(_worldVec);
        _worldVec.project(camera);
        const localX = (_worldVec.x * 0.5 + 0.5) * rect.width;
        const localY = (-_worldVec.y * 0.5 + 0.5) * rect.height;
        return {
          localX,
          localY,
          docX: rect.left + scrollX + localX,
          docY: rect.top + scrollY + localY,
        };
      };

      coreGroup.updateMatrixWorld(true);
      const exitPt = toDocAndLocal(exitAnchorObj);
      const entryPt = toDocAndLocal(entryAnchorObj);
      const centerPt = toDocAndLocal(centerAnchorObj);
      const mPt = toDocAndLocal(hotspotAnchors.models);
      const aPt = toDocAndLocal(hotspotAnchors.agents);
      const tPt = toDocAndLocal(hotspotAnchors.tools);
      const dPt = toDocAndLocal(hotspotAnchors.data);

      cb({
        exitDocX: exitPt.docX,
        exitDocY: exitPt.docY,
        entryDocX: entryPt.docX,
        entryDocY: entryPt.docY,
        centerDocX: centerPt.docX,
        centerDocY: centerPt.docY,
        hotspots: {
          models: { x: mPt.localX, y: mPt.localY },
          agents: { x: aPt.localX, y: aPt.localY },
          tools: { x: tPt.localX, y: tPt.localY },
          data: { x: dPt.localX, y: dPt.localY },
        },
      });
    };

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(300, container.clientWidth);
      const h = Math.max(300, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
      lastAnchorUpdate = 0;
      projectAnchorsToDoc(performance.now());
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const startTimeMs = performance.now();
    let prevTimeMs = startTimeMs;
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      let polls = 0;
      const poll = () => {
        if (isDisposed) return;
        polls++;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED && polls < 12) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;

      const nowMs = performance.now();
      const dt = Math.min((nowMs - prevTimeMs) / 1000, 0.1);
      prevTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;

      const {
        selectedHotspot: activeHotspot,
        hoveredHotspot: hoverHotspot,
        scrollProgress: sProg,
        reducedMotion: reduceMot,
        syncPulseActive: isSyncEvent,
      } = stateRef.current;

      if (isVisible) {
        // A. Boot sequence (1.8 seconds): segmented arcs settle from offset angles, aperture initializes
        const bootT = reduceMot ? 1 : Math.min(1, elapsed / 1.8);
        const bootEase = 1 - Math.pow(1 - bootT, 3);

        // C. Route event causal timing window (1.2s after any route/model selection change)
        const routeAge = elapsed - (routeEventStartTimeRef.current - startTimeMs / 1000);
        const isRouteBurst = routeAge >= 0 && routeAge < 1.25;
        const routeBurstIntensity = isRouteBurst ? Math.sin((routeAge / 1.25) * Math.PI) : 0;

        // D. Synchronization event (periodic 11s calm aperture alignment wave)
        const syncWave = isSyncEvent ? 0.5 + 0.5 * Math.sin(elapsed * 4.0) : 0;

        const dampFactor = 1 - Math.exp(-6 * dt);
        currentPointerX += (targetPointerX - currentPointerX) * dampFactor;
        currentPointerY += (targetPointerY - currentPointerY) * dampFactor;

        // F. Scroll handoff: core gently recedes and tilts as hero transitions away
        const scrollTiltX = THREE.MathUtils.clamp(sProg * 0.2, 0, 0.14);
        const scrollShiftY = THREE.MathUtils.clamp(sProg * 0.26, 0, 0.2);
        const scrollRecedeZ = THREE.MathUtils.clamp(sProg * -0.45, -0.35, 0);

        coreGroup.rotation.x = baseRotX + currentPointerY - scrollTiltX;
        coreGroup.rotation.y = baseRotY + currentPointerX;
        coreGroup.rotation.z = baseRotZ + (1 - bootEase) * -0.32;
        coreGroup.position.y = 0.04 + scrollShiftY;
        coreGroup.position.z = scrollRecedeZ;

        const focusTarget = hoverHotspot || activeHotspot;

        // Intake & Output port causal pulse on route event or scroll handoff
        const intakeScale = 1 + routeBurstIntensity * 0.45 + syncWave * 0.2;
        const outputScale =
          1 +
          (isRouteBurst && routeAge > 0.45 ? 0.5 : 0) +
          (sProg > 0.02 && sProg < 0.35 ? 0.35 : 0);
        intakeEmitter.scale.setScalar(intakeScale);
        outputEmitter.scale.setScalar(outputScale);

        // Inner chamber lens subtle breathing
        innerCoreLens.scale.setScalar(0.95 + 0.08 * Math.sin(elapsed * 2.1) + syncWave * 0.12);
        coreChamberLight.intensity = 2.4 + routeBurstIntensity * 1.4 + syncWave * 1.1;

        for (let i = 0; i < animatedRings.length; i++) {
          const item = animatedRings[i];
          const isFocused = item.sectorCategory === focusTarget;
          const targetZ =
            item.baseZ * (0.82 + 0.18 * bootEase) +
            (1 - bootEase) * (0.18 * ((i % 3) - 1)) +
            (isFocused ? 0.055 : 0) +
            syncWave * 0.02;
          item.group.position.z += (targetZ - item.group.position.z) * dampFactor;

          // Modulate optical ring emissive intensity so only focused/routed sector glows brightly
          if (item.emissiveMat) {
            const targetEmissive = isFocused
              ? 0.92 + routeBurstIntensity * 0.55 + syncWave * 0.3
              : 0.32 + syncWave * 0.18;
            item.emissiveMat.emissiveIntensity +=
              (targetEmissive - item.emissiveMat.emissiveIntensity) * dampFactor;
          }
          if (item.edgeMat) {
            const targetOp = isFocused ? 0.95 : 0.42;
            item.edgeMat.opacity += (targetOp - item.edgeMat.opacity) * dampFactor;
          }

          if (!reduceMot) {
            if (bootT < 1) {
              item.group.rotation.z = item.bootOffsetAngle * (1 - bootEase);
            } else if (isSyncEvent) {
              // During synchronization event, rings gently align toward 0 offset
              item.group.rotation.z *= Math.pow(0.4, dt);
            } else {
              const speedMult = isFocused ? 1.35 : 0.55;
              item.group.rotation.z += item.speed * speedMult * dt;
            }
          }
        }

        // Traveling internal manifold light packets from Intake Port -> Sector -> Output Port
        for (let i = 0; i < pulseMeshes.length; i++) {
          const p = pulseMeshes[i];
          const speed = isRouteBurst ? 0.85 : 0.36;
          const u = reduceMot ? 0.5 : (elapsed * speed + p.offset) % 1;
          p.curve.getPointAt(u, _worldVec);
          p.mesh.position.copy(_worldVec);
          p.haloMesh.position.copy(_worldVec);
          const pulseScale = p.category === focusTarget ? 1.25 + routeBurstIntensity * 0.4 : 0.85;
          p.mesh.scale.setScalar(pulseScale);
          p.haloMesh.scale.setScalar(pulseScale);
        }

        renderer.render(scene, camera);
        projectAnchorsToDoc(nowMs);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    renderer.render(scene, camera);
    projectAnchorsToDoc(performance.now());
    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      bumpTex.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglFallback) {
    return (
      <div
        className="relative w-full h-full flex items-center justify-center p-6"
        data-testid="hero-core-fallback"
      >
        <img
          src="/templates/arcsignal/hero-core-fallback.svg"
          alt="Arc & Signal 2.5D Orchestration Core Illustration"
          referrerPolicy="no-referrer"
          className="w-full max-w-[520px] h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      data-testid="hero-core-canvas"
      className="relative z-20 w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[600px]"
    />
  );
};
