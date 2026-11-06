"use client";
import {useImperativeHandle,useRef,useState,type Ref} from "react";
import {CAPABILITIES,type NarrativeRenderFrame} from "./projectedAnchors";
import {chapterWeight,smooth} from "./storyMath";
export type AnnotationsApi={update:(frame:NarrativeRenderFrame)=>void};
export default function ExpertiseAnnotations({ref,active,onFocus,onInspect}:{ref:Ref<AnnotationsApi>;active:number;onFocus:(id:string|null)=>void;onInspect:(id:string)=>void}){
  const [expanded,setExpanded]=useState<string|null>(null),labels=useRef<(HTMLDivElement|null)[]>([]),lines=useRef<(SVGLineElement|null)[]>([]),dots=useRef<(HTMLButtonElement|null)[]>([]),layer=useRef<HTMLDivElement>(null);
  useImperativeHandle(ref,()=>({update(frame){
    const expertise=chapterWeight(frame.position,3,.7),technology=chapterWeight(frame.position,4,.65);
    layer.current?.style.setProperty("--annotation-weight",String(expertise));layer.current?.style.setProperty("--hotspot-weight",String(technology));
    for(const [i,a]of CAPABILITIES.entries()){
      const p=frame.anchors.find(v=>v.id===a.id);if(!p)continue;
      const dock=smooth((frame.position-(2.4+i*.12))/.24)*(1-smooth((frame.position-(3.35+i*.08))/.3));
      const x=Math.max(20,Math.min(innerWidth-252,p.x+a.offset[0]))+(1-dock)*(a.offset[0]<0?-40:40),y=Math.max(144,Math.min(innerHeight-100,p.y+a.offset[1]))+(1-dock)*16;
      labels.current[i]?.style.setProperty("--label-x",`${x}px`);labels.current[i]?.style.setProperty("--label-y",`${y}px`);
      if(labels.current[i]){labels.current[i]!.style.opacity=String(dock);labels.current[i]!.dataset.flip=y>innerHeight*.5?"up":"down";labels.current[i]!.style.visibility=p.visible?"visible":"hidden";}
      const line=lines.current[i];if(line){line.setAttribute("x1",String(p.x));line.setAttribute("y1",String(p.y));line.setAttribute("x2",String(x+(a.offset[0]<0?232:0)));line.setAttribute("y2",String(y+18));line.style.opacity=String(dock);}
      dots.current[i]?.style.setProperty("--dot-x",`${p.x}px`);dots.current[i]?.style.setProperty("--dot-y",`${p.y}px`);
    }
  }}));
  return <div ref={layer} className="ln-annotation-layer" data-chapter-active={active}>
    <svg className="ln-annotation-lines" aria-hidden="true">{CAPABILITIES.map((a,i)=><line ref={el=>{lines.current[i]=el;}} key={a.id}/>)}</svg>
    <aside className="ln-projected-callouts" aria-label="Expertise linked to optical components" inert={active!==3}>
      {CAPABILITIES.map((a,i)=><div className="ln-projected-label" key={a.id} ref={el=>{labels.current[i]=el;}}><button type="button" aria-expanded={expanded===a.id} aria-controls={`ln-capability-${a.id}`} onMouseEnter={()=>onFocus(a.part)} onMouseLeave={()=>{if(expanded!==a.id)onFocus(null);}} onFocus={()=>onFocus(a.part)} onBlur={()=>{if(expanded!==a.id)onFocus(null);}} onClick={()=>{setExpanded(expanded===a.id?null:a.id);onFocus(expanded===a.id?null:a.part);}} onKeyDown={event=>{if(event.key==="Escape"){setExpanded(null);onFocus(null);}}}><span>0{i+1}</span>{a.name}<i aria-hidden="true">{expanded===a.id?"−":"+"}</i></button><p id={`ln-capability-${a.id}`} hidden={expanded!==a.id}>{a.description}</p></div>)}
    </aside>
    <div className="ln-engine-hotspots" inert={active!==4}>{CAPABILITIES.map((a,i)=><button key={a.id} ref={el=>{dots.current[i]=el;}} type="button" aria-label={`Inspect ${a.name.toLowerCase()} component`} onFocus={()=>onFocus(a.part)} onBlur={()=>onFocus(null)} onMouseEnter={()=>onFocus(a.part)} onMouseLeave={()=>onFocus(null)} onClick={()=>onInspect(a.part)}>0{i+1}</button>)}</div>
  </div>;
}
