"use client";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { createWorldRenderer } from "./renderer";
import { computeTimeOfDay } from "../logic/timeOfDay";
import { atmosphereAtProgress } from "../logic/atmosphere";
import { type Tool } from "../logic/chapters";
import { worldStageRect } from "./staging";
import type { ScrollController } from "./scroll";
import { type InspectState } from "../logic/inspect";
import { createInspectController } from "./inspectController";
import { createWorldTextures } from "./textures";
import { createWorlds } from "./worlds";
import type { WorldFrame } from "./worlds/shared";
import { installCanopyEffects } from "./canopyEffects";
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
  timeOfDay: number;
  controls: RefObject<ScrollController | null>;
  inspection: RefObject<InspectState>;
  tool: Tool;
  onReady: () => void;
  onFallback: () => void;
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
    element.style.opacity = "1";
    element.style.pointerEvents = "auto";
    const inspector = document.querySelector<HTMLElement>(
      "[data-inspector-overlay]",
    );
    if (inspector) {
      inspector.style.removeProperty("opacity");
      inspector.style.removeProperty("visibility");
    }
    let cinematic: ReturnType<typeof createWorldRenderer>;
    try {
      cinematic = createWorldRenderer(element, () => {
        element.dataset.fallback = "true";
        values.current.onFallback();
      });
    } catch {
      element.dataset.fallback = "true";
      values.current.onFallback();
      return;
    }
    const { renderer, scene, camera } = cinematic;
    const inspectorController = createInspectController(
      element,
      renderer.domElement,
      values.current.inspection,
      camera,
    );
    const textures = createWorldTextures(),
      worlds = createWorlds(textures, cinematic.software);
    worlds.forEach((w) => scene.add(w.group));
    element.dataset.worldCounts = JSON.stringify(
      worlds.map((w) => ({ world: w.name, ...w.counts })),
    );
    const timer = new THREE.Timer();
    timer.connect(document);
    const worldFrame: WorldFrame = {
      state: values.current.director.current.world,
      day: computeTimeOfDay(0.75),
      elapsedSec: 0,
      visibility: 0,
      rain: 0,
      gustAge: 100,
      gustOrigin: new THREE.Vector3(),
      pointer: new THREE.Vector3(1000, 0, 1000),
      colour: new THREE.Color(values.current.colour),
    };
    const tipData = new Float32Array(120),
      tipPoint = new THREE.Vector3(),
      groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.42),
      groundPoint = new THREE.Vector3();
    let gustStart = -100,
      gustCount = 0,
      lastRender = performance.now(),
      lastTipPose = "";
    let dayCache = computeTimeOfDay(0.75),
      atmosphereCache = atmosphereAtProgress(worldFrame.state, dayCache, 0),
      lastAtmoProgress = -1,
      lastAtmoTime = -1,
      lastAtmoRain = false;
    const tipWorld = worlds.find((w) => w.setTips);
    if (!values.current.director.current.ready)
      values.current.director.current.rect = worldStageRect(
        0,
        innerWidth,
        innerHeight,
      );
    Object.assign(element.style, {
      left: "0px",
      top: "0px",
      width: "100vw",
      height: "100svh",
    });
    element.dataset.quality = cinematic.software ? "software" : "hardware";
    const model = createWagasaModel({
      open: 0,
      canopyColor: values.current.colour,
      motif: values.current.motif,
    });
    scene.add(model);
    const canopyEffects = installCanopyEffects(model, textures);
    const rig = model.userData.sculptRuntime as WagasaRuntime;
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.ShadowMaterial({ opacity: 0.15, color: "#1A1613" }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    ground.receiveShadow = true;
    scene.add(ground);
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
      wantedCamera = new THREE.Vector3(),
      storyCamera = new THREE.Vector3(),
      storyLook = new THREE.Vector3();
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
    let frame = 0,
      lastSignature = "",
      lastCounter = -1,
      rainLevel = 0,
      lastRect = "",
      lastViewId = -1,
      lastScene = -1,
      actionId = -1,
      actionStart = 0,
      finishedAction = -1,
      revealAmount = 0,
      inspectStrength = 0;
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
      if (event.pointerType === "touch" && values.current.tool !== "anatomy")
        return;
      const hit = hitAt(event);
      if (raycaster.ray.intersectPlane(groundPlane, groundPoint))
        worldFrame.pointer.copy(groundPoint);
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
        } else if (values.current.tool === "anatomy") {
          inspectorController.move(event.clientX, event.clientY);
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
      if (
        (event.pointerType === "touch" && values.current.tool !== "anatomy") ||
        event.button !== 0
      )
        return;
      downPart = hitAt(event)?.object.userData.partId as string | undefined;
      if (!downPart) return;
      if (values.current.tool === "anatomy" && downPart !== "runner")
        inspectorController.down(event.clientX, event.clientY);
      dragging = true;
      dragged = false;
      startX = lastX = event.clientX;
      startY = event.clientY;
      pointerId = event.pointerId;
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
        inspectorController.up();
        if (renderer.domElement.hasPointerCapture(event.pointerId))
          renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };
    const click = (event: PointerEvent) => {
      if (dragged) {
        dragged = false;
        return;
      }
      const hit = hitAt(event);
      if (values.current.director.current.world.subRest === "street") {
        if (raycaster.ray.intersectPlane(groundPlane, groundPoint)) {
          worldFrame.gustOrigin.copy(groundPoint);
          gustStart = timer.getElapsed();
          element.dataset.gust = String(++gustCount);
          element.dispatchEvent(
            new CustomEvent("amaoto-gust", { bubbles: true }),
          );
        }
        return;
      }
      const id = hit?.object.userData.partId as string | undefined;
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
      worldFrame.pointer.set(1000, 0, 1000);
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
      cinematic.resize(w, h);
      const r = values.current.director.current.rect;
      if (r.width > 1) cinematic.projectSlot(r);
      lastSignature = "";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const tick = (now: number) => {
      values.current.controls.current?.raf(now);
      timer.update(now);
      const elapsed = timer.getElapsed();
      const p = values.current,
        s = p.director.current;
      if (!s.ready) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (cinematic.software && now - lastRender < 110) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(0.1, (now - lastRender) / 1000);
      lastRender = now;
      const rectKey = JSON.stringify(s.rect);
      if (rectKey !== lastRect) {
        cinematic.projectSlot(s.rect);
        element.dataset.stageRect = rectKey;
        lastRect = rectKey;
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
      let openness = s.world.open;
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
      inspectorController.tick(dt);
      if (p.inspection.current.phase !== "idle")
        model.quaternion.premultiply(
          dummy.quaternion.fromArray(p.inspection.current.rotation),
        );
      model.updateMatrixWorld(true);
      ground.position.x = model.position.x;
      ground.position.z = model.position.z;
      const tipPose = `${s.progress}:${openness}:${s.explode}:${spin}:${anatomy.sequence}`;
      if (tipWorld && tipPose !== lastTipPose) {
        for (let i = 0; i < 40; i++) {
          tipPoint
            .copy(ribPoint(openness, i, 1, s.explode))
            .applyMatrix4(model.matrixWorld);
          tipPoint.toArray(tipData, i * 3);
        }
        tipWorld.setTips?.(tipData);
        lastTipPose = tipPose;
      }
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
      const world = s.world;
      if (
        lastAtmoProgress !== s.progress ||
        lastAtmoTime !== p.timeOfDay ||
        lastAtmoRain !== p.rain
      ) {
        dayCache = computeTimeOfDay(p.timeOfDay);
        atmosphereCache = atmosphereAtProgress(
          world,
          dayCache,
          p.rain ? world.rainIntensity : 0,
        );
        lastAtmoProgress = s.progress;
        lastAtmoTime = p.timeOfDay;
        lastAtmoRain = p.rain;
      }
      const day = dayCache,
        atmosphere = atmosphereCache;
      inspectStrength = THREE.MathUtils.damp(
        inspectStrength,
        p.tool === "anatomy" ? 1 : 0,
        9,
        dt,
      );
      cinematic.apply(atmosphere, elapsed, inspectStrength, world.paperLitMode);
      camera.fov = THREE.MathUtils.lerp(
        camera.fov,
        s.fov,
        cinematic.software ? 1 : 1 - Math.exp(-11 * dt),
      );
      camera.updateProjectionMatrix();
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
        }
        wantedCamera.lerp(storyCamera.fromArray(s.camera), exit);
        wantedLook.lerp(storyLook.fromArray(s.target), exit);
      }
      const fitWholeObject =
        world.paperDive < 0.02 &&
        s.chapter !== 2 &&
        fitsWholeUmbrella(s.chapter, active ? anatomy.part : null);
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
        const blend =
          cinematic.software || s.reduced ? 1 : 1 - Math.exp(-dt * 11);
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
      element.dataset.fitsWhole = String(fitWholeObject);
      camera.updateMatrixWorld();
      worldFrame.state = world;
      worldFrame.day = day;
      worldFrame.elapsedSec = elapsed;
      worldFrame.rain = p.rain ? world.rainIntensity : 0;
      worldFrame.colour.set(p.colour);
      worldFrame.gustAge = elapsed - gustStart;
      for (const built of worlds) {
        worldFrame.visibility = world.worldVisibility[built.name];
        built.update(worldFrame);
      }
      canopyEffects.update(worldFrame);
      element.dataset.paperDive = world.paperDive.toFixed(3);
      element.dataset.oilSoak = world.oilSoak.toFixed(3);
      element.dataset.transmission = day.paperTransmission.toFixed(3);
      const leader = document.querySelector<SVGSVGElement>(".am-leader");
      if (leader) leader.dataset.active = "false";
      if (active) {
        const r = {
            ...s.rect,
            right: s.rect.left + s.rect.width,
            bottom: s.rect.top + s.rect.height,
          },
          nav = document.querySelector<HTMLElement>(
            "[data-inspector-navigation]",
          );
        if (nav)
          Object.assign(nav.style, {
            left: `${r.left + 16}px`,
            top: `${r.bottom + 4}px`,
            width: `${r.width - 32}px`,
          });
        const markers = PARTS.map((part, index) => {
          const point = rig.point(part.id, anatomy.ribIndex),
            a = (anatomy.ribIndex / 40) * Math.PI * 2;
          const normal: [number, number, number] =
            part.id === "canopy"
              ? [0.197, 0.966, 0.168]
              : part.id === "handle" || part.id === "runner"
                ? [0, 0, 1]
                : [Math.cos(a), 0.1, Math.sin(a)];
          if (part.id === "canopy" && anatomy.underneath)
            normal.forEach((v, i) => (normal[i] = -v));
          const facing = inspectorController.pinVisible(normal, point, model);
          return { part, index, source: toScreen(point), y: 0, facing };
        }).sort((a, b) => a.source.y - b.source.y);
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
        for (const { part, index, source, y, facing } of markers) {
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
            shown = facing && (!anatomy.part || anatomy.part === part.id);
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
      const intensity = p.rain ? world.rainIntensity : 0;
      rainLevel = s.reduced
        ? 0
        : THREE.MathUtils.damp(rainLevel, intensity, 4, dt);
      s.rainIntensity = s.reduced ? intensity : rainLevel;
      document
        .querySelector<HTMLElement>(".am-page")
        ?.style.setProperty("--am-rain", String(rainLevel));
      element.dataset.open = openness.toFixed(3);
      element.dataset.progress = s.progress.toFixed(5);
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
      element.dataset.inspectRotation = p.inspection.current.rotation
        .map((n) => n.toFixed(3))
        .join(",");
      element.dataset.cameraSettled = String(
        camera.position.distanceTo(wantedCamera) < 0.002 &&
          look.distanceTo(wantedLook) < 0.002,
      );
      element.dataset.sun = String(p.sun);
      element.dataset.timeOfDay = String(p.timeOfDay);
      element.dataset.world = world.activeChapter.markerLabel;
      const root = document.querySelector<HTMLElement>(".am-page");
      if (root) root.dataset.inspectPhase = p.inspection.current.phase;
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
      const reflectionWeight =
        world.worldVisibility.threshold + world.worldVisibility.genkan;
      reflection.visible = reflectionWeight > 0.008;
      for (const material of reflectionMaterials)
        material.opacity = 0.07 * reflectionWeight;
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
      if (
        signature !== lastSignature ||
        rig.animating ||
        rainLevel > 0.001 ||
        (!cinematic.software && worlds.some((w) => w.group.visible)) ||
        p.inspection.current.phase !== "idle"
      ) {
        cinematic.render();
        element.dataset.drawCalls = String(renderer.info.render.calls);
        element.dataset.triangles = String(renderer.info.render.triangles);
        lastSignature = signature;
      }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        lastSignature = "";
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    camera.position.set(4, 2.2, 10);
    model.updateMatrixWorld(true);
    fitUmbrellaCamera(
      camera.position,
      new THREE.Vector3(0, 0.2, 0),
      camera.aspect,
      model.matrixWorld,
      camera.fov,
    );
    camera.lookAt(0, 0.2, 0);
    reflection.visible = false;
    worlds.forEach((w) => {
      w.group.visible = true;
    });
    cinematic.warm();
    worlds.forEach((w) => {
      w.group.visible =
        values.current.director.current.world.worldVisibility[w.name] > 0.008;
    });
    cinematic.render();
    element.dataset.ready = "true";
    element.dataset.open = "0.000";
    values.current.onReady();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      inspectorController.dispose();
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointerup", release);
      renderer.domElement.removeEventListener("pointercancel", release);
      renderer.domElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("click", click);
      rig.dispose();
      canopyEffects.dispose();
      worlds.forEach((w) => w.dispose());
      textures.dispose();
      timer.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      reflectionMaterials.forEach((m) => m.dispose());
      cinematic.dispose();
    };
  }, []);
  return (
    <div
      ref={host}
      className="am-canvas"
      role="img"
      aria-label="Interactive procedural wagasa model"
      tabIndex={0}
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
