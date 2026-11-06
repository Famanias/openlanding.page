"use client";
import {useCallback,useEffect,useRef,useState,type MouseEvent} from "react";
import Link from "next/link";
import {ArrowRight,ArrowUpRight,X} from "lucide-react";
import LenusHeader,{type LenusDialogSection} from "./components/LenusHeader";
import LenusHeroCopy from "./components/LenusHeroCopy";
import LenusOpticalLensCanvas from "./components/LenusOpticalLensCanvas";
import {ProjectBriefForm} from "./forms/ProjectBriefForm";
import {useHorizontalStory,type StorySample} from "./story/useHorizontalStory";
import {CHAPTERS,chapterWeight,smooth,type ChapterId} from "./story/storyMath";
import {sampleStoryPose,type EngineStoryPose} from "./story/chapterPoseMap";
import type {EngineExperienceApi,StoryNavigation} from "./story/experienceTypes";
import WorkGallery,{WORK_STUDIES,type GalleryApi} from "./story/WorkGallery";
import ExpertiseAnnotations,{type AnnotationsApi} from "./story/ExpertiseAnnotations";
import {CAPABILITIES,type NarrativeRenderFrame} from "./story/projectedAnchors";

export default function LenusApp(){
  const shell=useRef<HTMLElement>(null),pin=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null),hero=useRef<HTMLDivElement>(null);
  const engine=useRef<EngineExperienceApi|null>(null),navigation=useRef<StoryNavigation|null>(null),gallery=useRef<GalleryApi|null>(null),annotations=useRef<AnnotationsApi|null>(null);
  const activeIndex=useRef(0),mode=useRef({horizontal:false,reduced:false}),sample=useRef<StorySample|null>(null);
  const [active,setActive]=useState(0),[horizontal,setHorizontal]=useState(false),[reduced,setReduced]=useState(false),[enhanced,setEnhanced]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false),[dialogContent,setDialogContent]=useState<"contact"|number|null>(null);
  const [controlsMount,setControlsMount]=useState<HTMLDivElement|null>(null);const hasRendered=useRef(false);
  const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null);
  const applyVisual=useCallback((position:number,pose:EngineStoryPose,manual=false)=>{
    const root=pin.current;if(!root)return;
    root.style.setProperty("--ln-engine-x",`${pose.x*100}%`);root.style.setProperty("--ln-engine-y",`${pose.y*100}%`);
    root.style.setProperty("--ln-engine-scale",String(pose.scale));
    root.style.setProperty("--ln-violet-strength",`${Math.min(28,pose.violet*14)}%`);
    const atmosphere=document.querySelector<HTMLElement>(".ln-space");
    atmosphere?.style.setProperty("--ln-glow-x",`${pose.x*100+7}%`);atmosphere?.style.setProperty("--ln-glow-y",`${pose.y*100+27}%`);
    atmosphere?.style.setProperty("--ln-violet-strength",`${Math.min(28,pose.violet*14)}%`);
    atmosphere?.style.setProperty("--ln-orbit-turn",`${position*9}deg`);
    const weight=Math.max(chapterWeight(position,0,.72),chapterWeight(position,4,.7),manual?1:0);
    root.style.setProperty("--ln-hud-weight",String(weight));
    const drawer=root.querySelector<HTMLElement>(".ln-controls-drawer");if(drawer)drawer.inert=weight<.25&&drawer.dataset.open!=="true";
  },[]);
  const onFrame=useCallback((frame:NarrativeRenderFrame)=>{
    hasRendered.current=true;applyVisual(frame.position,frame.pose,frame.manual);annotations.current?.update(frame);
    const stage=pin.current?.querySelector<HTMLElement>(".ln-stage");
    if(stage){stage.dataset.storyPosition=String(frame.position);stage.dataset.modelDeployment=String(frame.pose.deployment);}
  },[applyVisual]);
  const onSample=useCallback((value:StorySample)=>{
    sample.current=value;gallery.current?.setPosition(value.position,value.workProgress??0);
    if(value.active!==activeIndex.current){if(activeIndex.current===3||activeIndex.current===4)engine.current?.focusPart(null);activeIndex.current=value.active;setActive(value.active);}
    pin.current?.style.setProperty("--ln-story-progress",String(value.progress));
    const pose=sampleStoryPose(value);
    if(mode.current.reduced){pose.x=value.compact?.5:.76;pose.y=.28;pose.scale=value.hero.scale*.7;}
    if(!hasRendered.current||mode.current.reduced)applyVisual(value.position,pose);
    const content=track.current;if(!content)return;
    const work=content.querySelector<HTMLElement>(".ln-work-content");if(work)work.style.transform=value.horizontal?`translate3d(${Math.max(0,Math.min(value.workOverflow,value.workOffset))}px,0,0)`:"none";
    content.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el,i)=>{el.inert=value.horizontal&&i!==value.active;});
    const heroLines=content.querySelectorAll<HTMLElement>("#ln-hero .ln-headline-line");
    heroLines.forEach((el,i)=>{el.style.transform=value.horizontal?`translate3d(${-smooth(value.position)*(70+i*90)}px,0,0) skewX(${-smooth(value.position)*(i+1)*2}deg)`:"none";});
    const manifesto=content.querySelectorAll<HTMLElement>("[data-manifesto-line]");
    manifesto.forEach((el,i)=>{const p=value.position-1;el.style.transform=value.horizontal?`translate3d(${p*(i%2?120:-90)}px,0,0) rotateY(${p*(i%2?-6:6)}deg)`:"none";});
    content.querySelectorAll<HTMLElement>("[data-studio-line]").forEach((el,i)=>{const p=value.position-5;el.style.transform=value.horizontal?`translate3d(${p*(i?100:-80)}px,0,0) rotateY(${p*(i?-4:4)}deg)`:"none";});
  },[applyVisual]);
  const onMode=useCallback((h:boolean,r:boolean)=>{mode.current={horizontal:h,reduced:r};setHorizontal(h);setReduced(r);setEnhanced(true);},[]);
  useHorizontalStory({shell,pin,track,hero,engine,navigation,onSample,onMode});
  const menuChange=useCallback((open:boolean)=>setMenuOpen(open),[]);
  useEffect(()=>{navigation.current?.suspend(dialogContent!==null||menuOpen);},[dialogContent,menuOpen]);
  useEffect(()=>{
    const element=dialog.current;if(dialogContent===null||!element)return;
    const overflow=document.body.style.overflow;element.showModal();document.body.style.overflow="hidden";
    return()=>{element.close();document.body.style.overflow=overflow;opener.current?.focus({preventScroll:true});};
  },[dialogContent]);
  const navigate=(id:ChapterId)=>{if(navigation.current)navigation.current.chapter(id);else document.getElementById(`ln-${id}`)?.scrollIntoView();};
  const headerNavigate=(section:Exclude<LenusDialogSection,null>)=>navigate(section==="about"?"studio":section as ChapterId);
  const openDialog=(value:"contact"|number)=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDialogContent(value);};
  const closeDialog=()=>setDialogContent(null);
  const backdrop=(event:MouseEvent<HTMLDialogElement>)=>{
    if(event.target!==event.currentTarget)return;const r=event.currentTarget.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();
  };
  const footer=()=>{history.pushState({...history.state},"","#ln-footer");navigation.current?.footer();};
  const study=typeof dialogContent==="number"?WORK_STUDIES[dialogContent]:null;
  return <div className="ln-experience ln-narrative" id="top" data-reduced={reduced}>
    <a className="ln-skip" href="#ln-main">Skip to content</a>
    <div className="ln-space" aria-hidden="true"/>
    <LenusHeader onNavigate={headerNavigate} active={active} onMenuChange={menuChange}/>
    <main ref={shell} id="ln-main" className="ln-story-shell" data-story-mode={horizontal?"horizontal":"vertical"}>
      <div ref={pin} className="ln-story-pin">
        <div className="ln-scene-layer">
          <LenusOpticalLensCanvas experienceRef={engine} controlsMount={controlsMount} onNarrativeFrame={onFrame} suspended={dialogContent!==null||menuOpen}/>
        </div>
        <ExpertiseAnnotations ref={annotations} active={active} onFocus={id=>engine.current?.focusPart(id)} onInspect={id=>engine.current?.inspectPart(id)}/>
        <div className="ln-controls-mount" ref={setControlsMount}/>
        <div className="ln-navigation-layer"><nav className="ln-chapter-navigation" aria-label="Chapter navigation">
          <p aria-live="polite" aria-atomic="true"><span>{String(active+1).padStart(2,"0")} / 07</span> {CHAPTERS[active].label}</p>
          <div className="ln-chapter-dots">{CHAPTERS.map((item,i)=><a href={`#ln-${item.id}`} aria-label={`Go to ${item.label}`} aria-current={active===i?"step":undefined} key={item.id} onClick={event=>{event.preventDefault();navigate(item.id);}}><span/></a>)}</div>
          <span className="ln-global-progress" aria-hidden="true"><i/></span>
          <a className="ln-skip-experience" href="#ln-footer" onClick={event=>{event.preventDefault();footer();}}>SKIP EXPERIENCE <ArrowRight size={12} aria-hidden="true"/></a>
        </nav></div>
        <div className="ln-horizontal-viewport"><div ref={track} className="ln-horizontal-track">
          <section id="ln-hero" data-chapter="hero" className="ln-chapter ln-hero" aria-label="Reality">
            <LenusHeroCopy onStepInside={()=>{engine.current?.activate();navigate("manifesto");}}/>
            <div ref={hero} className="ln-stage-slot ln-engine-reference" aria-hidden="true"/>
          </section>
          <section id="ln-manifesto" data-chapter="manifesto" className="ln-chapter ln-manifesto" aria-labelledby="ln-manifesto-title">
            <div className="ln-story-content ln-manifesto-copy"><span className="ln-story-eyebrow">01 / A DIFFERENT WAY TO SEE</span>
              <h2 id="ln-manifesto-title" tabIndex={-1} aria-label="WE DON'T FOLLOW REALITY. WE REDEFINE IT."><span data-manifesto-line>WE DON’T FOLLOW</span><span data-manifesto-line>REALITY.</span><span data-manifesto-line className="ln-phrase-lime">WE REDEFINE IT.</span></h2>
              <p>Unexpected ideas deserve to become working experiences. We bring creative direction, design and technology into the same room.</p>
              <span className="ln-story-coordinate" aria-hidden="true">POSSIBILITY → REALIZATION</span>
            </div>
          </section>
          <section id="ln-work" data-chapter="work" className="ln-chapter ln-work" aria-labelledby="ln-work-title">
            <div className="ln-story-content ln-work-content"><span className="ln-story-eyebrow">02 / SELECTED DIRECTIONS</span><h2 id="ln-work-title" tabIndex={-1}>EXPERIENCES<br/><span className="ln-phrase-violet">BEYOND EXPECTED.</span></h2>
              <WorkGallery ref={gallery} motion={enhanced&&!reduced} suspended={dialogContent!==null||menuOpen} onOpen={index=>openDialog(index)} onAim={value=>engine.current?.setWorkProgress(value)}/>
            </div>
          </section>
          <section id="ln-expertise" data-chapter="expertise" className="ln-chapter ln-expertise" aria-labelledby="ln-expertise-title">
            <div className="ln-story-content ln-expertise-copy"><span className="ln-story-eyebrow">03 / CONNECTED CAPABILITIES</span><h2 id="ln-expertise-title" tabIndex={-1}>WHAT WE MAKE<br/><span className="ln-phrase-lime">POSSIBLE.</span></h2><p>One idea. Many disciplines.<br/>Every part working together.</p>
              <div className="ln-capability-list">{CAPABILITIES.map((item,i)=><details key={item.id} onToggle={event=>engine.current?.focusPart(event.currentTarget.open?item.part:null)}><summary><span>0{i+1}</span>{item.name}</summary><p>{item.description}</p></details>)}</div>
            </div>
          </section>
          <section id="ln-technology" data-chapter="technology" className="ln-chapter ln-technology" aria-labelledby="ln-technology-title">
            <div className="ln-story-content ln-technology-copy"><span className="ln-story-eyebrow">04 / THE OPTICAL LABORATORY</span><h2 id="ln-technology-title" tabIndex={-1}>INSIDE<br/><span className="ln-phrase-violet">THE ENGINE.</span></h2><p>This is the real thing. Rotate the lens, separate the assembly and bring its inner workings into focus.</p>
              <button type="button" className="ln-text-button" onClick={()=>engine.current?.openControls()}>TAKE THE CONTROLS <ArrowUpRight size={18} aria-hidden="true"/></button>
              <p className="ln-lab-note">Drag to rotate. Use the sliders to transform.<br/>Scroll on when you’re ready.</p>
            </div>
          </section>
          <section id="ln-studio" data-chapter="studio" className="ln-chapter ln-studio" aria-labelledby="ln-studio-title">
            <div className="ln-story-content ln-studio-copy"><span className="ln-story-eyebrow">05 / HOW WE SEE THINGS</span><h2 id="ln-studio-title" tabIndex={-1} aria-label="INDEPENDENT MINDS. SHARED POSSIBILITIES."><span data-studio-line>INDEPENDENT<br/>MINDS.</span><span data-studio-line className="ln-phrase-violet">SHARED<br/>POSSIBILITIES.</span></h2><p>Curious by nature. Open to the unexpected.<br/>An independent studio working where design and technology meet.</p></div>
          </section>
          <section id="ln-contact" data-chapter="contact" className="ln-chapter ln-contact" aria-labelledby="ln-contact-title">
            <div className="ln-story-content ln-contact-copy"><span className="ln-story-eyebrow">06 / YOUR NEXT POSSIBILITY</span><h2 id="ln-contact-title" tabIndex={-1}>LET’S MAKE<br/><span className="ln-phrase-lime">WHAT’S NEXT.</span></h2><p>A question, an ambition, a different point of view.<br/>Let’s give it a place to start.</p><button type="button" className="ln-button" aria-haspopup="dialog" onClick={()=>openDialog("contact")}>GET IN TOUCH <ArrowUpRight size={22} aria-hidden="true"/></button></div>
            <div className="ln-contact-thread" aria-hidden="true"><span>CONTINUE THE CONVERSATION</span><i/></div>
          </section>
        </div></div>
      </div>
    </main>
    <footer className="ln-native-footer" id="ln-footer">
      <div className="ln-footer-lead"><span className="ln-story-eyebrow">THE EXPECTED IS ONLY THE BEGINNING.</span><h2 tabIndex={-1}>A NEW CHAPTER<br/><span className="ln-phrase-violet">STARTS WITH YOU.</span></h2><button type="button" className="ln-button" aria-haspopup="dialog" onClick={()=>openDialog("contact")}>PREPARE A PROJECT BRIEF <ArrowUpRight size={20} aria-hidden="true"/></button><p>Prepared on your device. Nothing is sent from this demo.</p></div>
      <div className="ln-footer-navigation"><a href="#ln-hero" className="ln-footer-brand" onClick={event=>{event.preventDefault();navigate("hero");}}>LENUS</a><nav aria-label="Footer navigation">{(["work","expertise","technology","studio","contact"] as ChapterId[]).map(id=><a key={id} href={`#ln-${id}`} onClick={event=>{event.preventDefault();navigate(id);}}>{id==="studio"?"ABOUT":id.toUpperCase()}</a>)}</nav><a href="#ln-hero" className="ln-text-button" onClick={event=>{event.preventDefault();navigate("hero");}}>BACK TO BEGINNING ↑</a></div>
      <div className="ln-footer-meta"><span>INDEPENDENT MINDS. SHARED POSSIBILITIES.</span><Link href="/">EXPLORE THE GALLERY <ArrowUpRight size={12} aria-hidden="true"/></Link></div>
    </footer>
    <dialog ref={dialog} className="ln-dialog" aria-labelledby="ln-dialog-title" onCancel={event=>{event.preventDefault();closeDialog();}} onClick={backdrop}>
      <button type="button" className="ln-dialog-close ln-icon-button" aria-label="Close panel" onClick={closeDialog}><X size={22} aria-hidden="true"/></button>
      <div className="ln-dialog-content"><span className="ln-dialog-eyebrow">{dialogContent==="contact"?"LET'S MAKE SOMETHING MATTER.":"CONCEPT STUDY / LIVE EXHIBITION"}</span><h2 id="ln-dialog-title">{dialogContent==="contact"?"What's your next possibility?":study?.name}</h2>{dialogContent==="contact"?<ProjectBriefForm/>:study&&<><p className="ln-dialog-intro">{study.description}</p><p>This conceptual exploration was created for this exhibition. It is not presented as commissioned client work.</p><button type="button" className="ln-text-button" onClick={closeDialog}>BACK TO THE EXPERIENCE <ArrowUpRight size={18} aria-hidden="true"/></button></>}</div>
    </dialog>
  </div>;
}
