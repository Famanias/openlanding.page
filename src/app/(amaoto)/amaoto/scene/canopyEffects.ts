import * as THREE from "three";
import type { WorldTextures } from "./textures";
import type { WorldFrame } from "./worlds/shared";
import { gustField } from "../logic/generators";
/** Adds world optics around the existing dye/cutaway hook without replacing its painter. */
export function installCanopyEffects(
  model: THREE.Group,
  textures: WorldTextures,
) {
  const skin = model.children.find(
    (o) => o.userData.partId === "canopy",
  ) as THREE.Mesh;
  const material = skin.material as THREE.MeshStandardMaterial,
    original = material.onBeforeCompile;
  const uniforms = {
    uWorldDive: { value: 0 },
    uWorldOil: { value: 0 },
    uWorldTransmission: { value: 0.5 },
    uWorldLantern: { value: 0 },
    uWorldRain: { value: 0 },
    uWorldGust: { value: 0 },
    uWorldTime: { value: 0 },
    uWorldSun: { value: new THREE.Vector3(0, 1, 0) },
    uThickness: { value: textures.maps.washiTransmission },
  };
  material.transparent = true;
  material.onBeforeCompile = (shader, renderer) => {
    original.call(material, shader, renderer);
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader =
      "uniform float uWorldGust,uWorldTime;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\ntransformed+=normal*uWorldGust*.025*sin(position.x*5.+position.z*4.+uWorldTime*4.);",
    );
    shader.fragmentShader =
      "uniform float uWorldDive,uWorldOil,uWorldTransmission,uWorldLantern,uWorldRain,uWorldGust,uWorldTime;uniform vec3 uWorldSun;uniform sampler2D uThickness;\nfloat beadHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n" +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <alphatest_fragment>",
      "#include <alphatest_fragment>\ndiffuseColor.a*=1.-smoothstep(.12,.8,uWorldDive);if(diffuseColor.a<.025)discard;",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      "#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.34,uWorldOil*.65);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      `vec3 paperLight=normalize(mat3(viewMatrix)*uWorldSun);float thickness=texture2D(uThickness,vMapUv).r;
   float transmitted=pow(abs(dot(normal,paperLight)),.7)*(1.-thickness*.65)*uWorldTransmission;
   float ribShade=1.-smoothstep(.025,.095,abs(fract(vMapUv.x*40.+.5)-.5));
   outgoingLight+=diffuseColor.rgb*transmitted*(gl_FrontFacing?.38:1.3)*(1.+uWorldOil*.35)*(1.-ribShade*.65);
   outgoingLight+=diffuseColor.rgb*vec3(.48,.29,.045)*uWorldLantern*(1.-thickness*.55)*(gl_FrontFacing?.65:1.3)*(1.-ribShade*.75);
   vec2 beadUv=vMapUv*vec2(180.,100.),cell=floor(beadUv);vec2 spot=vec2(beadHash(cell),beadHash(cell+13.));float bead=(1.-smoothstep(.035,.12,length(fract(beadUv)-spot)))*step(.8,beadHash(cell+47.));
   float spec=pow(max(0.,dot(reflect(-paperLight,normal),normalize(vViewPosition))),18.);outgoingLight+=vec3(.90,.84,.72)*bead*spec*uWorldRain*3.*(1.-uWorldGust*.8);
   #include <opaque_fragment>`,
    );
  };
  material.needsUpdate = true;
  const point = new THREE.Vector3();
  return {
    update(f: WorldFrame) {
      uniforms.uWorldDive.value = f.state.paperDive;
      uniforms.uWorldOil.value = f.state.oilSoak;
      uniforms.uWorldTransmission.value = f.day.paperTransmission;
      uniforms.uWorldLantern.value =
        (f.state.worldVisibility.street +
          f.state.worldVisibility.genkan * 0.7) *
        f.day.lanternIntensityMultiplier;
      uniforms.uWorldRain.value = f.rain;
      uniforms.uWorldTime.value = f.elapsedSec;
      uniforms.uWorldSun.value.fromArray(f.day.sunOffset).normalize();
      point.fromArray(f.state.anchor);
      const g = gustField(f.gustAge, point.distanceTo(f.gustOrigin));
      uniforms.uWorldGust.value = g.amplitude;
      material.depthWrite = f.state.paperDive < 0.1;
    },
    dispose() {
      material.onBeforeCompile = original;
    },
  };
}
