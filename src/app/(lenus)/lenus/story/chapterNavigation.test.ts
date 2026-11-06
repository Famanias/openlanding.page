import {describe,expect,it} from "vitest";
import {adjacentChapter,ChapterWheelGesture} from "./chapterNavigation";
describe("chapter presentation navigation",()=>{
  it("consumes a whole momentum tail, then accepts a separate gesture",()=>{
    const gesture=new ChapterWheelGesture();
    expect(gesture.push(70,0)).toBe(1);
    for(let time=16;time<=1800;time+=16)expect(gesture.push(4,time)).toBe(0);
    expect(gesture.push(60,2100)).toBe(1);
    expect(gesture.push(-70,2500)).toBe(-1);
  });
  it("filters tiny jitter, resets on direction changes and supports teardown",()=>{
    const gesture=new ChapterWheelGesture();
    expect(gesture.push(10,0)).toBe(0);expect(gesture.push(-10,20)).toBe(0);
    expect(gesture.push(-14,40)).toBe(-1);
    gesture.reset();expect(gesture.active(41)).toBe(false);expect(gesture.push(24,41)).toBe(1);
    expect(gesture.push(NaN,1000)).toBe(0);
  });
  it("uses chapter destinations despite unequal widths and reverses partial slides",()=>{
    expect(adjacentChapter(2,1)).toBe(3);expect(adjacentChapter(2.4,-1)).toBe(2);
    expect(adjacentChapter(2.4,1)).toBe(3);expect(adjacentChapter(3,-1)).toBe(2);
    expect(adjacentChapter(6,1)).toBe(7);expect(adjacentChapter(0,-1)).toBe(0);
    expect(adjacentChapter(3.000001,-1)).toBe(2);
  });
});
