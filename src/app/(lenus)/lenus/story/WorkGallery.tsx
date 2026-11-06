"use client";
import {useEffect,useImperativeHandle,useRef,useState,type Ref} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight} from "lucide-react";
import {gsap} from "gsap";
import {clamp01} from "./storyMath";
export const WORK_STUDIES=[
  {id:"spatial",name:"Spatial Experiences",subtitle:"An idea you can step inside.",description:"A study in spatial storytelling: a sequence of thresholds, changing perspectives and moments of discovery."},
  {id:"identity",name:"Living Identities",subtitle:"A character, always becoming.",description:"A study in identity as a responsive system. Type, rhythm and interaction make room for a brand to move."},
  {id:"worlds",name:"Interactive Worlds",subtitle:"Possibility, made navigable.",description:"A study in exploration. A connected landscape responds to curiosity and lets the visitor choose a path."},
] as const;
export type GalleryApi={setPosition:(position:number,exhibition:number)=>void};
export default function WorkGallery({ref,motion,suspended,onOpen,onAim}:{ref:Ref<GalleryApi>;motion:boolean;suspended:boolean;onOpen:(index:number)=>void;onAim:(progress:number|null)=>void}){
  const [active,setActive]=useState(0);const root=useRef<HTMLDivElement>(null),cards=useRef<(HTMLElement|null)[]>([]);
  const value=useRef({index:0}),manual=useRef(false),pointer=useRef<{id:number;x:number;index:number}|null>(null),tween=useRef<gsap.core.Tween|null>(null),index=useRef(0);
  const apply=(position:number)=>{
    value.current.index=Math.max(0,Math.min(2,position));const next=Math.round(value.current.index);
    if(next!==index.current){index.current=next;setActive(next);}
    cards.current.forEach((card,i)=>{if(!card)return;const d=i-value.current.index;card.style.setProperty("--study-offset",String(d));card.style.setProperty("--study-distance",String(Math.abs(d)));card.style.zIndex=String(20-Math.round(Math.abs(d)*5));});
    root.current?.style.setProperty("--study-progress",String(value.current.index/2));
    onAim(manual.current?value.current.index/2:null);
  };
  useImperativeHandle(ref,()=>({setPosition(position,exhibition){if(position<1.65||position>3.05)manual.current=false;if(!manual.current&&!pointer.current){tween.current?.kill();apply(clamp01(exhibition)*2);}}}));
  useEffect(()=>{tween.current?.paused(suspended);},[suspended]);
  useEffect(()=>()=>{tween.current?.kill();},[]);
  const navigate=(next:number)=>{manual.current=true;tween.current?.kill();tween.current=gsap.to(value.current,{index:Math.max(0,Math.min(2,next)),duration:motion?.65:0,ease:"power3.inOut",onUpdate:()=>apply(value.current.index)});};
  return <div className="ln-work-gallery" ref={root} data-interactive={motion} aria-roledescription="gallery" aria-label="Conceptual work studies">
    <div className="ln-work-stages" onPointerDown={event=>{if((event.target as HTMLElement).closest("button,a"))return;pointer.current={id:event.pointerId,x:event.clientX,index:value.current.index};event.currentTarget.setPointerCapture(event.pointerId);tween.current?.kill();event.stopPropagation();}} onPointerMove={event=>{if(!pointer.current)return;manual.current=true;apply(pointer.current.index+(pointer.current.x-event.clientX)/260);}} onPointerUp={()=>{if(pointer.current){pointer.current=null;navigate(Math.round(value.current.index));}}} onPointerCancel={()=>{pointer.current=null;navigate(Math.round(value.current.index));}}>
      {WORK_STUDIES.map((study,i)=><article key={study.id} ref={el=>{cards.current[i]=el;}} className={`ln-study ln-study--${study.id}`} aria-label={`${study.name}, concept study`} inert={motion&&active!==i}>
        <div className={`ln-study-art ln-study-art--${study.id}`} aria-hidden="true">
          {i===0?<><div className="ln-spatial-floor"/>{[0,1,2,3].map(n=><i key={n} className="ln-spatial-frame" style={{"--frame":n} as React.CSSProperties}/>)}<span>SPACE<br/>TO DISCOVER.</span></>:i===1?<><strong>IN</strong><strong>FORM.</strong><i/><small>A LIVING SYSTEM / 02</small></>:<><svg viewBox="0 0 600 320">{Array.from({length:20},(_,j)=><path key={j} d={Array.from({length:31},(_,k)=>`${k===0?"M":"L"}${k*20} ${(80+j*9+Math.sin(k*.4+j*.16)*Math.sin(j*.16)*55).toFixed(3)}`).join(" ")} fill="none" stroke="currentColor" strokeWidth=".7"/>)}</svg><span>WORLDS<br/>WITHIN REACH.</span><i className="ln-world-beacon"/></>}
        </div>
        <div className="ln-study-copy"><span className="ln-story-eyebrow">CONCEPT STUDY / 0{i+1}</span><h3>{study.name}</h3><p>{study.subtitle}</p><button type="button" className="ln-text-button" onClick={()=>onOpen(i)}>EXPLORE THE STUDY <ArrowUpRight size={16} aria-hidden="true"/></button></div>
      </article>)}
    </div>
    <div className="ln-gallery-controls"><span>{String(active+1).padStart(2,"0")} / 03</span><span className="ln-gallery-line"><i/></span><button type="button" className="ln-icon-button" aria-label="Previous study" disabled={active===0} onClick={()=>navigate(active-1)}><ArrowLeft size={20}/></button><button type="button" className="ln-icon-button" aria-label="Next study" disabled={active===2} onClick={()=>navigate(active+1)}><ArrowRight size={20}/></button></div>
    <p className="ln-work-note">Conceptual explorations, not client commissions.</p>
  </div>;
}
