import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createOpticalLensModel, type LensRuntime } from "../model/createOpticalLensModel";
import { createStudioEnvironment } from "../model/studioEnvironment";
import { getLensTransformationPose, LENS_INTERIOR_YAW } from "../model/lensTransformation";
import { getPartTelemetry, isInteriorPart, prefersRearView, type LenusPartInfo } from "./telemetry";
import { getLensLoopPose } from "./lensMotion";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value:number){return Number.isFinite(value)?THREE.MathUtils.clamp(value,-1,1):0;}
export function fitHeroFrustumHalfHeight(width:number,height:number){
  const aspect=Math.max(1,Number.isFinite(width)?width:1)/Math.max(1,Number.isFinite(height)?height:1);
  return Math.max(3.7,3.7/aspect);
}
const BASE_YAW=-.46,BASE_POLAR=Math.PI/2-.14,RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
type CameraPose={yaw:number;polar:number};
type OrbitOffset={yaw:number;polar:number};
type HeroView={elapsed:number;camera:CameraPose;orbit:OrbitOffset;pointer:{x:number;y:number};parallax:{x:number;y:number}};
export type LensInspectionMode="hero"|"cutaway";
export type LenusInspectionSnapshot={mode:LensInspectionMode;camera:CameraPose;orbit:OrbitOffset;pointer?:{x:number;y:number};parallax?:{x:number;y:number};hero:HeroView|null;controls:{explode:number;focus:number;currentExplode?:number;currentFocus?:number}};
export interface LenusSceneOptions{
  initialAnimationTime?:number;initialResolutionScale?:number;initialInspectionState?:LenusInspectionSnapshot;
  onFps?:(fps:number)=>void;onContextChange?:(state:"lost"|"restored")=>void;
  onInteractionChange?:(dragging:boolean)=>void;onPartChange?:(part:LenusPartInfo)=>void;
}

/** One renderer, one clock, and one owner for automatic/inspection transforms. */
export class LenusSceneController{
  private readonly scene=new THREE.Scene();
  private readonly camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,60);
  private readonly raycaster=new THREE.Raycaster();
  private renderer:THREE.WebGLRenderer|null=null;
  private controls:OrbitControls|null=null;
  private environment:THREE.WebGLRenderTarget|null=null;
  private model:THREE.Group|null=null;
  private runtime:LensRuntime|null=null;
  private disposed=false;private running=false;private contextLost=false;private dragging=false;private placingCamera=false;
  private pointer={x:0,y:0};private parallax={x:0,y:0};private orbit:OrbitOffset={yaw:0,polar:0};
  private mode:LensInspectionMode="hero";private hero:HeroView|null=null;
  private explodeTarget=0;private explode=0;private focusTarget=0;private focus=0;
  private elapsed=0;private lastTime:number|null=null;private frames=0;private sampleTime=0;private slowTime=0;
  private resolutionScale=1;private viewport={width:1,height:1};
  constructor(private readonly options:LenusSceneOptions={}){
    this.elapsed=Math.max(0,finite(options.initialAnimationTime??0));
    this.resolutionScale=THREE.MathUtils.clamp(finite(options.initialResolutionScale??1,1),.75,1);
    const saved=options.initialInspectionState;
    if(saved){
      this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
      this.pointer={x:normalizePointer(saved.pointer?.x??0),y:normalizePointer(saved.pointer?.y??0)};
      this.parallax={x:finite(saved.parallax?.x??0),y:finite(saved.parallax?.y??0)};
      this.explodeTarget=THREE.MathUtils.clamp(finite(saved.controls.explode),0,1);
      this.focusTarget=THREE.MathUtils.clamp(finite(saved.controls.focus),-Math.PI/2,Math.PI/2);
      this.explode=THREE.MathUtils.clamp(finite(saved.controls.currentExplode??this.explodeTarget),0,1);
      this.focus=THREE.MathUtils.clamp(finite(saved.controls.currentFocus??this.focusTarget),-Math.PI/2,Math.PI/2);
      this.placeCamera(saved.camera.yaw,saved.camera.polar);
    }else{const view=this.automaticCamera();this.placeCamera(view.yaw,view.polar);}
  }
  init(container:HTMLElement){
    if(this.disposed||this.renderer)return;
    try{
      const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});this.renderer=renderer;
      renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
      const canvas=renderer.domElement;canvas.dataset.lenusRenderer="true";canvas.setAttribute("aria-hidden","true");
      canvas.addEventListener("webglcontextlost",this.onLost);canvas.addEventListener("webglcontextrestored",this.onRestored);
      container.appendChild(canvas);this.scene.background=null;
      this.environment=createStudioEnvironment(renderer,true);this.scene.environment=this.environment.texture;
      this.rebuildModel();this.scene.add(new THREE.HemisphereLight(0xe5eeff,0x282631,2));
      for(const [color,intensity,position]of [[0xffffff,3,[-3,5,4]],[0xdde4ff,1.4,[3,0,-4]],[0xD2F802,1.8,[-4,4,-.4]],[0xA855F7,1.5,[4,-3,-.4]]] as const){
        const light=new THREE.DirectionalLight(color,intensity);light.position.set(position[0],position[1],position[2]);this.scene.add(light);
      }
      this.configureControls(canvas);
      const bounds=container.getBoundingClientRect();this.resize(bounds.width,bounds.height);
    }catch(error){this.dispose();throw error;}
  }
  private rebuildModel(){
    if(this.model)this.scene.remove(this.model);this.runtime?.dispose();
    this.model=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"high"});
    this.runtime=this.model.userData.sculptRuntime as LensRuntime;this.scene.add(this.model);this.applyLoopPose();
  }
  private releaseControls(){
    this.controls?.removeEventListener("start",this.onDragStart);this.controls?.removeEventListener("end",this.onDragEnd);
    this.controls?.removeEventListener("change",this.onControlChange);this.controls?.dispose();this.controls=null;
  }
  private configureControls(canvas:HTMLCanvasElement){
    this.releaseControls();const controls=new OrbitControls(this.camera,canvas);this.controls=controls;
    controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;controls.rotateSpeed=.5;
    controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
    controls.addEventListener("start",this.onDragStart);controls.addEventListener("end",this.onDragEnd);controls.addEventListener("change",this.onControlChange);
    canvas.style.touchAction="pan-y pinch-zoom";
  }
  getRenderer(){return this.renderer;}
  getAnimationTime(){return this.elapsed;}
  getResolutionScale(){return this.resolutionScale;}
  getInspectionSnapshot():LenusInspectionSnapshot{
    const camera=this.cameraPose(),base=this.automaticCamera();
    // OrbitControls can be mid-drag, before onDragEnd commits its offset.
    const orbit=this.mode==="hero"?{yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar}:{...this.orbit};
    return {mode:this.mode,camera,orbit,pointer:{...this.pointer},parallax:{...this.parallax},hero:this.hero?structuredClone(this.hero):null,controls:{explode:this.explodeTarget,focus:this.focusTarget,currentExplode:this.explode,currentFocus:this.focus}};
  }
  private cameraPose():CameraPose{const p=new THREE.Spherical().setFromVector3(this.camera.position);return {yaw:p.theta,polar:p.phi};}
  private automaticCamera():CameraPose{
    const blend=getLensTransformationPose(this.elapsed).cameraBlend;
    return {yaw:BASE_YAW+(LENS_INTERIOR_YAW-BASE_YAW)*blend,polar:BASE_POLAR};
  }
  private captureOrbit(){const view=this.cameraPose(),base=this.automaticCamera();this.orbit={yaw:view.yaw-base.yaw,polar:view.polar-base.polar};}
  setInspectionMode(mode:LensInspectionMode){
    if(this.disposed||mode===this.mode)return;
    if(mode==="cutaway"){
      if(this.dragging)this.captureOrbit();
      this.hero={elapsed:this.elapsed,camera:this.cameraPose(),orbit:{...this.orbit},pointer:{...this.pointer},parallax:{...this.parallax}};
      this.mode=mode;this.placeCamera(LENS_INTERIOR_YAW,BASE_POLAR);
    }else{
      this.mode="hero";
      if(this.hero){const saved=this.hero;this.elapsed=saved.elapsed;this.orbit={...saved.orbit};this.pointer={...saved.pointer};this.parallax={...saved.parallax};this.placeCamera(saved.camera.yaw,saved.camera.polar);}
      this.hero=null;
    }
    this.lastTime=null;this.applyLoopPose();this.render();
  }
  inspectPart(id:string){
    const part=getPartTelemetry(id);
    if(isInteriorPart(id)||prefersRearView(id))this.setInspectionMode("cutaway");
    if(this.mode==="cutaway"){
      const panel=/^housing-panel-([0-3])$/.exec(id);
      if(panel){const i=Number(panel[1]);this.placeCamera(i===0||i===3?Math.PI/3:-Math.PI/3,Math.PI/2+(i<2?-.32:.32));}
      else this.placeCamera(prefersRearView(id)?Math.PI:LENS_INTERIOR_YAW,BASE_POLAR);
      this.render();
    }
    return part;
  }
  resize(width:number,height:number){
    if(this.disposed||!this.renderer)return;
    this.viewport={width:Math.max(1,finite(width,1)),height:Math.max(1,finite(height,1))};
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height);
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;this.camera.updateProjectionMatrix();
    this.resizeBuffer();if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed&&this.mode==="hero")this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number,reveal=true){
    if(this.disposed)return;
    if(reveal)this.setInspectionMode("cutaway");
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){this.explode=this.explodeTarget;this.applyLoopPose();this.render();}
  }
  setFocusTarget(radians:number){
    if(this.disposed)return;this.focusTarget=THREE.MathUtils.clamp(finite(radians),-Math.PI/2,Math.PI/2);
    if(!this.running){this.focus=this.focusTarget;this.applyLoopPose();this.render();}
  }
  pickAtNormalizedCanvas(nx:number,ny:number){
    if(this.disposed||this.contextLost||!this.model||!this.runtime)return getPartTelemetry(null);
    this.scene.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(normalizePointer(nx),normalizePointer(ny)),this.camera);
    const hit=this.raycaster.intersectObject(this.model,true)[0];const part=getPartTelemetry(this.runtime.pickPart(hit?.object??null)?.name??null);
    this.options.onPartChange?.(part);return part;
  }
  private placeCamera(yaw:number,polar:number){
    const angle=finite(yaw,BASE_YAW);
    this.camera.position.setFromSphericalCoords(RADIUS,THREE.MathUtils.clamp(finite(polar,BASE_POLAR),Math.PI*.2,Math.PI*.8),Math.atan2(Math.sin(angle),Math.cos(angle)));
    this.camera.lookAt(0,0,0);this.placingCamera=true;this.controls?.update();this.placingCamera=false;
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||this.contextLost)return;const p=this.cameraPose();
    this.placeCamera(p.yaw+finite(deltaYaw),p.polar+finite(deltaPitch));if(this.mode==="hero")this.captureOrbit();this.render();
  }
  resetView(){
    if(this.disposed)return;
    this.mode="hero";this.hero=null;this.elapsed=0;this.lastTime=null;this.orbit={yaw:0,polar:0};
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};this.explode=this.explodeTarget=0;this.focus=this.focusTarget=0;
    this.applyLoopPose();this.placeCamera(BASE_YAW,BASE_POLAR);this.render();
  }
  start(){
    if(this.disposed||!this.renderer)return;this.running=true;this.lastTime=null;
    if(this.controls)this.controls.enabled=!this.contextLost;if(!this.contextLost)this.renderer.setAnimationLoop(this.tick);
  }
  stop(allowInteraction=false){
    this.running=false;this.lastTime=null;this.renderer?.setAnimationLoop(null);
    if(this.controls)this.controls.enabled=allowInteraction&&!this.contextLost;
  }
  private tick=(time:number)=>{
    if(!this.running||this.disposed||this.contextLost||!this.renderer||!this.model||!this.runtime)return;
    const realDelta=this.lastTime===null?0:Math.max(0,(time-this.lastTime)/1000),delta=Math.min(.1,realDelta);this.lastTime=time;
    if(!this.dragging&&this.mode==="hero")this.elapsed+=realDelta;
    const damp=1-Math.exp(-5*delta);this.explode+=(this.explodeTarget-this.explode)*damp;this.focus+=(this.focusTarget-this.focus)*damp;
    if(this.mode==="hero"){
      this.parallax.y+=((this.dragging?0:this.pointer.x*.14)-this.parallax.y)*damp;
      this.parallax.x+=((this.dragging?0:-this.pointer.y*.1)-this.parallax.x)*damp;
    }
    this.applyLoopPose();this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;this.options.onFps?.(Math.round(fps));this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    this.render();
  };
  private applyLoopPose(){
    if(!this.model||!this.runtime)return;
    const seconds=this.mode==="cutaway"?12:this.elapsed,transform=getLensTransformationPose(seconds);
    const ambient=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    this.runtime.setTransformationPose(transform);this.runtime.setExplode(this.mode==="cutaway"?this.explode:0);this.runtime.setFocusRing(this.focus);this.runtime.setAmbientPose(ambient);
    const parallax=this.mode==="hero"?transform.ambientWeight:0;
    this.model.rotation.set(ambient.pitch+this.parallax.x*parallax,ambient.yaw+this.parallax.y*parallax,ambient.spin);
    if(this.mode==="hero"&&!this.dragging){const view=this.automaticCamera();this.placeCamera(view.yaw+this.orbit.yaw,view.polar+this.orbit.polar);}
  }
  private render(){if(this.renderer&&!this.contextLost)this.renderer.render(this.scene,this.camera);}
  private onControlChange=()=>{if(!this.running&&!this.placingCamera)this.render();};
  private onDragStart=()=>{this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{if(this.mode==="hero")this.captureOrbit();this.dragging=false;this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;if(this.dragging&&this.mode==="hero")this.captureOrbit();this.dragging=false;
    this.contextLost=true;this.renderer?.setAnimationLoop(null);this.lastTime=null;if(this.controls)this.controls.enabled=false;
    this.options.onContextChange?.("lost");
  };
  private onRestored=()=>{
    if(this.disposed||!this.renderer)return;
    try{
      this.contextLost=false;this.environment?.dispose();this.environment=createStudioEnvironment(this.renderer,true);this.scene.environment=this.environment.texture;
      this.rebuildModel();this.configureControls(this.renderer.domElement);this.resizeBuffer();this.applyLoopPose();this.render();
      this.options.onContextChange?.("restored");if(this.running)this.start();
    }catch{this.contextLost=true;this.stop();this.options.onContextChange?.("lost");}
  };
  dispose(){
    if(this.disposed)return;this.stop();this.disposed=true;this.releaseControls();const renderer=this.renderer;
    if(renderer){
      renderer.domElement.removeEventListener("webglcontextlost",this.onLost);renderer.domElement.removeEventListener("webglcontextrestored",this.onRestored);
      this.runtime?.dispose();this.environment?.dispose();this.scene.clear();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    }
    this.renderer=null;this.runtime=null;this.model=null;this.environment=null;
  }
}
