"use client";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import {
  createWagasaModel,
  type WagasaRuntime,
} from "../model/createWagasaModel";
import { type Motif } from "../model/materials";
import { ribPoint } from "../model/rig";
import type { DirectorState } from "./director";
import { PARTS } from "../data/parts";
import { fitUmbrellaCamera, fitsWholeUmbrella } from "./framing";
import {
  INSPECTION,
  inspectionDistance,
  projectedRunnerOpen,
  sampleDemonstration,
  type AnatomyState,
  type PartId,
} from "./anatomy";
type Props = {
  director: RefObject<DirectorState>;
  onPart: (id: string, index?: number) => void;
  hovered?: PartId;
  anatomy: AnatomyState;
  onActionFinish: (id: number) => void;
  sun: number;
  dyeOrigin: [number, number];
  rain: boolean;
  colour: string;
  motif: Motif;
  closed: boolean;
};
export function WagasaCanvas(props: Props) {
  const host = useRef<HTMLDivElement>(null),
    values = useRef(props);
  useEffect(() => {
    values.current = props;
  });
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      element.dataset.fallback = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);
    const key = new THREE.DirectionalLight("#F4ECDD", 3.3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.normalBias = 0.018;
    key.shadow.bias = -0.0001;
    const fill = new THREE.HemisphereLight("#F4ECDD", "#2B3A55", 0.8),
      rimLight = new THREE.DirectionalLight("#F2B8C6", 1);
    rimLight.position.set(-3, 3, -5);
    scene.add(key, fill, rimLight, key.target);
    const environmentScene = new THREE.Scene();
    environmentScene.background = new THREE.Color("#F4ECDD");
    const environmentGeometry = new THREE.BoxGeometry(1, 1, 1),
      environmentMaterial = new THREE.MeshBasicMaterial({ color: "#F4ECDD" });
    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(environmentGeometry, environmentMaterial);
      panel.position.set(i === 0 ? -4 : 4, 3, i === 2 ? -3 : 2);
      panel.scale.set(3, 5, 2);
      environmentScene.add(panel);
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      environment = pmrem.fromScene(environmentScene, 0.1);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.4;
    pmrem.dispose();
    environmentGeometry.dispose();
    environmentMaterial.dispose();
    const model = createWagasaModel({
      open: 0,
      canopyColor: values.current.colour,
      motif: values.current.motif,
    });
    scene.add(model);
    const rig = model.userData.sculptRuntime as WagasaRuntime;
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.ShadowMaterial({ opacity: 0.15, color: "#1A1613" }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    ground.receiveShadow = true;
    scene.add(ground);
    const rainGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.18, 3),
      rainMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
    const streaks = new THREE.InstancedMesh(rainGeometry, rainMaterial, 180);
    streaks.frustumCulled = false;
    scene.add(streaks);
    const dripGeometry = new THREE.SphereGeometry(0.014, 5, 5),
      dripMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0,
      });
    const drips = new THREE.InstancedMesh(dripGeometry, dripMaterial, 12);
    drips.frustumCulled = false;
    scene.add(drips);
    const rippleGeometry = new THREE.RingGeometry(0.97, 1, 48),
      rippleMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    const ripples = Array.from({ length: 8 }, () => {
      const mesh = new THREE.Mesh(rippleGeometry, rippleMaterial);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -2.48;
      scene.add(mesh);
      return mesh;
    });
    const reflection = model.clone(true);
    const reflectionMaterials: THREE.Material[] = [];
    reflection.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = (child.material as THREE.Material).clone();
        mat.onBeforeCompile = (
          child.material as THREE.Material
        ).onBeforeCompile;
        mat.transparent = true;
        mat.opacity = 0.07;
        mat.depthWrite = false;
        child.material = mat;
        child.castShadow = false;
        reflectionMaterials.push(mat);
      }
    });
    scene.add(reflection);
    const dummy = new THREE.Object3D(),
      raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      look = new THREE.Vector3(0, 0.2, 0),
      wantedLook = new THREE.Vector3(),
      wantedCamera = new THREE.Vector3();
    let lastCanopy = `${values.current.colour}:${values.current.motif}`,
      lastHighlight: string | null = null,
      spin = 0,
      velocity = 0,
      dragging = false,
      dragged = false,
      startX = 0,
      startY = 0,
      pointerId: number | null = null,
      lastX = 0,
      parallaxX = 0,
      parallaxY = 0,
      targetParallaxX = 0,
      targetParallaxY = 0,
      downPart: string | undefined;
    let lastTime = performance.now(),
      frame = 0,
      introOpen = 0,
      lastSignature = "",
      lastCounter = -1,
      rainLevel = 0,
      lastRect = "",
      lastViewId = -1,
      lastScene = -1,
      actionId = -1,
      actionStart = 0,
      finishedAction = -1,
      revealAmount = 0;
    let dragTrack: {
      closed: { x: number; y: number };
      opened: { x: number; y: number };
    } | null = null;
    const toScreen = (point: THREE.Vector3) => {
      const projected = point.project(camera),
        r = element.getBoundingClientRect();
      return {
        x: r.left + (projected.x * 0.5 + 0.5) * r.width,
        y: r.top + (-projected.y * 0.5 + 0.5) * r.height,
        z: projected.z,
      };
    };
    const hitAt = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      return raycaster
        .intersectObjects(model.children, true)
        .find(
          (hit) =>
            hit.object.userData.partId &&
            (hit.object.userData.partId !== "canopy" ||
              !hit.uv ||
              rig.paperVisible(hit.uv.x)),
        );
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const hit = hitAt(event);
      const id = hit?.object.userData.partId as string | undefined;
      element.style.cursor =
        id === "runner" ? "ns-resize" : id ? "grab" : "default";
      if (dragging) {
        if (Math.hypot(event.clientX - startX, event.clientY - startY) > 4)
          dragged = true;
        if (
          downPart === "runner" &&
          values.current.director.current.chapter === 1 &&
          dragTrack
        ) {
          const value = projectedRunnerOpen(
            { x: event.clientX, y: event.clientY },
            dragTrack.closed,
            dragTrack.opened,
          );
          element.dispatchEvent(
            new CustomEvent("amaoto-runner", { bubbles: true, detail: value }),
          );
        } else {
          const dx = event.clientX - lastX;
          velocity = dx * 0.007 * 60;
          spin += dx * 0.007;
        }
        lastX = event.clientX;
      } else {
        targetParallaxX = pointer.x * 0.055;
        targetParallaxY = pointer.y * 0.035;
        if (id !== element.dataset.hover) {
          element.dataset.hover = id ?? "";
          element.dispatchEvent(
            new CustomEvent("amaoto-highlight", { bubbles: true, detail: id }),
          );
        }
      }
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      downPart = hitAt(event)?.object.userData.partId as string | undefined;
      if (!downPart) return;
      dragging = true;
      dragged = false;
      startX = lastX = event.clientX;
      startY = event.clientY;
      pointerId = event.pointerId;
      introOpen = rig.open;
      velocity = 0;
      dragTrack =
        downPart === "runner"
          ? {
              closed: toScreen(rig.runnerPoint(0)),
              opened: toScreen(rig.runnerPoint(1)),
            }
          : null;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const release = (event: PointerEvent) => {
      if (dragging) {
        dragging = false;
        dragTrack = null;
        pointerId = null;
        if (renderer.domElement.hasPointerCapture(event.pointerId))
          renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };
    const click = (event: PointerEvent) => {
      if (dragged) {
        dragged = false;
        return;
      }
      const hit = hitAt(event),
        id = hit?.object.userData.partId as string | undefined;
      const index =
        id === "ribs" && hit?.instanceId !== undefined
          ? Math.floor(
              hit.instanceId /
                (hit.object instanceof THREE.InstancedMesh &&
                hit.object.count === 120
                  ? 3
                  : 8),
            )
          : undefined;
      if (id) values.current.onPart(id, index);
    };
    const leave = () => {
      if (!dragging) {
        targetParallaxX = targetParallaxY = 0;
        element.dispatchEvent(
          new CustomEvent("amaoto-highlight", {
            bubbles: true,
            detail: undefined,
          }),
        );
      }
    };
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointerup", release);
    renderer.domElement.addEventListener("pointercancel", release);
    renderer.domElement.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("click", click);
    const resize = () => {
      const w = Math.max(1, element.clientWidth),
        h = Math.max(1, element.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      lastSignature = "";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const p = values.current,
        s = p.director.current;
      if (!s.ready) {
        frame = requestAnimationFrame(tick);
        return;
      }
      element.style.opacity = String(s.stageOpacity);
      element.style.pointerEvents = s.stageOpacity > 0.5 ? "auto" : "none";
      const inspector = document.querySelector<HTMLElement>(
        "[data-inspector-overlay]",
      );
      if (inspector) {
        inspector.style.opacity = String(s.stageOpacity);
        inspector.style.visibility =
          s.stageOpacity > 0.01 ? "visible" : "hidden";
      }
      const rectKey = JSON.stringify(s.rect);
      if (rectKey !== lastRect) {
        Object.assign(element.style, {
          left: `${s.rect.left}px`,
          top: `${s.rect.top}px`,
          width: `${s.rect.width}px`,
          height: `${s.rect.height}px`,
        });
        lastRect = rectKey;
        resize();
      }
      const active = s.chapter === 1,
        anatomy = p.anatomy;
      if (
        lastScene !== s.chapter ||
        (active && lastViewId !== anatomy.viewId)
      ) {
        if (
          pointerId !== null &&
          renderer.domElement.hasPointerCapture(pointerId)
        )
          renderer.domElement.releasePointerCapture(pointerId);
        pointerId = null;
        dragging = false;
        dragTrack = null;
        velocity = 0;
        spin = 0;
        lastScene = s.chapter;
        lastViewId = anatomy.viewId;
      }
      if (anatomy.action?.id !== actionId) {
        actionId = anatomy.action?.id ?? -1;
        actionStart = now;
      }
      const demo = sampleDemonstration(
        active ? (anatomy.action?.kind ?? null) : null,
        (now - actionStart) / 1000,
        anatomy.open,
      );
      if (
        active &&
        anatomy.action &&
        !demo.running &&
        finishedAction !== anatomy.action.id
      ) {
        finishedAction = anatomy.action.id;
        p.onActionFinish(anatomy.action.id);
      }
      const exit =
        active && !dragging ? THREE.MathUtils.smoothstep(s.local, 0.82, 1) : 0;
      let openness = s.open;
      const intro = Math.min(1, Math.max(0, (now - s.introStart) / 2400));
      if (!s.reduced && s.chapter === 0) {
        if (s.interrupted) introOpen = Math.min(1, introOpen + dt * 4);
        else introOpen = intro * intro * (3 - 2 * intro);
        openness = introOpen;
      } else if (s.reduced) introOpen = 1;
      if (active) openness = THREE.MathUtils.lerp(demo.open, s.open, exit);
      if (p.closed && !s.reduced) openness = 0;
      rig.setSpread(!s.reduced && s.chapter === 0 ? 1 : 0);
      rig.setOpen(openness);
      rig.setExplode(active ? 0 : s.explode);
      rig.update();
      if (!s.reduced) {
        if (!dragging) {
          spin += velocity * dt;
          velocity *= Math.exp(-dt * 5);
          if (s.chapter === 3) spin += dt * 0.09;
        }
      } else {
        velocity = 0;
        spin = 0;
        targetParallaxX = targetParallaxY = 0;
      }
      parallaxX = s.reduced
        ? 0
        : THREE.MathUtils.damp(parallaxX, targetParallaxX, 7, dt);
      parallaxY = s.reduced
        ? 0
        : THREE.MathUtils.damp(parallaxY, targetParallaxY, 7, dt);
      rig.setPose({
        position: s.position,
        rotation: [
          (active ? -0.1 : s.rotation[0]) + (s.reduced ? 0 : parallaxY),
          (active ? 0.15 : s.rotation[1]) +
            spin +
            (active ? anatomy.turn + demo.turn : 0),
          (active ? 0.05 : s.rotation[2]) + (s.reduced ? 0 : parallaxX),
        ],
        scale: s.scale,
      });
      model.updateMatrixWorld(true);
      revealAmount = active
        ? s.reduced
          ? Number(anatomy.reveal)
          : THREE.MathUtils.damp(revealAmount, Number(anatomy.reveal), 8, dt)
        : 0;
      const trace = active ? (anatomy.staticTie ? 1 : demo.trace) : -1;
      rig.setInspection({
        reveal: revealAmount * (1 - exit),
        rib:
          active && anatomy.part === "ribs" && anatomy.oneRib
            ? anatomy.ribIndex
            : null,
        index: anatomy.ribIndex,
        trace,
      });
      const highlight = active
        ? (p.hovered ?? demo.highlight ?? anatomy.part)
        : s.highlight;
      if (highlight !== lastHighlight) {
        rig.setHighlight(highlight);
        lastHighlight = highlight;
      }
      const canopyKey = `${p.colour}:${p.motif}`;
      if (canopyKey !== lastCanopy) {
        rig.setCanopy(
          p.colour,
          p.motif,
          new THREE.Vector2(...p.dyeOrigin),
          s.reduced,
        );
        lastCanopy = canopyKey;
      }
      rig.setSun(p.sun);
      const angle = (p.sun * Math.PI) / 180;
      key.position.set(Math.sin(angle) * 5, 3.5, Math.cos(angle) * 5);
      key.intensity = 1.5 + Math.cos(angle) * 0.6;
      wantedCamera.fromArray(s.camera);
      wantedLook.fromArray(s.target);
      if (active) {
        if (anatomy.part) {
          const view = INSPECTION[anatomy.part];
          wantedLook.copy(rig.point(anatomy.part, anatomy.ribIndex));
          if (anatomy.part === "runner")
            wantedLook
              .copy(rig.runnerPoint(0))
              .add(rig.runnerPoint(1))
              .multiplyScalar(0.5);
          const eye =
            anatomy.part === "canopy" && anatomy.underneath
              ? [1, -4, 3.6]
              : view.eye;
          wantedCamera
            .fromArray(eye)
            .normalize()
            .multiplyScalar(
              inspectionDistance(
                anatomy.part === "runner" ? 1 : view.radius,
                camera.aspect,
              ) * s.scale,
            )
            .add(wantedLook);
        } else {
          wantedLook.set(0, 0.2, 0);
          wantedCamera.set(3, -1.2, 9.3);
        }
        wantedCamera.lerp(new THREE.Vector3().fromArray(s.camera), exit);
        wantedLook.lerp(new THREE.Vector3().fromArray(s.target), exit);
      }
      const fitWholeObject = fitsWholeUmbrella(
        s.chapter,
        active ? anatomy.part : null,
      );
      if (fitWholeObject)
        fitUmbrellaCamera(
          wantedCamera,
          wantedLook,
          camera.aspect,
          model.matrixWorld,
          camera.fov,
          s.chapter === 4 && !s.reduced,
        );
      if (!(dragging && downPart === "runner")) {
        const blend = s.reduced ? 1 : 1 - Math.exp(-dt * 7);
        camera.position.lerp(wantedCamera, blend);
        look.lerp(wantedLook, blend);
        if (camera.position.distanceTo(wantedCamera) < 0.0001)
          camera.position.copy(wantedCamera);
        if (look.distanceTo(wantedLook) < 0.0001) look.copy(wantedLook);
      }
      if (fitWholeObject)
        fitUmbrellaCamera(
          camera.position,
          look,
          camera.aspect,
          model.matrixWorld,
          camera.fov,
          s.chapter === 4 && !s.reduced,
        );
      camera.lookAt(look);
      camera.updateMatrixWorld();
      const leader = document.querySelector<SVGSVGElement>(".am-leader");
      if (leader) leader.dataset.active = "false";
      if (active) {
        const r = element.getBoundingClientRect(),
          nav = document.querySelector<HTMLElement>(
            "[data-inspector-navigation]",
          );
        if (nav)
          Object.assign(nav.style, {
            left: `${r.left + 16}px`,
            top: `${r.bottom + 4}px`,
            width: `${r.width - 32}px`,
          });
        const markers = PARTS.map((part, index) => ({
          part,
          index,
          source: toScreen(rig.point(part.id, anatomy.ribIndex)),
          y: 0,
        })).sort((a, b) => a.source.y - b.source.y);
        markers.forEach(
          (marker, i) =>
            (marker.y =
              Math.max(r.top + 28, Math.min(r.bottom - 28, marker.source.y)) +
              (i ? 0 : 0)),
        );
        for (let i = 1; i < markers.length; i++)
          markers[i].y = Math.max(markers[i].y, markers[i - 1].y + 44);
        const overflow = Math.max(
          0,
          markers[markers.length - 1].y - (r.bottom - 28),
        );
        markers.forEach((marker) => (marker.y -= overflow));
        for (const { part, index, source, y } of markers) {
          const marker = document.querySelector<HTMLButtonElement>(
              `[data-hotspot="${part.id}"]`,
            ),
            path = document.querySelector<SVGPathElement>(
              `[data-marker-line="${part.id}"]`,
            );
          const x = THREE.MathUtils.clamp(
              source.x + (index % 2 ? 38 : -38),
              r.left + 28,
              r.right - 28,
            ),
            shown = !anatomy.part || anatomy.part === part.id;
          if (marker) {
            marker.hidden = !shown || source.z < -1 || source.z > 1;
            Object.assign(marker.style, {
              left: `${x}px`,
              top: `${anatomy.part ? THREE.MathUtils.clamp(source.y, r.top + 24, r.bottom - 24) : y}px`,
            });
          }
          if (path) {
            path.setAttribute(
              "d",
              `M${source.x} ${source.y}L${x} ${anatomy.part ? THREE.MathUtils.clamp(source.y, r.top + 24, r.bottom - 24) : y}`,
            );
            path.dataset.active = String(shown);
          }
        }
        const output = document.querySelector("[data-anatomy-open]");
        if (output) output.textContent = `${Math.round(openness * 100)}%`;
      }
      const intensity = s.chapter === 2 ? (p.rain ? 0.8 : 0) : s.rain;
      rainLevel = s.reduced
        ? 0
        : THREE.MathUtils.damp(rainLevel, intensity, 4, dt);
      s.rainIntensity = s.reduced ? intensity : rainLevel;
      document
        .querySelector<HTMLElement>(".am-page")
        ?.style.setProperty("--am-rain", String(rainLevel));
      element.dataset.open = openness.toFixed(3);
      element.dataset.explode = (active ? 0 : s.explode).toFixed(3);
      element.dataset.inspection = active
        ? (anatomy.part ?? "overview")
        : "inactive";
      element.dataset.reveal = active ? String(anatomy.reveal) : "false";
      element.dataset.rib =
        active && anatomy.oneRib ? String(anatomy.ribIndex) : "all";
      element.dataset.side =
        active && anatomy.underneath ? "underneath" : "outside";
      element.dataset.action = active
        ? (anatomy.action?.kind ?? "none")
        : "none";
      element.dataset.orbit = spin.toFixed(3);
      element.dataset.cameraSettled = String(
        camera.position.distanceTo(wantedCamera) < 0.002 &&
          look.distanceTo(wantedLook) < 0.002,
      );
      element.dataset.sun = String(p.sun);
      element.dataset.colour = p.colour;
      element.dataset.highlight = highlight ?? "";
      element.dataset.rain = rainLevel.toFixed(2);
      const counter = Math.round(openness * 40);
      if (counter !== lastCounter) {
        const number = document.querySelector("[data-rib-count]");
        if (number) {
          number.textContent = String(counter).padStart(2, "0");
          number.animate(
            [
              { transform: "translateY(35%)", opacity: 0.3 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: s.reduced ? 0 : 180 },
          );
        }
        lastCounter = counter;
      }
      if (rainLevel > 0.001) {
        for (let i = 0; i < 180; i++) {
          dummy.position.set(
            Math.sin(i * 31.7) * 4,
            4 - ((now * 0.0025 + i * 0.227) % 8),
            Math.cos(i * 19.3) * 2,
          );
          dummy.rotation.set(0, 0, -0.14);
          dummy.scale.setScalar(1);
          dummy.updateMatrix();
          streaks.setMatrixAt(i, dummy.matrix);
        }
        streaks.instanceMatrix.needsUpdate = true;
        for (let i = 0; i < 12; i++) {
          const tip = model.localToWorld(
            new THREE.Vector3().copy(ribPoint(openness, i * 3, 1, s.explode)),
          );
          const fall = (now / 1400 + i * 0.137) % 1;
          dummy.position.copy(tip);
          dummy.position.y -= fall * 4;
          dummy.scale.set(0.7, 1.8, 0.7);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          drips.setMatrixAt(i, dummy.matrix);
        }
        drips.instanceMatrix.needsUpdate = true;
      }
      rainMaterial.opacity = rainLevel * 0.65;
      dripMaterial.opacity = rainLevel;
      ripples.forEach((mesh, i) => {
        mesh.visible = rainLevel > 0.005;
        const t = (now / 2200 + i * 0.22) % 1;
        mesh.scale.setScalar(0.04 + t * 0.7);
        mesh.position.x = Math.sin(i * 12) * 2;
        mesh.position.z = Math.cos(i * 6) * 1.2;
      });
      reflection.children.forEach((child, i) => {
        const original = model.children[i];
        if (
          child instanceof THREE.InstancedMesh &&
          original instanceof THREE.InstancedMesh
        )
          child.instanceMatrix = original.instanceMatrix;
        else {
          child.position.copy(original.position);
          child.quaternion.copy(original.quaternion);
        }
      });
      reflection.visible = s.chapter === 5;
      reflection.position.copy(model.position);
      reflection.position.y = -5 - model.position.y;
      reflection.rotation.copy(model.rotation);
      reflection.scale.set(s.scale, -s.scale, s.scale);
      rig.tick(dt);
      const signature = [
        s.progress,
        s.reduced,
        openness,
        s.explode,
        spin,
        parallaxX,
        parallaxY,
        p.sun,
        p.colour,
        p.hovered,
        anatomy.sequence,
        anatomy.oneRib,
        anatomy.reveal,
        anatomy.underneath,
        trace,
        revealAmount,
        ...camera.position.toArray(),
        ...look.toArray(),
        p.closed,
        s.rect.width,
        s.rect.height,
      ].join(":");
      if (signature !== lastSignature || rig.animating || rainLevel > 0.001) {
        renderer.render(scene, camera);
        lastSignature = signature;
      }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        lastTime = performance.now();
        lastSignature = "";
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    camera.position.set(4, 3.1, 10);
    model.updateMatrixWorld(true);
    fitUmbrellaCamera(
      camera.position,
      new THREE.Vector3(0, 0.2, 0),
      camera.aspect,
      model.matrixWorld,
      camera.fov,
    );
    camera.lookAt(0, 0.2, 0);
    ripples.forEach((mesh) => {
      mesh.visible = false;
    });
    reflection.visible = false;
    renderer.render(scene, camera);
    element.dataset.ready = "true";
    element.dataset.open = "0.000";
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointerup", release);
      renderer.domElement.removeEventListener("pointercancel", release);
      renderer.domElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("click", click);
      rig.dispose();
      environment.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      rainGeometry.dispose();
      rainMaterial.dispose();
      dripGeometry.dispose();
      dripMaterial.dispose();
      rippleGeometry.dispose();
      rippleMaterial.dispose();
      reflectionMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      ref={host}
      className="am-canvas"
      role="img"
      aria-label="Interactive procedural wagasa model"
    >
      <svg className="am-poster" viewBox="0 0 500 500" aria-hidden="true">
        <path
          d="M250 90Q120 100 45 245Q250 325 455 245Q380 100 250 90Z"
          fill="#F4ECDD"
          stroke="#B8923A"
        />
        {Array.from({ length: 21 }, (_, i) => (
          <path
            key={i}
            d={`M250 90L${45 + i * 20.5} ${245 + Math.sin((i / 20) * Math.PI) * 45}`}
            fill="none"
            stroke="#B8923A"
          />
        ))}
        <path d="M250 95V440" stroke="#B8923A" strokeWidth="8" />
      </svg>
    </div>
  );
}
