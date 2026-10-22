import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  ENV_DARK,
  ENV_LIGHT,
  LANDMARKS,
  STOPS,
  TRIP_START,
  CRUISE_SPEED,
  clamp,
  clamp01,
  curvatureAt,
  damp,
  displayMph,
  distanceForScroll,
  isArrived,
  keyBlendAt,
  laneAt,
  lerp,
  milesToGo,
  shotBlendAt,
  smoothstep,
  stageFor,
  stepTruck,
  storyIndexForScroll,
  tripProgress,
  type EnvKey,
  type Shot,
  type TruckMotion,
} from "../story";
import { getStoryMap, subscribeStory } from "../storyScroll";
import { publishTelemetry, publishTruckScreen } from "../telemetry";
import { ParticleSystem, createStreakField } from "./effects";
import { valueNoise } from "./noise";
import { createPost, type Post } from "./post";
import { TIERS, lowerTier, pickTier, type Tier } from "./quality";
import { buildRoad } from "./road";
import { Route, createFrame } from "./splineRoute";
import { buildCity, buildStreetlights } from "./scenery/city";
import { buildCountryside } from "./scenery/countryside";
import { buildDestination, buildOrigin } from "./scenery/depots";
import { createMaterials, type Animated, type FrameContext, type SceneryContext } from "./scenery/kit";
import { buildStormZone, isInTunnel } from "./scenery/storm";
import { buildTraffic } from "./scenery/traffic";
import { buildSky } from "./sky";
import { buildFarGround, buildRiver, buildTerrain } from "./terrain";
import {
  asphaltTexture,
  beamTexture,
  concreteTexture,
  dockDoorTexture,
  glowTexture,
  headlightPoolTexture,
  liveryTexture,
  scannerTexture,
} from "./textures";
import { TRUCK_NOSE_X, buildTruck } from "./truck";

export type JourneyEngine = {
  dispose: () => void;
  setReducedMotion: (reduced: boolean) => void;
};

export type EngineOptions = {
  host: HTMLElement;
  canvasClassName: string;
  reducedMotion: boolean;
  /** Called once the first frame is on screen. */
  onReady: () => void;
};

const L = LANDMARKS;
/**
 * Road gaps (m) beyond which the engine cuts instead of driving there.
 * Symmetric, so scrolling back up rewinds the trip the same way scrolling
 * down plays it; only chapter jumps and flings cut.
 */
const CUT_AHEAD = 1400;
const CUT_BEHIND = 1400;
/** How far short of a forward cut target the truck reappears, still rolling. */
const CUT_RUN_IN = 70;
const UP = new THREE.Vector3(0, 1, 0);

type SpringAxis = { x: number; v: number };
const spring = (): SpringAxis => ({ x: 0, v: 0 });
function stepSpring(a: SpringAxis, target: number, dt: number, stiffness = 90, damping = 9) {
  a.v += ((target - a.x) * stiffness - a.v * damping) * dt;
  a.x += a.v * dt;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function createJourneyEngine(opts: EngineOptions): JourneyEngine {
  const { host } = opts;
  let reducedMotion = opts.reducedMotion;
  const nav = navigator as Navigator & { deviceMemory?: number };
  let tier: Tier = pickTier({
    width: window.innerWidth,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    cores: nav.hardwareConcurrency,
    memory: nav.deviceMemory,
  });
  const settings = { ...TIERS[tier] };

  /* Renderer ------------------------------------------------------------ */
  const renderer = new THREE.WebGLRenderer({
    antialias: !settings.post,
    powerPreference: "high-performance",
    stencil: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = settings.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.className = opts.canvasClassName;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xdcebf3, 60, 600);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.4, 2600);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.environment = envTexture;

  /* Lights ---------------------------------------------------------------- */
  const hemi = new THREE.HemisphereLight(0xcfe2f2, 0x8a7a62, 1.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = settings.shadows;
  const SHADOW_EXTENT = 26;
  sun.shadow.mapSize.set(settings.shadowMapSize, settings.shadowMapSize);
  Object.assign(sun.shadow.camera, { left: -SHADOW_EXTENT, right: SHADOW_EXTENT, top: SHADOW_EXTENT, bottom: -SHADOW_EXTENT, near: 1, far: 260 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  scene.add(sun, sun.target);
  const lampLights = [0, 1].map(() => {
    const p = new THREE.PointLight(0xffb566, 0, 34, 1.6);
    scene.add(p);
    return p;
  });
  const tunnelLight = new THREE.PointLight(0xdfeaff, 0, 26, 1.4);
  scene.add(tunnelLight);

  /* World ------------------------------------------------------------------- */
  const route = new Route();
  const glow = glowTexture(THREE);
  const textures = {
    glow,
    beam: beamTexture(THREE),
    scanner: scannerTexture(THREE),
    dockDoor: dockDoorTexture(THREE),
  };
  const mats = createMaterials(THREE);
  const world = new THREE.Group();
  scene.add(world);
  const animations: Animated[] = [];
  const glowing: Array<{ m: THREE.MeshStandardMaterial; day: number; night: number }> = [];
  const ctx: SceneryContext = {
    THREE,
    route,
    root: world,
    density: settings.density,
    anisotropy,
    mats,
    textures,
    animate: (fn) => animations.push(fn),
    nightGlow: (m, day, night) => glowing.push({ m, day, night }),
  };

  world.add(buildTerrain(THREE, route, settings.terrainStep));
  world.add(buildFarGround(THREE, route));
  world.add(buildRiver(THREE, route));
  const road = buildRoad(THREE, route, asphaltTexture(THREE, anisotropy), concreteTexture(THREE, anisotropy));
  world.add(road.highway, road.yardOrigin, road.yardDestination);
  buildOrigin(ctx);
  buildCountryside(ctx);
  buildCity(ctx);
  buildStormZone(ctx);
  buildDestination(ctx);
  const lamps = buildStreetlights(ctx, L.cityFrom, L.destinationYard, (s) =>
    (s > L.tunnelFrom - 6 && s < L.tunnelTo + 6) || (s > L.checkpoint - 8 && s < L.checkpoint + 8),
  );
  buildTraffic(ctx, settings.traffic);
  mats.lampWarm.emissiveIntensity = 1;

  const sky = buildSky(THREE, settings.cloudOctaves);
  scene.add(sky.mesh);

  const truck = buildTruck(THREE, liveryTexture(THREE, anisotropy), glow, headlightPoolTexture(THREE));
  scene.add(truck.root);
  const headSpot = new THREE.SpotLight(0xfff0d6, 0, 55, 0.4, 0.65, 1.4);
  headSpot.position.set(TRUCK_NOSE_X + 0.1, 1.2, 0);
  headSpot.target.position.set(TRUCK_NOSE_X + 15.4, -1.4, 0);
  truck.root.add(headSpot, headSpot.target);
  if (!settings.dynamicLights) headSpot.intensity = 0;

  const particles = new ParticleSystem(THREE, settings.particles);
  scene.add(particles.points);
  const rain = createStreakField(THREE, settings.rainDrops, [70, 34, 70], 0xbfcadb, 11);
  scene.add(rain.lines);
  const speedLines = createStreakField(THREE, settings.speedLines, [56, 16, 56], 0xfff3e0, 23);
  speedLines.uniforms.exposure.value = 0.05;
  speedLines.uniforms.minLength.value = 0;
  scene.add(speedLines.lines);

  let post: Post | null = settings.post
    ? createPost(THREE, renderer, scene, camera, { bloom: settings.bloom, samples: settings.msaa, blurSamples: settings.blurSamples })
    : null;

  /* State -------------------------------------------------------------------- */
  /** Smoothed story position the camera shots blend by. */
  let storyP = 0;
  const motion: TruckMotion = { s: STOPS[0].s, v: 0, a: 0 };
  const pitch = spring();
  const roll = spring();
  const bounce = spring();
  let wheelSpin = 0;
  let prevS = motion.s;
  let introT = 1;
  let ignition = 1;
  let themeMix = document.documentElement.dataset.theme === "dark" ? 1 : 0;
  let wet = 0;
  let lightning = 0;
  let nextStrike = 4;
  let strikeT = -1;
  let arrivedLatch = false;
  let verified = false;
  let time = 0;
  let last = performance.now();
  let raf = 0;
  let disposed = false;
  let visible = document.visibilityState !== "hidden";
  let ready = false;
  let dirty = true;
  let lastStillS = Number.NaN;
  let frameParity = 0;
  const perf = { acc: 0, frames: 0, slowWindows: 0, warmup: 2.5 };

  const camLocal = new THREE.Vector3();
  const lookLocal = new THREE.Vector3();
  const framing = new THREE.Vector2(0.5, 0.6);
  let fov = 38;
  let cameraPrimed = false;
  const camVel = new THREE.Vector3();
  const prevCam = new THREE.Vector3();
  const frame = createFrame();
  const truckPos = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const right = new THREE.Vector3();
  const upV = new THREE.Vector3();
  const basis = new THREE.Matrix4();
  const tmpV = new THREE.Vector3();
  const tmpV2 = new THREE.Vector3();
  const tmpV3 = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const viewDir = new THREE.Vector3();
  const colorA = new THREE.Color();
  const colorB = new THREE.Color();
  const env = { ...ENV_LIGHT[0] };
  const dustColor = new THREE.Color();
  const sprayColor = new THREE.Color();
  const smokeColor = new THREE.Color();
  const sparkColor = new THREE.Color(0xffb35c);

  const frameCtx: FrameContext = { time: 0, dt: 0, still: false, s: 0, v: 0, night: 0, rain: 0, arrived: false, verified: false };

  /* Sizing --------------------------------------------------------------------- */
  let width = 1;
  let height = 1;
  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    const pr = Math.min(window.devicePixelRatio || 1, settings.pixelRatioCap);
    renderer.setPixelRatio(pr);
    renderer.setSize(width, height, false);
    post?.setSize(width, height, pr);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    particles.setPixelScale((height * pr) / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2)));
    dirty = true;
  };
  resize();

  // The shared story clock owns scroll measurement; a change just means
  // reduced-motion stills need a fresh frame.
  const unsubscribeStory = subscribeStory(() => {
    dirty = true;
  });
  const storyTarget = () => {
    const map = getStoryMap();
    const y = window.scrollY;
    return { s: distanceForScroll(map, y), p: storyIndexForScroll(map, y) };
  };
  const hostObserver = new ResizeObserver(() => resize());
  hostObserver.observe(host);
  const themeObserver = new MutationObserver(() => {
    dirty = true;
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });


  /* Helpers ---------------------------------------------------------------------- */
  const mixEnv = (s: number) => {
    const a = keyBlendAt(ENV_LIGHT, s);
    const b = keyBlendAt(ENV_DARK, s);
    const num = (k: keyof EnvKey) => {
      const la = lerp(a.a[k] as number, a.b[k] as number, a.t);
      const lb = lerp(b.a[k] as number, b.b[k] as number, b.t);
      return lerp(la, lb, themeMix);
    };
    const col = (k: keyof EnvKey, out: THREE.Color) => {
      colorA.setHex(a.a[k] as number).lerp(colorB.setHex(a.b[k] as number), a.t);
      const light = out.copy(colorA);
      colorA.setHex(b.a[k] as number).lerp(colorB.setHex(b.b[k] as number), b.t);
      return light.lerp(colorA, themeMix);
    };
    for (const k of ["sunIntensity", "sunElevation", "sunAzimuth", "hemiIntensity", "fogNear", "fogFar", "night", "rain", "clouds", "stars", "exposure"] as const) {
      env[k] = num(k);
    }
    col("skyTop", sky.uniforms.top.value);
    col("horizon", sky.uniforms.horizon.value);
    col("sun", sky.uniforms.sunColor.value);
    col("hemiSky", hemi.color);
    col("hemiGround", hemi.groundColor);
  };

  const blendShot = (a: Shot, b: Shot, t: number, tall: boolean) => ({
    f: lerp(a.f, b.f, t),
    u: lerp(a.u, b.u, t),
    r: lerp(a.r, b.r, t),
    lf: lerp(a.lf, b.lf, t),
    lu: lerp(a.lu, b.lu, t),
    fov: lerp(a.fov, b.fov, t),
    fx: lerp(tall ? a.frameTall[0] : a.frame[0], tall ? b.frameTall[0] : b.frame[0], t),
    fy: lerp(tall ? a.frameTall[1] : a.frame[1], tall ? b.frameTall[1] : b.frame[1], t),
  });

  /** Reduced motion: the beat nearest to the reader, shown as a still. */
  const stillStop = () => Math.round(clamp(storyTarget().p, 0, STOPS.length - 1));

  const localToWorld = (f: number, u: number, r: number, out: THREE.Vector3) =>
    out.copy(truckPos).addScaledVector(fwd, f).addScaledVector(UP, u).addScaledVector(right, r);

  /* Frame ------------------------------------------------------------------------- */
  const update = (dtIn: number, still: boolean) => {
    const dt = still ? 0 : dtIn;
    time += dt;

    // Truck motion, and the story position the camera frames it by.
    const story = storyTarget();
    const target = story.s;
    if (still) {
      const i = stillStop();
      motion.s = STOPS[i].s;
      motion.v = 0;
      motion.a = 0;
      storyP = i;
    } else {
      storyP = cameraPrimed ? storyP + (story.p - storyP) * damp(2.6, dt) : story.p;
      // A jump far down the page (chapter link, fling, End key) or any big
      // jump back cuts instead of time-lapsing or reversing across the map:
      // the truck reappears just short of the beat (or on it, going back)
      // and the camera re-frames, masked by a quick dip of the canvas.
      const gap = target - motion.s;
      if (introT >= 1 && cameraPrimed && (gap > CUT_AHEAD || gap < -CUT_BEHIND)) {
        motion.s = gap > 0 ? target - CUT_RUN_IN : target;
        motion.v = gap > 0 ? CRUISE_SPEED : 0;
        motion.a = 0;
        prevS = motion.s;
        storyP = story.p;
        cameraPrimed = false;
        canvas.animate?.([{ opacity: 0.25 }, { opacity: 1 }], { duration: 480, easing: "ease-out" });
      }
      // Hold at the dock for a beat while the intro camera starts moving.
      const hold = introT < 0.18 ? motion.s : target;
      stepTruck(motion, hold, dt);
    }
    const s = motion.s;
    const v = motion.v;
    const arrived = isArrived(motion);
    if (!verified && s + 4 > L.checkpoint) verified = true;
    if (verified && s < L.checkpoint - 40) verified = false;

    // Theme blend.
    const themeTarget = document.documentElement.dataset.theme === "dark" ? 1 : 0;
    themeMix = still ? themeTarget : themeMix + (themeTarget - themeMix) * damp(2.5, dt);
    mixEnv(s);
    const tunnel = isInTunnel(s);
    wet = still ? env.rain : wet + (env.rain - wet) * damp(env.rain > wet ? 1.2 : 0.25, dt);

    // Road frame + truck pose.
    route.sample(s, frame);
    const lane = laneAt(s);
    const laneSlope = (laneAt(s + 1) - laneAt(s - 1)) / 2;
    const heading = frame.heading + Math.atan(laneSlope);
    fwd.set(Math.sin(heading), frame.grade, -Math.cos(heading)).normalize();
    right.set(Math.cos(heading), 0, Math.sin(heading));
    upV.crossVectors(right, fwd).normalize();
    truckPos.set(frame.x + frame.rx * lane, frame.y + 0.02, frame.z + frame.rz * lane);
    basis.makeBasis(fwd, upV, right);
    truck.root.position.copy(truckPos);
    truck.root.quaternion.setFromRotationMatrix(basis);
    // Horizontal basis for the camera (ignores grade so shots stay level).
    fwd.set(Math.sin(frame.heading), 0, -Math.cos(frame.heading));
    right.set(frame.rx, 0, frame.rz);

    // Wheels, steering, suspension.
    const ds = s - prevS;
    prevS = s;
    wheelSpin -= ds / truck.wheelRadiusWorld;
    for (const w of truck.wheels) w.rotation.z = wheelSpin;
    const k = curvatureAt(s);
    const steer = clamp(-(Math.atan(k * 7.1) + laneSlope * 1.4) * 2.2, -0.4, 0.4);
    for (const p of truck.steer) p.rotation.y += (steer - p.rotation.y) * damp(8, dt);
    const lateralAccel = v * v * k;
    const bump = (valueNoise(s * 0.32, 1.7) - 0.5) * 0.05 * Math.min(1, Math.abs(v) / 8);
    const idle = Math.abs(v) < 0.4 && ignition > 0.5 ? Math.sin(time * 42) * 0.004 : 0;
    if (still) {
      pitch.x = roll.x = bounce.x = 0;
    } else {
      const sub = 4;
      for (let i = 0; i < sub; i++) {
        stepSpring(pitch, clamp(motion.a * 0.0042, -0.05, 0.05), dt / sub);
        stepSpring(roll, clamp(-lateralAccel * 0.012, -0.05, 0.05), dt / sub, 70, 8);
        stepSpring(bounce, bump, dt / sub, 140, 12);
      }
    }
    truck.bodyPivot.rotation.z = pitch.x;
    truck.bodyPivot.rotation.x = roll.x;
    truck.bodyPivot.position.y = -0.45 + bounce.x + idle;

    // Truck lamps.
    const lightsOn = clamp01(env.night * 1.15 + wet * 0.7 + tunnel) * ignition;
    const drl = 0.25 * ignition;
    const head = Math.max(drl, lightsOn);
    const lights = truck.lights;
    lights.head.emissiveIntensity = 0.3 + head * 3.4;
    const beamBase = lightsOn * (0.07 + wet * 0.12 + tunnel * 0.04);
    lights.pool.opacity = lightsOn * 0.24;
    headSpot.intensity = settings.dynamicLights ? lightsOn * 70 : 0;
    // Brake lights follow deceleration in whichever direction the truck moves.
    const braking = (motion.a * Math.sign(v) < -1.5 && Math.abs(v) > 0.5) || (Math.abs(v) < 0.2 && ignition > 0.5);
    lights.tail.emissiveIntensity = (0.35 + env.night * 1.6) * Math.max(0.3, ignition) + (braking ? 3.5 : 0);
    // Reverse lamps only for a real, slow back-up; a fast rewind of the trip
    // (the reader scrolling up) shouldn't read as the truck reversing.
    lights.reverse.emissiveIntensity = v < -0.4 && v > -6 ? 3 : 0;
    const blink = Math.sin(time * Math.PI * 3) > 0 ? 1 : 0;
    const signalR = laneSlope > 0.004 && v > 0.5;
    const signalL = laneSlope < -0.004 && v > 0.5;
    lights.signalRight.emissiveIntensity = (signalR || arrived ? blink * 4 : 0) + 0.15;
    lights.signalLeft.emissiveIntensity = (signalL || arrived ? blink * 4 : 0) + 0.15;
    lights.marker.emissiveIntensity = 0.3 + env.night * 2.6;

    // Environment lighting.
    const el = THREE.MathUtils.degToRad(env.sunElevation);
    const az = THREE.MathUtils.degToRad(env.sunAzimuth);
    const sunDir = sky.uniforms.sunDir.value.set(Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az));
    sky.uniforms.stars.value = env.stars;
    sky.uniforms.clouds.value = env.clouds;
    sky.uniforms.storm.value = env.rain;
    sky.uniforms.time.value = time;

    // Lightning in heavy rain.
    if (!still && env.rain > 0.6) {
      nextStrike -= dt;
      if (nextStrike <= 0) {
        strikeT = 0;
        nextStrike = 3.5 + Math.random() * 6;
      }
    }
    if (strikeT >= 0) {
      strikeT += dt;
      lightning = Math.max(0, 1 - strikeT / 0.1) + 0.7 * Math.max(0, 1 - Math.abs(strikeT - 0.24) / 0.07);
      if (strikeT > 0.5) strikeT = -1;
    } else lightning = 0;
    lightning *= clamp01((env.rain - 0.6) / 0.3) * (1 - tunnel);
    sky.uniforms.flash.value = lightning * 0.5;

    const fog = scene.fog as THREE.Fog;
    fog.color.copy(sky.uniforms.horizon.value).lerp(colorB.setHex(0x1a1c20), tunnel * 0.85);
    fog.near = env.fogNear;
    fog.far = env.fogFar;
    hemi.intensity = env.hemiIntensity * (1 - tunnel * 0.7) + lightning * 2.2;
    sun.color.copy(sky.uniforms.sunColor.value);
    sun.intensity = env.sunIntensity * (1 - tunnel) * smoothstep(-2, 3, env.sunElevation) + lightning * 2;
    scene.environmentIntensity = lerp(0.42, 0.12, env.night) * (1 - tunnel * 0.6);
    renderer.toneMappingExposure = env.exposure;
    if (post?.bloom) post.bloom.strength = 0.28 + env.night * 0.34 - tunnel * 0.12;

    // Keep the shadow camera on the truck, snapped to texels to avoid shimmer.
    const texel = (SHADOW_EXTENT * 2) / settings.shadowMapSize;
    const lightDir = tmpV.copy(sunDir).normalize();
    const lr = tmpV2.crossVectors(UP, lightDir).normalize();
    const lu = tmpV3.crossVectors(lightDir, lr);
    const px = Math.round(truckPos.dot(lr) / texel) * texel;
    const py = Math.round(truckPos.dot(lu) / texel) * texel;
    const pz = truckPos.dot(lightDir);
    sun.target.position.copy(lr.multiplyScalar(px)).addScaledVector(lu, py).addScaledVector(lightDir, pz);
    sun.position.copy(sun.target.position).addScaledVector(lightDir, 120);

    // Materials that react to night / wetness.
    for (const g of glowing) g.m.emissiveIntensity = lerp(g.day, g.night, env.night);
    mats.lampWarm.emissiveIntensity = 0.25 + env.night * 5;
    mats.windowWarm.emissiveIntensity = 0.3 + env.night * 2.6;
    for (const m of road.wettable) {
      m.roughness = lerp(0.88, 0.32, wet);
      m.color.setScalar(lerp(1, 0.66, wet));
    }

    // Moving point lights: nearest streetlamps and the tunnel strip lights.
    if (settings.dynamicLights) {
      let i0 = 0;
      while (i0 < lamps.length - 1 && lamps[i0 + 1].s < s) i0++;
      const near = [lamps[i0], lamps[Math.min(lamps.length - 1, i0 + 1)]];
      near.forEach((lamp, i) => {
        const pl = lampLights[i];
        if (!lamp) return;
        pl.position.set(lamp.x, lamp.y - 0.4, lamp.z);
        pl.intensity = env.night * 220 * (1 - smoothstep(30, 60, Math.abs(lamp.s - s)));
      });
      tunnelLight.position.copy(truckPos).addScaledVector(UP, 6.6);
      const strobe = 0.55 + 0.45 * Math.cos((s / 5.5) * Math.PI * 2);
      tunnelLight.intensity = tunnel * 60 * strobe;
    }

    // Camera direction: starts and stays directly framed on the hero truck shot.
    const tall = width / height < 0.8;
    const sb = shotBlendAt(storyP);
    const shot = blendShot(sb.a, sb.b, sb.t, tall);

    // Portrait screens pull back so the truck fits the width.
    const aspect = width / height;
    const pull = aspect < 1 ? clamp(1 + (1 - aspect) * 1.35, 1, 1.9) : 1;
    const speedPull = 1 + Math.min(Math.abs(v), 45) * 0.0045;
    const scale = pull * speedPull;
    const desiredCam = tmpV.set(
      shot.lf + (shot.f - shot.lf) * scale,
      shot.lu + (shot.u - shot.lu) * scale,
      shot.r * scale,
    );
    const desiredLook = tmpV2.set(shot.lf, shot.lu, 0);
    const snap = still || !cameraPrimed;
    const kc = snap ? 1 : damp(introT < 1 ? 60 : 2.4, dt);
    const kl = snap ? 1 : damp(introT < 1 ? 60 : 3.2, dt);
    camLocal.lerp(desiredCam, kc);
    lookLocal.lerp(desiredLook, kl);
    fov = snap ? shot.fov : fov + (shot.fov - fov) * damp(2.4, dt);
    framing.x = snap ? shot.fx : framing.x + (shot.fx - framing.x) * damp(2.4, dt);
    framing.y = snap ? shot.fy : framing.y + (shot.fy - framing.y) * damp(2.4, dt);
    cameraPrimed = true;

    const shake = still ? 0 : 0.02 + Math.min(Math.abs(v), 40) * 0.0016;
    const hx = (valueNoise(time * 0.7, 3.1) - 0.5) * shake * 2;
    const hy = (valueNoise(time * 0.9, 7.3) - 0.5) * shake * 1.4;
    localToWorld(camLocal.x, camLocal.y + hy, camLocal.z + hx, camera.position);
    // Never dip into the terrain or road.
    camera.position.y = Math.max(camera.position.y, frame.y + 0.7);
    const look = localToWorld(lookLocal.x, lookLocal.y, lookLocal.z, lookAt);
    camera.up.copy(UP);
    camera.lookAt(look);
    camera.fov = fov + Math.min(Math.abs(v), 45) * 0.1;
    camera.setViewOffset(width, height, -(framing.x - 0.5) * width, -(framing.y - 0.5) * height, width, height);
    camera.updateProjectionMatrix();
    sky.mesh.position.copy(camera.position);

    // Where the truck sits on screen, for DOM callouts anchored to it.
    // Only while the truck has (nearly) reached the beat it belongs to.
    const anchor = tmpV3.copy(truckPos).addScaledVector(UP, 4.4).project(camera);
    publishTruckScreen(
      (anchor.x * 0.5 + 0.5) * width,
      (0.5 - anchor.y * 0.5) * height,
      anchor.z < 1 && Math.abs(anchor.x) < 1.1 && Math.abs(anchor.y) < 1.1 && Math.abs(target - s) < 30,
    );

    // Volumetric beams read from the side; looking down them just fogs the lens.
    tmpV.copy(camera.position).sub(truckPos).normalize();
    const intoBeams = Math.max(0, tmpV.dot(fwd));
    lights.beam.uniforms.intensity.value = beamBase * (1 - smoothstep(0.25, 0.75, intoBeams));

    if (dt > 0) {
      camVel.lerp(tmpV.copy(camera.position).sub(prevCam).divideScalar(dt), damp(10, dt));
    }
    prevCam.copy(camera.position);

    // Particles.
    if (!still) emitParticles(dt, s, v, tunnel);
    particles.update(dt);

    // Rain and speed lines.
    const rainAmount = env.rain * (1 - tunnel);
    rain.lines.visible = rainAmount > 0.01;
    rain.uniforms.camPos.value.copy(camera.position);
    rain.uniforms.time.value = time;
    rain.uniforms.fall.value = 24;
    rain.uniforms.relVel.value.set(2.5, -24, 1).sub(camVel);
    rain.uniforms.opacity.value = rainAmount * 0.5 * (0.6 + env.night * 0.6);
    const speedAmount = smoothstep(12, 42, Math.abs(v)) * (1 - rainAmount * 0.6);
    speedLines.lines.visible = speedAmount > 0.01;
    speedLines.uniforms.camPos.value.copy(camera.position);
    speedLines.uniforms.relVel.value.copy(camVel).multiplyScalar(-1);
    speedLines.uniforms.opacity.value = speedAmount * (0.35 + env.night * 0.25);

    // Keep view crisp and clear at constant 65 km/h cruise without disorienting warp blur.
    if (post) {
      const u = post.speed.uniforms;
      u.strength.value = 0;
      const dir = tmpV.copy(camVel);
      if (dir.lengthSq() > 0.01) {
        dir.normalize();
        const ahead = tmpV2.copy(camera.position).addScaledVector(dir, 100);
        // Moving away from where the camera looks: blur from the point behind.
        camera.getWorldDirection(viewDir);
        if (viewDir.dot(dir) < 0) ahead.copy(camera.position).addScaledVector(dir, -100);
        ahead.project(camera);
        u.center.value.set(clamp(ahead.x * 0.5 + 0.5, -2, 3), clamp(ahead.y * 0.5 + 0.5, -2, 3));
      }
      const tp = tmpV.copy(truckPos).addScaledVector(UP, 1.6).project(camera);
      u.focus.value.set(tp.x * 0.5 + 0.5, tp.y * 0.5 + 0.5);
      const dist = camera.position.distanceTo(truckPos);
      u.focusRadius.value = clamp((7.5 / (dist * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2))) * 0.8, 0.06, 0.38);
      u.aspect.value = width / height;
      u.time.value = time % 10;
      u.vignette.value = 0.22 + env.night * 0.12 + tunnel * 0.1;
    }

    // Scenery animations.
    frameCtx.time = time;
    frameCtx.dt = dt;
    frameCtx.still = still;
    frameCtx.s = s;
    frameCtx.v = v;
    frameCtx.night = env.night;
    frameCtx.rain = wet;
    frameCtx.arrived = arrived;
    frameCtx.verified = verified;
    for (const fn of animations) fn(frameCtx);

    if (arrived && !arrivedLatch && !still) celebrate();
    arrivedLatch = arrived;

    publishTelemetry({
      live: true,
      progress: tripProgress(s),
      mph: displayMph(v),
      milesToGo: milesToGo(s),
      stage: arrived ? "Delivered · Dallas DC" : stageFor(s),
      arrived,
      verified,
    });
  };

  /* Particles --------------------------------------------------------------------- */
  let dustAcc = 0;
  let sprayAcc = 0;
  let smokeAcc = 0;
  const emitterWorld = (p: readonly [number, number, number], out: THREE.Vector3) =>
    out.set(p[0], p[1], p[2]).applyMatrix4(truck.root.matrixWorld);

  function emitParticles(dt: number, s: number, v: number, tunnel: number) {
    truck.root.updateMatrixWorld();
    const speed = Math.abs(v);
    const brightness = lerp(1, 0.32, env.night) * (1 - tunnel * 0.5);
    const dusty = (s < 60 ? 1 : s < L.cityFrom ? 0.55 : s > L.destinationYard ? 0.8 : 0.15) * (1 - wet);
    const back = -Math.sign(v || 1);
    dustAcc += dt * speed * 1.1 * dusty;
    sprayAcc += dt * speed * 2.4 * wet * (1 - tunnel);
    smokeAcc += dt * (ignition > 0.5 ? 2 + Math.max(0, motion.a) * 2.5 : 0);
    dustColor.setRGB(0.62, 0.55, 0.45).multiplyScalar(brightness);
    sprayColor.setRGB(0.82, 0.86, 0.92).multiplyScalar(brightness * 1.1);
    smokeColor.setRGB(0.28, 0.28, 0.3).multiplyScalar(0.6 + brightness * 0.4);
    const wheels = truck.emitters.rearWheels;
    while (dustAcc > 1) {
      dustAcc -= 1;
      const w = wheels[Math.floor(Math.random() * wheels.length)];
      emitterWorld(w, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y, z: tmpV.z,
        vx: fwd.x * back * speed * 0.18 + (Math.random() - 0.5) * 2.2,
        vy: 0.6 + Math.random() * 1.4,
        vz: fwd.z * back * speed * 0.18 + (Math.random() - 0.5) * 2.2,
        life: 1.4 + Math.random() * 1.2, size0: 0.8, size1: 4.2, alpha: 0.32, color: dustColor, drag: 1.6, lift: 0.4,
      });
    }
    while (sprayAcc > 1) {
      sprayAcc -= 1;
      const w = wheels[Math.floor(Math.random() * wheels.length)];
      emitterWorld(w, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y + 0.2, z: tmpV.z,
        vx: fwd.x * back * speed * 0.35 + (Math.random() - 0.5) * 3,
        vy: 1 + Math.random() * 2.2,
        vz: fwd.z * back * speed * 0.35 + (Math.random() - 0.5) * 3,
        life: 0.5 + Math.random() * 0.5, size0: 0.6, size1: 3.4, alpha: 0.4, color: sprayColor, drag: 2.4, lift: -3,
      });
    }
    while (smokeAcc > 1) {
      smokeAcc -= 1;
      emitterWorld(truck.emitters.exhaust, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y, z: tmpV.z,
        vx: fwd.x * back * speed * 0.1 + (Math.random() - 0.5) * 0.4,
        vy: 1.4 + Math.random() * 0.8,
        vz: fwd.z * back * speed * 0.1 + (Math.random() - 0.5) * 0.4,
        life: 1.6 + Math.random(), size0: 0.3, size1: 2.2, alpha: 0.22, color: smokeColor, drag: 1.2, lift: 0.6,
      });
    }
  }

  function celebrate() {
    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 7 + Math.random() * 3;
      particles.emit({
        x: truckPos.x + Math.cos(a) * r, y: truckPos.y + 0.3, z: truckPos.z + Math.sin(a) * r,
        vx: Math.cos(a) * 1.5, vy: 3 + Math.random() * 5, vz: Math.sin(a) * 1.5,
        life: 1.4 + Math.random() * 1.2, size0: 0.35, size1: 0.1, alpha: 1, color: sparkColor, drag: 0.8, lift: -2.5,
      });
    }
  }

  /* Quality ------------------------------------------------------------------------ */
  const degrade = () => {
    const next = lowerTier(tier);
    if (!next) return;
    tier = next;
    const t = TIERS[next];
    settings.pixelRatioCap = t.pixelRatioCap;
    settings.bloom = t.bloom;
    settings.post = t.post;
    settings.dynamicLights = t.dynamicLights;
    post?.dispose();
    post = t.post
      ? createPost(THREE, renderer, scene, camera, { bloom: t.bloom, samples: t.msaa, blurSamples: t.blurSamples })
      : null;
    if (!t.shadows && renderer.shadowMap.enabled) {
      renderer.shadowMap.enabled = false;
      sun.castShadow = false;
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => (x.needsUpdate = true));
        else if (m) m.needsUpdate = true;
      });
    } else if (t.shadows && t.shadowMapSize !== settings.shadowMapSize) {
      settings.shadowMapSize = t.shadowMapSize;
      sun.shadow.mapSize.set(t.shadowMapSize, t.shadowMapSize);
      sun.shadow.map?.dispose();
      sun.shadow.map = null;
    }
    if (!t.dynamicLights) {
      headSpot.intensity = 0;
      lampLights.forEach((l) => (l.intensity = 0));
      tunnelLight.intensity = 0;
    }
    resize();
  };

  const trackPerformance = (dt: number) => {
    if (reducedMotion) return;
    if (perf.warmup > 0) {
      perf.warmup -= dt;
      return;
    }
    perf.acc += dt;
    perf.frames++;
    if (perf.acc >= 2) {
      const avg = perf.acc / perf.frames;
      perf.slowWindows = avg > 1 / 40 ? perf.slowWindows + 1 : 0;
      perf.acc = 0;
      perf.frames = 0;
      if (perf.slowWindows >= 2) {
        perf.slowWindows = 0;
        perf.warmup = 2;
        degrade();
      }
    }
  };

  const render = () => {
    if (post) post.render();
    else renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady();
    }
  };

  const loop = (now: number) => {
    if (disposed || !visible) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (reducedMotion) {
      const stillS = stillStop();
      if (!dirty && stillS === lastStillS) return;
      lastStillS = stillS;
      dirty = false;
      update(0, true);
      render();
      return;
    }
    // Idle scenes (parked, dry, settled) render at half rate to save power.
    const idle = Math.abs(motion.v) < 0.01 && introT >= 1 && env.rain < 0.05 && Math.abs(storyTarget().s - motion.s) < 0.05;
    frameParity = (frameParity + 1) % 2;
    if (idle && frameParity === 1 && ready) return;
    const step = idle ? dt * 2 : dt;
    update(step, false);
    trackPerformance(dt);
    render();
  };

  const onVisibilityChange = () => {
    visible = document.visibilityState !== "hidden";
    if (visible && !disposed && !raf) raf = requestAnimationFrame(loop);
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Compile shaders off the main thread where supported, then start.
  const start = () => {
    if (disposed) return;
    const t0 = storyTarget().s;
    motion.s = t0;
    motion.v = 0;
    prevS = motion.s;
    introT = 1;
    ignition = 1;
    cameraPrimed = false;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  update(0, true);
  renderer.compileAsync(scene, camera).then(start, start);

  return {
    setReducedMotion(next: boolean) {
      reducedMotion = next;
      if (next) {
        introT = 1;
        ignition = 1;
      }
      dirty = true;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      hostObserver.disconnect();
      themeObserver.disconnect();
      unsubscribeStory();
      publishTelemetry({ live: false });
      post?.dispose();
      particles.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        const list = Array.isArray(m) ? m : m ? [m] : [];
        for (const mat of list) {
          for (const value of Object.values(mat)) {
            if (value instanceof THREE.Texture) value.dispose();
          }
          mat.dispose();
        }
      });
      envTexture.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
