export const LENS_LOOP_SECONDS=24;

/** One continuous cycle; all secondary motion uses harmonics of the same clock. */
export function getLensLoopPose(elapsedSeconds:number){
  const seconds=Number.isFinite(elapsedSeconds)?elapsedSeconds:0;
  const phase=((seconds%LENS_LOOP_SECONDS+LENS_LOOP_SECONDS)%LENS_LOOP_SECONDS)/LENS_LOOP_SECONDS*Math.PI*2;
  return {
    spin:phase,
    yaw:.11*Math.sin(phase),
    pitch:.05*Math.sin(phase*2),
    collar:.16*Math.sin(phase*2),
    shardOrbit:-2*phase,
    shardY:.035*Math.sin(phase*3),
  };
}
