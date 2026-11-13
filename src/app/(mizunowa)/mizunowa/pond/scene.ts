import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  HERO_INTRO_DURATION,
  POND_RIPPLE_DEFAULT_POINT,
  PondClock,
  WATERFALL_IMPACT_POINT,
  createKoiAgents,
  dampCameraParallax,
  introAtmosphereFactor,
  introCameraState,
  isInsideNaturalPond,
  pondBedElevation,
  stepKoiAgents,
  type FoodPellet,
  type WaterDisturbance,
} from './model';
import { KoiVariant } from './materials';
import { KoiActor, createKoiActor } from './fish';
import { SUBMERGED_OBSTACLES, createPondWaterRig } from './water';
import { createGardenEnvironment } from './garden';
import { PondQuality, createPondTextureSuite } from './textures';

export interface PondRendererLike {
  domElement: HTMLCanvasElement;
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
  shadowMap: { enabled: boolean; type: THREE.ShadowMapType };
  onDeviceLost: (info: { api: string; message: string; reason: string | null; originalEvent: unknown }) => void;
  backend?: { gl?: WebGL2RenderingContext };
  init: () => Promise<unknown>;
  getMaxAnisotropy?: () => number;
  setPixelRatio: (ratio: number) => void;
  setSize: (w: number, h: number, updateStyle?: boolean) => void;
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
  setAnimationLoop: (cb: (() => void) | null) => void;
  dispose: () => Promise<void> | void;
}

export interface PondSceneOptions {
  isMobile: boolean;
  isDisposed: () => boolean;
  onFirstFrame: () => void;
  onDeviceLostOrError: (reason: string) => void;
  onRippleAdded?: () => void;
  onPelletAdded?: () => void;
  createRenderer?: (forceWebGL: boolean, antialias: boolean) => PondRendererLike;
}

export interface PondSceneController {
  setPaused: (paused: boolean) => void;
  setViewportActive: (active: boolean) => void;
  feedKoi: () => void;
  triggerRipple: () => void;
  setJourneyActive: (active: boolean) => void;
  destroy: () => void;
}

function detectSoftwareGl(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

function retireFailedRenderer(renderer: PondRendererLike | null): void {
  if (!renderer) return;
  try {
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    const gl = renderer.backend?.gl;
    if (gl && typeof gl.getExtension === 'function') {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch {
    // Best-effort cleanup on an uninitialized renderer
  }
}

export async function createPondScene(
  container: HTMLElement,
  options: PondSceneOptions,
): Promise<PondSceneController | null> {
  if (options.isDisposed()) return null;

  const isSoftwareGl = detectSoftwareGl();
  const quality: PondQuality = options.isMobile || isSoftwareGl ? 'mobile' : 'desktop';

  const makeRenderer =
    options.createRenderer ??
    ((forceWebGL: boolean, antialias: boolean) =>
      new THREE.WebGPURenderer({
        antialias,
        forceWebGL,
        alpha: true,
      }) as unknown as PondRendererLike);

  let renderer: PondRendererLike | null = null;
  let initialized = false;

  const tryInit = async (forceWebGL: boolean): Promise<PondRendererLike | null> => {
    const candidate = makeRenderer(forceWebGL, !isSoftwareGl);
    try {
      await candidate.init();
      return candidate;
    } catch {
      retireFailedRenderer(candidate);
      return null;
    }
  };

  renderer = await tryInit(false);
  if (options.isDisposed()) {
    if (renderer) {
      try {
        await renderer.dispose();
      } catch {
        retireFailedRenderer(renderer);
      }
    }
    return null;
  }

  if (!renderer) {
    renderer = await tryInit(true);
    if (options.isDisposed()) {
      if (renderer) {
        try {
          await renderer.dispose();
        } catch {
          retireFailedRenderer(renderer);
        }
      }
      return null;
    }
  }

  if (!renderer) {
    options.onDeviceLostOrError('Graphics initialization failed');
    return null;
  }

  initialized = true;
  let destroyed = false;
  let frameId = 0;
  let timeoutId = 0;
  let firstFrameDone = false;
  let viewportActive = true;

  const clock = new PondClock();
  const elapsedUniform = uniform(0);

  // Configure renderer with restrained ACES Filmic exposure
  const maxDpr = isSoftwareGl ? 1 : options.isMobile ? 1.25 : 1.75;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const width = Math.max(container.clientWidth || 640, 280);
  const height = Math.max(container.clientHeight || 480, 240);
  renderer.setSize(width, height, false);

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.tabIndex = -1;

  // Device loss forwarding
  const origOnDeviceLost = renderer.onDeviceLost;
  renderer.onDeviceLost = (info) => {
    if (typeof origOnDeviceLost === 'function') {
      origOnDeviceLost.call(renderer, info);
    }
    if (!destroyed) {
      cleanupGraphics();
      options.onDeviceLostOrError(info?.message || 'Graphics device lost');
    }
  };

  // Scene deep woodland sage background matching horizon fog seamlessly
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x243424);
  scene.fog = new THREE.FogExp2(0x283a28, 0.022);

  const maxAniso =
    typeof renderer.getMaxAnisotropy === 'function' ? renderer.getMaxAnisotropy() : 4;
  const textures = createPondTextureSuite(quality, maxAniso);

  // Authentic misty morning bamboo & sakura canopy environment lighting
  let envTex: THREE.Texture | null = null;
  try {
    const pmrem = new THREE.PMREMGenerator(renderer as unknown as THREE.WebGPURenderer);
    envTex = pmrem.fromEquirectangular(textures.envEquirect).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.58;
    pmrem.dispose();
  } catch {
    // Fallback cleanly if PMREM is unavailable on a constrained driver
  }

  // Human-vantage Perspective camera looking into continuous woodland garden
  const camera = new THREE.PerspectiveCamera(44, width / Math.max(height, 1), 0.15, 180);

  let viewportAspect = Math.max(width / Math.max(height, 1), 0.5);
  let parallaxTargetX = 0;
  let parallaxTargetY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  let journeyActive = false;
  let journeyBlend = 0;
  let journeyYawOffset = 0;
  let journeyPitchOffset = 0;

  // Early-morning sunlight rig: warm sun diagonal from upper-right + forest sky/moss fill
  const sunPos = new THREE.Vector3(11.5, 11.0, -5.5);
  const sunDirection = sunPos.clone().normalize();
  const keyLight = new THREE.DirectionalLight(0xffecc9, 2.2);
  keyLight.position.copy(sunPos);
  keyLight.castShadow = !isSoftwareGl;
  const shadowSize = quality === 'desktop' ? 2048 : 1024;
  keyLight.shadow.mapSize.set(shadowSize, shadowSize);
  keyLight.shadow.camera.left = -12.0;
  keyLight.shadow.camera.right = 12.0;
  keyLight.shadow.camera.top = 12.0;
  keyLight.shadow.camera.bottom = -12.0;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 38;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.025;
  scene.add(keyLight);

  const hemiLight = new THREE.HemisphereLight(0xd9e6d0, 0x1e2e1d, 0.88);
  scene.add(hemiLight);

  const rimLight = new THREE.DirectionalLight(0xffe7c7, 0.36);
  rimLight.position.set(-7.5, 6.2, 6.5);
  scene.add(rimLight);

  const applyCameraAndAtmosphere = (elapsed: number) => {
    const camState = introCameraState(elapsed, viewportAspect);
    if (Math.abs(camera.fov - camState.fov) > 0.02) {
      camera.fov = camState.fov;
      camera.updateProjectionMatrix();
    }

    const parScale = camState.progress;
    const jx = journeyBlend * (1.55 + journeyYawOffset * 1.45);
    const jy = journeyBlend * (-0.38 + journeyPitchOffset * 0.55);
    const jz = journeyBlend * -1.45;

    camera.position.set(
      camState.position.x + parallaxX * 0.36 * parScale + jx,
      camState.position.y - parallaxY * 0.16 * parScale + jy,
      camState.position.z + parallaxY * 0.22 * parScale + jz,
    );
    camera.lookAt(
      camState.lookAt.x + parallaxX * 0.14 * parScale + journeyBlend * (0.95 + journeyYawOffset * 0.8),
      camState.lookAt.y - journeyBlend * 0.14,
      camState.lookAt.z + parallaxY * 0.1 * parScale + journeyBlend * 1.45,
    );

    const atmos = introAtmosphereFactor(elapsed);
    renderer!.toneMappingExposure = 0.8 + 0.24 * atmos;
    keyLight.intensity = 1.1 + 1.12 * atmos;
    hemiLight.intensity = 0.56 + 0.32 * atmos;
    rimLight.intensity = 0.18 + 0.18 * atmos;
    scene.environmentIntensity = 0.38 + 0.24 * atmos;
  };

  const updateCameraFraming = (w: number, h: number) => {
    viewportAspect = Math.max(w / Math.max(h, 1), 0.5);
    camera.aspect = viewportAspect;
    camera.updateProjectionMatrix();
    applyCameraAndAtmosphere(clock.elapsed);
  };
  updateCameraFraming(width, height);

  // Garden environment, optical water rig, and 4 realistic steering koi
  const gardenEnv = createGardenEnvironment(textures, elapsedUniform, quality);
  scene.add(gardenEnv.group);

  const waterRig = createPondWaterRig(
    elapsedUniform,
    textures,
    sunDirection,
    quality,
    isSoftwareGl,
  );
  scene.add(waterRig.group);

  const koiVariants: KoiVariant[] = ['kohaku', 'yamabuki', 'shiro', 'sanke'];
  const koiScales = [1.06, 0.98, 0.92, 1.0];
  const koiAgents = createKoiAgents();
  const koiActors: KoiActor[] = koiVariants.map((variant, idx) => {
    const actor = createKoiActor(
      variant,
      idx * (Math.PI * 0.5),
      elapsedUniform,
      textures,
      koiScales[idx],
    );
    scene.add(actor.group);
    return actor;
  });

  // Simulation state for food pellets & disturbances
  const activePellets: FoodPellet[] = [];
  const activeDisturbances: WaterDisturbance[] = [];
  let nextPelletId = 1;

  const spawnPelletsAt = (x: number, z: number): boolean => {
    if (!isInsideNaturalPond({ x, z }, 0.25)) return false;

    if (activePellets.length >= 8) {
      activePellets.shift();
    }
    activePellets.push({
      id: nextPelletId++,
      x,
      z,
      createdAt: clock.elapsed,
      eaten: false,
    });

    waterRig.spawnRipple(x, z, clock.elapsed, !clock.isAdvancing, 0.92, true);
    waterRig.syncPellets(activePellets, clock.elapsed);
    options.onPelletAdded?.();
    if (!clock.isAdvancing) {
      renderFrame();
    }
    return true;
  };

  const spawnDisturbanceRipple = (x: number, z: number, strength = 1.0): boolean => {
    if (!isInsideNaturalPond({ x, z })) return false;
    const added = waterRig.spawnRipple(x, z, clock.elapsed, !clock.isAdvancing, strength, true);
    if (added) {
      activeDisturbances.push({ x, z, createdAt: clock.elapsed, strength });
      if (activeDisturbances.length > 8) activeDisturbances.shift();
      options.onRippleAdded?.();
      if (!clock.isAdvancing) {
        renderFrame();
      }
    }
    return added;
  };

  container.appendChild(canvas);

  // Pointer parallax + raycasting clicks against water plane (passive so page scroll never blocks)
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let downX = 0;
  let downY = 0;
  let isDragging = false;
  let lastDragX = 0;
  let lastDragY = 0;

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    parallaxTargetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    parallaxTargetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (isDragging && journeyActive) {
      const dx = (e.clientX - lastDragX) / rect.width;
      const dy = (e.clientY - lastDragY) / rect.height;
      journeyYawOffset = Math.max(-1, Math.min(1, journeyYawOffset - dx * 2.2));
      journeyPitchOffset = Math.max(-0.7, Math.min(0.7, journeyPitchOffset + dy * 1.6));
      lastDragX = e.clientX;
      lastDragY = e.clientY;
    }
  };

  const onPointerLeave = () => {
    parallaxTargetX = 0;
    parallaxTargetY = 0;
    isDragging = false;
  };

  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
    lastDragX = e.clientX;
    lastDragY = e.clientY;
    isDragging = true;
  };

  const onPointerUp = (e: PointerEvent) => {
    isDragging = false;
    const moveDist = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moveDist > 8) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObject(waterRig.hitMesh, false);
    if (hits.length === 0) return;

    const pt = hits[0].point;
    const fed = spawnPelletsAt(pt.x, pt.z);
    if (!fed) {
      spawnDisturbanceRipple(pt.x, pt.z, 0.92);
    }
  };

  canvas.addEventListener('pointermove', onPointerMove, { passive: true });
  canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
  canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
  canvas.addEventListener('pointerup', onPointerUp, { passive: true });

  const resizeObserver = new ResizeObserver((entries) => {
    if (destroyed || !renderer) return;
    const entry = entries[0];
    if (!entry) return;
    const w = Math.max(Math.round(entry.contentRect.width), 280);
    const h = Math.max(Math.round(entry.contentRect.height), 240);
    renderer.setSize(w, h, false);
    updateCameraFraming(w, h);
    renderFrame(0);
  });
  resizeObserver.observe(container);

  const onVisibilityChange = () => {
    clock.setVisibilityPaused(document.hidden);
    lastTimestamp = performance.now();
    if (clock.isAdvancing && viewportActive && !destroyed) {
      scheduleLoop();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  const syncKoiTransforms = (elapsed: number) => {
    for (let i = 0; i < koiActors.length; i++) {
      const k = koiAgents[i];
      const actor = koiActors[i];
      actor.group.position.set(k.x, k.y, k.z);
      actor.group.rotation.order = 'YXZ';
      actor.group.rotation.y = k.yaw;
      actor.group.rotation.z = k.pitch;
      actor.group.rotation.x = k.roll;
      const bedY = pondBedElevation(k.x, k.z);
      actor.updateAnimation(elapsed, k.speed, Math.max(0.08, k.y - bedY));
    }
  };

  const stepSimulation = (elapsed: number, simDt: number) => {
    elapsedUniform.value = elapsed;
    const atmos = introAtmosphereFactor(elapsed);

    if (simDt > 0) {
      // Smooth camera parallax + bounded 3D journey exploration + first-visit intro glide
      const nextPar = dampCameraParallax(parallaxX, parallaxY, parallaxTargetX, parallaxTargetY, simDt);
      parallaxX = nextPar.x;
      parallaxY = nextPar.y;
      const targetJourney = journeyActive ? 1 : 0;
      journeyBlend += (targetJourney - journeyBlend) * (1 - Math.exp(-3.6 * simDt));
      if (!journeyActive) {
        journeyYawOffset *= Math.exp(-4.0 * simDt);
        journeyPitchOffset *= Math.exp(-4.0 * simDt);
      }
      applyCameraAndAtmosphere(elapsed);

      // Clean expired disturbances
      for (let i = activeDisturbances.length - 1; i >= 0; i--) {
        if (elapsed - activeDisturbances[i].createdAt > 1.8) {
          activeDisturbances.splice(i, 1);
        }
      }

      // Autonomous koi steering, surface wake ripples, and pellet consumption
      const stepRes = stepKoiAgents(
        koiAgents,
        simDt,
        elapsed,
        activePellets,
        activeDisturbances,
        SUBMERGED_OBSTACLES,
      );

      for (const pid of stepRes.consumedPelletIds) {
        const idx = activePellets.findIndex((p) => p.id === pid);
        if (idx !== -1) activePellets.splice(idx, 1);
      }
      for (const wr of stepRes.wakeRipples) {
        waterRig.spawnRipple(wr.x, wr.z, elapsed, false, wr.strength, false);
      }
      for (const fr of stepRes.feedingRipples) {
        waterRig.spawnRipple(fr.x, fr.z, elapsed, false, fr.strength, true);
      }

      // Falling sakura petals + right-bank ceramic water vessel emit pond ripples
      gardenEnv.update(
        elapsed,
        simDt,
        atmos,
        (px, pz) => {
          waterRig.spawnRipple(px, pz, elapsed, false, 0.28, false);
        },
        (wx, wz) => {
          waterRig.spawnRipple(wx, wz, elapsed, false, 0.4, false);
        },
      );
    } else {
      gardenEnv.update(elapsed, 0, atmos);
      if (elapsed <= HERO_INTRO_DURATION + 0.05) {
        applyCameraAndAtmosphere(elapsed);
      }
    }

    syncKoiTransforms(elapsed);
    waterRig.syncPellets(activePellets, elapsed);
    waterRig.update(elapsed);
  };

  const renderFrame = (simDt = 0) => {
    if (destroyed || !renderer || options.isDisposed()) return;
    stepSimulation(clock.elapsed, simDt);
    renderer.render(scene, camera);
    if (!firstFrameDone) {
      firstFrameDone = true;
      options.onFirstFrame();
    }
  };

  // Seed calm initial ripples (pond center + waterfall impact pocket) before first frame
  waterRig.spawnRipple(POND_RIPPLE_DEFAULT_POINT.x, POND_RIPPLE_DEFAULT_POINT.z, 0, false, 0.85, true);
  waterRig.spawnRipple(WATERFALL_IMPACT_POINT.x, WATERFALL_IMPACT_POINT.z, 0, false, 0.42, false);

  let lastTimestamp = performance.now();
  let loopActive = false;

  const afterDrawSoftware = (cb: () => void) => {
    const gl = renderer?.backend?.gl;
    if (gl && typeof gl.fenceSync === 'function') {
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (destroyed) return;
        const state = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (state === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    } else {
      timeoutId = window.setTimeout(cb, 80);
    }
  };

  const tick = (now: number) => {
    if (destroyed || !renderer || options.isDisposed()) return;
    const rawDt = Math.max(0, (now - lastTimestamp) / 1000);
    lastTimestamp = now;

    if (!clock.isAdvancing || !viewportActive) {
      loopActive = false;
      return;
    }

    const prevElapsed = clock.elapsed;
    const newElapsed = clock.step(rawDt);
    const simDt = newElapsed - prevElapsed;
    renderFrame(simDt);

    if (isSoftwareGl) {
      afterDrawSoftware(() => {
        if (!destroyed && clock.isAdvancing && viewportActive) {
          frameId = requestAnimationFrame(tick);
        } else {
          loopActive = false;
        }
      });
    } else {
      frameId = requestAnimationFrame(tick);
    }
  };

  const scheduleLoop = () => {
    if (destroyed || loopActive || !clock.isAdvancing || !viewportActive) return;
    loopActive = true;
    lastTimestamp = performance.now();
    frameId = requestAnimationFrame(tick);
  };

  function cleanupGraphics() {
    if (destroyed) return;
    destroyed = true;
    loopActive = false;
    if (frameId) cancelAnimationFrame(frameId);
    if (timeoutId) clearTimeout(timeoutId);

    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointerup', onPointerUp);
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);

    koiActors.forEach((a) => a.dispose());
    waterRig.dispose();
    gardenEnv.dispose();
    textures.dispose();
    if (envTex) envTex.dispose();

    if (renderer && initialized) {
      try {
        renderer.setAnimationLoop(null);
      } catch {
        // Ignore if backend already tore down
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      void Promise.resolve(renderer.dispose()).catch(() => undefined);
    }
    renderer = null;
  }

  // Draw first frame immediately before entering loop
  renderFrame(0);
  if (clock.isAdvancing && viewportActive) {
    scheduleLoop();
  }

  return {
    setPaused: (paused: boolean) => {
      if (destroyed) return;
      if (paused) {
        clock.pause();
        loopActive = false;
        if (frameId) cancelAnimationFrame(frameId);
        if (timeoutId) clearTimeout(timeoutId);
        renderFrame(0);
      } else {
        clock.resume();
        lastTimestamp = performance.now();
        if (viewportActive) {
          scheduleLoop();
        }
      }
    },
    setViewportActive: (active: boolean) => {
      if (destroyed) return;
      viewportActive = active;
      if (active && clock.isAdvancing) {
        scheduleLoop();
      } else if (!active) {
        loopActive = false;
        if (frameId) cancelAnimationFrame(frameId);
        if (timeoutId) clearTimeout(timeoutId);
      }
    },
    feedKoi: () => {
      if (destroyed) return;
      spawnPelletsAt(0.35, 0.45);
    },
    triggerRipple: () => {
      if (destroyed) return;
      spawnDisturbanceRipple(POND_RIPPLE_DEFAULT_POINT.x, POND_RIPPLE_DEFAULT_POINT.z, 0.96);
    },
    setJourneyActive: (active: boolean) => {
      if (destroyed) return;
      journeyActive = active;
      if (!active) {
        journeyYawOffset = 0;
        journeyPitchOffset = 0;
      }
      if (!clock.isAdvancing) {
        journeyBlend = active ? 1 : 0;
        applyCameraAndAtmosphere(clock.elapsed);
        renderFrame(0);
      }
    },
    destroy: () => {
      cleanupGraphics();
    },
  };
}
