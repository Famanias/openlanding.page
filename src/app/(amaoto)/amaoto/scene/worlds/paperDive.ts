import * as THREE from "three";
import { PAPER_PATCH, PAPER_NORMAL } from "../../logic/chapters";
import { generateFibres } from "../../logic/generators";
import type { WorldTextures } from "../textures";
import { worldBase, randomInstances, type BuiltWorld } from "./shared";
export function createPaperDive(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("paper", [0, 0, 0]),
    fibres = generateFibres(481, software ? 300 : 1500).reverse(),
    segments = 8,
    positions: number[] = [],
    uv: number[] = [],
    arrivals: number[] = [],
    layers: number[] = [],
    phases: number[] = [],
    indices: number[] = [];
  for (const f of fibres) {
    const offset = positions.length / 3,
      // Keep the lighter field dense around the macro camera's narrow viewing cone.
      fieldScale = software ? 0.65 : 1,
      c = Math.cos(f.angle),
      s = Math.sin(f.angle);
    for (let j = 0; j <= segments; j++)
      for (const side of [-1, 1]) {
        const q = j / segments - 0.5,
          curve = Math.sin(q * Math.PI * 2) * f.curl,
          width = f.thickness * side;
        positions.push(
          f.position[0] * fieldScale + c * f.length * q - s * (curve + width),
          f.position[1] * fieldScale + s * f.length * q + c * (curve + width),
          f.position[2] * 1.8 + Math.sin(q * Math.PI) * 0.01,
        );
        uv.push(j / segments, (side + 1) / 2);
        arrivals.push(f.oilArrival);
        layers.push(f.layer / 5);
        phases.push(f.phase);
      }
    for (let j = 0; j < segments; j++) {
      const k = offset + j * 2;
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setAttribute(
    "aOilArrival",
    new THREE.Float32BufferAttribute(arrivals, 1),
  );
  geometry.setAttribute("aLayer", new THREE.Float32BufferAttribute(layers, 1));
  geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
  geometry.setIndex(indices);
  const uniforms = {
    uDive: { value: 0 },
    uOilSoak: { value: 0 },
    uTransmission: { value: 0.5 },
    uLightDir: { value: new THREE.Vector3(0, 1, 0) },
  };
  const fibre = b.shader(
    "attribute float aOilArrival,aLayer,aPhase;varying float vArrival,vLayer;uniform float uDive,uOilSoak,uTransmission;uniform vec3 uLightDir;",
    "vArrival=aOilArrival;vLayer=aLayer;transformed.y+=sin(uTime*.35+aPhase+position.x*4.)*.002*uDive;",
    `float wet=smoothstep(vArrival-.04,vArrival+.04,uOilSoak);float front=exp(-pow((uOilSoak-vArrival)/.05,2.));float edge=.6+.4*sin(vUv.y*3.14159);float transmission=pow(abs(dot(normalize(cameraPosition-vWorld),normalize(uLightDir))),2.);
  vec3 dry=vec3(.90,.84,.72),amber=vec3(.48,.29,.045);color=mix(dry,amber,wet*.7)*edge*(.8+transmission*uTransmission)+vec3(.48,.29,.045)*front*2.;alpha=mix(.94,.34,wet)*uDive*(1.-vLayer*.15);`,
    uniforms,
  );
  b.mesh(geometry, fibre);
  b.counts.fibres = fibres.length;
  const noise = `float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}float fbm(vec2 p){float n=0.,a=.5;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<4;i++){n+=a*noise(p);p=r*p*2.03+3.7;a*=.5;}return n;}`;
  const background = b.shader(
    `uniform float uDive,uOilSoak;uniform sampler2D uThickness;${noise}`,
    "",
    `float n=fbm(vUv*9.),thickness=texture2D(uThickness,vUv*2.).r;float wet=smoothstep(.05,.85,uOilSoak+(.5-n)*.25);color=mix(vec3(.90,.84,.72),vec3(.63,.43,.12),wet*.6)*(.7+n*.22+thickness*.1);alpha=uDive;`,
    {
      uDive: uniforms.uDive,
      uOilSoak: uniforms.uOilSoak,
      uThickness: { value: t.maps.washiTransmission },
    },
  );
  b.mesh(new THREE.PlaneGeometry(4.2, 4.2), background, [0, 0, -1.4]);
  const bokehGeo = new THREE.PlaneGeometry(0.13, 0.13),
    phase = new Float32Array(software ? 12 : 36);
  for (let i = 0; i < phase.length; i++) phase[i] = i * 0.37;
  bokehGeo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
  const bokeh = b.shader(
    "attribute float aPhase;uniform float uDive;",
    "transformed.x+=sin(uTime*.15+aPhase)*.08;transformed.y+=cos(uTime*.12+aPhase)*.04;",
    "float r=length(vUv-.5)*2.;alpha=pow(max(0.,1.-r),3.)*.16*uDive;color=vec3(.95,.78,.4);",
    { uDive: uniforms.uDive },
  );
  randomInstances(b, bokehGeo, bokeh, phase.length, 481, (d, r) => {
    d.position.set((r() - 0.5) * 2, (r() - 0.5) * 2, -0.3 - r() * 0.5);
    d.scale.setScalar(0.5 + r() * 2);
  });
  b.counts.bokeh = phase.length;
  const patch = new THREE.Vector3().fromArray(PAPER_PATCH);
  b.group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3().fromArray(PAPER_NORMAL).normalize(),
  );
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      b.group.position.fromArray(f.state.anchor).add(patch);
      uniforms.uDive.value = f.state.paperDive;
      uniforms.uOilSoak.value = f.state.oilSoak;
      uniforms.uTransmission.value = f.day.paperTransmission;
      uniforms.uLightDir.value.fromArray(f.day.sunOffset).normalize();
    },
  };
}
