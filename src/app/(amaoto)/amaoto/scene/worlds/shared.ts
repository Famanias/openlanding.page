import * as THREE from "three";
import type { ChapterProgressState, WorldName } from "../../logic/chapters";
import type { TimeOfDay } from "../../logic/timeOfDay";
import { createSeededRandom, type Vec3 } from "../../logic/rng";
import { generateMotes } from "../../logic/generators";
import type { WorldTextures } from "../textures";
export type WorldFrame = {
  state: ChapterProgressState;
  day: TimeOfDay;
  elapsedSec: number;
  visibility: number;
  rain: number;
  gustAge: number;
  gustOrigin: THREE.Vector3;
  pointer: THREE.Vector3;
  colour: THREE.Color;
};
export type BuiltWorld = {
  name: WorldName;
  group: THREE.Group;
  update: (frame: WorldFrame) => void;
  dispose: () => void;
  counts: Record<string, number>;
  setTips?: (source: Float32Array) => void;
};
export function worldBase(name: WorldName, anchor: Vec3) {
  const group = new THREE.Group();
  group.name = `Amaoto ${name}`;
  group.position.fromArray(anchor);
  const animated: THREE.ShaderMaterial[] = [];
  const fades: THREE.MeshStandardMaterial[] = [];
  const standard = (
    color: string,
    options: THREE.MeshStandardMaterialParameters = {},
  ) => {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      transparent: true,
      ...options,
    });
    fades.push(m);
    return m;
  };
  const mesh = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: Vec3 = [0, 0, 0],
    scale: Vec3 = [1, 1, 1],
  ) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.fromArray(position);
    m.scale.fromArray(scale);
    m.castShadow = m.receiveShadow = true;
    group.add(m);
    return m;
  };
  const box = (size: Vec3, position: Vec3, material: THREE.Material) =>
    mesh(new THREE.BoxGeometry(...size), material, position);
  const shader = (
    declarations: string,
    vertex: string,
    fragment: string,
    uniforms: Record<string, THREE.IUniform> = {},
    transparent = true,
  ) => {
    const m = new THREE.ShaderMaterial({
      fog: true,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: !transparent,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
        uTime: { value: 0 },
        uVisibility: { value: 1 },
        ...uniforms,
      },
      vertexShader: `varying vec2 vUv;varying vec3 vWorld;uniform float uTime,uVisibility;${declarations}\n#include <fog_pars_vertex>\nvoid main(){vUv=uv;vec3 transformed=position;\n#ifdef USE_INSTANCING\ntransformed=(instanceMatrix*vec4(transformed,1.)).xyz;\n#endif\n${vertex}\nvec4 world=modelMatrix*vec4(transformed,1.);vWorld=world.xyz;vec4 mvPosition=viewMatrix*world;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}`,
      fragmentShader: `varying vec2 vUv;varying vec3 vWorld;uniform float uTime,uVisibility;${declarations.replace(/attribute\s+[^;]+;/g, "")}\n#include <fog_pars_fragment>\nvoid main(){vec3 color=vec3(1.);float alpha=1.;${fragment}\ngl_FragColor=vec4(color,alpha*uVisibility);\n#include <fog_fragment>\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`,
    });
    animated.push(m);
    return m;
  };
  const glow = (color: string) =>
    shader(
      "uniform vec3 uColor;",
      "",
      "float r=length(vUv-.5)*2.;alpha=pow(max(0.,1.-r),2.);color=uColor*2.4;",
      { uColor: { value: new THREE.Color(color) } },
    );
  const counts: Record<string, number> = {};
  return {
    name,
    group,
    standard,
    mesh,
    box,
    shader,
    glow,
    counts,
    update(f: WorldFrame) {
      group.visible = f.visibility > 0.008;
      if (!group.visible) return;
      for (const m of fades) {
        m.opacity = f.visibility;
        m.depthWrite = f.visibility > 0.995;
      }
      for (const m of animated) {
        m.uniforms.uTime.value = f.elapsedSec;
        m.uniforms.uVisibility.value = f.visibility;
      }
    },
    dispose() {
      const gs = new Set<THREE.BufferGeometry>(),
        ms = new Set<THREE.Material>();
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          gs.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            ms.add(m),
          );
        }
      });
      gs.forEach((g) => g.dispose());
      ms.forEach((m) => m.dispose());
      group.removeFromParent();
    },
  };
}
export type WorldBase = ReturnType<typeof worldBase>;
export function addMotes(
  b: WorldBase,
  count: number,
  seed: number,
  shavings = false,
) {
  const data = generateMotes(seed, count),
    g = shavings
      ? new THREE.TorusGeometry(0.028, 0.003, 3, 7, Math.PI * 1.6)
      : new THREE.PlaneGeometry(0.025, 0.025);
  const phase = new Float32Array(count);
  for (let i = 0; i < count; i++) phase[i] = data[i * 7 + 6];
  g.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
  const m = b.shader(
    "attribute float aPhase;",
    "transformed.x+=sin(uTime*.18+aPhase)*.3;transformed.y-=mod(uTime*.045+aPhase,3.);",
    shavings
      ? "color=vec3(.25,.16,.04);alpha=.24;"
      : "float r=length(vUv-.5)*2.;alpha=max(0.,1.-r)*.22;color=vec3(.96,.92,.85);",
  );
  const inst = new THREE.InstancedMesh(g, m, count),
    d = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    d.position.fromArray(data, i * 7);
    d.rotation.set(shavings ? phase[i] : 0, 0, phase[i]);
    d.updateMatrix();
    inst.setMatrixAt(i, d.matrix);
  }
  inst.frustumCulled = false;
  b.group.add(inst);
  b.counts[shavings ? "shavings" : "motes"] = count;
}
export function contactShadow(b: WorldBase) {
  const m = b.shader(
    "",
    "",
    "float r=length((vUv-.5)*vec2(1.,1.4))*2.;color=vec3(.009,.007,.005);alpha=pow(max(0.,1.-r),2.)*.22;",
  );
  const plane = b.mesh(new THREE.PlaneGeometry(4, 3), m, [0, -2.405, 0]);
  plane.rotation.x = -Math.PI / 2;
  plane.castShadow = false;
}
export function floor(
  b: WorldBase,
  t: WorldTextures,
  kind = "woodFloorColor",
  width = 26,
  depth = 24,
  y = -2.5,
) {
  contactShadow(b);
  return b.box(
    [width, 0.15, depth],
    [0, y, 0],
    b.standard("#B8923A", {
      map: t.maps[kind],
      bumpMap: t.maps[kind === "tatamiColor" ? "tatamiBump" : "woodBump"],
      bumpScale: 0.025,
      roughnessMap: t.maps.lacquerRoughness,
      roughness: 0.42,
    }),
  );
}
export function randomInstances(
  b: WorldBase,
  g: THREE.BufferGeometry,
  m: THREE.Material,
  count: number,
  seed: number,
  place: (d: THREE.Object3D, r: () => number, i: number) => void,
) {
  const instance = new THREE.InstancedMesh(g, m, count),
    d = new THREE.Object3D(),
    r = createSeededRandom(seed);
  for (let i = 0; i < count; i++) {
    place(d, r, i);
    d.updateMatrix();
    instance.setMatrixAt(i, d.matrix);
  }
  b.group.add(instance);
  return instance;
}
