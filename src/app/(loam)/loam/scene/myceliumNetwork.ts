import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { GeneratedMyceliumNetwork } from '../logic/networkGenerator';

export interface BuiltMyceliumNetwork {
  group: THREE.Group;
  networkMesh: THREE.Mesh;
  hitPlane: THREE.Mesh;
  updateNetwork: (params: {
    growth: number;
    convergence: number;
    undergroundFactor: number;
    elapsedSec: number;
    pointerWorld: THREE.Vector3;
    foxfireGlowMultiplier?: number;
  }) => void;
  triggerPulseAt: (
    worldPoint: THREE.Vector3,
    elapsedSec: number,
    onReachMushroom: (mushroomIndex: number) => void,
  ) => void;
}

/**
 * Builds the procedural 3D Mycelium Network (Chapter 4 signature moment):
 * - Renders a 3-tier hierarchy of over 1,200 filaments (~16,000 segments):
 *   - Tier 0: Thicker arterial rhizomorph cords (thin TubeGeometry)
 *   - Tier 1 & Tier 2: Hundreds of branching secondary threads and over a thousand hair-fine
 *     feathery hyphae (high-density LineSegments)
 * - Soft Foxfire green-gold bioluminescent shader (`#b8dc3c`):
 *   - Visible growing edge that brightens softly as it advances (`uGrowth`)
 *   - Brightens near the pointer (`uPointerWorld`) and along travelling click pulses (`uPulseOrigin`)
 *   - Fades out cleanly in Chapter 5 as the solid packaging tray resolves
 */
export function buildMyceliumNetworkScene(
  networkData: GeneratedMyceliumNetwork,
): BuiltMyceliumNetwork {
  const group = new THREE.Group();
  group.name = 'BioluminescentMyceliumNetwork';

  // 1. Tier 0 arterial cords as slender TubeGeometries
  const tubeGeometries: THREE.BufferGeometry[] = [];
  // 2. Tier 1 & Tier 2 fine branching threads & hair-fine hyphae as LineSegments
  const linePositions: number[] = [];
  const lineGrowths: number[] = [];
  const lineTiers: number[] = [];

  for (const branch of networkData.branches) {
    if (branch.tier === 0) {
      const curvePts = branch.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(curvePts);
      const tubularSegments = Math.max(12, branch.points.length * 2);
      const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, branch.radius * 0.72, 5, false);

      const vertCount = tubeGeo.attributes.position.count;
      const growthAttr = new Float32Array(vertCount);
      const tierAttr = new Float32Array(vertCount);
      const uvs = tubeGeo.attributes.uv;

      for (let i = 0; i < vertCount; i++) {
        const along = uvs.getX(i);
        growthAttr[i] = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * along;
        tierAttr[i] = 0.0;
      }

      tubeGeo.setAttribute('aGrowth', new THREE.BufferAttribute(growthAttr, 1));
      tubeGeo.setAttribute('aTier', new THREE.BufferAttribute(tierAttr, 1));
      tubeGeometries.push(tubeGeo);
    }

    // Also include smooth subdivided line segments for all branches so the fine filament web is seamless
    const curvePts = branch.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(curvePts);
    const subDivs = branch.tier === 0 ? 18 : branch.tier === 1 ? 12 : 6;
    const sampled = curve.getPoints(subDivs);
    const tierVal = branch.tier === 0 ? 0.0 : branch.tier === 1 ? 1.0 : 2.0;

    for (let s = 0; s < sampled.length - 1; s++) {
      const p0 = sampled[s];
      const p1 = sampled[s + 1];
      const a0 = s / sampled.length;
      const a1 = (s + 1) / sampled.length;
      const g0 = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * a0;
      const g1 = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * a1;

      linePositions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      lineGrowths.push(g0, g1);
      lineTiers.push(tierVal, tierVal);
    }
  }

  const mergedTubeGeo = mergeGeometries(tubeGeometries, false);
  for (const g of tubeGeometries) g.dispose();

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('aGrowth', new THREE.Float32BufferAttribute(lineGrowths, 1));
  lineGeo.setAttribute('aTier', new THREE.Float32BufferAttribute(lineTiers, 1));

  const sharedUniforms = {
    uGrowth: { value: 0.0 },
    uConvergence: { value: 0.0 },
    uVisibility: { value: 0.0 },
    uGlowBoost: { value: 1.0 },
    uTime: { value: 0.0 },
    uPointerWorld: { value: new THREE.Vector3(0, -999, 0) },
    uPulseOrigin: { value: new THREE.Vector3(0, -1, 0) },
    uPulseStartTime: { value: -100.0 },
  };

  const vertexShader = `
    attribute float aGrowth;
    attribute float aTier;

    uniform float uGrowth;
    uniform float uConvergence;
    uniform float uTime;

    varying float vGrowth;
    varying float vTier;
    varying vec3 vWorldPos;

    void main() {
      vGrowth = aGrowth;
      vTier = aTier;

      vec3 pos = position;

      // In Chapter 5 (uConvergence 0 -> 1), threads pull inward & downward toward the tray mould at [0, -5.42, 0]
      vec3 trayTarget = vec3(pos.x * 0.14, -5.42 + (pos.y + 2.5) * 0.08, pos.z * 0.12);
      pos = mix(pos, trayTarget, uConvergence * 0.9);

      // Subtle organic wavy respiration along filaments
      pos.y += sin(pos.x * 2.1 + pos.z * 2.1 + uTime * 1.4) * 0.018;
      pos.x += cos(pos.z * 2.4 + uTime * 1.1) * 0.012;

      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPos = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const fragmentShader = `
    uniform float uGrowth;
    uniform float uVisibility;
    uniform float uGlowBoost;
    uniform float uTime;
    uniform vec3 uPointerWorld;
    uniform vec3 uPulseOrigin;
    uniform float uPulseStartTime;

    varying float vGrowth;
    varying float vTier;
    varying vec3 vWorldPos;

    void main() {
      if (vGrowth > uGrowth) discard;

      // Soft taper at the very tip and a bright advancing growth frontier
      float tipFade = smoothstep(uGrowth, max(0.001, uGrowth - 0.035), vGrowth);
      float growingEdge = exp(-pow((uGrowth - vGrowth) / 0.045, 2.0));

      // Calibrated Foxfire green-gold palette (soft green-gold base, bright only at growing edge & pulses)
      vec3 dimLoamThread = vec3(0.32, 0.44, 0.10);
      vec3 foxfireGold = vec3(0.68, 0.84, 0.24);
      vec3 brightPulseTip = vec3(1.12, 1.28, 0.52);

      float flow = 0.5 + 0.5 * sin(vGrowth * 32.0 - uTime * 2.2);
      vec3 color = mix(dimLoamThread, foxfireGold, 0.35 + 0.45 * flow) * uGlowBoost;

      // Brighten the advancing growing edge
      color = mix(color, brightPulseTip * uGlowBoost, growingEdge * 0.78);

      // Pointer proximity brightening
      float ptrDist = distance(vWorldPos, uPointerWorld);
      float ptrBoost = exp(-ptrDist * ptrDist * 0.35);
      color += brightPulseTip * ptrBoost * 0.65;

      // Interactive click pulse wave travelling outward along the branches
      float pulseAge = uTime - uPulseStartTime;
      float pulseBoost = 0.0;
      if (pulseAge >= 0.0 && pulseAge < 3.6) {
        float distFromClick = distance(vWorldPos, uPulseOrigin);
        float waveRadius = pulseAge * 6.8;
        float ringDelta = abs(distFromClick - waveRadius);
        if (ringDelta < 1.4) {
          float env = 1.0 - (pulseAge / 3.6);
          float w = cos((ringDelta / 1.4) * 1.570796);
          pulseBoost = w * w * env * 1.45;
          color = mix(color, brightPulseTip, min(1.0, pulseBoost));
        }
      }

      // Hierarchy opacity: thicker cords (tier 0) strongest, secondary threads (tier 1) medium, hair-fine hyphae (tier 2) delicate
      float tierBaseAlpha = (vTier < 0.5 ? 0.62 : (vTier < 1.5 ? 0.38 : 0.22)) * min(1.3, uGlowBoost);
      float alpha = tipFade * uVisibility * (tierBaseAlpha + growingEdge * 0.38 + ptrBoost * 0.32 + pulseBoost * 0.55);
      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.94));
    }
  `;

  const shaderMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: sharedUniforms,
    vertexShader,
    fragmentShader,
  });

  const networkMesh = new THREE.Mesh(mergedTubeGeo, shaderMat);
  networkMesh.frustumCulled = false;
  group.add(networkMesh);

  const fineFilamentsLines = new THREE.LineSegments(lineGeo, shaderMat);
  fineFilamentsLines.frustumCulled = false;
  group.add(fineFilamentsLines);

  // Invisible horizontal raycast plane at the average network depth (y = -1.5)
  const hitPlaneGeo = new THREE.PlaneGeometry(28, 28);
  hitPlaneGeo.rotateX(-Math.PI / 2);
  const hitPlaneMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitPlane = new THREE.Mesh(hitPlaneGeo, hitPlaneMat);
  hitPlane.position.y = -1.5;
  group.add(hitPlane);

  const scheduledTimeouts: number[] = [];

  const updateNetwork = (params: {
    growth: number;
    convergence: number;
    undergroundFactor: number;
    elapsedSec: number;
    pointerWorld: THREE.Vector3;
    foxfireGlowMultiplier?: number;
  }) => {
    // Fade the network out completely as the solid tray and studio resolve in Chapter 5
    const vis = params.undergroundFactor * Math.pow(Math.max(0, 1 - params.convergence), 1.6);
    group.visible = vis > 0.008 && params.growth > 0.005;
    sharedUniforms.uGrowth.value = params.growth;
    sharedUniforms.uConvergence.value = params.convergence;
    sharedUniforms.uVisibility.value = vis;
    sharedUniforms.uGlowBoost.value = params.foxfireGlowMultiplier ?? 1.0;
    sharedUniforms.uTime.value = params.elapsedSec;
    sharedUniforms.uPointerWorld.value.copy(params.pointerWorld);
  };

  const triggerPulseAt = (
    worldPoint: THREE.Vector3,
    elapsedSec: number,
    onReachMushroom: (mushroomIndex: number) => void,
  ) => {
    sharedUniforms.uPulseOrigin.value.copy(worldPoint);
    sharedUniforms.uPulseStartTime.value = elapsedSec;

    for (const m of networkData.neighborMushrooms) {
      const dist = Math.hypot(
        m.position[0] - worldPoint.x,
        m.position[1] - worldPoint.y,
        m.position[2] - worldPoint.z,
      );
      const delayMs = Math.max(60, (dist / 6.8) * 1000);
      const tid = window.setTimeout(() => {
        onReachMushroom(m.index);
      }, delayMs);
      scheduledTimeouts.push(tid);
    }
  };

  return {
    group,
    networkMesh,
    hitPlane,
    updateNetwork,
    triggerPulseAt,
  };
}
