import { SCENE_SHADER } from "./shaders/scene.glsl";
import { VERTEX_SHADER } from "./shaders/vertex.glsl";

export type SceneUniforms = { distance: number; inclination: number; azimuth: number; exposure: number; lensing: number; beaming: number; redshift: number; feed: number; diskTemp: number; mass: number; object: number; pointer: number; steps: number };
export function createSceneProgram(gl: WebGL2RenderingContext) {
  const compile = (type: number, source: string) => { const shader = gl.createShader(type); if (!shader) throw new Error("shader allocation failed"); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed"); return shader; };
  const program = gl.createProgram(); if (!program) throw new Error("program allocation failed");
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, SCENE_SHADER)); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "shader link failed");
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  const names = ["u_resolution","u_time","u_distance","u_inclination","u_azimuth","u_exposure","u_lensing","u_beaming","u_redshift","u_feed","u_diskTemp","u_mass","u_object","u_pointer","u_steps"] as const;
  const uniforms = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<(typeof names)[number], WebGLUniformLocation | null>;
  return { program, buffer, position, uniforms };
}
