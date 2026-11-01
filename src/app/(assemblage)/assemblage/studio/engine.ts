import * as THREE from "three";
import { clamp, MATERIALS, materialPose, stepSpring, type Composition, type LayerId, type Pose, type Spring } from "./physics";
import { printTexture } from "./textures";

export type StudioSettings = { mode: Composition; spread: number; light: number; revision: number; selected: LayerId | null };
type Sheet = {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;
  springs: Record<keyof Pose, Spring>;
  offset: { x: number; y: number };
  bend: Spring;
  texture: THREE.CanvasTexture;
};

/** A bounded, on-demand paper simulation. React owns controls; this owns every rendered frame. */
export function createPaperStudio(root: HTMLElement, host: HTMLElement, initial: StudioSettings, select: (id: LayerId) => void) {
  const surface = host.parentElement!;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 40);
  camera.position.set(0, 0, 9.4);
  const assembly = new THREE.Group();
  scene.add(assembly);
  const ambient = new THREE.HemisphereLight(0xf6f0e8, 0xe2d8c9, 2.7);
  scene.add(ambient);
  const light = new THREE.DirectionalLight(0xffffff, 3.2);
  light.position.set(-3, 5, 8); light.castShadow = true;
  const shadowSize = matchMedia("(pointer: fine)").matches ? 2048 : 1024;
  light.shadow.mapSize.set(shadowSize, shadowSize);
  light.shadow.camera.left = -6; light.shadow.camera.right = 6;
  light.shadow.camera.top = 6; light.shadow.camera.bottom = -6;
  light.shadow.normalBias = .015; light.shadow.bias = -.0003;
  light.shadow.radius = 4;
  scene.add(light);
  const shadowGeometry = new THREE.PlaneGeometry(18, 18);
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: .17 });
  const ground = new THREE.Mesh(shadowGeometry, shadowMaterial);
  ground.position.z = -.8; ground.receiveShadow = true; scene.add(ground);

  const styles = getComputedStyle(root);
  const bodyFont = styles.getPropertyValue("--font-assemblage-body").trim() || "sans-serif";
  const monoFont = styles.getPropertyValue("--font-assemblage-mono").trim() || "monospace";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(pointer: fine)");
  let settings = initial;
  let visible = false;
  let disposed = false;
  let contextAvailable = true;
  let frame = 0;
  let lastTime = 0;
  let scrollOut = 0;
  let hovered = -1;
  let pointer: { id: number; index: number; x: number; y: number; startX: number; startY: number; moved: boolean; vx: number; vy: number; time: number } | null = null;
  let intro = reduced.matches ? 1 : 0;
  let started = 0;
  let spinTarget = 0;
  const orbitX: Spring = { value: 0, velocity: 0 };
  const orbitY: Spring = { value: 0, velocity: 0 };
  const cameraDepth: Spring = { value: 9.4, velocity: 0 };
  let cameraBase = 9.4;
  let orbitTargetX = 0;
  let orbitTargetY = 0;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
  const intersection = new THREE.Vector3();
  const dragOffset = new THREE.Vector3();
  const lightPosition = new THREE.Vector3();

  const sheets: Sheet[] = MATERIALS.map((material, index) => {
    const texture = printTexture(material.id, bodyFont, monoFont);
    const geometry = new THREE.PlaneGeometry(material.width, material.height, 22, 26);
    const surface = new THREE.MeshStandardMaterial({
      map: texture, side: THREE.DoubleSide, roughness: material.id === "signal" ? .32 : .92,
      transparent: material.id === "signal", opacity: material.id === "signal" ? .84 : 1,
      metalness: 0, depthWrite: material.id !== "signal",
    });
    const mesh = new THREE.Mesh(geometry, surface);
    mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.index = index;
    assembly.add(mesh);
    const pose = materialPose(index, initial.mode, initial.spread, initial.revision, initial.selected);
    const springs = Object.fromEntries(Object.entries(pose).map(([key, value]) => [key, { value, velocity: 0 }])) as Record<keyof Pose, Spring>;
    return { mesh, springs, offset: { x: 0, y: 0 }, bend: { value: .04, velocity: 0 }, texture };
  });

  function point(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    mouse.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(sheets.map((sheet) => sheet.mesh), false)[0];
  }

  function insideSurface(event: PointerEvent) {
    const bounds = surface.getBoundingClientRect();
    return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  }

  function isControl(event: PointerEvent) {
    return event.target instanceof Element && Boolean(event.target.closest("a, button, input, textarea, select, summary"));
  }

  function paint(now: number) {
    frame = 0;
    if (disposed || !contextAvailable || !visible || document.hidden) return;
    const dt = Math.min((now - lastTime) / 1000 || .016, .05);
    lastTime = now;
    if (!started) started = now;
    intro = reduced.matches ? 1 : clamp((now - started) / 1550);
    let moving = intro < 1;
    stepSpring(cameraDepth, cameraBase + (settings.mode === "unpack" ? 2.2 : 0) + settings.spread * .008, dt, reduced.matches);
    camera.position.z = cameraDepth.value;
    moving ||= Math.abs(cameraDepth.velocity) > .001;
    const entrance = 1 - Math.pow(1 - intro, 4);
    stepSpring(orbitX, reduced.matches ? 0 : orbitTargetX, dt, reduced.matches);
    stepSpring(orbitY, reduced.matches ? 0 : orbitTargetY + spinTarget, dt, reduced.matches);
    assembly.rotation.set(orbitX.value, orbitY.value, 0);
    moving ||= Math.abs(orbitX.velocity) + Math.abs(orbitY.velocity) > .001;
    sheets.forEach((sheet, index) => {
      const material = MATERIALS[index];
      const goal = materialPose(index, settings.mode, settings.spread, settings.revision, settings.selected);
      goal.x += sheet.offset.x;
      goal.y += sheet.offset.y;
      if (!reduced.matches) {
        goal.x += (index % 2 ? 1 : -1) * scrollOut * .8;
        goal.z += scrollOut * index * .2 + (hovered === index ? .18 : 0);
        goal.rx += scrollOut * (index % 2 ? .2 : -.2);
      }
      if (pointer?.index === index && pointer.moved) goal.z += .65;
      for (const key of Object.keys(goal) as (keyof Pose)[]) {
        stepSpring(sheet.springs[key], goal[key], dt, reduced.matches);
        moving ||= Math.abs(sheet.springs[key].velocity) > .001 || Math.abs(sheet.springs[key].value - goal[key]) > .001;
      }
      const s = sheet.springs;
      const stagger = Math.max(0, (entrance - index * .08) / (1 - index * .08));
      sheet.mesh.position.set(s.x.value + (1 - stagger) * (index % 2 ? 3 : -3), s.y.value + (1 - stagger) * 2.5, s.z.value);
      sheet.mesh.rotation.set(s.rx.value + (1 - stagger) * .7, s.ry.value + (1 - stagger) * -.9, s.rz.value + (1 - stagger) * (index % 2 ? -.5 : .5));
      const bendGoal = reduced.matches ? .04 : pointer?.index === index && pointer.moved ? clamp(pointer.vx * -.02, -.3, .3) : hovered === index ? .12 : .035;
      const oldBend = sheet.bend.value;
      stepSpring(sheet.bend, bendGoal, dt, reduced.matches);
      if (Math.abs(oldBend - sheet.bend.value) > .00005 || intro < 1 || !root.dataset.asSceneReady) {
        const vertices = sheet.mesh.geometry.attributes.position;
        for (let vertex = 0; vertex < vertices.count; vertex++) {
          const x = vertices.getX(vertex) / material.width * 2;
          const y = vertices.getY(vertex) / material.height * 2;
          vertices.setZ(vertex, Math.pow(Math.abs(x), 3) * sheet.bend.value + Math.sin(y * 2 + index) * .025);
        }
        vertices.needsUpdate = true; sheet.mesh.geometry.computeVertexNormals();
      }
      moving ||= Math.abs(sheet.bend.velocity) > .001;
      // Exposed positions support diagnostics without retaining the WebGL scene on window.
      root.style.setProperty(`--as-${material.id}-x`, s.x.value.toFixed(3));
      root.style.setProperty(`--as-${material.id}-y`, s.y.value.toFixed(3));
    });
    lightPosition.set(Math.cos(settings.light / 100 * Math.PI) * 6 - 2, 5, 8);
    light.position.copy(lightPosition);
    renderer.render(scene, camera);
    root.dataset.asSceneReady = "true";
    root.dataset.asSceneSettled = String(!moving && !pointer);
    if (moving || pointer) kick();
  }

  function kick() {
    if (disposed || !contextAvailable || frame || !visible || document.hidden) return;
    if (!lastTime || performance.now() - lastTime > 100) lastTime = performance.now() - 16;
    frame = requestAnimationFrame(paint);
  }

  function measure() {
    const bounds = surface.getBoundingClientRect();
    const width = Math.max(1, surface.clientWidth), height = Math.max(1, surface.clientHeight);
    const bleed = parseFloat(getComputedStyle(host).getPropertyValue("--as-canvas-bleed"));
    const renderWidth = document.documentElement.clientWidth;
    const renderHeight = height + bleed * 2;
    host.style.left = `${-bounds.left}px`;
    host.style.width = `${renderWidth}px`;
    camera.aspect = width / height;
    cameraBase = camera.aspect < .85 ? 11 : 9.4;
    if (intro === 0) cameraDepth.value = cameraBase;
    // Expand the frustum beyond the nominal scene without changing the paper's scale or origin.
    camera.setViewOffset(width, height, -bounds.left, -bleed, renderWidth, renderHeight);
    camera.updateProjectionMatrix(); renderer.setSize(renderWidth, renderHeight, false); kick();
  }

  function onDown(event: PointerEvent) {
    if (event.button !== 0 || pointer || !visible || !contextAvailable || isControl(event)) return;
    const hit = point(event);
    if (!hit && !insideSurface(event)) return;
    if (event.pointerType !== "touch" && hit) event.preventDefault();
    const index = hit ? Number(hit.object.userData.index) : -1;
    pointer = { id: event.pointerId, index, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false, vx: 0, vy: 0, time: performance.now() };
    if (index >= 0 && raycaster.ray.intersectPlane(dragPlane, intersection)) {
      dragOffset.copy(intersection).sub(sheets[index].mesh.position);
    }
    if (event.pointerType !== "touch") canvas.setPointerCapture(event.pointerId);
    kick();
  }

  function onMove(event: PointerEvent) {
    if (!visible || !contextAvailable) return;
    const hit = point(event);
    if (!pointer || pointer.id !== event.pointerId) {
      const next = hit && !isControl(event) ? Number(hit.object.userData.index) : -1;
      if (next !== hovered) { hovered = next; canvas.style.cursor = next >= 0 ? "grab" : "move"; kick(); }
      if (fine.matches && !reduced.matches && (next >= 0 || insideSurface(event))) {
        const bounds = surface.getBoundingClientRect();
        orbitTargetX = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1) * .1;
        orbitTargetY = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1) * .12;
        kick();
      } else if (orbitTargetX !== 0 || orbitTargetY !== 0) {
        orbitTargetX = orbitTargetY = 0; kick();
      }
      return;
    }
    if (!pointer.moved && Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) < 6) return;
    if (!pointer.moved && event.pointerType === "touch" && Math.abs(event.clientY - pointer.startY) > Math.abs(event.clientX - pointer.startX)) return;
    if (!pointer.moved) {
      pointer.moved = true; canvas.setPointerCapture(event.pointerId);
      root.dataset.asDragging = "true"; canvas.style.cursor = "grabbing";
    }
    const time = performance.now(), dt = Math.max(8, time - pointer.time);
    pointer.vx = (event.clientX - pointer.x) / dt;
    pointer.vy = (event.clientY - pointer.y) / dt;
    if (pointer.index >= 0) {
      if (raycaster.ray.intersectPlane(dragPlane, intersection)) {
        const sheet = sheets[pointer.index];
        const base = materialPose(pointer.index, settings.mode, settings.spread, settings.revision, settings.selected);
        sheet.offset.x = clamp(intersection.x - dragOffset.x - base.x, -1.8, 1.8);
        sheet.offset.y = clamp(intersection.y - dragOffset.y - base.y, -1.6, 1.6);
      }
    } else if (!reduced.matches) {
      spinTarget += (event.clientX - pointer.x) * .004;
      orbitTargetX = clamp(orbitTargetX + (event.clientY - pointer.y) * .003, -.4, .4);
    }
    pointer.x = event.clientX; pointer.y = event.clientY; pointer.time = time; kick();
  }

  function release(event: PointerEvent) {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (event.type === "pointerup" && pointer.index >= 0) {
      if (!pointer.moved) select(MATERIALS[pointer.index].id);
      else if (!reduced.matches && performance.now() - pointer.time < 90) {
        const sheet = sheets[pointer.index];
        sheet.offset.x = clamp(sheet.offset.x + pointer.vx * .2, -1.8, 1.8);
        sheet.offset.y = clamp(sheet.offset.y - pointer.vy * .2, -1.6, 1.6);
        sheet.springs.rz.velocity += pointer.vx * .5;
      }
    }
    pointer = null; root.dataset.asDragging = "false"; canvas.style.cursor = "grab";
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    kick();
  }

  const leave = () => { if (!pointer) { hovered = -1; orbitTargetX = 0; orbitTargetY = 0; kick(); } };
  const scroll = () => {
    if (root.dataset.variant !== "hero") return;
    const hero = root.closest<HTMLElement>(".as-hero-runway");
    if (!hero) return;
    const bounds = hero.getBoundingClientRect();
    scrollOut = reduced.matches ? 0 : clamp(-bounds.top / Math.max(1, bounds.height - innerHeight));
    kick();
  };
  const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; pointer = null; root.dataset.asDragging = "false"; } else kick(); };
  const onMode = () => { pointer = null; root.dataset.asDragging = "false"; if (reduced.matches) intro = 1; scroll(); kick(); };
  const contextLost = (event: Event) => { event.preventDefault(); contextAvailable = false; delete root.dataset.asSceneReady; cancelAnimationFrame(frame); frame = 0; };
  const contextRestored = () => { contextAvailable = true; measure(); kick(); };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick(); else { cancelAnimationFrame(frame); frame = 0; }
  }, { rootMargin: "120px" });
  observer.observe(root);
  const sizeObserver = new ResizeObserver(measure); sizeObserver.observe(surface);
  // Transparent overscan must not intercept links or controls under the canvas.
  // Raycast document events so visible sheets remain draggable outside their original div.
  document.addEventListener("pointerdown", onDown);
  document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
  canvas.addEventListener("lostpointercapture", release);
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("resize", measure);
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", onMode);
  measure(); scroll();

  return {
    nudge(id: LayerId, x: number, y: number) {
      const sheet = sheets[MATERIALS.findIndex((material) => material.id === id)];
      sheet.offset.x = clamp(sheet.offset.x + x, -1.8, 1.8);
      sheet.offset.y = clamp(sheet.offset.y + y, -1.6, 1.6);
      kick();
    },
    update(next: StudioSettings) {
      if (next.revision !== settings.revision || next.mode !== settings.mode) {
        sheets.forEach((sheet) => { sheet.offset = { x: 0, y: 0 }; });
        spinTarget = 0; orbitTargetX = 0;
      }
      settings = next; kick();
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      window.removeEventListener("scroll", scroll); document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", onMode);
      document.removeEventListener("pointerdown", onDown); document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", release); document.removeEventListener("pointercancel", release);
      canvas.removeEventListener("lostpointercapture", release); canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost); canvas.removeEventListener("webglcontextrestored", contextRestored);
      sheets.forEach((sheet) => { sheet.mesh.geometry.dispose(); sheet.mesh.material.dispose(); sheet.texture.dispose(); });
      shadowGeometry.dispose(); shadowMaterial.dispose(); light.shadow.map?.dispose();
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); delete root.dataset.asSceneReady;
      delete root.dataset.asSceneSettled;
    },
  };
}
