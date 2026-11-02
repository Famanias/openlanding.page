// Canvas algorithms, copy and interaction timings are copied from the supplied standalone HTML.
// The wrapper only scopes ownership and releases listeners, observers, timers and frames in React.

/** @param {HTMLElement} root */
export function mountContinuation(root) {
  const abort = new AbortController();
  const frames = new Set();
  const timers = new Set();
  const observers = [];
  let disposed = false;
  const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: abort.signal });
  const requestFrame = (callback) => {
    const handle = requestAnimationFrame((time) => { frames.delete(handle); if (!disposed) callback(time); });
    frames.add(handle);
    return handle;
  };
  const schedule = (callback, delay) => {
    const handle = setTimeout(() => { timers.delete(handle); if (!disposed) callback(); }, delay);
    timers.add(handle);
    return handle;
  };
  const intersectionObserver = (callback, options) => {
    const observer = new IntersectionObserver(callback, options);
    observers.push(observer);
    return observer;
  };
  const resizeObserver = (callback) => {
    const observer = new ResizeObserver(callback);
    observers.push(observer);
    return observer;
  };
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,parent=root)=>parent.querySelector(s), $$=(s,parent=root)=>Array.from(parent.querySelectorAll(s));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const year=$('#jm-year');if(year)year.textContent=String(new Date().getFullYear());
// Section entrances use motion masks, clip-path, overshoot and rotation rather than opacity-only transitions.
if('IntersectionObserver' in window){const io=intersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('jmc-in');io.unobserve(e.target)}}),{threshold:.10,rootMargin:'0px 0px -30px 0px'});$$('.jmc-reveal').forEach(el=>io.observe(el));}else{$$('.jmc-reveal').forEach(el=>el.classList.add('jmc-in'))}
// Scroll-accurate progress, active project navigation, and each project's top border draw.
const cases=$$('.jmc-case');const markers=$$('.jmc-work-marker');const progressEl=$('#jm-page-progress');let ticking=false;
function updateScroll(){root.dataset.active=String(root.getBoundingClientRect().top<innerHeight&&root.getBoundingClientRect().bottom>0);const scroll=window.scrollY;if(progressEl){const start=root.getBoundingClientRect().top+scroll;const end=root.getBoundingClientRect().bottom+scroll-innerHeight;progressEl.style.transform=`scaleY(${clamp((scroll-start)/Math.max(1,end-start),0,1)})`;}let best=0,bestDist=Infinity;cases.forEach((el,i)=>{const r=el.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);el.style.setProperty('--jm-progress',(p*100).toFixed(1)+'%');const dist=Math.abs(r.top+r.height/2-innerHeight*.5);if(dist<bestDist){best=i;bestDist=dist}});markers.forEach((m,i)=>m.setAttribute('aria-current',i===best?'true':'false'));ticking=false;}
listen(window,'scroll',()=>{if(!ticking){requestFrame(updateScroll);ticking=true}},{passive:true});listen(window,'resize',()=>requestFrame(updateScroll),{passive:true});requestFrame(updateScroll);
// Inline project details, never a modal. Each control remains keyboard accessible.
$$('.jmc-case-toggle').forEach(btn=>{listen(btn,'click',()=>{const expanded=btn.getAttribute('aria-expanded')==='true';const d=document.getElementById(btn.getAttribute('aria-controls'));btn.setAttribute('aria-expanded',String(!expanded));if(d)d.setAttribute('aria-hidden',String(expanded));});});
// Buttons and artwork respond to pointer input, with touch-safe graceful fallbacks.
const contact=$('#jm-contact');if(contact&&!reduced){listen(contact,'pointermove',e=>{const r=contact.getBoundingClientRect();contact.style.setProperty('--jm-ctax',`${((e.clientX-r.left)/r.width)*100}%`);contact.style.setProperty('--jm-ctay',`${((e.clientY-r.top)/r.height)*100}%`)});}
const magnet=$('[data-magnet]');if(magnet&&!reduced){listen(magnet,'pointermove',e=>{if(e.pointerType==='touch')return;const r=magnet.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;magnet.style.transform=`translate(${x*13}px,${y*9}px)`;});listen(magnet,'pointerleave',()=>magnet.style.transform='');}
const copy=$('#jm-copy-email');
if (copy) {
  listen(copy,'click', async () => {
    const email='jules@example.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta=document.createElement('textarea');
        ta.value=email;
        ta.style.cssText='position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        if (!document.execCommand('copy')) throw Error('Copy unavailable');
        ta.remove();
      }
      if(disposed)return;
      copy.textContent='✓ COPIED';
      schedule(() => {copy.textContent='COPY EMAIL ↗'},1800);
    } catch {
      if(disposed)return;
      copy.textContent='EMAIL: '+email;
      schedule(() => {copy.textContent='COPY EMAIL ↗'},3000);
    }
  });
}
// Canvas renderer: procedural drawings instead of stock video or external WebGL assets.
const TAU=Math.PI*2;
function makeCanvas(canvas,kind){if(!canvas)return null;const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return null;const wrap=canvas.parentElement;const state={kind,canvas,ctx,wrap,w:0,h:0,dpr:1,pointer:{x:.5,y:.5,active:false},time:0,visible:true,paused:reduced,resizePending:true};function resize(){const r=wrap.getBoundingClientRect();state.w=Math.max(10,r.width);state.h=Math.max(10,r.height);state.dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(state.w*state.dpr);canvas.height=Math.round(state.h*state.dpr);ctx.setTransform(state.dpr,0,0,state.dpr,0,0)}resize();if(window.ResizeObserver){resizeObserver(()=>{state.resizePending=true;if(state.paused)requestFrame(()=>drawState(state))}).observe(wrap)}else listen(window,'resize',()=>{state.resizePending=true;if(state.paused)requestFrame(()=>drawState(state))});listen(wrap,'pointermove',e=>{if(e.pointerType==='touch')return;const r=wrap.getBoundingClientRect();state.pointer.x=clamp((e.clientX-r.left)/r.width,0,1);state.pointer.y=clamp((e.clientY-r.top)/r.height,0,1);state.pointer.active=true;wrap.style.setProperty('--jm-px',`${state.pointer.x*100}%`);wrap.style.setProperty('--jm-py',`${state.pointer.y*100}%`);wrap.style.setProperty('--jm-mx',`${state.pointer.x*100}%`);wrap.style.setProperty('--jm-my',`${state.pointer.y*100}%`);});listen(wrap,'pointerleave',()=>{state.pointer.active=false});if('IntersectionObserver'in window){intersectionObserver(entries=>entries.forEach(e=>state.visible=e.isIntersecting),{threshold:0}).observe(wrap)}return state}
function clear(s,color){s.ctx.fillStyle=color;s.ctx.fillRect(0,0,s.w,s.h)}
function grid(s,n=26){const{ctx,w,h}=s;ctx.lineWidth=.7;ctx.strokeStyle='rgba(160,190,196,.09)';ctx.beginPath();for(let x=0;x<w;x+=n){ctx.moveTo(x,0);ctx.lineTo(x,h)}for(let y=0;y<h;y+=n){ctx.moveTo(0,y);ctx.lineTo(w,y)}ctx.stroke()}
function drawLab(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#090f12');grid(s,33);const cx=w*.5,cy=h*.49,scale=Math.min(w,h)*.29;let mode=labMode;
if(mode==='geometry'){
  for(let layer=22;layer>=0;layer--){const off=layer*TAU/24;const n=105;c.beginPath();for(let j=0;j<=n;j++){const a=j/n*TAU;const mod=Math.sin(a*6+t*.65+layer*.22)*.13+Math.cos(a*3-t*.27+layer*.44)*.085;const interact=p.active?Math.max(0,1-Math.hypot(Math.cos(a)*.5+.5-p.x,Math.sin(a)*.5+.5-p.y)*1.7)*.3:0;const rad=scale*(.55+layer*.022+mod+interact);const x=cx+Math.cos(a+off*.015)*rad*1.12;const y=cy+Math.sin(a+off*.015)*rad*.73+Math.sin(a*3+layer*.38+t*.3)*8;if(j===0)c.moveTo(x,y);else c.lineTo(x,y)}c.closePath();c.strokeStyle=layer%6===0?'rgba(213,255,55,.65)':`rgba(109,138,253,${.15+layer*.013})`;c.lineWidth=layer%6===0?1.15:.8;c.stroke();}
}else if(mode==='interaction'){
  const cols=20,rows=20,gx=w*.12,gy=h*.12,sw=w*.76,sh=h*.76;for(let iy=0;iy<rows;iy++)for(let ix=0;ix<cols;ix++){const xx=gx+ix/(cols-1)*sw,yy=gy+iy/(rows-1)*sh;const d=Math.hypot(xx-p.x*w,yy-p.y*h);const influence=p.active?Math.exp(-d*d/(w*w*.045)):0;const a=t*1.1+ix*.3+iy*.2;const dx=Math.sin(a)*8+Math.cos(a*1.6)*influence*55,dy=Math.cos(a*.8)*8+Math.sin(a)*influence*55;c.fillStyle=influence>.1?'rgba(213,255,55,.9)':'rgba(126,148,250,.62)';c.beginPath();c.arc(xx+dx,yy+dy,1.35+influence*2.8,0,TAU);c.fill();}
}else{
  for(let j=0;j<33;j++){c.beginPath();for(let i=0;i<=105;i++){const x=w*.09+(i/105)*w*.82;const dx=(i/105-.5)*2;const v=Math.sin(i*.07+t*1.6+j*.28)*Math.cos(i*.13-t*.65+j*.4);const py=h*.5+j*3.2-53+v*(21+Math.abs(dx)*13)+(p.active?(p.x-.5)*35*Math.sin(j*.2+i*.1):0);if(!i)c.moveTo(x,py);else c.lineTo(x,py)}c.strokeStyle=j%4===0?'rgba(213,255,55,.58)':`rgba(110,131,247,${.25+j*.012})`;c.lineWidth=j%4===0?1.3:.85;c.stroke()}
}}
function drawMono(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#07090b');const lines=64,steps=85;const ix=p.active?(p.x-.5)*1.5:0,iy=p.active?(p.y-.5)*1.5:0;for(let j=lines-1;j>=0;j--){const z=j/(lines-1);const yy=h*.15+z*h*.72;const spread=(.55+z*.65),center=w*.5;const amp=(.7-z*.3)*(h*.095);c.beginPath();for(let i=0;i<=steps;i++){const x=i/steps,px=center+(x-.5)*w*spread;let wave=Math.sin(x*23+z*13+t*.68)*Math.sin(x*8-z*21+t*.35)+Math.cos(x*39+z*6-t*.55)*.35;wave+=Math.sin((x+z*.33)*47+t*.2)*.2;const response=p.active?Math.exp(-((x-p.x)**2+(z-p.y)**2)*14)*(ix*2+iy*2):0;let py=yy-(wave+response)*amp;if(i===0)c.moveTo(px,py);else c.lineTo(px,py);}const a=.08+(1-z)*.47;c.strokeStyle=`rgba(215,224,219,${a})`;c.lineWidth=z>.7?1:.7;c.stroke()}
c.lineWidth=1;c.strokeStyle='rgba(213,255,55,.3)';c.strokeRect(w*.055,h*.14,w*.89,h*.72);c.fillStyle='rgba(213,255,55,.9)';c.fillRect(w*.053,h*.86,6,6);c.fillRect(w*.942,h*.14,6,6);
}
function drawShift(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#090d18');const cols=25,rows=20,space=Math.min(w*.79/(cols-1),h*.73/(rows-1));const cx=w*.5,cy=h*.49;const pts=[];for(let j=0;j<rows;j++){const r=[];for(let i=0;i<cols;i++){const x=cx+(i-(cols-1)/2)*space;const y=cy+(j-(rows-1)/2)*space;const dist=Math.hypot(x-p.x*w,y-p.y*h);const strength=p.active?Math.exp(-dist*dist/(space*space*30))*45:0;const phase=i*.36+j*.2+t*.7;r.push({x:x+Math.sin(phase)*13+Math.sin(phase*.7)*strength,y:y+Math.cos(phase*.9)*14+Math.cos(phase*1.2)*strength});}pts.push(r)}
for(let j=0;j<rows;j++){c.beginPath();pts[j].forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.lineWidth=.95;c.strokeStyle=`rgba(103,126,255,${.14+(j/rows)*.42})`;c.stroke()}
for(let i=0;i<cols;i++){c.beginPath();for(let j=0;j<rows;j++){const v=pts[j][i];if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y);}c.strokeStyle='rgba(102,145,255,.23)';c.stroke()}
pts.forEach((row,j)=>row.forEach((v,i)=>{if((i+j)%7===0){c.fillStyle=(i+j)%14===0?'rgba(213,255,55,.92)':'rgba(129,157,255,.63)';c.fillRect(v.x-1.5,v.y-1.5,3,3)}}));
}
function projectTorus(a,b,s,t){const R=1.5,r=.62;const A=a+t*.18,B=b+t*.12;let x=(R+r*Math.cos(B))*Math.cos(A),y=(R+r*Math.cos(B))*Math.sin(A),z=r*Math.sin(B);let rx=t*.13+(s.pointer.active?(s.pointer.y-.5)*.65:0),ry=t*.18+(s.pointer.active?(s.pointer.x-.5)*.9:0);let y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);let x2=x*Math.cos(ry)+z1*Math.sin(ry),z2=-x*Math.sin(ry)+z1*Math.cos(ry);return {x:x2,y:y1,z:z2}}
function drawForm(s){const{ctx:c,w,h}=s,t=s.time;clear(s,'#0a0d15');const scale=Math.min(w,h)*.21,cx=w*.5,cy=h*.5;const to2=(v)=>{const persp=3.6/(3.6+v.z*.15);return{x:cx+v.x*scale*persp,y:cy+v.y*scale*persp,z:v.z}};
for(let k=0;k<25;k++){const A=k/25*TAU;c.beginPath();for(let j=0;j<=78;j++){const v=to2(projectTorus(A,j/78*TAU,s,t));if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y)}c.strokeStyle=k%5===0?'rgba(217,255,63,.65)':'rgba(111,132,255,.36)';c.lineWidth=k%5===0?1.05:.85;c.stroke()}
for(let k=0;k<36;k++){const B=k/36*TAU;c.beginPath();for(let j=0;j<=90;j++){const v=to2(projectTorus(j/90*TAU,B,s,t));if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y)}c.strokeStyle=k%7===0?'rgba(213,255,55,.7)':'rgba(141,157,251,.32)';c.lineWidth=k%7===0?1.4:.83;c.stroke()}
for(let i=0;i<24;i++){const v=to2(projectTorus(i/24*TAU,i*.29,s,t));c.fillStyle=i%4===0?'#d5ff37':'#8298ff';c.beginPath();c.arc(v.x,v.y,i%4===0?2.3:1.2,0,TAU);c.fill()}
}
let labMode='geometry';const lab=makeCanvas($('#jm-lab-canvas'),'lab');const art={mono:makeCanvas($('#jm-art-mono'),'mono'),shift:makeCanvas($('#jm-art-shift'),'shift'),form:makeCanvas($('#jm-art-form'),'form')};const all=[lab,...Object.values(art)].filter(Boolean);
$$('[data-discipline]').forEach(btn=>listen(btn,'click',()=>{labMode=btn.dataset.discipline;$$('[data-discipline]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));const names={geometry:['Procedural','geometry'],interaction:['Interaction','systems'],motion:['Motion','study']};const [a,b]=names[labMode];$('#jm-lab-title').innerHTML=a+'<br>'+b;$('#jm-lab-meta').innerHTML='REAL-TIME / INPUT-DRIVEN<br>MOVE CURSOR TO DISTORT';}));
$$('.jmc-play').forEach(btn=>listen(btn,'click',()=>{const s=art[btn.dataset.target];if(!s)return;s.paused=!s.paused;btn.textContent=s.paused?'▶ RESUME':'Ⅱ PAUSE';btn.setAttribute('aria-pressed',String(s.paused));if(s.paused)drawState(s)}));
function drawState(s){if(s.resizePending){s.resizePending=false;const r=s.wrap.getBoundingClientRect();s.w=Math.max(10,r.width);s.h=Math.max(10,r.height);s.dpr=Math.min(devicePixelRatio||1,1.6);s.canvas.width=Math.round(s.w*s.dpr);s.canvas.height=Math.round(s.h*s.dpr);s.ctx.setTransform(s.dpr,0,0,s.dpr,0,0)}if(s.kind==='lab')drawLab(s);else if(s.kind==='mono')drawMono(s);else if(s.kind==='shift')drawShift(s);else drawForm(s)}
let last=0;function animate(now){const dt=Math.min((now-last)/1000||.016,.045);last=now;all.forEach(s=>{if(!s.visible)return;if(!s.paused)s.time+=dt;if(!s.paused||s.resizePending||s.pointer.active)drawState(s)});if(!reduced)requestFrame(animate)}
all.forEach(s=>{s.resizePending=true;drawState(s)});if(!reduced)requestFrame(animate);
// Anchor/hash integration notes: original hero can point to these IDs without a popup.

  // Scope the standalone document's smooth-scroll behavior to the copied links only.
  listen(root, 'click', (event) => {
    if (!(event.target instanceof Element) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || !root.contains(link)) return;
    const hash = link.getAttribute('href');
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 24, behavior: reduced ? 'instant' : 'smooth' });
  });
  root.dataset.continuationReady = 'true';
  return () => {
    disposed = true;
    abort.abort();
    for (const observer of observers) observer.disconnect();
    for (const frame of frames) cancelAnimationFrame(frame);
    for (const timer of timers) clearTimeout(timer);
    delete root.dataset.continuationReady;
    delete root.dataset.active;
  };
}
