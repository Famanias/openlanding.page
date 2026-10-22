"use client";

import { useEffect, useRef } from "react";
import type { Object3D } from "three";
import { cameraAt, listenerAt, reflectionPoints, type SurfaceId } from "./geometry";

const INK = 0x171b20;
const PAPER = 0xf1eee5;
const ACCENT = 0x2b9baa;

type ChamberCanvasProps = {
  progressRef: React.MutableRefObject<number>;
  listenerRef: React.MutableRefObject<number>;
  surfaceRef: React.MutableRefObject<SurfaceId>;
  active: boolean;
};

type RendererLike = {
  setPixelRatio: (value: number) => void;
  setSize: (width: number, height: number, updateStyle?: boolean) => void;
  render: (scene: import("three").Scene, camera: import("three").PerspectiveCamera) => void;
  dispose?: () => void;
};

export function ChamberCanvas({ progressRef, listenerRef, surfaceRef, active }: ChamberCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let frame = 0;
    let renderer: RendererLike | undefined;
    let scene: import("three").Scene | undefined;
    let camera: import("three").PerspectiveCamera | undefined;
    let pulseMaterialNode: import("three").Material | undefined;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (disposed) return;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(INK);
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 1.9, 10);

      let usingGpu = false;
      try {
        if ("gpu" in navigator) {
          const { WebGPURenderer, MeshBasicNodeMaterial } = await import("three/webgpu");
          const tsl = await import("three/tsl");
          const gpu = new WebGPURenderer({ canvas, antialias: true, alpha: true });
          await gpu.init();
          renderer = gpu;
          usingGpu = true;
          const pulse = new MeshBasicNodeMaterial({ transparent: true, depthWrite: false });
          pulse.colorNode = tsl.color(ACCENT).mul(tsl.oscSine(tsl.time.mul(1.8)).mul(0.12).add(0.88));
          pulse.opacity = 0.9;
          pulseMaterialNode = pulse as unknown as import("three").Material;
        }
      } catch {
        renderer = undefined;
      }
      if (!renderer) renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
      canvas.dataset.backend = usingGpu ? "webgpu" : "webgl2";

      const room = new THREE.Group();
      const roomEdges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 4, 6)), new THREE.LineBasicMaterial({ color: PAPER, transparent: true, opacity: 0.33 }));
      roomEdges.position.y = 1.4;
      room.add(roomEdges);
      const floor = new THREE.GridHelper(8, 16, PAPER, PAPER);
      floor.position.y = -0.6;
      floor.material.transparent = true;
      floor.material.opacity = 0.13;
      room.add(floor);
      scene.add(room);

      const source = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({ color: ACCENT }));
      const listenerMaterial = new THREE.MeshBasicMaterial({ color: PAPER });
      const listener = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), listenerMaterial);
      scene.add(source, listener);
      const pulseMaterialFallback = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18, wireframe: true });
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12), pulseMaterialFallback) as import("three").Mesh<import("three").BufferGeometry, import("three").Material>;
      if (pulseMaterialNode) pulse.material = pulseMaterialNode;
      scene!.add(pulse);

      const lines = Array.from({ length: 7 }, () => {
        const line = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.58 }));
        scene!.add(line);
        return line;
      });

      const resize = () => {
        if (!canvas || !camera || !renderer) return;
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        camera.aspect = width / Math.max(1, height);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      window.addEventListener("resize", resize);
      resize();

      const render = () => {
        if (disposed) return;
        const progress = progressRef.current;
        const cameraState = cameraAt(progress);
        const listenerPoint = listenerAt(progress, listenerRef.current);
        if (!renderer || !scene || !camera) return;
        camera.position.x = Math.sin(cameraState.yaw) * 4.6;
        camera.position.y = 1.7 + progress * 0.45;
        camera.position.z = 9.5 - progress * 2.5;
        camera.lookAt(0, 1.2, progress * 0.3);
        room.rotation.y = cameraState.yaw * 0.6;
        source.position.set(-2.65, 1.25, -2.2 + progress * 0.4);
        listener.position.set(listenerPoint.x * 2.4, listenerPoint.y + 0.55, listenerPoint.z * 2.4);
        pulse.position.copy(source.position);
        pulse.scale.setScalar(1 + ((Math.sin(performance.now() * 0.002) + 1) * 0.14));
        const points = reflectionPoints(listenerPoint, surfaceRef.current);
        points.forEach((point, index) => {
          const line = lines[index];
          const reflected = new THREE.Vector3(point.x * 2.4, point.y + 0.55, point.z * 2.4);
          line.geometry.dispose();
          line.geometry = new THREE.BufferGeometry().setFromPoints([source.position.clone(), reflected, listener.position.clone()]);
          line.material.opacity = point.strength * 0.66;
          line.visible = true;
        });
        lines.slice(points.length).forEach((line) => { line.visible = false; });
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();

      cleanup = () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(frame);
        lines.forEach((line) => { line.geometry.dispose(); line.material.dispose(); });
        scene?.traverse((object: Object3D) => {
          const disposable = object as Object3D & { geometry?: { dispose: () => void }; material?: { dispose: () => void } };
          disposable.geometry?.dispose();
          disposable.material?.dispose();
        });
        renderer?.dispose?.();
      };
    };
    const idle: ((callback: () => void, options?: { timeout: number }) => number) | undefined = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback.bind(window) : undefined;
    const idleId = idle ? idle(() => void boot(), { timeout: 1200 }) : window.setTimeout(() => void boot(), 80);
    return () => {
      disposed = true;
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cleanup?.();
    };
  }, [active, progressRef, listenerRef, surfaceRef]);

  return <canvas ref={canvasRef} className="vz-chamber__canvas" aria-hidden="true" />;
}
