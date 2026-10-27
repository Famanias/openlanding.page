import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { STATS } from "../content/story";
import { damp } from "../motion/math";
import { createBrowserGlyphCanvas, sampleGlyphPoints } from "./glyphPoints";
import { chapterX, CONTENT_Z, SLOPE } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

const SIZE = 192; // 36 864 plankton
const STAT_SECONDS = 6;
const FIGURE = new THREE.Vector3(chapterX("problem"), 16.5, CONTENT_Z - 10);
const FIGURE_WIDTH = 34;

const VELOCITY = /* glsl */ `
uniform float uDt; uniform float uTime; uniform float uForm; uniform float uRough;
uniform float uCamX; uniform float uWaterY; uniform float uShoreZ; uniform float uAspect;
uniform sampler2D uTarget; uniform sampler2D uSeedTex;
uniform vec3 uFigure; uniform float uFigureW;
uniform mat4 uViewProj; uniform vec4 uLantern; uniform vec3 uCamRight; uniform vec3 uCamUp;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 p = texture2D(texturePosition, uv).xyz;
  vec3 v = texture2D(textureVelocity, uv).xyz;
  vec4 s = texture2D(uSeedTex, uv);
  // home: a glowing drift in the shallows around the visitor
  vec3 home = vec3(uCamX + (s.x - 0.5) * 150.0, uWaterY + 0.12 + s.y * 0.5, uShoreZ - 3.0 - s.z * 45.0);
  home += vec3(sin(uTime * 0.3 + s.w * 20.0), 0.15 * sin(uTime * 0.5 + s.x * 30.0), cos(uTime * 0.25 + s.y * 10.0)) * 1.6;
  vec2 g = texture2D(uTarget, uv).xy;
  vec3 glyph = uFigure + vec3(g.x * uFigureW, g.y * uFigureW, (s.z - 0.5) * 0.8);
  vec3 target = mix(home, glyph, uForm);
  vec3 acc = (target - p) * mix(1.1, 7.0, uForm) - v * mix(1.5, 3.8, uForm);
  // the lantern parts the swarm
  vec4 clip = uViewProj * vec4(p, 1.0);
  if (clip.w > 0.0) {
    vec2 d = clip.xy / clip.w - uLantern.xy;
    d.x *= uAspect;
    float L = length(d);
    float r = uLantern.z * 0.75;
    if (L < r && uLantern.w > 0.5) {
      vec2 dir = d / max(L, 1e-4);
      acc += (uCamRight * dir.x + uCamUp * dir.y) * (1.0 - L / r) * 140.0;
    }
  }
  // fast scrolling scatters everything
  acc += (s.xyz - 0.5) * uRough * 220.0 * (0.5 + 0.5 * sin(uTime * 9.0 + s.w * 40.0));
  v += acc * uDt;
  gl_FragColor = vec4(v, 1.0);
}`;

const POSITION = /* glsl */ `
uniform float uDt; uniform float uCamX;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 p = texture2D(texturePosition, uv);
  vec3 v = texture2D(textureVelocity, uv).xyz;
  p.xyz += v * uDt;
  // plankton left far behind re-enters ahead of the visitor
  if (abs(p.x - uCamX) > 95.0) p.x = uCamX - sign(p.x - uCamX) * 90.0;
  gl_FragColor = p;
}`;

/** Bioluminescent plankton: an ambient drift all night that swarms into each statistic at the first low tide. */
export function createPlankton(ctx: WorldCtx): Part {
  const { renderer, camera, shared } = ctx;
  const gpu = new GPUComputationRenderer(SIZE, SIZE, renderer);
  const pos0 = gpu.createTexture();
  const vel0 = gpu.createTexture();
  const seeds = new Float32Array(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    seeds.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    pos0.image.data!.set([(Math.random() - 0.5) * 150, shared.uWaterY.value + 0.3, -10 - Math.random() * 40, 1], i * 4);
  }
  const seedTex = new THREE.DataTexture(seeds, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
  seedTex.needsUpdate = true;
  const targetData = new Float32Array(SIZE * SIZE * 4);
  const targetTex = new THREE.DataTexture(targetData, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
  targetTex.needsUpdate = true;

  const velVar = gpu.addVariable("textureVelocity", VELOCITY, vel0);
  const posVar = gpu.addVariable("texturePosition", POSITION, pos0);
  gpu.setVariableDependencies(velVar, [velVar, posVar]);
  gpu.setVariableDependencies(posVar, [velVar, posVar]);
  const vu = velVar.material.uniforms;
  Object.assign(vu, {
    uDt: { value: 0 }, uTime: shared.uTime, uForm: { value: 0 }, uRough: shared.uRoughness,
    uCamX: { value: 0 }, uWaterY: shared.uWaterY, uShoreZ: { value: 0 }, uAspect: { value: 1 },
    uTarget: { value: targetTex }, uSeedTex: { value: seedTex },
    uFigure: { value: FIGURE }, uFigureW: { value: FIGURE_WIDTH },
    uViewProj: { value: new THREE.Matrix4() }, uLantern: shared.uLantern,
    uCamRight: { value: new THREE.Vector3() }, uCamUp: { value: new THREE.Vector3() },
  });
  const pu = posVar.material.uniforms;
  Object.assign(pu, { uDt: vu.uDt, uCamX: vu.uCamX });
  const err = gpu.init();
  if (err) throw new Error(`plankton: ${err}`);

  // points that read their position from the simulation
  const geo = new THREE.BufferGeometry();
  const ref = new Float32Array(SIZE * SIZE * 2);
  for (let i = 0; i < SIZE * SIZE; i++) ref.set([(i % SIZE + 0.5) / SIZE, (Math.floor(i / SIZE) + 0.5) / SIZE], i * 2);
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SIZE * SIZE * 3), 3));
  geo.setAttribute("ref", new THREE.BufferAttribute(ref, 2));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uPos: { value: null as THREE.Texture | null }, uForm: vu.uForm, uScale: { value: 1 }, uTime: shared.uTime, uDawn: shared.uDawn },
    vertexShader: /* glsl */ `
      attribute vec2 ref;
      uniform sampler2D uPos; uniform float uScale; uniform float uForm; uniform float uTime;
      varying float vTw;
      void main() {
        vec3 p = texture2D(uPos, ref).xyz;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vTw = 0.55 + 0.45 * sin(uTime * 2.3 + ref.x * 91.0 + ref.y * 57.0);
        gl_PointSize = clamp((0.13 + 0.09 * uForm) * uScale / -mv.z, 1.0, 9.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uForm; uniform float uDawn;
      varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = vec3(0.45, 0.8, 1.0) * (0.22 + 0.4 * uForm) * vTw;
        gl_FragColor = vec4(col * a * (1.0 - uDawn * 0.8), a);
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = 6;
  ctx.scene.add(points);

  // the statistic's words, under the figure
  const label = createWorldText(ctx, { text: STATS[0].label, font: ctx.fonts.mono, fontSize: 1.05, maxWidth: 30, mode: "always", color: 0xbfe6ff, anchorY: "top", tear: 0.8 });
  label.mesh.position.set(FIGURE.x, FIGURE.y - 5.2, FIGURE.z);
  ctx.scene.add(label.mesh);

  const glyphs = typeof document !== "undefined" ? createBrowserGlyphCanvas(readDisplayFamily()) : null;
  let statIndex = -1;
  let form = 0;
  const viewProj = new THREE.Matrix4();

  function showStat(i: number) {
    statIndex = i;
    if (!glyphs) return;
    const pts = sampleGlyphPoints(STATS[i].value, SIZE * SIZE, glyphs, 11 + i);
    for (let k = 0; k < SIZE * SIZE; k++) {
      targetData[k * 4] = pts[k * 2];
      targetData[k * 4 + 1] = pts[k * 2 + 1];
    }
    targetTex.needsUpdate = true;
    label.setText(STATS[i].label);
    form = Math.min(form, 0.55); // loosen the swarm, then let it pull into the new figure
  }

  return {
    update(f, w) {
      const weight = w.problem;
      if (weight > 0.4) {
        const i = Math.floor(f.time / STAT_SECONDS) % STATS.length;
        if (i !== statIndex) showStat(i);
      }
      form = damp(form, weight > 0.4 ? 1 : 0, weight > 0.4 ? 1.4 : 3, f.dt);
      vu.uForm.value = form * weight;
      // keep the swarm in real time when frames are slow: up to four fixed sub-steps
      const steps = Math.min(4, Math.max(1, Math.ceil(f.dt / (1 / 30))));
      vu.uDt.value = f.dt / steps;
      vu.uCamX.value = camera.position.x;
      vu.uShoreZ.value = shared.uWaterY.value / SLOPE;
      vu.uAspect.value = ctx.size.width / ctx.size.height;
      camera.updateMatrixWorld();
      viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      vu.uViewProj.value.copy(viewProj);
      vu.uCamRight.value.setFromMatrixColumn(camera.matrixWorld, 0);
      vu.uCamUp.value.setFromMatrixColumn(camera.matrixWorld, 1);
      for (let s = 0; s < steps; s++) gpu.compute();
      mat.uniforms.uPos.value = gpu.getCurrentRenderTarget(posVar).texture;
      mat.uniforms.uScale.value = ctx.size.height * renderer.getPixelRatio() * 0.9;
      label.uWeight.value = Math.max(0, weight * form * 1.2 - 0.2);
      label.mesh.visible = weight > 0.01;
    },
    dispose() {
      gpu.dispose();
      geo.dispose();
      mat.dispose();
      seedTex.dispose();
      targetTex.dispose();
      label.dispose();
    },
  };
}

function readDisplayFamily() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-lt-imbue").trim();
  return v ? `${v}, serif` : "serif";
}
