import * as THREE from 'three';

/**
 * Custom GLSL Gerstner Ocean Shader matching lib/sim/ocean.ts 1:1.
 * Features:
 * - 6 non-harmonic directional Gerstner waves with exact analytical normals & uWaveSpeed
 * - Cool deep teal & dark blue-green ocean body with restrained non-metallic Fresnel sky reflection
 * - Muted warm sunset glints & cool moonlit night readability
 * - Localized fragmented cellular shoreline foam hugging actual rock contours (updated SDF)
 * - Lighthouse beacon water reflection & distant lightning glint
 * - Smooth atmospheric horizon fog fade
 */
export function createOceanMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: 1.15 },
      uFrequency: { value: 1.0 },
      uWaveSpeed: { value: 1.0 },
      uRoughness: { value: 0.36 },
      uFoamIntensity: { value: 1.15 },
      uWindDir: { value: new THREE.Vector2(0.92, -0.38) },
      uWindStrength: { value: 1.1 },

      uSunDir: { value: new THREE.Vector3(-0.85, 0.14, -0.5).normalize() },
      uSunColor: { value: new THREE.Color(0.94, 0.54, 0.30) },
      uSunIntensity: { value: 1.45 },

      uMoonDir: { value: new THREE.Vector3(0.4, 0.5, -0.7).normalize() },
      uMoonColor: { value: new THREE.Color(0.58, 0.72, 0.94) },
      uMoonIntensity: { value: 0.25 },

      uSkyZenith: { value: new THREE.Color(0.08, 0.11, 0.17) },
      uSkyHorizon: { value: new THREE.Color(0.56, 0.38, 0.34) },
      uDeepColor: { value: new THREE.Color(0.018, 0.095, 0.145) },
      uShallowColor: { value: new THREE.Color(0.048, 0.26, 0.30) },

      uFogColor: { value: new THREE.Color(0.24, 0.24, 0.29) },
      uFogDensity: { value: 0.0075 },

      uBeaconPos: { value: new THREE.Vector3(9.8, 23.05, -2.2) },
      uBeaconDir: { value: new THREE.Vector3(-1.0, -0.04, 0.0) },
      uBeaconIntensity: { value: 1.35 },
      uBeaconRange: { value: 96.0 },
      uLightningFlash: { value: 0.0 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uAmplitude;
      uniform float uFrequency;
      uniform float uWaveSpeed;
      uniform vec2 uWindDir;
      uniform float uWindStrength;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vCrest;
      varying float vShoreSDF;
      varying float vWaveHeight;

      float hash2(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = hash2(i);
        float b = hash2(i + vec2(1.0, 0.0));
        float c = hash2(i + vec2(0.0, 1.0));
        float d = hash2(i + vec2(1.0, 1.0));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      // Analytical island shoreline SDF matching lib/sim/island.ts ISLAND_COLLIDERS 1:1
      float islandShoreSDF(vec2 xz) {
        float d = 9999.0;
        d = min(d, length(xz - vec2(10.6, -2.0)) - 11.0);
        d = min(d, length(xz - vec2(20.6, -0.4)) - 11.4);
        d = min(d, length(xz - vec2(2.8, -4.2)) - 6.5);
        d = min(d, length(xz - vec2(16.2, 14.2)) - 9.6);
        d = min(d, length(xz - vec2(15.8, 6.8)) - 6.8);
        d = min(d, length(xz - vec2(7.4, 15.2)) - 5.0);
        d = min(d, length(xz - vec2(10.2, -11.8)) - 8.4);
        d = min(d, length(xz - vec2(-1.8, -3.6)) - 3.7);
        d = min(d, length(xz - vec2(4.6, 6.4)) - 3.2);
        d = min(d, length(xz - vec2(26.8, -6.8)) - 10.8);
        float n = (vnoise(xz * 0.16) * 2.0 - 1.0) * 0.55 + (vnoise(xz * 0.33) * 2.0 - 1.0) * 0.3;
        return d + n * 1.15;
      }

      void applyGerstner(
        vec2 baseDir,
        float steepness,
        float baseWavelength,
        float speed,
        vec2 xz,
        float effectiveAmp,
        float shoreShoal,
        inout vec3 disp,
        inout vec3 tangent,
        inout vec3 binormal,
        inout float jacobian
      ) {
        vec2 dir = normalize(baseDir * 0.78 + uWindDir * 0.22);
        float wavelength = baseWavelength / max(0.4, uFrequency);
        float k = 6.2831853 / wavelength;
        float c = sqrt(9.8 / k) * speed * max(0.15, uWaveSpeed);
        float q = min(0.40, steepness * min(1.65, effectiveAmp) * shoreShoal);
        float a = (q / k) * 0.88;

        float phase = k * (dot(dir, xz) - c * uTime);
        float cosP = cos(phase);
        float sinP = sin(phase);

        disp.x += dir.x * (a * cosP);
        disp.y += a * sinP;
        disp.z += dir.y * (a * cosP);

        float wa = k * a;
        tangent += vec3(
          -dir.x * dir.x * (wa * sinP),
          dir.x * (wa * cosP),
          -dir.x * dir.y * (wa * sinP)
        );
        binormal += vec3(
          -dir.x * dir.y * (wa * sinP),
          dir.y * (wa * cosP),
          -dir.y * dir.y * (wa * sinP)
        );

        jacobian += max(0.0, sinP) * q;
      }

      void main() {
        vec4 worldBase = modelMatrix * vec4(position, 1.0);
        vec2 xz = worldBase.xz;

        float distFromCenter = length(xz);
        float farAtten = 1.0 - smoothstep(95.0, 240.0, distFromCenter) * 0.65;

        float sdf = islandShoreSDF(xz);
        vShoreSDF = sdf;

        float windBoost = 0.76 + min(1.8, uWindStrength) * 0.27;
        float effectiveAmp = max(0.05, uAmplitude * windBoost) * farAtten;
        float shoreShoal = sdf < 0.0
          ? max(0.15, 1.0 + sdf * 0.2)
          : 1.0 + exp(-sdf * 0.19) * 0.24;

        vec3 disp = vec3(0.0);
        vec3 tangent = vec3(1.0, 0.0, 0.0);
        vec3 binormal = vec3(0.0, 0.0, 1.0);
        float jacobian = 0.0;

        // Matches GERSTNER_WAVES in lib/sim/ocean.ts identically
        applyGerstner(vec2(0.91, -0.41), 0.24, 31.3, 1.02, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);
        applyGerstner(vec2(0.72,  0.69), 0.19, 19.7, 1.14, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);
        applyGerstner(vec2(0.97,  0.24), 0.15, 12.1, 1.28, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);
        applyGerstner(vec2(0.44, -0.90), 0.13,  7.9, 1.44, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);
        applyGerstner(vec2(0.86, -0.51), 0.10,  4.85, 1.64, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);
        applyGerstner(vec2(0.23,  0.97), 0.08,  3.05, 1.82, xz, effectiveAmp, shoreShoal, disp, tangent, binormal, jacobian);

        vec3 displacedWorld = worldBase.xyz + disp;
        vec3 norm = normalize(cross(binormal, tangent));
        norm.y = abs(norm.y);

        vWorldPos = displacedWorld;
        vNormal = norm;
        vCrest = clamp(jacobian * 0.95, 0.0, 1.0);
        vWaveHeight = disp.y;

        gl_Position = projectionMatrix * viewMatrix * vec4(displacedWorld, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uRoughness;
      uniform float uFoamIntensity;
      uniform float uWaveSpeed;
      uniform vec2 uWindDir;
      uniform float uWindStrength;

      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uSunIntensity;

      uniform vec3 uMoonDir;
      uniform vec3 uMoonColor;
      uniform float uMoonIntensity;

      uniform vec3 uSkyZenith;
      uniform vec3 uSkyHorizon;
      uniform vec3 uDeepColor;
      uniform vec3 uShallowColor;

      uniform vec3 uFogColor;
      uniform float uFogDensity;

      uniform vec3 uBeaconPos;
      uniform vec3 uBeaconDir;
      uniform float uBeaconIntensity;
      uniform float uBeaconRange;
      uniform float uLightningFlash;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying float vCrest;
      varying float vShoreSDF;
      varying float vWaveHeight;

      float hash2(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x),
          mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm2(vec2 p) {
        float v = 0.62 * noise(p);
        v += 0.38 * noise(p * 2.13 + vec2(13.1, 7.7));
        return v;
      }

      void main() {
        vec3 viewVec = cameraPosition - vWorldPos;
        float camDist = length(viewVec);
        vec3 V = viewVec / max(0.0001, camDist);

        // Multi-scale animated capillary ripple normal perturbation
        float detailFade = 1.0 - smoothstep(26.0, 165.0, camDist);
        float tMove = uTime * max(0.2, uWaveSpeed);
        vec2 drift1 = uWindDir * tMove * (0.58 + uWindStrength * 0.42);
        vec2 drift2 = vec2(-uWindDir.y, uWindDir.x) * tMove * 0.38;

        vec2 uv1 = vWorldPos.xz * 0.48 - drift1;
        vec2 uv2 = vWorldPos.xz * 1.45 + drift2;

        float n1 = fbm2(uv1);
        float n2 = noise(uv2);
        float nx = (noise(uv1 + vec2(0.20, 0.0)) - n1) + (noise(uv2 + vec2(0.20, 0.0)) - n2) * 0.55;
        float nz = (noise(uv1 + vec2(0.0, 0.20)) - n1) + (noise(uv2 + vec2(0.0, 0.20)) - n2) * 0.55;

        float rippleAmp = (0.38 + uRoughness * 0.68) * detailFade;
        vec3 N = normalize(vNormal + vec3(-nx * rippleAmp, 0.0, -nz * rippleAmp));

        // Restrained physical Fresnel (prevents metallic / liquid-copper sheen!)
        float NdotV = max(0.0, dot(N, V));
        float fresnel = 0.02 + 0.98 * pow(1.0 - NdotV, 4.6);

        // Natural sky reflection toned down with cool marine slate so sunset doesn't tint water copper
        vec3 R = reflect(-V, N);
        float reflUp = clamp(R.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 coolSkyRefl = mix(uSkyHorizon * vec3(0.74, 0.78, 0.86), uSkyZenith * 1.15, pow(reflUp, 0.55));

        // Muted warm sunset highlight path along solar reflection azimuth
        vec3 rFlat = normalize(vec3(R.x, max(0.03, R.y), R.z));
        vec3 sFlat = normalize(vec3(uSunDir.x, max(0.05, uSunDir.y), uSunDir.z));
        float sunPath = pow(max(0.0, dot(rFlat, sFlat)), 14.0);
        coolSkyRefl += uSunColor * sunPath * uSunIntensity * 0.32;

        // Cool deep teal to translucent blue-green shallows & wave crests
        float shallowMask = exp(-max(0.0, vShoreSDF) * 0.14);
        float crestTranslucency = smoothstep(0.18, 0.85, vCrest) * (0.42 + max(0.0, dot(V, -uSunDir)) * 0.55);
        vec3 waterBody = mix(uDeepColor, uShallowColor, clamp(shallowMask * 0.58 + crestTranslucency * 0.72, 0.0, 1.0));

        // Subtle emerald-teal subsurface scatter through thin curling wave crests
        vec3 sssColor = vec3(0.04, 0.42, 0.40) * pow(clamp(vCrest, 0.0, 1.0), 1.65);
        float sssLight = 0.35 + uSunIntensity * 0.38 + uMoonIntensity * 0.32;
        waterBody += sssColor * sssLight * (0.45 + shallowMask * 0.55);

        // Diffuse wave shading (keeps waves readable at dusk AND night)
        float sunDiff = max(0.0, dot(N, uSunDir));
        float moonDiff = max(0.0, dot(N, uMoonDir));
        vec3 ambientOcean = vec3(0.46, 0.54, 0.60);
        vec3 litWater = waterBody * (
          ambientOcean +
          uSunColor * sunDiff * uSunIntensity * 0.42 +
          uMoonColor * moonDiff * uMoonIntensity * 0.58
        );

        // Blend water body with restrained Fresnel sky reflection (capped well below mirror/metal)
        float reflWeight = clamp(fresnel * mix(0.62, 0.24, clamp(uRoughness, 0.0, 1.0)), 0.0, 0.68);
        vec3 color = mix(litWater, coolSkyRefl, reflWeight);

        // Crisp, restrained solar & lunar specular glints on wavelets
        float specPower = mix(240.0, 32.0, clamp(uRoughness, 0.0, 1.0));
        vec3 Hsun = normalize(uSunDir + V);
        float sunSpec = pow(max(0.0, dot(N, Hsun)), specPower);
        color += uSunColor * sunSpec * uSunIntensity * 1.15;

        vec3 Hmoon = normalize(uMoonDir + V);
        float moonSpec = pow(max(0.0, dot(N, Hmoon)), specPower * 0.65);
        color += uMoonColor * moonSpec * uMoonIntensity * 1.15;

        // Subtle lighthouse beacon sweep highlight across nearby ocean waves
        if (uBeaconIntensity > 0.05) {
          vec3 fromBeacon = vWorldPos - uBeaconPos;
          float bDist = length(fromBeacon);
          vec3 bVec = fromBeacon / max(0.001, bDist);
          float align = max(0.0, dot(bVec, normalize(uBeaconDir)));
          float rangeAtten = exp(-bDist / max(24.0, uBeaconRange * 0.68));
          float cone = pow(align, 18.0) * rangeAtten;
          vec3 Hb = normalize(-bVec + V);
          float bSpec = pow(max(0.0, dot(N, Hb)), 34.0) * 1.45 + 0.22;
          color += vec3(1.0, 0.82, 0.46) * cone * bSpec * uBeaconIntensity * 1.1;
        }

        // Brief distant lightning reflection across ocean facets (controlled, never blows out)
        color += vec3(0.55, 0.72, 0.96) * uLightningFlash * (0.18 + fresnel * 0.48);

        // =========================================================================
        // LOCALIZED FRAGMENTED SHORELINE FOAM (No wide smooth white blobs!)
        // =========================================================================
        // Cellular lacy foam breakup pattern built from high-frequency overlapping noise
        float foamCellA = noise(vWorldPos.xz * 1.35 + uWindDir * tMove * 0.28);
        float foamCellB = noise(vWorldPos.xz * 3.1 - uWindDir * tMove * 0.42 + vec2(5.4, -2.9));
        float lacePattern = smoothstep(0.38, 0.78, foamCellA * 0.58 + foamCellB * 0.48);
        float fineSpecks = smoothstep(0.54, 0.86, foamCellB);

        // Wave-phase driven shoreline surge: expands when crest lifts, fragments & retreats in trough
        float wavePush = clamp(vWaveHeight * 1.15, -0.7, 1.4);
        float distToWaterline = vShoreSDF - wavePush;

        // Tight inner surf line right at rock contact (0..1.65m), broken up organically
        float innerContact = (1.0 - smoothstep(-0.35, 1.55 + max(0.0, wavePush) * 0.65, abs(distToWaterline)));
        float breakingPhase = smoothstep(-0.25, 0.75, vWaveHeight + vCrest * 0.55);

        // Lacy trailing foam tendrils extending slightly seaward as water withdraws
        float recedingTrail =
          smoothstep(-0.2, 0.6, distToWaterline) *
          (1.0 - smoothstep(0.6, 3.2 + uFoamIntensity * 0.75, distToWaterline)) *
          lacePattern *
          (0.35 + 0.65 * sin(distToWaterline * 3.6 - tMove * 2.6 + foamCellA * 3.2) * 0.5 + 0.5);

        float shoreFoam =
          innerContact * (0.35 + breakingPhase * 0.65) * (0.28 + lacePattern * 0.92) +
          recedingTrail * 0.68;

        // Fragmented offshore whitecaps only on steep breaking wave crests
        float crestFoam = smoothstep(0.50, 0.84, vCrest + (foamCellA - 0.5) * 0.34) * (lacePattern * 0.75 + fineSpecks * 0.35);

        float totalFoam = clamp((shoreFoam * 1.15 + crestFoam * 0.72) * uFoamIntensity, 0.0, 0.92);
        // Foam tint reacts naturally to sunset, night moonlight, and lightning
        vec3 foamBase = mix(
          vec3(0.46, 0.56, 0.64),
          vec3(0.92, 0.91, 0.89),
          clamp(uSunIntensity * 0.36 + uMoonIntensity * 0.25 + 0.26, 0.0, 1.0)
        );
        vec3 foamColor = foamBase + uSunColor * sunDiff * uSunIntensity * 0.16 + vec3(0.62, 0.78, 0.96) * uLightningFlash * 0.38;
        color = mix(color, foamColor, totalFoam * 0.88);

        // Smooth atmospheric horizon blending
        float fogAmount = 1.0 - exp(-pow(camDist * uFogDensity, 1.5));
        float edgeFade = smoothstep(145.0, 245.0, camDist);
        float finalFog = clamp(max(fogAmount, edgeFade), 0.0, 1.0);
        color = mix(color, uFogColor, finalFog);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.FrontSide,
  });
}

/**
 * Multi-Layer Procedural Cinematic Sky & Storm Cloud Dome Shader.
 * Features:
 * - Refined sunset palette: muted amber, warm peach, desaturated rose near horizon
 *   transitioning through dusty mauve, slate blue, muted indigo, and deep storm charcoal
 * - Three independent animated cloud layers moving at distinct speeds along shared wind:
 *   1. High-altitude wispy cirrus streaks (slow, soft sunlit warm veil)
 *   2. Mid-altitude broken cumulus decks (cellular ridges + directional self-shadowing)
 *   3. Low brooding storm cloud masses (dark undersides, turbulent density, backlit rims)
 * - Distant lightning illuminating cloud interiors without flashing the screen pure white
 * - Responsive to cloudDensity, cloudSpeed, stormIntensity, and atmosphericHaze controls
 */
export function createSkyMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSunDir: { value: new THREE.Vector3(-0.85, 0.14, -0.5).normalize() },
      uMoonDir: { value: new THREE.Vector3(0.4, 0.5, -0.7).normalize() },
      uZenithColor: { value: new THREE.Color(0.075, 0.095, 0.165) },
      uMidColor: { value: new THREE.Color(0.31, 0.25, 0.34) },
      uHorizonColor: { value: new THREE.Color(0.72, 0.43, 0.32) },
      uSunsetGlowColor: { value: new THREE.Color(0.86, 0.46, 0.24) },
      uCloudCoverage: { value: 0.84 },
      uCloudSpeed: { value: 1.0 },
      uStormIntensity: { value: 0.78 },
      uAtmosphericHaze: { value: 0.42 },
      uDayFactor: { value: 0.25 },
      uSunsetFactor: { value: 0.9 },
      uNightFactor: { value: 0.25 },
      uWindDir: { value: new THREE.Vector2(0.92, -0.38) },
      uWindStrength: { value: 1.1 },
      uLightningFlash: { value: 0.0 },
      uLightningPos: { value: new THREE.Vector3(0.55, 0.28, -0.78).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldDir;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldDir = normalize(position);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uSunDir;
      uniform vec3 uMoonDir;
      uniform vec3 uZenithColor;
      uniform vec3 uMidColor;
      uniform vec3 uHorizonColor;
      uniform vec3 uSunsetGlowColor;
      uniform float uCloudCoverage;
      uniform float uCloudSpeed;
      uniform float uStormIntensity;
      uniform float uAtmosphericHaze;
      uniform float uDayFactor;
      uniform float uSunsetFactor;
      uniform float uNightFactor;
      uniform vec2 uWindDir;
      uniform float uWindStrength;
      uniform float uLightningFlash;
      uniform vec3 uLightningPos;

      varying vec3 vWorldDir;

      float hash2(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x),
          mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      // Lean 3-octave fBM (great atmospheric silhouette with SwiftShader-friendly ALU budget)
      float fbm3(vec2 p) {
        float v = 0.54 * noise(p);
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        p = rot * p * 2.06 + vec2(11.3, 4.7);
        v += 0.30 * noise(p);
        p = rot * p * 2.08 + vec2(-7.1, 13.4);
        v += 0.16 * noise(p);
        return v;
      }

      // Billowy cellular-ridge modulation (gives defined cumulus tops & storm pockets cheaply)
      float billow(vec2 p) {
        float n = fbm3(p);
        return 1.0 - abs(n * 2.0 - 1.0);
      }

      void main() {
        vec3 dir = normalize(vWorldDir);
        float elev = max(0.0, dir.y);
        vec3 sunN = normalize(uSunDir);

        // 3-stop atmospheric sky gradient: horizon -> dusty mauve/slate mid -> muted indigo/charcoal zenith
        float lowToMid = smoothstep(0.0, 0.28, elev);
        float midToZenith = smoothstep(0.18, 0.78, elev);
        vec3 sky = mix(uHorizonColor, uMidColor, lowToMid);
        sky = mix(sky, uZenithColor, midToZenith);

        // Atmospheric sunset glow on far-left horizon (warm muted amber/apricot, never neon yellow)
        float sunAlign = max(0.0, dot(dir, sunN));
        float sunScatter = pow(sunAlign, 3.6) * (0.38 + uSunsetFactor * 0.78) * (1.0 - elev * 0.68);
        sky += uSunsetGlowColor * sunScatter * 0.92;

        // Soft rose-peach horizon haze band modulated by uAtmosphericHaze
        float hazeBand = exp(-elev * mix(9.5, 4.2, uAtmosphericHaze));
        vec3 hazeTint = mix(uHorizonColor, uMidColor, 0.32 + uStormIntensity * 0.28);
        sky = mix(sky, hazeTint, hazeBand * (0.28 + uAtmosphericHaze * 0.42));

        // Glowing coastal sunset sun disc peeking through horizon mist on the left
        float sunAbove = smoothstep(-0.04, 0.025, sunN.y);
        float sunDisc = smoothstep(0.9980, 0.9992, sunAlign) * sunAbove;
        float sunHalo = pow(sunAlign, 28.0) * sunAbove * (0.55 + uSunsetFactor * 0.68);
        float sunVis = (1.0 - uCloudCoverage * 0.36) * (1.0 - uStormIntensity * 0.18);
        sky += vec3(1.0, 0.80, 0.54) * (sunDisc * 2.5 + sunHalo * 0.82) * sunVis;

        // Moon & subtle stars at night
        if (uNightFactor > 0.05) {
          vec3 moonN = normalize(uMoonDir);
          float moonAlign = max(0.0, dot(dir, moonN));
          float moonDisc = smoothstep(0.9991, 0.9996, moonAlign) * smoothstep(-0.02, 0.08, moonN.y);
          float moonHalo = pow(moonAlign, 36.0) * 0.32;
          sky += vec3(0.76, 0.85, 1.0) * (moonDisc * 1.85 + moonHalo) * uNightFactor * (1.0 - uCloudCoverage * 0.68);

          vec2 starGrid = floor((dir.xz / max(0.18, elev + 0.25)) * 165.0);
          float starSeed = hash2(starGrid);
          float star = step(0.9966, starSeed) * smoothstep(0.08, 0.48, elev);
          float twinkle = 0.68 + 0.32 * sin(uTime * 2.3 + starSeed * 90.0);
          sky += vec3(0.84, 0.90, 1.0) * star * twinkle * uNightFactor * (1.0 - uCloudCoverage * 0.85);
        }

        // =========================================================================
        // 3-LAYER PROCEDURAL CLOUD DECKS (Distinct altitudes, speeds & shading)
        // =========================================================================
        if (dir.y > -0.02) {
          float horizonFade = smoothstep(-0.01, 0.14, dir.y);
          float speedBase = (0.014 + uWindStrength * 0.014) * max(0.15, uCloudSpeed);
          vec2 windDrift = uWindDir * uTime * speedBase;
          vec2 sunOff = sunN.xz * 0.16;

          // --- LAYER 1: High-altitude wispy cirrus streaks (slow, broad, soft sunlit peach) ---
          vec2 highUV = dir.xz / (elev + 0.36);
          vec2 highWarp = vec2(highUV.x * 0.42, highUV.y * 0.85) - windDrift * 0.48;
          float cirrusRaw = fbm3(highWarp * 0.9 + vec2(0.0, uTime * 0.004));
          float cirrusMask = smoothstep(0.46, 0.84, cirrusRaw) * horizonFade * (0.35 + uCloudCoverage * 0.45);
          vec3 cirrusCol = mix(
            mix(vec3(0.16, 0.20, 0.30), vec3(0.78, 0.80, 0.86), uDayFactor),
            vec3(0.92, 0.56, 0.38),
            uSunsetFactor * (0.48 + pow(sunAlign, 1.5) * 0.52)
          );
          sky = mix(sky, cirrusCol, cirrusMask * 0.44);

          // --- LAYER 2: Mid-altitude detailed cumulus formations (defined silhouettes + self-shadowing) ---
          vec2 midUV = dir.xz / (elev + 0.22);
          vec2 midPos = midUV * 0.72 - windDrift * 1.15;
          float midDensity = fbm3(midPos) * 0.62 + billow(midPos * 1.38 + vec2(3.1, -2.4)) * 0.38;
          float midLightSample = fbm3(midPos + sunOff);
          float midShadow = clamp((midLightSample - midDensity) * 2.5 + 0.50, 0.0, 1.0);

          float midThresh = mix(0.68, 0.34, uCloudCoverage);
          float midAlpha = smoothstep(midThresh, midThresh + 0.26, midDensity) * horizonFade;

          vec3 midDark = mix(vec3(0.055, 0.072, 0.118), vec3(0.32, 0.36, 0.44), uDayFactor);
          midDark = mix(midDark, vec3(0.20, 0.15, 0.22), uSunsetFactor * 0.58); // dusty mauve undersides
          vec3 midLit = mix(vec3(0.18, 0.22, 0.30), vec3(0.86, 0.87, 0.90), uDayFactor);
          midLit = mix(midLit, vec3(0.94, 0.54, 0.32), uSunsetFactor * (0.42 + pow(sunAlign, 1.6) * 0.58));

          vec3 midCol = mix(midDark, midLit, midShadow);
          // Luminous warm apricot-amber rim along cloud breaks near the setting sun
          float midRim = pow(sunAlign, 2.1) * (1.0 - smoothstep(0.42, 0.80, midDensity)) * uSunsetFactor;
          midCol += uSunsetGlowColor * midRim * 0.92;

          sky = mix(sky, midCol, midAlpha * clamp(0.32 + uCloudCoverage * 0.62, 0.0, 0.88));

          // --- LAYER 3: Low brooding storm cloud masses (dark undersides, denser on right + during storms) ---
          vec2 stormUV = dir.xz / (elev + 0.16);
          vec2 stormPos = stormUV * 0.54 - windDrift * 0.78 + vec2(-5.2, 2.7);
          float stormTurb = fbm3(stormPos) * 0.58 + billow(stormPos * 1.85 - vec2(uTime * 0.008, 0.0)) * 0.42;

          // Dramatic coastal split: heavier looming storm bank on right (+X) while letting sunset break on far left
          float sideBias = smoothstep(-0.48, 0.55, dir.x) * (0.16 + uStormIntensity * 0.26);
          float stormThresh = mix(0.76, 0.32, clamp(uStormIntensity * 0.72 + uCloudCoverage * 0.38, 0.0, 1.0)) - sideBias;
          float stormAlpha = smoothstep(stormThresh, stormThresh + 0.24, stormTurb) * horizonFade;

          vec3 stormUnderbelly = mix(vec3(0.026, 0.036, 0.058), vec3(0.10, 0.12, 0.16), uDayFactor);
          vec3 stormCrest = mix(vec3(0.10, 0.13, 0.20), vec3(0.34, 0.38, 0.45), uDayFactor);
          float stormShade = smoothstep(0.34, 0.82, stormTurb);
          vec3 stormCol = mix(stormCrest, stormUnderbelly, stormShade);

          // Restrained warm amber rim along storm-bank edges facing sunset
          float stormRim = pow(sunAlign, 2.4) * (1.0 - stormShade) * (0.32 + uSunsetFactor * 0.88);
          stormCol += uSunsetGlowColor * stormRim * 0.85;

          // Distant internal lightning illuminating cloud interiors behind the lighthouse
          float boltProx = pow(max(0.0, dot(dir, normalize(uLightningPos))), 3.8);
          float internalGlow = (0.25 + boltProx * 1.75) * (0.45 + 0.55 * (1.0 - stormShade));
          stormCol += vec3(0.62, 0.78, 0.98) * uLightningFlash * internalGlow;

          float stormOpacity = clamp(stormAlpha * (0.18 + uStormIntensity * 0.80), 0.0, 0.95);
          sky = mix(sky, stormCol, stormOpacity);

          // Subtle atmospheric haze softening distant clouds right at the horizon
          sky = mix(sky, hazeTint, (1.0 - horizonFade) * (0.32 + uAtmosphericHaze * 0.38));
        }

        // Below horizon blends smoothly into horizon fog
        float belowMask = smoothstep(0.01, -0.08, dir.y);
        sky = mix(sky, uHorizonColor * 0.38, belowMask);

        gl_FragColor = vec4(sky, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });
}

/**
 * Soft Atmospheric Volumetric Lighthouse Beacon Beam Shader.
 * Eliminates sharp geometric cone boundaries & opaque yellow triangles via:
 * - Soft feathered radial Gaussian-style Fresnel attenuation controlled by uSoftness
 * - Bright central axial core surrounded by a wide misty scattering halo
 * - Distance attenuation scaled by uRange
 * - Weather-responsive atmospheric scattering (whisper-faint in clear air, soft luminous glow in fog/rain)
 * - Natural forward-scattering brightening when sweeping toward camera
 */
export function createBeaconBeamMaterial(isCore = false): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(1.0, 0.84, 0.52) },
      uIntensity: { value: 1.35 },
      uSoftness: { value: 0.68 },
      uRange: { value: 96.0 },
      uFogDensity: { value: 0.34 },
      uRainIntensity: { value: 0.62 },
      uBeamDir: { value: new THREE.Vector3(-1, 0, 0) },
      uProminence: { value: 1.15 },
      uIsCore: { value: isCore ? 1.0 : 0.0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormalWorld;
      varying vec3 vWorldPos;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormalWorld = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uSoftness;
      uniform float uRange;
      uniform float uFogDensity;
      uniform float uRainIntensity;
      uniform vec3 uBeamDir;
      uniform float uProminence;
      uniform float uIsCore;

      varying vec3 vNormalWorld;
      varying vec3 vWorldPos;
      varying vec2 vUv;

      float hash2(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x),
          mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        // vUv.y = 1 at narrow lantern glass exit, 0 at far open mouth
        float axialDist = clamp(1.0 - vUv.y, 0.0, 1.0);

        // Ultra-soft feathered radial falloff: smoothly hits 0.0 BEFORE geometric cone silhouette
        float rawFacing = abs(dot(normalize(vNormalWorld), viewDir));
        float remapped = clamp((rawFacing - 0.10) / 0.90, 0.0, 1.0);
        float softExp = mix(2.1, 4.9, clamp(uSoftness, 0.0, 1.0));
        float radialProfile = pow(remapped, mix(softExp, softExp + 1.4, uIsCore));

        // Smooth launch right out of the Fresnel lens + physically motivated inverse-distance decay
        float originFade = smoothstep(0.0, 0.055, axialDist);
        float invDecay = 1.0 / (1.0 + axialDist * axialDist * mix(4.2, 7.5, uIsCore));
        float farTaper = pow(1.0 - axialDist, mix(1.65, 2.35, uSoftness));
        float distAtten = originFade * invDecay * farTaper;

        // Forward scattering: brightens naturally sweeping toward viewer, dims pointing away
        vec3 bDir = normalize(uBeamDir);
        float align = dot(bDir, viewDir);
        float forwardScatter = 0.42 + 0.78 * smoothstep(-0.82, 0.85, align);

        // True atmospheric scattering response:
        // Faint in crystal-clear air, luminous atmospheric cone in coastal fog & rain
        float clearFloor = mix(0.12, 0.24, uIsCore);
        float fogScatter = uFogDensity * mix(1.05, 0.65, uIsCore);
        float rainScatter = uRainIntensity * 0.48;
        float mediumScatter = clearFloor + fogScatter + rainScatter;

        // Drifting mist & rain particulates catching the beam light
        float mist1 = noise(vec2(vUv.x * 8.0 + uTime * 0.22, axialDist * 5.0 - uTime * 0.42));
        float mist2 = noise(vec2(vUv.x * 18.0 - uTime * 0.16, axialDist * 11.0 - uTime * 0.75));
        float rainCatch = mix(0.84, 0.68 + 0.56 * mist2, uRainIntensity);
        float mistMod = (0.76 + 0.34 * mist1) * rainCatch;

        // Scale visibility slightly with beam range
        float rangeNorm = clamp(uRange / 96.0, 0.55, 1.35);

        float layerGain = mix(0.145, 0.195, uIsCore);
        float alpha =
          radialProfile *
          distAtten *
          forwardScatter *
          mediumScatter *
          mistMod *
          uIntensity *
          uProminence *
          rangeNorm *
          layerGain;
        alpha = clamp(alpha, 0.0, mix(0.24, 0.34, uIsCore));

        // Warm incandescent core transitioning smoothly to soft misty amber scatter downrange
        vec3 coreCol = vec3(1.0, 0.93, 0.76);
        vec3 scatterCol = vec3(0.96, 0.72, 0.38);
        vec3 beamCol = mix(coreCol, scatterCol, smoothstep(0.0, 0.48, axialDist) * (1.0 - uIsCore * 0.35));

        gl_FragColor = vec4(beamCol, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/**
 * Enhances the island rock MeshStandardMaterial with localized shoreline & rain wetness,
 * geological strata & crevice darkening, irregular mineral variation, and mossy coastal ledges
 * without turning all rocks uniformly glossy black.
 */
export function applyIslandRockShader(
  material: THREE.MeshStandardMaterial
): { uRainWetness: { value: number }; uWaveHeight: { value: number } } {
  const uniforms = {
    uRainWetness: { value: 0.65 },
    uWaveHeight: { value: 1.0 },
  };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRainWetness = uniforms.uRainWetness;
    shader.uniforms.uWaveHeight = uniforms.uWaveHeight;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vRockWorldPos;
        varying vec3 vRockWorldNorm;`
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
        vRockWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        vRockWorldNorm = normalize(mat3(modelMatrix) * objectNormal);`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uRainWetness;
        uniform float uWaveHeight;
        varying vec3 vRockWorldPos;
        varying vec3 vRockWorldNorm;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        // Irregular mineral variation (cool basalt slate vs warm iron-ochre granite pockets)
        float mineralField = sin(vRockWorldPos.x * 0.23 + vRockWorldPos.z * 0.19) * cos(vRockWorldPos.y * 0.45 - vRockWorldPos.x * 0.15) * 0.5 + 0.5;
        vec3 warmMineral = vec3(1.08, 0.99, 0.90);
        vec3 coolBasalt = vec3(0.84, 0.89, 0.95);
        diffuseColor.rgb *= mix(coolBasalt, warmMineral, mineralField);

        // Layered geological strata & deep crevice darkening
        float strataWave = sin(vRockWorldPos.y * 2.55 + vRockWorldPos.x * 0.28 + cos(vRockWorldPos.z * 0.35) * 0.8);
        float strataShade = 0.80 + 0.20 * strataWave;
        float creviceAO = smoothstep(-0.3, 0.72, vRockWorldNorm.y) * 0.22 + 0.78;
        diffuseColor.rgb *= strataShade * creviceAO;

        // Coastal moss & turf ledges on upward-facing dry zones above splash line
        float upSlope = smoothstep(0.58, 0.86, vRockWorldNorm.y);
        float aboveSpray = smoothstep(2.5, 4.6, vRockWorldPos.y);
        float mossPatch = sin(vRockWorldPos.x * 0.38 + 0.6) * cos(vRockWorldPos.z * 0.34 - 0.4) * 0.5 + 0.5;
        float mossMask = upSlope * aboveSpray * smoothstep(0.32, 0.74, mossPatch);
        vec3 mossCol = vec3(0.20, 0.24, 0.12);
        diffuseColor.rgb = mix(diffuseColor.rgb, mossCol, mossMask * 0.68);

        // Localized wetness: concentrated around shoreline splash zone, wave-facing cliffs, and rain-exposed tops
        float splashZone = 1.0 - smoothstep(0.35, 2.2 + uWaveHeight * 0.85, vRockWorldPos.y);
        float rainExposed = smoothstep(0.18, 0.85, vRockWorldNorm.y) * (0.45 + 0.55 * mineralField);
        float rainWet = uRainWetness * (0.28 + rainExposed * 0.52);
        float totalWet = clamp(max(splashZone, rainWet), 0.0, 0.92);
        // Darken wet rock naturally without crushing dry rock to pitch black
        diffuseColor.rgb *= mix(1.0, 0.52, totalWet);`
      )
      .replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
        float splashR = 1.0 - smoothstep(0.35, 2.2 + uWaveHeight * 0.85, vRockWorldPos.y);
        float mineralR = sin(vRockWorldPos.x * 0.23 + vRockWorldPos.z * 0.19) * 0.5 + 0.5;
        float rainExposedR = smoothstep(0.22, 0.85, vRockWorldNorm.y) * (0.4 + 0.6 * mineralR);
        float wetR = clamp(max(splashR, uRainWetness * rainExposedR * 0.72), 0.0, 0.9);
        // Selective wet sheen (0.34..0.92), never uniformly glossy black
        roughnessFactor = mix(roughnessFactor, 0.34, wetR * 0.68);`
      );
  };

  material.customProgramCacheKey = () => 'island-wet-rock-v2';
  return uniforms;
}
