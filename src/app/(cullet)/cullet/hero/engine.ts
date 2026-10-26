import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { insetPolygon, roundedCorners, centroid, type Pt } from "../cut/geometry";
import { solveHomography, toMatrix3d } from "../cut/homography";
import { cellPolys, cleaveFactor, DRIFT, flight, glassMetrics, livePoints, navPolys, scaleFor, shatterFactor } from "../cut/pattern";
import { clamp, smoothing } from "../motion/math";
import { heroBus } from "./bus";
import { printRegion } from "./print";

/**
 * The slab of frosted quartz: eleven extruded shards (three in the nav, eight in the panel) under a
 * high-key studio, carrying printed copies of the DOM text. The DOM stays on top, transparent and
 * mapped onto the tilted glass by a homography, so text can be selected and every link focused.
 *
 * The page tilts toward the pointer; the shard under it lifts and tips on a spring and the cut
 * gives way around it. Scrolling cleaves the slab (heroBus.cleave); "Read paper" shatters it.
 */
export type HeroEls = {
  stage: HTMLElement; canvas: HTMLCanvasElement; slab: HTMLElement; nav: HTMLElement; panel: HTMLElement;
  back: HTMLElement | null;
};

type Mode = "entering" | "assembled" | "shattering" | "paper" | "reassembling";

type Shard = {
  index: number; nav: boolean;
  group: THREE.Group; glass: THREE.Mesh; cap: THREE.Mesh; shadow: THREE.Mesh; mat: THREE.MeshPhysicalMaterial;
  base: THREE.Vector3; out: Pt;
  z: number; zv: number; rx: number; rxv: number; ry: number; ryv: number; hover: number;
  zImpulse: number; axis: THREE.Vector3; tumble: number;
};

const FOV = 30;

function roundedShape(pts: Pt[], radius: number) {
  const shape = new THREE.Shape();
  const c = roundedCorners(pts, radius);
  shape.moveTo(c[0].start.x, c[0].start.y);
  for (let i = 0; i < c.length; i++) {
    const next = c[(i + 1) % c.length];
    shape.quadraticCurveTo(c[i].ctrl.x, c[i].ctrl.y, c[i].end.x, c[i].end.y);
    shape.lineTo(next.start.x, next.start.y);
  }
  shape.closePath();
  return shape;
}

/** A flat cap with UVs mapped to the whole region, so each shard shows its own slice of the print. */
function capGeometry(shape: THREE.Shape, cx: number, cy: number, w: number, h: number) {
  const geo = new THREE.ShapeGeometry(shape, 8);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + cx + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + cy + h / 2) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

export function createHeroEngine(els: HeroEls, opts: { onModeChange?: (mode: Mode) => void } = {}) {
  const { stage, canvas, slab, nav, panel } = els;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 10000);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.85;

  // high-key studio for white quartz: key from the upper left, a cool fill from below, a rim from behind
  scene.add(new THREE.AmbientLight(0xffffff, 1.35));
  const hemi = new THREE.HemisphereLight(0xffffff, 0xdce8ff, 1.15);
  hemi.position.set(0, 600, 400);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-650, 750, 950); scene.add(key);
  const fill = new THREE.DirectionalLight(0xdce8ff, 1.35); fill.position.set(700, -550, 600); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xeef4ff, 1.1); rim.position.set(0, 850, -400); scene.add(rim);

  const page = new THREE.Group();
  scene.add(page);

  // --- the print -----------------------------------------------------------
  const dpr = Math.min(Math.max(devicePixelRatio || 1, 2), 2.5);
  const makePrint = () => {
    const c = document.createElement("canvas");
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return { c, tex, mat: new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }) };
  };
  const navPrint = makePrint();
  const panelPrint = makePrint();
  const print = () => {
    printRegion(navPrint.c, nav, dpr); navPrint.tex.needsUpdate = true;
    printRegion(panelPrint.c, panel, dpr); panelPrint.tex.needsUpdate = true;
  };

  // --- the glass -----------------------------------------------------------
  const pointer = { world: new THREE.Vector3(), glow: { value: 0 }, scale: { value: 1 } };
  const glassMaterial = (glow: boolean) => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, emissive: 0xf0f4fa, emissiveIntensity: 0.35,
      roughness: 0.22, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.08,
      reflectivity: 0.9, ior: 1.52, specularIntensity: 1, specularColor: 0xffffff,
      iridescence: glow ? 0.65 : 0.5, iridescenceIOR: 1.35, iridescenceThicknessRange: [280, 680], envMapIntensity: 1.15,
    });
    if (glow) {
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uPointerWorld = { value: pointer.world };
        shader.uniforms.uPointerGlow = pointer.glow;
        shader.uniforms.uScaleS = pointer.scale;
        shader.vertexShader = "varying vec3 vCulletWorld;\n" + shader.vertexShader.replace(
          "#include <worldpos_vertex>",
          "#include <worldpos_vertex>\nvCulletWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;",
        );
        // a cobalt and rose refraction blush that follows the pointer across the quartz
        shader.fragmentShader = "uniform vec3 uPointerWorld;\nuniform float uPointerGlow;\nuniform float uScaleS;\nvarying vec3 vCulletWorld;\n" +
          shader.fragmentShader.replace(
            "#include <dithering_fragment>",
            `float culletD = length(vCulletWorld.xy - uPointerWorld.xy);
            float culletR = max(120.0, 300.0 * uScaleS);
            float culletFall = exp(-1.6 * pow(culletD / culletR, 2.0)) * uPointerGlow;
            gl_FragColor.rgb += vec3(-0.11, -0.04, 0.09) * 0.28 * culletFall + vec3(0.20, 0.45, 0.96) * 0.09 * culletFall;
            #include <dithering_fragment>`,
          );
      };
    }
    return mat;
  };
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0xd5dbe8, transparent: true, opacity: 0.52, depthWrite: false });

  const shards: Shard[] = Array.from({ length: 11 }, (_, index) => {
    const group = new THREE.Group();
    page.add(group);
    const mat = glassMaterial(true);
    const glass = new THREE.Mesh(new THREE.BufferGeometry(), mat);
    const cap = new THREE.Mesh(new THREE.BufferGeometry(), index < 3 ? navPrint.mat : panelPrint.mat);
    const shadow = new THREE.Mesh(new THREE.BufferGeometry(), shadowMat);
    group.add(glass, cap, shadow);
    const shard: Shard = {
      index, nav: index < 3, group, glass, cap, shadow, mat,
      base: new THREE.Vector3(), out: { x: 0, y: 1 },
      z: 0, zv: 0, rx: 0, rxv: 0, ry: 0, ryv: 0, hover: 0,
      zImpulse: 460 + Math.random() * 340,
      axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, (Math.random() - 0.5) * 0.7).normalize(),
      tumble: 2.1 + Math.random() * 1.55,
    };
    glass.userData.shard = shard;
    return shard;
  });

  // the "← Back" sliver beside the paper
  const sliver = new THREE.Group();
  const sliverGlass = new THREE.Mesh(new THREE.BufferGeometry(), glassMaterial(false));
  const sliverShadow = new THREE.Mesh(new THREE.BufferGeometry(), shadowMat);
  sliver.add(sliverGlass, sliverShadow);
  sliver.visible = false;
  scene.add(sliver);
  const sliverState = { scale: 0.001, target: 0, hx: 0, hy: 0, centre: new THREE.Vector3() };

  // --- layout from the DOM ---------------------------------------------------
  const L = { W: 1, H: 1, slabW: 1, slabH: 1, s: 1, portrait: false, navH: 1, navY: 0, panelH: 1, panelY: 0, ox: 0, oy: 0, navTop: 0, panelTop: 0, slabL: 0, slabT: 0 };

  const measure = () => {
    L.W = stage.clientWidth; L.H = stage.clientHeight;
    L.slabW = slab.offsetWidth; L.slabH = slab.offsetHeight;
    L.slabL = slab.offsetLeft; L.slabT = slab.offsetTop;
    L.s = scaleFor(L.slabW);
    L.portrait = L.slabH > L.slabW * 1.08;
    L.navTop = nav.offsetTop; L.navH = nav.offsetHeight;
    L.panelTop = panel.offsetTop; L.panelH = panel.offsetHeight;
    // y-up, centred on the slab
    L.navY = L.slabH / 2 - (L.navTop + L.navH / 2);
    L.panelY = L.slabH / 2 - (L.panelTop + L.panelH / 2);
    L.ox = L.slabL + L.slabW / 2 - L.W / 2;
    L.oy = L.H / 2 - (L.slabT + L.slabH / 2);
    const camZ = L.H / 2 / Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
    camera.aspect = L.W / L.H;
    camera.position.set(0, 0, camZ);
    camera.near = Math.max(10, camZ * 0.1);
    camera.far = camZ * 6;
    camera.updateProjectionMatrix();
    renderer.setSize(L.W, L.H, false);
    page.position.set(L.ox, L.oy, 0);
    pointer.scale.value = L.s;
  };

  const buildShard = (shard: Shard, poly: Pt[], w: number, h: number, cy: number) => {
    const { gap, radius, depth, bevel } = glassMetrics(L.s);
    const raw = poly.map((p) => ({ x: (p.x - 0.5) * w, y: (0.5 - p.y) * h }));
    const inset = insetPolygon(raw, gap / 2);
    const c = centroid(inset);
    shard.base.set(c.x, cy + c.y, 0);
    const local = inset.map((p) => ({ x: p.x - c.x, y: p.y - c.y }));
    const shape = roundedShape(local, radius);
    shard.glass.geometry.dispose(); shard.cap.geometry.dispose(); shard.shadow.geometry.dispose();
    shard.glass.geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 8 });
    shard.cap.geometry = capGeometry(shape, c.x, c.y, w, h);
    shard.cap.position.z = depth + bevel + 0.35;
    shard.shadow.geometry = new THREE.ShapeGeometry(shape, 6);
    shard.shadow.position.set(3 * L.s, -5 * L.s, -bevel - 3.5 * L.s);
    // outward, measured in screen terms (y down) against the slab's half-size
    const nx = c.x / (L.slabW / 2), ny = -(cy + c.y) / (L.slabH / 2);
    const len = Math.hypot(nx, ny);
    shard.out = len < 0.1 ? { x: 0.15, y: 0.3 } : { x: nx / len, y: ny / len };
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const panelPointer = { x: 0.5, y: 0.5, active: false };

  const rebuild = (time: number) => {
    const drift = reduced.matches ? 0 : DRIFT;
    navPolys(time, L.portrait, reduced.matches ? 0 : 0.007).forEach((poly, i) => buildShard(shards[i], poly, L.slabW, L.navH, L.navY));
    const pts = livePoints(time, drift, panelPointer.active ? panelPointer : null);
    cellPolys(pts).forEach((poly, i) => buildShard(shards[i + 3], poly, L.slabW, L.panelH, L.panelY));
  };

  const buildSliver = () => {
    const back = els.back;
    if (!back) return;
    // a skewed quad of quartz behind the button, in stage pixels
    const r = back.getBoundingClientRect(), s = stage.getBoundingClientRect();
    const x0 = r.left - s.left, y0 = r.top - s.top, w = r.width, h = r.height;
    const quad = [
      { x: x0 - w * 0.08, y: y0 + h * 0.95 }, { x: x0 + w * 0.82, y: y0 - h * 0.25 },
      { x: x0 + w * 1.12, y: y0 + h * 1.15 }, { x: x0 + w * 0.02, y: y0 + h * 1.25 },
    ].map((p) => ({ x: p.x - L.W / 2, y: L.H / 2 - p.y }));
    const c = centroid(quad);
    sliverState.centre.set(c.x, c.y, 0);
    sliver.position.set(c.x, c.y, 0);
    const shape = roundedShape(quad.map((p) => ({ x: p.x - c.x, y: p.y - c.y })), Math.max(8, 14 * L.s));
    sliverGlass.geometry.dispose(); sliverShadow.geometry.dispose();
    const bevel = Math.max(1.5, 2.4 * L.s);
    sliverGlass.geometry = new THREE.ExtrudeGeometry(shape, { depth: Math.max(6, 11 * L.s), bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel });
    sliverShadow.geometry = new THREE.ShapeGeometry(shape, 6);
    sliverShadow.position.set(3 * L.s, -5 * L.s, -bevel - 3 * L.s);
  };

  // --- the DOM text on the glass ---------------------------------------------
  const project = (v: THREE.Vector3) => {
    const p = v.clone().applyMatrix4(page.matrixWorld).project(camera);
    return { x: (p.x * 0.5 + 0.5) * L.W, y: (-p.y * 0.5 + 0.5) * L.H };
  };
  const mapPlane = (el: HTMLElement, top: number, h: number) => {
    const z = 17 * L.s;
    const x0 = -L.slabW / 2, x1 = L.slabW / 2;
    const y0 = L.slabH / 2 - top, y1 = y0 - h;
    const ox = L.slabL, oy = L.slabT + top;
    const corners = [project(new THREE.Vector3(x0, y0, z)), project(new THREE.Vector3(x1, y0, z)), project(new THREE.Vector3(x1, y1, z)), project(new THREE.Vector3(x0, y1, z))]
      .map((p) => ({ x: p.x - ox, y: p.y - oy })) as [Pt, Pt, Pt, Pt];
    el.style.transform = toMatrix3d(solveHomography(L.slabW, h, corners));
  };

  // --- interaction ----------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  const tilt = { rx: THREE.MathUtils.degToRad(0.8), ry: THREE.MathUtils.degToRad(-1.2), tx: THREE.MathUtils.degToRad(0.8), ty: THREE.MathUtils.degToRad(-1.2) };
  const ptr = { inside: false, overBack: false };
  let hovered: Shard | null = null;
  let mode: Mode = "entering";
  let modeStart = performance.now() / 1000;
  const setMode = (m: Mode) => { mode = m; modeStart = performance.now() / 1000; opts.onModeChange?.(m); };

  const onMove = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / L.W) * 2 - 1;
    const ny = ((e.clientY - r.top) / L.H) * 2 - 1;
    ndc.set(nx, -ny);
    ptr.inside = true;
    tilt.ty = THREE.MathUtils.degToRad(nx * 3.5 - 1.2);
    tilt.tx = THREE.MathUtils.degToRad(ny * 2.75 + 0.8);
  };
  const onLeave = () => {
    ptr.inside = false; hovered = null; panelPointer.active = false;
    tilt.ty = THREE.MathUtils.degToRad(-1.2); tilt.tx = THREE.MathUtils.degToRad(0.8);
  };
  stage.addEventListener("pointermove", onMove, { passive: true });
  stage.addEventListener("pointerleave", onLeave);
  const backIn = () => { ptr.overBack = true; };
  const backOut = () => { ptr.overBack = false; };
  els.back?.addEventListener("pointerenter", backIn);
  els.back?.addEventListener("pointerleave", backOut);

  // hover and focus restyle the print; batch into one reprint per frame
  let reprint = false;
  const markPrint = () => { reprint = true; };
  const hoverables = Array.from(slab.querySelectorAll<HTMLElement>("a, button"));
  for (const el of hoverables) {
    el.addEventListener("pointerenter", markPrint); el.addEventListener("pointerleave", markPrint);
    el.addEventListener("focus", markPrint); el.addEventListener("blur", markPrint);
  }

  // --- the loop ---------------------------------------------------------------
  let frame = 0, last = performance.now() / 1000, lastBuild = -1, running = false, visible = true;
  const spring = (pos: number, vel: number, target: number, dt: number) => {
    const f = -170 * (pos - target) - 19 * vel;
    vel += f * dt;
    return [pos + vel * dt, vel] as const;
  };

  const tick = () => {
    frame = 0;
    const now = performance.now() / 1000;
    const dt = Math.min(0.05, Math.max(0.001, now - last));
    last = now;
    const cleave = heroBus.cleave;
    const whole = mode === "assembled" && cleave < 0.01;

    const a = smoothing(dt, 0.3);
    tilt.rx += (tilt.tx - tilt.rx) * a;
    tilt.ry += (tilt.ty - tilt.ry) * a;
    page.rotation.set(tilt.rx, tilt.ry, 0);

    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(zPlane, hit);
    if (ptr.inside && whole) {
      pointer.world.copy(hit);
      pointer.glow.value += (1 - pointer.glow.value) * Math.min(1, dt * 8);
      const px = (hit.x - L.ox) / L.slabW + 0.5;
      const py = 0.5 - (hit.y - L.oy - L.panelY) / L.panelH;
      panelPointer.active = px >= -0.15 && px <= 1.15 && py >= -0.15 && py <= 1.15;
      panelPointer.x = px; panelPointer.y = py;
      const hits = raycaster.intersectObjects(shards.map((s) => s.glass), false);
      hovered = hits.length ? (hits[0].object.userData.shard as Shard) : null;
    } else {
      pointer.glow.value += (0 - pointer.glow.value) * Math.min(1, dt * 8);
      panelPointer.active = false;
      hovered = null;
    }

    // the cut drifts: rebuild the geometry at ~45 fps while the slab is (partly) whole
    if (page.visible && now - lastBuild >= 1 / 45) { lastBuild = now; rebuild(now); }
    if (reprint) { reprint = false; print(); }

    let allOut = true, allIn = true;
    const elapsed = now - modeStart;
    for (const s of shards) {
      const isHover = hovered === s && whole;
      const tz = isHover ? (s.nav ? 32 : 50) * L.s : 0;
      let trx = 0, try_ = 0;
      if (isHover) {
        const lx = (hit.x - L.ox - s.base.x) / Math.max(80, L.slabW * 0.22);
        const ly = (hit.y - L.oy - s.base.y) / Math.max(80, L.panelH * 0.22);
        try_ = clamp(lx * 0.18, -0.24, 0.24);
        trx = clamp(-ly * 0.18, -0.24, 0.24);
      }
      [s.z, s.zv] = spring(s.z, s.zv, tz, dt);
      [s.rx, s.rxv] = spring(s.rx, s.rxv, trx, dt);
      [s.ry, s.ryv] = spring(s.ry, s.ryv, try_, dt);
      s.hover += ((isHover ? 1 : 0) - s.hover) * Math.min(1, dt * 10);
      s.mat.iridescence = THREE.MathUtils.lerp(0.65, 1, s.hover);
      s.mat.envMapIntensity = THREE.MathUtils.lerp(1.15, 2, s.hover);

      let timed = 0;
      if (mode === "shattering") { timed = shatterFactor(elapsed, s.index, "out"); if (timed < 1) allOut = false; }
      else if (mode === "paper") timed = 1;
      else if (mode === "reassembling") { timed = shatterFactor(elapsed, s.index, "in"); if (elapsed < 0.12 + s.index * 0.03 + 0.72) allIn = false; }
      else if (mode === "entering") {
        // the glass takes over from the poster: a short lift-and-land, not a fly-in
        timed = shatterFactor(elapsed + 0.3, s.index, "in") * 0.18;
        if (elapsed + 0.3 < 0.12 + s.index * 0.03 + 0.72) allIn = false;
      }
      const scrolled = cleaveFactor(cleave, s.index);
      const useTimed = timed >= scrolled;
      const f = Math.max(timed, scrolled);
      const fl = flight(f, s.out, L.s, s.zImpulse, useTimed);
      // flight() is y-down; the scene is y-up
      s.group.position.set(s.base.x + fl.x, s.base.y - fl.y, s.base.z + s.z + fl.z);
      s.group.rotation.set(s.rx, s.ry, 0);
      if (Math.abs(f) > 1e-4) s.group.rotateOnAxis(s.axis, s.tumble * f * (useTimed ? 1 : 0.6));
    }

    if (mode === "shattering" && allOut) setMode("paper");
    else if ((mode === "entering" || mode === "reassembling") && allIn) setMode("assembled");
    // fully flown shards stop costing anything; scrolling back brings them home
    page.visible = mode === "paper" ? false : !(cleave >= 0.995 && mode === "assembled");

    // the back sliver
    if (sliver.visible) {
      sliverState.scale += (sliverState.target - sliverState.scale) * Math.min(1, dt * (sliverState.target > 0.5 ? 7.5 : 11));
      if (sliverState.target === 0 && sliverState.scale < 0.02) sliver.visible = false;
      else {
        const k = Math.max(0.001, sliverState.scale);
        sliver.scale.set(k, k, k);
        const still = reduced.matches ? 0 : 1;
        const wx = Math.sin(now * Math.PI * 1.9) * 0.032 * still;
        const wy = Math.cos(now * Math.PI * 1.6) * 0.036 * still;
        let hx = 0, hy = 0;
        if (ptr.overBack || (ptr.inside && mode === "paper")) {
          const dx = (hit.x - sliverState.centre.x) / (L.W * 0.15);
          const dy = (hit.y - sliverState.centre.y) / (L.H * 0.15);
          if (ptr.overBack || Math.hypot(dx, dy) < 1.5) { hy = clamp(dx * 0.12, -0.14, 0.14); hx = clamp(-dy * 0.12, -0.14, 0.14); }
        }
        sliverState.hx += (hx - sliverState.hx) * Math.min(1, dt * 8);
        sliverState.hy += (hy - sliverState.hy) * Math.min(1, dt * 8);
        sliver.rotation.set(0.08 + wx + sliverState.hx, -0.16 + wy + sliverState.hy, 0);
      }
    }

    page.updateMatrixWorld();
    mapPlane(nav, L.navTop, L.navH);
    mapPlane(panel, L.panelTop, L.panelH);
    renderer.render(scene, camera);

    const idle = !page.visible && !sliver.visible;
    if (running && visible && !document.hidden && !idle) frame = requestAnimationFrame(tick);
  };

  const wake = () => { if (running && !frame && visible && !document.hidden) { last = performance.now() / 1000; frame = requestAnimationFrame(tick); } };

  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
  io.observe(stage);
  const onVisibility = () => wake();
  document.addEventListener("visibilitychange", onVisibility);
  const resize = () => { measure(); rebuild(performance.now() / 1000); print(); buildSliver(); wake(); };
  const ro = new ResizeObserver(resize);
  ro.observe(stage);

  return {
    /** Prints the text (fonts must be loaded) and starts the loop. */
    start() {
      measure(); print(); rebuild(0); buildSliver();
      running = true;
      heroBus.wake = wake;
      setMode("entering");
      wake();
    },
    /** Wake the loop for a scroll change. */
    wake,
    reprint: markPrint,
    shatter() {
      if (mode !== "assembled" && mode !== "entering") return false;
      hovered = null;
      setMode("shattering");
      wake();
      return true;
    },
    showSliver(on: boolean) {
      if (on) { buildSliver(); sliver.visible = true; }
      sliverState.target = on ? 1 : 0;
      wake();
    },
    reassemble() {
      if (mode !== "shattering" && mode !== "paper") return;
      page.visible = true;
      setMode("reassembling");
      wake();
    },
    destroy() {
      running = false;
      heroBus.wake = null;
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      els.back?.removeEventListener("pointerenter", backIn);
      els.back?.removeEventListener("pointerleave", backOut);
      for (const el of hoverables) {
        el.removeEventListener("pointerenter", markPrint); el.removeEventListener("pointerleave", markPrint);
        el.removeEventListener("focus", markPrint); el.removeEventListener("blur", markPrint);
      }
      nav.style.removeProperty("transform");
      panel.style.removeProperty("transform");
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) { o.geometry.dispose(); }
      });
      shards.forEach((s) => s.mat.dispose());
      navPrint.tex.dispose(); panelPrint.tex.dispose(); env.dispose(); pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type HeroEngine = ReturnType<typeof createHeroEngine>;
