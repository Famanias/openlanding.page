import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { buildClosedRevolvedSection } from "./sectionGeometry";
import { buildOpticalCellGeometry, buildOpticalElementGeometry } from "./opticalLensGeometry";

function assertClosed(g:THREE.BufferGeometry) {
  const p=g.getAttribute("position"),n=g.getAttribute("normal"),t=g.getAttribute("tangent");
  const welded=new Map<string,number>(),ids:number[]=[],edges=new Map<string,number>();
  for(let i=0;i<p.count;i++) {
    const key=[p.getX(i),p.getY(i),p.getZ(i)].map(v=>Math.round(v*1e6)).join(",");
    if(!welded.has(key))welded.set(key,welded.size);ids.push(welded.get(key)!);
    expect(Math.hypot(n.getX(i),n.getY(i),n.getZ(i))).toBeCloseTo(1,5);
    expect(Math.abs(n.getX(i)*t.getX(i)+n.getY(i)*t.getY(i)+n.getZ(i)*t.getZ(i))).toBeLessThan(1e-5);
  }
  const index=g.index!;
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),normal=new THREE.Vector3();
  for(let i=0;i<index.count;i+=3) {
    const tri=[index.getX(i),index.getX(i+1),index.getX(i+2)];
    a.fromBufferAttribute(p,tri[0]);b.fromBufferAttribute(p,tri[1]);c.fromBufferAttribute(p,tri[2]);
    normal.fromBufferAttribute(n,tri[0]);
    const cross=b.sub(a).cross(c.sub(a));
    expect(cross.lengthSq()).toBeGreaterThan(1e-24);
    expect(cross.dot(normal)).toBeGreaterThan(0);
    for(let j=0;j<3;j++) {
      const u=ids[tri[j]],v=ids[tri[(j+1)%3]],key=u<v?`${u}:${v}`:`${v}:${u}`;
      edges.set(key,(edges.get(key)??0)+1);
    }
  }
  expect([...edges.values()].every(count=>count===2)).toBe(true);
}

describe("closed revolved surfaces",()=>{
  it("closes the stepped and rounded retaining shoulders with outward normals",()=>{
    const g=buildOpticalCellGeometry(1.05,1.12,.12,{shape:"meniscus",radius:1.05,edgeThickness:.035,frontSag:.06,backSag:.025},48);
    try {assertClosed(g);} finally {g.dispose();}
  });
  it.each([Math.PI/2,Math.PI*2])("caps shell sweep %s with outward normals and welded boundaries",sweep=>{
    const g=buildClosedRevolvedSection([[1,-.1],[1.1,-.1],[1.1,.1],[1,.1]],{segments:32,startRadians:.17,sweepRadians:sweep});
    try {assertClosed(g);} finally {g.dispose();}
  });
  it("welds optical poles and the curved perimeter into a closed positive volume",()=>{
    const g=buildOpticalElementGeometry({shape:"meniscus",radius:1,edgeThickness:.04,frontSag:.1,backSag:.05},48);
    try {assertClosed(g);} finally {g.dispose();}
  });
  it("rejects nonfinite coordinates and invalid sweep limits",()=>{
    expect(()=>buildClosedRevolvedSection([[1,0],[NaN,1],[2,0]],{segments:32,startRadians:0,sweepRadians:1})).toThrow();
    expect(()=>buildClosedRevolvedSection([[1,0],[1,1],[2,0]],{segments:32,startRadians:0,sweepRadians:0})).toThrow();
  });
});
