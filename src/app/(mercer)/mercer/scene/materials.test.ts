import { describe, expect, it } from "vitest";
import { AdditiveBlending, DoubleSide } from "three";
import { buildGeodesicRibbonGeometry } from "../model/torusKnotMath";
import { createLatticeGeometry, createParticleShellGeometry, createParticleShellMaterial, createTranslucentMembraneMaterial, createWireframeLatticeMaterial } from "./materials";

describe("emissive lattice, membrane and particle shell", () => {
  it("uses additive transparency without depth writes for every layer", () => {
    const materials = [createWireframeLatticeMaterial(), createTranslucentMembraneMaterial(), createParticleShellMaterial()];
    for (const material of materials) {
      expect(material.transparent).toBe(true);
      expect(material.depthWrite).toBe(false);
      expect(material.blending).toBe(AdditiveBlending);
      expect(material.uniforms.uTime.value).toBe(0);
      material.dispose();
    }
    expect(materials[1].side).toBe(DoubleSide);
    expect(materials[0].uniforms.uColorCyan).toBeDefined();
    expect(materials[0].uniforms.uColorLime).toBeDefined();
  });

  it("prepares barycentric triangles without modifying the source ribbon", () => {
    const source = buildGeodesicRibbonGeometry(24, 6, 0.45, 0.12);
    const lattice = createLatticeGeometry(source);
    expect(source.getIndex()).not.toBeNull();
    expect(lattice.getIndex()).toBeNull();
    expect(lattice.getAttribute("aBarycentric").count).toBe(lattice.getAttribute("position").count);
    expect(Array.from(lattice.getAttribute("aBarycentric").array).slice(0, 9)).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    source.dispose();
    lattice.dispose();
  });

  it("generates a deterministic, finite shell within the performance budget", () => {
    const first = createParticleShellGeometry(500, 3.2);
    const second = createParticleShellGeometry(500, 3.2);
    expect(first.getAttribute("position").count).toBe(500);
    expect(first.getAttribute("aPhase").count).toBe(500);
    expect(first.getAttribute("aSize").count).toBe(500);
    expect(Array.from(first.getAttribute("position").array)).toEqual(Array.from(second.getAttribute("position").array));
    expect(Array.from(first.getAttribute("position").array).every(Number.isFinite)).toBe(true);
    expect(first.boundingSphere?.radius).toBeLessThan(4.5);
    expect(() => createParticleShellGeometry(1e8)).toThrow(RangeError);
    first.dispose();
    second.dispose();
  });
});
