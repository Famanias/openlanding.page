import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';

const BOKEH_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  attribute vec3 aInstancePos;
  attribute vec2 aInstanceOffset;
  attribute vec3 aInstanceMeta; // x = scale, y = colorIdx, z = pulseEnergy

  varying vec2 vUv;
  varying float vDepth;
  varying float vColorIdx;
  varying float vPulse;

  uniform float uAspect;
  uniform float uIntro;

  void main() {
    vUv = uv;
    vDepth = aInstancePos.z;
    vColorIdx = aInstanceMeta.y;
    vPulse = aInstanceMeta.z;

    float radius = aInstanceMeta.x * (1.0 + vPulse * 0.28) * mix(0.2, 1.0, uIntro);
    vec2 quadOffset = (uv - 0.5) * 2.0 * radius;
    quadOffset.x /= max(0.5, uAspect);

    vec2 finalXY = (aInstancePos.xy + aInstanceOffset) * 2.0 - 1.0 + quadOffset;
    gl_Position = vec4(finalXY, 0.0, 1.0);
  }
`;

const BOKEH_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vDepth;
  varying float vColorIdx;
  varying float vPulse;

  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  vec3 pickColor(float idx) {
    if (idx < 0.5) return uColor0;
    if (idx < 1.5) return uColor1;
    if (idx < 2.5) return uColor2;
    return uColor3;
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;

    // Out-of-focus camera aperture profile: soft interior volume + spherical caustic rim
    float sharpness = mix(2.2, 7.5, vDepth);
    float softDisc = 1.0 - smoothstep(0.35, 1.0, r);
    float apertureRing = exp(-pow((r - 0.78) * sharpness, 2.0)) * (0.45 + vDepth * 0.55);

    vec3 baseCol = pickColor(vColorIdx);
    vec3 rimCol = pickColor(mod(vColorIdx + 1.0, 4.0));

    // Chromatic rim aberration inside the bokeh disc
    float angle = atan(p.y, p.x);
    float directionalCaustic = 0.65 + 0.35 * sin(angle * 2.0 + vDepth * 6.0);

    vec3 col = baseCol * softDisc * 0.68 +
               mix(baseCol, rimCol, 0.55) * apertureRing * directionalCaustic * 1.15 +
               vec3(1.0, 0.96, 0.9) * vPulse * (softDisc * 0.5 + apertureRing * 0.8);

    float alpha = (softDisc * 0.42 + apertureRing * 0.55) * mix(0.28, 0.72, vDepth);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface BokehParticle {
  baseX: number;
  baseY: number;
  depth: number; // 0 (deep blurred) .. 1 (foreground crisp)
  radius: number;
  colorIdx: number;
  phase: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  pulse: number;
}

export class BokehReactorEffect implements BackgroundEffect {
  public readonly id = 'bokeh-reactor' as const;
  public readonly indexNumber = '07';
  public readonly label = 'BOKEH REACTOR';
  public readonly headlineAccent = 'OPTICAL APERTURE';
  public readonly shortDescription =
    'Instanced translucent camera-aperture light lobes with depth-attenuated repulsion physics, shadowed pointer cavity, and radial shockwave pulses.';
  public readonly helpText = 'MOVE TO PART LIGHT VOLUMES · CLICK TO EMIT APERTURE PULSE';
  public readonly category = 'bokeh' as const;

  public readonly palettes: Palette[] = [
    createPalette('chamber', 'CHAMBER', ['#FF9E7D', '#67E8F9', '#3B82F6', '#F43F5E'], '#050B16'),
    createPalette('nebula', 'NEBULA', ['#FBBF24', '#A855F7', '#06B6D4', '#EC4899'], '#080614'),
    createPalette('halide', 'HALIDE', ['#34D399', '#FB7185', '#60A5FA', '#FDE047'], '#040D12'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private geometry!: THREE.InstancedBufferGeometry;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  private particles: BokehParticle[] = [];
  private offsetArray!: Float32Array;
  private metaArray!: Float32Array;
  private offsetAttr!: THREE.InstancedBufferAttribute;
  private metaAttr!: THREE.InstancedBufferAttribute;
  private bgColor = new THREE.Color('#050B16');

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const count = 40;
    this.particles = [];
    const posArray = new Float32Array(count * 3);
    this.offsetArray = new Float32Array(count * 2);
    this.metaArray = new Float32Array(count * 3);

    // Deterministic art-directed optical cluster biased toward the right 65%
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const goldenAngle = i * 2.3999632;
      const r = Math.sqrt(t) * 0.44;
      const baseX = THREE.MathUtils.clamp(0.58 + Math.cos(goldenAngle) * r * 1.15, 0.08, 0.95);
      const baseY = THREE.MathUtils.clamp(0.5 + Math.sin(goldenAngle) * r * 0.95, 0.08, 0.92);
      const depth = (i % 7) / 6; // 0..1

      // Fewer large volumes in background, smaller sharper optical lobes in foreground
      const radius = THREE.MathUtils.lerp(0.34, 0.09, depth * 0.85);
      const colorIdx = i % 4;

      this.particles.push({
        baseX,
        baseY,
        depth,
        radius,
        colorIdx,
        phase: i * 1.17,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
        pulse: 0,
      });

      posArray[i * 3 + 0] = baseX;
      posArray[i * 3 + 1] = baseY;
      posArray[i * 3 + 2] = depth;

      this.metaArray[i * 3 + 0] = radius;
      this.metaArray[i * 3 + 1] = colorIdx;
      this.metaArray[i * 3 + 2] = 0;
    }

    const basePlane = new THREE.PlaneGeometry(1, 1);
    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.index = basePlane.index;
    this.geometry.attributes.position = basePlane.attributes.position;
    this.geometry.attributes.uv = basePlane.attributes.uv;
    this.geometry.instanceCount = count;

    this.geometry.setAttribute('aInstancePos', new THREE.InstancedBufferAttribute(posArray, 3));
    this.offsetAttr = new THREE.InstancedBufferAttribute(this.offsetArray, 2);
    this.metaAttr = new THREE.InstancedBufferAttribute(this.metaArray, 3);
    this.geometry.setAttribute('aInstanceOffset', this.offsetAttr);
    this.geometry.setAttribute('aInstanceMeta', this.metaAttr);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    this.material = new THREE.ShaderMaterial({
      vertexShader: BOKEH_VERTEX_SHADER,
      fragmentShader: BOKEH_FRAGMENT_SHADER,
      uniforms: {
        uAspect: { value: context.width / Math.max(1, context.height) },
        uIntro: { value: 1 },
        uColor0: { value: pal.colors[0].clone() },
        uColor1: { value: pal.colors[1].clone() },
        uColor2: { value: pal.colors[2].clone() },
        uColor3: { value: pal.colors[3].clone() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  public resize(width: number, height: number): void {
    this.material.uniforms.uAspect.value = width / Math.max(1, height);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const alpha = dampValue(0, 1, 8, dt);
    this.bgColor.lerp(new THREE.Color(pal.bgHex), alpha);

    const u = this.material.uniforms;
    u.uColor0.value.lerp(pal.colors[0], alpha);
    u.uColor1.value.lerp(pal.colors[1], alpha);
    u.uColor2.value.lerp(pal.colors[2], alpha);
    u.uColor3.value.lerp(pal.colors[3], alpha);
    u.uIntro.value = controls.introProgress;

    const safeDt = controls.paused ? 0 : Math.min(dt, 0.04);
    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;
    const aspect = u.uAspect.value;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const depthScale = 0.45 + p.depth * 0.9;

      // Ambient orbital drift
      const driftX = Math.sin(elapsed * (0.28 + speedNorm * 0.5) + p.phase) * 0.045 * depthScale;
      const driftY = Math.cos(elapsed * (0.24 + speedNorm * 0.45) + p.phase * 1.3) * 0.045 * depthScale;

      const curX = p.baseX + p.offsetX;
      const curY = p.baseY + p.offsetY;

      // Pointer repulsion creates a temporary shadowed cavity around the cursor
      const dx = (curX - input.x) * aspect;
      const dy = curY - input.y;
      const dist = Math.hypot(dx, dy);
      const cavityRadius = 0.34;

      let repulseX = 0;
      let repulseY = 0;
      if (dist < cavityRadius && dist > 0.001) {
        const push = Math.pow(1.0 - dist / cavityRadius, 2.0) * 1.85 * interactionNorm * depthScale;
        repulseX = (dx / dist / aspect) * push;
        repulseY = (dy / dist) * push;
      }

      // Click propagating light wave
      if (input.clickPulse > 0.01) {
        const cdx = (curX - input.clickX) * aspect;
        const cdy = curY - input.clickY;
        const cDist = Math.hypot(cdx, cdy);
        const waveFront = (1.0 - input.clickPulse) * 0.95;
        const ring = Math.exp(-Math.pow((cDist - waveFront) / 0.14, 2.0)) * input.clickPulse * interactionNorm;
        p.pulse = Math.max(p.pulse, ring * 1.3);
        if (cDist > 0.001) {
          repulseX += (cdx / cDist / aspect) * ring * 0.95;
          repulseY += (cdy / cDist) * ring * 0.95;
        }
      }

      const stiffness = 28 + p.depth * 45;
      const damping = 5.5 + p.depth * 3.5;
      const forceX = (driftX - p.offsetX) * stiffness + repulseX * 26.0;
      const forceY = (driftY - p.offsetY) * stiffness + repulseY * 26.0;

      p.vx += (forceX - p.vx * damping) * safeDt;
      p.vy += (forceY - p.vy * damping) * safeDt;
      p.offsetX += p.vx * safeDt;
      p.offsetY += p.vy * safeDt;
      p.pulse = dampValue(p.pulse, 0, 4.5, safeDt);

      this.offsetArray[i * 2 + 0] = p.offsetX;
      this.offsetArray[i * 2 + 1] = p.offsetY;
      this.metaArray[i * 3 + 2] = p.pulse;
    }

    this.offsetAttr.needsUpdate = true;
    this.metaAttr.needsUpdate = true;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.bgColor, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.offsetX = 0;
      p.offsetY = 0;
      p.vx = 0;
      p.vy = 0;
      p.pulse = 0;
      this.offsetArray[i * 2 + 0] = 0;
      this.offsetArray[i * 2 + 1] = 0;
      this.metaArray[i * 3 + 2] = 0;
    }
    this.offsetAttr.needsUpdate = true;
    this.metaAttr.needsUpdate = true;
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
