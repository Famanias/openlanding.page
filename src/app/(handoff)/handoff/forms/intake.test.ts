import { describe, expect, it } from "vitest";
import { validateIntake } from "./intake";
describe("validateIntake",()=>{it("requires a name, email and lane",()=>{expect(validateIntake({name:"",email:"bad",goal:""})).toEqual({name:"Add your name.",email:"Enter a work email.",goal:"Choose a service lane."})});it("accepts a complete brief",()=>{expect(validateIntake({name:"Mina",email:"mina@example.com",goal:"sales"})).toEqual({})})});
