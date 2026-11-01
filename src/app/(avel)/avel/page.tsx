import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { Models } from "./sections/Models";
import { How } from "./sections/How";
import { Community } from "./sections/Community";
import { Questions } from "./sections/Questions";
import { Closing } from "./sections/Closing";
import { Runtime } from "./motion/Runtime";

export default function Page() { return <><div className="avl-progress" aria-hidden="true"/><main><Hero/><Intro/><Models/><How/><Community/><Questions/><Closing/></main><Runtime/></>; }
