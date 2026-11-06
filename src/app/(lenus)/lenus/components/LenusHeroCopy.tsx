import { ArrowRight } from "lucide-react";
export default function LenusHeroCopy({onStepInside}:{onStepInside:()=>void}){
  return <div className="ln-hero-copy">
    <h1 aria-label="REALITY IS JUST THE START." tabIndex={-1}>
      <span className="ln-headline-line" aria-hidden="true"><span className="ln-headline-lime">REALITY</span></span>
      <span className="ln-headline-line" aria-hidden="true"><span className="ln-headline-white">IS JUST</span></span>
      <span className="ln-headline-line" aria-hidden="true"><span><span className="ln-headline-white">THE </span><span className="ln-headline-violet">START.</span></span></span>
    </h1>
    <p className="ln-subtitle">We build experiences that move brands<br className="ln-desktop-break"/> beyond the expected.</p>
    <button type="button" className="ln-button ln-step-inside" onClick={onStepInside}>STEP INSIDE <ArrowRight aria-hidden="true" size={27}/></button>
    <div className="ln-copy-footnote"><span aria-hidden="true">↗</span> A DIFFERENT WAY TO SEE WHAT’S NEXT.</div>
  </div>;
}
