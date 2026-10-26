import { createSceneProgram, type SceneUniforms } from "./gl";
import { chooseQuality } from "./quality";

export type ViewRect = { x: number; y: number; width: number; height: number; object: number };
export function createEngine(canvas: HTMLCanvasElement, views: () => ViewRect[], reduced: boolean) {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!gl) return null;
  const scene = createSceneProgram(gl); const quality = chooseQuality(window.innerWidth, window.innerHeight, navigator.hardwareConcurrency || 4); let frame = 0; let visible = true;
  const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); const w = Math.max(1, Math.floor(canvas.clientWidth*dpr)); const h = Math.max(1, Math.floor(canvas.clientHeight*dpr)); if (canvas.width !== w || canvas.height !== h) { canvas.width=w; canvas.height=h; gl.viewport(0,0,w,h); } };
  const drawView = (time: number, rect: ViewRect, uniforms: SceneUniforms) => { const dpr=Math.min(window.devicePixelRatio||1,1.5); gl.viewport(Math.floor(rect.x*dpr),Math.floor((canvas.clientHeight-rect.y-rect.height)*dpr),Math.floor(rect.width*dpr),Math.floor(rect.height*dpr)); gl.scissor(Math.floor(rect.x*dpr),Math.floor((canvas.clientHeight-rect.y-rect.height)*dpr),Math.floor(rect.width*dpr),Math.floor(rect.height*dpr)); gl.enable(gl.SCISSOR_TEST); gl.useProgram(scene.program); gl.bindBuffer(gl.ARRAY_BUFFER,scene.buffer); gl.enableVertexAttribArray(scene.position); gl.vertexAttribPointer(scene.position,2,gl.FLOAT,false,0,0); const u=scene.uniforms; gl.uniform2f(u.u_resolution,rect.width*dpr,rect.height*dpr); gl.uniform1f(u.u_time,time*.001); gl.uniform1f(u.u_distance,uniforms.distance); gl.uniform1f(u.u_inclination,uniforms.inclination); gl.uniform1f(u.u_azimuth,uniforms.azimuth); gl.uniform1f(u.u_exposure,uniforms.exposure); gl.uniform1f(u.u_lensing,uniforms.lensing); gl.uniform1f(u.u_beaming,uniforms.beaming); gl.uniform1f(u.u_redshift,uniforms.redshift); gl.uniform1f(u.u_feed,uniforms.feed); gl.uniform1f(u.u_diskTemp,uniforms.diskTemp); gl.uniform1f(u.u_mass,uniforms.mass); gl.uniform1f(u.u_object,rect.object); gl.uniform1f(u.u_pointer,uniforms.pointer); gl.uniform1i(u.u_steps,uniforms.steps); gl.drawArrays(gl.TRIANGLES,0,6); };
  const render = (time: number, uniforms: SceneUniforms) => { if (!visible) return; resize(); gl.clearColor(.002,.004,.012,1); gl.clear(gl.COLOR_BUFFER_BIT); for (const rect of views()) drawView(time,rect,uniforms); gl.disable(gl.SCISSOR_TEST); };
  const loop = (time: number) => { if (!reduced) { render(time, current); frame=requestAnimationFrame(loop); } };
  let current: SceneUniforms = { distance:40,inclination:80,azimuth:0,exposure:1,lensing:1,beaming:1,redshift:1,feed:1,diskTemp:16000,mass:1,object:0,pointer:0,steps:quality.mainSteps };
  const setUniforms = (next: Partial<SceneUniforms>) => { current={...current,...next}; if(reduced) render(performance.now(),current); };
  const onVisibility = () => { visible=document.visibilityState !== "hidden"; if(visible && !reduced){cancelAnimationFrame(frame);frame=requestAnimationFrame(loop);} };
  document.addEventListener("visibilitychange",onVisibility); canvas.addEventListener("webglcontextlost",(event)=>event.preventDefault());
  if (!reduced) frame=requestAnimationFrame(loop); else render(0,current);
  return { canvas, gl, render, setUniforms, dispose: () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange",onVisibility); } };
}
