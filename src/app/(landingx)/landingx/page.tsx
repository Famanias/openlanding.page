import { Hero } from "./sections/Hero";
import { Gallery } from "./showcase/Gallery";
import { Approach } from "./sections/Approach";
import { Process } from "./sections/Process";
import { Start } from "./sections/Start";
import { Runtime } from "./motion/Runtime";
export default function Page() { return <><div className="lx-progress" aria-hidden="true"/><main><Hero/><Gallery/><Approach/><Process/><Start/></main><Runtime/></>; }
