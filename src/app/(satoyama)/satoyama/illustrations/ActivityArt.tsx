import { useId } from "react";
import { Bicycle, Grass, House } from "./SceneElements";
import { Cumulus, PaintedTree, Ridge } from "./Painted";

export function ActivityArt({ scene }: { scene: string }) {
  const sky = useId().replace(/:/g, "");
  return <svg viewBox="0 0 440 310" fill="none" className="st-activity-art" role="img" aria-label={{ fields: "Rice paddies below green mountains", tea: "A steaming teapot and cup beside an open window", cycle: "A bicycle on a quiet village lane", garden: "Fresh vegetables in a woven garden basket", river: "Stepping stones in a tree-lined stream" }[scene] ?? "Rural Japan illustration"}>
    <defs><linearGradient id={sky} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--st-sky-top)" /><stop offset=".55" stopColor="var(--st-sky-mid)" /><stop offset=".8" stopColor="var(--st-sky-low)" /></linearGradient></defs>
    <g className="st-paint-layer" data-depth="sky">
    <path d="M0 0h440v310H0Z" fill={`url(#${sky})`} /><circle cx="332" cy="67" r="29" fill="var(--st-sun)" opacity=".85" />
    </g>
    <g className="st-paint-layer" data-depth="far">
    <Cumulus x={86} y={118} scale={.34} /><Cumulus x={300} y={102} scale={.22} flip />
    <Ridge d="M0 151 67 80l78 63 65-47 83 51 79-48 68 28v183H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
    </g>
    <g className="st-paint-layer" data-depth="mid">
    <Ridge d="M0 188c80-80 101-15 164-20s88-70 150-38 74 18 126 9v171H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    </g>
    <g className="st-paint-layer" data-depth="near">
    {scene === "fields" && <><House x={271} y={182} scale={.36} rose /><path d="m0 218 440-22v114H0Z" fill="var(--st-water)" /><path d="m0 236 440-20M0 274l440-25m-218-41L111 310m244-108L291 310" stroke="var(--st-forest)" strokeWidth="7" />{Array.from({length:38},(_,i)=><path key={i} d={`m${(i*37)%440} ${228+Math.floor(i/12)*29} -3-8m3 8 4-10`} stroke="var(--st-midgreen)" strokeWidth="2" />)}<PaintedTree x={23} y={231} scale={.6} /></>}
    {scene === "tea" && <><path d="M0 0h440v310H0V0Zm26 0v230m249-230v225M0 225h440M280 0v225" stroke="var(--st-timber)" strokeWidth="16" /><path d="M0 234h440v76H0Z" fill="var(--st-path)" /><path d="m111 278 199-3 38 14-258 3Z" fill="var(--st-timber)" opacity=".13" /><path d="M167 248c-12-68 67-78 73-12l-10 34h-54Z" fill="var(--st-roof-rose)" /><path d="M230 226c23-27 31-14 13 5m-65-13h53m-36-9 17-3m-3-2v-8" stroke="var(--st-ink)" strokeWidth="3" /><path d="m169 233-29-12 10 28 28 8" fill="var(--st-rose)" /><path d="M274 248h35l-4 26h-26Z" fill="var(--st-paper)" stroke="var(--st-timber)" strokeWidth="2" /><path d="M309 252c19-7 20 17-2 13" stroke="var(--st-timber)" strokeWidth="3" /><path d="M289 233c-10-13 12-14 0-29m-83-25c-9-11 12-18 0-31" stroke="var(--st-paper)" strokeWidth="4" strokeLinecap="round" /><path d="M0 22c39 59 23 125 20 171M437 16c-47 63-29 119-29 179" stroke="var(--st-leaf)" strokeWidth="34" /></>}
    {scene === "cycle" && <><path d="M210 173c-47 66-71 76-91 137h155c-52-72-46-93-34-137Z" fill="var(--st-path)" /><House x={52} y={205} scale={.48} rose /><PaintedTree x={345} y={251} scale={.95} /><Bicycle x={158} y={275} scale={1.25} /><Grass x={54} y={292} /><Grass x={355} y={299} /></>}
    {scene === "garden" && <><path d="M0 205h440v105H0Z" fill="var(--st-field)" />{[220,248,283].map(y=><path key={y} d={`M0 ${y}h440`} stroke="var(--st-timber)" strokeWidth="3" opacity=".35" />)}<path d="m140 206 145-3-19 89H157Z" fill="var(--st-path)" stroke="var(--st-timber)" strokeWidth="3" /><path d="M166 207c-8-88 104-88 94 0" stroke="var(--st-timber)" strokeWidth="5" />{[220,234,249,265,279].map(y=><path key={y} d={`m151 ${y} 124-4`} stroke="var(--st-timber)" strokeWidth="2" opacity=".5" />)}<ellipse cx="183" cy="203" rx="23" ry="25" fill="var(--st-rose)" /><path d="m219 215 22-44 18 9-27 43Z" fill="var(--st-roof-rose)" /><path d="M238 180c-21-49 7-44 9-18 8-30 28-23 10 14" stroke="var(--st-forest)" strokeWidth="7" /><path d="M191 183c-28-36-3-51 8-14 10-37 34-22 10 12" fill="var(--st-forest)" /><PaintedTree x={33} y={214} scale={.62} /></>}
    {scene === "river" && <><path d="M247 163c-106 50-26 73-126 101L58 310h273c-92-74 55-75-57-147Z" fill="var(--st-water)" /><path d="m199 241 24-5m-73 40 37-9m62 22 38 4m-34-91 15 5" stroke="var(--st-paper)" strokeWidth="2" /><path d="m192 261 26-6 19 9-9 10h-38Zm50-21 19-2 12 6-10 10h-25Z" fill="var(--st-mountain)" stroke="var(--st-forest)" /><PaintedTree x={47} y={239} scale={1} /><PaintedTree x={398} y={277} scale={1.2} /><Grass x={86} y={299} scale={1.2}/></>}
    </g>
  </svg>;
}
