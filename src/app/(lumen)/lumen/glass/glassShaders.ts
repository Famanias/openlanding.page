import * as THREE from 'three';
import { GlassMaterialParams, GlassSceneParams } from './glassTypes';

/**
 * Generates a procedural studio photography backdrop texture with fine architectural
 * studio grid lines, diffused softbox light bands, and LUMEN pastel illumination
 * so clear and frosted glass visibly bends and refracts the environment behind it.
 */
export function createStudioEnvironmentTexture(
  renderer?: THREE.WebGLRenderer
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Base studio wall fill (#F8F9FC -> #EFF3FA)
    const baseGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    baseGrad.addColorStop(0, '#F9FAFD');
    baseGrad.addColorStop(0.5, '#F2F5FC');
    baseGrad.addColorStop(1, '#ECF0F9');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Soft diffused studio key lights (Lavender #D8D0F7, Ice Blue #C9DAFA, Champagne #F6DCCA)
    const drawSoftPool = (
      cx: number,
      cy: number,
      radius: number,
      rgbaInner: string,
      rgbaOuter: string
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      g.addColorStop(0, rgbaInner);
      g.addColorStop(1, rgbaOuter);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1024, 1024);
    };

    drawSoftPool(740, 290, 460, 'rgba(216, 208, 247, 0.52)', 'rgba(216, 208, 247, 0)');
    drawSoftPool(620, 680, 480, 'rgba(201, 218, 250, 0.50)', 'rgba(201, 218, 250, 0)');
    drawSoftPool(840, 560, 390, 'rgba(246, 220, 202, 0.46)', 'rgba(246, 220, 202, 0)');
    drawSoftPool(260, 380, 420, 'rgba(221, 227, 238, 0.35)', 'rgba(221, 227, 238, 0)');

    // 3. Diagonal architectural studio light bands (makes optical refraction unmistakably visible)
    ctx.save();
    ctx.translate(512, 512);
    ctx.rotate(-0.38);
    for (let i = -640; i <= 640; i += 96) {
      const bandGrad = ctx.createLinearGradient(i, -600, i + 44, 600);
      bandGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      bandGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
      bandGrad.addColorStop(1, 'rgba(221, 227, 238, 0.28)');
      ctx.fillStyle = bandGrad;
      ctx.fillRect(i, -700, 38, 1400);
    }
    ctx.restore();

    // 4. Fine architectural studio reference lines (subtle #DDE3EE rules)
    ctx.strokeStyle = 'rgba(186, 198, 218, 0.26)';
    ctx.lineWidth = 1.25;
    const step = 64;
    for (let x = 0; x <= 1024; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  if (renderer) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
  texture.needsUpdate = true;
  return texture;
}

export const STUDIO_BACKDROP_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

export const STUDIO_BACKDROP_FRAGMENT_SHADER = `
  uniform sampler2D uStudioMap;
  uniform float uLightingIntensity;
  uniform float uCausticIntensity;
  uniform float uLoopPhase;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 shiftedUv = vUv + uPointer * 0.012;
    vec3 studio = texture2D(uStudioMap, shiftedUv).rgb;

    // Subtle studio caustic light band on wall
    float waveA = sin(vUv.x * 9.0 + vUv.y * 5.0 + sin(uLoopPhase)) * 0.5 + 0.5;
    float waveB = cos(vUv.x * 6.0 - vUv.y * 8.0 + cos(uLoopPhase)) * 0.5 + 0.5;
    float causticBand = pow(waveA * waveB, 4.0) * uCausticIntensity * 0.14;

    // Keep left hero region extra calm for typography legibility
    float rightMask = smoothstep(0.18, 0.78, vUv.x);
    vec3 col = studio * (0.94 + 0.06 * uLightingIntensity) + vec3(0.98, 0.97, 1.0) * causticBand * rightMask;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export const GLASS_VERTEX_SHADER = `
  uniform float uLoopPhase;
  uniform float uDistortionStrength;
  uniform float uNormalDistortion;
  uniform vec2 uPointer;
  uniform float uLayerIndex;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  varying vec4 vClipPosition;
  varying float vCurvature;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Periodic seamless loop deformation (returns to exact starting state every 2*PI)
    float phase = uLoopPhase + uLayerIndex * 1.05;
    float wave1 = sin(pos.x * 1.45 + pos.y * 0.95 + sin(phase));
    float wave2 = cos(pos.y * 1.35 - pos.z * 1.1 + cos(phase));
    float disp = (wave1 * 0.6 + wave2 * 0.4) * uDistortionStrength * 0.18;

    // Subtle pointer-reactive sculptural tilt
    float pointerInfluence = (pos.x * uPointer.x + pos.y * uPointer.y) * 0.06;

    pos += normal * disp;
    pos.z += pointerInfluence;

    // Perturb normal analytically to match procedural wave curvature
    vec3 perturbedNormal = normalize(
      normal + vec3(
        cos(pos.x * 2.1 + sin(phase)) * uNormalDistortion * 0.28,
        sin(pos.y * 2.1 + cos(phase)) * uNormalDistortion * 0.28,
        0.0
      )
    );

    vNormal = normalize(normalMatrix * perturbedNormal);
    vCurvature = wave1 * wave2;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    vec4 mvPos = viewMatrix * worldPos;
    vViewPosition = -mvPos.xyz;

    vClipPosition = projectionMatrix * mvPos;
    gl_Position = vClipPosition;
  }
`;

export const GLASS_FRAGMENT_SHADER = `
  uniform sampler2D uStudioMap;
  uniform float uGlassType; // 0 = clear, 1 = frosted, 2 = opal
  uniform float uIor;
  uniform float uThickness;
  uniform float uRoughness;
  uniform float uTransmission;
  uniform float uRefractionStrength;
  uniform float uFresnelIntensity;
  uniform float uEdgeHighlight;
  uniform float uDispersion;
  uniform float uIridescence;
  uniform float uFrosting;
  uniform float uMicrotexture;
  uniform float uCausticIntensity;
  uniform float uReflectionStrength;
  uniform float uLightingIntensity;
  uniform float uLoopPhase;
  uniform float uTransparentExport;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  varying vec4 vClipPosition;
  varying float vCurvature;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 V = normalize(vViewPosition);
    vec3 N = normalize(vNormal);
    if (!gl_FrontFacing) {
      N = -N;
    }

    // Fine microtexture surface normal grain for frosted/tactile optical feel
    float grain = (hash21(vUv * 180.0) - 0.5) * uMicrotexture * 0.08;
    N = normalize(N + vec3(grain, -grain, 0.0));

    // Screen-space coordinates (0..1)
    vec2 screenUv = (vClipPosition.xy / max(0.0001, vClipPosition.w)) * 0.5 + 0.5;

    // Physical refraction ray offset modulated by IOR and thickness
    float eta = 1.0 / max(1.05, uIor);
    vec3 refractedRay = refract(-V, N, eta);
    vec2 refractOffset = (refractedRay.xy - (-V.xy)) * uRefractionStrength * (0.06 + uThickness * 0.045);

    // Chromatic dispersion across R, G, B wavelengths
    vec2 dispVec = refractOffset * (0.14 + uDispersion * 0.38);

    // Multi-tap frosted diffusion kernel (controlled by frosting + roughness)
    float blurRadius = (uFrosting * 0.7 + uRoughness * 0.3) * 0.018;
    vec2 o1 = vec2(0.866, 0.5) * blurRadius;
    vec2 o2 = vec2(-0.866, 0.5) * blurRadius;
    vec2 o3 = vec2(0.0, -1.0) * blurRadius;

    vec2 uvR = screenUv + refractOffset + dispVec;
    vec2 uvG = screenUv + refractOffset;
    vec2 uvB = screenUv + refractOffset - dispVec;

    float rChan = (
      texture2D(uStudioMap, uvR).r * 0.4 +
      texture2D(uStudioMap, uvR + o1).r * 0.2 +
      texture2D(uStudioMap, uvR + o2).r * 0.2 +
      texture2D(uStudioMap, uvR + o3).r * 0.2
    );
    float gChan = (
      texture2D(uStudioMap, uvG).g * 0.4 +
      texture2D(uStudioMap, uvG + o1).g * 0.2 +
      texture2D(uStudioMap, uvG + o2).g * 0.2 +
      texture2D(uStudioMap, uvG + o3).g * 0.2
    );
    float bChan = (
      texture2D(uStudioMap, uvB).b * 0.4 +
      texture2D(uStudioMap, uvB + o1).b * 0.2 +
      texture2D(uStudioMap, uvB + o2).b * 0.2 +
      texture2D(uStudioMap, uvB + o3).b * 0.2
    );

    vec3 transmittedColor = vec3(rChan, gChan, bChan);

    // Fresnel reflectance (Schlick approximation)
    float cosTheta = clamp(dot(V, N), 0.0, 1.0);
    float f0 = pow((uIor - 1.0) / (uIor + 1.0), 2.0);
    float fresnel = clamp((f0 + (1.0 - f0) * pow(1.0 - cosTheta, 3.2)) * uFresnelIntensity, 0.0, 1.0);

    // Dual Studio Key & Rim Lights for physical bevel specular highlights
    vec3 lightDirKey = normalize(vec3(0.65, 0.72, 0.85));
    vec3 lightDirRim = normalize(vec3(-0.75, 0.45, 0.55));
    vec3 HKey = normalize(V + lightDirKey);
    vec3 HRim = normalize(V + lightDirRim);

    float shininess = mix(140.0, 18.0, clamp(uRoughness, 0.0, 1.0));
    float specKey = pow(max(dot(N, HKey), 0.0), shininess) * uEdgeHighlight;
    float specRim = pow(max(dot(N, HRim), 0.0), shininess * 0.7) * uEdgeHighlight * 0.75;

    // Beveled rim light along grazing angles
    float rimBevel = pow(1.0 - cosTheta, 4.2) * uEdgeHighlight * 0.85;

    // Subtle thin-film iridescence in LUMEN pastel spectrum (Lavender #D8D0F7, Ice Blue #C9DAFA, Champagne #F6DCCA)
    float iridPhase = (1.0 - cosTheta) * 5.5 + vCurvature * 2.0 + sin(uLoopPhase);
    vec3 lavender = vec3(0.847, 0.816, 0.969);
    vec3 iceBlue = vec3(0.788, 0.855, 0.980);
    vec3 champagne = vec3(0.965, 0.863, 0.792);

    vec3 iridTint = mix(
      lavender,
      mix(iceBlue, champagne, 0.5 + 0.5 * sin(iridPhase)),
      0.5 + 0.5 * cos(iridPhase * 0.8)
    );

    // Concentrated caustic band across curved glass folds
    float causticRidge = pow(clamp(1.0 - abs(dot(N, vec3(0.35, 0.65, 0.67))), 0.0, 1.0), 6.0);
    vec3 causticLight = vec3(0.96, 0.97, 1.0) * causticRidge * uCausticIntensity * 0.55;

    // Material treatment body color (Clear vs Frosted vs Opal)
    vec3 clearBody = mix(vec3(0.93, 0.96, 0.995), iridTint, uIridescence * 0.25);
    vec3 frostedBody = mix(vec3(0.955, 0.968, 0.992), iceBlue, 0.22);
    vec3 opalBody = mix(vec3(0.97, 0.965, 0.995), iridTint, 0.42 + uIridescence * 0.35);

    vec3 glassTint = clearBody;
    if (uGlassType > 0.5 && uGlassType < 1.5) {
      glassTint = frostedBody;
    } else if (uGlassType >= 1.5) {
      glassTint = opalBody;
    }

    // Volume attenuation (thickness slightly deepens the optical tint)
    float volumeFactor = clamp(0.14 + uThickness * 0.12 + (1.0 - uTransmission) * 0.45, 0.1, 0.82);
    vec3 bodyComposite = mix(transmittedColor, glassTint, volumeFactor);

    // Combine studio reflections, iridescence, caustics, and bevel highlights
    vec3 envReflection = mix(iceBlue, champagne, N.y * 0.5 + 0.5) * fresnel * uReflectionStrength * 0.55;
    vec3 specularTotal = (vec3(1.0, 0.99, 0.98) * specKey + lavender * specRim + vec3(0.94, 0.96, 1.0) * rimBevel) * uLightingIntensity;

    // Subtle shadow grounding at lower folds
    float foldShadow = smoothstep(-0.8, 0.3, N.y) * 0.08 + 0.92;

    vec3 finalRgb = (bodyComposite * foldShadow) + envReflection + specularTotal + causticLight;
    finalRgb = clamp(finalRgb, 0.0, 1.0);

    // Alpha calculation: opaque studio composite vs transparent isolated glass export
    float sculpturalAlpha = clamp(
      0.34 + fresnel * 0.48 + (specKey + specRim + rimBevel) * 0.38 + uFrosting * 0.22 + causticRidge * 0.2,
      0.28,
      0.98
    );
    float outAlpha = mix(0.94, sculpturalAlpha, uTransparentExport);

    gl_FragColor = vec4(finalRgb, outAlpha);
  }
`;

export function createGlassShaderMaterial(
  studioTexture: THREE.Texture,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  layerIndex = 0,
  transparentExport = false
): THREE.ShaderMaterial {
  const glassTypeNum =
    materialParams.glassType === 'clear'
      ? 0.0
      : materialParams.glassType === 'frosted'
      ? 1.0
      : 2.0;

  return new THREE.ShaderMaterial({
    uniforms: {
      uStudioMap: { value: studioTexture },
      uGlassType: { value: glassTypeNum },
      uIor: { value: materialParams.ior },
      uThickness: { value: materialParams.thickness },
      uRoughness: { value: materialParams.roughness },
      uTransmission: { value: materialParams.transmission },
      uRefractionStrength: { value: materialParams.refractionStrength },
      uFresnelIntensity: { value: materialParams.fresnelIntensity },
      uEdgeHighlight: { value: materialParams.edgeHighlight },
      uDispersion: { value: materialParams.dispersion },
      uIridescence: { value: materialParams.iridescence },
      uFrosting: { value: materialParams.frosting },
      uNormalDistortion: { value: materialParams.normalDistortion },
      uMicrotexture: { value: materialParams.microtexture },
      uCausticIntensity: { value: materialParams.causticIntensity },
      uReflectionStrength: { value: materialParams.reflectionStrength },
      uLightingIntensity: { value: sceneParams.lightingIntensity },
      uDistortionStrength: { value: sceneParams.distortionStrength },
      uLoopPhase: { value: 0.0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uLayerIndex: { value: layerIndex },
      uTransparentExport: { value: transparentExport ? 1.0 : 0.0 },
    },
    vertexShader: GLASS_VERTEX_SHADER,
    fragmentShader: GLASS_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export function updateGlassShaderUniforms(
  mat: THREE.ShaderMaterial,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  loopPhase: number,
  pointerX: number,
  pointerY: number,
  transparentExport: boolean
): void {
  const glassTypeNum =
    materialParams.glassType === 'clear'
      ? 0.0
      : materialParams.glassType === 'frosted'
      ? 1.0
      : 2.0;

  const u = mat.uniforms;
  u.uGlassType.value = glassTypeNum;
  u.uIor.value = materialParams.ior;
  u.uThickness.value = materialParams.thickness;
  u.uRoughness.value = materialParams.roughness;
  u.uTransmission.value = materialParams.transmission;
  u.uRefractionStrength.value = materialParams.refractionStrength;
  u.uFresnelIntensity.value = materialParams.fresnelIntensity;
  u.uEdgeHighlight.value = materialParams.edgeHighlight;
  u.uDispersion.value = materialParams.dispersion;
  u.uIridescence.value = materialParams.iridescence;
  u.uFrosting.value = materialParams.frosting;
  u.uNormalDistortion.value = materialParams.normalDistortion;
  u.uMicrotexture.value = materialParams.microtexture;
  u.uCausticIntensity.value = materialParams.causticIntensity;
  u.uReflectionStrength.value = materialParams.reflectionStrength;
  u.uLightingIntensity.value = sceneParams.lightingIntensity;
  u.uDistortionStrength.value = sceneParams.distortionStrength;
  u.uLoopPhase.value = loopPhase;
  u.uPointer.value.set(pointerX, pointerY);
  u.uTransparentExport.value = transparentExport ? 1.0 : 0.0;
}
