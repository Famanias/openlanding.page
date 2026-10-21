import { DOOR_OFFSET_P, ROOM_DEPTH_P, perspectivePx, tunnelBox } from "../house/geometry";
import type { Frame } from "../house/frame";
import { ROOMS as ROOM_LIST, roomIndex } from "../rooms/rooms";
import { scorePalette, scoreUniforms } from "../score/score";
import { PHENOMENA, hexToRgb } from "./phenomena";
import { FRAGMENT, ROOMS, VERTEX } from "./shader";
import { renderScale } from "./start-policy";

const INK = hexToRgb("#07060B");

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`noctiluca light: shader failed to compile\n${log}`);
  }
  return shader;
}

/** Draws the corridor's light into one canvas. Imperative on purpose: it runs every frame. */
export class LightEngine {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private palette = new Float32Array(ROOMS * 4 * 3);
  private styles = new Float32Array(ROOMS * 4);
  private scoreVersion = -1;
  private start = performance.now();
  lost = false;

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" });
    if (!gl) throw new Error("noctiluca light: WebGL2 unavailable");
    this.gl = gl;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`noctiluca light: link failed\n${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    for (const name of [
      "uRes", "uCss", "uP", "uCam", "uLook", "uBox", "uRoom", "uTime",
      "uPal", "uStyle", "uPointer", "uFlat", "uFlatRoom", "uInk",
    ]) {
      this.u[name] = gl.getUniformLocation(program, name);
    }

    ROOM_LIST.forEach((room, i) => {
      const light = PHENOMENA[room.id];
      light.stops.forEach((hex, s) => this.palette.set(hexToRgb(hex), (i * 4 + s) * 3));
      this.styles.set([light.style, light.speed, light.scale, light.glow], i * 4);
    });
    gl.uniform3fv(this.u.uInk, INK);
    gl.uniform2f(this.u.uRoom, ROOM_DEPTH_P, DOOR_OFFSET_P);

    canvas.addEventListener("webglcontextlost", this.onLost);
  }

  private onLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
  };

  private syncScore(f: Frame) {
    if (f.scoreVersion === this.scoreVersion) return;
    this.scoreVersion = f.scoreVersion;
    const i = roomIndex("score");
    scorePalette(f.score.hue).forEach((rgb, s) => this.palette.set(rgb, (i * 4 + s) * 3));
    const { speed, scale } = scoreUniforms(f.score);
    this.styles[i * 4 + 1] = speed;
    this.styles[i * 4 + 2] = scale;
    this.gl.uniform3fv(this.u.uPal, this.palette);
    this.gl.uniform4fv(this.u.uStyle, this.styles);
  }

  private resize(): { css: number; w: number; h: number } {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const scale = renderScale(window.devicePixelRatio || 1, w);
    const pw = Math.max(1, Math.round(w * scale));
    const ph = Math.max(1, Math.round(h * scale));
    if (this.canvas.width !== pw || this.canvas.height !== ph) {
      this.canvas.width = pw;
      this.canvas.height = ph;
      this.gl.viewport(0, 0, pw, ph);
    }
    return { css: w / pw, w, h };
  }

  render(f: Frame, now: number) {
    if (this.lost) return;
    const gl = this.gl;
    const { css, w } = this.resize();
    const vh = window.innerHeight;
    const p = perspectivePx(vh);
    const box = tunnelBox(window.innerWidth, vh);
    this.syncScore(f);

    gl.uniform2f(this.u.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.u.uCss, css);
    gl.uniform1f(this.u.uP, p);
    gl.uniform3f(this.u.uCam, 0, 0, f.z);
    gl.uniform2f(this.u.uLook, f.yaw, f.pitch);
    gl.uniform3f(this.u.uBox, box.hw, box.ceil, box.floor);
    gl.uniform1f(this.u.uTime, (now - this.start) / 1000);
    gl.uniform3f(this.u.uPointer, f.pointer.x - w / 2, f.pointer.y - vh / 2, f.pointer.energy);
    gl.uniform1f(this.u.uFlat, f.mode === "flow" ? 1 : 0);
    gl.uniform1f(this.u.uFlatRoom, f.flowRoom);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose() {
    this.canvas.removeEventListener("webglcontextlost", this.onLost);
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
