import * as THREE from "three";
import { generateRain } from "../logic/generators";
import { createSeededRandom } from "../logic/rng";
import type { WorldBase, WorldFrame } from "./worlds/shared";
export function createRain(b: WorldBase, software: boolean) {
  const count = software ? 1200 : 6000,
    data = generateRain(2026, count),
    spawn = new Float32Array(count * 4),
    length = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    spawn.set(data.subarray(i * 5, i * 5 + 4), i * 4);
    length[i] = data[i * 5 + 4];
  }
  const geometry = new THREE.PlaneGeometry(0.012, 1);
  geometry.setAttribute("aSpawn", new THREE.InstancedBufferAttribute(spawn, 4));
  geometry.setAttribute(
    "aLength",
    new THREE.InstancedBufferAttribute(length, 1),
  );
  const uniforms = {
    uRain: { value: 0 },
    uGustAge: { value: 100 },
    uGustOrigin: { value: new THREE.Vector3() },
    uPointerWorld: { value: new THREE.Vector3(1000, 0, 1000) },
    uTint: { value: new THREE.Color("#F4ECDD") },
  };
  const declarations =
    "attribute vec4 aSpawn;attribute float aLength;uniform float uRain,uGustAge;uniform vec3 uGustOrigin,uPointerWorld,uTint;";
  const rain = b.shader(
    declarations,
    `float fall=mod(uTime*aSpawn.z+aSpawn.w*13.,13.);transformed=vec3(aSpawn.x+position.x,7.-fall+position.y*aLength,aSpawn.y);
 float distanceToGust=length(transformed.xz-uGustOrigin.xz);float wave=exp(-pow((distanceToGust-uGustAge*6.5)/2.,2.))*sin(clamp(uGustAge/3.6,0.,1.)*3.14159)*step(0.,uGustAge)*(1.-step(3.6,uGustAge));transformed.x+=wave*1.6+position.y*aLength*(.18+wave);`,
    `if(vWorld.y< -2.42)discard;float pointerGlow=exp(-length(vWorld.xz-uPointerWorld.xz)*.5);color=uTint*(.7+pointerGlow*.7);alpha=uRain*(.18+vUv.y*.32);`,
    uniforms,
  );
  const streaks = new THREE.InstancedMesh(geometry, rain, count),
    identity = new THREE.Matrix4();
  for (let i = 0; i < count; i++) streaks.setMatrixAt(i, identity);
  streaks.frustumCulled = false;
  b.group.add(streaks);
  const rippleCount = software ? 12 : 48,
    rng = createSeededRandom(98),
    rippleGeo = new THREE.PlaneGeometry(0.7, 0.7),
    phases = new Float32Array(rippleCount),
    dummy = new THREE.Object3D();
  for (let i = 0; i < rippleCount; i++) phases[i] = rng();
  rippleGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(phases, 1),
  );
  const ripple = b.shader(
    "attribute float aPhase;varying float vPhase;uniform float uRain;uniform vec3 uTint;",
    "vPhase=aPhase;",
    `float age=fract(uTime*.38+vPhase),r=length(vUv-.5)*2.;float ring=(1.-smoothstep(.018,.035,abs(r-age)));alpha=ring*(1.-age)*uRain*.48;color=uTint;`,
    { uRain: uniforms.uRain, uTint: uniforms.uTint },
  );
  const rings = new THREE.InstancedMesh(rippleGeo, ripple, rippleCount);
  for (let i = 0; i < rippleCount; i++) {
    dummy.position.set((rng() - 0.5) * 19, -2.405, (rng() - 0.5) * 20);
    dummy.rotation.set(-Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    rings.setMatrixAt(i, dummy.matrix);
  }
  b.group.add(rings);
  const dripCount = software ? 12 : 40,
    tips = new Float32Array(dripCount * 3),
    dripGeo = new THREE.SphereGeometry(0.014, 4, 4),
    tipAttribute = new THREE.InstancedBufferAttribute(tips, 3);
  dripGeo.setAttribute("aTip", tipAttribute);
  const dripPhase = new Float32Array(dripCount);
  for (let i = 0; i < dripCount; i++) dripPhase[i] = i / dripCount;
  dripGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(dripPhase, 1),
  );
  const drip = b.shader(
    "attribute vec3 aTip;attribute float aPhase;uniform float uRain;uniform vec3 uTint;",
    "float age=fract(uTime*.72+aPhase);transformed+=aTip;transformed.y-=age*age*4.5;",
    "if(vWorld.y< -2.42)discard;color=uTint;alpha=uRain*.7;",
    { uRain: uniforms.uRain, uTint: uniforms.uTint },
  );
  const drips = new THREE.InstancedMesh(dripGeo, drip, dripCount);
  for (let i = 0; i < dripCount; i++) drips.setMatrixAt(i, identity);
  drips.frustumCulled = false;
  b.group.add(drips);
  Object.assign(b.counts, {
    rain: count,
    ripples: rippleCount,
    drips: dripCount,
  });
  const warm = new THREE.Color("#B8923A");
  return {
    setTips(source: Float32Array) {
      for (let i = 0; i < dripCount; i++) {
        const index = Math.floor((i * 40) / dripCount) * 3;
        tips[i * 3] = source[index] - b.group.position.x;
        tips[i * 3 + 1] = source[index + 1];
        tips[i * 3 + 2] = source[index + 2] - b.group.position.z;
      }
      tipAttribute.needsUpdate = true;
    },
    update(f: WorldFrame) {
      uniforms.uRain.value = f.rain;
      uniforms.uGustAge.value = f.gustAge;
      uniforms.uGustOrigin.value.copy(f.gustOrigin).sub(b.group.position);
      uniforms.uPointerWorld.value.copy(f.pointer);
      uniforms.uTint.value.set("#F4ECDD").lerp(warm, (1 - f.day.value) * 0.4);
    },
  };
}
