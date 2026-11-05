import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createLensMaterials } from "./lensMaterials";
import { createOpticalLensModel, opticalLensSpec, type OpticalLensSpec, type LensRuntime } from "./createOpticalLensModel";

describe("interior optical material ownership",()=>{
  it("keeps every core rendering surface inside the original emerald volume",()=>{
    const model=createOpticalLensModel(undefined,{pass:"material-pass",quality:"low"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      r.nodes["front-lens"].traverse(o=>{
        const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;mesh.updateMatrix();
        const p=mesh.geometry.getAttribute("position"),v=new THREE.Vector3();
        for(let i=0;i<p.count;i++){
          v.fromBufferAttribute(p,i).applyMatrix4(mesh.matrix);
          expect((v.x/.59)**2+(v.y/.59)**2+(v.z/.23)**2).toBeLessThanOrEqual(1.00001);
        }
      });
    }finally{r.dispose();}
  });
  it("retains the original emission color space and releases both core maps once",()=>{
    const model=createOpticalLensModel(undefined,{pass:"material-pass",quality:"low"});
    const r=model.userData.sculptRuntime as LensRuntime;
    const textures=new Set<THREE.Texture>();
    r.nodes["front-lens"].traverse(o=>{
      const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;
      const m=mesh.material as THREE.MeshPhysicalMaterial;
      if(m.map)textures.add(m.map);if(m.emissiveMap)textures.add(m.emissiveMap);
    });
    expect([...textures].some(t=>t.colorSpace===THREE.SRGBColorSpace)).toBe(true);
    expect([...textures].some(t=>t.colorSpace===THREE.NoColorSpace)).toBe(true);
    const disposal=[...textures].map(t=>vi.spyOn(t,"dispose"));
    r.dispose();r.dispose();disposal.forEach(spy=>expect(spy).toHaveBeenCalledTimes(1));
  });
  it("keeps exterior scalars and creates thickness-specific optical variants",()=>{
    const p=createLensMaterials(opticalLensSpec as OpticalLensSpec,true);
    try {
      const glass=p.materials.get("glass")!,metal=p.materials.get("titanium")!;
      expect([glass.transmission,glass.roughness,glass.ior,glass.dispersion]).toEqual([.98,.03,1.52,.08]);
      expect([metal.metalness,metal.roughness]).toEqual([.85,.25]);
      const optic=p.materials.get("glass:front-biconvex");
      expect(optic).toBeDefined();expect(optic).not.toBe(glass);
      expect(optic!.thickness).toBeCloseTo(.20,6);
      expect(optic!.transmission).toBe(glass.transmission);
      expect(p.materials.get("glass:front-meniscus")!.thickness).toBeCloseTo(.105,6);
      expect(metal.normalMap).not.toBe(metal.roughnessMap);
      expect(metal.normalMap!.colorSpace).toBe(THREE.NoColorSpace);
    } finally {p.dispose();}
  });
  it("disposes variants and shared maps once even when cleanup repeats",()=>{
    const p=createLensMaterials(opticalLensSpec as OpticalLensSpec,true);
    const material=vi.spyOn(p.materials.get("glass")!,"dispose");
    const texture=vi.spyOn(p.materials.get("titanium")!.normalMap!,"dispose");
    p.dispose();p.dispose();
    expect(material).toHaveBeenCalledTimes(1);expect(texture).toHaveBeenCalledTimes(1);
  });
});
