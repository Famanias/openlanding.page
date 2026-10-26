"use client";

import { useEffect, useRef, useState } from "react";

type PlanetKey = "gaia" | "cygnus" | "sgra";
type Planet = { name: string; lede: string; colors: [string, string]; density: number; jet: number; tilt: number; glow: number };

const ORDER: PlanetKey[] = ["gaia", "cygnus", "sgra"];
const PLANETS: Record<PlanetKey, Planet> = {
  gaia: {
    name: "GAIA BH1",
    lede: "Discover the nearest known black hole to Earth, a dormant ten solar mass singularity<br>just 1,560 light years away in Ophiuchus. Course enrollment starts today, don’t miss out!",
    colors: ["#c9fbff", "#58bddb"], density: 0.82, jet: 0.06, tilt: 0.24, glow: 0.5,
  },
  cygnus: {
    name: "CYGNUS X 1",
    lede: "Explore a fierce stellar mass X ray binary stripping superheated plasma from a blue<br>supergiant companion star. Course enrollment starts today, don’t miss out!",
    colors: ["#d4fbff", "#5576ff"], density: 1.3, jet: 0.72, tilt: 0.38, glow: 0.3,
  },
  sgra: {
    name: "SGR A*",
    lede: "Journey to the supermassive four million solar mass gravitational anchor at the heart<br>of our Milky Way galaxy. Course enrollment starts today, don’t miss out!",
    colors: ["#ffe0a1", "#e65a2c"], density: 1.8, jet: 0.35, tilt: 0.14, glow: 0.9,
  },
};

const VERTEX = `attribute vec2 a_position; void main(){ gl_Position=vec4(a_position,0.0,1.0); }`;
const FRAGMENT = `precision highp float;
uniform vec2 u_resolution; uniform float u_time; uniform float u_mix; uniform float u_type; uniform float u_side; uniform vec2 u_pointer;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
vec3 palette(float t){vec3 a=vec3(.48,.76,.82),b=vec3(.24,.20,.16);if(u_type>1.5){a=vec3(1.,.63,.22);b=vec3(.55,.10,.03);}else if(u_type>.5){a=vec3(.32,.58,1.);b=vec3(.24,.10,.85);}return mix(a,b,t);}
void main(){
 vec2 p=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y); p.x+=u_pointer.x*.08; p.y+=u_pointer.y*.05;
 float r=length(p); float ang=atan(p.y,p.x); float tilt=.2+u_type*.08; float disk=exp(-pow((abs(p.y+sin(ang)*tilt)-.075)/(0.035+u_type*.018),2.));
 float spiral=0.5+0.5*sin(ang*9.0-r*28.0-u_time*(1.2+u_type*.4));
 float ring=exp(-pow((r-(.2+u_type*.035))/(.018+u_type*.006),2.));
 float horizon=smoothstep(.145,.115,r); float stars=step(.996,hash(floor((p+u_pointer*.02)*90.0)))*(1.0-smoothstep(.2,.95,r));
 vec3 col=vec3(.008,.025,.065); col+=stars*vec3(.52,.76,1.); col+=palette(spiral)*disk*(.55+u_type*.22); col+=palette(.18)*ring*(1.3+u_type*.25);
 col*=horizon; float jet=exp(-pow(abs(p.x)/(0.015+u_type*.005),2.))*exp(-pow(abs(p.y-.01)/(0.45+u_type*.1),2.))*(.05+u_type*.24); col+=palette(.1)*jet;
 float vignette=1.0-smoothstep(.45,1.0,r); col*=vignette; if(u_side>.5){col*=1.25; col+=ring*palette(.05)*.3;}
 gl_FragColor=vec4(col, u_side>.5 ? max(max(col.r,col.g),col.b) : 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source); gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function makeRenderer(canvas: HTMLCanvasElement, side: boolean) {
  const gl = (canvas.getContext("webgl", { alpha: side, premultipliedAlpha: false, antialias: true }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) return null;
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX); const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram(); if (!program) return null;
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position"); const uniforms = { resolution: gl.getUniformLocation(program,"u_resolution"), time: gl.getUniformLocation(program,"u_time"), mix: gl.getUniformLocation(program,"u_mix"), type: gl.getUniformLocation(program,"u_type"), side: gl.getUniformLocation(program,"u_side"), pointer: gl.getUniformLocation(program,"u_pointer") };
  const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, side ? 2 : 1.6); const width = Math.max(1, Math.floor(canvas.clientWidth*dpr)); const height = Math.max(1, Math.floor(canvas.clientHeight*dpr)); if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);} };
  const draw = (time: number, type: number, blend: number, pointer: [number,number]) => { resize(); gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0); gl.uniform2f(uniforms.resolution,canvas.width,canvas.height); gl.uniform1f(uniforms.time,time*.001); gl.uniform1f(uniforms.mix,blend); gl.uniform1f(uniforms.type,type); gl.uniform1f(uniforms.side,side?1:0); gl.uniform2f(uniforms.pointer,pointer[0],pointer[1]); gl.drawArrays(gl.TRIANGLES,0,6); };
  return { draw, resize };
}
type Renderer = NonNullable<ReturnType<typeof makeRenderer>>;

function favicon() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 64; const ctx = canvas.getContext("2d"); if (!ctx) return;
  ctx.fillStyle = "#04101f"; ctx.fillRect(0,0,64,64); ctx.strokeStyle = "#79dce8"; ctx.lineWidth = 5; ctx.shadowBlur = 12; ctx.shadowColor = "#79dce8"; ctx.beginPath(); ctx.arc(32,32,21,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur = 0; ctx.fillStyle="#000"; ctx.beginPath(); ctx.arc(32,32,13,0,Math.PI*2); ctx.fill();
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') || document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" })); link.href = canvas.toDataURL("image/png");
}

export default function SpaceEduExperience() {
  const rootRef = useRef<HTMLElement>(null); const skyRef = useRef<HTMLCanvasElement>(null); const leftRef = useRef<HTMLCanvasElement>(null); const rightRef = useRef<HTMLCanvasElement>(null);
  const [featured, setFeatured] = useState<PlanetKey>("gaia");
  const featuredRef = useRef<PlanetKey>("gaia");
  const currentRef = useRef<PlanetKey>("gaia"); const targetRef = useRef<PlanetKey>("gaia"); const pointerRef = useRef<[number,number]>([0,0]);
  const transitionStartRef = useRef(0);
  const renderersRef = useRef<{ main: Renderer; left: Renderer; right: Renderer } | null>(null);
  useEffect(() => {
    favicon(); const root = rootRef.current; const sky = skyRef.current; const left = leftRef.current; const right = rightRef.current; if (!root || !sky || !left || !right) return;
    const main = makeRenderer(sky,false); const sideL = makeRenderer(left,true); const sideR = makeRenderer(right,true); if(!main||!sideL||!sideR) return;
    renderersRef.current = { main, left: sideL, right: sideR };
    let frame = 0; let from = 0; let to = 0; let blend = 1; transitionStartRef.current = performance.now(); const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = (time:number) => {
      const target = ORDER.indexOf(targetRef.current);
      const active = ORDER.indexOf(currentRef.current);
      if (target !== active && !reduced) {
        from = active; to = target;
        const t=Math.min(1,(time-transitionStartRef.current)/450); blend=t*t*(3-2*t);
        if(t===1){currentRef.current=targetRef.current; blend=1;}
      } else blend=1;
      const slots = ORDER.filter((key)=>key!==featuredRef.current);
      main.draw(time,from+(to-from)*blend,blend,pointerRef.current);
      sideL.draw(time,ORDER.indexOf(slots[0] || "cygnus"),1,pointerRef.current);
      sideR.draw(time,ORDER.indexOf(slots[1] || "sgra"),1,pointerRef.current);
      if(!reduced) frame=requestAnimationFrame(draw);
    };
    const setInitial = () => { main.draw(0,0,1,[0,0]); sideL.draw(0,1,1,[0,0]); sideR.draw(0,2,1,[0,0]); };
    setInitial(); frame=requestAnimationFrame(draw);
    const onMove=(event:PointerEvent)=>{pointerRef.current=[(event.clientX/window.innerWidth-.5)*2,(event.clientY/window.innerHeight-.5)*-2];}; window.addEventListener("pointermove",onMove); root.dataset.ready="true";
    const animateIntro=()=>{ if(reduced) return; document.documentElement.classList.add("anim"); requestAnimationFrame(()=>requestAnimationFrame(()=>{document.documentElement.classList.add("play"); window.setTimeout(()=>document.documentElement.classList.remove("anim","play"),2150);}));}; animateIntro();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("pointermove",onMove);document.documentElement.classList.remove("anim","play");renderersRef.current=null;};
  }, []);
  useEffect(() => {
    const renderers = renderersRef.current; if (!renderers) return;
    const slots = ORDER.filter((key)=>key!==featured);
    const now = performance.now();
    renderers.main.draw(now, ORDER.indexOf(featured), 1, pointerRef.current);
    renderers.left.draw(now, ORDER.indexOf(slots[0] || "cygnus"), 1, pointerRef.current);
    renderers.right.draw(now, ORDER.indexOf(slots[1] || "sgra"), 1, pointerRef.current);
  }, [featured]);
  const setNav = (next:boolean) => { const row=document.querySelector<HTMLElement>(".navrow"); const button=document.querySelector<HTMLButtonElement>(".burger"); if(row&&button){row.dataset.open=String(next);button.setAttribute("aria-expanded",String(next));button.setAttribute("aria-label",next?"Close navigation":"Open navigation");} };
  useEffect(() => {
    const close = () => { const row = document.querySelector<HTMLElement>(".navrow"); if (row?.dataset.open === "true") setNav(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    const onDocumentClick = (event: MouseEvent) => { const target = event.target as Element; if (!target.closest(".navrow")) close(); };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKey);
    const links = Array.from(document.querySelectorAll(".links a")); links.forEach((link) => link.addEventListener("click", close));
    return () => { document.removeEventListener("click", onDocumentClick); document.removeEventListener("keydown", onKey); links.forEach((link) => link.removeEventListener("click", close)); };
  }, []);
  const show = (next: PlanetKey) => { if(next===featuredRef.current)return; currentRef.current=featuredRef.current; targetRef.current=next; featuredRef.current=next; transitionStartRef.current=performance.now(); setFeatured(next); };
  const remaining = ORDER.filter((key)=>key!==featured);
  const planet = PLANETS[featured];
  return <div className="spaceedu-page">
  <main ref={rootRef} className="stage" aria-label="SpaceEdu interactive astrophysics lesson" id="spaceedu-hero">
    <div className="sky"><canvas id="sky-gl" ref={skyRef} aria-hidden="true" /></div>
    <div className="ui">
      <header className="navbar"><div className="navrow"><a className="logo" href="#spaceedu-hero" aria-label="SpaceEdu home">space<i>edu</i></a><nav className="links" id="site-nav"><a href="#objects" aria-current="page">Objects</a><a href="#tuition">Tution</a><a href="#tutorials">Tutorials</a><a href="#blog">Blog</a><a className="enroll" href="#enroll-form">Enroll</a></nav><button className="burger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav" onClick={(e)=>{e.stopPropagation(); const row=e.currentTarget.closest<HTMLElement>(".navrow"); setNav(row?.dataset.open!=="true");}}><span/><span/><span/></button></div></header>
      <div className="copy" id="objects"><div className="col eyebrow"><span className="ent-mask"><span className="ent-line">SINGULARITY</span></span></div><h1 className="col title"><span className="ent-mask"><span className="ent-line">{planet.name}</span></span></h1><div className="col rule"><span /></div><p className="col lede" dangerouslySetInnerHTML={{__html:planet.lede}} /><div className="col cta"><button className="planet planet-l" type="button" data-planet={remaining[0]} aria-label={`Show ${PLANETS[remaining[0]].name}`} onClick={()=>show(remaining[0])}><canvas className="planet-gl" ref={leftRef} width={256} height={256} aria-hidden="true" /></button><button className="planet planet-r" type="button" data-planet={remaining[1]} aria-label={`Show ${PLANETS[remaining[1]].name}`} onClick={()=>show(remaining[1])}><canvas className="planet-gl" ref={rightRef} width={256} height={256} aria-hidden="true" /></button><a href="#enroll-form">GET STARTED</a><span className="label label-l">{PLANETS[remaining[0]].name}</span><span className="label label-r">{PLANETS[remaining[1]].name}</span></div></div>
    </div>
    <button className="scroll" type="button" aria-label="Scroll to learning path" onClick={()=>document.querySelector("#learning-path")?.scrollIntoView({behavior:"smooth"})}><svg viewBox="0 0 26 33" fill="none" aria-hidden="true"><path d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4" stroke="#ffffff" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/></svg></button>
    <noscript><style>{".stage{background:#04101f}.sky canvas{display:none}.copy{opacity:1!important}"}</style></noscript>
  </main>
  <section className="spaceedu-section spaceedu-section--path" id="learning-path" aria-labelledby="learning-path-title">
    <div className="spaceedu-section__inner"><p className="spaceedu-section__eyebrow">THE LEARNING PATH</p><h2 id="learning-path-title">See the physics behind the darkness.</h2><p>SpaceEdu turns real observations into short, visual lessons. Start with an object, follow its light, and build the language you need to read the universe with confidence.</p><div className="spaceedu-cards"><article id="tuition"><span>01</span><h3>Choose an object</h3><p>Compare a dormant stellar binary, a high energy X ray source, and the anchor at our galaxy’s center.</p></article><article id="tutorials"><span>02</span><h3>Trace the light</h3><p>Learn how an accretion disk, photon ring, and gravitational lensing reveal what cannot be seen directly.</p></article><article id="blog"><span>03</span><h3>Keep exploring</h3><p>Return to the sky whenever a new question appears. Every lesson starts from the same three objects.</p></article></div></div>
  </section>
  <section className="spaceedu-section spaceedu-section--enroll" id="enroll-form" aria-labelledby="enroll-title"><div className="spaceedu-section__inner spaceedu-enroll"><p className="spaceedu-section__eyebrow">COURSE ENROLLMENT</p><h2 id="enroll-title">Make the next observation yours.</h2><p>Get the first SpaceEdu lesson when the course opens. No payment details required.</p><form onSubmit={(event)=>event.preventDefault()}><label htmlFor="spaceedu-email">Email address</label><div><input id="spaceedu-email" name="email" type="email" placeholder="you@example.com" required /><button type="submit">Enroll for updates</button></div></form><a className="spaceedu-back" href="#spaceedu-hero">Back to the sky ↑</a></div></section>
  </div>;
}
