import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { computeSunlightState } from '../logic/chapters';

export interface RendererStack {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer | null;
  bloomPass: UnrealBloomPass | null;
  cinematicPass: ShaderPass | null;
  isSoftwareGl: boolean;
  lights: {
    keyLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    rimLight: THREE.DirectionalLight;
    foxfirePointLight: THREE.PointLight;
  };
  setInspectVisualState: (inspectStrength: number) => void;
  setAtmosphereAtProgress: (
    undergroundFactor: number,
    networkGrowth: number,
    elapsedSec: number,
    trayReveal?: number,
    sunlight?: number,
    studioLightness?: number,
  ) => void;
  resize: (width: number, height: number) => void;
  renderFrame: () => void;
  dispose: () => void;
}

/**
 * Checks whether WebGL2 is supported in window without creating a test canvas.
 */
export function isWebGLAvailable(): boolean {
  return typeof window !== 'undefined' && 'WebGL2RenderingContext' in window;
}

/**
 * Initializes the Three.js WebGLRenderer, subtle studio PBR environment,
 * calibrated low-key natural-history specimen lighting rig, exponential fog,
 * and high-threshold post-processing stack (so only subterranean foxfire threads bloom,
 * and above-ground specimens never clip to white).
 */
export function createRendererAndPostStack(container: HTMLElement): RendererStack {
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });

  const gl = renderer.getContext();
  const isSoftwareGl = (() => {
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  })();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Low-key natural-history specimen exposure: prevents any cream surface from blowing out to white
  renderer.toneMappingExposure = 0.78;
  renderer.setPixelRatio(isSoftwareGl ? 0.85 : Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const baseBgColor = new THREE.Color('#080604');
  scene.background = baseBgColor.clone();
  scene.fog = new THREE.FogExp2('#080604', 0.082);

  // Subtle PBR environment reflection map (kept low at 0.14 above ground, boosted in Ch 5 product studio)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.14;
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
  camera.position.set(0, 1.92, 5.45);
  camera.lookAt(0, 1.85, 0);

  // 1. Soft warm key light from upper-left (natural forest shaft above ground, product studio key in Ch 5)
  const keyLight = new THREE.DirectionalLight('#f2cfa6', 1.25);
  keyLight.position.set(-3.8, 6.2, 3.8);
  keyLight.target.position.set(0, 1.6, 0);
  scene.add(keyLight.target);
  keyLight.castShadow = !isSoftwareGl;
  keyLight.shadow.mapSize.set(1024, 1024);
  const d = 4.5;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 20;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  // 2. Gentle cool-olive / dark-loam fill light (transitions to warm studio bounce in Ch 5)
  const hemiLight = new THREE.HemisphereLight('#697364', '#120d09', 0.28);
  scene.add(hemiLight);

  // 3. Subtle warm rim light for specimen edge separation
  const rimLight = new THREE.DirectionalLight('#e6cfb2', 0.28);
  rimLight.position.set(3.2, 3.8, -4.2);
  rimLight.target.position.set(0, 1.5, 0);
  scene.add(rimLight.target);
  scene.add(rimLight);

  // 4. Subterranean Foxfire PointLight (active only underground in Ch 3-4, fades completely to 0 in Ch 5 studio)
  const foxfirePointLight = new THREE.PointLight('#b8dc3c', 0, 14, 1.9);
  foxfirePointLight.position.set(0, -2.5, 0.8);
  scene.add(foxfirePointLight);

  // Post-processing stack on hardware GPUs
  let composer: EffectComposer | null = null;
  let bloomPass: UnrealBloomPass | null = null;
  let cinematicPass: ShaderPass | null = null;

  if (!isSoftwareGl) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // High threshold (0.92) so ONLY bioluminescent threads/pulses (> 1.0) bloom, never cream specimens
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width / 2, height / 2),
      0.0, // strength (0 above ground, ramps up only underground, 0 in Ch 5 studio)
      0.35, // radius
      0.92, // threshold
    );
    composer.addPass(bloomPass);

    const CinematicShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uInspectStrength: { value: 0 },
        uStudioLightness: { value: 0 },
        uVignetteDarkness: { value: 0.46 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uInspectStrength;
        uniform float uStudioLightness;
        uniform float uVignetteDarkness;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 centerOffset = vUv - vec2(0.5);
          float dist = length(centerOffset);

          // Shallow peripheral lens blur (intensifies slightly when Hold-to-Inspect is active or on peripheral studio sweep)
          float blurRadius = (smoothstep(0.22, 0.68, dist) * (0.0022 + uInspectStrength * 0.0032));
          vec4 col = texture2D(tDiffuse, vUv);
          if (blurRadius > 0.0002) {
            col += texture2D(tDiffuse, vUv + vec2(blurRadius, 0.0));
            col += texture2D(tDiffuse, vUv - vec2(blurRadius, 0.0));
            col += texture2D(tDiffuse, vUv + vec2(0.0, blurRadius));
            col += texture2D(tDiffuse, vUv - vec2(0.0, blurRadius));
            col *= 0.2;
          }

          // Dim peripheral background during Hold-to-Inspect in dark scenes, but keep the Ch 5 studio sweep light & airy
          float dimAmount = mix(0.52, 0.08, uStudioLightness);
          float inspectDim = 1.0 - smoothstep(0.20, 0.65, dist) * uInspectStrength * dimAmount;
          col.rgb *= inspectDim;

          // Subtle natural vignette (much lighter in the Ch 5 product studio so corners stay warm cream/sand)
          float effectiveVig = uVignetteDarkness * (1.0 - uStudioLightness * 0.78);
          float vig = smoothstep(0.84, 0.22, dist * (0.85 + effectiveVig * 0.35));
          col.rgb *= mix(1.0 - effectiveVig, 1.0, vig);

          // Fine organic film grain
          float grain = (hash(vUv * 420.0 + fract(uTime * 3.7)) - 0.5) * 0.018;
          col.rgb += grain;

          // Soft highlight roll-off so no pixel ever clips to harsh 1.0 pure white
          col.rgb = min(col.rgb, vec3(0.95));

          gl_FragColor = vec4(max(vec3(0.0), col.rgb), col.a);
        }
      `,
    };

    cinematicPass = new ShaderPass(CinematicShader);
    composer.addPass(cinematicPass);
  }

  const surfaceColor = new THREE.Color('#080604');
  const soilDescentBgColor = new THREE.Color('#17100a');
  const subterraneanColor = new THREE.Color('#050403');
  const studioSweepBgColor = new THREE.Color('#e6dccb');
  const studioLightColor = new THREE.Color('#fff7ea');
  const sunLightColor = new THREE.Color('#f7e7ce');
  const forestHemiSky = new THREE.Color('#697364');
  const forestHemiGround = new THREE.Color('#120d09');
  const studioHemiSky = new THREE.Color('#fffdf7');
  const studioHemiGround = new THREE.Color('#e2d6c3');
  const workColor = new THREE.Color();

  const setAtmosphereAtProgress = (
    undergroundFactor: number,
    networkGrowth: number,
    elapsedSec: number,
    trayReveal = 0,
    sunlight = 0.75,
    studioLightness?: number,
  ) => {
    const sunState = computeSunlightState(sunlight);
    const studioLit = studioLightness !== undefined ? studioLightness : trayReveal;
    const wideNetworkDim = Math.max(0, Math.min(1, (networkGrowth - 0.22) / 0.55));
    const isSoilDescentOrPocket =
      undergroundFactor * (1 - wideNetworkDim) * (1 - Math.max(trayReveal, studioLit));

    surfaceColor.setRGB(
      sunState.surfaceBgRgb[0],
      sunState.surfaceBgRgb[1],
      sunState.surfaceBgRgb[2],
    );
    workColor
      .copy(surfaceColor)
      .lerp(subterraneanColor, undergroundFactor)
      .lerp(soilDescentBgColor, isSoilDescentOrPocket * 0.85)
      .lerp(studioSweepBgColor, studioLit);

    (scene.background as THREE.Color).copy(workColor);
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(workColor);
      // Keep fog light during the close-up soil cross-section descent and very light in the Ch 5 studio
      const baseFog =
        0.072 -
        undergroundFactor * 0.036 -
        isSoilDescentOrPocket * 0.018;
      scene.fog.density = baseFog * (1 - studioLit) + 0.012 * studioLit;
    }

    // Dynamically balance toneMappingExposure:
    // - Above ground responds to sunlight slider
    // - Subterranean stays low-key
    // - Chapter 5 product studio lifts to 1.06 with boosted environment reflection so the cream tray & glass flacon look luminous without clipping
    const subterraneanExposure =
      0.82 * isSoilDescentOrPocket + 0.78 * (1 - isSoilDescentOrPocket);
    const baseExposure =
      sunState.toneMappingExposure * (1 - undergroundFactor) +
      subterraneanExposure * undergroundFactor;
    renderer.toneMappingExposure = baseExposure * (1 - studioLit) + 1.06 * studioLit;
    scene.environmentIntensity = 0.14 * (1 - studioLit) + 0.58 * studioLit;

    // Above ground (Ch 1, 2, 6): sun intensity and color temperature respond to the Sunlight / Time-of-Day slider.
    // Underground Ch 3 & Ch 4a: warm filtering daylight + specimen key light (1.32).
    // Underground Ch 4b wide network: key light dims so Foxfire glow is the primary light.
    // Chapter 5 (studioLit -> 1): soft large studio key light (2.05) from upper-left aimed at the tray at [0, -5.45, 0].
    const surfaceKey = 1.28 * sunState.sunIntensityMultiplier * (1 - undergroundFactor);
    const subterraneanSpecimenKey =
      undergroundFactor *
      (1 - wideNetworkDim * 0.84) *
      (1 - Math.max(trayReveal, studioLit)) *
      1.32;
    const trayStudioKey = Math.max(trayReveal * 1.15, studioLit * 2.05);
    keyLight.intensity = surfaceKey + subterraneanSpecimenKey + trayStudioKey;

    sunLightColor.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    keyLight.color
      .copy(sunLightColor)
      .lerp(studioLightColor, Math.max(undergroundFactor * 0.65, studioLit));

    const inTrayZone = Math.max(trayReveal, studioLit);
    const targetY =
      1.6 * (1 - undergroundFactor) +
      (-1.95 * (1 - inTrayZone) + -5.42 * inTrayZone) * undergroundFactor;

    // Arc the directional sun across the sky above ground; position soft upper-left studio key in Ch 5
    const sunX =
      sunState.sunOffset[0] * (1 - undergroundFactor) +
      (-2.8 * (1 - studioLit) + -3.6 * studioLit) * undergroundFactor;
    const sunY =
      (targetY + sunState.sunOffset[1]) * (1 - undergroundFactor) +
      (targetY + 4.4) * undergroundFactor;
    const sunZ =
      sunState.sunOffset[2] * (1 - undergroundFactor) +
      (4.8 * (1 - studioLit) + 4.2 * studioLit) * undergroundFactor;

    keyLight.position.set(sunX, sunY, sunZ);
    keyLight.target.position.set(0, targetY, 0);
    keyLight.target.updateMatrixWorld();

    const surfaceRimMult =
      sunState.rimIntensityMultiplier * (1 - undergroundFactor) +
      undergroundFactor;
    rimLight.intensity =
      0.36 * surfaceRimMult * (1 - undergroundFactor * 0.25) * (1 - studioLit) +
      0.78 * studioLit;
    rimLight.color.copy(sunLightColor).lerp(studioLightColor, 0.5 + undergroundFactor * 0.5);
    rimLight.position.set(3.2, targetY + 2.4, -3.2);
    rimLight.target.position.set(0, targetY, 0);
    rimLight.target.updateMatrixWorld();

    hemiLight.color.copy(forestHemiSky).lerp(studioHemiSky, studioLit);
    hemiLight.groundColor.copy(forestHemiGround).lerp(studioHemiGround, studioLit);
    const surfaceAmbientMult =
      sunState.ambientIntensityMultiplier * (1 - undergroundFactor) +
      undergroundFactor;
    const baseHemi =
      0.34 *
      surfaceAmbientMult *
      (1 + isSoilDescentOrPocket * 0.55 - undergroundFactor * 0.2);
    hemiLight.intensity = baseHemi * (1 - studioLit) + 1.15 * studioLit;

    // Foxfire point light activates in late Ch 3 / Ch 4, and fades out completely (to 0) once the Ch 5 studio is lit
    foxfirePointLight.position.set(0, -2.15, 2.2);
    const earlyPocketFoxfire = Math.min(1, networkGrowth / 0.14) * 0.38;
    const studioFoxfireCutoff = Math.max(0, 1 - Math.max(trayReveal, studioLit) * 1.25);
    foxfirePointLight.intensity =
      undergroundFactor *
      Math.max(earlyPocketFoxfire, wideNetworkDim * 0.48) *
      studioFoxfireCutoff;

    if (bloomPass) {
      // Bloom is OFF above ground and OFF in the lit Ch 5 studio; active only underground for threads/pulses
      bloomPass.strength = undergroundFactor * 0.42 * studioFoxfireCutoff;
    }
    if (cinematicPass) {
      cinematicPass.uniforms.uTime.value = elapsedSec;
      cinematicPass.uniforms.uStudioLightness.value = studioLit;
    }
  };

  const setInspectVisualState = (inspectStrength: number) => {
    if (cinematicPass) {
      cinematicPass.uniforms.uInspectStrength.value = inspectStrength;
    }
  };

  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (composer) {
      composer.setSize(w, h);
    }
  };

  const renderFrame = () => {
    if (isSoftwareGl || !composer) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }
  };

  const dispose = () => {
    renderer.dispose();
  };

  return {
    renderer,
    scene,
    camera,
    composer,
    bloomPass,
    cinematicPass,
    isSoftwareGl,
    lights: {
      keyLight,
      hemiLight,
      rimLight,
      foxfirePointLight,
    },
    setInspectVisualState,
    setAtmosphereAtProgress,
    resize,
    renderFrame,
    dispose,
  };
}
