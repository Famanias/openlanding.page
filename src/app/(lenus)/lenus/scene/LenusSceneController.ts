import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createOpticalLensModel, type LensRuntime } from "../model/createOpticalLensModel";
import { createStudioEnvironment } from "../model/studioEnvironment";
import { advanceTransformationProgress, getLensDeploymentPose, getLensTransformationPose, LENS_INTERIOR_YAW } from "../model/lensTransformation";
import { getPartTelemetry, isInteriorPart, prefersRearView, type LenusPartInfo } from "./telemetry";
import { getLensLoopPose } from "./lensMotion";
import {blendStoryPose,sampleStoryPose,type EngineStoryPose,type StoryInput} from "../story/chapterPoseMap";
import {CAPABILITIES,type NarrativeRenderFrame} from "../story/projectedAnchors";
import {interactionWeight,smooth} from "../story/storyMath";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value:number){return Number.isFinite(value)?THREE.MathUtils.clamp(value,-1,1):0;}
export function fitHeroFrustumHalfHeight(width:number,height:number,inspection=false){
  const aspect=Math.max(1,Number.isFinite(width)?width:1)/Math.max(1,Number.isFinite(height)?height:1);
  const extent=inspection?4.3:3.7;
  return Math.max(extent,extent/aspect);
}
const BASE_YAW=-.46,BASE_POLAR=Math.PI/2-.14,RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
const normalizeProgress=(value:number)=>THREE.MathUtils.clamp(finite(value),0,1);
type CameraPose={yaw:number;polar:number};
type OrbitOffset={yaw:number;polar:number};
type ManualTransformation={progress:number;target:number;direction:1|-1;wideFrame:boolean};
type HeroView={elapsed:number;camera:CameraPose;orbit:OrbitOffset;pointer:{x:number;y:number};parallax:{x:number;y:number};transformation?:ManualTransformation|null;manualExplode?:number};
export type LensInspectionMode="hero"|"cutaway";
type ControlSnapshot={mode:LensInspectionMode;camera:CameraPose;orbit:OrbitOffset;pointer?:{x:number;y:number};parallax?:{x:number;y:number};transformation?:ManualTransformation|null;hero:HeroView|null;controls:{explode:number;focus:number;currentExplode?:number;currentFocus?:number}};
type StoryOverride={origin:number;frame:EngineStoryPose;kind:"drag"|"slider"|"inspect";entry:number;release:number;releasing:boolean;camera?:CameraPose};
type NarrativeMemory={input:StoryInput;hero:{frame:EngineStoryPose;controls:ControlSnapshot;elapsed:number}|null;override:StoryOverride|null};
export type LenusInspectionSnapshot=ControlSnapshot&{narrative?:NarrativeMemory|null};
export interface LenusSceneOptions{
  initialAnimationTime?:number;initialResolutionScale?:number;initialInspectionState?:LenusInspectionSnapshot;
  onFps?:(fps:number)=>void;onContextChange?:(state:"lost"|"restored")=>void;
  onInteractionChange?:(dragging:boolean)=>void;onPartChange?:(part:LenusPartInfo)=>void;
  onTransformationChange?:(progress:number,target:number|null,settled:boolean)=>void;
  onNarrativeFrame?:(frame:NarrativeRenderFrame)=>void;
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
  private transformation:ManualTransformation|null=null;private allowManualMotion=false;private animating=false;private publishedTransformation="";
  private explodeTarget=0;private explode=0;private focusTarget=0;private focus=0;
  private elapsed=0;private lastTime:number|null=null;private frames=0;private sampleTime=0;private slowTime=0;
  private resolutionScale=1;private viewport={width:1,height:1};
  private narrative:NarrativeMemory|null=null;private appliedStory:EngineStoryPose|null=null;private presentationSuspended=false;
  private controlGesture=false;
  private readonly storyLights:THREE.DirectionalLight[]=[];
  private outline:THREE.BoxHelper|null=null;private focusedPart:string|null=null;private renderedAt=0;
  private readonly projectedPoint=new THREE.Vector3();
  constructor(private readonly options:LenusSceneOptions={}){
    this.elapsed=Math.max(0,finite(options.initialAnimationTime??0));
    this.resolutionScale=THREE.MathUtils.clamp(finite(options.initialResolutionScale??1,1),.75,1);
    const saved=options.initialInspectionState;
    if(saved){
      this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
      if(saved.transformation)this.transformation={...saved.transformation,progress:normalizeProgress(saved.transformation.progress),target:normalizeProgress(saved.transformation.target)};
      this.pointer={x:normalizePointer(saved.pointer?.x??0),y:normalizePointer(saved.pointer?.y??0)};
      this.parallax={x:finite(saved.parallax?.x??0),y:finite(saved.parallax?.y??0)};
      this.explodeTarget=THREE.MathUtils.clamp(finite(saved.controls.explode),0,1);
      this.focusTarget=THREE.MathUtils.clamp(finite(saved.controls.focus),-Math.PI/2,Math.PI/2);
      this.explode=THREE.MathUtils.clamp(finite(saved.controls.currentExplode??this.explodeTarget),0,1);
      this.focus=THREE.MathUtils.clamp(finite(saved.controls.currentFocus??this.focusTarget),-Math.PI/2,Math.PI/2);
      this.placeCamera(saved.camera.yaw,saved.camera.polar);
    }else{const view=this.automaticCamera();this.placeCamera(view.yaw,view.polar);}
    if(saved?.narrative)this.narrative=structuredClone(saved.narrative);
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
        const light=new THREE.DirectionalLight(color,intensity);light.position.set(position[0],position[1],position[2]);this.scene.add(light);this.storyLights.push(light);
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
    controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;controls.rotateSpeed=.5/Math.max(.35,this.narrative?.input.hero.heightRatio??1);
    controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
    controls.addEventListener("start",this.onDragStart);controls.addEventListener("end",this.onDragEnd);controls.addEventListener("change",this.onControlChange);
    canvas.style.touchAction="pan-y pinch-zoom";
  }
  getRenderer(){return this.renderer;}
  getAnimationTime(){return this.elapsed;}
  getResolutionScale(){return this.resolutionScale;}
  getTransformationProgress(){return this.narrative&&this.appliedStory?this.appliedStory.deployment:this.currentTransformationPose().progress;}
  getTransformationTarget(){return this.transformation?.target??null;}
  getInspectionSnapshot():LenusInspectionSnapshot{
    return {...this.controlSnapshot(),narrative:this.narrative?structuredClone(this.narrative):null};
  }
  private controlSnapshot():ControlSnapshot{
    const camera=this.cameraPose(),base=this.automaticCamera();
    // OrbitControls can be mid-drag, before onDragEnd commits its offset.
    const orbit=this.mode==="hero"?{yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar}:{...this.orbit};
    return {mode:this.mode,camera,orbit,pointer:{...this.pointer},parallax:{...this.parallax},transformation:this.transformation?{...this.transformation}:null,hero:this.hero?structuredClone(this.hero):null,controls:{explode:this.explodeTarget,focus:this.focusTarget,currentExplode:this.explode,currentFocus:this.focus}};
  }
  private restoreControls(saved:ControlSnapshot){
    this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
    this.transformation=saved.transformation?{...saved.transformation}:null;
    this.pointer={...(saved.pointer??{x:0,y:0})};this.parallax={...(saved.parallax??{x:0,y:0})};
    this.explodeTarget=saved.controls.explode;this.explode=saved.controls.currentExplode??this.explodeTarget;
    this.focusTarget=saved.controls.focus;this.focus=saved.controls.currentFocus??this.focusTarget;
    this.placeCamera(saved.camera.yaw,saved.camera.polar);
  }
  setPresentationSuspended(value:boolean){
    if(this.presentationSuspended===value)return;this.presentationSuspended=value;
    if(value){this.renderer?.setAnimationLoop(null);this.animating=false;this.lastTime=null;if(this.controls)this.controls.enabled=false;}
    else{this.resizeBuffer();this.applyLoopPose();this.render();this.updateAnimationLoop();}
  }
  setNarrativeFrame(input:StoryInput){
    const safe={...input,position:THREE.MathUtils.clamp(finite(input.position),0,6),progress:normalizeProgress(input.progress)};
    const previous=this.narrative?.input.position??0;
    if(!this.narrative)this.narrative={input:safe,hero:null,override:null};
    if(previous<=.00001&&safe.position>.00001&&!this.narrative.hero)this.narrative.hero={frame:structuredClone(this.appliedStory??this.legacyStoryPose()),controls:this.controlSnapshot(),elapsed:this.elapsed};
    if(previous>.00001&&safe.position<=.00001&&this.narrative.hero){const saved=this.narrative.hero;this.restoreControls(saved.controls);this.elapsed=saved.elapsed;this.narrative.hero=null;this.narrative.override=null;}
    this.narrative.input=safe;
    if(this.controls)this.controls.rotateSpeed=.5/Math.max(.35,safe.hero.heightRatio??1);
    if(!this.presentationSuspended&&!this.running){this.applyLoopPose();this.render();}
  }
  focusPart(id:string|null){
    this.focusedPart=id&&this.runtime?.nodes[id]?id:null;
    if(this.focusedPart&&!this.outline){this.outline=new THREE.BoxHelper(this.runtime!.nodes[this.focusedPart],0xD2F802);const material=this.outline.material as THREE.Material;material.transparent=true;material.opacity=.65;material.depthTest=false;material.depthWrite=false;this.outline.renderOrder=50;this.scene.add(this.outline);}
    if(this.outline)this.outline.visible=!!this.focusedPart;
    if(this.narrative)this.applyLoopPose();this.render();
  }
  releaseInteraction(){if(this.narrative?.override){this.narrative.override.releasing=true;this.narrative.override.release=0;this.updateAnimationLoop();}this.focusPart(null);}
  setControlGesture(active:boolean){
    if(this.controlGesture===active)return;
    if(active){this.beginStoryInteraction("slider");this.controlGesture=true;}else{this.controlGesture=false;this.finishStoryGesture();}
    this.updateAnimationLoop();
  }
  private finishStoryGesture(){
    const o=this.narrative?.override;if(!o||!this.appliedStory)return;
    o.origin=this.narrative!.input.position;o.frame=structuredClone(this.appliedStory);o.entry=1;
    if(this.transformation)this.transformation.progress=this.appliedStory.deployment;
    this.explode=this.appliedStory.separation;this.focus=this.appliedStory.focus;this.captureOrbit();
    if(o.origin<3.55||o.origin>4.45){o.releasing=true;o.release=0;}
  }
  private storyActive(){return !!this.narrative&&this.narrative.input.position>.00001;}
  private beginStoryInteraction(kind:StoryOverride["kind"]){
    if(this.disposed||!this.storyActive()||!this.appliedStory)return false;
    const existing=this.narrative!.override;if(existing&&!existing.releasing&&existing.kind===kind&&(this.dragging||this.controlGesture||interactionWeight(this.narrative!.input.position,existing.origin,1,0)>.98))return true;
    const frame=structuredClone(this.appliedStory),camera=this.cameraPose();
    this.mode="hero";this.hero=null;this.transformation={progress:frame.deployment,target:frame.deployment,direction:1,wideFrame:false};
    this.explode=this.explodeTarget=frame.separation;this.focus=this.focusTarget=frame.focus;
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    this.narrative!.override={origin:this.narrative!.input.position,frame,kind,entry:kind==="drag"?1:0,release:0,releasing:false};
    return true;
  }
  private hasStoryMotion(){const o=this.narrative?.override;return !!o&&(o.entry<1||(o.releasing&&o.release<1));}
  private legacyStoryPose():EngineStoryPose{
    const transform=this.currentTransformationPose(),a=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    if(this.transformation){const w=getLensTransformationPose(this.elapsed).ambientWeight,r=w>.0001?transform.ambientWeight/w:0;for(const key of ["spin","yaw","pitch","collar","shardOrbit","shardY"] as const)a[key]*=r;}
    const base=this.automaticCamera(),camera=this.mode==="cutaway"||this.dragging?this.cameraPose():{yaw:base.yaw+this.orbit.yaw,polar:base.polar+this.orbit.polar};
    const hero=this.narrative?.input.hero??{x:.72,y:.46,scale:.68};
    const sweep=.25*Math.sin(Math.PI*Math.min(1,this.elapsed/1.2))**2;
    return {deployment:transform.progress,separation:this.mode==="cutaway"||this.transformation?this.explode:0,focus:this.focus,scale:hero.scale*((this.mode==="cutaway"||this.transformation?.wideFrame)?3.7/4.3:1),x:hero.x,y:hero.y,yaw:camera.yaw,polar:camera.polar,distance:12,rotation:[a.pitch+this.parallax.x*transform.ambientWeight,a.yaw+this.parallax.y*transform.ambientWeight,a.spin],violet:1,lime:1,key:1+sweep*.4,exposure:1,sweep,collarIdle:a.collar,shardOrbit:a.shardOrbit,shardY:a.shardY};
  }
  private applyNarrativePose(){
    const story=this.narrative!,input=story.input,legacy=this.legacyStoryPose();
    let pose=legacy,manual=!this.storyActive()&&(this.mode==="cutaway"||!!this.transformation),inspection=this.mode==="cutaway";
    if(this.storyActive()){
      const base=story.hero?.frame??legacy;
      pose=blendStoryPose(base,sampleStoryPose(input),smooth((input.position-.08)/.92));
      const o=story.override;
      if(o){
        const weight=interactionWeight(input.position,o.origin,o.entry,o.release,this.dragging||this.controlGesture);
        const camera=this.dragging?this.cameraPose():o.camera??{yaw:legacy.yaw,polar:legacy.polar};
        const desired={...o.frame,deployment:legacy.deployment,separation:legacy.separation,focus:legacy.focus,yaw:camera.yaw,polar:camera.polar};
        pose=blendStoryPose(pose,blendStoryPose(o.frame,desired,smooth(o.entry)),weight);
        manual=!o.releasing&&(this.dragging||this.controlGesture||interactionWeight(input.position,o.origin,1,0)>.02);inspection=manual&&o.kind==="inspect";
      }else inspection=false;
    }
    this.appliedStory=pose;
    this.publishTransformation(pose.deployment,manual?this.getTransformationTarget():null,!this.hasManualMotion()&&!this.hasStoryMotion());
    if(!this.model||!this.runtime)return;
    this.runtime.setTransformationPose(getLensDeploymentPose(pose.deployment));this.runtime.setExplode(pose.separation);this.runtime.setFocusRing(pose.focus);
    this.runtime.setAmbientPose({collar:pose.collarIdle,shardOrbit:pose.shardOrbit,shardY:pose.shardY});
    this.model.quaternion.setFromEuler(new THREE.Euler(...pose.rotation));this.model.scale.setScalar(pose.scale);
    if(!this.dragging)this.placeCamera(pose.yaw,pose.polar,pose.distance);
    this.camera.updateMatrixWorld(true);
    const right=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,0),up=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,1);
    this.model.position.copy(right.multiplyScalar((pose.x*2-1)*this.camera.right)).add(up.multiplyScalar((1-pose.y*2)*this.camera.top));
    this.model.updateMatrixWorld(true);
    for(const [i,light]of this.storyLights.entries())light.intensity=[3*pose.key,1.4*pose.key,1.8*pose.lime,1.5*pose.violet][i];
    this.storyLights[0]?.position.set(-3+pose.sweep*2,5,4-pose.sweep);
    if(this.renderer)this.renderer.toneMappingExposure=pose.exposure;
    this.storyFrameFlags={manual,inspection};
  }
  private storyFrameFlags={manual:false,inspection:false};
  private publishTransformation(progress:number,target:number|null,settled:boolean){
    const key=`${Math.round(progress*100)}:${target}:${settled}`;
    if(key!==this.publishedTransformation){this.publishedTransformation=key;this.options.onTransformationChange?.(progress,target,settled);}
  }
  private cameraPose():CameraPose{const p=new THREE.Spherical().setFromVector3(this.camera.position);return {yaw:p.theta,polar:p.phi};}
  private automaticCamera():CameraPose{
    const blend=this.currentTransformationPose().cameraBlend;
    return {yaw:BASE_YAW+(LENS_INTERIOR_YAW-BASE_YAW)*blend,polar:BASE_POLAR};
  }
  private captureOrbit(){const view=this.cameraPose(),base=this.automaticCamera();this.orbit={yaw:view.yaw-base.yaw,polar:view.polar-base.polar};}
  setInspectionMode(mode:LensInspectionMode){
    if(this.storyActive()){
      if(mode==="hero"){this.releaseInteraction();return;}
      this.beginStoryInteraction("inspect");
      if(this.transformation)this.transformation.target=1;
      if(this.narrative?.override)this.narrative.override.camera={yaw:LENS_INTERIOR_YAW,polar:BASE_POLAR};
      this.applyLoopPose();this.render();this.updateAnimationLoop();return;
    }
    if(this.disposed||mode===this.mode)return;
    if(mode==="cutaway"){
      if(this.dragging)this.captureOrbit();
      this.hero={elapsed:this.elapsed,camera:this.cameraPose(),orbit:{...this.orbit},pointer:{...this.pointer},parallax:{...this.parallax},transformation:this.transformation?{...this.transformation}:null,manualExplode:this.explode};
      this.transformation=null;
      this.mode=mode;this.placeCamera(LENS_INTERIOR_YAW,BASE_POLAR);
    }else{
      this.mode="hero";
      if(this.hero){const saved=this.hero;this.elapsed=saved.elapsed;this.orbit={...saved.orbit};this.pointer={...saved.pointer};this.parallax={...saved.parallax};this.transformation=saved.transformation?{...saved.transformation}:null;if(this.transformation){this.explode=saved.manualExplode??0;this.explodeTarget=0;}this.placeCamera(saved.camera.yaw,saved.camera.polar);}
      this.hero=null;
    }
    this.lastTime=null;this.applyLoopPose();this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  setTransformationTarget(amount:number){
    if(this.disposed)return;
    this.beginStoryInteraction("slider");
    const progress=this.getTransformationProgress(),target=normalizeProgress(amount),camera=this.cameraPose();
    const wideFrame=this.mode==="cutaway"||!!this.transformation?.wideFrame;
    if(this.mode==="hero"&&!this.transformation)this.explode=0;
    this.mode="hero";this.hero=null;
    this.transformation={progress,target,direction:target>=progress?1:-1,wideFrame};
    this.explodeTarget=0;
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    // Preserve the existing projection and drawing buffer while scrubbing.
    this.applyLoopPose();this.render();this.updateAnimationLoop();
  }
  resumeTransformationLoop(){
    if(this.storyActive()){this.releaseInteraction();return;}
    if(this.disposed||!this.transformation)return;
    const {progress,direction}=this.transformation,camera=this.cameraPose();
    const rotation=this.model?.rotation.clone();
    this.elapsed=progress===0?0:progress===1?(direction<0?15:10):direction>0?3+7*progress:22-7*progress;
    this.transformation=null;this.hero=null;this.mode="hero";
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    const ambient=getLensLoopPose(this.elapsed),weight=getLensTransformationPose(this.elapsed).ambientWeight;
    if(rotation&&weight>.0001){this.parallax.x=(rotation.x-ambient.pitch)/weight;this.parallax.y=(rotation.y-ambient.yaw)/weight;}
    this.lastTime=null;this.applyLoopPose();this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  private currentTransformationPose(){return this.mode==="cutaway"?getLensDeploymentPose(1):this.transformation?getLensDeploymentPose(this.transformation.progress):getLensTransformationPose(this.elapsed);}
  private hasManualMotion(){return !!this.transformation&&(this.transformation.progress!==this.transformation.target||Math.abs(this.explode-this.explodeTarget)>.0001);}
  private updateAnimationLoop(){
    if(!this.renderer||this.disposed||this.contextLost||this.presentationSuspended)return;
    const active=this.running||(this.allowManualMotion&&(this.hasManualMotion()||this.hasStoryMotion()));
    if(active!==this.animating){this.animating=active;this.lastTime=null;this.renderer.setAnimationLoop(active?this.tick:null);}
  }
  inspectPart(id:string){
    const part=getPartTelemetry(id);
    if(this.storyActive()){
      this.beginStoryInteraction("inspect");if(this.transformation)this.transformation.target=1;
      if(this.narrative?.override)this.narrative.override.camera={yaw:prefersRearView(id)?Math.PI:LENS_INTERIOR_YAW,polar:BASE_POLAR};
      this.focusPart(id==="assembly"?null:id);
      this.applyLoopPose();this.render();this.updateAnimationLoop();return part;
    }
    this.focusPart(id==="assembly"?null:id);
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
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height,!this.narrative&&(this.mode==="cutaway"||!!this.transformation?.wideFrame));
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;this.camera.updateProjectionMatrix();
    this.resizeBuffer();this.applyLoopPose();if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost||this.presentationSuspended)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.narrative?.input.compact?1:1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed&&this.mode==="hero"&&!this.transformation)this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number,reveal=true){
    if(this.disposed)return;
    if(this.storyActive()&&reveal){
      this.beginStoryInteraction("slider");if(this.transformation)this.transformation.target=1;
      this.explodeTarget=normalizeProgress(amount);this.applyLoopPose();this.render();this.updateAnimationLoop();return;
    }
    if(reveal)this.setInspectionMode("cutaway");
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){this.explode=this.explodeTarget;this.applyLoopPose();this.render();}
  }
  setFocusTarget(radians:number){
    this.beginStoryInteraction("slider");
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
  private placeCamera(yaw:number,polar:number,distance=RADIUS){
    const angle=finite(yaw,BASE_YAW);
    this.camera.position.setFromSphericalCoords(distance,THREE.MathUtils.clamp(finite(polar,BASE_POLAR),Math.PI*.2,Math.PI*.8),Math.atan2(Math.sin(angle),Math.cos(angle)));
    this.camera.lookAt(0,0,0);this.placingCamera=true;this.controls?.update();this.placingCamera=false;
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||this.contextLost)return;this.beginStoryInteraction("drag");const p=this.cameraPose();
    this.placeCamera(p.yaw+finite(deltaYaw),p.polar+finite(deltaPitch));if(this.mode==="hero")this.captureOrbit();
    if(this.narrative){this.applyLoopPose();if(this.storyActive()&&(this.narrative.input.position<3.55||this.narrative.input.position>4.45))this.releaseInteraction();}
    this.render();this.updateAnimationLoop();
  }
  resetView(){
    if(this.disposed)return;
    if(this.storyActive()){this.narrative!.override=null;this.focusPart(null);this.applyLoopPose();this.render();return;}
    this.mode="hero";this.hero=null;this.transformation=null;this.elapsed=0;this.lastTime=null;this.orbit={yaw:0,polar:0};
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};this.explode=this.explodeTarget=0;this.focus=this.focusTarget=0;
    this.applyLoopPose();this.placeCamera(BASE_YAW,BASE_POLAR);this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  start(){
    if(this.disposed||!this.renderer)return;if(!this.running)this.lastTime=null;this.running=true;this.allowManualMotion=true;
    if(this.controls)this.controls.enabled=!this.contextLost;this.updateAnimationLoop();
  }
  stop(allowInteraction=false){
    if(this.running)this.lastTime=null;this.running=false;this.allowManualMotion=allowInteraction;
    if(!this.disposed)this.updateAnimationLoop();
    if(this.controls)this.controls.enabled=allowInteraction&&!this.contextLost;
  }
  private tick=(time:number)=>{
    if((!this.running&&!(this.allowManualMotion&&(this.hasManualMotion()||this.hasStoryMotion())))||this.disposed||this.contextLost||this.presentationSuspended||!this.renderer||!this.model||!this.runtime)return;
    if(this.narrative&&this.lastTime!==null&&time-this.renderedAt<15)return;this.renderedAt=time;
    const realDelta=this.lastTime===null?0:Math.max(0,(time-this.lastTime)/1000),delta=Math.min(.1,realDelta);this.lastTime=time;
    if(this.running&&!this.dragging&&this.mode==="hero"&&!this.transformation&&!this.storyActive())this.elapsed+=realDelta;
    const override=this.narrative?.override;if(override){override.entry=Math.min(1,override.entry+delta*2.5);if(override.releasing)override.release=Math.min(1,override.release+delta*1.4);}
    if(this.transformation&&!this.dragging)this.transformation.progress=advanceTransformationProgress(this.transformation.progress,this.transformation.target,delta);
    const damp=1-Math.exp(-5*delta);this.explode+=(this.explodeTarget-this.explode)*damp;this.focus+=(this.focusTarget-this.focus)*damp;
    if(Math.abs(this.explode-this.explodeTarget)<.0001)this.explode=this.explodeTarget;
    if(this.mode==="hero"&&!this.transformation){
      this.parallax.y+=((this.dragging?0:this.pointer.x*.14)-this.parallax.y)*damp;
      this.parallax.x+=((this.dragging?0:-this.pointer.y*.1)-this.parallax.x)*damp;
    }
    this.applyLoopPose();this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;this.options.onFps?.(Math.round(fps));this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    this.render();if(!this.running)this.updateAnimationLoop();
  };
  private applyLoopPose(){
    if(this.narrative){this.applyNarrativePose();return;}
    const transform=this.currentTransformationPose(),target=this.getTransformationTarget();
    this.publishTransformation(transform.progress,target,!this.hasManualMotion());
    if(!this.model||!this.runtime)return;
    const ambient=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    if(this.transformation){const originalWeight=getLensTransformationPose(this.elapsed).ambientWeight,ratio=originalWeight>.0001?transform.ambientWeight/originalWeight:0;for(const key of ["spin","yaw","pitch","collar","shardOrbit","shardY"] as const)ambient[key]*=ratio;}
    this.runtime.setTransformationPose(transform);this.runtime.setExplode(this.mode==="cutaway"||this.transformation?this.explode:0);this.runtime.setFocusRing(this.focus);this.runtime.setAmbientPose(ambient);
    const parallax=this.mode==="hero"?transform.ambientWeight:0;
    this.model.rotation.set(ambient.pitch+this.parallax.x*parallax,ambient.yaw+this.parallax.y*parallax,ambient.spin);
    if(this.mode==="hero"&&!this.dragging){const view=this.automaticCamera();this.placeCamera(view.yaw+this.orbit.yaw,view.polar+this.orbit.polar);}
  }
  private render(){
    if(!this.renderer||this.contextLost||this.presentationSuspended)return;
    if(this.outline&&this.focusedPart&&this.runtime?.nodes[this.focusedPart]){
      const node=this.runtime.nodes[this.focusedPart];node.traverse(o=>{if((o as THREE.InstancedMesh).isInstancedMesh)(o as THREE.InstancedMesh).computeBoundingBox();});this.outline.setFromObject(node);
    }
    this.renderer.render(this.scene,this.camera);
    if(this.narrative&&this.appliedStory&&this.runtime){
      const anchors=CAPABILITIES.map(a=>{const node=a.socket?this.runtime!.sockets[a.socket]:this.runtime!.nodes[a.part];if(!node)return {id:a.id,x:0,y:0,visible:false};this.projectedPoint.set(a.point[0],a.point[1],a.point[2]);node.localToWorld(this.projectedPoint);this.projectedPoint.project(this.camera);return {id:a.id,x:(this.projectedPoint.x+1)*.5*this.viewport.width,y:(1-this.projectedPoint.y)*.5*this.viewport.height,visible:Math.abs(this.projectedPoint.x)<1.05&&Math.abs(this.projectedPoint.y)<1.05};});
      this.options.onNarrativeFrame?.({position:this.narrative.input.position,progress:this.narrative.input.progress,pose:this.appliedStory,anchors,...this.storyFrameFlags});
    }
  }
  private onControlChange=()=>{if(!this.running&&!this.placingCamera){if(this.narrative)this.applyLoopPose();this.render();}};
  private onDragStart=()=>{this.beginStoryInteraction("drag");this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{if(this.mode==="hero")this.captureOrbit();this.dragging=false;if(this.storyActive())this.finishStoryGesture();this.updateAnimationLoop();this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;if(this.dragging&&this.mode==="hero")this.captureOrbit();this.dragging=false;
    this.contextLost=true;this.controlGesture=false;this.animating=false;this.renderer?.setAnimationLoop(null);this.lastTime=null;if(this.controls)this.controls.enabled=false;
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
      this.runtime?.dispose();this.environment?.dispose();this.outline?.dispose();this.scene.clear();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    }
    this.renderer=null;this.runtime=null;this.model=null;this.environment=null;
  }
}
