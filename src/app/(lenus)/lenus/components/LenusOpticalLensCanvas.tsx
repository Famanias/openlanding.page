"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { LenusSceneController } from "../scene/LenusSceneController";
import { getPartTelemetry } from "../scene/telemetry";
import LenusLensFallback from "./LenusLensFallback";
import { LenusHudControls, type LenusStageState } from "./LenusHudControls";

export default function LenusOpticalLensCanvas({suspended=false,externalExplodeRequest=0}:{suspended?:boolean;externalExplodeRequest?:number}){
  const host=useRef<HTMLDivElement>(null);
  const controller=useRef<LenusSceneController|null>(null);
  const synchronize=useRef<()=>void>(()=>{});
  const activate=useRef<()=>void>(()=>{});
  const pose=useRef({explode:0,focus:0});
  const policy=useRef({suspended,paused:false});
  const [state,setState]=useState<LenusStageState>("preview");
  const [fps,setFps]=useState(0);
  const [paused,setPaused]=useState(false);
  const [explodeAmount,setExplodeAmount]=useState(0);
  const [focusAngle,setFocusAngle]=useState(0);
  const [activePart,setActivePart]=useState(()=>getPartTelemetry(null));
  const [locked,setLocked]=useState(false);
  const [activationNeeded,setActivationNeeded]=useState(false);
  const lastPick=useRef(0),pointerStart=useRef({x:0,y:0});
  const instructions=useId();

  useEffect(()=>{
    policy.current={suspended,paused};synchronize.current();
  },[suspended,paused]);

  useEffect(()=>{
    const container=host.current;
    if(!container)return;
    let active=true,revision=0,inView=true,lost=false,activated=false;
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{
      const c=controller.current;
      if(!active||!c)return;
      const shouldRun=inView&&document.visibilityState!=="hidden"&&!policy.current.suspended&&!policy.current.paused;
      if(shouldRun)c.start();else c.stop();
      setState(lost?"lost":shouldRun?"running":"paused");
    };
    synchronize.current=sync;
    const boot=async()=>{
      if(controller.current&&!media.matches){sync();return;}
      const ticket=++revision;
      controller.current?.dispose();controller.current=null;lost=false;
      if(media.matches){setActivationNeeded(false);setState("static");return;}
      if(!activated&&(window.matchMedia("(pointer: coarse)").matches||window.innerWidth<700)){
        setActivationNeeded(true);setState("preview");return;
      }
      setActivationNeeded(false);
      setState("preview");
      try {
        const {LenusSceneController}=await import("../scene/LenusSceneController");
        if(!active||ticket!==revision||media.matches)return;
        const instance=new LenusSceneController({
          onFps:value=>{if(active&&ticket===revision)setFps(value);},
          onContextChange:value=>{if(!active||ticket!==revision)return;lost=value==="lost";sync();},
          onPartChange:part=>{if(active&&ticket===revision)setActivePart(current=>current.id===part.id?current:part);},
        });
        controller.current=instance;
        instance.init(container);
        // Commands can arrive before this import resolves or survive a preference change.
        instance.setExplodeTarget(pose.current.explode);instance.setFocusTarget(pose.current.focus);
        sync();
      } catch {
        if(active&&ticket===revision){controller.current?.dispose();controller.current=null;setState("unavailable");}
      }
    };
    activate.current=()=>{activated=true;void boot();};
    const resize=new ResizeObserver(entries=>{
      const rect=entries[0]?.contentRect;
      if(rect)controller.current?.resize(rect.width,rect.height);
    });
    resize.observe(container);
    const intersection=new IntersectionObserver(entries=>{inView=entries[0]?.isIntersecting??true;sync();},{threshold:.05});
    intersection.observe(container);
    const onPreference=()=>{void boot();};
    media.addEventListener("change",onPreference);
    document.addEventListener("visibilitychange",sync);
    // The SVG and copy paint first; reduced motion never imports the rendering engine.
    const idle="requestIdleCallback" in window;
    const timer=idle?window.requestIdleCallback(()=>{void boot();},{timeout:1500}):window.setTimeout(()=>{void boot();},0);
    return()=>{
      active=false;revision++;if(idle)window.cancelIdleCallback(timer);else window.clearTimeout(timer);resize.disconnect();intersection.disconnect();
      media.removeEventListener("change",onPreference);document.removeEventListener("visibilitychange",sync);
      synchronize.current=()=>{};activate.current=()=>{};controller.current?.dispose();controller.current=null;
    };
  },[]);

  useEffect(()=>{
    if(externalExplodeRequest>0){pose.current.explode=1;setExplodeAmount(1);controller.current?.setExplodeTarget(1);setPaused(false);activate.current();}
  },[externalExplodeRequest]);

  const changeExplode=(value:number)=>{pose.current.explode=value;setExplodeAmount(value);controller.current?.setExplodeTarget(value);};
  const changeFocus=(value:number)=>{pose.current.focus=value;setFocusAngle(value);controller.current?.setFocusTarget(value);};
  const reset=()=>{changeExplode(0);changeFocus(0);setLocked(false);setActivePart(getPartTelemetry(null));controller.current?.resetView();};
  const toggleExplode=()=>changeExplode(pose.current.explode>.5?0:1);
  const coordinates=(event:PointerEvent<HTMLDivElement>)=>{
    const canvas=controller.current?.getRenderer()?.domElement;
    const rect=(canvas??event.currentTarget).getBoundingClientRect();
    return {x:(event.clientX-rect.left)/rect.width*2-1,y:-((event.clientY-rect.top)/rect.height*2-1)};
  };
  const move=(event:PointerEvent<HTMLDivElement>)=>{
    if(state!=="running")return;
    const p=coordinates(event);controller.current?.setPointer(p.x,p.y);
    if(!locked&&!event.buttons&&performance.now()-lastPick.current>100){lastPick.current=performance.now();controller.current?.pickAtNormalizedCanvas(p.x,p.y);}
  };
  const pick=(event:PointerEvent<HTMLDivElement>)=>{
    if(Math.hypot(event.clientX-pointerStart.current.x,event.clientY-pointerStart.current.y)>6)return;
    if(activationNeeded){activate.current();return;}
    const p=coordinates(event);controller.current?.pickAtNormalizedCanvas(p.x,p.y);setLocked(true);
  };
  const keyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
    if(event.target!==event.currentTarget)return;
    if(activationNeeded&&(event.key==="Enter"||event.key===" ")){event.preventDefault();activate.current();return;}
    if(!["running","paused"].includes(state))return;
    const actions:Record<string,()=>void>={ArrowLeft:()=>controller.current?.rotateView(-.12,0),ArrowRight:()=>controller.current?.rotateView(.12,0),ArrowUp:()=>controller.current?.rotateView(0,-.1),ArrowDown:()=>controller.current?.rotateView(0,.1),e:toggleExplode,E:toggleExplode,r:reset,R:reset,Home:reset,Escape:()=>setLocked(false)};
    if(actions[event.key]){event.preventDefault();actions[event.key]();}
  };
  const message:Record<LenusStageState,string>={preview:activationNeeded?"Tap the lens to explore in 3D.":"Optical preview. Interactive controls load when available.",running:"Drag to explore. Select a fragment to inspect.",paused:suspended?"Optical view paused while the panel is open.":"Optical view paused.",static:"Reduced motion is on. Showing a still optical preview.",unavailable:"Interactive graphics are unavailable. Showing a still optical preview.",lost:"Graphics connection lost. Showing the preview while reconnecting."};
  return <section className="ln-stage" data-state={state} data-exploded={explodeAmount>.5} aria-label="Optical lens experience">
    <div className="ln-lens-plot">
      <div className="ln-aperture" aria-hidden="true"/>
      <LenusLensFallback/>
      <div ref={host} className="ln-canvas-host" data-testid="lenus-canvas-container" tabIndex={0} role={activationNeeded?"button":"group"} aria-label="Interactive Lenus optical lens assembly" aria-describedby={instructions} onPointerMove={move} onPointerLeave={()=>controller.current?.setPointer(0,0)} onPointerDown={event=>{pointerStart.current={x:event.clientX,y:event.clientY};}} onPointerUp={pick} onKeyDown={keyboard}/>
      <span className="ln-stage-marker ln-stage-marker-top" aria-hidden="true">LENUS / OPTICAL SYSTEMS</span>
      <span className="ln-stage-marker ln-stage-marker-bottom" aria-hidden="true">N 1.52 <span>19 PARTS</span></span>
    </div>
    <p id={instructions} className="ln-sr-only">{activationNeeded?"Press Enter or tap to start the optical experience. ":""}Use arrow keys to rotate, E to separate the assembly, R or Home to reset. Use the part selector to inspect each component.</p>
    <p className="ln-stage-help" role="status">{message[state]}</p>
    <LenusHudControls state={state} fps={fps} paused={paused} exploded={explodeAmount>.5} explodeAmount={explodeAmount} focusAngle={focusAngle} activePart={activePart} onToggleExplode={toggleExplode} onExplodeChange={changeExplode} onFocusChange={changeFocus} onResetView={reset} onTogglePause={()=>setPaused(value=>!value)} onPartSelect={id=>{setLocked(true);setActivePart(getPartTelemetry(id));}}/>
  </section>;
}
