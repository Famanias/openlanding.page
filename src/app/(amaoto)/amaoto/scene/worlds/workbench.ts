import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import { turnedGeometry } from "../../model/lathe";
import type { WorldTextures } from "../textures";
import { worldBase, floor, addMotes, type BuiltWorld } from "./shared";
export function createWorkbench(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("bench", WORLD_ANCHORS[4]),
    wood = b.standard("#F4ECDD", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.02,
    }),
    ink = b.standard("#1A1613");
  floor(b, t);
  b.box([11, 0.25, 3], [0, -1.1, -2.4], wood);
  for (const x of [-4.7, 4.7])
    for (const z of [-3.6, -1.1]) b.box([0.25, 1.3, 0.25], [x, -1.8, z], wood);
  b.box([0.15, 4, 0.15], [-4, 0.7, -2.5], ink);
  b.box([4, 0.12, 0.12], [-2, 2.6, -2.5], ink);
  const shade = b.mesh(
    new THREE.ConeGeometry(0.65, 0.5, 16, 1, true),
    ink,
    [-0.1, 2.45, -2.5],
  );
  shade.rotation.x = Math.PI;
  const lamp = b.mesh(
    new THREE.CircleGeometry(0.35, 20),
    b.standard("#F4ECDD", { emissive: "#F4ECDD", emissiveIntensity: 1.5 }),
    [-0.1, 2.21, -2.5],
  );
  lamp.rotation.x = -Math.PI / 2;
  const assembly = { value: 0 };
  const parts: THREE.Mesh[] = [];
  const add = (
    geometry: THREE.BufferGeometry,
    x: number,
    z: number,
    step: number,
    color = "#B8923A",
  ) => {
    z -= 2.3;
    const material = b.standard(color, {
      ...(color === "#B8923A" ? { map: t.maps.bambooColor } : {}),
      roughness: 0.55,
    });
    const start = step / 10,
      end = (step + 1) / 10,
      offset = new THREE.Vector3(-x, 1.4, -z);
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uAssembly = assembly;
      shader.uniforms.uPartOffset = { value: offset };
      shader.vertexShader =
        `uniform float uAssembly;uniform vec3 uPartOffset;varying float vPresence;\n` +
        shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\nfloat part=smoothstep(${start.toFixed(3)},${end.toFixed(3)},uAssembly);transformed+=uPartOffset*part;transformed.y+=sin(part*3.14159)*.5;vPresence=1.-smoothstep(.8,1.,part);`,
      );
      shader.fragmentShader =
        "varying float vPresence;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <alphatest_fragment>",
        "#include <alphatest_fragment>\ndiffuseColor.a*=vPresence;if(vPresence<.02)discard;",
      );
    };
    const mesh = b.mesh(geometry, material, [x, -0.8, z]);
    mesh.castShadow = false;
    parts.push(mesh);
    return mesh;
  };
  const shaft = add(
    new THREE.CylinderGeometry(0.04, 0.05, 2.6, 10),
    -3.6,
    -0.4,
    2,
  );
  shaft.rotation.z = Math.PI / 2;
  const ribs = add(
    new THREE.CylinderGeometry(0.018, 0.025, 2, 6),
    -3.2,
    0.4,
    0,
  );
  ribs.rotation.z = Math.PI / 2;
  for (let i = 1; i < 7; i++) {
    const r = add(
      new THREE.CylinderGeometry(0.012, 0.02, 2, 5),
      -3.2 + i * 0.09,
      0.4 + i * 0.04,
      1,
    );
    r.rotation.z = Math.PI / 2;
  }
  add(turnedGeometry("cap"), -1.2, -0.6, 3);
  add(turnedGeometry("runner"), -0.5, 0.4, 5);
  const links = add(
    new THREE.CylinderGeometry(0.015, 0.02, 1.1, 6),
    -1.5,
    0.8,
    4,
  );
  links.rotation.z = 1.3;
  const paper = add(
    new THREE.CylinderGeometry(0.18, 0.18, 1.8, 20),
    1.1,
    0.5,
    6,
    "#F4ECDD",
  );
  paper.rotation.z = Math.PI / 2;
  const brush = add(
    new THREE.CylinderGeometry(0.035, 0.045, 1.15, 10),
    2.8,
    0.2,
    7,
  );
  brush.rotation.z = 1.1;
  add(
    new THREE.ConeGeometry(0.08, 0.3, 10),
    3.28,
    0.2,
    7,
    "#1A1613",
  ).rotation.z = 1.1;
  const coil = add(
    new THREE.TorusGeometry(0.2, 0.018, 5, 36),
    0.2,
    -0.9,
    8,
    "#1A1613",
  );
  coil.rotation.x = Math.PI / 2;
  b.mesh(
    new THREE.CylinderGeometry(0.25, 0.2, 0.35, 20),
    b.standard("#1A1613", { roughness: 0.3 }),
    [3.7, -0.8, -3.2],
  );
  const oil = b.shader(
    "",
    "",
    `float ripple=sin(vUv.x*80.+uTime*.8)*sin(vUv.y*70.-uTime*.7);float sheen=pow(max(0.,sin(vUv.x*8.+vUv.y*6.+ripple*.12)),12.);color=vec3(.035,.025,.008)+vec3(.48,.29,.045)*sheen*.6;alpha=1.;`,
    {},
    false,
  );
  const surface = b.mesh(
    new THREE.CircleGeometry(0.23, 32),
    oil,
    [3.7, -0.62, -3.2],
  );
  surface.rotation.x = -Math.PI / 2;
  const thread = b.mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, -0.1, 0.1),
        new THREE.Vector3(0.35, -0.3, 0.2),
        new THREE.Vector3(0.3, -0.7, 0.23),
      ]),
      20,
      0.006,
      4,
      false,
    ),
    b.shader(
      "",
      "transformed.x+=sin(uTime*.8+position.y*4.)*.025;",
      "color=vec3(.03,.02,.01);alpha=1.;",
      {},
      false,
    ),
    [0.3, -0.9, -0.9],
  );
  thread.castShadow = false;
  addMotes(b, software ? 36 : 180, 180);
  b.counts.looseParts = parts.length;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      assembly.value = f.state.benchAssembly;
      (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.2 + f.day.value * 0.5;
    },
  };
}
