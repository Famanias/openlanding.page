import * as THREE from "three";
import type { OpticalElementProfile } from "./lensTypes";
import { opticalProfileMetrics, sampleOpticalProfile } from "./opticalProfile";
import { buildClosedRevolvedSection, type RevolvedProfile } from "./sectionGeometry";

export function buildOpticalElementGeometry(profile:OpticalElementProfile,segments:number) {
  const metrics=opticalProfileMetrics(profile);
  const geometry=buildClosedRevolvedSection(sampleOpticalProfile(profile),{segments,startRadians:0,sweepRadians:Math.PI*2});
  const p=geometry.getAttribute("position"),n=geometry.getAttribute("normal");
  const normal=new THREE.Vector3();
  for(let i=0;i<p.count;i++) {
    const radius=Math.hypot(p.getX(i),p.getY(i)),rawZ=p.getZ(i)+metrics.center;
    if(radius>metrics.edgeRadius+1e-6)continue;
    const front=Math.abs(rawZ-metrics.surface(radius,true))<1e-6;
    const back=Math.abs(rawZ-metrics.surface(radius,false))<1e-6;
    if(!front&&!back)continue;
    const sag=front?profile.frontSag:profile.backSag;
    const derivative=-2*sag*radius/profile.radius**2;
    const theta=Math.atan2(p.getY(i),p.getX(i));
    normal.set((front?-1:1)*derivative*Math.cos(theta),(front?-1:1)*derivative*Math.sin(theta),front?1:-1).normalize();
    n.setXYZ(i,normal.x,normal.y,normal.z);
  }
  n.needsUpdate=true;return geometry;
}

/** Stepped seats clear the actual curved glass instead of overlapping its edge. */
function opticalCellSections(radius:number,outer:number,depth:number,profile?:OpticalElementProfile) {
  const seat=radius-.012,wall=radius+.003,h=depth/2,b=.004;
  let front:number,back:number;
  if(profile){const m=opticalProfileMetrics(profile);front=m.surface(seat,true)-m.center+.002;back=m.surface(seat,false)-m.center-.002;}
  else {const z=.23*Math.sqrt(1-(seat/radius)**2);front=z+.002;back=-z-.002;}
  const lip=.006;
  const points:[number,number][]=[[wall,-h+b],[wall+b,-h],[outer-b,-h],[outer,-h+b],[outer,h-b],[outer-b,h],[wall+b,h],[wall,h-b],[wall,front+lip],[seat,front+lip],[seat,front],[wall,front],[wall,back],[seat,back],[seat,back-lip],[wall,back-lip]];
  const smooth:{r:number;z:number;nr:number;nz:number}[]=[];
  const result=points.flatMap((p,i)=>{
    if(i<8)return [p];
    const previous=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
    const before=Math.hypot(previous[0]-p[0],previous[1]-p[1]),after=Math.hypot(next[0]-p[0],next[1]-p[1]);
    const bevel=Math.min(.0015,before*.2,after*.2);
    const a=[p[0]+(previous[0]-p[0])*bevel/before,p[1]+(previous[1]-p[1])*bevel/before];
    const b=[p[0]+(next[0]-p[0])*bevel/after,p[1]+(next[1]-p[1])*bevel/after];
    return Array.from({length:4},(_,step)=>{
      const t=step/3,u=1-t;
      const r=u*u*a[0]+2*u*t*p[0]+t*t*b[0],z=u*u*a[1]+2*u*t*p[1]+t*t*b[1];
      const dr=2*u*(p[0]-a[0])+2*t*(b[0]-p[0]),dz=2*u*(p[1]-a[1])+2*t*(b[1]-p[1]),length=Math.hypot(dr,dz);
      smooth.push({r,z,nr:dz/length,nz:-dr/length});return [r,z] as [number,number];
    });
  });
  return {profile:result,smooth};
}

export function buildOpticalCellProfile(radius:number,outer:number,depth:number,profile?:OpticalElementProfile):RevolvedProfile {
  return opticalCellSections(radius,outer,depth,profile).profile;
}

export function buildOpticalCellGeometry(radius:number,outer:number,depth:number,profile:OpticalElementProfile|undefined,segments:number) {
  const section=opticalCellSections(radius,outer,depth,profile);
  const geometry=buildClosedRevolvedSection(section.profile,{segments,startRadians:0,sweepRadians:Math.PI*2});
  const p=geometry.getAttribute("position"),n=geometry.getAttribute("normal");
  for(let i=0;i<p.count;i++) {
    const r=Math.hypot(p.getX(i),p.getY(i)),z=p.getZ(i);
    const smooth=section.smooth.find(s=>Math.abs(s.r-r)<1e-6&&Math.abs(s.z-z)<1e-6);
    if(!smooth)continue;
    const theta=Math.atan2(p.getY(i),p.getX(i));n.setXYZ(i,smooth.nr*Math.cos(theta),smooth.nr*Math.sin(theta),smooth.nz);
  }
  n.needsUpdate=true;return geometry;
}
