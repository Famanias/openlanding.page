import {describe,expect,it} from "vitest";
import * as telemetry from "./telemetry";
import spec from "../model/lens-spec.json";
describe("combined optical part registry",()=>{
  it("describes every modeled part without adding containers as semantic parts",()=>{
    expect(telemetry.OPTICAL_PARTS.filter(p=>p.id!=="assembly").map(p=>p.id).sort()).toEqual(spec.components.map(c=>c.id).sort());
    expect(telemetry.getSemanticPartCount()).toBe(42);
    expect(telemetry.getPartTelemetry("front-meniscus").id).toBe("front-meniscus");
    expect(telemetry.isInteriorPart("front-meniscus")).toBe(true);
    expect(telemetry.isInteriorPart("outer-glass")).toBe(false);
  });
});
