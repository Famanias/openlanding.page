import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { Atmosphere } from "../logic/atmosphere";
import type { StageRect } from "./director";
export const isSoftwareGL = (name: string) =>
  /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(name);
export function createWorldRenderer(host: HTMLElement, onLost: () => void) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  const gl = renderer.getContext(),
    ext = gl.getExtension("WEBGL_debug_renderer_info");
  const gpu = ext
    ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
    : "Software";
  const software = isSoftwareGL(gpu);
  renderer.setPixelRatio(software ? 0.85 : Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !software;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.info.autoReset = false;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#F4ECDD");
  scene.fog = new THREE.FogExp2("#F4ECDD", 0.012);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.025, 180);
  const key = new THREE.DirectionalLight("#F4ECDD", 3);
  key.castShadow = !software;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -4.5,
    right: 4.5,
    top: 4.5,
    bottom: -4.5,
    near: 0.1,
    far: 28,
  });
  key.shadow.normalBias = 0.018;
  key.shadow.bias = -0.0001;
  const hemi = new THREE.HemisphereLight("#F4ECDD", "#B8923A", 0.8),
    rim = new THREE.DirectionalLight("#F2B8C6", 1),
    accent = new THREE.PointLight("#B8923A", 2, 15, 2);
  scene.add(key, key.target, hemi, rim, accent);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color("#2B3A55");
  const envGeo = new THREE.BoxGeometry(1, 1, 1),
    envMat = new THREE.MeshBasicMaterial({ color: "#F4ECDD" });
  for (let i = 0; i < 3; i++) {
    const panel = new THREE.Mesh(envGeo, envMat);
    panel.position.set(i ? 4 : -4, 3, i === 2 ? -4 : 1);
    panel.scale.set(3, 5, 2);
    envScene.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer),
    environment = pmrem.fromScene(envScene, 0.1);
  scene.environment = environment.texture;
  pmrem.dispose();
  envGeo.dispose();
  envMat.dispose();
  let composer: EffectComposer | null = null,
    bloom: UnrealBloomPass | null = null,
    cinematic: ShaderPass | null = null;
  if (!software) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.4, 0.92);
    composer.addPass(bloom);
    cinematic = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uInspectStrength: { value: 0 },
        uPaperLit: { value: 1 },
        uVignette: { value: 0.1 },
        uGrain: { value: 0.018 },
        uLensBlur: { value: 0.0022 },
        uFocus: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader:
        "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: `uniform sampler2D tDiffuse;uniform float uTime,uInspectStrength,uPaperLit,uVignette,uGrain,uLensBlur;uniform vec2 uFocus;varying vec2 vUv;
   void main(){float dist=length(vUv-uFocus);float r=smoothstep(.22,.68,dist)*(uLensBlur+uInspectStrength*.0032);vec3 c=texture2D(tDiffuse,vUv).rgb*.4;
   c+=(texture2D(tDiffuse,vUv+vec2(r,0.)).rgb+texture2D(tDiffuse,vUv-vec2(r,0.)).rgb+texture2D(tDiffuse,vUv+vec2(0.,r)).rgb+texture2D(tDiffuse,vUv-vec2(0.,r)).rgb)*.15;
   c*=1.-smoothstep(.20,.65,dist)*uInspectStrength*mix(.52,.08,uPaperLit);c*=1.-smoothstep(.25,.8,dist)*uVignette;
   float n=fract(sin(dot(vUv+uTime*.001,vec2(12.9898,78.233)))*43758.5453)-.5;c+=n*uGrain;c=c/(1.+max(c-vec3(1.2),vec3(0.))*.12);gl_FragColor=vec4(max(c,vec3(0.)),1.);}`,
    });
    composer.addPass(cinematic);
    composer.addPass(new OutputPass());
  }
  const lost = (e: Event) => {
    e.preventDefault();
    onLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  let width = 1,
    height = 1;
  return {
    renderer,
    scene,
    camera,
    software,
    gpu,
    key,
    hemi,
    rim,
    resize(w: number, h: number) {
      width = w;
      height = h;
      renderer.setSize(w, h, false);
      composer?.setSize(w, h);
    },
    projectSlot(rect: StageRect) {
      camera.setViewOffset(
        rect.width,
        rect.height,
        -rect.left,
        -rect.top,
        width,
        height,
      );
      cinematic?.uniforms.uFocus.value.set(
        (rect.left + rect.width / 2) / width,
        1 - (rect.top + rect.height / 2) / height,
      );
    },
    apply(a: Atmosphere, elapsed: number, inspect: number, paperLit: number) {
      (scene.background as THREE.Color).fromArray(a.background);
      const fog = scene.fog as THREE.FogExp2;
      fog.color.fromArray(a.fogColor);
      fog.density = a.fogDensity;
      renderer.toneMappingExposure = a.exposure;
      scene.environmentIntensity = a.envIntensity;
      key.color.fromArray(a.key.color);
      key.intensity = a.key.intensity;
      key.position.fromArray(a.key.position);
      key.target.position.fromArray(a.key.target);
      hemi.color.fromArray(a.hemi.sky);
      hemi.groundColor.fromArray(a.hemi.ground);
      hemi.intensity = a.hemi.intensity;
      rim.color.fromArray(a.rim.color);
      rim.intensity = a.rim.intensity;
      rim.position.fromArray(a.rim.position);
      accent.color.fromArray(a.accent.color);
      accent.intensity = a.accent.intensity;
      accent.position.fromArray(a.accent.position);
      if (bloom) bloom.strength = a.bloomStrength;
      if (cinematic) {
        const u = cinematic.uniforms;
        u.uTime.value = elapsed;
        u.uInspectStrength.value = inspect;
        u.uPaperLit.value = paperLit;
        u.uVignette.value = a.vignette;
        u.uGrain.value = a.grain;
        u.uLensBlur.value = a.lensBlur;
      }
    },
    render() {
      renderer.info.reset();
      if (composer) composer.render();
      else renderer.render(scene, camera);
    },
    warm() {
      if (!software) renderer.compile(scene, camera);
    },
    dispose() {
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      composer?.passes.forEach((p) => p.dispose());
      composer?.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
