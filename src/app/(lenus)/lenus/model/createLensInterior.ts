import * as THREE from "three";
import type { LensRuntime } from "./createOpticalLensModel";
import { INTERIOR_IDS, OPTICAL_ORDER } from "./interiorLayout";
import type { LensComponent, OpticalLensSpec } from "./lensTypes";

export type InteriorContext = {
  root: THREE.Group;
  runtime: LensRuntime;
  stage: number;
  addMesh: (id:string, geometry:THREE.BufferGeometry, count?:number)=>THREE.Mesh;
  annulus: (inner:number,outer:number,depth:number)=>THREE.BufferGeometry;
};
const frontIds=["outer-glass","inner-glass","front-shell","collar-outer","collar-middle","collar-inner","retaining-beads","shards"];
const axis=new THREE.Vector3(0,0,1);
const one=new THREE.Vector3(1,1,1);
const clamp=(x:number)=>Number.isFinite(x)?THREE.MathUtils.clamp(x,0,1):0;

/** Builds into the existing resource owner; no renderer, environment or duplicate material system. */
export function createLensInterior(context:InteriorContext, spec:OpticalLensSpec) {
  const {root,runtime:r,addMesh,annulus}=context;
  const descriptors=new Map(spec.components.map(c=>[c.id,c]));
  const socket=(name:string,parent:THREE.Object3D,position:THREE.Vector3)=>{
    const o=new THREE.Object3D();o.name=name;o.position.copy(position);parent.add(o);r.sockets[name]=o;return o;
  };
  const matrix=new THREE.Matrix4();
  const bearings: {mesh:THREE.InstancedMesh;moving:boolean}[]=[];
  let fixedGuide:THREE.InstancedMesh,slidingGuide:THREE.InstancedMesh;
  function radialInstances(id:string,geometry:THREE.BufferGeometry,count:number,radius:number) {
    const mesh=addMesh(id,geometry,count) as THREE.InstancedMesh;
    for(let i=0;i<count;i++) {
      const t=i*Math.PI*2/count+Math.PI/4;
      matrix.makeTranslation(Math.cos(t)*radius,Math.sin(t)*radius,0);
      mesh.setMatrixAt(i,matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;return mesh;
  }
  function supports(c:LensComponent) {
    const outer=c.geometry.outerRadius!;
    const armLength=1.3-.05-outer+.02;
    const arms=addMesh(c.id,new THREE.BoxGeometry(armLength,.045,.06),4) as THREE.InstancedMesh;
    const bearingMesh=radialInstances(c.id,annulus(c.id==="front-meniscus-cell"?.026:.043,.065,.08),4,1.3);
    bearings.push({mesh:bearingMesh,moving:c.id==="front-meniscus-cell"});
    for(let i=0;i<4;i++) {
      const t=i*Math.PI/2+Math.PI/4;
      matrix.compose(new THREE.Vector3(Math.cos(t)*(outer-.02+armLength/2),Math.sin(t)*(outer-.02+armLength/2),0),new THREE.Quaternion().setFromAxisAngle(axis,t),one);
      arms.setMatrixAt(i,matrix);
      socket(`${c.id}-rail-${i}`,r.nodes[c.id],new THREE.Vector3(Math.cos(t)*1.3,Math.sin(t)*1.3,0));
    }
    arms.instanceMatrix.needsUpdate=true;
    return bearingMesh;
  }
  for(const id of INTERIOR_IDS) {
    const c=descriptors.get(id)!;const g=c.geometry;
    switch(g.kind) {
      case "optical-element": {
        const thickness=g.edgeThickness!+g.frontSag!-g.backSag!;
        addMesh(id,new THREE.SphereGeometry(g.radius!,24,12).scale(1,1,thickness/(2*g.radius!)));break;
      }
      case "cell": addMesh(id,annulus(g.innerRadius!,g.outerRadius!,g.depth!));if(context.stage>=1)supports(c);break;
      case "open-frame": {
        for(const z of [-.67,.90])addMesh(id,annulus(g.innerRadius!,g.outerRadius!, .06)).position.z=z;
        if(context.stage>=1)for(const z of [-.67,.90]) {
          const arms=addMesh(id,new THREE.BoxGeometry(.22,.05,.06),4) as THREE.InstancedMesh;
          for(let i=0;i<4;i++) {
            const t=i*Math.PI/2+Math.PI/4;
            matrix.compose(new THREE.Vector3(Math.cos(t)*1.39,Math.sin(t)*1.39,z),new THREE.Quaternion().setFromAxisAngle(axis,t),one);arms.setMatrixAt(i,matrix);
          }
          arms.instanceMatrix.needsUpdate=true;
        }
        break;
      }
      case "spacers":
        for(const [i,radius]of g.radii!.entries())addMesh(id,annulus(radius-.025,radius+.025,g.depth!)).position.z=[-.10,-.32,-.50,-1.03,-1.40][i];
        break;
      case "baffles":addMesh(id,annulus(g.innerRadius!,g.outerRadius!,g.depth!));break;
      case "beads":for(const radius of g.radii!)addMesh(id,new THREE.TorusGeometry(radius,g.tube!,6,48));break;
      case "bolts":radialInstances(id,new THREE.TorusGeometry(g.size!*.72,g.size!*.20,8,16),g.count!,g.radius!);break;
      case "panel": {
        const start=g.startRadians!,end=start+g.sweepRadians!;
        const shape=new THREE.Shape();shape.absarc(0,0,g.outerRadius!,start,end,false);
        shape.lineTo(Math.cos(end)*g.innerRadius!,Math.sin(end)*g.innerRadius!);
        shape.absarc(0,0,g.innerRadius!,end,start,true);shape.closePath();
        addMesh(id,new THREE.ExtrudeGeometry(shape,{depth:g.depth!,bevelEnabled:false,curveSegments:4,steps:1}).translate(0,0,-g.depth!/2));break;
      }
      case "rails":
        fixedGuide=radialInstances(id,annulus(.027,.042,1.81),4,g.radius!);fixedGuide.position.z=-.065;
        slidingGuide=radialInstances(id,new THREE.CylinderGeometry(.025,.025,2.05,8).rotateX(Math.PI/2),4,g.radius!);slidingGuide.name="sliding-guide-rods";
        break;
      case "linkages":break;
      default:throw new Error(`Unsupported interior geometry: ${g.kind}`);
    }
  }

  const carriage=new THREE.Group();carriage.name="front-carriage";root.add(carriage);
  for(const id of frontIds)carriage.add(r.nodes[id]);
  const collarUnlock=new THREE.Group();collarUnlock.name="collar-unlock";carriage.add(collarUnlock);collarUnlock.add(r.nodes["collar-outer"]);
  r.nodes["core-carrier"].add(r.nodes["carrier-fasteners"]);r.nodes["carrier-fasteners"].position.set(0,0,0);
  const rests=new Map(Object.entries(r.nodes).map(([id,o])=>[id,{position:o.position.clone(),rotation:o.rotation.clone()}]));
  const hinges:THREE.Group[]=[];
  for(let i=0;i<4;i++) {
    const c=descriptors.get(`housing-panel-${i}`)!;
    const t=c.geometry.startRadians!+c.geometry.sweepRadians!/2;
    const hinge=new THREE.Group();hinge.name=`housing-panel-${i}-hinge`;
    hinge.position.set(Math.cos(t)*1.5,Math.sin(t)*1.5,-c.geometry.depth!/2);
    const panel=r.nodes[c.id];
    for(const mesh of [...panel.children].filter(o=>(o as THREE.Mesh).isMesh)) {
      mesh.position.sub(hinge.position);hinge.add(mesh);
    }
    panel.add(hinge);hinges.push(hinge);
  }
  const armLength=descriptors.get("panel-linkages")!.geometry.linkLength!;
  const linkMesh=addMesh("panel-linkages",new THREE.CylinderGeometry(.025,.025,armLength,8).rotateX(Math.PI/2),16) as THREE.InstancedMesh;
  const crowns=addMesh("panel-linkages",new THREE.SphereGeometry(.043,8,6),24) as THREE.InstancedMesh;
  const linkageSockets:{a:THREE.Object3D;b:THREE.Object3D;knee:THREE.Object3D;t:number;side:number}[]=[];
  for(let i=0;i<4;i++)for(let side=0;side<2;side++) {
    const t=i*Math.PI/2+Math.PI/4,s=(side===0?-1:1)*.2;
    const a=socket(`housing-panel-${i}-link-root-${side}`,r.nodes["rear-frame"],new THREE.Vector3(Math.cos(t)*1.65-Math.sin(t)*s,Math.sin(t)*1.65+Math.cos(t)*s,-.11));
    const b=socket(`housing-panel-${i}-link-panel-${side}`,hinges[i],new THREE.Vector3(-Math.sin(t)*s,Math.cos(t)*s,0));
    const knee=socket(`housing-panel-${i}-link-knee-${side}`,r.nodes["panel-linkages"],new THREE.Vector3());
    linkageSockets.push({a,b,knee,t,side:s});
  }
  const spacerMeshes=r.nodes["spacer-stack"].children.filter(o=>(o as THREE.Mesh).isMesh);
  const spacerRest=spacerMeshes.map(m=>m.position.clone());
  let deployment=0,separation=0,focus=0;
  const vector=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  const putArm=(index:number,a:THREE.Vector3,b:THREE.Vector3)=>{
    const midpoint=a.clone().add(b).multiplyScalar(.5).sub(r.nodes["panel-linkages"].position);
    quaternion.setFromUnitVectors(axis,b.clone().sub(a).normalize());
    matrix.compose(midpoint,quaternion,one);linkMesh.setMatrixAt(index,matrix);
  };
  function apply() {
    for(const [id,rest]of rests){r.nodes[id].position.copy(rest.position);r.nodes[id].rotation.copy(rest.rotation);}
    carriage.position.z=deployment*1.05+separation*.64;
    // The rear train remains seated in its accepted mount during automatic opening.
    const offsets=[.65,.24,.12,0,0,0,0];
    for(const [i,id]of OPTICAL_ORDER.entries()) {
      const target=id==="front-lens"?"core-carrier":r.nodes[id].parent===root?id:`${id}-cell`;
      r.nodes[target].position.z+=deployment*offsets[i]+separation*(3-i)*.16;
    }
    r.nodes["rear-seat"].position.z+=deployment*offsets[6]-separation*.48;
    for(let i=0;i<spacerMeshes.length;i++)spacerMeshes[i].position.copy(spacerRest[i]).add(vector.set(0,0,deployment*offsets[[0,1,2,4,5][i]]+separation*(3-[0,1,2,4,5][i])*.16));
    for(let i=0;i<4;i++) {
      const t=i*Math.PI/2+Math.PI/4;
      r.nodes[`housing-panel-${i}`].position.x+=Math.cos(t)*.24*deployment;
      r.nodes[`housing-panel-${i}`].position.y+=Math.sin(t)*.24*deployment;
      hinges[i].quaternion.setFromAxisAngle(vector.set(-Math.sin(t),Math.cos(t),0),.58*deployment);
    }
    for(const id of ["collar-outer","collar-middle","shards"])r.nodes[id].rotation.z=focus;
    const rods=r.nodes["guide-rails"].getObjectByName("sliding-guide-rods");
    if(rods)rods.position.z=-.025+deployment*1.05+separation*.64;
    for(const [i,link]of linkageSockets.entries()) {
      const panelIndex=Math.floor(i/2),radial=1.5+.24*deployment;
      const az=r.nodes["rear-frame"].position.z-.11,bz=r.nodes[`housing-panel-${panelIndex}`].position.z-.95;
      const dx=radial-1.65,dz=bz-az,distance=Math.hypot(dx,dz);
      const height=Math.sqrt(Math.max(0,armLength**2-distance**2/4));
      const kr=(radial+1.65)/2-dz/distance*height,kz=(az+bz)/2+dx/distance*height;
      const point=(radius:number,z:number)=>new THREE.Vector3(Math.cos(link.t)*radius-Math.sin(link.t)*link.side,Math.sin(link.t)*radius+Math.cos(link.t)*link.side,z);
      const a=point(1.65,az),b=point(radial,bz),k=point(kr,kz);
      link.knee.position.copy(k).sub(r.nodes["panel-linkages"].position);
      putArm(i*2,a,k);putArm(i*2+1,k,b);
      for(const [j,p]of [a,k,b].entries()){
        const local=p.clone().sub(r.nodes["panel-linkages"].position);
        matrix.makeTranslation(local.x,local.y,local.z);crowns.setMatrixAt(i*3+j,matrix);
      }
    }
    linkMesh.instanceMatrix.needsUpdate=true;crowns.instanceMatrix.needsUpdate=true;
    root.updateMatrixWorld(true);
  }
  function measureAttachments() {
    root.updateMatrixWorld(true);let linkGap=0,railOffset=0,railSurfaceGap=0,railAxialOverlap=Infinity;
    for(const [i,link]of linkageSockets.entries())for(const [j,pair]of [[link.a,link.knee],[link.knee,link.b]].entries()) {
      linkMesh.getMatrixAt(i*2+j,matrix);
      for(let end=0;end<2;end++) {
        const endpoint=new THREE.Vector3(0,0,(end===0?-.5:.5)*armLength).applyMatrix4(matrix);
        linkMesh.localToWorld(endpoint);
        linkGap=Math.max(linkGap,endpoint.distanceTo(pair[end].getWorldPosition(new THREE.Vector3())));
      }
    }
    for(const [id,o]of Object.entries(r.sockets))if(/-rail-\d$/.test(id)) {
      const p=root.worldToLocal(o.getWorldPosition(new THREE.Vector3()));
      railOffset=Math.max(railOffset,Math.abs(Math.hypot(p.x,p.y)-1.3));
    }
    const radii=(geometry:THREE.BufferGeometry)=>{
      const p=geometry.getAttribute("position");let min=Infinity,max=0;
      for(let i=0;i<p.count;i++){const radius=Math.hypot(p.getX(i),p.getY(i));min=Math.min(min,radius);max=Math.max(max,radius);}
      return {min,max};
    };
    for(const bearing of bearings) {
      const guide=bearing.moving?slidingGuide:fixedGuide;
      const gap=radii(bearing.mesh.geometry).min-radii(guide.geometry).max;
      railSurfaceGap=Math.max(railSurfaceGap,Math.abs(gap));
      guide.geometry.computeBoundingBox();bearing.mesh.geometry.computeBoundingBox();
      const guideZ=root.worldToLocal(guide.getWorldPosition(new THREE.Vector3())).z;
      const bearingZ=root.worldToLocal(bearing.mesh.getWorldPosition(new THREE.Vector3())).z;
      const gb=guide.geometry.boundingBox!,bb=bearing.mesh.geometry.boundingBox!;
      railAxialOverlap=Math.min(railAxialOverlap,Math.min(guideZ+gb.max.z,bearingZ+bb.max.z)-Math.max(guideZ+gb.min.z,bearingZ+bb.min.z));
    }
    return {linkGap,railOffset,railSurfaceGap,railAxialOverlap,linkCount:16,railSocketCount:Object.keys(r.sockets).filter(id=>/-rail-\d$/.test(id)).length};
  }
  apply();
  const rig={carriage,collarUnlock,hinges,setDeployment(amount:number){deployment=clamp(amount);apply();},setSeparation(amount:number){separation=clamp(amount);apply();},setFocus(radians:number){focus=Number.isFinite(radians)?THREE.MathUtils.clamp(radians,-Math.PI/2,Math.PI/2):0;apply();},measureAttachments};
  root.userData.interiorRig=rig;
  return rig;
}
