import {clamp01,mix,mixAngle,smooth} from "./storyMath";
export type HeroFrame={x:number;y:number;scale:number;heightRatio?:number};
export type StoryInput={position:number;progress:number;compact:boolean;hero:HeroFrame;workProgress?:number};
export type EngineStoryPose={
  deployment:number;separation:number;focus:number;scale:number;x:number;y:number;
  yaw:number;polar:number;distance:number;rotation:[number,number,number];
  violet:number;lime:number;key:number;exposure:number;sweep:number;collarIdle:number;shardOrbit:number;shardY:number;
};
const targets=[
  [.18,.05,1,.72,.46,-.46,.14,12,1,1,1,1,0,0,0],
  [1,.34,1.12,.66,.54,.95,.22,10.8,1.7,1.05,.95,1,-.06,.12,-.04],
  [.88,.22,.78,.80,.56,.65,.10,13.2,.85,.85,.9,.96,.06,.18,-.06],
  [1,.78,1.10,.66,.54,1.05,.2,12,1.25,1.15,1.1,1.02,.03,-.08,.04],
  [1,.55,1.08,.64,.49,Math.PI*5/18,.14,12,1,1,1.05,1,0,0,0],
  [.3,.12,.66,.78,.31,-.6,.08,14,.6,.5,.75,.94,.09,-.22,.02],
  [0,0,1.02,.72,.48,-.46,.14,12,1,1.2,1,1.02,0,0,0],
];
function target(index:number,input:StoryInput):EngineStoryPose{
  const a=targets[index],compactScales=[1,.98,.78,.88,.88,.74,.96],compactX=[.5,.5,.56,.5,.5,.56,.5];
  return {deployment:a[0],separation:a[1],focus:0,scale:input.hero.scale*(input.compact?compactScales[index]:a[2]),x:input.compact?compactX[index]:index===0?input.hero.x:a[3],y:input.compact?.28:index===0?input.hero.y:a[4],yaw:a[5],polar:Math.PI/2-a[6],distance:a[7],violet:a[8],lime:a[9],key:a[10],exposure:a[11],sweep:index===5?-.2:index===3?.25:0,rotation:[a[12],a[13],a[14]],collarIdle:0,shardOrbit:0,shardY:0};
}
export function blendStoryPose(a:EngineStoryPose,b:EngineStoryPose,t:number):EngineStoryPose{
  const p=clamp01(t),out={...a};
  for(const key of ["deployment","separation","focus","scale","x","y","polar","distance","violet","lime","key","exposure","sweep","collarIdle","shardOrbit","shardY"] as const)out[key]=mix(a[key],b[key],p);
  out.yaw=mixAngle(a.yaw,b.yaw,p);out.rotation=a.rotation.map((v,i)=>mixAngle(v,b.rotation[i],p)) as [number,number,number];return out;
}
export function sampleStoryPose(input:StoryInput):EngineStoryPose{
  const position=Math.max(0,Math.min(6,Number.isFinite(input.position)?input.position:0)),i=Math.min(5,Math.floor(position));
  const pose=blendStoryPose(target(i,input),target(i+1,input),smooth(position-i));
  // A bounded spatial glint, not a timer: reverse scrolling reverses it exactly.
  if(position>5)pose.lime+=.45*Math.sin(Math.PI*smooth(position-5))**2;
  pose.yaw+=((input.workProgress??0)-.5)*.18*(1-smooth(Math.abs(position-2)/.75));
  return pose;
}
