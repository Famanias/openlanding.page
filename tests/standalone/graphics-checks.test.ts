import { expect, test } from "@playwright/test";
import { installGraphicsProbe, verifyGraphics } from "./graphics";

test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference",
  launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } });

test("native WebGL2 instanced draws count presentation separately from framebuffer work", async ({ page }) => {
  await installGraphicsProbe(page);
  await page.goto("data:text/html,<canvas class='vector-canvas' width='64' height='64'></canvas>");
  const result = await page.evaluate(() => {
    const canvas = document.querySelector("canvas")!;
    const gl = canvas.getContext("webgl2")!;
    if (!gl) throw new Error("Software WebGL2 unavailable");
    const program = gl.createProgram()!;
    for (const [type, source] of [
      [gl.VERTEX_SHADER, "#version 300 es\nvoid main(){vec2 p[3]=vec2[](vec2(-1.,-1.),vec2(1.,-1.),vec2(0.,1.));gl_Position=vec4(p[gl_VertexID],0.,1.);}"],
      [gl.FRAGMENT_SHADER, "#version 300 es\nprecision highp float;out vec4 color;void main(){color=vec4(0.,1.,0.,1.);}"],
    ] as const) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "compile failed");
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program); gl.useProgram(program);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 1);
    const probe = (window as unknown as { __standaloneGraphicsProbe: { snapshot: (selector: string) => { draws: number; screenDraws: number; visible: boolean; methods: Record<string, number> }[] } }).__standaloneGraphicsProbe;
    const offscreen = probe.snapshot("canvas")[0];
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 1);
    gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 0);
    const indices = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW);
    gl.drawElementsInstanced(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0, 1);
    const onscreen = probe.snapshot("canvas")[0];
    canvas.style.opacity = "0";
    const hidden = probe.snapshot("canvas")[0];
    return { offscreen, onscreen, hidden, sameContext: canvas.getContext("webgl2") === gl, error: gl.getError() };
  });
  expect(result.sameContext).toBe(true);
  expect(result.error).toBe(0);
  expect(result.offscreen.draws).toBe(1);
  expect(result.offscreen.screenDraws).toBe(0);
  expect(result.onscreen.draws).toBe(3);
  expect(result.onscreen.screenDraws).toBe(2);
  expect(result.onscreen.methods.drawElementsInstanced).toBe(1);
  expect(result.onscreen.visible).toBe(true);
  expect(result.hidden.visible).toBe(false);
  await page.evaluate(() => {
    const canvas = document.querySelector("canvas")!;
    canvas.style.opacity = "1";
    const gl = canvas.getContext("webgl2")!;
    function draw() { gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, 1); requestAnimationFrame(draw); }
    requestAnimationFrame(draw);
  });
  await verifyGraphics(page, "vector");
});

test("WebGL1 ANGLE instancing keeps native context and extension identity", async ({ page }) => {
  await installGraphicsProbe(page);
  await page.goto("data:text/html,<canvas width='64' height='64'></canvas>");
  const result = await page.evaluate(() => {
    const canvas = document.querySelector("canvas")!;
    const gl = canvas.getContext("webgl")!;
    if (!gl) throw new Error("Software WebGL unavailable");
    const extension = gl.getExtension("ANGLE_instanced_arrays");
    if (!extension) throw new Error("ANGLE_instanced_arrays unavailable");
    const program = gl.createProgram()!;
    for (const [type, source] of [
      [gl.VERTEX_SHADER, "attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}"],
      [gl.FRAGMENT_SHADER, "precision highp float;void main(){gl_FragColor=vec4(0.,1.,0.,1.);}"],
    ] as const) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source); gl.compileShader(shader); gl.attachShader(program, shader);
    }
    gl.linkProgram(program); gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 0, 1]), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, "position");
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0); gl.enableVertexAttribArray(location);
    extension.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 3, 1);
    const probe = (window as unknown as { __standaloneGraphicsProbe: { snapshot: (selector: string) => unknown[] } }).__standaloneGraphicsProbe;
    return { evidence: probe.snapshot("canvas"), sameContext: gl === canvas.getContext("webgl"),
      sameExtension: extension === gl.getExtension("ANGLE_instanced_arrays"), error: gl.getError() };
  });
  expect(result.sameContext).toBe(true);
  expect(result.sameExtension).toBe(true);
  expect(result.error).toBe(0);
  expect(result.evidence).toEqual([expect.objectContaining({ kind: "webgl", draws: 1, screenDraws: 1, visible: true,
    methods: { drawArraysInstancedANGLE: 1 } })]);
});

test("Canvas2D proof ignores clears and rejects detached, transparent and clipped paint", async ({ page }) => {
  await installGraphicsProbe(page);
  await page.goto("data:text/html,<div style='overflow:hidden;width:1px;height:1px'><canvas id='clipped'></canvas></div><canvas id='visible'></canvas>");
  const result = await page.evaluate(() => {
    const visible = document.querySelector<HTMLCanvasElement>("#visible")!;
    const context = visible.getContext("2d")!;
    context.clearRect(0, 0, 300, 150);
    const probe = (window as unknown as { __standaloneGraphicsProbe: { snapshot: (selector: string) => { draws: number; visible: boolean }[] } }).__standaloneGraphicsProbe;
    const cleared = probe.snapshot("#visible");
    context.fillRect(0, 0, 20, 20);
    const painted = probe.snapshot("#visible");
    const clipped = document.querySelector<HTMLCanvasElement>("#clipped")!;
    clipped.getContext("2d")!.fillRect(0, 0, 20, 20);
    const clippedPaint = probe.snapshot("#clipped");
    visible.style.opacity = "0";
    const transparent = probe.snapshot("#visible");
    visible.remove();
    const detached = probe.snapshot("#visible");
    return { cleared, painted, clippedPaint, transparent, detached };
  });
  expect(result.cleared).toEqual([]);
  expect(result.painted[0]).toMatchObject({ draws: 1, visible: true });
  expect(result.clippedPaint[0].visible).toBe(false);
  expect(result.transparent[0].visible).toBe(false);
  expect(result.detached).toEqual([]);
});

test("the full Xibalba verifier accepts continuing visible native Canvas2D paint", async ({ page }) => {
  await installGraphicsProbe(page);
  await page.goto("data:text/html,<section id='top'><canvas class='fall'></canvas></section>");
  await page.evaluate(() => {
    const context = document.querySelector("canvas")!.getContext("2d")!;
    function draw() { context.fillRect(0, 0, 100, 100); requestAnimationFrame(draw); }
    requestAnimationFrame(draw);
  });
  await verifyGraphics(page, "xibalba");
});
