export const LENS_TRANSFORMATION_SECONDS=24;
export type LensTransformationPose={
  seconds:number;
  phase:"assembled"|"unlock"|"deploy"|"interior"|"reassemble"|"lock";
  body:number;unlock:number;frontCarriage:number;guideExtension:number;
  opticalOffsets:readonly number[];panelSlide:readonly number[];panelPivot:readonly number[];
  cameraBlend:number;ambientWeight:number;
};

function ramp(t:number,start:number,end:number) {
  const u=Math.max(0,Math.min(1,(t-start)/(end-start)));
  return u*u*u*(u*(u*6-15)+10);
}

/** Absolute, reversible pose sampling; each channel shares the existing 24-second clock. */
export function getLensTransformationPose(elapsedSeconds:number):LensTransformationPose {
  const t=Number.isFinite(elapsedSeconds)?((elapsedSeconds%24)+24)%24:0;
  const lift=ramp(t,4,5)*(1-ramp(t,20,21));
  const body=ramp(t,6,10)*(1-ramp(t,15,19));
  const frontCarriage=.5*lift+.55*body;
  const opticalB=ramp(t,6.25,9.75)*(1-ramp(t,15.25,18.75));
  const opticalC=ramp(t,6.5,10)*(1-ramp(t,15,18.5));
  return {
    seconds:t,
    phase:t<3||t>=22?"assembled":t<6?"unlock":t<10?"deploy":t<15?"interior":t<20?"reassemble":"lock",
    body,unlock:ramp(t,3,4)*(1-ramp(t,21,22)),frontCarriage,guideExtension:frontCarriage,
    opticalOffsets:[.5*lift+.15*body,.24*opticalB,.12*opticalC,0,0,0,0],
    panelSlide:Array.from({length:4},(_,i)=>ramp(t,5+i*.06,6+i*.06)*(1-ramp(t,18.5+i*.06,19.2+i*.06))),
    panelPivot:Array.from({length:4},(_,i)=>ramp(t,6.3+i*.06,9.5+i*.06)*(1-ramp(t,15+(3-i)*.06,18+(3-i)*.06))),
    cameraBlend:body,ambientWeight:1-body,
  };
}
