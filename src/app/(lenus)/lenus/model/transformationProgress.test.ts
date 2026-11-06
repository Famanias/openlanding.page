import {describe,expect,it} from "vitest";
import {advanceTransformationProgress,getLensDeploymentPose,getLensTransformationPose} from "./lensTransformation";

describe("reversible transformation progress",()=>{
  it("uses exactly the same mechanical path when closing",()=>{
    for(const progress of [0,.1,.25,.5,.75,.9,1]){
      const forward=getLensTransformationPose(3+progress*7),reverse=getLensTransformationPose(22-progress*7);
      for(const key of ["body","unlock","frontCarriage","shutter","guideExtension","opticalOffsets","panelSlide","panelPivot","cameraBlend"] as const){
        const a=forward[key],b=reverse[key];if(Array.isArray(a)&&Array.isArray(b))a.forEach((v,i)=>expect(b[i]).toBeCloseTo(v,12));else expect(b).toBeCloseTo(a as number,12);
      }
    }
  });
  it("maps the range endpoints to fully closed and fully transformed",()=>{
    expect(getLensDeploymentPose(0).shutter).toBe(0);expect(getLensDeploymentPose(0).frontCarriage).toBe(0);
    expect(getLensDeploymentPose(1).shutter).toBe(1);expect(getLensDeploymentPose(1).panelPivot).toEqual([1,1,1,1]);
  });
  it("smoothly reaches either endpoint without jumps or overshoot",()=>{
    let current=1;const first=advanceTransformationProgress(current,0,1/60);expect(first).toBeLessThan(1);expect(first).toBeGreaterThan(.8);
    for(let i=0;i<120;i++){const next=advanceTransformationProgress(current,0,1/60);expect(next).toBeLessThanOrEqual(current);expect(next).toBeGreaterThanOrEqual(0);expect(Math.abs(next-current)).toBeLessThanOrEqual(.8/60+.0001);current=next;}
    expect(current).toBe(0);
    for(let i=0;i<120;i++)current=advanceTransformationProgress(current,1,1/60);
    expect(current).toBe(1);expect(advanceTransformationProgress(.4,1,0)).toBe(.4);
  });
});
