"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { clamp, lerp } from "../motion/math";
import { volumeGestureToFieldTuning, type VolumeGestureTuning } from "./controls";

type PressureFieldProps = { seed: number; density?: number; drift?: number; contour?: number; depth?: number; amplitude?: number; frequency?: number; speed?: number; onMount?: (mounted: boolean) => void; onGesture?: (tuning: VolumeGestureTuning) => void };

const PALETTE = [0xff5b47, 0x2de2a6, 0x8a6cff, 0xffd447];

function makeFieldMaterial(seed: number, density: number, drift: number, contour: number, depth: number, amplitude: number, frequency: number, speed: number, layer: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSeed: { value: seed },
      uColorA: { value: new THREE.Color(PALETTE[0]) },
      uColorB: { value: new THREE.Color(PALETTE[2]) },
      uDensity: { value: density },
      uDrift: { value: drift },
      uContour: { value: contour },
      uDepth: { value: depth },
      uAmplitude: { value: amplitude },
      uFrequency: { value: frequency },
      uSpeed: { value: speed },
      uLayer: { value: layer },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform float uSeed;
      uniform float uDensity;
      uniform float uDrift;
      uniform float uContour;
      uniform float uDepth;
      uniform float uAmplitude;
      uniform float uFrequency;
      uniform float uSpeed;
      uniform float uLayer;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vUv = uv;
        vec3 p = position;
        vec2 fieldUv = uv * 2.0 - 1.0;
        float envelope = 1.0 - smoothstep(.45, 1.15, length(fieldUv * vec2(.8, .72)));
        float wave = sin(p.x * uFrequency * (1.0 + uDensity * .008) + uTime * uSpeed + uSeed + uLayer * .8) * (.08 + uAmplitude * .26);
        wave += cos(p.y * uFrequency * (1.1 + uDensity * .012) - uTime * (uSpeed * .72) + uProgress * 5.0 + uLayer) * (.06 + uAmplitude * .18);
        float fold = sin((p.x + p.y) * (1.3 + uContour * .02) + uTime * uSpeed * .48 + uProgress * 8.0) * (.03 + uDepth * .04);
        p.x += sin(p.y * 1.3 + uTime * uSpeed + uLayer) * .08 * envelope;
        p.y += cos(p.x * 1.6 - uTime * uSpeed * .8 + uLayer) * .06 * envelope;
        p.z += (wave + fold) * envelope + uLayer * uDepth * .18;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform float uContour;
      uniform float uDepth;
      uniform float uLayer;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        float sweep = sin(vUv.x * 5.0 + vUv.y * 3.0 + uTime * .35 + uProgress * 6.28) * .5 + .5;
        float bands = smoothstep(.38, .62, sin((vUv.y + vWave * 1.5) * (8.0 + uContour * .24) + uTime * .16) * .5 + .5);
        vec3 color = mix(uColorA, uColorB, clamp(sweep + bands * .18 + uLayer * .08, 0.0, 1.0));
        float faceLight = .8 + clamp(vWave * 2.4 + uDepth * .08, -.18, .22);
        color *= faceLight;
        float edge = smoothstep(0.0, .18, vUv.y) * smoothstep(1.0, .8, vUv.y);
        gl_FragColor = vec4(color, edge * (.62 - uLayer * .1));
      }
    `,
  });
}

function makeContour(index: number) {
  const points: THREE.Vector3[] = [];
  const turns = 1.4 + index * .18;
  for (let i = 0; i <= 96; i += 1) {
    const t = i / 96;
    const a = t * Math.PI * 2 * turns + index * .6;
    const radius = 2.5 + Math.sin(t * Math.PI * 2 + index) * .55 + index * .28;
    points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a * 1.2) * radius * .56, (t - .5) * 4.8 + Math.sin(a * 2.0) * .18));
  }
  return new THREE.CatmullRomCurve3(points);
}

export function PressureField({ seed, density = 62, drift = 38, contour = 74, depth = 1, amplitude = .5, frequency = 1.5, speed = .3, onMount, onGesture }: PressureFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef(seed);
  const paramsRef = useRef({ density, drift, contour, depth, amplitude, frequency, speed });
  const [active, setActive] = useState(false);
  const [canStart, setCanStart] = useState(false);

  useEffect(() => { seedRef.current = seed; }, [seed]);
  useEffect(() => { paramsRef.current = { density, drift, contour, depth, amplitude, frequency, speed }; }, [density, drift, contour, depth, amplitude, frequency, speed]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce) { onMount?.(false); return; }
    let disposed = false;
    let idle: number | undefined;
    const win = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    const start = () => { if (!disposed) setActive(true); };
    if (coarse) {
      setCanStart(true);
      onMount?.(false);
      return;
    }
    if (typeof win.requestIdleCallback === "function") idle = win.requestIdleCallback(start);
    else idle = window.setTimeout(start, 220);
    return () => { disposed = true; if (idle !== undefined) { if (typeof win.cancelIdleCallback === "function") win.cancelIdleCallback(idle); else window.clearTimeout(idle); } };
  }, [onMount]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !active) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
    camera.position.set(0, .25, 8.4);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      onMount?.(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth || window.innerWidth, mount.clientHeight || window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);
    onMount?.(true);

    const world = new THREE.Group();
    scene.add(world);
    const membraneStack = new THREE.Group();
    const membraneLayers: Array<{ mesh: THREE.Mesh; material: THREE.ShaderMaterial }> = [];
    const membraneGeometry = new THREE.PlaneGeometry(15, 9, 96, 64);
    for (let index = 0; index < 3; index += 1) {
      const material = makeFieldMaterial(seedRef.current, paramsRef.current.density, paramsRef.current.drift, paramsRef.current.contour, paramsRef.current.depth, paramsRef.current.amplitude, paramsRef.current.frequency, paramsRef.current.speed, index);
      const mesh = new THREE.Mesh(index === 0 ? membraneGeometry : membraneGeometry.clone(), material);
      mesh.position.set(0, -.75 + index * .04, -1.8 - index * .52);
      mesh.rotation.set(-.55 + index * .035, 0, -.08 + index * .018);
      mesh.scale.setScalar(1 - index * .045);
      membraneLayers.push({ mesh, material });
      membraneStack.add(mesh);
    }
    world.add(membraneStack);

    const contours = new THREE.Group();
    [0, 1, 2, 3].forEach((index) => {
      const tube = new THREE.Mesh(new THREE.TubeGeometry(makeContour(index), 110, .018 + index * .008, 5, false), new THREE.MeshBasicMaterial({ color: PALETTE[index], transparent: true, opacity: .42 - index * .05 }));
      tube.rotation.set(.35 + index * .08, -.24, index * .12);
      tube.position.z = -index * .45;
      contours.add(tube);
    });
    world.add(contours);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i += 1) {
      const radius = 3.2 + Math.random() * 3.2;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - .5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - .5) * 5 - 2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: PALETTE[1], size: .018, transparent: true, opacity: .52, sizeAttenuation: true }));
    world.add(particles);

    const target = { x: 0, y: 0, progress: 0 };
    const current = { x: 0, y: 0, progress: 0 };
    let gestureActive = false;
    const mapGesture = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / Math.max(1, rect.width));
      const y = clamp((event.clientY - rect.top) / Math.max(1, rect.height));
      const tuning = volumeGestureToFieldTuning(x, y);
      target.x = (x - .5) * 2;
      target.y = (y - .5) * 2;
      target.progress = tuning.progress;
      onGesture?.(tuning);
    };
    const onVolumePointerDown = (event: PointerEvent) => {
      gestureActive = true;
      mount.setPointerCapture?.(event.pointerId);
      mapGesture(event);
    };
    const onVolumePointerMove = (event: PointerEvent) => { if (gestureActive) mapGesture(event); };
    const onVolumePointerUp = (event: PointerEvent) => {
      if (gestureActive) mapGesture(event);
      gestureActive = false;
      if (mount.hasPointerCapture?.(event.pointerId)) mount.releasePointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => { if (!gestureActive) { target.x = (event.clientX / window.innerWidth - .5) * 2; target.y = (event.clientY / window.innerHeight - .5) * 2; } };
    const onScroll = () => { const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); target.progress = clamp(window.scrollY / max); };
    const onResize = () => { camera.aspect = mount.clientWidth / Math.max(1, mount.clientHeight); camera.updateProjectionMatrix(); renderer?.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mount.addEventListener("pointerdown", onVolumePointerDown);
    mount.addEventListener("pointermove", onVolumePointerMove);
    mount.addEventListener("pointerup", onVolumePointerUp);
    mount.addEventListener("pointercancel", onVolumePointerUp);
    onScroll(); onResize();

    const clock = new THREE.Clock();
    let renderFrame = 0;
    const render = () => {
      const elapsed = clock.getElapsedTime();
      current.x = lerp(current.x, target.x, .055);
      current.y = lerp(current.y, target.y, .055);
      current.progress = lerp(current.progress, target.progress, .065);
      const tuning = paramsRef.current;
      const phase = current.progress * Math.PI * 2;
      membraneLayers.forEach(({ mesh, material: layerMaterial }, index) => {
        layerMaterial.uniforms.uTime.value = elapsed;
        layerMaterial.uniforms.uProgress.value = current.progress;
        layerMaterial.uniforms.uSeed.value = seedRef.current;
        layerMaterial.uniforms.uDensity.value = tuning.density;
        layerMaterial.uniforms.uDrift.value = tuning.drift;
        layerMaterial.uniforms.uContour.value = tuning.contour;
        layerMaterial.uniforms.uDepth.value = tuning.depth;
        layerMaterial.uniforms.uAmplitude.value = tuning.amplitude;
        layerMaterial.uniforms.uFrequency.value = tuning.frequency;
        layerMaterial.uniforms.uSpeed.value = tuning.speed;
        mesh.position.z = -1.8 - index * (.42 + tuning.depth * .12) + Math.sin(phase + index * .7) * .12;
        mesh.position.y = -.75 + index * .04 + Math.sin(phase * .7 + index) * .08;
        mesh.rotation.x = -.55 + current.progress * .25 + index * .035;
        mesh.rotation.y = current.x * .02 + Math.sin(phase + index) * .04;
        mesh.scale.setScalar(1 - index * .045 + Math.sin(phase + index) * .01);
      });
      camera.position.x = current.x * .68 + Math.sin(current.progress * Math.PI) * .22;
      camera.position.y = .25 - current.y * .3 + Math.sin(phase) * (.24 + tuning.depth * .12);
      camera.position.z = 9.1 - current.progress * (2.6 + tuning.depth * .35);
      camera.lookAt(current.x * .12, -.25 + current.progress * .32, -1.35 - current.progress * .35);
      world.rotation.y = current.x * .1 + current.progress * .7;
      world.rotation.x = current.y * .06 - current.progress * .16;
      contours.position.z = Math.sin(phase) * .22;
      contours.scale.setScalar(1 + current.progress * .12);
      contours.rotation.z = elapsed * .018 + current.progress * .7;
      contours.children.forEach((child, index) => {
        child.position.z = -index * (.42 + tuning.depth * .1) + Math.sin(phase + index) * .18;
        child.rotation.x = .35 + index * .08 + current.progress * .35;
      });
      particles.rotation.y = elapsed * .012 + current.progress * .4;
      particles.position.z = Math.sin(phase * .7) * .35;
      document.documentElement.style.setProperty("--iso-progress", current.progress.toFixed(3));
      renderer.render(scene, camera);
      renderFrame = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(renderFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onVolumePointerDown);
      mount.removeEventListener("pointermove", onVolumePointerMove);
      mount.removeEventListener("pointerup", onVolumePointerUp);
      mount.removeEventListener("pointercancel", onVolumePointerUp);
      membraneLayers.forEach(({ mesh, material }) => { material.dispose(); mesh.geometry.dispose(); });
      contours.children.forEach((child) => { (child as THREE.Mesh).geometry.dispose(); ((child as THREE.Mesh).material as THREE.Material).dispose(); });
      particleGeometry.dispose(); (particles.material as THREE.Material).dispose();
      renderer.dispose(); renderer.domElement.remove();
      onMount?.(false);
    };
  }, [active, onMount]);

  return <>
    <div ref={mountRef} className="iso-field" data-field-active={active} role="application" aria-label="Interactive pressure volume. Click or drag to change the active transect." />
    {canStart && !active && <button className="iso-field__activate iso-mono" type="button" onClick={() => { setCanStart(false); setActive(true); }}>Activate field <span aria-hidden="true">↗</span></button>}
  </>;
}
