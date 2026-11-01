import * as THREE from "three";
import { advanceDrift, carouselLayout, clamp, CLOCKWISE_SPEED, MATERIALS, nearestSlide, releaseSlide, stepSpring, wrapIndex, type LayerId, type Spring } from "./physics";
import { printTexture } from "./textures";

export type StudioSettings = { spread: number; light: number; selected: LayerId };

/** A full-bleed paper carousel. One spring owns its continuous position; React owns selection. */
export function createPaperStudio(root: HTMLElement, host: HTMLElement, initial: StudioSettings, select: (id: LayerId, automatic?: boolean) => void) {
  const surface = host.parentElement!;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
  const canvas = renderer.domElement; canvas.setAttribute("aria-hidden", "true"); host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 40);
  camera.position.z = 9.8;
  const assembly = new THREE.Group(); scene.add(assembly);
  scene.add(new THREE.HemisphereLight(0xf6f0e8, 0xe2d8c9, 2.7));
  const light = new THREE.DirectionalLight(0xffffff, 3.2);
  light.position.set(-3, 5, 8); light.castShadow = true;
  const shadowSize = matchMedia("(pointer: fine)").matches ? 2048 : 1024;
  light.shadow.mapSize.set(shadowSize, shadowSize);
  Object.assign(light.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6 });
  light.shadow.normalBias = .015; light.shadow.bias = -.0003; light.shadow.radius = 4; scene.add(light);
  const shadowGeometry = new THREE.PlaneGeometry(22, 14);
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: .12, depthWrite: false });
  const ground = new THREE.Mesh(shadowGeometry, shadowMaterial); ground.position.z = -.8; ground.receiveShadow = true; scene.add(ground);
  const styles = getComputedStyle(root);
  const bodyFont = styles.getPropertyValue("--font-assemblage-body").trim() || "sans-serif";
  const monoFont = styles.getPropertyValue("--font-assemblage-mono").trim() || "monospace";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(pointer: fine)");
  let settings = initial;
  let target = Math.max(0, MATERIALS.findIndex((material) => material.id === initial.selected));
  const track: Spring = { value: target, velocity: 0 };
  const drift = { speed: CLOCKWISE_SPEED };
  let manualUntil = 0;
  let announced = initial.selected;
  const tilt: Spring = { value: 0, velocity: 0 };
  let tiltTarget = 0;
  let visible = false, disposed = false, contextAvailable = true;
  let frame = 0, lastTime = 0, started = 0, hovered = -1, departure = 0;
  let pointer: { id: number; startX: number; startY: number; x: number; time: number; velocity: number; position: number; drift: number; moved: boolean; hit: number } | null = null;
  const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(), corner = new THREE.Vector3();
  const sheets = MATERIALS.map((material) => {
    const texture = printTexture(material.id, bodyFont, monoFont);
    const geometry = new THREE.PlaneGeometry(material.width, material.height, 22, 26);
    const surface = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide, roughness: material.id === "signal" ? .32 : .92, transparent: true, opacity: 1, metalness: 0, depthWrite: material.id !== "signal" });
    const mesh = new THREE.Mesh(geometry, surface); mesh.castShadow = true; mesh.receiveShadow = true; assembly.add(mesh);
    return { mesh, texture, bend: { value: .035, velocity: 0 } };
  });

  function paint(now: number) {
    frame = 0;
    if (disposed || !contextAvailable || !visible || document.hidden) return;
    const elapsed = (now - lastTime) / 1000 || .016;
    const dt = Math.min(elapsed, .05); lastTime = now;
    if (!started) started = now;
    const intro = reduced.matches ? 1 : clamp((now - started) / 1100);
    const entrance = 1 - Math.pow(1 - intro, 4);
    const distance = advanceDrift(drift, Math.min(elapsed, .25), Boolean(pointer) || now < manualUntil, reduced.matches);
    if (pointer) {
      pointer.drift += distance;
      track.value = pointer.position - (pointer.x - pointer.startX) / Math.max(180, surface.clientWidth * .65) + pointer.drift;
      target = track.value;
    } else {
      target += distance;
      stepSpring(track, target, dt, reduced.matches);
    }
    stepSpring(tilt, reduced.matches ? 0 : tiltTarget, dt, reduced.matches);
    assembly.rotation.x = tilt.value;
    let moving = intro < 1 || Boolean(pointer) || Math.abs(track.value - target) > Math.max(.04, Math.abs(drift.speed) * .2) || Math.abs(track.velocity - drift.speed) > .015 || Math.abs(tilt.velocity) > .001;
    const poses = carouselLayout(track.value, 4.1 + settings.spread / 100 * .7, camera.position.z);
    sheets.forEach((sheet, index) => {
      const material = MATERIALS[index], pose = poses[index];
      const distance = Math.abs(pose.x) / 4.1;
      sheet.mesh.position.set(pose.x, pose.y + (1 - entrance) * 1.5, pose.z - departure * distance * .35);
      sheet.mesh.rotation.set(pose.rx + (1 - entrance) * .35, pose.ry, pose.rz);
      sheet.mesh.scale.setScalar(pose.scale * (.92 + entrance * .08));
      sheet.mesh.material.opacity = pose.opacity * entrance * (material.id === "signal" ? .88 : 1);
      sheet.mesh.visible = pose.opacity > .001;
      const oldBend = sheet.bend.value;
      stepSpring(sheet.bend, reduced.matches ? .035 : pointer?.moved ? clamp(pointer.velocity * .035, -.18, .18) : hovered === index ? .09 : .035, dt, reduced.matches);
      if (Math.abs(oldBend - sheet.bend.value) > .00005 || intro < 1 || !root.dataset.asSceneReady) {
        const vertices = sheet.mesh.geometry.attributes.position;
        for (let vertex = 0; vertex < vertices.count; vertex++) {
          const x = vertices.getX(vertex) / material.width * 2, y = vertices.getY(vertex) / material.height * 2;
          vertices.setZ(vertex, Math.pow(Math.abs(x), 3) * sheet.bend.value + Math.sin(y * 2 + index) * .025);
        }
        vertices.needsUpdate = true; sheet.mesh.geometry.computeVertexNormals();
      }
      moving ||= Math.abs(sheet.bend.velocity) > .001;
    });
    assembly.updateMatrixWorld(true); camera.updateMatrixWorld();
    root.dataset.asMaterialBounds = JSON.stringify(sheets.map((sheet, index) => {
      const material = MATERIALS[index];
      const bounds = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity, opacity: sheet.mesh.material.opacity };
      for (const x of [-1, 1]) for (const y of [-1, 1]) {
        corner.set(x * material.width / 2, y * material.height / 2, .12).applyMatrix4(sheet.mesh.matrixWorld).project(camera);
        bounds.left = Math.min(bounds.left, corner.x); bounds.right = Math.max(bounds.right, corner.x);
        bounds.top = Math.min(bounds.top, corner.y); bounds.bottom = Math.max(bounds.bottom, corner.y);
      }
      return bounds;
    }));
    root.dataset.asCarouselPosition = track.value.toFixed(4);
    root.dataset.asCarouselIndex = String(wrapIndex(Math.round(track.value)));
    root.dataset.asDriftSpeed = drift.speed.toFixed(5);
    root.dataset.asAutoplay = reduced.matches ? "reduced" : "clockwise";
    const current = MATERIALS[wrapIndex(Math.round(track.value))].id;
    // Do not echo automatic selection back into the spring as a new snap target.
    if (!pointer && Math.abs(track.value - target) < .12 && current !== announced) {
      announced = current; select(current, true);
    }
    light.position.set(Math.cos(settings.light / 100 * Math.PI) * 6 - 2, 5, 8);
    renderer.render(scene, camera);
    root.dataset.asSceneReady = "true";
    root.dataset.asSceneSettled = String(!moving);
    if (moving || !reduced.matches) kick(false);
  }
  function kick(markUnsettled = true) {
    if (disposed || !contextAvailable || frame || !visible || document.hidden) return;
    if (!lastTime || (markUnsettled && performance.now() - lastTime > 100)) lastTime = performance.now() - 16;
    if (markUnsettled) root.dataset.asSceneSettled = "false";
    frame = requestAnimationFrame(paint);
  }
  function measure() {
    const bounds = surface.getBoundingClientRect(), width = Math.max(1, surface.clientWidth), height = Math.max(1, surface.clientHeight);
    const bleed = parseFloat(getComputedStyle(host).getPropertyValue("--as-canvas-bleed")) || 224;
    const renderWidth = document.documentElement.clientWidth, renderHeight = height + bleed * 2;
    host.style.left = `${-bounds.left}px`; host.style.width = `${renderWidth}px`;
    camera.position.z = width / height < .85 ? 11 : 9.8;
    camera.setViewOffset(width, height, -bounds.left, -bleed, renderWidth, renderHeight);
    camera.updateProjectionMatrix(); renderer.setSize(renderWidth, renderHeight, false); kick();
  }
  function point(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    mouse.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(sheets.filter(sheet => sheet.mesh.visible && sheet.mesh.material.opacity > .12).map(sheet => sheet.mesh), false);
    return hits[0] ? sheets.findIndex(sheet => sheet.mesh === hits[0].object) : -1;
  }
  function inside(event: PointerEvent) {
    const bounds = surface.getBoundingClientRect();
    return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  }
  const control = (event: PointerEvent) => event.target instanceof Element && Boolean(event.target.closest("a, button, input, textarea, select, summary"));
  function onDown(event: PointerEvent) {
    if (event.button !== 0 || pointer || !visible || !contextAvailable || root.dataset.asSceneReady !== "true" || control(event)) return;
    const hit = point(event); if (hit < 0 && !inside(event)) return;
    if (event.pointerType !== "touch") { event.preventDefault(); canvas.setPointerCapture(event.pointerId); }
    pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, time: performance.now(), velocity: 0, position: track.value, drift: 0, moved: false, hit };
    manualUntil = performance.now() + 5000;
    track.velocity = 0; kick();
  }
  function onMove(event: PointerEvent) {
    if (!visible || !contextAvailable) return;
    if (!pointer || pointer.id !== event.pointerId) {
      const next = control(event) ? -1 : point(event);
      if (next !== hovered) { hovered = next; kick(); }
      const nextTilt = fine.matches && !reduced.matches && inside(event) ? clamp((event.clientY - surface.getBoundingClientRect().top) / surface.clientHeight - .5, -.5, .5) * .1 : 0;
      if (nextTilt !== tiltTarget) { tiltTarget = nextTilt; kick(); }
      return;
    }
    const dx = event.clientX - pointer.startX, dy = event.clientY - pointer.startY;
    if (!pointer.moved && Math.hypot(dx, dy) < 6) return;
    if (!pointer.moved && event.pointerType === "touch" && Math.abs(dy) > Math.abs(dx)) return;
    if (!pointer.moved) { pointer.moved = true; canvas.setPointerCapture(event.pointerId); root.dataset.asDragging = "true"; }
    const pixels = Math.max(180, surface.clientWidth * .65), now = performance.now();
    const velocity = -(event.clientX - pointer.x) / Math.max(8, now - pointer.time) * 1000 / pixels;
    pointer.velocity = pointer.velocity * .3 + velocity * .7;
    track.value = pointer.position - dx / pixels + pointer.drift; track.velocity = 0;
    pointer.x = event.clientX; pointer.time = now; kick();
  }
  function goTo(value: number) {
    target = Math.round(value); announced = MATERIALS[wrapIndex(target)].id;
    manualUntil = performance.now() + 5000; select(announced); kick();
  }
  function release(event: PointerEvent) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const drag = pointer; pointer = null; root.dataset.asDragging = "false";
    if (event.type === "pointerup" && drag.moved) {
      const velocity = !reduced.matches && performance.now() - drag.time < 100 ? drag.velocity : 0;
      track.velocity = clamp(velocity, -6, 6); goTo(releaseSlide(track.value, velocity));
    } else if (event.type === "pointerup" && drag.hit >= 0) {
      goTo(nearestSlide(drag.hit, target));
    } else { goTo(Math.round(track.value)); }
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }
  const scroll = () => {
    if (root.dataset.variant !== "hero") return;
    const bounds = root.closest<HTMLElement>(".as-hero-runway")?.getBoundingClientRect();
    departure = bounds && !reduced.matches ? clamp(-bounds.top / Math.max(1, bounds.height - innerHeight)) : 0; kick();
  };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; pointer = null; root.dataset.asDragging = "false"; }
    else kick();
  };
  const mode = () => { pointer = null; track.velocity = 0; root.dataset.asDragging = "false"; kick(); };
  const lost = (event: Event) => { event.preventDefault(); contextAvailable = false; delete root.dataset.asSceneReady; cancelAnimationFrame(frame); frame = 0; };
  const restored = () => { contextAvailable = true; measure(); kick(); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) kick(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: "120px" });
  observer.observe(root);
  const sizes = new ResizeObserver(measure); sizes.observe(surface);
  document.addEventListener("pointerdown", onDown); document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", release); document.addEventListener("pointercancel", release);
  canvas.addEventListener("lostpointercapture", release);
  canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
  window.addEventListener("resize", measure); window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility); reduced.addEventListener("change", mode);
  measure(); scroll();
  return {
    advance(direction: number) {
      target = Math.round(performance.now() < manualUntil ? target : track.value) + direction;
      announced = MATERIALS[wrapIndex(target)].id; manualUntil = performance.now() + 5000; kick();
    },
    update(next: StudioSettings) {
      if (next.selected !== announced) {
        target = nearestSlide(MATERIALS.findIndex(material => material.id === next.selected), track.value);
        announced = next.selected; manualUntil = performance.now() + 5000;
      }
      settings = next; kick();
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect();
      document.removeEventListener("pointerdown", onDown); document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", release); document.removeEventListener("pointercancel", release);
      canvas.removeEventListener("lostpointercapture", release);
      canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
      window.removeEventListener("resize", measure); window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", mode);
      sheets.forEach(sheet => { sheet.mesh.geometry.dispose(); sheet.mesh.material.dispose(); sheet.texture.dispose(); });
      shadowGeometry.dispose(); shadowMaterial.dispose(); light.shadow.map?.dispose();
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); delete root.dataset.asSceneReady; delete root.dataset.asSceneSettled;
    },
  };
}
