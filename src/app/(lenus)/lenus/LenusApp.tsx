"use client";
import { useEffect,useRef,useState,type MouseEvent } from "react";
import { ArrowUpRight,X } from "lucide-react";
import LenusHeader,{type LenusDialogSection} from "./components/LenusHeader";
import LenusHeroCopy from "./components/LenusHeroCopy";
import LenusOpticalLensCanvas from "./components/LenusOpticalLensCanvas";
import {ProjectBriefForm} from "./forms/ProjectBriefForm";

const content={
  work:{eyebrow:"SELECTED DIRECTIONS",title:"Beyond the screen.",description:"A few of the worlds we like to build.",items:[{name:"FIELD / 01",title:"A brand you can step inside.",text:"Spatial storytelling that turns a launch into somewhere people want to explore."},{name:"AFTERIMAGE / 02",title:"Products in a new light.",text:"Interactive product worlds, built around the details that make them different."},{name:"COMMON GROUND / 03",title:"Digital, with a human pulse.",text:"Considered interfaces that connect a clear idea with a memorable experience."}]},
  expertise:{eyebrow:"OUR PRACTICE",title:"From possibility to presence.",description:"Strategy, design and technology, brought into focus together.",items:[{name:"01 / STRATEGY",title:"Find the unexpected.",text:"Brand direction, experience strategy and the right question to start with."},{name:"02 / DESIGN",title:"Make it felt.",text:"Visual identities, digital experiences and purposeful motion that reward curiosity."},{name:"03 / DEVELOPMENT",title:"Bring it to life.",text:"Creative development, real-time worlds and thoughtful interaction across devices."}]},
  technology:{eyebrow:"THE OPTICAL ENGINE",title:"Made to move you.",description:"Technology is part of the story. Explore the lens to see it at work.",items:[{name:"REAL LIGHT",title:"Depth you can feel.",text:"Physical glass, chromatic dispersion and a procedural reflection environment give every surface its own response."},{name:"REAL INTERACTION",title:"Look a little closer.",text:"Separate 19 optical components, turn the focus collar, and inspect the architecture from another angle."},{name:"CONSIDERED MOTION",title:"At your pace.",text:"Motion pauses when you do. A complete still preview keeps the experience open to everyone."}]},
  about:{eyebrow:"HELLO, WE’RE LENUS",title:"Curious by nature.",description:"We’re an independent experience studio working where design and technology meet. We build things that make people look twice.",items:[{name:"OUR POINT OF VIEW",title:"The expected is a starting point.",text:"Good experiences begin with a clear idea, grow through experimentation, and leave room for discovery. That’s the space we work in."}]},
};

export default function LenusApp(){
  const [activeDialog,setActiveDialog]=useState<LenusDialogSection>(null);
  const [explodeFromCta,setExplodeFromCta]=useState(0);
  const dialog=useRef<HTMLDialogElement>(null),stage=useRef<HTMLDivElement>(null),opener=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const panel=dialog.current;if(!activeDialog||!panel)return;
    const overflow=document.body.style.overflow;
    panel.showModal();document.body.style.overflow="hidden";
    return()=>{
      panel.close();document.body.style.overflow=overflow;
      const target=opener.current;
      if(target?.getClientRects().length)target.focus();
      else document.querySelector<HTMLButtonElement>('.ln-menu-toggle')?.focus();
    };
  },[activeDialog]);
  const navigate=(section:Exclude<LenusDialogSection,null>)=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setActiveDialog(section);};
  const close=()=>setActiveDialog(null);
  const backdrop=(event:MouseEvent<HTMLDialogElement>)=>{
    if(event.target!==event.currentTarget)return;
    const r=event.currentTarget.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();
  };
  const stepInside=()=>{
    setExplodeFromCta(count=>count+1);
    const target=stage.current?.querySelector<HTMLElement>('[data-testid="lenus-canvas-container"]');
    target?.focus({preventScroll:true});target?.scrollIntoView({block:"center",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  const details=activeDialog&&activeDialog!=="contact"?content[activeDialog]:null;
  return <div className="ln-experience" id="top">
    <a className="ln-skip" href="#ln-main">Skip to content</a><div className="ln-space" aria-hidden="true"/>
    <LenusHeader onNavigate={navigate}/>
    <main className="ln-hero" id="ln-main"><LenusHeroCopy onStepInside={stepInside}/><div className="ln-stage-slot" ref={stage}><LenusOpticalLensCanvas suspended={activeDialog!==null} externalExplodeRequest={explodeFromCta}/></div></main>
    <footer className="ln-footer"><span>INDEPENDENT MINDS. SHARED POSSIBILITIES.</span><a href="/">EXPLORE THE GALLERY <ArrowUpRight size={11} aria-hidden="true"/></a></footer>
    <dialog ref={dialog} className="ln-dialog" aria-labelledby="ln-dialog-title" onCancel={event=>{event.preventDefault();close();}} onClick={backdrop}>
      <button type="button" className="ln-dialog-close ln-icon-button" aria-label="Close panel" onClick={close}><X size={22} aria-hidden="true"/></button>
      <div className="ln-dialog-content">
        <span className="ln-dialog-eyebrow">{activeDialog==="contact"?"LET’S MAKE SOMETHING MATTER.":details?.eyebrow}</span>
        <h2 id="ln-dialog-title">{activeDialog==="contact"?"What’s your next possibility?":details?.title}</h2>
        {activeDialog==="contact"?<ProjectBriefForm/>:details&&<><p className="ln-dialog-intro">{details.description}</p><div className="ln-dialog-studies">{details.items.map(item=><article key={item.name}><span>{item.name}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><button type="button" className="ln-text-button" onClick={close}>BACK TO THE EXPERIENCE <ArrowUpRight size={16} aria-hidden="true"/></button></>}
      </div>
    </dialog>
  </div>;
}
