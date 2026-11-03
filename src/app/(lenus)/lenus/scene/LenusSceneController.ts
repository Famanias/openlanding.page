import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createOpticalLensModel, type LensRuntime } from "../model/createOpticalLensModel";
import { createStudioEnvironment } from "../model/studioEnvironment";
import { getPartTelemetry, type LenusPartInfo } from "./telemetry";
import { getLensLoopPose } from "./lensMotion";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value: number) { return Number.isFinite(value) ? THREE.MathUtils.clamp(value,-1,1) : 0; }
export function fitHeroFrustumHalfHeight(width: number, height: number) {
  const aspect = Math.max(1,Number.isFinite(width)?width:1) / Math.max(1,Number.isFinite(height)?height:1);
  return Math.max(2.75,2.75/aspect);
}
const BASE_YAW=-.46, BASE_POLAR=Math.PI/2-.14, RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
export interface LenusSceneOptions {
  initialAnimationTime?: number;
  initialResolutionScale?: number;
  onFps?: (fps:number)=>void;
  onContextChange?: (state:"lost"|"restored")=>void;
  onInteractionChange?: (dragging:boolean)=>void;
  onPartChange?: (part:LenusPartInfo)=>void;
}

/** Owns the canvas, GPU resources and render clock; no browser work occurs in construction. */
export class LenusSceneController {
  private readonly scene=new THREE.Scene();
  private readonly camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,60);
  private readonly raycaster=new THREE.Raycaster();
  private renderer:THREE.WebGLRenderer|null=null;
  private controls:OrbitControls|null=null;
  private environment:THREE.WebGLRenderTarget|null=null;
  private model:THREE.Group|null=null;
  private runtime:LensRuntime|null=null;
  private disposed=false;
  private running=false;
  private contextLost=false;
  private dragging=false;
  private pointer={x:0,y:0};
  private parallax={x:0,y:0};
  private explodeTarget=0;
  private explode=0;
  private focusTarget=0;
  private focus=0;
  private elapsed=0;
  private lastTime:number|null=null;
  private frames=0;
  private sampleTime=0;
  private slowTime=0;
  private resolutionScale=1;
  private viewport={width:1,height:1};
  constructor(private readonly options:LenusSceneOptions={}) {
    this.elapsed=Math.max(0,finite(options.initialAnimationTime??0));
    this.resolutionScale=THREE.MathUtils.clamp(finite(options.initialResolutionScale??1,1),.75,1);
  }

  init(container:HTMLElement) {
    if(this.disposed||this.renderer)return;
    try {
      const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});
      this.renderer=renderer;
      renderer.setClearColor(0x000000,0);
      renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure=1;
      const canvas=renderer.domElement;
      canvas.dataset.lenusRenderer="true";
      canvas.setAttribute("aria-hidden","true");
      canvas.addEventListener("webglcontextlost",this.onLost);
      canvas.addEventListener("webglcontextrestored",this.onRestored);
      container.appendChild(canvas);
      this.scene.background=null;
      this.environment=createStudioEnvironment(renderer,true);
      this.scene.environment=this.environment.texture;
      this.model=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"high"});
      this.runtime=this.model.userData.sculptRuntime as LensRuntime;
      this.applyLoopPose();
      this.scene.add(this.model,new THREE.HemisphereLight(0xe5eeff,0x282631,2));
      for(const [color,intensity,position] of [
        [0xffffff,3,[-3,5,4]],[0xdde4ff,1.4,[3,0,-4]],
        [0xD2F802,1.8,[-4,4,-.4]],[0xA855F7,1.5,[4,-3,-.4]],
      ] as const) {
        const light=new THREE.DirectionalLight(color,intensity);
        light.position.set(position[0],position[1],position[2]);this.scene.add(light);
      }
      this.placeCamera(BASE_YAW,BASE_POLAR);
      const controls=new OrbitControls(this.camera,canvas);
      this.controls=controls;
      controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;
      controls.rotateSpeed=.5;
      controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
      // OrbitControls normalizes bounds outside ±π; base±π wraps both to the same rear angle.
      controls.minAzimuthAngle=-Math.PI;controls.maxAzimuthAngle=Math.PI;
      controls.addEventListener("start",this.onDragStart);
      controls.addEventListener("end",this.onDragEnd);
      // Preserve vertical page scrolling on touch; horizontal drags still inspect the lens.
      canvas.style.touchAction="pan-y pinch-zoom";
      const bounds=container.getBoundingClientRect();
      this.resize(bounds.width,bounds.height);
    } catch(error) { this.dispose();throw error; }
  }
  getRenderer(){return this.renderer;}
  getAnimationTime(){return this.elapsed;}
  getResolutionScale(){return this.resolutionScale;}
  resize(width:number,height:number){
    if(this.disposed||!this.renderer)return;
    this.viewport={width:Math.max(1,finite(width,1)),height:Math.max(1,finite(height,1))};
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height);
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;
    this.camera.updateProjectionMatrix();
    this.resizeBuffer();
    if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed)this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number){
    if(this.disposed)return;
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){
      this.explode=this.explodeTarget;this.runtime?.setExplode(this.explode);
      this.applyLoopPose();
      this.render();
    }
  }
  setFocusTarget(radians:number){
    if(this.disposed)return;
    this.focusTarget=THREE.MathUtils.clamp(finite(radians),-Math.PI/2,Math.PI/2);
    if(!this.running){this.focus=this.focusTarget;this.runtime?.setFocusRing(this.focus);this.applyLoopPose();this.render();}
  }
  pickAtNormalizedCanvas(nx:number,ny:number){
    if(this.disposed||this.contextLost||!this.model||!this.runtime)return getPartTelemetry(null);
    this.scene.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(normalizePointer(nx),normalizePointer(ny)),this.camera);
    const hit=this.raycaster.intersectObject(this.model,true)[0];
    const part=getPartTelemetry(this.runtime.pickPart(hit?.object??null)?.name??null);
    this.options.onPartChange?.(part);return part;
  }
  private placeCamera(yaw:number,polar:number){
    this.camera.position.setFromSphericalCoords(RADIUS,polar,yaw);this.camera.lookAt(0,0,0);
    this.controls?.update();
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||!this.renderer||this.contextLost)return;
    const p=new THREE.Spherical().setFromVector3(this.camera.position);
    this.placeCamera(THREE.MathUtils.clamp(p.theta+finite(deltaYaw),-Math.PI,Math.PI),THREE.MathUtils.clamp(p.phi+finite(deltaPitch),Math.PI*.2,Math.PI*.8));
    this.render();
  }
  resetView(){
    if(this.disposed)return;
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};this.setExplodeTarget(0);this.setFocusTarget(0);
    if(!this.renderer)return;
    this.applyLoopPose();this.placeCamera(BASE_YAW,BASE_POLAR);
    if(!this.contextLost)this.render();
  }
  start(){
    if(this.disposed||!this.renderer)return;
    this.running=true;this.lastTime=null;
    if(this.controls)this.controls.enabled=!this.contextLost;
    if(!this.contextLost)this.renderer.setAnimationLoop(this.tick);
  }
  stop(){
    this.running=false;this.lastTime=null;this.renderer?.setAnimationLoop(null);
    if(this.controls)this.controls.enabled=false;
  }
  private tick=(time:number)=>{
    if(!this.running||this.disposed||this.contextLost||!this.renderer||!this.model||!this.runtime)return;
    const delta=this.lastTime===null?0:Math.min(.1,(time-this.lastTime)/1000);
    const realDelta=this.lastTime===null?0:(time-this.lastTime)/1000;
    this.lastTime=time;
    if(!this.dragging)this.elapsed+=Math.max(0,realDelta);
    const damp=1-Math.exp(-5*delta);
    this.explode+=(this.explodeTarget-this.explode)*damp;
    this.focus+=(this.focusTarget-this.focus)*damp;
    this.runtime.setExplode(this.explode);this.runtime.setFocusRing(this.focus);
    this.parallax.y+=((this.dragging?0:this.pointer.x*.14)-this.parallax.y)*damp;
    this.parallax.x+=((this.dragging?0:-this.pointer.y*.1)-this.parallax.x)*damp;
    this.applyLoopPose();
    this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;
      this.options.onFps?.(Math.round(fps));
      this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    // A buffer resize clears its pixels; render afterwards so pausing cannot freeze a blank frame.
    this.render();
  };
  private applyLoopPose(){
    if(!this.model||!this.runtime)return;
    const pose=getLensLoopPose(this.elapsed);
    this.model.rotation.set(pose.pitch+this.parallax.x,pose.yaw+this.parallax.y,pose.spin);
    const collar=this.runtime.nodes["collar-inner"];
    if(collar)collar.rotation.z=pose.collar;
    const shards=this.runtime.nodes.shards;
    if(shards){shards.position.y=pose.shardY;shards.rotation.z=this.focus+pose.shardOrbit;}
  }
  private render(){if(this.renderer&&!this.contextLost)this.renderer.render(this.scene,this.camera);}
  private onDragStart=()=>{this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{this.dragging=false;this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;
    this.contextLost=true;this.renderer?.setAnimationLoop(null);this.lastTime=null;
    this.options.onContextChange?.("lost");
  };
  private onRestored=()=>{
    if(this.disposed||!this.renderer)return;
    this.contextLost=false;this.environment?.dispose();
    this.environment=createStudioEnvironment(this.renderer,true);this.scene.environment=this.environment.texture;
    this.resizeBuffer();this.render();this.options.onContextChange?.("restored");
    if(this.running)this.start();
  };
  dispose(){
    if(this.disposed)return;
    this.stop();this.disposed=true;
    this.controls?.removeEventListener("start",this.onDragStart);this.controls?.removeEventListener("end",this.onDragEnd);
    this.controls?.dispose();this.controls=null;
    const renderer=this.renderer;
    if(renderer){
      renderer.domElement.removeEventListener("webglcontextlost",this.onLost);
      renderer.domElement.removeEventListener("webglcontextrestored",this.onRestored);
      this.runtime?.dispose();this.environment?.dispose();this.scene.clear();
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    }
    this.renderer=null;this.runtime=null;this.model=null;this.environment=null;
  }
}
