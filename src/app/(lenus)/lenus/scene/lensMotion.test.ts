import {describe,expect,it} from "vitest";
import {Euler,Quaternion} from "three";
import {getLensLoopPose,LENS_LOOP_SECONDS} from "./lensMotion";

describe("optical lens motion loop",()=>{
  it("returns to the exact opening pose after its 24-second cycle",()=>{
    expect(LENS_LOOP_SECONDS).toBe(24);
    const start=getLensLoopPose(0),end=getLensLoopPose(24);
    for(const key of Object.keys(start) as (keyof typeof start)[])expect(end[key]).toBeCloseTo(start[key],12);
    expect(getLensLoopPose(7.5)).toEqual(getLensLoopPose(31.5));
  });
  it("keeps the interior reveal still while retaining bounded secondary motion",()=>{
    const quarter=getLensLoopPose(6),eighth=getLensLoopPose(3);
    expect(quarter.spin).toBeCloseTo(0,12);
    expect(quarter.yaw).toBeCloseTo(.11,12);
    expect(Math.abs(quarter.shardOrbit)).toBeLessThanOrEqual(.22);
    expect(eighth.collar).toBeCloseTo(.16,12);
    for(const value of Object.values(getLensLoopPose(12)))expect(Math.abs(value)).toBeLessThan(1e-10);
  });
  it("crosses the repeat boundary without a visible orientation jump",()=>{
    const a=getLensLoopPose(24-.001),b=getLensLoopPose(.001);
    const qa=new Quaternion().setFromEuler(new Euler(a.pitch,a.yaw,a.spin));
    const qb=new Quaternion().setFromEuler(new Euler(b.pitch,b.yaw,b.spin));
    expect(qa.angleTo(qb)).toBeLessThan(.001);
    expect(Math.abs(a.collar-b.collar)).toBeLessThan(.001);
    expect(Math.abs(a.shardY-b.shardY)).toBeLessThan(.001);
  });
  it("keeps tilt and float within the hero's framing allowance",()=>{
    for(let i=0;i<=240;i++){
      const pose=getLensLoopPose(i/10);
      expect(Math.abs(pose.yaw)).toBeLessThanOrEqual(.11);
      expect(Math.abs(pose.pitch)).toBeLessThanOrEqual(.05);
      expect(Math.abs(pose.collar)).toBeLessThanOrEqual(.16);
      expect(Math.abs(pose.shardY)).toBeLessThanOrEqual(.035);
    }
  });
  it("treats invalid clock values as the opening pose",()=>{
    expect(getLensLoopPose(NaN)).toEqual(getLensLoopPose(0));
    expect(getLensLoopPose(Infinity)).toEqual(getLensLoopPose(0));
  });
});
