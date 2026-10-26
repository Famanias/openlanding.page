"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createAtmosphereMaterial, createPlanetMaps, disposePlanetMaps } from "./planetSurface";

type Chapter = { id: string; label: string };

const CHAPTERS: Chapter[] = [
  { id: "stl-chapter-0", label: "Eclipse" },
  { id: "stl-chapter-1", label: "Aperture" },
  { id: "stl-chapter-2", label: "Passage" },
  { id: "stl-chapter-3", label: "Alignment" },
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number, start: number, end: number) => {
  const t = clamp01((value - start) / Math.max(0.0001, end - start));
  return t * t * (3 - 2 * t);
};

function collectMaterials(root: THREE.Object3D) {
  const materials: THREE.Material[] = [];
  root.traverse((child) => {
    const object = child as THREE.Mesh | THREE.Sprite | THREE.Points;
    if (!("material" in object) || !object.material) return;
    const value = object.material;
    if (Array.isArray(value)) materials.push(...value);
    else materials.push(value);
  });
  return [...new Set(materials)];
}

function setOpacity(materials: THREE.Material[], value: number) {
  const opacity = clamp01(value);
  materials.forEach((material) => {
    material.transparent = opacity < 0.995;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.98;
  });
}

function makeStarField() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = i * 2.39996;
    const radius = 7 + Math.sqrt(((i * 73) % 997) / 997) * 34;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 7 - ((i * 137) % 900) / 10;
    const warm = i % 11 === 0;
    colors.set(warm ? [1, 0.58, 0.33] : [0.55, 0.72, 0.95], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    sizeAttenuation: true,
  });
  return new THREE.Points(geometry, material);
}

function makeIrisBlade() {
  const shape = new THREE.Shape();
  const polar = (radius: number, angle: number) => [radius * Math.cos(angle), radius * Math.sin(angle)] as const;
  shape.moveTo(...polar(2.48, -0.14));
  shape.absarc(0, 0, 2.48, -0.14, 0.84, false);
  shape.quadraticCurveTo(...polar(1.68, 1.0), ...polar(0.76, 0.84));
  shape.absarc(0, 0, 0.76, 0.84, 0.16, true);
  shape.quadraticCurveTo(...polar(1.6, -0.1), ...polar(2.48, -0.14));
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.01,
    bevelThickness: 0.008,
    curveSegments: 40,
  });
}

export function JourneyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const alignmentRef = useRef(50);
  const pointerRef = useRef({ x: 0, y: 0 });
  const chapterRef = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [status, setStatus] = useState("booting scene");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b12);
    scene.fog = new THREE.FogExp2(0x090b12, 0.018);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.5, 13);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = new RoomEnvironment();
    const envTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.58;
    environment.dispose();
    pmrem.dispose();

    scene.add(new THREE.HemisphereLight(0x9ea7bc, 0x090b12, 0.32));
    const key = new THREE.DirectionalLight(0xffd1ae, 3.6);
    key.position.set(6, 5, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7df2d1, 1.6);
    rim.position.set(-8, 2, -4);
    scene.add(rim);
    const sunLight = new THREE.PointLight(0xff9275, 24, 16, 2);
    sunLight.position.set(0, 0, 3);
    scene.add(sunLight);

    const maps = createPlanetMaps();
    const darkMetal = new THREE.MeshPhysicalMaterial({ color: 0x2a3245, metalness: 0.92, roughness: 0.24, clearcoat: 0.24, clearcoatRoughness: 0.18 });
    const warmMetal = new THREE.MeshPhysicalMaterial({ color: 0xc9875e, metalness: 0.88, roughness: 0.23, clearcoat: 0.4, clearcoatRoughness: 0.16 });
    const paleMetal = new THREE.MeshPhysicalMaterial({ color: 0xd7d8d0, metalness: 0.84, roughness: 0.18, clearcoat: 0.34, clearcoatRoughness: 0.12 });
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: maps.color, bumpMap: maps.bump, bumpScale: 0.22, roughnessMap: maps.roughness, roughness: 0.78, metalness: 0.02 });
    const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc8f9ed, metalness: 0.04, roughness: 0.035, transmission: 0.92, thickness: 0.22, ior: 1.45, transparent: true, opacity: 0.8, depthWrite: false });
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xff9275, emissive: 0xff6b42, emissiveIntensity: 3.5, roughness: 0.25, metalness: 0.05 });
    const moonletMaterial = new THREE.MeshPhysicalMaterial({ color: 0xdbeaf1, roughness: 0.12, metalness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.05 });

    const assembly = new THREE.Group();
    scene.add(assembly);
    const moonGeometry = new THREE.SphereGeometry(2.18, 96, 64);
    const positions = moonGeometry.attributes.position;
    const craters = Array.from({ length: 28 }, (_, i) => new THREE.Vector3(Math.sin(i * 27.3), Math.cos(i * 9.2), Math.sin(i * 15.7)).normalize());
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
    moonGeometry.computeVertexNormals();
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.castShadow = true;
    moon.receiveShadow = true;
    assembly.add(moon);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(2.215, 64, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, alphaMap: maps.clouds, transparent: true, opacity: 0.62, depthWrite: false, roughness: 0.94 }));
    assembly.add(clouds);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.28, 64, 48), createAtmosphereMaterial());
    assembly.add(atmosphere);

    const rings: THREE.Group[] = [];
    const ringGeometry = new THREE.TorusGeometry(2.72, 0.065, 24, 192);
    const fineRingGeometry = new THREE.TorusGeometry(2.84, 0.018, 12, 192);
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Group();
      ring.add(new THREE.Mesh(ringGeometry, i === 1 ? paleMetal : warmMetal));
      ring.add(new THREE.Mesh(fineRingGeometry, darkMetal));
      for (let tick = 0; tick < 48; tick += 1) {
        const marker = new THREE.Mesh(new THREE.BoxGeometry(0.015, tick % 6 === 0 ? 0.14 : 0.07, 0.018), paleMetal);
        const angle = (tick / 48) * Math.PI * 2;
        marker.position.set(Math.cos(angle) * 2.84, Math.sin(angle) * 2.84, 0);
        marker.rotation.z = angle - Math.PI / 2;
        ring.add(marker);
      }
      assembly.add(ring);
      rings.push(ring);
    }
    const lens = new THREE.Mesh(new THREE.SphereGeometry(2.57, 96, 48), glassMaterial);
    lens.scale.z = 0.04;
    lens.position.z = 0.08;
    rings[0].add(lens);

    const iris = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.RingGeometry(2.22, 2.68, 160), darkMetal);
    plate.position.z = 0.12;
    iris.add(plate);
    const bladeGeometry = makeIrisBlade();
    for (let i = 0; i < 9; i += 1) {
      const blade = new THREE.Mesh(bladeGeometry, i % 3 === 0 ? darkMetal : warmMetal);
      blade.rotation.z = (i * Math.PI * 2) / 9;
      blade.position.z = 0.16 + i * 0.008;
      iris.add(blade);
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20), paleMetal);
      screw.rotation.x = Math.PI / 2;
      const angle = (i * Math.PI * 2) / 9;
      screw.position.set(Math.cos(angle) * 2.52, Math.sin(angle) * 2.52, 0.25);
      iris.add(screw);
    }
    assembly.add(iris);

    const passage = new THREE.Group();
    scene.add(passage);
    for (let i = 0; i < 8; i += 1) {
      const gate = new THREE.Group();
      gate.position.z = -7 - i * 5.2;
      gate.add(new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.052, 18, 192), darkMetal));
      gate.add(new THREE.Mesh(new THREE.TorusGeometry(4.12, 0.016, 12, 192), i % 2 === 0 ? warmMetal : paleMetal));
      const spokes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 0.2, 0.05), warmMetal, 24);
      const dummy = new THREE.Object3D();
      for (let n = 0; n < 24; n += 1) {
        const angle = (n / 24) * Math.PI * 2;
        dummy.position.set(Math.cos(angle) * 4.05, Math.sin(angle) * 4.05, 0);
        dummy.rotation.z = angle - Math.PI / 2;
        dummy.updateMatrix();
        spokes.setMatrixAt(n, dummy.matrix);
      }
      gate.add(spokes);
      passage.add(gate);
    }

    const alignment = new THREE.Group();
    alignment.position.z = -14;
    scene.add(alignment);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.22, 72, 48), sunMaterial);
    alignment.add(sun);
    const finalMoon = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 32), moonletMaterial);
    finalMoon.position.z = 0.8;
    alignment.add(finalMoon);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.018, 12, 192), paleMetal);
    orbit.rotation.x = Math.PI / 2;
    alignment.add(orbit);
    const alignmentStars = makeStarField();
    alignmentStars.position.z = 0.5;
    alignment.add(alignmentStars);
    const stars = makeStarField();
    scene.add(stars);

    const instrumentMaterials = collectMaterials(assembly);
    const irisMaterials = collectMaterials(iris);
    const passageMaterials = collectMaterials(passage);
    const alignmentMaterials = collectMaterials(alignment);
    setOpacity(irisMaterials, 0);
    setOpacity(passageMaterials, 0);
    setOpacity(alignmentMaterials, 0);

    const cameraPositions = [new THREE.Vector3(0, 0.55, 13), new THREE.Vector3(5.6, 2.1, 10.5), new THREE.Vector3(0.4, 0.1, -9), new THREE.Vector3(0, 0.25, -13.5)];
    const cameraTargets = [new THREE.Vector3(0.2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -8), new THREE.Vector3(0, 0, -14)];
    const desiredCamera = new THREE.Vector3();
    const desiredTarget = new THREE.Vector3();
    let currentProgress = 0;
    let raf = 0;
    let scrollFrame = 0;
    let disposed = false;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { reduced = media.matches; };
    media.addEventListener("change", onMotion);
    const onPointer = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; };
    canvas.addEventListener("pointermove", onPointer);

    const updateProgress = () => {
      scrollFrame = 0;
      const nodes = CHAPTERS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (!nodes.length) return;
      const firstTop = nodes[0].getBoundingClientRect().top + window.scrollY;
      const secondTop = nodes[1]?.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(window.innerHeight, (secondTop ?? firstTop + window.innerHeight) - firstTop);
      const value = Math.max(0, Math.min(3, (window.scrollY - firstTop) / span));
      const nextChapter = Math.min(3, Math.floor(value + 0.001));
      progressRef.current = value;
      if (nextChapter !== chapterRef.current) { chapterRef.current = nextChapter; setChapter(nextChapter); }
    };
    const queue = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();

    const onAlignment = (event: Event) => { const value = Number((event as CustomEvent<number>).detail); if (Number.isFinite(value)) alignmentRef.current = value; };
    window.addEventListener("stl:alignment", onAlignment);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      renderer.setPixelRatio(dpr);
      renderer.setSize(Math.max(1, canvas.clientWidth), Math.max(1, canvas.clientHeight), false);
      camera.aspect = Math.max(1, canvas.clientWidth) / Math.max(1, canvas.clientHeight);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();
    setStatus("three webgl online");

    const render = (now: number) => {
      if (disposed) return;
      const delta = Math.min(0.04, 1 / 60);
      const targetProgress = progressRef.current;
      currentProgress += (targetProgress - currentProgress) * (1 - Math.exp(-8 * delta));
      const p = currentProgress;
      const stage = Math.min(2, Math.floor(p));
      const local = p - stage;
      const cameraMix = smooth(local, 0.04, 0.96);
      desiredCamera.copy(cameraPositions[stage]).lerp(cameraPositions[stage + 1], cameraMix);
      desiredTarget.copy(cameraTargets[stage]).lerp(cameraTargets[stage + 1], cameraMix);
      camera.position.lerp(desiredCamera, 0.12);
      camera.position.x += pointerRef.current.x * 0.18;
      camera.position.y += -pointerRef.current.y * 0.12;
      camera.lookAt(desiredTarget);

      const unfold = smooth(p, 0.08, 0.9);
      const irisPresence = smooth(p, 0.62, 1.15) * (1 - smooth(p, 1.22, 1.72));
      const passagePresence = smooth(p, 1.05, 1.65) * (1 - smooth(p, 2.38, 2.88));
      const alignmentPresence = smooth(p, 1.82, 2.58);
      assembly.position.x = THREE.MathUtils.lerp(0.75, 0, unfold);
      assembly.rotation.y = -unfold * 0.42 + pointerRef.current.x * 0.06;
      assembly.rotation.x = unfold * 0.22;
      assembly.scale.setScalar(THREE.MathUtils.lerp(0.88, 1, unfold));
      moon.scale.setScalar(Math.max(0.001, 1 - smooth(p, 0.08, 0.6) * 0.86));
      atmosphere.scale.copy(moon.scale);
      rings.forEach((ring, index) => {
        ring.position.z = (index - 1) * (0.14 + unfold * 2.8);
        ring.rotation.x = (1 - unfold) * (0.68 + index * 0.34);
        ring.rotation.y = (1 - unfold) * (0.2 + index * 0.26);
        ring.rotation.z = (reduced ? 0 : now * 0.000012) * (index % 2 ? -1 : 1);
      });
      setOpacity(instrumentMaterials, 1 - smooth(p, 1.08, 1.58));
      setOpacity(irisMaterials, irisPresence);
      setOpacity(passageMaterials, passagePresence);
      passage.rotation.z = reduced ? 0 : now * 0.000018;
      passage.position.z = -p * 0.65;
      setOpacity(alignmentMaterials, alignmentPresence);
      alignment.scale.setScalar(THREE.MathUtils.lerp(1, 0.82, smooth(p, 2.45, 3)));
      alignment.rotation.z = smooth(p, 2.3, 3) * 0.06;
      const offset = (alignmentRef.current - 50) / 50;
      finalMoon.position.x = offset * 1.95;
      finalMoon.position.y = Math.abs(offset) * 0.14;
      sunLight.position.set(camera.position.x + 2.5, camera.position.y + 1.8, camera.position.z - 2.8);
      stars.rotation.z = reduced ? 0 : now * 0.000012;
      clouds.rotation.y = reduced ? 0.18 : now * 0.000018;
      alignmentStars.rotation.z = offset * 0.25;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", queue);
      window.removeEventListener("stl:alignment", onAlignment);
      media.removeEventListener("change", onMotion);
      canvas.removeEventListener("pointermove", onPointer);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      envTarget.dispose();
      disposePlanetMaps(maps);
    };
  }, []);

  return <div className="stl-journey-canvas" aria-label="Scroll driven Three.js WebGL model journey"><canvas ref={canvasRef} className="stl-canvas stl-canvas--journey" aria-label="A realistic WebGL instrument morphing through eclipse, aperture, passage and alignment" /><div className="stl-journey-overlay"><span>chapter 0{chapter + 1} / {CHAPTERS.length}</span><strong>{CHAPTERS[chapter].label}</strong><small>{status}</small></div><div className="stl-journey-crosshair" aria-hidden="true" /></div>;
}

export function JourneyChapter({ index, eyebrow, title, body, children }: { index: number; eyebrow: string; title: React.ReactNode; body: string; children?: React.ReactNode }) {
  return <section id={CHAPTERS[index].id} data-scene-chapter className="stl-journey-chapter" aria-labelledby={`${CHAPTERS[index].id}-title`}><div className="stl-journey-chapter-copy"><span className="stl-kicker">{eyebrow}</span><h2 id={`${CHAPTERS[index].id}-title`}>{title}</h2><p>{body}</p>{children}</div><span className="stl-journey-chapter-index">0{index + 1}</span></section>;
}

export function ChapterRail() {
  return <nav className="stl-chapter-rail" aria-label="Model chapters">{CHAPTERS.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`}><span>0{index + 1}</span><i /><em>{chapter.label}</em></a>)}</nav>;
}
