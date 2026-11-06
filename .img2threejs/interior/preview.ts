import { createOpticalLensScene } from "../../src/app/(lenus)/lenus/model/createOpticalLensScene";
import { BUILD_PASSES } from "../../src/app/(lenus)/lenus/model/createOpticalLensModel";
import * as THREE from "three";
import { LenusSceneController } from "../../src/app/(lenus)/lenus/scene/LenusSceneController";
const params = new URLSearchParams(location.search);
const pass = BUILD_PASSES.find(p => p === params.get("pass")) ?? "blockout";
const canvas = document.querySelector("canvas")!;
if(params.has("controller")) {
  canvas.remove();const host=document.createElement("div");host.style.cssText="width:100vw;height:100vh";document.body.append(host);
  const fps:number[]=[];
  const controller=new LenusSceneController({initialAnimationTime:Number(params.get("time")??0),onFps:value=>fps.push(value)});
  controller.init(host);controller.resize(innerWidth,innerHeight);
  Object.assign(window,{lensController:controller,lensFps:fps,THREE,__ready:true});
  if(params.has("play"))controller.start();
}else{
  const viewer = createOpticalLensScene(canvas, { pass });
  viewer.resize(innerWidth, innerHeight);
  Object.assign(window, { lensViewer: viewer, THREE, __ready: true });
}
