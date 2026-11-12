import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';

const RIBBON_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDepth;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform float uRibbonIndex;
  uniform float uWeaveFactor;
  uniform vec2 uPointer;
  uniform vec2 uDragOffset;
  uniform float uWheelOffset;
  uniform float uClickPulse;
  uniform float uIsShadowPass;

  void main() {
    vUv = uv;
    float s = uv.x * 2.0 - 1.0; // -1..1 along the ribbon length
    float w = uv.y * 2.0 - 1.0; // -1..1 across ribbon width

    float t = uTime * (0.3 + uSpeed * 0.65);
    float idx = uRibbonIndex;

    // Parallel diagonal band layout vs interlaced sculptural weave
    float laneSpacing = 0.92;
    float baseOffset = (idx - 3.0) * laneSpacing;

    // Diagonal sweep angle
    float angle = 0.42 + sin(idx * 1.3) * 0.05;
    float ca = cos(angle);
    float sa = sin(angle);

    // Spline centerline coordinates before rotation
    float pathX = s * 11.5;
    float parallelY = baseOffset + sin(s * 2.4 + t * 0.75 + idx * 0.85) * 0.52;
    float wovenY = baseOffset * 0.65 + sin(s * 3.6 - t * 0.9 + idx * 1.55) * 1.35;
    float pathY = mix(parallelY, wovenY, uWeaveFactor) + uWheelOffset * (0.35 + idx * 0.08);

    // Depth separation and over-under interlacing in Z
    float baseZ = (mod(idx, 3.0) - 1.0) * 0.72;
    float weaveZ = cos(s * 3.6 - t * 0.9 + idx * 1.55) * 0.85 * uWeaveFactor;
    float pathZ = baseZ + weaveZ;

    // Pointer depth-dependent parallax tilt & curvature tightening on click
    vec2 ptrWorld = (uPointer - 0.5) * vec2(12.0, 7.5);
    vec2 approxWorldXY = vec2(pathX * ca - pathY * sa, pathX * sa + pathY * ca);
    float ptrDist = length(approxWorldXY - ptrWorld);
    float nearInfluence = exp(-ptrDist * ptrDist * 0.14) * uInteraction;
    float parallaxScale = 0.55 + (pathZ + 1.5) * 0.45;

    pathY += (uDragOffset.y * 1.6 + (uPointer.y - 0.5) * 0.85) * nearInfluence * parallaxScale;
    pathZ += nearInfluence * 0.95 * parallaxScale + uClickPulse * sin(s * 6.0 + idx) * 0.55;

    // Ribbon width & twist angle along spine
    float ribbonHalfWidth = (0.58 + mod(idx, 2.0) * 0.18) * (1.0 - uClickPulse * 0.2);
    float twist = sin(s * 2.6 + t * 0.6 + idx * 1.1) * 0.48 +
                  nearInfluence * 0.65 * (uPointer.x - 0.5) +
                  uDragOffset.x * 0.55;

    float ct = cos(twist);
    float st = sin(twist);

    // Cross-section offset with subtle bevel thickness curvature
    vec3 widthOffset = vec3(0.0, w * ribbonHalfWidth * ct, w * ribbonHalfWidth * st);
    vec3 localNormal = normalize(vec3(
      -sin(s * 2.4 + t * 0.75 + idx * 0.85) * 0.22,
      -st + w * 0.28,
      ct
    ));

    vec3 spinePos = vec3(pathX, pathY, pathZ) + widthOffset;
    // Rotate diagonally across viewport
    vec3 finalPos = vec3(
      spinePos.x * ca - spinePos.y * sa + 1.15,
      spinePos.x * sa + spinePos.y * ca,
      spinePos.z
    );

    vec3 finalNormal = normalize(vec3(
      localNormal.x * ca - localNormal.y * sa,
      localNormal.x * sa + localNormal.y * ca,
      localNormal.z
    ));

    if (uIsShadowPass > 0.5) {
      // Soft contact shadow projected onto back wall plane at z = -2.35
      float shadowDrop = max(0.1, finalPos.z + 2.35);
      finalPos.x += shadowDrop * 0.32;
      finalPos.y -= shadowDrop * 0.38;
      finalPos.z = -2.35;
    }

    vNormal = finalNormal;
    vec4 worldPos = modelMatrix * vec4(finalPos, 1.0);
    vWorldPos = worldPos.xyz;
    vDepth = finalPos.z;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const RIBBON_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDepth;

  uniform float uRibbonIndex;
  uniform float uMaterialType; // 0 = satin metal, 1 = tinted architectural glass
  uniform float uIsShadowPass;
  uniform float uIntro;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorEdge;
  uniform vec3 uBgColor;

  void main() {
    if (uIsShadowPass > 0.5) {
      // Soft contact shadow with feathered edges
      float edgeSoft = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
      gl_FragColor = vec4(0.0, 0.0, 0.0, edgeSoft * 0.42 * uIntro);
      return;
    }

    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    vec3 keyLight = normalize(vec3(0.65, 0.55, 0.72));
    vec3 fillLight = normalize(vec3(-0.7, -0.35, 0.58));

    float diffKey = max(0.0, dot(N, keyLight));
    float diffFill = max(0.0, dot(N, fillLight));

    vec3 H = normalize(keyLight + V);
    float specPower = uMaterialType > 0.5 ? 42.0 : 16.0;
    float spec = pow(max(0.0, dot(N, H)), specPower);
    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.6);

    // Beveled edge highlight along ribbon borders (uv.y near 0 or 1)
    float borderDist = min(vUv.y, 1.0 - vUv.y);
    float bevelRim = smoothstep(0.08, 0.0, borderDist);

    // Base color mixing along length and depth
    vec3 baseCol = mix(uColorPrimary, uColorSecondary, smoothstep(-1.0, 1.0, sin(vUv.x * 4.5 + uRibbonIndex)));
    vec3 litCol = baseCol * (0.32 + diffKey * 0.68 + diffFill * 0.25);

    // Add satin metal anisotropy or glass internal sheen
    litCol += mix(uColorEdge, vec3(1.0, 0.97, 0.94), 0.55) * (spec * 0.62 + fresnel * 0.38 + bevelRim * 0.52);

    // Depth atmospheric cue
    float depthShade = clamp((vDepth + 2.0) / 3.8, 0.55, 1.15);
    litCol *= depthShade;

    // Choreographed directional clip along ribbon length on intro
    float introClip = smoothstep(vUv.x - 0.15, vUv.x + 0.15, uIntro * 1.15);
    float alpha = (uMaterialType > 0.5 ? 0.86 : 0.96) * introClip;

    gl_FragColor = vec4(litCol, alpha);
  }
`;

interface RibbonEntry {
  mesh: THREE.Mesh;
  shadowMesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  shadowMaterial: THREE.ShaderMaterial;
}

export class ChromaticRibbonsEffect implements BackgroundEffect {
  public readonly id = 'chromatic-ribbons' as const;
  public readonly indexNumber = '06';
  public readonly label = 'CHROMATIC RIBBONS';
  public readonly headlineAccent = 'SCULPTURAL WEAVE';
  public readonly shortDescription =
    'Seven 2.5D procedural spline ribbons of alternating tinted glass and satin metal with twisted normals, projected contact shadows, and woven interlacing.';
  public readonly helpText = 'MOVE FOR DEPTH PARALLAX · CLICK TO INTERLACE BANDS · SCROLL TO SHIFT';
  public readonly category = 'ribbon' as const;

  public readonly palettes: Palette[] = [
    createPalette('atelier', 'ATELIER', ['#F472B6', '#FDE68A', '#60A5FA', '#FB7185'], '#0B0A10'),
    createPalette('iridium', 'IRIDIUM', ['#38BDF8', '#94A3B8', '#A3E635', '#818CF8'], '#070A12'),
    createPalette('copper-studio', 'COPPER STUDIO', ['#EA580C', '#FBBF24', '#14B8A6', '#F87171'], '#110908'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private ribbons: RibbonEntry[] = [];
  private bgColor = new THREE.Color('#0B0A10');
  private weaveSpring: SpringState = { value: 0.35, velocity: 0 };

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 10.5);

    const segsX = context.isSoftwareGl ? 64 : 128;
    const segsY = context.isSoftwareGl ? 8 : 16;
    this.geometry = new THREE.PlaneGeometry(1, 1, segsX, segsY);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    const count = 7;
    this.ribbons = [];

    for (let i = 0; i < count; i++) {
      const baseUniforms = {
        uTime: { value: 0 },
        uSpeed: { value: 0.45 },
        uInteraction: { value: 0.7 },
        uRibbonIndex: { value: i },
        uWeaveFactor: { value: 0.35 },
        uPointer: { value: new THREE.Vector2(0.62, 0.52) },
        uDragOffset: { value: new THREE.Vector2(0, 0) },
        uWheelOffset: { value: 0 },
        uClickPulse: { value: 0 },
        uMaterialType: { value: i % 2 },
        uIsShadowPass: { value: 0.0 },
        uIntro: { value: 1 },
        uColorPrimary: { value: pal.colors[i % 4].clone() },
        uColorSecondary: { value: pal.colors[(i + 1) % 4].clone() },
        uColorEdge: { value: pal.colors[(i + 2) % 4].clone() },
        uBgColor: { value: new THREE.Color(pal.bgHex) },
      };

      const shadowUniforms = THREE.UniformsUtils.clone(baseUniforms);
      shadowUniforms.uIsShadowPass.value = 1.0;

      const shadowMat = new THREE.ShaderMaterial({
        vertexShader: RIBBON_VERTEX_SHADER,
        fragmentShader: RIBBON_FRAGMENT_SHADER,
        uniforms: shadowUniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const ribbonMat = new THREE.ShaderMaterial({
        vertexShader: RIBBON_VERTEX_SHADER,
        fragmentShader: RIBBON_FRAGMENT_SHADER,
        uniforms: baseUniforms,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
      });

      const shadowMesh = new THREE.Mesh(this.geometry, shadowMat);
      shadowMesh.frustumCulled = false;
      shadowMesh.renderOrder = i;

      const mesh = new THREE.Mesh(this.geometry, ribbonMat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 10 + i;

      this.scene.add(shadowMesh);
      this.scene.add(mesh);

      this.ribbons.push({
        mesh,
        shadowMesh,
        material: ribbonMat,
        shadowMaterial: shadowMat,
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

    // Choreographed transition between parallel bands and interlaced bands (toggled by click or slow cycle)
    const cycleWeave = Math.sin(elapsed * 0.28) * 0.5 + 0.5;
    const targetWeave = input.clickCount % 2 === 1 ? 1.0 : 0.25 + cycleWeave * 0.45;
    this.weaveSpring = stepSpring(this.weaveSpring, targetWeave, 75, 8.5, dt);

    for (let i = 0; i < this.ribbons.length; i++) {
      const r = this.ribbons[i];
      for (const mat of [r.material, r.shadowMaterial]) {
        const u = mat.uniforms;
        u.uColorPrimary.value.lerp(pal.colors[i % 4], alpha);
        u.uColorSecondary.value.lerp(pal.colors[(i + 1) % 4], alpha);
        u.uColorEdge.value.lerp(pal.colors[(i + 2) % 4], alpha);
        u.uBgColor.value.copy(this.bgColor);

        u.uTime.value = elapsed;
        u.uSpeed.value = speedNorm;
        u.uInteraction.value = interactionNorm;
        u.uWeaveFactor.value = this.weaveSpring.value;
        u.uPointer.value.set(input.x, input.y);
        u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
        u.uWheelOffset.value = input.wheelDelta;
        u.uClickPulse.value = input.clickPulse;
        u.uIntro.value = controls.introProgress;
      }
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
    this.weaveSpring = { value: 0.35, velocity: 0 };
  }

  public dispose(): void {
    this.geometry.dispose();
    for (const r of this.ribbons) {
      r.material.dispose();
      r.shadowMaterial.dispose();
    }
  }
}
