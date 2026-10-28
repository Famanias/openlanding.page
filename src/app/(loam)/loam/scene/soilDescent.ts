import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { ProceduralTextureSet } from './textures';
import { createSeededRandom } from '../logic/networkGenerator';
import { clamp01, computeSunlightState, smoothstep } from '../logic/chapters';

export interface BuiltSoilDescent {
  group: THREE.Group;
  updateDescent: (params: {
    progress: number;
    undergroundFactor: number;
    networkGrowth: number;
    elapsedSec: number;
    sunColorRgb: readonly [number, number, number];
    sunlight: number;
  }) => void;
}

/**
 * Builds the Chapter 02 -> 04 "Ant-Farm Glass" Soil Cross-Section Descent (progress ~0.26 -> 0.54):
 * 1. Breaking Ground (0.27–0.31): Overhanging mossy turf lip, overlapping leaf edges, and the mushroom's
 *    soil-clotted bulbous base in silhouette against warm above-ground light at y = 0, with the cut
 *    earth face immediately below it (never fading to black).
 * 2. Continuous Sculpted Soil Cross-Section Wall (y = 0.00 down to y = -4.40) with a custom procedural GLSL
 *    shader featuring irregular noise-blended soil horizons, crumbly 3D normal relief, moist organic specular,
 *    filtering daylight from above, and bioluminescent foxfire cracks near the bottom:
 *    - Leaf litter (y = 0.00..-0.42): Flat/curled overlapping decayed leaves in browns & ochres with broken
 *      edges, visible veins, and fine creamy-white mycelium threads clinging to their undersides.
 *    - Humus (y = -0.42..-1.12): Dark, crumbly, moist organic soil packed with hundreds of hair-fine pale
 *      roots and root hairs, plus a small humus burrow where a tiny articulated woodlouse crawls.
 *    - Topsoil (y = -1.12..-1.92): Rich brown soil studded with embedded pebbles and small stones, crossed
 *      diagonally by a thick, tapering, branching tree root.
 *    - Subsoil (y = -1.92..-4.40): Redder, denser clay with larger rounded rocks partly embedded in the face
 *      and faint foxfire green-gold threads igniting in cracks between stones and along roots (0.41–0.49).
 * 3. Earthen Clump Pocket at Chapter 04a ([0, -2.55, 0]): Sculpted concave soil and stone cradle behind and
 *    beneath the mycelium clump so it rests naturally in earth lit by its own faint glow and filtering daylight.
 * 4. Foreground Parallax Depth: Fine soil grains, small crumbs, hanging root tips, out-of-focus bokeh particles,
 *    and fine dust drifting through the narrow earthen gap faster than the wall behind them.
 */
export function buildSoilDescentCrossSection(
  textures: ProceduralTextureSet,
  seed = 3091,
): BuiltSoilDescent {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'AntFarmSoilCrossSection';

  const dummy = new THREE.Object3D();
  const itemColor = new THREE.Color();

  // Helper: deterministic 3D spatial relief for the cut soil wall at (x, y)
  const getWallZAt = (x: number, y: number): number => {
    // Base plane sits at z = -0.16, curving gently forward at lateral edges like a narrow trench
    const lateralCurve = Math.min(0.82, Math.pow(Math.abs(x) * 0.27, 2.0) * 0.45);

    // Recess slightly right behind the hero mushroom bulb at (0, 0, 0) so the bulb sits cleanly on the cut rim
    const dxBulb = x / 0.52;
    const dyBulb = y / 0.28;
    const bulbNotch =
      dxBulb * dxBulb + dyBulb * dyBulb < 1.2
        ? -0.12 * Math.exp(-(dxBulb * dxBulb + dyBulb * dyBulb) * 1.6)
        : 0;

    // Concave earthen pocket carved around the Chapter 4a mycelium clump at (0, -2.55, 0)
    // Clump radius is ~0.48, so the back of the pocket recesses to z = -0.54 and cradles underneath at y = -2.96
    const dxClump = x / 0.92;
    const dyClump = (y - -2.55) / 0.58;
    const distClumpSq = dxClump * dxClump + dyClump * dyClump;
    const pocketRecess = distClumpSq < 1.4 ? -0.40 * Math.exp(-distClumpSq * 1.6) : 0;

    // Lower earthen shelf beneath the clump at y = -2.98.. -3.35 juts forward to z = +0.22 so the clump sits on soil
    const dxLip = x / 0.95;
    const dyLip = (y - -3.02) / 0.28;
    const lipSupport =
      dxLip * dxLip + dyLip * dyLip < 1.3
        ? 0.32 * Math.exp(-(dxLip * dxLip + dyLip * dyLip) * 1.6)
        : 0;

    // Small humus burrow / tunnel at (x = +0.38, y = -0.78) for the tiny woodlouse
    const dxTunnel = (x - 0.38) / 0.28;
    const dyTunnel = (y - -0.78) / 0.12;
    const tunnelRecess =
      dxTunnel * dxTunnel + dyTunnel * dyTunnel < 1.2
        ? -0.22 * Math.exp(-(dxTunnel * dxTunnel + dyTunnel * dyTunnel) * 2.0)
        : 0;

    // Multi-octave organic soil crags & ledges
    const crag1 = Math.sin(x * 1.9 + y * 2.3) * Math.cos(x * 1.3 - y * 3.1) * 0.08;
    const crag2 = Math.sin(x * 4.7 - y * 5.2 + 1.4) * 0.035;
    const crag3 = Math.cos(x * 9.5 + y * 8.8) * 0.015;

    return (
      -0.16 +
      lateralCurve +
      bulbNotch +
      pocketRecess +
      lipSupport +
      tunnelRecess +
      crag1 +
      crag2 +
      crag3
    );
  };

  // ============================================================================
  // 1. CONTINUOUS SCULPTED 3D SOIL CROSS-SECTION WALL (y = 0.00 down to -4.40)
  // ============================================================================
  const wallWidth = 8.6;
  const wallHeight = 4.40;
  const wallGeo = new THREE.PlaneGeometry(wallWidth, wallHeight, 120, 112);
  // Top edge is right at the forest floor surface line y = 0.00, bottom is at y = -4.40
  wallGeo.translate(0, -wallHeight * 0.5, 0);

  const wPos = wallGeo.attributes.position;
  for (let i = 0; i < wPos.count; i++) {
    const vx = wPos.getX(i);
    const vy = wPos.getY(i);
    wPos.setZ(i, getWallZAt(vx, vy));
  }
  wallGeo.computeVertexNormals();

  const wallUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uOpacity: { value: 1 },
    uFoxfireGlow: { value: 0 },
    uSunColor: { value: new THREE.Color('#f7e7ce') },
    uSunIntensity: { value: 1.0 },
  };

  const wallMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: wallUniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewPos;

      void main() {
        vUv = uv;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vec4 mvPos = viewMatrix * worldPosition;
        vViewPos = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform float uOpacity;
      uniform float uFoxfireGlow;
      uniform vec3 uSunColor;
      uniform float uSunIntensity;

      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewPos;

      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; i++) {
          v += a * noise2(p);
          p = rot * p * 2.07 + vec2(13.1, 7.7);
          a *= 0.5;
        }
        return v;
      }

      // Ridged noise for narrow stone cracks & root fissures
      float ridgedCracks(vec2 p) {
        float n1 = abs(noise2(p * 3.6) - 0.5) * 2.0;
        float n2 = abs(noise2(p * 7.8 + vec2(4.2, -3.1)) - 0.5) * 2.0;
        float crack = 1.0 - smoothstep(0.0, 0.095, n1 * 0.65 + n2 * 0.35);
        return crack;
      }

      void main() {
        vec2 p = vWorldPos.xy;

        // Multi-scale soil crumb texture & normal perturbation
        float macroFbm = fbm(p * 1.65);
        float medCrumb = fbm(p * 6.5 + vec2(macroFbm * 1.4));
        float fineGrain = noise2(p * 28.0) * 0.55 + noise2(p * 64.0) * 0.45;
        float crumbHeight = macroFbm * 0.45 + medCrumb * 0.38 + fineGrain * 0.17;

        vec3 dPdx = dFdx(vWorldPos);
        vec3 dPdy = dFdy(vWorldPos);
        float dHdx = dFdx(crumbHeight);
        float dHdy = dFdy(crumbHeight);
        vec3 perturbedNormal = normalize(
          vWorldNormal - (dPdx * dHdx + dPdy * dHdy) * 4.8
        );

        // Irregular, noise-warped horizon depth coordinate (no straight bands)
        float horizonWarp = (macroFbm - 0.5) * 0.25 + (medCrumb - 0.5) * 0.09;
        float wy = vWorldPos.y + horizonWarp;

        // Layer 1: Leaf Litter & O-Horizon (y = 0.00 .. -0.42)
        float leafStriation = noise2(vec2(p.x * 5.0, p.y * 32.0 + macroFbm * 4.0));
        vec3 litterDark = vec3(0.24, 0.15, 0.08);
        vec3 litterOchre = vec3(0.55, 0.35, 0.15);
        vec3 litterColor = mix(litterDark, litterOchre, leafStriation * 0.75 + fineGrain * 0.25);
        float whiteHyphae = smoothstep(0.74, 0.91, fbm(vec2(p.x * 9.0, p.y * 14.0))) * smoothstep(-0.46, -0.04, wy);
        litterColor = mix(litterColor, vec3(0.88, 0.84, 0.75), whiteHyphae * 0.58);

        // Layer 2: Humus (y = -0.42 .. -1.12)
        // Dark, crumbly, moist organic soil
        vec3 humusDark = vec3(0.15, 0.10, 0.068);
        vec3 humusRich = vec3(0.27, 0.185, 0.12);
        vec3 humusPaleFlecks = vec3(0.45, 0.35, 0.24);
        vec3 humusColor = mix(humusDark, humusRich, medCrumb);
        humusColor = mix(humusColor, humusPaleFlecks, smoothstep(0.74, 0.90, fineGrain) * 0.32);

        // Layer 3: Topsoil (y = -1.12 .. -1.92)
        // Brown soil with mineral sand/pebble mottling
        vec3 topsoilBase = vec3(0.32, 0.21, 0.13);
        vec3 topsoilWarm = vec3(0.45, 0.31, 0.19);
        vec3 topsoilPebble = vec3(0.54, 0.43, 0.33);
        vec3 topsoilColor = mix(topsoilBase, topsoilWarm, macroFbm * 0.6 + medCrumb * 0.4);
        topsoilColor = mix(topsoilColor, topsoilPebble, smoothstep(0.72, 0.88, fineGrain) * 0.38);

        // Layer 4: Subsoil (y = -1.92 .. -4.40)
        // Redder, denser iron-rich terracotta clay
        vec3 clayDeep = vec3(0.38, 0.18, 0.11);
        vec3 clayRed = vec3(0.56, 0.27, 0.16);
        vec3 clayOchre = vec3(0.64, 0.36, 0.22);
        vec3 subsoilColor = mix(clayDeep, clayRed, medCrumb * 0.7 + macroFbm * 0.3);
        subsoilColor = mix(subsoilColor, clayOchre, smoothstep(0.66, 0.86, fineGrain) * 0.35);

        // Irregular blended transitions between the 4 layers
        float tHumus = smoothstep(-0.30, -0.52, wy);
        float tTopsoil = smoothstep(-0.98, -1.26, wy);
        float tSubsoil = smoothstep(-1.76, -2.08, wy);

        vec3 soilAlbedo = mix(litterColor, humusColor, tHumus);
        soilAlbedo = mix(soilAlbedo, topsoilColor, tTopsoil);
        soilAlbedo = mix(soilAlbedo, subsoilColor, tSubsoil);

        // Darken recessed crevices / woodlouse tunnel & clod ambient occlusion
        float cavityAo = smoothstep(-0.44, 0.05, vWorldPos.z);
        float crumbAo = 0.68 + 0.32 * smoothstep(0.22, 0.75, crumbHeight);
        soilAlbedo *= (0.72 + 0.28 * cavityAo) * crumbAo;

        // ======================================================================
        // LIGHTING: Warm daylight filtering from above -> cooler dim light at depth
        //           + Foxfire green-gold cracks & pocket glow near bottom (0.41..0.52)
        // ======================================================================
        vec3 viewDir = normalize(vViewPos);
        vec3 topLightDir = normalize(vec3(-0.28, 0.76, 0.58));
        float ndotl = max(0.0, dot(perturbedNormal, topLightDir));

        // Depth attenuation from y = 0 down to y = -3.6 (dims & shifts cooler with depth, never goes to black)
        float depthMeters = max(0.0, -vWorldPos.y);
        float daylightAtten = exp(-depthMeters * 0.38);
        vec3 warmDaylight = mix(vec3(0.96, 0.84, 0.66), uSunColor, 0.65) * uSunIntensity;
        vec3 coolFilteredLight = vec3(0.48, 0.52, 0.50);
        vec3 depthLightColor = mix(coolFilteredLight, warmDaylight, daylightAtten);

        float diffuseStrength = (0.40 + 0.66 * ndotl) * (0.46 + 0.64 * daylightAtten);
        vec3 litColor = soilAlbedo * mix(vec3(1.0), depthLightColor * 1.32, 0.75) * diffuseStrength * 1.42;

        // Moist specular micro-highlights on damp humus & clay clods
        float moistureMask = mix(0.65, 1.0, tHumus * (1.0 - tTopsoil * 0.4));
        vec3 halfVec = normalize(topLightDir + viewDir);
        float spec = pow(max(0.0, dot(perturbedNormal, halfVec)), 26.0) * smoothstep(0.55, 0.88, fineGrain);
        litColor += depthLightColor * spec * moistureMask * 0.24;

        // Warm surface rim glow right at the Breaking Ground horizon (y = -0.14..0.00)
        float surfaceRim = smoothstep(-0.15, 0.0, vWorldPos.y);
        litColor += warmDaylight * surfaceRim * 0.32;

        // Foxfire green-gold cracks between subsoil stones & around the clump pocket (y = -1.50..-3.35)
        float subsoilZone = smoothstep(-1.42, -1.90, wy) * (1.0 - smoothstep(-3.15, -3.65, wy));
        float crackPattern = ridgedCracks(p * 1.35 + vec2(0.0, macroFbm * 0.4));
        float pulseWave = 0.65 + 0.35 * sin(uTime * 2.2 - vWorldPos.y * 3.5 + p.x * 2.0);
        vec3 foxfireColor = vec3(0.72, 0.88, 0.24);
        float crackGlow = crackPattern * subsoilZone * uFoxfireGlow * pulseWave;
        litColor += foxfireColor * crackGlow * 0.88;

        // Soft Foxfire + warm daylight bounce inside the Chapter 4a clump pocket at (0, -2.55, 0)
        float distToPocket = length((vWorldPos.xy - vec2(0.0, -2.55)) * vec2(0.82, 1.05));
        float pocketBounce = exp(-distToPocket * distToPocket * 1.3);
        vec3 pocketLight = mix(vec3(0.60, 0.52, 0.40), foxfireColor, 0.52) * (0.35 + 0.55 * uFoxfireGlow);
        litColor += soilAlbedo * pocketLight * pocketBounce * 1.65;

        // Lateral & deep bottom fade (well below the 4a camera frustum at y = -3.85..-4.38)
        float lateralFade = 1.0 - smoothstep(3.2, 4.25, abs(vWorldPos.x));
        float bottomFade = 1.0 - smoothstep(-3.85, -4.38, vWorldPos.y);

        // Enforce anti-black floor and anti-white ceiling during descent
        vec3 safeFloor = soilAlbedo * 0.32;
        litColor = clamp(max(litColor, safeFloor), vec3(0.045, 0.032, 0.022), vec3(0.88));

        gl_FragColor = vec4(litColor, uOpacity * lateralFade * bottomFade);
      }
    `,
  });

  const wallMesh = new THREE.Mesh(wallGeo, wallMat);
  wallMesh.receiveShadow = true;
  group.add(wallMesh);

  // ============================================================================
  // 2. BREAKING GROUND SURFACE SILHOUETTE BACKLIGHT & OVERHANGING TURF LIP (y = 0)
  // ============================================================================
  // Warm above-ground horizon glow plane behind the mushroom base so at 0.27-0.31 the ground
  // surface line, moss tufts, leaf edges, and mushroom bulb read in crisp silhouette
  const horizonGlowGeo = new THREE.PlaneGeometry(8.2, 1.65);
  horizonGlowGeo.translate(0, 0.62, -0.78);
  const horizonGlowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uOpacity: { value: 0.0 },
      uSunColor: { value: new THREE.Color('#f5d6a7') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uSunColor;
      varying vec2 vUv;
      void main() {
        float horiz = exp(-pow((vUv.x - 0.5) * 2.1, 2.0));
        float vert = smoothstep(0.0, 0.14, vUv.y) * exp(-vUv.y * 2.2);
        vec3 warmMist = mix(vec3(0.88, 0.68, 0.42), uSunColor, 0.65);
        gl_FragColor = vec4(warmMist, horiz * vert * uOpacity * 0.68);
      }
    `,
  });
  const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
  group.add(horizonGlowMesh);

  // Dense silhouette moss tufts right along the cut surface edge (y = 0.0, z = -0.05..+0.25)
  const rimMossCount = 460;
  const rimMossGeo = new THREE.ConeGeometry(0.016, 0.13, 4);
  rimMossGeo.translate(0, 0.06, 0);
  const rimMossMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.9,
    metalness: 0.0,
  });
  const rimMossInst = new THREE.InstancedMesh(rimMossGeo, rimMossMat, rimMossCount);
  for (let i = 0; i < rimMossCount; i++) {
    const mx = (rand() - 0.5) * 4.4;
    const mz = getWallZAt(mx, 0) + 0.02 + rand() * 0.26;
    const my = -0.015 + rand() * 0.03;
    dummy.position.set(mx, my, mz);
    dummy.rotation.set((rand() - 0.5) * 0.45, rand() * Math.PI * 2, (rand() - 0.5) * 0.45);
    const s = 0.8 + rand() * 1.05;
    dummy.scale.set(s, s * (0.85 + rand() * 0.65), s);
    dummy.updateMatrix();
    rimMossInst.setMatrixAt(i, dummy.matrix);
    itemColor.setHSL(0.24 + (rand() - 0.5) * 0.04, 0.48, 0.14 + rand() * 0.10);
    rimMossInst.setColorAt(i, itemColor);
  }
  rimMossInst.instanceMatrix.needsUpdate = true;
  if (rimMossInst.instanceColor) rimMossInst.instanceColor.needsUpdate = true;
  rimMossInst.computeBoundingSphere();
  group.add(rimMossInst);

  // ============================================================================
  // 3. LAYER 1: LEAF LITTER (y = +0.02 .. -0.44) + WHITE MYCELIUM ON UNDERSIDES
  // ============================================================================
  const decayedLeafGeo = new THREE.PlaneGeometry(0.38, 0.24, 7, 5);
  decayedLeafGeo.rotateX(-Math.PI / 2);
  const dlPos = decayedLeafGeo.attributes.position;
  for (let i = 0; i < dlPos.count; i++) {
    const lx = dlPos.getX(i);
    const lz = dlPos.getZ(i);
    const u = clamp01((lx + 0.19) / 0.38);
    // Irregular broken/notched leaf margin
    const notch = 1.0 - 0.18 * Math.pow(Math.sin(u * Math.PI * 6.0), 4.0);
    const widthEnv = Math.sin(Math.pow(u, 0.82) * Math.PI) * notch;
    const shapedZ = lz * Math.max(0.08, widthEnv);
    const curlY =
      Math.pow(shapedZ / 0.12, 2.0) * 0.036 + Math.sin(u * Math.PI * 2.0) * 0.016;
    dlPos.setXYZ(i, lx, curlY, shapedZ);
  }
  decayedLeafGeo.computeVertexNormals();

  const litterLeafCount = 115;
  const litterLeafMat = new THREE.MeshStandardMaterial({
    map: textures.leafColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.022,
    color: new THREE.Color('#ffffff'),
    roughness: 0.78,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const litterLeafInst = new THREE.InstancedMesh(
    decayedLeafGeo,
    litterLeafMat,
    litterLeafCount,
  );

  const leafHyphaePositions: number[] = [];

  for (let i = 0; i < litterLeafCount; i++) {
    const lx = (rand() - 0.5) * 4.2;
    const ly = 0.01 - Math.pow(rand(), 0.85) * 0.42;
    const wallZ = getWallZAt(lx, ly);
    const lz = wallZ + 0.03 + rand() * 0.34;

    const rotX = (rand() - 0.5) * 0.55 + 0.22; // Tilted slightly so undersides & broken edges read clearly
    const rotY = rand() * Math.PI * 2;
    const rotZ = (rand() - 0.5) * 0.48;
    dummy.position.set(lx, ly, lz);
    dummy.rotation.set(rotX, rotY, rotZ);
    const scale = 0.72 + rand() * 0.95;
    dummy.scale.set(scale, scale, scale * (0.82 + rand() * 0.35));
    dummy.updateMatrix();
    litterLeafInst.setMatrixAt(i, dummy.matrix);

    // Rich browns, russets, and warm golden ochres
    itemColor.setHSL(
      0.068 + rand() * 0.045,
      0.52 + rand() * 0.22,
      0.32 + rand() * 0.22,
    );
    litterLeafInst.setColorAt(i, itemColor);

    // 3-5 branching white mycelium threads clinging to the underside of each leaf
    const threadBranches = 3 + Math.floor(rand() * 3);
    for (let b = 0; b < threadBranches; b++) {
      let hx = lx + (rand() - 0.5) * 0.14 * scale;
      let hy = ly - 0.008 - rand() * 0.016;
      let hz = lz + (rand() - 0.5) * 0.10 * scale;
      const segs = 4;
      for (let s = 0; s < segs; s++) {
        const nx = hx + (rand() - 0.5) * 0.075 * scale;
        const ny = hy - rand() * 0.024;
        const nz = hz + (rand() - 0.5) * 0.065 * scale;
        leafHyphaePositions.push(hx, hy, hz, nx, ny, nz);
        hx = nx;
        hy = ny;
        hz = nz;
      }
    }
  }
  litterLeafInst.instanceMatrix.needsUpdate = true;
  if (litterLeafInst.instanceColor) litterLeafInst.instanceColor.needsUpdate = true;
  litterLeafInst.computeBoundingSphere();
  group.add(litterLeafInst);

  const leafHyphaeGeo = new THREE.BufferGeometry();
  leafHyphaeGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(leafHyphaePositions, 3),
  );
  const leafHyphaeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#eee6d5'),
    transparent: true,
    opacity: 0.78,
  });
  const leafHyphaeLines = new THREE.LineSegments(leafHyphaeGeo, leafHyphaeMat);
  group.add(leafHyphaeLines);

  // ============================================================================
  // 4. LAYER 2: HUMUS (y = -0.40 .. -1.12) — PALE ROOTLETS, ROOT HAIRS & WOODLOUSE
  // ============================================================================
  const fineRootPositions: number[] = [];
  const rootHairPositions: number[] = [];
  const humusRootTubeGeos: THREE.BufferGeometry[] = [];

  for (let r = 0; r < 38; r++) {
    const startX = (rand() - 0.5) * 3.8;
    const startY = -0.22 - rand() * 0.52;
    const startZ = getWallZAt(startX, startY) + 0.04 + rand() * 0.20;
    const pts: THREE.Vector3[] = [];
    let cx = startX;
    let cy = startY;
    let cz = startZ;
    const steps = 6;
    for (let s = 0; s <= steps; s++) {
      pts.push(new THREE.Vector3(cx, cy, cz));
      cx += (rand() - 0.5) * 0.14;
      cy -= 0.08 + rand() * 0.07;
      cz = getWallZAt(cx, cy) + 0.03 + rand() * 0.16;
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.006 + rand() * 0.0045, 5, false);
    humusRootTubeGeos.push(tubeGeo);
  }

  const mergedHumusRootsGeo = mergeGeometries(humusRootTubeGeos, false);
  for (const g of humusRootTubeGeos) g.dispose();
  const paleRootMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c4b08f'),
    roughness: 0.84,
    metalness: 0.02,
  });
  const humusRootsMesh = new THREE.Mesh(mergedHumusRootsGeo, paleRootMat);
  group.add(humusRootsMesh);

  for (let i = 0; i < 360; i++) {
    let rx = (rand() - 0.5) * 4.0;
    let ry = -0.25 - rand() * 0.92;
    let rz = getWallZAt(rx, ry) + 0.02 + rand() * 0.24;
    const segs = 5;
    for (let s = 0; s < segs; s++) {
      const nx = rx + (rand() - 0.5) * 0.09;
      const ny = ry - (0.04 + rand() * 0.055);
      const nz = rz + (rand() - 0.5) * 0.06;
      fineRootPositions.push(rx, ry, rz, nx, ny, nz);

      if (rand() > 0.25) {
        const hx = nx + (rand() - 0.5) * 0.055;
        const hy = ny - (rand() - 0.5) * 0.03;
        const hz = nz + (rand() - 0.5) * 0.045;
        rootHairPositions.push(nx, ny, nz, hx, hy, hz);
      }
      rx = nx;
      ry = ny;
      rz = nz;
    }
  }

  const fineRootGeo = new THREE.BufferGeometry();
  fineRootGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(fineRootPositions, 3),
  );
  const fineRootMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#ccb898'),
    transparent: true,
    opacity: 0.70,
  });
  const fineRootLines = new THREE.LineSegments(fineRootGeo, fineRootMat);
  group.add(fineRootLines);

  const rootHairGeo = new THREE.BufferGeometry();
  rootHairGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(rootHairPositions, 3),
  );
  const rootHairMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#dfd3bd'),
    transparent: true,
    opacity: 0.48,
  });
  const rootHairLines = new THREE.LineSegments(rootHairGeo, rootHairMat);
  group.add(rootHairLines);

  // Tiny naturalistic articulated woodlouse (Oniscus asellus) crossing the humus burrow at y = -0.78
  const woodlouseGroup = new THREE.Group();
  woodlouseGroup.name = 'HumusWoodlouse';
  const carapaceMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5c5046'),
    roughness: 0.48,
    metalness: 0.08,
  });
  const segmentGeos: THREE.BufferGeometry[] = [];
  for (let seg = 0; seg < 7; seg++) {
    const u = (seg - 3) / 3.5;
    const segW = 0.024 * Math.sqrt(Math.max(0.15, 1 - u * u * 0.65));
    const segGeo = new THREE.SphereGeometry(segW, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.58);
    segGeo.scale(0.55, 0.42, 1.0);
    segGeo.translate(seg * 0.009 - 0.027, 0, 0);
    segmentGeos.push(segGeo);
  }
  const antGeo1 = new THREE.CylinderGeometry(0.0009, 0.0014, 0.020, 4);
  antGeo1.rotateZ(-Math.PI * 0.35);
  antGeo1.translate(0.038, 0.003, 0.007);
  const antGeo2 = new THREE.CylinderGeometry(0.0009, 0.0014, 0.020, 4);
  antGeo2.rotateZ(-Math.PI * 0.35);
  antGeo2.translate(0.038, 0.003, -0.007);
  segmentGeos.push(antGeo1, antGeo2);

  const mergedWoodlouseGeo = mergeGeometries(segmentGeos, false);
  for (const g of segmentGeos) g.dispose();
  const woodlouseMesh = new THREE.Mesh(mergedWoodlouseGeo, carapaceMat);
  woodlouseGroup.add(woodlouseMesh);
  woodlouseGroup.position.set(0.38, -0.80, getWallZAt(0.38, -0.80) + 0.04);
  group.add(woodlouseGroup);

  // ============================================================================
  // 5. LAYER 3: TOPSOIL (y = -1.08 .. -1.92) — THICK DIAGONAL BRANCHING TREE ROOT & PEBBLES
  // ============================================================================
  const diagonalRootGeos: THREE.BufferGeometry[] = [];

  const buildTaperedRootCurve = (
    waypoints: THREE.Vector3[],
    rStart: number,
    rEnd: number,
    tubularSegs: number,
    radialSegs: number,
  ) => {
    const curve = new THREE.CatmullRomCurve3(waypoints);
    const tube = new THREE.TubeGeometry(curve, tubularSegs, 1.0, radialSegs, false);
    const posAttr = tube.attributes.position;
    const uvAttr = tube.attributes.uv;
    const centerPt = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      const t = clamp01(uvAttr.getX(i));
      const angle = uvAttr.getY(i) * Math.PI * 2;
      curve.getPointAt(t, centerPt);
      const radius = rStart * Math.pow(1 - t, 0.78) + rEnd * t;
      const ridge =
        1.0 +
        0.14 * Math.sin(angle * 5.0 + t * 18.0) +
        0.07 * Math.cos(angle * 3.0 - t * 9.0);
      const offsetX = (posAttr.getX(i) - centerPt.x) * radius * ridge;
      const offsetY = (posAttr.getY(i) - centerPt.y) * radius * ridge;
      const offsetZ = (posAttr.getZ(i) - centerPt.z) * radius * ridge;
      posAttr.setXYZ(
        i,
        centerPt.x + offsetX,
        centerPt.y + offsetY,
        centerPt.z + offsetZ,
      );
    }
    tube.computeVertexNormals();
    diagonalRootGeos.push(tube);
  };

  // Main diagonal trunk root crossing the topsoil frame (upper-left [-2.15, -1.02] -> center [0.0, -1.42] -> lower-right [2.15, -1.88])
  buildTaperedRootCurve(
    [
      new THREE.Vector3(-2.15, -0.98, 0.14),
      new THREE.Vector3(-1.18, -1.20, 0.20),
      new THREE.Vector3(-0.25, -1.38, 0.19),
      new THREE.Vector3(0.55, -1.56, 0.16),
      new THREE.Vector3(1.38, -1.74, 0.12),
      new THREE.Vector3(2.20, -1.94, 0.04),
    ],
    0.13,
    0.026,
    48,
    12,
  );

  // Secondary branching forks off the main diagonal tree root
  buildTaperedRootCurve(
    [
      new THREE.Vector3(-0.92, -1.24, 0.18),
      new THREE.Vector3(-0.58, -1.52, 0.20),
      new THREE.Vector3(-0.36, -1.82, 0.14),
      new THREE.Vector3(-0.20, -2.10, 0.05),
    ],
    0.065,
    0.008,
    24,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(-0.10, -1.40, 0.18),
      new THREE.Vector3(0.32, -1.26, 0.14),
      new THREE.Vector3(0.82, -1.18, 0.08),
      new THREE.Vector3(1.28, -1.24, 0.03),
    ],
    0.050,
    0.007,
    22,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(0.45, -1.53, 0.15),
      new THREE.Vector3(0.68, -1.78, 0.17),
      new THREE.Vector3(0.54, -2.08, 0.12),
      new THREE.Vector3(0.32, -2.32, 0.05),
    ],
    0.052,
    0.006,
    24,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(-1.55, -1.62, 0.12),
      new THREE.Vector3(-1.02, -1.82, 0.15),
      new THREE.Vector3(-0.58, -2.04, 0.12),
      new THREE.Vector3(-0.34, -2.30, 0.06),
    ],
    0.054,
    0.008,
    22,
    8,
  );

  const mergedDiagonalRootGeo = mergeGeometries(diagonalRootGeos, false);
  for (const g of diagonalRootGeos) g.dispose();

  // Keep material.color at #ffffff so textures.barkColor is not darkened
  const diagonalRootMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.055,
    color: new THREE.Color('#ffffff'),
    roughness: 0.82,
    metalness: 0.02,
  });
  const diagonalRootMesh = new THREE.Mesh(mergedDiagonalRootGeo, diagonalRootMat);
  diagonalRootMesh.castShadow = true;
  diagonalRootMesh.receiveShadow = true;
  group.add(diagonalRootMesh);

  // Topsoil pebbles and small stones (y = -1.02 .. -1.96), smooth & earth-toned
  const pebbleCount = 175;
  const pebbleGeo = new THREE.IcosahedronGeometry(0.036, 2);
  const pPos = pebbleGeo.attributes.position;
  for (let i = 0; i < pPos.count; i++) {
    const px = pPos.getX(i);
    const py = pPos.getY(i);
    const pz = pPos.getZ(i);
    const s = 1.0 + 0.16 * Math.sin(px * 35.0 + py * 28.0) * Math.cos(pz * 32.0);
    pPos.setXYZ(i, px * s * 1.12, py * s * 0.72, pz * s * 0.85);
  }
  pebbleGeo.computeVertexNormals();

  const pebbleMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.025,
    color: new THREE.Color('#ffffff'),
    roughness: 0.86,
    metalness: 0.03,
  });
  const pebbleInst = new THREE.InstancedMesh(pebbleGeo, pebbleMat, pebbleCount);

  for (let i = 0; i < pebbleCount; i++) {
    const px = (rand() - 0.5) * 4.4;
    const py = -1.00 - rand() * 1.02;
    const pz = getWallZAt(px, py) + 0.005 + rand() * 0.05;
    dummy.position.set(px, py, pz);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    const scale = 0.55 + Math.pow(rand(), 0.75) * 1.25;
    dummy.scale.set(
      scale * (0.85 + rand() * 0.35),
      scale * (0.65 + rand() * 0.35),
      scale * 0.75,
    );
    dummy.updateMatrix();
    pebbleInst.setMatrixAt(i, dummy.matrix);

    // Earth-stained river pebble tones (never bright white/beige)
    itemColor.setHSL(
      0.068 + (rand() - 0.5) * 0.035,
      0.26 + rand() * 0.16,
      0.20 + rand() * 0.13,
    );
    pebbleInst.setColorAt(i, itemColor);
  }
  pebbleInst.instanceMatrix.needsUpdate = true;
  if (pebbleInst.instanceColor) pebbleInst.instanceColor.needsUpdate = true;
  pebbleInst.computeBoundingSphere();
  group.add(pebbleInst);

  // ============================================================================
  // 6. LAYER 4: SUBSOIL CLAY & EARTHEN POCKET ROCKS (y = -1.85 .. -3.35)
  // ============================================================================
  const boulderGeo = new THREE.IcosahedronGeometry(0.18, 2);
  const bPos = boulderGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const bx = bPos.getX(i);
    const by = bPos.getY(i);
    const bz = bPos.getZ(i);
    const warp =
      1.0 +
      0.16 * Math.sin(bx * 11.0 + by * 9.0) +
      0.08 * Math.cos(by * 17.0 - bz * 14.0);
    bPos.setXYZ(i, bx * warp * 1.15, by * warp * 0.82, bz * warp * 0.88);
  }
  boulderGeo.computeVertexNormals();

  const pocketRockPlacements: Array<{
    pos: [number, number, number];
    scale: [number, number, number];
    rot: [number, number, number];
    hsl: [number, number, number];
  }> = [
    // Framing the Chapter 4a clump pocket at [0, -2.55, 0]
    { pos: [-0.70, -2.38, -0.05], scale: [1.28, 1.05, 0.92], rot: [0.3, 0.8, 0.2], hsl: [0.055, 0.34, 0.23] },
    { pos: [0.74, -2.42, -0.03], scale: [1.35, 0.98, 0.90], rot: [-0.2, 1.4, -0.3], hsl: [0.048, 0.38, 0.22] },
    { pos: [-0.54, -2.88, 0.08], scale: [1.18, 0.80, 0.88], rot: [0.4, 2.1, 0.1], hsl: [0.065, 0.30, 0.24] },
    { pos: [0.56, -2.90, 0.06], scale: [1.22, 0.82, 0.90], rot: [0.1, -0.9, 0.4], hsl: [0.058, 0.36, 0.23] },
    { pos: [0.02, -3.02, 0.12], scale: [1.48, 0.72, 0.95], rot: [0.2, 0.3, -0.1], hsl: [0.050, 0.32, 0.21] },
    { pos: [-0.40, -2.10, -0.14], scale: [1.05, 0.88, 0.82], rot: [-0.4, 0.5, 0.3], hsl: [0.058, 0.35, 0.24] },
    { pos: [0.44, -2.06, -0.12], scale: [1.12, 0.92, 0.85], rot: [0.5, -0.6, 0.2], hsl: [0.045, 0.38, 0.22] },
  ];

  const totalSubsoilRocks = 48;
  const boulderMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.045,
    color: new THREE.Color('#ffffff'),
    roughness: 0.86,
    metalness: 0.03,
  });
  const boulderInst = new THREE.InstancedMesh(boulderGeo, boulderMat, totalSubsoilRocks);

  for (let i = 0; i < totalSubsoilRocks; i++) {
    if (i < pocketRockPlacements.length) {
      const p = pocketRockPlacements[i];
      dummy.position.set(p.pos[0], p.pos[1], p.pos[2]);
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      dummy.scale.set(p.scale[0], p.scale[1], p.scale[2]);
      dummy.updateMatrix();
      boulderInst.setMatrixAt(i, dummy.matrix);
      itemColor.setHSL(p.hsl[0], p.hsl[1], p.hsl[2]);
      boulderInst.setColorAt(i, itemColor);
    } else {
      let rx = (rand() - 0.5) * 4.5;
      const ry = -1.80 - rand() * 1.55;
      if (Math.abs(rx) < 0.58 && ry < -2.15 && ry > -2.88) {
        rx += rx >= 0 ? 0.68 : -0.68;
      }
      const rz = getWallZAt(rx, ry) - 0.03 + rand() * 0.07;
      dummy.position.set(rx, ry, rz);
      dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
      const s = 0.65 + rand() * 1.15;
      dummy.scale.set(s * (0.9 + rand() * 0.35), s * (0.7 + rand() * 0.3), s * 0.82);
      dummy.updateMatrix();
      boulderInst.setMatrixAt(i, dummy.matrix);

      // Warm terracotta-stone, ironstone, and weathered ochre-slate
      itemColor.setHSL(
        0.045 + rand() * 0.035,
        0.28 + rand() * 0.16,
        0.18 + rand() * 0.12,
      );
      boulderInst.setColorAt(i, itemColor);
    }
  }
  boulderInst.instanceMatrix.needsUpdate = true;
  if (boulderInst.instanceColor) boulderInst.instanceColor.needsUpdate = true;
  boulderInst.computeBoundingSphere();
  group.add(boulderInst);

  // ============================================================================
  // 7. EARLY FOXFIRE THREADS IN SUBSOIL CRACKS & ALONG ROOTS (0.41 -> 0.52)
  // ============================================================================
  const crackThreadGeos: THREE.BufferGeometry[] = [];
  const crackLinePositions: number[] = [];

  const crackPaths: THREE.Vector3[][] = [
    // Along lower diagonal root branch into clump pocket
    [
      new THREE.Vector3(0.58, -1.62, 0.18),
      new THREE.Vector3(0.62, -1.86, 0.16),
      new THREE.Vector3(0.46, -2.10, 0.13),
      new THREE.Vector3(0.24, -2.32, 0.09),
      new THREE.Vector3(0.06, -2.50, 0.05),
    ],
    // Left root & stone crevice into clump pocket
    [
      new THREE.Vector3(-0.78, -1.66, 0.16),
      new THREE.Vector3(-0.56, -1.92, 0.14),
      new THREE.Vector3(-0.42, -2.18, 0.11),
      new THREE.Vector3(-0.22, -2.38, 0.08),
      new THREE.Vector3(-0.05, -2.52, 0.05),
    ],
    // Crevice between right subsoil boulders
    [
      new THREE.Vector3(1.18, -1.90, 0.10),
      new THREE.Vector3(0.86, -2.14, 0.09),
      new THREE.Vector3(0.58, -2.32, 0.08),
      new THREE.Vector3(0.28, -2.48, 0.06),
    ],
    // Crevice between left subsoil boulders
    [
      new THREE.Vector3(-1.15, -1.98, 0.10),
      new THREE.Vector3(-0.82, -2.22, 0.09),
      new THREE.Vector3(-0.52, -2.42, 0.07),
      new THREE.Vector3(-0.18, -2.54, 0.05),
    ],
    // Deep pocket floor veins beneath the clump
    [
      new THREE.Vector3(-0.64, -2.90, 0.14),
      new THREE.Vector3(-0.32, -2.78, 0.12),
      new THREE.Vector3(0.0, -2.70, 0.10),
      new THREE.Vector3(0.36, -2.80, 0.12),
      new THREE.Vector3(0.68, -2.92, 0.13),
    ],
  ];

  for (let c = 0; c < 28; c++) {
    const angle = (c / 28) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const rOuter = 0.75 + rand() * 0.95;
    const rInner = 0.18 + rand() * 0.22;
    const pts: THREE.Vector3[] = [];
    const steps = 5;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const r = rOuter * (1 - t) + rInner * t;
      const vx = Math.cos(angle + (rand() - 0.5) * 0.22) * r * 1.25;
      const vy = -2.44 + Math.sin(angle) * r * 0.72 + (1 - t) * 0.25;
      const vz = getWallZAt(vx, vy) + 0.045;
      pts.push(new THREE.Vector3(vx, vy, vz));
    }
    crackPaths.push(pts);
  }

  for (let i = 0; i < crackPaths.length; i++) {
    const curve = new THREE.CatmullRomCurve3(crackPaths[i]);
    const radius = i < 5 ? 0.008 : 0.004;
    crackThreadGeos.push(new THREE.TubeGeometry(curve, 16, radius, 5, false));

    const sampled = curve.getPoints(14);
    for (let s = 0; s < sampled.length - 1; s++) {
      crackLinePositions.push(
        sampled[s].x,
        sampled[s].y,
        sampled[s].z,
        sampled[s + 1].x,
        sampled[s + 1].y,
        sampled[s + 1].z,
      );
    }
  }

  const mergedCrackTubes = mergeGeometries(crackThreadGeos, false);
  for (const g of crackThreadGeos) g.dispose();

  const foxfireCrackMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uGlow: { value: 0.0 },
      uTime: { value: 0.0 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uGlow;
      uniform float uTime;
      varying vec3 vWorldPos;
      void main() {
        if (uGlow < 0.01) discard;
        float wave = 0.55 + 0.45 * sin(uTime * 2.6 - vWorldPos.y * 4.5 + vWorldPos.x * 3.2);
        vec3 core = mix(vec3(0.62, 0.82, 0.20), vec3(0.96, 1.14, 0.44), wave);
        gl_FragColor = vec4(core, uGlow * (0.55 + 0.35 * wave));
      }
    `,
  });

  const crackThreadsMesh = new THREE.Mesh(mergedCrackTubes, foxfireCrackMat);
  group.add(crackThreadsMesh);

  const crackLineGeo = new THREE.BufferGeometry();
  crackLineGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(crackLinePositions, 3),
  );
  const crackLines = new THREE.LineSegments(crackLineGeo, foxfireCrackMat);
  group.add(crackLines);

  // ============================================================================
  // 8. FOREGROUND PARALLAX DEPTH (z = 0.72 .. 1.48)
  // ============================================================================
  // Fine soil crumbs, small dark pebbles, hanging root tips, and out-of-focus bokeh soil grains
  // that pass close to the camera and move faster than the background soil face.
  const foregroundParallaxGroup = new THREE.Group();
  foregroundParallaxGroup.name = 'ForegroundParallaxDirt';
  group.add(foregroundParallaxGroup);

  const fgCrumbCount = 190;
  const fgCrumbGeo = new THREE.IcosahedronGeometry(0.011, 1);
  const fgCrumbMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.94,
    metalness: 0.01,
  });
  const fgCrumbInst = new THREE.InstancedMesh(fgCrumbGeo, fgCrumbMat, fgCrumbCount);

  for (let i = 0; i < fgCrumbCount; i++) {
    const sideSign = i % 2 === 0 ? -1 : 1;
    const isEdge = i % 4 !== 0;
    const fx = isEdge
      ? sideSign * (0.55 + rand() * 1.10)
      : (rand() - 0.5) * 1.40;
    const fy = 0.10 - rand() * 3.60;
    const fz = 0.72 + rand() * 0.76;

    dummy.position.set(fx, fy, fz);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    const s = 0.55 + rand() * 1.35;
    dummy.scale.set(s, s * (0.7 + rand() * 0.5), s);
    dummy.updateMatrix();
    fgCrumbInst.setMatrixAt(i, dummy.matrix);

    // Rich dark soil crumb tones so foreground particles create depth without bright polygon distractions
    const depthT = clamp01(-fy / 3.0);
    itemColor.setHSL(
      0.065 - depthT * 0.015,
      0.36 + rand() * 0.14,
      0.11 + rand() * 0.09,
    );
    fgCrumbInst.setColorAt(i, itemColor);
  }
  fgCrumbInst.instanceMatrix.needsUpdate = true;
  if (fgCrumbInst.instanceColor) fgCrumbInst.instanceColor.needsUpdate = true;
  fgCrumbInst.computeBoundingSphere();
  foregroundParallaxGroup.add(fgCrumbInst);

  // Foreground hanging root tips & organic fibres in the narrow gap
  const fgRootPositions: number[] = [];
  for (let i = 0; i < 72; i++) {
    const sideSign = i % 2 === 0 ? -1 : 1;
    let rx = sideSign * (0.62 + rand() * 0.92);
    let ry = 0.05 - rand() * 3.10;
    let rz = 0.78 + rand() * 0.65;
    const segs = 4;
    for (let s = 0; s < segs; s++) {
      const nx = rx - sideSign * (0.02 + rand() * 0.045);
      const ny = ry - (0.045 + rand() * 0.06);
      const nz = rz + (rand() - 0.5) * 0.04;
      fgRootPositions.push(rx, ry, rz, nx, ny, nz);
      rx = nx;
      ry = ny;
      rz = nz;
    }
  }
  const fgRootGeo = new THREE.BufferGeometry();
  fgRootGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(fgRootPositions, 3),
  );
  const fgRootMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#786046'),
    transparent: true,
    opacity: 0.58,
  });
  const fgRootLines = new THREE.LineSegments(fgRootGeo, fgRootMat);
  foregroundParallaxGroup.add(fgRootLines);

  // Soft out-of-focus foreground bokeh soil grains & fine dust drifting in the filtering light
  const bokehCount = 260;
  const bokehPositions = new Float32Array(bokehCount * 3);
  const bokehSeeds = new Float32Array(bokehCount);
  for (let i = 0; i < bokehCount; i++) {
    bokehSeeds[i] = rand();
    bokehPositions[i * 3 + 0] = (rand() - 0.5) * 2.8;
    bokehPositions[i * 3 + 1] = 0.15 - rand() * 3.55;
    bokehPositions[i * 3 + 2] = 0.55 + rand() * 1.10;
  }
  const bokehGeo = new THREE.BufferGeometry();
  bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
  bokehGeo.setAttribute('aSeed', new THREE.BufferAttribute(bokehSeeds, 1));

  const bokehMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute float aSeed;
      uniform float uTime;
      varying float vAlpha;
      varying float vDepthNorm;
      void main() {
        vec3 pos = position;
        pos.x += sin(uTime * 0.42 + aSeed * 14.0) * 0.05;
        pos.y += cos(uTime * 0.36 + aSeed * 11.0) * 0.04;
        vDepthNorm = clamp(-pos.y / 3.0, 0.0, 1.0);
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        float isBokehCrumb = step(0.68, aSeed);
        float baseSize = mix(10.0, 26.0, isBokehCrumb) * (0.7 + 0.6 * aSeed);
        gl_PointSize = baseSize * (1.0 / max(0.35, -mvPos.z));
        vAlpha = mix(0.42, 0.24, isBokehCrumb) * (0.65 + 0.35 * sin(uTime * 1.3 + aSeed * 6.28));
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uSprite;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vDepthNorm;
      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.04) discard;
        vec3 topDust = vec3(0.68, 0.54, 0.38);
        vec3 deepDust = vec3(0.48, 0.36, 0.26);
        vec3 col = mix(topDust, deepDust, vDepthNorm);
        gl_FragColor = vec4(col, tex.a * vAlpha * uOpacity);
      }
    `,
  });
  const bokehPoints = new THREE.Points(bokehGeo, bokehMat);
  foregroundParallaxGroup.add(bokehPoints);

  // ============================================================================
  // 9. CHAPTER 04 WIDE VIEW SUBTERRANEAN EARTH, ROOTS & STONES (0.52 -> 0.77)
  //    When the camera pulls back to z = 12.6 in Ch 04b, keeps the soil layers,
  //    roots, and stones around the network extending into the distance and fading
  //    with earthen depth fog (never floating in a black void).
  // ============================================================================
  const wideSubterraneanGroup = new THREE.Group();
  wideSubterraneanGroup.name = 'Chapter4WideSubterraneanEarth';
  group.add(wideSubterraneanGroup);

  // 9a. Wide Curved Subterranean Soil Amphitheatre (spans x = -18..+18, y = 0..-5.4, z = -9.2..+5.2)
  const wideSegsX = 96;
  const wideSegsY = 72;
  const wideGeo = new THREE.PlaneGeometry(36.0, 9.6, wideSegsX, wideSegsY);
  const wgPos = wideGeo.attributes.position;

  const getWideEarthPoint = (uNorm: number, vNorm: number): [number, number, number] => {
    // uNorm in [-1 .. +1] across width, vNorm in [0 .. 1] from top surface (y=0) down into deep basin
    const wx = uNorm * 18.0;
    // Upper 62% is the vertical/sloping stratified soil face from y = 0.05 down to y = -3.85;
    // Lower 38% curves forward from z = -8.6 to z = +5.2 as the deep subsoil floor beneath the network
    const wallT = Math.min(1.0, vNorm / 0.62);
    const floorT = Math.max(0.0, (vNorm - 0.62) / 0.38);

    const wy =
      0.04 -
      wallT * 3.85 -
      Math.pow(floorT, 1.35) * 1.45 +
      Math.sin(wx * 0.45 + vNorm * 4.0) * 0.14;

    // Curve sides gently forward so the wide camera frustum is 100% enclosed by earth
    const sideWrap = Math.pow(Math.abs(uNorm), 1.85) * 5.2;
    const cragZ =
      Math.sin(wx * 0.85 + wy * 1.4) * 0.32 +
      Math.cos(wx * 1.9 - wy * 2.1) * 0.16;
    const wz =
      -8.6 +
      sideWrap +
      Math.pow(floorT, 1.15) * 12.8 +
      wallT * 0.85 +
      cragZ;

    return [wx, wy, wz];
  };

  for (let i = 0; i < wgPos.count; i++) {
    const uNorm = wgPos.getX(i) / 18.0; // -1 .. +1
    const vNorm = 0.5 - wgPos.getY(i) / 9.6; // 0 (top) .. 1 (bottom/front)
    const [wx, wy, wz] = getWideEarthPoint(uNorm, vNorm);
    wgPos.setXYZ(i, wx, wy, wz);
  }
  wideGeo.computeVertexNormals();

  const wideEarthUniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uNetworkGrowth: { value: 0 },
    uFoxfireMult: { value: 1.0 },
    uDaylightFactor: { value: 0.78 },
    uSunColor: { value: new THREE.Color('#ffbe6b') },
    uFogColor: { value: new THREE.Color('#261c13') },
  };

  const wideEarthMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: wideEarthUniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying float vCamDist;

      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vec4 mvPos = viewMatrix * wp;
        vCamDist = length(mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      uniform float uNetworkGrowth;
      uniform float uFoxfireMult;
      uniform float uDaylightFactor;
      uniform vec3 uSunColor;
      uniform vec3 uFogColor;

      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying float vCamDist;

      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; i++) {
          v += a * noise2(p);
          p = rot * p * 2.05 + vec2(11.3, 7.1);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        if (uOpacity < 0.005) discard;

        vec2 p = vWorldPos.xy * 0.55 + vec2(vWorldPos.z * 0.25);
        float macro = fbm(p * 1.4);
        float crumb = fbm(p * 5.2 + vec2(macro));
        float grain = noise2(p * 18.0);

        float wy = vWorldPos.y + (macro - 0.5) * 0.42 + (crumb - 0.5) * 0.14;

        // Same 4 soil horizons extending across the wide subterranean cavern
        vec3 litterCol = mix(vec3(0.28, 0.18, 0.10), vec3(0.56, 0.36, 0.17), crumb);
        vec3 humusCol = mix(vec3(0.18, 0.12, 0.08), vec3(0.32, 0.22, 0.14), crumb);
        vec3 topsoilCol = mix(vec3(0.35, 0.23, 0.14), vec3(0.50, 0.35, 0.22), macro * 0.6 + grain * 0.4);
        vec3 subsoilCol = mix(vec3(0.42, 0.20, 0.12), vec3(0.60, 0.31, 0.18), crumb * 0.7 + grain * 0.3);

        float tHumus = smoothstep(-0.28, -0.62, wy);
        float tTopsoil = smoothstep(-1.10, -1.55, wy);
        float tSubsoil = smoothstep(-2.10, -2.65, wy);

        vec3 soilAlbedo = mix(litterCol, humusCol, tHumus);
        soilAlbedo = mix(soilAlbedo, topsoilCol, tTopsoil);
        soilAlbedo = mix(soilAlbedo, subsoilCol, tSubsoil);

        // 1. Daylight filtering down from above (y = 0), dimmer with depth, controlled by the Time-of-Day slider
        float depthMeters = max(0.0, -vWorldPos.y);
        float depthAtten = exp(-depthMeters * 0.32);
        vec3 topDir = normalize(vec3(-0.2, 0.85, 0.45));
        float ndotl = 0.42 + 0.58 * max(0.0, dot(vWorldNormal, topDir));

        vec3 filteredSun = mix(vec3(0.52, 0.58, 0.66), uSunColor, clamp(uDaylightFactor * 0.85, 0.15, 1.0));
        vec3 daylightTerm = soilAlbedo * filteredSun * ndotl * (0.28 + 0.82 * depthAtten) * (0.35 + uDaylightFactor * 1.15);

        // Warm surface horizon rim glow right under the forest floor at y = 0..-0.35
        float surfaceRim = smoothstep(-0.45, 0.02, vWorldPos.y);
        daylightTerm += filteredSun * surfaceRim * uDaylightFactor * 0.28;

        // 2. Network's own green-gold Foxfire glow illuminating the soil near the threads
        float radialDist = length(vWorldPos.xz);
        float networkRadius = max(1.5, uNetworkGrowth * 11.8);
        float inNetworkZone = (1.0 - smoothstep(networkRadius * 0.75, networkRadius * 1.15, radialDist))
                            * smoothstep(-4.4, -2.8, vWorldPos.y)
                            * (1.0 - smoothstep(-0.35, 0.05, vWorldPos.y));

        // Web-like glowing thread veins projected onto the nearby earth
        float vein1 = abs(noise2(vWorldPos.xz * 0.95 + vec2(vWorldPos.y * 0.7)) - 0.5) * 2.0;
        float vein2 = abs(noise2(vWorldPos.xy * 1.35 - vec2(vWorldPos.z * 0.6)) - 0.5) * 2.0;
        float threadProximity = (1.0 - smoothstep(0.0, 0.32, vein1 * 0.6 + vein2 * 0.4)) * 0.75 + 0.35;
        float pulse = 0.82 + 0.18 * sin(uTime * 1.8 - radialDist * 0.7);
        vec3 foxfireCol = vec3(0.68, 0.86, 0.24);
        vec3 foxfireSoilBounce = (soilAlbedo * 1.35 + vec3(0.18, 0.24, 0.05))
                               * foxfireCol
                               * inNetworkZone
                               * threadProximity
                               * pulse
                               * uFoxfireMult
                               * 0.95;

        vec3 litColor = daylightTerm + foxfireSoilBounce;

        // 3. Distance depth fog (fades into earthen fog color, never to black!)
        float fogFactor = smoothstep(11.5, 25.5, vCamDist);
        litColor = mix(litColor, uFogColor, fogFactor * 0.82);

        // Enforce readable minimum earth luminance so no slider position is ever close to black
        vec3 minEarth = max(soilAlbedo * 0.22, uFogColor * 0.68);
        litColor = clamp(max(litColor, minEarth), vec3(0.06, 0.05, 0.05), vec3(0.88));

        gl_FragColor = vec4(litColor, uOpacity);
      }
    `,
  });

  const wideEarthMesh = new THREE.Mesh(wideGeo, wideEarthMat);
  wideSubterraneanGroup.add(wideEarthMesh);

  // 9b. Wide-Spanning Descending Tree Roots across Chapter 04b (weaving through the network)
  const wideRootGeos: THREE.BufferGeometry[] = [];
  const wideRootAnchors: Array<{ x: number; z: number; spanX: number; depth: number; r0: number }> = [
    { x: -6.2, z: -3.2, spanX: 2.1, depth: 3.4, r0: 0.18 },
    { x: -4.4, z: -2.4, spanX: -1.6, depth: 2.9, r0: 0.14 },
    { x: -2.6, z: -3.8, spanX: 1.4, depth: 3.2, r0: 0.15 },
    { x: 2.4, z: -3.5, spanX: -1.5, depth: 3.3, r0: 0.15 },
    { x: 4.8, z: -2.6, spanX: 1.8, depth: 3.1, r0: 0.16 },
    { x: 6.5, z: -3.0, spanX: -2.2, depth: 3.5, r0: 0.19 },
    { x: -7.8, z: 1.2, spanX: 2.4, depth: 3.2, r0: 0.16 },
    { x: 7.4, z: 1.5, spanX: -2.3, depth: 3.2, r0: 0.16 },
    { x: -1.2, z: -5.8, spanX: 1.6, depth: 3.6, r0: 0.14 },
    { x: 1.8, z: -6.2, spanX: -1.7, depth: 3.6, r0: 0.14 },
  ];

  for (let i = 0; i < wideRootAnchors.length; i++) {
    const a = wideRootAnchors[i];
    const pts: THREE.Vector3[] = [];
    const steps = 6;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      pts.push(
        new THREE.Vector3(
          a.x + a.spanX * t + Math.sin(t * Math.PI * 2 + i) * 0.35,
          0.02 - Math.pow(t, 0.85) * a.depth,
          a.z + Math.cos(t * Math.PI * 1.5 + i) * 0.45,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(curve, 18, 1.0, 7, false);
    const posAttr = tube.attributes.position;
    const uvAttr = tube.attributes.uv;
    const cPt = new THREE.Vector3();
    for (let vi = 0; vi < posAttr.count; vi++) {
      const t = clamp01(uvAttr.getX(vi));
      curve.getPointAt(t, cPt);
      const rad = a.r0 * Math.pow(1 - t, 0.72) + 0.018 * t;
      posAttr.setXYZ(
        vi,
        cPt.x + (posAttr.getX(vi) - cPt.x) * rad,
        cPt.y + (posAttr.getY(vi) - cPt.y) * rad,
        cPt.z + (posAttr.getZ(vi) - cPt.z) * rad,
      );
    }
    tube.computeVertexNormals();
    wideRootGeos.push(tube);

    // Secondary root fork off each main root
    const forkStart = pts[2];
    const forkPts = [
      forkStart.clone(),
      new THREE.Vector3(forkStart.x + (a.spanX > 0 ? -0.9 : 0.9), forkStart.y - 0.65, forkStart.z + 0.4),
      new THREE.Vector3(forkStart.x + (a.spanX > 0 ? -1.6 : 1.6), forkStart.y - 1.35, forkStart.z + 0.7),
    ];
    const fCurve = new THREE.CatmullRomCurve3(forkPts);
    wideRootGeos.push(new THREE.TubeGeometry(fCurve, 10, a.r0 * 0.38, 6, false));
  }

  const mergedWideRootsGeo = mergeGeometries(wideRootGeos, false);
  for (const g of wideRootGeos) g.dispose();

  const wideRootMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.045,
    color: new THREE.Color('#d8c4a8'),
    roughness: 0.84,
    metalness: 0.02,
    emissive: new THREE.Color('#586c1c'),
    emissiveIntensity: 0.08,
    transparent: true,
    opacity: 0,
  });
  const wideRootsMesh = new THREE.Mesh(mergedWideRootsGeo, wideRootMat);
  wideSubterraneanGroup.add(wideRootsMesh);

  // 9c. Wide-Field Subsoil Stones & Topsoil Pebbles across Chapter 04b
  const wideStoneCount = 135;
  const wideStoneMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.045,
    color: new THREE.Color('#ffffff'),
    roughness: 0.85,
    metalness: 0.03,
    emissive: new THREE.Color('#4d5e18'),
    emissiveIntensity: 0.06,
    transparent: true,
    opacity: 0,
  });
  const wideStoneInst = new THREE.InstancedMesh(boulderGeo, wideStoneMat, wideStoneCount);

  for (let i = 0; i < wideStoneCount; i++) {
    const uNorm = (rand() - 0.5) * 1.65; // -0.825 .. +0.825 (x in -14.8 .. +14.8)
    const vNorm = 0.18 + rand() * 0.76;
    const [wx, wy, wz] = getWideEarthPoint(uNorm, vNorm);
    // Offset slightly in front of the amphitheatre wall or nestled among the lower roots
    const zOffset = 0.25 + rand() * 2.4;
    dummy.position.set(wx, wy, Math.min(3.8, wz + zOffset));
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    const s = 0.75 + Math.pow(rand(), 0.7) * 1.95;
    dummy.scale.set(s * (0.9 + rand() * 0.35), s * (0.68 + rand() * 0.3), s * 0.85);
    dummy.updateMatrix();
    wideStoneInst.setMatrixAt(i, dummy.matrix);

    // Warm ochre-slate, river stone, and terracotta-brown tones that catch daylight & foxfire
    itemColor.setHSL(
      0.058 + (rand() - 0.5) * 0.03,
      0.32 + rand() * 0.16,
      0.28 + rand() * 0.16,
    );
    wideStoneInst.setColorAt(i, itemColor);
  }
  wideStoneInst.instanceMatrix.needsUpdate = true;
  if (wideStoneInst.instanceColor) wideStoneInst.instanceColor.needsUpdate = true;
  wideStoneInst.computeBoundingSphere();
  wideSubterraneanGroup.add(wideStoneInst);

  // ============================================================================
  // 10. DEDICATED SUBTERRANEAN DESCENT, POCKET & WIDE EARTH LIGHTS
  // ============================================================================
  // Positioned at z = 0.85 so it illuminates the cut soil wall, diagonal root, and stones directly
  // without over-lighting foreground parallax crumbs at z = 1.1..1.5
  const descentDaylight = new THREE.PointLight('#f5dec0', 1.65, 6.5, 1.35);
  descentDaylight.position.set(0.12, -0.5, 0.85);
  group.add(descentDaylight);

  // Foxfire Pocket & Subsoil Crack Light at [0, -2.45, 0.82] so the clump pocket glows warmly
  const pocketFoxfireLight = new THREE.PointLight('#b8dc3c', 0.0, 5.2, 1.5);
  pocketFoxfireLight.position.set(0.0, -2.45, 0.82);
  group.add(pocketFoxfireLight);

  // Wide Subterranean Daylight Fill (overhead filtering sun/moonlight for roots, stones & hanging mushrooms in Ch 4b)
  const wideOverheadLight = new THREE.PointLight('#ffdfad', 0.0, 26.0, 1.1);
  wideOverheadLight.position.set(0.0, 1.2, 3.5);
  wideSubterraneanGroup.add(wideOverheadLight);

  // ============================================================================
  // UPDATE AT PROGRESS
  // ============================================================================
  const closeDescentMeshes: THREE.Object3D[] = [
    wallMesh,
    rimMossInst,
    litterLeafInst,
    leafHyphaeLines,
    humusRootsMesh,
    fineRootLines,
    rootHairLines,
    woodlouseGroup,
    diagonalRootMesh,
    pebbleInst,
    boulderInst,
    crackThreadsMesh,
    crackLines,
    foregroundParallaxGroup,
  ];

  const updateDescent = (params: {
    progress: number;
    undergroundFactor: number;
    networkGrowth: number;
    elapsedSec: number;
    sunColorRgb: readonly [number, number, number];
    sunlight: number;
  }) => {
    const p = params.progress;
    const sunState = computeSunlightState(params.sunlight);

    // 1. Close-up Chapter 03 Descent & Chapter 04a Clump Pocket visibility (0.21 -> 0.61, plus ascent return 0.875 -> 0.965)
    const enterDescent = smoothstep(0.21, 0.26, p);
    const exitCloseWallForWide = 1 - smoothstep(0.545, 0.615, p);
    const ascentReturn =
      smoothstep(0.875, 0.905, p) * (1 - smoothstep(0.935, 0.965, p));
    const closeDescentVis = clamp01(
      enterDescent * exitCloseWallForWide + ascentReturn,
    );

    // 2. Wide Chapter 04b Subterranean Earth visibility (ramps in as camera pulls back 0.53 -> 0.60, fades out as Ch 05 studio lifts 0.74 -> 0.79)
    const wideEarthVis = clamp01(
      smoothstep(0.525, 0.595, p) * (1 - smoothstep(0.74, 0.788, p)),
    );

    group.visible = closeDescentVis > 0.005 || wideEarthVis > 0.005;
    if (!group.visible) return;

    for (const obj of closeDescentMeshes) {
      obj.visible = closeDescentVis > 0.005;
    }

    const foxfireCrackStrength =
      smoothstep(0.39, 0.49, p) * (1 - smoothstep(0.58, 0.65, p));

    if (closeDescentVis > 0.005) {
      wallUniforms.uTime.value = params.elapsedSec;
      wallUniforms.uProgress.value = p;
      wallUniforms.uOpacity.value = closeDescentVis;
      wallUniforms.uFoxfireGlow.value =
        foxfireCrackStrength * sunState.foxfireGlowMultiplier;
      wallUniforms.uSunColor.value.setRGB(
        sunState.sunColorRgb[0],
        sunState.sunColorRgb[1],
        sunState.sunColorRgb[2],
      );
      wallUniforms.uSunIntensity.value =
        0.55 + sunState.undergroundDaylightFactor * 0.65;

      // Breaking ground warm silhouette horizon glow (peaks around 0.25..0.33)
      const breakingGroundGlow =
        smoothstep(0.23, 0.275, p) * (1 - smoothstep(0.32, 0.37, p));
      horizonGlowMat.uniforms.uOpacity.value = breakingGroundGlow;
      horizonGlowMat.uniforms.uSunColor.value.setRGB(
        sunState.sunColorRgb[0],
        sunState.sunColorRgb[1],
        sunState.sunColorRgb[2],
      );
      horizonGlowMesh.visible = breakingGroundGlow > 0.01;

      // Update woodlouse crawl along the humus tunnel (y ≈ -0.80)
      const crawlPhase = ((params.elapsedSec * 0.14) % 1.0) - 0.5;
      const wx = 0.38 + Math.sin(params.elapsedSec * 0.45) * 0.11;
      const wy = -0.80 + Math.cos(params.elapsedSec * 0.9) * 0.006;
      woodlouseGroup.position.set(wx, wy, getWallZAt(wx, wy) + 0.035);
      woodlouseGroup.rotation.y =
        Math.cos(params.elapsedSec * 0.45) >= 0 ? 0.15 : Math.PI - 0.15;
      woodlouseGroup.rotation.z = Math.sin(crawlPhase * Math.PI * 8) * 0.05;

      // Foreground parallax: moves upward faster than the wall as camera descends (0.26 -> 0.52)
      const normalizedDescent = clamp01((p - 0.26) / 0.26);
      foregroundParallaxGroup.position.y = (normalizedDescent - 0.45) * 0.92;
      bokehMat.uniforms.uTime.value = params.elapsedSec;
      bokehMat.uniforms.uOpacity.value = closeDescentVis;

      // Foxfire crack tubes & lines
      foxfireCrackMat.uniforms.uGlow.value =
        foxfireCrackStrength *
        closeDescentVis *
        sunState.foxfireGlowMultiplier;
      foxfireCrackMat.uniforms.uTime.value = params.elapsedSec;

      // Filtering daylight lamp tracks camera depth and responds to the time-of-day slider
      const camDepthY = 0.05 - normalizedDescent * 2.55;
      descentDaylight.position.set(0.12, camDepthY + 0.18, 0.85);
      const depthCoolMix = clamp01(normalizedDescent * 0.65);
      descentDaylight.color
        .setRGB(
          sunState.sunColorRgb[0],
          sunState.sunColorRgb[1],
          sunState.sunColorRgb[2],
        )
        .lerp(new THREE.Color('#8a968e'), depthCoolMix * 0.45);
      descentDaylight.intensity =
        closeDescentVis *
        (1.35 - normalizedDescent * 0.45) *
        (0.55 + sunState.undergroundDaylightFactor * 0.65);

      // Pocket Foxfire + warm fill light illuminates the clump and surrounding stones at 0.41..0.56
      pocketFoxfireLight.intensity =
        closeDescentVis *
        foxfireCrackStrength *
        1.48 *
        sunState.foxfireGlowMultiplier;
    } else {
      horizonGlowMesh.visible = false;
      descentDaylight.intensity = 0;
      pocketFoxfireLight.intensity = 0;
    }

    // Update Chapter 04b Wide Subterranean Earth, Roots & Stones
    wideSubterraneanGroup.visible = wideEarthVis > 0.005;
    if (wideEarthVis > 0.005) {
      wideEarthUniforms.uTime.value = params.elapsedSec;
      wideEarthUniforms.uOpacity.value = wideEarthVis;
      wideEarthUniforms.uNetworkGrowth.value = Math.max(
        0.35,
        params.networkGrowth,
      );
      wideEarthUniforms.uFoxfireMult.value = sunState.foxfireGlowMultiplier;
      wideEarthUniforms.uDaylightFactor.value =
        sunState.undergroundDaylightFactor;
      wideEarthUniforms.uSunColor.value.setRGB(
        sunState.sunColorRgb[0],
        sunState.sunColorRgb[1],
        sunState.sunColorRgb[2],
      );
      wideEarthUniforms.uFogColor.value.setRGB(
        sunState.undergroundFogRgb[0],
        sunState.undergroundFogRgb[1],
        sunState.undergroundFogRgb[2],
      );

      wideRootMat.opacity = wideEarthVis;
      wideRootMat.emissiveIntensity =
        0.06 * sunState.foxfireGlowMultiplier * wideEarthVis;

      wideStoneMat.opacity = wideEarthVis;
      wideStoneMat.emissiveIntensity =
        0.05 * sunState.foxfireGlowMultiplier * wideEarthVis;

      wideOverheadLight.color.setRGB(
        sunState.sunColorRgb[0],
        sunState.sunColorRgb[1],
        sunState.sunColorRgb[2],
      );
      // At Night (undergroundDaylightFactor=0.28): dim moonlit earth; at Midday (1.42): roots, stones & hanging mushrooms clearly lit
      wideOverheadLight.intensity =
        wideEarthVis * (0.65 + sunState.undergroundDaylightFactor * 2.25);
    } else {
      wideOverheadLight.intensity = 0;
    }
  };

  return {
    group,
    updateDescent,
  };
}

