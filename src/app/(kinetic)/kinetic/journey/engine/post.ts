import type { Camera, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

type ThreeModule = typeof import("three");

/**
 * Speed pass: radial motion blur toward the direction of travel, masked
 * around the truck so the hero stays crisp, plus chromatic fringing at
 * speed, a soft vignette and fine grain. Runs in linear HDR before the
 * output (tone mapping) pass.
 */
const SpeedShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0 },
    center: { value: null as Vector2 | null },
    focus: { value: null as Vector2 | null },
    focusRadius: { value: 0.12 },
    aspect: { value: 1 },
    vignette: { value: 0.28 },
    grain: { value: 0.025 },
    time: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform vec2 center;
    uniform vec2 focus;
    uniform float focusRadius;
    uniform float aspect;
    uniform float vignette;
    uniform float grain;
    uniform float time;
    varying vec2 vUv;

    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233)) + time) * 43758.5453); }

    void main() {
      vec2 toC = vUv - center;
      float dist = length(toC);
      vec2 dir = dist > 0.0001 ? toC / dist * min(dist, 0.75) : vec2(0.0);
      vec2 fd = (vUv - focus) * vec2(aspect, 1.0);
      float mask = smoothstep(focusRadius, focusRadius * 2.6, length(fd));
      float amount = strength * mask;
      vec3 col;
      if (amount > 0.002) {
        vec3 acc = vec3(0.0);
        float jitter = rand(vUv) * 0.8;
        for (int i = 0; i < SAMPLES; i++) {
          float t = (float(i) + jitter) / float(SAMPLES);
          acc += texture2D(tDiffuse, vUv - dir * t * amount * 0.045).rgb;
        }
        col = acc / float(SAMPLES);
        vec2 ca = dir * amount * 0.0018;
        col.r = mix(col.r, texture2D(tDiffuse, vUv - ca).r, 0.5);
        col.b = mix(col.b, texture2D(tDiffuse, vUv + ca).b, 0.5);
      } else {
        col = texture2D(tDiffuse, vUv).rgb;
      }
      vec2 v = (vUv - 0.5) * vec2(aspect, 1.0) / max(aspect, 1.0);
      col *= 1.0 - vignette * smoothstep(0.25, 0.95, dot(v, v) * 2.2);
      col += (rand(vUv * 1.3) - 0.5) * grain * (0.35 + col);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export type Post = {
  render: () => void;
  setSize: (w: number, h: number, pixelRatio: number) => void;
  bloom: UnrealBloomPass | null;
  speed: ShaderPass;
  dispose: () => void;
};

export function createPost(
  THREE: ThreeModule,
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  opts: { bloom: boolean; samples: number; blurSamples: number },
): Post {
  const size = renderer.getSize(new THREE.Vector2());
  const target = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: opts.samples,
  });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  let bloom: UnrealBloomPass | null = null;
  if (opts.bloom) {
    // Threshold above 1 so only HDR emitters (lamps, beacons) bloom, never the sky.
    bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.4, 0.22, 1.05);
    composer.addPass(bloom);
  }
  const speed = new ShaderPass({
    ...SpeedShader,
    uniforms: THREE.UniformsUtils.clone(SpeedShader.uniforms),
    defines: { SAMPLES: opts.blurSamples },
  });
  speed.uniforms.center.value = new THREE.Vector2(0.5, 0.5);
  speed.uniforms.focus.value = new THREE.Vector2(0.5, 0.5);
  composer.addPass(speed);
  composer.addPass(new OutputPass());

  return {
    render: () => composer.render(),
    setSize: (w, h, pixelRatio) => {
      // The composer scales every pass (bloom halves itself internally).
      composer.setPixelRatio(pixelRatio);
      composer.setSize(w, h);
    },
    bloom,
    speed,
    dispose: () => {
      composer.dispose();
      target.dispose();
    },
  };
}
