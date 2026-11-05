import { getLensTransformationPose, LENS_TRANSFORMATION_SECONDS } from "../model/lensTransformation";
export const LENS_LOOP_SECONDS=LENS_TRANSFORMATION_SECONDS;

/** One continuous cycle; all secondary motion uses harmonics of the same clock. */
export function getLensLoopPose(elapsedSeconds:number){
  const seconds=Number.isFinite(elapsedSeconds)?elapsedSeconds:0;
  const phase=((seconds%LENS_LOOP_SECONDS+LENS_LOOP_SECONDS)%LENS_LOOP_SECONDS)/LENS_LOOP_SECONDS*Math.PI*2;
  const weight=getLensTransformationPose(seconds).ambientWeight;
  return {
    spin:0,
    yaw:.11*Math.sin(phase)*weight,
    pitch:.05*Math.sin(phase*2)*weight,
    collar:.16*Math.sin(phase*2)*weight,
    shardOrbit:.22*Math.sin(phase)*weight,
    shardY:.035*Math.sin(phase*3)*weight,
  };
}
