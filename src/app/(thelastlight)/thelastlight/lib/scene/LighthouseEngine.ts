import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  BoatState,
  CameraMode,
  HERO_CAMERA_CONFIG,
  SimControls,
  STORM_DURATION,
  TelemetryStats,
  WeatherTargets,
} from '../sim/types';
import {
  clampToSafeWater,
  COTTAGE_POS,
  islandHeightAt,
  isSafeWaterPosition,
  LIGHTHOUSE_POS,
} from '../sim/island';
import { evaluateTimeOfDay } from '../sim/timeOfDay';
import {
  buildEffectiveEnvState,
  dampWeatherState,
  evaluateStormSequence,
  WEATHER_PRESETS,
} from '../sim/weather';
import {
  createInitialBoatState,
  DEFAULT_BOAT_ANCHOR,
  repositionBoat,
  stepBoatPhysics,
} from '../sim/buoyancy';
import { sampleOceanAtWorldXZ } from '../sim/ocean';
import { createProceduralTextures } from './textures';
import { createOceanMaterial, createSkyMaterial } from './shaders';
import { buildLighthouse } from './lighthouse';
import { buildIsland } from './islandMesh';
import { buildWoodenBoat } from './boatMesh';
import { buildWeatherEffects } from './weatherEffects';

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

function buildTargetWeatherFromControls(controls: SimControls): WeatherTargets {
  const base = WEATHER_PRESETS[controls.weather];
  return {
    waveAmplitude: controls.waveAmplitude,
    waveFrequency: controls.waveFrequency,
    waveSpeed: controls.waveSpeed,
    oceanRoughness: controls.oceanRoughness,
    foamIntensity: controls.foamIntensity,
    windStrength: controls.windStrength,
    fogDensity: controls.fogDensity,
    rainIntensity: controls.rainIntensity,
    cloudCoverage: controls.cloudDensity,
    stormIntensity: controls.stormIntensity,
    atmosphericHaze: controls.atmosphericHaze,
    lightningActivity: Math.max(
      base.lightningActivity,
      controls.stormIntensity > 0.78 ? (controls.stormIntensity - 0.78) * 4.2 : 0
    ),
    rockWetness: Math.max(base.rockWetness, controls.rainIntensity * 0.92),
    sprayIntensity: controls.sprayIntensity,
    ambientDimming: Math.max(
      base.ambientDimming * 0.6,
      controls.cloudDensity * 0.32 + controls.stormIntensity * 0.36
    ),
  };
}

export interface EngineCallbacks {
  onTelemetry: (stats: TelemetryStats) => void;
  onStormTimeUpdate: (time: number, phaseName: string) => void;
  onBoatMoved?: (x: number, z: number) => void;
}

export class LighthouseEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private isSoftwareGl: boolean;
  private isMobile: boolean;
  private prefersReducedMotion: boolean;

  private simControls: SimControls;
  private callbacks: EngineCallbacks;
  private dampedWeather: WeatherTargets;
  private targetWeather: WeatherTargets;
  private boatState: BoatState;

  private textures: ReturnType<typeof createProceduralTextures>;
  private oceanMat: THREE.ShaderMaterial;
  private oceanMesh: THREE.Mesh;
  private skyMat: THREE.ShaderMaterial;
  private skyMesh: THREE.Mesh;
  private lighthouse: ReturnType<typeof buildLighthouse>;
  private island: ReturnType<typeof buildIsland>;
  private boat: ReturnType<typeof buildWoodenBoat>;
  private weatherEffects: ReturnType<typeof buildWeatherEffects>;

  private sunLight: THREE.DirectionalLight;
  private moonLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private fog: THREE.FogExp2;
  private waterTargetRing: THREE.Mesh;
  private envRT: THREE.WebGLRenderTarget;

  private frameId = 0;
  private frameCount = 0;
  private disposed = false;
  private lastNow = 0;
  private simTime = 0;
  private fpsAccum = 0;
  private fpsFrames = 0;
  private currentFps = 60;
  private lastTelemetryTime = 0;
  private lastStormReportTime = 0;

  // Camera state & pointer parallax
  private pointerNDC = new THREE.Vector2(0, 0);
  private smoothPointer = new THREE.Vector2(0, 0);
  private targetCamPos = new THREE.Vector3(
    HERO_CAMERA_CONFIG.pos.x,
    HERO_CAMERA_CONFIG.pos.y,
    HERO_CAMERA_CONFIG.pos.z
  );
  private targetCamLook = new THREE.Vector3(
    HERO_CAMERA_CONFIG.look.x,
    HERO_CAMERA_CONFIG.look.y,
    HERO_CAMERA_CONFIG.look.z
  );
  private currentCamLook = new THREE.Vector3(
    HERO_CAMERA_CONFIG.look.x,
    HERO_CAMERA_CONFIG.look.y,
    HERO_CAMERA_CONFIG.look.z
  );
  private lastCameraMode: CameraMode = 'cinematic';
  private orbitTransitioning = false;
  private wireframeApplied = false;

  // Raycasting for safe-water boat repositioning
  private raycaster = new THREE.Raycaster();
  private waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private _hitPoint = new THREE.Vector3();
  private _sunPos = new THREE.Vector3();
  private _moonPos = new THREE.Vector3();
  private _beaconLook = new THREE.Vector3();
  private _orbitTarget = new THREE.Vector3(14.5, 9.5, -1.2);

  private boundResize: () => void;
  private boundPointerMove: (e: PointerEvent) => void;
  private boundPointerDown: (e: PointerEvent) => void;
  private boundContextLost: (e: Event) => void;

  constructor(
    container: HTMLElement,
    initialControls: SimControls,
    callbacks: EngineCallbacks
  ) {
    this.container = container;
    this.simControls = { ...initialControls };
    this.callbacks = callbacks;
    this.isSoftwareGl = detectSoftwareGl();
    this.isMobile = window.innerWidth < 768;
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.targetWeather = buildTargetWeatherFromControls(initialControls);
    this.dampedWeather = { ...this.targetWeather };
    this.boatState = createInitialBoatState();

    // 1. Renderer with Software-WebGL guard & ACES Filmic color pipeline
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.computeTargetPixelRatio());
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled =
      !this.isSoftwareGl &&
      initialControls.quality !== 'low' &&
      initialControls.expensiveEffects;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // 2. Scene, Camera, PMREM RoomEnvironment & Horizon Fog
    this.scene = new THREE.Scene();
    this.fog = new THREE.FogExp2(0x282932, 0.0075);
    this.scene.fog = this.fog;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.envRT.texture;
    this.scene.environmentIntensity = 0.42;
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(
      HERO_CAMERA_CONFIG.fov,
      width / height,
      0.25,
      650
    );
    this.camera.position.copy(this.targetCamPos);
    this.camera.lookAt(this.targetCamLook);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 12;
    this.controls.maxDistance = 88;
    this.controls.minPolarAngle = 0.08;
    this.controls.maxPolarAngle = Math.PI * 0.485;
    this.controls.target.copy(this._orbitTarget);
    this.controls.enabled = initialControls.cameraMode === 'orbit';
    this.controls.addEventListener('start', () => {
      this.orbitTransitioning = false;
    });

    // 3. Procedural Textures
    this.textures = createProceduralTextures(this.renderer);

    // 4. Lighting Rig (Warm Sun Key + Cool Moon Key + Hemisphere Fill)
    this.sunLight = new THREE.DirectionalLight(0xf29652, 1.55);
    this.sunLight.castShadow = true;
    const shadowSize = this.isMobile ? 1024 : 2048;
    this.sunLight.shadow.mapSize.set(shadowSize, shadowSize);
    this.sunLight.shadow.camera.left = -32;
    this.sunLight.shadow.camera.right = 32;
    this.sunLight.shadow.camera.top = 30;
    this.sunLight.shadow.camera.bottom = -24;
    this.sunLight.shadow.camera.near = 5;
    this.sunLight.shadow.camera.far = 145;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.025;
    this.sunLight.target.position.set(14.5, 9.0, -1.0);
    this.scene.add(this.sunLight, this.sunLight.target);

    this.moonLight = new THREE.DirectionalLight(0x8db4f0, 0.25);
    this.scene.add(this.moonLight);

    this.hemiLight = new THREE.HemisphereLight(0x6e84a2, 0x1a2228, 0.7);
    this.scene.add(this.hemiLight);

    // 5. Multi-Layer Procedural Sky & Cloud Dome
    const skyGeo = new THREE.SphereGeometry(420, 36, 24);
    this.skyMat = createSkyMaterial();
    this.skyMesh = new THREE.Mesh(skyGeo, this.skyMat);
    this.skyMesh.frustumCulled = false;
    this.scene.add(this.skyMesh);

    // 6. Real-Time Gerstner Wave Ocean Surface (ALU & vertex-count balanced for GPU + SwiftShader)
    const oceanSegs = this.isMobile ? 104 : 124;
    const oceanGeo = new THREE.PlaneGeometry(520, 520, oceanSegs, oceanSegs);
    oceanGeo.rotateX(-Math.PI / 2);
    this.oceanMat = createOceanMaterial();
    this.oceanMesh = new THREE.Mesh(oceanGeo, this.oceanMat);
    this.oceanMesh.receiveShadow = false;
    this.scene.add(this.oceanMesh);

    // 7. Procedural Rocky Island, Stratified Outcrops & Clustered Coastal Grasses
    const grassCount = this.isMobile ? 420 : 920;
    this.island = buildIsland(this.textures, grassCount);
    this.scene.add(this.island.group);

    // 8. Independent LighthouseGroup, KeeperCottageGroup, Grounded Walkway & Soft Beacon
    this.lighthouse = buildLighthouse(this.textures, this.isSoftwareGl);
    this.scene.add(this.lighthouse.group);

    // 9. Wooden Rowboat, Orange Buoy, Catenary Mooring Line & Physics Diagnostics
    this.boat = buildWoodenBoat(this.textures);
    this.scene.add(this.boat.group);

    // 10. Synchronized Weather & Atmospheric Effects
    this.weatherEffects = buildWeatherEffects(this.textures, {
      rain: this.isMobile ? 420 : 950,
      spray: this.isMobile ? 160 : 320,
      fogWisps: this.isMobile ? 10 : 16,
      birds: 6,
    });
    this.scene.add(this.weatherEffects.group);

    // 11. Subtle Safe-Water Reposition Target Ring
    const ringGeo = new THREE.RingGeometry(1.15, 1.45, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.waterTargetRing = new THREE.Mesh(ringGeo, ringMat);
    this.waterTargetRing.visible = false;
    this.waterTargetRing.position.set(this.boatState.x, 0.4, this.boatState.z);
    this.scene.add(this.waterTargetRing);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    this.boundResize = this.handleResize.bind(this);
    this.boundPointerMove = this.handlePointerMove.bind(this);
    this.boundPointerDown = this.handlePointerDown.bind(this);
    this.boundContextLost = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('resize', this.boundResize);
    this.renderer.domElement.addEventListener('pointermove', this.boundPointerMove);
    this.renderer.domElement.addEventListener('pointerdown', this.boundPointerDown);
    this.renderer.domElement.addEventListener(
      'webglcontextlost',
      this.boundContextLost,
      false
    );

    this.lastNow = performance.now();
    this.tick();
  }

  private computeTargetPixelRatio(): number {
    if (this.isSoftwareGl) return 1;
    const dpr = window.devicePixelRatio || 1;
    if (this.simControls.quality === 'low') return Math.min(dpr, 1.0);
    if (this.simControls.quality === 'medium') return Math.min(dpr, 1.5);
    return Math.min(dpr, 2.0);
  }

  public updateControls(next: SimControls) {
    const prevMode = this.simControls.cameraMode;
    const prevQuality = this.simControls.quality;
    const prevExpensive = this.simControls.expensiveEffects;
    this.simControls = { ...next };

    this.targetWeather = buildTargetWeatherFromControls(next);

    if (prevMode !== next.cameraMode) {
      this.lastCameraMode = next.cameraMode;
      this.controls.enabled = next.cameraMode === 'orbit';
      if (next.cameraMode === 'orbit') {
        this.orbitTransitioning = true;
      }
    }

    if (prevQuality !== next.quality || prevExpensive !== next.expensiveEffects) {
      this.renderer.setPixelRatio(this.computeTargetPixelRatio());
      this.renderer.shadowMap.enabled =
        !this.isSoftwareGl && next.quality !== 'low' && next.expensiveEffects;
    }

    if (this.wireframeApplied !== next.wireframe) {
      this.wireframeApplied = next.wireframe;
      this.applyWireframe(next.wireframe);
    }

    this.waterTargetRing.visible = next.repositionBoatMode;
  }

  public resetCamera() {
    this.pointerNDC.set(0, 0);
    this.smoothPointer.set(0, 0);
    if (this.simControls.cameraMode === 'orbit') {
      this.orbitTransitioning = true;
    }
    this.targetCamPos.set(
      HERO_CAMERA_CONFIG.pos.x,
      HERO_CAMERA_CONFIG.pos.y,
      HERO_CAMERA_CONFIG.pos.z
    );
    this.targetCamLook.set(
      HERO_CAMERA_CONFIG.look.x,
      HERO_CAMERA_CONFIG.look.y,
      HERO_CAMERA_CONFIG.look.z
    );
  }

  public resetBoatPosition() {
    this.boatState = repositionBoat(
      this.boatState,
      DEFAULT_BOAT_ANCHOR.x,
      DEFAULT_BOAT_ANCHOR.z
    );
    this.callbacks.onBoatMoved?.(this.boatState.x, this.boatState.z);
  }

  public resetScene(defaultControls: SimControls) {
    this.simTime = 0;
    this.updateControls(defaultControls);
    this.dampedWeather = { ...this.targetWeather };
    this.boatState = createInitialBoatState(
      DEFAULT_BOAT_ANCHOR.x,
      DEFAULT_BOAT_ANCHOR.z
    );
    this.resetCamera();
    this.camera.position.copy(this.targetCamPos);
    this.currentCamLook.copy(this.targetCamLook);
    this.camera.lookAt(this.currentCamLook);
  }

  public repositionBoatSafe(x?: number, z?: number) {
    let tx = x;
    let tz = z;
    if (tx === undefined || tz === undefined) {
      const spots = [
        { x: -13.2, z: 7.4 },
        { x: -7.6, z: 12.2 },
        { x: -15.4, z: 12.8 },
        { x: DEFAULT_BOAT_ANCHOR.x, z: DEFAULT_BOAT_ANCHOR.z },
      ];
      let best = spots[0];
      let maxD = -1;
      for (const s of spots) {
        const d = Math.hypot(s.x - this.boatState.anchorX, s.z - this.boatState.anchorZ);
        if (d > 2.2 && d > maxD) {
          maxD = d;
          best = s;
        }
      }
      tx = best.x;
      tz = best.z;
    }
    this.boatState = repositionBoat(this.boatState, tx, tz);
    this.callbacks.onBoatMoved?.(this.boatState.x, this.boatState.z);
  }

  private applyWireframe(enabled: boolean) {
    this.scene.traverse((obj) => {
      if (
        obj instanceof THREE.Mesh &&
        obj !== this.skyMesh &&
        obj !== this.lighthouse.beaconBeamPrimary &&
        obj !== this.lighthouse.beaconBeamSecondary &&
        obj !== this.waterTargetRing
      ) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          if ('wireframe' in m) {
            (m as THREE.MeshStandardMaterial | THREE.ShaderMaterial).wireframe = enabled;
          }
        });
      }
    });
  }

  private handleResize() {
    if (this.disposed) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(this.computeTargetPixelRatio());
    this.renderer.render(this.scene, this.camera);
  }

  private handlePointerMove(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.pointerNDC.set(nx, ny);

    if (this.simControls.repositionBoatMode) {
      this.raycaster.setFromCamera(this.pointerNDC, this.camera);
      if (this.raycaster.ray.intersectPlane(this.waterPlane, this._hitPoint)) {
        const safe = clampToSafeWater(this._hitPoint.x, this._hitPoint.z);
        this.waterTargetRing.position.set(safe.x, 0.45, safe.z);
        const isDirectlySafe = isSafeWaterPosition(this._hitPoint.x, this._hitPoint.z);
        (this.waterTargetRing.material as THREE.MeshBasicMaterial).color.setHex(
          isDirectlySafe ? 0x38bdf8 : 0xf59e0b
        );
      }
    }
  }

  private handlePointerDown(e: PointerEvent) {
    if (e.button !== 0 || !this.simControls.repositionBoatMode) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.pointerNDC.set(nx, ny);
    this.raycaster.setFromCamera(this.pointerNDC, this.camera);
    if (this.raycaster.ray.intersectPlane(this.waterPlane, this._hitPoint)) {
      this.repositionBoatSafe(this._hitPoint.x, this._hitPoint.z);
    }
  }

  private afterDraw(cb: () => void) {
    if (this.disposed) return;
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (!gl || typeof gl.fenceSync !== 'function') {
      this.frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (this.disposed) {
        if (sync) gl.deleteSync(sync);
        return;
      }
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        this.frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        this.frameId = window.setTimeout(cb, 80);
      }
    };
    this.frameId = window.setTimeout(poll, 5);
  }

  private tick = () => {
    if (this.disposed) return;

    const now = performance.now();
    const rawDt = (now - this.lastNow) / 1000;
    this.lastNow = now;
    const dt = Math.min(0.05, Math.max(0.001, rawDt));
    const visualDt = Math.min(0.65, Math.max(0.016, rawDt));

    // Advance deterministic 30s storm sequence if playing
    let stormPhaseName = 'Manual Control';
    if (this.simControls.stormActive) {
      if (this.simControls.stormPlaying) {
        let nextT =
          this.simControls.stormTime + dt * this.simControls.stormSpeed;
        if (nextT >= STORM_DURATION) {
          nextT = this.simControls.stormLoop
            ? nextT % STORM_DURATION
            : STORM_DURATION;
        }
        this.simControls.stormTime = nextT;
      }
      const seq = evaluateStormSequence(this.simControls.stormTime);
      stormPhaseName = seq.phaseName;
      if (now - this.lastStormReportTime > 90) {
        this.lastStormReportTime = now;
        this.callbacks.onStormTimeUpdate(this.simControls.stormTime, stormPhaseName);
      }
    }

    // Advance simulation clock (deterministic lock to stormTime when scrubbing timeline)
    const timeScale = this.prefersReducedMotion ? 0.35 : 1.0;
    if (this.simControls.stormActive && !this.simControls.stormPlaying) {
      this.simTime = this.simControls.stormTime * 1.4;
    } else {
      this.simTime += dt * this.simControls.stormSpeed * timeScale;
    }

    // Smooth multi-second weather interpolation (uses visualDt so preset switches converge cleanly on both GPU & SwiftShader)
    this.dampedWeather = dampWeatherState(
      this.dampedWeather,
      this.targetWeather,
      Math.min(0.35, visualDt),
      1.15
    );

    // Unified coherent environmental state shared by every subsystem
    const env = buildEffectiveEnvState(
      this.simControls,
      this.dampedWeather,
      this.simTime
    );

    // Continuous solar/lunar lighting & refined coastal palette
    const tod = evaluateTimeOfDay(
      env.timeOfDay,
      env.cloudCoverage,
      env.ambientDimming,
      env.stormIntensity
    );

    // 1. Update Sky Dome & Atmospheric Lights
    this._sunPos.set(tod.sunDir.x * 85, tod.sunDir.y * 85, tod.sunDir.z * 85);
    this.sunLight.position.copy(this._sunPos);
    this.sunLight.color.setRGB(tod.sunColor.r, tod.sunColor.g, tod.sunColor.b);
    this.sunLight.intensity = tod.sunIntensity;

    this._moonPos.set(tod.moonDir.x * 85, tod.moonDir.y * 85, tod.moonDir.z * 85);
    this.moonLight.position.copy(this._moonPos);
    this.moonLight.color.setRGB(tod.moonColor.r, tod.moonColor.g, tod.moonColor.b);
    this.moonLight.intensity = tod.moonIntensity;

    this.hemiLight.color.setRGB(
      tod.hemiSkyColor.r,
      tod.hemiSkyColor.g,
      tod.hemiSkyColor.b
    );
    this.hemiLight.groundColor.setRGB(
      tod.hemiGroundColor.r,
      tod.hemiGroundColor.g,
      tod.hemiGroundColor.b
    );
    this.hemiLight.intensity = tod.hemiIntensity + env.lightningFlash * 0.48;

    // Horizon-matched FogExp2 modulated by fogDensity + atmosphericHaze
    const fogR = Math.min(1, tod.fogColor.r + env.lightningFlash * 0.16);
    const fogG = Math.min(1, tod.fogColor.g + env.lightningFlash * 0.20);
    const fogB = Math.min(1, tod.fogColor.b + env.lightningFlash * 0.28);
    this.fog.color.setRGB(fogR, fogG, fogB);
    this.fog.density =
      0.0024 + env.fogDensity * 0.0115 + env.atmosphericHaze * 0.0032;

    this.skyMat.uniforms.uTime.value = this.simTime;
    this.skyMat.uniforms.uSunDir.value.set(tod.sunDir.x, tod.sunDir.y, tod.sunDir.z);
    this.skyMat.uniforms.uMoonDir.value.set(
      tod.moonDir.x,
      tod.moonDir.y,
      tod.moonDir.z
    );
    this.skyMat.uniforms.uZenithColor.value.setRGB(
      tod.skyZenithColor.r,
      tod.skyZenithColor.g,
      tod.skyZenithColor.b
    );
    this.skyMat.uniforms.uMidColor.value.setRGB(
      tod.skyMidColor.r,
      tod.skyMidColor.g,
      tod.skyMidColor.b
    );
    this.skyMat.uniforms.uHorizonColor.value.setRGB(
      tod.skyHorizonColor.r,
      tod.skyHorizonColor.g,
      tod.skyHorizonColor.b
    );
    this.skyMat.uniforms.uSunsetGlowColor.value.setRGB(
      tod.skySunsetGlowColor.r,
      tod.skySunsetGlowColor.g,
      tod.skySunsetGlowColor.b
    );
    this.skyMat.uniforms.uCloudCoverage.value = env.cloudCoverage;
    this.skyMat.uniforms.uCloudSpeed.value = env.cloudSpeed;
    this.skyMat.uniforms.uStormIntensity.value = env.stormIntensity;
    this.skyMat.uniforms.uAtmosphericHaze.value = env.atmosphericHaze;
    this.skyMat.uniforms.uDayFactor.value = tod.dayFactor;
    this.skyMat.uniforms.uSunsetFactor.value = tod.sunsetFactor;
    this.skyMat.uniforms.uNightFactor.value = tod.nightFactor;
    this.skyMat.uniforms.uWindDir.value.set(env.windDirX, env.windDirZ);
    this.skyMat.uniforms.uWindStrength.value = env.windStrength;
    this.skyMat.uniforms.uLightningFlash.value = env.lightningFlash;

    // 2. Update LighthouseGroup, KeeperCottageGroup, Soft Beacon & Diagnostics
    const { beaconDir } = this.lighthouse.update({
      dt: visualDt,
      time: this.simTime,
      beaconEnabled: env.beaconActive,
      beaconSpeed: this.simControls.beaconSpeed,
      beamIntensity: env.beaconIntensity,
      beamSoftness: env.beamSoftness,
      beamRange: env.beamRange,
      beaconProminence: tod.beaconProminence,
      fogDensity: env.fogDensity,
      rainIntensity: env.rainIntensity,
      interiorLights: env.interiorLightsActive,
      windowGlowFactor: tod.windowGlowFactor,
      doorOpen: this.simControls.doorOpen,
      cutaway: this.simControls.cutaway,
      showBuildingBounds: this.simControls.showBuildingBounds,
      showFoundations: this.simControls.showFoundations,
      showWalkwayGuides: this.simControls.showWalkwayGuides,
    });

    // 3. Update Gerstner Ocean Shader
    this.oceanMat.uniforms.uTime.value = this.simTime;
    this.oceanMat.uniforms.uAmplitude.value = env.waveAmplitude;
    this.oceanMat.uniforms.uFrequency.value = env.waveFrequency;
    this.oceanMat.uniforms.uWaveSpeed.value = env.waveSpeed;
    this.oceanMat.uniforms.uRoughness.value = env.oceanRoughness;
    this.oceanMat.uniforms.uFoamIntensity.value = env.foamIntensity;
    this.oceanMat.uniforms.uWindDir.value.set(env.windDirX, env.windDirZ);
    this.oceanMat.uniforms.uWindStrength.value = env.windStrength;
    this.oceanMat.uniforms.uSunDir.value.set(tod.sunDir.x, tod.sunDir.y, tod.sunDir.z);
    this.oceanMat.uniforms.uSunColor.value.setRGB(
      tod.sunColor.r,
      tod.sunColor.g,
      tod.sunColor.b
    );
    this.oceanMat.uniforms.uSunIntensity.value = tod.sunIntensity;
    this.oceanMat.uniforms.uMoonDir.value.set(
      tod.moonDir.x,
      tod.moonDir.y,
      tod.moonDir.z
    );
    this.oceanMat.uniforms.uMoonColor.value.setRGB(
      tod.moonColor.r,
      tod.moonColor.g,
      tod.moonColor.b
    );
    this.oceanMat.uniforms.uMoonIntensity.value = tod.moonIntensity;
    this.oceanMat.uniforms.uSkyZenith.value.setRGB(
      tod.skyZenithColor.r,
      tod.skyZenithColor.g,
      tod.skyZenithColor.b
    );
    this.oceanMat.uniforms.uSkyHorizon.value.setRGB(
      tod.skyHorizonColor.r,
      tod.skyHorizonColor.g,
      tod.skyHorizonColor.b
    );
    this.oceanMat.uniforms.uDeepColor.value.setRGB(
      tod.oceanDeepColor.r,
      tod.oceanDeepColor.g,
      tod.oceanDeepColor.b
    );
    this.oceanMat.uniforms.uShallowColor.value.setRGB(
      tod.oceanShallowColor.r,
      tod.oceanShallowColor.g,
      tod.oceanShallowColor.b
    );
    this.oceanMat.uniforms.uFogColor.value.setRGB(fogR, fogG, fogB);
    this.oceanMat.uniforms.uFogDensity.value = this.fog.density;
    this.oceanMat.uniforms.uBeaconPos.value.copy(this.lighthouse.beaconOriginWorld);
    this.oceanMat.uniforms.uBeaconDir.value.copy(beaconDir);
    this.oceanMat.uniforms.uBeaconIntensity.value = env.beaconActive
      ? env.beaconIntensity * tod.beaconProminence
      : 0;
    this.oceanMat.uniforms.uBeaconRange.value = env.beamRange;
    this.oceanMat.uniforms.uLightningFlash.value = env.lightningFlash;

    // 4. Update Island Wet Rocks, Clustered Wind-Swaying Grasses & Collision Bounds
    this.island.update({
      time: this.simTime,
      windDirX: env.windDirX,
      windDirZ: env.windDirZ,
      windStrength: env.windStrength,
      gustFactor: env.gustFactor,
      rockWetness: env.rockWetness,
      waveAmplitude: env.waveAmplitude,
      showCollisions: this.simControls.showCollisions,
    });

    // 5. Step 5-Point Boat Buoyancy Physics & Update Rowboat + Diagnostics
    const oceanParams = {
      time: this.simTime,
      amplitude: env.waveAmplitude,
      frequency: env.waveFrequency,
      waveSpeed: env.waveSpeed,
      windDirX: env.windDirX,
      windDirZ: env.windDirZ,
      windStrength: env.windStrength,
      foamIntensity: env.foamIntensity,
    };
    this.boatState = stepBoatPhysics(
      this.boatState,
      dt,
      oceanParams,
      this.simControls.buoyancyEnabled
    );
    this.boat.update(this.boatState, {
      showSamplePoints: this.simControls.showBoatSamplePoints,
      showWaterNormal: this.simControls.showWaterNormal,
    });

    // 6. Update Weather Particles (Beam-lit Rain, Localized Spray, Fog Wisps, Lightning, Birds)
    this.weatherEffects.update({
      dt,
      time: this.simTime,
      cameraPos: this.camera.position,
      windDirX: env.windDirX,
      windDirZ: env.windDirZ,
      windStrength: env.windStrength,
      gustFactor: env.gustFactor,
      rainIntensity: env.rainIntensity,
      sprayIntensity: env.sprayIntensity,
      fogDensity: env.fogDensity,
      lightningFlash: env.lightningFlash,
      showParticles: this.simControls.showParticles,
      expensiveEffects: this.simControls.expensiveEffects,
      oceanParams,
      dayFactor: tod.dayFactor,
      beaconOrigin: this.lighthouse.beaconOriginWorld,
      beaconDir,
      beaconActive: env.beaconActive && env.beaconIntensity > 0.05,
    });

    // 7. Update Camera System (5 Original Modes + 4 Architectural Inspection Presets)
    this.updateCamera(visualDt, beaconDir, oceanParams);
    this.skyMesh.position.copy(this.camera.position);

    // 8. Render Frame
    this.renderer.render(this.scene, this.camera);
    this.frameCount++;
    if (this.frameCount <= 5 || this.frameCount % 15 === 0) {
      this.container.setAttribute('data-frames', String(this.frameCount));
      this.container.setAttribute('data-software-gl', String(this.isSoftwareGl));
    }

    // 9. Throttled Telemetry Reporting (<= 5Hz)
    this.fpsAccum += rawDt;
    this.fpsFrames += 1;
    if (this.fpsAccum >= 0.45) {
      this.currentFps = Math.max(1, Math.round(this.fpsFrames / this.fpsAccum));
      this.fpsAccum = 0;
      this.fpsFrames = 0;
    }

    if (now - this.lastTelemetryTime > 240) {
      this.lastTelemetryTime = now;
      this.callbacks.onTelemetry({
        fps: this.currentFps,
        drawCalls: this.renderer.info.render.calls,
        triangles: this.renderer.info.render.triangles,
        geometries: this.renderer.info.memory.geometries,
        isSoftwareGl: this.isSoftwareGl,
        boatX: Number(this.boatState.x.toFixed(1)),
        boatZ: Number(this.boatState.z.toFixed(1)),
        boatWaveHeight: Number(this.boatState.y.toFixed(2)),
        windSpeedKts: Math.round(env.windStrength * 22),
      });
    }

    // 10. Schedule next frame safely
    if (this.isSoftwareGl) {
      this.afterDraw(this.tick);
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  private updateCamera(
    dt: number,
    beaconDir: THREE.Vector3,
    oceanParams: Parameters<typeof sampleOceanAtWorldXZ>[2]
  ) {
    const mode = this.simControls.cameraMode;
    const damp = 1 - Math.exp(-4.2 * dt);

    const ptrDamp = 1 - Math.exp(-3.2 * dt);
    this.smoothPointer.lerp(this.pointerNDC, ptrDamp);

    if (mode === 'orbit') {
      if (this.orbitTransitioning) {
        this.targetCamPos.set(-10.5, 13.5, 31.0);
        this.camera.position.lerp(this.targetCamPos, damp);
        this.controls.target.lerp(this._orbitTarget, damp);
        if (this.camera.position.distanceTo(this.targetCamPos) < 0.35) {
          this.orbitTransitioning = false;
        }
      }
      const minGroundY = Math.max(
        1.0,
        islandHeightAt(this.camera.position.x, this.camera.position.z) + 1.5
      );
      if (this.camera.position.y < minGroundY) {
        this.camera.position.y = minGroundY;
      }
      this.controls.update();
      return;
    }

    if (mode === 'cinematic') {
      const seqOffset = this.simControls.stormActive
        ? evaluateStormSequence(this.simControls.stormTime)
        : null;

      const orbitPhase =
        this.simControls.autoCinematic && !this.prefersReducedMotion
          ? Math.sin(this.simTime * 0.08) * 0.11
          : 0;
      const azOffset = orbitPhase + (seqOffset ? seqOffset.cameraAzimuthOffset : 0);
      const elevOffset =
        (this.simControls.autoCinematic && !this.prefersReducedMotion
          ? Math.sin(this.simTime * 0.1) * 0.45
          : 0) + (seqOffset ? seqOffset.cameraElevOffset : 0);
      const distOffset = seqOffset ? seqOffset.cameraDistOffset : 0;

      const px = this.smoothPointer.x * 1.3;
      const py = this.smoothPointer.y * 0.48;

      const hx = HERO_CAMERA_CONFIG.pos.x;
      const hy = HERO_CAMERA_CONFIG.pos.y;
      const hz = HERO_CAMERA_CONFIG.pos.z;
      const lx = HERO_CAMERA_CONFIG.look.x;
      const ly = HERO_CAMERA_CONFIG.look.y;
      const lz = HERO_CAMERA_CONFIG.look.z;

      const baseAngle = Math.atan2(hz - lz, hx - lx) + azOffset;
      const baseDist = Math.hypot(hx - lx, hz - lz) + distOffset;

      this.targetCamPos.set(
        lx + Math.cos(baseAngle) * baseDist + px,
        hy + elevOffset + py,
        lz + Math.sin(baseAngle) * baseDist
      );
      this.targetCamLook.set(lx + px * 0.25, ly + py * 0.25, lz);
    } else if (mode === 'ground') {
      // Lower architectural perspective near walkway & cottage porch
      const sway = Math.sin(this.simTime * 0.25) * 0.25;
      this.targetCamPos.set(11.8 + sway, 10.6, 12.6);
      this.targetCamLook.set(
        this.simControls.cutaway ? LIGHTHOUSE_POS.x : 14.8,
        this.simControls.cutaway ? 14.2 : 11.4,
        -1.0
      );
    } else if (mode === 'ocean') {
      // Low sea-level view right beside the pitching wooden rowboat looking toward the headland
      const camX = this.boatState.anchorX - 5.8;
      const camZ = this.boatState.anchorZ + 7.2;
      const waveHere = sampleOceanAtWorldXZ(camX, camZ, oceanParams);
      this.targetCamPos.set(
        camX + Math.sin(this.simTime * 0.22) * 0.7,
        Math.max(2.1, waveHere.y + 2.2),
        camZ
      );
      this.targetCamLook.set(
        (this.boatState.x + LIGHTHOUSE_POS.x) * 0.42,
        6.2,
        (this.boatState.z + LIGHTHOUSE_POS.z) * 0.35
      );
    } else if (mode === 'beacon') {
      const bOrigin = this.lighthouse.beaconOriginWorld;
      this.targetCamPos.set(
        bOrigin.x + beaconDir.x * 2.85,
        bOrigin.y + 0.25,
        bOrigin.z + beaconDir.z * 2.85
      );
      this._beaconLook.set(
        bOrigin.x + beaconDir.x * 48,
        bOrigin.y - 4.8,
        bOrigin.z + beaconDir.z * 48
      );
      this.targetCamLook.copy(this._beaconLook);
    } else if (mode === 'front') {
      // Direct architectural front view highlighting clear gap & walkway between tower and cottage
      this.targetCamPos.set(14.6, 12.2, 20.5);
      this.targetCamLook.set(14.6, 11.4, -1.4);
    } else if (mode === 'side') {
      // Western side profile inspection across tower, walkway saddle, and cottage
      this.targetCamPos.set(-6.5, 13.0, -0.8);
      this.targetCamLook.set(14.8, 10.8, -1.2);
    } else if (mode === 'elevated') {
      // Elevated three-quarter architectural overview framing full tower spire + separated cottage
      this.targetCamPos.set(-1.5, 27.5, 29.5);
      this.targetCamLook.set(14.8, 12.2, -0.6);
    } else if (mode === 'topdown') {
      // High top-down architectural plan view clearly framing both Box3 helpers & walkway continuity
      const midX = (LIGHTHOUSE_POS.x + COTTAGE_POS.x) * 0.5;
      const midZ = (LIGHTHOUSE_POS.z + COTTAGE_POS.z) * 0.5;
      this.targetCamPos.set(midX, 49.5, midZ + 7.5);
      this.targetCamLook.set(midX, 8.2, midZ + 0.8);
    }

    // Clamp non-beacon cameras safely above terrain & waves
    if (mode !== 'beacon') {
      const groundFloor = Math.max(
        1.2,
        islandHeightAt(this.targetCamPos.x, this.targetCamPos.z) + 1.5
      );
      if (this.targetCamPos.y < groundFloor) {
        this.targetCamPos.y = groundFloor;
      }
    }

    this.camera.position.lerp(this.targetCamPos, damp);
    this.currentCamLook.lerp(this.targetCamLook, damp);
    this.camera.lookAt(this.currentCamLook);
  }

  public dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);

    window.removeEventListener('resize', this.boundResize);
    this.renderer.domElement.removeEventListener(
      'pointermove',
      this.boundPointerMove
    );
    this.renderer.domElement.removeEventListener(
      'pointerdown',
      this.boundPointerDown
    );
    this.renderer.domElement.removeEventListener(
      'webglcontextlost',
      this.boundContextLost
    );

    this.controls.dispose();
    this.lighthouse.dispose();
    this.island.dispose();
    this.boat.dispose();
    this.weatherEffects.dispose();
    this.textures.dispose();
    this.oceanMesh.geometry.dispose();
    this.oceanMat.dispose();
    this.skyMesh.geometry.dispose();
    this.skyMat.dispose();
    this.waterTargetRing.geometry.dispose();
    (this.waterTargetRing.material as THREE.Material).dispose();
    this.envRT.dispose();
    this.renderer.dispose();

    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
