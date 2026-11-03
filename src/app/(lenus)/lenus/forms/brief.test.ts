import { describe,expect,it } from "vitest";
import {validateBrief} from "./brief";
describe("project brief validation",()=>{
  it("rejects an empty identity, invalid email and an underspecified brief",()=>{
    expect(validateBrief({name:" ",email:"wrong",brief:"short"})).toEqual({name:"Tell us your name.",email:"Enter a valid email address.",brief:"Add at least 20 characters about your project."});
  });
  it("accepts a concrete local project brief",()=>{
    expect(validateBrief({name:"Morgan",email:"morgan@example.com",brief:"Build an immersive product experience for our launch."})).toEqual({});
  });
});
