"use client";
import { useEffect,useRef,useState } from "react";
import { Menu,X } from "lucide-react";
export type LenusDialogSection="hero"|"work"|"expertise"|"technology"|"about"|"contact"|null;
const sections=["work","expertise","technology","about"] as const;

export default function LenusHeader({onNavigate,active=0,onMenuChange}:{onNavigate:(section:Exclude<LenusDialogSection,null>)=>void;active?:number;onMenuChange?:(open:boolean)=>void}){
  const [open,setOpen]=useState(false);
  const header=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null);
  useEffect(()=>{onMenuChange?.(open);},[open,onMenuChange]);
  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const key=(event:globalThis.KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);toggle.current?.focus();}
      if(event.key==="Tab"){
        const items=Array.from(header.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')??[]).filter(el=>el.getClientRects().length);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener("keydown",key);
    return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",key);};
  },[open]);
  const navigate=(section:Exclude<LenusDialogSection,null>)=>{setOpen(false);onNavigate(section);};
  return <header className="ln-header" ref={header}>
    <a href="#ln-hero" className="ln-wordmark" aria-label="LENUS home" onClick={event=>{event.preventDefault();navigate("hero");}}>
      <span className="ln-sr-only">LENUS</span>
      <svg viewBox="0 0 171 26" aria-hidden="true"><path d="M2 2V24H28M36 3H62M36 13H59M36 23H62M72 24V3L99 23V2M110 2V17Q110 24 119 24H125Q134 24 134 17V2M169 3H149Q143 3 143 8Q143 13 149 13H162Q168 13 168 18Q168 23 162 23H142" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinejoin="round"/></svg>
    </a>
    <nav className="ln-desktop-nav" aria-label="Main navigation">{sections.map((section,i)=><a key={section} href={`#ln-${section==="about"?"studio":section}`} aria-current={active===[2,3,4,5][i]?"location":undefined} onClick={event=>{event.preventDefault();navigate(section);}}>{section.toUpperCase()}</a>)}</nav>
    <a className="ln-button ln-contact-cta" href="#ln-contact" onClick={event=>{event.preventDefault();navigate("contact");}}>GET IN TOUCH</a>
    <button ref={toggle} type="button" className="ln-menu-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="ln-mobile-menu" onClick={()=>setOpen(value=>!value)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>
    <nav id="ln-mobile-menu" className="ln-mobile-menu" hidden={!open} aria-label="Mobile navigation">{[...sections,"contact" as const].map((section,i)=><a key={section} href={`#ln-${section==="about"?"studio":section}`} onClick={event=>{event.preventDefault();navigate(section);toggle.current?.focus();}}><span>0{i+1}</span>{section==="contact"?"GET IN TOUCH":section.toUpperCase()}</a>)}</nav>
  </header>;
}
