import type { OpticalElementProfile } from "./lensTypes";

export function opticalProfileMetrics(p:OpticalElementProfile) {
  const {radius,edgeThickness,frontSag,backSag}=p;
  const validShape=p.shape==="meniscus"?frontSag*backSag>0:p.shape==="biconvex"?frontSag>0&&backSag<0:p.shape==="plano-convex"&&((frontSag>0&&backSag===0)||(frontSag===0&&backSag<0));
  if(![radius,edgeThickness,frontSag,backSag,p.chamfer??.004].every(Number.isFinite)||radius<=0||edgeThickness<=0||edgeThickness+frontSag-backSag<=0||!validShape||(p.chamfer??.004)<0)throw new Error("Invalid optical profile");
  const chamfer=Math.min(p.chamfer??.004,edgeThickness*.2,radius*.02);
  const surface=(r:number,front:boolean)=>(front?edgeThickness/2:-edgeThickness/2)+(front?frontSag:backSag)*(1-(r/radius)**2);
  const edgeRadius=radius-chamfer;
  const ends=[surface(0,true),surface(edgeRadius,true),surface(0,false),surface(edgeRadius,false),edgeThickness/2-chamfer,-edgeThickness/2+chamfer];
  const min=Math.min(...ends),max=Math.max(...ends),center=(min+max)/2;
  return {chamfer,edgeRadius,min,max,center,depth:max-min,surface};
}

export function sampleOpticalProfile(p:OpticalElementProfile,radialSteps=12):readonly (readonly [number,number])[] {
  const m=opticalProfileMetrics(p),points:[number,number][]=[];
  for(let i=0;i<=radialSteps;i++){const r=m.edgeRadius*i/radialSteps;points.push([r,m.surface(r,true)-m.center]);}
  points.push([p.radius,p.edgeThickness/2-m.chamfer-m.center],[p.radius,-p.edgeThickness/2+m.chamfer-m.center]);
  for(let i=radialSteps;i>=0;i--){const r=m.edgeRadius*i/radialSteps;points.push([r,m.surface(r,false)-m.center]);}
  return points;
}
