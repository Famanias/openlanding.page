"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import { spectralStore } from "../spectrum/spectral-store";

/**
 * 3D Interactive Model of Prism Light Dispersion:
 * Uncontained, borderless 3D centerpiece that drives the spatial lighting of the entire landing page:
 * 1. Collimated coherent daylight beam enters from off-screen left (x = -18).
 * 2. Strikes monolithic borosilicate crystal triangular prism at the center of focus.
 * 3. Bends and separates through Snell-Descartes internal refraction.
 * 4. Expansive Cauchy angular dispersion fan sweeps across full width and height with smooth exponential alpha falloff.
 *    (Zero hard cut-off edges; light seamlessly washes across the entire landing page).
 * 5. Full pointer drag and parallax with real-time feedback into the global spectral shader store.
 */

export function PrismDispersionModel({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotTargetRef = useRef<{ x: number; y: number }>({ x: 0.08, y: -0.28 });
  const rotCurrentRef = useRef<{ x: number; y: number }>({ x: 0.08, y: -0.28 });

  const storeState = useSyncExternalStore(
    spectralStore.subscribe,
    spectralStore.getSnapshot,
    spectralStore.getSnapshot
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 70);
    camera.position.set(0.0, -0.06, 6.4);

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Responsive camera framing: automatically adapts to any screen width and height
    const updateSize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 700;
      const aspect = width / height;
      camera.aspect = aspect;

      // Adjust camera distance for narrow portrait viewports
      if (aspect < 1.0) {
        camera.position.z = 6.4 + (1.0 - aspect) * 4.0;
      } else {
        camera.position.z = 6.4;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    // World group (for interactive rotation)
    const world = new THREE.Group();
    scene.add(world);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x141724, 2.8);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x00F0FF, 3.4);
    rimLight.position.set(-4, 3, 3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xFF3366, 2.2);
    fillLight.position.set(4, -2, -2);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xF5F3EF, 2.0);
    topLight.position.set(0, 5, 2);
    scene.add(topLight);

    // ==========================================
    // 1. Monolithic Borosilicate Crystal Prism
    // ==========================================
    const prismGroup = new THREE.Group();
    world.add(prismGroup);

    // Equilateral triangular cylinder (radius: 1.35, height: 2.7, 3 segments)
    const prismGeom = new THREE.CylinderGeometry(1.35, 1.35, 2.7, 3, 1, false);
    prismGeom.rotateY(Math.PI / 6);

    const prismMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141724,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.9,
      thickness: 2.0,
      ior: 1.618,
      transparent: true,
      opacity: 0.85,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xF5F3EF),
    });

    const prismMesh = new THREE.Mesh(prismGeom, prismMaterial);
    prismGroup.add(prismMesh);

    // Specular Facet Edges
    const edgesGeom = new THREE.EdgesGeometry(prismGeom);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.7,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeom, edgesMat);
    prismGroup.add(edgesMesh);

    // Inner Refraction Lattice
    const innerGeom = new THREE.CylinderGeometry(1.26, 1.26, 2.55, 3, 1, false);
    innerGeom.rotateY(Math.PI / 6);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8D93A8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    prismGroup.add(new THREE.Mesh(innerGeom, innerMat));

    // Base Azimuth Measurement Ring
    const plinthGeom = new THREE.RingGeometry(1.65, 1.8, 48);
    plinthGeom.rotateX(-Math.PI / 2);
    const plinthMat = new THREE.MeshBasicMaterial({
      color: 0x8D93A8,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const plinthMesh = new THREE.Mesh(plinthGeom, plinthMat);
    plinthMesh.position.y = -1.36;
    prismGroup.add(plinthMesh);

    // Base Degree Ticks
    const tickCount = 36;
    const tickLines: { geom: THREE.BufferGeometry; mat: THREE.LineBasicMaterial }[] = [];
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const isMajor = i % 6 === 0;
      const r1 = 1.8;
      const r2 = isMajor ? 2.05 : 1.92;
      const tickGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(Math.cos(angle) * r1, -1.36, Math.sin(angle) * r1),
        new THREE.Vector3(Math.cos(angle) * r2, -1.36, Math.sin(angle) * r2),
      ]);
      const tickMat = new THREE.LineBasicMaterial({
        color: isMajor ? 0x00F0FF : 0x8D93A8,
        transparent: true,
        opacity: isMajor ? 0.6 : 0.22,
      });
      tickLines.push({ geom: tickGeom, mat: tickMat });
      prismGroup.add(new THREE.Line(tickGeom, tickMat));
    }

    // ==========================================
    // 2. Incident Daylight Beam (Full Width from Left: x = -18)
    // ==========================================
    const rayGroup = new THREE.Group();
    world.add(rayGroup);

    const hitPoint = new THREE.Vector3(-0.68, -0.05, 0.0);
    // Extends well beyond the left edge of any screen
    const beamOrigin = new THREE.Vector3(-18.0, 1.1, 0.2);

    // Incident Core Ray
    const incidentGeom = new THREE.BufferGeometry().setFromPoints([beamOrigin, hitPoint]);
    const incidentMat = new THREE.LineBasicMaterial({
      color: 0xF5F3EF,
      transparent: true,
      opacity: 0.95,
      linewidth: 2,
    });
    rayGroup.add(new THREE.Line(incidentGeom, incidentMat));

    // Incident Soft Halo
    const incidentGlowMat = new THREE.LineBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.35,
    });
    rayGroup.add(new THREE.Line(incidentGeom, incidentGlowMat));

    // Entry Refraction Focal Point
    const focusRingGeom = new THREE.RingGeometry(0.04, 0.09, 16);
    focusRingGeom.rotateY(Math.PI / 3);
    const focusRingMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const focusRing = new THREE.Mesh(focusRingGeom, focusRingMat);
    focusRing.position.copy(hitPoint);
    rayGroup.add(focusRing);

    // ==========================================
    // 3. Internal Refraction Rays
    // ==========================================
    const exitCyan = new THREE.Vector3(0.68, -0.24, 0.08);
    const exitGold = new THREE.Vector3(0.68, -0.14, 0.04);
    const exitVermilion = new THREE.Vector3(0.68, -0.04, -0.02);
    const exitRuby = new THREE.Vector3(0.68, 0.06, -0.06);

    const internalRayMeshes: { geom: THREE.BufferGeometry; mat: THREE.LineBasicMaterial }[] = [];
    const addInternalRay = (exit: THREE.Vector3, color: number) => {
      const geom = new THREE.BufferGeometry().setFromPoints([hitPoint, exit]);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.75,
      });
      internalRayMeshes.push({ geom, mat });
      rayGroup.add(new THREE.Line(geom, mat));
    };

    addInternalRay(exitCyan, 0x00F0FF);
    addInternalRay(exitGold, 0xFFE600);
    addInternalRay(exitVermilion, 0xFF4D00);
    addInternalRay(exitRuby, 0xFF3366);

    // ==========================================
    // 4. Smooth Parametric Volumetric Dispersion Fan
    //    (Decays smoothly to alpha 0 at distance — zero hard cut-off edges!)
    // ==========================================
    const numSteps = 32;
    const numBands = 16;
    const fanPositions: number[] = [];
    const fanUvs: number[] = [];
    const fanColors: number[] = [];
    const fanIndices: number[] = [];

    const colCyan = new THREE.Color(0x00F0FF);
    const colGold = new THREE.Color(0xFFE600);
    const colVermilion = new THREE.Color(0xFF4D00);
    const colRuby = new THREE.Color(0xFF3366);

    const getSpectralColor = (v: number): THREE.Color => {
      if (v < 0.33) {
        return new THREE.Color().lerpColors(colCyan, colGold, v / 0.33);
      } else if (v < 0.66) {
        return new THREE.Color().lerpColors(colGold, colVermilion, (v - 0.33) / 0.33);
      } else {
        return new THREE.Color().lerpColors(colVermilion, colRuby, (v - 0.66) / 0.34);
      }
    };

    for (let i = 0; i <= numSteps; i++) {
      const u = i / numSteps;
      const reach = 26.0;
      const x = 0.68 + u * reach;
      const spread = 0.28 + Math.pow(u, 0.9) * 5.4;

      for (let j = 0; j <= numBands; j++) {
        const v = j / numBands;
        const startPos = new THREE.Vector3().lerpVectors(exitCyan, exitRuby, v);
        const yCurve = (v - 0.5) * spread - u * 1.5;
        const zCurve = Math.sin(u * 2.8) * 0.18;

        fanPositions.push(x, startPos.y + yCurve, startPos.z + zCurve);
        fanUvs.push(u, v);

        const c = getSpectralColor(v);
        fanColors.push(c.r, c.g, c.b);
      }
    }

    for (let i = 0; i < numSteps; i++) {
      for (let j = 0; j < numBands; j++) {
        const row1 = i * (numBands + 1);
        const row2 = (i + 1) * (numBands + 1);

        fanIndices.push(row1 + j, row2 + j, row1 + j + 1);
        fanIndices.push(row1 + j + 1, row2 + j, row2 + j + 1);
      }
    }

    const fanGeom = new THREE.BufferGeometry();
    fanGeom.setAttribute("position", new THREE.Float32BufferAttribute(fanPositions, 3));
    fanGeom.setAttribute("uv", new THREE.Float32BufferAttribute(fanUvs, 2));
    fanGeom.setAttribute("aColor", new THREE.Float32BufferAttribute(fanColors, 3));
    fanGeom.setIndex(fanIndices);

    const fanUniforms = {
      uTime: { value: 0 },
    };

    const fanMat = new THREE.ShaderMaterial({
      uniforms: fanUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vColor;
        attribute vec3 aColor;

        void main() {
          vUv = uv;
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vColor;

        void main() {
          // Longitudinal attenuation: decays smoothly to EXACTLY 0 at distance
          float distFade = smoothstep(1.0, 0.12, vUv.x);
          float coreGlow = exp(-vUv.x * 2.2);
          float longFade = mix(distFade * 0.35, coreGlow, 0.65);

          // Transverse edge feathering:
          float edgeFeather = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.78, vUv.y);

          // Subtle optical caustics along the dispersion rays
          float caustics = 0.88 + 0.12 * sin(vUv.x * 28.0 - uTime * 2.2 + vUv.y * 6.0);

          float alpha = longFade * edgeFeather * caustics * 0.52;
          if (alpha < 0.002) discard;

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const fanMesh = new THREE.Mesh(fanGeom, fanMat);
    rayGroup.add(fanMesh);

    // ==========================================
    // 5. Angular Dispersion Guide Lines (Fading to Alpha 0)
    // ==========================================
    const exitRays: { geom: THREE.BufferGeometry; mat: THREE.LineBasicMaterial }[] = [];
    const createFadingRay = (start: THREE.Vector3, colorHex: number, vIndex: number) => {
      const segments = 24;
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const col = new THREE.Color(colorHex);

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const x = 0.68 + u * 20.0;
        const spread = 0.28 + Math.pow(u, 0.9) * 5.4;
        const y = start.y + (vIndex - 0.5) * spread - u * 1.5;
        const z = start.z + Math.sin(u * 2.8) * 0.18;

        linePositions.push(x, y, z);
        const alpha = Math.max(0.0, Math.pow(1.0 - u, 1.5) * 0.8);
        lineColors.push(col.r * alpha, col.g * alpha, col.b * alpha);
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      geom.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const lineMesh = new THREE.Line(geom, mat);
      rayGroup.add(lineMesh);
      return { geom, mat };
    };

    exitRays.push(createFadingRay(exitCyan, 0x00F0FF, 0.0));
    exitRays.push(createFadingRay(exitGold, 0xFFE600, 0.33));
    exitRays.push(createFadingRay(exitVermilion, 0xFF4D00, 0.66));
    exitRays.push(createFadingRay(exitRuby, 0xFF3366, 1.0));

    // ==========================================
    // 6. Floating Prismatic Photons along the Dispersion Cone
    // ==========================================
    const particleCount = 64;
    const particlePos = new Float32Array(particleCount * 3);
    const particleCol = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];
    const particleBaseColors: THREE.Color[] = [];

    const availableColors = [
      new THREE.Color(0x00F0FF),
      new THREE.Color(0xFFE600),
      new THREE.Color(0xFF4D00),
      new THREE.Color(0xFF3366),
    ];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const colIdx = Math.floor(Math.random() * availableColors.length);
      const c = availableColors[colIdx];
      particleBaseColors.push(c);
      const v = colIdx / (availableColors.length - 1);

      const x = 0.68 + u * 18.0;
      const spread = 0.28 + Math.pow(u, 0.9) * 5.4;
      const startPos = new THREE.Vector3().lerpVectors(exitCyan, exitRuby, v);
      const y = startPos.y + (v - 0.5) * spread - u * 1.5 + (Math.random() - 0.5) * 0.12;
      const z = startPos.z + Math.sin(u * 2.8) * 0.18 + (Math.random() - 0.5) * 0.12;

      particlePos[i * 3] = x;
      particlePos[i * 3 + 1] = y;
      particlePos[i * 3 + 2] = z;

      const alpha = Math.max(0.1, 1.0 - u);
      particleCol[i * 3] = c.r * alpha;
      particleCol[i * 3 + 1] = c.g * alpha;
      particleCol[i * 3 + 2] = c.b * alpha;

      particleSpeeds.push(0.012 + Math.random() * 0.018);
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeom.setAttribute("color", new THREE.BufferAttribute(particleCol, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    rayGroup.add(particles);

    // ==========================================
    // 7. Interactive Pointer Drag & Parallax
    // ==========================================
    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - prevPointerRef.current.x;
        const dy = e.clientY - prevPointerRef.current.y;
        rotTargetRef.current.y += dx * 0.007;
        rotTargetRef.current.x += dy * 0.007;
        rotTargetRef.current.x = Math.max(-0.55, Math.min(0.55, rotTargetRef.current.x));
        prevPointerRef.current = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
        camera.position.x = nx * 0.22;
        camera.position.y = -0.06 + ny * 0.12;
        camera.lookAt(0.1, -0.06, 0);
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // ==========================================
    // 8. Real-time Animation Loop & Store Dispatch
    // ==========================================
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!storeState.reducedMotion) {
        clock += 0.016;
        fanUniforms.uTime.value = clock;

        // Ambient idle drift when not actively dragging
        if (!isDraggingRef.current) {
          rotTargetRef.current.y += 0.0016;
        }

        rotCurrentRef.current.x += (rotTargetRef.current.x - rotCurrentRef.current.x) * 0.08;
        rotCurrentRef.current.y += (rotTargetRef.current.y - rotCurrentRef.current.y) * 0.08;

        world.rotation.x = rotCurrentRef.current.x;
        world.rotation.y = rotCurrentRef.current.y;

        prismGroup.position.y = Math.sin(clock * 0.75) * 0.035;
        rayGroup.position.y = Math.sin(clock * 0.75) * 0.035;

        // Update global spectral store with 3D prism orientation in real-time
        spectralStore.setPrismOrientation(rotCurrentRef.current.y, rotCurrentRef.current.x);

        // Floating photons stream outward along dispersion fan
        const posAttr = particleGeom.attributes.position;
        const colAttr = particleGeom.attributes.color;
        if (posAttr && colAttr) {
          const arrPos = posAttr.array as Float32Array;
          const arrCol = colAttr.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            arrPos[i * 3] += particleSpeeds[i] * 2.2;
            arrPos[i * 3 + 1] -= particleSpeeds[i] * 0.35;
            const progress = (arrPos[i * 3] - 0.68) / 18.0;

            if (arrPos[i * 3] > 18.0) {
              arrPos[i * 3] = exitCyan.x + (Math.random() - 0.5) * 0.1;
              arrPos[i * 3 + 1] = exitCyan.y + (Math.random() - 0.5) * 0.1;
              arrPos[i * 3 + 2] = exitCyan.z + (Math.random() - 0.5) * 0.1;
            } else {
              const alpha = Math.max(0.05, 1.0 - progress);
              const base = particleBaseColors[i];
              arrCol[i * 3] = base.r * alpha;
              arrCol[i * 3 + 1] = base.g * alpha;
              arrCol[i * 3 + 2] = base.b * alpha;
            }
          }
          posAttr.needsUpdate = true;
          colAttr.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      prismGeom.dispose();
      prismMaterial.dispose();
      edgesGeom.dispose();
      edgesMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      plinthGeom.dispose();
      plinthMat.dispose();
      for (const t of tickLines) {
        t.geom.dispose();
        t.mat.dispose();
      }
      incidentGeom.dispose();
      incidentMat.dispose();
      incidentGlowMat.dispose();
      focusRingGeom.dispose();
      focusRingMat.dispose();
      for (const r of internalRayMeshes) {
        r.geom.dispose();
        r.mat.dispose();
      }
      for (const r of exitRays) {
        r.geom.dispose();
        r.mat.dispose();
      }
      fanGeom.dispose();
      fanMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [storeState.reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className ?? ""}`}
      aria-label="Interactive 3D Prism Light Dispersion Model"
    >
      {/* 3D Prism Light Dispersion Canvas: Edge-to-edge full stage without bounding card or div box */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
