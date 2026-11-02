import * as THREE from "three";
import type { OpticalLensSpec } from "./createOpticalLensModel";

function dataMap(data: Uint8Array, size: number) {
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/** Independent scalar/normal fields. No reflected reference pixels are painted on geometry. */
export function createLensMaterials(spec: OpticalLensSpec, surface = false) {
  const size = 1024;
  const roughness = new Uint8Array(size * size * 4);
  const normals = new Uint8Array(size * size * 4);
  const emission = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const grain = Math.sin(y * 1.77 + Math.sin(x * .011) * .6) + (surface ? .25 * Math.sin(y * 2.63 + x * .027) : 0);
    const r = Math.round(239 + 15 * Math.sin(y * .813 + Math.sin(x * .031)));
    roughness.set([r, r, r, 255], i);
    normals.set([128, Math.round(128 + grain * 12), 254, 255], i);
    const u = x / size, v = y / size;
    const e = Math.round(255 * (.08 + .92 * Math.exp(-((u - .25) ** 2 * 75 + (v - .5) ** 2 * 35))));
    emission.set([e, e, e, 255], i);
  }
  const roughnessMap = dataMap(roughness, size);
  const normalMap = dataMap(normals, size);
  const emissiveMap = dataMap(emission, size);
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  const materials = new Map<string, THREE.MeshPhysicalMaterial>();
  for (const s of spec.materials) {
    const material = new THREE.MeshPhysicalMaterial({
      name: s.id, color: s.baseColor, roughness: s.roughness.base,
      metalness: s.metalness.base, transmission: s.transmission,
      ior: s.ior, dispersion: s.dispersion, thickness: s.thickness,
      clearcoat: s.clearcoat, clearcoatRoughness: .06,
      anisotropy: s.anisotropy, envMapIntensity: 1.35,
      attenuationColor: s.transmission ? new THREE.Color(s.baseColor) : new THREE.Color("white"),
      attenuationDistance: 4,
    });
    if (s.metalness.base > .5) {
      material.roughnessMap = roughnessMap;
      material.normalMap = normalMap;
      material.normalScale.set(surface ? .22 : .12, surface ? .08 : .12);
      if (surface) material.anisotropy = .18;
    }
    if (s.id === "emerald") {
      material.emissive.set("#00E599");
      material.emissiveIntensity = .55;
      material.emissiveMap = emissiveMap;
    }
    materials.set(s.id, material);
  }
  return { materials, dispose() { materials.forEach(m => m.dispose()); roughnessMap.dispose(); normalMap.dispose(); emissiveMap.dispose(); } };
}
