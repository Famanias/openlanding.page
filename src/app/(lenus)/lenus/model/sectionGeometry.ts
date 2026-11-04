import * as THREE from "three";

export type RevolvedProfile=ReadonlyArray<readonly [radius:number,z:number]>;

/** Closed profile around +Z; partial sweeps include triangulated boundary faces. */
export function buildClosedRevolvedSection(profile:RevolvedProfile,options:{segments:number;startRadians:number;sweepRadians:number}) {
  const {segments,startRadians,sweepRadians}=options;
  if(!Number.isInteger(segments)||segments<3||segments>512||![startRadians,sweepRadians].every(Number.isFinite)||sweepRadians<=0||sweepRadians>Math.PI*2+1e-8)throw new Error("Invalid revolved section");
  let points=profile.map(([r,z])=>new THREE.Vector2(r,z));
  if(points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0))throw new Error("Invalid revolved profile");
  points=points.filter((p,i)=>i===0||p.distanceToSquared(points[i-1])>1e-20);
  if(points.length>1&&points[0].distanceToSquared(points.at(-1)!)<1e-20)points.pop();
  let changed=true;
  while(changed&&points.length>3){changed=false;for(let i=0;i<points.length;i++){
    const a=points[(i+points.length-1)%points.length],b=points[i],c=points[(i+1)%points.length];
    const ab=b.clone().sub(a),bc=c.clone().sub(b);
    if(Math.abs(ab.cross(bc))<1e-12&&ab.dot(bc)>=0){points.splice(i,1);changed=true;break;}
  }}
  const area=points.reduce((a,p,i)=>{const q=points[(i+1)%points.length];return a+p.x*q.y-q.x*p.y;},0);
  if(points.length<3||Math.abs(area)<1e-12)throw new Error("Degenerate revolved profile");
  if(area<0)points.reverse();
  const positions:number[]=[],normals:number[]=[],uvs:number[]=[],tangents:number[]=[],indices:number[]=[];
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
  const vertex=(r:number,z:number,t:number,nr:number,nz:number,u:number,v:number)=>{
    const index=positions.length/3,cos=Math.cos(t),sin=Math.sin(t);
    positions.push(r*cos,r*sin,z);normals.push(nr*cos,nr*sin,nz);uvs.push(u,v);tangents.push(-sin,cos,0,1);return index;
  };
  const triangle=(i:number,j:number,k:number)=>{
    a.fromArray(positions,i*3);b.fromArray(positions,j*3);c.fromArray(positions,k*3);
    if(b.sub(a).cross(c.sub(a)).lengthSq()>1e-24)indices.push(i,j,k);
  };
  for(let j=0;j<points.length;j++) {
    const p=points[j],q=points[(j+1)%points.length],dr=q.x-p.x,dz=q.y-p.y,length=Math.hypot(dr,dz),base=positions.length/3;
    for(let i=0;i<=segments;i++) {
      const t=startRadians+sweepRadians*i/segments;
      vertex(p.x,p.y,t,dz/length,-dr/length,i/segments,j/points.length);
      vertex(q.x,q.y,t,dz/length,-dr/length,i/segments,(j+1)/points.length);
    }
    for(let i=0;i<segments;i++){const k=base+i*2;triangle(k,k+2,k+3);triangle(k,k+3,k+1);}
  }
  if(sweepRadians<Math.PI*2-1e-8) {
    const faces=THREE.ShapeUtils.triangulateShape(points,[]);
    for(const [side,t]of [startRadians,startRadians+sweepRadians].entries()) {
      const base=positions.length/3,sign=side===0?-1:1;
      const desired=new THREE.Vector3(-Math.sin(t)*sign,Math.cos(t)*sign,0);
      for(const p of points){vertex(p.x,p.y,t,0,0,p.x,p.y);normals.splice(normals.length-3,3,desired.x,desired.y,0);tangents.splice(tangents.length-4,4,Math.cos(t),Math.sin(t),0,1);}
      for(const face of faces){
        a.fromArray(positions,(base+face[0])*3);b.fromArray(positions,(base+face[1])*3);c.fromArray(positions,(base+face[2])*3);
        const outward=b.sub(a).cross(c.sub(a)).dot(desired)>=0;
        triangle(base+face[0],base+face[outward?1:2],base+face[outward?2:1]);
      }
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute("normal",new THREE.Float32BufferAttribute(normals,3));
  geometry.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));
  geometry.setAttribute("tangent",new THREE.Float32BufferAttribute(tangents,4));
  geometry.setIndex(indices);geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
}
