import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { NOISE } from "./glsl";
import type { Weights, WorldCtx } from "./types";

/**
 * The finishing passes: a soft bloom (moon, plankton, the ring), the ink melt that bleeds the third low tide's
 * headline as you arrive and resolves when you stop, then grain and a vignette.
 */
const InkGrainShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uMelt: { value: 0 }, uGrain: { value: 0.035 }, uRes: { value: new THREE.Vector2(1, 1) } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uMelt; uniform float uGrain; uniform vec2 uRes;
    varying vec2 vUv;
    ${NOISE}
    void main() {
      vec2 uv = vUv;
      // ink in water: a slow domain warp plus drips that run down from the headline band
      float band = smoothstep(0.25, 0.5, uv.y) * smoothstep(0.85, 0.55, uv.y);
      vec2 warp = vec2(lt_fbm(uv * vec2(3.0, 6.0) + vec2(0.0, -uTime * 0.15)) - 0.5,
                       lt_fbm(uv * 4.0 + 7.0 + uTime * 0.1) - 0.5) * 0.07 * uMelt;
      warp.y += uMelt * band * 0.05 * lt_noise(vec2(uv.x * 38.0, uTime * 0.25));
      vec4 c = texture2D(tDiffuse, uv + warp);
      vec4 b = texture2D(tDiffuse, uv + warp * 2.2);
      c.rgb = mix(c.rgb, max(c.rgb, b.rgb) * 0.92, uMelt * band * 0.7);
      float v = smoothstep(1.2, 0.35, length((uv - 0.5) * vec2(1.25, 1.0)) * 1.35);
      c.rgb *= mix(0.68, 1.0, v);
      float g = lt_hash(floor(uv * uRes) + vec2(fract(uTime * 7.3) * 113.0, fract(uTime * 3.1) * 71.0)) - 0.5;
      c.rgb += g * uGrain * (0.4 + 0.6 * dot(c.rgb, vec3(0.33)));
      gl_FragColor = c;
    }`,
};

export function createPost(ctx: WorldCtx) {
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(ctx.scene, ctx.camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(ctx.size.width, ctx.size.height), 0.55, 0.65, 0.78);
  composer.addPass(bloom);
  const ink = new ShaderPass(InkGrainShader);
  composer.addPass(ink);
  composer.addPass(new OutputPass());

  return {
    update(time: number, w: Weights) {
      ink.uniforms.uTime.value = time;
      // strongest mid-arrival, gone once the visitor settles on the third low tide
      const s = w["smart-wake"];
      ink.uniforms.uMelt.value = 4 * s * (1 - s);
    },
    render() {
      composer.render();
    },
    resize(w: number, h: number, pr: number) {
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
      ink.uniforms.uRes.value.set(w * pr, h * pr);
    },
    dispose() {
      composer.dispose();
    },
  };
}
