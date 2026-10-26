"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createAtmosphereMaterial, createPlanetMaps, disposePlanetMaps } from "./planetSurface";

function makeCrateredMoon() {
  const geometry = new THREE.SphereGeometry(2.18, 64, 48);
  const positions = geometry.attributes.position;
  const craters = Array.from({ length: 24 }, (_, i) => new THREE.Vector3(Math.sin(i * 27.3), Math.cos(i * 9.2), Math.sin(i * 15.7)).normalize());
  const point = new THREE.Vector3();
  for (let i = 0; i < positions.count; i += 1) {
    point.fromBufferAttribute(positions, i).normalize();
    let dent = 0;
    craters.forEach((crater, craterIndex) => {
      const distance = point.distanceTo(crater);
      const size = 0.04 + (craterIndex % 5) * 0.022;
      dent += -Math.exp(-Math.pow(distance / size, 4)) * 0.024 + Math.exp(-Math.pow((distance - size) / (size * 0.24), 2)) * 0.006;
    });
    const radius = 2.18 + dent;
    positions.setXYZ(i, point.x * radius, point.y * radius, point.z * radius);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("booting scene");
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b12);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.35, 8.2);
    scene.add(new THREE.HemisphereLight(0x9ea7bc, 0x090b12, 0.42));
    const key = new THREE.DirectionalLight(0xffd1ae, 3.8);
    key.position.set(5, 4, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7df2d1, 1.5);
    rim.position.set(-6, 1, -3);
    scene.add(rim);

    const instrument = new THREE.Group();
    scene.add(instrument);
    const maps = createPlanetMaps();
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: maps.color, bumpMap: maps.bump, bumpScale: 0.22, roughnessMap: maps.roughness, roughness: 0.78, metalness: 0.02 });
    const moon = new THREE.Mesh(makeCrateredMoon(), moonMaterial);
    moon.castShadow = true;
    instrument.add(moon);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(2.215, 64, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, alphaMap: maps.clouds, transparent: true, opacity: 0.62, depthWrite: false, roughness: 0.94 }));
    instrument.add(clouds);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.28, 64, 48), createAtmosphereMaterial());
    instrument.add(atmosphere);
    const warm = new THREE.MeshPhysicalMaterial({ color: 0xc9875e, metalness: 0.9, roughness: 0.22, clearcoat: 0.4, clearcoatRoughness: 0.15 });
    const pale = new THREE.MeshPhysicalMaterial({ color: 0xd7d8d0, metalness: 0.84, roughness: 0.18, clearcoat: 0.34, clearcoatRoughness: 0.12 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x2a3245, metalness: 0.92, roughness: 0.24, clearcoat: 0.24, clearcoatRoughness: 0.18 });
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Group();
      ring.add(new THREE.Mesh(new THREE.TorusGeometry(2.72 + i * 0.02, i === 1 ? 0.07 : 0.045, 22, 192), i === 1 ? pale : warm));
      ring.add(new THREE.Mesh(new THREE.TorusGeometry(2.84 + i * 0.02, 0.014, 12, 192), dark));
      ring.rotation.x = 0.48 + i * 0.2;
      ring.rotation.y = 0.18 + i * 0.2;
      instrument.add(ring);
    }
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(480 * 3);
    for (let i = 0; i < 480; i += 1) { const angle = i * 2.4; const radius = 5 + (i % 80) * 0.22; starPositions[i * 3] = Math.cos(angle) * radius; starPositions[i * 3 + 1] = Math.sin(angle) * radius; starPositions[i * 3 + 2] = -2 - (i % 90) * 0.08; }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x9ea7bc, size: 0.045, transparent: true, opacity: 0.65, depthWrite: false })));

    let disposed = false;
    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; };
    canvas.addEventListener("pointermove", onPointer);
    const resize = () => { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7)); renderer.setSize(Math.max(1, canvas.clientWidth), Math.max(1, canvas.clientHeight), false); camera.aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight); camera.updateProjectionMatrix(); };
    window.addEventListener("resize", resize);
    resize();
    setStatus("three webgl online");
    const render = () => { if (disposed) return; instrument.rotation.y = pointer.x * 0.08; instrument.rotation.x = pointer.y * -0.05; instrument.position.x = pointer.x * 0.08; clouds.rotation.y = 0.18 + pointer.x * 0.02; renderer.render(scene, camera); };
    render();
    const onPointerRender = (event: PointerEvent) => { onPointer(event); render(); };
    canvas.removeEventListener("pointermove", onPointer);
    canvas.addEventListener("pointermove", onPointerRender);
    return () => { disposed = true; window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", onPointerRender); scene.traverse((object) => { const mesh = object as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (mesh.material) { const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]; materials.forEach((material) => material.dispose()); } }); disposePlanetMaps(maps); renderer.dispose(); };
  }, []);
  return <div className="stl-canvas-wrap"><canvas ref={canvasRef} className="stl-canvas" aria-label="Interactive realistic WebGL instrument preview" data-engine="three.js r186" /><div className="stl-canvas-grid" aria-hidden="true" /><div className="stl-canvas-readout"><span>scene 01</span><strong>{status}</strong></div></div>;
}
