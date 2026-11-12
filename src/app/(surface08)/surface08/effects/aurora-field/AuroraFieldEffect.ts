import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';

const AURORA_CURTAIN_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vRibbonFold;
  varying float vTravelWave;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform float uLayerIndex;
  uniform float uDepthFactor;
  uniform vec2 uLayerPointer;
  uniform float uClickPulse;
  uniform float uClickX;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime * (0.32 + uSpeed * 0.65) + uLayerIndex * 1.45;

    // Smooth correlated spatial functions along the curtain span
    float xNorm = uv.x * 2.0 - 1.0;
    float waveA = sin(xNorm * 3.2 + t * 0.85) * 0.75;
    float waveB = cos(xNorm * 5.4 - t * 0.62 + uLayerIndex) * 0.38;
    float waveC = sin(xNorm * 1.8 - t * 0.4) * 0.55;

    // Magnetic attraction toward depth-lagged pointer
    float ptrX = uLayerPointer.x * 2.0 - 1.0;
    float ptrY = uLayerPointer.y * 2.0 - 1.0;
    float distToPtr = abs(xNorm - ptrX);
    float magPull = exp(-distToPtr * distToPtr * (3.5 + uDepthFactor * 2.5)) *
                    uInteraction * (0.45 + uDepthFactor * 0.95);

    // Traveling soliton wave along the curtain on click
    float clickCenter = (uClickX * 2.0 - 1.0);
    float waveFront = (1.0 - uClickPulse) * 2.2;
    float distWave = abs(abs(xNorm - clickCenter) - waveFront);
    float soliton = exp(-distWave * distWave * 18.0) * uClickPulse * uInteraction * (0.6 + uDepthFactor * 0.6);

    // Top of curtain sways more than base for authentic hanging drapery physics
    float swayProfile = mix(0.35, 1.15, uv.y);
    float displacementY = (waveA + waveB) * 0.45 * swayProfile +
                          (ptrY * 1.2 - pos.y * 0.15) * magPull +
                          sin(xNorm * 14.0 - uTime * 6.0) * soliton * 0.65;
    float displacementZ = (waveC + waveB * 0.6) * 0.85 * swayProfile +
                          magPull * 1.15 +
                          soliton * 0.8;

    pos.y += displacementY;
    pos.z += displacementZ;
    // Slight diagonal tilt across the sky
    pos.y += xNorm * (0.35 - uLayerIndex * 0.14);

    vRibbonFold = (waveA - waveB) * 0.5 + magPull * 0.8;
    vTravelWave = soliton;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const AURORA_CURTAIN_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vRibbonFold;
  varying float vTravelWave;

  uniform float uTime;
  uniform float uLayerIndex;
  uniform float uDepthFactor;
  uniform float uIntro;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorAccent;

  void main() {
    // Sharp lower curtain hem with tall luminous vertical drapery fade
    float bottomHem = smoothstep(0.03, 0.14, vUv.y);
    float lowerIntenseBand = exp(-pow((vUv.y - 0.16) / 0.11, 2.0));
    float topFade = pow(max(0.0, 1.0 - vUv.y), 1.45);
    float verticalProfile = bottomHem * topFade;

    // Horizontal fade near screen edges
    float horizFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);

    // Distinct vertical aurora curtain pleats and magnetic rays
    float rayFreq = 22.0 + uLayerIndex * 5.0;
    float pleat1 = sin(vUv.x * rayFreq + vRibbonFold * 3.2 + uTime * 0.55) * 0.5 + 0.5;
    float pleat2 = cos(vUv.x * (rayFreq * 1.85) - uTime * 0.38 + uLayerIndex * 2.3) * 0.5 + 0.5;
    float rayStriation = pow(pleat1 * 0.65 + pleat2 * 0.35, 1.8);
    float curtainDensity = mix(0.28, 1.0, rayStriation);

    // Rich ionized lower hem transitioning into upper atmospheric curtain
    vec3 col = mix(uColorPrimary, uColorSecondary, smoothstep(0.12, 0.78, vUv.y));
    col = mix(col, uColorAccent * 1.25, lowerIntenseBand * 0.82);

    // Brighten folds and traveling click soliton wave
    float foldGlow = smoothstep(0.08, 0.75, abs(vRibbonFold)) * 0.48;
    col += uColorAccent * (foldGlow + vTravelWave * 1.35);

    float alpha = verticalProfile * horizFade * (curtainDensity * 0.75 + lowerIntenseBand * 0.45) *
                  (0.42 + uDepthFactor * 0.45) * uIntro;
    float leftCalm = mix(0.65, 1.0, smoothstep(0.0, 0.48, vUv.x));

    gl_FragColor = vec4(col * leftCalm * (1.05 + vTravelWave * 0.65), clamp(alpha, 0.0, 0.95));
  }
`;

interface CurtainLayer {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  depthFactor: number; // 0 = far, 1 = near
  springX: SpringState;
  springY: SpringState;
}

export class AuroraFieldEffect implements BackgroundEffect {
  public readonly id = 'aurora-field' as const;
  public readonly indexNumber = '05';
  public readonly label = 'AURORA FIELD';
  public readonly headlineAccent = 'MAGNETIC CURTAINS';
  public readonly shortDescription =
    'Five differentiated-depth 3D luminous ribbon curtains with magnetic pointer attraction, group delay parallax, and traveling soliton waves.';
  public readonly helpText = 'SWEEP TO ATTRACT CURTAINS BY DEPTH · CLICK TO SEND TRAVELING WAVE';
  public readonly category = 'field' as const;

  public readonly palettes: Palette[] = [
    createPalette('borealis', 'BOREALIS', ['#00F5D4', '#3B82F6', '#9D4EDD', '#10B981'], '#030611'),
    createPalette('solar-storm', 'SOLAR STORM', ['#FF2A85', '#7209B7', '#FFB703', '#4361EE'], '#070412'),
    createPalette('cryo', 'CRYO', ['#38BDF8', '#6EE7B7', '#6366F1', '#A5F3FC'], '#020810'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private layers: CurtainLayer[] = [];
  private bgColor = new THREE.Color('#030611');

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 9.5);

    const segsX = context.isSoftwareGl ? 64 : 130;
    const segsY = context.isSoftwareGl ? 12 : 22;
    this.geometry = new THREE.PlaneGeometry(17.5, 4.6, segsX, segsY);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    const layerCount = 5;
    this.layers = [];

    for (let i = 0; i < layerCount; i++) {
      const depthFactor = i / (layerCount - 1); // 0 (far) .. 1 (near)
      const zPos = -2.8 + depthFactor * 4.4;
      const yPos = 1.15 - depthFactor * 2.15;

      const mat = new THREE.ShaderMaterial({
        vertexShader: AURORA_CURTAIN_VERTEX_SHADER,
        fragmentShader: AURORA_CURTAIN_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uLayerIndex: { value: i },
          uDepthFactor: { value: depthFactor },
          uLayerPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uClickPulse: { value: 0 },
          uClickX: { value: 0.62 },
          uIntro: { value: 1 },
          uColorPrimary: { value: pal.colors[i % 4].clone() },
          uColorSecondary: { value: pal.colors[(i + 1) % 4].clone() },
          uColorAccent: { value: pal.colors[(i + 2) % 4].clone() },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(this.geometry, mat);
      mesh.position.set(0.4, yPos, zPos);
      mesh.renderOrder = i;
      this.scene.add(mesh);

      this.layers.push({
        mesh,
        material: mat,
        depthFactor,
        springX: { value: 0.62, velocity: 0 },
        springY: { value: 0.52, velocity: 0 },
      });
    }
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
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

    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      // Near layers (depthFactor=1) respond rapidly with high stiffness; far layers respond slowly with lag
      const stiffness = 22 + layer.depthFactor * 95;
      const damping = 6.5 + layer.depthFactor * 5.0;

      layer.springX = stepSpring(layer.springX, input.x, stiffness, damping, dt);
      layer.springY = stepSpring(layer.springY, input.y, stiffness, damping, dt);

      const u = layer.material.uniforms;
      u.uColorPrimary.value.lerp(pal.colors[i % 4], alpha);
      u.uColorSecondary.value.lerp(pal.colors[(i + 1) % 4], alpha);
      u.uColorAccent.value.lerp(pal.colors[(i + 2) % 4], alpha);

      u.uTime.value = elapsed;
      u.uSpeed.value = speedNorm;
      u.uInteraction.value = interactionNorm;
      u.uLayerPointer.value.set(layer.springX.value, layer.springY.value);
      u.uClickPulse.value = input.clickPulse;
      u.uClickX.value = input.clickX;
      u.uIntro.value = controls.introProgress;
    }
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
    for (const layer of this.layers) {
      layer.springX = { value: 0.62, velocity: 0 };
      layer.springY = { value: 0.52, velocity: 0 };
    }
  }

  public dispose(): void {
    this.geometry.dispose();
    for (const layer of this.layers) {
      layer.material.dispose();
    }
  }
}
