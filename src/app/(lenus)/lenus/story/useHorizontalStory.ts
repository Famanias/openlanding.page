"use client";
import {useEffect,type RefObject} from "react";
import type {gsap} from "gsap";
import type {EngineExperienceApi,StoryNavigation} from "./experienceTypes";
import {CHAPTERS,chapterPosition,dominantChapter,type ChapterId} from "./storyMath";
import type {StoryInput} from "./chapterPoseMap";
import {adjacentChapter,ChapterWheelGesture,nestedWheelScroll,ownsChapterKeys} from "./chapterNavigation";

export type StorySample=StoryInput&{active:number;distance:number;horizontal:boolean;workOffset:number;workOverflow:number};
type Props={shell:RefObject<HTMLElement|null>;pin:RefObject<HTMLDivElement|null>;track:RefObject<HTMLDivElement|null>;hero:RefObject<HTMLDivElement|null>;engine:RefObject<EngineExperienceApi|null>;navigation:RefObject<StoryNavigation|null>;onSample:(sample:StorySample)=>void;onMode:(horizontal:boolean,reduced:boolean)=>void};
export function useHorizontalStory(props:Props){
  const {shell:shellRef,pin:pinRef,track:trackRef,hero:heroRef,engine,navigation:navigationRef,onSample,onMode:modeChanged}=props;
  useEffect(()=>{
    const shell=shellRef.current,pin=pinRef.current,track=trackRef.current;if(!shell||!pin||!track)return;
    const chapters=Array.from(track.querySelectorAll<HTMLElement>("[data-chapter]"));
    const desktop=matchMedia("(min-width:1024px)"),reduced=matchMedia("(prefers-reduced-motion:reduce)");
    let alive=true,generation=0,horizontal=false,raf=0,refreshRaf=0,resizeTimer=0,initialized=false,changingMode=false;
    let resizePosition:number|null=null;
    let tween:gsap.core.Tween|null=null,context:gsap.Context|null=null,navTween:gsap.core.Tween|null=null;
    let library:typeof import("gsap").gsap|null=null,suspended=false;
    const wheelGesture=new ChapterWheelGesture();let slideTarget:number|null=null;
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
    const moveTo=(top:number,focus?:HTMLElement|null,instant=false,destination:number|null=null)=>{
      navTween?.kill();navTween=null;
      top=Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));
      slideTarget=destination;
      if(reduced.matches||instant||!library){slideTarget=null;window.scrollTo({top,behavior:"instant"});focus?.focus({preventScroll:true});return;}
      const value={y:window.scrollY};navTween=library.to(value,{y:top,duration:1.15,ease:"power3.inOut",onUpdate:()=>window.scrollTo(0,value.y),onComplete:()=>{slideTarget=null;navTween=null;focus?.focus({preventScroll:true});}});
    };
    const navigate=(id:ChapterId,history=true)=>{
      const index=CHAPTERS.findIndex(c=>c.id===id);if(index<0)return;
      if(history)window.history.pushState({...window.history.state,lenusChapter:id},"",`#ln-${id}`);
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      moveTo(start+(offsets[index]??0),chapters[index].querySelector<HTMLElement>("h1,h2"),false,index);
    };
    const footer=()=>{const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY,el.querySelector<HTMLElement>("h2"),false,7);};
    navigationRef.current={chapter:navigate,footer,suspend:value=>{suspended=value;if(value)wheelGesture.reset();navTween?.paused(value);if(!value&&!horizontal)update(window.scrollY-docTop);}};
    const step=(direction:number)=>{
      if(!initialized||changingMode||resizePosition!==null||suspended)return;
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      const inFooter=window.scrollY>start+travel+2;
      const position=inFooter?7:currentPosition;
      // A second input cannot queue several forward slides. A deliberate reverse
      // input can interrupt the current one and return smoothly to its source.
      if(slideTarget!==null&&Math.abs(slideTarget-position)>.015&&Math.sign(slideTarget-position)===direction)return;
      if(inFooter&&direction>0)return;
      const settled=slideTarget!==null&&Math.abs(slideTarget-position)<=.015?slideTarget:position;
      const next=inFooter?6:adjacentChapter(settled,direction);
      if(next===7){history.replaceState({...history.state},"","#ln-footer");footer();}
      else{history.replaceState({...history.state},"",`#ln-${CHAPTERS[next].id}`);navigate(CHAPTERS[next].id,false);}
    };
    const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(suspended)return;if(horizontal){const distance=Math.max(0,Math.min(travel,window.scrollY-(tween?.scrollTrigger?.start??docTop)));tween?.progress(distance/travel);update(distance);}else update(window.scrollY-docTop);});};
    const refresh=(preserve=false,position=currentPosition)=>{
      if(!alive||changingMode||horizontal!==(desktop.matches&&!reduced.matches))return;measure();
      if(horizontal&&tween?.scrollTrigger){
        tween.scrollTrigger.refresh();measure();
        if(preserve){const distance=targetFor(position);window.scrollTo({top:tween.scrollTrigger.start+distance,behavior:"instant"});tween.scrollTrigger.update();tween.progress(distance/travel);update(distance);}
      }else{if(preserve)window.scrollTo({top:docTop+targetFor(position),behavior:"instant"});update(window.scrollY-docTop);}
    };
    const settleResize=()=>{clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{const position=resizePosition;resizePosition=null;if(position!==null)refresh(true,position);},280);};
    const scheduleRefresh=()=>{cancelAnimationFrame(refreshRaf);refreshRaf=requestAnimationFrame(()=>refresh(false));};
    const setup=async()=>{
      const token=++generation,position=resizePosition??currentPosition;changingMode=true;
      if(initialized){resizePosition=position;settleResize();}
      context?.revert();context=null;tween=null;navTween?.kill();navTween=null;slideTarget=null;wheelGesture.reset();
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
          tween=gsapLibrary.fromTo(track,{x:0},{x:()=>-travel,ease:"none",onUpdate:()=>update(-Number(gsapLibrary.getProperty(track,"x"))),scrollTrigger:{trigger:pin,start:"top top",end:()=>`+=${travel}`,pin:true,pinSpacing:true,scrub:true,anticipatePin:1,invalidateOnRefresh:true}});
        },shell);
        tween!.scrollTrigger!.refresh();measure();
      }
      if(!alive||token!==generation)return;changingMode=false;
      const hash=window.location.hash.slice(1),index=CHAPTERS.findIndex(c=>`ln-${c.id}`===hash);
      const desired=!initialized&&index>=0?index:position,liveTween=tween as gsap.core.Tween|null;initialized=true;
      if(desired>0){const start=horizontal?liveTween?.scrollTrigger?.start??docTop:docTop;window.scrollTo({top:start+targetFor(desired),behavior:"instant"});if(horizontal){liveTween?.scrollTrigger?.update();liveTween?.progress(targetFor(desired)/travel);}update(targetFor(desired));}
      else update(horizontal?0:window.scrollY-docTop);
    };
    const onResize=()=>{resizePosition??=currentPosition;cancelAnimationFrame(refreshRaf);settleResize();};
    const onMode=()=>{void setup();};
    const onUserScroll=()=>{navTween?.kill();navTween=null;slideTarget=null;wheelGesture.reset();};
    const onWheel=(event:WheelEvent)=>{
      if(!horizontal||reduced.matches||suspended||changingMode||resizePosition!==null||!initialized||!library||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey)return;
      const delta=(Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
      if(!delta||nestedWheelScroll(event.target,delta))return;
      const start=tween?.scrollTrigger?.start??docTop,end=start+travel,now=performance.now();
      const inside=scrollY>=start-1&&scrollY<=end+1;
      const entering=delta<0&&scrollY>end&&scrollY+delta<=end;
      if(!inside&&!entering&&!wheelGesture.active(now)){onUserScroll();return;}
      if(inside&&scrollY<=start+1&&delta<0&&slideTarget===null&&!wheelGesture.active(now))return;
      event.preventDefault();const direction=wheelGesture.push(delta,now);if(direction)step(direction);
    };
    const onKey=(event:KeyboardEvent)=>{
      if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||suspended||ownsChapterKeys(event.target))return;
      const direction=event.key==="ArrowRight"||horizontal&&event.key==="ArrowDown"?1:event.key==="ArrowLeft"||horizontal&&event.key==="ArrowUp"?-1:0;
      if(!direction||!initialized||changingMode||resizePosition!==null)return;
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      if(scrollY<start-1||scrollY>start+travel+innerHeight+2||scrollY>start+travel+2&&(direction>0||event.key==="ArrowUp"||event.key==="ArrowDown"))return;
      event.preventDefault();if(!event.repeat)step(direction);
    };
    const onHash=()=>{if(location.hash==="#ln-footer"){const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY);return;}const id=location.hash.replace(/^#ln-/,"") as ChapterId;if(CHAPTERS.some(c=>c.id===id))navigate(id,false);};
    const observer=new ResizeObserver(scheduleRefresh);observer.observe(track);if(heroRef.current)observer.observe(heroRef.current);
    window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onResize);window.addEventListener("hashchange",onHash);
    window.addEventListener("wheel",onWheel,{passive:false});window.addEventListener("keydown",onKey);window.addEventListener("touchstart",onUserScroll,{passive:true});
    window.addEventListener("pointerdown",onUserScroll,{passive:true});
    desktop.addEventListener("change",onMode);reduced.addEventListener("change",onMode);
    void setup();void document.fonts.ready.then(()=>{if(alive)scheduleRefresh();});
    return()=>{alive=false;generation++;context?.revert();restoreRefresh?.();navTween?.kill();wheelGesture.reset();observer.disconnect();cancelAnimationFrame(raf);cancelAnimationFrame(refreshRaf);clearTimeout(resizeTimer);window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);window.removeEventListener("hashchange",onHash);window.removeEventListener("wheel",onWheel);window.removeEventListener("keydown",onKey);window.removeEventListener("touchstart",onUserScroll);window.removeEventListener("pointerdown",onUserScroll);desktop.removeEventListener("change",onMode);reduced.removeEventListener("change",onMode);navigationRef.current=null;};
  },[shellRef,pinRef,trackRef,heroRef,engine,navigationRef,onSample,modeChanged]);
}
