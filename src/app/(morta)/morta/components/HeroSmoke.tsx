import { useEffect, useRef } from 'react';

/** A translucent, procedural smoke veil; the photograph remains the fallback. */
export function HeroSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}');
    const fragment = compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);
      }
      float fbm(vec2 p) {
        float n=0., a=.5;
        for(int i=0;i<5;i++) { n+=a*noise(p); p=mat2(1.6,1.2,-1.2,1.6)*p; a*=.5; }
        return n;
      }
      void main() {
        vec2 uv=gl_FragCoord.xy/resolution;
        vec2 p=vec2(uv.x*2.6,uv.y*2.0);
        float t=time*.045;
        float warp=fbm(p*1.25+vec2(t,-t*.7));
        float smoke=fbm(p*2.0+vec2(warp*1.35-t*.55,warp*.6+t));
        float wisps=smoothstep(.34,.64,smoke)*smoothstep(.15,.62,warp);
        float lower=1.-smoothstep(.25,1.,uv.y);
        float right=smoothstep(.15,.68,uv.x);
        float entrance=smoothstep(0.,0.5,time);
        float alpha=wisps*lower*right*.65*entrance;
        gl_FragColor=vec4(vec3(1.),alpha);
      }
    `);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!program || !buffer) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const time = gl.getUniformLocation(program, 'time');
    let frame = 0;
    let visible = false;
    let elapsed = 0;
    let lastFrame: number | null = null;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * .65));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * .65));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const draw = (now: number) => {
      if (!visible || document.hidden || motion.matches) { frame = 0; return; }
      gl.uniform2f(resolution, canvas.width, canvas.height);
      if (lastFrame !== null) elapsed += (now - lastFrame) / 1000;
      lastFrame = now;
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      if (visible && !document.hidden && !motion.matches && !frame) {
        lastFrame = null;
        frame = requestAnimationFrame(draw);
      } else if ((!visible || document.hidden || motion.matches) && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = null;
      }
      if (motion.matches) gl.clear(gl.COLOR_BUFFER_BIT);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const sizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
