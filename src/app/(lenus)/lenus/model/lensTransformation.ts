export const LENS_TRANSFORMATION_SECONDS=24;
// A 50-degree side view preserves depth while keeping the recessed core readable.
export const LENS_INTERIOR_YAW=Math.PI*5/18;
export type LensTransformationPose={
  seconds:number;
  progress:number;
  phase:"assembled"|"unlock"|"deploy"|"interior"|"reassemble"|"lock";
  body:number;unlock:number;frontCarriage:number;guideExtension:number;shutter:number;
  opticalOffsets:readonly number[];panelSlide:readonly number[];panelPivot:readonly number[];
  cameraBlend:number;ambientWeight:number;
};

function ramp(t:number,start:number,end:number) {
  const u=Math.max(0,Math.min(1,(t-start)/(end-start)));
  return u*u*u*(u*(u*6-15)+10);
}

/** One mechanical path for the slider, automatic opening and reverse closing. */
export function getLensDeploymentPose(progress:number):LensTransformationPose {
  const p=Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):0,t=3+7*p;
  const lift=ramp(t,4,5);
  const body=ramp(t,6,10);
  const frontCarriage=.5*lift+.55*body;
  const opticalB=ramp(t,6.25,9.75);
  const opticalC=ramp(t,6.5,10);
  return {
    seconds:t,progress:p,phase:p===0?"assembled":p===1?"interior":"deploy",
    body,unlock:ramp(t,3,4),frontCarriage,guideExtension:frontCarriage,
    shutter:ramp(t,3.5,6.5),
    opticalOffsets:[.5*lift+.15*body,.24*opticalB,.12*opticalC,0,0,0,0],
    panelSlide:Array.from({length:4},(_,i)=>ramp(t,5+i*.06,6+i*.06)),
    panelPivot:Array.from({length:4},(_,i)=>ramp(t,6.3+i*.06,9.5+i*.06)),
    cameraBlend:body,ambientWeight:1-body,
  };
}

export function getLensTransformationPose(elapsedSeconds:number):LensTransformationPose {
  const t=Number.isFinite(elapsedSeconds)?((elapsedSeconds%24)+24)%24:0;
  const progress=t<3?0:t<10?(t-3)/7:t<15?1:t<22?(22-t)/7:0;
  return {...getLensDeploymentPose(progress),seconds:t,phase:t<3||t>=22?"assembled":t<6?"unlock":t<10?"deploy":t<15?"interior":t<20?"reassemble":"lock"};
}

/** Bounded, interruptible easing, with exact endpoint settling in either direction. */
export function advanceTransformationProgress(current:number,target:number,seconds:number){
  const a=Number.isFinite(current)?Math.max(0,Math.min(1,current)):0;
  const b=Number.isFinite(target)?Math.max(0,Math.min(1,target)):0;
  const dt=Number.isFinite(seconds)?Math.max(0,Math.min(.1,seconds)):0;
  const step=(b-a)*(1-Math.exp(-10*dt)),limit=.8*dt;
  const next=a+Math.max(-limit,Math.min(limit,step));
  return Math.abs(next-b)<.0001?b:next;
}
