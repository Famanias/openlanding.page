"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createWagasaModel } from "../model/createWagasaModel";

type Props = { onPart?: (id: string) => void; open?: number; explode?: number; colour?: string; motif?: "sakura" | "wave" | "plain" };

export function WagasaCanvas({ onPart, open = 0.84, explode = 0, colour = "#F4ECDD", motif = "sakura" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const values = useRef({ open, explode, colour, motif });
  values.current = { open, explode, colour, motif };
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F4ECDD");
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(4.8, 3.1, 9.4);
    camera.lookAt(0, 0.4, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(element.clientWidth, element.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);
    const key = new THREE.DirectionalLight(0xfff0d6, 2.2); key.position.set(-3, 6, 4); key.castShadow = true;
    const fill = new THREE.HemisphereLight(0xc4d2e4, 0x3a2418, 1.4);
    const glow = new THREE.PointLight(0xffb37a, 1.6, 6); glow.position.set(0, 2.2, -1.2);
    scene.add(key, fill, glow);
    const model = createWagasaModel({ open: values.current.open, explode: values.current.explode, canopyColor: values.current.colour, motif: values.current.motif });
    scene.add(model);
    let lastCanopy = `${values.current.colour}:${values.current.motif}`;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(model.children, true)[0];
      const id = hit?.object.userData.partId as string | undefined;
      if (id) onPart?.(id.split("-")[0]);
    };
    renderer.domElement.addEventListener("click", onPointer);
    const resize = () => { if (!element) return; camera.aspect = element.clientWidth / Math.max(1, element.clientHeight); camera.updateProjectionMatrix(); renderer.setSize(element.clientWidth, element.clientHeight, false); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    let frame = 0;
    const tick = () => {
      const state = values.current;
      (model.userData.sculptRuntime as { setOpen: (x: number) => void; setExplode: (x: number) => void; setCanopy: (c: string, m: "sakura" | "wave" | "plain") => void }).setOpen(state.open);
      model.userData.sculptRuntime.setExplode(state.explode);
      const canopyKey = `${state.colour}:${state.motif}`;
      if (canopyKey !== lastCanopy) { model.userData.sculptRuntime.setCanopy(state.colour, state.motif); lastCanopy = canopyKey; }
      model.rotation.y += 0.0018;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.domElement.removeEventListener("click", onPointer); renderer.dispose(); element.removeChild(renderer.domElement); model.traverse((child) => { const mesh = child as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose()); else mesh.material?.dispose(); }); };
  }, [onPart]);
  return <div ref={host} className="am-canvas" role="img" aria-label="Interactive procedural wagasa model" />;
}

