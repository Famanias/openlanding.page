/**
 * Early `<head>` shim injected before page scripts run. Tracks every
 * IntersectionObserver created by the page so `prepareDocument()` can
 * trigger viewport reveals across the full capture width even when the
 * iframe lives inside Figma's narrow 380x580 plugin UI window.
 */
export const EARLY_IO_SHIM = `(function(){
if(typeof window==="undefined"||typeof window.IntersectionObserver!=="function"||window.__h2f_ioPatched)return;
window.__h2f_ioPatched=true;
var NativeIO=window.IntersectionObserver;
var registry=[];
window.__h2f_ioRegistry=registry;
function PatchedIO(cb,opts){
var targets=new Set();
var obs=new NativeIO(cb,opts);
var rec={cb:cb,opts:opts||{},targets:targets,obs:obs};
registry.push(rec);
var origObserve=obs.observe.bind(obs);
var origUnobserve=obs.unobserve.bind(obs);
var origDisconnect=obs.disconnect.bind(obs);
obs.observe=function(el){if(el)targets.add(el);return origObserve(el);};
obs.unobserve=function(el){targets.delete(el);return origUnobserve(el);};
obs.disconnect=function(){targets.clear();return origDisconnect();};
return obs;
}
PatchedIO.prototype=NativeIO.prototype;
window.IntersectionObserver=PatchedIO;
window.__h2f_triggerAllIntersectionObservers=function(onlyInViewport){
var vw=window.innerWidth||1920;
var vh=window.innerHeight||1080;
var rootRect=typeof DOMRectReadOnly==="function"?new DOMRectReadOnly(0,0,vw,vh):{x:0,y:0,width:vw,height:vh,top:0,left:0,right:vw,bottom:vh};
var now=typeof performance!=="undefined"?performance.now():Date.now();
for(var i=0;i<registry.length;i++){
var rec=registry[i];
if(!rec.targets.size)continue;
if(rec.opts&&rec.opts.root)continue;
var entries=[];
rec.targets.forEach(function(el){
if(!el||!el.isConnected)return;
if(el.closest&&el.closest("[hidden],dialog:not([open])"))return;
var cs=window.getComputedStyle?window.getComputedStyle(el):null;
if(cs&&cs.display==="none")return;
var rect=el.getBoundingClientRect();
if(onlyInViewport&&(rect.bottom<-120||rect.top>vh+120))return;
entries.push({time:now,rootBounds:rootRect,boundingClientRect:rect,intersectionRect:rect,isIntersecting:true,intersectionRatio:1,target:el});
});
if(entries.length){try{rec.cb(entries,rec.obs);}catch(e){}}
}
};
})();`;

/**
 * Injects an early script right after `<head>` (or at the start of the document)
 * so it executes before any page scripts.
 */
export function injectHeadShim(html: string, shimCode: string): string {
  const escaped = shimCode.replace(/<\/script/gi, "<\\/script");
  const scriptTag = `<script>${escaped}</script>`;
  const headMatch = html.match(/<head\b[^>]*>/i);
  if (headMatch && headMatch.index !== undefined) {
    const pos = headMatch.index + headMatch[0].length;
    return html.slice(0, pos) + scriptTag + html.slice(pos);
  }
  const htmlMatch = html.match(/<html\b[^>]*>/i);
  if (htmlMatch && htmlMatch.index !== undefined) {
    const pos = htmlMatch.index + htmlMatch[0].length;
    return html.slice(0, pos) + scriptTag + html.slice(pos);
  }
  return scriptTag + html;
}

/**
 * Injects the serialized bridge script into an HTML string before the closing
 * </body> or </html> tag, or appends it for bare HTML fragments.
 */
export function injectBridgeScript(html: string, bridgeCode: string): string {
  const escaped = bridgeCode.replace(/<\/script/gi, "<\\/script");
  const scriptTag = `<script>${escaped}</script>`;
  const lower = html.toLowerCase();

  const bodyIndex = lower.lastIndexOf("</body>");
  if (bodyIndex !== -1) {
    return html.slice(0, bodyIndex) + scriptTag + html.slice(bodyIndex);
  }

  const htmlIndex = lower.lastIndexOf("</html>");
  if (htmlIndex !== -1) {
    return html.slice(0, htmlIndex) + scriptTag + html.slice(htmlIndex);
  }

  return html + scriptTag;
}
