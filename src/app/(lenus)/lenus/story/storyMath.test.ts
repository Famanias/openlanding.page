import {describe,expect,it} from "vitest";
import {chapterPosition,dominantChapter,interactionWeight,mixAngle} from "./storyMath";
import {sampleStoryPose} from "./chapterPoseMap";
describe("measured horizontal story",()=>{
  it("uses measured, unequal chapter widths in both directions",()=>{
    const offsets=[0,1000,2000,3400,4400,5400,6400];
    expect(chapterPosition(2700,offsets)).toBe(2.5);expect(chapterPosition(2000,offsets)).toBe(2);
    expect(dominantChapter(2700,1000,offsets,[1000,1000,1400,1000,1000,1000,1000])).toBe(2);
  });
  it("restores absolute poses and is continuous through all boundaries",()=>{
    const base={progress:0,compact:false,hero:{x:.72,y:.46,scale:.68}};
    const before=sampleStoryPose({...base,position:3.2});for(const position of [6,0,4,1,3.2])sampleStoryPose({...base,position});
    expect(sampleStoryPose({...base,position:3.2})).toEqual(before);
    for(let i=1;i<6;i++){const a=sampleStoryPose({...base,position:i-.00001}),b=sampleStoryPose({...base,position:i+.00001});expect(Math.abs(a.scale-b.scale)).toBeLessThan(.00001);expect(Math.abs(a.deployment-b.deployment)).toBeLessThan(.00001);}
    expect(sampleStoryPose({...base,position:6}).deployment).toBe(0);
  });
  it("protects a gesture and releases spatially without angular wrap jumps",()=>{
    expect(interactionWeight(5,4,1,0,true)).toBe(1);expect(interactionWeight(4.9,4,1,0)).toBe(0);
    expect(interactionWeight(4.45,4,1,0)).toBeGreaterThan(0);expect(interactionWeight(4.45,4,1,0)).toBeLessThan(1);
    expect(Math.abs(mixAngle(3.1,-3.1,.5)-Math.PI)).toBeLessThan(.01);
  });
});
