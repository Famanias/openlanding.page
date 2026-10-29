import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { computeSunlightState, DEFAULT_SUNLIGHT } from '../logic/chapters';

export interface RendererStack {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer;
  bloomPass: UnrealBloomPass;
  cinematicPass: ShaderPass;
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
 * and above-ground or Chapter 05 specimens never clip to white).
 */
export function createRendererAndPostStack(container: HTMLElement): RendererStack {
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.78;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const baseBgColor = new THREE.Color('#1c150e');
  scene.background = baseBgColor.clone();
  scene.fog = new THREE.FogExp2('#1c150e', 0.052);

  // Subtle PBR environment reflection map (kept low so matte specimens never wash out)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.15;
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
  camera.position.set(0, 1.92, 5.45);
  camera.lookAt(0, 1.85, 0);

  // 1. Soft warm key light from upper-left (natural forest sun/moon above ground, fixed studio key in Ch 5)
  const keyLight = new THREE.DirectionalLight('#ffbe6b', 1.25);
  keyLight.position.set(-3.8, 6.2, 3.8);
  keyLight.target.position.set(0, 1.6, 0);
  scene.add(keyLight.target);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  const d = 5.5;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  // 2. Canopy sky / forest loam fill light (transitions to fixed studio bounce in Ch 5)
  const hemiLight = new THREE.HemisphereLight('#786852', '#261c13', 0.42);
  scene.add(hemiLight);

  // 3. Subtle rim light for specimen edge separation
  const rimLight = new THREE.DirectionalLight('#e6cfb2', 0.30);
  rimLight.position.set(3.2, 3.8, -4.2);
  rimLight.target.position.set(0, 1.5, 0);
  scene.add(rimLight.target);
  scene.add(rimLight);

  // 4. Subterranean Foxfire PointLight (active only underground in Ch 3-4, fades completely to 0 in Ch 5 studio)
  const foxfirePointLight = new THREE.PointLight('#b8dc3c', 0, 18, 1.7);
  foxfirePointLight.position.set(0, -2.5, 0.8);
  scene.add(foxfirePointLight);

  // Post-processing stack
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  // High threshold (0.94) so ONLY bioluminescent threads/pulses (> 1.0) bloom, never cream specimens
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width / 2, height / 2),
    0.0, // strength (0 above ground, ramps up only underground, 0 in Ch 5 studio)
    0.35, // radius
    0.94, // threshold
  );
  composer.addPass(bloomPass);

  const CinematicShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uInspectStrength: { value: 0 },
      uStudioLightness: { value: 0 },
      uVignetteDarkness: { value: 0.36 },
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

        // Shallow depth-of-field peripheral blur so background trees and studio supporting pieces stay softly out of focus
        float blurRadius = smoothstep(0.24, 0.70, dist) * (0.0024 + uInspectStrength * 0.0030);
        vec4 col = texture2D(tDiffuse, vUv);
        if (blurRadius > 0.0002) {
          col += texture2D(tDiffuse, vUv + vec2(blurRadius, 0.0));
          col += texture2D(tDiffuse, vUv - vec2(blurRadius, 0.0));
          col += texture2D(tDiffuse, vUv + vec2(0.0, blurRadius));
          col += texture2D(tDiffuse, vUv - vec2(0.0, blurRadius));
          col *= 0.2;
        }

        // Dim peripheral background during Hold-to-Inspect in forest/underground scenes, keep studio sweep calm
        float dimAmount = mix(0.45, 0.06, uStudioLightness);
        float inspectDim = 1.0 - smoothstep(0.22, 0.66, dist) * uInspectStrength * dimAmount;
        col.rgb *= inspectDim;

        // Subtle natural vignette (lighter in the Ch 5 product studio so corners stay warm sand)
        float effectiveVig = uVignetteDarkness * (1.0 - uStudioLightness * 0.72);
        float vig = smoothstep(0.86, 0.20, dist * (0.82 + effectiveVig * 0.32));
        col.rgb *= mix(1.0 - effectiveVig, 1.0, vig);

        // Fine organic film grain
        float grain = (hash(vUv * 420.0 + fract(uTime * 3.7)) - 0.5) * 0.015;
        col.rgb += grain;

        // Soft highlight roll-off so no pixel ever clips to harsh 1.0 pure white
        col.rgb = min(col.rgb, vec3(0.92));

        gl_FragColor = vec4(max(vec3(0.0), col.rgb), col.a);
      }
    `,
  };

  const cinematicPass = new ShaderPass(CinematicShader);
  composer.addPass(cinematicPass);

  const surfaceColor = new THREE.Color();
  const subterraneanColor = new THREE.Color();
  const soilDescentBgColor = new THREE.Color();
  const studioSweepBgColor = new THREE.Color('#d6cfc3');
  const studioLightColor = new THREE.Color('#fff6e8');
  const studioRimColor = new THREE.Color('#f5ebd9');
  const sunLightColor = new THREE.Color();
  const forestHemiSky = new THREE.Color();
  const forestHemiGround = new THREE.Color();
  const studioHemiSky = new THREE.Color('#f0e8da');
  const studioHemiGround = new THREE.Color('#c7baa5');
  const workColor = new THREE.Color();

  const setAtmosphereAtProgress = (
    undergroundFactor: number,
    networkGrowth: number,
    elapsedSec: number,
    trayReveal = 0,
    sunlight = DEFAULT_SUNLIGHT,
    studioLightness?: number,
  ) => {
    const sunState = computeSunlightState(sunlight);
    const studioLit = Math.max(
      0,
      Math.min(1, studioLightness !== undefined ? studioLightness : trayReveal),
    );
    const wideNetworkDim = Math.max(0, Math.min(1, (networkGrowth - 0.22) / 0.55));
    const isSoilDescentOrPocket =
      undergroundFactor * (1 - wideNetworkDim) * (1 - Math.max(trayReveal, studioLit));

    surfaceColor.setRGB(
      sunState.surfaceBgRgb[0],
      sunState.surfaceBgRgb[1],
      sunState.surfaceBgRgb[2],
    );
    subterraneanColor.setRGB(
      sunState.undergroundFogRgb[0],
      sunState.undergroundFogRgb[1],
      sunState.undergroundFogRgb[2],
    );
    soilDescentBgColor.setRGB(
      sunState.undergroundFogRgb[0] * 1.15 + 0.02,
      sunState.undergroundFogRgb[1] * 1.12 + 0.015,
      sunState.undergroundFogRgb[2] * 1.08 + 0.01,
    );

    // Non-studio background blends smoothly from forest surface to earthen underground (never pure black);
    // Studio background is locked to fixed studioSweepBgColor when studioLit == 1.
    workColor
      .copy(surfaceColor)
      .lerp(subterraneanColor, undergroundFactor)
      .lerp(soilDescentBgColor, isSoilDescentOrPocket * 0.65)
      .lerp(studioSweepBgColor, studioLit);

    (scene.background as THREE.Color).copy(workColor);
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(workColor);
      // Light atmospheric fog in the forest and wide underground earth; very low in the Ch 05 studio
      const forestFog = 0.046 - sunState.sunlight * 0.012;
      const undergroundFog = 0.036 - sunState.undergroundDaylightFactor * 0.008;
      const nonStudioFog =
        forestFog * (1 - undergroundFactor) +
        undergroundFog * undergroundFactor -
        isSoilDescentOrPocket * 0.012;
      scene.fog.density = nonStudioFog * (1 - studioLit) + 0.010 * studioLit;
    }

    // ToneMappingExposure:
    // - Chapters 01-04 & 06 respond to the time-of-day slider (Night 0.68 -> Morning 0.85 -> Midday 1.02)
    // - Chapter 05 Studio is locked to a calm 0.92 exposure: bright enough that the tray reads cream, not khaki
    const undergroundExp = 0.74 + sunState.undergroundDaylightFactor * 0.24;
    const nonStudioExposure =
      sunState.toneMappingExposure * (1 - undergroundFactor) +
      undergroundExp * undergroundFactor;
    renderer.toneMappingExposure = nonStudioExposure * (1 - studioLit) + 0.92 * studioLit;
    scene.environmentIntensity = (0.14 + sunState.sunlight * 0.08) * (1 - studioLit) + 0.18 * studioLit;

    // Directional Key Light:
    // - Above ground (Ch 1, 2, 6): scales strongly with slider (Night moonlit 0.42 -> Morning golden 1.38 -> Midday bright 2.15)
    // - Underground (Ch 3 & Ch 4): daylight filtering down from above (dimmer with depth, follows slider)
    // - Chapter 05 Studio (studioLit == 1): locked to fixed 1.08 intensity and fixed '#fff6e8' color (independent of slider)
    const surfaceKey = 1.32 * sunState.sunIntensityMultiplier * (1 - undergroundFactor);
    const undergroundFilteringKey =
      undergroundFactor *
      (0.45 + 1.05 * sunState.undergroundDaylightFactor) *
      (1 - wideNetworkDim * 0.35);
    const nonStudioKeyIntensity = surfaceKey + undergroundFilteringKey;
    const fixedStudioKeyIntensity = 1.08;
    keyLight.intensity =
      nonStudioKeyIntensity * (1 - studioLit) + fixedStudioKeyIntensity * studioLit;

    sunLightColor.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    keyLight.color.copy(sunLightColor).lerp(studioLightColor, studioLit);

    const inTrayZone = Math.max(trayReveal, studioLit);
    const nonStudioTargetY =
      1.6 * (1 - undergroundFactor) +
      (-1.95 * (1 - inTrayZone) + -5.42 * inTrayZone) * undergroundFactor;
    const studioTargetY = -5.42;
    const targetY = nonStudioTargetY * (1 - studioLit) + studioTargetY * studioLit;

    const nonStudioSunX =
      sunState.sunOffset[0] * (1 - undergroundFactor) +
      (sunState.sunOffset[0] * 0.55 - 1.4) * undergroundFactor;
    const nonStudioSunY =
      (nonStudioTargetY + sunState.sunOffset[1]) * (1 - undergroundFactor) +
      (nonStudioTargetY + 4.8) * undergroundFactor;
    const nonStudioSunZ =
      sunState.sunOffset[2] * (1 - undergroundFactor) + 4.6 * undergroundFactor;

    // Fixed studio key position at (-3.6, -1.02, 4.2) when studioLit == 1
    const nextKeyX = nonStudioSunX * (1 - studioLit) + -3.6 * studioLit;
    const nextKeyY = nonStudioSunY * (1 - studioLit) + (studioTargetY + 4.4) * studioLit;
    const nextKeyZ = nonStudioSunZ * (1 - studioLit) + 4.2 * studioLit;
    if (
      Math.abs(keyLight.position.x - nextKeyX) > 0.02 ||
      Math.abs(keyLight.position.y - nextKeyY) > 0.02 ||
      Math.abs(keyLight.target.position.y - targetY) > 0.02
    ) {
      renderer.shadowMap.needsUpdate = true;
    }
    keyLight.position.set(nextKeyX, nextKeyY, nextKeyZ);
    keyLight.target.position.set(0, targetY, 0);
    keyLight.target.updateMatrixWorld();

    // Rim Light: follows slider in Ch 1-4 & 6; locked to 0.26 in Ch 5 studio
    const nonStudioRimIntensity =
      0.34 *
      sunState.rimIntensityMultiplier *
      (1 - undergroundFactor * 0.22);
    rimLight.intensity = nonStudioRimIntensity * (1 - studioLit) + 0.26 * studioLit;
    rimLight.color.copy(sunLightColor).lerp(studioRimColor, studioLit);
    rimLight.position.set(3.2, targetY + 2.4, -3.2);
    rimLight.target.position.set(0, targetY, 0);
    rimLight.target.updateMatrixWorld();

    // Hemisphere Fill Light: follows slider in Ch 1-4 & 6; locked to 0.48 in Ch 5 studio
    forestHemiSky.setRGB(
      sunState.hemiSkyRgb[0],
      sunState.hemiSkyRgb[1],
      sunState.hemiSkyRgb[2],
    );
    forestHemiGround.setRGB(
      sunState.hemiGroundRgb[0],
      sunState.hemiGroundRgb[1],
      sunState.hemiGroundRgb[2],
    );
    hemiLight.color.copy(forestHemiSky).lerp(studioHemiSky, studioLit);
    hemiLight.groundColor.copy(forestHemiGround).lerp(studioHemiGround, studioLit);

    const nonStudioHemiIntensity =
      0.42 *
      sunState.ambientIntensityMultiplier *
      (1 - undergroundFactor * 0.18 + isSoilDescentOrPocket * 0.25);
    hemiLight.intensity = nonStudioHemiIntensity * (1 - studioLit) + 0.48 * studioLit;

    // Subterranean Foxfire PointLight: strongest at Night (sunState.foxfireGlowMultiplier),
    // illuminates the surrounding earth in Ch 4, and fades out completely (to 0) in Ch 5 studio
    foxfirePointLight.position.set(0, -2.25, 1.8);
    const earlyPocketFoxfire = Math.min(1, networkGrowth / 0.14) * 0.55;
    const studioFoxfireCutoff = Math.max(0, 1 - Math.max(trayReveal, studioLit) * 1.35);
    foxfirePointLight.intensity =
      undergroundFactor *
      Math.max(earlyPocketFoxfire, wideNetworkDim * 1.15) *
      sunState.foxfireGlowMultiplier *
      studioFoxfireCutoff;

    // Bloom is OFF above ground and OFF in the lit Ch 5 studio; active only underground for threads/pulses
    bloomPass.strength =
      undergroundFactor *
      0.38 *
      Math.min(1.25, sunState.foxfireGlowMultiplier) *
      studioFoxfireCutoff;

    cinematicPass.uniforms.uTime.value = elapsedSec;
    cinematicPass.uniforms.uStudioLightness.value = studioLit;
  };

  const setInspectVisualState = (inspectStrength: number) => {
    cinematicPass.uniforms.uInspectStrength.value = inspectStrength;
  };

  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  };

  const renderFrame = () => {
    composer.render();
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
