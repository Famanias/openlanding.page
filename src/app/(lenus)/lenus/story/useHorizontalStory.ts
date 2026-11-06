"use client";
import {useEffect,type RefObject} from "react";
import type {gsap} from "gsap";
import type {EngineExperienceApi,StoryNavigation} from "./experienceTypes";
import {CHAPTERS,chapterPosition,dominantChapter,type ChapterId} from "./storyMath";
import type {StoryInput} from "./chapterPoseMap";

export type StorySample=StoryInput&{active:number;distance:number;horizontal:boolean;workOffset:number;workOverflow:number};
type Props={shell:RefObject<HTMLElement|null>;pin:RefObject<HTMLDivElement|null>;track:RefObject<HTMLDivElement|null>;hero:RefObject<HTMLDivElement|null>;engine:RefObject<EngineExperienceApi|null>;navigation:RefObject<StoryNavigation|null>;onSample:(sample:StorySample)=>void;onMode:(horizontal:boolean,reduced:boolean)=>void};
export function useHorizontalStory(props:Props){
  const {shell:shellRef,pin:pinRef,track:trackRef,hero:heroRef,engine,navigation:navigationRef,onSample,onMode:modeChanged}=props;
  useEffect(()=>{
    const shell=shellRef.current,pin=pinRef.current,track=trackRef.current;if(!shell||!pin||!track)return;
    const chapters=Array.from(track.querySelectorAll<HTMLElement>("[data-chapter]"));
    const desktop=matchMedia("(min-width:1024px)"),reduced=matchMedia("(prefers-reduced-motion:reduce)");
    let alive=true,generation=0,horizontal=false,raf=0,refreshRaf=0,focusTimer=0,resizeTimer=0,initialized=false,changingMode=false;
    let resizePosition:number|null=null;
    let tween:gsap.core.Tween|null=null,context:gsap.Context|null=null,navTween:gsap.core.Tween|null=null;
    let library:typeof import("gsap").gsap|null=null,suspended=false;
    let restoreRefresh:(()=>void)|null=null;
    let offsets:number[]=[],sizes:number[]=[],travel=1,docTop=0,currentPosition=0,currentDistance=0,measuredWidth=innerWidth,measuredHeight=innerHeight;
    let heroFrame={x:.72,y:.46,scale:.68,heightRatio:.68};
    const measure=()=>{
      measuredWidth=innerWidth;measuredHeight=innerHeight;
      offsets=chapters.map(el=>horizontal?el.offsetLeft:el.offsetTop);sizes=chapters.map(el=>horizontal?el.offsetWidth:el.offsetHeight);
      travel=horizontal?Math.max(1,track.scrollWidth-pin.clientWidth):Math.max(1,offsets.at(-1)??1);
      docTop=shell.getBoundingClientRect().top+window.scrollY;
      if(innerWidth<1024)heroFrame={x:.5,y:.28,scale:Math.min(.9,.4*Math.max(1,innerHeight/innerWidth)),heightRatio:.4};
      else{
        const el=heroRef.current;
        if(el&&el.offsetHeight){const h=el.offsetHeight,w=el.offsetWidth,full=Math.max(3.7,3.7*innerHeight/innerWidth),local=Math.max(3.7,3.7*h/w);heroFrame={x:(el.offsetLeft+w/2)/innerWidth,y:(el.offsetTop+h/2)/innerHeight,scale:h*full/(local*innerHeight),heightRatio:h/innerHeight};shell.style.setProperty("--ln-aperture-width",`${w*1.4}px`);}
      }
    };
    const update=(distance:number)=>{
      if(!alive||changingMode||resizePosition!==null||horizontal!==(innerWidth>=1024&&!reduced.matches)||measuredWidth!==innerWidth||measuredHeight!==innerHeight)return;
      currentDistance=Math.max(0,Math.min(travel,distance));currentPosition=chapterPosition(currentDistance,offsets);
      const workOverflow=horizontal?Math.max(1,sizes[2]-innerWidth):Math.max(1,innerHeight*.5);
      const workOffset=horizontal?currentDistance-offsets[2]:currentDistance-offsets[2]-innerHeight*.15;
      const input={position:currentPosition,progress:currentDistance/travel,compact:innerWidth<1024,hero:heroFrame,workProgress:Math.max(0,Math.min(1,workOffset/workOverflow))};
      engine.current?.setNarrativeFrame(input);
      onSample({...input,active:dominantChapter(currentDistance,horizontal?innerWidth:innerHeight,offsets,sizes),distance:currentDistance,horizontal,workOffset,workOverflow});
    };
    const targetFor=(position:number)=>{const index=Math.min(6,Math.floor(position));return (offsets[index]??0)+(index<6?(position-index)*((offsets[index+1]??offsets[index])-offsets[index]):0);};
    const moveTo=(top:number,focus?:HTMLElement|null,instant=false)=>{
      navTween?.kill();window.clearTimeout(focusTimer);
      if(reduced.matches||instant||!library){window.scrollTo({top,behavior:"instant"});focus?.focus({preventScroll:true});return;}
      const value={y:window.scrollY};navTween=library.to(value,{y:top,duration:.95,ease:"power3.inOut",onUpdate:()=>window.scrollTo(0,value.y)});
      focusTimer=window.setTimeout(()=>focus?.focus({preventScroll:true}),1700);
    };
    const navigate=(id:ChapterId,history=true)=>{
      const index=CHAPTERS.findIndex(c=>c.id===id);if(index<0)return;
      if(history)window.history.pushState({...window.history.state,lenusChapter:id},"",`#ln-${id}`);
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      moveTo(start+(offsets[index]??0),chapters[index].querySelector<HTMLElement>("h1,h2"));
    };
    navigationRef.current={chapter:navigate,footer:()=>{const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY,el.querySelector<HTMLElement>("h2"));},suspend:value=>{suspended=value;tween?.scrollTrigger?.getTween()?.paused(value);navTween?.paused(value);if(!value&&!horizontal)update(window.scrollY-docTop);}};
    const onScroll=()=>{if(horizontal||raf)return;raf=requestAnimationFrame(()=>{raf=0;if(!suspended)update(window.scrollY-docTop);});};
    const refresh=(preserve=false,position=currentPosition)=>{
      if(!alive||changingMode||horizontal!==(desktop.matches&&!reduced.matches))return;measure();
      if(horizontal&&tween?.scrollTrigger){
        tween.scrollTrigger.refresh();measure();
        if(preserve){const distance=targetFor(position);window.scrollTo({top:tween.scrollTrigger.start+distance,behavior:"instant"});tween.scrollTrigger.update();tween.scrollTrigger.getTween()?.progress(1);tween.progress(distance/travel);update(distance);}
      }else{if(preserve)window.scrollTo({top:docTop+targetFor(position),behavior:"instant"});update(window.scrollY-docTop);}
    };
    const settleResize=()=>{clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{const position=resizePosition;resizePosition=null;if(position!==null)refresh(true,position);},280);};
    const scheduleRefresh=()=>{cancelAnimationFrame(refreshRaf);refreshRaf=requestAnimationFrame(()=>refresh(false));};
    const setup=async()=>{
      const token=++generation,position=resizePosition??currentPosition;changingMode=true;
      if(initialized){resizePosition=position;settleResize();}
      context?.revert();context=null;tween=null;navTween?.kill();
      horizontal=desktop.matches&&!reduced.matches;shell.dataset.storyMode=horizontal?"horizontal":"vertical";
      modeChanged(horizontal,reduced.matches);currentDistance=0;measure();
      if(!initialized){changingMode=false;update(0);changingMode=true;}
      if(horizontal){
        const [{gsap:gsapLibrary},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
        if(!alive||token!==generation)return;library=gsapLibrary;library.registerPlugin(ScrollTrigger);
        // This route measures and preserves chapter position itself. A second,
        // delayed global resize refresh would restore the old pixel scroll value.
        ScrollTrigger.config({autoRefreshEvents:"visibilitychange,DOMContentLoaded,load"});
        restoreRefresh=()=>ScrollTrigger.config({autoRefreshEvents:"visibilitychange,DOMContentLoaded,load,resize"});
        context=library.context(()=>{
          tween=gsapLibrary.fromTo(track,{x:0},{x:()=>-travel,ease:"none",onUpdate:()=>update(-Number(gsapLibrary.getProperty(track,"x"))),scrollTrigger:{trigger:pin,start:"top top",end:()=>`+=${travel}`,pin:true,pinSpacing:true,scrub:.65,anticipatePin:1,invalidateOnRefresh:true}});
        },shell);
        tween!.scrollTrigger!.refresh();measure();
      }
      if(!alive||token!==generation)return;changingMode=false;
      const hash=window.location.hash.slice(1),index=CHAPTERS.findIndex(c=>`ln-${c.id}`===hash);
      const desired=!initialized&&index>=0?index:position,liveTween=tween as gsap.core.Tween|null;initialized=true;
      if(desired>0){const start=horizontal?liveTween?.scrollTrigger?.start??docTop:docTop;window.scrollTo({top:start+targetFor(desired),behavior:"instant"});if(horizontal){liveTween?.scrollTrigger?.update();liveTween?.scrollTrigger?.getTween()?.progress(1);}update(targetFor(desired));}
      else update(horizontal?0:window.scrollY-docTop);
    };
    const onResize=()=>{resizePosition??=currentPosition;cancelAnimationFrame(refreshRaf);settleResize();};
    const onMode=()=>{void setup();};
    const onUserScroll=()=>{navTween?.kill();window.clearTimeout(focusTimer);};
    const onHash=()=>{if(location.hash==="#ln-footer"){const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY);return;}const id=location.hash.replace(/^#ln-/,"") as ChapterId;if(CHAPTERS.some(c=>c.id===id))navigate(id,false);};
    const observer=new ResizeObserver(scheduleRefresh);observer.observe(track);if(heroRef.current)observer.observe(heroRef.current);
    window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onResize);window.addEventListener("hashchange",onHash);
    window.addEventListener("wheel",onUserScroll,{passive:true});window.addEventListener("touchstart",onUserScroll,{passive:true});
    desktop.addEventListener("change",onMode);reduced.addEventListener("change",onMode);
    void setup();void document.fonts.ready.then(()=>{if(alive)scheduleRefresh();});
    return()=>{alive=false;generation++;context?.revert();restoreRefresh?.();navTween?.kill();observer.disconnect();cancelAnimationFrame(raf);cancelAnimationFrame(refreshRaf);clearTimeout(focusTimer);clearTimeout(resizeTimer);window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);window.removeEventListener("hashchange",onHash);window.removeEventListener("wheel",onUserScroll);window.removeEventListener("touchstart",onUserScroll);desktop.removeEventListener("change",onMode);reduced.removeEventListener("change",onMode);navigationRef.current=null;};
  },[shellRef,pinRef,trackRef,heroRef,engine,navigationRef,onSample,modeChanged]);
}
