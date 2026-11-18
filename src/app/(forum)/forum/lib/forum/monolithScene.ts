import * as THREE from 'three';
import { MONOLITH, coronaAnchor, frameOffsetX } from './monolithMath';

/*
 * The hero's 2.5D asset: a real cuboid monolith in front of a total eclipse, rendered in layers at different
 * depths (stars far, eclipse mid, slab near) so pointer and scroll produce true parallax, then passed through an
 * ordered-dither shader that quantises everything to the FORUM palette, matching the halftone plate it replaces.
 */

// FORUM palette (DESIGN.md): field, ink, khaki-dim, khaki, cream.
const FIELD = new THREE.Color('#0E100C');
const SLAB = new THREE.Color('#171814');
const KHAKI_DIM = new THREE.Color('#8C876B');
// the slab albedo: ink lifted toward khaki so the lit face can climb into the mid dither tones
const SLAB_LIT = new THREE.Color('#171814').lerp(new THREE.Color('#8C876B'), 0.42);
const KHAKI = new THREE.Color('#B9B28A');
const CREAM = new THREE.Color('#F6F3EA');

const FOV = 30;
const CAMERA = { x: 0, y: -3.1, z: 14 };
const LOOK = { x: 0, y: 0.25, z: 0 };
const CORONA_Z = -8;
// the disc centres a little above the slab's middle, so the slab's top clears the rim as in the plate
const DISC_CENTRE_Y = 0.25;

export type MonolithScene = {
  /** Pointer in [-0.5, 0.5] on both axes; eased inside the loop. */
  setPointer(x: number, y: number): void;
  /** Where the slab sits horizontally, as a fraction of the frame (0.5 = centre). */
  setFraming(fraction: number): void;
  dispose(): void;
};

/** Seeded PRNG (mulberry32): the engraving is identical on every load. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Circuit-like engraving: orthogonal traces with short 45° jogs, square nodes and a vertical spine band, drawn on
 * a tall canvas. Returned as a luminance map: black field, grey grooves (the lit lip of each channel).
 */
function engravingTexture(seed: number, density: number, spine: boolean): THREE.CanvasTexture {
  const w = 256;
  const h = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const rand = rng(seed);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.lineCap = 'square';

  const grid = 16;
  const traces = Math.round(46 * density);
  for (let i = 0; i < traces; i++) {
    let x = Math.round((rand() * (w - 32) + 16) / grid) * grid;
    let y = Math.round((rand() * (h - 32) + 16) / grid) * grid;
    ctx.globalAlpha = 0.35 + rand() * 0.65;
    ctx.lineWidth = rand() > 0.8 ? 3 : 1.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 2 + Math.floor(rand() * 5);
    for (let s = 0; s < steps; s++) {
      const len = grid * (1 + Math.floor(rand() * 6));
      const r = rand();
      if (r < 0.45) y += rand() > 0.5 ? len : -len;
      else if (r < 0.85) x += rand() > 0.5 ? len : -len;
      else {
        const d = (rand() > 0.5 ? 1 : -1) * grid;
        x += d;
        y += grid;
      }
      x = Math.min(w - 8, Math.max(8, x));
      y = Math.min(h - 8, Math.max(8, y));
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    if (rand() > 0.5) ctx.fillRect(x - 3, y - 3, 6, 6);
  }

  if (spine) {
    // the dense vertical band near the leading edge of the lit face
    ctx.globalAlpha = 0.8;
    for (let y = 20; y < h - 20; y += 26 + Math.floor(rand() * 30)) {
      const bw = 10 + Math.floor(rand() * 18);
      ctx.lineWidth = 1.6;
      ctx.strokeRect(w - 54, y, bw, 14 + Math.floor(rand() * 26));
      if (rand() > 0.6) ctx.fillRect(w - 30, y + 4, 6, 6);
    }
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w - 60, 10);
    ctx.lineTo(w - 60, h - 10);
    ctx.stroke();
  }
  // panel seams across the slab
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 1.2;
  for (let y = 120; y < h; y += 150 + Math.floor(rand() * 120)) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 4;
  return texture;
}

const CORONA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

/** Corona: a thin white-hot rim, a soft halo, and uneven radial streamers that drift very slowly. */
const CORONA_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uDisc;   // disc radius in uv units (plane is 1 x 1, centred)
  uniform vec3 uCream;
  uniform vec3 uKhaki;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  // One family of streamers: the circle is cut into N angular bins; each bin holds one ray with its own
  // strength (most are faint, a few are bright), width and length. Gaussian cores keep bin seams invisible.
  float streamers(float a, float d, float n, float seed, float minLen, float maxLen) {
    float f = (a / 6.2831853 + 0.5) * n;
    float id = floor(f);
    float fr = fract(f) - 0.5;
    float strength = pow(hash(id * 1.7 + seed + 3.1), 2.6);
    float width = mix(0.07, 0.26, hash(id * 3.3 + seed + 7.7));
    float len = mix(minLen, maxLen, pow(hash(id * 9.1 + seed + 1.3), 1.4)) * (0.55 + 0.45 * strength);
    return exp(-pow(fr / width, 2.0)) * strength * exp(-d / len);
  }

  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p);
    float a = atan(p.y, p.x);
    float d = r - uDisc;
    if (d < 0.0) { gl_FragColor = vec4(0.0); return; }

    // streamers: a few sharpened angular harmonics with per-ray length variation
    float t = uTime * 0.02;
    float s = 0.0;
    s += streamers(a + t, d, 76.0, 0.0, 0.07, 0.24);   // many thin strands
    s += streamers(a - t * 0.6, d, 29.0, 11.0, 0.12, 0.34) * 0.8; // fewer, broader, longer
    float rays = s * 2.3;

    float halo = exp(-d / 0.04) * 2.1 + exp(-d / 0.12) * 0.55;
    float rim = exp(-pow(d / 0.007, 2.0)) * 2.4;

    // the light is stronger toward the upper right, as in the plate
    float bias = 0.72 + 0.38 * dot(normalize(p), normalize(vec2(0.55, 0.83)));
    // fine radial grain so the dither breaks the rays into strands
    float grain = 0.75 + 0.25 * hash(floor(a * 420.0) + floor(r * 90.0) * 13.0);

    float energy = (rays * grain + halo) * bias + rim;
    energy *= smoothstep(0.5, 0.36, r); // fade before the plane edge
    vec3 col = mix(uKhaki, uCream, clamp(energy * 0.8, 0.0, 1.0)) * energy;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const DITHER_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

/** Ordered (8x8 Bayer) dither to five palette tones, sampled on a coarse cell grid for the halftone grain. */
const DITHER_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uResolution;
  uniform float uCell;
  uniform vec3 uTones[5];
  varying vec2 vUv;

  float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
  float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

  void main() {
    vec2 cell = floor(gl_FragCoord.xy / uCell);
    vec2 uv = (cell + 0.5) * uCell / uResolution;
    vec3 src = texture2D(tScene, uv).rgb;
    float lum = dot(src, vec3(0.299, 0.587, 0.114));
    // the scene is linear light; dither on perceptual brightness, as a printed halftone does
    lum = pow(clamp(lum, 0.0, 1.0), 1.0 / 2.2);
    float q = lum * 4.0;
    float base = floor(q);
    float level = (q - base) > bayer8(cell) ? base + 1.0 : base;
    level = clamp(level, 0.0, 4.0);
    vec3 col = uTones[0];
    if (level > 0.5) col = uTones[1];
    if (level > 1.5) col = uTones[2];
    if (level > 2.5) col = uTones[3];
    if (level > 3.5) col = uTones[4];
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function createMonolithScene(canvas: HTMLCanvasElement, opts: { onReady(): void }): MonolithScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 1);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  camera.position.set(CAMERA.x, CAMERA.y, CAMERA.z);

  // --- the slab ------------------------------------------------------------------------------------------
  const rig = new THREE.Group(); // horizontal framing + parallax drift
  scene.add(rig);
  const slab = new THREE.Group();
  slab.rotation.set(0, -0.78, -0.13);
  rig.add(slab);

  const litEngraving = engravingTexture(7, 1, true);
  const dimEngraving = engravingTexture(19, 0.55, false);
  const faceMaterial = (map: THREE.Texture, emissive: number) =>
    new THREE.MeshStandardMaterial({
      color: SLAB_LIT,
      roughness: 0.5,
      metalness: 0.15,
      // grooves read as lit lips: brighter in the albedo and faintly emissive so they survive on the shadow face
      emissive: KHAKI_DIM,
      emissiveMap: map,
      emissiveIntensity: emissive,
      bumpMap: map,
      bumpScale: 2,
    });
  const lit = faceMaterial(litEngraving, 0.6);
  const dim = faceMaterial(dimEngraving, 0.12);
  const plain = new THREE.MeshStandardMaterial({ color: SLAB, roughness: 0.6, metalness: 0.2 });
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z. After the -0.78 yaw, +x is the lit face, +z the front.
  const geometry = new THREE.BoxGeometry(MONOLITH.depth, MONOLITH.height, MONOLITH.width);
  const monolith = new THREE.Mesh(geometry, [lit, plain, plain, plain, dim, plain]);
  slab.add(monolith);

  // light: the corona behind rims the lit face's edge; a cool, weak fill keeps the front face just off black
  const key = new THREE.DirectionalLight(CREAM, 4.2);
  key.position.set(6, 5, 2.5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(CREAM, 3.2);
  rim.position.set(1.5, 2, -6);
  scene.add(rim);
  // a warm source up and to the front-right: the lit face climbs to khaki at the top and falls off downward
  const glow = new THREE.PointLight(CREAM, 260, 0, 2);
  glow.position.set(4.5, 6.5, 4);
  scene.add(glow);
  scene.add(new THREE.HemisphereLight(KHAKI, FIELD, 0.25));

  // --- the eclipse --------------------------------------------------------------------------------------
  const eclipse = new THREE.Group();
  scene.add(eclipse);
  const discRadiusAtTarget = (MONOLITH.height * 0.78) / 2;
  const coronaMaterial = new THREE.ShaderMaterial({
    vertexShader: CORONA_VERT,
    fragmentShader: CORONA_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uDisc: { value: 0.12 },
      uCream: { value: CREAM.clone() },
      uKhaki: { value: KHAKI.clone() },
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
  });
  const corona = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), coronaMaterial);
  eclipse.add(corona);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1, 96), new THREE.MeshBasicMaterial({ color: 0x000000 }));
  disc.position.z = 0.01;
  eclipse.add(disc);

  // --- stars -----------------------------------------------------------------------------------------------
  const starRand = rng(42);
  const starCount = 420;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (starRand() - 0.5) * 70;
    starPositions[i * 3 + 1] = (starRand() - 0.3) * 40;
    starPositions[i * 3 + 2] = -18 - starRand() * 6;
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: CREAM, size: 0.07, sizeAttenuation: true });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // --- dither pass -----------------------------------------------------------------------------------------
  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
  const ditherMaterial = new THREE.ShaderMaterial({
    vertexShader: DITHER_VERT,
    fragmentShader: DITHER_FRAG,
    uniforms: {
      tScene: { value: target.texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uCell: { value: 2 * dpr },
      uTones: { value: [FIELD, SLAB.clone().lerp(KHAKI_DIM, 0.35), KHAKI_DIM, KHAKI, CREAM] },
    },
    depthTest: false,
    depthWrite: false,
  });
  const post = new THREE.Scene();
  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), ditherMaterial);
  post.add(quad);

  // --- layout -----------------------------------------------------------------------------------------------
  let framing = 0.7;
  const layout = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    target.setSize(Math.round(w * dpr), Math.round(h * dpr));
    ditherMaterial.uniforms.uResolution.value.set(w * dpr, h * dpr);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    rig.position.x = frameOffsetX(camera.aspect, FOV, CAMERA.z, framing);
  };
  const ro = new ResizeObserver(layout);
  ro.observe(canvas);
  layout();

  // --- loop ------------------------------------------------------------------------------------------------
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  let running = false;
  let readySent = false;
  const start = performance.now();
  const lookTarget = new THREE.Vector3();

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const t = (now - start) / 1000;
    px += (tx - px) * 0.05;
    py += (ty - py) * 0.05;

    // slow idle: a breath of yaw and a few millimetres of float
    slab.rotation.y = -0.78 + Math.sin(t * 0.13) * 0.07 + px * 0.12;
    slab.position.y = Math.sin(t * 0.37) * 0.05;

    // the camera drifts with the pointer: near layers move more than far ones (true depth parallax)
    camera.position.set(CAMERA.x + px * 0.9, CAMERA.y - py * 0.5, CAMERA.z);
    lookTarget.set(LOOK.x, LOOK.y, LOOK.z);
    camera.lookAt(lookTarget);

    // park the eclipse on the camera ray through the slab's upper middle so it always sits behind it
    const anchor = coronaAnchor(camera.position, { x: rig.position.x, y: DISC_CENTRE_Y, z: 0 }, CORONA_Z);
    eclipse.position.set(anchor.x, anchor.y, CORONA_Z);
    eclipse.quaternion.copy(camera.quaternion);
    const discR = discRadiusAtTarget * anchor.scale;
    disc.scale.setScalar(discR);
    const plane = discR * 4.2;
    corona.scale.set(plane, plane, 1);
    coronaMaterial.uniforms.uDisc.value = discR / plane;
    coronaMaterial.uniforms.uTime.value = t;
    stars.rotation.z = t * 0.002;

    renderer.setRenderTarget(target);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(post, postCamera);
    // the canvas only fades in once a real frame exists
    if (!readySent) {
      readySent = true;
      opts.onReady();
    }
  };

  const run = (on: boolean) => {
    if (on === running) return;
    running = on;
    if (on) frame = requestAnimationFrame(tick);
    else cancelAnimationFrame(frame);
  };
  let onScreen = true;
  const sync = () => run(onScreen && !document.hidden);
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(canvas);
  document.addEventListener('visibilitychange', sync);
  sync();

  return {
    setPointer(x, y) {
      tx = x;
      ty = y;
    },
    setFraming(fraction) {
      framing = fraction;
      layout();
    },
    dispose() {
      run(false);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      geometry.dispose();
      [lit, dim, plain, coronaMaterial, starMaterial, ditherMaterial].forEach((m) => m.dispose());
      (disc.material as THREE.Material).dispose();
      disc.geometry.dispose();
      corona.geometry.dispose();
      quad.geometry.dispose();
      starGeometry.dispose();
      litEngraving.dispose();
      dimEngraving.dispose();
      target.dispose();
      renderer.dispose();
    },
  };
}
